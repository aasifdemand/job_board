import { create } from "zustand";
import axios from "axios";
import { useAuthStore } from "./auth.store";

const API_URL = import.meta.env.VITE_API_URL;

export interface SeekerProfile {
    id: string;
    headline: string;
    summary: string;
    location: string;
    experienceLevel: string;
    skills: string[];
    resumeUrl?: string;
}

interface SeekerState {
    profile: SeekerProfile | null;
    loading: boolean;

    createProfile: (data: Omit<SeekerProfile, "id">) => Promise<void>;
    fetchProfile: () => Promise<void>;
    updateProfile: (data: Partial<SeekerProfile>) => Promise<void>;
    uploadResume: (file: File) => Promise<string>;
}


export const useSeekerStore = create<SeekerState>((set) => ({
    profile: null,
    loading: false,

    createProfile: async (data) => {
        const token = useAuthStore.getState().accessToken;

        set({ loading: true });

        try {
            const res = await axios.post(
                `${API_URL}/seeker/profile`,
                data,
                {
                    headers: { Authorization: `Bearer ${token}`, credentials: "include", },
                }
            );

            set({ profile: res.data });

            // 🔥 Mark onboarding complete
            await useAuthStore.getState().fetchMe();

        } finally {
            set({ loading: false });
        }
    },

    fetchProfile: async () => {
        const token = useAuthStore.getState().accessToken;

        const res = await axios.get(
            `${API_URL}/seeker/profile/me`,
            {
                headers: { Authorization: `Bearer ${token}`, credentials: "include", },
            }
        );

        set({ profile: res.data });
    },

    updateProfile: async (data) => {
        const token = useAuthStore.getState().accessToken;

        const res = await axios.patch(
            `${API_URL}/seeker/profile/me`,
            data,
            {
                headers: { Authorization: `Bearer ${token}`, credentials: "include", },

            }
        );

        set({ profile: res.data });
    },

    uploadResume: async (file) => {
        const token = useAuthStore.getState().accessToken;

        const formData = new FormData();
        formData.append("resume", file);

        const res = await axios.post(
            `${API_URL}/seeker/profile/resume`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                    credentials: "include",

                },
            }
        );

        const resumeUrl = res.data.resumeUrl;

        set((state) => ({
            profile: state.profile
                ? { ...state.profile, resumeUrl }
                : state.profile,
        }));

        return resumeUrl;
    },
}));
