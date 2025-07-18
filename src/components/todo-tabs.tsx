import React from 'react';

interface TodoTabsProps {
  activeTab: 'active' | 'completed';
  onTabChange: (tab: 'active' | 'completed') => void;
  activeTodosCount: number;
  completedTodosCount: number;
}

export function TodoTabs({ activeTab, onTabChange, activeTodosCount, completedTodosCount }: TodoTabsProps) {
  return (
    <div className="flex border-b border-gray-200 mb-6">
      <button
        onClick={() => onTabChange('active')}
        className={`px-4 py-2 font-medium text-sm border-b-2 ${
          activeTab === 'active'
            ? 'border-blue-500 text-blue-600'
            : 'border-transparent text-gray-500 hover:text-gray-700'
        }`}
      >
        Active Todos ({activeTodosCount})
      </button>
      <button
        onClick={() => onTabChange('completed')}
        className={`px-4 py-2 font-medium text-sm border-b-2 ${
          activeTab === 'completed'
            ? 'border-blue-500 text-blue-600'
            : 'border-transparent text-gray-500 hover:text-gray-700'
        }`}
      >
        Completed Todos ({completedTodosCount})
      </button>
    </div>
  );
}