import React from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { Greeting } from '../components/features/dashboard/Greeting';
import { TaskCard } from '../components/features/tasks/TaskCard';
import { StickyNotes } from '../components/features/dashboard/StickyNotes';
import { MOCK_MEMOS } from '../lib/data';
import { useTaskStore } from '../lib/useTaskStore';

const App: React.FC = () => {
  const { tasks, toggleTask } = useTaskStore();

  const completedCount = tasks.filter(t => t.completed).length;
  const activeTasks = tasks.filter(t => !t.completed);

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto space-y-12 pb-24">
        <section>
          <Greeting 
            userName="John" 
            taskCount={activeTasks.length} 
            progress={tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0}
          />
        </section>
        
        <section className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-2xl font-bold tracking-tight text-slate-800">Your Tasks</h2>
            <div className="text-sm font-medium text-slate-400">
              {tasks.length} total tasks
            </div>
          </div>
          
          {tasks.length === 0 ? (
            <div className="text-center py-20 bg-white/20 rounded-[2.5rem] border-2 border-dashed border-slate-200">
              <p className="text-slate-400 font-medium">No tasks yet. Use the quick add above!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tasks.map(task => (
                <TaskCard key={task.id} task={task} onToggle={() => toggleTask(task.id)} />
              ))}
            </div>
          )}
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-slate-800 px-2">Memo Board</h2>
          <StickyNotes memos={MOCK_MEMOS} />
        </section>
      </div>
    </MainLayout>
  );
};

export default App;