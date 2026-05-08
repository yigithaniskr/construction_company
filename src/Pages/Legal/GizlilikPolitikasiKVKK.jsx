import React from 'react';
import Header from '../../Layout/Header/Header';
import FooterMain from '../../Layout/Footer/FooterMain';
import ScrollToTop from '../../Layout/ScrollToTop/ScrollToTop';
import headerLogoNormal from "/blue-logo.png";
import logo from '/blue-logo.png';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const GizlilikPolitikasiKVKK = () => {
    return (
        <HelmetProvider>
            <Helmet>
                <title>Gizlilik Politikası & KVKK | İpekçi İnşaat</title>
                <meta name="description" content="İpekçi İnşaat Gizlilik Politikası ve KVKK aydınlatma metni. Kişisel verilerinizin işlenmesi ve çerez kullanımı hakkında bilgi edinin." />
            </Helmet>

            <Header
                normalLogo={headerLogoNormal}
                darkLogo={headerLogoNormal}
                topBarVisible={true}
                mail={true}
                isPhnNumber={true}
                address={true}
                btnQuite1={true}
            />
            <ScrollToTop bgColor={'#0056b3'} hoverColor={'#010d14'} />

            <section className="legal-page" style={{ background: '#fff', padding: '90px 0 100px' }}>
                <style>{`
                    .legal-page .legal-container {
                        max-width: 980px;
                        margin: 0 auto;
                        padding: 0 24px;
                        color: #2a2a2a;
                        line-height: 1.75;
                        font-size: 15.5px;
                    }
                    .legal-page h1 {
                        font-size: 36px;
                        font-weight: 700;
                        color: #0056b3;
                        margin: 0 0 12px;
                    }
                    .legal-page .legal-subtitle {
                        color: #777;
                        margin-bottom: 40px;
                        border-bottom: 1px solid #eee;
                        padding-bottom: 24px;
                    }
                    .legal-page h2 {
                        font-size: 22px;
                        font-weight: 700;
                        color: #003d7a;
                        margin: 38px 0 14px;
                    }
                    .legal-page h3 {
                        font-size: 17px;
                        font-weight: 600;
                        color: #003d7a;
                        margin: 24px 0 10px;
                    }
                    .legal-page p { margin: 0 0 14px; }
                    .legal-page ul { padding-left: 22px; margin: 0 0 18px; }
                    .legal-page ul li { margin-bottom: 8px; }
                    .legal-page a { color: #0056b3; text-decoration: underline; }
                    .legal-page a:hover { color: #003d7a; }
                    .legal-page .info-box {
                        background: #eef4fb;
                        border-left: 4px solid #0056b3;
                        padding: 18px 22px;
                        margin: 24px 0;
                        border-radius: 2px;
                    }
                `}</style>

                <div className="legal-container">
                    <h1>Gizlilik Politikası & KVKK Aydınlatma Metni</h1>
                    <p className="legal-subtitle">
                        Son güncelleme tarihi: {new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>

                    <p>
                        İpekçi İnşaat olarak, web sitemizi ziyaret eden kullanıcılarımızın gizliliğine önem veriyoruz.
                        Bu metin; 6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;) kapsamında veri sorumlusu sıfatıyla
                        kişisel verilerinizin işlenmesine ilişkin esasları ve sitemizde kullanılan çerez politikamızı açıklamaktadır.
                    </p>

                    <h2>1. Veri Sorumlusu</h2>
                    <p>
                        Veri sorumlusu: <strong>İpekçi İnşaat</strong><br />
                        Adres: Peker İş Merkezi, Kağıthane / İstanbul<br />
                        E-posta: <a href="mailto:info@ipekciinsaat.com">info@ipekciinsaat.com</a><br />
                        Telefon: <a href="tel:+905325589658">+90 532 558 96 58</a>
                    </p>

                    <h2>2. İşlenen Kişisel Veriler</h2>
                    <p>Sitemizi kullanmanız sırasında aşağıdaki veriler işlenebilir:</p>
                    <ul>
                        <li><strong>Kimlik & İletişim Bilgileri:</strong> Ad, soyad, telefon, e-posta (iletişim formu doldurulması durumunda).</li>
                        <li><strong>Talep ve Mesaj İçeriği:</strong> Tarafımıza ilettiğiniz proje, hizmet veya bilgi talepleri.</li>
                        <li><strong>Teknik Veriler:</strong> IP adresi, tarayıcı türü, ziyaret tarih/saati, görüntülenen sayfalar ve çerez verileri.</li>
                    </ul>

                    <h2>3. Kişisel Verilerin İşlenme Amaçları</h2>
                    <ul>
                        <li>Tarafınıza sunulan hizmetlerin yürütülmesi ve iletişim kurulması,</li>
                        <li>Talep ve şikâyetlerinizin değerlendirilmesi ve sonuçlandırılması,</li>
                        <li>Web sitesinin teknik açıdan iyileştirilmesi ve güvenliğinin sağlanması,</li>
                        <li>Yasal yükümlülüklerin yerine getirilmesi.</li>
                    </ul>

                    <h2>4. Verilerin Aktarılması</h2>
                    <p>
                        Kişisel verileriniz; yalnızca yukarıda belirtilen amaçların gerçekleştirilmesi için, gerekli güvenlik
                        önlemleri alınmak suretiyle yetkili kamu kurum ve kuruluşlarına, iş ortaklarımıza ve hizmet aldığımız
                        tedarikçilerimize aktarılabilir. Kişisel verileriniz açık rızanız olmaksızın yurt dışına aktarılmaz.
                    </p>

                    <h2>5. Çerez (Cookie) Politikası</h2>
                    <p>
                        Web sitemiz, kullanıcı deneyiminizi iyileştirmek ve sitenin temel işlevlerini sağlamak amacıyla
                        çerezler kullanmaktadır. Çerezler tarayıcınızda saklanan küçük metin dosyalarıdır.
                    </p>

                    <h3>5.1. Kullanılan Çerez Türleri</h3>
                    <ul>
                        <li><strong>Zorunlu çerezler:</strong> Sitenin çalışması için gereklidir; devre dışı bırakılamaz.</li>
                        <li><strong>İşlevsel çerezler:</strong> Dil tercihiniz gibi seçimlerinizi hatırlamak için kullanılır.</li>
                        <li><strong>Analitik çerezler:</strong> Sitenin nasıl kullanıldığını anlamamıza yardımcı olur (anonim).</li>
                    </ul>

                    <h3>5.2. Çerez Tercihlerinizi Yönetme</h3>
                    <p>
                        Tarayıcı ayarlarınızdan çerezleri her zaman silebilir veya engelleyebilirsiniz. Ancak bazı çerezleri
                        engellemeniz halinde sitemizin bazı bölümleri düzgün çalışmayabilir.
                    </p>

                    <h2>6. KVKK Kapsamındaki Haklarınız</h2>
                    <p>KVKK&apos;nın 11. maddesi uyarınca aşağıdaki haklara sahipsiniz:</p>
                    <ul>
                        <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme,</li>
                        <li>İşlenmişse buna ilişkin bilgi talep etme,</li>
                        <li>İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme,</li>
                        <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme,</li>
                        <li>KVKK&apos;da öngörülen şartlar çerçevesinde silinmesini veya yok edilmesini isteme,</li>
                        <li>İşlemenin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle kendiniz aleyhine bir sonucun ortaya çıkmasına itiraz etme,</li>
                        <li>Kanuna aykırı işlenmesi sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme.</li>
                    </ul>

                    <div className="info-box">
                        <strong>İletişim:</strong> Yukarıdaki haklarınızı kullanmak için taleplerinizi{' '}
                        <a href="mailto:info@ipekciinsaat.com">info@ipekciinsaat.com</a> adresine
                        kimlik bilgilerinizle birlikte iletebilirsiniz. Talepleriniz en geç 30 gün içerisinde sonuçlandırılacaktır.
                    </div>

                    <h2>7. Değişiklikler</h2>
                    <p>
                        Bu metin, gerekli görüldüğü hallerde güncellenebilir. Güncel metin her zaman bu sayfada yayınlanır.
                        Sayfayı düzenli olarak ziyaret etmenizi öneririz.
                    </p>
                </div>
            </section>

            <FooterMain logo={logo} />
        </HelmetProvider>
    );
};

export default GizlilikPolitikasiKVKK;
