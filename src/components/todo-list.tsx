import React from 'react';
import { TodoItem } from './todo-item';
import { Todo, Priority } from '../types/todo';

interface TodoListProps {
  todos: Todo[];
  onUpdate: (id: string, text: string, priority: Priority) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
}

export function TodoList({ todos, onUpdate, onDelete, onToggleComplete }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No todos found
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onToggleComplete={onToggleComplete}
        />
      ))}
    </div>
  );
}