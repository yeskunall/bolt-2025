import React, { useState } from 'react';
import { Edit2, Trash2, Check, X } from 'lucide-react';
import { Todo, Priority } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onUpdate: (id: string, text: string, priority: Priority) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
}

export function TodoItem({ todo, onUpdate, onDelete, onToggleComplete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editPriority, setEditPriority] = useState(todo.priority);

  const handleSave = () => {
    if (editText.trim()) {
      onUpdate(todo.id, editText.trim(), editPriority);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setEditPriority(todo.priority);
    setIsEditing(false);
  };

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
    }
  };


  return (
    <div className={`p-4 border rounded-lg ${todo.completed ? 'bg-gray-50' : 'bg-white'}`}>
      <div className="flex items-center gap-3">
        <button
          onClick={() => onToggleComplete(todo.id)}
          className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
            todo.completed 
              ? 'bg-green-500 border-green-500 text-white' 
              : 'border-gray-300 hover:border-green-500'
          }`}
        >
          {todo.completed && <Check size={12} />}
        </button>

        <div className="flex-1">
          {isEditing ? (
            <div className="flex gap-2 items-center">
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="flex-1 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
              <select
                value={editPriority}
                onChange={(e) => setEditPriority(e.target.value as Priority)}
                className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <button
                onClick={handleSave}
                className="p-1 text-green-600 hover:text-green-800"
              >
                <Check size={16} />
              </button>
              <button
                onClick={handleCancel}
                className="p-1 text-red-600 hover:text-red-800"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                {todo.text}
              </span>
              <span className={`px-2 py-1 text-xs rounded border ${getPriorityColor(todo.priority)}`}>
                {todo.priority}
              </span>
            </div>
          )}
        </div>

        {!isEditing && (
          <div className="flex gap-1">
            <button
              onClick={() => setIsEditing(true)}
              className="p-1 text-gray-600 hover:text-blue-600"
            >
              <Edit2 size={16} />
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="p-1 text-gray-600 hover:text-red-600"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}