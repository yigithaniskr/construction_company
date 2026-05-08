import React, { useCallback, useState } from 'react';
import ConfirmModal from './ConfirmModal';

export const useConfirm = () => {
    const [state, setState] = useState(null);

    const confirm = useCallback((options = {}) => {
        return new Promise((resolve) => {
            setState({ ...options, resolve });
        });
    }, []);

    const handleConfirm = () => {
        state?.resolve?.(true);
        setState(null);
    };
    const handleCancel = () => {
        state?.resolve?.(false);
        setState(null);
    };

    const dialog = state ? (
        <ConfirmModal
            title={state.title}
            message={state.message}
            confirmText={state.confirmText}
            cancelText={state.cancelText}
            danger={state.danger}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
        />
    ) : null;

    return { confirm, dialog };
};
