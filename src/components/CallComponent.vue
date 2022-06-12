<template>
  <div class="callRoom">
    <div class="showVideos">
      <div class="changeCamera" v-if="videoInput >= 2" @click="changCamera">
        <svg class="changeCamera" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
          data-name="Layer 1">
          <path fill="#fff"
            d="M12.29,5.21l1.5,1.5a1,1,0,0,0,1.42,0,1,1,0,0,0,.13-1.21H19a1,1,0,0,0,0-2H15.34a1,1,0,0,0-.13-1.21,1,1,0,0,0-1.42,0l-1.5,1.5a1,1,0,0,0-.21.33,1,1,0,0,0,0,.76A1,1,0,0,0,12.29,5.21ZM22.92,9.12a1,1,0,0,0-.21-.33l-1.5-1.5a1,1,0,0,0-1.42,0,1,1,0,0,0-.13,1.21H16a1,1,0,0,0,0,2h3.66a1,1,0,0,0,.13,1.21,1,1,0,0,0,1.42,0l1.5-1.5a1,1,0,0,0,.21-.33A1,1,0,0,0,22.92,9.12ZM11,10a4,4,0,1,0,4,4A4,4,0,0,0,11,10Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,11,16Zm9-3a1,1,0,0,0-1,1v5a1,1,0,0,1-1,1H4a1,1,0,0,1-1-1V11a1,1,0,0,1,1-1H6a1,1,0,0,0,1-.69l.54-1.62A1,1,0,0,1,8.44,7H10a1,1,0,0,0,0-2H8.44A3,3,0,0,0,5.59,7.06L5.28,8H4a3,3,0,0,0-3,3v8a3,3,0,0,0,3,3H18a3,3,0,0,0,3-3V14A1,1,0,0,0,20,13Z" />
        </svg>
      </div>
      <!-- /changeCamera -->
      <div class="myVideo">
        <!-- /here i will place m video -->
      </div>
      <div class="rcvVideo">
        <!-- here will display rcvVideo  -->
        <img autoplay muted loop src="../assets/uploads/image/memo.png" />
        <video autoplay muted loop src="../assets/uploads/video/slowMotion.mp4"></video>
      </div>
    </div>
    <!-- /showVideos -->

    <div class="controllVideo">
      <div class="microphone" v-if="!microphone" @click="muteMicrophone(true)">
        <fa icon="microphone-alt-slash"></fa>
      </div>

      <div class="microphone" v-if="microphone" @click="muteMicrophone(false)">
        <fa icon="microphone-alt"></fa>
      </div>

      <div v-if="!volume" class="volume-mute" @click="volumeMute(true)">
        <fa icon="volume-mute"></fa>
      </div>
      <div v-if="volume" class="volume-mute" @click="volumeMute(false)">
        <fa icon="volume-up"></fa>
      </div>

      <div class="phone" @click="closeContact">
        <fa icon="phone"></fa>
      </div>
      <div class="video-slash" v-if="!checkCamera" @click="closeCamera(true)">
        <fa icon="video-slash"></fa>
      </div>
      <div class="video-slash" v-if="checkCamera" @click="closeCamera(false)">
        <fa icon="video"></fa>
      </div>
    </div>
    <!-- /controllVideo -->
  </div>
</template>

<script>
import * as cookie from "vue-cookies";
import { useRoute } from "vue-router";

import memo from "../assets/uploads/image/memo.png";
import slowMotion from "../assets/uploads/video/slowMotion.mp4";

var raningCall = null;

//var senders = null;
//var videoInput = 0

const audio = new Audio
export default {

  data() {
    return {
      io: this.$store.state.socket || {},
      stream: [],
      peerSndId: null,
      volume: true,
      // audio: JSON.parse(this.query.audio),
      // video: JSON.parse(this.query.video),
      streamRecive: null,
      microphone: true,
      rcvMicSettings: true,
      checkCamera: JSON.parse(this.query.video),
      facingMode: true,
      videoInput: 0
    }; /* /return */
  } /* /data */,

  setup() {
    const route = useRoute();
    const query = route.query;
    return { query };
  } /* ,setup */,

  mounted() {
    this.checkMode();
    this.removeVideo();
    this.checkVedioInput();
  } /* /mounted */,

  created() {
    this.putMyStting()
    this.callanswer();
    this.SndCall();
    this.seetingsCall();
  }/* /created */,

  methods: {

    checkVedioInput() {
      navigator.mediaDevices.enumerateDevices().then(devices => {
        let sourceId = null;
        // enumerate all devices
        for (var device of devices) {

          // if there is still no video input, or if this is the rear camera
          if (device.kind == 'videoinput' &&
            (!sourceId || device.label.indexOf('back') !== -1)) {
            sourceId = device.deviceId;
            this.videoInput += 1
          }/* end of if */

        }/* end of for loop */
        if (!sourceId) {
          console.log("you dont have vedio input")
        }/* end of if */
      })/* /enumerateDevices */
    },/* /checkVedioInput */

    changCamera() {

      this.closeMediaTrack(this.stream[cookie.get("user").id].newStream)

      //this section to check ihave input vedio or no
      navigator.mediaDevices.enumerateDevices().then(devices => {
        let sourceId = null;
        // enumerate all devices
        for (var device of devices) {

          // if there is still no video input, or if this is the rear camera
          if (device.kind == 'videoinput' &&
            (!sourceId || device.label.indexOf('back') !== -1)) {
            sourceId = device.deviceId;
          }/* end of if */

        }/* end of for loop */
        if (!sourceId) {
          console.log("you dont have vedio input")
        }/* end of if */

        navigator.mediaDevices.getUserMedia({
          audio: true,
          video: {
            facingMode: this.facingMode ? 'environment' : 'user',
            //sourceId:sourceId
          }/* /video */
        }/* /constracter */).then(stream => {
          console.log("your ranngin call : ", raningCall.peerConnection.getSenders())
          if (raningCall) {
            var senders = raningCall.peerConnection.getSenders();


            this.stream[cookie.get("user").id].newStream = stream

            this.dispkayMyStream(this.stream[cookie.get("user").id].newStream)

            let video_track = this.stream[cookie.get("user").id].newStream.getVideoTracks()[0];
            senders[1].replaceTrack(video_track);
            let audioTrack = this.stream[cookie.get("user").id].newStream.getAudioTracks()[0]
            senders[0].replaceTrack(audioTrack)

          }/* end of if */
        })//stream
          .catch(e => console.log(e))//catch

        this.facingMode = !this.facingMode

      })/* /end of enumerateDevices */
    },/* /changCamera */

    putMyStting() {
      try {
        this.io.on("settingsCall", data => {
          if (this.rcvMicSettings != data.microphone || this.stream[cookie.get("user").id].video != data.camera) {
            this.rcvMicSettings = data.microphone;
            var x = this.stream[cookie.get("user").id].video
            this.stream[cookie.get("user").id].video = data.camera;
            if (x != data.camera) {
              this.showVideoCall(this.streamRecive, true)
            } else {
              this.showVideoCall(this.streamRecive)
            }/* end of if */
          }/* end of if */
        })/* /settingCall */
      } catch (e) {
        console.log(e)
      }/* /catch */
      this.stream[cookie.get("user").id] = {
        newStream: null,
        audio: JSON.parse(this.query.audio),
        video: JSON.parse(this.query.video),
      }/* end of if */
    },/* /putMyStting */

    seetingsCall() {
      try {
        this.io.on("settingsCall", data => {
          if (this.rcvMicSettings != data.microphone || this.stream[cookie.get("user").id].video != data.camera) {
            this.rcvMicSettings = data.microphone;
            var x = this.stream[cookie.get("user").id].video
            this.stream[cookie.get("user").id].video = data.camera;
            if (x != data.camera) {
              this.showVideoCall(this.streamRecive, true)
            } else {
              this.showVideoCall(this.streamRecive)
            }/* end of if */
          }/* end of if */
        })/* /settingCall */
      } catch (e) {
        console.log(e)
      }/* /catch */
    },/* seetingsCall */

    SndCall() {
      try {
        if (this.query.snd_id == cookie.get("user").id) {
          if (this.$store.state.rcvPeerId) {
            this.peerSndId = this.$store.state.rcvPeerId.peerId;
          }/* end of if */

          this.$store.getters.peerJs.on("error", (e) => {
            console.log("error : ", e);
          });

          navigator.mediaDevices
            .getUserMedia({
              audio: true, video: true
            })
            .then((stream) => {
              //this section to send my stream to reciver user
              var myVideo = document.getElementsByClassName("myVideo")[0]

              this.stream[cookie.get("user").id].newStream = stream
              this.dispkayMyStream(this.stream[cookie.get("user").id].newStream);

              myVideo.style.width = "99%"
              myVideo.style.height = "99%"
              myVideo.style.animation = "none"
              myVideo.style.animationName = "zoomOut"

              if (this.$store.getters.peerJs && (this.$store.state.myPeerId != this.peerSndId)) {

                //here we will send the stream to other user 
                var call = this.$store.getters.peerJs.call(this.peerSndId, this.stream[cookie.get("user").id].newStream);
                raningCall = call

                //this to getstream from reciver and display him in my page
                raningCall.on("stream", (mediaStream) => {
                  this.streamRecive = mediaStream
                  this.showVideoCall(this.streamRecive);
                  myVideo.style.width = "20%"
                  myVideo.style.height = "40%"
                  myVideo.style.animation = "none"
                  myVideo.style.animationName = "zoomIn"
                });
              } else {
                console.log("your peer is not connect ...");
              } /* end of if  */
              //this to display my stream in my page
            })
            .catch((e) => console.log(e));
        }/* end of if */
      } catch (e) {
        console.log(e)
      }/* /catch */
    } /* /callPeer */,

    callanswer() {
      try {
        if (this.query.rcv_id == cookie.get("user").id) {
          this.$store.getters.peerJs.on("call", (call) => {
            raningCall = call
            navigator.mediaDevices
              .getUserMedia({ audio: true, video: true })
              .then((stream) => {
                //this to send stream for sender
                this.stream[cookie.get("user").id].newStream = stream
                raningCall.answer(this.stream[cookie.get("user").id].newStream);
                this.dispkayMyStream(this.stream[cookie.get("user").id].newStream);
                //this to getstream from sender and display him in my page
                raningCall.on("stream", (mediaStream) => {
                  this.streamRecive = mediaStream
                  this.showVideoCall(this.streamRecive);
                }); /* /mediaStream */
              })
              .catch((e) => console.log(e));
          }); /* end of call enswer */
        }/* end of if */
      } catch (e) {
        console.log(e)
      }/* /catch */
    } /* /callanswer */,

    //this function only to dusplay video stream
    showVideoCall(stream, event) {

      try {
        const callRoom = document.getElementsByClassName("callRoom")[0];
        // const myVideo = document.getElementsByClassName("myVideo")[0];
        const rcvVideo = document.getElementsByClassName("rcvVideo")[0];
        const showVideos = document.getElementsByClassName("showVideos")[0];
        const video2 = document.createElement("video");
        var myVideo = document.getElementsByClassName("myVideo")[0]
        video2.playsinline = true

        //const video1 = document.createElement("video");
        var newStream = null
        var i = 0;

        if (this.stream[cookie.get("user").id].video == false && stream != null) {
          stream = new MediaStream(stream.getAudioTracks())
        }/* end of if */

        if (this.stream[cookie.get("user").id].video) {

          if (!this.volume || !this.rcvMicSettings) {
            newStream = new MediaStream(stream.getVideoTracks())
          } else {
            newStream = stream;
          }/* end of if */


          video2.srcObject = newStream;

          rcvVideo.innerHTML = ""

          rcvVideo.appendChild(video2);
          showVideos.appendChild(rcvVideo);
          callRoom.appendChild(showVideos);
          video2.play();


          if (myVideo.children[0].tagName == "VIDEO") {
            myVideo.style.height = "40%"
            myVideo.style.width = "20%"

            myVideo.style.animation = "none"
            myVideo.style.animationName = "zoomOut"
          }/* end of if */

          // for (i; i < rcvVideo.children.length; i++) {
          //   if (rcvVideo.children[i].tagName == "VIDEO") {
          //     rcvVideo.children[i].remove()
          //   }/* end of if */
          // }/* end of for loop */

        } else {


          if (myVideo.children[0].tagName == "VIDEO") {
            myVideo.style.height = "100%"
            myVideo.style.width = "100%"
            myVideo.style.animation = "none"
            myVideo.style.animationName = "zoomIn"
          }/* end of if */

          this.closeMediaTrack(video2.srcObject)
          video2.pause()

          audio.srcObject = stream
          audio.playsinline = true

          rcvVideo.appendChild(audio);
          showVideos.appendChild(rcvVideo);
          callRoom.appendChild(showVideos);
          if (this.volume && this.rcvMicSettings) {
            audio.play()
          } else {
            audio.pause()
          } /* end of if */

          if (event) {
            for (i = 0; i < rcvVideo.children.length; i++) {
              if (rcvVideo.children[i].tagName == "VIDEO") {
                rcvVideo.children[i].remove()
                rcvVideo.innerHTML = `<img autoplay muted loop src="${memo}" />
        <video autoplay muted loop src="${slowMotion}"></video>`
              }/* end of if */
            }/* end of for loop */
          }/* end of if */
        }/* end of if */
      } catch (e) {
        console.log(e)
      }/* /catch */
    } /* /showVideoCall */,

    dispkayMyStream(newStream) {
      try {
        const callRoom = document.getElementsByClassName("callRoom")[0];
        const myVideo = document.getElementsByClassName("myVideo")[0];
        const showVideos = document.getElementsByClassName("showVideos")[0];
        const video1 = document.createElement("video");
        const audio = document.createElement("audio");

        video1.playsinline = true
        audio.playsinline = true

        myVideo.innerHTML = ""

        var stream = null

        if (((this.stream[cookie.get("user").id].audio == true && this.stream[cookie.get("user").id].video == false) || (this.stream[cookie.get("user").id].audio == false && this.stream[cookie.get("user").id].video == false)) && (newStream != null)) {
          newStream = new MediaStream(newStream.getAudioTracks())
        }/* end of if */

        if (newStream == null) {
          video1.remove();
          audio.remove();
          this.$router.push("/home");
        } else {
          if (this.stream[cookie.get("user").id].video) {

            stream = new MediaStream(newStream.getVideoTracks())

            video1.srcObject = stream;
            myVideo.appendChild(video1);
            showVideos.appendChild(myVideo);
            callRoom.appendChild(showVideos);

            video1.play()

            for (var i = 0; i < myVideo.children.length; i++) {
              if (myVideo.children[i].tagName == "AUDIO") {
                myVideo.children[i].remove()
              }/* end of if */
            }/* end of for loop */

          } else {
            stream = null
            stream = newStream
            audio.srcObject = stream;
            myVideo.appendChild(audio);
            showVideos.appendChild(myVideo);
            callRoom.appendChild(showVideos);

            for (var J = 0; J < myVideo.children.length; J++) {
              if (myVideo.children[J].tagName == "VIDEO") {
                myVideo.children[J].remove()
              }/* end of if */
            }/* end of for loop */

            //audio.play()
            //audio.stop()
          }
        }
      } catch (e) {
        console.log(e)
      }/* /catch */
    },/* /rcvVideo */

    checkMode() {
      cookie.remove("sndRcvId");
      const root = document.documentElement;

      if (!cookie.get("mode")) {
        cookie.set("mode", "light", "360d");
      } /* end of if */

      if (cookie.get("mode") == "light") {
        root.style.setProperty("--bgw", "#F8F8F8");
        root.style.setProperty("--bg", "#fff");
        root.style.setProperty("--bgbar", "#F6F6F6");
        root.style.setProperty("--bgSearch", "#fff");
        root.style.setProperty("--fntClr", "#221D2E");
        root.style.setProperty("--cShadow", "#a9a1a1");
        root.style.setProperty("--cMsg", "#DCF9ED");
        root.style.setProperty("--brdList", "#e3e3e3");
        root.style.setProperty("--navMsgC", "#FFFFFF");
      } else {
        root.style.setProperty("--bg", "#111B21");
        root.style.setProperty("--bgbar", "#222E35");
        root.style.setProperty("--bgSearch", "#111B21");
        root.style.setProperty("--bgw", "#222E35");
        root.style.setProperty("--fntClr", "#FFFFFF");
        root.style.setProperty("--cShadow", "#1c1b1b");
        root.style.setProperty("--cMsg", "#2A3C46");
        root.style.setProperty("--brdList", "#464646");
        root.style.setProperty("--navMsgC", "#2A3C46");
      } /* end of if */
    } /* /checkMode */,

    closeContact() {
      if (cookie.get("user").id == this.query.snd_id) {
        this.io.emit("closeContact", this.query.rcv_id);
      } else if (cookie.get("user").id == this.query.rcv_id) {
        this.io.emit("closeContact", this.query.snd_id);
      } /* end of if */

      if (this.stream[cookie.get("user").id].newStream)
        this.stream[cookie.get("user").id].newStream.getTracks().forEach(function (track) {
          track.stop();
        });

      this.showVideoCall(null, cookie.get("user").id);
      this.dispkayMyStream(null)
    } /* /closeContact */,

    removeVideo() {
      this.io.on("removeVideo", (userId) => {
        if (userId) {
          if (this.stream[cookie.get("user").id].newStream)
            this.stream[cookie.get("user").id].newStream.getTracks().forEach(function (track) {
              track.stop();
            });
          this.showVideoCall(null, userId);
          this.dispkayMyStream(null)
        } /* end of if */
      });
    } /* /removeVideo */,

    volumeMute(volume) {
      this.volume = volume
      this.showVideoCall(this.streamRecive)
    },/* /mutedCall */

    muteMicrophone(mute) {
      this.microphone = mute
      if (cookie.get("user").id == this.query.snd_id) {
        this.io.emit("settingsCall", {
          snd_id: this.query.snd_id,
          rcv_id: this.query.rcv_id,
          microphone: this.microphone,
          camera: this.checkCamera,
        })/* /settingCall */
      } else {
        this.io.emit("settingsCall", {
          snd_id: this.query.rcv_id,
          rcv_id: this.query.snd_id,
          microphone: this.microphone,
          camera: this.checkCamera,
        })/* /settingCall */
      }
    },/* /muteMicrophone */

    closeCamera(camera) {
      this.checkCamera = camera
      this.stream[cookie.get("user").id].video = camera


      if (cookie.get("user").id == this.query.snd_id) {
        this.io.emit("settingsCall", {
          snd_id: this.query.snd_id,
          rcv_id: this.query.rcv_id,
          microphone: this.microphone,
          camera: this.checkCamera,
        })/* /settingCall */
      } else {
        this.io.emit("settingsCall", {
          snd_id: this.query.rcv_id,
          rcv_id: this.query.snd_id,
          microphone: this.microphone,
          camera: this.checkCamera
        })/* /settingCall */
      }

      //this for close error for microphone

      if (cookie.get("user").id == this.query.snd_id) {
        this.io.emit("settingsCall", {
          snd_id: this.query.snd_id,
          rcv_id: this.query.rcv_id,
          microphone: false,
          camera: this.checkCamera,
        })/* /settingCall */
      } else {
        this.io.emit("settingsCall", {
          snd_id: this.query.rcv_id,
          rcv_id: this.query.snd_id,
          microphone: false,
          camera: this.checkCamera,
        })/* /settingCall */
      }

      if (cookie.get("user").id == this.query.snd_id) {
        this.io.emit("settingsCall", {
          snd_id: this.query.snd_id,
          rcv_id: this.query.rcv_id,
          microphone: this.microphone,
          camera: this.checkCamera,
        })/* /settingCall */
      } else {
        this.io.emit("settingsCall", {
          snd_id: this.query.rcv_id,
          rcv_id: this.query.snd_id,
          microphone: this.microphone,
          camera: this.checkCamera,
        })/* /settingCall */
      }






      this.dispkayMyStream(this.stream[cookie.get("user").id].newStream)
    }/* /closeCamera */,

    closeMediaTrack(stream) {
      if (stream) {
        stream.getTracks().forEach(track => {
          track.stop();
        });/* /stream */
        return "remove track successfly"
      } else {
        return "remove track rejected becouse you dont have stream"
      }/* end of if */
    }/* /closeMediaTrack */

  } /* /methods */,
}; /* end of export default */
</script>
/* /script */