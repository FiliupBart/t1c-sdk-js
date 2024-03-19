import {T1CLibException} from '../../../../../core/exceptions/CoreExceptions';
import {
    TokenInfoResponse,
    BoolDataResponse, TokenAllCertsExtendedResponse, TokenAllCertsResponse, TokenCertificateExtendedResponse,
    TokenCertificateResponse, TokenValidateSignatureRequest, TokenValidateSignatureResponse
} from "../../../../../core/service/CoreModel";
import {TokenAuthenticateOrSignData} from "../../TokenCard";
import {TokenVerifyPinData, TokenResetPinData} from "../../TokenCard";
import {
    TokenAuthenticateResponse, TokenSignResponse,
    TokenVerifyPinResponse, TokenAlgorithmReferencesResponse, TokenResetPinResponse
} from "../../eid/generic/EidGenericModel";
import {Options} from "../../../Card";


export interface AbstractAventra {
    allCerts( filters?: string[] | Options, callback?: (error: T1CLibException, data: TokenAllCertsResponse) => void): Promise<TokenAllCertsResponse>;
    tokenData(callback?: (error: T1CLibException, data: TokenInfoResponse) => void): Promise<TokenInfoResponse>;
    rootCertificate( callback?: (error: T1CLibException, data: TokenCertificateResponse) => void): Promise<TokenCertificateResponse>;
    authenticationCertificate( callback?: (error: T1CLibException, data: TokenCertificateResponse) => void): Promise<TokenCertificateResponse>;
    nonRepudiationCertificate( callback?: (error: T1CLibException, data: TokenCertificateResponse) => void): Promise<TokenCertificateResponse>;
    encryptionCertificate( callback?: (error: T1CLibException, data: TokenCertificateResponse) => void): Promise<TokenCertificateResponse>;
    issuerCertificate( callback?: (error: T1CLibException, data: TokenCertificateResponse) => void): Promise<TokenCertificateResponse>

    allCertsExtended( filters?: string[] | Options, callback?: (error: T1CLibException, data: TokenAllCertsExtendedResponse) => void): Promise<TokenAllCertsExtendedResponse>;
    rootCertificateExtended( callback?: (error: T1CLibException, data: TokenCertificateExtendedResponse) => void): Promise<TokenCertificateExtendedResponse>;
    authenticationCertificateExtended( callback?: (error: T1CLibException, data: TokenCertificateExtendedResponse) => void): Promise<TokenCertificateExtendedResponse>;
    nonRepudiationCertificateExtended( callback?: (error: T1CLibException, data: TokenCertificateExtendedResponse) => void): Promise<TokenCertificateExtendedResponse>;
    encryptionCertificateExtended( callback?: (error: T1CLibException, data: TokenCertificateExtendedResponse) => void): Promise<TokenCertificateExtendedResponse>;
    issuerCertificateExtended(  callback?: (error: T1CLibException, data: TokenCertificateExtendedResponse) => void): Promise<TokenCertificateExtendedResponse>;

    validateSignature(body: TokenValidateSignatureRequest, callback?: (error: T1CLibException, data: TokenValidateSignatureResponse) => void): Promise<TokenValidateSignatureResponse>;

    verifyPin(body: TokenVerifyPinData, callback?: (error: T1CLibException, data: TokenVerifyPinResponse) => void): Promise<TokenVerifyPinResponse>;
    authenticate(body: TokenAuthenticateOrSignData, callback?: (error: T1CLibException, data: TokenAuthenticateResponse) => void): Promise<TokenAuthenticateResponse>;
    sign(body: TokenAuthenticateOrSignData, bulk?: boolean, callback?: (error: T1CLibException, data: TokenSignResponse) => void): Promise<TokenSignResponse>;
    sign_raw(body: TokenAuthenticateOrSignData, bulk?: boolean, callback?: (error: T1CLibException, data: TokenSignResponse) => void): Promise<TokenSignResponse>;
    resetPin(body: TokenResetPinData, callback?: (error: T1CLibException, data: TokenResetPinResponse) => void): Promise<TokenResetPinResponse>
    allAlgoRefs(callback?: (error: T1CLibException, data: TokenAlgorithmReferencesResponse) => void): Promise<TokenAlgorithmReferencesResponse>
    resetBulkPin(callback?: (error: T1CLibException, data: BoolDataResponse) => void): Promise<BoolDataResponse>;
}
