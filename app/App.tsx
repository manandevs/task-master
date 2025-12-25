import React, { useEffect, useState } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { Greeting } from '../components/features/dashboard/Greeting';
import { TaskCard } from '../components/features/tasks/TaskCard';
import { StickyNotes } from '../components/features/dashboard/StickyNotes';
import { MOCK_MEMOS, AVATAR_OPTIONS } from '../lib/data';
import { useTaskStore } from '../lib/useTaskStore';
import { GiCircleSparks } from 'react-icons/gi';
import { BiGridAlt, BiListUl } from 'react-icons/bi'; // Import icons for the toggle

const App: React.FC = () => {
  const { tasks, toggleTask, fetchTasks, currentUser, setCurrentUser } = useTaskStore();
  const [nameInput, setNameInput] = useState('');
  
  // State for View Mode (Grid vs List)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const [selectedAvatar, setSelectedAvatar] = useState(AVATAR_OPTIONS[0].avatar);

  // Fetch tasks whenever currentUser changes
  useEffect(() => {
    if (currentUser) {
      fetchTasks();
    }
  }, [currentUser, fetchTasks]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (nameInput.trim()) {
      localStorage.setItem('task_master_avatar', selectedAvatar);
      setCurrentUser(nameInput.trim());
    }
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const activeTasks = tasks.filter(t => !t.completed);

  // --- LOGIN SCREEN ---
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-violet-200 text-white text-4xl animate-bounce">
          <GiCircleSparks />
        </div>
        <div className="w-full max-w-md bg-white rounded-[2rem] shadow-xl p-8 space-y-4 border border-slate-100">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-black text-slate-800">Welcome Back</h1>
            <p className="text-slate-400 font-medium">Enter your unique name to access your workspace</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              autoFocus
              type="text"
              placeholder="e.g. johndoe"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200 focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 outline-none transition-all font-semibold text-center text-lg"
            />

            {/* Avatar Selection Grid */}
            <div className="space-y-3">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center">Choose your Avatar</p>
              <div className="flex flex-wrap justify-center gap-3 py-5 h-30 overflow-scroll">
                {AVATAR_OPTIONS.map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => setSelectedAvatar(item.avatar)}
                    className={`relative rounded-full transition-all duration-200 ${selectedAvatar === item.avatar ? 'ring-4 ring-violet-500 ring-offset-2 scale-110' : 'opacity-60 hover:opacity-100 hover:scale-105'}`}
                  >
                    <img 
                      src={item.avatar} 
                      alt="avatar" 
                      className="w-10 h-10 rounded-full object-cover bg-slate-100"
                    />
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-violet-200 hover:shadow-violet-300 transform hover:-translate-y-1"
            >
              Enter Workspace
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- MAIN APP ---
  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto space-y-12 pb-24">
        <section>
          <Greeting 
            userName={currentUser} 
            taskCount={activeTasks.length} 
            progress={tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0}
          />
        </section>
        
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between px-2 gap-4">
            <h2 className="text-2xl font-bold tracking-tight text-slate-800">Your Tasks</h2>
            
            <div className="flex items-center gap-4">
              {/* VIEW TOGGLE BUTTONS */}
              <div className="bg-slate-100 p-1 rounded-lg flex items-center">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-all duration-200 ${viewMode === 'grid' ? 'bg-white text-violet-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                  title="Grid View"
                >
                  <BiGridAlt size={20} />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-all duration-200 ${viewMode === 'list' ? 'bg-white text-violet-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                  title="List View"
                >
                  <BiListUl size={20} />
                </button>
              </div>

              <div className="h-6 w-[1px] bg-slate-200 mx-2 hidden sm:block"></div>

              <div className="text-sm font-medium text-slate-400 hidden sm:block">
                {tasks.length} total
              </div>
              <button 
                onClick={() => { 
                  localStorage.removeItem('task_master_avatar');
                  setCurrentUser(''); 
                  setNameInput(''); 
                }} 
                className="text-xs font-bold text-rose-500 hover:text-rose-600 bg-rose-50 px-3 py-1 rounded-full"
              >
                Logout
              </button>
            </div>
          </div>
          
          {tasks.length === 0 ? (
            <div className="text-center py-20 bg-white/20 rounded-[2.5rem] border-2 border-dashed border-slate-200">
              <p className="text-slate-400 font-medium">No tasks found for <strong>{currentUser}</strong>.</p>
              <p className="text-slate-400 text-sm mt-1">Use the quick add above!</p>
            </div>
          ) : (
            // DYNAMIC GRID CLASS BASED ON VIEWMODE
            <div className={`
              grid gap-6 transition-all duration-300
              ${viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' // Grid: Multiple cols
                : 'grid-cols-1' // List: Single col (Row view)
              }
            `}>
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