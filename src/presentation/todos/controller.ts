import { Request, Response } from "express"
import { prisma } from "../../data/postgres"
import { CreateTodoDto } from "../../domain/dtos"

export class TodosController {

  constructor() {}

  public getTodos = async (req: Request, res: Response) => {

    const todos = await prisma.todo.findMany()

    return res.json(todos)

  }

  public getTodoById = async (req: Request, res: Response) => {

    const id = +req.params.id

    if( isNaN(id) ) return res.status(400).json({ error: `ID argument is not a number` })

    const todo = await prisma.todo.findFirst({where: { id }})

    return res.json(todo)

  }

  public createTodo = async (req: Request, res: Response) => {

    const [error, createTodoDto] = CreateTodoDto.create( req.body )
    
    if( error ) return res.status(400).json({ error })

    const newTodo = await prisma.todo.create({data: createTodoDto! })

    return res.json(newTodo)

  }

  public updateTodo = async (req: Request, res: Response) => {

    const id = +req.params.id
    if( isNaN(id) ) return res.status(400).json({ error: `ID argument is not a number` })
    
    const todo = await prisma.todo.findFirst({where: { id }})
    if(!todo) return res.status(404).json({ error: `Todo with id ${ id } not found` })
  
    const completedAt = req.body.completedAt ? new Date( req.body.completedAt ) : null

    const text = req.body.text ? req.body.text : todo.text

    const todoUpdate = await prisma.todo.update({data: { text, completedAt }, where: { id }})

    return res.json(todoUpdate)

  }

  public deleteTodo = async (req: Request, res: Response) => {

    const id = +req.params.id

    if( isNaN(id) ) return res.status(400).json({ error: `ID argument is not a number` })

    const todo = await prisma.todo.findFirst({where: { id }})
    if(!todo) return res.status(404).json({ error: `Todo with id ${ id } not found` })

    const deleted = await prisma.todo.delete({where: {id}});

    (deleted)
    ? res.json({ msg: 'Deleted', todo })
    : res.status(400).json({ error: 'Unexpected error'})

  }

}