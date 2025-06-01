import React from 'react';
import { useTranslation } from 'react-i18next';

const AboutMain = () => {
    const { t } = useTranslation();

    const handleLinkClick = () => {
        window.scrollTo(0, 0);
    };

    return (
        <div className="about-main" style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.8', color: '#333', backgroundColor: '#f4f8fb', padding: '40px 20px' }}>

            <style>
                {`
                    .about-container {
                        max-width: 1200px;
                        margin: auto;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        text-align: center;
                        padding: 20px;
                    }

                    .about-title {
                        font-size: 32px;
                        color: #0056b3;
                        font-weight: bold;
                        margin-bottom: 20px;
                        width: 100%;
                        text-align: center;
                    }

                    .about-content {
                        display: flex;
                        flex-direction: row;
                        align-items: flex-start;
                        text-align: left;
                        width: 100%;
                        gap: 20px;
                    }

                    .about-image-container {
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                    }

                    .about-image {
                        width: 100%;
                        max-width: 300px;
                        border-radius: 12px;
                        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
                        margin-bottom: 10px;
                    }

                    .image-caption {
                        font-size: 18px;
                        color: #333;
                        font-weight: bold;
                        margin-bottom: 20px;
                        text-align: center;
                    }

                    .about-text-container {
                        flex: 2;
                    }

                    .about-section-title {
                        font-size: 24px;
                        color: #000;
                        font-weight: bold;
                        margin: 20px 0;
                    }

                    .about-text {
                        font-size: 18px;
                        color: #555;
                        line-height: 1.8;
                        margin-bottom: 20px;
                    }

                    .office-map {
                        margin-top: 20px;
                    }

                    .site-map li {
                        color: #0056b3;
                        margin-bottom: 8px;
                        transition: color 0.3s ease;
                        cursor: pointer;
                        list-style: none;
                    }

                    .site-map li:hover {
                        color: #003366;
                    }

                    .site-map li a {
                        color: inherit;
                        text-decoration: none;
                    }

                    @media (max-width: 768px) {
                        .about-content {
                            flex-direction: column;
                            align-items: center;
                        }

                        .about-text, .about-list {
                            font-size: 16px;
                        }

                        .about-section-title, .about-text {
                            text-align: center;
                        }
                    }
                `}
            </style>

            <div className="about-container">
                <h1 className="about-title">{t('about.title')}</h1>
                <div className="about-content">
                    <div className="about-image-container">
                        <img 
                            src="ismail-ipekci.jpeg" 
                            alt="İsmail İpekçi" 
                            className="about-image" 
                        />
                        <div className="image-caption">{t('about.founder_name')}</div>
                    </div>
                    <div className="about-text-container">
                        <p className="about-text">{t('about.description')}</p>
                        <h2 className="about-section-title">{t('about.vision_title')}</h2>
                        <p className="about-text">{t('about.vision')}</p>
                        <h2 className="about-section-title">{t('about.mission_title')}</h2>
                        <p className="about-text">{t('about.mission')}</p>

                        {/* Ofis Adresimiz Başlığı ve Google Maps iframe */}
                        <h2 className="about-section-title">{t('office_addres.title')} </h2>
                        <div className="office-map">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3007.5561521271748!2d28.99848033304203!3d41.07869367298131!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab7a57d5d14b5%3A0xc9a9cd77f0a01ba!2zUGVrZXIgxLDFnyBNZXJrZXpp!5e0!3m2!1str!2str!4v1748781035339!5m2!1str!2str"
                                width="100%"
                                height="200"
                                frameBorder="0"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Ofis Konumu"
                            ></iframe>
                           
                        </div>
                        <p className="about-text">{t('footer.address')}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutMain;
