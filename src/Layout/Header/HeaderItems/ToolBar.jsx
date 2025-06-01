import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './ToolBar.css'; // CSS dosyanı dahil et

const ToolBar = ({ topBarModifyClass, phnNumber, mail, address, textOnly, phnNumberFirst, containerFluid }) => {
    const { i18n } = useTranslation();
    const { t } = useTranslation(); // 🌍 i18n Çeviri Desteği

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <>
            <div className={`toolbar-area topbar-style1 ${topBarModifyClass ? topBarModifyClass : ''} hidden-md`}>
                <div className={`container${containerFluid ? containerFluid : ''}`}>
                    <div className="row rs-vertical-middle">
                        <div className="col-lg-7">
                            <div className="toolbar-contact">
                                <ul className="rs-contact-info">
                                    {phnNumberFirst && (
                                        <li>
                                            <i className="ri-phone-line"></i>
                                            <Link to="tel:(+90) 532 558 96 58">(+90) 532 558 96</Link>
                                        </li>
                                    )}
                                    {mail && (
                                        <li>
                                            <i className="ri-mail-send-line"></i>
                                            <Link to="mailto:info@ipekciinsaat.com">info@ipekciinsaat.com</Link>
                                        </li>
                                    )}
                                    {phnNumber && (
                                        <li>
                                            <i className="ri-phone-line"></i>
                                            <Link to="tel:(+90) 532 558 96 58">(+90) 532 558 96 58</Link>
                                        </li>
                                    )}
                                   
                                </ul>
                            </div>
                        </div>

                        {/* Dil Seçme Butonları ve Sosyal Medya İkonları */}
                        <div className="col-lg-5">
                            <div className="toolbar-right">
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
                                <div className="toolbar-sl-share">
                                    <ul className="clearfix">
                                        <li><Link to="https://www.facebook.com/profile.php?id=61572518680384"><i className="ri-facebook-fill"></i></Link></li>
                                        <li><Link to="https://www.instagram.com/ipekciinsaat/"><i className="ri-instagram-fill"></i></Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default ToolBar;
