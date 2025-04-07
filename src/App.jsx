import "./index.css";
import Canvas from "./Canvas";
import data from "./data";
import { useEffect, useRef, useState } from "react";
import LocomotiveScroll from "locomotive-scroll";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function App() {
  const [showCanvas, setShowCanvas] = useState(false)
  const headingRef = useRef(null);
  const growingSpan = useRef(null);
  
  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll();
      }, []);

      useEffect(() => {
        const handleClick = (e) => {
          setShowCanvas((prevShowCanvas) => {
            if (!prevShowCanvas) {
              gsap.set(growingSpan.current, {
                top: e.clientY,
                left: e.clientX,
              });
    
              gsap.to("body", {
                color: "#000",
                backgroundColor: "#fd2c2a",
                duration: 1.2,
                ease: "power2.inOut",
              });
    
              gsap.to(growingSpan.current, {
                scale: 1000,
                duration: 2,
                ease: "power2.inOut",
                onComplete: () => {
                  gsap.set(growingSpan.current, {
                    scale: 0,
                    clearProps: "all",
                  });
                },
              });
            } else {
              gsap.to("body", {
                color: "#fff",
                backgroundColor: "#000",
                duration: 1.2,
                ease: "power2.inOut",
              });
            }
    
            return !prevShowCanvas;
          });
        };
    
        const headingElement = headingRef.current;
        headingElement.addEventListener("click", handleClick);
    
        // Clean up event listener on unmount
        return () => headingElement.removeEventListener("click", handleClick);
      }, []);

  return (
    <>
    <span ref={growingSpan} className="growing fixed rounded-full top-[-20px] w-5 h-5"></span>
      <div className="w-full relative min-h-screen font-['Helvetica_Now_Display]">
        {showCanvas && data[0].map((canvasdets, index) => (
          <Canvas details={canvasdets} 
          />
        ))}

        <div className="w-full relative z-[1] h-screen ">
          <nav className="w-full p-8 flex justify-between z-50">
            <div className="brand text-2xl font-regular ">thirtysixstudio</div>
            <div className="links flex gap-10">
              {["Home", "About", "Projects", "Contact"].map((link, index) => (
                <a 
                key={index} 
                href={`#${link.toLowerCase()}`} 
                className="text-lg hover:text-gray-300">
                  {link}
                </a>
              ))}
            </div>
          </nav>
          <div className="textcontainer  px-[20%]">
            <div className="text w-[50%]">
              <h3 className="text-3xl leading-1.3">
              At Thirtysixstudio, we build digital assets and immersive experiences for purposeful brands.
              </h3>
              <p className="text-sm  w-[80%] mt-10 font-normal">We're a boutique production studio focused on design, animation, and technology, constantly rethinking what digital craft can do for present-day ads and campaigns.</p>
              <p className="text-md mt-10">Scroll</p>
            </div>
          </div>
          
          <div className="w-full absolute bottom-0 left-0 ">
            <h1 
            ref={headingRef}
            className="text-[12rem] font-normal tracking-tight leading-none pl-5">Thirtysixstudio</h1>
          </div>
        </div>
      </div>
      <div className="w-full relative h-screen  mt-32 px-10">
      {showCanvas && data[1].map((canvasdets, index) => (
          <Canvas details={canvasdets} 
          />
        ))}
        <div className="relative z-[1]">
        <h1 className="text-6xl tracking-tighter">about the brand</h1>
        <p className="text-3xl leading-[1.5] w-[80%] mt-10 font-light">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt aliquid sequi architecto veritatis soluta tenetur cupiditate non velit adipisci possimus magni, illo fugiat saepe perspiciatis inventore quod ea quisquam voluptate assumenda iste optio temporibus voluptas? Consectetur numquam maiores non, necessitatibus perferendis, nihil cum dolorem nostrum, nam molestiae laudantium commodi voluptates.</p>

<img
className="w-[80%] mt-10" 
src="https://directus.funkhaus.io/assets/b3b5697d-95a0-4af5-ba59-b1d423411b1c?withoutEnlargement=true&fit=outside&width=1400&height=1400" alt="" />


        </div>

      </div>
    </>
  );
}

export default App;
