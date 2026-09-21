"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import ProductCard, { Product } from "./ProductCard";

interface ProductCollectionProps {
  onOpenDetails: (product: Product) => void;
}

export const PRODUCTS_DATA: Product[] = [
  {
    id: "noir-72",
    name: "Noir 72% Grand Cru",
    category: "Dark Chocolate",
    cacao: "72%",
    price: 24,
    weight: "100g / 3.5oz",
    origin: "Chuao, Venezuela",
    desc: "Single-estate Criollo cacao with deep notes of dark cocoa, roasted almond, and smoked bourbon vanilla.",
    tastingNotes: ["Dark Cocoa", "Roasted Almond", "Bourbon Vanilla", "Sea Salt"],
    image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?q=80&w=1000&auto=format&fit=crop",
    ingredientsList: [
      "72.0% Chuao Single-Estate Cocoa Mass",
      "19.5% Organic Raw Unrefined Cane Sugar",
      "8.2% Organic Pure Cocoa Butter",
      "0.3% Ground Bourbon Vanilla Beans",
    ],
    allergens: "Made in a facility that handles tree nuts, dairy, and sesame.",
    homeRecipe: {
      equipments: ["Marble Slab", "Offset Spatula", "Digital Infrared Thermometer", "Double Boiler"],
      temperatures: { melt: "48°C / 118°F", cool: "27°C / 80°F", work: "31.5°C / 89°F" },
      steps: [
        "Melt 72% cocoa mass over a gentle water bath to exactly 48°C.",
        "Pour 2/3 onto a cool marble slab. Agitate continuously with a spatula until thickened to 27°C.",
        "Re-combine with remaining warm chocolate to stabilize at 31.5°C.",
        "Pour into heated polycarbonate molds and tap firmly to release micro air bubbles.",
      ],
    },
  },
  {
    id: "sea-salt-caramel",
    name: "Sea Salt Caramel Velvet",
    category: "Praliné",
    cacao: "68%",
    price: 26,
    weight: "110g / 3.88oz",
    origin: "Brittany, France",
    desc: "Slow-cooked golden butter caramel infused with hand-harvested Fleur de Sel, wrapped in velvety cocoa.",
    tastingNotes: ["Butter Caramel", "Fleur de Sel", "Toasted Pecan", "Warm Honey"],
    image: "https://images.unsplash.com/photo-1581798459219-318e76aecc7b?q=80&w=1000&auto=format&fit=crop",
    ingredientsList: [
      "68.0% Venezuelan Cocoa Mass",
      "15.0% Heavy Cream & Cultured Butter (Brittany)",
      "12.0% Organic Cane Sugar",
      "4.5% Fleur de Sel de Guérande",
      "0.5% Organic Vanilla Extract",
    ],
    allergens: "Contains Milk/Dairy. May contain traces of hazelnuts and almonds.",
    homeRecipe: {
      equipments: ["Heavy-Bottomed Copper Pot", "Candy Thermometer", "Chocolate Dip Fork"],
      temperatures: { melt: "45°C / 113°F", cool: "28°C / 82°F", work: "30°C / 86°F" },
      steps: [
        "Caramelize sugar to deep amber (175°C), then gently whisk in warm heavy cream and butter.",
        "Stir in Fleur de Sel and allow caramel ganache to set at room temperature for 12 hours.",
        "Pipe into tempered 68% dark chocolate shell casings and seal with a warm spatula.",
      ],
    },
  },
  {
    id: "hazelnut-praline",
    name: "Hazelnut Praliné Crisp",
    category: "Praliné",
    cacao: "64%",
    price: 28,
    weight: "120g / 4.2oz",
    origin: "Piedmont, Italy",
    desc: "Slow-roasted Piedmont IGP hazelnut praliné layered with caramelized wafer crunch and dark gianduja.",
    tastingNotes: ["Piedmont Hazelnut", "Wafer Crunch", "Dark Gianduja", "Brown Butter"],
    image: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?q=80&w=1000&auto=format&fit=crop",
    ingredientsList: [
      "40.0% Piedmont IGP Hazelnut Paste",
      "35.0% 64% Ecuador Dark Cocoa Mass",
      "15.0% Caramelized Feuilletine Wafer Crumb",
      "10.0% Clarified Brown Butter & Sugar",
    ],
    allergens: "Contains Tree Nuts (Hazelnuts) and Gluten (Wafer).",
    homeRecipe: {
      equipments: ["Food Processor / Refiner", "Guitar Cutter", "Melting Bowl"],
      temperatures: { melt: "42°C / 107°F", cool: "26°C / 78°F", work: "29.5°C / 85°F" },
      steps: [
        "Roast Piedmont hazelnuts at 150°C for 20 minutes until golden, then refine with caramelized sugar into smooth praliné paste.",
        "Fold in warm melted gianduja and crushed crispy feuilletine wafers.",
        "Spread into a 1cm frame, chill until set, then cut into square bonbons and enrobe in 64% dark chocolate.",
      ],
    },
  },
  {
    id: "madagascar-85",
    name: "Madagascar 85% Reserve",
    category: "Single Origin",
    cacao: "85%",
    price: 30,
    weight: "100g / 3.5oz",
    origin: "Sambirano Valley, Madagascar",
    desc: "Rare high-altitude cacao with vibrant red berry acidity, plum accents, and a clean mahogany finish.",
    tastingNotes: ["Red Currant", "Plum Jam", "Wild Honey", "Subtle Tobacco"],
    image: "https://images.unsplash.com/photo-1511381939415-e44015466834?q=80&w=1000&auto=format&fit=crop",
    ingredientsList: [
      "85.0% Sambirano Organic Cocoa Beans",
      "10.0% Organic Cocoa Butter",
      "5.0% Organic Cane Sugar",
    ],
    allergens: "Vegan & Gluten-free. Produced on dedicated nut-free line.",
    homeRecipe: {
      equipments: ["Conching Machine / Stone Melangeur", "Polycarbonate Bar Mold"],
      temperatures: { melt: "50°C / 122°F", cool: "28°C / 82°F", work: "32°C / 89°F" },
      steps: [
        "Winnow fermented Sambirano beans to isolate pure cacao nibs.",
        "Refine in stone melangeur for 48 hours to preserve natural fruity polyphenols.",
        "Seed-temper by adding 15% unmelted tempered chocolate chips at 32°C, then mold into bar shapes.",
      ],
    },
  },
  {
    id: "pistachio-velvet",
    name: "Pistachio Velvet Bar",
    category: "Single Origin",
    cacao: "65%",
    price: 32,
    weight: "115g / 4.0oz",
    origin: "Bronte, Sicily",
    desc: "Pure stone-ground Bronte pistachio butter folded into smooth single-origin Ecuadorian dark chocolate.",
    tastingNotes: ["Sicilian Pistachio", "Creamy Cocoa", "White Salt", "Cardamom"],
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=1000&auto=format&fit=crop",
    ingredientsList: [
      "35.0% Bronte DOP Pistachio Puree",
      "45.0% Ecuadorian Arriba Nacional Cocoa",
      "15.0% Organic Cocoa Butter",
      "4.8% Cane Sugar",
      "0.2% Maldon Sea Salt",
    ],
    allergens: "Contains Pistachios (Tree Nuts).",
    homeRecipe: {
      equipments: ["High-speed Stone Grinder", "Silicone Piping Bag"],
      temperatures: { melt: "45°C / 113°F", cool: "27°C / 80°F", work: "30.5°C / 87°F" },
      steps: [
        "Blanch Bronte pistachios, peel skin, and grind with a pinch of salt until silk-smooth.",
        "Emulsify pistachio velvet with warm 65% dark chocolate at 30.5°C.",
        "Layer into molds and top with hand-crushed whole roasted pistachios.",
      ],
    },
  },
  {
    id: "espresso-dark",
    name: "Espresso Dark Infusion",
    category: "Dark Chocolate",
    cacao: "75%",
    price: 25,
    weight: "100g / 3.5oz",
    origin: "Yirgacheffe, Ethiopia",
    desc: "Single-origin washed Ethiopian Yirgacheffe coffee beans micro-ground directly with roasted dark cacao nibs.",
    tastingNotes: ["Dark Espresso", "Roasted Cacao", "Black Cherry", "Dark Caramel"],
    image: "https://images.unsplash.com/photo-1548907040-4baa42d10919?q=80&w=1000&auto=format&fit=crop",
    ingredientsList: [
      "75.0% Washed Ethiopian Cacao Mass",
      "15.0% Micro-Ground Yirgacheffe Espresso Beans",
      "8.0% Organic Cocoa Butter",
      "2.0% Raw Cane Sugar",
    ],
    allergens: "Contains Caffeine. Vegan.",
    homeRecipe: {
      equipments: ["Burr Grinder", "Tempering Bowl"],
      temperatures: { melt: "49°C / 120°F", cool: "27.5°C / 81°F", work: "31°C / 88°F" },
      steps: [
        "Grind fresh Yirgacheffe coffee beans to extra-fine espresso powder.",
        "Fold coffee directly into 75% dark chocolate during the final 4 hours of conching.",
        "Temper over ice bath to 31°C and set in debossed Noir molds.",
      ],
    },
  },
  {
    id: "white-vanilla-truffle",
    name: "Tahitian Vanilla Truffle",
    category: "Truffles",
    cacao: "38%",
    price: 34,
    weight: "140g / 4.9oz",
    origin: "Tahiti, French Polynesia",
    desc: "Silky 38% white cocoa butter truffle center infused with rare Tahitian vanilla caviar, dusted with crushed cocoa nibs.",
    tastingNotes: ["Floral Vanilla", "Sweet Cream", "Butterscotch", "Crisp Nibs"],
    image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?q=80&w=1000&auto=format&fit=crop",
    ingredientsList: [
      "38.0% Single-Estate Deodorized Cocoa Butter",
      "30.0% Whole Alpine Whole Milk Powder",
      "25.0% Cane Sugar",
      "6.5% Tahitian Vanilla Bean Seeds",
      "0.5% Sea Salt",
    ],
    allergens: "Contains Milk/Dairy.",
    homeRecipe: {
      equipments: ["Melting Pan", "Melon Baller / Scoop", "Cocoa Powder Dredger"],
      temperatures: { melt: "40°C / 104°F", cool: "25°C / 77°F", work: "28.5°C / 83°F" },
      steps: [
        "Infuse warm heavy cream with split Tahitian vanilla pods for 1 hour.",
        "Emulsify cream into melted 38% white chocolate to form a rich ganache core.",
        "Chill, scoop into spheres, roll in dark roasted cocoa nibs, and dust with powdered cacao.",
      ],
    },
  },
  {
    id: "ruby-rose-petal",
    name: "Ruby Rose Petal Reserve",
    category: "Specialty",
    cacao: "47%",
    price: 36,
    weight: "105g / 3.7oz",
    origin: "Damascus & Brazil",
    desc: "Naturally pink Ruby cacao pod extract infused with organic Damask rose oil and crystallised rose petals.",
    tastingNotes: ["Tart Raspberry", "Fresh Rose Water", "Lychee", "Creamy Cocoa"],
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=1000&auto=format&fit=crop",
    ingredientsList: [
      "47.0% Fermented Ruby Cocoa Beans",
      "25.0% Cocoa Butter",
      "20.0% Organic Sugar",
      "7.5% Crystallized Organic Rose Petals",
      "0.5% Bulgarian Rose Essence",
    ],
    allergens: "Nut-free. Contains natural berry acids.",
    homeRecipe: {
      equipments: ["Thermometer", "Decorating Tweezers"],
      temperatures: { melt: "44°C / 111°F", cool: "26.5°C / 79°F", work: "29°C / 84°F" },
      steps: [
        "Melt Ruby cacao gently without exceeding 44°C to preserve natural pink hue.",
        "Add 2 drops of food-grade Damask rose water essence.",
        "Pour into bar mold and press hand-picked candied rose petals into top surface before crystal setting.",
      ],
    },
  },
  {
    id: "smoked-almond-dark",
    name: "Oak Smoked Almond Dark",
    category: "Dark Chocolate",
    cacao: "70%",
    price: 27,
    weight: "115g / 4.0oz",
    origin: "Valencia, Spain",
    desc: "Spanish Marcona almonds cold-smoked over bourbon oak casks, embedded in 70% dark Spanish cacao.",
    tastingNotes: ["Oak Smoke", "Marcona Almond", "Smoky Molasses", "Bitter Sweet"],
    image: "https://images.unsplash.com/photo-1511381939415-e44015466834?q=80&w=1000&auto=format&fit=crop",
    ingredientsList: [
      "40.0% Spanish Marcona Almonds",
      "42.0% 70% Dark Cacao Mass",
      "12.0% Cocoa Butter",
      "5.8% Sugar",
      "0.2% Smoked Oak Sea Salt",
    ],
    allergens: "Contains Almonds (Tree Nuts).",
    homeRecipe: {
      equipments: ["Cold Smoker / Smoking Gun", "Roasting Tray"],
      temperatures: { melt: "48°C / 118°F", cool: "27°C / 80°F", work: "31°C / 88°F" },
      steps: [
        "Cold smoke Marcona almonds using oak wood chips for 45 minutes.",
        "Roast smoked almonds at 160°C until crunchy.",
        "Pour tempered 70% dark chocolate over whole smoked almonds on parchment.",
      ],
    },
  },
  {
    id: "earl-grey-ganache",
    name: "Earl Grey Bergamot Bar",
    category: "Single Origin",
    cacao: "66%",
    price: 29,
    weight: "100g / 3.5oz",
    origin: "Calabria, Italy & Ceylon",
    desc: "Single-origin Ceylon black tea and wild Calabrian bergamot oil steeped into silky dark ganache.",
    tastingNotes: ["Calabrian Bergamot", "Black Tea Tannins", "Citrus Blossom", "Warm Cocoa"],
    image: "https://images.unsplash.com/photo-1581798459219-318e76aecc7b?q=80&w=1000&auto=format&fit=crop",
    ingredientsList: [
      "66.0% Ceylon Single-Origin Cocoa Mass",
      "18.0% Cocoa Butter",
      "12.0% Organic Sugar",
      "3.5% First-Flush Earl Grey Tea Leaves",
      "0.5% Cold-Pressed Bergamot Peel Oil",
    ],
    allergens: "Vegan. Gluten-free.",
    homeRecipe: {
      equipments: ["Fine Mesh Strainer", "Saucepan"],
      temperatures: { melt: "46°C / 115°F", cool: "27°C / 80°F", work: "30.5°C / 87°F" },
      steps: [
        "Steep loose leaf Earl Grey in warm cocoa butter for 2 hours.",
        "Strain out tea leaves thoroughly using ultra-fine mesh.",
        "Blend tea-infused cocoa butter back into melted 66% chocolate and temper.",
      ],
    },
  },
  {
    id: "matcha-crisp-white",
    name: "Uji Matcha White Velvet",
    category: "Specialty",
    cacao: "40%",
    price: 33,
    weight: "110g / 3.88oz",
    origin: "Kyoto, Japan",
    desc: "Ceremonial grade A Uji Matcha stone-ground into pure cocoa butter with toasted puffed rice crunch.",
    tastingNotes: ["Uji Matcha", "Toasted Rice", "Grassy Cream", "Umami Sweetness"],
    image: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?q=80&w=1000&auto=format&fit=crop",
    ingredientsList: [
      "40.0% Deodorized Cocoa Butter",
      "25.0% Ceremonial Uji Matcha Powder (Grade A)",
      "20.0% Milk Powder",
      "10.0% Genmai Toasted Puffed Rice",
      "5.0% Sugar",
    ],
    allergens: "Contains Milk. May contain gluten from puffed rice.",
    homeRecipe: {
      equipments: ["Bamboo Whisk (Chasen)", "Conch Bowl"],
      temperatures: { melt: "42°C / 107°F", cool: "26°C / 78°F", work: "29°C / 84°F" },
      steps: [
        "Sift ceremonial Uji matcha into melted cocoa butter and whisk vigorously until smooth.",
        "Add puffed genmai rice crisps for crunch.",
        "Pour into bar molds and chill at 12°C for 30 minutes.",
      ],
    },
  },
  {
    id: "passionfruit-dark",
    name: "Passionfruit Caramel Noir",
    category: "Praliné",
    cacao: "71%",
    price: 35,
    weight: "125g / 4.4oz",
    origin: "Ecuador & Peru",
    desc: "Tart Amazonian passionfruit caramel liquid center enclosed in a 71% Ecuadorian dark chocolate shell.",
    tastingNotes: ["Tropical Passionfruit", "Bright Acidity", "Golden Caramel", "Deep Cocoa"],
    image: "https://images.unsplash.com/photo-1548907040-4baa42d10919?q=80&w=1000&auto=format&fit=crop",
    ingredientsList: [
      "71.0% Ecuadorian Dark Cocoa Mass",
      "15.0% Amazonian Passionfruit Puree",
      "10.0% Organic Caramelized Cane Sugar",
      "3.8% Cocoa Butter",
      "0.2% Lime Zest",
    ],
    allergens: "Vegan. Gluten-free.",
    homeRecipe: {
      equipments: ["Pastry Piping Bag", "Polycarbonate Sphere Molds"],
      temperatures: { melt: "48°C / 118°F", cool: "27°C / 80°F", work: "31°C / 88°F" },
      steps: [
        "Reduce fresh passionfruit juice with sugar until thick syrup consistency.",
        "Create thin tempered 71% dark chocolate spherical shells.",
        "Pipe cooled passionfruit caramel inside, leaving 2mm rim, and cap with dark chocolate.",
      ],
    },
  },
];

export default function ProductCollection({ onOpenDetails }: ProductCollectionProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Dark Chocolate", "Praliné", "Single Origin", "Truffles", "Specialty"];

  const filteredProducts =
    activeCategory === "All"
      ? PRODUCTS_DATA
      : PRODUCTS_DATA.filter((p) => p.category === activeCategory);

  return (
    <section id="collection" className="py-28 px-6 md:px-12 max-w-7xl mx-auto relative">
      {/* Section Header */}
      <div className="text-center space-y-4 mb-16">
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs uppercase tracking-[0.3em] text-caramel font-medium"
        >
          Slow Batch Creation
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-4xl sm:text-6xl text-cream tracking-wide font-light"
        >
          THE COLLECTION
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-serif text-lg sm:text-xl text-cream/70 italic font-light max-w-md mx-auto"
        >
          “Chocolate crafted for slow moments. Every creation includes complete ingredient ratios & home recipes.”
        </motion.p>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 pt-6"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 border ${
                activeCategory === cat
                  ? "border-champagne bg-champagne text-espresso shadow-lg shadow-champagne/10"
                  : "border-champagne/20 text-cream/70 hover:border-champagne/50 hover:text-cream bg-dark-choc/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onOpenDetails={onOpenDetails}
          />
        ))}
      </div>
    </section>
  );
}
