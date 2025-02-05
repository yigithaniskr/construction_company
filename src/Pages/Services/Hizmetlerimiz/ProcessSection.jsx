import React from 'react';
import { useTranslation } from 'react-i18next';
// Import images
import p1Image from '../../../assets/images/process/style3/icons/p1.png';
import p2Image from '../../../assets/images/process/style3/icons/p2.png';
import p3Image from '../../../assets/images/process/style3/icons/p3.png';
import p4Image from '../../../assets/images/process/style3/icons/p4.png';
import ProcessItem2 from '../../../Components/Process/ProcessItem2';

// 🌍 i18n Çeviri Desteği
const ProcessSection = () => {
    const { t } = useTranslation();

    // Process data (i18n kullanarak)
    const processes = [
        { id: 1, title: t('process.planning.title'), image: p1Image, description: t('process.planning.description') },
        { id: 2, title: t('process.design.title'), image: p2Image, description: t('process.design.description') },
        { id: 3, title: t('process.development.title'), image: p3Image, description: t('process.development.description') },
        { id: 4, title: t('process.delivery.title'), image: p4Image, description: t('process.delivery.description') },
    ];

    return (
        <div className="rs-process process-style3 bg23 pt-150 pb-115 md-pt-115 md-pb-80"
            style={{
                backgroundImage: "url('/konstruk-bg.jpg')",
            }}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-8">
                        <div className="sec-title mb-70 md-mb-15">
                            <h2 className="title title4 ser-style1">
                                {t('process.title')}
                                <br />
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container custom3">
                <div className="process-bg">
                    <div className="row">
                        {processes.map((process) => (
                            <div key={process.id} className="col-xl-3 col-md-6 md-40">
                                <ProcessItem2 process={process} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProcessSection;
