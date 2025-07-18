export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: Priority;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTodoInput {
  text: string;
  priority: Priority;
}

export interface UpdateTodoInput {
  id: string;
  text?: string;
  priority?: Priority;
  completed?: boolean;
}

export type Priority = "low" | "medium" | "high";