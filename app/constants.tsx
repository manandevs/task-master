
import React from 'react';
import { Priority, Task, Memo } from '../types';

export const AVATAR_OPTIONS = [
  { id: '1', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=9' },
  { id: '2', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=10' },
  { id: '3', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=11' },
  { id: '4', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=12' },
  { id: '5', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=13' },
  { id: '6', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=14' },
  { id: '7', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=15' },
  { id: '8', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=16' },
  { id: '9', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=1' },
  { id: '10', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=2' },
  { id: '11', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=3' },
  { id: '12', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=4' },
  { id: '13', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=5' },
  { id: '14', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=6' },
  { id: '15', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=7' },
  { id: '16', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=8' },
];

export const MOCK_MEMOS: Memo[] = [
  { id: 'm1', content: 'Remember to pick up the prototype on Wednesday.', color: 'bg-yellow-100' },
  { id: 'm2', content: 'The client liked the new violet color scheme!', color: 'bg-blue-100' },
  { id: 'm3', content: 'Project deadline shifted to Sept 15.', color: 'bg-green-100' }
];
