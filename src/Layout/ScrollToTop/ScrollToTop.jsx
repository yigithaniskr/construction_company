import React, { useState, useEffect } from "react";

const ScrollToTop = ({ scrollClassName, bgColor, hoverColor, hoverIconColor, iconColor }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false); // ✅ Butona tıklanınca renk değişimini izler

  const styles = {
    button: {
      position: 'fixed',
      bottom: '2rem',
      right: '40px',
      width: '42px',
      height: '2.5rem',
      backgroundColor: isClicked ? 'black' : (isHovered ? hoverColor : bgColor), // ✅ Tıklandıktan sonra siyah, ama sonra sıfırlanıyor
      color: isHovered ? hoverIconColor : iconColor,
      borderRadius: '2px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
      transition: 'opacity 0.3s ease-in-out, background-color 0.3s ease-in-out',
      zIndex: 1000,
    },
    hidden: {
      cursor: 'default',
      opacity: 0.5,
    },
    icon: {
      fontSize: '2rem',
    }
  };

  const scrollToTop = () => {
    if (isVisible) {
      setIsClicked(true); // ✅ Tıklanınca siyah yap
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

      // ✅ 1 saniye sonra orijinal renge geri dönsün
      setTimeout(() => {
        setIsClicked(false);
      }, 1000);
    }
  };

  const toggleVisibility = () => {
    if (window.pageYOffset > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
      setIsClicked(false); // ✅ En üste çıkınca tekrar eski rengine dön
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className={scrollClassName ? scrollClassName : 'scrollup'}>
      {isVisible && (
        <div
          onClick={scrollToTop}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{ ...styles.button, ...(isVisible ? {} : styles.hidden) }}
        >
          <i
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="ri-arrow-up-s-line" style={styles.icon}></i>
        </div>
      )}
    </div>
  );
};

export default ScrollToTop;
