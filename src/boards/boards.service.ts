import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid';

@Injectable()
export class BoardsService {
  // DB연결 전 임시 사용. private을 사용해서 다른 곳에서 접근하지 못하도록.
  private boards: Board[] = [];

  getAllBoards(): Board[] {
    return this.boards;
  }

  createBoard(title: string, content: string) {
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
}
