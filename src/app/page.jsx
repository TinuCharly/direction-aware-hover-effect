"use client";
import { Geist, Geist_Mono } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const data = [
  "html",
  "css",
  "javascript",
  "react",
  "nextjs",
  "tailwindcss",
  "typescript",
];

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
});
const mono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
});

export default function Home() {
  const containerRef = useRef(null);
  const [highlightProps, setHighlightProps] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    backgroundColor: "#E24E1B",
    opacity: 0,
  });

  const highlightColors = [
    "#E24E1B",
    "#4381C1",
    "#F79824",
    "#4da2ff",
    "#e9ccff",
    "#55db9c",
    "#ffd731",
  ];

  useEffect(() => {
    const container = containerRef.current;
    const firstItem = container.querySelector(".data-item");

    const moveElement = (element) => {
      if (element) {
        const rect = element.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        setHighlightProps({
          x: rect.left - containerRect.left,
          y: rect.top - containerRect.top,
          width: rect.width,
          height: rect.height,
          backgroundColor:
            highlightColors[Math.floor(Math.random() * highlightColors.length)],
          opacity: 1,
        });
      }
    };

    const moveHighlight = (e) => {
      const hoveredElement = document.elementFromPoint(e.clientX, e.clientY);
      if (hoveredElement && hoveredElement.classList.contains("data-item")) {
        moveElement(hoveredElement);
      } else if (
        hoveredElement &&
        hoveredElement.parentElement &&
        hoveredElement.parentElement.classList.contains("data-items")
      ) {
        moveElement(hoveredElement.parentElement);
      }
    };

    // Initialize with first item
    moveElement(firstItem);

    container.addEventListener("mousemove", moveHighlight);
    return () => {
      container.removeEventListener("mousemove", moveHighlight);
    };
  }, []);

  return (
    <div className={`w-full h-screen  ${geist.className}`}>
      <h2 className={`px-6 py-4 text-3xl font-semibold  ${mono.className}`}>Tools I'm using behind the scene</h2>
      <section className="p-6 h-[50vh]">
        <div
          ref={containerRef}
          className="grid relative w-full md:h-full md:max-h-[400px] border border-slate-200"
        >
          <motion.div
            className="highlight pointer-events-none absolute z-0"
            animate={highlightProps}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 50,
              mass: 1,
            }}
          />
          <div className="grid grid-cols-1 md:grid-cols-12 ">
            {data.map((item, index) => (
              <div
                key={index}
                className={`${
                  index < 3 ? "md:col-span-4" : "md:col-span-3"
                } data-item flex items-center uppercase justify-center p-6 border border-slate-200`}
              >
                <p className="relative">&lt; {item} &gt;</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
