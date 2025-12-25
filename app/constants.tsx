
import React from 'react';
import { Priority, Task, Memo } from '../types';

export const AVATAR_OPTIONS = Array.from({ length: 100 }, (_, index) => ({
  id: String(index + 1),
  avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${index + 1}`,
}));

export const MOCK_MEMOS: Memo[] = [
  { id: 'm1', content: 'Remember to pick up the prototype on Wednesday.', color: 'bg-yellow-100' },
  { id: 'm2', content: 'The client liked the new violet color scheme!', color: 'bg-blue-100' },
  { id: 'm3', content: 'Project deadline shifted to Sept 15.', color: 'bg-green-100' }
];
