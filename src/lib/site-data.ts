export type LocationKey = "raleigh" | "apex" | "durham";

export const links = {
  calendly:
    "https://calendly.com/mammothcoat-info/free-quote-and-surface-assessment",
  call: "tel:+19199193281",
  text: "sms:+19199193281",
};

export const locationKeys: LocationKey[] = ["raleigh", "apex", "durham"];

export type LocationContent = {
  key: LocationKey;
  city: string;
  title: string;
  seoTitle: string;
  description: string;
  heroImage: string;
  beforeImage: string;
  afterImage: string;
  neighborhoods: string[];
};

export const locations: Record<LocationKey, LocationContent> = {
  raleigh: {
    key: "raleigh",
    city: "Raleigh",
    title: "Premium Epoxy Flooring and Concrete Coatings in Raleigh, NC",
    seoTitle: "Raleigh Epoxy Flooring | Mammoth Coatings",
    description:
      "Mammoth Coatings delivers durable, beautiful epoxy floors and concrete coatings for garages, patios, and commercial spaces across Raleigh.",
    heroImage: "/images/raleigh_epoxy.jpg",
    beforeImage: "/images/raleigh_epoxy_walmart_entryway_before.jpg",
    afterImage: "/images/raleigh_epoxy_walmart_entryway_after.jpg",
    neighborhoods: [
      "North Hills",
      "Brier Creek",
      "Five Points",
      "Wake Forest",
      "Knightdale",
    ],
  },
  apex: {
    key: "apex",
    city: "Apex",
    title: "Apex Epoxy Garage Floors and Concrete Coatings Built to Last",
    seoTitle: "Apex Epoxy Flooring | Mammoth Coatings",
    description:
      "From garage floors to outdoor concrete, Mammoth Coatings helps Apex homeowners and businesses get low-maintenance, high-performance finishes.",
    heroImage: "/images/garage_floor_coatoing_raleigh.jpg",
    beforeImage: "/images/2-car-garage-before-v2.jpg",
    afterImage: "/images/2-car-garage-after-v2.jpg",
    neighborhoods: [
      "Downtown Apex",
      "Scotts Mill",
      "Bella Casa",
      "Friendship",
      "Holly Springs Border",
    ],
  },
  durham: {
    key: "durham",
    city: "Durham",
    title: "Durham Concrete Coatings and Epoxy Floors for Homes and Facilities",
    seoTitle: "Durham Epoxy Flooring | Mammoth Coatings",
    description:
      "Mammoth Coatings installs commercial-grade epoxy and concrete coating systems in Durham with quick turnarounds and clean installs.",
    heroImage: "/images/eopxy_raleigh_nc.png",
    beforeImage: "/images/restaurant_before_raleigh_epoxy.jpg",
    afterImage: "/images/restaurant_after_raleigh_epoxy.jpg",
    neighborhoods: [
      "Southpoint",
      "Hope Valley",
      "Trinity Park",
      "Research Triangle Park",
      "Bahama",
    ],
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
