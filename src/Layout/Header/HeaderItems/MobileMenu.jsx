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

    // ✅ Dil değiştirme fonksiyonu (Sayfanın tekrar yüklenmesini önler)
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        localStorage.setItem('selectedLanguage', lng); // ✅ Kullanıcının seçimini kaydet
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

                    {/* ✅ Dil Değiştirme Butonları (Yan Yana Görünecek Şekilde) */}
                    <div className="language-selector-container">
                        <div className="language-selector">
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
                    </div>
                </div>
            )}
        </>
    );
};

export default MenuItem;
