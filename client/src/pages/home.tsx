import { useState, useCallback } from 'react';
import { Search, ChevronDown, ExternalLink, Star } from 'lucide-react';

/*
 * ===========================================
 * ENTRYONE JOURNAL ARCHIVE
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
 *   - notionUrl: link to full entry (placeholder for now)
 *   - date: date string
 * 
 * Example:
 * {
 *   id: "7",
 *   title: "The First Line of Code",
 *   personName: "Alex Chen",
 *   role: "Software Engineer",
 *   category: "Beginning",
 *   notionUrl: "https://notion.so/entry-7",
 *   date: "2024-03-15"
 * }
 */

interface Entry {
  id: string;
  title: string;
  personName: string;
  role: string;
  category: 'Beginning' | 'Pivot' | 'Quiet Win';
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
    notionUrl: "https://notion.so/entry-1",
    date: "2024-01-15"
  },
  {
    id: "2",
    title: "When the First Customer Said Yes",
    personName: "James Okonkwo",
    role: "Founder, Greenleaf Provisions",
    category: "Beginning",
    notionUrl: "https://notion.so/entry-2",
    date: "2024-02-08"
  },
  {
    id: "3",
    title: "Learning to Walk Again",
    personName: "Sofia Andersson",
    role: "Marathon Runner & Physical Therapist",
    category: "Quiet Win",
    notionUrl: "https://notion.so/entry-3",
    date: "2024-02-22"
  },
  {
    id: "4",
    title: "The Day I Pressed Publish",
    personName: "Ethan Park",
    role: "Writer & Newsletter Creator",
    category: "Beginning",
    notionUrl: "https://notion.so/entry-4",
    date: "2024-03-05"
  },
  {
    id: "5",
    title: "Closing the Shop, Opening the Studio",
    personName: "Clara Mendez",
    role: "Former Retail Owner, Artist",
    category: "Pivot",
    notionUrl: "https://notion.so/entry-5",
    date: "2024-03-18"
  },
  {
    id: "6",
    title: "The Quiet Morning Before Everything Changed",
    personName: "David Walsh",
    role: "Teacher & Community Organizer",
    category: "Quiet Win",
    notionUrl: "https://notion.so/entry-6",
    date: "2024-04-02"
  }
];

const TABS = ['Archive', 'About', 'Mission', 'Contribute'] as const;

type TabType = typeof TABS[number];

const getCategoryColor = (category: Entry['category']) => {
  switch (category) {
    case 'Beginning':
      return 'bg-[hsl(85,25%,35%)] text-white';
    case 'Pivot':
      return 'bg-[hsl(200,20%,45%)] text-white';
    case 'Quiet Win':
      return 'bg-[hsl(35,30%,55%)] text-white';
    default:
      return 'bg-gray-500 text-white';
  }
};

export default function Home() {
  const [isJournalOpen, setIsJournalOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('Archive');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const handleOpenJournal = useCallback(() => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsJournalOpen(true);
      setIsAnimating(false);
    }, 800);
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
      <div className="min-h-screen bg-[hsl(40,30%,96%)] paper-texture flex items-center justify-center p-4">
        <div className="relative perspective-[2000px]">
          <div 
            className={`journal-open-animation ${isAnimating ? 'opening' : ''}`}
            style={{ perspective: '2000px' }}
          >
            <div 
              className="journal-cover relative w-[320px] h-[460px] sm:w-[380px] sm:h-[540px] rounded-lg cursor-pointer group"
              onClick={handleOpenJournal}
              onKeyDown={(e) => e.key === 'Enter' && handleOpenJournal()}
              tabIndex={0}
              role="button"
              aria-label="Open the journal"
              data-testid="button-open-journal"
            >
              <div className="journal-spine absolute left-0 top-0 bottom-0 w-6 rounded-l-lg" />
              
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
                <h1 
                  className="text-[hsl(45,30%,85%)] text-3xl sm:text-4xl font-serif tracking-wide mb-3"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  EntryOne
                </h1>
                <p 
                  className="text-[hsl(45,20%,60%)] text-sm sm:text-base tracking-widest uppercase"
                  style={{ fontFamily: 'Source Sans 3, sans-serif', letterSpacing: '0.2em' }}
                >
                  A living archive of beginnings
                </p>
                
                <button 
                  className="mt-12 px-6 py-3 bg-[hsl(45,25%,90%)] text-[hsl(30,10%,25%)] rounded-sm text-sm font-medium tracking-wide transition-all duration-300 hover:bg-[hsl(45,30%,95%)] hover:shadow-lg group-hover:scale-105"
                  style={{ fontFamily: 'Source Sans 3, sans-serif' }}
                  data-testid="button-open-journal-cta"
                >
                  Open the Journal
                </button>
              </div>
              
              <div className="elastic-band absolute right-4 top-0 bottom-0 w-3 rounded-full" />
              
              <div className="bookmark-ribbon absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-16 translate-y-8 rounded-b-sm" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[hsl(40,30%,96%)] paper-texture">
      <nav className="pt-6 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-end gap-1 overflow-x-auto pb-0">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`folder-tab px-6 py-3 text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  activeTab === tab 
                    ? 'folder-tab-active bg-[hsl(42,35%,94%)] text-[hsl(30,10%,20%)] z-10' 
                    : 'bg-[hsl(35,20%,85%)] text-[hsl(30,8%,45%)] hover:bg-[hsl(38,25%,88%)]'
                }`}
                style={{ fontFamily: 'Source Sans 3, sans-serif' }}
                data-testid={`tab-${tab.toLowerCase()}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="bg-[hsl(42,35%,94%)] border-t border-[hsl(35,15%,85%)] min-h-[calc(100vh-80px)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8">
          {activeTab === 'Archive' && (
            <div className="animate-fade-in-up" style={{ opacity: 0 }}>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(30,8%,45%)]" />
                  <input
                    type="search"
                    placeholder="Search entries..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-[hsl(35,15%,85%)] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(85,25%,35%)] focus:border-transparent"
                    style={{ fontFamily: 'Source Sans 3, sans-serif' }}
                    data-testid="input-search"
                  />
                </div>
                <div className="relative">
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="appearance-none w-full sm:w-48 px-4 py-3 pr-10 bg-white border border-[hsl(35,15%,85%)] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(85,25%,35%)] focus:border-transparent cursor-pointer"
                    style={{ fontFamily: 'Source Sans 3, sans-serif' }}
                    data-testid="select-category-filter"
                  >
                    <option value="all">All Categories</option>
                    <option value="Beginning">Beginning</option>
                    <option value="Pivot">Pivot</option>
                    <option value="Quiet Win">Quiet Win</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(30,8%,45%)] pointer-events-none" />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
                {filteredEntries.map((entry, index) => (
                  <div 
                    key={entry.id}
                    className={`entry-card rounded-lg p-5 animate-fade-in-up animate-delay-${(index % 5 + 1) * 100}`}
                    style={{ opacity: 0 }}
                    data-testid={`card-entry-${entry.id}`}
                  >
                    <span className={`inline-block px-2 py-1 rounded-sm text-xs font-medium mb-3 ${getCategoryColor(entry.category)}`}>
                      {entry.category}
                    </span>
                    <h3 
                      className="text-lg font-serif text-[hsl(30,10%,20%)] mb-2 leading-snug"
                      style={{ fontFamily: 'Playfair Display, serif' }}
                      data-testid={`text-entry-title-${entry.id}`}
                    >
                      {entry.title}
                    </h3>
                    <p 
                      className="text-sm text-[hsl(30,8%,45%)] mb-1"
                      style={{ fontFamily: 'Source Sans 3, sans-serif' }}
                      data-testid={`text-entry-person-${entry.id}`}
                    >
                      {entry.personName}
                    </p>
                    <p 
                      className="text-xs text-[hsl(30,8%,55%)] mb-4"
                      style={{ fontFamily: 'Source Sans 3, sans-serif' }}
                    >
                      {entry.role}
                    </p>
                    <a
                      href={entry.notionUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-[hsl(85,25%,35%)] font-medium hover:text-[hsl(85,30%,30%)] transition-colors"
                      style={{ fontFamily: 'Source Sans 3, sans-serif' }}
                      data-testid={`link-open-entry-${entry.id}`}
                    >
                      Open Entry
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                ))}
              </div>

              <section className="mb-8">
                <h2 
                  className="text-2xl font-serif text-[hsl(30,10%,20%)] mb-6"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  Featured Spread
                </h2>
                <div className="bg-[hsl(45,25%,92%)] rounded-lg p-6 sm:p-8 border border-[hsl(35,15%,85%)] shadow-sm">
                  <div className="grid sm:grid-cols-2 gap-8 items-start">
                    <div className="space-y-3">
                      <p 
                        className="text-xs text-[hsl(30,8%,45%)] uppercase tracking-widest mb-4"
                        style={{ fontFamily: 'Source Sans 3, sans-serif' }}
                      >
                        letter to your future self
                      </p>
                      <div className="envelope w-48 h-36 rounded-sm shadow-md mx-auto sm:mx-0 relative">
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                          <Star className="w-5 h-5 text-[hsl(45,60%,50%)] fill-[hsl(45,60%,50%)]" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <p 
                        className="text-xs text-[hsl(30,8%,45%)] uppercase tracking-widest mb-4 text-center sm:text-left"
                        style={{ fontFamily: 'Source Sans 3, sans-serif' }}
                      >
                        polaroid picture of yourself at the moment
                      </p>
                      <div className="polaroid w-40 mx-auto sm:mx-0 transform rotate-2">
                        <div className="washi-tape absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-4 rounded-sm" />
                        <div className="bg-[hsl(35,10%,85%)] aspect-square mb-2" />
                        <p 
                          className="text-xs text-[hsl(30,8%,45%)] text-center italic"
                          style={{ fontFamily: 'Source Sans 3, sans-serif' }}
                        >
                          live, create, tell the story
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}

          {activeTab === 'About' && (
            <div className="animate-fade-in-up max-w-2xl" style={{ opacity: 0 }}>
              <h2 
                className="text-3xl font-serif text-[hsl(30,10%,20%)] mb-6"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                About EntryOne
              </h2>
              <p 
                className="text-[hsl(30,8%,35%)] leading-relaxed mb-4"
                style={{ fontFamily: 'Source Sans 3, sans-serif' }}
              >
                EntryOne is a living archive dedicated to capturing the moments that mark new chapters in people's lives. We believe that every beginning, no matter how small, deserves to be documented and celebrated.
              </p>
              <p 
                className="text-[hsl(30,8%,35%)] leading-relaxed"
                style={{ fontFamily: 'Source Sans 3, sans-serif' }}
              >
                Through personal narratives and reflections, we create a tapestry of human experience—one entry at a time.
              </p>
            </div>
          )}

          {activeTab === 'Mission' && (
            <div className="animate-fade-in-up max-w-2xl" style={{ opacity: 0 }}>
              <h2 
                className="text-3xl font-serif text-[hsl(30,10%,20%)] mb-6"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Our Mission
              </h2>
              <p 
                className="text-[hsl(30,8%,35%)] leading-relaxed mb-4"
                style={{ fontFamily: 'Source Sans 3, sans-serif' }}
              >
                To collect and preserve the stories of beginnings—those pivotal moments when someone chose to start anew, pivot directions, or celebrate a quiet personal victory.
              </p>
              <p 
                className="text-[hsl(30,8%,35%)] leading-relaxed"
                style={{ fontFamily: 'Source Sans 3, sans-serif' }}
              >
                We aim to inspire others by showing that every journey starts with a single, brave step forward.
              </p>
            </div>
          )}

          {activeTab === 'Contribute' && (
            <div className="animate-fade-in-up max-w-2xl" style={{ opacity: 0 }}>
              <h2 
                className="text-3xl font-serif text-[hsl(30,10%,20%)] mb-6"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Share Your Entry
              </h2>
              <p 
                className="text-[hsl(30,8%,35%)] leading-relaxed mb-6"
                style={{ fontFamily: 'Source Sans 3, sans-serif' }}
              >
                Do you have a beginning worth sharing? We'd love to hear your story and add it to our growing archive of human experience.
              </p>
              <button
                className="px-6 py-3 bg-[hsl(85,25%,35%)] text-white rounded-md text-sm font-medium tracking-wide transition-all duration-300 hover:bg-[hsl(85,30%,30%)] hover:shadow-lg"
                style={{ fontFamily: 'Source Sans 3, sans-serif' }}
                data-testid="button-submit-entry"
              >
                Submit Your Story
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
