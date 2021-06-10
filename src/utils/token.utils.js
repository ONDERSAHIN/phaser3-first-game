/**
 *
 * token.utils
 * @author : ONDER SAHIN
 * @year : 2020
 * @project : noonie-backoffice-ui
 *
 */
import store from '../store'

const TOKEN_KEY = process.env.VUE_APP_ACCESS_TOKEN_KEY;
const REFRESH_TOKEN_KEY = process.env.VUE_APP_REFRESH_TOKEN_KEY;

/**
 * @description StoreHelper class is the facade helper for the localStorage API
 * @author onder.sahin@globme.com.tr
 */
const TokenUtils = {

    getToken() {
        return store.state.authToken;
    },

    saveToken(accessToken) {
        if(!accessToken) throw new Error("Access Token Parameter is required !");
        store.dispatch('setAccessToken',accessToken)
    },

    removeToken() {
        throw new Error("Unsupported operation !");
    },

    getRefreshToken() {
        return store.state.refreshToken;
    },

    saveRefreshToken(refreshToken) {
        localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    },

    removeRefreshToken() {
        localStorage.removeItem(REFRESH_TOKEN_KEY);
    }
};

export {TokenUtils}
