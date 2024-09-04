import { HoverEffect } from "./ui";
export function CardHoverEffectDemo() {
  return (
    <div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={projects} />
    </div>
  );
}

export const projects = [
  {
    title: "Ai BoyFriend",
    description: "",
    link: "https://stripe.com",
    imageUrl: "https://play-lh.googleusercontent.com/vwd2H506u1ybBiHi7iFBnqepjw3ifHEAfEs0BVfZ1h8SKFG-p8wksk1ng5tIj4xKLwA",
  },
  {
    title: "Logo Design",

    description: "",
    link: "https://netflix.com",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqOtyRoG2gPHSeVyoysIRefri1fRKatbHwCw&s",
  },
  {
    title: "Google",
    description: "",
    link: "https://google.com",
    imageUrl: "https://example.com/image3.jpg",
  },
  {
    title: "Meta",
    description: "",
    link: "https://meta.com",
    imageUrl: "https://example.com/image4.jpg",
  },
  {
    title: "Amazon",
    description: "",
    link: "https://amazon.com",
    imageUrl: "https://example.com/image5.jpg",
  },
  {
    title: "Microsoft",
    description: "",
    link: "https://microsoft.com",
    imageUrl: "https://example.com/image6.jpg",
  },
  // Add more projects as needed
];
