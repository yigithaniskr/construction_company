import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProjectDetails.css';
import headerLogoNormal from "/blue-logo.png";
import logo from '/blue-logo.png';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Header from '../../Layout/Header/Header';
import FooterMain from '../../Layout/Footer/FooterMain';
import ScrollToTop from '../../Layout/ScrollToTop/ScrollToTop';
import { getProjectBySlug } from '../../firebase/projects';

const ProjectDetail = () => {
    const { slug } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [lightboxIndex, setLightboxIndex] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const p = await getProjectBySlug(slug);
                if (!p) {
                    setError('Proje bulunamadı.');
                } else {
                    setProject(p);
                }
            } catch (err) {
                setError(err?.message || 'Proje yüklenemedi.');
            } finally {
                setLoading(false);
            }
        })();
    }, [slug]);

    const photos = project?.photoUrls || [];
    const openLightbox = (index) => setLightboxIndex(index);
    const closeLightbox = () => setLightboxIndex(null);
    const showNextImage = () => setLightboxIndex((p) => (p + 1) % photos.length);
    const showPreviousImage = () => setLightboxIndex((p) => (p - 1 + photos.length) % photos.length);

    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

    const descriptionLines = (project?.info || '')
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);

    return (
        <HelmetProvider>
            <Helmet>
                <title>{project?.projectTitle ? `${project.projectTitle} | İpekçi İnşaat` : 'Proje | İpekçi İnşaat'}</title>
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
                {loading && (
                    <div style={{ textAlign: 'center', padding: 40, color: '#888' }}>Yükleniyor...</div>
                )}
                {error && !loading && (
                    <div style={{ textAlign: 'center', padding: 40, color: '#b00020' }}>{error}</div>
                )}

                {!loading && !error && project && (
                    <>
                        <div className="project-header">
                            <h1>{project.projectTitle}</h1>
                            {project.addressSummary && (
                                <p><strong>Lokasyon:</strong> {project.addressSummary}</p>
                            )}
                            {project.projectTime && (
                                <p><strong>Proje Teslim Tarihi:</strong> {project.projectTime}</p>
                            )}
                            {project.metrekare && (
                                <p><strong>Toplam İnşaat Alanı:</strong> {project.metrekare}</p>
                            )}
                            {descriptionLines.map((line, i) => (
                                <p key={i}>{line}</p>
                            ))}
                        </div>

                        <div className="project-gallery">
                            {photos.map((image, index) => (
                                <div className="image-wrapper" key={image + index}>
                                    <img
                                        src={image}
                                        alt={`${project.projectTitle} ${index + 1}`}
                                        onClick={!isMobile ? () => openLightbox(index) : null}
                                    />
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>

            {lightboxIndex !== null && photos[lightboxIndex] && (
                <div className="lightbox">
                    <div className="lightbox-content">
                        <button className="lightbox-close" onClick={closeLightbox}>X</button>
                        <button className="lightbox-prev" onClick={showPreviousImage}>&lt;</button>
                        <img src={photos[lightboxIndex]} alt="Büyütülmüş görsel" />
                        <button className="lightbox-next" onClick={showNextImage}>&gt;</button>
                    </div>
                </div>
            )}
            <FooterMain logo={logo} />
        </HelmetProvider>
    );
};

export default ProjectDetail;
