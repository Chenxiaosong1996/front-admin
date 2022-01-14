import { CookieStore } from "@shared";

export class TokenService {
    static tokentime: number = 2; // 2小时
    static tokenname: string = 'Access-Token';

    static set(token: string): void {
        CookieStore.set(this.tokenname, token, this.tokentime);
    }

    static get(): string {
        return CookieStore.get(this.tokenname) || '';
    }

    static check(): boolean {
        return !!this.get();
    }
}