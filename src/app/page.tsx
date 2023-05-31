import CarouselPosts from "@/components/CarouselPosts";
import FeaturedPosts from "@/components/FeaturedPosts";
import Hero from "@/components/Hero";

export default function HomePage() {
  return (
    <>
      <Hero></Hero>
      {/* @ts-expect-error Async Server Component */}
      <FeaturedPosts></FeaturedPosts>
      {/* @ts-expect-error Async Server Component */}
      <CarouselPosts></CarouselPosts>
    </>
  );
}
