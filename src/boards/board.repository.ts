import { NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';

// DB와 연결해서 처리하는 로직은 여기 repository에서 한다.
@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
  // 생성하기
  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const { title, content } = createBoardDto;
    const board: Board = this.create({
      title,
      content,
      status: BoardStatus.PUBLIC,
    });
    await this.save(board);
    return board;
  }

  // get detail
  async getBoardById(id: number): Promise<Board> {
    const board: Board = await this.findOne(id);
    if (!board) {
      throw new NotFoundException(`Can not found board with id: ${id}`);
    }
    return board;
  }

  async deleteBoard(id: number): Promise<void> {
    const result = await this.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Cannot find board with id: ${id}`);
    }
  }
}
