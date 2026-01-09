import { useState, useCallback } from 'react';
import { Search, ChevronDown, ArrowUpRight } from 'lucide-react';

interface Entry {
  id: string;
  title: string;
  personName: string;
  role: string;
  category: 'Beginning' | 'Pivot' | 'Quiet Win';
  artifactType: 'polaroid' | 'envelope' | 'indexCard';
  notionUrl: string;
  date: string;
}

const ENTRIES: Entry[] = [
  {
    id: "1",
    title: "The Morning I Decided to Start Over",
    personName: "Maya Richardson",
    role: "Former Accountant, Now Ceramicist",
    category: "Pivot",
    artifactType: "polaroid",
    notionUrl: "https://notion.so/entry-1",
    date: "2024-01-15"
  },
  {
    id: "2",
    title: "When the First Customer Said Yes",
    personName: "James Okonkwo",
    role: "Founder, Greenleaf Provisions",
    category: "Beginning",
    artifactType: "envelope",
    notionUrl: "https://notion.so/entry-2",
    date: "2024-02-08"
  },
  {
    id: "3",
    title: "Learning to Walk Again",
    personName: "Sofia Andersson",
    role: "Marathon Runner & Physical Therapist",
    category: "Quiet Win",
    artifactType: "indexCard",
    notionUrl: "https://notion.so/entry-3",
    date: "2024-02-22"
  },
  {
    id: "4",
    title: "The Day I Pressed Publish",
    personName: "Ethan Park",
    role: "Writer & Newsletter Creator",
    category: "Beginning",
    artifactType: "polaroid",
    notionUrl: "https://notion.so/entry-4",
    date: "2024-03-05"
  },
  {
    id: "5",
    title: "Closing the Shop, Opening the Studio",
    personName: "Clara Mendez",
    role: "Former Retail Owner, Artist",
    category: "Pivot",
    artifactType: "envelope",
    notionUrl: "https://notion.so/entry-5",
    date: "2024-03-18"
  },
  {
    id: "6",
    title: "The Quiet Morning Before Everything Changed",
    personName: "David Walsh",
    role: "Teacher & Community Organizer",
    category: "Quiet Win",
    artifactType: "indexCard",
    notionUrl: "https://notion.so/entry-6",
    date: "2024-04-02"
  }
];

const NAV_ITEMS = ['Archive', 'About', 'Mission', 'Contribute'] as const;
type NavType = typeof NAV_ITEMS[number];

const ArtifactPolaroid = () => (
  <div className="artifact-polaroid w-full max-w-[130px] mx-auto">
    <div className="bg-gradient-to-b from-[hsl(0,0%,95%)] to-[hsl(0,0%,90%)] aspect-square rounded-sm" />
  </div>
);

const ArtifactEnvelope = () => (
  <div className="artifact-envelope w-full max-w-[130px] h-[90px] mx-auto">
    <div className="seal" />
  </div>
);

const ArtifactIndexCard = () => (
  <div className="artifact-indexcard w-full max-w-[150px] h-[95px] mx-auto" />
);

const EntryCard = ({ entry, index }: { entry: Entry; index: number }) => {
  const Artifact = {
    polaroid: ArtifactPolaroid,
    envelope: ArtifactEnvelope,
    indexCard: ArtifactIndexCard,
  }[entry.artifactType];

  return (
    <div 
      className={`opacity-0 animate-fade-in-up stagger-${(index % 6) + 1} group`}
      data-testid={`card-entry-${entry.id}`}
    >
      <div className="mb-5 transition-transform duration-300 group-hover:scale-[1.02]">
        <Artifact />
      </div>
      <div className="text-center space-y-2">
        <span className="category-label inline-block">
          {entry.category.toUpperCase()}
        </span>
        <h3 
          className="text-[15px] leading-snug font-medium"
          style={{ fontFamily: 'Cormorant Garamond, serif', color: 'hsl(0 0% 8%)' }}
          data-testid={`text-entry-title-${entry.id}`}
        >
          {entry.title}
        </h3>
        <p 
          className="text-[13px]"
          style={{ color: 'hsl(0 0% 35%)' }}
          data-testid={`text-entry-person-${entry.id}`}
        >
          {entry.personName}
        </p>
        <p className="text-[11px]" style={{ color: 'hsl(0 0% 55%)' }}>
          {entry.role}
        </p>
        <a
          href={entry.notionUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[13px] font-medium mt-3 transition-all duration-200 hover:gap-2"
          style={{ color: 'hsl(0 0% 20%)' }}
          data-testid={`link-open-entry-${entry.id}`}
        >
          Open Entry
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};

export default function Home() {
  const [isJournalOpen, setIsJournalOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeNav, setActiveNav] = useState<NavType>('Archive');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const handleOpenJournal = useCallback(() => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsJournalOpen(true);
      setIsAnimating(false);
    }, 1000);
  }, []);

  const filteredEntries = ENTRIES.filter(entry => {
    const matchesSearch = entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.personName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || entry.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  if (!isJournalOpen) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="journal-wrapper">
          <div 
            className={`journal-cover ${isAnimating ? 'opening' : ''} journal-cover-wrapper relative rounded-xl cursor-pointer group`}
            style={{ width: '400px', height: '68vh', maxHeight: '700px', minHeight: '520px' }}
            onClick={handleOpenJournal}
            onKeyDown={(e) => e.key === 'Enter' && handleOpenJournal()}
            tabIndex={0}
            role="button"
            aria-label="Open the journal"
            data-testid="button-open-journal"
          >
            <div className="journal-spine absolute left-0 top-0 bottom-0 w-8 rounded-l-xl" />
            
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-12">
              <h1 
                className="logo-text text-5xl sm:text-6xl mb-3"
                style={{ color: 'rgba(255,255,255,0.9)' }}
              >
                entry one
              </h1>
              <p 
                className="text-[11px] tracking-[0.3em] uppercase mb-20"
                style={{ 
                  fontFamily: 'Inter, sans-serif',
                  color: 'rgba(255,255,255,0.5)',
                  fontWeight: 400
                }}
              >
                A Living Archive of Beginnings
              </p>
              
              <button 
                className="px-8 py-4 rounded-lg text-[13px] font-medium tracking-wide transition-all duration-300 group-hover:shadow-xl group-hover:scale-[1.02]"
                style={{ 
                  fontFamily: 'Inter, sans-serif',
                  background: 'rgba(255,255,255,0.95)',
                  color: 'hsl(0 0% 10%)'
                }}
                data-testid="button-open-journal-cta"
              >
                Open the Journal
              </button>
            </div>
            
            <div className="elastic-band absolute right-6 top-0 bottom-0 w-3 rounded-full" />
            <div className="bookmark-ribbon absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-20 translate-y-12 rounded-b" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-white archive-view ${isJournalOpen ? 'visible' : ''}`}>
      <div className="flex flex-col md:flex-row min-h-screen">
        <nav className="md:hidden overflow-x-auto border-b border-[hsl(0,0%,94%)] bg-white/80 backdrop-blur-lg sticky top-0 z-50">
          <div className="flex whitespace-nowrap px-4 py-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item}
                onClick={() => setActiveNav(item)}
                className={`nav-item border-l-0 border-b-2 px-5 py-3 ${activeNav === item ? 'text-[hsl(0,0%,8%)] border-b-[hsl(0,0%,8%)]' : 'border-b-transparent'}`}
                data-testid={`nav-${item.toLowerCase()}`}
              >
                {item}
              </button>
            ))}
          </div>
        </nav>

        <aside className="hidden md:block w-56 shrink-0 border-r border-[hsl(0,0%,94%)] pt-14 bg-[hsl(0,0%,99%)]">
          <div className="sticky top-14">
            <h2 
              className="logo-text px-6 mb-10 text-3xl"
              style={{ color: 'hsl(0 0% 8%)' }}
            >
              entry one
            </h2>
            <nav className="space-y-1 px-2">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveNav(item)}
                  className={`nav-item block rounded-lg ${activeNav === item ? 'active' : ''}`}
                  data-testid={`nav-${item.toLowerCase()}`}
                >
                  {item}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        <main className="flex-1 py-12 px-6 md:px-14">
          <div className="max-w-4xl mx-auto">
            {activeNav === 'Archive' && (
              <>
                <header className="mb-12">
                  <h1 
                    className="text-4xl mb-3"
                    style={{ fontFamily: 'Cormorant Garamond, serif', color: 'hsl(0 0% 8%)', fontWeight: 500 }}
                  >
                    Archive
                  </h1>
                  <p className="text-[15px]" style={{ color: 'hsl(0 0% 50%)', fontFamily: 'Inter, sans-serif' }}>
                    Stories of beginnings, pivots, and quiet wins.
                  </p>
                </header>

                <div className="flex flex-col sm:flex-row gap-3 mb-12">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'hsl(0 0% 50%)' }} />
                    <input
                      type="search"
                      placeholder="Search entries..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="modern-input w-full pl-11 pr-4"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                      data-testid="input-search"
                    />
                  </div>
                  <div className="relative">
                    <select
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                      className="modern-input appearance-none w-full sm:w-48 pr-10 cursor-pointer"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                      data-testid="select-category-filter"
                    >
                      <option value="all">All Categories</option>
                      <option value="Beginning">Beginning</option>
                      <option value="Pivot">Pivot</option>
                      <option value="Quiet Win">Quiet Win</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: 'hsl(0 0% 50%)' }} />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14 mb-20">
                  {filteredEntries.map((entry, index) => (
                    <EntryCard key={entry.id} entry={entry} index={index} />
                  ))}
                </div>

                <section>
                  <h2 
                    className="text-2xl mb-8"
                    style={{ fontFamily: 'Cormorant Garamond, serif', color: 'hsl(0 0% 8%)', fontWeight: 500 }}
                  >
                    Featured Spread
                  </h2>
                  <div className="glass-card p-8 md:p-14">
                    <div className="grid md:grid-cols-2 gap-14 items-center">
                      <div className="text-center">
                        <p 
                          className="text-[10px] tracking-[0.25em] uppercase mb-8"
                          style={{ color: 'hsl(0 0% 50%)', fontFamily: 'Inter, sans-serif' }}
                        >
                          Letter to Your Future Self
                        </p>
                        <div className="artifact-envelope w-44 h-32 mx-auto">
                          <div className="seal" />
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <p 
                          className="text-[10px] tracking-[0.25em] uppercase mb-8"
                          style={{ color: 'hsl(0 0% 50%)', fontFamily: 'Inter, sans-serif' }}
                        >
                          Polaroid Picture of Yourself
                        </p>
                        <div className="artifact-polaroid w-36 mx-auto" style={{ transform: 'rotate(2deg)' }}>
                          <div className="bg-gradient-to-b from-[hsl(0,0%,95%)] to-[hsl(0,0%,88%)] aspect-square rounded-sm" />
                        </div>
                        <p 
                          className="handwritten text-lg mt-5"
                          style={{ color: 'hsl(0 0% 40%)' }}
                        >
                          live, create, tell the story
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              </>
            )}

            {activeNav === 'About' && (
              <div className="max-w-xl opacity-0 animate-fade-in-up">
                <h1 
                  className="text-4xl mb-8"
                  style={{ fontFamily: 'Cormorant Garamond, serif', color: 'hsl(0 0% 8%)', fontWeight: 500 }}
                >
                  About entry one
                </h1>
                <p 
                  className="text-[15px] leading-relaxed mb-5"
                  style={{ color: 'hsl(0 0% 30%)', fontFamily: 'Inter, sans-serif' }}
                >
                  entry one is a living archive dedicated to capturing the moments that mark new chapters in people's lives. We believe that every beginning, no matter how small, deserves to be documented and celebrated.
                </p>
                <p 
                  className="text-[15px] leading-relaxed"
                  style={{ color: 'hsl(0 0% 30%)', fontFamily: 'Inter, sans-serif' }}
                >
                  Through personal narratives and reflections, we create a tapestry of human experience—one entry at a time.
                </p>
              </div>
            )}

            {activeNav === 'Mission' && (
              <div className="max-w-xl opacity-0 animate-fade-in-up">
                <h1 
                  className="text-4xl mb-8"
                  style={{ fontFamily: 'Cormorant Garamond, serif', color: 'hsl(0 0% 8%)', fontWeight: 500 }}
                >
                  Our Mission
                </h1>
                <p 
                  className="text-[15px] leading-relaxed mb-5"
                  style={{ color: 'hsl(0 0% 30%)', fontFamily: 'Inter, sans-serif' }}
                >
                  To collect and preserve the stories of beginnings—those pivotal moments when someone chose to start anew, pivot directions, or celebrate a quiet personal victory.
                </p>
                <p 
                  className="text-[15px] leading-relaxed"
                  style={{ color: 'hsl(0 0% 30%)', fontFamily: 'Inter, sans-serif' }}
                >
                  We aim to inspire others by showing that every journey starts with a single, brave step forward.
                </p>
              </div>
            )}

            {activeNav === 'Contribute' && (
              <div className="max-w-xl opacity-0 animate-fade-in-up">
                <h1 
                  className="text-4xl mb-8"
                  style={{ fontFamily: 'Cormorant Garamond, serif', color: 'hsl(0 0% 8%)', fontWeight: 500 }}
                >
                  Share Your Entry
                </h1>
                <p 
                  className="text-[15px] leading-relaxed mb-8"
                  style={{ color: 'hsl(0 0% 30%)', fontFamily: 'Inter, sans-serif' }}
                >
                  Do you have a beginning worth sharing? We'd love to hear your story and add it to our growing archive of human experience.
                </p>
                <button className="modern-btn" data-testid="button-submit-entry">
                  Submit Your Story
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
