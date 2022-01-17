import { CookieStore } from "@shared";

export class TokenService {
    static tokentime: number = 2; // 2小时
    static tokenname: string = 'Accept-Token';

    static set(token: string, time: number = this.tokentime): void {
        CookieStore.set(this.tokenname, token, time);
    }

    static get(): string {
        return CookieStore.get(this.tokenname) || '';
    }

    static check(): boolean {
        return !!CookieStore.get(this.tokenname);
    }

    static clear() {
        CookieStore.del(this.tokenname);
    }
}