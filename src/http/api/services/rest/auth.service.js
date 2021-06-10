import HttpClient from '../../connector/http.client'
import {TokenUtils} from '@/utils/token.utils'
//import firebase from '../../../../plugins/firebase'
import {OK, ACCEPTED, UNAUTHORIZED} from 'http-status-codes'
import {EventEmitter} from 'events'


const AUTH_TOKEN_PREFIX = "Bearer ";

class NetworkError {
    constructor(errorCode, message) {
        this.message = message;
        this.errorCode = errorCode;
    }
}

class AuthenticationError extends Error {
    constructor(errorCode, message) {
        super(message);
        this.name = this.constructor.name;
        this.message = message;
        this.errorCode = errorCode;
    }
}

class RefreshTokenNotFoundError extends Error {
    constructor(errorCode, message) {
        super(message);
        this.name = this.constructor.name;
        this.message = message;
        this.errorCode = errorCode;
    }
}

class LogOutError extends Error {
    constructor(errorCode, message) {
        super(message);
        this.name = this.constructor.name;
        this.message = message;
        this.errorCode = errorCode;
    }
}

/**
 * @author onder.sahin@meyer.com.tr
 * @type {{logOutOnFirebase: AuthService.logOutOnFirebase, logout(): void, loginOnFirebase: AuthService.loginOnFirebase, login: AuthService.login, refreshToken: (function(): Promise<any>)}}
 */

const AuthService = {

    /**
     * Login the user and store the access token to TokenService.
     * @returns access_token
     * @throws AuthenticationError
     **/
    login: async function (referenceToken) {
        // TODO login method should be promise
        try {
            const {headers, status, data:{data:{accessToken,refreshToken,error}}} = await HttpClient.customRequest({
                method: 'post',
                url: "/auth/player",
                data: {
                    referenceToken
                }
            });
            //TODO: fix refreshToken
            if (status === OK && accessToken && refreshToken) {
                //let accessToken = headers.authorization.substring(AUTH_TOKEN_PREFIX.length);
                //TokenUtils.saveToken(accessToken.substring(AUTH_TOKEN_PREFIX.length));
                //TokenUtils.saveRefreshToken(refreshToken);
                //HttpClient.unmount401Interceptor();
                HttpClient.mount401Interceptor();
                return {accessToken: accessToken.substring(AUTH_TOKEN_PREFIX.length), refreshToken: refreshToken};
                // return {accessToken: accessToken, refreshToken: refreshToken};
            }
            if (status === OK && error) {
                console.log(error);
            }

        } catch (error) {
            if (error.message === "Network Error") throw new NetworkError(-501, "Cannot connect to the server");
            let message = (error && error.response && error.response.status) || error.message || "AUTH ERROR";
            let errorCode = (error && error.response && error.response.status) || error.errorCode || -50000;
            throw new AuthenticationError(errorCode, message)
        }
        return {accessToken: null, data: null};
    },

    loginOnFirebase: async function (authToken) {
        // await firebase.auth().signInWithCustomToken(authToken).catch(function (error) {
        //     throw new AuthenticationError(error.code, error.message);
        // });
        return true;
    },

    /**
     * @returns {Promise<boolean>}
     */
    logOutOnFirebase: async function () {
        let result = false;
        // await firebase.auth().signOut().then(function () {
        //     result = true;
        // }).catch(function (error) {
        //     throw new LogOutError(error.code, error.message);
        // });
        return result;
    },

    /**
     * Refresh the access token.
     **/
    refreshToken: function () {
        return new Promise(async function (resolve, reject) {
            const refreshToken = TokenUtils.getRefreshToken() || null;
            if (refreshToken) {

                const requestData = {
                    method: 'post',
                    url: "/auth/player/refresh-token",
                    data: {refreshToken}
                };
                try {

                    HttpClient.removeHeader();
                    const {headers, status, data} = await HttpClient.customRequest(requestData);
                    if (status === ACCEPTED) {
                        // if (data.error && data.error.code === INVALID_REFRESH_TOKEN) {
                        //     HttpClient.unmountInterceptors();
                        //     reject(new InvalidRefreshTokenError());
                        // }
                        // let accessToken = data.data && data.data.substring(AUTH_TOKEN_PREFIX.length) || null;
                        let accessToken = data.data || null;
                        if (accessToken) {
                            await TokenUtils.saveToken(accessToken.substring(AUTH_TOKEN_PREFIX.length));
                            resolve(accessToken);
                        }
                    }
                    // if (status === UNAUTHORIZED) {
                    //     reject(new AuthenticationError(null, "No refresh token found in app"));
                    // }
                } catch (error) {
                    console.log(error);
                    reject(new AuthenticationError(error.response.status, error.response.data));
                }
            } else {
                reject(new AuthenticationError(null, "Refresh token is removed"));
            }
        })
    },

    /**
     * Logout the current user by removing the token from storage.
     **/
    logout: function () {
        // Remove the token and remove Authorization header from Http Client as well
        return new Promise(async function (resolve, reject) {
            const refreshToken = TokenUtils.getRefreshToken() || null;
            if (refreshToken) {
                try {
                    const {status} = await HttpClient.customRequest({
                        method: 'post',
                        url: "/auth/logout",
                        data: {
                            refreshToken
                        }
                    });
                    HttpClient.removeHeader();
                    HttpClient.unmount401Interceptor();
                    if (status === ACCEPTED) resolve(true)
                } catch (e) {
                    reject(new LogOutError(null, "Log out process is not success"));
                }
            }
        })
    },

}

export default AuthService

export {AuthService, AuthenticationError, LogOutError, RefreshTokenNotFoundError, NetworkError}