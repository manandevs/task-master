// components/features/tasks/TaskCard.tsx
import React from 'react';
import { Task, Priority } from '../../../types';
import { Card } from '../../ui';
import { usePopoverStore } from '@/lib/usePopoverStore';
import { useTaskStore } from '@/lib/useTaskStore'; // Import the store
import { BiTrash } from 'react-icons/bi'; // Import trash icon

interface TaskCardProps {
  task: Task;
  onToggle: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onToggle }) => {
  const { setTaskData, togglePopover } = usePopoverStore();
  const { removeTask } = useTaskStore(); // Pull the remove action
  
  const getPriorityColor = (p: Priority) => {
    switch (p) {
      case Priority.HIGH: return 'bg-rose-500';
      case Priority.MEDIUM: return 'bg-amber-500';
      case Priority.LOW: return 'bg-emerald-500';
      default: return 'bg-slate-300';
    }
  };

  return (
    <Card
      onClick={() => {
        setTaskData({ ...task });
        togglePopover('edit-task', { ...task });
      }}
      className="hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(124,58,237,0.12)]"
    >
      <div className={`absolute left-0 top-6 bottom-6 w-1.5 rounded-r-full ${getPriorityColor(task.priority)}`}></div>

      <div className="flex flex-col h-full gap-4">
        <div className="flex justify-between items-start pl-2">
          <div className="space-y-1">
            <h4 className={`text-lg font-bold text-slate-800 transition-all duration-300 ${task.completed ? 'line-through opacity-40' : ''}`}>
              {task.title}
            </h4>
            <div className="flex items-center gap-1.5 text-slate-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              <span className="text-xs font-medium">{task.dueDate}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* REMOVE BUTTON */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // Stop from opening the Edit Popover
                if(confirm('Delete this task?')) removeTask(task.id);
              }}
              className="p-1.5 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
              title="Delete Task"
            >
              <BiTrash size={18} />
            </button>

            {/* TOGGLE COMPLETE BUTTON */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggle();
              }}
              className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${task.completed ? 'bg-violet-600 border-violet-600' : 'border-slate-200 hover:border-violet-400'}`}
            >
              {task.completed && (
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
              )}
            </button>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between pl-2">
          <div className="flex -space-x-2">
            {task.assignees?.map((person) => (
              <img
                key={person.id}
                className="w-8 h-8 rounded-full border-2 border-white object-cover grayscale hover:grayscale-0 transition-all duration-300 cursor-help"
                src={person.avatar}
                alt={person.name}
                title={person.name}
              />
            ))}
          </div>
          <div className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${getPriorityColor(task.priority)} bg-opacity-10 ${getPriorityColor(task.priority).replace('bg-', 'text-')}`}>
            {task.priority}
          </div>
        </div>
      </div>
    </Card>
  );
};