/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CapProduct, Review } from "./types";

export const COLOR_OPTIONS = {
  IVORY: { name: "Royal Ivory White (سیفد)", hex: "#F3F4F1", bgClass: "bg-[#F3F4F1]" },
  WALNUT: { name: "Classy Walnut Brown (اخروٹی)", hex: "#5D4C46", bgClass: "bg-[#5D4C46]" },
  STONE_GREY: { name: "Stonemason Grey (سرمئی)", hex: "#8A8D8F", bgClass: "bg-[#8A8D8F]" },
  CHARCOAL: { name: "Salar Charcoal Black (کالا)", hex: "#2C2C2C", bgClass: "bg-[#2C2C2C]" },
  CEREMONIAL_RED: { name: "Heritage Crimson Rose (سرخ)", hex: "#801818", bgClass: "bg-[#801818]" },
};

export const PRODUCTS: CapProduct[] = [
  {
    id: "royal-neelam-ivory",
    name: "Royal White Chitrali Pakol",
    urduName: "نیلم چترالی ٹوپی - شاہی سفید",
    description: "The absolute zenith of Chitrali craft. Hand-woven from pure, ultra-fine white lamb's wool (Shu). Features a soft luxurious double-molded rim and an optional premium peacock feather mount.",
    price: 85,
    rating: 4.9,
    reviewsCount: 142,
    colors: [COLOR_OPTIONS.IVORY, COLOR_OPTIONS.WALNUT, COLOR_OPTIONS.STONE_GREY],
    sizes: ["S (55-56cm)", "M (57-58cm)", "L (59-60cm)", "XL (61-62cm)"],
    imageUrl: "https://chitralisaughat.com/wp-content/uploads/2025/11/chitrali-cap-7-600x600.webp",
    isFeatured: true,
    hasFeatherIncluded: true,
    category: "pakol",
    storyDescription: "Spun from the finest early spring fleece of the pure-breed mountain sheep. Each Royal white cap takes an experienced weaver over 12 days of meticulous loom work and manual molding."
  },
  {
    id: "classic-walnut-pakol",
    name: "Classic Walnut Chitrali Pakol",
    urduName: "روایتی چترالی ٹوپی - اخروٹی مٹی",
    description: "The timeless heritage icon worn daily in the valleys of Chitral. Exceptionally durable handspun sheep's wool with strong insulated properties that regulate temperature naturally.",
    price: 49,
    rating: 4.8,
    reviewsCount: 218,
    colors: [COLOR_OPTIONS.WALNUT, COLOR_OPTIONS.STONE_GREY, COLOR_OPTIONS.CHARCOAL],
    sizes: ["S (55-56cm)", "M (57-58cm)", "L (59-60cm)"],
    imageUrl: "https://chitralisaughat.com/wp-content/uploads/2025/11/chitrali-cap-3-600x600.webp",
    isFeatured: true,
    hasFeatherIncluded: false,
    category: "pakol",
    storyDescription: "Inspired by the organic shades of the Chitral walnut trees. Highly rugged, windproof, and designed to look more handsome as it ages and molds perfectly to your head shape."
  },
  {
    id: "salar-charcoal-black",
    name: "Salar Black Chitrali Pakol",
    urduName: "سالار چترالی ٹوپی - گہرا کالا",
    description: "A commanding and elegant modern interpretation. Dense, rich charcoal black-grey weave made from mountain ram's wool, offering superior warmth, double structural fold, and weather resistance.",
    price: 58,
    rating: 4.9,
    reviewsCount: 89,
    colors: [COLOR_OPTIONS.CHARCOAL, COLOR_OPTIONS.STONE_GREY, COLOR_OPTIONS.IVORY],
    sizes: ["M (57-58cm)", "L (59-60cm)", "XL (61-62cm)"],
    imageUrl: "https://chitralisaughat.com/wp-content/uploads/2025/11/chitrali-cap-6-600x600.webp",
    isFeatured: false,
    hasFeatherIncluded: false,
    category: "pakol",
    storyDescription: "Salar weave is favored by political statesmen and community leaders because of its pristine uniform dark thread consistency, requiring double brushing of the handspun wool."
  },
  {
    id: "stonemason-mountain-grey",
    name: "Grey Wool Chitrali Pakol",
    urduName: "سنگ مرمر چترالی ٹوپی - چٹانی سرمئی",
    description: "Honoring the rugged stone villages of Upper Chitral. A beautifully textured melange grey weft crafted from local wool, ideal for both crisp autumn breezes and bright mountain sunshine.",
    price: 52,
    rating: 4.7,
    reviewsCount: 64,
    colors: [COLOR_OPTIONS.STONE_GREY, COLOR_OPTIONS.CHARCOAL, COLOR_OPTIONS.WALNUT],
    sizes: ["S (55-56cm)", "M (57-58cm)", "L (59-60cm)"],
    imageUrl: "https://chitralisaughat.com/wp-content/uploads/2025/11/chitrali-cap-5-600x600.webp",
    isFeatured: false,
    hasFeatherIncluded: false,
    category: "pakol",
    storyDescription: "Crafted directly in Garam Chashma (the thermal water valleys), this wool gets washed in pure mineral water springs, granting it unmatched structural bounce."
  },
  {
    id: "ceremonial-crimson-heritage",
    name: "Ceremonial Markhor Pakol",
    urduName: "چنبیلی و لال چترالی ٹوپی - شاہکار سرخ",
    description: "A rare collector's edition. Hand-dyed using organic wild madder roots to retrieve an rich, deep heritage crimson rose hue. Beautifully styled for weddings and historical celebrations.",
    price: 75,
    rating: 5.0,
    reviewsCount: 31,
    colors: [COLOR_OPTIONS.CEREMONIAL_RED, COLOR_OPTIONS.IVORY],
    sizes: ["M (57-58cm)", "L (59-60cm)"],
    imageUrl: "https://chitralisaughat.com/wp-content/uploads/2025/11/Chitrali-Cap-with-Markhor-Design-2-600x600.webp",
    isFeatured: true,
    hasFeatherIncluded: true,
    category: "pakol",
    storyDescription: "Representing royal gifts passed down between Kings of Chitral (Mehtars). Strictly limited to small batches of 5 pieces per season due to the complex organic dyeing cycle."
  },
  {
    id: "pure-mountain-shilajit",
    name: "Authentic Chitral Shilajit Resin",
    urduName: "خالص چترالی شالاجیت",
    description: "Premium grade gold-extracted authentic Shilajit resin sourced from high-altitude 4,500m peaks of Hindu Kush. Purified slowly with natural springs water, providing 85+ essential minerals.",
    price: 65,
    rating: 4.9,
    reviewsCount: 178,
    colors: [{ name: "Pure Resin", hex: "#1a1a1a", bgClass: "bg-[#1a1a1a]" }],
    sizes: ["20g Glass Jar", "50g Glass Jar"],
    imageUrl: "https://chitralisaughat.com/wp-content/uploads/2025/11/Shelajeet-2.webp",
    isFeatured: true,
    hasFeatherIncluded: false,
    category: "ingredients",
    storyDescription: "Exuded from high tectonic mountain joints under summer sun. We purify the raw resin with zero heat to preserve its powerful trace elements, organic fulvic acid, and pure bio-active vitality."
  },
  {
    id: "wild-thyme-honey",
    name: "Pure Chitrali Mountain Honey",
    urduName: "جنگلی شہد - خالص و نامیاتی",
    description: "Rare aromatic organic mountain honey, free-harvested by local wild bees from early spring thyme flower buds across Upper Chitral's blooming mountain valleys.",
    price: 38,
    rating: 4.8,
    reviewsCount: 92,
    colors: [{ name: "Amber Gold", hex: "#D97706", bgClass: "bg-amber-600" }],
    sizes: ["250g Jar", "500g Jar"],
    imageUrl: "https://chitralisaughat.com/wp-content/uploads/2025/11/Pure-Honey-5-600x600.webp",
    isFeatured: true,
    hasFeatherIncluded: false,
    category: "ingredients",
    storyDescription: "Gathered from bees nesting on high mountain cliffs. It is unheated, raw, and contains traces of nutritious flower pollen and enzymes that give it a uniquely spicy, herbal fragrance."
  },
  {
    id: "royal-shigar-apricots",
    name: "Premium Dried Apricots",
    urduName: "خشک خوبانی - چترالی نامیاتی",
    description: "Premium, intensely sun-dried royal golden apricots from Bumburet. Succulent, naturally sweet, unsulfured, and high in fiber and active trace minerals.",
    price: 24,
    rating: 4.7,
    reviewsCount: 81,
    colors: [{ name: "Sun Orange", hex: "#EA580C", bgClass: "bg-orange-600" }],
    sizes: ["500g Pack", "1kg Pack"],
    imageUrl: "https://images.unsplash.com/photo-1595130796395-5ff1495c0261?q=80&w=600&auto=format&fit=crop",
    isFeatured: false,
    hasFeatherIncluded: false,
    category: "ingredients",
    storyDescription: "Our sweet kernel apricots are carefully de-stoned and naturally air-dried under intense sun rays at the pristine orchards of Kalash valleys, leaving them perfectly soft and chewy."
  },
  {
    id: "wild-mountain-walnuts",
    name: "Premium Chitrali Walnut Kernels",
    urduName: "چلی پوست اخروٹ گری",
    description: "Extra light, crisp organic wild mountain walnut kernels with high essential fatty acids, sorted carefully by hand to preserve large beautiful halves.",
    price: 29,
    rating: 4.8,
    reviewsCount: 71,
    colors: [{ name: "Natural Kernel", hex: "#D6C0B3", bgClass: "bg-[#D6C0B3]" }],
    sizes: ["400g Pack", "800g Pack"],
    imageUrl: "https://chitralisaughat.com/wp-content/uploads/2025/11/Walnut-5.webp",
    isFeatured: false,
    hasFeatherIncluded: false,
    category: "ingredients",
    storyDescription: "Grown wild on century-old walnut forest trees fed solely by glacial water streams. Hand-cracked on flat mountain stone to keep their delicate shape without crushing."
  },
  {
    id: "royal-saffron-kesar",
    name: "Royal Chitral Gold Saffron",
    urduName: "شاہی زعفران - پریمیم سرخ",
    description: "Extremely rare organic royal crimson saffron stigmas from mountain terraces, hand-gathered at dawn to preserve active safranal molecules.",
    price: 45,
    rating: 5.0,
    reviewsCount: 46,
    colors: [{ name: "Deep Red", hex: "#B91C1C", bgClass: "bg-red-700" }],
    sizes: ["2g Gold Jar", "5g Gold Jar"],
    imageUrl: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=600&auto=format&fit=crop",
    isFeatured: true,
    hasFeatherIncluded: false,
    category: "ingredients",
    storyDescription: "Grown along high terrace slopes where cold morning dew yields the highest concentration of aroma and crocin levels. Perfect for luxury culinary crafts and tea infusions."
  },
  {
    id: "royal-crown-chugha",
    name: "The Royal Crown Chugha",
    urduName: "شاہی چترالی چغہ - سفید",
    description: "The ultimate winter prestige. A majestic long, winter-facing woolen coat crafted from pristine white lamb's wool (Shu), featuring ornate golden braid embroidery around the collar and cuffs.",
    price: 290,
    rating: 5.0,
    reviewsCount: 28,
    colors: [COLOR_OPTIONS.IVORY],
    sizes: ["M (Standard)", "L (Standard)", "XL (Standard)"],
    imageUrl: "https://chitralisaughat.com/wp-content/uploads/2025/11/Chitrali-Chugha-%DA%86%D8%BA%DB%81-1.webp",
    isFeatured: true,
    hasFeatherIncluded: false,
    category: "choga",
    storyDescription: "A custom-woven ceremonial robe presented anciently to royal delegates. Keeps the body perfectly isolated against glacial winds and heavy peak snowfall."
  },
  {
    id: "nomad-earth-chugha",
    name: "The Nomad Earth Chugha",
    urduName: "روایتی چوغہ - اخروٹی مٹی",
    description: "Highly rugged and classic double-breasted long woolen coat in organic walnut sheep's wool. Styled with authentic leather toggle closures and dense double weft lining.",
    price: 185,
    rating: 4.8,
    reviewsCount: 37,
    colors: [COLOR_OPTIONS.WALNUT, COLOR_OPTIONS.STONE_GREY],
    sizes: ["S (Standard)", "M (Standard)", "L (Standard)"],
    imageUrl: "https://chitralisaughat.com/wp-content/uploads/2025/11/Chitrali-Chugha-%DA%86%D8%BA%DB%81-4.webp",
    isFeatured: false,
    hasFeatherIncluded: false,
    category: "choga",
    storyDescription: "Made to age beautifully, reflecting the mountain walnut tree tones. Heavy, highly windproof, and comfortable during long travels."
  },
  {
    id: "salar-sovereign-chugha",
    name: "The Salar Sovereign Chugha",
    urduName: "سالار صدارتی چوغہ - گہرا کالا",
    description: "A sleek, commanding interpretation using deep Salar charcoal black sheep's wool. Features a modern minimalist cut and thick traditional embroidery lining.",
    price: 240,
    rating: 4.9,
    reviewsCount: 19,
    colors: [COLOR_OPTIONS.CHARCOAL],
    sizes: ["M (Standard)", "L (Standard)", "XL (Standard)"],
    imageUrl: "https://chitralisaughat.com/wp-content/uploads/2025/11/Chitrali-Chugha-%DA%86%D8%BA%DB%81-3.webp",
    isFeatured: true,
    hasFeatherIncluded: false,
    category: "choga",
    storyDescription: "Handspun with extra dense threads of sheep wool. Favored for modern winter events, dinners, and national state ceremonies."
  },
  {
    id: "waistcoat-royal-walnut",
    name: "The Royal Elite Waistcoat",
    urduName: "شاہی واسکوٹ - کلاسیکی اخروٹی",
    description: "This classic handloomed woolen waistcoat is made from pure Shu sheep's wool. Styled beautifully with raw brass front buttons, standard lining, and neat exterior pockets.",
    price: 95,
    rating: 4.9,
    reviewsCount: 42,
    colors: [COLOR_OPTIONS.WALNUT, COLOR_OPTIONS.STONE_GREY],
    sizes: ["M", "L", "XL"],
    imageUrl: "https://chitralwool.com/cdn/shop/files/DSC_0769.jpg?v=1762635208&width=1200",
    isFeatured: true,
    hasFeatherIncluded: false,
    category: "waistcoat",
    storyDescription: "Tailored to offer standard core warmth over kurtas or shirts. Woven tightly using ancestral handloom setups and washed in mineral thermal waters."
  },
  {
    id: "waistcoat-salar-charcoal",
    name: "The Salar Waistcoat",
    urduName: "سالار صدارتی واسکوٹ - کالا",
    description: "Steeped in dignity. Crafted from premium Salar charcoal black double-brushed wool with ornate traditional collar braid lining.",
    price: 110,
    rating: 4.8,
    reviewsCount: 33,
    colors: [COLOR_OPTIONS.CHARCOAL],
    sizes: ["M", "L", "XL"],
    imageUrl: "https://chitralwool.com/cdn/shop/files/DSC_0769.jpg?v=1762635208&width=1200",
    isFeatured: false,
    hasFeatherIncluded: false,
    category: "waistcoat",
    storyDescription: "Command comfort with heavy double-molded structure, offering timeless elegance for formal gatherings."
  },
  {
    id: "shawl-heritage-ivory",
    name: "The Royal Pashmina Shawl",
    urduName: "شاہی چترالی لوئی - سفید",
    description: "The majestic traditional winter wrap (Loi). Sized generously in fine white lamb's wool, offering delicate thermal qualities and extremely soft touch.",
    price: 125,
    rating: 4.9,
    reviewsCount: 56,
    colors: [COLOR_OPTIONS.IVORY],
    sizes: ["Standard (2.5m x 1.25m)"],
    imageUrl: "https://chitralwool.com/cdn/shop/files/20241018-SUP_6123.jpg?v=1729288904&width=1200",
    isFeatured: true,
    hasFeatherIncluded: false,
    category: "shawl",
    storyDescription: "The absolute standard of security against cold air drafts. Sourced directly from Bumburet artisans."
  },
  {
    id: "shawl-stonemason-grey",
    name: "The Stonemason Loi Shawl",
    urduName: "سنگ مرمر چترالی لوئی - سرمئی",
    description: "Rugged and tightly-woven melange grey heritage shawl. Natural lanolin water resistance guarantees amazing durability.",
    price: 85,
    rating: 4.7,
    reviewsCount: 29,
    colors: [COLOR_OPTIONS.STONE_GREY, COLOR_OPTIONS.WALNUT],
    sizes: ["Standard (2.5m x 1.25m)"],
    imageUrl: "https://chitralwool.com/cdn/shop/files/20241018-SUP_6076.jpg?v=1729287157&width=1200",
    isFeatured: false,
    hasFeatherIncluded: false,
    category: "shawl",
    storyDescription: "A durable general-purpose wrap worn daily by local travelers crossing Hindukush high peaks."
  },
  {
    id: "coat-highland-charcoal",
    name: "The Highland Woolen Overcoat",
    urduName: "جدید چترالی اوورکوٹ",
    description: "A gorgeous single-breasted overcoat blending traditional Chitrali handspun Shu wool with a modern tailored slim-cut collar.",
    price: 210,
    rating: 4.9,
    reviewsCount: 18,
    colors: [COLOR_OPTIONS.CHARCOAL, COLOR_OPTIONS.STONE_GREY],
    sizes: ["M", "L", "XL"],
    imageUrl: "https://chitralwool.com/cdn/shop/files/DSC_0769.jpg?v=1762635208&width=1200",
    isFeatured: true,
    hasFeatherIncluded: false,
    category: "coat",
    storyDescription: "Features premium horn buttons, silk-blend interior lining, and weatherized handwarmer pockets."
  },
  {
    id: "coat-heritage-walnut",
    name: "The Classic Tailored Coat",
    urduName: "کلاسک چترالی کوٹ - اخروٹی",
    description: "Sophistication meets Himalayan wool. Distinctive textured weave crafted in premium walnut-hued spring lamb fleece.",
    price: 195,
    rating: 4.8,
    reviewsCount: 24,
    colors: [COLOR_OPTIONS.WALNUT],
    sizes: ["S", "M", "L"],
    imageUrl: "https://chitralisaughat.com/wp-content/uploads/2025/11/Chitrali-Chugha-%DA%86%D8%BA%DB%81-5.webp",
    isFeatured: false,
    hasFeatherIncluded: false,
    category: "coat",
    storyDescription: "Features a modern structured silhouette and custom buttoning, delivering the absolute premium taste of active mountain wear."
  }
];

export const REVIEWS: Review[] = [
  {
    id: "r1",
    author: "Zarar Baig",
    rating: 5,
    date: "May 12, 2026",
    comment: "The craftsmanship is absolute perfection. Having grown up in Chitral, I was skeptical of online quality, but this is authentic hand-woven Shu. Fits elegantly and keeping me super warm on cold mornings.",
    verified: true
  },
  {
    id: "r2",
    author: "Eleanor S.",
    rating: 5,
    date: "April 28, 2026",
    comment: "Bought the Royal White as a gift for my husband. It arrives packed in a traditional custom-styled wooden gift case, wrapped in linen. The peacock feather looks incredibly majestic. A true work of art!",
    verified: true
  },
  {
    id: "r3",
    author: "Dr. Mir Afzal",
    rating: 4,
    date: "June 02, 2026",
    comment: "Extremely comfortable and natural wool odor, which confirms zero synthetic fillers or polyester. Feels original and lightweight. Will definitely order the Stonemason Grey variant next.",
    verified: true
  }
];

export const FAQS = [
  {
    question: "How do I accurately measure my head size?",
    answer: "Simply wrap a soft tailor's tape measure around your head, resting about 1/2 inch (1.3cm) above your ears and mid-forehead—exactly where you prefer your cap to sit. Common standard sizes are Small (55-56cm), Medium (57-58cm), Large (59-60cm), and XL (61-62cm). If you are between sizes, we recommend selecting the next size up; the woolen crown is natural and can be slightly stretched."
  },
  {
    question: "What is handspun 'Shu' (Patti) material?",
    answer: "Shu is the indigenous term for the handspun woolen fabric crafted in northern Pakistan. Wool is hand-carded, spun into strong yarn on traditional spindles (charkhas), woven on domestic wooden foot-loom shuttles, and then continuously washed and trampled with water to clean, shrink and compact the fibers. This produces a dense, windproof, water-resistant woolen crown."
  },
  {
    question: "Can I clean or wash my Chitrali Topi?",
    answer: "Since it is made of 100% organic virgin sheep's wool, it should be treated with care. Dry cleaning is highly recommended. For quick home restoration, gently brush it with a soft garment brush. If soiled, spot-clean immediately with a cold damp cloth and mild wool detergent. Never machine-wash, tumble-dry, or boil."
  },
  {
    question: "How do the peacock feather mounts work?",
    answer: "Historically, princes and warriors decorated their caps with feathers for royal court events and polo tournaments. Our Royal and Crimson caps include a tiny hidden wool loop stitched directly inside the fold, and arrive with an authentic ethically sourced iridescent peacock feather. You can slide the feather in for special occasions, or remove it for everyday minimal wear."
  }
];
