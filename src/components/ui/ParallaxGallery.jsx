import React, {
  useRef,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1504198458649-3128b932f49e?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80",
];

const ImageCard = ({ src, onLoad }) => {
  return (
    <div className="w-full h-[200px] sm:h-[300px] md:h-[400px] flex-shrink-0 bg-[#111] transition-transform duration-300 hover:scale-[1.02] cursor-pointer relative will-change-transform backface-hidden preserve-3d">
      <img
        src={src}
        alt="Gallery Asset"
        loading="lazy"
        onLoad={onLoad}
        className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
      />
    </div>
  );
};

export default function ParallaxGallery() {
  const scrollWrapperRef = useRef(null);
  const containerRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const loadedCountRef = useRef(0);
  const [galleryImages, setGalleryImages] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/public/gallery')
      .then(res => res.json())
      .then(data => {
        let urls = data.map(img => `http://localhost:5000${img.image_url}`);
        if (urls.length === 0) {
          urls = FALLBACK_IMAGES;
        }
        // If we have few images, duplicate them so the 3D grid doesn't look empty
        while (urls.length < 16) {
          urls = [...urls, ...urls];
        }
        setGalleryImages(urls);
      })
      .catch(err => {
        console.error(err);
        let urls = FALLBACK_IMAGES;
        while (urls.length < 16) {
          urls = [...urls, ...urls];
        }
        setGalleryImages(urls);
      });
  }, []);

  const handleItemLoad = useCallback(() => {
    loadedCountRef.current += 1;
    if (!isReady && loadedCountRef.current >= 1) setIsReady(true);
  }, [isReady]);

  useEffect(() => {
    const t = setTimeout(() => setIsReady(true), 1200);
    return () => clearTimeout(t);
  }, []);

  const colMedia = useMemo(() => {
    if (galleryImages.length === 0) return { col1: [], col2: [], col3: [], col4: [] };
    const col1Base = galleryImages.filter((_, i) => i % 4 === 0);
    const col2Base = galleryImages.filter((_, i) => i % 4 === 1);
    const col3Base = galleryImages.filter((_, i) => i % 4 === 2);
    const col4Base = galleryImages.filter((_, i) => i % 4 === 3);

    return {
      col1: [...col1Base, ...col1Base, ...col1Base, ...col1Base, ...col1Base, ...col1Base],
      col2: [...col2Base, ...col2Base, ...col2Base, ...col2Base, ...col2Base, ...col2Base],
      col3: [...col3Base, ...col3Base, ...col3Base, ...col3Base, ...col3Base, ...col3Base],
      col4: [...col4Base, ...col4Base, ...col4Base, ...col4Base, ...col4Base, ...col4Base],
    };
  }, [galleryImages]);

  // LINKED SCROLL: Trapped scroll using inner wrapper as requested by user
  const { scrollYProgress } = useScroll({
    target: containerRef,
    container: scrollWrapperRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
    mass: 0.5,
  });

  // Banner animations
  const bannerWidth = useTransform(smoothProgress, [0, 0.15], ["90vw", "100vw"]);
  const bannerHeight = useTransform(smoothProgress, [0, 0.15], ["80vh", "100vh"]);
  const bannerRadius = useTransform(smoothProgress, [0, 0.15], ["48px", "0px"]);
  const bannerBorderWidth = useTransform(smoothProgress, [0, 0.15], ["4px", "0px"]);

  // 3D Matrix animations
  const rotateY = useTransform(smoothProgress, [0.15, 1], [-45, -8]);
  const rotateX = useTransform(smoothProgress, [0.15, 1], [25, 4]);
  const rotateZ = useTransform(smoothProgress, [0.15, 1], [15, 2]);
  const translateZ = useTransform(smoothProgress, [0.15, 1], [-800, 0]);

  // Track columns parallax animations (reduced percentages to prevent running out of images)
  const yCol1 = useTransform(smoothProgress, [0.15, 1], ["0%", "-12%"]);
  const yCol2 = useTransform(smoothProgress, [0.15, 1], ["-12%", "8%"]);
  const yCol3 = useTransform(smoothProgress, [0.15, 1], ["0%", "-12%"]);
  const yCol4 = useTransform(smoothProgress, [0.15, 1], ["-8%", "10%"]);

  return (
    <div 
      ref={scrollWrapperRef}
      data-lenis-prevent="true"
      className="w-full h-screen overflow-y-auto overflow-x-hidden bg-[#050505] relative z-[50]"
      style={{
        overscrollBehavior: 'none', 
        scrollbarWidth: 'none', 
        msOverflowStyle: 'none'
      }}
    >
      <style>{`
        ::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <section
        ref={containerRef}
        className="relative w-full h-[400vh] bg-[#050505] text-white font-sans selection:bg-white selection:text-black"
      >
        <div className="sticky top-0 h-screen w-full flex justify-center items-center overflow-hidden">
          <motion.div
            style={{
              width: bannerWidth,
              height: bannerHeight,
              borderRadius: bannerRadius,
              borderWidth: bannerBorderWidth,
              borderColor: "#2c2738",
            }}
            className="relative bg-black overflow-hidden flex items-center justify-center max-w-[1920px] mx-auto will-change-transform backface-hidden preserve-3d"
          >
            <div
              className="absolute inset-0 flex justify-center items-center pointer-events-none"
              style={{ perspective: "1000px" }}
            >
              {/* Ambient Shadow Box Masking */}
              <div className="absolute inset-0 z-20 shadow-[inset_0_100px_150px_-50px_rgba(0,0,0,1),inset_0_-100px_150px_-50px_rgba(0,0,0,1)]" />
              <div className="absolute inset-0 z-20 shadow-[inset_150px_0_150px_-50px_rgba(0,0,0,1),inset_-150px_0_150px_-50px_rgba(0,0,0,1)]" />

              {/* Parallax Image Grid Matrix */}
              <motion.div
                style={{
                  rotateX,
                  rotateY,
                  rotateZ,
                  z: translateZ,
                  transformStyle: "preserve-3d",
                }}
                className="flex gap-4 md:gap-6 justify-center items-center w-[200vw] h-[250vh] origin-center opacity-100 will-change-transform backface-hidden"
              >
                <motion.div style={{ y: yCol1 }} className="flex flex-col gap-4 md:gap-6 w-[22vw] min-w-[200px] pointer-events-auto">
                  {colMedia.col1.map((src, index) => (
                    <ImageCard key={`col1-${index}`} src={src} onLoad={handleItemLoad} />
                  ))}
                </motion.div>

                <motion.div style={{ y: yCol2 }} className="flex flex-col gap-4 md:gap-6 w-[22vw] min-w-[200px] pointer-events-auto">
                  {colMedia.col2.map((src, index) => (
                    <ImageCard key={`col2-${index}`} src={src} onLoad={handleItemLoad} />
                  ))}
                </motion.div>

                <motion.div style={{ y: yCol3 }} className="flex flex-col gap-4 md:gap-6 w-[22vw] min-w-[200px] pointer-events-auto">
                  {colMedia.col3.map((src, index) => (
                    <ImageCard key={`col3-${index}`} src={src} onLoad={handleItemLoad} />
                  ))}
                </motion.div>

                <motion.div style={{ y: yCol4 }} className="flex flex-col gap-4 md:gap-6 w-[22vw] min-w-[200px] pointer-events-auto">
                  {colMedia.col4.map((src, index) => (
                    <ImageCard key={`col4-${index}`} src={src} onLoad={handleItemLoad} />
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
