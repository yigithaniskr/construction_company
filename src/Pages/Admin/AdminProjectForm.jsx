import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    getProject,
    createProject,
    updateProject,
    uploadProjectPhotos,
    slugify,
} from '../../firebase/projects';
import { useConfirm } from '../../Components/ConfirmModal/useConfirm';

const LIMITS = {
    projectTitle: 100,
    slug: 80,
    location: 80,
    addressSummary: 200,
    projectTime: 200,
    metrekare: 30,
    info: 2000,
    maxFiles: 30,
    maxFileSizeMB: 10,
};

const emptyForm = {
    projectTitle: '',
    slug: '',
    addressSummary: '',
    location: '',
    projectTime: '',
    metrekare: '',
    info: '',
    isFinished: false,
};

let tempIdCounter = 0;
const newTempId = () => `tmp-${Date.now()}-${++tempIdCounter}`;

const AdminProjectForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = !!id;

    const [form, setForm] = useState(emptyForm);
    const [photoItems, setPhotoItems] = useState([]);
    const [loading, setLoading] = useState(isEdit);
    const [busy, setBusy] = useState(false);
    const [progress, setProgress] = useState(null);
    const [error, setError] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});
    const [dragOverDropZone, setDragOverDropZone] = useState(false);
    const [dragIndex, setDragIndex] = useState(null);
    const [dragOverIndex, setDragOverIndex] = useState(null);
    const fileInputRef = useRef(null);
    const objectUrlsRef = useRef(new Set());
    const { confirm, dialog } = useConfirm();

    useEffect(() => {
        if (!isEdit) return;
        (async () => {
            try {
                const p = await getProject(id);
                if (!p) {
                    setError('Proje bulunamadı.');
                    return;
                }
                setForm({
                    projectTitle: p.projectTitle || '',
                    slug: p.slug || '',
                    addressSummary: p.addressSummary || '',
                    location: p.location || '',
                    projectTime: p.projectTime || '',
                    metrekare: p.metrekare || '',
                    info: p.info || '',
                    isFinished: !!p.isFinished,
                });
                let urls = p.photoUrls || [];
                if (p.coverPhotoUrl && urls.includes(p.coverPhotoUrl) && urls[0] !== p.coverPhotoUrl) {
                    urls = [p.coverPhotoUrl, ...urls.filter((u) => u !== p.coverPhotoUrl)];
                }
                setPhotoItems(urls.map((url) => ({ id: `url-${url}`, kind: 'existing', url })));
            } catch (err) {
                setError('Proje yüklenemedi: ' + (err?.message || ''));
            } finally {
                setLoading(false);
            }
        })();
    }, [id, isEdit]);

    useEffect(() => {
        return () => {
            objectUrlsRef.current.forEach((u) => URL.revokeObjectURL(u));
            objectUrlsRef.current.clear();
        };
    }, []);

    const handleChange = (field, value) => {
        setForm((f) => ({ ...f, [field]: value }));
        if (fieldErrors[field]) setFieldErrors((p) => ({ ...p, [field]: undefined }));
    };

    const validate = () => {
        const errs = {};
        if (!form.projectTitle.trim()) errs.projectTitle = 'Proje başlığını girin';
        if (!form.location.trim()) errs.location = 'Konum bilgisini girin';
        if (!form.projectTime.trim()) errs.projectTime = 'Proje teslim tarihini girin';
        if (!form.metrekare.trim()) errs.metrekare = 'İnşaat alanını girin';
        if (!form.addressSummary.trim()) errs.addressSummary = 'Tam adresi girin';
        if (photoItems.length === 0) errs.photos = 'En az 1 fotoğraf eklemelisiniz';
        return errs;
    };

    const validateAndAddFiles = (rawFiles) => {
        setError('');
        const files = Array.from(rawFiles || []);
        if (files.length === 0) return;

        const totalAfter = photoItems.length + files.length;
        if (totalAfter > LIMITS.maxFiles) {
            setError(`En fazla ${LIMITS.maxFiles} fotoğraf olabilir. Şu an ${photoItems.length}, ${files.length} daha eklersen ${totalAfter} olacak.`);
            return;
        }
        const tooBig = files.find((f) => f.size > LIMITS.maxFileSizeMB * 1024 * 1024);
        if (tooBig) {
            setError(`"${tooBig.name}" dosyası ${LIMITS.maxFileSizeMB} MB sınırını aşıyor.`);
            return;
        }
        const nonImage = files.find((f) => !f.type.startsWith('image/'));
        if (nonImage) {
            setError(`"${nonImage.name}" bir görsel dosyası değil.`);
            return;
        }

        const newItems = files.map((file) => {
            const previewUrl = URL.createObjectURL(file);
            objectUrlsRef.current.add(previewUrl);
            return { id: newTempId(), kind: 'new', file, previewUrl };
        });
        setPhotoItems((prev) => [...prev, ...newItems]);
    };

    const handleFileSelect = (e) => {
        validateAndAddFiles(e.target.files);
        e.target.value = '';
    };

    const handleDropZoneDrop = (e) => {
        e.preventDefault();
        setDragOverDropZone(false);
        validateAndAddFiles(e.dataTransfer.files);
    };

    const handleDropZoneDragOver = (e) => {
        e.preventDefault();
        setDragOverDropZone(true);
    };

    const handleDropZoneDragLeave = (e) => {
        e.preventDefault();
        setDragOverDropZone(false);
    };

    const onPhotoDragStart = (index) => (e) => {
        setDragIndex(index);
        e.dataTransfer.effectAllowed = 'move';
    };
    const onPhotoDragOver = (index) => (e) => {
        e.preventDefault();
        if (dragIndex === null || dragIndex === index) return;
        setDragOverIndex(index);
    };
    const onPhotoDrop = (index) => (e) => {
        e.preventDefault();
        if (dragIndex === null || dragIndex === index) {
            setDragIndex(null);
            setDragOverIndex(null);
            return;
        }
        setPhotoItems((prev) => {
            const next = [...prev];
            const [moved] = next.splice(dragIndex, 1);
            next.splice(index, 0, moved);
            return next;
        });
        setDragIndex(null);
        setDragOverIndex(null);
    };
    const onPhotoDragEnd = () => {
        setDragIndex(null);
        setDragOverIndex(null);
    };

    const removePhoto = async (item) => {
        if (item.kind === 'new') {
            if (item.previewUrl) {
                URL.revokeObjectURL(item.previewUrl);
                objectUrlsRef.current.delete(item.previewUrl);
            }
            setPhotoItems((prev) => prev.filter((i) => i.id !== item.id));
            return;
        }
        const ok = await confirm({
            title: 'Fotoğrafı kaldır',
            message: 'Bu fotoğraf listeden kaldırılacak. Değişiklik "Kaydet"e basınca uygulanır; "İptal"e basarsan geri gelir.',
            confirmText: 'Kaldır',
            cancelText: 'Vazgeç',
            danger: true,
        });
        if (!ok) return;
        setPhotoItems((prev) => prev.filter((i) => i.id !== item.id));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate();
        setFieldErrors(errs);
        if (Object.keys(errs).length > 0) {
            setError('');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        setBusy(true);
        setError('');
        setProgress(null);
        try {
            const newItems = photoItems.filter((i) => i.kind === 'new');
            let uploadedUrls = [];
            if (newItems.length > 0) {
                setProgress({ done: 0, total: newItems.length });
                uploadedUrls = await uploadProjectPhotos(
                    newItems.map((i) => i.file),
                    (done, total) => setProgress({ done, total })
                );
            }

            let newIdx = 0;
            const finalUrls = photoItems.map((i) =>
                i.kind === 'existing' ? i.url : uploadedUrls[newIdx++]
            );

            if (isEdit) {
                await updateProject(id, {
                    projectTitle: form.projectTitle,
                    slug: form.slug || form.projectTitle,
                    addressSummary: form.addressSummary,
                    location: form.location,
                    projectTime: form.projectTime,
                    metrekare: form.metrekare,
                    info: form.info,
                    isFinished: form.isFinished,
                    photoUrls: finalUrls,
                    coverPhotoUrl: finalUrls[0] || '',
                });
            } else {
                await createProject({
                    ...form,
                    slug: form.slug || form.projectTitle,
                    photoUrls: finalUrls,
                    coverPhotoUrl: finalUrls[0] || '',
                }, []);
            }
            navigate('/yonetim-paneli');
        } catch (err) {
            setError('Kaydetme başarısız: ' + (err?.message || ''));
        } finally {
            setBusy(false);
            setProgress(null);
        }
    };

    if (loading) return <div style={{ padding: 40, textAlign: 'center' }}>Yükleniyor...</div>;

    const charCount = (field) => `${(form[field] || '').length}/${LIMITS[field]}`;
    const newCount = photoItems.filter((i) => i.kind === 'new').length;

    return (
        <div className="admin-form">
            {dialog}
            <style>{`
                .admin-form .page-header { display: flex; align-items: center; gap: 16px; margin-bottom: 22px; }
                .admin-form .back-btn {
                    background: #fff;
                    border: 1px solid #d4d4d4;
                    padding: 8px 14px;
                    border-radius: 6px;
                    cursor: pointer;
                    color: #555;
                    text-decoration: none;
                    font-size: 14px;
                }
                .admin-form .back-btn:hover { background: #f4f6fa; color: #0056b3; border-color: #0056b3; }
                .admin-form h1 { margin: 0; font-size: 24px; color: #0f1e3c; font-weight: 700; }
                .admin-form .card {
                    background: #fff;
                    padding: 28px;
                    border-radius: 10px;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
                    margin-bottom: 18px;
                }
                .admin-form .card h3 { margin: 0 0 18px; font-size: 16px; color: #0f1e3c; font-weight: 700; }
                .admin-form .row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
                .admin-form .field { margin-bottom: 16px; }
                .admin-form label { display: block; font-size: 13.5px; font-weight: 600; color: #444; margin-bottom: 6px; }
                .admin-form input[type="text"], .admin-form textarea {
                    width: 100%;
                    padding: 10px 12px;
                    border: 1px solid #d4d4d4;
                    border-radius: 6px;
                    font-size: 14.5px;
                    box-sizing: border-box;
                    font-family: inherit;
                }
                .admin-form input[type="text"]:focus, .admin-form textarea:focus {
                    outline: none;
                    border-color: #0056b3;
                    box-shadow: 0 0 0 3px rgba(0, 86, 179, 0.12);
                }
                .admin-form textarea { resize: vertical; min-height: 120px; }
                .admin-form .field .label-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: baseline;
                    gap: 8px;
                }
                .admin-form .field .char-count {
                    font-size: 12px;
                    color: #999;
                    font-weight: 400;
                }
                .admin-form .field .char-count.warn { color: #b67a1f; font-weight: 500; }
                .admin-form input.is-invalid, .admin-form textarea.is-invalid {
                    border-color: #c0392b;
                    background: #fff8f8;
                }
                .admin-form input.is-invalid:focus, .admin-form textarea.is-invalid:focus {
                    border-color: #c0392b;
                    box-shadow: 0 0 0 3px rgba(192, 57, 43, 0.15);
                }
                .admin-form .field-error {
                    color: #c0392b;
                    font-size: 12.5px;
                    font-weight: 500;
                    margin-top: 5px;
                }
                .admin-form .photos-error {
                    background: #fff0f0;
                    color: #b00020;
                    border: 1px solid #f3c5c5;
                    padding: 10px 14px;
                    border-radius: 6px;
                    font-size: 13.5px;
                    font-weight: 500;
                    margin-bottom: 12px;
                }
                .admin-form .checkbox-row { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
                .admin-form .checkbox-row input { width: 18px; height: 18px; }
                .admin-form .checkbox-row label { margin: 0; }

                .admin-form .photo-hint {
                    background: #eef4fb;
                    color: #0056b3;
                    border: 1px solid #c8dcf2;
                    border-radius: 6px;
                    padding: 10px 14px;
                    font-size: 13.5px;
                    margin-bottom: 12px;
                    line-height: 1.5;
                }
                .admin-form .photo-hint strong { font-weight: 600; }

                .admin-form .photo-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
                    gap: 12px;
                }
                .admin-form .photo-card {
                    position: relative;
                    border: 2px solid transparent;
                    border-radius: 6px;
                    overflow: hidden;
                    background: #eef0f4;
                    aspect-ratio: 4 / 3;
                    transition: border-color 0.2s ease, transform 0.15s ease, opacity 0.15s ease;
                    cursor: grab;
                }
                .admin-form .photo-card:active { cursor: grabbing; }
                .admin-form .photo-card.is-cover { border-color: #0056b3; }
                .admin-form .photo-card.is-new { border-color: #1b8c46; }
                .admin-form .photo-card.is-cover.is-new { border-color: #0056b3; }
                .admin-form .photo-card.is-dragging { opacity: 0.4; }
                .admin-form .photo-card.is-drop-target { transform: scale(1.04); box-shadow: 0 0 0 2px #1c7ed6; }
                .admin-form .photo-card img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    display: block;
                    pointer-events: none;
                }
                .admin-form .photo-card .badge {
                    position: absolute;
                    top: 6px;
                    color: #fff;
                    font-size: 11px;
                    padding: 3px 8px;
                    border-radius: 4px;
                    font-weight: 600;
                    pointer-events: none;
                }
                .admin-form .photo-card .cover-badge { left: 6px; background: #0056b3; }
                .admin-form .photo-card .new-badge { right: 38px; background: #1b8c46; }
                .admin-form .photo-card .order-badge {
                    position: absolute;
                    bottom: 6px;
                    left: 6px;
                    background: rgba(15, 30, 60, 0.85);
                    color: #fff;
                    font-size: 11px;
                    padding: 3px 8px;
                    border-radius: 4px;
                    font-weight: 600;
                    pointer-events: none;
                }
                .admin-form .photo-card .delete-x {
                    position: absolute;
                    top: 6px;
                    right: 6px;
                    background: rgba(0,0,0,0.7);
                    color: #fff;
                    border: none;
                    width: 26px;
                    height: 26px;
                    border-radius: 50%;
                    cursor: pointer;
                    font-size: 16px;
                    line-height: 1;
                }
                .admin-form .photo-card .delete-x:hover { background: #b00020; }

                .admin-form .drop-zone {
                    margin-top: 16px;
                    border: 2px dashed #c5d2e0;
                    border-radius: 10px;
                    padding: 28px 18px;
                    text-align: center;
                    background: #fafbfd;
                    color: #5a6478;
                    cursor: pointer;
                    transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
                }
                .admin-form .drop-zone:hover { background: #f0f6ff; border-color: #0056b3; color: #0056b3; }
                .admin-form .drop-zone.is-dragover { background: #e7f0fb; border-color: #0056b3; color: #0056b3; }
                .admin-form .drop-zone .dz-icon {
                    font-size: 32px;
                    line-height: 1;
                    margin-bottom: 8px;
                    opacity: 0.65;
                }
                .admin-form .drop-zone .dz-title { font-weight: 600; font-size: 15px; margin-bottom: 4px; color: #0f1e3c; }
                .admin-form .drop-zone .dz-subtitle { font-size: 12.5px; color: #888; }
                .admin-form .drop-zone input[type="file"] { display: none; }

                .admin-form .pending-info {
                    background: #f0fdf4;
                    border: 1px solid #c6e9d2;
                    color: #1b8c46;
                    padding: 10px 14px;
                    border-radius: 6px;
                    font-size: 13.5px;
                    margin-top: 10px;
                }

                .admin-form .actions-row {
                    display: flex;
                    justify-content: flex-end;
                    gap: 10px;
                    margin-top: 6px;
                }
                .admin-form .save-btn {
                    background: #0056b3;
                    color: #fff;
                    border: none;
                    padding: 12px 28px;
                    font-size: 15px;
                    font-weight: 600;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: background 0.2s ease;
                }
                .admin-form .save-btn:hover { background: #003f82; }
                .admin-form .save-btn:disabled { background: #999; cursor: not-allowed; }
                .admin-form .cancel-btn {
                    background: #fff;
                    border: 1px solid #d4d4d4;
                    padding: 12px 22px;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 15px;
                }
                .admin-form .cancel-btn:hover { background: #f4f6fa; }
                .admin-form .error-box, .admin-form .info-box {
                    padding: 12px 16px; border-radius: 6px; margin-bottom: 14px; font-size: 14px;
                }
                .admin-form .error-box { background: #fff0f0; color: #b00020; border: 1px solid #f3c5c5; }
                .admin-form .info-box { background: #eef4fb; color: #0056b3; border: 1px solid #c8dcf2; }
                @media (max-width: 600px) {
                    .admin-form .row { grid-template-columns: 1fr; }
                    .admin-form .card { padding: 18px; }
                }
            `}</style>

            <div className="page-header">
                <button type="button" className="back-btn" onClick={() => navigate('/yonetim-paneli')}>← Geri</button>
                <h1>{isEdit ? 'Projeyi Düzenle' : 'Yeni Proje'}</h1>
            </div>

            {error && <div className="error-box">{error}</div>}
            {progress && <div className="info-box">Fotoğraflar yükleniyor: {progress.done}/{progress.total}</div>}

            <form onSubmit={handleSubmit} noValidate>
                <div className="card">
                    <h3>Proje Bilgileri</h3>
                    <div className="field">
                        <div className="label-row">
                            <label>Proje Başlığı *</label>
                            <span className={`char-count ${form.projectTitle.length > LIMITS.projectTitle * 0.85 ? 'warn' : ''}`}>{charCount('projectTitle')}</span>
                        </div>
                        <input
                            type="text"
                            maxLength={LIMITS.projectTitle}
                            value={form.projectTitle}
                            onChange={(e) => handleChange('projectTitle', e.target.value)}
                            placeholder="Bakırköy İnşaat Projesi"
                            className={fieldErrors.projectTitle ? 'is-invalid' : ''}
                        />
                        {fieldErrors.projectTitle && <div className="field-error">{fieldErrors.projectTitle}</div>}
                    </div>
                    <div className="field">
                        <div className="label-row">
                            <label>URL Adresi (slug)</label>
                            <span className={`char-count ${form.slug.length > LIMITS.slug * 0.85 ? 'warn' : ''}`}>{charCount('slug')}</span>
                        </div>
                        <input
                            type="text"
                            maxLength={LIMITS.slug}
                            value={form.slug}
                            onChange={(e) => handleChange('slug', e.target.value)}
                            placeholder={slugify(form.projectTitle) || 'bakirkoy-insaat-projesi'}
                        />
                        <div style={{ fontSize: 12.5, color: '#888', marginTop: 4 }}>
                            Boş bırakırsan başlıktan otomatik oluşturulur. Örn: <code style={{ background: '#eef0f4', padding: '2px 6px', borderRadius: 3 }}>ipekciinsaat.com/proje/{form.slug || slugify(form.projectTitle) || 'proje-adi'}</code>
                        </div>
                    </div>
                    <div className="row">
                        <div className="field">
                            <div className="label-row">
                                <label>Konum (kısa) *</label>
                                <span className={`char-count ${form.location.length > LIMITS.location * 0.85 ? 'warn' : ''}`}>{charCount('location')}</span>
                            </div>
                            <input
                                type="text"
                                maxLength={LIMITS.location}
                                value={form.location}
                                onChange={(e) => handleChange('location', e.target.value)}
                                placeholder="Bakırköy, İstanbul"
                                className={fieldErrors.location ? 'is-invalid' : ''}
                            />
                            {fieldErrors.location && <div className="field-error">{fieldErrors.location}</div>}
                        </div>
                        <div className="field">
                            <div className="label-row">
                                <label>Proje Teslim Tarihi *</label>
                                <span className={`char-count ${form.projectTime.length > LIMITS.projectTime * 0.85 ? 'warn' : ''}`}>{charCount('projectTime')}</span>
                            </div>
                            <input
                                type="text"
                                maxLength={LIMITS.projectTime}
                                value={form.projectTime}
                                onChange={(e) => handleChange('projectTime', e.target.value)}
                                placeholder="2024"
                                className={fieldErrors.projectTime ? 'is-invalid' : ''}
                            />
                            {fieldErrors.projectTime && <div className="field-error">{fieldErrors.projectTime}</div>}
                        </div>
                    </div>
                    <div className="row">
                        <div className="field">
                            <div className="label-row">
                                <label>Toplam İnşaat Alanı (m²) *</label>
                                <span className={`char-count ${form.metrekare.length > LIMITS.metrekare * 0.85 ? 'warn' : ''}`}>{charCount('metrekare')}</span>
                            </div>
                            <input
                                type="text"
                                maxLength={LIMITS.metrekare}
                                value={form.metrekare}
                                onChange={(e) => handleChange('metrekare', e.target.value)}
                                placeholder="1500 m²"
                                className={fieldErrors.metrekare ? 'is-invalid' : ''}
                            />
                            {fieldErrors.metrekare && <div className="field-error">{fieldErrors.metrekare}</div>}
                        </div>
                        <div className="field">
                            <div className="label-row">
                                <label>Tam Adres *</label>
                                <span className={`char-count ${form.addressSummary.length > LIMITS.addressSummary * 0.85 ? 'warn' : ''}`}>{charCount('addressSummary')}</span>
                            </div>
                            <input
                                type="text"
                                maxLength={LIMITS.addressSummary}
                                value={form.addressSummary}
                                onChange={(e) => handleChange('addressSummary', e.target.value)}
                                placeholder="Mah. Sok. No / İlçe / İl"
                                className={fieldErrors.addressSummary ? 'is-invalid' : ''}
                            />
                            {fieldErrors.addressSummary && <div className="field-error">{fieldErrors.addressSummary}</div>}
                        </div>
                    </div>
                    <div className="field">
                        <div className="label-row">
                            <label>Açıklama</label>
                            <span className={`char-count ${form.info.length > LIMITS.info * 0.85 ? 'warn' : ''}`}>{charCount('info')}</span>
                        </div>
                        <textarea
                            maxLength={LIMITS.info}
                            value={form.info}
                            onChange={(e) => handleChange('info', e.target.value)}
                            placeholder="Projenin detayları, daire/dükkan sayısı vs."
                        />
                    </div>
                    <div className="checkbox-row">
                        <input
                            id="isFinished"
                            type="checkbox"
                            checked={form.isFinished}
                            onChange={(e) => handleChange('isFinished', e.target.checked)}
                        />
                        <label htmlFor="isFinished">Bu proje tamamlandı (işaretlenmezse "Devam Eden Projeler" listesinde görünür)</label>
                    </div>
                </div>

                <div className="card">
                    <h3>Fotoğraflar ({photoItems.length}) *</h3>

                    {fieldErrors.photos && <div className="photos-error">{fieldErrors.photos}</div>}

                    <div className="photo-hint">
                        <strong>İlk fotoğraf otomatik olarak kapak fotoğrafı olur.</strong> Sıralamayı değiştirmek için fotoğrafları sürükleyip istediğin yere bırakabilirsin. Yeni eklediğin fotoğraflar yeşil çerçeveli görünür ve kaydet'e basınca yüklenir.
                    </div>

                    {photoItems.length > 0 && (
                        <div className="photo-grid">
                            {photoItems.map((item, idx) => {
                                const src = item.kind === 'existing' ? item.url : item.previewUrl;
                                const isCover = idx === 0;
                                return (
                                    <div
                                        key={item.id}
                                        className={[
                                            'photo-card',
                                            isCover ? 'is-cover' : '',
                                            item.kind === 'new' ? 'is-new' : '',
                                            dragIndex === idx ? 'is-dragging' : '',
                                            dragOverIndex === idx && dragIndex !== idx ? 'is-drop-target' : '',
                                        ].filter(Boolean).join(' ')}
                                        draggable
                                        onDragStart={onPhotoDragStart(idx)}
                                        onDragOver={onPhotoDragOver(idx)}
                                        onDrop={onPhotoDrop(idx)}
                                        onDragEnd={onPhotoDragEnd}
                                    >
                                        <img src={src} alt="" />
                                        {isCover && <div className="badge cover-badge">Kapak</div>}
                                        {item.kind === 'new' && <div className="badge new-badge">Yeni</div>}
                                        <div className="order-badge">{idx + 1}</div>
                                        <button
                                            type="button"
                                            className="delete-x"
                                            onClick={(e) => { e.stopPropagation(); removePhoto(item); }}
                                            title={item.kind === 'new' ? 'Bu yeni fotoğrafı kaldır' : 'Fotoğrafı sil'}
                                        >×</button>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    <div
                        className={`drop-zone ${dragOverDropZone ? 'is-dragover' : ''}`}
                        onClick={() => fileInputRef.current?.click()}
                        onDragOver={handleDropZoneDragOver}
                        onDragLeave={handleDropZoneDragLeave}
                        onDrop={handleDropZoneDrop}
                    >
                        <input
                            ref={fileInputRef}
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleFileSelect}
                        />
                        <div className="dz-icon">+</div>
                        <div className="dz-title">
                            {dragOverDropZone
                                ? 'Bırak, ekleyelim'
                                : 'Fotoğrafları buraya sürükle veya tıklayıp seç'}
                        </div>
                        <div className="dz-subtitle">
                            Birden fazla seçebilirsin · En fazla {LIMITS.maxFiles} dosya · Dosya başına en fazla {LIMITS.maxFileSizeMB} MB
                        </div>
                    </div>

                    {newCount > 0 && (
                        <div className="pending-info">
                            <strong>{newCount}</strong> yeni fotoğraf yüklenmek üzere bekliyor. "Kaydet"e basınca yüklenecek.
                        </div>
                    )}
                </div>

                <div className="actions-row">
                    <button type="button" className="cancel-btn" onClick={() => navigate('/yonetim-paneli')}>İptal</button>
                    <button type="submit" className="save-btn" disabled={busy}>
                        {busy ? 'Kaydediliyor...' : (isEdit ? 'Değişiklikleri Kaydet' : 'Projeyi Oluştur')}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminProjectForm;
