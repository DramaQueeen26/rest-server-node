import { Request, Response } from "express"
import { CreateTodoDto, TodoRepository, UpdateTodoDto } from "../../domain"

export class TodosController {

  constructor(
    private readonly todoRepository: TodoRepository
  ) {}

  public getTodos = async (req: Request, res: Response) => {

    const todos = await this.todoRepository.getAll()

    return res.json(todos)

  }

  public getTodoById = async (req: Request, res: Response) => {

    const id = +req.params.id

    try {
      
      const todo = await this.todoRepository.findById(id)
      return res.json(todo)

    } catch (error) {
      
      return res.status(400).json({ error })
    
    }

  }

  public createTodo = async (req: Request, res: Response) => {

    const [error, createTodoDto] = CreateTodoDto.create( req.body )
    
    if( error ) return res.status(400).json({ error })

    const newTodo = await this.todoRepository.create(createTodoDto!)

    return res.json(newTodo)

  }

  public updateTodo = async (req: Request, res: Response) => {

    const id = +req.params.id
    const [error, updateTodoDto] = UpdateTodoDto.create({...req.body, id})
    
    if ( error ) return res.status(400).json({ error })

    try {
      
      const updatedTodo = await this.todoRepository.update(updateTodoDto!)
      return res.json(updatedTodo)

    } catch (error) {
      
      return res.status(400).json({ error })

    }

  }

  public deleteTodo = async (req: Request, res: Response) => {

    const id = +req.params.id

    try {
      
      const deletedTodo = await this.todoRepository.delete(id)
      return res.json(deletedTodo)

    } catch (error) {
      
      return res.status(400).json({ error })

    }

  }

}