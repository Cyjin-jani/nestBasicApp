import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
export class BoardsController {
  // boardsService: BoardsService; //이걸 해준 이유: 타입스크립트에서는 선언한 값만 객체의 프로퍼티로 사용가능하기 때문.
  // constructor(boardsService: BoardsService) {
  //   this.boardsService = boardsService;
  // }
  // 위 코드를 ts를 이용하여 아래와 같이 간단하게 만들 수 있다.
  // 가능한 이유: constructor 파라미터에 접근제한자(private, public 등)을 설정하면,
  // 해당 파라미터는 암묵적으로 class의 property로 선언이 된다.
  constructor(private boardsService: BoardsService) {}

  @Get('/')
  getAllBoard(): Promise<Board[]> {
    return this.boardsService.getAllBoards();
  }

  // // parameter가 하나인 경우 @Param('원하는파라미터')로 받으면 되고, 두 개 이상인 경우에는
  // // @Param() params: string[]  이런 식으로 받으면 된다.
  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }

  // handler레벨의 pipe (nest의 내장 pipe를 사용)
  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardsService.createBoard(createBoardDto);
  }

  @Delete('/:id')
  deleteBoard(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.boardsService.deleteBoard(id);
  }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus, // 파라미터 레벨의 파이프 (커스텀 파이프)
  ): Promise<Board> {
    return this.boardsService.updateBoardStatus(id, status);
  }
}
