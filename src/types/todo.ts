export interface Todo 
{
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  priority: 'low' | 'medium' | 'high';
}

export type CreateTodoInput = Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateTodoInput = Partial<Omit<Todo, 'id' | 'createdAt'>> & {
  updatedAt: Date;
};