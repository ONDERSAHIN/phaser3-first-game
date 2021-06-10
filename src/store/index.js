import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import createPersistedState from 'vuex-persistedstate';
import SecureLS from 'secure-ls'
import {
  AuthenticationError,
  AuthService,
  LogOutError,
  RefreshTokenNotFoundError
} from "@/http/api/services/rest/auth.service";
// import {httpEventBus} from "../http/event/httpEventBus";
const ENCRYPTION_SECRET_KEY = 'pmaktif-game-9f19bd57-0634-41fd-b1bd-58b25a2ce427';
const secureLocalStorage = new SecureLS({isCompression: false, encryptionSecret: ENCRYPTION_SECRET_KEY});
// plugins: [
//     createPersistedState({
//         key: '73781604-4187-443c-b276-5257b8308580',
//         storage: {
//             getItem: key => secureLocalStorage.get(key),
//             // Please see https://github.com/js-cookie/js-cookie#json, on how to handle JSON.
//             setItem: (key, value) =>
//                 secureLocalStorage.set(key, value),
//             removeItem: key => secureLocalStorage.remove(key),
//         },
//     }),
// ],

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    authToken: null,
    refreshToken: null,
    referenceToken: null,
    userId: null,
    authUserFirstName: null,
    authUserLastName: null,
    authUserImageUrl: null,
    isUserNotValid: false,
    isAuthenticating: false,
    authenticationErrorCode: '',
    authenticationError: '',
    splash: true,
    language: 'tr',
    sessionId: null,
    currentGame: null,
    appVersion: process.env.VUE_APP_VERSION,
    sessionScore: 0,
    monthlyScore: 0,
    eventEmitter: null
  },

  plugins: [
    createPersistedState({
      key: 'd865a03d-7d46-4e71-9542-8defa48fe189',
      storage: {
        getItem: key => secureLocalStorage.get(key),
        // Please see https://github.com/js-cookie/js-cookie#json, on how to handle JSON.
        setItem: (key, value) =>
            secureLocalStorage.set(key, value),
        removeItem: key => secureLocalStorage.remove(key),
      },
    }),
  ],

  mutations: {
    loginSuccess(state, {accessToken, refreshToken, firstName, lastName}) {
      state.isAuthenticating = false;
      state.authToken = accessToken || null;
      state.refreshToken = refreshToken || null;
      state.authUserFirstName = firstName;
      state.authUserLastName = lastName;
    },
    refreshSuccess(state, accessToken) {
      state.authToken = accessToken || null;
    },
    loginError(state, {errorCode, errorMessage}) {
      state.isAuthenticating = false;
      state.authenticationErrorCode = errorCode;
      state.authenticationError = errorMessage
    },
    clearAuthData(state) {
      state.authToken = null;
    },
    userNotValid(state) {
      state.isUserNotValid = true
    },
    authenticating(state, status) {
      state.isAuthenticating = status;
    },
    setAccessToken(state, accessToken) {
      state.authToken = accessToken;
    },
    setReferenceToken(state, referenceToken) {
      state.referenceToken = referenceToken;
    },
    restartApplication(state) {
      state.authToken = null;
      state.refreshToken = null;
      window.localStorage.clear();
      window.location.reload();
    },
    setSessionId(state, sessionId) {
      state.sessionId = sessionId;
    },
    setCurrentGame(state, currentGame) {
      state.currentGame = currentGame;
    },
    setSessionScore(state, sessionScore) {
      state.sessionScore = sessionScore;
    },
    setMonthlyScore(state, monthlyScore) {
      state.monthlyScore = monthlyScore;
    },
    setEventEmitter(state, eventEmitter) {
      state.eventEmitter = eventEmitter;
    }

  },
  actions: {
    async refreshToken({commit, dispatch, state}) {
      try {
        commit('clearAuthData');
        return await AuthService.refreshToken();
      } catch (e) {
        if (e instanceof RefreshTokenNotFoundError) {
          await router.replace({name: "login"})
        }
      }
    },
    async logout({commit}) {
      try {
        commit('clearAuthData');
        commit('authenticating', false);
        const isLogout = await AuthService.logout();
        localStorage.clear();
        // secureLocalStorage.clear();
      } catch (e) {
        if (e instanceof LogOutError) {
          //TODO
        }
      } finally {
        window.location.reload();
      }
    },
    async login({commit, dispatch, state}, authData) {
      let isLoggedIn = false;
      try {
        const {accessToken, refreshToken} = await AuthService.login(authData.referenceToken);
        isLoggedIn = accessToken && refreshToken;
        if (isLoggedIn) {
          commit('loginSuccess', {accessToken, refreshToken});
        } else {
          //router.go({name: 'login'})
          console.err("Can not Auth");
        }
      } catch (e) {
        if (e instanceof AuthenticationError) commit('loginError', {
          errorCode: e.errorCode,
          errorMessage: e.message
        });
      }
      return isLoggedIn;
    },
    setAccessToken({commit, dispatch, state}, accessToken) {
      commit('setAccessToken', accessToken);
    },
    setReferenceToken({commit, dispatch, state}, referenceToken) {
      commit('setReferenceToken', referenceToken);
    },
    restartApplication({commit, dispatch, state}) {
      commit('restartApplication')
    },
    setSessionId({commit, dispatch, state}, sessionId) {
      commit('setSessionId', sessionId);
    },
    setCurrentGame({commit, dispatch, state}, currentGame) {
      commit('setCurrentGame', currentGame);
    },
    setSessionScore({commit, dispatch, state}, sessionScore) {
      commit('setSessionScore', sessionScore);
    },
    setMonthlyScore({commit, dispatch, state}, monthlyScore) {
      commit('setMonthlyScore', monthlyScore);
    },
    setEventEmitter({commit, dispatch, state}, eventEmitter) {
      commit('setEventEmitter',eventEmitter);
    }
  },
  getters: {
    isAuthenticated(state) {
      return state.authToken !== null
    },
    isUserNotValid(state) {
      return state.isUserNotValid;
    },
    isAuthenticating(state) {
      return state.isAuthenticating;
    },
    isSessionExist(state) {
      return !!state.sessionId;
    },
    referenceToken(state) {
      return state.referenceToken;
    },
    getSessionId(state) {
      return state.sessionId;
    },
    isCurrentGameExist(state) {
      return !!state.currentGame;
    },
    getCurrentGame(state) {
      return state.currentGame;
    },
    getSessionScore(state) {
      return state.sessionScore;
    },
    getMonthlyScore(state) {
      return state.monthlyScore;
    },
    getEventEmitter(state){
      return state.eventEmitter;
    }
  }
})


