export type Project = {
  slug: string;
  index: string;
  title: string;
  location: string;
  year: string;
  type: string;
  area: string;
  image: string;
  gallery: string[];
  summary: string;
  description: string[];
  credits: string[];
  palette: { name: string; hex: string }[];
  featured?: boolean;
};

export const studio = {
  name: "Atelier Vance",
  architect: "Aurelio Vance",
  role: "Interior Architect",
  tagline: "Spaces that hold silence.",
  intro:
    "I design interiors as quiet instruments for living — rooms tuned to light, material and the unhurried rituals of the people inside them.",
  location: "Milan, Italy",
  secondaryLocation: "Copenhagen, Denmark",
  founded: "2012",
  email: "hello@ateliervance.com",
  phone: "+39 02 8974 2210",
  availability: "Commissions open for 2027",
  manifesto:
    "A room is never only a room. It is a sequence of thresholds, a study in proportion, a holder of light. I work slowly, stripping away the unnecessary until the space has enough confidence to be still.",
  bio: [
    "Aurelio Vance is an Italian interior architect working between Milan and Copenhagen. His practice moves between private residences, small hotels and cultural spaces, always beginning with the same question: how should this room make you feel?",
    "Trained at Politecnico di Milano and the Royal Danish Academy, Aurelio spent his early career in the studios of Lissoni and David Chipperfield before founding Atelier Vance in 2012. The work is characterised by exacting joinery, tactile natural materials and a restrained palette that lets the changing light do most of the talking.",
    "Each project is developed as a complete atmosphere — architecture, furniture, lighting, objects and scent — with a small team of craftspeople and consultants. The studio takes on a limited number of commissions each year.",
  ],
  philosophy:
    "Luxury is not more. It is the confidence to leave a wall empty, a window undressed, a moment unfinished.",
  facts: [
    { label: "Practice", value: "Independent studio" },
    { label: "Founded", value: "Milan, 2012" },
    { label: "Studios", value: "Milan / Copenhagen" },
    { label: "Focus", value: "Residential, hospitality, culture" },
    { label: "Team", value: "Six, plus artisans" },
    { label: "Languages", value: "IT / EN / DA" },
  ],
  stats: [
    { value: "14", label: "Years of practice" },
    { value: "48", label: "Completed projects" },
    { value: "09", label: "Countries" },
    { value: "21", label: "Awards & mentions" },
  ],
  qualifications: [
    {
      year: "2011",
      title: "Master of Arts, Interior Architecture",
      place: "Royal Danish Academy, Copenhagen",
    },
    {
      year: "2007",
      title: "Bachelor of Architecture",
      place: "Politecnico di Milano",
    },
    {
      year: "2008",
      title: "Registered Architect",
      place: "Ordine degli Architetti di Milano, no. 18472",
    },
    {
      year: "2016",
      title: "LEED AP — Building Design + Construction",
      place: "U.S. Green Building Council",
    },
  ],
  experience: [
    {
      period: "2012 — Present",
      role: "Founder & Principal",
      place: "Atelier Vance, Milan",
    },
    {
      period: "2010 — 2012",
      role: "Senior Interior Architect",
      place: "Studio Kobayashi, Copenhagen",
    },
    {
      period: "2007 — 2010",
      role: "Architect",
      place: "Lissoni & Partners, Milan",
    },
    {
      period: "2006",
      role: "Design Intern",
      place: "David Chipperfield Architects, Berlin",
    },
  ],
  awards: [
    { year: "2025", title: "Italian Interiors Prize", detail: "Winner — Casa Lumen" },
    { year: "2024", title: "Wallpaper* Design Awards", detail: "Shortlist — Terracotta Atelier" },
    { year: "2023", title: "Dezeen Awards", detail: "Interior of the Year, shortlist" },
    { year: "2020", title: "Architettura & Interni", detail: "Emerging Practice of the Year" },
  ],
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "Pinterest", href: "https://www.pinterest.com/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
  ],
  contact: {
    milan: ["Via Solferino 31", "20121 Milano, Italy"],
    copenhagen: ["Bredgade 24", "1260 København K, Denmark"],
  },
};

export const projects: Project[] = [
  {
    slug: "casa-lumen",
    index: "01",
    title: "Casa Lumen",
    location: "Lake Como, Italy",
    year: "2025",
    type: "Private residence",
    area: "420 m²",
    image: "/images/hero.jpg",
    gallery: ["/images/living.jpg", "/images/bath.jpg", "/images/detail.jpg"],
    summary:
      "A lake house composed around one long view, one warm wall and the ritual of arriving slowly.",
    description: [
      "Casa Lumen sits on the western shore of Lake Como, its rooms arranged as a sequence of thresholds between the mountain and the water. The existing 1970s shell was opened up, but not erased: the deep window reveals, terrazzo floors and quiet ceiling height remain.",
      "A single wall of hand-troweled lime plaster runs the length of the house, catching light from morning to dusk. Joinery in smoked oak holds everything else — a low library, a hidden kitchen, a bed that appears to float. The palette is deliberately narrow so that the lake, and the weather moving across it, become the most vivid material in the room.",
    ],
    credits: ["Interior architecture", "Bespoke joinery", "Lighting design", "Furniture curation"],
    palette: [
      { name: "Lime plaster", hex: "#d7c9b3" },
      { name: "Smoked oak", hex: "#554537" },
      { name: "Lake stone", hex: "#8e9288" },
      { name: "Burnt sienna", hex: "#a84f31" },
    ],
    featured: true,
  },
  {
    slug: "the-quiet-house",
    index: "02",
    title: "The Quiet House",
    location: "Copenhagen, Denmark",
    year: "2024",
    type: "Private residence",
    area: "285 m²",
    image: "/images/bedroom.jpg",
    gallery: ["/images/kitchen.jpg", "/images/bedroom.jpg", "/images/detail.jpg"],
    summary:
      "A family home in Frederiksberg, softened with chalky surfaces, paper light and room to breathe.",
    description: [
      "The Quiet House began with a Danish family and an over-furnished Victorian apartment. We removed almost everything, then put back only what the everyday needed: a long table, a deep sofa, a place for coats, a window seat that catches the afternoon.",
      "Chalk-white walls and pale ash floors form a calm envelope. Colour arrives in small, deliberate doses — a rust-red linen curtain, a slab of Swedish granite, a single ceramic lamp. Storage is built into the architecture, so the rooms can stay visually still even when life is not.",
    ],
    credits: ["Interior architecture", "Custom furniture", "Curtain and textile direction"],
    palette: [
      { name: "Chalk", hex: "#e7e1d6" },
      { name: "Pale ash", hex: "#c4b49d" },
      { name: "Rust linen", hex: "#9b4a33" },
      { name: "Granite", hex: "#77766e" },
    ],
  },
  {
    slug: "terracotta-atelier",
    index: "03",
    title: "Terracotta Atelier",
    location: "Milan, Italy",
    year: "2024",
    type: "Workspace",
    area: "310 m²",
    image: "/images/study.jpg",
    gallery: ["/images/study.jpg", "/images/studio.jpg", "/images/detail.jpg"],
    summary:
      "A design studio for a Milanese fashion house — part workshop, part salon, entirely made for making.",
    description: [
      "This former print works in the Navigli district is now the headquarters of a small fashion house. The brief asked for a space that could move between focused work, fittings and long lunches without ever feeling like an office.",
      "We kept the industrial shell and introduced a warm, almost domestic layer inside it: a 7-metre oak worktable, walls of raw terracotta, linen curtains that divide the rooms, and a kitchen at the centre. Material samples, bolts of cloth and prototypes are part of the architecture rather than hidden from it.",
    ],
    credits: ["Workplace interiors", "Furniture design", "Acoustic strategy", "Art direction"],
    palette: [
      { name: "Raw terracotta", hex: "#b25c3b" },
      { name: "Oiled oak", hex: "#9b7a53" },
      { name: "Linen", hex: "#d8ccb8" },
      { name: "Graphite", hex: "#3b3a36" },
    ],
  },
  {
    slug: "villa-solenne",
    index: "04",
    title: "Villa Solenne",
    location: "Puglia, Italy",
    year: "2023",
    type: "Hospitality",
    area: "1,140 m²",
    image: "/images/villa.jpg",
    gallery: ["/images/bath.jpg", "/images/villa.jpg", "/images/living.jpg"],
    summary:
      "A nine-room guesthouse in an old masseria, where every threshold frames an olive tree.",
    description: [
      "Villa Solenne is a slow hospitality project in the Itria Valley: nine rooms, a kitchen, a pool and a garden, arranged inside a 17th-century masseria. The architecture was restored with local stone and lime, keeping the irregularity that makes old buildings feel lived-in.",
      "Rooms are furnished with a mix of custom pieces and vintage finds from Puglia — rush chairs, iron beds, hand-thrown ceramics. Each has its own outdoor room, shaded by fig or olive. The result is less hotel than house party, with the scale and generosity of a private villa.",
    ],
    credits: ["Hospitality interiors", "FF&E procurement", "Landscape collaboration", "Brand atmosphere"],
    palette: [
      { name: "Masseria stone", hex: "#c7b79f" },
      { name: "Olive", hex: "#6d7158" },
      { name: "Lime wash", hex: "#ece4d5" },
      { name: "Fig", hex: "#5d4b50" },
    ],
  },
  {
    slug: "apartment-no-9",
    index: "05",
    title: "Apartment No. 9",
    location: "Paris, France",
    year: "2022",
    type: "Private residence",
    area: "160 m²",
    image: "/images/kitchen.jpg",
    gallery: ["/images/living.jpg", "/images/kitchen.jpg", "/images/bath.jpg"],
    summary:
      "A compact Parisian apartment with the proportions of a gallery and the warmth of a kitchen.",
    description: [
      "Apartment No. 9 occupies the third floor of a 19th-century building in the 11th arrondissement. The plan was cellular and dark; we removed two partitions, restored three original fireplaces and let the kitchen become the centre of gravity.",
      "A restrained palette of plaster, brass and dark-stained oak gives the small rooms a sense of occasion. Every piece of furniture was chosen to do more than one job. The apartment is a lesson in editing: nothing extra, nothing missing.",
    ],
    credits: ["Interior architecture", "Historic restoration", "Bespoke kitchen", "Lighting"],
    palette: [
      { name: "Plaster", hex: "#ddd2c0" },
      { name: "Burnished brass", hex: "#9d7c4e" },
      { name: "Dark oak", hex: "#3e3128" },
      { name: "Soot", hex: "#2d2c29" },
    ],
  },
];

export const services = [
  {
    index: "01",
    title: "Interior architecture",
    description:
      "Full spatial design from first sketch to final styling — plans, elevations, joinery, materials and site supervision.",
    tags: ["Residential", "Hospitality", "Workspace"],
  },
  {
    index: "02",
    title: "Furniture & joinery",
    description:
      "Bespoke pieces developed with a small circle of Italian and Danish makers, drawn for the room and the body that will use it.",
    tags: ["Bespoke", "Prototyping", "Production"],
  },
  {
    index: "03",
    title: "Material direction",
    description:
      "Tactile palettes of stone, timber, plaster and textile — sourced, tested and assembled into a coherent atmosphere.",
    tags: ["Sourcing", "Samples", "Specification"],
  },
  {
    index: "04",
    title: "Art & object curation",
    description:
      "A considered layer of art, ceramics, lighting and vintage pieces that gives a finished interior its particular voice.",
    tags: ["Curation", "Procurement", "Styling"],
  },
];

export const materials = [
  {
    name: "Travertino Navona",
    category: "Stone",
    number: "No. 01",
    description:
      "A porous Roman travertine, vein-cut to reveal its open grain. Used where the floor should feel older than the building.",
    image: "/images/bath.jpg",
    tone: "Chalk, walnut, iron",
  },
  {
    name: "Calce Rasata",
    category: "Plaster",
    number: "No. 02",
    description:
      "Hand-troweled lime plaster with a soft, mineral sheen. It holds the changing light rather than reflecting it.",
    image: "/images/living.jpg",
    tone: "Bone, umber, smoke",
  },
  {
    name: "Rovere Affumicato",
    category: "Timber",
    number: "No. 03",
    description:
      "Smoked European oak, brushed by hand and finished with natural wax. The grain stays visible, the surface stays quiet.",
    image: "/images/bedroom.jpg",
    tone: "Tobacco, oat, brass",
  },
];

export const stages = [
  {
    number: "01",
    label: "Listen",
    title: "The room before the room.",
    body: "We begin with long conversations and a slow walk through the space — its light, its sounds, the way you already move through it. No moodboards yet.",
  },
  {
    number: "02",
    label: "Draw",
    title: "Reducing until it is clear.",
    body: "Plans, sections, physical models. We test proportion and sequence at 1:20 and 1:1, removing whatever the room does not need.",
  },
  {
    number: "03",
    label: "Make",
    title: "Materials in the hand.",
    body: "Stone, timber, plaster and textile are chosen as samples, not screenshots. We prototype the joinery and light the room before anything is ordered.",
  },
  {
    number: "04",
    label: "Live",
    title: "A space that gets better.",
    body: "The final layer is life itself. We stay close after handover, returning as the house settles and the objects find their places.",
  },
];

export const testimonials = [
  {
    quote:
      "Aurelio doesn't decorate a room. He listens until the room tells him what it needs.",
    name: "Sofia Rinaldi",
    role: "Private client, Lake Como",
  },
  {
    quote:
      "The rare architect who understands that restraint is a form of generosity.",
    name: "Jonas Bech",
    role: "Creative director, Copenhagen",
  },
  {
    quote:
      "He gave our house a sense of memory it never had. Guests arrive and immediately exhale.",
    name: "Elena Duarte",
    role: "Founder, Villa Solenne",
  },
];

export const press = [
  "Architectural Digest",
  "Dezeen",
  "Wallpaper*",
  "Domus",
  "Kinfolk",
  "AD Italia",
  "The Monocle",
  "Cereal",
];

export const projectTypes = [
  "Private residence",
  "Hospitality",
  "Workspace",
  "Retail",
  "Something else",
];

export const budgets = [
  "Under €100k",
  "€100k — €250k",
  "€250k — €500k",
  "€500k+",
  "Let's discuss",
];
