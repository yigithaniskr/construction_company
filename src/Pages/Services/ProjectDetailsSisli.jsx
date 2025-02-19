import React, { useState } from "react";
import { useTranslation } from "react-i18next"; // Çeviri desteği eklendi
import "./ProjectDetails.css";
import headerLogoNormal from "/blue-logo.png";
import logo from "/blue-logo.png";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Header from "../../Layout/Header/Header";
import FooterMain from "../../Layout/Footer/FooterMain";
import ScrollToTop from "../../Layout/ScrollToTop/ScrollToTop";

const ProjectDetailsSisli = () => {
  const { t } = useTranslation(); // i18n çeviri fonksiyonu kullanımı
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const projectInfo = {
    name: t("project_sisli.name"),
    location: t("project_sisli.location"),
    deliveryDate: t("project_sisli.deliveryDate"),
    area: t("project_sisli.area"),
    description: [
      t("project_sisli.description_1"),
      t("project_sisli.description_2"),
      t("project_sisli.description_3"),
    ],
  };

  const projectImages = ["/Bomonti1.png","/Bomonti2.png","/Bomonti3.png","/Bomonti4.png","/Bomonti5.png","/Bomonti6.png","/Bomonti7.png","/Bomonti8.png","/Bomonti9.png",];

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
        <title>{t("project_sisli.page_title")}</title>
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
            <strong>{t("project_sisli.location_label")}:</strong>{" "}
            {projectInfo.location}
          </p>
          <p>
            <strong>{t("project_sisli.delivery_label")}:</strong>{" "}
            {projectInfo.deliveryDate}
          </p>
          <p>
            <strong>{t("project_sisli.area_label")}:</strong>{" "}
            {projectInfo.area}
          </p>
          {projectInfo.description.map((line, index) => (
            <p key={index}>{line}</p>
          ))}
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

export default ProjectDetailsSisli;