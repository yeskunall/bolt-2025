import React from 'react';
import { useState } from 'react';
import { CheckSquare } from 'lucide-react';
import { useTodos } from './hooks/use-todos';
import { TodoForm } from './components/todo-form';
import { TodoList } from './components/todo-list';
import { TodoTabs } from './components/todo-tabs';
import { Priority } from './types/todo';

function App() {
  const { todos, createTodo, updateTodo, deleteTodo, toggleComplete } = useTodos();
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');

  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);
  const displayTodos = activeTab === 'active' ? activeTodos : completedTodos;

  const handleUpdate = (id: string, text: string, priority: Priority) => {
    updateTodo({ id, text, priority });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-2xl mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3 mb-6">
            <CheckSquare className="text-blue-500" size={32} />
            <h1 className="text-2xl font-bold text-gray-800">Todo List</h1>
          </div>

          <TodoForm onSubmit={createTodo} />

          <TodoTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            activeTodosCount={activeTodos.length}
            completedTodosCount={completedTodos.length}
          />

          <TodoList
            todos={displayTodos}
            onUpdate={handleUpdate}
            onDelete={deleteTodo}
            onToggleComplete={toggleComplete}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
