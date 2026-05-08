import { useEffect, useState } from 'react';
import { watchAuth } from '../../firebase/auth';

export const useAuth = () => {
    const [user, setUser] = useState(undefined);

    useEffect(() => {
        const unsub = watchAuth((u) => setUser(u));
        return () => unsub && unsub();
    }, []);

    return { user, loading: user === undefined };
};
