import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { FieldNote } from "@/components/site/field-note";
import {
  GalleryGrid,
  type GalleryItem,
} from "@/components/gallery/gallery-grid";

export const metadata = {
  title: "Gallery | Grand Cottages Kalam",
};

const ITEMS: GalleryItem[] = [
  {
    type: "image",
    src: "/assets/images/exterior-snow-mountains.jpg",
    alt: "Cottages framed by the snow-capped peaks above Kalam",
    category: "Exterior",
  },
  {
    type: "image",
    src: "/assets/images/exterior-blue-sky-pathway.jpg",
    alt: "Pathway between the cottages on a clear blue-sky morning",
    category: "Exterior",
  },
  {
    type: "image",
    src: "/assets/images/exterior-blue-sky-pathway-2.jpg",
    alt: "Another angle of the cottage row under open skies",
    category: "Exterior",
  },
  {
    type: "image",
    src: "/assets/images/exterior-row-overcast-day.jpg",
    alt: "The full row of cottages on a soft, overcast afternoon",
    category: "Exterior",
  },
  {
    type: "image",
    src: "/assets/images/exterior-row-foggy-dusk.jpg",
    alt: "Mountain fog rolling over the cottages at dusk",
    category: "Exterior",
  },
  {
    type: "image",
    src: "/assets/images/exterior-row-foggy-dusk-2.jpg",
    alt: "Cottage lights glowing through the evening mist",
    category: "Exterior",
  },
  {
    type: "image",
    src: "/assets/images/exterior-single-cottage-dusk.jpg",
    alt: "A single deluxe cottage as the sun sets behind the ridge",
    category: "Exterior",
  },
  {
    type: "image",
    src: "/assets/images/exterior-night-pathway.jpg",
    alt: "The pathway lit up after dark beneath a star-filled sky",
    category: "Exterior",
  },
  {
    type: "image",
    src: "/assets/images/interior-bedroom.jpg",
    alt: "A warm, wood-panelled bedroom inside one of the cottages",
    category: "Interior",
  },
  {
    type: "video",
    src: "/assets/videos/resort-reel-1-original-360p.mp4",
    poster: "/assets/images/exterior-blue-sky-pathway.jpg",
    alt: "A first look at Grand Cottages Kalam",
    category: "Video",
  },
  {
    type: "video",
    src: "/assets/videos/resort-reel-2.mp4",
    alt: "Another glimpse of the cottages and the valley beyond",
    category: "Video",
  },
  {
    type: "video",
    src: "/assets/videos/guest-clip-2.mp4",
    alt: "Guests settling in for an evening at the cottages",
    category: "Video",
  },
];

export default function GalleryPage() {
  return (
    <>
      <SiteHeader variant="solid" />
      <main className="flex-1 bg-cream pt-20">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
          <div className="max-w-2xl">
            <FieldNote label="The record" coords="35.49° N · 72.58° E" />
            <h1 className="mt-5 font-heading text-3xl text-ink sm:text-4xl">
              Gallery
            </h1>
            <p className="mt-5 text-base leading-relaxed text-stone">
              A look at the cottages, the pine-covered ridgeline, and the
              quiet mornings that make Grand Cottages Kalam feel like home.
            </p>
          </div>

          <div className="mt-10">
            <GalleryGrid items={ITEMS} />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
