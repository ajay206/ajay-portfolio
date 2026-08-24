export const SITE = {
  name: "Ajay Kumar",
  given: "Ajay",
  family: "Kumar",
  tagline: "From code to cinema",
  role: "Software Developer · Writer · Character Designer",
  location: "Hyderabad, India",
  email: "kondetiajaykumar9@gmail.com",
  status: "Writing stories, designing characters, and generating cinematic scenes",
} as const;

export const NAV = [
  { to: "/experience", label: "Experience" },
  { to: "/projects", label: "Passion Projects" },
  { to: "/stories", label: "Stories" },
  { to: "/skills", label: "Skills" },
  { to: "/characters", label: "Characters" },
  { to: "/videos", label: "Videos" },
  { to: "/images", label: "Images" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export type StillId =
  | "train-window"
  | "rooftop-dusk"
  | "lantern-alley"
  | "empty-classroom"
  | "high-window"
  | "night-ocean"
  | "station-clock"
  | "rain-crossing";

export const STILL_IDS: StillId[] = [
  "train-window",
  "rooftop-dusk",
  "lantern-alley",
  "empty-classroom",
  "high-window",
  "night-ocean",
  "station-clock",
  "rain-crossing",
];

export const STILL_LABELS: Record<StillId, string> = {
  "train-window": "Night train",
  "rooftop-dusk": "Rooftop dusk",
  "lantern-alley": "Lantern alley",
  "empty-classroom": "Classroom",
  "high-window": "West window",
  "night-ocean": "Night ocean",
  "station-clock": "Station clock",
  "rain-crossing": "Rain crossing",
};

export const SKILL_GROUPS = [
  {
    heading: "Code",
    items: [
      {
        name: "Software development",
        detail: "Building production systems at CSG since 2022.",
      },
      {
        name: "Problem framing",
        detail: "Turning a messy brief into something that can ship.",
      },
      {
        name: "Craft under constraint",
        detail: "Deadlines, legacy, and still leaving the work cleaner.",
      },
    ],
  },
  {
    heading: "Story",
    items: [
      {
        name: "Original fiction",
        detail: "Stories written image-first — a scene, then the sentence.",
      },
      {
        name: "Character design",
        detail: "People who hold a still. Silhouette, then the eyes.",
      },
      {
        name: "World notes",
        detail: "Rules a place obeys when no one is looking.",
      },
    ],
  },
  {
    heading: "Picture",
    items: [
      {
        name: "Direction",
        detail: "Blocking, weather, and the cut you feel before you see it.",
      },
      {
        name: "AI cinematography",
        detail: "Generating scene videos from the stories — animatics with intent.",
      },
      {
        name: "Color & mood",
        detail: "Night that is never just blue. Palettes as plot.",
      },
    ],
  },
] as const;

export const ABOUT = {
  lead: "Ajay Kumar is a software developer at CSG in Hyderabad, building a second life as an anime and cinema director-writer.",
  body: [
    "By day he ships software. By night he writes stories, designs characters, and turns those scenes into cinematic picture — often with AI as a camera, never as a substitute for the idea.",
    "The long aim is direction: original worlds, casts that look back, and films that treat weather as a character. This site is the workbench — stories, people, stills, and moving picture, added as they exist.",
    "Based in Hyderabad. Open to collaborators who care about the frame.",
  ],
  facts: [
    { label: "Based", value: "Hyderabad, India" },
    { label: "Day job", value: "Software Developer, CSG — since 2022" },
    { label: "Working on", value: "Stories, characters, AI scene videos" },
  ],
} as const;
