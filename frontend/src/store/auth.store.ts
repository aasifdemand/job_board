/* eslint-disable no-useless-catch */
import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios, { type AxiosResponse } from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

/* =======================
   TYPES
======================= */

export type UserRole = "job_seeker" | "recruiter" | "admin";

export interface AuthUser {
    id: string;
    email: string;
    name: string;
    role: UserRole;
    isOnboarded: boolean
}

export interface SignupPayload {
    name: string;
    email: string;
    password: string;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface AuthResponse {
    accessToken: string;
    user: AuthUser;
}

export interface MessageResponse {
    message: string;
}

/* =======================
   STORE STATE
======================= */

export interface AuthState {
    user: AuthUser | null;
    accessToken: string | null;
    loading: boolean;

    signup: (data: SignupPayload) => Promise<MessageResponse>;
    login: (data: LoginPayload) => Promise<void>;
    googleLogin: () => void;
    setAuthFromToken: (token: string) => void;
    fetchMe: () => Promise<void>;
    forgotPassword: (email: string) => Promise<MessageResponse>;
    resetPassword: (
        token: string,
        password: string
    ) => Promise<MessageResponse>;
    verifyAccount: (
        token: string,
        otp: string
    ) => Promise<MessageResponse>;
    logout: () => void;
}

/* =======================
   STORE
======================= */

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            accessToken: null,
            loading: false,

            // ---------- SIGNUP ----------
            signup: async (data) => {
                set({ loading: true });

                try {
                    const res: AxiosResponse<MessageResponse> = await axios.post(
                        `${API_URL}/auth/signup`,
                        data
                    );

                    return res.data;
                } catch (error) {
                    throw error;
                } finally {
                    set({ loading: false });
                }
            },

            // ---------- LOGIN ----------
            login: async (data) => {
                set({ loading: true });

                try {
                    const res: AxiosResponse<AuthResponse> = await axios.post(
                        `${API_URL}/auth/login`,
                        data
                    );

                    set({
                        accessToken: res.data.accessToken,
                        user: res.data.user,
                    });
                } catch (error) {
                    throw error;
                } finally {
                    set({ loading: false });
                }
            },

            // ---------- GOOGLE LOGIN ----------
            googleLogin: () => {
                window.location.href = `${API_URL}/auth/google`;
            },

            // ---------- SET AUTH FROM TOKEN (for OAuth callback) ----------
            setAuthFromToken: (token: string) => {
                const payload = JSON.parse(atob(token.split(".")[1]));

                set({
                    accessToken: token,
                    user: {
                        id: payload.sub,
                        email: payload.email,
                        role: payload.role,
                        name: payload.name ?? "",
                        isOnboarded: payload.isOnboarded ?? false,
                    },
                });
            },

            // ---------- FETCH ME ----------
            fetchMe: async () => {
                const token = get().accessToken;
                if (!token) return;

                try {
                    const res: AxiosResponse<AuthUser> = await axios.get(
                        `${API_URL}/auth/me`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );

                    set({ user: res.data });
                } catch {
                    set({ user: null, accessToken: null });
                }
            },

            // ---------- FORGOT PASSWORD ----------
            forgotPassword: async (email) => {
                const res: AxiosResponse<MessageResponse> = await axios.post(
                    `${API_URL}/auth/forgot-password`,
                    { email }
                );
                return res.data;
            },

            // ---------- RESET PASSWORD ----------
            resetPassword: async (token, password) => {
                const res: AxiosResponse<MessageResponse> = await axios.post(
                    `${API_URL}/auth/reset-password`,
                    { token, password }
                );
                return res.data;
            },

            // ---------- VERIFY ACCOUNT (TOKEN + OTP) ----------
            verifyAccount: async (email: string, otp: string): Promise<MessageResponse> => {
                try {
                    const res = await axios.post(`${API_URL}/auth/verify`, {
                        email,
                        otp,
                    });
                    return res.data;
                } catch (error) {
                    throw error;
                } finally {
                    set({ loading: false });
                }

            },
            // ---------- LOGOUT ----------
            logout: () => {
                set({
                    user: null,
                    accessToken: null,
                });
            },
        }),
        {
            name: "auth-storage",
            partialize: (state) => ({
                accessToken: state.accessToken,
                user: state.user,
            }),
        }
    )
);
