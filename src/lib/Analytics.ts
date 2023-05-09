import { DateTime } from "luxon";

type AnalyticsOptions = {
    afk?: number;
};
class Analytics {
    private appId: string | undefined;
    private secretKey: string | undefined;
    private sessionId: string | undefined;
    private afk: number = 300;

    private resolutions: { width: number; height: number } = {
        width: window.innerWidth,
        height: window.innerHeight,
    };

    constructor() {}

    getAppId() {
        if (!this.appId) {
            throw new Error("AppId is not defined");
        }
        return this.appId;
    }

    getResolutions(): { width: number; height: number } {
        return this.resolutions;
    }

    getSessionId() {
        return this.sessionId;
    }

    register(appId: string, secretKey: string, opt?: AnalyticsOptions): void {
        this.appId = appId;
        this.secretKey = secretKey;
        if (opt?.afk) {
            this.afk = opt.afk;
        }
        this.handleActiveUser();
        const sessionId = localStorage.getItem("analytics-sessionid");
        if (sessionId) {
            this.sessionId = sessionId;
        }
        this._handleResizeResolutions();
    }

    handleActiveUser() {
        const fiveMinutesFromNow = DateTime.now()
            .plus({ seconds: this.afk })
            .toJSDate()
            .getTime();
        const sessionExpiration =
            localStorage.getItem("analytics-session-expiration") ?? 0;

        const sessionExpirationDate = DateTime.fromMillis(
            Number(sessionExpiration)
        );
        if (sessionExpirationDate < DateTime.now()) {
            localStorage.setItem("analytics-sessionid", crypto.randomUUID());
            const sessionId = localStorage.getItem("analytics-sessionid");
            if (sessionId) {
                this.sessionId = sessionId;
            }
        }

        localStorage.setItem(
            "analytics-session-expiration",
            `${fiveMinutesFromNow}`
        );
    }

    private _handleResizeResolutions() {
        window.addEventListener("resize", () => {
            this.resolutions = {
                width: window.innerWidth,
                height: window.innerHeight,
            };
        });
    }
}

export const ESGIAnalytics = new Analytics();
