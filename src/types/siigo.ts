export interface SiigoSDKOptions {
    /**
     * The username
     */
    username: string;
    /**
     * The accessKey
     */
    access_key: string;
}


export interface Token {
    access_token: string;
    expires_in: number;
    expires_at?: number;
    token_type: string;
    scope: string;
}