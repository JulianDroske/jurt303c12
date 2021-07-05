var et = Object.defineProperty,
    tt = Object.defineProperties;
var nt = Object.getOwnPropertyDescriptors;
var De = Object.getOwnPropertySymbols;
var st = Object.prototype.hasOwnProperty,
    ot = Object.prototype.propertyIsEnumerable;
var Fe = (e, t, n) => t in e ? et(e, t, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: n
    }) : e[t] = n,
    b = (e, t) => {
        for (var n in t || (t = {})) st.call(t, n) && Fe(e, n, t[n]);
        if (De)
            for (var n of De(t)) ot.call(t, n) && Fe(e, n, t[n]);
        return e
    },
    D = (e, t) => tt(e, nt(t));
import {
    E as Ae,
    i as at,
    r as c,
    c as y,
    R as s,
    f as Ie,
    a as le,
    b as rt,
    d as fe,
    e as _,
    u as Le,
    g as lt,
    h as $,
    j as Be,
    k as he,
    l as G,
    m as ct,
    n as Ee,
    o as xe,
    p as it,
    A as ut,
    F as mt,
    q as dt,
    N as pt,
    s as ft,
    t as ht,
    v as ee,
    w as Et,
    S as xt,
    x as Te,
    y as yt,
    H as gt
} from "./vendor.js";

function X() {
    return navigator.userAgent === "ClashX Runtime"
}
let N = null;
class vt {
    constructor(t) {
        this.instance = null, window.WebViewJavascriptBridge != null && (this.instance = window.WebViewJavascriptBridge), this.initBridge(n => {
            this.instance = n, t()
        })
    }
    initBridge(t) {
        if (!X()) return t == null ? void 0 : t(null);
        if (window.WebViewJavascriptBridge != null) return t(window.WebViewJavascriptBridge);
        if (window.WVJBCallbacks != null) return window.WVJBCallbacks.push(t);
        window.WVJBCallbacks = [t];
        const n = document.createElement("iframe");
        n.style.display = "none", n.src = "https://__bridge_loaded__", document.documentElement.appendChild(n), setTimeout(() => document.documentElement.removeChild(n), 0)
    }
    async callHandler(t, n) {
        return await new Promise(o => {
            var a;
            (a = this.instance) == null || a.callHandler(t, n, o)
        })
    }
    async ping() {
        return await this.callHandler("ping")
    }
    async readConfigString() {
        return await this.callHandler("readConfigString")
    }
    async getPasteboard() {
        return await this.callHandler("getPasteboard")
    }
    async getAPIInfo() {
        return await this.callHandler("apiInfo")
    }
    async setPasteboard(t) {
        return await this.callHandler("setPasteboard", t)
    }
    async writeConfigWithString(t) {
        return await this.callHandler("writeConfigWithString", t)
    }
    async setSystemProxy(t) {
        return await this.callHandler("setSystemProxy", t)
    }
    async getStartAtLogin() {
        return await this.callHandler("getStartAtLogin")
    }
    async getProxyDelay(t) {
        return await this.callHandler("speedTest", t)
    }
    async setStartAtLogin(t) {
        return await this.callHandler("setStartAtLogin", t)
    }
    async isSystemProxySet() {
        return await this.callHandler("isSystemProxySet")
    }
}

function wt(e) {
    if (N != null) {
        e();
        return
    }
    N = new vt(e)
}
var te;
(function(e) {
    e.SPEED_NOTIFY = "speed-notify"
})(te || (te = {}));
class Ct {
    constructor() {
        this.EE = new Ae
    }
    notifySpeedTest() {
        this.EE.emit(te.SPEED_NOTIFY)
    }
    subscribe(t, n) {
        this.EE.addListener(t, n)
    }
    unsubscribe(t, n) {
        this.EE.removeListener(t, n)
    }
}
var ye = new Ct;

function W() {}

function bt(e, t) {
    const n = [],
        o = [];
    for (const a of e) t(a) ? n.push(a) : o.push(a);
    return [n, o]
}

function M(e) {
    const t = ["B", "KB", "MB", "GB", "TB"];
    let n = 0;
    for (; ~~(e / 1024) && n < t.length;) e /= 1024, n++;
    return `${n===0?e:e.toFixed(2)} ${t[n]}`
}

function ce(e) {
    const [t, n] = at(e), o = c.exports.useMemo(() => {
        function a(r, l) {
            typeof r == "string" ? n(i => {
                const u = r,
                    f = l;
                i[u] = f
            }) : typeof r == "function" ? n(r) : typeof r == "object" && n(i => {
                const u = r;
                for (const f of Object.keys(u)) {
                    const d = f;
                    i[d] = u[d]
                }
            })
        }
        return a
    }, [n]);
    return [t, o]
}

function Nt(e, t = 0) {
    if (e.length < 2) throw new Error("List requires at least two elements");
    const [n, o] = c.exports.useState(t);

    function a() {
        o((n + 1) % e.length)
    }
    return {
        current: c.exports.useMemo(() => e[n], [e, n]),
        next: a
    }
}

function ge(e = !1) {
    const [t, n] = c.exports.useState(e);

    function o() {
        n(!1)
    }

    function a() {
        n(!0)
    }
    return {
        visible: t,
        hide: o,
        show: a
    }
}

function z(e) {
    const {
        title: t,
        children: n,
        className: o,
        style: a
    } = e;
    return c.exports.createElement("header", {
        className: y("header", o),
        style: a
    }, c.exports.createElement("h1", {
        className: "md:text-xl"
    }, t), c.exports.createElement("div", {
        className: "flex flex-auto items-center justify-end"
    }, n))
}

function R(e) {
    const {
        type: t,
        size: n = 14,
        className: o,
        style: a
    } = e, r = y("clash-iconfont", `icon-${t}`, o), l = b({
        fontSize: n
    }, a), i = D(b({}, e), {
        className: r,
        style: l
    });
    return c.exports.createElement("i", b({}, i))
}

function ve(e) {
    const {
        className: t,
        checked: n = !1,
        disabled: o = !1,
        onChange: a = W
    } = e, r = y("switch", {
        checked: n,
        disabled: o
    }, t);

    function l() {
        o || a(!n)
    }
    return c.exports.createElement("div", {
        className: r,
        onClick: l
    }, c.exports.createElement(R, {
        className: "switch-icon font-bold",
        type: "check",
        size: 20
    }))
}
const H = c.exports.forwardRef((e, t) => {
    const {
        className: n,
        style: o,
        children: a
    } = e;
    return s.createElement("div", {
        className: y("card", n),
        style: o,
        ref: t
    }, a)
});

function $e(e) {
    const {
        options: t,
        value: n,
        onSelect: o
    } = e;
    return c.exports.createElement("div", {
        className: "button-select"
    }, t.map(a => c.exports.createElement("button", {
        value: a.value,
        key: a.value,
        className: y("button-select-options", {
            actived: n === a.value
        }),
        onClick: () => o == null ? void 0 : o(a.value)
    }, a.label)))
}
const Pt = {
        SideBar: {
            Proxies: "Proxies",
            Overview: "Overview",
            Logs: "Logs",
            Rules: "Rules",
            Settings: "Setting",
            Connections: "Connections",
            Version: "Version"
        },
        Settings: {
            title: "Settings",
            labels: {
                startAtLogin: "Start at login",
                language: "language",
                setAsSystemProxy: "Set as system proxy",
                allowConnectFromLan: "Allow connect from Lan",
                proxyMode: "Mode",
                socks5ProxyPort: "Socks5 proxy port",
                httpProxyPort: "HTTP proxy port",
                mixedProxyPort: "Mixed proxy port",
                externalController: "External controller"
            },
            values: {
                cn: "\u4E2D\u6587",
                en: "English",
                global: "Global",
                rules: "Rules",
                direct: "Direct",
                script: "Script"
            },
            versionString: "Current ClashX is the latest version\uFF1A{{version}}",
            checkUpdate: "Check Update",
            externalControllerSetting: {
                title: "External Controller",
                note: "Please note that modifying this configuration will only configure Dashboard. Will not modify your Clash configuration file. Please make sure that the external controller address matches the address in the Clash configuration file, otherwise, Dashboard will not be able to connect to Clash.",
                host: "Host",
                port: "Port",
                secret: "Secret"
            }
        },
        Logs: {
            title: "Logs"
        },
        Rules: {
            title: "Rules",
            providerTitle: "Providers",
            providerUpdateTime: "Last updated at",
            ruleCount: "Rule count"
        },
        Connections: {
            title: "Connections",
            keepClosed: "Keep closed connections",
            total: {
                text: "total",
                upload: "upload",
                download: "download"
            },
            closeAll: {
                title: "Warning",
                content: "This would close all connections"
            },
            filter: {
                all: "All"
            },
            columns: {
                host: "Host",
                network: "Network",
                type: "Type",
                chains: "Chains",
                rule: "Rule",
                time: "Time",
                speed: "Speed",
                upload: "Upload",
                download: "Download",
                sourceIP: "Source IP"
            },
            info: {
                title: "Connection",
                id: "ID",
                host: "Host",
                hostEmpty: "Empty",
                dstIP: "IP",
                dstIPEmpty: "Empty",
                srcIP: "Source",
                upload: "Upload",
                download: "Download",
                network: "Network",
                inbound: "Inbound",
                rule: "Rule",
                chains: "Chains",
                status: "Status",
                opening: "Open",
                closed: "Closed",
                closeConnection: "Close"
            }
        },
        Proxies: {
            title: "Proxies",
            editDialog: {
                title: "Edit Proxy",
                color: "Color",
                name: "Name",
                type: "Type",
                server: "Server",
                port: "Port",
                password: "Password",
                cipher: "Cipher",
                obfs: "Obfs",
                "obfs-host": "Obfs-host",
                uuid: "UUID",
                alterId: "AlterId",
                tls: "TLS"
            },
            groupTitle: "Policy Group",
            providerTitle: "Providers",
            providerUpdateTime: "Last updated at",
            expandText: "Expand",
            collapseText: "Collapse",
            speedTestText: "Speed Test",
            breakConnectionsText: "Close connections which include the group"
        },
        Modal: {
            ok: "Ok",
            cancel: "Cancel"
        }
    },
    St = {
        SideBar: {
            Proxies: "\u4EE3\u7406",
            Overview: "\u603B\u89C8",
            Logs: "\u65E5\u5FD7",
            Rules: "\u89C4\u5219",
            Settings: "\u8BBE\u7F6E",
            Connections: "\u8FDE\u63A5",
            Version: "\u7248\u672C"
        },
        Settings: {
            title: "\u8BBE\u7F6E",
            labels: {
                startAtLogin: "\u5F00\u673A\u65F6\u542F\u52A8",
                language: "\u8BED\u8A00",
                setAsSystemProxy: "\u8BBE\u7F6E\u4E3A\u7CFB\u7EDF\u4EE3\u7406",
                allowConnectFromLan: "\u5141\u8BB8\u6765\u81EA\u5C40\u57DF\u7F51\u7684\u8FDE\u63A5",
                proxyMode: "\u4EE3\u7406\u6A21\u5F0F",
                socks5ProxyPort: "Socks5 \u4EE3\u7406\u7AEF\u53E3",
                httpProxyPort: "HTTP \u4EE3\u7406\u7AEF\u53E3",
                mixedProxyPort: "\u6DF7\u5408\u4EE3\u7406\u7AEF\u53E3",
                externalController: "\u5916\u90E8\u63A7\u5236\u8BBE\u7F6E"
            },
            values: {
                cn: "\u4E2D\u6587",
                en: "English",
                global: "\u5168\u5C40",
                rules: "\u89C4\u5219",
                direct: "\u76F4\u8FDE",
                script: "\u811A\u672C"
            },
            versionString: "\u5F53\u524D ClashX \u5DF2\u662F\u6700\u65B0\u7248\u672C\uFF1A{{version}}",
            checkUpdate: "\u68C0\u67E5\u66F4\u65B0",
            externalControllerSetting: {
                title: "\u7F16\u8F91\u5916\u90E8\u63A7\u5236\u8BBE\u7F6E",
                note: "\u8BF7\u6CE8\u610F\uFF0C\u4FEE\u6539\u8BE5\u914D\u7F6E\u9879\u5E76\u4E0D\u4F1A\u4FEE\u6539\u4F60\u7684 Clash \u914D\u7F6E\u6587\u4EF6\uFF0C\u8BF7\u786E\u8BA4\u4FEE\u6539\u540E\u7684\u5916\u90E8\u63A7\u5236\u5730\u5740\u548C Clash \u914D\u7F6E\u6587\u4EF6\u5185\u7684\u5730\u5740\u4E00\u81F4\uFF0C\u5426\u5219\u4F1A\u5BFC\u81F4 Dashboard \u65E0\u6CD5\u8FDE\u63A5\u3002",
                host: "Host",
                port: "\u7AEF\u53E3",
                secret: "\u5BC6\u94A5"
            }
        },
        Logs: {
            title: "\u65E5\u5FD7"
        },
        Rules: {
            title: "\u89C4\u5219",
            providerTitle: "\u89C4\u5219\u96C6",
            providerUpdateTime: "\u6700\u540E\u66F4\u65B0\u4E8E",
            ruleCount: "\u89C4\u5219\u6761\u6570"
        },
        Connections: {
            title: "\u8FDE\u63A5",
            keepClosed: "\u4FDD\u7559\u5173\u95ED\u8FDE\u63A5",
            total: {
                text: "\u603B\u91CF",
                upload: "\u4E0A\u4F20",
                download: "\u4E0B\u8F7D"
            },
            closeAll: {
                title: "\u8B66\u544A",
                content: "\u5C06\u4F1A\u5173\u95ED\u6240\u6709\u8FDE\u63A5"
            },
            filter: {
                all: "\u5168\u90E8"
            },
            columns: {
                host: "\u57DF\u540D",
                network: "\u7F51\u7EDC",
                type: "\u7C7B\u578B",
                chains: "\u8282\u70B9\u94FE",
                rule: "\u89C4\u5219",
                time: "\u8FDE\u63A5\u65F6\u95F4",
                speed: "\u901F\u7387",
                upload: "\u4E0A\u4F20",
                download: "\u4E0B\u8F7D",
                sourceIP: "\u6765\u6E90 IP"
            },
            info: {
                title: "\u8FDE\u63A5\u4FE1\u606F",
                id: "ID",
                host: "\u57DF\u540D",
                hostEmpty: "\u7A7A",
                dstIP: "IP",
                dstIPEmpty: "\u7A7A",
                srcIP: "\u6765\u6E90",
                upload: "\u4E0A\u4F20",
                download: "\u4E0B\u8F7D",
                network: "\u7F51\u7EDC",
                inbound: "\u5165\u53E3",
                rule: "\u89C4\u5219",
                chains: "\u4EE3\u7406",
                status: "\u72B6\u6001",
                opening: "\u8FDE\u63A5\u4E2D",
                closed: "\u5DF2\u5173\u95ED",
                closeConnection: "\u5173\u95ED\u8FDE\u63A5"
            }
        },
        Proxies: {
            title: "\u4EE3\u7406",
            editDialog: {
                title: "\u7F16\u8F91\u4EE3\u7406",
                color: "\u989C\u8272",
                name: "\u540D\u5B57",
                type: "\u7C7B\u578B",
                server: "\u670D\u52A1\u5668",
                port: "\u7AEF\u53E3",
                password: "\u5BC6\u7801",
                cipher: "\u52A0\u5BC6\u65B9\u5F0F",
                obfs: "Obfs",
                "obfs-host": "Obfs-host",
                uuid: "UUID",
                alterId: "AlterId",
                tls: "TLS"
            },
            groupTitle: "\u7B56\u7565\u7EC4",
            providerTitle: "\u4EE3\u7406\u96C6",
            providerUpdateTime: "\u6700\u540E\u66F4\u65B0\u4E8E",
            expandText: "\u5C55\u5F00",
            collapseText: "\u6536\u8D77",
            speedTestText: "\u6D4B\u901F",
            breakConnectionsText: "\u5207\u6362\u65F6\u6253\u65AD\u5305\u542B\u7B56\u7565\u7EC4\u7684\u8FDE\u63A5"
        },
        Modal: {
            ok: "\u786E \u5B9A",
            cancel: "\u53D6 \u6D88"
        }
    },
    Re = {
        en_US: Pt,
        zh_CN: St
    },
    kt = Object.keys(Re);

function Dt() {
    for (const e of window.navigator.languages) {
        if (e.includes("zh")) return "zh_CN";
        if (e.includes("us")) return "en_US"
    }
    return "en_US"
}

function we(e) {
    return c.exports.useMemo(() => {
        function n(o, a) {
            if (typeof o == "string") e(r => {
                const l = o,
                    i = a;
                r[l] = i
            });
            else if (typeof o == "function") {
                const r = o;
                e(l => r(l))
            } else typeof o == "object" && e(r => Ie(r, l => {
                const i = o;
                for (const u of Object.keys(i)) {
                    const f = u;
                    l[f] = i[f]
                }
            }))
        }
        return n
    }, [e])
}
class Me {
    constructor(t) {
        this.EE = new Ae, this.innerBuffer = [], this.isClose = !1, this.config = Object.assign({
            bufferLength: 0,
            retryInterval: 5e3,
            headers: {}
        }, t), this.config.useWebsocket ? this.websocketLoop() : this.loop()
    }
    websocketLoop() {
        var o;
        const t = new URL(this.config.url);
        t.protocol = t.protocol === "http:" ? "ws:" : "wss:", t.searchParams.set("token", (o = this.config.token) != null ? o : "");
        const n = new WebSocket(t.toString());
        n.addEventListener("message", a => {
            const r = JSON.parse(a.data);
            this.EE.emit("data", [r]), this.config.bufferLength > 0 && (this.innerBuffer.push(r), this.innerBuffer.length > this.config.bufferLength && this.innerBuffer.splice(0, this.innerBuffer.length - this.config.bufferLength))
        }), n.addEventListener("close", () => setTimeout(this.websocketLoop, this.config.retryInterval)), n.addEventListener("error", a => {
            this.EE.emit("error", a), setTimeout(this.websocketLoop, this.config.retryInterval)
        })
    }
    async loop() {
        const t = await le.fromPromise(fetch(this.config.url, {
            mode: "cors",
            headers: this.config.token ? {
                Authorization: `Bearer ${this.config.token}`
            } : {}
        }), a => a);
        if (t.isErr()) {
            this.retry(t.error);
            return
        } else if (t.value.body == null) {
            this.retry(new Error("fetch body error"));
            return
        }
        const n = t.value.body.getReader(),
            o = new TextDecoder;
        for (; !this.isClose;) {
            const a = await le.fromPromise(n == null ? void 0 : n.read(), i => i);
            if (a.isErr()) {
                this.retry(a.error);
                break
            }
            const l = o.decode(a.value.value).trim().split(`
`).map(i => JSON.parse(i));
            this.EE.emit("data", l), this.config.bufferLength > 0 && (this.innerBuffer.push(...l), this.innerBuffer.length > this.config.bufferLength && this.innerBuffer.splice(0, this.innerBuffer.length - this.config.bufferLength))
        }
    }
    retry(t) {
        this.isClose || (this.EE.emit("error", t), window.setTimeout(() => {
            this.loop()
        }, this.config.retryInterval))
    }
    subscribe(t, n) {
        this.EE.addListener(t, n)
    }
    unsubscribe(t, n) {
        this.EE.removeListener(t, n)
    }
    buffer() {
        return this.innerBuffer.slice()
    }
    destory() {
        this.EE.removeAllListeners(), this.isClose = !0
    }
}
class Ft {
    constructor(t, n) {
        this.axiosClient = rt.create({
            baseURL: t,
            headers: n ? {
                Authorization: `Bearer ${n}`
            } : {}
        })
    }
    async getConfig() {
        return await this.axiosClient.get("configs")
    }
    async updateConfig(t) {
        return await this.axiosClient.patch("configs", t)
    }
    async getRules() {
        return await this.axiosClient.get("rules")
    }
    async getProxyProviders() {
        const t = await this.axiosClient.get("providers/proxies", {
            validateStatus(n) {
                return n >= 200 && n < 300 || n === 404
            }
        });
        return t.status === 404 && (t.data = {
            providers: {}
        }), t
    }
    async getRuleProviders() {
        return await this.axiosClient.get("providers/rules")
    }
    async updateProvider(t) {
        return await this.axiosClient.put(`providers/proxies/${encodeURIComponent(t)}`)
    }
    async updateRuleProvider(t) {
        return await this.axiosClient.put(`providers/rules/${encodeURIComponent(t)}`)
    }
    async healthCheckProvider(t) {
        return await this.axiosClient.get(`providers/proxies/${encodeURIComponent(t)}/healthcheck`)
    }
    async getProxies() {
        return await this.axiosClient.get("proxies")
    }
    async getProxy(t) {
        return await this.axiosClient.get(`proxies/${encodeURIComponent(t)}`)
    }
    async getVersion() {
        return await this.axiosClient.get("version")
    }
    async getProxyDelay(t) {
        return await this.axiosClient.get(`proxies/${encodeURIComponent(t)}/delay`, {
            params: {
                timeout: 5e3,
                url: "http://www.gstatic.com/generate_204"
            }
        })
    }
    async closeAllConnections() {
        return await this.axiosClient.delete("connections")
    }
    async closeConnection(t) {
        return await this.axiosClient.delete(`connections/${t}`)
    }
    async getConnections() {
        return await this.axiosClient.get("connections")
    }
    async changeProxySelected(t, n) {
        return await this.axiosClient.put(`proxies/${encodeURIComponent(t)}`, {
            name: n
        })
    }
}
const At = _(async () => {
        if (!X()) return null;
        const e = await N.getAPIInfo();
        return {
            hostname: e.host,
            port: e.port,
            secret: e.secret,
            protocol: "http:"
        }
    }),
    He = fe("externalControllers", []);

function ne() {
    var f, d, p, h, E, C, F, A, L, k, P, B, V, J, j;
    const e = Le(At),
        t = lt(),
        n = Le(He);
    if (e != null) return e;
    let o; {
        const U = document.querySelector('meta[name="external-controller"]');
        ((f = U == null ? void 0 : U.content) == null ? void 0 : f.match(/^https?:/)) != null && (o = new URL(U.content))
    }
    const a = new URLSearchParams(t.search),
        r = (E = (h = (p = a.get("host")) != null ? p : (d = n == null ? void 0 : n[0]) == null ? void 0 : d.hostname) != null ? h : o == null ? void 0 : o.hostname) != null ? E : "127.0.0.1",
        l = (L = (A = (F = a.get("port")) != null ? F : (C = n == null ? void 0 : n[0]) == null ? void 0 : C.port) != null ? A : o == null ? void 0 : o.port) != null ? L : "9090",
        i = (V = (B = (P = a.get("secret")) != null ? P : (k = n == null ? void 0 : n[0]) == null ? void 0 : k.secret) != null ? B : o == null ? void 0 : o.username) != null ? V : "",
        u = ((J = a.get("protocol")) != null ? J : r === "127.0.0.1") ? "http:" : (j = o == null ? void 0 : o.protocol) != null ? j : window.location.protocol;
    return {
        hostname: r,
        port: l,
        secret: i,
        protocol: u
    }
}
const It = _({
    key: "",
    instance: null
});

function I() {
    const {
        hostname: e,
        port: t,
        secret: n,
        protocol: o
    } = ne(), [a, r] = $(It), l = `${o}//${e}:${t}?secret=${n}`;
    if (a.key === l) return a.instance;
    const i = new Ft(`${o}//${e}:${t}`, n);
    return r({
        key: l,
        instance: i
    }), i
}
const Ce = _(!0),
    Lt = fe("language", void 0);

function S() {
    const [e, t] = $(Lt), n = c.exports.useMemo(() => e != null ? e : Dt(), [e]), o = c.exports.useCallback(function(a) {
        function r(l) {
            return ct(Re[n][a], l)
        }
        return {
            t: r
        }
    }, [n]);
    return {
        lang: n,
        locales: kt,
        setLang: t,
        translation: o
    }
}
const Ue = _({
    version: "",
    premium: !1
});

function ie() {
    const [e, t] = $(Ue), n = I(), o = he(Ce);
    return G([n], async function() {
        const a = await le.fromPromise(n.getVersion(), r => r);
        o(a.isOk()), t(a.isErr() ? {
            version: "",
            premium: !1
        } : {
            version: a.value.data.version,
            premium: !!a.value.data.premium
        })
    }), e
}

function Oe() {
    const [{
        premium: e
    }] = $(Ue), t = I(), {
        data: n,
        mutate: o
    } = G(["/providers/rule", t], async () => {
        if (!e) return [];
        const a = await t.getRuleProviders();
        return Object.keys(a.data.providers).map(r => a.data.providers[r])
    });
    return {
        providers: n != null ? n : [],
        update: o
    }
}
const Bt = fe("profile", {
    breakConnections: !1
});

function We() {
    const [e, t] = $(Bt), n = c.exports.useCallback(o => {
        t(Ie(e, o))
    }, [e, t]);
    return {
        data: e,
        set: we(n)
    }
}
const ze = _([]);

function je() {
    const [e, t] = $(ze), n = I(), {
        data: o,
        mutate: a
    } = G(["/providers/proxy", n], async () => {
        const r = await n.getProxyProviders();
        return Object.keys(r.data.providers).map(l => r.data.providers[l]).filter(l => l.name !== "default").filter(l => l.vehicleType !== "Compatible")
    });
    return c.exports.useEffect(() => t(o != null ? o : []), [o, t]), {
        providers: e,
        update: a
    }
}

function be() {
    const e = I(),
        {
            data: t,
            mutate: n
        } = G(["/config", e], async () => {
            var r;
            const a = (await e.getConfig()).data;
            return {
                port: a.port,
                socksPort: a["socks-port"],
                mixedPort: (r = a["mixed-port"]) != null ? r : 0,
                redirPort: a["redir-port"],
                mode: a.mode.toLowerCase(),
                logLevel: a["log-level"],
                allowLan: a["allow-lan"]
            }
        });
    return {
        general: t != null ? t : {},
        update: n
    }
}
const _e = Be({
    proxies: [],
    groups: [],
    global: {
        name: "GLOBAL",
        type: "Selector",
        now: "",
        history: [],
        all: []
    }
});

function ue() {
    const [e, t] = $(_e), n = we(t), o = I(), {
        mutate: a
    } = G(["/proxies", o], async () => {
        const l = await o.getProxies(),
            i = l.data.proxies.GLOBAL;
        i.name = "GLOBAL";
        const u = new Set(["Selector", "URLTest", "Fallback", "LoadBalance"]),
            f = new Set(["DIRECT", "REJECT", "GLOBAL"]),
            d = i.all.filter(E => !f.has(E)).map(E => D(b({}, l.data.proxies[E]), {
                name: E
            })),
            [p, h] = bt(d, E => !u.has(E.type));
        n({
            proxies: p,
            groups: h,
            global: i
        })
    }), r = c.exports.useCallback((l, i) => {
        n(u => {
            l === "GLOBAL" && (u.global.now = i);
            for (const f of u.groups) f.name === l && (f.now = i)
        })
    }, [n]);
    return {
        proxies: e.proxies,
        groups: e.groups,
        global: e.global,
        update: a,
        markProxySelected: r,
        set: n
    }
}
const Tt = _(e => {
    const t = e(_e),
        n = e(ze),
        o = new Map;
    for (const a of t.proxies) o.set(a.name, a);
    for (const a of n)
        for (const r of a.proxies) o.set(r.name, r);
    return o
});

function Ge() {
    const {
        data: e,
        mutate: t
    } = G("/clashx", async () => {
        var a, r;
        if (!X()) return {
            isClashX: !1,
            startAtLogin: !1,
            systemProxy: !1
        };
        const n = (a = await (N == null ? void 0 : N.getStartAtLogin())) != null ? a : !1,
            o = (r = await (N == null ? void 0 : N.isSystemProxySet())) != null ? r : !1;
        return {
            startAtLogin: n,
            systemProxy: o,
            isClashX: !0
        }
    });
    return {
        data: e,
        update: t
    }
}
const $t = Be([]);

function Rt() {
    const [e, t] = $($t), n = we(t), o = I();
    async function a() {
        const r = await o.getRules();
        n(r.data.rules)
    }
    return {
        rules: e,
        update: a
    }
}
const Mt = _({
    key: "",
    instance: null
});

function Ve() {
    var d, p;
    const e = ne(),
        {
            general: t
        } = be(),
        n = ie(),
        [o, a] = $(Mt);
    if (!n.version || !t.logLevel) return null;
    const r = !!n.version || !0,
        l = `${e.protocol}//${e.hostname}:${e.port}/logs?level=${(d=t.logLevel)!=null?d:""}&useWebsocket=${r}&secret=${e.secret}`;
    if (o.key === l) return o.instance;
    const i = o.instance,
        u = `${e.protocol}//${e.hostname}:${e.port}/logs?level=${(p=t.logLevel)!=null?p:""}`,
        f = new Me({
            url: u,
            bufferLength: 200,
            token: e.secret,
            useWebsocket: r
        });
    return a({
        key: l,
        instance: f
    }), i != null && i.destory(), f
}

function Ht() {
    const e = ne(),
        t = ie(),
        n = !!t.version || !0,
        o = `${e.protocol}//${e.hostname}:${e.port}/connections`;
    return c.exports.useMemo(() => t.version ? new Me({
        url: o,
        bufferLength: 200,
        token: e.secret,
        useWebsocket: n
    }) : null, [e.secret, o, n, t.version])
}

function Ut(e) {
    const {
        className: t,
        data: n,
        onClick: o,
        select: a,
        canClick: r,
        errSet: l,
        rowHeight: i
    } = e, {
        translation: u
    } = S(), {
        t: f
    } = u("Proxies"), [d, p] = c.exports.useState(!1), [h, E] = c.exports.useState(!1), C = c.exports.useRef(null);
    c.exports.useLayoutEffect(() => {
        var P, B;
        E(((B = (P = C == null ? void 0 : C.current) == null ? void 0 : P.offsetHeight) != null ? B : 0) > 30)
    }, []);
    const F = d ? "auto" : i,
        A = r ? o : W;

    function L() {
        p(!d)
    }
    const k = n.map(P => {
        const B = y({
            "tags-selected": a === P,
            "cursor-pointer": r,
            error: l == null ? void 0 : l.has(P)
        });
        return s.createElement("li", {
            className: B,
            key: P,
            onClick: () => A(P)
        }, P)
    });
    return s.createElement("div", {
        className: y("flex items-start overflow-y-hidden", t),
        style: {
            height: F
        }
    }, s.createElement("ul", {
        ref: C,
        className: y("tags", {
            expand: d
        })
    }, k), h && s.createElement("span", {
        className: "h-7 px-5 select-none cursor-pointer leading-7",
        onClick: L
    }, f(d ? "collapseText" : "expandText")))
}

function Y(e) {
    const {
        className: t,
        style: n,
        value: o = "",
        align: a = "center",
        inside: r = !1,
        autoFocus: l = !1,
        type: i = "text",
        disabled: u = !1,
        onChange: f = W,
        onBlur: d = W
    } = e, p = y("input", `text-${a}`, {
        "focus:shadow-none": r
    }, t);
    return c.exports.createElement("input", {
        disabled: u,
        className: p,
        style: n,
        value: o,
        autoFocus: l,
        type: i,
        onChange: h => f(h.target.value, h),
        onBlur: d
    })
}

function Je(e) {
    const {
        show: t = !0,
        title: n = "Modal",
        size: o = "small",
        footer: a = !0,
        onOk: r = W,
        onClose: l = W,
        bodyClassName: i,
        bodyStyle: u,
        className: f,
        style: d,
        children: p
    } = e, {
        translation: h
    } = S(), {
        t: E
    } = h("Modal"), C = c.exports.useRef(document.createElement("div")), F = c.exports.useRef(null);
    c.exports.useLayoutEffect(() => {
        const k = C.current;
        return document.body.appendChild(k), () => {
            document.body.removeChild(k)
        }
    }, []);

    function A(k) {
        k.target === F.current && l()
    }
    const L = s.createElement("div", {
        className: y("modal-mask", {
            "modal-show": t
        }),
        ref: F,
        onMouseDown: A
    }, s.createElement("div", {
        className: y("modal", `modal-${o}`, f),
        style: d
    }, s.createElement("div", {
        className: "modal-title"
    }, n), s.createElement("div", {
        className: y("modal-body", i),
        style: u
    }, p), a && s.createElement("div", {
        className: "footer"
    }, s.createElement(Ne, {
        onClick: () => l()
    }, E("cancel")), s.createElement(Ne, {
        type: "primary",
        onClick: () => r()
    }, E("ok")))));
    return Ee.exports.createPortal(L, C.current)
}
const Ot = {
    success: "check",
    info: "info",
    warning: "info",
    error: "close"
};

function Wt(e) {
    const {
        message: t = "",
        type: n = "info",
        inside: o = !1,
        children: a,
        className: r,
        style: l
    } = e, i = y("alert", `alert-${o?"note":"box"}-${n}`, r);
    return s.createElement("div", {
        className: i,
        style: l
    }, s.createElement("span", {
        className: "alert-icon"
    }, s.createElement(R, {
        type: Ot[n],
        size: 26
    })), t ? s.createElement("p", {
        className: "alert-message"
    }, t) : s.createElement("div", {
        className: "alert-message"
    }, a))
}

function Ne(e) {
    const {
        type: t = "normal",
        onClick: n = W,
        children: o,
        className: a,
        style: r,
        disiabled: l
    } = e, i = y("button", `button-${t}`, a, {
        "button-disabled": l
    });
    return s.createElement("button", {
        className: i,
        style: r,
        onClick: n,
        disabled: l
    }, o)
}

function Xe(e) {
    const {
        className: t,
        checked: n = !1,
        onChange: o = W
    } = e, a = y("checkbox", {
        checked: n
    }, t);

    function r() {
        o(!n)
    }
    return c.exports.createElement("div", {
        className: a,
        onClick: r
    }, c.exports.createElement(R, {
        className: "checkbox-icon",
        type: "check",
        size: 18
    }), c.exports.createElement("div", null, e.children))
}

function me(e) {
    const {
        color: t,
        className: n,
        style: o
    } = e, a = y("tag", n), r = b({
        color: t
    }, o), l = D(b({}, e), {
        className: a,
        style: r
    });
    return c.exports.createElement("span", b({}, l), e.children)
}

function zt(e) {
    const t = y("spinner", e.className);
    return c.exports.createElement("div", {
        className: t
    }, c.exports.createElement("div", {
        className: "spinner-circle"
    }, c.exports.createElement("div", {
        className: "spinner-inner"
    })), c.exports.createElement("div", {
        className: "spinner-circle"
    }, c.exports.createElement("div", {
        className: "spinner-inner"
    })), c.exports.createElement("div", {
        className: "spinner-circle"
    }, c.exports.createElement("div", {
        className: "spinner-inner"
    })), c.exports.createElement("div", {
        className: "spinner-circle"
    }, c.exports.createElement("div", {
        className: "spinner-inner"
    })), c.exports.createElement("div", {
        className: "spinner-circle"
    }, c.exports.createElement("div", {
        className: "spinner-inner"
    })))
}

function Ye(e) {
    const t = y("loading", "visible", e.className);
    return e.visible ? s.createElement("div", {
        className: t
    }, s.createElement(zt, {
        className: e.spinnerClassName
    })) : null
}

function jt(e) {
    var a, r, l;
    const t = c.exports.useRef(document.createElement("div"));
    c.exports.useLayoutEffect(() => {
        const i = t.current;
        return document.body.appendChild(i), () => {
            document.body.removeChild(i)
        }
    }, []);
    const n = "absolute h-full right-0 transition-transform transform translate-x-full duration-100 pointer-events-auto",
        o = s.createElement("div", {
            className: y(e.className, "absolute inset-0 pointer-events-none z-9999")
        }, s.createElement(H, {
            className: y(n, {
                "translate-x-0": e.visible
            }),
            style: {
                width: (a = e.width) != null ? a : 400
            }
        }, e.children));
    return Ee.exports.createPortal(o, (l = (r = e.containerRef) == null ? void 0 : r.current) != null ? l : t.current)
}
const qe = {
    "#909399": 0,
    "#00c520": 260,
    "#ff9a28": 600,
    "#ff3e5e": Infinity
};

function Ke(e) {
    const {
        config: t,
        className: n
    } = e, {
        set: o
    } = ue(), a = I(), r = c.exports.useCallback(async p => {
        var E;
        if (X()) return (E = await (N == null ? void 0 : N.getProxyDelay(p))) != null ? E : 0;
        const {
            data: {
                delay: h
            }
        } = await a.getProxyDelay(p);
        return h
    }, [a]), l = c.exports.useCallback(async function() {
        const p = await le.fromPromise(r(t.name), E => E),
            h = p.isErr() ? 0 : p.value;
        o(E => {
            const C = E.proxies.find(F => F.name === t.name);
            C != null && C.history.push({
                time: Date.now().toString(),
                delay: h
            })
        })
    }, [t.name, r, o]), i = c.exports.useMemo(() => {
        var p;
        return ((p = t.history) == null ? void 0 : p.length) ? t.history.slice(-1)[0].delay : 0
    }, [t]);
    c.exports.useLayoutEffect(() => {
        const p = () => {
            l()
        };
        return ye.subscribe(te.SPEED_NOTIFY, p), () => ye.unsubscribe(te.SPEED_NOTIFY, p)
    }, [l]);
    const u = c.exports.useMemo(() => i === 0, [i]),
        f = c.exports.useMemo(() => Object.keys(qe).find(p => i <= qe[p]), [i]),
        d = u ? void 0 : f;
    return s.createElement("div", {
        className: y("proxy-item", {
            "proxy-error": u
        }, n)
    }, s.createElement("span", {
        className: "proxy-type",
        style: {
            backgroundColor: d
        }
    }, t.type), s.createElement("p", {
        className: "proxy-name"
    }, t.name), s.createElement("p", {
        className: "proxy-delay"
    }, i === 0 ? "-" : `${i}ms`))
}

function _t(e) {
    const {
        markProxySelected: t
    } = ue(), [n] = $(Tt), {
        data: o
    } = We(), a = I(), {
        config: r
    } = e;
    async function l(f) {
        if (await a.changeProxySelected(e.config.name, f), t(e.config.name, f), o.breakConnections) {
            const d = [],
                p = await a.getConnections();
            for (const h of p.data.connections) h.chains.includes(e.config.name) && d.push(h.id);
            await Promise.all(d.map(h => a.closeConnection(h)))
        }
    }
    const i = c.exports.useMemo(() => {
            var d;
            const f = new Set;
            for (const p of r.all) {
                const h = (d = n.get(p)) == null ? void 0 : d.history;
                (h == null ? void 0 : h.length) && h.slice(-1)[0].delay === 0 && f.add(p)
            }
            return f
        }, [r.all, n]),
        u = r.type === "Selector";
    return s.createElement("div", {
        className: "proxy-group"
    }, s.createElement("div", {
        className: "w-full h-10 mt-4 flex items-center justify-between md:h-15 md:mt-0 md:w-auto"
    }, s.createElement("span", {
        className: "overflow-hidden overflow-ellipsis whitespace-nowrap px-5 h-6 w-35 md:w-30"
    }, r.name), s.createElement(me, {
        className: "mr-5 md:mr-0"
    }, r.type)), s.createElement("div", {
        className: "py-2 md:py-4 flex-1"
    }, s.createElement(Ut, {
        className: "ml-5 md:ml-8",
        data: r.all,
        onClick: l,
        errSet: i,
        select: r.now,
        canClick: u,
        rowHeight: 30
    })))
}
xe.extend(it);

function Pe(e, t) {
    const n = t === "en_US" ? "en" : "zh-cn";
    return xe().locale(n).from(e)
}

function Gt(e) {
    const {
        update: t
    } = je(), {
        translation: n,
        lang: o
    } = S(), a = I(), {
        provider: r
    } = e, {
        t: l
    } = n("Proxies"), {
        visible: i,
        hide: u,
        show: f
    } = ge();

    function d() {
        f(), a.healthCheckProvider(r.name).then(async () => await t()).finally(() => u())
    }

    function p() {
        f(), a.updateProvider(r.name).then(async () => await t()).finally(() => u())
    }
    const h = c.exports.useMemo(() => r.proxies.slice().sort((E, C) => -1 * Se(E, C)), [r.proxies]);
    return s.createElement(H, {
        className: "proxy-provider"
    }, s.createElement(Ye, {
        visible: i
    }), s.createElement("div", {
        className: "flex justify-between flex-col md:flex-row md:items-center"
    }, s.createElement("div", {
        className: "flex items-center"
    }, s.createElement("span", {
        className: "mr-6"
    }, r.name), s.createElement(me, null, r.vehicleType)), s.createElement("div", {
        className: "flex items-center pt-3 md:pt-0"
    }, r.updatedAt && s.createElement("span", {
        className: "text-sm"
    }, `${l("providerUpdateTime")}: ${Pe(new Date(r.updatedAt),o)}`), s.createElement(R, {
        className: "pl-5 cursor-pointer text-red",
        type: "healthcheck",
        size: 18,
        onClick: d
    }), s.createElement(R, {
        className: "pl-5 cursor-pointer",
        type: "update",
        size: 18,
        onClick: p
    }))), s.createElement("ul", {
        className: "proxies-list"
    }, h.map(E => s.createElement("li", {
        key: E.name
    }, s.createElement(Ke, {
        className: "proxy-provider-item",
        config: E
    })))))
}
var Qe;
(function(e) {
    e[e.None = 0] = "None", e[e.Asc = 1] = "Asc", e[e.Desc = 2] = "Desc"
})(Qe || (Qe = {}));
const Vt = {
    [0]: "sort",
    [1]: "sort-ascending",
    [2]: "sort-descending"
};

function Se(e, t) {
    const n = e.history.length > 0 ? e.history.slice(-1)[0].delay : 0;
    return ((t.history.length > 0 ? t.history.slice(-1)[0].delay : 0) || Number.MAX_SAFE_INTEGER) - (n || Number.MAX_SAFE_INTEGER)
}

function Jt() {
    const {
        groups: e,
        global: t
    } = ue(), {
        data: n,
        set: o
    } = We(), {
        general: a
    } = be(), {
        translation: r
    } = S(), {
        t: l
    } = r("Proxies"), i = c.exports.useMemo(() => a.mode === "global" ? [t] : e, [a, e, t]);
    return s.createElement(s.Fragment, null, i.length !== 0 && s.createElement("div", {
        className: "flex flex-col"
    }, s.createElement(z, {
        title: l("groupTitle")
    }, s.createElement(Xe, {
        className: "text-primary-600 text-sm text-shadow-primary cursor-pointer",
        checked: n.breakConnections,
        onChange: u => o("breakConnections", u)
    }, l("breakConnectionsText"))), s.createElement(H, {
        className: "my-2.5 md:my-4 p-0"
    }, s.createElement("ul", {
        className: "list-none"
    }, i.map(u => s.createElement("li", {
        className: "proxies-group-item",
        key: u.name
    }, s.createElement(_t, {
        config: u
    })))))))
}

function Xt() {
    const {
        providers: e
    } = je(), {
        translation: t
    } = S(), {
        t: n
    } = t("Proxies");
    return s.createElement(s.Fragment, null, e.length !== 0 && s.createElement("div", {
        className: "flex flex-col"
    }, s.createElement(z, {
        title: n("providerTitle")
    }), s.createElement("ul", {
        className: "list-none"
    }, e.map(o => s.createElement("li", {
        className: "my-2.5 md:my-4",
        key: o.name
    }, s.createElement(Gt, {
        provider: o
    }))))))
}

function Yt() {
    const {
        proxies: e
    } = ue(), {
        translation: t
    } = S(), {
        t: n
    } = t("Proxies");

    function o() {
        ye.notifySpeedTest()
    }
    const {
        current: a,
        next: r
    } = Nt([1, 2, 0]), l = c.exports.useMemo(() => {
        switch (a) {
            case 2:
                return e.slice().sort((u, f) => Se(u, f));
            case 1:
                return e.slice().sort((u, f) => -1 * Se(u, f));
            default:
                return e.slice()
        }
    }, [a, e]), i = r;
    return s.createElement(s.Fragment, null, l.length !== 0 && s.createElement("div", {
        className: "flex flex-col"
    }, s.createElement(z, {
        title: n("title")
    }, s.createElement(R, {
        className: "ml-3",
        type: Vt[a],
        onClick: i,
        size: 20
    }), s.createElement(R, {
        className: "ml-3",
        type: "speed",
        size: 20
    }), s.createElement("span", {
        className: "proxies-speed-test",
        onClick: o
    }, n("speedTestText"))), s.createElement("ul", {
        className: "proxies-list"
    }, l.map(u => s.createElement("li", {
        key: u.name
    }, s.createElement(Ke, {
        config: u
    }))))))
}

function qt() {
    return s.createElement("div", {
        className: "page"
    }, s.createElement(Jt, null), s.createElement(Xt, null), s.createElement(Yt, null))
}

function Kt() {
    const e = c.exports.useRef(null),
        t = c.exports.useRef([]),
        [n, o] = c.exports.useState([]),
        {
            translation: a
        } = S(),
        {
            t: r
        } = a("Logs"),
        l = Ve();
    return c.exports.useLayoutEffect(() => {
        const i = e.current;
        i != null && (i.scrollTop = i.scrollHeight)
    }), c.exports.useEffect(() => {
        function i(u) {
            t.current = t.current.slice().concat(u.map(f => D(b({}, f), {
                time: new Date
            }))), o(t.current)
        }
        return l != null && (l.subscribe("data", i), t.current = l.buffer(), o(t.current)), () => l == null ? void 0 : l.unsubscribe("data", i)
    }, [l]), s.createElement("div", {
        className: "page"
    }, s.createElement(z, {
        title: r("title")
    }), s.createElement(H, {
        className: "flex flex-col flex-1 mt-2.5 md:mt-4"
    }, s.createElement("ul", {
        className: "logs-panel",
        ref: e
    }, n.map((i, u) => s.createElement("li", {
        className: "leading-5 inline-block",
        key: u
    }, s.createElement("span", {
        className: "mr-4 text-gray-400 text-opacity-90"
    }, xe(i.time).format("YYYY-MM-DD HH:mm:ss")), s.createElement("span", null, "[", i.type, "] ", i.payload))))))
}

function Qt(e) {
    const {
        update: t
    } = Oe(), {
        translation: n,
        lang: o
    } = S(), a = I(), {
        provider: r
    } = e, {
        t: l
    } = n("Rules"), {
        visible: i,
        hide: u,
        show: f
    } = ge();

    function d() {
        f(), a.updateRuleProvider(r.name).then(async () => await t()).finally(() => u())
    }
    const p = y("rule-provider-icon", {
        "rule-provider-loading": i
    });
    return c.exports.createElement(H, {
        className: "rule-provider"
    }, c.exports.createElement("div", {
        className: "rule-provider-header"
    }, c.exports.createElement("div", {
        className: "rule-provider-header-part"
    }, c.exports.createElement("span", {
        className: "rule-provider-name"
    }, r.name), c.exports.createElement(me, null, r.vehicleType), c.exports.createElement(me, {
        className: "rule-provider-behavior"
    }, r.behavior), c.exports.createElement("span", {
        className: "rule-provider-update"
    }, `${l("ruleCount")}: ${r.ruleCount}`)), c.exports.createElement("div", {
        className: "rule-provider-header-part"
    }, r.updatedAt && c.exports.createElement("span", {
        className: "rule-provider-update"
    }, `${l("providerUpdateTime")}: ${Pe(new Date(r.updatedAt),o)}`), c.exports.createElement(R, {
        className: p,
        type: "update",
        size: 18,
        onClick: d
    }))))
}

function Zt() {
    const {
        providers: e
    } = Oe(), {
        translation: t
    } = S(), {
        t: n
    } = t("Rules");
    return s.createElement(s.Fragment, null, e.length !== 0 && s.createElement("div", {
        className: "flex flex-col"
    }, s.createElement(z, {
        title: n("providerTitle")
    }), s.createElement("ul", {
        className: "proxies-providers-list"
    }, e.map(o => s.createElement("li", {
        className: "proxies-providers-item",
        key: o.name
    }, s.createElement(Qt, {
        provider: o
    }))))))
}

function en() {
    const {
        rules: e,
        update: t
    } = Rt(), {
        translation: n
    } = S(), {
        t: o
    } = n("Rules");
    G("rules", t);

    function a({
        index: r,
        style: l
    }) {
        const i = e[r];
        return s.createElement("li", {
            className: "rule-item",
            style: l
        }, s.createElement("div", {
            className: "py-1 flex"
        }, s.createElement("div", {
            className: "rule-type w-40 text-center"
        }, i.type), s.createElement("div", {
            className: "payload flex-1 text-center"
        }, i.payload), s.createElement("div", {
            className: "rule-proxy w-40 text-center"
        }, i.proxy)))
    }
    return s.createElement("div", {
        className: "page"
    }, s.createElement(Zt, null), s.createElement(z, {
        title: o("title")
    }), s.createElement(H, {
        className: "flex flex-col flex-1 mt-2.5 md:mt-4 p-0 focus:outline-none"
    }, s.createElement(ut, {
        className: "rules"
    }, ({
        height: r,
        width: l
    }) => s.createElement(mt, {
        height: r,
        width: l,
        itemCount: e.length,
        itemSize: 50
    }, a))))
}
const tn = [{
    label: "\u4E2D\u6587",
    value: "zh_CN"
}, {
    label: "English",
    value: "en_US"
}];

function nn() {
    var se, oe, T;
    const {
        premium: e
    } = ie(), {
        data: t,
        update: n
    } = Ge(), {
        general: o,
        update: a
    } = be(), r = he(Ce), l = ne(), {
        translation: i,
        setLang: u,
        lang: f
    } = S(), {
        t: d
    } = i("Settings"), p = I(), [h, E] = ce({
        socks5ProxyPort: 7891,
        httpProxyPort: 7890,
        mixedProxyPort: 0
    });
    c.exports.useEffect(() => {
        var g, ae, re;
        E("socks5ProxyPort", (g = o == null ? void 0 : o.socksPort) != null ? g : 0), E("httpProxyPort", (ae = o == null ? void 0 : o.port) != null ? ae : 0), E("mixedProxyPort", (re = o == null ? void 0 : o.mixedPort) != null ? re : 0)
    }, [o, E]);
    async function C(g) {
        await p.updateConfig({
            mode: g
        }), await a()
    }
    async function F(g) {
        await (N == null ? void 0 : N.setStartAtLogin(g)), await n()
    }
    async function A(g) {
        await (N == null ? void 0 : N.setSystemProxy(g)), await n()
    }

    function L(g) {
        u(g)
    }
    async function k() {
        await p.updateConfig({
            port: h.httpProxyPort
        }), await a()
    }
    async function P() {
        await p.updateConfig({
            "socks-port": h.socks5ProxyPort
        }), await a()
    }
    async function B() {
        await p.updateConfig({
            "mixed-port": h.mixedProxyPort
        }), await a()
    }
    async function V(g) {
        await p.updateConfig({
            "allow-lan": g
        }), await a()
    }
    const {
        hostname: J,
        port: j
    } = l, {
        allowLan: U,
        mode: de
    } = o, q = (se = t == null ? void 0 : t.startAtLogin) != null ? se : !1, K = (oe = t == null ? void 0 : t.systemProxy) != null ? oe : !1, O = (T = t == null ? void 0 : t.isClashX) != null ? T : !1, pe = c.exports.useMemo(() => {
        const g = [{
            label: d("values.global"),
            value: "Global"
        }, {
            label: d("values.rules"),
            value: "Rule"
        }, {
            label: d("values.direct"),
            value: "Direct"
        }];
        return e && g.push({
            label: d("values.script"),
            value: "Script"
        }), g
    }, [d, e]);
    return s.createElement("div", {
        className: "page"
    }, s.createElement(z, {
        title: d("title")
    }), s.createElement(H, {
        className: "settings-card"
    }, s.createElement("div", {
        className: "flex flex-wrap"
    }, s.createElement("div", {
        className: "w-full flex md:w-1/2 items-center justify-between px-8 py-3"
    }, s.createElement("span", {
        className: "label font-bold"
    }, d("labels.startAtLogin")), s.createElement(ve, {
        disabled: !(t == null ? void 0 : t.isClashX),
        checked: q,
        onChange: F
    })), s.createElement("div", {
        className: "w-full flex md:w-1/2 items-center justify-between px-8 py-3"
    }, s.createElement("span", {
        className: "label font-bold"
    }, d("labels.language")), s.createElement($e, {
        options: tn,
        value: f,
        onSelect: g => L(g)
    }))), s.createElement("div", {
        className: "flex flex-wrap"
    }, s.createElement("div", {
        className: "w-full flex md:w-1/2 items-center justify-between px-8 py-3"
    }, s.createElement("span", {
        className: "label font-bold"
    }, d("labels.setAsSystemProxy")), s.createElement(ve, {
        disabled: !O,
        checked: K,
        onChange: A
    })), s.createElement("div", {
        className: "w-full flex md:w-1/2 items-center justify-between px-8 py-3"
    }, s.createElement("span", {
        className: "label font-bold"
    }, d("labels.allowConnectFromLan")), s.createElement(ve, {
        checked: U,
        onChange: V
    })))), s.createElement(H, {
        className: "settings-card"
    }, s.createElement("div", {
        className: "flex flex-wrap"
    }, s.createElement("div", {
        className: "w-full flex md:w-1/2 items-center justify-between px-8 py-3"
    }, s.createElement("span", {
        className: "label font-bold"
    }, d("labels.proxyMode")), s.createElement($e, {
        options: pe,
        value: dt(de),
        onSelect: C
    })), s.createElement("div", {
        className: "w-full flex md:w-1/2 items-center justify-between px-8 py-3"
    }, s.createElement("span", {
        className: "label font-bold"
    }, d("labels.socks5ProxyPort")), s.createElement(Y, {
        className: "w-28",
        disabled: O,
        value: h.socks5ProxyPort,
        onChange: g => E("socks5ProxyPort", +g),
        onBlur: P
    }))), s.createElement("div", {
        className: "flex flex-wrap"
    }, s.createElement("div", {
        className: "w-full flex md:w-1/2 items-center justify-between px-8 py-3"
    }, s.createElement("span", {
        className: "label font-bold"
    }, d("labels.httpProxyPort")), s.createElement(Y, {
        className: "w-28",
        disabled: O,
        value: h.httpProxyPort,
        onChange: g => E("httpProxyPort", +g),
        onBlur: k
    })), s.createElement("div", {
        className: "w-full flex md:w-1/2 items-center justify-between px-8 py-3"
    }, s.createElement("span", {
        className: "label font-bold"
    }, d("labels.mixedProxyPort")), s.createElement(Y, {
        className: "w-28",
        disabled: O,
        value: h.mixedProxyPort,
        onChange: g => E("mixedProxyPort", +g),
        onBlur: B
    }))), s.createElement("div", {
        className: "flex flex-wrap"
    }, s.createElement("div", {
        className: "w-full flex md:w-1/2 items-center justify-between px-8 py-3"
    }, s.createElement("span", {
        className: "label font-bold"
    }, d("labels.externalController")), s.createElement("span", {
        className: y({
            "modify-btn": !O
        }, "external-controller"),
        onClick: () => !O && r(!1)
    }, `${J}:${j}`)), s.createElement("div", {
        className: "w-1/2 px-8"
    }))))
}
var sn = "./logo.png";

function on(e) {
    const {
        routes: t
    } = e, {
        translation: n
    } = S(), {
        version: o,
        premium: a
    } = ie(), {
        data: r
    } = Ge(), {
        t: l
    } = n("SideBar"), i = t.map(({
        path: u,
        name: f,
        exact: d,
        noMobile: p
    }) => c.exports.createElement("li", {
        className: y("item", {
            "no-mobile": p
        }),
        key: f
    }, c.exports.createElement(pt, {
        to: u,
        activeClassName: "active",
        exact: !!d
    }, l(f))));
    return c.exports.createElement("div", {
        className: "sidebar"
    }, c.exports.createElement("img", {
        src: sn,
        alt: "logo",
        className: "sidebar-logo"
    }), c.exports.createElement("ul", {
        className: "sidebar-menu"
    }, i), c.exports.createElement("div", {
        className: "sidebar-version"
    }, c.exports.createElement("span", {
        className: "sidebar-version-label"
    }, "Clash", (r == null ? void 0 : r.isClashX) && "X", " ", l("Version")), c.exports.createElement("span", {
        className: "sidebar-version-text"
    }, o), a && c.exports.createElement("span", {
        className: "sidebar-version-label"
    }, "Premium")))
}
var ke;
(function(e) {
    e.Domain = "Domain", e.DomainSuffix = "DomainSuffix", e.DomainKeyword = "DomainKeyword", e.GeoIP = "GeoIP", e.IPCIDR = "IPCIDR", e.SrcIPCIDR = "SrcIPCIDR", e.SrcPort = "SrcPort", e.DstPort = "DstPort", e.MATCH = "MATCH", e.RuleSet = "RuleSet"
})(ke || (ke = {}));

function an(e) {
    const {
        translation: t
    } = S(), n = c.exports.useMemo(() => t("Connections").t, [t]), {
        className: o,
        style: a
    } = e, r = y("connections-devices", o);

    function l(i) {
        var u;
        (u = e.onChange) == null || u.call(e, i)
    }
    return s.createElement("div", {
        className: r,
        style: a
    }, s.createElement("div", {
        className: y("connections-devices-item", {
            selected: e.selected === ""
        }),
        onClick: () => l("")
    }, n("filter.all")), e.devices.map(i => s.createElement("div", {
        key: i.label,
        className: y("connections-devices-item", {
            selected: e.selected === i.label
        }),
        onClick: () => l(i.label)
    }, i.label, " (", i.number, ")")))
}

function rn(e) {
    var o, a, r, l, i, u, f, d, p, h, E;
    const {
        translation: t
    } = S(), n = c.exports.useMemo(() => t("Connections").t, [t]);
    return s.createElement("div", {
        className: y(e.className, "text-sm flex flex-col")
    }, s.createElement("div", {
        className: "flex my-3"
    }, s.createElement("span", {
        className: "w-14 font-bold"
    }, n("info.id")), s.createElement("span", {
        className: "font-mono"
    }, e.connection.id)), s.createElement("div", {
        className: "flex justify-between my-3"
    }, s.createElement("div", {
        className: "flex flex-1"
    }, s.createElement("span", {
        className: "w-14 font-bold"
    }, n("info.network")), s.createElement("span", {
        className: "font-mono"
    }, (o = e.connection.metadata) == null ? void 0 : o.network)), s.createElement("div", {
        className: "flex flex-1"
    }, s.createElement("span", {
        className: "w-14 font-bold"
    }, n("info.inbound")), s.createElement("span", {
        className: "font-mono"
    }, (a = e.connection.metadata) == null ? void 0 : a.type))), s.createElement("div", {
        className: "flex my-3"
    }, s.createElement("span", {
        className: "w-14 font-bold"
    }, n("info.host")), s.createElement("span", {
        className: "font-mono flex-1 break-all"
    }, ((r = e.connection.metadata) == null ? void 0 : r.host) ? `${e.connection.metadata.host}:${(l=e.connection.metadata)==null?void 0:l.destinationPort}` : n("info.hostEmpty"))), s.createElement("div", {
        className: "flex my-3"
    }, s.createElement("span", {
        className: "w-14 font-bold"
    }, n("info.dstIP")), s.createElement("span", {
        className: "font-mono"
    }, ((i = e.connection.metadata) == null ? void 0 : i.destinationIP) ? `${e.connection.metadata.destinationIP}:${(u=e.connection.metadata)==null?void 0:u.destinationPort}` : n("info.hostEmpty"))), s.createElement("div", {
        className: "flex my-3"
    }, s.createElement("span", {
        className: "w-14 font-bold"
    }, n("info.srcIP")), s.createElement("span", {
        className: "font-mono"
    }, `${(f=e.connection.metadata)==null?void 0:f.sourceIP}:${(d=e.connection.metadata)==null?void 0:d.sourcePort}`)), s.createElement("div", {
        className: "flex my-3"
    }, s.createElement("span", {
        className: "w-14 font-bold"
    }, n("info.rule")), s.createElement("span", {
        className: "font-mono"
    }, e.connection.rule && `${e.connection.rule}${e.connection.rulePayload&&`(${e.connection.rulePayload})`}`)), s.createElement("div", {
        className: "flex my-3"
    }, s.createElement("span", {
        className: "w-14 font-bold"
    }, n("info.chains")), s.createElement("span", {
        className: "font-mono flex-1 break-all"
    }, (p = e.connection.chains) == null ? void 0 : p.slice().reverse().join(" / "))), s.createElement("div", {
        className: "flex justify-between my-3"
    }, s.createElement("div", {
        className: "flex flex-1"
    }, s.createElement("span", {
        className: "w-14 font-bold"
    }, n("info.upload")), s.createElement("span", {
        className: "font-mono"
    }, M((h = e.connection.upload) != null ? h : 0))), s.createElement("div", {
        className: "flex flex-1"
    }, s.createElement("span", {
        className: "w-14 font-bold"
    }, n("info.download")), s.createElement("span", {
        className: "font-mono"
    }, M((E = e.connection.download) != null ? E : 0)))), s.createElement("div", {
        className: "flex my-3"
    }, s.createElement("span", {
        className: "w-14 font-bold"
    }, n("info.status")), s.createElement("span", {
        className: "font-mono"
    }, e.connection.completed ? s.createElement("span", {
        className: "text-red"
    }, n("info.closed")) : s.createElement("span", {
        className: "text-green"
    }, n("info.opening")))))
}
class ln {
    constructor() {
        this.connections = new Map, this.saveDisconnection = !1
    }
    appendToSet(t) {
        var o;
        const n = t.reduce((a, r) => a.set(r.id, r), new Map);
        for (const a of this.connections.keys())
            if (!n.has(a))
                if (!this.saveDisconnection) this.connections.delete(a);
                else {
                    const r = this.connections.get(a);
                    r != null && (r.completed = !0, r.uploadSpeed = 0, r.downloadSpeed = 0)
                } for (const a of n.keys()) {
            if (!this.connections.has(a)) {
                this.connections.set(a, D(b({}, n.get(a)), {
                    uploadSpeed: 0,
                    downloadSpeed: 0
                }));
                continue
            }
            const r = this.connections.get(a),
                l = n.get(a);
            (o = this.connections) == null || o.set(a, D(b({}, l), {
                uploadSpeed: l.upload - r.upload,
                downloadSpeed: l.download - r.download
            }))
        }
    }
    toggleSave() {
        var t, n;
        if (this.saveDisconnection) {
            this.saveDisconnection = !1;
            for (const o of this.connections.keys())((n = (t = this.connections) == null ? void 0 : t.get(o)) == null ? void 0 : n.completed) && this.connections.delete(o)
        } else this.saveDisconnection = !0;
        return this.saveDisconnection
    }
    getConnections() {
        return [...this.connections.values()]
    }
}

function cn() {
    const e = c.exports.useMemo(() => new ln, []),
        t = c.exports.useRef(!0),
        [n, o] = c.exports.useState([]),
        [a, r] = c.exports.useState(!1),
        l = c.exports.useCallback(function(u) {
            e.appendToSet(u), t.current && o(e.getConnections()), t.current = !t.current
        }, [e]),
        i = c.exports.useCallback(function() {
            const u = e.toggleSave();
            r(u), u || o(e.getConnections()), t.current = !0
        }, [e]);
    return {
        connections: n,
        feed: l,
        toggleSave: i,
        save: a
    }
}
var x;
(function(e) {
    e.Host = "host", e.Network = "network", e.Type = "type", e.Chains = "chains", e.Rule = "rule", e.Speed = "speed", e.Upload = "upload", e.Download = "download", e.SourceIP = "sourceIP", e.Time = "time"
})(x || (x = {}));
const un = new Set([x.Network, x.Type, x.Rule, x.Speed, x.Upload, x.Download, x.SourceIP, x.Time]);

function mn(e, t) {
    switch (!0) {
        case (e === 0 && t === 0):
            return "-";
        case (e !== 0 && t !== 0):
            return `\u2191 ${M(e)}/s \u2193 ${M(t)}/s`;
        case e !== 0:
            return `\u2191 ${M(e)}/s`;
        default:
            return `\u2193 ${M(t)}/s`
    }
}

function dn() {
    const {
        translation: e,
        lang: t
    } = S(), n = c.exports.useMemo(() => e("Connections").t, [e]), o = Ht(), a = I(), r = c.exports.useRef(null), [l, i] = ce({
        uploadTotal: 0,
        downloadTotal: 0
    }), {
        visible: u,
        show: f,
        hide: d
    } = ge();

    function p() {
        a.closeAllConnections().finally(() => d())
    }
    const {
        connections: h,
        feed: E,
        save: C,
        toggleSave: F
    } = cn(), A = c.exports.useMemo(() => h.map(m => ({
        id: m.id,
        host: `${m.metadata.host||m.metadata.destinationIP}:${m.metadata.destinationPort}`,
        chains: m.chains.slice().reverse().join(" / "),
        rule: m.rule === ke.RuleSet ? `${m.rule}(${m.rulePayload})` : m.rule,
        time: new Date(m.start).getTime(),
        upload: m.upload,
        download: m.download,
        sourceIP: m.metadata.sourceIP,
        type: m.metadata.type,
        network: m.metadata.network.toUpperCase(),
        speed: {
            upload: m.uploadSpeed,
            download: m.downloadSpeed
        },
        completed: !!m.completed,
        original: m
    })), [h]), L = c.exports.useMemo(() => {
        const m = ft(h, "metadata.sourceIP");
        return Object.keys(m).map(w => ({
            label: w,
            number: m[w].length
        })).sort((w, v) => w.label.localeCompare(v.label))
    }, [h]), k = c.exports.useRef(null), {
        x: P
    } = ht(k), B = c.exports.useMemo(() => [{
        Header: n(`columns.${x.Host}`),
        accessor: x.Host,
        minWidth: 260,
        width: 260
    }, {
        Header: n(`columns.${x.Network}`),
        accessor: x.Network,
        minWidth: 80,
        width: 80
    }, {
        Header: n(`columns.${x.Type}`),
        accessor: x.Type,
        minWidth: 120,
        width: 120
    }, {
        Header: n(`columns.${x.Chains}`),
        accessor: x.Chains,
        minWidth: 200,
        width: 200
    }, {
        Header: n(`columns.${x.Rule}`),
        accessor: x.Rule,
        minWidth: 140,
        width: 140
    }, {
        id: x.Speed,
        Header: n(`columns.${x.Speed}`),
        accessor(m) {
            return [m.speed.upload, m.speed.download]
        },
        sortType(m, w) {
            const v = m.original.speed,
                Z = w.original.speed;
            return v.download === Z.download ? v.upload - Z.upload : v.download - Z.download
        },
        minWidth: 200,
        width: 200,
        sortDescFirst: !0
    }, {
        Header: n(`columns.${x.Upload}`),
        accessor: x.Upload,
        minWidth: 100,
        width: 100,
        sortDescFirst: !0
    }, {
        Header: n(`columns.${x.Download}`),
        accessor: x.Download,
        minWidth: 100,
        width: 100,
        sortDescFirst: !0
    }, {
        Header: n(`columns.${x.SourceIP}`),
        accessor: x.SourceIP,
        minWidth: 140,
        width: 140
    }, {
        Header: n(`columns.${x.Time}`),
        accessor: x.Time,
        minWidth: 120,
        width: 120,
        sortType(m, w) {
            return w.original.time - m.original.time
        }
    }], [n]);
    c.exports.useLayoutEffect(() => {
        function m(w) {
            for (const v of w) i({
                uploadTotal: v.uploadTotal,
                downloadTotal: v.downloadTotal
            }), E(v.connections)
        }
        return o == null || o.subscribe("data", m), () => {
            o == null || o.unsubscribe("data", m), o == null || o.destory()
        }
    }, [o, E, i]);
    const {
        getTableProps: V,
        getTableBodyProps: J,
        headerGroups: j,
        rows: U,
        prepareRow: de,
        setFilter: q
    } = ee.exports.useTable({
        columns: B,
        data: A,
        autoResetSortBy: !1,
        autoResetFilters: !1,
        initialState: {
            sortBy: [{
                id: x.Time,
                desc: !1
            }]
        }
    }, ee.exports.useResizeColumns, ee.exports.useBlockLayout, ee.exports.useFilters, ee.exports.useSortBy), K = c.exports.useMemo(() => j[0], [j]), O = c.exports.useCallback(function(m) {
        switch (m.column.id) {
            case x.Speed:
                return mn(m.value[0], m.value[1]);
            case x.Upload:
            case x.Download:
                return M(m.value);
            case x.Time:
                return Pe(new Date(m.value), t);
            default:
                return m.value
        }
    }, [t]), [pe, se] = c.exports.useState("");

    function oe(m) {
        se(m), q == null || q(x.SourceIP, m)
    }
    const [T, g] = ce({
        visible: !1,
        selectedID: "",
        connection: {}
    });

    function ae(m) {
        g({
            visible: !0,
            selectedID: m
        })
    }

    function re() {
        g(m => {
            m.connection.completed = !0
        }), a.closeConnection(T.selectedID)
    }
    const Q = Et(T.connection);
    return c.exports.useEffect(() => {
        var w;
        const m = (w = A.find(v => v.id === T.selectedID)) == null ? void 0 : w.original;
        m ? g(v => {
            v.connection = m, T.selectedID === Q.current.id && (v.connection.completed = Q.current.completed)
        }) : Object.keys(Q.current).length !== 0 && !Q.current.completed && g(v => {
            v.connection.completed = !0
        })
    }, [A, T.selectedID, Q, g]), s.createElement("div", {
        className: "page"
    }, s.createElement(z, {
        title: n("title")
    }, s.createElement("span", {
        className: "connections-filter flex-1 cursor-default"
    }, `(${n("total.text")}: ${n("total.upload")} ${M(l.uploadTotal)} ${n("total.download")} ${M(l.downloadTotal)})`), s.createElement(Xe, {
        className: "connections-filter",
        checked: C,
        onChange: F
    }, n("keepClosed")), s.createElement(R, {
        className: "connections-filter dangerous",
        onClick: f,
        type: "close-all",
        size: 20
    })), L.length > 1 && s.createElement(an, {
        devices: L,
        selected: pe,
        onChange: oe
    }), s.createElement(H, {
        ref: r,
        className: "connections-card relative"
    }, s.createElement("div", D(b({}, V()), {
        className: "flex flex-col w-full flex-1 overflow-auto",
        style: {
            flexBasis: 0
        },
        ref: k
    }), s.createElement("div", D(b({}, K.getHeaderGroupProps()), {
        className: "connections-header"
    }), K.headers.map((m, w) => {
        const v = m,
            Z = v.id;
        return s.createElement("div", D(b({}, v.getHeaderProps()), {
            className: y("connections-th", {
                resizing: v.isResizing,
                fixed: P > 0 && v.id === x.Host
            }),
            key: Z
        }), s.createElement("div", b({}, v.getSortByToggleProps()), m.render("Header"), v.isSorted ? v.isSortedDesc ? " \u2193" : " \u2191" : null), w !== K.headers.length - 1 && s.createElement("div", D(b({}, v.getResizerProps()), {
            className: "connections-resizer"
        })))
    })), s.createElement("div", D(b({}, J()), {
        className: "flex-1"
    }), U.map(m => (de(m), s.createElement("div", D(b({}, m.getRowProps()), {
        className: "connections-item cursor-default select-none",
        key: m.original.id,
        onClick: () => ae(m.original.id)
    }), m.cells.map(w => {
        const v = y("connections-block", {
            "text-center": un.has(w.column.id),
            completed: m.original.completed
        }, {
            fixed: P > 0 && w.column.id === x.Host
        });
        return s.createElement("div", D(b({}, w.getCellProps()), {
            className: v,
            key: w.column.id
        }), O(w))
    }))))))), s.createElement(Je, {
        title: n("closeAll.title"),
        show: u,
        onClose: d,
        onOk: p
    }, n("closeAll.content")), s.createElement(jt, {
        containerRef: r,
        visible: T.visible,
        width: 450
    }, s.createElement("div", {
        className: "flex justify-between items-center h-8"
    }, s.createElement("span", {
        className: "pl-3 font-bold"
    }, n("info.title")), s.createElement(R, {
        type: "close",
        size: 16,
        className: "cursor-pointer",
        onClick: () => g("visible", !1)
    })), s.createElement(rn, {
        className: "px-5 mt-3",
        connection: T.connection
    }), s.createElement("div", {
        className: "flex justify-end mt-3 pr-3"
    }, s.createElement(Ne, {
        type: "danger",
        disiabled: T.connection.completed,
        onClick: () => re()
    }, n("info.closeConnection")))))
}

function pn() {
    const {
        translation: e
    } = S(), {
        t
    } = e("Settings"), {
        hostname: n,
        port: o,
        secret: a
    } = ne(), [r, l] = $(Ce), [i, u] = ce({
        hostname: "",
        port: "",
        secret: ""
    });
    c.exports.useEffect(() => {
        u({
            hostname: n,
            port: o,
            secret: a
        })
    }, [n, o, a, u]);
    const f = he(He);

    function d() {
        const {
            hostname: p,
            port: h,
            secret: E
        } = i;
        f([{
            hostname: p,
            port: h,
            secret: E
        }])
    }
    return s.createElement(Je, {
        show: !r,
        title: t("externalControllerSetting.title"),
        bodyClassName: "external-controller",
        onClose: () => l(!0),
        onOk: d
    }, s.createElement(Wt, {
        type: "info",
        inside: !0
    }, s.createElement("p", null, t("externalControllerSetting.note"))), s.createElement("div", {
        className: "flex items-center"
    }, s.createElement("span", {
        className: "md:my-3 w-14 my-1 font-bold"
    }, t("externalControllerSetting.host")), s.createElement(Y, {
        className: "md:my-3 flex-1 my-1",
        align: "left",
        inside: !0,
        value: i.hostname,
        onChange: p => u("hostname", p)
    })), s.createElement("div", {
        className: "flex items-center"
    }, s.createElement("div", {
        className: "md:my-3 w-14 my-1 font-bold"
    }, t("externalControllerSetting.port")), s.createElement(Y, {
        className: "md:my-3 w-14 my-1 flex-1",
        align: "left",
        inside: !0,
        value: i.port,
        onChange: p => u("port", p)
    })), s.createElement("div", {
        className: "flex items-center"
    }, s.createElement("div", {
        className: "md:my-3 w-14 my-1 font-bold"
    }, t("externalControllerSetting.secret")), s.createElement(Y, {
        className: "md:my-3 w-14 my-1 flex-1",
        align: "left",
        inside: !0,
        value: i.secret,
        onChange: p => u("secret", p)
    })))
}

function fn() {
    Ve();
    const e = [{
        path: "/proxies",
        name: "Proxies",
        component: qt
    }, {
        path: "/logs",
        name: "Logs",
        component: Kt
    }, {
        path: "/rules",
        name: "Rules",
        component: en,
        noMobile: !0
    }, {
        path: "/connections",
        name: "Connections",
        component: dn,
        noMobile: !0
    }, {
        path: "/settings",
        name: "Settings",
        component: nn
    }];
    return s.createElement("div", {
        className: y("app", {
            "not-clashx": !X()
        })
    }, s.createElement(on, {
        routes: e
    }), s.createElement("div", {
        className: "page-container"
    }, s.createElement(xt, null, s.createElement(Te, {
        exact: !0,
        path: "/",
        component: () => s.createElement(yt, {
            to: "/proxies"
        })
    }), e.map(t => s.createElement(Te, {
        exact: !1,
        path: t.path,
        key: t.path,
        component: t.component
    })))), s.createElement(pn, null))
}

function Ze() {
    const e = document.getElementById("root"),
        t = s.createElement(gt, null, s.createElement(c.exports.Suspense, {
            fallback: s.createElement(Ye, {
                visible: !0
            })
        }, s.createElement(fn, null)));
    Ee.exports.render(t, e)
}
X() ? wt(() => Ze()) : Ze();
