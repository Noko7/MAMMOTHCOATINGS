import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LocationPage } from "@/components/location-page";
import { locationKeys, locations, type LocationKey } from "@/lib/site-data";

type PageProps = {
  params: Promise<{ location: string }>;
};

export function generateStaticParams() {
  return locationKeys.map((location) => ({ location }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { location } = await params;

  if (!locationKeys.includes(location as LocationKey)) {
    return {
      title: "Location Not Found | Mammoth Coatings",
    };
  }

  const locationContent = locations[location as LocationKey];

  return {
    title: locationContent.seoTitle,
    description: locationContent.description,
    openGraph: {
      title: locationContent.seoTitle,
      description: locationContent.description,
      images: [locationContent.heroImage],
      type: "website",
    },
  };
}

export default async function LocationRoutePage({ params }: PageProps) {
  const { location } = await params;

  if (!locationKeys.includes(location as LocationKey)) {
    notFound();
  }

  return <LocationPage locationKey={location as LocationKey} />;
}
