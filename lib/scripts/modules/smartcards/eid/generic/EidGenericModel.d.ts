import { T1CLibException } from '../../../../core/exceptions/CoreExceptions';
import { CertificateResponse, DataArrayResponse, DataObjectResponse, T1CCertificate } from '../../../../core/service/CoreModel';
import { AuthenticateOrSignData, Options } from "../../TokenCard";
import { VerifyPinData } from "../../TokenCard";
export interface AbstractEidGeneric {
    getModuleDescription(module: string, callback?: (error: T1CLibException, data: DataObjectResponse) => void): Promise<DataObjectResponse>;
    allData(module: string, filters: string[] | Options, callback?: (error: T1CLibException, data: AllDataResponse) => void): Promise<AllDataResponse>;
    allCerts(module: string, filters: string[] | Options, callback?: (error: T1CLibException, data: AllCertsResponse) => void): Promise<AllCertsResponse>;
    biometric(module: string, callback?: (error: T1CLibException, data: BiometricDataResponse) => void): Promise<BiometricDataResponse>;
    tokenData(module: string, callback?: (error: T1CLibException, data: TokenDataResponse) => void): Promise<TokenDataResponse>;
    address(module: string, callback?: (error: T1CLibException, data: AddressResponse) => void): Promise<AddressResponse>;
    picture(module: string, callback?: (error: T1CLibException, data: PictureResponse) => void): Promise<PictureResponse>;
    rootCertificate(module: string, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    intermediateCertificates(module: string, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    authenticationCertificate(module: string, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    nonRepudiationCertificate(module: string, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    encryptionCertificate(module: string, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    verifyPin(module: string, body: VerifyPinData, callback?: (error: T1CLibException, data: VerifyPinResponse) => void): Promise<VerifyPinResponse>;
    authenticate(module: string, body: AuthenticateOrSignData, callback?: (error: T1CLibException, data: AuthenticateResponse) => void): Promise<AuthenticateResponse>;
    sign(module: string, body: AuthenticateOrSignData, callback?: (error: T1CLibException, data: SignResponse) => void): Promise<SignResponse>;
    allAlgoRefs(module: string, callback?: (error: T1CLibException, data: DataArrayResponse) => void): Promise<DataArrayResponse>;
}
export declare class ModuleDescriptionResponse extends DataObjectResponse {
    data: ModuleDescription;
    success: boolean;
    constructor(data: ModuleDescription, success: boolean);
}
export declare class AddressResponse extends DataObjectResponse {
    data: AddressData;
    success: boolean;
    constructor(data: AddressData, success: boolean);
}
export declare class PictureResponse extends DataObjectResponse {
    data: PictureData;
    success: boolean;
    constructor(data: PictureData, success: boolean);
}
export declare class VerifyPinResponse extends DataObjectResponse {
    data: VerifyPinResponseData;
    success: boolean;
    constructor(data: VerifyPinResponseData, success: boolean);
}
export declare class VerifyPinResponseData {
    verified: boolean;
    constructor(verified: boolean);
}
export declare class SignResponse extends DataObjectResponse {
    data: SignResponseData;
    success: boolean;
    constructor(data: SignResponseData, success: boolean);
}
export declare class SignResponseData {
    data?: string | undefined;
    constructor(data?: string | undefined);
}
export declare class AuthenticateResponse extends DataObjectResponse {
    data: AuthenticateResponseData;
    success: boolean;
    constructor(data: AuthenticateResponseData, success: boolean);
}
export declare class AuthenticateResponseData {
    data?: string | undefined;
    constructor(data?: string | undefined);
}
export declare class ModuleDescription {
    desc: string;
    constructor(desc: string);
}
export declare class AddressData {
    municipality: string;
    rawData: string;
    signature: string;
    streetAndNumber: string;
    version: number;
    zipcode: string;
    constructor(municipality: string, rawData: string, signature: string, streetAndNumber: string, version: number, zipcode: string);
}
export declare class AllCertsResponse extends DataObjectResponse {
    data: AllCerts;
    success: boolean;
    constructor(data: AllCerts, success: boolean);
}
export declare class AllCerts {
    authenticationCertificate?: T1CCertificate | undefined;
    citizenCertificate?: T1CCertificate | undefined;
    nonRepudiationCertificate?: T1CCertificate | undefined;
    rootCertificate?: T1CCertificate | undefined;
    encryptionCertificate?: T1CCertificate | undefined;
    constructor(authenticationCertificate?: T1CCertificate | undefined, citizenCertificate?: T1CCertificate | undefined, nonRepudiationCertificate?: T1CCertificate | undefined, rootCertificate?: T1CCertificate | undefined, encryptionCertificate?: T1CCertificate | undefined);
}
export declare class AllDataResponse extends DataObjectResponse {
    data: AllData;
    success: boolean;
    constructor(data: AllData, success: boolean);
}
export declare class AllData {
    picture?: PictureData | undefined;
    biometric?: BiometricData | undefined;
    address?: AddressData | undefined;
    constructor(picture?: PictureData | undefined, biometric?: BiometricData | undefined, address?: AddressData | undefined);
}
export declare class PictureData {
    picture?: string | undefined;
    signature?: string | undefined;
    width?: number | undefined;
    height?: number | undefined;
    constructor(picture?: string | undefined, signature?: string | undefined, width?: number | undefined, height?: number | undefined);
}
export declare class TokenData {
    rawData?: string | undefined;
    version?: string | undefined;
    serialNumber?: string | undefined;
    label?: string | undefined;
    prnGeneration?: string | undefined;
    eidCompliant?: string | undefined;
    graphicalPersoVersion?: string | undefined;
    versionRfu?: string | undefined;
    electricalPersoVersion?: string | undefined;
    electricalPersoInterfaceVersion?: string | undefined;
    changeCounter?: number | undefined;
    activated?: string | undefined;
    constructor(rawData?: string | undefined, version?: string | undefined, serialNumber?: string | undefined, label?: string | undefined, prnGeneration?: string | undefined, eidCompliant?: string | undefined, graphicalPersoVersion?: string | undefined, versionRfu?: string | undefined, electricalPersoVersion?: string | undefined, electricalPersoInterfaceVersion?: string | undefined, changeCounter?: number | undefined, activated?: string | undefined);
}
export declare class TokenDataResponse extends DataObjectResponse {
    data: TokenData;
    success: boolean;
    constructor(data: TokenData, success: boolean);
}
export declare class BiometricData {
    birthDate: string;
    birthLocation: string;
    cardDeliveryMunicipality: string;
    cardNumber: string;
    cardValidityDateBegin: string;
    cardValidityDateEnd: string;
    chipNumber: string;
    documentType: string;
    firstNames: string;
    name: string;
    nationalNumber: string;
    nationality: string;
    nobleCondition: string;
    pictureHash: string;
    rawData: string;
    sex: string;
    signature: string;
    specialStatus: string;
    thirdName: string;
    version: number;
    constructor(birthDate: string, birthLocation: string, cardDeliveryMunicipality: string, cardNumber: string, cardValidityDateBegin: string, cardValidityDateEnd: string, chipNumber: string, documentType: string, firstNames: string, name: string, nationalNumber: string, nationality: string, nobleCondition: string, pictureHash: string, rawData: string, sex: string, signature: string, specialStatus: string, thirdName: string, version: number);
}
export declare class BiometricDataResponse extends DataObjectResponse {
    data: BiometricData;
    success: boolean;
    constructor(data: BiometricData, success: boolean);
}