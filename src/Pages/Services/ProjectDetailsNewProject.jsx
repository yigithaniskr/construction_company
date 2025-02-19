import React, { useState } from "react";
import { useTranslation } from "react-i18next"; // Çeviri desteği eklendi
import "./ProjectDetailsNewProject.css";
import headerLogoNormal from "/blue-logo.png";
import logo from "/blue-logo.png";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Header from "../../Layout/Header/Header";
import FooterMain from "../../Layout/Footer/FooterMain";
import ScrollToTop from "../../Layout/ScrollToTop/ScrollToTop";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHourglassHalf } from "@fortawesome/free-solid-svg-icons";

const ProjectDetailsNewProject = () => {
  const { t } = useTranslation(); // i18n çeviri fonksiyonu kullanımı

  return (
    <HelmetProvider>
      <Helmet>
        <title>{t("new_project.page_title")}</title>
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

      {/* Yeni Proje Bölümü */}
      <div className="new-project-section">
      <div className="overlay"></div>
      <div className="new-project-content">
        <FontAwesomeIcon icon={faHourglassHalf} className="hourglass-icon" />
        <h2 className="new-project-title">{t("new_project.coming_soon")}</h2>
        <p className="new-project-description">{t("new_project.description")}</p>
      </div>
    </div>

      <FooterMain logo={logo} />
    </HelmetProvider>
  );
};

export default ProjectDetailsNewProject;
