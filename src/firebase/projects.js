import {
    collection,
    doc,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    serverTimestamp,
} from 'firebase/firestore';
import { db } from './config';

const COLLECTION = 'projects';

const CLOUDINARY_CLOUD_NAME = 'dkbhyorpm';
const CLOUDINARY_UPLOAD_PRESET = 'ipekci_unsigned';
const CLOUDINARY_FOLDER = 'ipekci-projects';

const projectsCol = () => collection(db, COLLECTION);

const TURKISH_MAP = {
    'ç': 'c', 'Ç': 'c',
    'ğ': 'g', 'Ğ': 'g',
    'ı': 'i', 'İ': 'i',
    'ö': 'o', 'Ö': 'o',
    'ş': 's', 'Ş': 's',
    'ü': 'u', 'Ü': 'u',
};

export const slugify = (text) => {
    if (!text) return '';
    let s = String(text);
    for (const [k, v] of Object.entries(TURKISH_MAP)) s = s.split(k).join(v);
    return s
        .toLowerCase()
        .normalize('NFKD')
        .replace(/[̀-ͯ]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
};

const ensureUniqueSlug = async (baseSlug, excludeId = null) => {
    const base = baseSlug || 'proje';
    let candidate = base;
    let counter = 2;
    while (true) {
        const snap = await getDocs(query(projectsCol(), where('slug', '==', candidate)));
        const conflict = snap.docs.find((d) => d.id !== excludeId);
        if (!conflict) return candidate;
        candidate = `${base}-${counter}`;
        counter++;
    }
};

export const getProjectBySlug = async (slug) => {
    if (!slug) return null;
    const snap = await getDocs(query(projectsCol(), where('slug', '==', slug)));
    if (snap.empty) return null;
    const d = snap.docs[0];
    return { id: d.id, ...d.data() };
};

export const listProjects = async () => {
    const snap = await getDocs(query(projectsCol(), orderBy('createdAt', 'desc')));
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

export const listProjectsByStatus = async (isFinished) => {
    const snap = await getDocs(
        query(projectsCol(), where('isFinished', '==', isFinished), orderBy('createdAt', 'desc'))
    );
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

export const getProject = async (id) => {
    const snap = await getDoc(doc(db, COLLECTION, id));
    if (!snap.exists()) return null;
    return { id: snap.id, ...snap.data() };
};

const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    formData.append('folder', CLOUDINARY_FOLDER);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error?.message || 'Cloudinary upload failed');
    return data.secure_url;
};

export const uploadProjectPhotos = async (files, onProgress) => {
    const urls = [];
    for (let i = 0; i < files.length; i++) {
        const url = await uploadToCloudinary(files[i]);
        urls.push(url);
        if (onProgress) onProgress(i + 1, files.length);
    }
    return urls;
};

export const createProject = async (data, files = []) => {
    let urls = Array.isArray(data.photoUrls) ? [...data.photoUrls] : [];
    if (files && files.length > 0) {
        const uploaded = await uploadProjectPhotos(files);
        urls = [...urls, ...uploaded];
    }

    const baseSlug = slugify(data.slug || data.projectTitle);
    const slug = await ensureUniqueSlug(baseSlug);

    const docRef = await addDoc(projectsCol(), {
        projectTitle: data.projectTitle || '',
        addressSummary: data.addressSummary || '',
        location: data.location || '',
        projectTime: data.projectTime || '',
        metrekare: data.metrekare || '',
        info: data.info || '',
        slug,
        photoUrls: urls,
        coverPhotoUrl: data.coverPhotoUrl || urls[0] || '',
        isFinished: !!data.isFinished,
        showOnHomepage: data.showOnHomepage !== false,
        createdAt: serverTimestamp(),
    });

    return docRef.id;
};

export const updateProject = async (id, patch) => {
    const next = { ...patch };
    if (Object.prototype.hasOwnProperty.call(next, 'slug')) {
        const baseSlug = slugify(next.slug || next.projectTitle || '');
        next.slug = await ensureUniqueSlug(baseSlug, id);
    }
    const ref_ = doc(db, COLLECTION, id);
    await updateDoc(ref_, next);
};

export const addPhotosToProject = async (id, files) => {
    const project = await getProject(id);
    if (!project) throw new Error('Project not found');
    const newUrls = await uploadProjectPhotos(files);
    const merged = [...(project.photoUrls || []), ...newUrls];
    const update = { photoUrls: merged };
    if (!project.coverPhotoUrl && merged.length > 0) {
        update.coverPhotoUrl = merged[0];
    }
    await updateDoc(doc(db, COLLECTION, id), update);
    return merged;
};

export const removePhotoFromProject = async (id, photoUrl) => {
    const project = await getProject(id);
    if (!project) throw new Error('Project not found');
    const remaining = (project.photoUrls || []).filter((u) => u !== photoUrl);
    const update = { photoUrls: remaining };
    if (project.coverPhotoUrl === photoUrl) {
        update.coverPhotoUrl = remaining[0] || '';
    }
    await updateDoc(doc(db, COLLECTION, id), update);
    return update;
};

export const deleteProject = async (id) => {
    await deleteDoc(doc(db, COLLECTION, id));
};
