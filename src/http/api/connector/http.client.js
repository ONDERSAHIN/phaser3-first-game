import axios from 'axios'
import {TokenUtils} from '@/utils/token.utils'
import {UNAUTHORIZED} from "http-status-codes";
import {httpEventBus} from "../../event/httpEventBus";
import Qs from "qs";
import store from '@/store'


const paramsSerializer = function (params) {
    return Qs.stringify(params, {indices: false, arrayFormat: 'repeat'})
};

let client = null;

const HttpClient = {
    _401interceptor: null,
    _requestInterceptor:null,

    init(baseUrl) {
        client = axios.create({baseURL: baseUrl, timeout: 60000, paramsSerializer: paramsSerializer});
        this.unmountInterceptors();
        this.mountInterceptors();
    },
    setHeader(fieldName, fieldValue) {
        client.defaults.headers.common[fieldName] = fieldValue;
    },
    setAccessTokenToHeader(token) {
        this.setHeader("Authorization", `Bearer ${token}`)
    },
    setRefreshTokenToHeader(token) {
        this.setHeader("refresh-token", token)
    },
    removeHeader() {
        client.defaults.headers.common = {};
    },
    getClient() {
        return this;
    },
    get(resource, config = {}) {
        return client.get(resource, config)
    },
    post(resource, data, config = {}) {
        return client.post(resource, data, config)
    },
    put(resource, data, config = {}) {
        return client.put(resource, data, config)
    },
    delete(resource, config = {}) {
        return client.delete(resource, config)
    },
     customRequest(config) {
        return client(config)
    },
    new(config) {
        return axios.create(config);
    },

    mountRequestInterceptor(){
        // Add a request interceptor
        this._requestInterceptor = client.interceptors.request.use(function (config) {
            // Do something before request is sent
            if(config.url.match("/api/v1/*")){
                config.headers["Authorization"] = `Bearer ${store.state.authToken}`;
            }
            return config;
        }, function (error) {
            // Do something with request error
            return Promise.reject(error);
        });
    },

    mount401Interceptor() {
        this._401interceptor = client.interceptors.response.use(
            function (response) {
                httpEventBus.httpResponse(response);
                return response
            },
            function (error) {
                const errorResponse = error.response;
                if (isTokenExpired(errorResponse)) {
                    return resetTokenAndReattemptRequest(error)
                }
                return Promise.reject(error)
            }
        )
    },

    unmountRequestInterceptor(){
        client.interceptors.request.eject(this._requestInterceptor);
    },

    unmount401Interceptor() {
        client.interceptors.response.eject(this._401interceptor)
    },

    mountInterceptors(){
        this.mountRequestInterceptor();
        this.mount401Interceptor();
    },

    unmountInterceptors(){
        this.unmountRequestInterceptor();
        this.unmount401Interceptor();
    }

};

function isTokenExpired(errorResponse) {
    return (errorResponse && errorResponse.request && errorResponse.request.status) === UNAUTHORIZED;
}

let isAlreadyFetchingAccessToken = false;
// This is the list of waiting requests that will retry after the JWT refresh complete
let subscribers = [];

async function resetTokenAndReattemptRequest(error) {
    try {
        const {response: errorResponse} = error;
        const refreshToken = TokenUtils.getRefreshToken();
        if (!refreshToken) return Promise.reject(error);
        const retryOriginalRequest = new Promise(resolve => {
            addSubscriber(access_token => {
                errorResponse.config.headers.Authorization = 'Bearer ' + access_token;
                resolve(HttpClient.customRequest(errorResponse.config));
            });
        });
        if (!isAlreadyFetchingAccessToken) {
            isAlreadyFetchingAccessToken = true;
            const newToken = await store.dispatch('refreshToken');
            if (newToken) {
                onAccessTokenFetched(newToken);
            }
            isAlreadyFetchingAccessToken = false;
        }
        return retryOriginalRequest;
    } catch (err) {
        return Promise.reject(err);
    }
}

function onAccessTokenFetched(access_token) {
    // retrying the requests one by one and empty the queue
    subscribers.forEach(callback => callback(access_token));
    subscribers = [];
}

function addSubscriber(callback) {
    subscribers.push(callback);
}

export default HttpClient;

