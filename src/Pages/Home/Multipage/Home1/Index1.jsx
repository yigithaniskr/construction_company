import React from 'react';
import Header from '../../../../Layout/Header/Header';
import headerLogoNormal from "/last_logo.png";
import Index1Main from './Index1Main';
import logo from '/last_logo.png';
import FooterMain from '../../../../Layout/Footer/FooterMain';
import ScrollToTop from '../../../../Layout/ScrollToTop/ScrollToTop';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const Index1 = () => {
      const { t } = useTranslation(); // i18n çeviri fonksiyonu kullanımı
    return (
        <HelmetProvider>
            <Helmet>
                <title>{t("menu.ipekci")}</title>
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
                firstLvlMenu="home"
                secondLvlMenu="multipages"
            />
            <ScrollToTop
                bgColor={'#0056b3'} 
                hoverColor={'#333333'}
                iconColor={'#333333'}
                hoverIconColor={'#fff'}
             />  
            <Index1Main />
            <FooterMain
                logo={logo}
            />
        </HelmetProvider>
    );
};

export default Index1;