import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '../store'

Vue.use(VueRouter)


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: (to, from, savedPosition) => {
    if (to.hash) return { selector: to.hash }
    if (savedPosition) return savedPosition

    return { x: 0, y: 0 }
  },
  routes
})

const LEGAL_QUERY_PARAM = "at";

function getLegalQueryParameterValue(){
  let queryString = new URLSearchParams(window.location.search);
  let value = null;
  if (queryString.has(LEGAL_QUERY_PARAM)){
    value = queryString.get(LEGAL_QUERY_PARAM);
  }
  store.dispatch("setReferenceToken",value);
  return value;
}

router.beforeEach((to, from, next) => {

  if(from.path === "/"){
    if(to.query.at){
      store.dispatch("setAccessToken",null)
      store.dispatch("setReferenceToken",to.query.at);
    }
  }
  const isPublic = to.matched.some(record => record.meta.isPublic);
  const onlyWhenLoggedOut = to.matched.some(record => record.meta.onlyWhenLoggedOut);
  const loggedIn = !!store.state.authToken;


  if (!isPublic && !loggedIn) {
    return next({
      path:'/login',
      //query: {redirect: to.fullPath}  // Store the full path to redirect the user to after login
    });
  }

  // Do not allow user to visit login page or register page if they are logged in
  if (loggedIn && onlyWhenLoggedOut) {
    // TODO
    return next('/')
  }
  next();
});

export default router
