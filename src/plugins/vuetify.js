import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

const options = {
  breakpoint: { scrollbarWidth: 12 },
  theme: {
    themes: {
      dark: { primary: 'cyan' },
    },
  },
}

export default new Vuetify({
  options
});
