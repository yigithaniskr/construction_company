import React, { useEffect } from 'react';

const ConfirmModal = ({
    title = 'Onay gerekli',
    message,
    confirmText = 'Onayla',
    cancelText = 'Vazgeç',
    danger = false,
    onConfirm,
    onCancel,
}) => {
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape') onCancel?.();
            if (e.key === 'Enter') onConfirm?.();
        };
        window.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
        };
    }, [onConfirm, onCancel]);

    return (
        <div className="confirm-modal-backdrop" onClick={onCancel} role="dialog" aria-modal="true">
            <style>{`
                .confirm-modal-backdrop {
                    position: fixed;
                    inset: 0;
                    background: rgba(15, 30, 60, 0.55);
                    backdrop-filter: blur(2px);
                    z-index: 10000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 20px;
                    animation: cm-fade 0.18s ease-out;
                }
                .confirm-modal-card {
                    background: #fff;
                    border-radius: 12px;
                    width: 100%;
                    max-width: 460px;
                    padding: 28px 28px 22px;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                    animation: cm-pop 0.2s ease-out;
                }
                @keyframes cm-fade { from { opacity: 0; } to { opacity: 1; } }
                @keyframes cm-pop {
                    from { transform: translateY(10px) scale(0.97); opacity: 0; }
                    to   { transform: translateY(0) scale(1); opacity: 1; }
                }
                .confirm-modal-card .icon-row {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                    margin-bottom: 14px;
                }
                .confirm-modal-card .icon-circle {
                    width: 44px;
                    height: 44px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    font-size: 22px;
                    font-weight: 700;
                }
                .confirm-modal-card.is-danger .icon-circle { background: #fdecec; color: #c0392b; }
                .confirm-modal-card.is-info   .icon-circle { background: #e7f0fb; color: #0056b3; }
                .confirm-modal-card h3 {
                    margin: 0;
                    font-size: 18px;
                    font-weight: 700;
                    color: #0f1e3c;
                    line-height: 1.3;
                }
                .confirm-modal-card .message {
                    color: #4a5566;
                    font-size: 14.5px;
                    line-height: 1.55;
                    margin: 0 0 22px;
                    white-space: pre-line;
                }
                .confirm-modal-card .buttons {
                    display: flex;
                    justify-content: flex-end;
                    gap: 10px;
                }
                .confirm-modal-card button {
                    padding: 10px 20px;
                    border-radius: 7px;
                    font-size: 14px;
                    font-weight: 600;
                    cursor: pointer;
                    border: 1px solid transparent;
                    transition: background 0.18s ease, transform 0.12s ease;
                }
                .confirm-modal-card .btn-cancel {
                    background: #fff;
                    color: #555;
                    border-color: #d6d9de;
                }
                .confirm-modal-card .btn-cancel:hover { background: #f4f6fa; color: #222; }
                .confirm-modal-card .btn-confirm {
                    background: #0056b3;
                    color: #fff;
                }
                .confirm-modal-card .btn-confirm:hover { background: #003f82; }
                .confirm-modal-card.is-danger .btn-confirm { background: #c0392b; }
                .confirm-modal-card.is-danger .btn-confirm:hover { background: #962f22; }
                @media (max-width: 600px) {
                    .confirm-modal-card { padding: 22px 20px 18px; }
                    .confirm-modal-card .buttons { flex-direction: column-reverse; }
                    .confirm-modal-card .buttons button { width: 100%; }
                }
            `}</style>
            <div
                className={`confirm-modal-card ${danger ? 'is-danger' : 'is-info'}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="icon-row">
                    <div className="icon-circle">{danger ? '!' : '?'}</div>
                    <h3>{title}</h3>
                </div>
                <p className="message">{message}</p>
                <div className="buttons">
                    <button type="button" className="btn-cancel" onClick={onCancel}>{cancelText}</button>
                    <button type="button" className="btn-confirm" onClick={onConfirm} autoFocus>{confirmText}</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
