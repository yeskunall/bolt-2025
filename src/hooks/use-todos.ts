import { useLocalStorage } from './use-local-storage';
import { Todo, CreateTodoInput, UpdateTodoInput } from '../types/todo';

const STORAGE_KEY = 'todos';

export function useTodos() {
  const [todos, setTodos] = useLocalStorage<Todo[]>(STORAGE_KEY, []);

  const createTodo = (input: CreateTodoInput): void => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: input.text,
      priority: input.priority,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setTodos([...todos, newTodo]);
  };

  const updateTodo = (input: UpdateTodoInput): void => {
    setTodos(todos.map(todo => {
      if (todo.id === input.id) {
        return {
          ...todo,
          ...input,
          updatedAt: new Date(),
        };
      }
      return todo;
    }));
  };

  const deleteTodo = (id: string): void => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleComplete = (id: string): void => {
    const todo = todos.find(t => t.id === id);
    if (todo) {
      updateTodo({ id, completed: !todo.completed });
    }
  };

  return {
    todos,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleComplete,
  };
}