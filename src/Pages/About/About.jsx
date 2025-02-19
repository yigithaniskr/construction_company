import React from 'react';
import Header from '../../Layout/Header/Header';
import headerLogoNormal from "/blue-logo.png";
import AboutMain from './AboutMain';
import logo from '/blue-logo.png';
import FooterMain from '../../Layout/Footer/FooterMain';
import ScrollToTop from '../../Layout/ScrollToTop/ScrollToTop';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';


const About = () => {
    const { t } = useTranslation(); // i18n çeviri fonksiyonu kullanımı
    
    return (
        <HelmetProvider>
            <Helmet>
            <title>{t("menu.about")}</title>
            </Helmet>
            <Header
                normalLogo={headerLogoNormal}
                darkLogo={headerLogoNormal}
                topBarVisible={true}
                mail={true}
                isPhnNumber={true}
                address={true}
                searchIcon={true}
                btnQuite1={true}
                firstLvlMenu="about"
            />
            <ScrollToTop
                bgColor={'#0056b3'}
                hoverColor={'#010d14 '}
            />
            <AboutMain />
            <FooterMain
                logo={logo}
            />
        </HelmetProvider>
    );
};

export default About;