import { create } from "zustand";
import axios from "axios";
import { useAuthStore } from "./auth.store";

const API_URL = import.meta.env.VITE_API_URL;

export interface CompanyProfile {
    id: string;
    name: string;
    website: string;
    location: string;
    description: string;
}

interface RecruiterState {
    company: CompanyProfile | null;
    loading: boolean;

    createCompany: (data: Omit<CompanyProfile, "id">) => Promise<void>;
    fetchMyCompany: () => Promise<void>;
    updateCompany: (data: Partial<CompanyProfile>) => Promise<void>;
}

export const useRecruiterStore = create<RecruiterState>((set) => ({
    company: null,
    loading: false,

    // ✅ CREATE COMPANY (Onboarding)
    createCompany: async (data) => {
        const token = useAuthStore.getState().accessToken;

        set({ loading: true });

        try {
            const res = await axios.post(
                `${API_URL}/companies`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            set({ company: res.data });

            // 🔥 refresh user to get isOnboarded true
            await useAuthStore.getState().fetchMe();
        } finally {
            set({ loading: false });
        }
    },

    // ✅ FETCH COMPANY
    fetchMyCompany: async () => {
        const token = useAuthStore.getState().accessToken;

        const res = await axios.get(
            `${API_URL}/companies/me`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        set({ company: res.data });
    },

    // ✅ UPDATE COMPANY
    updateCompany: async (data) => {
        const token = useAuthStore.getState().accessToken;

        const res = await axios.patch(
            `${API_URL}/companies/me`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        set({ company: res.data });
    },
}));
