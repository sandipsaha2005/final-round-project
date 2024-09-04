import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";

const Example = () => {
  return (
    <div className="bg-neutral-900">
      <div className="flex h-48 items-center justify-center">
        <span className="font-semibold uppercase text-neutral-500 text-4xl">
        Flux.1 AI Features
        </span>
      </div>
      <HorizontalScrollCarousel />
      {/* <div className="flex h-48 items-center justify-center">
        <span className="font-semibold uppercase text-neutral-500">
          Scroll up
        </span>
      </div> */}
    </div>
  );
};

const HorizontalScrollCarousel = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-53%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-neutral-900">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-4">
          {cards.map((card) => {
            return <Card card={card} key={card.id} />;
          })}
        </motion.div>
      </div>
    </section>
  );
};

const Card = ({ card }) => {
  return (
    <div
      key={card.id}
      className="group relative h-[450px] w-[450px] overflow-hidden bg-neutral-200 rounded-md"
    >
      <div
        style={{
          backgroundImage: `url(${card.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110 rounded-md"
      ></div>
      <div className="absolute inset-0 z-10 grid place-content-center">
        <p className="bg-gradient-to-br from-white/20 to-white/0 p-8 text-6xl font-black uppercase text-white backdrop-blur-lg">
          {card.title}
        </p>
      </div>
    </div>
  );
};

export default Example;

const cards = [
    {
      url: "https://cdnblog.picsart.com/2024/02/445095316053201.gif",
      title: "Infinite Flux",
      id: 1,
    },
    {
      url: "https://miro.medium.com/v2/resize:fit:1024/1*9DZa5AlWzLXmjM40jKg6Tg.gif",
      title: "Future AI",
      id: 2,
    },
    {
      url: "https://i.giphy.com/jYcbyCpSq5L3UI4uji.webp",
      title: "Seamless Power",
      id: 3,
    },
    {
      url: "https://i.pinimg.com/originals/c6/17/37/c61737b9c36c99f32337896323f475bf.gif",
      title: "AI Revolution",
      id: 4,
    },
    {
      url: "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExdW80eHRleHRuYmdhemxiMnI0MWpobmtjeDJ1bGVpbHYwbTQ1YXlmayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/zG70j6ans3HW2r72mj/giphy.gif",
      title: "Next Level",
      id: 5,
    },
    {
      url: "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExeWhva3lodmluZHcyeGhrc3J5dXc5ejJyb203anpsYXJlMmpuaHB6byZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/omjKRmX4w00J3pLzB2/giphy.gif",
      title: "AI Vision",
      id: 6,
    },
    {
      url: "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExeTcxc296MDMzaWlwdHJvbGZyM2k5MHgwendnaWhreGI3YmRvZGozZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Tj9juHX1V5nvJ9Ibah/giphy.gif",
      title: "Smart Tech",
      id: 7,
    },
  ];
  