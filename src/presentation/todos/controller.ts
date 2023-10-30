import { Request, Response } from "express";

const todos = [
  { id: 1, text: 'milk', completedAt: new Date() },
  { id: 2, text: 'rice', completedAt: new Date() },
  { id: 3, text: 'pasta', completedAt: new Date() },
];

export class TodosController {
   
  public getTodos = ( req: Request, res: Response ) => {
    return res.json(todos);
  }

  public getTodoById = ( req: Request, res: Response ) => {

    const id = +req.params.id;
    if ( isNaN(id) ) return res.status(400).json({error:`Id argument is not a number`});

    const todo = todos.find( todo => todo.id === id );

    ( todo )
      ? res.json( todo )
      : res.status(404).json({ error: `TODO with id ${id} not found`})
  }

  public createTodo = ( req: Request, res: Response ) => {

    const { text } = req.body;
    if ( !text ) return res.status(400).json({error: `Text proterty is required`});

    const newTodo = {
      id: todos.length + 1,
      text: text,
      completedAt: new Date()
    }

    todos.push(newTodo)

    return res.json( newTodo );
  }

  public updateTodo = (req: Request, res: Response ) => {

    const id = +req.params.id;
    if ( isNaN(id) ) return res.status(400).json({error:`Id argument is not a number`});

    const todo = todos.find( todo => todo.id === id );
    if ( !todo ) return res.status(404).json({ error: `Todo with id: ${id} not found`});

    const { text, completedAt } = req.body;

    todo.text = text || todo.text;
    ( completedAt === 'null')
      ? todo.completedAt = null as any
      : todo.completedAt = new Date( completedAt || todo.completedAt );

    // !this is passing by reference
    // todo.text = text;
    res.json(todo);
        
  }

}