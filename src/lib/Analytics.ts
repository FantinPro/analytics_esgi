import { DateTime } from "luxon";

class Analytics {

    private appId: string | undefined;
    private sessionId: string | undefined;

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

    register(appId: string): void {
        this.appId = appId;
        this._handleActiveUser();
        this._handleResizeResolutions();
        const sessionId = localStorage.getItem("analytics-sessionid")
        if (sessionId) {
            this.sessionId = sessionId
        }
    }

    private _handleActiveUser() {
        const fiveMinutesFromNow = DateTime.now()
            .plus({ minutes: 5 })
            .toJSDate()
            .getTime();
        if (fiveMinutesFromNow) {
            const sessionExpiration = localStorage.getItem(
                "analytics-session-expiration"
            );

            if (sessionExpiration) {
                const sessionExpirationDate = DateTime.fromMillis(
                    Number(sessionExpiration)
                );
                if (sessionExpirationDate < DateTime.now()) {
                    localStorage.setItem(
                        "analytics-sessionid",
                        crypto.randomUUID()
                    );
                }
            }
            localStorage.setItem(
                "analytics-session-expiration",
                `${fiveMinutesFromNow}`
            );
        }
    }

    private _handleResizeResolutions() {
        window.addEventListener("resize", () => {
            this.resolutions = {
                width: window.innerWidth,
                height: window.innerHeight,
            }
        });
    }
}

export const ESGIAnalytics = new Analytics();