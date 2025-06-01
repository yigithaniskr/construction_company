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
                        width: 150px !important;
                        height: auto !important;
                    }
                }
                .site-map li {
                    color: #fff;
                    margin-bottom: 8px;
                    transition: color 0.3s ease;
                    cursor: pointer;
                }
                .site-map li:hover {
                    color: #ccc;
                }
                .site-map li a {
                    color: inherit;
                    text-decoration: none;
                }
                .desc a {
                    color: #fff;
                    text-decoration: none;
                    transition: color 0.3s ease;
                }
                .desc a:hover {
                    color: #00f; /* Telefon numarası gibi mavi yapar */
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
                                        style={{ width: "100%", maxWidth: "300px", height: "90px" }} 
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
                                    <div className="desc">
                                        <a 
                                            href="https://www.google.com/maps/dir/?api=1&destination=Peker+İş+Merkezi+Kağıthane+İstanbul" 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                        >
                                            {t('footer.address')}
                                        </a>
                                    </div>
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
                            {/* Google Maps iFrame */}
                            <div className="mt-3">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3007.5561521271748!2d28.99848033304203!3d41.07869367298131!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab7a57d5d14b5%3A0xc9a9cd77f0a01ba!2zUGVrZXIgxLDFnyBNZXJrZXpp!5e0!3m2!1str!2str!4v1748781035339!5m2!1str!2str"
                                    width="100%"
                                    height="200"
                                    frameBorder="0"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Ofis Konumu"
                                ></iframe>
                                <div className="mt-2">
                                    <ul className="site-map">
                                        <li onClick={handleLinkClick}>
                                            <a 
                                                href="https://www.google.com/maps/dir/?api=1&destination=Peker+İş+Merkezi+Kağıthane+İstanbul" 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                            >
                                                {t('footer.direction_to')}
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
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
