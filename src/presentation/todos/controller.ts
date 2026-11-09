import { Request, Response } from 'express';
import { CreateTodo, DeleteTodo, GetTodo, GetTodos, TodoRepository, UpdateTodo } from '../../domain';
import { CreateTodoDto, UpdateTodoDto } from '../../domain/dtos';

export class TodosController {

    constructor(
        private readonly todoRepository: TodoRepository
    ) { }

    public getTodos = (_req: Request, res: Response) => {
        new GetTodos(this.todoRepository)
            .execute()
            .then(todos => res.json(todos))
            .catch(error => res.status(400).json({ error: (error as Error).message }))
    }

    public getTodoById = (req: Request, res: Response) => {
        const id = Number(req.params.id)
        if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' });

        new GetTodo(this.todoRepository)
            .execute(id)
            .then(todo => res.json(todo))
            .catch(error => res.status(400).json({ error: (error as Error).message }))
    }

    public createTodo = (req: Request, res: Response) => {
        const [error, createTodoDto] = CreateTodoDto.create((req.body));
        if (error) return res.status(400).json({ error });

        new CreateTodo(this.todoRepository)
            .execute(createTodoDto!)
            .then(todo => res.json(todo))
            .catch(error => res.status(400).json({ error: (error as Error).message }))
    }

    public updateTodo = (req: Request, res: Response) => {
        const id = Number(req.params.id)
        const [error, updateTodoDto] = UpdateTodoDto.update({ ...req.body, id })

        if (error) return res.status(400).json({ error });

        new UpdateTodo(this.todoRepository)
            .execute(updateTodoDto!)
            .then(todo => res.json(todo))
            .catch(error => res.status(400).json({ error: (error as Error).message }))
    }

    public deleteTodo = async (req: Request, res: Response) => {
        const id = Number(req.params.id)
        if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' });

        new DeleteTodo(this.todoRepository)
            .execute(id)
            .then(todo => res.json(todo))
            .catch(error => res.status(400).json({ error: (error as Error).message }))
    }
}