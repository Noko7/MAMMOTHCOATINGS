export type LocationKey = "raleigh" | "apex" | "durham";

export type Service = {
  name: string;
  description: string;
  tier: "primary" | "secondary" | "addon";
};

export const services: Service[] = [
  {
    name: "Epoxy Garage Floor Installation",
    description:
      "Professional epoxy garage floor installation in Raleigh, NC. Durable coatings designed for 1-car and 2-car garages with long-lasting performance and easy maintenance.",
    tier: "primary",
  },
  {
    name: "Garage Floor Coatings",
    description:
      "High-quality garage floor coatings including epoxy, flake, and protective concrete coatings for residential garages.",
    tier: "primary",
  },
  {
    name: "Polyaspartic Coatings",
    description:
      "Zero cracking, peeling, and fading. 1-day application and affordable — set it and forget it. Polyaspartic is faster-curing and more UV-stable than standard epoxy.",
    tier: "primary",
  },
  {
    name: "Flake Epoxy Garage Floors",
    description:
      "Decorative flake epoxy garage floors. Slip-resistant, durable, and ideal for upgrading residential garage spaces with custom color blends.",
    tier: "secondary",
  },
  {
    name: "Metallic Epoxy Flooring",
    description:
      "Metallic epoxy flooring with custom finishes and high-gloss designs. Ideal for garages and modern concrete surfaces.",
    tier: "secondary",
  },
  {
    name: "Concrete Floor Coatings",
    description:
      "Concrete floor coating services including epoxy and protective sealers for garages and residential surfaces.",
    tier: "secondary",
  },
  {
    name: "Polished Concrete",
    description:
      "Polished concrete services for smooth, durable, and low-maintenance concrete floors in homes and commercial spaces.",
    tier: "secondary",
  },
  {
    name: "2-Car Garage Epoxy Floor",
    description:
      "Epoxy flooring for 2-car garages. Designed for durability, easy cleaning, and long-term performance.",
    tier: "addon",
  },
  {
    name: "Garage Floor Resurfacing",
    description:
      "Garage floor resurfacing to repair and upgrade worn or damaged concrete before applying epoxy coatings.",
    tier: "addon",
  },
];

export const polyasparticPoints = [
  "Zero Cracking, Peeling & Fading",
  "1-Day Application",
  "Affordable — Set It & Forget It",
];

export type GalleryImage = { src: string; alt: string };

export const galleryImages: GalleryImage[] = [
  { src: "/images/epoxy_floor_01.jpeg", alt: "Epoxy floor installation" },
  { src: "/images/dark_flakes_epoxy.jpg", alt: "Dark flake epoxy finish" },
  { src: "/images/2-car-garage-after.jpg", alt: "Garage epoxy floor finished result" },
  { src: "/images/2-car-garage-after-v2.jpg", alt: "2-car garage epoxy floor after" },
  { src: "/images/closeup_flakes.jpg", alt: "Close-up of decorative flake epoxy" },
  { src: "/images/basement_after_epoxy.jpg", alt: "Basement floor after epoxy coating" },
  { src: "/images/bathroom_epoxy.jpg", alt: "Bathroom epoxy floor finish" },
  { src: "/images/front_porch_epoxy.jpg", alt: "Front porch concrete coating" },
  { src: "/images/kitchen_epoxy.jpg", alt: "Kitchen epoxy floor" },
  { src: "/images/epoxy_walmart_break_room.jpg", alt: "Commercial break room epoxy floor" },
  { src: "/images/restaurant_after_raleigh_epoxy.jpg", alt: "Restaurant floor epoxy after" },
];

export const links = {
  calendly:
    "https://calendly.com/mammothcoat-info/free-quote-and-surface-assessment",
  call: "tel:+19199192381",
  text: "sms:+19199192381",
};

export const locationKeys: LocationKey[] = ["raleigh", "apex", "durham"];

export type BeforeAfterPair = {
  before: string;
  after: string;
  label: string;
};

export type LocationContent = {
  key: LocationKey;
  city: string;
  title: string;
  seoTitle: string;
  description: string;
  heroImage: string;
  beforeAfterPairs: BeforeAfterPair[];
  neighborhoods: string[];
};

export const locations: Record<LocationKey, LocationContent> = {
  raleigh: {
    key: "raleigh",
    city: "Raleigh",
    title: "Epoxy Flooring & Concrete Coatings in Raleigh, NC",
    seoTitle: "Raleigh Epoxy Flooring | Mammoth Coatings",
    description:
      "Residential and commercial epoxy floors and concrete coatings for garages, patios, retail spaces, and workspaces across Raleigh.",
    heroImage: "/images/raleigh_epoxy.jpg",
    beforeAfterPairs: [
      {
        before: "/images/epoxy_flooring_before_100.jpeg",
        after: "/images/epoxy_flooring_after_100.jpeg",
        label: "Epoxy Floor Upgrade 100",
      },
      {
        before: "/images/epoxy_flooring_before_200.jpeg",
        after: "/images/epoxy_flooring_after_200.jpeg",
        label: "Epoxy Floor Upgrade 200",
      },
    ],
    neighborhoods: ["North Hills", "Brier Creek", "Five Points", "Wake Forest", "Knightdale"],
  },
  apex: {
    key: "apex",
    city: "Apex",
    title: "Epoxy Garage Floors & Concrete Coatings in Apex, NC",
    seoTitle: "Apex Epoxy Flooring | Mammoth Coatings",
    description:
      "From garage floors to outdoor concrete, we help Apex homeowners get low-maintenance, high-performance finishes.",
    heroImage: "/images/garage_floor_coatoing_raleigh.jpg",
    beforeAfterPairs: [
      {
        before: "/images/epoxy_flooring_before_100.jpeg",
        after: "/images/epoxy_flooring_after_100.jpeg",
        label: "Epoxy Floor Upgrade 100",
      },
      {
        before: "/images/epoxy_flooring_before_200.jpeg",
        after: "/images/epoxy_flooring_after_200.jpeg",
        label: "Epoxy Floor Upgrade 200",
      },
    ],
    neighborhoods: ["Downtown Apex", "Scotts Mill", "Bella Casa", "Friendship", "Holly Springs"],
  },
  durham: {
    key: "durham",
    city: "Durham",
    title: "Concrete Coatings & Epoxy Floors in Durham, NC",
    seoTitle: "Durham Epoxy Flooring | Mammoth Coatings",
    description:
      "Commercial-grade epoxy and concrete coating systems in Durham with quick turnarounds and clean installs.",
    heroImage: "/images/eopxy_raleigh_nc.png",
    beforeAfterPairs: [
      {
        before: "/images/epoxy_flooring_before_100.jpeg",
        after: "/images/epoxy_flooring_after_100.jpeg",
        label: "Epoxy Floor Upgrade 100",
      },
      {
        before: "/images/epoxy_flooring_before_200.jpeg",
        after: "/images/epoxy_flooring_after_200.jpeg",
        label: "Epoxy Floor Upgrade 200",
      },
    ],
    neighborhoods: ["Southpoint", "Hope Valley", "Trinity Park", "Research Triangle Park", "Bahama"],
  },
};

export const testimonials = [
  {
    name: "Mark T.",
    city: "Raleigh",
    quote:
      "Mammoth Coatings transformed our garage in one day. The floor looks premium and still cleans up like new.",
  },
  {
    name: "Jasmine R.",
    city: "Apex",
    quote:
      "The team was on time, super respectful, and the final finish exceeded what we expected.",
  },
  {
    name: "Chris D.",
    city: "Durham",
    quote:
      "We needed a durable commercial coating fast. They delivered exactly what they promised.",
  },
];

