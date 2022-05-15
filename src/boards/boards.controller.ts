import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

// 인증된 유저만 요청이 가능
@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
  // boardsService: BoardsService; //이걸 해준 이유: 타입스크립트에서는 선언한 값만 객체의 프로퍼티로 사용가능하기 때문.
  // constructor(boardsService: BoardsService) {
  //   this.boardsService = boardsService;
  // }
  // 위 코드를 ts를 이용하여 아래와 같이 간단하게 만들 수 있다.
  // 가능한 이유: constructor 파라미터에 접근제한자(private, public 등)을 설정하면,
  // 해당 파라미터는 암묵적으로 class의 property로 선언이 된다.
  constructor(private boardsService: BoardsService) {}

  private logger = new Logger('BoardsController');

  @Get('/')
  getAllBoard(): Promise<Board[]> {
    return this.boardsService.getAllBoards();
  }

  // 현재 로그인한 유저의 글만 가져오기
  @Get('/me')
  getUserBoard(@GetUser() user: User): Promise<Board[]> {
    this.logger.verbose(`User ${user.username} trying get users all boards`);
    return this.boardsService.getUserBoards(user);
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
  createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @GetUser() user: User,
  ): Promise<Board> {
    this.logger.verbose(`User ${user.username} creating a new board. 
    Payload: ${JSON.stringify(createBoardDto)}`);
    return this.boardsService.createBoard(createBoardDto, user);
  }

  @Delete('/:id')
  deleteBoard(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.boardsService.deleteBoard(id, user);
  }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus, // 파라미터 레벨의 파이프 (커스텀 파이프)
  ): Promise<Board> {
    return this.boardsService.updateBoardStatus(id, status);
  }
}
