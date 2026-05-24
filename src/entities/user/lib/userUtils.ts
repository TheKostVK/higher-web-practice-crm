import type {UserProfile} from "../types";

export const getUserLocalStorage = () => {
    const userFromStorage = localStorage.getItem('user');

    if (!userFromStorage) {
        return undefined;
    }

    try {
        return JSON.parse(userFromStorage) as UserProfile;
    } catch {
        localStorage.removeItem('user');
        return undefined;
    }
};

export const setUserLocalStorage = (userData: UserProfile) => {
    try {
        localStorage.setItem('user', JSON.stringify(userData));
    } catch {
        console.error('Ошибка сохранения данных в локальное хранилище');
    }
};

export const removeUserLocalStorage = () => {
    localStorage.removeItem('user');
};
