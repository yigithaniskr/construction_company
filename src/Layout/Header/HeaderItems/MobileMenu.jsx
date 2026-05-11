import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const MobileMenu = ({ handleCloseMobileMenu }) => {
    const { t, i18n } = useTranslation();
    const location = useLocation();

    const handleLinkClick = () => {
        window.scrollTo(0, 0);
        if (typeof handleCloseMobileMenu === 'function') {
            handleCloseMobileMenu();
        }
    };

    const handleWhatsAppClick = () => {
        window.open('https://wa.me/905325589658', '_blank');
        if (typeof handleCloseMobileMenu === 'function') {
            handleCloseMobileMenu();
        }
    };

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        localStorage.setItem('selectedLanguage', lng);
    };

    const isCurrent = (path) => decodeURIComponent(location.pathname) === path;

    return (
        <>
            <li className={isCurrent('/') ? 'current-menu-item' : ''}>
                <Link to="/" onClick={handleLinkClick}>
                    {t('menu.home')}
                </Link>
            </li>
            <li className={isCurrent('/hakkımızda') ? 'current-menu-item' : ''}>
                <Link to="/hakkımızda" onClick={handleLinkClick}>
                    {t('menu.about')}
                </Link>
            </li>
            <li className={isCurrent('/projeler') ? 'current-menu-item' : ''}>
                <Link to="/projeler" onClick={handleLinkClick}>
                    {t('menu.projects')}
                </Link>
            </li>
            <li className={isCurrent('/hizmetlerimiz') ? 'current-menu-item' : ''}>
                <Link to="/hizmetlerimiz" onClick={handleLinkClick}>
                    {t('menu.services')}
                </Link>
            </li>
            <li>
                <button
                    type="button"
                    onClick={handleWhatsAppClick}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'inherit',
                        cursor: 'pointer',
                        padding: 0,
                        font: 'inherit',
                        textAlign: 'left',
                    }}
                >
                    {t('menu.contact')}
                </button>
            </li>

            <li className="language-selector-container" style={{ marginTop: '20px' }}>
                <div className="language-selector" style={{ display: 'flex', gap: '10px' }}>
                    <button
                        className={`lang-button ${i18n.language === 'tr' ? 'active' : ''}`}
                        onClick={() => changeLanguage('tr')}
                    >
                        <img src="https://flagcdn.com/w40/tr.png" alt="Türk Bayrağı" />
                    </button>
                    <button
                        className={`lang-button ${i18n.language === 'en' ? 'active' : ''}`}
                        onClick={() => changeLanguage('en')}
                    >
                        <img src="https://flagcdn.com/w40/us.png" alt="Amerikan Bayrağı" />
                    </button>
                </div>
            </li>
        </>
    );
};

export default MobileMenu;
