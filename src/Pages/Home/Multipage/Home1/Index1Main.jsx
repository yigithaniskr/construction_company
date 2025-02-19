import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "./Index1Main.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faHandshake, faLightbulb } from "@fortawesome/free-solid-svg-icons";

const Index1Main = () => {
  const { t } = useTranslation(); // i18n Çeviri Kullanımı

  const slides = [
    {
      id: 1,
      title: t("homepage.slider.services.title"),
      description: t("homepage.slider.services.description"),
      buttonText: t("homepage.slider.services.buttonText"),
      buttonLink: "/hizmetlerimiz",
      image: "/hizmet-slider.png",
    },
    {
      id: 2,
      title: t("homepage.slider.projects.title"),
      description: t("homepage.slider.projects.description"),
      buttonText: t("homepage.slider.projects.buttonText"),
      buttonLink: "/projeler",
      image: "/Çeliktepe5.png",
    },
    {
      id: 3,
      title: t("homepage.slider.contact.title"),
      description: t("homepage.slider.contact.description"),
      buttonText: t("homepage.slider.contact.buttonText"),
      buttonLink: "whatsapp",
      image: "/iletişim.png",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const handleButtonClick = (buttonLink) => {
    if (buttonLink === "whatsapp") {
      window.open("https://wa.me/905325589658", "_blank"); // WhatsApp sohbetini açar
    } else {
      window.location.href = buttonLink;
    }
  };

  return (
    <div className="homepage">
      {/* Slider */}
      <div className="slider">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slide ${index === currentSlide ? "active" : ""}`}
            style={{
              backgroundImage: `url(${slide.image})`,
              display: index === currentSlide ? "block" : "none",
            }}
          >
            <div className="slide-content">
              <h2>{slide.title}</h2>
              <p>{slide.description}</p>
              <button className="slide-button" onClick={() => handleButtonClick(slide.buttonLink)}>
                {slide.buttonText}
              </button>
            </div>
          </div>
        ))}
        <button className="prev-button" onClick={() => setCurrentSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1))}>
          &#8249;
        </button>
        <button className="next-button" onClick={() => setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)}>
          &#8250;
        </button>
      </div>

      {/* Şirket Tanıtım Bölümü */}
      <div className="company-intro">
        <div className="image-container">
          <div className="image-border">
            <img src="/Sapanca14.png" alt="Hakkımızda" className="company-image" />
          </div>
        </div>
        <div className="company-text">
          <h2>{t("homepage.about.title")}</h2>
          <p>{t("homepage.about.description")}</p>
          <Link to="/hakkımızda" className="read-more-button" onClick={() => window.scrollTo(0, 0)}>
            {t("homepage.about.buttonText")}
          </Link>
        </div>
      </div>

      {/* Neden Bizi Seçmelisiniz? */}
      <div className="why-choose-us">
        <h2>{t("homepage.whyChooseUs.title")}</h2>
        <div className="advantages">
          <div className="advantage">
            <FontAwesomeIcon icon={faCheckCircle} size="3x" style={{ color: "#0047ab" }} />
            <h3>{t("homepage.whyChooseUs.quality.title")}</h3>
            <p>{t("homepage.whyChooseUs.quality.description")}</p>
          </div>
          <div className="advantage">
            <FontAwesomeIcon icon={faHandshake} size="3x" style={{ color: "#0047ab" }} />
            <h3>{t("homepage.whyChooseUs.reliable.title")}</h3>
            <p>{t("homepage.whyChooseUs.reliable.description")}</p>
          </div>
          <div className="advantage">
            <FontAwesomeIcon icon={faLightbulb} size="3x" style={{ color: "#0047ab" }} />
            <h3>{t("homepage.whyChooseUs.innovative.title")}</h3>
            <p>{t("homepage.whyChooseUs.innovative.description")}</p>
          </div>
        </div>
      </div>

      {/* Teklif Al Bölümü */}
      <div className="cta-section">
        <div className="cta-text">
          <h2>{t("homepage.cta.title")}</h2>
          <p>{t("homepage.cta.description")}</p>
        </div>
        <a href="https://wa.me/905325589658" target="_blank" rel="noopener noreferrer" className="cta-button">
          {t("homepage.cta.buttonText")}
        </a>
      </div>
    </div>
  );
};

export default Index1Main;
