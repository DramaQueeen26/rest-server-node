import { Request, Response } from "express"
import { prisma } from "../../data/postgres"

const todos = [
  {id: 1, text: 'buy milk', completedAt: new Date()},
  {id: 2, text: 'buy bread', completedAt: null},
  {id: 3, text: 'buy butter', completedAt: new Date()}
]

export class TodosController {

  constructor() {}

  public getTodos = async (req: Request, res: Response) => {

    const todos = await prisma.todo.findMany()

    return res.json(todos)

  }

  public getTodoById = async (req: Request, res: Response) => {

    const id = +req.params.id

    if( isNaN(id) ) return res.status(400).json({ error: `ID argument is not a number` })

    const todo = await prisma.todo.findMany({where: { id }})

    return res.json(todo)

  }

  public createTodo = async (req: Request, res: Response) => {

    const { text } = req.body

    if( !text ) return res.status(400).json({ error: 'Text property is required' })

    const newTodo = await prisma.todo.create({data: { text }})

    return res.json(newTodo)

  }

  public updateTodo = async (req: Request, res: Response) => {

    const id = +req.params.id
    if( isNaN(id) ) return res.status(400).json({ error: `ID argument is not a number` })
    
    const todo = await prisma.todo.findMany({where: { id }});
    if(!todo) return res.status(404).json({ error: `Todo with id ${ id } not found` })
  
    const completedAt = req.body.completedAt ? new Date( req.body.completedAt ) : null

    const text = req.body.text ? req.body.text : todo[0].text

    const todoUpdate = await prisma.todo.update({data: { text, completedAt }, where: { id }})

    return res.json(todoUpdate)

  }

  public deleteTodo = (req: Request, res: Response) => {

    const id = +req.params.id

    if( isNaN(id) ) return res.status(400).json({ error: `ID argument is not a number` })

    const todo = todos.find( todo => todo.id === id);
    if(!todo) return res.status(404).json({ error: `Todo with id ${ id } not found` })

    todos.splice( todos.indexOf( todo ), 1 )

    res.json(todo)

  }

}