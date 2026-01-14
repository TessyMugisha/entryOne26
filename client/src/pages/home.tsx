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
  { id: "1", title: "Entry One: No room for Doubt.", personName: "Mike Manzi", role: "Software Engineer at Capital One", category: "Students", artifactType: "polaroid", notionUrl: "https://www.notion.so/Entry-One-Mike-Manzi-s-Journey-963942d4a3d84fd5a7f76f2f831abb6d", date: "2025-10-11" },
  { id: "2", title: "Entry Two: Just Keep Swimming", personName: "Gaju Gatera", role: "Senior Project Manager at Microsoft", category: "Students", artifactType: "polaroid", notionUrl: "https://www.notion.so/Entry-Two-Gaju-Gatera-s-Journey-877d0b49dc304f59a9e247edf2f86044", date: "2025-10-24" },
  { id: "3", title: "Entry Three: Service Through Curiosity", personName: "Natasha Farris", role: "ServiceNow Admin at American Fidelity", category: "Professionals", artifactType: "polaroid", notionUrl: "https://www.notion.so/Entry-Three-Building-a-Life-Through-Service-and-Curiosity-Natasha-Farris-2d36d2bc5a1880f9bb65d0b7a4ebc528", date: "2025-11-23" },
  { id: "4", title: "Building the future of EntryOne", personName: "Liam Vance", role: "Fullstack Builder", category: "Builders", artifactType: "polaroid", notionUrl: "#", date: "2024-03-10" },
  { id: "5", title: "The Professional's Quiet Morning", personName: "Elena Rossi", role: "Architect", category: "Professionals", artifactType: "envelope", notionUrl: "#", date: "2024-03-05" },
  { id: "6", title: "Campus Beginnings", personName: "Jamie Smith", role: "Undergrad", category: "Students", artifactType: "indexCard", notionUrl: "#", date: "2024-03-01" },
];

const NAV_ITEMS = ['Why This Exists', 'The Blog entries', 'Current Sounds', 'What Guides This Space', 'Leave a note'] as const;
type NavType = typeof NAV_ITEMS[number];

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeNav, setActiveNav] = useState<NavType>('Why This Exists');
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
    setActiveNav('Why This Exists');
  };

  const handleLogoClick = () => {
    setActiveNav('Why This Exists');
  };

  return (
    <div className="stage-container">
      <div className={`journal-container ${isOpen ? 'opened' : ''}`}>
        
        {/* Left Page: Navigation & Branding */}
        <div className="page page-left p-8 md:p-12 flex flex-col bg-white">
          <header className="mb-8 md:mb-12">
            <div onClick={handleLogoClick} className="cursor-pointer">
              <img 
                src="/entryone-logo-dark.png" 
                alt="Entry One" 
                className="logo-image logo-dark h-20 md:h-24 mb-8 md:mb-12"
              />
              <img 
                src="/entryone-logo-white.png" 
                alt="Entry One" 
                className="logo-image logo-light h-20 md:h-24 mb-8 md:mb-12"
              />
            </div>
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
              
              <br />Built for a purpose.
            </p>
          </div>
        </div>

        {/* Right Page: Dynamic Content Area */}
        <div className="page page-right p-8 md:p-12 overflow-y-auto custom-scrollbar bg-white">
          <div className="animate-content min-h-full">
            {activeNav === 'Why This Exists' && (
              <div className="max-w-2xl mx-auto py-4 space-y-8">
                {/* Header with picture */}
                <div className="flex items-start gap-6 mb-8">
                  <div className="flex-1">
                    <h3 className="text-3xl mb-2 font-serif italic">About Entry.One</h3>
                  </div>
                  <div className="shrink-0">
                    <div className="artifact-polaroid">
                      <img 
                        src="/your-photo.jpg" 
                        alt="Tessy" 
                        className="w-32 h-32 object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Personal Story */}
                <div className="space-y-3">
                  <p className="text-sm text-black/70 leading-relaxed">
                    Hi there :)
                    <br />
                    <br/>
                    I created something I needed as a student and soon-to-be graduate navigating one of the most uncertain moments of our time. In the middle of constant change, real stories became grounding — reminders of what's possible, mindset shifters even when the path ahead isn't clear.
                  </p>
                  <p className="text-sm text-black/70 leading-relaxed">
                    Through coffee chats and mentorship conversations, I saw how powerful honest beginnings can be. Entry.One is a living journal and archive built to preserve those moments — creating space for reflection, growth, and thoughtful innovation.
                  </p>
                  <p className="text-sm text-black/70 leading-relaxed italic">
                    This isn't fast content. It's a place to slow down, document the journey, and remember that everyone starts somewhere.
                  </p>
                  
                  {/* Closing Message */}
                  <div className="pt-6 mt-6 border-t border-black/5">
                    <p className="text-sm text-black/60 leading-relaxed">
                      Entry.One is something I'm building slowly and intentionally, alongside my own journey. This project is still unfolding, just like the people it's for. I hope it meets you where you are.
                    </p>
                    <p className="text-sm text-black/50 leading-relaxed mt-4 italic">
                      Thank you for being here at the beginning.
                      <br />
                      <span className="not-italic">Tessy</span>
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeNav === 'The Blog entries' && (
              <div className="space-y-8">
                {/* Storytelling Note */}
                <div className="text-center py-4 px-6 border border-black/5 bg-black/[0.01] rounded-lg">
                  <p className="text-sm text-black/60 leading-relaxed">
                    <span className="inline-block relative">
                      <span className="text-base">✧</span>
                      <span className="absolute text-[8px] -top-1 left-3">˚</span>
                    </span>
                    {" "}For now, these stories live in Notion — a temporary home while we build something more permanent. Click any entry to step into their world.{" "}
                    <span className="inline-block relative">
                      <span className="text-base">✧</span>
                      <span className="absolute text-[8px] -top-1 left-3">˚</span>
                    </span>
                  </p>
                </div>

                {/* Entries '26 - Coming Soon */}
                <div className="space-y-4">
                  <h3 className="text-xl font-serif italic border-b border-black/5 pb-4">entries '26</h3>
                  
                  <div className="flex gap-8 group animate-content opacity-70 hover:opacity-90 transition-opacity">
                    <div className="w-36 h-36 shrink-0 flex items-center justify-center">
                      <div className="artifact-envelope w-full h-full relative">
                        <div className="envelope-flap" />
                        <div className="seal" />
                      </div>
                    </div>
                    <div className="flex-1 space-y-3 flex flex-col justify-center">
                      <div className="space-y-2">
                        <p className="text-base text-black/60 italic">
                          <span className="inline-block relative mr-1">
                            <span className="text-lg">✧</span>
                            <span className="absolute text-[10px] -top-1 left-3">˚</span>
                          </span>
                          Another story is being written...
                        </p>
                        <p className="text-xs text-black/40 uppercase tracking-widest font-medium">
                          Coming Soon
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Entries '25 */}
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-serif italic border-b border-black/5 pb-4">entries '25</h3>
                    
                    {/* Search bar */}
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
                  </div>

                  <div className="grid grid-cols-1 gap-10">
                    {/* First 3 entries - clickable */}
                    {filteredEntries.slice(0, 3).map((entry, idx) => (
                      <a 
                        key={entry.id} 
                        href={entry.notionUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex gap-8 group animate-content cursor-pointer"
                      >
                        <div className="w-36 h-36 shrink-0 overflow-visible flex items-center justify-center transition-transform duration-500 group-hover:scale-105 group-hover:rotate-2">
                          {entry.artifactType === 'polaroid' && (
                            <div className="artifact-polaroid w-full h-full transition-all duration-500 group-hover:rotate-1">
                              {entry.id === "1" ? (
                                <img 
                                  src="/mike.png" 
                                  alt="Mike Manzi"
                                  className="w-full aspect-square object-cover"
                                />
                              ) : entry.id === "2" ? (
                                <img 
                                  src="/gaju.png" 
                                  alt="Gaju Gatera"
                                  className="w-full aspect-square object-cover"
                                />
                              ) : entry.id === "3" ? (
                                <img 
                                  src="/natasha.png" 
                                  alt="Natasha Farris"
                                  className="w-full aspect-square object-cover"
                                />
                              ) : (
                                <div className="w-full aspect-square bg-[#eee]" />
                              )}
                            </div>
                          )}
                          {entry.artifactType === 'envelope' && (
                            <div className="artifact-envelope w-full h-full transition-all duration-500 group-hover:-rotate-2">
                              <div className="envelope-flap" />
                              <div className="seal" />
                            </div>
                          )}
                          {entry.artifactType === 'indexCard' && (
                            <div className="artifact-indexcard w-full h-full transition-all duration-500 group-hover:rotate-1" />
                          )}
                        </div>
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] text-black/30 font-mono">{entry.date}</span>
                          </div>
                          <h4 className="text-base font-medium leading-tight group-hover:underline transition-all">{entry.title}</h4>
                          <p className="text-sm text-black/60">{entry.personName} — {entry.role}</p>
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-black/70 group-hover:text-black transition-colors">
                            Step Inside ↗
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeNav === 'Current Sounds' && (
              <div className="max-w-2xl mx-auto py-10 space-y-8">
                {/* Header */}
                <div className="text-center space-y-3 pb-4">
                  <h3 className="text-3xl font-serif italic">Current Sounds</h3>
                  <p className="text-sm text-black/60 leading-relaxed max-w-md mx-auto">
                    Songs that have been moving us lately. Every person I talk to shares the music that's been with them — this is our collective soundtrack.
                  </p>
                </div>

                {/* Note about the playlist */}
                <div className="text-center py-4 px-6 border border-black/5 bg-black/[0.01] rounded-lg">
                  <p className="text-xs text-black/50 leading-relaxed italic">
                    Press play, let the moment find you
                  </p>
                </div>

                {/* Spotify Embed */}
                <div className="w-full max-w-xl mx-auto">
                  <div className="rounded-lg overflow-hidden border border-black/10 shadow-sm">
                    <iframe 
                      style={{ borderRadius: '12px' }}
                      src="https://open.spotify.com/embed/playlist/4WfYtd7pEW4z9RMDXRaMUZ?utm_source=generator" 
                      width="100%" 
                      height="450" 
                      frameBorder="0" 
                      allowFullScreen 
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Bottom note */}
                <div className="text-center pt-6 space-y-3">
                  <p className="text-xs text-black/50 italic">
                    Updated as new entries come in
                  </p>
                  <a 
                    href="https://open.spotify.com/playlist/4WfYtd7pEW4z9RMDXRaMUZ?si=b6a4715874ac4777"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-black/60 hover:text-black transition-colors"
                  >
                    Open in Spotify
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            )}

            {activeNav === 'What Guides This Space' && (
              <div className="max-w-2xl mx-auto py-10 space-y-10">
                {/* Header */}
                <div className="text-center space-y-2">
                  <h3 className="text-3xl font-serif italic">What Drives This Work</h3>
                  <p className="text-sm text-black/50">The foundation of Entry.One</p>
                </div>

                {/* Mission & Vision Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Mission Card */}
                  <div className="p-6 rounded-lg border border-black/10 bg-black/[0.02] space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">♥</span>
                      <h4 className="text-lg font-semibold">Mission</h4>
                    </div>
                    <p className="text-sm text-black/70 leading-relaxed">
                      To support students and early-career professionals by sharing honest stories of beginnings, resilience, and exploration — helping them find clarity, courage, and belonging in times of uncertainty.
                    </p>
                  </div>

                  {/* Vision Card */}
                  <div className="p-6 rounded-lg border border-black/10 bg-black/[0.02] space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">⊕</span>
                      <h4 className="text-lg font-semibold">Vision</h4>
                    </div>
                    <p className="text-sm text-black/70 leading-relaxed">
                      To build a thoughtful, student-led storytelling and mentorship archive that reminds people of what's possible and encourages growth, innovation, and connection — one entry at a time.
                    </p>
                  </div>
                </div>

                {/* Our Values */}
                <div className="space-y-6">
                  <h4 className="text-2xl font-serif italic text-center">What Guides This Space</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Belonging Card */}
                    <div className="p-6 rounded-lg border border-black/10 bg-black/[0.02] space-y-3 text-center">
                      <div className="flex justify-center mb-2">
                        <span className="text-2xl">♡</span>
                      </div>
                      <h5 className="text-base font-semibold">Belonging</h5>
                      <p className="text-sm text-black/70 leading-relaxed">
                        Every story has a place. Every beginning matters.
                      </p>
                    </div>

                    {/* Resilience Card */}
                    <div className="p-6 rounded-lg border border-black/10 bg-black/[0.02] space-y-3 text-center">
                      <div className="flex justify-center mb-2">
                        <span className="text-2xl">↻</span>
                      </div>
                      <h5 className="text-base font-semibold">Resilience</h5>
                      <p className="text-sm text-black/70 leading-relaxed">
                        Progress over perfection. Learn, adapt, and keep going.
                      </p>
                    </div>

                    {/* Purpose Card */}
                    <div className="p-6 rounded-lg border border-black/10 bg-black/[0.02] space-y-3 text-center">
                      <div className="flex justify-center mb-2">
                        <span className="text-2xl">⊕</span>
                      </div>
                      <h5 className="text-base font-semibold">Purpose</h5>
                      <p className="text-sm text-black/70 leading-relaxed">
                        Build with intention. Share stories that move us forward.
                      </p>
                    </div>

                    {/* Openness Card */}
                    <div className="p-6 rounded-lg border border-black/10 bg-black/[0.02] space-y-3 text-center">
                      <div className="flex justify-center mb-2">
                        <span className="text-2xl">∞</span>
                      </div>
                      <h5 className="text-base font-semibold">Openness</h5>
                      <p className="text-sm text-black/70 leading-relaxed">
                        Not limited by boxes or linear paths. We make room for exploration, change, and becoming.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeNav === 'Leave a note' && (
              <div className="max-w-2xl mx-auto py-10 space-y-12">
                {/* Header */}
                <div className="text-center space-y-3 pb-6">
                  <h3 className="text-4xl font-serif italic">Let's Connect</h3>
                  <p className="text-sm text-black/60 leading-relaxed max-w-md mx-auto">
                    Ideas, suggestions, working together... are welcome here
                  </p>
                </div>

                {/* Main Contact Options - Clean Button Style */}
                <div className="flex flex-col items-center gap-6 max-w-md mx-auto">
                  {/* Questions Button */}
                  <a 
                    href="mailto:tessymugisha@entryone.org?subject=Question about Entry.One"
                    className="group w-full"
                  >
                    <div className="flex items-center gap-4 p-6 rounded-lg border border-black/10 hover:bg-black/[0.04] transition-all">
                      <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-black group-hover:border-black transition-all flex-shrink-0">
                        <svg className="w-5 h-5 text-black/60 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-base font-semibold mb-1">Questions</h4>
                        <p className="text-xs text-black/60 leading-relaxed">
                          Have questions about Entry.One or want to learn more?
                        </p>
                      </div>
                      <svg className="w-4 h-4 text-black/30 group-hover:text-black/60 transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </a>

                  {/* Feedback Button */}
                  <a 
                    href="mailto:tessymugisha@entryone.org?subject=Feedback for Entry.One"
                    className="group w-full"
                  >
                    <div className="flex items-center gap-4 p-6 rounded-lg border border-black/10 hover:bg-black/[0.04] transition-all">
                      <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-black group-hover:border-black transition-all flex-shrink-0">
                        <svg className="w-5 h-5 text-black/60 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-base font-semibold mb-1">Feedback</h4>
                        <p className="text-xs text-black/60 leading-relaxed">
                          Share your thoughts, suggestions, or ideas to help improve this space.
                        </p>
                      </div>
                      <svg className="w-4 h-4 text-black/30 group-hover:text-black/60 transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </a>

                  {/* Collaboration Button */}
                  <a 
                    href="mailto:tessymugisha@entryone.org?subject=Collaboration Inquiry"
                    className="group w-full"
                  >
                    <div className="flex items-center gap-4 p-6 rounded-lg border border-black/10 hover:bg-black/[0.04] transition-all">
                      <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-black group-hover:border-black transition-all flex-shrink-0">
                        <svg className="w-5 h-5 text-black/60 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-base font-semibold mb-1">Collaborate</h4>
                        <p className="text-xs text-black/60 leading-relaxed">
                          Interested in partnering or building something together?
                        </p>
                      </div>
                      <svg className="w-4 h-4 text-black/30 group-hover:text-black/60 transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </a>
                </div>

                {/* Divider with decorative element */}
                <div className="flex items-center justify-center py-6">
                  <div className="flex-1 border-t border-black/5"></div>
                  <span className="px-4 text-xs text-black/30">or</span>
                  <div className="flex-1 border-t border-black/5"></div>
                </div>

                {/* Social Media Section */}
                <div className="text-center space-y-5">
                  <p className="text-sm text-black/60">
                    Connect with Entry.One
                  </p>
                  
                  {/* Social Icons */}
                  <div className="flex justify-center items-center gap-6">
                    <a 
                      href="https://www.instagram.com/entryone1/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group"
                      aria-label="Instagram"
                    >
                      <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-black group-hover:border-black transition-all">
                        <svg className="w-5 h-5 text-black/60 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </div>
                    </a>
                    
                    <a 
                      href="https://www.linkedin.com/company/entryone.org/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group"
                      aria-label="LinkedIn"
                    >
                      <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-black group-hover:border-black transition-all">
                        <svg className="w-5 h-5 text-black/60 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </div>
                    </a>
                    
                    <a 
                      href="https://www.tiktok.com/@entry.one?_r=1&_t=ZP-934pWniFrRO" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group"
                      aria-label="TikTok"
                    >
                      <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-black group-hover:border-black transition-all">
                        <svg className="w-5 h-5 text-black/60 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                        </svg>
                      </div>
                    </a>
                  </div>
                </div>

                {/* Bottom note */}
                <div className="text-center pt-6">
                  <p className="text-xs text-black/50 italic leading-relaxed">
                    I read every message personally and typically respond within 2-3 days.
                  </p>
                </div>
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
            <>
              <img 
                src="/entryone-logo-dark.png" 
                alt="Entry One" 
                className="logo-image logo-dark h-20 md:h-24 mb-6"
              />
              <img 
                src="/entryone-logo-white.png" 
                alt="Entry One" 
                className="logo-image logo-light h-20 md:h-24 mb-6"
              />
            </>
            
            {/* Tagline with better indentation and subtle fade effect */}
            <div className="mb-16 md:mb-20">
              <p className="text-[9px] md:text-[11px] tracking-[0.5em] uppercase text-white/50 font-light ml-2 animate-pulse-subtle">
                Beginnings Belong Here
              </p>
            </div>
            
            {/* Decorative divider with dots */}
            <div className="flex items-center justify-center mb-10 gap-3">
              <div className="w-8 h-px bg-gradient-to-r from-transparent to-white/20" />
              <div className="w-1 h-1 rounded-full bg-white/30" />
              <div className="w-8 h-px bg-gradient-to-l from-transparent to-white/20" />
            </div>
            
            {/* Enter button with underline hover effect */}
            <button className="group relative">
              <span className="text-[11px] uppercase tracking-[0.2em] text-white/70 group-hover:text-white transition-all duration-300">
                Enter the Archive
              </span>
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 group-hover:w-full h-px bg-white/50 transition-all duration-300" />
            </button>
          </div>
          <div className="elastic-band absolute right-8 top-0 bottom-0 w-3 rounded-full" />
          <div className="bookmark-ribbon absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-24 translate-y-12 rounded-b-sm" />
        </div>
      </div>
    </div>
  );
}