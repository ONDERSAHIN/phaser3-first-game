import Vue from 'vue';
import Vuetify from 'vuetify';
// import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
      options: {
        customProperties: true,
      },
    themes: {
      light: {
        primary: '#e44032',
        secondary: '#d50b4c',
        accent: '#f58113',
        error: '#f44336',
        warning: '#ff9800',
        info: '#03a9f4',
        success: '#00C851'
      },
    },
  },
});
