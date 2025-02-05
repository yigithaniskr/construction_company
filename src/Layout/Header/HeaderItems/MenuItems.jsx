import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Çeviri desteği eklendi

const MenuItems = ({ firstLvlMenu }) => {
    const { t } = useTranslation(); // i18n çeviri fonksiyonunu kullanma
    const location = useLocation();

    const handleLinkClick = () => {
        window.scrollTo(0, 0); // Sayfayı her yönlendirmede en üste kaydırır
    };

    return (
        <>
            <li className={`${firstLvlMenu === 'home' ? 'current-menu-item' : ''}`}>
                <Link to="/*" onClick={handleLinkClick}>
                    {t("menu.home")}
                </Link>
            </li>
            <li className={` ${firstLvlMenu === 'services' ? 'current-menu-item' : ''}`}>
                <Link to="/projeler" onClick={handleLinkClick}>
                    {t("menu.projects")}
                </Link>
            </li>
            <li className={`${firstLvlMenu === 'pages' ? 'current-menu-item' : ''}`}>
                <Link to="/hizmetlerimiz" onClick={handleLinkClick}>
                    {t("menu.services")}
                </Link>
            </li>
            <li className={`${firstLvlMenu === 'about' ? 'current-menu-item' : ''}`}>
                <Link to="/hakkımızda" onClick={handleLinkClick}>
                    {t("menu.about")}
                </Link>
            </li>
        </>
    );
};

export default MenuItems;
