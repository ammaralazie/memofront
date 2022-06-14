<template>
  <div class="coverCall">
    <audio src="" autoplay></audio>
    <div class="blurEffect"></div>
    <!-- /blurEffect -->
    <div class="callContainer">
      <div class="callContent">
        <div class="callImag">
          <img v-if="!item" src="../assets/uploads/image/default.png" alt="" />
          <img v-if="item" :src="item.user.profile_image" alt="" />
        </div>
        <!-- /callImag -->
        <div class="callType">
          <div class="coverType">
            <div class="blurType"></div>
            <div class="phoneIcon" v-if="item.type.video == false">
              <fa icon="phone" />
            </div>
            <div class="phoneIcon" v-if="item.type.video == true">
              <fa icon="video" />
            </div>
            <!-- /phoneIcon -->
          </div>
          <!-- /coverType -->
          <div v-if="item.user.first_name && item.user.last_name" class="nameItem">
            {{ item.user.first_name + " " + item.user.last_name }}
          </div>
        </div>
        <!-- /callType -->
        <div class="callControll">
          <div class="acceptCall" @click="answer(true)">
            <fa icon="phone" />
          </div>
          <!-- /acceptCall -->
          <div class="rejectCall" @click="answer(false)">
            <fa icon="phone" />
          </div>
          <!-- /rejectCall -->
        </div>
        <!-- /callControll -->
      </div>
      <!-- /callContent -->
    </div>
    <!-- /callContainer -->
  </div>
  <!-- /coverCall -->
</template>
<script>
import ringingMemo from "../assets/uploads/audio/ringingMemo.mp3"
export default {
  props: ["calldat"],
  data() {
    return {
      item: null,
      io: this.$store.state.socket,
      clearTimeOut: null,
      clearInterval: null,
      audioObject: null,
    }; /* /return */
  } /* /data */,
  mounted() {
    this.callTimeOut(true);
    this.closeCallFromSender();
  } /* /mounted */,
  created() {
    this.calldata();
  } /* /created */,
  methods: {

    calldata() {
      //this object for rainging
      this.audioObject = new Audio(ringingMemo)
      this.audioObject.addEventListener('canplaythrough', () => {
        this.audioObject.loop=true
        this.audioObject.play()
      });/* /ringingMemo */
      /* this.clearInterval = setInterval(() => {
        console.log("set intervall is working")

      }, 21000); */

      if (this.calldat) {
        this.item = this.calldat;
        if (this.item.user.profile_image)
          this.item.user.profile_image =
            this.$store.state.imgProfilePath + this.item.user.profile_image;
      } else this.item = null;

    } /* /calldata */,

    answer(x) {
      if (x == true) {
        this.item.peerId = this.$store.state.myPeerId;
        this.item.msg = "Connected";
        this.$router.push({
          path: "/contact",
          query: { snd_id: this.calldat.snd_id, rcv_id: this.calldat.rcv_id, audio: this.calldat.type.audio, video: this.calldat.type.video },
        });
      } else {
        if (this.$store.state.lang == "ar") this.item.msg = "تم رفض الاتصال";
        else if (this.$store.state.lang == "en")
          this.item.msg = "Connection denied";
        this.item.peerId = null;
      }

      this.audioObject.pause();

      clearTimeout(this.clearTimeOut);
      clearInterval(this.clearInterval);
      /* this.audioObject.currentTime = 0; */
      this.$emit("answer", x);
      this.io.emit("recivePeerId", this.item);
      this.callTimeOut(false);
    } /* /nsswer */,

    closeCallFromSender() {
      this.io.on("closeCallFromSender", (data) => {
        if (data) {
          this.audioObject.pause();
          clearTimeout(this.clearTimeOut);
          clearInterval(this.clearInterval);
          this.$emit("answer", false);
        } /* end of if */
      }); /* /closeCallFromSender */
    } /* /closeCallFromSender */,
    
    callTimeOut(timOut) {
      if (timOut == true) {
        this.clearTimeOut = setTimeout(() => {
          this.item.peerId = null;
          if (this.$store.state.lang == "ar")
            this.item.msg = "The call was not answered";
          else if (this.$store.state.lang == "en")
            this.item.msg = "The call was not answered";
          this.io.emit("recivePeerId", this.item);
          this.$emit("answer", false);
          this.audioObject.pause();
          clearInterval(this.clearInterval);
        }, 30000);
      } /* end of if */
    } /* /callTimeOut */,
  } /* /methods */,
};
</script>