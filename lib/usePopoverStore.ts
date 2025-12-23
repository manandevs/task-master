import { Task } from '@/types';
import { create } from 'zustand';

interface PopoverState {
  isOpen: boolean;
  anchorId: string | null;
  taskData: Partial<Task>;
  openPopover: (id: string, taskData?: Partial<Task>) => void;
  closePopover: () => void;
  togglePopover: (id: string, taskData?: Partial<Task>) => void;
  setTaskData: (data: Partial<Task>) => void;
}

export const usePopoverStore = create<PopoverState>((set) => ({
  isOpen: false,
  anchorId: null,
  taskData: {},
  openPopover: (id, taskData = {}) => set({ isOpen: true, anchorId: id, taskData }),
  closePopover: () => set({ isOpen: false, anchorId: null, taskData: {} }),
  togglePopover: (id, taskData = {}) =>
    set((state) => ({
      isOpen: state.anchorId === id ? !state.isOpen : true,
      anchorId: id,
      taskData
    })),
  setTaskData: (data) => set((state) => ({ 
    taskData: { ...state.taskData, ...data } 
  })),
}));