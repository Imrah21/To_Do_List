// blueprint of todo items and what data each should have.

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

//CREATE a new task: don’t need id, createdAt, or updatedAt (the app generates those)
export type CreateTodoInput = Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>;

// UPDATE an existing todo: update parts of it (Partial = not all fields required)
export type UpdateTodoInput = Partial<Omit<Todo, 'id' | 'createdAt'>> & {
  updatedAt: Date; // must update time
};