import { Task, Memo } from '../types';

export const COLLABORATORS = [
  { id: '1', name: 'Alex Rivers', avatar: 'https://picsum.photos/seed/1/100', isOnline: true },
  { id: '2', name: 'Sarah Chen', avatar: 'https://picsum.photos/seed/2/100', isOnline: true },
];

export const MOCK_MEMOS: Memo[] = [
  { id: 'm1', content: 'Remember to pick up the prototype on Wednesday.', color: 'bg-yellow-100' },
  { id: 'm2', content: 'The client liked the new violet color scheme!', color: 'bg-blue-100' },
  { id: 'm3', content: 'Project deadline shifted to Sept 15.', color: 'bg-green-100' }
];