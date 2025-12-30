// ============================================
// client/src/services/zones.js
// ============================================
// Static zones data for map display
// This can be fetched from API or kept static for better performance

export const zones = [
  {
    id: "sundarbans",
    name: "Sundarbans Mangroves",
    lat: 21.95,
    lng: 88.75,
    radius: 35000,
    importance: 9,
    hazard: "Climate Change & Deforestation",
    impact: "Flooding, livelihood loss",
    species: ["Royal Bengal Tiger", "Mangrove Fish", "Saltwater Crocodile"],
    petitions: [
      { title: "Protect Mangroves", count: 3241 }
    ],
    news: [
      { title: "Sea level rise threatens Sundarbans", link: "#" }
    ]
  },
  {
    id: "aravalli",
    name: "Aravalli Hills",
    lat: 28.45,
    lng: 77.12,
    radius: 25000,
    importance: 8,
    hazard: "Mining & Construction",
    impact: "Air pollution, water loss",
    species: ["Leopard", "Peacock", "Indian Grey Wolf"],
    petitions: [
      { title: "Stop Illegal Mining", count: 1870 }
    ],
    news: [
      { title: "Illegal mining damages Aravallis", link: "#" }
    ]
  },
  {
    id: "western-ghats",
    name: "Western Ghats",
    lat: 15.5,
    lng: 73.8,
    radius: 40000,
    importance: 10,
    hazard: "Deforestation & Urban Expansion",
    impact: "Biodiversity loss, water scarcity",
    species: ["Tiger", "Lion-tailed Macaque", "Nilgiri Tahr", "Malabar Giant Squirrel"],
    petitions: [
      { title: "Save Western Ghats UNESCO Heritage", count: 5240 }
    ],
    news: [
      { title: "UNESCO warns about Western Ghats degradation", link: "#" }
    ]
  },
  {
    id: "chilika-lake",
    name: "Chilika Lake",
    lat: 19.72,
    lng: 85.32,
    radius: 28000,
    importance: 8,
    hazard: "Pollution & Overfishing",
    impact: "Migratory bird decline",
    species: ["Irrawaddy Dolphin", "Flamingo", "Pelican"],
    petitions: [
      { title: "Clean Chilika Waters", count: 2100 }
    ],
    news: [
      { title: "Chilika Lake ecosystem under threat", link: "#" }
    ]
  }
];

// Helper function to get color based on importance score
export const getZoneColor = (importance) => {
  if (importance >= 9) return "#00441b"; // Dark green - Critical
  if (importance >= 7) return "#238b45"; // Medium green - High priority
  return "#66c2a4"; // Light green - Moderate priority
};

// Helper function to get zone by ID
export const getZoneById = (id) => {
  return zones.find(zone => zone.id === id);
};

// Helper function to calculate total affected species
export const getTotalSpecies = () => {
  const allSpecies = new Set();
  zones.forEach(zone => {
    zone.species.forEach(species => allSpecies.add(species));
  });
  return allSpecies.size;
};

export default zones;