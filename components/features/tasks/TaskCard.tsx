import React from 'react';
import { Task, Priority } from '../../../types';
import { Card } from '../../ui';
import { usePopoverStore } from '@/lib/usePopoverStore';
import { BiTrash } from 'react-icons/bi';

interface TaskCardProps {
  task: Task;
  onToggle: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onToggle }) => {
  const { setTaskData, togglePopover } = usePopoverStore();

  const getPriorityColor = (p: Priority) => {
    switch (p) {
      case Priority.HIGH: return 'bg-rose-500'; // Solid Red/Pink for High
      case Priority.MEDIUM: return 'bg-amber-500'; // Solid Orange for Medium
      case Priority.LOW: return 'bg-emerald-500'; // Solid Green for Low
      default: return 'bg-slate-300';
    }
  };

  return (
    <Card
      onClick={() => {
        setTaskData({ ...task });
        togglePopover('edit-task', { ...task });
      }}
      className="group relative flex flex-col justify-between p-5 hover:cursor-pointer hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(124,58,237,0.12)] transition-all duration-300 min-h-[160px]"
    >
      {/* Col/Row Preview: Left Border Color Bar */}
      <div className={`absolute left-0 top-6 bottom-6 w-1.5 rounded-r-full ${getPriorityColor(task.priority)}`}></div>

      {/* Row 1: Header (Title & Date vs Checkbox) */}
      <div className="flex justify-between items-start pl-3">
        {/* Col 1: Text Content */}
        <div className="space-y-2 pr-4">
          <h4 className={`text-lg font-bold text-slate-800 leading-tight group-hover:text-violet-700 transition-colors ${task.completed ? 'line-through opacity-40' : ''}`}>
            {task.title}
          </h4>
          <div className="flex items-center gap-2 text-slate-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            <span className="text-xs font-semibold uppercase tracking-wide">{task.dueDate}</span>
          </div>
        </div>

        {/* Col 2: Checkbox Circle */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
          className={`shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
            task.completed 
              ? 'bg-violet-600 border-violet-600 shadow-md shadow-violet-200' 
              : 'border-slate-200 hover:border-violet-400 bg-white'
          }`}
        >
          {task.completed && (
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
          )}
        </button>
      </div>

      {/* Row 2: Footer (Avatars vs Priority Button) */}
      <div className="flex items-end justify-between pl-3 mt-4">
        {/* Col 1: Avatars */}
        <div className="flex -space-x-2 overflow-hidden py-1">
          {task.assignees?.map((person, index) => (
            <img
              key={person.id || index}
              className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
              src={person.avatar}
              alt={person.name}
            />
          ))}
        </div>

        {/* Col 2: Priority Button (Fixed: Solid Background, White Text) */}
        <div className={`px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest text-black shadow-sm ${getPriorityColor(task.priority)}`}>
          {task.priority}
        </div>
      </div>
    </Card>
  );
};