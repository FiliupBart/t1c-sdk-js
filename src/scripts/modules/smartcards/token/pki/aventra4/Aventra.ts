/**
 * @author Trust1Team
 * @since 2020
 */
import {T1CLibException} from '../../../../../core/exceptions/CoreExceptions';
import {AbstractAventra} from './AventraModel';
import {LocalConnection} from '../../../../../core/client/Connection';
import {
    TokenCertificateResponse,
    TokenInfoResponse,
    BoolDataResponse,
    TokenAllCertsExtendedResponse,
    TokenAllCertsResponse,
    TokenCertificateExtendedResponse,
    TokenValidateSignatureRequest, TokenValidateSignatureResponse
} from "../../../../../core/service/CoreModel";
import {
    TokenAuthenticateResponse,
    TokenSignResponse,
    TokenVerifyPinResponse, TokenAlgorithmReferencesResponse, TokenResetPinResponse
} from "../../eid/generic/EidGenericModel";
import {TokenAuthenticateOrSignData, TokenResetPinData, TokenVerifyPinData} from "../../TokenCard";
import {Options} from "../../../Card";
import {CertParser} from "../../../../../util/CertParser";
import {ResponseHandler} from "../../../../../util/ResponseHandler";
import {ConnectorKeyUtil} from "../../../../../..";

const semver = require('semver');

export class Aventra implements AbstractAventra {
    static CONTAINER_PREFIX = 'aventra_myid_4';
    static PATH_TOKEN_APP = '/apps/token';
    static PATH_READERS = '/readers';

    static INFO = '/info';

    static ALL_CERTIFICATES = '/cert-list';
    static CERT_ROOT = '/root-cert';
    static CERT_AUTHENTICATION = '/authentication-cert';
    static CERT_NON_REPUDIATION = '/nonrepudiation-cert';
    static CERT_ISSUER = '/issuer-cert';
    static CERT_ENCRYPTION = '/encryption-cert';

    static VALIDATE_SIGNATURE = '/validate';

    static SIGN_RAW_DATA = '/sign_raw';
    static SIGN_DATA = '/sign';
    static VERIFY_PIN = '/verify-pin';
    static AUTHENTICATE = '/authenticate';
    static RESET_PIN = '/reset-pin';

    static RESET_BULK_PIN = "/reset-bulk-pin"

    static SUPPORTED_ALGOS = '/supported-algorithms'

    constructor(protected baseUrl: string, protected containerUrl: string, protected connection: LocalConnection, protected reader_id: string) {
    }

    sign_raw(body: TokenAuthenticateOrSignData, bulk?: boolean | undefined, callback?: ((error: T1CLibException, data: TokenSignResponse) => void) | undefined): Promise<TokenSignResponse> {
        if (body.algorithm) {
            body.algorithm = body.algorithm.toLowerCase();
        }
        body.pin = ConnectorKeyUtil.encryptData(body.pin, this.connection.cfg.version)
        body.base64Encoded = true;
        return this.connection.post(this.baseUrl, this.tokenApp(Aventra.SIGN_RAW_DATA, true), body,  this.getBulkSignQueryParams(bulk), undefined, callback);
    }

    validateSignature(body: TokenValidateSignatureRequest, callback?: (error: T1CLibException, data: TokenValidateSignatureResponse) => void): Promise<TokenValidateSignatureResponse> {
        if (body.algorithm) {
            body.algorithm = body.algorithm.toLowerCase();
        }
        body.pin = ConnectorKeyUtil.encryptData(body.pin, this.connection.cfg.version)
        return this.connection.post(this.baseUrl, this.tokenApp(Aventra.VALIDATE_SIGNATURE, true), body,  undefined, undefined, callback);
    }

    public rootCertificate( callback?: (error: T1CLibException, data: TokenCertificateResponse) => void): Promise<TokenCertificateResponse> {
        return this.getCertificate(Aventra.CERT_ROOT, callback);
    }

    public issuerCertificate( callback?: (error: T1CLibException, data: TokenCertificateResponse) => void): Promise<TokenCertificateResponse> {
        return this.getCertificate(Aventra.CERT_ISSUER, callback);
    }

    public authenticationCertificate( callback?: (error: T1CLibException, data: TokenCertificateResponse) => void): Promise<TokenCertificateResponse> {
        return this.getCertificate(Aventra.CERT_AUTHENTICATION, callback);
    }

    public nonRepudiationCertificate( callback?: (error: T1CLibException, data: TokenCertificateResponse) => void): Promise<TokenCertificateResponse> {
        return this.getCertificate(Aventra.CERT_NON_REPUDIATION, callback);
    }

    public encryptionCertificate( callback?: (error: T1CLibException, data: TokenCertificateResponse) => void): Promise<TokenCertificateResponse> {
        return this.getCertificate(Aventra.CERT_ENCRYPTION, callback);
    }


    public authenticationCertificateExtended( callback?: (error: T1CLibException, data: TokenCertificateExtendedResponse) => void): Promise<TokenCertificateExtendedResponse> {
        return this.getCertificateExtended(Aventra.CERT_AUTHENTICATION, callback);
    }

    public nonRepudiationCertificateExtended( callback?: (error: T1CLibException, data: TokenCertificateExtendedResponse) => void): Promise<TokenCertificateExtendedResponse> {
        return this.getCertificateExtended(Aventra.CERT_NON_REPUDIATION, callback);
    }

    public encryptionCertificateExtended( callback?: (error: T1CLibException, data: TokenCertificateExtendedResponse) => void): Promise<TokenCertificateExtendedResponse> {
        return this.getCertificateExtended(Aventra.CERT_ENCRYPTION, callback);
    }

    public rootCertificateExtended( callback?: (error: T1CLibException, data: TokenCertificateExtendedResponse) => void): Promise<TokenCertificateExtendedResponse> {
        return this.getCertificateExtended(Aventra.CERT_ROOT, callback);
    }

    public issuerCertificateExtended( callback?: (error: T1CLibException, data: TokenCertificateExtendedResponse) => void): Promise<TokenCertificateExtendedResponse> {
        return this.getCertificateExtended(Aventra.CERT_ISSUER, callback);
    }

    public allCertsExtended( filters?: string[] | Options, callback?: (error: T1CLibException, data: TokenAllCertsExtendedResponse) => void): Promise<TokenAllCertsExtendedResponse> {
        return this.connection.get(this.baseUrl, this.tokenApp(Aventra.ALL_CERTIFICATES, true), filters, undefined, callback).then((res: TokenAllCertsExtendedResponse) => {
            return CertParser.processExtendedTokenAllCertificates(res, callback)
        }).catch(error => {
            return ResponseHandler.error(error, callback);
        });
    }


    public verifyPin(body: TokenVerifyPinData, callback?: (error: T1CLibException, data: TokenVerifyPinResponse) => void): Promise<TokenVerifyPinResponse> {
        body.pin = ConnectorKeyUtil.encryptData(body.pin, this.connection.cfg.version)
        body.base64Encoded = true;
        return this.connection.post(this.baseUrl, this.tokenApp(Aventra.VERIFY_PIN, true), body, undefined, undefined, callback);
    }

    public resetPin(body: TokenResetPinData, callback?: (error: T1CLibException, data: TokenResetPinResponse) => void): Promise<TokenResetPinResponse> {
        body.pin = ConnectorKeyUtil.encryptData(body.pin, this.connection.cfg.version)
        body.base64Encoded = true;
        // @ts-ignore
        body.puk = ConnectorKeyUtil.encryptData(body.puk)
        return this.connection.post(this.baseUrl, this.tokenApp(Aventra.RESET_PIN, true), body, undefined, undefined, callback);
    }

    public allAlgoRefs(callback?: (error: T1CLibException, data: TokenAlgorithmReferencesResponse) => void): Promise<TokenAlgorithmReferencesResponse> {
        return this.connection.get(this.baseUrl, this.tokenApp(Aventra.SUPPORTED_ALGOS, true), undefined, undefined, callback);
    }

    public allCerts( filters?: string[] | Options, callback?: (error: T1CLibException, data: TokenAllCertsResponse) => void): Promise<TokenAllCertsResponse> {
        return this.connection.get(this.baseUrl, this.tokenApp(Aventra.ALL_CERTIFICATES, true), filters, undefined, callback).then((res: TokenAllCertsResponse | TokenAllCertsExtendedResponse) => {
             if (semver.lt(semver.coerce(this.connection.cfg.version).version, '3.6.0')) {
                return CertParser.processTokenAllCertificates(<TokenAllCertsResponse>res, callback)
            } else {
                return CertParser.processTokenAllCertificates36(<TokenAllCertsExtendedResponse>res, callback)
            }
        }).catch(error => {
            return ResponseHandler.error(error, callback);
        });
    }

    public authenticate(body: TokenAuthenticateOrSignData, callback?: (error: T1CLibException, data: TokenAuthenticateResponse) => void): Promise<TokenAuthenticateResponse> {
        body.algorithm = body.algorithm.toLowerCase();
        body.pin = ConnectorKeyUtil.encryptData(body.pin, this.connection.cfg.version)
        body.base64Encoded = true;
        return this.connection.post(this.baseUrl, this.tokenApp(Aventra.AUTHENTICATE, true), body, undefined, undefined, callback);
    }

    public sign(body: TokenAuthenticateOrSignData, bulk?: boolean, callback?: (error: T1CLibException, data: TokenSignResponse) => void): Promise<TokenSignResponse> {
        if (body.algorithm) {
            body.algorithm = body.algorithm.toLowerCase();
        }
        body.pin = ConnectorKeyUtil.encryptData(body.pin, this.connection.cfg.version)
        body.base64Encoded = true;
        return this.connection.post(this.baseUrl, this.tokenApp(Aventra.SIGN_DATA, true), body,  this.getBulkSignQueryParams(bulk), undefined, callback);
    }

    protected getCertificate(certUrl: string, callback?: (error: T1CLibException, data: TokenCertificateResponse) => void): Promise<TokenCertificateResponse> {
        return this.connection.get(this.baseUrl, this.tokenApp(certUrl, true), undefined,undefined, callback).then((res: TokenCertificateResponse | TokenCertificateExtendedResponse) => {
            if (semver.lt(semver.coerce(this.connection.cfg.version).version, '3.6.0')) {
                return CertParser.processTokenCertificate(<TokenCertificateResponse>res, callback)
            } else {
                return CertParser.processTokenCertificate36(<TokenCertificateExtendedResponse>res, callback)
            }
        }).catch(error => {
            return ResponseHandler.error(error, callback);
        });
    }

    protected getCertificateExtended(certUrl: string, callback?: (error: T1CLibException, data: TokenCertificateExtendedResponse) => void): Promise<TokenCertificateExtendedResponse> {
        return this.connection.get(this.baseUrl, this.tokenApp(certUrl, true), undefined,undefined, callback).then((res: TokenCertificateExtendedResponse) => {
            return CertParser.processExtendedTokenCertificate(res, callback)
        }).catch(error => {
            return ResponseHandler.error(error, callback);
        });
    }

    public tokenData(callback?: (error: T1CLibException, data: TokenInfoResponse) => void): Promise<TokenInfoResponse> {
        return this.connection.get(this.baseUrl, this.tokenApp(Aventra.INFO, true), undefined, undefined, callback);
    }

    resetBulkPin(callback?: (error: T1CLibException, data: BoolDataResponse) => void): Promise<BoolDataResponse> {
        if (semver.gte(semver.coerce(this.connection.cfg.version).version, '3.5.0')) {
            return this.connection.get(this.baseUrl, this.tokenApp(Aventra.RESET_BULK_PIN, false), undefined, undefined, callback);
        } else {
            // @ts-ignore
            return this.connection.post(this.baseUrl, this.tokenApp(Aventra.RESET_BULK_PIN), null, undefined, undefined, callback);
        }
    }

    // resolves the reader_id in the base URL
    protected tokenApp(path?: string, includeReaderId?: boolean): string {
        let suffix = this.containerUrl;
        suffix += Aventra.PATH_TOKEN_APP
        if (this.reader_id && this.reader_id.length && includeReaderId) {
            suffix += Aventra.PATH_READERS + '/' + this.reader_id;
        }
        if (path && path.length) {
            suffix += path.startsWith('/') ? path : '/' + path;
        }
        return suffix;
    }


     protected getBulkSignQueryParams(bulk?: boolean): any {
        if(bulk) {
            return {bulk: true};
        }
    }


}
