import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { listProjects, deleteProject, updateProject } from '../../firebase/projects';
import { useConfirm } from '../../Components/ConfirmModal/useConfirm';

const isShownOnHome = (p) => p.showOnHomepage !== false;

const AdminProjectsList = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [deletingId, setDeletingId] = useState(null);
    const [togglingId, setTogglingId] = useState(null);
    const { confirm, dialog } = useConfirm();

    const load = async () => {
        setLoading(true);
        setError('');
        try {
            const data = await listProjects();
            setProjects(data);
        } catch (err) {
            setError('Projeler yüklenemedi: ' + (err?.message || ''));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { load(); }, []);

    const stats = useMemo(() => {
        const total = projects.length;
        const finished = projects.filter((p) => p.isFinished).length;
        const ongoing = total - finished;
        const onHome = projects.filter(isShownOnHome).length;
        return { total, finished, ongoing, onHome };
    }, [projects]);

    const handleToggleHomepage = async (project) => {
        const currentlyOn = isShownOnHome(project);
        const newValue = !currentlyOn;
        setTogglingId(project.id);
        setProjects((prev) => prev.map((p) => p.id === project.id ? { ...p, showOnHomepage: newValue } : p));
        try {
            await updateProject(project.id, { showOnHomepage: newValue });
        } catch (err) {
            setError('Anasayfa görünürlüğü güncellenemedi: ' + (err?.message || ''));
            setProjects((prev) => prev.map((p) => p.id === project.id ? { ...p, showOnHomepage: currentlyOn } : p));
        } finally {
            setTogglingId(null);
        }
    };

    const handleDelete = async (id, title) => {
        const ok = await confirm({
            title: 'Projeyi sil',
            message: `"${title}" projesi kalıcı olarak silinecek. Bu işlem geri alınamaz.`,
            confirmText: 'Sil',
            cancelText: 'Vazgeç',
            danger: true,
        });
        if (!ok) return;
        setDeletingId(id);
        try {
            await deleteProject(id);
            setProjects((prev) => prev.filter((p) => p.id !== id));
        } catch (err) {
            setError('Silme başarısız: ' + (err?.message || ''));
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div className="admin-projects">
            {dialog}
            <style>{`
                .admin-projects .page-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 20px;
                    flex-wrap: wrap;
                    gap: 12px;
                }
                .admin-projects h1 {
                    margin: 0;
                    font-size: 26px;
                    color: #0f1e3c;
                    font-weight: 700;
                    display: flex;
                    align-items: baseline;
                    gap: 10px;
                }
                .admin-projects h1 .count {
                    color: #0056b3;
                    font-size: 16px;
                    font-weight: 600;
                    background: #e7f0fb;
                    padding: 4px 12px;
                    border-radius: 999px;
                }
                .admin-projects .new-btn {
                    background: #0056b3;
                    color: #fff;
                    padding: 10px 20px;
                    text-decoration: none;
                    border-radius: 6px;
                    font-weight: 600;
                    font-size: 14px;
                    transition: background 0.2s ease, transform 0.15s ease;
                    box-shadow: 0 1px 3px rgba(0, 86, 179, 0.25);
                }
                .admin-projects .new-btn:hover {
                    background: #003f82;
                    color: #fff;
                    transform: translateY(-1px);
                }

                .admin-projects .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
                    gap: 14px;
                    margin-bottom: 22px;
                }
                .admin-projects .stat-card {
                    background: #fff;
                    border-radius: 10px;
                    padding: 18px 20px;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
                    border-left: 3px solid #0056b3;
                }
                .admin-projects .stat-card.finished { border-left-color: #1b8c46; }
                .admin-projects .stat-card.ongoing  { border-left-color: #b67a1f; }
                .admin-projects .stat-card.photos   { border-left-color: #6c757d; }
                .admin-projects .stat-card .label {
                    font-size: 11.5px;
                    line-height: 1.3;
                    color: #677288;
                    text-transform: uppercase;
                    letter-spacing: 0.3px;
                    font-weight: 600;
                    margin-bottom: 6px;
                    word-break: break-word;
                    hyphens: auto;
                }
                .admin-projects .stat-card .value {
                    font-size: 28px;
                    color: #0f1e3c;
                    font-weight: 700;
                    line-height: 1.1;
                }

                .admin-projects .card {
                    background: #fff;
                    border-radius: 10px;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
                    overflow: hidden;
                }
                .admin-projects table {
                    width: 100%;
                    border-collapse: collapse;
                    table-layout: auto;
                }
                .admin-projects th, .admin-projects td {
                    text-align: left;
                    padding: 14px 16px;
                    border-bottom: 1px solid #eef0f4;
                    font-size: 14px;
                    vertical-align: middle;
                }
                .admin-projects th {
                    background: #fafbfd;
                    color: #677288;
                    font-weight: 600;
                    font-size: 11.5px;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }
                .admin-projects tbody tr { transition: background 0.15s ease; }
                .admin-projects tbody tr:hover { background: #fafbfd; }
                .admin-projects tr:last-child td { border-bottom: none; }
                .admin-projects td .cover-thumb {
                    width: 64px;
                    height: 44px;
                    object-fit: cover;
                    border-radius: 4px;
                    background: #ddd;
                    display: block;
                }
                .admin-projects td .no-cover {
                    width: 64px; height: 44px;
                    background: #eef0f4;
                    color: #aaa;
                    font-size: 11px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 4px;
                }
                .admin-projects .status-pill {
                    padding: 4px 10px;
                    border-radius: 999px;
                    font-size: 12px;
                    font-weight: 600;
                    display: inline-block;
                }
                .admin-projects .status-finished { background: #e6f5ec; color: #1b8c46; }
                .admin-projects .status-ongoing { background: #fff5e6; color: #b67a1f; }

                .admin-projects .toggle {
                    appearance: none;
                    -webkit-appearance: none;
                    width: 42px;
                    height: 24px;
                    background: #c8ccd4;
                    border: none;
                    border-radius: 999px;
                    position: relative;
                    cursor: pointer;
                    transition: background 0.2s ease;
                    padding: 0;
                    flex-shrink: 0;
                }
                .admin-projects .toggle::after {
                    content: '';
                    position: absolute;
                    top: 3px;
                    left: 3px;
                    width: 18px;
                    height: 18px;
                    background: #fff;
                    border-radius: 50%;
                    transition: left 0.2s ease, background 0.2s ease;
                    box-shadow: 0 1px 2px rgba(0,0,0,0.2);
                }
                .admin-projects .toggle.on { background: #1b8c46; }
                .admin-projects .toggle.on::after { left: 21px; }
                .admin-projects .toggle:disabled { opacity: 0.6; cursor: wait; }
                .admin-projects .toggle:focus-visible { outline: 2px solid #0056b3; outline-offset: 2px; }
                .admin-projects th.col-actions, .admin-projects td.col-actions { text-align: right; white-space: nowrap; }
                .admin-projects .actions-cell {
                    display: inline-flex;
                    gap: 8px;
                    justify-content: flex-end;
                }
                .admin-projects .btn-edit, .admin-projects .btn-delete {
                    padding: 6px 14px;
                    border-radius: 5px;
                    font-size: 13px;
                    border: 1px solid;
                    background: #fff;
                    cursor: pointer;
                    text-decoration: none;
                    font-weight: 500;
                    transition: background 0.18s ease, color 0.18s ease;
                }
                .admin-projects .btn-edit { color: #0056b3; border-color: #c5d8ee; }
                .admin-projects .btn-edit:hover { background: #0056b3; color: #fff; border-color: #0056b3; }
                .admin-projects .btn-delete { color: #b00020; border-color: #e8c4c8; }
                .admin-projects .btn-delete:hover { background: #b00020; color: #fff; border-color: #b00020; }
                .admin-projects .btn-delete:disabled { opacity: 0.5; cursor: not-allowed; }
                .admin-projects .empty-state {
                    text-align: center;
                    padding: 60px 20px;
                    color: #777;
                }
                .admin-projects .empty-state h3 { color: #555; margin: 0 0 6px; }
                .admin-projects .error-box {
                    background: #fff0f0;
                    color: #b00020;
                    border: 1px solid #f3c5c5;
                    padding: 12px 16px;
                    border-radius: 6px;
                    margin-bottom: 16px;
                }
                @media (max-width: 768px) {
                    .admin-projects table thead { display: none; }
                    .admin-projects table tr { display: block; padding: 14px; border-bottom: 1px solid #eef0f4; }
                    .admin-projects table td { display: flex; justify-content: space-between; padding: 6px 0; border: none; text-align: right; }
                    .admin-projects table td::before {
                        content: attr(data-label);
                        font-weight: 600;
                        color: #888;
                        font-size: 12px;
                        text-transform: uppercase;
                        text-align: left;
                    }
                    .admin-projects td.col-actions {
                        flex-direction: column;
                        align-items: stretch;
                        text-align: left;
                        padding-top: 12px;
                        margin-top: 6px;
                        border-top: 1px solid #eef0f4;
                    }
                    .admin-projects td.col-actions::before { margin-bottom: 8px; }
                    .admin-projects td.col-actions .actions-cell {
                        display: flex;
                        gap: 8px;
                        width: 100%;
                    }
                    .admin-projects td.col-actions .btn-edit,
                    .admin-projects td.col-actions .btn-delete {
                        flex: 1;
                        text-align: center;
                        padding: 10px 12px;
                    }
                }
            `}</style>

            <div className="page-header">
                <h1>Projeler</h1>
                <Link to="/yonetim-paneli/proje/yeni" className="new-btn">+ Yeni Proje</Link>
            </div>

            {!loading && projects.length > 0 && (
                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="label">Toplam Proje</div>
                        <div className="value">{stats.total}</div>
                    </div>
                    <div className="stat-card finished">
                        <div className="label">Tamamlanan</div>
                        <div className="value">{stats.finished}</div>
                    </div>
                    <div className="stat-card ongoing">
                        <div className="label">Devam Eden</div>
                        <div className="value">{stats.ongoing}</div>
                    </div>
                    <div className="stat-card" style={{ borderLeftColor: '#1b8c46' }}>
                        <div className="label">Anasayfada Gösterilsin mi?</div>
                        <div className="value">{stats.onHome}</div>
                    </div>
                </div>
            )}

            {error && <div className="error-box">{error}</div>}

            <div className="card">
                {loading ? (
                    <div className="empty-state">Yükleniyor...</div>
                ) : projects.length === 0 ? (
                    <div className="empty-state">
                        <h3>Henüz proje eklenmemiş</h3>
                        <p>Sağ üstteki "Yeni Proje" butonuna tıklayarak ilk projenizi ekleyebilirsiniz.</p>
                    </div>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Kapak</th>
                                <th>Başlık</th>
                                <th>Konum</th>
                                <th>Durum</th>
                                <th>Foto</th>
                                <th>Anasayfa</th>
                                <th className="col-actions">İşlemler</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map((p) => (
                                <tr key={p.id}>
                                    <td data-label="Kapak">
                                        {p.coverPhotoUrl ? (
                                            <img src={p.coverPhotoUrl} alt="" className="cover-thumb" />
                                        ) : (
                                            <div className="no-cover">Yok</div>
                                        )}
                                    </td>
                                    <td data-label="Başlık" style={{ fontWeight: 600, color: '#0f1e3c' }}>{p.projectTitle || '-'}</td>
                                    <td data-label="Konum" style={{ color: '#5a6478' }}>{p.location || '-'}</td>
                                    <td data-label="Durum">
                                        <span className={`status-pill ${p.isFinished ? 'status-finished' : 'status-ongoing'}`}>
                                            {p.isFinished ? 'Tamamlandı' : 'Devam Ediyor'}
                                        </span>
                                    </td>
                                    <td data-label="Foto" style={{ color: '#5a6478' }}>{p.photoUrls?.length || 0}</td>
                                    <td data-label="Anasayfa">
                                        <button
                                            type="button"
                                            className={`toggle ${isShownOnHome(p) ? 'on' : ''}`}
                                            onClick={() => handleToggleHomepage(p)}
                                            disabled={togglingId === p.id}
                                            aria-label={isShownOnHome(p) ? 'Anasayfada gösteriliyor — kapat' : 'Anasayfada gizli — aç'}
                                            title={isShownOnHome(p) ? 'Anasayfada gösteriliyor (kapatmak için tıkla)' : 'Anasayfada gizli (göstermek için tıkla)'}
                                        />
                                    </td>
                                    <td data-label="İşlemler" className="col-actions">
                                        <div className="actions-cell">
                                            <Link to={`/yonetim-paneli/proje/${p.id}`} className="btn-edit">Düzenle</Link>
                                            <button
                                                className="btn-delete"
                                                onClick={() => handleDelete(p.id, p.projectTitle)}
                                                disabled={deletingId === p.id}
                                            >
                                                {deletingId === p.id ? 'Siliniyor...' : 'Sil'}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default AdminProjectsList;
