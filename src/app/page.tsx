"use client";
import { useState, useRef, useEffect, RefObject } from "react";
import redShoe from "../assets/images/red-shoe.png";
import blueShoe from "../assets/images/blue-shoe.png";
import greenShoe from "../assets/images/green-shoe.png";
import Image from "next/image";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
export default function Home() {
  gsap.registerPlugin(ScrollTrigger);
  const [bgColor, setBgColor] = useState("red");
  const [menuOpen, setMenuOpen] = useState(false);
  // SCROLL refs (outer wrapper)
  const redScrollRef = useRef<HTMLDivElement>(null);
  const blueScrollRef = useRef<HTMLDivElement>(null);
  const greenScrollRef = useRef<HTMLDivElement>(null);

  // CLICK refs (inner wrapper)
  const redClickRef = useRef<HTMLDivElement | null>(null);
  const blueClickRef = useRef<HTMLDivElement | null>(null);
  const greenClickRef = useRef<HTMLDivElement | null>(null);

  // existing refs
  const boxRef1 = useRef(null);
  const boxRef2 = useRef(null);
  const boxRef3 = useRef(null);

  const [activeImageRef, setActiveImageRef] =
    useState<RefObject<HTMLDivElement | null> | null>(null);

  useGSAP(() => {
    const scrollAnimations = [redScrollRef, blueScrollRef, greenScrollRef];

    scrollAnimations.forEach((ref) => {
      if (!ref.current) return;

      const tl = gsap.timeline({
        rotation: 360,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 10%",
          end: "+1000",
          scrub: true,
          pin: true,

          pinSpacing: false,
          // markers: true,
        },
      });

      tl.to(ref.current, {
        yPercent: 30,
        ease: "power2.inOut",
      }).to(ref.current, {
        xPercent: -70,
        ease: "power2.inOut",
      });
    });
  }, []);

  useGSAP(() => {
    const heading = new SplitText(".text-split", { type: "chars words" });
    gsap.from(heading.chars, {
      yPercent: 100,
      duration: 1,
      stagger: 0.06,
      ease: "expo.out",
    });
  }, []);
  const [trigger, setTrigger] = useState(0); // this will force animation on each click

  const animateImageHandler = (imageRef: RefObject<HTMLDivElement>) => {
    const tl = gsap.timeline();

    tl.to(imageRef.current, {
      yPercent: -60,
      duration: 0.9,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut",
    });

    tl.to(
      [boxRef1.current, boxRef2.current, boxRef3.current],
      {
        height: 0,
        opacity: 0,
        duration: 0.7,
        ease: "power2.inOut",
      },
      0
    );

    tl.to(
      [boxRef1.current, boxRef2.current, boxRef3.current],
      {
        height: "600px",
        opacity: 1,
        duration: 1,
        ease: "power2.inOut",
        onStart: () => {
          gsap.set([boxRef1.current, boxRef2.current, boxRef3.current], {
            display: "block",
          });
        },
      },
      ">0.2"
    );
  };

  const handleRedImage = () => {
    setBgColor("red");
    setActiveImageRef(redClickRef);
    setTrigger((prev) => prev + 1);
  };

  const handleGreenImage = () => {
    setBgColor("green");
    setActiveImageRef(greenClickRef);
    setTrigger((prev) => prev + 1);
  };

  const handleBlueImage = () => {
    setBgColor("blue");
    setActiveImageRef(blueClickRef);
    setTrigger((prev) => prev + 1);
  };

  // This will run every time `trigger` changes
  useEffect(() => {
    if (!activeImageRef?.current) return;

    const id = requestAnimationFrame(() => {
      animateImageHandler(activeImageRef);
    });

    return () => cancelAnimationFrame(id);
  }, [trigger]);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".animated-text",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power3.out",
          repeat: -1,
          yoyo: true,
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      className="w-full text-white relative web"
      style={{ backgroundColor: bgColor }}
    >
      <nav className="flex justify-between items-center px-8 py-6 uppercase text-sm relative z-0">
        <div className="flex flex-row items-center absolute left-145 z-0">
          <div className="bg-white p-5 mx-4 w-2 h-[600px]" ref={boxRef1}></div>
          <div className="bg-white p-5 mx-4 w-2 h-[600px]" ref={boxRef2}></div>
          <div className="bg-white p-5 mx-4 w-2 h-[600px]" ref={boxRef3}></div>
        </div>
        <div className="text-white font-bold text-lg text-bold animated-text">
          Nike
        </div>
        {/* Desktop Links */}
        <div className="hidden md:flex gap-16 text-lg py-3 w-6xl justify-between animated-text">
          <a href="#">All Categories</a>
          {/* <a href="#">Men</a>
          <a href="#">Women</a>
          <a href="#">Kids</a> */}
          <a href="#">Customize</a>
        </div>

        {/* Right Side Icons */}
        <div className="hidden md:flex gap-4">
          <span className="text-3xl">🔍</span>
          <span className="text-3xl">🛒</span>
        </div>

        {/* Hamburger Icon - Mobile only */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white text-2xl"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black/80 backdrop-blur-sm absolute w-full top-20 left-0 right-0 px-8 py-4 flex flex-col gap-4 text-white text-sm z-40 uppercase">
          <a href="#" onClick={() => setMenuOpen(false)}>
            All Cats
          </a>
          <a href="#" onClick={() => setMenuOpen(false)}>
            Men
          </a>
          <a href="#" onClick={() => setMenuOpen(false)}>
            Women
          </a>
          <a href="#" onClick={() => setMenuOpen(false)}>
            Kids
          </a>
          <a href="#" onClick={() => setMenuOpen(false)}>
            Customize
          </a>
          <div className="flex gap-4 mt-2">
            <span>🔍</span>
            <span>🛒</span>
          </div>
        </div>
      )}
      {/* Main Content */}
      <div className="flex flex-col w-11/12 ">
        <div className="flex flex-col w-full items-center">
          {/* Container with relative positioning */}
          <div className="relative flex justify-center items-center w-full h-[400px]">
            {/* Overlaid Text */}
            <p className="text-[120px] md:text-[200px] lg:text-[300px]  text-white uppercase font-bold font-stretch-ultra-condensed heading text-split absolute z-0 text-center">
              Nike
            </p>

            <div
              ref={redScrollRef}
              className={`absolute transition-opacity duration-300 ${
                bgColor === "red"
                  ? "opacity-100"
                  : "opacity-0 pointer-events-none"
              }`}
            >
              <div ref={redClickRef} className="relative z-40 top-20">
                <Image src={redShoe} alt="Red Shoe" width={400} height={400} />
              </div>
            </div>

            {/* BLUE SHOE */}
            <div
              ref={blueScrollRef}
              className={`absolute transition-opacity duration-300 ${
                bgColor === "blue"
                  ? "opacity-100"
                  : "opacity-0 pointer-events-none"
              }`}
            >
              <div ref={blueClickRef} className="relative z-40 top-20">
                <Image
                  src={blueShoe}
                  alt="Blue Shoe"
                  width={400}
                  height={400}
                />
              </div>
            </div>

            {/* GREEN SHOE */}
            <div
              ref={greenScrollRef}
              className={`absolute transition-opacity duration-300 ${
                bgColor === "green"
                  ? "opacity-100"
                  : "opacity-0 pointer-events-none"
              }`}
            >
              <div ref={greenClickRef} className="relative z-40 top-20">
                <Image
                  src={greenShoe}
                  alt="Green Shoe"
                  width={400}
                  height={400}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col md:flex-row px-10 py-10">
          <div className="md:w-1/2 ">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 px-6 animated-text">
              NIKE JORDAN 265
            </h1>
            <p className="text-sm mb-2 px-6 animated-text">
              The quality is excellent. Step into legacy with the Nike Jordan
              265 — where heritage meets performance.
            </p>
            <a
              href="#"
              className="underline text-sm text-gray-200 px-6 animated-text"
            >
              See Details →
            </a>
          </div>
          <div className="flex justify-center mt-10 space-x-4 w-full md:w-1/4">
            <button
              className={`w-5 h-5 bg-red-500 rounded-full cursor-pointer ${
                bgColor == "red"
                  ? "border-2 border-white"
                  : "border-2 border-transparent"
              }`}
              onClick={handleRedImage}
            ></button>
            <button
              className={`w-5 h-5 bg-green-500 rounded-full cursor-pointer  ${
                bgColor == "green"
                  ? "border-2 border-white"
                  : "border-2 border-transparent"
              }`}
              onClick={handleGreenImage}
            ></button>
            <button
              className={`w-5 h-5 bg-blue-500 rounded-full cursor-pointer ${
                bgColor === "blue"
                  ? "border-2 border-white"
                  : "border-2 border-transparent"
              } `}
              onClick={handleBlueImage}
            ></button>
          </div>
          <div className="md:w-1/3 text-sm mt-6 md:mt-0">
            <p className="animated-text">
              The Nike Jordan 265S combines legendary style with modern
              performance. Built to stand out, designed to move — this pair
              speaks legacy.
            </p>
          </div>
        </div>
      </div>

      <div className="">
        <p className="text-[120px] md:text-[200px] lg:text-[300px] text-white text-center  uppercase font-bold font-stretch-ultra-condensed py-0 animated-text z-0">
          Nike
        </p>
      </div>
      <div className=" text-white  flex items-center px-10 py-10">
        <div className="flex w-full max-w-7xl">
          {/* Left Empty Space (previously for shoe image) */}
          <div className="w-1/2 hidden md:block" />

          {/* Product Info on Right Side */}
          <div className="w-full md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-extrabold uppercase  animated-text">
              Nike Jordan
              <br />
              Series
            </h1>
            <p className="text-xl font-semibold mt-4 animated-text">$178.00</p>
            <p className="mt-3 text-gray-200 animated-text">
              Bring the past into the future with the Nike Air Max 2090, a bold
              look inspired by the DNA of the iconic Air Max 90. Brand-new Nike
              Air cushioning underfoot adds unparalleled comfort.
            </p>

            {/* Sizes */}
            <div className="py-5">
              <h2 className="mb-2 uppercase text-sm font-bold animated-text">
                Select Size (US)
              </h2>
              <div className="flex flex-wrap gap-2">
                {["7", "8", "8.5", "9", "9.5", "10", "10.5", "12.5"].map(
                  (size) => (
                    <button
                      key={size}
                      className="bg-white text-black px-3 py-1 rounded font-semibold hover:bg-gray-300 transition animated-text"
                    >
                      {size}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Colors */}
            <div className="mt-6">
              <h2 className="mb-2 uppercase text-sm font-bold animated-text">
                Select Color
              </h2>
              <div className="flex gap-3">
                <button
                  className={`w-5 h-5 bg-red-500 rounded-full cursor-pointer ${
                    bgColor == "red"
                      ? "border-2 border-white"
                      : "border-2 border-transparent"
                  }`}
                  onClick={() => {
                    setBgColor("red");
                  }}
                />
                <button
                  className={`w-5 h-5 bg-green-500 rounded-full cursor-pointer ${
                    bgColor == "green"
                      ? "border-2 border-white"
                      : "border-2 border-transparent"
                  }`}
                  onClick={() => {
                    setBgColor("green");
                  }}
                />
                <button
                  className={`w-5 h-5 bg-blue-500 rounded-full cursor-pointer ${
                    bgColor == "blue"
                      ? "border-2 border-white"
                      : "border-2 border-transparent"
                  }`}
                  onClick={() => {
                    setBgColor("blue");
                  }}
                />
              </div>
            </div>

            {/* Add to Cart */}
            <button className="mt-6 bg-white text-red-700 px-5 py-2 rounded-full font-bold hover:bg-gray-200 transition animated-text">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>

    //   <div className="relative w-72 h-72 md:w-[900px] md:h-[700px]">
    //  <Image src={redshoe} alt="Nike Shoe" layout="fill" objectFit="contain"  />
    //   </div>
  );
}
