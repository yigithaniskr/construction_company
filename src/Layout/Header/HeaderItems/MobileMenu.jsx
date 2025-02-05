import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const MenuItem = ({ isMobile, isOnePage, handleCloseMobileMenu }) => {
    const { t, i18n } = useTranslation(); // i18n çeviri desteği
    const [openSubmenu, setOpenSubmenu] = useState(null);
    const [activeMenu, setActiveMenu] = useState('');
    const [submenuClass, setSubmenuclass] = useState(false);

    const handleSubMenuOpen = (submenu) => {
        if (activeMenu === submenu) {
            setOpenSubmenu(null);
            setActiveMenu('');
            setSubmenuclass(false);
        } else {
            setOpenSubmenu(submenu);
            setActiveMenu(submenu);
            setSubmenuclass(!submenuClass);
        }
    };

    const handleWhatsAppClick = () => {
        window.open('https://wa.me/905325589658', '_blank'); // WhatsApp sohbetini yeni sekmede açar
    };

    const handleClick = (menu) => {
        if (activeMenu === menu) {
            setActiveMenu('');
        } else {
            setActiveMenu(menu);
        }
        handleCloseMobileMenu();
    };

    const isActive = (menuItem) => {
        return activeMenu === menuItem ? 'active' : '';
    };



    return (
        <>
            {isOnePage ? (
                <MenuItemsSingle />
            ) : (
                <div>
                    <li className="has-sub hash-has-sub">
                        <Link
                            to="/index-01"
                            onClick={() => handleClick('index-01')}
                            className={`hash ${isActive('index-01')}`}
                        >
                            {t("menu.home")}
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/hakkımızda"
                            className={`hash ${isActive('about')}`}
                            onClick={() => handleClick('about')}
                        >
                            {t("menu.about")}
                        </Link>
                    </li>
                    <li className="has-sub hash-has-sub">
                        <Link
                            to="/projeler"
                            onClick={() => handleClick('projeler')}
                            className={`hash ${isActive('projeler')}`}
                        >
                            {t("menu.projects")}
                        </Link>
                    </li>
                    <li className="current-menu-item has-sub hash-has-sub">
                        <Link
                            to="/hizmetlerimiz"
                            onClick={() => handleClick('hizmetlerimiz')}
                            className={`hash ${isActive('hizmetlerimiz')}`}
                        >
                            {t("menu.services")}
                        </Link>
                    </li>
                    <li>
                        <button
                            className={`hash ${isActive('contact')}`}
                            onClick={() => {
                                handleWhatsAppClick();
                                setActiveMenu('contact');
                            }}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: 'inherit',
                                cursor: 'pointer',
                                padding: 0,
                            }}
                        >
                            {t("menu.contact")}
                        </button>
                    </li>
                    {/* Dil Değiştirme Butonları */}
                   
                </div>
            )}
        </>
    );
};

export default MenuItem;
