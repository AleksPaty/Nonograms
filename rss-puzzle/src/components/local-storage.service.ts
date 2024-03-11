interface UserStorage {
    firstName: string;
    surname: string;
}

export class StorageService {
    private storageKey: string;

    constructor() {
        this.storageKey = 'user';
    }

    public saveData(data: UserStorage): void {
        localStorage.setItem(this.storageKey, JSON.stringify(data));
    }

    public getData(): UserStorage | null {
        const data = localStorage.getItem(this.storageKey);
        const result: UserStorage | null = data ? JSON.parse(data) : null;

        return result;
    }
}
