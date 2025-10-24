export interface ExamplePrompt {
  id: string;
  text: string;
  category: string;
  tags: string[];
}

export const EXAMPLE_PROMPTS: readonly ExamplePrompt[] = [
  // Nature & Landscapes
  {
    id: "nature-1",
    text: "Mountain landscape at sunset with golden light on a crystal clear lake",
    category: "Nature",
    tags: ["landscape", "mountains", "sunset", "peaceful"],
  },
  {
    id: "nature-2",
    text: "Mystical forest with ancient trees, glowing mushrooms, and ethereal mist",
    category: "Nature",
    tags: ["forest", "mystical", "fantasy", "magical"],
  },
  {
    id: "nature-3",
    text: "Vibrant coral reef with colorful tropical fish and marine life",
    category: "Nature",
    tags: ["underwater", "ocean", "colorful", "marine"],
  },

  // Characters & People
  {
    id: "character-1",
    text: "Wise old wizard with long white beard, star-covered robe, holding a glowing staff",
    category: "Characters",
    tags: ["wizard", "fantasy", "magic", "elderly"],
  },
  {
    id: "character-2",
    text: "Cyberpunk hacker in neon-lit city, wearing high-tech visor and leather jacket",
    category: "Characters",
    tags: ["cyberpunk", "futuristic", "tech", "urban"],
  },
  {
    id: "character-3",
    text: "Graceful ballerina dancing in grand theater, wearing flowing white tutu",
    category: "Characters",
    tags: ["dance", "elegant", "artistic", "performance"],
  },

  // Architecture & Buildings
  {
    id: "architecture-1",
    text: "Futuristic space station with sleek metallic surfaces and glowing blue lights",
    category: "Architecture",
    tags: ["futuristic", "space", "technology", "sci-fi"],
  },
  {
    id: "architecture-2",
    text: "Cozy cottage in countryside with thatched roof and flower garden",
    category: "Architecture",
    tags: ["cottage", "rural", "cozy", "traditional"],
  },
  {
    id: "architecture-3",
    text: "Grand cathedral with towering spires and intricate Gothic architecture",
    category: "Architecture",
    tags: ["gothic", "religious", "grand", "detailed"],
  },

  // Animals & Creatures
  {
    id: "animal-1",
    text: "Majestic lion with golden mane standing on rocky outcrop at sunrise",
    category: "Animals",
    tags: ["lion", "wildlife", "sunrise", "majestic"],
  },
  {
    id: "animal-2",
    text: "Mythical dragon soaring through storm clouds with lightning crackling around it",
    category: "Animals",
    tags: ["dragon", "mythical", "storm", "powerful"],
  },
  {
    id: "animal-3",
    text: "Playful dolphin leaping out of crystal blue ocean waves",
    category: "Animals",
    tags: ["dolphin", "ocean", "playful", "water"],
  },

  // Abstract & Artistic
  {
    id: "abstract-1",
    text: "Abstract painting with swirling colors and geometric shapes in vibrant hues",
    category: "Abstract",
    tags: ["abstract", "colorful", "artistic", "geometric"],
  },
  {
    id: "abstract-2",
    text: "Surreal dreamscape with floating islands and impossible architecture",
    category: "Abstract",
    tags: ["surreal", "dreamlike", "impossible", "floating"],
  },
  {
    id: "abstract-3",
    text: "Kaleidoscope of light and shadow creating mesmerizing patterns",
    category: "Abstract",
    tags: ["light", "shadow", "patterns", "mesmerizing"],
  },

  // Food & Objects
  {
    id: "food-1",
    text: "Delicious gourmet burger with all toppings, shot from above with perfect lighting",
    category: "Food",
    tags: ["food", "burger", "delicious", "gourmet"],
  },
  {
    id: "food-2",
    text: "Beautiful fruit arrangement with fresh berries, citrus, and tropical fruits",
    category: "Food",
    tags: ["fruits", "fresh", "colorful", "healthy"],
  },
  {
    id: "object-1",
    text: "Vintage typewriter on wooden desk with scattered papers and coffee cup",
    category: "Objects",
    tags: ["vintage", "typewriter", "desk", "nostalgic"],
  },

  // Sci-Fi & Fantasy
  {
    id: "scifi-1",
    text: "Massive spaceship docking at space station with Earth visible in background",
    category: "Sci-Fi",
    tags: ["spaceship", "space", "futuristic", "technology"],
  },
  {
    id: "fantasy-1",
    text: "Magical castle floating in clouds with rainbow bridges connecting to floating islands",
    category: "Fantasy",
    tags: ["castle", "floating", "magical", "clouds"],
  },

  // Vehicles & Transportation
  {
    id: "vehicle-1",
    text: "Sleek sports car speeding down winding mountain road at sunset",
    category: "Vehicles",
    tags: ["car", "speed", "mountain", "sunset"],
  },
  {
    id: "vehicle-2",
    text: "Vintage steam train chugging through picturesque countryside landscape",
    category: "Vehicles",
    tags: ["train", "vintage", "steam", "countryside"],
  },

  // Additional Nature & Landscapes
  {
    id: "nature-4",
    text: "Breathtaking aurora borealis dancing across Arctic sky with vibrant green and purple lights",
    category: "Nature",
    tags: ["aurora", "northern lights", "arctic", "colorful"],
  },
  {
    id: "nature-5",
    text: "Massive waterfall cascading down cliff face into misty valley below",
    category: "Nature",
    tags: ["waterfall", "cliff", "misty", "powerful"],
  },
  {
    id: "nature-6",
    text: "Peaceful cherry blossom garden in full bloom with pink petals floating in breeze",
    category: "Nature",
    tags: ["cherry blossoms", "spring", "peaceful", "pink"],
  },
  {
    id: "nature-7",
    text: "Vast desert landscape with sand dunes stretching to horizon under starry night sky",
    category: "Nature",
    tags: ["desert", "sand dunes", "starry", "vast"],
  },

  // More Characters & People
  {
    id: "character-4",
    text: "Steampunk inventor in Victorian workshop surrounded by brass gears and steam-powered contraptions",
    category: "Characters",
    tags: ["steampunk", "inventor", "victorian", "brass"],
  },
  {
    id: "character-5",
    text: "Samurai warrior in traditional armor standing in bamboo forest with cherry blossoms",
    category: "Characters",
    tags: ["samurai", "warrior", "bamboo", "traditional"],
  },
  {
    id: "character-6",
    text: "Space explorer in futuristic spacesuit standing on alien planet with two moons",
    category: "Characters",
    tags: ["space", "explorer", "alien", "futuristic"],
  },
  {
    id: "character-7",
    text: "Medieval knight in shining armor riding white horse through misty forest",
    category: "Characters",
    tags: ["knight", "medieval", "horse", "armor"],
  },

  // More Architecture & Buildings
  {
    id: "architecture-4",
    text: "Modern glass skyscraper reflecting city lights at night with sleek, minimalist design",
    category: "Architecture",
    tags: ["skyscraper", "modern", "glass", "night"],
  },
  {
    id: "architecture-5",
    text: "Ancient Greek temple with marble columns and intricate carvings under clear blue sky",
    category: "Architecture",
    tags: ["temple", "greek", "marble", "ancient"],
  },
  {
    id: "architecture-6",
    text: "Cozy log cabin in woods with stone chimney and warm light glowing from windows",
    category: "Architecture",
    tags: ["cabin", "wood", "cozy", "warm"],
  },
  {
    id: "architecture-7",
    text: "Floating city in clouds with interconnected platforms and bridges made of crystal",
    category: "Architecture",
    tags: ["floating", "city", "clouds", "crystal"],
  },

  // More Animals & Creatures
  {
    id: "animal-4",
    text: "Graceful white swan gliding across serene lake with lily pads and morning mist",
    category: "Animals",
    tags: ["swan", "graceful", "lake", "serene"],
  },
  {
    id: "animal-5",
    text: "Pack of wolves howling at full moon in snowy mountain landscape",
    category: "Animals",
    tags: ["wolves", "howling", "moon", "snowy"],
  },
  {
    id: "animal-6",
    text: "Colorful peacock displaying magnificent tail feathers in royal garden",
    category: "Animals",
    tags: ["peacock", "colorful", "feathers", "royal"],
  },
  {
    id: "animal-7",
    text: "Majestic eagle soaring high above mountain peaks with wings spread wide",
    category: "Animals",
    tags: ["eagle", "soaring", "mountains", "majestic"],
  },

  // More Abstract & Artistic
  {
    id: "abstract-4",
    text: "Fluid watercolor painting with soft, blended colors creating dreamlike shapes and forms",
    category: "Abstract",
    tags: ["watercolor", "fluid", "soft", "dreamlike"],
  },
  {
    id: "abstract-5",
    text: "Digital art piece with neon colors and geometric patterns creating cyberpunk aesthetic",
    category: "Abstract",
    tags: ["digital", "neon", "geometric", "cyberpunk"],
  },
  {
    id: "abstract-6",
    text: "Minimalist composition with bold black lines and negative space creating visual tension",
    category: "Abstract",
    tags: ["minimalist", "bold", "lines", "tension"],
  },

  // More Food & Objects
  {
    id: "food-3",
    text: "Decadent chocolate cake with multiple layers, chocolate shavings, and fresh berries on top",
    category: "Food",
    tags: ["cake", "chocolate", "decadent", "berries"],
  },
  {
    id: "food-4",
    text: "Steaming bowl of ramen with perfectly cooked noodles, soft-boiled egg, and green onions",
    category: "Food",
    tags: ["ramen", "noodles", "steaming", "perfect"],
  },
  {
    id: "object-2",
    text: "Vintage pocket watch with intricate engravings and golden chain, sitting on old leather book",
    category: "Objects",
    tags: ["watch", "vintage", "golden", "intricate"],
  },
  {
    id: "object-3",
    text: "Crystal ball sitting on velvet cushion with mystical energy swirling inside it",
    category: "Objects",
    tags: ["crystal", "mystical", "energy", "velvet"],
  },

  // More Sci-Fi & Fantasy
  {
    id: "scifi-2",
    text: "Massive space battle with laser beams, explosions, and futuristic spacecraft in deep space",
    category: "Sci-Fi",
    tags: ["battle", "lasers", "explosions", "spacecraft"],
  },
  {
    id: "scifi-3",
    text: "Cyberpunk cityscape with neon signs, flying cars, and towering buildings at night",
    category: "Sci-Fi",
    tags: ["cyberpunk", "neon", "flying cars", "cityscape"],
  },
  {
    id: "fantasy-2",
    text: "Magical library with floating books, glowing orbs, and ancient tomes on endless shelves",
    category: "Fantasy",
    tags: ["library", "magical", "floating", "ancient"],
  },
  {
    id: "fantasy-3",
    text: "Fairy tale cottage with thatched roof, flower garden, and winding stone path",
    category: "Fantasy",
    tags: ["cottage", "fairy tale", "flowers", "stone"],
  },

  // More Vehicles & Transportation
  {
    id: "vehicle-3",
    text: "Sleek motorcycle speeding through neon-lit tunnel with motion blur effects",
    category: "Vehicles",
    tags: ["motorcycle", "speed", "neon", "motion"],
  },
  {
    id: "vehicle-4",
    text: "Hot air balloon floating peacefully over rolling hills and patchwork fields",
    category: "Vehicles",
    tags: ["balloon", "floating", "peaceful", "hills"],
  },
  {
    id: "vehicle-5",
    text: "Futuristic hoverbike gliding above city street with glowing blue energy trails",
    category: "Vehicles",
    tags: ["hoverbike", "futuristic", "glowing", "energy"],
  },

  // New Categories
  // Technology & Gadgets
  {
    id: "tech-1",
    text: "Holographic interface floating in mid-air with glowing data streams and interactive elements",
    category: "Technology",
    tags: ["holographic", "interface", "glowing", "interactive"],
  },
  {
    id: "tech-2",
    text: "Retro computer setup with CRT monitor, mechanical keyboard, and glowing green text",
    category: "Technology",
    tags: ["retro", "computer", "CRT", "glowing"],
  },

  // Weather & Atmosphere
  {
    id: "weather-1",
    text: "Dramatic thunderstorm with lightning illuminating dark clouds over city skyline",
    category: "Weather",
    tags: ["thunderstorm", "lightning", "dramatic", "clouds"],
  },
  {
    id: "weather-2",
    text: "Gentle snowfall creating winter wonderland with snow-covered trees and frozen ponds",
    category: "Weather",
    tags: ["snow", "winter", "gentle", "frozen"],
  },

  // Emotions & Moods
  {
    id: "emotion-1",
    text: "Warm, cozy scene with soft lighting, comfortable furniture, and sense of home",
    category: "Emotions",
    tags: ["cozy", "warm", "comfortable", "home"],
  },
  {
    id: "emotion-2",
    text: "Mysterious fog rolling through ancient graveyard with gothic tombstones and moonlight",
    category: "Emotions",
    tags: ["mysterious", "fog", "gothic", "moonlight"],
  },
] as const;

// Helper functions
export const getRandomPrompt = (): ExamplePrompt => {
  const randomIndex = Math.floor(Math.random() * EXAMPLE_PROMPTS.length);
  return EXAMPLE_PROMPTS[randomIndex];
};

export const getPromptsByCategory = (
  category: string
): readonly ExamplePrompt[] => {
  return EXAMPLE_PROMPTS.filter((prompt) => prompt.category === category);
};

export const getPromptsByTag = (tag: string): readonly ExamplePrompt[] => {
  return EXAMPLE_PROMPTS.filter((prompt) => prompt.tags.includes(tag));
};

export const getRandomPrompts = (
  count: number = 3
): readonly ExamplePrompt[] => {
  const shuffled = [...EXAMPLE_PROMPTS].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const getAllCategories = (): readonly string[] => {
  return [...new Set(EXAMPLE_PROMPTS.map((prompt) => prompt.category))];
};

export const getAllTags = (): readonly string[] => {
  return [...new Set(EXAMPLE_PROMPTS.flatMap((prompt) => prompt.tags))];
};
