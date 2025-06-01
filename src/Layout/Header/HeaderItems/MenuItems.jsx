import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const MenuItems = () => {
    const { t } = useTranslation();
    const location = useLocation();

    const handleLinkClick = () => {
        window.scrollTo(0, 0);
    };

    return (
        <>
            <li className={location.pathname === '/' ? 'current-menu-item' : ''}>
                <Link to="/" onClick={handleLinkClick}>
                    {t("menu.home")}
                </Link>
            </li>
            <li className={location.pathname === '/projeler' ? 'current-menu-item' : ''}>
                <Link to="/projeler" onClick={handleLinkClick}>
                    {t("menu.projects")}
                </Link>
            </li>
            <li className={location.pathname === '/hizmetlerimiz' ? 'current-menu-item' : ''}>
                <Link to="/hizmetlerimiz" onClick={handleLinkClick}>
                    {t("menu.services")}
                </Link>
            </li>
            <li className={decodeURIComponent(location.pathname) === '/hakkımızda' ? 'current-menu-item' : ''}>
                <Link to="/hakkımızda" onClick={handleLinkClick}>
                    {t("menu.about")}
                </Link>
            </li>
        </>
    );
};

export default MenuItems;
