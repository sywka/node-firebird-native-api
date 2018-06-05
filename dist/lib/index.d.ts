import { Master } from './cloop-gen';
/** Gets the default platform Firebird client library filename. */
export declare function getDefaultLibraryFilename(): string;
export declare const getMaster: (library: string) => Master;
export declare const disposeMaster: (master: Master) => boolean;
export * from './cloop-gen';
