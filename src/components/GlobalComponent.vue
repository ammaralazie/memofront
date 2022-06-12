
// this component to check vue url
<template>
  <router-view />
</template>
<script>
import * as _ from "../lang/lang";
import * as cookie from "vue-cookies";
export default {
  data() {
    return {
      lang: cookie.get("lang") || "en",
    }; /* end of retern */
  } /* end of data */,
  created() {
    this.selectWords();
  } /* /created */,


  methods: {
    selectWords() {
      for (var lg = 0; lg < _.default.length; lg++) {
        if (this.lang in _.default[lg]) {
          if (this.lang == "ar") {
            this.$store.state.words = _.default[lg].ar;
          } else if (this.lang == "en") {
            this.$store.state.words = _.default[lg].en;
          } /* end of if */
        } /* end of if  */
      } /* end of for loop */
    } /* /selectWords */,
  } /* /methods */,
  watch: {
    $route(to) {
      document.title = to.meta.title;
      var link = null;
      link = document.querySelector("[rel='icon']");
      if (!link) {
        document.head.innerHTML += '<link rel="icon" type="image/x-icon">';
        link = document.querySelector("[rel='icon']");
      }
      link.setAttribute("href", to.meta.icon);
    },
  },
};
</script>