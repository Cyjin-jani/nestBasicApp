import { Injectable } from '@nestjs/common';
import { Board } from './board.model';

@Injectable()
export class BoardsService {
  // DB연결 전 임시 사용. private을 사용해서 다른 곳에서 접근하지 못하도록.
  private boards: Board[] = [];

  getAllBoards(): Board[] {
    return this.boards;
  }
}
