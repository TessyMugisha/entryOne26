import { useState, useCallback } from 'react';
import { Search, ChevronDown, ArrowUpRight } from 'lucide-react';

/*
 * ===========================================
 * ENTRYONE JOURNAL ARCHIVE (v2)
 * ===========================================
 * 
 * HOW TO ADD NEW ENTRIES:
 * -----------------------
 * Add new entry objects to the ENTRIES array below.
 * Each entry must have:
 *   - id: unique string identifier
 *   - title: entry title
 *   - personName: name of the person
 *   - role: their role or context
 *   - category: "Beginning" | "Pivot" | "Quiet Win"
 *   - artifactType: "polaroid" | "envelope" | "indexCard"
 *   - notionUrl: link to full entry
 *   - date: date string
 */

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
  <div className="artifact-polaroid w-full max-w-[140px] mx-auto">
    <div className="bg-[hsl(35,10%,88%)] aspect-square" />
  </div>
);

const ArtifactEnvelope = () => (
  <div className="artifact-envelope w-full max-w-[140px] h-[100px] mx-auto rounded-sm">
    <div className="seal" />
  </div>
);

const ArtifactIndexCard = () => (
  <div className="artifact-indexcard w-full max-w-[160px] h-[100px] mx-auto rounded-sm" />
);

const EntryCard = ({ entry, index }: { entry: Entry; index: number }) => {
  const Artifact = {
    polaroid: ArtifactPolaroid,
    envelope: ArtifactEnvelope,
    indexCard: ArtifactIndexCard,
  }[entry.artifactType];

  return (
    <div 
      className={`opacity-0 animate-fade-in-up stagger-${(index % 6) + 1}`}
      data-testid={`card-entry-${entry.id}`}
    >
      <div className="mb-4">
        <Artifact />
      </div>
      <div className="text-center space-y-2">
        <span className="category-label inline-block">
          {entry.category.toUpperCase()}
        </span>
        <h3 
          className="text-base font-serif leading-snug"
          style={{ fontFamily: 'Playfair Display, serif', color: 'hsl(30 15% 15%)' }}
          data-testid={`text-entry-title-${entry.id}`}
        >
          {entry.title}
        </h3>
        <p 
          className="text-sm"
          style={{ color: 'hsl(30 10% 35%)' }}
          data-testid={`text-entry-person-${entry.id}`}
        >
          {entry.personName}
        </p>
        <p 
          className="text-xs"
          style={{ color: 'hsl(30 8% 50%)' }}
        >
          {entry.role}
        </p>
        <a
          href={entry.notionUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium mt-2 transition-colors"
          style={{ color: 'hsl(30 15% 30%)' }}
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
    }, 900);
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
      <div className="min-h-screen paper-texture flex items-center justify-center p-4">
        <div className="journal-wrapper">
          <div 
            className={`journal-cover-animated ${isAnimating ? 'opening' : ''}`}
          >
            <div 
              className="journal-cover journal-cover-wrapper relative rounded-lg cursor-pointer group"
              style={{ width: '420px', height: '65vh', maxHeight: '680px', minHeight: '500px' }}
              onClick={handleOpenJournal}
              onKeyDown={(e) => e.key === 'Enter' && handleOpenJournal()}
              tabIndex={0}
              role="button"
              aria-label="Open the journal"
              data-testid="button-open-journal"
            >
              <div className="journal-spine absolute left-0 top-0 bottom-0 w-7 rounded-l-lg" />
              
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-10">
                <h1 
                  className="text-4xl sm:text-5xl tracking-wide mb-4"
                  style={{ 
                    fontFamily: 'Playfair Display, serif',
                    color: 'hsl(42 20% 82%)',
                    fontWeight: 500
                  }}
                >
                  EntryOne
                </h1>
                <p 
                  className="text-sm tracking-[0.25em] uppercase mb-16"
                  style={{ 
                    fontFamily: 'Source Sans 3, sans-serif',
                    color: 'hsl(42 15% 55%)',
                    fontWeight: 400
                  }}
                >
                  A Living Archive of Beginnings
                </p>
                
                <button 
                  className="px-8 py-3.5 rounded-sm text-sm font-medium tracking-wide transition-all duration-300 hover:shadow-lg group-hover:scale-[1.02]"
                  style={{ 
                    fontFamily: 'Source Sans 3, sans-serif',
                    background: 'hsl(42 25% 92%)',
                    color: 'hsl(30 15% 20%)'
                  }}
                  data-testid="button-open-journal-cta"
                >
                  Open the Journal
                </button>
              </div>
              
              <div className="elastic-band absolute right-5 top-0 bottom-0 w-3.5 rounded-full" />
              <div className="bookmark-ribbon absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-20 translate-y-10 rounded-b-sm" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen paper-texture archive-reveal ${isJournalOpen ? 'visible' : ''}`}>
      <div className="flex flex-col md:flex-row min-h-screen">
        <nav className="md:hidden overflow-x-auto border-b" style={{ borderColor: 'hsl(35 12% 85%)' }}>
          <div className="flex whitespace-nowrap px-4 py-2">
            {NAV_ITEMS.map((item) => (
              <button
                key={item}
                onClick={() => setActiveNav(item)}
                className={`index-nav-item border-l-0 border-b-2 ${activeNav === item ? 'active border-b-[hsl(30,15%,25%)]' : 'border-b-transparent'}`}
                data-testid={`nav-${item.toLowerCase()}`}
              >
                {item}
              </button>
            ))}
          </div>
        </nav>

        <aside className="hidden md:block w-48 shrink-0 border-r pt-12" style={{ borderColor: 'hsl(35 12% 85%)' }}>
          <div className="sticky top-12">
            <h2 
              className="px-6 mb-6 text-xl"
              style={{ fontFamily: 'Playfair Display, serif', color: 'hsl(30 15% 20%)' }}
            >
              EntryOne
            </h2>
            <nav className="space-y-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveNav(item)}
                  className={`index-nav-item block w-full text-left ${activeNav === item ? 'active' : ''}`}
                  data-testid={`nav-${item.toLowerCase()}`}
                >
                  {item}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        <main className="flex-1 py-10 px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            {activeNav === 'Archive' && (
              <>
                <header className="mb-10">
                  <h1 
                    className="text-3xl mb-2"
                    style={{ fontFamily: 'Playfair Display, serif', color: 'hsl(30 15% 15%)' }}
                  >
                    Archive
                  </h1>
                  <p style={{ color: 'hsl(30 10% 45%)', fontFamily: 'Source Sans 3, sans-serif' }}>
                    Stories of beginnings, pivots, and quiet wins.
                  </p>
                </header>

                <div className="flex flex-col sm:flex-row gap-3 mb-10">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'hsl(30 10% 50%)' }} />
                    <input
                      type="search"
                      placeholder="Search entries..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border rounded text-sm focus:outline-none focus:ring-2"
                      style={{ 
                        fontFamily: 'Source Sans 3, sans-serif',
                        background: 'hsl(44 28% 96%)',
                        borderColor: 'hsl(35 12% 82%)',
                        color: 'hsl(30 15% 20%)'
                      }}
                      data-testid="input-search"
                    />
                  </div>
                  <div className="relative">
                    <select
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                      className="appearance-none w-full sm:w-44 px-4 py-2.5 pr-10 border rounded text-sm focus:outline-none focus:ring-2 cursor-pointer"
                      style={{ 
                        fontFamily: 'Source Sans 3, sans-serif',
                        background: 'hsl(44 28% 96%)',
                        borderColor: 'hsl(35 12% 82%)',
                        color: 'hsl(30 15% 20%)'
                      }}
                      data-testid="select-category-filter"
                    >
                      <option value="all">All Categories</option>
                      <option value="Beginning">Beginning</option>
                      <option value="Pivot">Pivot</option>
                      <option value="Quiet Win">Quiet Win</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: 'hsl(30 10% 50%)' }} />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 mb-16">
                  {filteredEntries.map((entry, index) => (
                    <EntryCard key={entry.id} entry={entry} index={index} />
                  ))}
                </div>

                <section>
                  <h2 
                    className="text-2xl mb-8"
                    style={{ fontFamily: 'Playfair Display, serif', color: 'hsl(30 15% 15%)' }}
                  >
                    Featured Spread
                  </h2>
                  <div 
                    className="rounded-lg p-8 md:p-12"
                    style={{ background: 'hsl(44 25% 93%)', border: '1px solid hsl(35 12% 85%)' }}
                  >
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                      <div className="text-center">
                        <p 
                          className="text-[10px] tracking-[0.2em] uppercase mb-6"
                          style={{ color: 'hsl(30 10% 45%)', fontFamily: 'Source Sans 3, sans-serif' }}
                        >
                          Letter to Your Future Self
                        </p>
                        <div className="artifact-envelope w-44 h-32 mx-auto rounded-sm">
                          <div className="seal" />
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <p 
                          className="text-[10px] tracking-[0.2em] uppercase mb-6"
                          style={{ color: 'hsl(30 10% 45%)', fontFamily: 'Source Sans 3, sans-serif' }}
                        >
                          Polaroid Picture of Yourself at the Moment
                        </p>
                        <div className="artifact-polaroid w-36 mx-auto" style={{ transform: 'rotate(2deg)' }}>
                          <div className="bg-[hsl(35,10%,85%)] aspect-square" />
                        </div>
                        <p 
                          className="handwritten text-sm mt-4"
                          style={{ color: 'hsl(30 12% 40%)' }}
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
                  className="text-3xl mb-6"
                  style={{ fontFamily: 'Playfair Display, serif', color: 'hsl(30 15% 15%)' }}
                >
                  About EntryOne
                </h1>
                <p 
                  className="leading-relaxed mb-4"
                  style={{ color: 'hsl(30 10% 30%)', fontFamily: 'Source Sans 3, sans-serif' }}
                >
                  EntryOne is a living archive dedicated to capturing the moments that mark new chapters in people's lives. We believe that every beginning, no matter how small, deserves to be documented and celebrated.
                </p>
                <p 
                  className="leading-relaxed"
                  style={{ color: 'hsl(30 10% 30%)', fontFamily: 'Source Sans 3, sans-serif' }}
                >
                  Through personal narratives and reflections, we create a tapestry of human experience—one entry at a time.
                </p>
              </div>
            )}

            {activeNav === 'Mission' && (
              <div className="max-w-xl opacity-0 animate-fade-in-up">
                <h1 
                  className="text-3xl mb-6"
                  style={{ fontFamily: 'Playfair Display, serif', color: 'hsl(30 15% 15%)' }}
                >
                  Our Mission
                </h1>
                <p 
                  className="leading-relaxed mb-4"
                  style={{ color: 'hsl(30 10% 30%)', fontFamily: 'Source Sans 3, sans-serif' }}
                >
                  To collect and preserve the stories of beginnings—those pivotal moments when someone chose to start anew, pivot directions, or celebrate a quiet personal victory.
                </p>
                <p 
                  className="leading-relaxed"
                  style={{ color: 'hsl(30 10% 30%)', fontFamily: 'Source Sans 3, sans-serif' }}
                >
                  We aim to inspire others by showing that every journey starts with a single, brave step forward.
                </p>
              </div>
            )}

            {activeNav === 'Contribute' && (
              <div className="max-w-xl opacity-0 animate-fade-in-up">
                <h1 
                  className="text-3xl mb-6"
                  style={{ fontFamily: 'Playfair Display, serif', color: 'hsl(30 15% 15%)' }}
                >
                  Share Your Entry
                </h1>
                <p 
                  className="leading-relaxed mb-6"
                  style={{ color: 'hsl(30 10% 30%)', fontFamily: 'Source Sans 3, sans-serif' }}
                >
                  Do you have a beginning worth sharing? We'd love to hear your story and add it to our growing archive of human experience.
                </p>
                <button
                  className="px-6 py-3 rounded text-sm font-medium tracking-wide transition-all duration-300 hover:shadow-md"
                  style={{ 
                    fontFamily: 'Source Sans 3, sans-serif',
                    background: 'hsl(30 15% 25%)',
                    color: 'hsl(42 25% 95%)'
                  }}
                  data-testid="button-submit-entry"
                >
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
