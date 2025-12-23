
import React from 'react';
import { Priority, Task, Memo } from '../types';

export const COLLABORATORS = [
  { id: '1', name: 'Alex Rivers', avatar: 'https://picsum.photos/seed/1/100', isOnline: true },
  { id: '2', name: 'Sarah Chen', avatar: 'https://picsum.photos/seed/2/100', isOnline: true },
  { id: '3', name: 'Jordan Doe', avatar: 'https://picsum.photos/seed/3/100', isOnline: false },
  { id: '4', name: 'Maya Gupta', avatar: 'https://picsum.photos/seed/4/100', isOnline: true },
  { id: '5', name: 'Liam Wilson', avatar: 'https://picsum.photos/seed/5/100', isOnline: false },
];

export const MOCK_TASKS: Task[] = [
  {
    id: 't1',
    title: 'Finalize Design System',
    dueDate: 'Today, 5:00 PM',
    priority: Priority.HIGH,
    completed: false,
  },
  {
    id: 't2',
    title: 'User Interview Synthesis',
    dueDate: 'Tomorrow',
    priority: Priority.MEDIUM,
    completed: true,
  },
  {
    id: 't3',
    title: 'Marketing Copy Review',
    dueDate: 'Friday',
    priority: Priority.LOW,
    completed: false,
  },
  {
    id: 't4',
    title: 'API Performance Audit',
    dueDate: 'Next Week',
    priority: Priority.HIGH,
    completed: false,
  },
  {
    id: 't5',
    title: 'Fix Sidebar Hover State',
    dueDate: 'Today',
    priority: Priority.LOW,
    completed: false,
  }
];

export const MOCK_MEMOS: Memo[] = [
  { id: 'm1', content: 'Remember to pick up the prototype on Wednesday.', color: 'bg-yellow-100' },
  { id: 'm2', content: 'The client liked the new violet color scheme!', color: 'bg-blue-100' },
  { id: 'm3', content: 'Project deadline shifted to Sept 15.', color: 'bg-green-100' }
];
