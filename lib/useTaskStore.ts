import { create } from 'zustand';
import { Task } from '../types';
import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

interface TaskState {
  tasks: Task[];
  currentUser: string | null;
  setCurrentUser: (name: string) => void;
  fetchTasks: () => Promise<void>;
  addTask: (task: Task) => Promise<void>;
  updateTask: (updatedTask: Task) => void;
  toggleTask: (id: string) => Promise<void>;
  removeTask: (id: string) => Promise<void>;
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  currentUser: localStorage.getItem('task_master_user') || null,

  setCurrentUser: (name: string) => {
    localStorage.setItem('task_master_user', name);
    set({ currentUser: name });
  },

  fetchTasks: async () => {
    const user = get().currentUser;
    if (!user) {
        console.warn("fetchTasks called but no user is logged in.");
        return;
    }

    console.log(`Fetching tasks for user: ${user}`); // DEBUG LOG

    try {
      // 1. Send User Name in Headers
      const response = await axios.get(`${API_BASE}/tasks`, {
        headers: { 'x-user-id': user }
      });
      
      console.log("Tasks received:", response.data); // DEBUG LOG
      set({ tasks: response.data });
    } catch (error) {
      console.error("Fetch error:", error);
    }
  },

  addTask: async (task) => {
    const user = get().currentUser;
    if (!user) return;

    // Optimistic update
    set((state) => ({ tasks: [task, ...state.tasks] }));
    
    try {
      await axios.post(`${API_BASE}/new-task`, { task }, {
        headers: { 'x-user-id': user }
      });
    } catch (error) { console.error(error); }
  },

  updateTask: (updatedTask) => {
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)),
    }));
  },

  toggleTask: async (id) => {
    const user = get().currentUser;
    const task = get().tasks.find(t => t.id === id);
    if (!task || !user) return;

    set((state) => ({
      tasks: state.tasks.map((t) => t.id === id ? { ...t, completed: !t.completed } : t),
    }));

    try {
      await axios.put(`${API_BASE}/tasks/${id}`, 
        { completed: !task.completed },
        { headers: { 'x-user-id': user } }
      );
    } catch (error) { console.error(error); }
  },

  removeTask: async (id) => {
    const user = get().currentUser;
    if (!user) return;

    set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) }));

    try {
      await axios.delete(`${API_BASE}/tasks/${id}`, {
        headers: { 'x-user-id': user }
      });
    } catch (error) { console.error(error); }
  },
}));