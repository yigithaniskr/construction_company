import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const STORAGE_KEY = 'ipekci-cookie-consent';

const CookieConsent = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (!localStorage.getItem(STORAGE_KEY)) {
            const t = setTimeout(() => setVisible(true), 400);
            return () => clearTimeout(t);
        }
    }, []);

    const dismiss = () => {
        localStorage.setItem(STORAGE_KEY, 'accepted');
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div className="cookie-consent-wrapper" role="dialog" aria-live="polite" aria-label="Çerez bildirimi">
            <style>{`
                .cookie-consent-wrapper {
                    position: fixed;
                    left: 0;
                    right: 0;
                    bottom: 24px;
                    z-index: 9999;
                    display: flex;
                    justify-content: center;
                    padding: 0 24px;
                    pointer-events: none;
                    animation: cc-slide-up 0.5s ease-out;
                }
                @keyframes cc-slide-up {
                    from { transform: translateY(40px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                .cookie-consent-pill {
                    pointer-events: auto;
                    background: #0c1c2e;
                    color: #fff;
                    border-radius: 12px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
                    max-width: 1100px;
                    width: 100%;
                    padding: 20px 24px;
                    display: flex;
                    align-items: center;
                    gap: 24px;
                    flex-wrap: wrap;
                }
                .cookie-consent-text {
                    flex: 1;
                    min-width: 260px;
                    margin: 0;
                    font-size: 15px;
                    line-height: 1.55;
                    color: #ffffff;
                }
                .cookie-consent-text a {
                    color: #4fa3e6;
                    text-decoration: underline;
                    text-underline-offset: 3px;
                }
                .cookie-consent-text a:hover { color: #6ebbf2; }
                .cookie-consent-accept {
                    background: #1c7ed6;
                    color: #ffffff;
                    border: none;
                    padding: 11px 30px;
                    font-weight: 600;
                    font-size: 15px;
                    cursor: pointer;
                    border-radius: 8px;
                    transition: background 0.2s ease, transform 0.15s ease;
                    white-space: nowrap;
                }
                .cookie-consent-accept:hover {
                    background: #1971c2;
                    transform: translateY(-1px);
                }
                @media (max-width: 600px) {
                    .cookie-consent-wrapper { bottom: 12px; padding: 0 12px; }
                    .cookie-consent-pill { padding: 18px 20px; gap: 14px; border-radius: 10px; }
                    .cookie-consent-text { font-size: 14px; }
                    .cookie-consent-accept { padding: 10px 22px; font-size: 14px; width: 100%; }
                }
            `}</style>
            <div className="cookie-consent-pill">
                <p className="cookie-consent-text">
                    Bu web sitesi, size en iyi deneyimi sunmak için çerezleri kullanmaktadır. Siteyi kullanmaya devam ederek{' '}
                    <Link to="/gizlilik-politikasi-kvkk" onClick={() => window.scrollTo(0, 0)}>Gizlilik Politikası</Link>
                    'nı kabul etmiş olursunuz.
                </p>
                <button className="cookie-consent-accept" onClick={dismiss}>Kabul Et</button>
            </div>
        </div>
    );
};

export default CookieConsent;
