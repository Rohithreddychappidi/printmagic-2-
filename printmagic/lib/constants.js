export const SHOP = {
  name: "PrintMagic",
  tagline: "Customized gifts, made for you",
  phone: "8008363345",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918008363345",
  email: "printmagicshop@gmail.com",
  address: "Narayanapuram, Eluru Dist - 534406",
  facebook:
    "https://www.facebook.com/profile.php?id=100088863386122",
  instagram: "https://www.instagram.com/printmagic_gifts",
  hours: [
    { days: "Monday – Friday", time: "9:00 AM – 6:00 PM" },
    { days: "Saturday", time: "9:00 AM – 6:00 PM" },
    { days: "Sunday", time: "Holiday" },
  ],
};

// Category metadata: each category gets one accent colour pulled
// straight from the hexagon mark, so the catalogue reads like a
// shattered-prism index rather than a flat list.
export const CATEGORIES = [
  { slug: "rakhis", label: "Rakhis", color: "coral" },
  { slug: "phone-covers", label: "Phone Covers", color: "teal" },
  { slug: "keychains", label: "Keychains", color: "orange" },
  { slug: "laser-items", label: "Laser Items", color: "sky" },
];

export const CATEGORY_COLOR_MAP = {
  rakhis: { bg: "bg-coral/10", text: "text-coral", ring: "ring-coral/30" },
  "phone-covers": { bg: "bg-teal/10", text: "text-teal", ring: "ring-teal/30" },
  keychains: { bg: "bg-orange/10", text: "text-orange", ring: "ring-orange/30" },
  "laser-items": { bg: "bg-sky/10", text: "text-sky", ring: "ring-sky/30" },
};
