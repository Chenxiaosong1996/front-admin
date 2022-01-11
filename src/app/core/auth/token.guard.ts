import { CookieStore } from "@shared";

export class TokenGuard {
    static tokentime: number = 2; // 2小时
    static tokenname: string = 'Access-Token';

    static set(token: string) {
        CookieStore.set(this.tokenname, token, this.tokentime);
    }

    static get() {
        return CookieStore.get(this.tokenname);
    }

    static check() {
        return !!this.get();
    }
}