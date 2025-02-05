import React from 'react';
import { useTranslation } from 'react-i18next';

const AboutMain = () => {
    const { t } = useTranslation(); // 🌍 i18n Çeviri Desteği

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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutMain;
