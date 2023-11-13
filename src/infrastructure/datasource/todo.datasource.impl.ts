import { prisma } from '../../data/postgresDB';
import { CreateTodoDto, CustomError, TodoEntity, UpdateTodoDto } from '../../domain';
import { TodoDatasource } from '../../domain/datasources/todo.datasource';


export class TodoDataSourceImpl implements TodoDatasource {
  
  async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {

    const todo = await prisma.todo.create({
      data: createTodoDto!
    });

    return TodoEntity.fromObject(todo);
  }
  
  async getAll(): Promise<TodoEntity[]> {

    const todos = await prisma.todo.findMany();

    return todos.map( todo => TodoEntity.fromObject(todo));

  }
  
  async findById(id: number): Promise<TodoEntity> {
        
    const todo = await prisma.todo.findFirst({
      where: { id }
    });
    
    if ( !todo ) throw new CustomError(`Todo with id ${id} not found`, 404);
    return TodoEntity.fromObject(todo);

  }
  
  async update(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    
    await this.findById(updateTodoDto.id);
    const updatedTodo = await prisma.todo.update({
      where: { id: updateTodoDto.id },
      data: updateTodoDto!.values
    });

    return TodoEntity.fromObject(updatedTodo);
  }
  
  async delete(id: number): Promise<TodoEntity> {
    await this.findById(id);

    const deleted = await prisma.todo.delete({
      where: {
        id
      }
    });

    return TodoEntity.fromObject(deleted);
  }

}