import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { login } from '../../firebase/auth';
import { useAuth } from './useAuth';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [busy, setBusy] = useState(false);
    const [fieldErrors, setFieldErrors] = useState({});
    const navigate = useNavigate();
    const location = useLocation();
    const { user, loading } = useAuth();

    const redirectTo = location.state?.from?.pathname || '/yonetim-paneli';

    useEffect(() => {
        if (!loading && user) navigate(redirectTo, { replace: true });
    }, [user, loading, navigate, redirectTo]);

    const onSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const errs = {};
        if (!username.trim()) errs.username = 'Kullanıcı adını girin';
        if (!password) errs.password = 'Şifreyi girin';
        setFieldErrors(errs);
        if (Object.keys(errs).length > 0) return;

        setBusy(true);
        try {
            await login(username, password);
            navigate(redirectTo, { replace: true });
        } catch (err) {
            const code = err?.code || '';
            if (code.includes('invalid-credential') || code.includes('user-not-found') || code.includes('wrong-password')) {
                setError('Kullanıcı adı veya şifre hatalı.');
            } else if (code.includes('too-many-requests')) {
                setError('Çok fazla deneme yapıldı, biraz sonra tekrar deneyin.');
            } else {
                setError('Giriş başarısız: ' + (err?.message || 'Bilinmeyen hata'));
            }
        } finally {
            setBusy(false);
        }
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
        if (fieldErrors.username) setFieldErrors((p) => ({ ...p, username: undefined }));
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (fieldErrors.password) setFieldErrors((p) => ({ ...p, password: undefined }));
    };

    return (
        <div className="admin-login-page">
            <style>{`
                .admin-login-page {
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: linear-gradient(135deg, #003f82, #0056b3);
                    padding: 24px;
                }
                .admin-login-card {
                    width: 100%;
                    max-width: 420px;
                    background: #fff;
                    border-radius: 12px;
                    padding: 40px 32px;
                    box-shadow: 0 20px 60px rgba(0,0,0,0.25);
                }
                .admin-login-card .logo-row {
                    text-align: center;
                    margin-bottom: 24px;
                }
                .admin-login-card .logo-row img {
                    max-height: 60px;
                }
                .admin-login-card h2 {
                    margin: 0 0 6px;
                    color: #0056b3;
                    font-size: 22px;
                    text-align: center;
                }
                .admin-login-card .subtitle {
                    color: #777;
                    text-align: center;
                    font-size: 14px;
                    margin-bottom: 26px;
                }
                .admin-login-card label {
                    display: block;
                    color: #444;
                    font-size: 14px;
                    margin-bottom: 6px;
                    font-weight: 500;
                }
                .admin-login-card input {
                    width: 100%;
                    padding: 11px 14px;
                    border: 1px solid #d4d4d4;
                    border-radius: 8px;
                    font-size: 15px;
                    margin-bottom: 16px;
                    box-sizing: border-box;
                    transition: border-color 0.2s ease, box-shadow 0.2s ease;
                }
                .admin-login-card input:focus {
                    outline: none;
                    border-color: #0056b3;
                    box-shadow: 0 0 0 3px rgba(0, 86, 179, 0.15);
                }
                .admin-login-card input.is-invalid {
                    border-color: #c0392b;
                    background: #fff8f8;
                }
                .admin-login-card input.is-invalid:focus {
                    border-color: #c0392b;
                    box-shadow: 0 0 0 3px rgba(192, 57, 43, 0.15);
                }
                .admin-login-card .field-error {
                    color: #c0392b;
                    font-size: 12.5px;
                    margin: -12px 0 14px;
                    font-weight: 500;
                }
                .admin-login-back-row { text-align: center; margin-top: 22px; }
                .admin-login-back-row .back-link {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    color: #ffffff;
                    text-decoration: none;
                    font-size: 15px;
                    font-weight: 600;
                    padding: 10px 24px;
                    background: rgba(255, 255, 255, 0.18);
                    border: 1.5px solid rgba(255, 255, 255, 0.55);
                    border-radius: 999px;
                    transition: background 0.2s ease, border-color 0.2s ease, transform 0.15s ease;
                }
                .admin-login-back-row .back-link:hover {
                    background: rgba(255, 255, 255, 0.3);
                    border-color: #fff;
                    color: #fff;
                    transform: translateY(-1px);
                }
                .admin-login-card .submit-btn {
                    width: 100%;
                    padding: 12px;
                    background: #0056b3;
                    color: #fff;
                    border: none;
                    border-radius: 8px;
                    font-size: 15px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: background 0.2s ease;
                    margin-top: 4px;
                }
                .admin-login-card .submit-btn:hover { background: #003f82; }
                .admin-login-card .submit-btn:disabled { background: #999; cursor: not-allowed; }
                .admin-login-card .error-msg {
                    background: #fff0f0;
                    color: #b00020;
                    border: 1px solid #f3c5c5;
                    padding: 10px 14px;
                    border-radius: 6px;
                    font-size: 13.5px;
                    margin-bottom: 14px;
                }
            `}</style>
            <div>
                <div className="admin-login-card">
                    <div className="logo-row">
                        <img src="/blue-logo.png" alt="İpekçi İnşaat" />
                    </div>
                    <h2>Yönetim Paneli</h2>
                    <div className="subtitle">Devam etmek için giriş yapın</div>
                    {error && <div className="error-msg">{error}</div>}
                    <form onSubmit={onSubmit} noValidate>
                        <label htmlFor="username">Kullanıcı Adı</label>
                        <input
                            id="username"
                            type="text"
                            autoComplete="username"
                            value={username}
                            onChange={handleUsernameChange}
                            className={fieldErrors.username ? 'is-invalid' : ''}
                            autoFocus
                        />
                        {fieldErrors.username && <div className="field-error">{fieldErrors.username}</div>}

                        <label htmlFor="password">Şifre</label>
                        <input
                            id="password"
                            type="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={handlePasswordChange}
                            className={fieldErrors.password ? 'is-invalid' : ''}
                        />
                        {fieldErrors.password && <div className="field-error">{fieldErrors.password}</div>}

                        <button type="submit" className="submit-btn" disabled={busy}>
                            {busy ? 'Giriş yapılıyor...' : 'Giriş Yap'}
                        </button>
                    </form>
                </div>
                <div className="admin-login-back-row">
                    <Link to="/" className="back-link">← Siteye Dön</Link>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
