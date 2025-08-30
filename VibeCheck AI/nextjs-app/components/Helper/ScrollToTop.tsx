import { useEffect, useState } from 'react';
import { FaArrowUp } from "react-icons/fa";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      const y = window.scrollY || window.pageYOffset;
      setIsVisible(y > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    toggleVisibility(); // set initial state
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-4 right-4 animate-pulse">
      {isVisible && (
        <button
          type="button"
          onClick={scrollTop}
          className="bg-[#8B5CF6] hover:bg-pink-600 text-white p-3 rounded-full shadow-lg transition-opacity cursor-pointer"
          aria-label="Scroll to top"
        >
          <FaArrowUp />
        </button>
      )}
    </div>
  );
};

export default ScrollToTop;