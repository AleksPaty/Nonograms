import { UserStorage } from '../types/usedInterface';

export class StorageService {
    public storageKey: string = 'user';

    constructor(storageKey: string | undefined = undefined) {
        if (storageKey) this.storageKey = storageKey;
    }

    public saveData(key: string, data: UserStorage): void {
        localStorage.setItem(key, JSON.stringify(data));
    }

    public getData(): UserStorage | null {
        const data = localStorage.getItem(this.storageKey);
        const result: UserStorage | null = data ? JSON.parse(data) : null;

        return result;
    }

    public removeData(key: string): void {
        localStorage.removeItem(key);
    }
}
