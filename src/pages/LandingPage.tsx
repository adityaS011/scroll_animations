import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Section1 from '../components/LandingPageComponents/Section1';
import Section2 from '../components/LandingPageComponents/Section2';
import Section3 from '../components/LandingPageComponents/Section3';
import BottomNavigation from '../components/LandingPageComponents/BottomNavigation';

const LandingPage = () => {
  const [activeSection, setActiveSection] = useState(0); // Track the current section
  const isScrolling = useRef(false); // To manage debouncing of scroll events
  const handleScroll = (direction: 'up' | 'down') => {
    if (isScrolling.current) return; // Prevent fast scroll triggering

    setActiveSection((prev) => {
      if (direction === 'up' && prev > 0) return prev - 1;
      if (direction === 'down' && prev < 2) return prev + 1;
      return prev;
    });

    isScrolling.current = true;
    setTimeout(() => {
      isScrolling.current = false; // Reset scroll debounce after a short delay
    }, 1000); // Adjust debounce time as needed
  };

  // Smooth scroll when changing sections
  useEffect(() => {
    // Scroll smoothly to the active section when `activeSection` changes
    const sectionElement = document.getElementById(`section-${activeSection}`);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeSection]);

  return (
    <div
      className='flex flex-col items-center mx-auto w-full h-[1200px] overflow-hidden no-scrollbar'
      onWheel={(e) => handleScroll(e.deltaY > 0 ? 'down' : 'up')}
    >
      <AnimatePresence>
        <motion.div
          key={`section-${activeSection}`}
          className='w-full h-[1200px] no-scrollbar'
        >
          {activeSection === 0 && <Section1 />}
          {activeSection === 1 && <Section2 />}
          {activeSection === 2 && <Section3 />}
        </motion.div>
      </AnimatePresence>
      <BottomNavigation
        onSectionChange={setActiveSection}
        activeSection={activeSection}
      />
    </div>
  );
};

export default LandingPage;
