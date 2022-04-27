import { Injectable, NotFoundException } from '@nestjs/common';
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
  async getBoardById(id: number): Promise<Board> {
    const foundOne = await this.boardRepository.findOne(id);
    if (!foundOne) {
      throw new NotFoundException(`Can not found board with id: ${id}`);
    }
    return foundOne;
  }
  // updateBoardStatus(id: string, status: BoardStatus): Board {
  //   const board = this.getBoardById(id);
  //   board.status = status;
  //   return board;
  // }
  // deleteBoard(id: string): void {
  //   const found = this.getBoardById(id);
  //   this.boards = this.boards.filter((bd) => bd.id !== found.id);
  // }
}
