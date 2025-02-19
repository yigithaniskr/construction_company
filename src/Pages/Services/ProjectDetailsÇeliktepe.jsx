import React, { useState } from "react";
import { useTranslation } from "react-i18next"; // Çeviri desteği eklendi
import "./ProjectDetails.css";
import headerLogoNormal from "/blue-logo.png";
import logo from "/blue-logo.png";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Header from "../../Layout/Header/Header";
import FooterMain from "../../Layout/Footer/FooterMain";
import ScrollToTop from "../../Layout/ScrollToTop/ScrollToTop";

const ProjectDetailsÇeliktepe = () => {
  const { t } = useTranslation(); // i18n çeviri fonksiyonu kullanımı
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const projectInfo = {
    name: t("project_celiktepe.name"),
    location: t("project_celiktepe.location"),
    deliveryDate: t("project_celiktepe.deliveryDate"),
    area: t("project_celiktepe.area"),
    description: t("project_celiktepe.description"),
  };

  const projectImages = [
    "/Çeliktepe2.png",
    "/Çeliktepe4.png",
    "/Çeliktepe5.png",
    "/Çeliktepe6.png",
    "/Çeliktepe8.png",
    "/Çeliktepe9.png",
    "/Çeliktepe10.png",
    "/Çeliktepe11.png",
    "/Çeliktepe12.png",
    "/Çeliktepe1.png",
    "/Çeliktepe3.png",
    "/Çeliktepe7.png",
  ];

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const showNextImage = () =>
    setLightboxIndex((prevIndex) => (prevIndex + 1) % projectImages.length);
  const showPreviousImage = () =>
    setLightboxIndex(
      (prevIndex) =>
        (prevIndex - 1 + projectImages.length) % projectImages.length
    );

  const isMobile = window.innerWidth <= 768;

  return (
    <HelmetProvider>
      <Helmet>
        <title>{t("project_celiktepe.page_title")}</title>
      </Helmet>
      <Header
        normalLogo={headerLogoNormal}
        darkLogo={headerLogoNormal}
        topBarVisible={true}
        mail={true}
        isPhnNumber={true}
        address={true}
        searchIcon={true}
        btnQuite1={true}
        firstLvlMenu="pages"
      />
      <ScrollToTop bgColor={"#0056b3"} hoverColor={"#010d14 "} />
      <div className="project-container">
        <div className="project-header">
          <h1>{projectInfo.name}</h1>
          <p>
            <strong>{t("project_celiktepe.location_label")}:</strong>{" "}
            {projectInfo.location}
          </p>
          <p>
            <strong>{t("project_celiktepe.delivery_label")}:</strong>{" "}
            {projectInfo.deliveryDate}
          </p>
          <p>
            <strong>{t("project_celiktepe.area_label")}:</strong>{" "}
            {projectInfo.area}
          </p>
          <p>{projectInfo.description}</p>
        </div>
        <div className="project-gallery">
          {projectImages.map((image, index) => (
            <div className="image-wrapper" key={index}>
              <img
                src={image}
                alt={`${projectInfo.name} ${index + 1}`}
                onClick={!isMobile ? () => openLightbox(index) : null}
              />
            </div>
          ))}
        </div>
      </div>

      {lightboxIndex !== null && (
        <div className="lightbox">
          <div className="lightbox-content">
            <button className="lightbox-close" onClick={closeLightbox}>
              X
            </button>
            <button className="lightbox-prev" onClick={showPreviousImage}>
              &lt;
            </button>
            <img src={projectImages[lightboxIndex]} alt="Büyütülmüş görsel" />
            <button className="lightbox-next" onClick={showNextImage}>
              &gt;
            </button>
          </div>
        </div>
      )}
      <FooterMain logo={logo} />
    </HelmetProvider>
  );
};

export default ProjectDetailsÇeliktepe;