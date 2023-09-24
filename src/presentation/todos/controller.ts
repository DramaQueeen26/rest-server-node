import { Request, Response } from "express"

export class TodosController {

  constructor() {}

  public getTodos = (req: Request, res: Response) => {

    res.json('hola')

  }

}