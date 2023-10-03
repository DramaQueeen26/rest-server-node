import { prisma } from "../../data/postgres";
import { CreateTodoDto, CustomError, TodoDatasource, TodoEntity, UpdateTodoDto } from "../../domain";
export class TodoDatasourceImpl implements TodoDatasource {
  
  async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {

    const newTodo = await prisma.todo.create({data: createTodoDto! })

    return TodoEntity.fromObject( newTodo )

  }
  
  async getAll(): Promise<TodoEntity[]> {
    
    const todos = await prisma.todo.findMany()

    return todos.map( TodoEntity.fromObject )

  }
  
  async findById(id: number): Promise<TodoEntity> {
  
    const todo = await prisma.todo.findFirst({where: { id }})

    if( !todo ) throw new CustomError(`Todo with id ${ id } not found`, 404)

    return TodoEntity.fromObject(todo)

  }
  
  async update(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {

    await this.findById( updateTodoDto.id )

    const updatedTodo = await prisma.todo.update({data: updateTodoDto!.values, where: { id: updateTodoDto.id }})

    return TodoEntity.fromObject( updatedTodo )

  }
  
  async delete(id: number): Promise<TodoEntity> {

    await this.findById( id )

    const deleted = await prisma.todo.delete({where: {id}})

    return TodoEntity.fromObject( deleted )

  }

}