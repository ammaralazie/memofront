<template>
  <div class="setting">
    <nav class="navSetting">
      <button @click="closeListSetting"><fa icon="times"></fa></button>
    </nav>
    <!-- /nav -->
    <div class="listSetting">
      <ul>
        <li>
          <router-link to="">
            <button @click.prevent="showArchiveContact">
              {{ _trans("archive")+" ("+rchiveConversationsCount+") " }}
            </button>
          </router-link>
        </li>
        <li>
          <router-link to="">
            <button id="mute" @blur="reoveAnhingsSelected">
              {{ _trans("mute") }}
              <div class="listLnag">
                <p @click.prevent="muteSound(true)" id="activation">
                  <span>{{ _trans("activation") }}</span>
                  <fa v-if="mute" icon="check" />
                </p>
                <p @click.prevent="muteSound(false)" id="deactivation">
                  {{ _trans("deactivation") }}
                  <fa v-if="!mute" icon="check" />
                </p>
              </div>
            </button>
          </router-link>
        </li>
        <li>
          <router-link to="">
            <button @click="blockList">
              {{ _trans("blockMenu") }}
            </button>
          </router-link>
        </li>
        <li>
          <router-link to="">
            <button>
              {{ _trans("language") }}
              <div class="listLnag">
                <p @click.prevent="changLang('ar')" id="ar">
                  {{ _trans("arabic") }} <fa v-if="lang == 'ar'" icon="check" />
                </p>
                <p @click.prevent="changLang('en')" id="en">
                  {{ _trans("english") }}
                  <fa v-if="lang == 'en'" icon="check" />
                </p>
              </div>
            </button>
          </router-link>
        </li>
        <li>
          <router-link to="/logout">
            {{ _trans("logout") }}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import * as cookie from "vue-cookies";
export default {
  props: ["trans"],
  data() {
    return {
      lang: cookie.get("lang") || "en",
      l_: this.$store.getters.words,
      mute: JSON.parse(cookie.get("mute")) || false,
      rchiveConversationsCount:this.$store.getters.rchiveConversations.length || 0
    }; /* /return */
  } /* /data */,
  mounted() {
    this.reoveAnhingsSelected();
    this.checkMuteState();
  } /* /mounted */,

  created() {
    this.checkMuteState();
  } /* /created */,

  methods: {
    //this function used to get all bloked user
    blockList() {
      var payload = {
        my_id: cookie.get("user").id,
      };

      this.$emit("showBlockList",true)
      this.$store.dispatch("getBlockList", payload);
      this.$emit("closeListSetting", true);
    } /* /blockList */,

    //this to check mute state
    checkMuteState() {
      this.mute = this.$store.state.mute;
    } /* /checkMuteState */,
    //this function to make sounde is mute or no
    muteSound(x) {
      this.$store.state.mute = x;
      if (cookie.get("mute")) cookie.remove("mute");
      cookie.set("mute", x, "360d");
      this.mute = x;
    } /* /muteSound */,
    //this function to send effetc to home component you can display archive component
    showArchiveContact() {
      if (this.$store.state.checkArchive == false) {
        this.$store.state.checkArchive = true;
        this.$emit("showArchiveContact", true);
      } else if (this.$store.state.checkArchive == true) {
        this.$store.state.checkArchive = false;
        this.$emit("showArchiveContact", false);
      } /* end of if  */
      this.$emit("closeListSetting", true);
    } /* /showArchiveContact */,

    closeListSetting() {
      this.$emit("closeListSetting", true);
    } /* /closeListSetting */,
    //this function to change langune
    changLang(lg) {
      window.location.reload(true);
      document.body.style.transition = "all .3s ease";
      if (cookie.get("lang")) {
        cookie.remove("lang");
      } /* end of if */

      var serachBar = document.getElementsByClassName("serachBar")[0];

      var wepper = null;
      if (cookie.get("sndRcvId"))
        wepper = document.querySelector(
          "div[chat_id=" + JSON.stringify(cookie.get("sndRcvId").chat_id) + "]"
        );
      document.getElementsByClassName("messageYouCover")[0];

      if (lg === "ar") {
        document.body.style.direction = "rtl";
        serachBar.children[0].style.left = "8%";
        serachBar.children[0].style.right = "";
        serachBar.children[1].style.padding = "0px 6px 0px 40px";
        cookie.set("lang", "ar", "720d");

        if (wepper)
          for (var j = wepper.children.length - 1; j >= 0; j--) {
            if (wepper.children[j].classList[0] == "myMessageCover") {
              wepper.children[j].children[0].style.float = "right";
            } else {
              wepper.children[j].children[0].style.float = "left";
            } /* end of if */
          } /* end of for loop */

        this.lang = "ar";
      } else if (lg == "en") {
        cookie.set("lang", "en", "720d");
        document.body.style.direction = "ltr";
        serachBar.children[0].style.left = "";
        serachBar.children[0].style.right = "8%";
        serachBar.children[1].style.padding = "0px 40px 0px 6px";

        if (wepper)
          for (var i = wepper.children.length - 1; i >= 0; i--) {
            if (wepper.children[i].classList[0] == "myMessageCover") {
              wepper.children[i].children[0].style.float = "left";
            } else {
              wepper.children[i].children[0].style.float = "right";
            } /* end of if */
          } /* end of for loop */

        this.lang = "en";
      } /* end of if */
    } /* /changLang */,
    checkLang() {
      console.log(this.langs);
    } /* checkLang */,
    showSettings() {
      this.$emit("showSettings", true);
    } /* /showSettings */,
    _trans(x) {
      return this.l_[x];
    } /* _trans */,
    reoveAnhingsSelected() {
      window.getSelection().removeAllRanges();
    } /* /reoveAnhingsSelected */,
  } /* /methods */,
  watch: {},
}; /* /export default */
</script>

<style lang="scss" scoped>
</style>