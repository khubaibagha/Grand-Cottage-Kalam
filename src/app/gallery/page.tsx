import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { GalleryGrid, type GalleryImage } from "@/components/gallery/gallery-grid";

export const metadata = {
  title: "Gallery | Grand Cottages Kalam",
};

const IMAGES: GalleryImage[] = [
  {
    src: "/assets/images/exterior-snow-mountains.jpg",
    alt: "Cottages framed by the snow-capped peaks above Kalam",
    category: "Exterior",
  },
  {
    src: "/assets/images/exterior-blue-sky-pathway.jpg",
    alt: "Pathway between the cottages on a clear blue-sky morning",
    category: "Exterior",
  },
  {
    src: "/assets/images/exterior-blue-sky-pathway-2.jpg",
    alt: "Another angle of the cottage row under open skies",
    category: "Exterior",
  },
  {
    src: "/assets/images/exterior-row-overcast-day.jpg",
    alt: "The full row of cottages on a soft, overcast afternoon",
    category: "Exterior",
  },
  {
    src: "/assets/images/exterior-row-foggy-dusk.jpg",
    alt: "Mountain fog rolling over the cottages at dusk",
    category: "Exterior",
  },
  {
    src: "/assets/images/exterior-row-foggy-dusk-2.jpg",
    alt: "Cottage lights glowing through the evening mist",
    category: "Exterior",
  },
  {
    src: "/assets/images/exterior-single-cottage-dusk.jpg",
    alt: "A single deluxe cottage as the sun sets behind the ridge",
    category: "Exterior",
  },
  {
    src: "/assets/images/exterior-night-pathway.jpg",
    alt: "The pathway lit up after dark beneath a star-filled sky",
    category: "Exterior",
  },
  {
    src: "/assets/images/interior-bedroom.jpg",
    alt: "A warm, wood-panelled bedroom inside one of the cottages",
    category: "Interior",
  },
];

export default function GalleryPage() {
  return (
    <>
      <SiteHeader variant="solid" />
      <main className="flex-1 bg-mist/30 pt-20">
        <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
          <div className="max-w-2xl">
            <h1 className="font-heading text-3xl text-ink sm:text-4xl">Gallery</h1>
            <p className="mt-3 text-stone">
              A look at the cottages, the pine-covered ridgeline, and the quiet
              mornings that make Grand Cottages Kalam feel like home.
            </p>
          </div>

          <div className="mt-8">
            <GalleryGrid images={IMAGES} />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
