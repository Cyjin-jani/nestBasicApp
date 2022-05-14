import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
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

  getAllBoards(): Promise<Board[]> {
    return this.boardRepository.getAllBoards();
  }

  getUserBoards(user: User): Promise<Board[]> {
    return this.boardRepository.getUserBoards(user);
  }

  // 생성하기 - repository 패턴 적용
  createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto, user);
  }

  // 디테일 불러오기
  getBoardById(id: number): Promise<Board> {
    return this.boardRepository.getBoardById(id);
  }

  // status 업데이트
  updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    return this.boardRepository.updateBoardStatus(id, status);
  }

  // 게시글 삭제
  deleteBoard(id: number, user: User): Promise<void> {
    return this.boardRepository.deleteBoard(id, user);
  }
}
