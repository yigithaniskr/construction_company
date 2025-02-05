import React from 'react';
import { useTranslation } from 'react-i18next';

const GeneralConstructionMain = () => {
    const { t } = useTranslation(); // 🌍 i18n Çeviri Desteği

    return (
        <div className="general-construction-main" style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.8', color: '#333', backgroundColor: '#f4f8fb' }}>

            <style>
                {`
                    .service-section {
                        display: grid;
                        grid-template-columns: repeat(2, 1fr);
                        gap: 40px;
                        padding: 60px 20px;
                        max-width: 1200px;
                        margin: auto;
                    }

                    @media (max-width: 768px) {
                        .service-section {
                            grid-template-columns: 1fr;
                        }
                    }

                    .service-item {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        text-align: center;
                        border: 1px solid #ddd;
                        border-radius: 12px;
                        padding: 25px;
                        background-color: #fff;
                        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
                        transition: transform 0.3s ease, box-shadow 0.3s ease;
                    }

                    .service-item:hover {
                        transform: translateY(-10px);
                        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
                    }

                    .service-item img {
                        width: 100%;
                        max-width: 500px;
                        border-radius: 12px;
                        margin-bottom: 20px;
                    }

                    .service-item h2 {
                        font-size: 26px;
                        color: #0056b3;
                        margin-bottom: 15px;
                        text-transform: uppercase;
                        font-weight: bold;
                    }

                    .service-item p {
                        font-size: 16px;
                        color: #555;
                        line-height: 1.8;
                        margin: 0;
                    }

                    body {
                        margin: 0;
                        padding: 0;
                    }
                `}
            </style>

            <section className="service-section">
                {/* Kat Karşılığı İnşaat */}
                <div className="service-item">
                    <h2>{t('services.construction.title')}</h2>
                    <img src="Kat-karşılığı-foto.webp" alt="Kat Karşılığı İnşaat" />
                    <p>{t('services.construction.description')}</p>
                </div>

                {/* Anahtar Teslimi İnşaat */}
                <div className="service-item">
                    <h2>{t('services.turnkey.title')}</h2>
                    <img src="anahtar-teslim.webp" alt="Anahtar Teslimi İnşaat" />
                    <p>{t('services.turnkey.description')}</p>
                </div>

                {/* Dekorasyon ve Tadilat */}
                <div className="service-item">
                    <h2>{t('services.decoration.title')}</h2>
                    <img src="dekorasyon-tadilat.webp" alt="Dekorasyon ve Tadilat" />
                    <p>{t('services.decoration.description')}</p>
                </div>

                {/* Emlak Danışmanlığı */}
                <div className="service-item">
                    <h2>{t('services.real_estate.title')}</h2>
                    <img src="emlak-danismanligi.webp" alt="Emlak Danışmanlığı" />
                    <p>{t('services.real_estate.description')}</p>
                </div>
            </section>
        </div>
    );
};

export default GeneralConstructionMain;
