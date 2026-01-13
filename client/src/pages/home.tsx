import { useState, useCallback, useMemo } from 'react';
import { Search, ChevronDown, ArrowUpRight } from 'lucide-react';

interface Entry {
  id: string;
  title: string;
  personName: string;
  role: string;
  category: 'Beginning' | 'Pivot' | 'Quiet Win';
  artifactType: 'polaroid' | 'envelope' | 'indexCard';
  notionUrl: string;
}

const ENTRIES: Entry[] = [
  { id: "1", title: "The Morning I Decided to Start Over", personName: "Maya Richardson", role: "Ceramicist", category: "Pivot", artifactType: "polaroid", notionUrl: "#" },
  { id: "2", title: "When the First Customer Said Yes", personName: "James Okonkwo", role: "Founder", category: "Beginning", artifactType: "envelope", notionUrl: "#" },
  { id: "3", title: "Learning to Walk Again", personName: "Sofia Andersson", role: "Therapist", category: "Quiet Win", artifactType: "indexCard", notionUrl: "#" },
  { id: "4", title: "The Day I Pressed Publish", personName: "Ethan Park", role: "Writer", category: "Beginning", artifactType: "polaroid", notionUrl: "#" },
];

const NAV_ITEMS = ['Archive', 'About', 'Mission', 'Contribute'] as const;
type NavType = typeof NAV_ITEMS[number];

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeNav, setActiveNav] = useState<NavType>('Archive');
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredEntries = useMemo(() => 
    ENTRIES.filter(e => 
      (filter === 'all' || e.category === filter) &&
      (e.title.toLowerCase().includes(searchQuery.toLowerCase()) || e.personName.toLowerCase().includes(searchQuery.toLowerCase()))
    ), [searchQuery, filter]);

  return (
    <div className="stage-container">
      <div className={`journal-container ${isOpen ? 'opened' : ''}`}>
        
        {/* Left Page: Navigation & Filter */}
        <div className="page-left p-12 flex flex-col">
          <header className="mb-12">
            <h2 className="logo-text text-3xl mb-12">entry one</h2>
            <nav className="flex flex-col gap-6">
              {NAV_ITEMS.map(item => (
                <button 
                  key={item}
                  onClick={() => setActiveNav(item)}
                  className={`nav-item text-left ${activeNav === item ? 'active' : ''}`}
                >
                  {item}
                </button>
              ))}
            </nav>
          </header>

          <div className="mt-auto space-y-8">
            <div className="relative">
              <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-black/20" />
              <input 
                type="text" 
                placeholder="Find a memory..."
                className="w-full bg-transparent border-b border-black/5 py-2 pl-6 text-sm focus:outline-none focus:border-black/20 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <select 
                className="text-[10px] uppercase tracking-widest font-semibold bg-transparent cursor-pointer outline-none opacity-40 hover:opacity-100 transition-opacity"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All Entries</option>
                <option value="Beginning">Beginning</option>
                <option value="Pivot">Pivot</option>
                <option value="Quiet Win">Quiet Win</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right Page: Content Grid */}
        <div className="page-right p-12 overflow-y-auto custom-scrollbar">
          <div className="animate-content">
            {activeNav === 'Archive' ? (
              <div className="grid grid-cols-2 gap-x-8 gap-y-12">
                {filteredEntries.map((entry, idx) => (
                  <div key={entry.id} className={`group animate-content stagger-${(idx % 4) + 1}`}>
                    <div className="aspect-[4/5] mb-4 overflow-hidden rounded-sm">
                      {entry.artifactType === 'polaroid' && (
                        <div className="artifact-polaroid h-full">
                          <div className="w-full aspect-square bg-[#eee] group-hover:bg-[#e8e8e8] transition-colors" />
                        </div>
                      )}
                      {entry.artifactType === 'envelope' && (
                        <div className="artifact-envelope">
                          <div className="envelope-flap" />
                          <div className="seal" />
                        </div>
                      )}
                      {entry.artifactType === 'indexCard' && (
                        <div className="artifact-indexcard h-full" />
                      )}
                    </div>
                    <div className="space-y-1">
                      <span className="category-label">{entry.category}</span>
                      <h3 className="text-sm font-medium pt-2">{entry.title}</h3>
                      <p className="text-[11px] text-black/40">{entry.personName}</p>
                      <a href={entry.notionUrl} className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-tighter pt-2 opacity-0 group-hover:opacity-100 transition-all">
                        Read ↗
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="max-w-xs mx-auto text-center pt-20">
                <h3 className="text-2xl mb-4 font-serif italic">{activeNav}</h3>
                <p className="text-sm text-black/60 leading-relaxed">
                  {activeNav === 'About' && "EntryOne is a spatial archive for the moments that define us. A curated space where beginnings are preserved and celebrated through a modern lens."}
                  {activeNav === 'Mission' && "Our mission is to bridge the gap between digital archives and tactile memories, creating a sanctuary for pivots and quiet wins."}
                  {activeNav === 'Contribute' && "Do you have a beginning worth sharing? Join the collective and submit your story to the archive."}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="book-fold" />

        {/* Closed Cover Overlay */}
        <div 
          className={`journal-cover ${isOpen ? 'opened' : ''}`}
          onClick={() => setIsOpen(true)}
        >
          <div className="journal-spine absolute left-0 top-0 bottom-0 w-10 rounded-l-lg" />
          <div className="journal-cover-content">
            <h1 className="logo-text text-6xl text-white/90 mb-4">entry one</h1>
            <p className="text-[10px] tracking-[0.4em] uppercase text-white/40 mb-20 font-light">Archive of Beginnings</p>
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
