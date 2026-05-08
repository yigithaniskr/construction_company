import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './ProjectsList.css';
import headerLogoNormal from "/blue-logo.png";
import logo from '/blue-logo.png';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Header from '../../Layout/Header/Header';
import FooterMain from '../../Layout/Footer/FooterMain';
import ScrollToTop from '../../Layout/ScrollToTop/ScrollToTop';
import { listProjects } from '../../firebase/projects';

const handleLinkClick = () => {
    window.scrollTo(0, 0);
};

const ProjectsList = () => {
    const { t } = useTranslation();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        (async () => {
            try {
                const data = await listProjects();
                setProjects(data);
            } catch (err) {
                setError(err?.message || 'Projeler yüklenemedi.');
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const { ongoingProjects, completedProjects } = useMemo(() => ({
        ongoingProjects: projects.filter((p) => !p.isFinished),
        completedProjects: projects.filter((p) => p.isFinished),
    }), [projects]);

    const renderCard = (project) => (
        <div key={project.id} className="project-card">
            {project.coverPhotoUrl
                ? <img src={project.coverPhotoUrl} alt={project.projectTitle} className="project-thumbnail" />
                : <div className="project-thumbnail" style={{ background: '#eef0f4' }} />
            }
            <h3 className="project-name">{project.projectTitle}</h3>
            <p className="project-location">{project.location}</p>
            <Link to={`/proje/${project.slug || project.id}`} className="view-details-button" onClick={handleLinkClick}>
                {t("projects.view_all_photos")}
            </Link>
        </div>
    );

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
                <div className="projects-page-header">
                    <h1>Projelerimiz</h1>
                    <p className="subtitle">Tamamlanmış ve devam eden projelerimizi keşfedin.</p>
                </div>

                {loading && (
                    <div style={{ textAlign: 'center', padding: 60, color: '#888' }}>Yükleniyor...</div>
                )}
                {error && !loading && (
                    <div style={{ textAlign: 'center', padding: 60, color: '#b00020' }}>{error}</div>
                )}

                {!loading && !error && (
                    <>
                        {ongoingProjects.length > 0 && (
                            <div className="section">
                                <h2 className="section-title">{t("projects.ongoing_projects")}</h2>
                                <div className="projects-grid">
                                    {ongoingProjects.map(renderCard)}
                                </div>
                            </div>
                        )}

                        {completedProjects.length > 0 && (
                            <div className="section">
                                <h2 className="section-title">{t("projects.completed_projects")}</h2>
                                <div className="projects-grid">
                                    {completedProjects.map(renderCard)}
                                </div>
                            </div>
                        )}

                        {projects.length === 0 && (
                            <div style={{ textAlign: 'center', padding: 60, color: '#888' }}>
                                Henüz proje eklenmemiş.
                            </div>
                        )}
                    </>
                )}
            </div>
            <FooterMain logo={logo} />
        </HelmetProvider>
    );
};

export default ProjectsList;
