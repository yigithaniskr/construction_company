import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const handleLinkClick = () => {
    window.scrollTo(0, 0);
};

const Footer = ({ logo, footerStyle }) => {
    const { t } = useTranslation();

    return (
        <footer id="rs-footer" className={`rs-footer footer-main-home ${footerStyle || ''}`} style={{ backgroundImage: "url('/footer-bg.jpg')" }}>
            <style>
                {`
                @media (max-width: 768px) {
                    .footer-logo img {
                        width: 150px !important; /* Mobil için logo genişliğini küçült */
                        height: auto !important; /* Yükseklik otomatik ayarlanır */
                    }
                }
                `}
            </style>
            <div className="footer-top">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 pr-20 md-pr-15 md-mb-20">
                            <div className="footer-logo mb-51 md-mb-30">
                                <Link onClick={handleLinkClick} to="/">
                                    <img 
                                        src={logo} 
                                        alt="Logo" 
                                        className="footer-logo" 
                                        style={{ width: "100%", maxWidth: "300px", height: "100px" }} 
                                    />
                                </Link>
                            </div>
                            <div className="textwidget">
                                <p className="pb-20">{t('footer.company_description')}</p>
                            </div>
                            <ul className="footer-social md-mb-30">
                                <li><Link to="https://www.facebook.com/profile.php?id=61572518680384"><i className="ri-facebook-fill"></i></Link></li>
                                <li><Link to="https://www.instagram.com/ipekciinsaat/"><i className="ri-instagram-fill"></i></Link></li>
                            </ul>
                        </div>
                        <div className="col-lg-3 md-mb-10">
                            <h3 className="footer-title">{t('footer.contact_info')}</h3>
                            <ul className="address-widget">
                                <li>
                                    <i className="fi fi-rr-marker"></i>
                                    <div className="desc">{t('footer.address')}</div>
                                </li>
                                <li>
                                    <i className="fi fi-rr-phone-call"></i>
                                    <div className="desc">
                                        <Link to="tel:(+90)5325589658">{t('footer.phone')}</Link>
                                    </div>
                                </li>
                                <li>
                                    <i className="fi fi-rr-envelope"></i>
                                    <div className="desc">
                                        <Link to="mailto:info@ipekciinsaat.com">{t('footer.email')}</Link>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-3 md-mb-10">
                            <h3 className="footer-title">{t('footer.services')}</h3>
                            <ul className="site-map">
                                <li onClick={handleLinkClick}><Link to="/hizmetlerimiz">{t('footer.service_list.construction')}</Link></li>
                                <li onClick={handleLinkClick}><Link to="/hizmetlerimiz">{t('footer.service_list.turnkey')}</Link></li>
                                <li onClick={handleLinkClick}><Link to="/hizmetlerimiz">{t('footer.service_list.decoration')}</Link></li>
                                <li onClick={handleLinkClick}><Link to="/hizmetlerimiz">{t('footer.service_list.real_estate')}</Link></li>
                            </ul>
                        </div>
                        <div className="col-lg-3 md-mb-10">
                            <h3 className="footer-title">{t('footer.projects')}</h3>
                            <ul className="site-map">
                                <li onClick={handleLinkClick}><Link to="/projeler">{t('footer.projects_link')}</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
