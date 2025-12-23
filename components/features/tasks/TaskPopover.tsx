import { usePopoverStore } from '@/lib/usePopoverStore';
import { useTaskStore } from '@/lib/useTaskStore';
import { Priority, Task } from '@/types';
import React, { useState } from 'react';
import { BiAlignLeft, BiCalendar, BiCheck, BiTag, BiX, BiUserPlus } from 'react-icons/bi';
import { FaLayerGroup } from 'react-icons/fa';
import { GiSprint } from 'react-icons/gi';

const TaskPopover = () => {
  const { isOpen, taskData, setTaskData, closePopover } = usePopoverStore();
  const { addTask, updateTask } = useTaskStore();

  const [newName, setNewName] = useState('');
  const [newAvatar, setNewAvatar] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!taskData.title) return;

    if (taskData.id) {
      // Logic for Update
      updateTask(taskData as Task);
    } else {
      // Logic for Create New
      const newTask: Task = {
        id: Date.now().toString(),
        title: taskData.title || '',
        description: taskData.description || '',
        category: taskData.category || 'Work',
        dueDate: taskData.dueDate || 'No date',
        priority: taskData.priority || Priority.LOW,
        completed: false,
        assignees: taskData.assignees || []
      };
      addTask(newTask);
    }

    closePopover();
  };

  const handleAddAssignee = () => {
    if (!newName.trim() || !newAvatar.trim()) return;
    const newPerson = {
      id: Math.random().toString(36).substr(2, 9),
      name: newName,
      avatar: newAvatar,
      isOnline: true
    };
    setTaskData({ assignees: [...(taskData.assignees || []), newPerson] });
    setNewName('');
    setNewAvatar('');
  };

  const removeAssignee = (id: string) => {
    setTaskData({ assignees: (taskData.assignees || []).filter(a => a.id !== id) });
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="w-full max-w-2xl bg-white/90 backdrop-blur-xl shadow-2xl shadow-violet-500/20 border border-white/20 rounded-[2rem] overflow-hidden animate-in zoom-in-95 scale-95 duration-200">
        <div className="flex items-center justify-between p-8 pb-4">
          <h2 className="text-lg font-semibold text-slate-700 tracking-tight">
            {taskData.id ? 'Edit Task' : 'Create New Task'}
          </h2>
          <button type="button" onClick={closePopover} className="p-2 hover:bg-slate-100 text-slate-400 rounded-full transition-colors">
            <BiX size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest">
              <GiSprint size={14} /> Title
            </div>
            <input
              required
              type="text"
              placeholder="Task Title"
              value={taskData.title || ''}
              onChange={(e) => setTaskData({ title: e.target.value })}
              className="w-full text-lg font-medium text-slate-900 py-2 px-4 bg-slate-50/50 rounded-2xl border border-transparent focus:bg-white focus:border-violet-200 focus:ring-4 focus:ring-violet-500/5 outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest">
              <BiAlignLeft size={14} /> Description
            </div>
            <textarea
              placeholder="Details..."
              value={taskData.description || ''}
              onChange={(e) => setTaskData({ description: e.target.value })}
              className="w-full min-h-[80px] p-4 bg-slate-50/50 rounded-2xl border border-transparent focus:bg-white focus:border-violet-200 outline-none transition-all text-slate-600 text-sm resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                <BiCalendar size={14} /> Due Date
              </div>
              <input
                type="text"
                placeholder="Today, Tomorrow..."
                value={taskData.dueDate || ''}
                onChange={(e) => setTaskData({ dueDate: e.target.value })}
                className="w-full p-4 bg-slate-50/50 rounded-2xl border border-transparent focus:bg-white outline-none transition-all font-semibold text-slate-800 text-sm"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                <BiTag size={14} /> Category
              </div>
              <select
                value={taskData.category || 'Work'}
                onChange={(e) => setTaskData({ category: e.target.value })}
                className="w-full p-4 bg-slate-50/50 rounded-2xl border border-transparent focus:bg-white outline-none transition-all font-semibold text-slate-800 text-sm appearance-none cursor-pointer"
              >
                <option>Work</option>
                <option>Personal</option>
                <option>Design</option>
                <option>Development</option>
              </select>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest">
              <BiUserPlus size={14} /> Assignees
            </div>
            <div className="flex flex-wrap gap-2 mb-2">
              {taskData.assignees?.map((person) => (
                <div key={person.id} className="group relative">
                  <img src={person.avatar} className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover" />
                  <button type="button" onClick={() => removeAssignee(person.id)} className="absolute -top-1 -right-1 bg-rose-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"><BiX size={12} /></button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input type="text" placeholder="Name" value={newName} onChange={(e) => setNewName(e.target.value)} className="flex-[2] text-xs p-3 bg-slate-50/50 rounded-xl outline-none" />
              <input type="text" placeholder="Avatar URL" value={newAvatar} onChange={(e) => setNewAvatar(e.target.value)} className="flex-[3] text-xs p-3 bg-slate-50/50 rounded-xl outline-none" />
              <button type="button" onClick={handleAddAssignee} className="bg-slate-100 p-3 rounded-xl hover:text-violet-600 transition-colors"><BiUserPlus size={20} /></button>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest">
              <FaLayerGroup size={14} /> Priority
            </div>
            <div className="flex gap-3">
              {(['LOW', 'MEDIUM', 'HIGH'] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setTaskData({ priority: p as Priority })}
                  className={`flex-1 py-3 rounded-xl text-xs font-bold border-2 transition-all ${taskData.priority === p ? 'border-violet-600 bg-violet-50 text-violet-600' : 'bg-white border-slate-100 text-slate-400 hover:border-violet-200'
                    }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-4 pt-2">
            <button type="button" onClick={closePopover} className="flex-1 py-4 text-slate-500 font-bold rounded-2xl hover:bg-slate-100 transition-colors">Cancel</button>
            <button type="submit" className="flex-1 flex items-center justify-center gap-2 py-4 bg-violet-600 text-white font-black rounded-2xl shadow-xl shadow-violet-200 hover:bg-violet-700 transition-all">
              {taskData.id ? 'Update Task' : 'Create Task'} <BiCheck size={20} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskPopover;