import { NotFoundException } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';

// DB와 연결해서 처리하는 로직은 여기 repository에서 한다.
@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
  // 생성하기
  async createBoard(
    createBoardDto: CreateBoardDto,
    user: User,
  ): Promise<Board> {
    const { title, content } = createBoardDto;
    const board: Board = this.create({
      title,
      content,
      status: BoardStatus.PUBLIC,
      user,
    });
    await this.save(board);
    return board;
  }

  // get all
  async getAllBoards(): Promise<Board[]> {
    const boards: Board[] = await this.find();
    return boards;
  }

  // get all boards by specific user who logged in.
  async getUserBoards(user: User): Promise<Board[]> {
    const query = this.createQueryBuilder('board');
    query.where('board.userId = :userId', { userId: user.id });
    const boards: Board[] = await query.getMany();
    return boards;
  }

  // get detail
  async getBoardById(id: number): Promise<Board> {
    const board: Board = await this.findOne(id);
    if (!board) {
      throw new NotFoundException(`Can not found board with id: ${id}`);
    }
    return board;
  }

  // update status
  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board: Board = await this.getBoardById(id);
    board.status = status;
    await this.save(board);
    return board;
  }

  async deleteBoard(id: number, user: User): Promise<void> {
    const result = await this.delete({ id, user });
    if (result.affected === 0) {
      throw new NotFoundException(`Cannot find board with id: ${id}`);
    }
  }
}
