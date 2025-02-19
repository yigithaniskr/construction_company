import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Çeviri desteği için eklendi
import './ProjectsList.css';
import headerLogoNormal from "/blue-logo.png";
import logo from '/blue-logo.png';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Header from '../../Layout/Header/Header';
import FooterMain from '../../Layout/Footer/FooterMain';
import ScrollToTop from '../../Layout/ScrollToTop/ScrollToTop';

const handleLinkClick = () => {
    window.scrollTo(0, 0); 
};

const ProjectsList = () => {
    const { t } = useTranslation(); // useTranslation fonksiyonu ile çeviri ekleme

    // **Projeleri Çeviriyle Kullanma**
    const ongoingProjects = [
        {
            id: 1,
            name: t("projects.ongoing.1.name"),
            location: t("projects.ongoing.1.location"),
            image: "/new_proje.png",
            detailsLink: "/proje-detaylari-yeni-proje",
        },
    ];

    const completedProjects = [
        {
            id: 2,
            name: t("projects.completed.1.name"),
            location: t("projects.completed.1.location"),
            image: "/Çeliktepe8.png",
            detailsLink: "/proje-detaylari-çeliktepe",
        },
        {
            id: 3,
            name: t("projects.completed.2.name"),
            location: t("projects.completed.2.location"),
            image: "/Bakırköy1.png",
            detailsLink: "/proje-detaylari-bakırköy",
        },
        {
            id: 4,
            name: t("projects.completed.3.name"),
            location: t("projects.completed.3.location"),
            image: "/Sapanca5.png",
            detailsLink: "/proje-detaylari-sapanca",
        },
        {
            id: 5,
            name: t("projects.completed.4.name"),
            location: t("projects.completed.4.location"),
            image: "/Kağıthane4.png",
            detailsLink: "/proje-detaylari-kağıthane",
        },
        {
            id: 6,
            name: t("projects.completed.5.name"),
            location: t("projects.completed.5.location"),
            image: "/Bomonti1.png",
            detailsLink: "/proje-detaylari-sisli",
        },
    ];

    return (
        <HelmetProvider>
            <Helmet>
                <title>{t("projects.page_title")}</title>
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
            <ScrollToTop bgColor={'#0056b3'} hoverColor={'#010d14'} />
            
            <div className="projects-list-container">
                {/* Devam Eden Projeler */}
                <div className="section">
                    <h2 className="section-title">{t("projects.ongoing_projects")}</h2>
                    <div className="projects-grid">
                        {ongoingProjects.map((project) => (
                            <div key={project.id} className="project-card">
                                <img src={project.image} alt={project.name} className="project-thumbnail" />
                                <h3 className="project-name">{project.name}</h3>
                                <p className="project-location">{project.location}</p>
                                <Link to={project.detailsLink} className="view-details-button" onClick={handleLinkClick}>
                                    {t("projects.view_all_photos")}
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tamamlanan Projeler */}
                <div className="section">
                    <h2 className="section-title">{t("projects.completed_projects")}</h2>
                    <div className="projects-grid">
                        {completedProjects.map((project) => (
                            <div key={project.id} className="project-card">
                                <img src={project.image} alt={project.name} className="project-thumbnail" />
                                <h3 className="project-name">{project.name}</h3>
                                <p className="project-location">{project.location}</p>
                                <Link to={project.detailsLink} className="view-details-button" onClick={handleLinkClick}>
                                    {t("projects.view_all_photos")}
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <FooterMain logo={logo} />
        </HelmetProvider>
    );
};

export default ProjectsList;
