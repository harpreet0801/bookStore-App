export const CATEGORIES = [
  { id: 'all', name: 'All Categories', icon: 'BookOpen' },
  { id: 'fiction', name: 'Literary Fiction', icon: 'Feather' },
  { id: 'scifi', name: 'Sci-Fi & Fantasy', icon: 'Sparkles' },
  { id: 'mystery', name: 'Mystery & Thriller', icon: 'Search' },
  { id: 'nonfiction', name: 'Non-Fiction & Memoir', icon: 'Compass' },
  { id: 'tech', name: 'Tech & AI', icon: 'Cpu' },
  { id: 'romance', name: 'Romance & Drama', icon: 'Heart' },
  { id: 'self-help', name: 'Self-Growth & Mindset', icon: 'Zap' },
];

export const FORMAT_DETAILS = {
  hardcover: { label: 'Hardcover', multiplier: 1.25, badge: 'Collector Edition' },
  paperback: { label: 'Paperback', multiplier: 1.0, badge: 'Popular' },
  ebook: { label: 'eBook (EPUB/PDF)', multiplier: 0.65, badge: 'Instant Download' },
  audiobook: { label: 'Audiobook (Narrated)', multiplier: 0.85, badge: 'High Quality Audio' },
};

export const BOOKS = [
  {
    id: 'book-1',
    title: 'The Echo of Ancient Solitude',
    author: 'Elena Rostova',
    authorBio: 'Elena Rostova is an acclaimed novelist whose work explores memory, architecture, and the hidden currents of human longing.',
    category: 'fiction',
    categoryName: 'Literary Fiction',
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=700&q=80',
    rating: 4.9,
    ratingCount: 384,
    basePrice: 24.99,
    discountedPrice: 19.99,
    discount: 20,
    isBestseller: true,
    isStaffPick: true,
    isNewRelease: false,
    pages: 416,
    publishDate: '2023-10-15',
    publisher: 'Meridian House Publishing',
    isbn: '978-0-7432-7356-5',
    language: 'English',
    stockCount: 18,
    synopsis: 'A lyrical masterpiece following three generations of clockmakers in Prague who secretly record the whisperings of time itself.',
    description: `Set against the atmospheric labyrinth of old Prague, The Echo of Ancient Solitude weaves the spellbinding tapestry of the Vanecek family. For over a century, master horologists have maintained the city's legendary astronomical timepiece, guarding a clandestine archive of moments that history attempted to erase. When a young archivist discovers an anomalous dial inside an antique carriage clock, she uncovers a quiet resistance of memories that redefines her understanding of love, grief, and forgiveness.`,
    sampleChapter: {
      chapterNum: 'Chapter 1',
      title: 'The Pendulum in the Fog',
      content: [
        'The bells of St. Vitus did not strike noon that day; they unspooled it, note by brass note, into the damp October mist that had settled over the river.',
        'Karel stood on the Charles Bridge with his hand resting against the worn sandstone balustrade. Inside his heavy wool coat, tucked into the silk-lined interior pocket, was the brass escapement wheel his grandfather had crafted sixty winters ago.',
        'Time in Prague did not flow like a stream; it gathered in courtyards like still rainwater, reflecting whatever sky happened to look down upon it. To Karel, every ticking mechanism was an argument against forgetting.'
      ]
    },
    reviews: [
      { id: 'r1', author: 'Clara Sterling', rating: 5, date: '2 days ago', title: 'Unforgettable Prose', comment: 'Breathtaking imagery. The prose lingered with me for weeks after turning the final page.' },
      { id: 'r2', author: 'Julian Vance', rating: 5, date: '1 week ago', title: 'A modern classic', comment: 'Elena Rostova has outdone herself. The horological metaphors are masterfully crafted.' }
    ]
  },
  {
    id: 'book-2',
    title: 'Nexus of Starlight',
    author: 'Caelen Thorne',
    authorBio: 'Astrophysicist turned Hugo-award winning author known for grounded space exploration sagas.',
    category: 'scifi',
    categoryName: 'Sci-Fi & Fantasy',
    cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=700&q=80',
    rating: 4.8,
    ratingCount: 521,
    basePrice: 27.50,
    discountedPrice: 22.00,
    discount: 20,
    isBestseller: true,
    isStaffPick: false,
    isNewRelease: true,
    pages: 560,
    publishDate: '2024-02-01',
    publisher: 'Orion Stellar Press',
    isbn: '978-1-5942-0442-1',
    language: 'English',
    stockCount: 12,
    synopsis: 'Deep space expedition crew discovers a derelict orbital habitat emitting harmonic frequencies that defy general relativity.',
    description: `When the deep-survey vessel Aethelgard detects anomalous harmonic resonance in the Cygnus sector, Commander Kira Vance must guide her specialist crew through an ancient ring construct left behind by an unknown civilisation. What begins as a routine salvage mission escalates into a race against gravitational entropy and the realization that the cosmos is listening.`,
    sampleChapter: {
      chapterNum: 'Prologue',
      title: 'The Silent Harmonic',
      content: [
        'Void telemetry is usually a monotonous hum of cosmic background noise and ion drift. But at 03:42 ship-time, the spectrum analyzer shifted into pure golden geometry.',
        'Kira did not look up from the navigation terminal immediately. In deep space, curiosity before calibration was how whole expeditions disappeared without a telemetry trail.',
        '"Commander," sensor officer Renn whispered, voice dry as lunar regolith. "Whatever is broadcasting at fifty kilohertz... it isn\'t natural. And it just matched our orbital rotation."'
      ]
    },
    reviews: [
      { id: 'r3', author: 'Marcus Brody', rating: 5, date: '3 days ago', title: 'Hard Sci-Fi at its Best', comment: 'Grounded physics combined with mind-bending cosmic wonder. Highly recommended!' }
    ]
  },
  {
    id: 'book-3',
    title: 'The Architecture of Thought',
    author: 'Dr. Aris Thorne & Maya Lin',
    authorBio: 'Pioneering cognitive neuroscientists and AI ethics researchers at the Institute for Advanced Computation.',
    category: 'tech',
    categoryName: 'Tech & AI',
    cover: 'https://images.unsplash.com/photo-1532012164546-f432f2e3777f?auto=format&fit=crop&w=700&q=80',
    rating: 4.9,
    ratingCount: 290,
    basePrice: 34.00,
    discountedPrice: 28.90,
    discount: 15,
    isBestseller: false,
    isStaffPick: true,
    isNewRelease: true,
    pages: 384,
    publishDate: '2024-01-18',
    publisher: 'MIT Academic & Cybernetics',
    isbn: '978-0-2620-3998-7',
    language: 'English',
    stockCount: 25,
    synopsis: 'How neural networks, symbolic reasoning, and human intuition are converging into the next technological frontier.',
    description: `An illuminating, accessible guide into the foundational architectures powering the modern AI revolution. Drawing parallels between human neurological structures and transformer-based cognitive models, Dr. Thorne and Lin dissect how machines learn, reason, hallucinate, and synthesize creative problem solving.`,
    sampleChapter: {
      chapterNum: 'Chapter 1',
      title: 'From Synapses to Embeddings',
      content: [
        'Consider the word "warmth". To human neurochemistry, it evokes sun-drenched wood, maternal embraces, and thermal radiation. To a high-dimensional vector space, it is a coordinate cluster situated adjacent to "gentle" and "hearth".',
        'Bridging the chasm between raw mathematical topology and genuine semantic understanding is the central riddle of modern machine intelligence.',
        'We do not simply train algorithms to predict tokens; we construct digital lenses through which our own collective consciousness is reflected back in startling clarity.'
      ]
    },
    reviews: [
      { id: 'r4', author: 'Devon K.', rating: 5, date: '2 weeks ago', title: 'Clear and Inspiring', comment: 'Essential reading for any software engineer or thinker curious about where AI is heading.' }
    ]
  },
  {
    id: 'book-4',
    title: 'The Shadow of Venetian Glass',
    author: 'Matteo Bellini',
    authorBio: 'Historian and bestselling Italian mystery writer residing in Murano, Italy.',
    category: 'mystery',
    categoryName: 'Mystery & Thriller',
    cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=700&q=80',
    rating: 4.7,
    ratingCount: 412,
    basePrice: 21.99,
    discountedPrice: 17.50,
    discount: 20,
    isBestseller: true,
    isStaffPick: false,
    isNewRelease: false,
    pages: 352,
    publishDate: '2023-08-11',
    publisher: 'Grand Canal Thrillers',
    isbn: '978-0-3930-4921-3',
    language: 'English',
    stockCount: 9,
    synopsis: 'A series of high-profile art thefts and an unsolved homicide along the foggy canals of Venice.',
    description: `During the midnight Acqua Alta flooding in Venice, an irreplaceable Renaissance glass chalice containing a royal cipher is stolen from the Doge’s private gallery. Inspector Marco De Luca is drawn into a labyrinthine conspiracy involving centuries-old guilds, black-market antiquities, and a murderer who leaves shattered crimson glass at every crime scene.`,
    sampleChapter: {
      chapterNum: 'Chapter 1',
      title: 'High Water at Midnight',
      content: [
        'The water entered the Piazza San Marco like a dark silk ribbon slipping silently across the flagstones.',
        'Marco adjusted the collar of his raincoat against the gale whipping off the lagoon. The sirens were wailing across the city, warning of an exceptional tide—one hundred and forty centimeters above sea level.',
        'Inside the basilica museum, the glass cases were empty, but the humidity smelled sharply of bitter almond and burnt wax.'
      ]
    },
    reviews: [
      { id: 'r5', author: 'Samantha Vance', rating: 4, date: '1 month ago', title: 'Atmospheric page-turner', comment: 'You can almost smell the lagoon and hear the church bells. Couldn’t put it down!' }
    ]
  },
  {
    id: 'book-5',
    title: 'Atomic Habits for Creative Minds',
    author: 'Lillian Sterling',
    authorBio: 'Productivity consultant and behavioural psychologist based in San Francisco.',
    category: 'self-help',
    categoryName: 'Self-Growth & Mindset',
    cover: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=700&q=80',
    rating: 4.9,
    ratingCount: 890,
    basePrice: 26.00,
    discountedPrice: 19.99,
    discount: 23,
    isBestseller: true,
    isStaffPick: true,
    isNewRelease: false,
    pages: 288,
    publishDate: '2023-04-12',
    publisher: 'Summit Peak Press',
    isbn: '978-0-7352-1129-2',
    language: 'English',
    stockCount: 30,
    synopsis: 'Actionable micro-systems to unlock consistent creative breakthroughs without burnout.',
    description: `Creativity is not a lightning strike of divine inspiration—it is an ecosystem of deliberate micro-rituals. Lillian Sterling delivers a science-backed blueprint showing writers, designers, programmers, and entrepreneurs how to architect friction-free daily routines that compound into exceptional creative output.`,
    sampleChapter: {
      chapterNum: 'Introduction',
      title: 'The Myth of the Muse',
      content: [
        'We have romanticized the tortured genius waiting by an open window for inspiration to strike like thunder.',
        'In reality, the world\'s most prolific creators treat their craft with the quiet discipline of a gardener tending soil.',
        'A two-minute ritual repeated each morning with zero friction will yield more transformative work than ten unfocused weekend marathons.'
      ]
    },
    reviews: [
      { id: 'r6', author: 'David Chen', rating: 5, date: '5 days ago', title: 'Changed my daily routine', comment: 'Practical, concise, and zero fluff. The habit stacking framework works instantly.' }
    ]
  },
  {
    id: 'book-6',
    title: 'Whispers Under the Willow',
    author: 'Genevieve Fontaine',
    authorBio: 'Bestselling contemporary romance author and former Paris literary journalist.',
    category: 'romance',
    categoryName: 'Romance & Drama',
    cover: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&w=700&q=80',
    rating: 4.6,
    ratingCount: 310,
    basePrice: 18.50,
    discountedPrice: 15.99,
    discount: 14,
    isBestseller: false,
    isStaffPick: false,
    isNewRelease: true,
    pages: 368,
    publishDate: '2024-03-01',
    publisher: 'Chanteclair Romance',
    isbn: '978-1-4926-7833-2',
    language: 'English',
    stockCount: 14,
    synopsis: 'A countryside manor renovation, an old box of unsent wartime letters, and an unexpected second chance at love.',
    description: `When landscape architect Juliette Moreau accepts a commission to restore the wild 19th-century gardens of Château de Valois in the Loire Valley, she expects quiet seclusion. Instead, she finds herself clashing with Henri, the brooding restoration carpenter with a secret past, while uncovering love letters hidden behind a cellar wall during the Liberation.`,
    sampleChapter: {
      chapterNum: 'Chapter 1',
      title: 'Lavender and Old Stone',
      content: [
        'The iron gates of Château de Valois groaned in protest as Juliette pushed them open into the overgrown courtyard.',
        'Knee-high wild clover and untamed lavender bushes had conquered the gravel driveway, humming with bees under the June sunshine.',
        'Standing on the terrace steps was a tall man with rolled-up sleeves and sawdust in his dark hair, holding an antique iron key.'
      ]
    },
    reviews: [
      { id: 'r7', author: 'Isabella M.', rating: 5, date: '2 weeks ago', title: 'Swoon-worthy!', comment: 'Beautiful scenery, warm characters, and an emotional mystery that had me in tears.' }
    ]
  },
  {
    id: 'book-7',
    title: 'The Great Divergence: Civilizations in Motion',
    author: 'Prof. Niall MacIntyre',
    authorBio: 'Emeritus Professor of Global Economic History at Oxford University.',
    category: 'nonfiction',
    categoryName: 'Non-Fiction & Memoir',
    cover: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=700&q=80',
    rating: 4.8,
    ratingCount: 195,
    basePrice: 32.00,
    discountedPrice: 26.50,
    discount: 17,
    isBestseller: false,
    isStaffPick: true,
    isNewRelease: false,
    pages: 512,
    publishDate: '2023-09-05',
    publisher: 'Oxford Academic Press',
    isbn: '978-0-1988-1234-8',
    language: 'English',
    stockCount: 15,
    synopsis: 'An epic re-examination of how geography, trade routes, energy revolutions, and institutions reshaped the modern world.',
    description: `A breathtaking historical narrative spanning five centuries of technological breakthroughs, naval spice routes, and institutional evolutions. MacIntyre debunks conventional Eurocentric simplifications, presenting a globally integrated account of how trade networks in the Indian Ocean, Andean silver mines, and Eurasian river systems forged our contemporary geopolitical balance.`,
    sampleChapter: {
      chapterNum: 'Chapter 1',
      title: 'Monsoons and Porcelain',
      content: [
        'In the year 1420, the harbor of Malacca was arguably the most cosmopolitan square kilometer on planet Earth.',
        'Spices from the Moluccas, silk from Hangzhou, camphor from Borneo, and Frankincense from Dhofar traded hands through sixty different dialects.',
        'To understand modern capitalism, one must look not only at the banking houses of Florence or Amsterdam, but at the seasonal wind currents that carried trading dhows across the Indian Ocean.'
      ]
    },
    reviews: [
      { id: 'r8', author: 'Prof. Arthur Pendelton', rating: 5, date: '3 weeks ago', title: 'Masterly historical synthesis', comment: 'An astonishing work of scholarship that reads with the velocity of an adventure novel.' }
    ]
  },
  {
    id: 'book-8',
    title: 'Chronicles of the Obsidian Throne',
    author: 'Rhiannon Blackwood',
    authorBio: 'Epic fantasy creator whose sprawling worlds have garnered international acclaim.',
    category: 'scifi',
    categoryName: 'Sci-Fi & Fantasy',
    cover: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=700&q=80',
    rating: 4.9,
    ratingCount: 670,
    basePrice: 29.99,
    discountedPrice: 23.99,
    discount: 20,
    isBestseller: true,
    isStaffPick: false,
    isNewRelease: true,
    pages: 680,
    publishDate: '2024-02-14',
    publisher: 'Valyrian Myth Press',
    isbn: '978-0-0628-9122-4',
    language: 'English',
    stockCount: 22,
    synopsis: 'Six fallen kingdoms, a shattered divine eclipse, and a nameless spellcaster who inherits the throne of glass.',
    description: `In the fractured continent of Elyria, magic is an outlawed currency drawn from celestial eclipses. When the High Sovereign falls to a poison that petrifies flesh to black obsidian, a rogue elemental scholar and a banished dragon rider form an uneasy pact to seal the rift before eternal night descends.`,
    sampleChapter: {
      chapterNum: 'Chapter 1',
      title: 'The Ash That Sang',
      content: [
        'Snow in the Northern Marches was white, but the snow that fell over the Obsidian Citadel was grey with volcanic glass.',
        'Vesper tightened her leather bracers as the bells of warning tolled from the highest ramparts.',
        'Magic did not taste like fire or frost; it tasted like ozone before a lightning strike, sharp enough to bleed.'
      ]
    },
    reviews: [
      { id: 'r9', author: 'Gareth Vance', rating: 5, date: '4 days ago', title: 'Epic in every sense!', comment: 'The world-building is breathtaking. The best fantasy novel I’ve read this decade.' }
    ]
  }
];

export const PROMO_CODES = {
  'READ20': { discountPercent: 20, description: '20% Off Your Entire Order' },
  'BOOKWORM': { discountFixed: 10, description: '$10 Off Orders over $40', minOrder: 40 },
  'FREESHIP': { freeShipping: true, description: 'Free Express Shipping' },
  'WELCOME10': { discountPercent: 10, description: '10% Welcome Discount' }
};

export const QUIZ_QUESTIONS = [
  {
    id: 'mood',
    title: 'What mood matches your current reading vibe?',
    options: [
      { label: 'Deeply Reflective & Beautiful Prose', category: 'fiction', icon: 'Feather' },
      { label: 'Mind-Bending Galactic Adventure', category: 'scifi', icon: 'Sparkles' },
      { label: 'Tense Thriller & Dark Mysteries', category: 'mystery', icon: 'Search' },
      { label: 'Growth, Habits & High Productivity', category: 'self-help', icon: 'Zap' },
    ]
  },
  {
    id: 'length',
    title: 'How deep of a journey are you ready for?',
    options: [
      { label: 'Brisk & Punchy (under 300 pages)', maxPages: 300 },
      { label: 'Balanced Masterpiece (300 - 500 pages)', maxPages: 500 },
      { label: 'Epic Tome (500+ pages)', minPages: 500 }
    ]
  },
  {
    id: 'format',
    title: 'How do you prefer to experience stories?',
    options: [
      { label: 'Physical Book (Feel the paper pages)', format: 'paperback' },
      { label: 'Deluxe Hardcover for the Bookshelf', format: 'hardcover' },
      { label: 'Instant Digital eBook', format: 'ebook' },
      { label: 'Audiobook on the Go', format: 'audiobook' }
    ]
  }
];
