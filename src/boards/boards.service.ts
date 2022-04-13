import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  // DB연결 전 임시 사용. private을 사용해서 다른 곳에서 접근하지 못하도록.
  private boards: Board[] = [];

  getAllBoards(): Board[] {
    return this.boards;
  }

  createBoard(createBoardDto: CreateBoardDto) {
    const { title, content } = createBoardDto;
    const board: Board = {
      id: uuid(),
      title,
      content,
      status: BoardStatus.PUBLIC,
    };
    // db가 없으니 임시로 배열에 넣어준다.
    this.boards.push(board);
    return board;
  }

  getBoardById(id: string): Board {
    return this.boards.find((bd) => bd.id === id);
  }

  updateBoardStatus(id: string, status: BoardStatus): Board {
    const board = this.getBoardById(id);
    board.status = status;
    return board;
  }

  deleteBoard(id: string): void {
    this.boards = this.boards.filter((bd) => bd.id !== id);
  }
}
