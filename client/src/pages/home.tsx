import { useState, useCallback, useMemo } from 'react';
import { Search, ChevronDown } from 'lucide-react';

interface Entry {
  id: string;
  title: string;
  personName: string;
  role: string;
  category: 'Students' | 'Professionals' | 'Builders';
  artifactType: 'polaroid' | 'envelope' | 'indexCard';
  notionUrl: string;
  date: string;
}

const ENTRIES: Entry[] = [
  { id: "1", title: "The Modern Student's Ledger", personName: "Alex Rivera", role: "Graduate Student", category: "Students", artifactType: "polaroid", notionUrl: "#", date: "2024-03-20" },
  { id: "2", title: "Scaling Beyond the Code", personName: "Sarah Chen", role: "Software Architect", category: "Builders", artifactType: "envelope", notionUrl: "#", date: "2024-03-18" },
  { id: "3", title: "Corporate pivots and silent wins", personName: "Marcus Thorne", role: "Product Director", category: "Professionals", artifactType: "indexCard", notionUrl: "#", date: "2024-03-15" },
  { id: "4", title: "Building the future of EntryOne", personName: "Liam Vance", role: "Fullstack Builder", category: "Builders", artifactType: "polaroid", notionUrl: "#", date: "2024-03-10" },
  { id: "5", title: "The Professional's Quiet Morning", personName: "Elena Rossi", role: "Architect", category: "Professionals", artifactType: "envelope", notionUrl: "#", date: "2024-03-05" },
  { id: "6", title: "Campus Beginnings", personName: "Jamie Smith", role: "Undergrad", category: "Students", artifactType: "indexCard", notionUrl: "#", date: "2024-03-01" },
];

const NAV_ITEMS = ['About', 'Blog', 'Mission', 'Contribute'] as const;
type NavType = typeof NAV_ITEMS[number];

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeNav, setActiveNav] = useState<NavType>('About');
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredEntries = useMemo(() => {
    const base = ENTRIES.filter(e => 
      (filter === 'all' || e.category === filter) &&
      (e.title.toLowerCase().includes(searchQuery.toLowerCase()) || e.personName.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    return [...base].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [searchQuery, filter]);

  const handleOpen = () => {
    setIsOpen(true);
    setActiveNav('About');
  };

  return (
    <div className="stage-container">
      <div className={`journal-container ${isOpen ? 'opened' : ''}`}>
        
        {/* Left Page: Navigation & Branding */}
        <div className="page page-left p-8 md:p-12 flex flex-col bg-white">
          <header className="mb-8 md:mb-12">
            <h2 className="logo-text text-3xl mb-8 md:mb-12">entry one</h2>
            <nav className="flex flex-row md:flex-col gap-4 md:gap-6 overflow-x-auto md:overflow-visible pb-4 md:pb-0 scrollbar-none">
              {NAV_ITEMS.map(item => (
                <button 
                  key={item}
                  onClick={() => setActiveNav(item)}
                  className={`nav-item text-left whitespace-nowrap ${activeNav === item ? 'active' : ''}`}
                >
                  {item}
                </button>
              ))}
            </nav>
          </header>

          <div className="mt-auto hidden md:block opacity-40">
            <p className="text-[10px] uppercase tracking-widest leading-relaxed">
              Tactile archives for digital pioneers.
              <br />Built for those who begin.
            </p>
          </div>
        </div>

        {/* Right Page: Dynamic Content Area */}
        <div className="page page-right p-8 md:p-12 overflow-y-auto custom-scrollbar bg-white">
          <div className="animate-content min-h-full">
            {activeNav === 'About' && (
              <div className="max-w-xs mx-auto py-10">
                <h3 className="text-3xl mb-6 font-serif italic text-center">the beginning.</h3>
                <p className="text-sm text-black/70 leading-relaxed mb-6 text-center">
                  EntryOne is a spatial archive for the moments that define us. We bridge the gap between digital convenience and tactile memory.
                </p>
                <div className="w-12 h-px bg-black/10 mx-auto mb-6" />
                <p className="text-[12px] text-black/50 text-center uppercase tracking-widest font-medium">
                  curated space. preserved stories.
                </p>
                <button 
                  onClick={() => setActiveNav('Blog')}
                  className="mt-12 w-full py-3 bg-black text-white text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-black/90 transition-all"
                >
                  Explore the Archive
                </button>
              </div>
            )}

            {activeNav === 'Blog' && (
              <div className="space-y-10">
                <header className="flex flex-col gap-6">
                  <div className="flex items-center justify-between border-b border-black/5 pb-4">
                    <h3 className="text-xl font-serif italic">recent entries.</h3>
                    <div className="flex gap-4">
                      <select 
                        className="text-[9px] uppercase tracking-widest font-bold bg-transparent outline-none opacity-50 hover:opacity-100 transition-opacity"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                      >
                        <option value="all">Everyone</option>
                        <option value="Students">Students</option>
                        <option value="Professionals">Professionals</option>
                        <option value="Builders">Builders</option>
                      </select>
                    </div>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 text-black/20" />
                    <input 
                      type="text" 
                      placeholder="Search archive..."
                      className="w-full bg-transparent border-b border-black/5 py-2 pl-5 text-[12px] focus:outline-none focus:border-black/10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </header>

                <div className="grid grid-cols-1 gap-12">
                  {filteredEntries.map((entry, idx) => (
                    <div key={entry.id} className={`flex gap-6 group animate-content stagger-${(idx % 4) + 1}`}>
                      <div className="w-24 h-24 shrink-0 overflow-hidden rounded-sm">
                        {entry.artifactType === 'polaroid' && (
                          <div className="artifact-polaroid h-full scale-75 origin-top-left">
                            <div className="w-full aspect-square bg-[#eee]" />
                          </div>
                        )}
                        {entry.artifactType === 'envelope' && (
                          <div className="artifact-envelope scale-75 origin-top-left h-full">
                            <div className="envelope-flap" />
                            <div className="seal" />
                          </div>
                        )}
                        {entry.artifactType === 'indexCard' && (
                          <div className="artifact-indexcard scale-75 origin-top-left h-full" />
                        )}
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="category-label">{entry.category}</span>
                          <span className="text-[9px] text-black/30 font-mono">{entry.date}</span>
                        </div>
                        <h4 className="text-[14px] font-medium leading-tight group-hover:underline">{entry.title}</h4>
                        <p className="text-[11px] text-black/50">{entry.personName} — {entry.role}</p>
                        <a href={entry.notionUrl} className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest pt-1">
                          Read Full ↗
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeNav === 'Mission' && (
              <div className="max-w-xs mx-auto py-10 text-center">
                <h3 className="text-2xl mb-6 font-serif italic">our mission.</h3>
                <p className="text-sm text-black/60 leading-relaxed">
                  To provide a sanctuary for digital pioneers to document their journey. We believe every pivot is a milestone and every beginning is a legacy.
                </p>
              </div>
            )}

            {activeNav === 'Contribute' && (
              <div className="max-w-xs mx-auto py-10 text-center">
                <h3 className="text-2xl mb-6 font-serif italic">contribute.</h3>
                <p className="text-sm text-black/60 leading-relaxed mb-8">
                  Do you have a story that belongs in the archive? We accept entries from students, builders, and professionals worldwide.
                </p>
                <button className="px-6 py-2 border border-black/10 text-[10px] uppercase tracking-widest font-bold hover:bg-black hover:text-white transition-all">
                  Get in Touch
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="book-fold" />

        {/* Closed Cover Overlay */}
        <div 
          className={`journal-cover journal-cover-wrapper ${isOpen ? 'opened' : ''}`}
          onClick={handleOpen}
        >
          <div className="journal-spine absolute left-0 top-0 bottom-0 w-10 rounded-l-lg" />
          <div className="journal-cover-content">
            <h1 className="logo-text text-5xl md:text-6xl text-white/90 mb-4">entry one</h1>
            <p className="text-[9px] md:text-[10px] tracking-[0.4em] uppercase text-white/40 mb-16 md:mb-20 font-light">Archive of Beginnings</p>
            <div className="w-12 h-px bg-white/20 mb-8" />
            <button className="text-[11px] uppercase tracking-widest text-white/80 font-medium hover:text-white transition-colors">
              Enter the Archive
            </button>
          </div>
          <div className="elastic-band absolute right-8 top-0 bottom-0 w-3 rounded-full" />
          <div className="bookmark-ribbon absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-24 translate-y-12 rounded-b-sm" />
        </div>
      </div>
    </div>
  );
}
