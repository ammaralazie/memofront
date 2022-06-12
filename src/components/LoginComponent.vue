<template>
  <div class="loginn">
    <div class="containerrrr">
      <div class="memoLogo">
        <div class="navQr">
          <div class="singUpQr">
            <router-link to="/">{{ _trans("signup") }}</router-link>
          </div>
        </div>
        <!-- /navQr -->
        <div class="memoLogoQr">
          <img src="../assets/uploads/image/memoDark.png" alt="" />
        </div>
        <!-- /memoLogoQr -->

        <div class="connetYourDivece">
          <a href="#qrCode"> {{ _trans("note5") }}</a>
        </div>
        <!-- /connetYourDivece -->

        <div class="arrowDown">
          <a href="#qrCode"><fa icon="arrow-down"></fa></a>
        </div>
      </div>
      <!-- /memoLogo -->
      <div class="qrCode" id="qrCode">
        <div class="toConnect">
          {{ _trans("note3") }}
        </div>
        <div class="notesQRcode">
          <div>
            <div></div>
            <p>{{ " " + _trans("note1") }}</p>
          </div>
          <div>
            <div></div>
            <p>{{ " " + _trans("note2") }}</p>
          </div>
          <div>
            <div></div>
            <p>{{ " " + _trans("note4") }}</p>
          </div>
        </div>
        <qrcode-vue v-if="qrCode" :value="qrCode" :size="size" level="S" />
      </div>
      <!-- /qrCode -->

      <div class="footer">
        <div class="containerrw">
          <div class="contactLeader">
            <p>
              <span
                ><span><fa icon="phone"></fa></span> +964 770 792 7259</span
              >
            </p>
            <p>
              <span
                ><span><fa icon="envelope"></fa></span>
                maalialkhaircompany@gmail.com</span
              >
            </p>
            <p>
              <span
                ><span><fa icon="map"></fa></span> Capital Road, Kirkuk,
                Iraq</span
              >
            </p>
          </div>
          <!-- /contactLeader -->
          <div class="leaderLogo">
            <div class="memoLogoQr">
              <img src="../assets/uploads/image/memoDark.png" alt="" />
            </div>
            <!-- /memoLogoQr -->
          </div>
          <!-- /leaderLogo -->
        </div>
        <!-- /containerrw -->
      </div>
      <!-- /footer -->
    </div>
    <!-- /container -->
  </div>
</template>

<script>
import * as cookie from "vue-cookies";
export default {
  data() {
    return {
      size: 200,
      l_: this.$store.getters.words,
      io: this.$store.state.socket || {},
      qrCode: null,
      id: null,
      browserName:null
    }; /* end of return */
  } /* /end of data */,
  mounted() {
    this.sendReqest();
    this.fetchQrCode();
    this.loginResult();
    //this.responsesQrCode();
  } /* /mounted */,

  created() {
    this.GetComputerName();
  },/* /created */
  methods: {
    //this function send request for server tell him ineew key for login
    sendReqest() {
      this.io.on("connect", () => {
        this.io.emit("qrLogin911",{
          id: this.io.id,
          device:this.browserName
        });
        this.id = this.io.id;
      }); /* connect */
    } /* /sendReqest */,

    //this function used for take qr code from server
    fetchQrCode() {
      this.io.on("takeQrKey", (data) => {
        this.qrCode = data;
      }); /* /takeQrKey */
    } /* /fetchQrCode */,

    //this function used to get user from server
    loginResult() {
      this.io.on("getIdForUser", (data) => {
        if (data.res.user) {
          if (cookie.get("user")) cookie.remove("user");
          this.io.emit("removeId", {id:this.id,key:data.key});
          this.$store.state.myProfile = null;
          this.$store.state.myProfile = data.res;
        } /* end of if */
      }); /* /loginResult */
    } /* /loginResult */,

    GetComputerName() {
      try {
        let userAgent = navigator.userAgent;
        console.log("userAgent : ",userAgent)
        if (userAgent.match(/chrome|chromium|crios/i)) {
          this.browserName = "chrome";
        } else if (userAgent.match(/firefox|fxios/i)) {
          this.browserName = "firefox";
        } else if (userAgent.match(/safari/i)) {
          this.browserName = "safari";
        } else if (userAgent.match(/opr\//i)) {
          this.browserName = "opera";
        } else if (userAgent.match(/edg/i)) {
          this.browserName = "edge";
        } else {
          this.browserName = "No browser detection";
        }
      } catch (e) {
        console.log(e);
      }
    },

    _trans(x) {
      return this.l_[x];
    } /* _trans */,
  } /* end of methods */,
  computed: {
    getMyProfilee() {
      if (this.$store.getters.myProfile) return this.$store.getters.myProfile;
      return null;
    } /* /getMyProfile */,
  } /* /compted */,
  watch: {
    getMyProfilee(x) {
      if (x) {
        cookie.set("user", x.user);
        this.$router.push({ name: "home" });
      }
    } /* /getMyProfilee */,
  } /* end of watch */,
};
</script>

<style lang="scss" scoped>
.custom-select {
  width: 190px;
  background: none;
  margin: 2px 0px 15px 0px;
} /* /custom-select */
</style>