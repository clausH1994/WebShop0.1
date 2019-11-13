import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
  theme: {
    themes: {
      light:{
          primary: '#333333',
          secondary: '#2b2b2b',
          white:'#ffffff',
          orange:'#35FF12',
          darkgrey:'#707070',
          complete:'#2bfc83',
          inprogress:'#ffb936',
          incomplete:'#ff1212',
          lightgrey:'#cacaca',
      }
    }
  }
});
