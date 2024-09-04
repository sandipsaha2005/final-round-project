import { FiSettings,FiClock,FiZap,FiImage } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import { useWindowSize } from "./ui";
import { useState } from "react";

const VerticalAccordion = () => {
  const [open, setOpen] = useState(items[0].id);

  return (
    <section className="">
      <div className="flex flex-col lg:flex-row h-fit lg:h-[100vh] w-full max-w-full mx-auto shadow overflow-hidden">
        {items.map((item) => {
          return (
            <Panel
              key={item.id}
              open={open}
              setOpen={setOpen}
              id={item.id}
              Icon={item.Icon}
              title={item.title}
              imgSrc={item.imgSrc}
              description={item.description}
            />
          );
        })}
      </div>
    </section>
  );
};

const Panel = ({ open, setOpen, id, Icon, title, imgSrc, description }) => {
  const { width } = useWindowSize();
  const isOpen = open === id;

  return (
    <>
      <button
        className="bg-[#111] hover:bg-black transition-colors p-3 border-r-[1px] border-b-[1px] border-zinc-800 flex flex-row-reverse lg:flex-col justify-end items-center gap-4 relative group text-white"
        onClick={() => setOpen(id)}
      >
        <span
          style={{
            writingMode: "vertical-lr",
          }}
          className="hidden lg:block text-xl font-light rotate-180"
        >
          {title}
        </span>
        <span className="block lg:hidden text-xl font-light">{title}</span>
        <div className="w-6 lg:w-full aspect-square bg-zinc-400 text-white grid place-items-center">
          <Icon />
        </div>
        <span className="w-4 h-4 bg-white group-hover:bg-slate-50 transition-colors border-r-[1px] border-b-[1px] lg:border-b-0 lg:border-t-[1px] border-slate-200 rotate-45 absolute bottom-0 lg:bottom-[50%] right-[50%] lg:right-0 translate-y-[50%] translate-x-[50%] z-20" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key={`panel-${id}`}
            variants={width && width > 1024 ? panelVariants : panelVariantsSm}
            initial="closed"
            animate="open"
            exit="closed"
            style={{
              backgroundImage: `url(${imgSrc})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
            className="w-full h-full overflow-hidden relative bg-black flex items-end"
          >
            <motion.div
              variants={descriptionVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="px-4 py-2 bg-black/40 backdrop-blur-sm text-white"
            >
              {/* <p>{description}</p> */}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VerticalAccordion;

const panelVariants = {
  open: {
    width: "100%",
    height: "100%",
  },
  closed: {
    width: "0%",
    height: "100%",
  },
};

const panelVariantsSm = {
  open: {
    width: "100%",
    height: "200px",
  },
  closed: {
    width: "100%",
    height: "0px",
  },
};

const descriptionVariants = {
  open: {
    opacity: 1,
    y: "0%",
    transition: {
      delay: 0.125,
    },
  },
  closed: { opacity: 0, y: "100%" },
};

const items = [
    {
      id: 1,
      title: "Create Art",
      Icon: FiImage,
      imgSrc:
        "https://news.ubc.ca/wp-content/uploads/2023/08/AdobeStock_559145847.jpeg",
    },
    {
      id: 2,
      title: "Generate Ideas",
      Icon: FiZap,
      imgSrc:
        "https://images.tech.co/wp-content/uploads/2023/11/21202640/AI-generated-landscape.jpg",
    },
    {
      id: 3,
      title: "Enhance Productivity",
      Icon: FiClock,
      imgSrc:
        "https://miro.medium.com/v2/resize:fit:1400/1*6RTAH9tceCMXLRC7Z8BB9w.png",
    },
    {
      id: 4,
      title: "Automate Tasks",
      Icon: FiSettings,
      imgSrc:
        "https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2023/02/ai-image-generators.jpg",
    }
  ];
  