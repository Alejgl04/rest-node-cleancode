import { TodoEntity } from '../entities/todo.entity';
import { CreateTodoDto, UpdateTodoDto } from '../dtos';

export abstract class TodoDatasource {

  abstract create( createTodoDto: CreateTodoDto ): Promise<TodoEntity>;
  
  // !!pagination
  abstract getAll(): Promise<TodoEntity[]>;
  
  abstract findById( id: number ): Promise<TodoEntity>;
  
  abstract update( updateTodoDto: UpdateTodoDto ): Promise<TodoEntity>;
 
  abstract delete( id: number ): Promise<TodoEntity>;
}