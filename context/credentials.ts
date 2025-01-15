import { atom } from "jotai";

export const authTokenContext = atom<string | null>(null);
export const isLoginContext = atom<boolean>(false);