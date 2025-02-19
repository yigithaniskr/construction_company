import React from 'react';
import Header from '../../../Layout/Header/Header';
import headerLogoNormal from "/blue-logo.png";
import HizmetlerimizMain from './HizmetlerimizMain';
import logo from '/blue-logo.png';
import FooterMain from '../../../Layout/Footer/FooterMain';
import ScrollToTop from '../../../Layout/ScrollToTop/ScrollToTop';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';


const Hizmetlerimiz = () => {
      const { t } = useTranslation(); // i18n çeviri fonksiyonu kullanımı
    
    return (
        <HelmetProvider>
            <Helmet>
                <title>{t("menu.services")}</title>
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
                firstLvlMenu="pages"
            />
            <ScrollToTop
                bgColor={'#0056b3'}
                hoverColor={'#010d14 '}
            />
            <HizmetlerimizMain />
            <FooterMain
                logo={logo}
            />
        </HelmetProvider>
    );
};

export default Hizmetlerimiz;