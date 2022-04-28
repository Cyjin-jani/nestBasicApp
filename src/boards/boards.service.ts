import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardRepository } from './board.repository';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  // 이 서비스에서 repository를 어떤걸 쓰겠다는 걸 아래 InjectRepository를 통해 해준다. (의존성 주입)
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}

  // getAllBoards(): Board[] {
  //   return this.boards;
  // }

  // 생성하기 - repository 패턴 적용
  createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto);
  }

  // 디테일 불러오기
  getBoardById(id: number): Promise<Board> {
    return this.boardRepository.getBoardById(id);
  }
  // updateBoardStatus(id: string, status: BoardStatus): Board {
  //   const board = this.getBoardById(id);
  //   board.status = status;
  //   return board;
  // }

  // 게시글 삭제
  deleteBoard(id: number): Promise<void> {
    return this.boardRepository.deleteBoard(id);
  }
}
