import React from 'react';

// Import images
import ser1Image from '../../../assets/images/services/style12/icons/ser1.png';
import ser3Image from '../../../assets/images/services/style12/icons/ser3.png';
import ser4Image from '../../../assets/images/services/style12/icons/ser4.png';
import ser6Image from '../../../assets/images/services/style12/icons/ser6.png';
import ServiceCard2 from '../../../Components/Services/ServiceCard2';

// Service data
const services = [
    { id: 1, title: 'Kat Karşılığı İnşaat Taahhüt', link: '/general-construction', image: ser4Image, description: 'Arsanızın üzerine modern ve kaliteli yapılar inşa ediyoruz. Profesyonel ekibimizle kat karşılığı projelerde güvenilir hizmet sunuyoruz' },
    { id: 2, title: 'Anahtar Teslimi İnşaat', link: '/general-construction', image: ser3Image, description: "Anahtar teslimi projelerle hayalinizdeki yapıyı A'dan Z'ye tamamlıyoruz. Tüm süreci profesyonel bir şekilde yöneterek zamanında ve eksiksiz teslimat sağlıyoruz" },
    { id: 3, title: 'Ev, Ofis, Daire Dekorasyon & Tadilat', link: '/general-construction', image: ser6Image, description: 'Eviniz, ofisiniz veya daireniz için modern dekorasyon ve tadilat çözümleri sunuyoruz. Estetik ve fonksiyonelliği bir araya getirerek yaşam alanlarınızı yeniden tasarlıyoruz' },
    { id: 4, title: 'Emlak Danışmanlığı', link: '/general-construction', image: ser1Image, description: 'Emlak alım, satım ve kiralama süreçlerinizde uzman ekibimizle yanınızdayız. Doğru yatırım kararları için profesyonel danışmanlık hizmeti sunuyoruz' },
];

const ServiceSection = () => {
    return (
        <div className="rs-services services-style13 gray-bg6 pt-120 pb-120 md-pt-80 md-pb-80">
            <div className="container">
                <div className="row">
                    {services.map((service) => (
                        <div key={service.id} className="col-lg-6 col-md-6 mb-20">
                            <ServiceCard2
                                service={service}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ServiceSection;
