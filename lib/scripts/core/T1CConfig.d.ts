import { Pkcs11ModuleConfig } from "../modules/pkcs11/generic/Pkcs11GenericModel";
export declare class T1CConfigOptions {
    t1cApiUrl?: string | undefined;
    t1cApiPort?: string | undefined;
    t1cRpcPort?: string | undefined;
    dsUrl?: string | undefined;
    apiKey?: string | undefined;
    gwJwt?: string | undefined;
    dsContextPath?: string | undefined;
    agentPort?: number | undefined;
    forceHardwarePinpad?: boolean | undefined;
    sessionTimeout?: number | undefined;
    consentDuration?: number | undefined;
    consentTimeout?: number | undefined;
    osPinDialog?: boolean | undefined;
    lang?: string | undefined;
    t1cDownloadLink?: string | undefined;
    t1cVersion?: string | undefined;
    pkcs11Config?: Pkcs11ModuleConfig | undefined;
    constructor(t1cApiUrl?: string | undefined, t1cApiPort?: string | undefined, t1cRpcPort?: string | undefined, dsUrl?: string | undefined, apiKey?: string | undefined, gwJwt?: string | undefined, dsContextPath?: string | undefined, agentPort?: number | undefined, forceHardwarePinpad?: boolean | undefined, sessionTimeout?: number | undefined, consentDuration?: number | undefined, consentTimeout?: number | undefined, osPinDialog?: boolean | undefined, lang?: string | undefined, t1cDownloadLink?: string | undefined, t1cVersion?: string | undefined, pkcs11Config?: Pkcs11ModuleConfig | undefined);
}
export declare class T1CConfig {
    private _dsUrl;
    private _t1cApiUrl;
    private _t1cApiPort;
    private _t1cRpcPort;
    private _dsContextPath;
    private _apiKey;
    private _gwJwt;
    private _t1cJwt;
    private _citrix;
    private _agentPort;
    private _forceHardwarePinpad;
    private _defaultSessionTimeout;
    private _tokenCompatible;
    private _defaultConsentDuration;
    private _defaultConsentTimeout;
    private _osPinDialog;
    private _contextToken;
    private _lang;
    private _t1cDownloadLink;
    private _t1cVersion;
    private _pkcs11Config;
    constructor(options: T1CConfigOptions);
    get pkcs11Config(): Pkcs11ModuleConfig | undefined;
    set pkcs11Config(value: Pkcs11ModuleConfig | undefined);
    set t1cRpcPort(value: string);
    set t1cApiPort(value: string);
    get t1cApiUrl(): string;
    set t1cApiUrl(value: string);
    get dsUrl(): string;
    get dsContextPath(): string;
    set dsContextPath(value: string);
    get apiKey(): string;
    set apiKey(value: string);
    get citrix(): boolean;
    set citrix(value: boolean);
    get agentPort(): number;
    set agentPort(value: number);
    set dsUrl(value: string);
    get forceHardwarePinpad(): boolean;
    set forceHardwarePinpad(value: boolean);
    get tokenCompatible(): boolean;
    set tokenCompatible(value: boolean);
    get defaultConsentDuration(): number;
    set defaultConsentDuration(value: number);
    get defaultConsentTimeout(): number;
    set defaultConsentTimeout(value: number);
    get osPinDialog(): boolean;
    set osPinDialog(value: boolean);
    get contextToken(): string;
    set contextToken(value: string);
    get t1cJwt(): string;
    set t1cJwt(value: string);
    get lang(): string;
    set lang(value: string);
    get t1cDownloadLink(): string;
    set t1cDownloadLink(value: string);
    get t1cVersion(): string;
    set t1cVersion(value: string);
}
