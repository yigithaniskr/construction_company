import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MenuItems from './HeaderItems/MenuItems';
import ToolBar from './HeaderItems/ToolBar';
import MobileMenu from './HeaderItems/MobileMenu';
import { useTranslation } from 'react-i18next';

const Header = ({ 
    normalLogo, darkLogo, topBarVisible, headerStyle, middleHeader, 
    searchIcon, btnQuite1, btnQuite2, socialIcon, isPhnNumber, 
    topBarModifyClass, callIcon, otherClass, modifyClassMidl, 
    logoMidl, mail, address, textOnly, boxLayout, btnQuite1Icon, 
    containerFluid, phnNumberFirst, firstLvlMenu, secondLvlMenu, secondLvlMenu2, 
    isOnePage, headerParentCls
}) => {

    const { t } = useTranslation(); // i18n çeviri fonksiyonu kullanımı
    const [searchValue, setSearchValue] = useState('');
    const [searchVisible, setSearchVisible] = useState(false);
    const [isSticky, setSticky] = useState(false);
    const [navExpanded, setNavExpanded] = useState(false);

    const handleScroll = () => {
        setSticky(window.scrollY > 70);
    };

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    const handleSearchToggle = () => {
        setSearchVisible(prev => !prev);
    };

    const handleToggleMobileMenu = () => {
        setNavExpanded(prevState => !prevState);
        document.body.classList.toggle('nav-expanded', !navExpanded);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.body.classList.remove('nav-expanded');
        };
    }, []);

    return (
        <div className={`full-width-header ${headerParentCls ? headerParentCls : ''}`}>
            <header id="rs-header" className={`rs-header ${headerStyle || ''} ${otherClass || ''}`}>
                {/* Toolbar Area Start */}
                {topBarVisible && <ToolBar
                    phnNumber={isPhnNumber}
                    topBarModifyClass={topBarModifyClass}
                    mail={mail}
                    address={address}
                    textOnly={textOnly}
                    phnNumberFirst={phnNumberFirst}
                    containerFluid={containerFluid}
                />}
                {middleHeader && <MiddleHeader
                    logo={logoMidl}
                    modifyClassMidl={modifyClassMidl}
                />}
                {/* Toolbar Area End */}

                {/* Menu Start */}
                <div className={`menu-area menu-sticky ${isSticky ? 'sticky' : ''}`}>
                    <div className={`container${containerFluid || ''} ${boxLayout || ''}`}>
                        <div className="row-table">
                        <div className="col-cell header-logo" style={{ overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
    <div className="logo-area">
        <Link to="*">
            <img 
                className="normal-logo" 
                style={{ width: '300px', maxHeight: '120px', height: 'auto', display: isSticky ? 'none' : 'block', marginRight: '20px' }}  
                src={normalLogo} 
                alt="logo" 
            />
            <img 
                className="sticky-logo" 
                style={{ width: '280px', maxHeight: '120px', height: 'auto', display: isSticky ? 'block' : 'none', marginRight: '20px' }}  
                src={darkLogo} 
                alt="logo" 
            />
        </Link>
    </div>
</div>

                            <div className="col-cell">
                                <div className="rs-menu-area">
                                    <div className="main-menu">
                                        <nav className="rs-menu hidden-md">
                                            <ul className="nav-menu">
                                                {isOnePage ? (
                                                    <MenuItemSingle />
                                                ) : (
                                                    <MenuItems
                                                        firstLvlMenu={firstLvlMenu}
                                                        secondLvlMenu={secondLvlMenu}
                                                        secondLvlMenu2={secondLvlMenu2}
                                                    />
                                                )}
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                            <div className="col-cell">
                                <div className="expand-btn-inner">
                                    <ul>
                                        {socialIcon &&
                                            <li className="toolbar-sl-share">
                                                <ul className="clearfix">
                                                    <li><Link to="#"><i className="ri-facebook-fill"></i></Link></li>
                                                    <li><Link to="#"><i className="ri-instagram-fill"></i></Link></li>
                                                </ul>
                                            </li>
                                        }
                                        
                                        {btnQuite1 && (
    <li className="btn-quote">
        <button
            className="quote-button"
            onClick={() => {
                window.location.href = 'https://api.whatsapp.com/send/?phone=905325589658&text&type=phone_number&app_absent=0';
            }}
        >
            {t('menu.contact2')}
            {btnQuite1Icon && <i className="ri-arrow-right-line"></i>}
        </button>
    </li>
)}
                                        {btnQuite2 &&
                                            <li className="btn-quote">
                                                <Link className="quote-button" to="/contact">
                                                    Get A Quote
                                                    <i className="ri-arrow-right-line"></i>
                                                </Link>
                                            </li>
                                        }
                                        {callIcon &&
                                            <li className="rs-contact-phone">
                                                <i className="fi fi-rr-phone-call"></i>
                                                <div className="phone-number">
                                                    <span>Free Call</span>
                                                    <Link to="(+90) 532 558 96 58"> (+90) 532 558 96 58</Link>
                                                </div>
                                            </li>
                                        }
                                        <li className="humburger" onClick={handleToggleMobileMenu}>
                                            <Link id="nav-expander" className="nav-expander bar" to="#">
                                                <div className="bar">
                                                    <span className="dot1"></span>
                                                    <span className="dot2"></span>
                                                    <span className="dot3"></span>
                                                    <span className="dot4"></span>
                                                    <span className="dot5"></span>
                                                    <span className="dot6"></span>
                                                    <span className="dot7"></span>
                                                    <span className="dot8"></span>
                                                    <span className="dot9"></span>
                                                </div>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Menu End */}
            </header>
            <nav
                className={`right_menu_togle mobile-navbar-menu ${navExpanded ? 'open' : 'closed'}`}
                id="mobile-navbar-menu"
                style={{
                    maxHeight: navExpanded ? '100vh' : '0',
                    overflowY: navExpanded ? 'auto' : 'hidden',
                    display: navExpanded ? 'block' : 'none',
                    position: 'fixed',
                    top: 0,
                    right: 0,
                    width: '90%',
                    backgroundColor: '#fff',
                    zIndex: 1000,
                    transition: 'max-height 0.3s ease-in-out, display 0s 0.3s', // Smooth transition
                }}
            >
                <div className="close-btn">
                    <Link id="nav-close2" className="nav-close" onClick={handleToggleMobileMenu}>
                        <div className="line">
                            <span className="line1"></span>
                            <span className="line2"></span>
                        </div>
                    </Link>
                </div>
                <ul className="nav-menu">
                    <MobileMenu isMobile={true} isOnePage={isOnePage} />
                </ul>
                <div className="canvas-contact">
                    <div className="address-area">
                        <div className="address-list">
                            <div className="info-icon">
                                <i className="fi fi-rr-map-marker-home"></i>
                            </div>
                            <div className="info-content">
                                <em className="title">{t("menu.kgthn")}</em>
                            </div>
                        </div>
                        <div className="address-list">
                            <div className="info-icon">
                                <i className="fi fi-rr-envelope-plus"></i>
                            </div>
                            <div className="info-content">
                                
                                <em className="title"><Link to="mailto:info@ipekciinsaat.com">info@ipekciinsaat.com</Link></em>
                            </div>
                        </div>
                        <div className="address-list">
                            <div className="info-icon">
                                <i className="fi fi-rr-phone-call"></i>
                            </div>
                            <div className="info-content">
                                <em className="title"><Link to="tel:+905325589658">+90 532 558 96 58</Link></em>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;