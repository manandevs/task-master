// lib/useTaskStore.ts
import { create } from 'zustand';
import { Task } from '../types';

interface TaskState {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (updatedTask: Task) => void;
  toggleTask: (id: string) => void;
  removeTask: (id: string) => void; // Add this line
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  addTask: (task) => set((state) => ({ tasks: [task, ...state.tasks] })),
  updateTask: (updatedTask) => set((state) => ({
    tasks: state.tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)),
  })),
  toggleTask: (id) => set((state) => ({
    tasks: state.tasks.map((t) => t.id === id ? { ...t, completed: !t.completed } : t),
  })),
  // Add this block
  removeTask: (id) => set((state) => ({
    tasks: state.tasks.filter((t) => t.id !== id),
  })),
}));