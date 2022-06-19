<template>
  <div class="chat-room">
    <div class="navChatRoom">
      <div class="containerName">
        <div class="returnToBack" @click="returnToBack">
          <fa v-if="lan == 'en'" icon="arrow-left"></fa>
          <fa v-if="lan == 'ar'" icon="arrow-right"></fa>
        </div>
        <!-- /returnToBack -->
        <div class="reciveUser" @click="showUserProfile">
          <img v-if="itm.image" :src="item.image" alt="" />
          <img v-else src="../assets/uploads/image/default.png" alt="" />
          <div class="name-active">
            <div class="nameUser" v-if="itm.username" v-text="item.username"></div>
            <div class="nameUser" v-else-if="itm.first_name" v-text="item.first_name + ' ' + item.last_name"></div>
            <div class="nameUser" v-else>Memo User</div>
            <div class="stateUser">
              <p>{{ _trans("active") }}</p>
              <span class="statreciverUser"></span>
            </div>
          </div>
        </div>
        <!-- /reciveUser -->
      </div>

      <!-- this window display when recive any call -->
      <div class="calling">
        <button @click="sendEventDisplayMsg" class="buttonSearchMessage">
          <fa icon="search"></fa>
        </button>
        <button class="settingMessage">
          <span></span>
          <span></span>
          <span></span>
          <ul class="settingChat">
            <li class="videoCall" @click="startCall(true, { audio: true, video: true })">{{ _trans("videoCall") }}
              <fa class="video" icon="video" />
            </li>
            <li class="audioCall" @click="startCall(true, { audio: true, video: false })">{{ _trans("voicCall") }}
              <fa class="audio" icon="microphone" />
            </li>
          </ul>
        </button>
        <!-- /settingMessage -->
      </div>
      <!-- /calling -->
    </div>
    <!-- /navChatRoom -->

    <!-- this navbar diplay when make calling for any one -->
    <div v-if="showCalling" class="sendCall">
      <p>
        {{ _trans("calling") }}
        <span></span>
        <span></span>
        <span></span>
      </p>
      <div @click="closeCall" class="closeSendC">
        <fa icon="phone"></fa>
      </div>
    </div>
    <!-- /sendCall -->

    <!-- this window for display wrong message  -->
    <Wrong v-if="messageWrong" :messageWrong="messageWrong"></Wrong>

    <!-- here dispplay eall message between two user -->
    <div class="wepper-chat">
      <div class="loader"></div>

      <!-- /myMessageCover -->
      <!-- here we will display old message -->
    </div>
    <!-- /wepper-chat -->

    <div v-if="item" class="formContainer">
      <!-- here you can send message for another user -->
      <div class="formSendMessage" v-if="!item.blocked">
        <form id="sectionForRedirect" action="">
          <div class="uploadFile" @click="showMenu">
            <label for="option">
              <fa icon="plus" />
            </label>
            <!-- <input class="inputfile" type="file" id="file" /> -->
          </div>
          <!-- /uploadFile -->

          <div class="myMessageInput">
            <input id="myMessageInput" type="text" v-model="inputMsg" :placeholder="_trans('message') + '...'" />
            <button class="btn addMsg" @click.prevent="addMsg(null)">
              <fa icon="paper-plane" />
            </button>
          </div>
          <!-- /myMessageInput -->
          <div class="voiceMsg">
            <label @click="playRecord(0)" v-if="!checkAudioPlayOrNo">
              <fa icon="play-circle" />
            </label>
            <label @click="playRecord(1)" class="checkAudioPlayOrNo btn" v-if="checkAudioPlayOrNo">
              <fa style="display: none" icon="pause-circle" />
            </label>
            <div class="trackVoice">
              <span class="track"></span>
              <p class="timeTrack">0</p>
            </div>
            <label class="deleteVoice" @click="deleteRecording">
              <fa icon="trash" />
            </label>
          </div>
          <!-- voiceMsg -->
          <div class="voiceInput">
            <label for="voice" @click.prevent="adioRecording" class="microphone">
              <fa icon="microphone" />
              <div class="recorder" v-if="recorder"></div>
            </label>
            <label for="voice" @click.prevent="addMsg(null)" class="sendVoice">
              <fa icon="paper-plane" />
            </label>
          </div>
          <!-- /voiceInput -->

          <div class="munuOption">
            <div class="wrepperM">
              <div class="uploadFile">
                <label for="file">
                  <fa icon="file" /> <span>{{ _trans("file") }}</span>
                </label>
              </div>
              <!-- /uploadFile -->
              <div class="location">
                <label @click="sendLocation(replyId)">
                  <fa icon="map" /> <span>{{ _trans("location") }}</span>
                </label>
                <!-- /label -->
              </div>
              <!-- /location -->
            </div>
            <!-- /wrepperM -->
          </div>
          <!-- /munuOption -->
        </form>
        <div class="redirectFormM" v-if="sectionForRedirect && !editMyessage">
          <!-- this section for redirect message -->
          <div class="sendRedirectMessage" @click.prevent="sendRedirectMessageId" v-if="typeEffect == 'redirct'">
            {{ _trans("send") }}
          </div>
          <!-- /sendRedirec -->

          <!-- this section for delete message -->
          <div class="sendRedirectMessage" @click.prevent="deleteMessages" v-if="typeEffect == 'delete'">
            {{ _trans("delete") }}
          </div>
          <!-- /sendRedirec -->

          <div class="countAndCloseRedirect">
            <div v-if="countForRedirectMessage > 0" v-text="countForRedirectMessage"></div>
            <div @click="redirectMessage(null)">
              <span></span>
              <span></span>
            </div>
          </div>
          <!-- /countAndCloseRedirect -->
        </div>
        <!-- /redirectFormM -->

        <div class="editMessage" v-if="editMyessage != null">
          <form action="" class="formEditMessage">
            <input type="text" :placeholder="_trans('message') + '...'" name="" v-model="editMyessage" id="" />
            <div class="closeEditMyessage" @click="closeEditMyessage">
              <span></span>
              <span></span>
            </div>
            <!-- /close -->
            <button style="display: none" @click.prevent="sendEditMessage">
              click
            </button>
          </form>
          <!-- /form -->
        </div>
        <!-- /editMessage -->
      </div>
      <!-- /formSendMessage -->
      <div class="messageBlockedUser" v-if="
        item.blocked &&
        item.username &&
        (item.blocked_for != '0' ||
          item.blocked_for != String(user.id) ||
          item.blocked_for == 'aaaa')
      ">
        <h6 class="messageBlcok">
          {{ _trans("blockMessge") + " " + item.username }}
        </h6>
      </div>
      <!-- /messageBlockedUser -->
      <div class="messageBlockedUser" v-if="
        item.blocked &&
        item.first_name &&
        (item.blocked_for != '0' ||
          item.blocked_for != String(user.id) ||
          item.blocked_for == 'aaaa')
      ">
        <h6 class="messageBlcok">
          {{
              _trans("blockMessge") + " " + item.first_name + " " + item.last_name
          }}
        </h6>
      </div>
      <!-- /messageBlockedUser -->

      <div class="messageBlockedUser" v-if="
        item.blocked &&
        item.username &&
        (item.blocked_for == '0' || item.blocked_for == String(user.id))
      ">
        <h6 class="messageBlcok unblock" @click="unblockUser(item)">
          {{ _trans("unblock") }}
        </h6>
      </div>
      <!-- /messageBlockedUser -->

      <div class="messageBlockedUser" v-if="
        item.blocked &&
        item.first_name &&
        (item.blocked_for == '0' || item.blocked_for == String(user.id))
      ">
        <h6 class="messageBlcok unblock" @click="unblockUser(item)">
          {{ _trans("unblock") }}
        </h6>
      </div>
      <!-- /messageBlockedUser -->
      <div class="replyForm" v-if="!item.blocked && displyReply == true">
        <!-- <div class="lineReply"></div> -->
        <div class="replyText">
          <div class="replyContainer">
            <div class="contentReplyedMessage">
              <div class="coverTextReply">
                <div class="userReply">
                  Lorem, ipsum.
                </div>
                <!-- /userReply -->
                <div class="textMessageReply">
                  {{ _trans("noMessage") }}
                </div>
                <!-- /textMessageReply -->
              </div>
              <!-- /coverTextReply -->
            </div>
            <!-- /contentReplyedMessage -->

            <div class="closeReply" @click="closeReplyForm">
              <fa icon="times"></fa>
            </div>
            <!-- /closeReply -->

          </div>
          <!-- /replyContainer -->
        </div>
        <!-- /replyText -->
        <form id="sectionForRedirect" action="">
          <div class="uploadFile" @click="showMenu">
            <label for="option">
              <fa icon="plus" />
            </label>
            <!-- <input class="inputfile" type="file" id="file" /> -->
          </div>
          <!-- /uploadFile -->

          <div class="myMessageInput">
            <input id="myMessageInput" type="text" v-model="inputMsg" :placeholder="_trans('message') + '...'" />
            <button class="btn addMsg" @click.prevent="addMsg(replyId)">
              <fa icon="paper-plane" />
            </button>
          </div>
          <!-- /myMessageInput -->
          <div class="voiceMsg">
            <label @click="playRecord(0)" v-if="!checkAudioPlayOrNo">
              <fa icon="play-circle" />
            </label>
            <label @click="playRecord(1)" class="checkAudioPlayOrNo btn" v-if="checkAudioPlayOrNo">
              <fa style="display: none" icon="pause-circle" />
            </label>
            <div class="trackVoice">
              <span class="track"></span>
              <p class="timeTrack">0</p>
            </div>
            <label class="deleteVoice" @click="deleteRecording">
              <fa icon="trash" />
            </label>
          </div>
          <!-- voiceMsg -->
          <div class="voiceInput">
            <label for="voice" @click.prevent="adioRecording" class="microphone">
              <fa icon="microphone" />
              <div class="recorder" v-if="recorder"></div>
            </label>
            <label for="voice" @click.prevent="addMsg(replyId)" class="sendVoice">
              <fa icon="paper-plane" />
            </label>
          </div>
          <!-- /voiceInput -->

          <div class="munuOption">
            <div class="wrepperM">
              <div class="uploadFile">
                <label for="file">
                  <fa icon="file" /> <span>{{ _trans("file") }}</span>
                </label>
              </div>
              <!-- /uploadFile -->
              <div class="location">
                <label @click="sendLocation(replyId)">
                  <fa icon="map" /> <span>{{ _trans("location") }}</span>
                </label>
                <!-- /label -->
              </div>
              <!-- /location -->
            </div>
            <!-- /wrepperM -->
          </div>
          <!-- /munuOption -->
        </form>
      </div>
      <!-- /replyForm -->
    </div>
    <input style="display: none" class="inputfile" type="file" id="file" />
    <!-- <input
      style="display: none"
      class="inputfile"
      type="file"
      id="updateFile"
    /> -->
  </div>
  <!-- /chat-room -->
</template>

<script>
import moment from "moment";
//import file from "../assets/uploads/image/file.png";
import file2 from "../assets/uploads/image/file.png";
import download from "../assets/uploads/image/download.png";
import check from "../assets/uploads/image/check.png";
import checkDubole from "../assets/uploads/image/check-dubole.png";
import checkDuboleNotSeen from "../assets/uploads/image/check-image-not-seen.png";
import map from "../assets/uploads/image/map.jpeg";
import * as uuid from "uuid";
import * as cookie from "vue-cookies";
import axios from "axios";
import _ from "lodash";
import GoogleMapsApiLoader from 'google-maps-api-loader'

import RongChatComponent from "./RongChatComponent.vue";

import msg_notifcation from "../assets/uploads/audio/msg_notifcation.mp3";
import newMessage from "../assets/uploads/audio/newMessage.mp3";
import changeNumberFormat from "../lang/changeNumber.js"

var mediaRecorder = null;
var audioUrl = null;
var countDownDate = 0;
var seconds = 0;
var audio = null;
export default {
  props: [
    "msgs",
    "newCchat",
    "getItem",
    "answerChat",
    "checkUserConnet",
    "blockedUserInfo",
    "unblockUserInfo",
  ],
  components: {
    Wrong: RongChatComponent,
  } /* /components */,
  data() {
    return {
      item: null,
      showUsrProfile: false,
      inputMsg: "",
      myOldsMessage: null,
      date: null,
      recorder: null,
      microphone: true,
      checkAudioPlayOrNo: false,
      io: this.$store.state.socket,
      user: cookie.get("user"),
      newMassege: null,
      enterUser: false,
      typing: false,
      sendEventTyping: false,
      audioBlob: null,
      audioPath: this.$store.state.pattUrl + ":3000/uploadAudio",
      l_: this.$store.getters.words,
      itm: {},
      peerId: null,
      showCalling: false,
      myMessageInput: null,
      sectionForRedirect: false,
      countForRedirectMessage: 0,
      wepperContent: [],
      redirectMessagesId: [],
      meesagesId: [],
      typeEffect: null,
      fcmToken: null,
      chatId: null,
      lan: cookie.get("lang") || "en",
      showmunu: true,
      messageWrong: null,
      sender_id: null,
      editMyessage: null,
      msgId: null,
      lastDateMsg: null,
      searchMessage: "",
      google: this.googlee,
      displyReply: false,
      replyId: null,
      newMsgs: [],
      checkImage: false,
      checkFile: false,
      checkVideo: false,
      drowLocation: null
    }; /* /return */
  } /* /data */,

  mounted() {
    this.reciveMessage();
    this.typeing();
    this.sendFileMsg();
    this.sendPeerId();
    this.fetchPeerId();
    this.reciveEditMessage();
    this.reciveCheckConnect();
    //this.checkBlockedFor();
  } /* /mounted */,

  created() {
    this.conectUser();
    this.stopTyping();
    this.connectToMaps()
  } /* /created */,

  // beforeCreate() {

  // },/* /beForceated */
  methods: {
    //this function used for add new reply message when press on enter , it is only to get object item 
    createItemForReplyMessage(item, replyId, type, message) {
      var reply_message
      var messageCover

      reply_message = this.msgs.filter(value => {
        if (value.message_id == replyId)
          return value
      })/* /filter */


      //this section when the replay message exist in msgs array
      if (reply_message[0]) {
        item.reply_message = reply_message[0]
        return item
      }/* end of if */

      //this section when the replay message not exist in msgs array
      else {

        //this newMsgs is new messages added in real time
        reply_message = this.newMsgs.filter(value => {
          if (value.message_id == replyId)
            return value
        })/* /filter */
        var sender = null
        var reciver = null

        //if ihave the item iwill retern him
        if (reply_message[0]) {
          item.reply_message = reply_message[0]
          return item
        } //end of if

        //this function used when not found any item in my list so here i will added to newMsgs
        else {

          if (cookie.get("sndRcvId").sender_id == cookie.get("user").id) {
            sender = cookie.get("sndRcvId").sender_id
            reciver = cookie.get("sndRcvId").reciver_id
          } else {
            sender = cookie.get("sndRcvId").reciver_id
            reciver = cookie.get("sndRcvId").sender_id
          }/* end of if */

          var srcImg = null
          var srcVideo = null

          if (type == "imageWeb") {
            messageCover = document.getElementById(replyId)
            if (messageCover)
              if (messageCover.children[0].children[0].tagName == "IMG") {
                srcImg = messageCover.children[0].children[0].src
                this.checkImage = true
              }/* end of if */
          }/* end of if */

          else if (type == "file") {
            messageCover = document.getElementById(replyId)
            if (messageCover)
              for (var i = 0; i < messageCover.children.length; i++) {
                if (messageCover.children[i].classList.contains("fileType")) {
                  var orginalName = messageCover.children[i].children[1].children[0].textContent
                  this.checkFile = true
                }/* end of if */
              }/* end of for */
          }/* end of if */

          else if (type == "video") {
            messageCover = document.getElementById(replyId)
            if (messageCover) {
              if (messageCover.children[0].tagName == "VIDEO") {
                srcVideo = messageCover.children[0].children[0].src
                this.checkVideo = true
              }/* end of if */
            }/* end of if */
          }/* end of video */

          item.reply_message = {
            sender_id: sender,
            reciver_id: reciver,
            message_type: type,
            message: message || srcImg || srcVideo,
            message_id: replyId,
            orginalName: orginalName || null
          }/* end of if */

          this.newMsgs.push(item)
          return item
        }/* end of if */
      }/* end of if */
    },/* /createItemForReplyMessage */

    //this function used for display reply form in side the chat room
    async displayReplyMessage(item, messageCover) {

      var wepperChat = document.getElementsByClassName("wepper-chat")[0]
      var replayCover = document.createElement("div")
      var replayedMessage = document.createElement("div")
      var youUser = document.createElement("div")
      var typeIcon = document.createElement("div")
      var img = document.createElement("img")

      replayCover.classList.add("coverReplyText")
      replayedMessage.classList.add("replayedMessage")
      typeIcon.classList.add("typeIcon")
      replayedMessage.style.display = "flex"
      replayedMessage.style.alignItems = "center"

      if (item.sender_id == item.reply_message.sender_id) {
        youUser.classList.add("youUser")
        youUser.textContent = this._trans("you")
        replayedMessage.appendChild(youUser)
        replayedMessage.style.display = "block"
        replayedMessage.style.alignItems = "unset"
      } /* end of if */
      
      //this section for green section 
      if(cookie.get("lang")=="en"){
        replayedMessage.style.boxShadow="-3px 0px 0px #3cab44"
      }else if(cookie.get("lang")=="ar"){
        replayedMessage.style.boxShadow="3px 0px 0px #3cab44"
      }/* end of if */

      //this for text section as sender
      if (item.reply_message.message_type == "text") {

        if (messageCover.children[0].classList.contains("message")) {
          typeIcon.style.display = "inline-block"
          typeIcon.textContent = item.reply_message.message
          replayedMessage.appendChild(typeIcon)
          replayCover.appendChild(replayedMessage)

          messageCover.children[0].prepend(replayCover)
          wepperChat.appendChild(messageCover)
          wepperChat.scrollTop = wepperChat.scrollHeight

        }/* end of if */

      }/* end of if */

      //this section for voice message
      else if (item.reply_message.message_type == "voice") {
        if (messageCover.children[0].classList.contains("message")) {

          typeIcon.innerHTML = `${this._trans("voiceFile")} &nbsp;&nbsp;&nbsp;<svg aria-hidden="true" data-prefix="fas" data-icon="microphone" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512" class="svg-inline--fa fa-microphone fa-w-11" data-fa-i2svg>
        // <path fill="currentColor" d="M176 352c53.02 0 96-42.98 96-96V96c0-53.02-42.98-96-96-96S80 42.98 80 96v160c0 53.02 42.98 96 96 96zm160-160h-16c-8.84 0-16 7.16-16 16v48c0 74.8-64.49 134.82-140.79 127.38C96.71 376.89 48 317.11 48 250.3V208c0-8.84-7.16-16-16-16H16c-8.84 0-16 7.16-16 16v40.16c0 89.64 63.97 169.55 152 181.69V464H96c-8.84 0-16 7.16-16 16v16c0 8.84 7.16 16 16 16h160c8.84 0 16-7.16 16-16v-16c0-8.84-7.16-16-16-16h-56v-33.77C285.71 418.47 352 344.9 352 256v-48c0-8.84-7.16-16-16-16z" class=""></path></svg>`
          typeIcon.style.display = "inline-block"
          /*  typeIcon.textContent = item.reply_message.message */
          replayedMessage.appendChild(typeIcon)

          replayCover.appendChild(replayedMessage)

          messageCover.children[0].prepend(replayCover)
          wepperChat.appendChild(messageCover)
          wepperChat.scrollTop = wepperChat.scrollHeight
        }/* end of if */


      }/* end of if */

      //this section for image message 
      else if (item.reply_message.message_type == "imageWeb") {
        typeIcon.innerHTML = ""
        typeIcon.innerHTML = `${this._trans("image")} &nbsp;<svg aria-hidden="true" data-prefix="fas" data-icon="image" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-image fa-w-16" data-fa-i2svg>
        // <path fill="currentColor" d="M464 448H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h416c26.51 0 48 21.49 48 48v288c0 26.51-21.49 48-48 48zM112 120c-30.928 0-56 25.072-56 56s25.072 56 56 56 56-25.072 56-56-25.072-56-56-56zM64 384h384V272l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L208 320l-55.515-55.515c-4.686-4.686-12.284-4.686-16.971 0L64 336v48z" class=""></path></svg>`
        typeIcon.style.display = "inline-block"
        /*  typeIcon.textContent = item.reply_message.message */

        if (!this.checkImage) {
          item.reply_message.message = this.$store.state.imgPath + item.reply_message.message
        }/* end of if */
        this.checkImage = false

        img.src = item.reply_message.message

        replayedMessage.appendChild(typeIcon)
        replayedMessage.style.minWidth = "120px"
        replayCover.appendChild(replayedMessage)
        replayCover.appendChild(img)

        messageCover.children[0].prepend(replayCover)
        wepperChat.appendChild(messageCover)
        wepperChat.scrollTop = wepperChat.scrollHeight

      }/* end of if */

      //this section for video message
      else if (item.reply_message.message_type == "video") {
        //       wepperChat.innerHTML +=
        //         `
        //     <div class="myMessageCover">
        //       <div class="message" id=${item.message_id}>
        //         <div class="coverReplyText">
        //         <div class="replayedMessage">
        //           <div class="youUser">${this._trans("you")}</div>
        //          <div class="typeIcon"><p>${this._trans("vedio") + ' you must add the video for the image '}&nbsp;<svg aria-hidden="true" data-prefix="fas" data-icon="film" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-film fa-w-16" data-fa-i2svg>
        // <path fill="currentColor" d="M488 64h-8v20c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12V64H96v20c0 6.6-5.4 12-12 12H44c-6.6 0-12-5.4-12-12V64h-8C10.7 64 0 74.7 0 88v336c0 13.3 10.7 24 24 24h8v-20c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v20h320v-20c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v20h8c13.3 0 24-10.7 24-24V88c0-13.3-10.7-24-24-24zM96 372c0 6.6-5.4 12-12 12H44c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12H44c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12H44c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm272 208c0 6.6-5.4 12-12 12H156c-6.6 0-12-5.4-12-12v-96c0-6.6 5.4-12 12-12h200c6.6 0 12 5.4 12 12v96zm0-168c0 6.6-5.4 12-12 12H156c-6.6 0-12-5.4-12-12v-96c0-6.6 5.4-12 12-12h200c6.6 0 12 5.4 12 12v96zm112 152c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40z" class=""></path></svg></p></div>
        //         </div>
        //          <img src=${file2}>
        //         </div>
        //         <p>hellow</p>
        //         <div class="created">22.01 AM</div><!-- /created -->
        //         <button id="dispalyListView">c</button>
        //       </div>
        //       <!-- /message -->
        //     </div>
        //     `

        typeIcon.innerHTML = ""
        typeIcon.innerHTML = `${this._trans("vedio")} &nbsp;<svg aria-hidden="true" data-prefix="fas" data-icon="film" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-film fa-w-16" data-fa-i2svg>
        // <path fill="currentColor" d="M488 64h-8v20c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12V64H96v20c0 6.6-5.4 12-12 12H44c-6.6 0-12-5.4-12-12V64h-8C10.7 64 0 74.7 0 88v336c0 13.3 10.7 24 24 24h8v-20c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v20h320v-20c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v20h8c13.3 0 24-10.7 24-24V88c0-13.3-10.7-24-24-24zM96 372c0 6.6-5.4 12-12 12H44c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12H44c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12H44c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm272 208c0 6.6-5.4 12-12 12H156c-6.6 0-12-5.4-12-12v-96c0-6.6 5.4-12 12-12h200c6.6 0 12 5.4 12 12v96zm0-168c0 6.6-5.4 12-12 12H156c-6.6 0-12-5.4-12-12v-96c0-6.6 5.4-12 12-12h200c6.6 0 12 5.4 12 12v96zm112 152c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40z" class=""></path></svg>`
        typeIcon.style.display = "inline-block"
        /*  typeIcon.textContent = item.reply_message.message */

        if (!this.checkVideo) {
          item.reply_message.message = this.$store.state.videoPath + item.reply_message.message
        }/* end of if */
        this.checkVideo = false

        var video = document.createElement("video")
        var source = document.createElement("source")
        source.src = item.reply_message.message
        video.appendChild(source)
        video.controls = false
        replayedMessage.appendChild(typeIcon)
        replayedMessage.style.minWidth = "120px"
        replayCover.appendChild(replayedMessage)
        replayCover.appendChild(video)

        video.style.width = "50px"
        video.style.height = "50px"
        video.style.objectFit = "cover"
        video.style.borderRadius = "5px"




        messageCover.children[0].prepend(replayCover)
        wepperChat.appendChild(messageCover)
        wepperChat.scrollTop = wepperChat.scrollHeight



      }

      //this section for file message
      else if (item.reply_message.message_type == "file") {
        //       //this for file section as sender
        //       wepperChat.innerHTML +=
        //         `
        //     <div class="myMessageCover">
        //       <div class="message" id=${item.message_id}>
        //          <div class="coverReplyText">
        //         <div class="replayedMessage">
        //           <div class="youUser">${this._trans("you")}</div>
        //          <div class="typeIcon" style="display:inline-block">name of the file&nbsp;&nbsp;<svg aria-hidden="true" data-prefix="fas" data-icon="file" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="svg-inline--fa fa-image fa-w-16" data-fa-i2svg>
        // <path fill="currentColor" d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm160-14.1v6.1H256V0h6.1c6.4 0 12.5 2.5 17 7l97.9 98c4.5 4.5 7 10.6 7 16.9z" class=""></path></svg></div>
        //         </div>
        //         </div>
        //         <p>hellow</p>
        //         <div class="created">22.01 AM</div><!-- /created -->
        //         <button id="dispalyListView">c</button>
        //       </div>
        //       <!-- /message -->
        //     </div>
        //     `

        if (messageCover.children[0].classList.contains("message")) {

          typeIcon.innerHTML = `${item.reply_message.orginalName} &nbsp;&nbsp;<svg aria-hidden="true" data-prefix="fas" data-icon="file" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="svg-inline--fa fa-image fa-w-16" data-fa-i2svg>
        // <path fill="currentColor" d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm160-14.1v6.1H256V0h6.1c6.4 0 12.5 2.5 17 7l97.9 98c4.5 4.5 7 10.6 7 16.9z" class=""></path></svg>`
          typeIcon.style.display = "inline-block"
          /*  typeIcon.textContent = item.reply_message.message */
          replayedMessage.appendChild(typeIcon)

          replayCover.appendChild(replayedMessage)

          messageCover.children[0].prepend(replayCover)
          wepperChat.appendChild(messageCover)
          wepperChat.scrollTop = wepperChat.scrollHeight
        }/* end of if */


      }/* end of if */

      //this section for location message
      else if (item.reply_message.message_type == "location") {
        //this section for location as reciver
        //       wepperChat.innerHTML +=
        //         `
        //     <div class="messageYouCover">
        //       <div class="message" id=${item.message_id}>
        //         <div class="coverReplyText">
        //         <div class="replayedMessage">
        //          <div class="typeIcon"><p>${this._trans("location") + ' you must add the location for the image '}&nbsp;<svg aria-hidden="true" data-prefix="fas" data-icon="map" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-image fa-w-16" data-fa-i2svg>
        // <path fill="currentColor" d="M0 117.66v346.32c0 11.32 11.43 19.06 21.94 14.86L160 416V32L20.12 87.95A32.006 32.006 0 0 0 0 117.66zM192 416l192 64V96L192 32v384zM554.06 33.16L416 96v384l139.88-55.95A31.996 31.996 0 0 0 576 394.34V48.02c0-11.32-11.43-19.06-21.94-14.86z" class=""></path></svg></p></div>
        //         </div>
        //          <img src=${file2}>
        //         </div>
        //         <p>hellow</p>
        //         <div class="created">22.01 AM</div><!-- /created -->
        //         <button id="dispalyListView">c</button>
        //       </div>
        //       <!-- /message -->
        //     </div>
        //     `

        typeIcon.innerHTML = ""
        typeIcon.innerHTML = `${this._trans("location")} &nbsp;<svg aria-hidden="true" data-prefix="fas" data-icon="map" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-image fa-w-16" data-fa-i2svg>
        // <path fill="currentColor" d="M0 117.66v346.32c0 11.32 11.43 19.06 21.94 14.86L160 416V32L20.12 87.95A32.006 32.006 0 0 0 0 117.66zM192 416l192 64V96L192 32v384zM554.06 33.16L416 96v384l139.88-55.95A31.996 31.996 0 0 0 576 394.34V48.02c0-11.32-11.43-19.06-21.94-14.86z" class=""></path></svg>`
        typeIcon.style.display = "inline-block"
        /*  typeIcon.textContent = item.reply_message.message */

        // if (!this.checkVideo) {
        //   item.reply_message.message = this.$store.state.videoPath + item.reply_message.message
        // }/* end of if */
        // this.checkVideo = false

        // var video = document.createElement("video")
        // var source = document.createElement("source")
        // source.src = item.reply_message.message
        // video.appendChild(source)
        // video.controls = false
        // console.log("video : ", video)
        replayedMessage.appendChild(typeIcon)
        replayedMessage.style.minWidth = "120px"
        replayCover.appendChild(replayedMessage)
       

        this.drowLocation = null

        messageCover.children[0].prepend(replayCover)
        wepperChat.appendChild(messageCover)
        wepperChat.scrollTop = wepperChat.scrollHeight


      }/* end of if */

    },/* /displayReplyMessage */

    //this function for close reply function 
    closeReplyForm() {
      this.displyReply = false
    },/* /closeReplyForm */

    //this function used for display and hidden reply form
    displayReplyForm(check, id) {
      if (check) {
        this.displyReply = true
        this.replyId = id
        setTimeout(async () => {
          var textMessageReply = document.getElementsByClassName("textMessageReply")[0]
          var contentReplyedMessage = document.getElementsByClassName("contentReplyedMessage")[0]
          var replyedMessage = document.getElementById(id)
          var userReply = document.getElementsByClassName("userReply")[0]
          var coverTextReply = document.getElementsByClassName("coverTextReply")[0]

          var imageReply = document.createElement("img")
          var text = document.createElement("p")
          var canvas = document.createElement("canvas")
          var location = document.createElement("div")
          var context = null

          textMessageReply.innerHTML = ""
          contentReplyedMessage.innerHTML = ""

          //this for message content
          if (replyedMessage) {
            //this for children in message as paernt
            for (var i = 0; i < replyedMessage.children.length; i++) {
              //this for text message
              if (replyedMessage.children[i].tagName == "P") {
                textMessageReply.textContent = replyedMessage.children[i].textContent
                coverTextReply.style.width = "auto"
                break;
              }/* end of if */
              //this for vedio message
              else if (replyedMessage.children[i].classList.contains("videoType")) {
                text.innerHTML = `${this._trans("vedio")}&nbsp;&nbsp;&nbsp;<svg aria-hidden="true" data-prefix="fas" data-icon="film" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-film fa-w-16" data-fa-i2svg>
  <path fill="currentColor" d="M488 64h-8v20c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12V64H96v20c0 6.6-5.4 12-12 12H44c-6.6 0-12-5.4-12-12V64h-8C10.7 64 0 74.7 0 88v336c0 13.3 10.7 24 24 24h8v-20c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v20h320v-20c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v20h8c13.3 0 24-10.7 24-24V88c0-13.3-10.7-24-24-24zM96 372c0 6.6-5.4 12-12 12H44c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12H44c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12H44c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm272 208c0 6.6-5.4 12-12 12H156c-6.6 0-12-5.4-12-12v-96c0-6.6 5.4-12 12-12h200c6.6 0 12 5.4 12 12v96zm0-168c0 6.6-5.4 12-12 12H156c-6.6 0-12-5.4-12-12v-96c0-6.6 5.4-12 12-12h200c6.6 0 12 5.4 12 12v96zm112 152c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40z" class=""></path></svg>`
                textMessageReply.appendChild(text)
                coverTextReply.style.width = "70px"

                context = canvas.getContext("2d");
                context.drawImage(replyedMessage.children[i], 0, 0, 400, 200)
                //canvas.style.width="70px"
                contentReplyedMessage.appendChild(canvas)
                break;
              }/* end of if */
              //this section for fileType
              else if (replyedMessage.children[i].classList.contains("fileType")) {
                textMessageReply.innerHTML = `${replyedMessage.children[i].textContent} &nbsp;&nbsp;&nbsp;<svg aria-hidden="true" data-prefix="fas" data-icon="file" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="svg-inline--fa fa-image fa-w-16" data-fa-i2svg>
  <path fill="currentColor" d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm160-14.1v6.1H256V0h6.1c6.4 0 12.5 2.5 17 7l97.9 98c4.5 4.5 7 10.6 7 16.9z" class=""></path></svg>`
                coverTextReply.style.width = "auto"
                break
              }/* end of if */
              //this section for audio message type
              else if (replyedMessage.children[i].classList.contains("audioType")) {
                textMessageReply.innerHTML = `${this._trans("voiceFile")} &nbsp;&nbsp;&nbsp;<svg aria-hidden="true" data-prefix="fas" data-icon="microphone" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512" class="svg-inline--fa fa-microphone fa-w-11" data-fa-i2svg>
  <path fill="currentColor" d="M176 352c53.02 0 96-42.98 96-96V96c0-53.02-42.98-96-96-96S80 42.98 80 96v160c0 53.02 42.98 96 96 96zm160-160h-16c-8.84 0-16 7.16-16 16v48c0 74.8-64.49 134.82-140.79 127.38C96.71 376.89 48 317.11 48 250.3V208c0-8.84-7.16-16-16-16H16c-8.84 0-16 7.16-16 16v40.16c0 89.64 63.97 169.55 152 181.69V464H96c-8.84 0-16 7.16-16 16v16c0 8.84 7.16 16 16 16h160c8.84 0 16-7.16 16-16v-16c0-8.84-7.16-16-16-16h-56v-33.77C285.71 418.47 352 344.9 352 256v-48c0-8.84-7.16-16-16-16z" class=""></path></svg>`
                coverTextReply.style.width = "auto"
              }/* end of if */
              else if (replyedMessage.children[i].classList.contains("imgType")) {
                imageReply.src = replyedMessage.children[i].getAttribute("src")
                text.innerHTML = `${this._trans("image")} &nbsp;&nbsp;&nbsp;<svg aria-hidden="true" data-prefix="fas" data-icon="image" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-image fa-w-16" data-fa-i2svg>
  <path fill="currentColor" d="M464 448H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h416c26.51 0 48 21.49 48 48v288c0 26.51-21.49 48-48 48zM112 120c-30.928 0-56 25.072-56 56s25.072 56 56 56 56-25.072 56-56-25.072-56-56-56zM64 384h384V272l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L208 320l-55.515-55.515c-4.686-4.686-12.284-4.686-16.971 0L64 336v48z" class=""></path></svg>`
                contentReplyedMessage.appendChild(imageReply)
                textMessageReply.appendChild(text)
                coverTextReply.style.width = "70px"
                break;
              }/* end of if */
              //this section for image message and location message
              else if (replyedMessage.children[i].children[0]) {
                //this section for check image 
                if (replyedMessage.children[i].children[0].classList.contains("imgType")) {
                  imageReply.src = replyedMessage.children[i].children[0].getAttribute("src")
                  text.innerHTML = `${this._trans("image")} &nbsp;&nbsp;&nbsp;<svg aria-hidden="true" data-prefix="fas" data-icon="image" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-image fa-w-16" data-fa-i2svg>
  <path fill="currentColor" d="M464 448H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h416c26.51 0 48 21.49 48 48v288c0 26.51-21.49 48-48 48zM112 120c-30.928 0-56 25.072-56 56s25.072 56 56 56 56-25.072 56-56-25.072-56-56-56zM64 384h384V272l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L208 320l-55.515-55.515c-4.686-4.686-12.284-4.686-16.971 0L64 336v48z" class=""></path></svg>`
                  contentReplyedMessage.appendChild(imageReply)
                  textMessageReply.appendChild(text)
                  coverTextReply.style.width = "70px"
                  break;
                }/* end of if */
                //this section for location message
                else if (replyedMessage.children[i].children[0].classList.contains("loction")) {

                  location.style.width = "100%"
                  location.style.height = "100%"


                  //here we will convert google map to image
                  var canvass = await this.$html2canvas(replyedMessage.children[i].children[0], { useCORS: true })
                  if (canvass) {
                    var img = canvass.toDataURL("image/jpeg");
                    var image = new Image();
                    image.src = img;
                    location.appendChild(image)
                  }/* end 0f if */

                  location.classList.add("divLocations")
                  text.innerHTML = `${this._trans("location")} &nbsp;&nbsp;&nbsp;<svg aria-hidden="true" data-prefix="fas" data-icon="map" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-image fa-w-16" data-fa-i2svg>
  <path fill="currentColor" d="M0 117.66v346.32c0 11.32 11.43 19.06 21.94 14.86L160 416V32L20.12 87.95A32.006 32.006 0 0 0 0 117.66zM192 416l192 64V96L192 32v384zM554.06 33.16L416 96v384l139.88-55.95A31.996 31.996 0 0 0 576 394.34V48.02c0-11.32-11.43-19.06-21.94-14.86z" class=""></path></svg>`

                  location.style.width = "100px"
                  location.style.height = "60xp"
                  location.style.top = "0px"

                  contentReplyedMessage.appendChild(location)
                  textMessageReply.appendChild(text)
                  coverTextReply.style.width = "70px"
                  break;
                }/* end of if */

              }/* end of if * here add another type of message */
            }/* end of for loop */
          } else {
            textMessageReply.textContent = this._trans("noMessage")
          }/* end of if */

          //this for user reciver info
          if (userReply) {
            userReply.innerHTML = ""
            if (this.item) {
              if (this.item.username) {
                userReply.textContent = this.item.username
              } else if (this.item.last_name || this.item.first_name) {
                userReply.textContent = this.item.first_name + " " + this.item.last_name
              }/* end of if *//* end of if */
            }/* end of if */
          }/* end of if */


          coverTextReply.appendChild(userReply)
          coverTextReply.appendChild(textMessageReply)
          contentReplyedMessage.appendChild(coverTextReply)

          if (cookie.get("lang") == "ar") {
            contentReplyedMessage.style.boxShadow = "-7px 0px 0px inset #3cab44"
            imageReply.style.borderTopLeftRadius = "10px"
            imageReply.style.borderBottomLeftRadius = "10px"
            imageReply.style.left = "0px"

            canvas.style.borderTopLeftRadius = "10px"
            canvas.style.borderBottomLeftRadius = "10px"
            canvas.style.left = "0px"

            location.style.borderTopLeftRadius = "10px"
            location.style.borderBottomLeftRadius = "10px"
            location.style.left = "0px"

          } else {
            contentReplyedMessage.style.boxShadow = "7px 0px 0px inset #3cab44"
            imageReply.style.borderTopRightRadius = "10px"
            imageReply.style.borderBottomRightRadius = "10px"
            imageReply.style.right = "0px"

            canvas.style.borderTopRightRadius = "10px"
            canvas.style.borderBottomRightRadius = "10px"
            canvas.style.right = "0px"

            location.style.borderTopRightRadius = "10px"
            location.style.borderBottomRightRadius = "10px"
            location.style.right = "0px"

          }/* end of if */

        }, 10)//end of seTimeOut
      } else {
        this.displyReply = false
        console.log(id)
      }/* end of if */
    },/* /displayReplyForm */


    //this function used for connect to google maps befor used it
    async connectToMaps() {
      var googlee = await GoogleMapsApiLoader({
        libraries: ['places'],
        //apiKey: 'AIzaSyBun5TznzXlpL1qp6UD3GzTXfMcSoXj_5w' // optional
      }).catch(err => console.log(err))/* //google */
      this.google = googlee;
    } /* ,setup */,

    //this function used to recive event check connect 
    reciveCheckConnect() {
      var activeTemolat = `<p> ${this._trans("active")}</p>
              <span class="statreciverUser"></span>`

      var stateUser = document.getElementsByClassName("stateUser")[0]

      this.io.on("check connect", data => {
        stateUser.innerHTML = ""
        data.created_at = data.last_seen
        if (data.is_connect) {
          stateUser.innerHTML = activeTemolat
        } else {
          this.$emit("checkDate", data)
        }/* end of data */
      })/* /check connect */
    },/* /reciveCheckConnect */

    //this function used to send effect for server to check this user is connect 
    checkConnect() {
      var my_id = null
      var your_id = null

      if (cookie.get("user").id == cookie.get("sndRcvId").sender_id) {
        my_id = cookie.get("sndRcvId").sender_id,
          your_id = cookie.get("sndRcvId").reciver_id
      } else {
        my_id = cookie.get("sndRcvId").reciver_id,
          your_id = cookie.get("sndRcvId").sender_id
      }/* end of if */

      this.io.emit("check connect", {
        my_id, your_id
      })/* end of send Emit check connection */

    }/* checkConnect */,

    //this function used for send event for leftSide to display searcher message
    sendEventDisplayMsg() {
      this.$emit("displayMsgCover", true)
    }, /* /sendEventDisplayMsg */

    //this function to add new form for the messages
    newFormMessage(sender, reciver) {
      //here i will add new form for the message
      var triangle = null;
      var wepperChat = document.getElementsByClassName("wepper-chat")[0];
      if (!sender && !reciver) {
        for (var i = wepperChat.children.length - 1; i >= 0; i--) {
          //this section check the bottom message
          if (wepperChat.children[i - 1]) {
            if (
              !wepperChat.children[i + 1] ||
              (wepperChat.children[i + 1].getAttribute("usr_id") !=
                wepperChat.children[i].getAttribute("usr_id") &&
                wepperChat.children[i - 1].getAttribute("usr_id") ==
                wepperChat.children[i].getAttribute("usr_id"))
            ) {
              wepperChat.children[i].children[0].style.borderBottomRightRadius =
                "10px";
              wepperChat.children[i].children[0].style.borderBottomLeftRadius =
                "10px";
              wepperChat.children[i].children[0].style.borderTopLeftRadius =
                "5px";
              wepperChat.children[i].children[0].style.borderTopRightRadius =
                "5px";
            } /* end of if */

            //this check if message in the center or no
            else if (
              wepperChat.children[i + 1].getAttribute("usr_id") ==
              wepperChat.children[i].getAttribute("usr_id")
            ) {
              wepperChat.children[i].style.marginBottom = "5px";

              wepperChat.children[i].children[0].style.borderBottomRightRadius =
                "5px";
              wepperChat.children[i].children[0].style.borderBottomLeftRadius =
                "5px";
              wepperChat.children[i].children[0].style.borderTopLeftRadius =
                "5px";
              wepperChat.children[i].children[0].style.borderTopRightRadius =
                "5px";
            }
            /* end of if */
          } /* end of if */
          //here i will check the messageis first in the block or no
          if (
            !wepperChat.children[i - 1] &&
            !wepperChat.children[i].classList.contains("wepperDate")
          ) {
            console.log(
              "this first element in the chat room ",
              wepperChat.children[i]
            );
          } else if (
            wepperChat.children[i + 1] &&
            !wepperChat.children[i].classList.contains("wepperDate")
          ) {
            if (
              wepperChat.children[i - 1].getAttribute("usr_id") !=
              wepperChat.children[i].getAttribute("usr_id")
            ) {
              triangle = document.createElement("div");

              if (
                wepperChat.children[i].getAttribute("usr_id") == this.user.id
              ) {
                triangle.style.left = "0px";
              } else {
                triangle.style.right = "1px";
              } /* end of if */
              triangle.classList.add("triangle");
              wepperChat.children[i].appendChild(triangle);
              wepperChat.children[i].children[0].style.borderBottomRightRadius =
                "5px";
              wepperChat.children[i].children[0].style.borderBottomLeftRadius =
                "5px";
              wepperChat.children[i].children[0].style.borderTopLeftRadius =
                "5px";
              wepperChat.children[i].children[0].style.borderTopRightRadius =
                "5px";
            } /* end of if */
          } else if (
            !wepperChat.children[i + 1] &&
            wepperChat.children[i - 1].getAttribute("usr_id") !=
            wepperChat.children[i].getAttribute("usr_id")
          ) {
            triangle = document.createElement("div");

            if (wepperChat.children[i].getAttribute("usr_id") == this.user.id) {
              triangle.style.left = "0px";
            } else {
              triangle.style.right = "1px";
            } /* end of if */
            triangle.classList.add("triangle");
            wepperChat.children[i].appendChild(triangle);
            wepperChat.children[i].children[0].style.borderBottomRightRadius =
              "5px";
            wepperChat.children[i].children[0].style.borderBottomLeftRadius =
              "5px";
            wepperChat.children[i].children[0].style.borderTopLeftRadius =
              "5px";
            wepperChat.children[i].children[0].style.borderTopRightRadius =
              "5px";
          } /* end of if */
        } /* end of for loop */
      } else if (sender || reciver) {

        var myLastmessage = null
        var mybeforLastMessage = null
        if (wepperChat.children[wepperChat.children.length - 2])
          if (wepperChat.children[wepperChat.children.length - 2].getAttribute("usr_id") || wepperChat.children[wepperChat.children.length - 2].getAttribute("cover_id")) {
            myLastmessage = wepperChat.children[wepperChat.children.length - 2]
            mybeforLastMessage = wepperChat.children[wepperChat.children.length - 3]
          }
        if (wepperChat.children[wepperChat.children.length - 3])
          if (wepperChat.children[wepperChat.children.length - 2].classList.contains("typing")) {
            myLastmessage = wepperChat.children[wepperChat.children.length - 3]
            mybeforLastMessage = wepperChat.children[wepperChat.children.length - 4]
          }/* end of if */

        if (myLastmessage) {
          if (mybeforLastMessage)
            var checkpostionOfMessage =
              mybeforLastMessage.getAttribute(
                "cover_id"
              ) ||
              mybeforLastMessage.getAttribute(
                "usr_id"
              );
          var beforLstMessage =
            myLastmessage.getAttribute(
              "cover_id"
            ) ||
            myLastmessage.getAttribute(
              "usr_id"
            );

          if (
            beforLstMessage !=
            wepperChat.children[wepperChat.children.length - 1].getAttribute(
              "cover_id"
            )
          ) {
            triangle = document.createElement("div");

            if (
              sender
            ) {
              triangle.style.left = "0px";
            } else {
              triangle.style.right = "1px";
            } /* end of if */
            triangle.classList.add("triangle");
            wepperChat.children[wepperChat.children.length - 1].appendChild(
              triangle
            );
            wepperChat.children[
              wepperChat.children.length - 1
            ].children[0].style.borderBottomRightRadius = "5px";
            wepperChat.children[
              wepperChat.children.length - 1
            ].children[0].style.borderBottomLeftRadius = "5px";
            wepperChat.children[
              wepperChat.children.length - 1
            ].children[0].style.borderTopLeftRadius = "5px";
            wepperChat.children[
              wepperChat.children.length - 1
            ].children[0].style.borderTopRightRadius = "5px";
          } else if (
            beforLstMessage ==
            wepperChat.children[wepperChat.children.length - 1].getAttribute(
              "cover_id"
            )
          ) {

            if (wepperChat.children[wepperChat.children.length - 2].classList.contains("typing")) {

              wepperChat.children[
                wepperChat.children.length - 3
              ].style.marginBottom = "5px";

            } else {
              wepperChat.children[
                wepperChat.children.length - 2
              ].style.marginBottom = "5px";

            }/* end of if */

            wepperChat.children[
              wepperChat.children.length - 1
            ].children[0].style.borderBottomRightRadius = "10px";
            wepperChat.children[
              wepperChat.children.length - 1
            ].children[0].style.borderBottomLeftRadius = "10px";
            wepperChat.children[
              wepperChat.children.length - 1
            ].children[0].style.borderTopLeftRadius = "5px";
            wepperChat.children[
              wepperChat.children.length - 1
            ].children[0].style.borderTopRightRadius = "5px";

            if (checkpostionOfMessage == beforLstMessage) {
              if (wepperChat.children[wepperChat.children.length - 2].classList.contains("typing")) {
                wepperChat.children[
                  wepperChat.children.length - 3
                ].children[0].style.borderBottomRightRadius = "5px";
                wepperChat.children[
                  wepperChat.children.length - 3
                ].children[0].style.borderBottomLeftRadius = "5px";
                wepperChat.children[
                  wepperChat.children.length - 3
                ].children[0].style.borderTopLeftRadius = "5px";
                wepperChat.children[
                  wepperChat.children.length - 3
                ].children[0].style.borderTopRightRadius = "5px";
              } else {
                wepperChat.children[
                  wepperChat.children.length - 2
                ].children[0].style.borderBottomRightRadius = "5px";
                wepperChat.children[
                  wepperChat.children.length - 2
                ].children[0].style.borderBottomLeftRadius = "5px";
                wepperChat.children[
                  wepperChat.children.length - 2
                ].children[0].style.borderTopLeftRadius = "5px";
                wepperChat.children[
                  wepperChat.children.length - 2
                ].children[0].style.borderTopRightRadius = "5px";
              }/* end of if */
            } /* end of if */
          } /* end of if */
        } else {
          triangle = document.createElement("div");

          if (
            sender
          ) {
            triangle.style.left = "0px";
          } else {
            triangle.style.right = "1px";
          } /* end of if */
          triangle.classList.add("triangle");
          wepperChat.children[wepperChat.children.length - 1].appendChild(
            triangle
          );
          wepperChat.children[
            wepperChat.children.length - 1
          ].children[0].style.borderBottomRightRadius = "5px";
          wepperChat.children[
            wepperChat.children.length - 1
          ].children[0].style.borderBottomLeftRadius = "5px";
          wepperChat.children[
            wepperChat.children.length - 1
          ].children[0].style.borderTopLeftRadius = "5px";
          wepperChat.children[
            wepperChat.children.length - 1
          ].children[0].style.borderTopRightRadius = "5px";
        } /* end of if */
      } /* end of if */
    } /* /newFormMessage */,

    //this function used for check format date for my wepperChat and message
    checkWepperDate(data, parter) {
      var dateMsg = null;
      var currentDate = new Date();

      if (parter == true) {
        for (var i = 0; i < 10; i++) {
          if (dateMsg) dateMsg += data.created_at[i];
          else dateMsg = data.created_at[i];
        } /* end of for loop */
        var newDate = new Date(dateMsg * 1000);
        if (
          !this.lastDateMsg ||
          this.lastDateMsg.getDate() < newDate.getDate()
        ) {
          this.lastDateMsg = newDate;
          if (
            this.lastDateMsg.getMonth() + 1 == currentDate.getMonth() + 1 &&
            this.lastDateMsg.getFullYear() == currentDate.getFullYear() &&
            this.lastDateMsg.getDate() == currentDate.getDate()
          ) {
            return /* newDate */ this._trans("today");
          } else if (
            this.lastDateMsg.getMonth() + 1 == currentDate.getMonth() + 1 &&
            this.lastDateMsg.getFullYear() == currentDate.getFullYear() &&
            this.lastDateMsg.getDate() + 1 == currentDate.getDate()
          ) {
            return this._trans("yesterday");
          } else {
            if (cookie.get("lang") == 'ar')
              return changeNumberFormat.changeNumberFormat(moment(this.lastDateMsg).format("YYYY/MM/DD"));
            else
              return moment(this.lastDateMsg).format("YYYY/MM/DD")
          } /* end of if */
        } /* end of if */
        return null;
      } /* end of if */
    } /* /checkWepperDate */,

    //this function used for check format date for myContact number or old Chat
    checkFormatDate(data) {
      //var currentDate=new Date()

      if (data.dateTime) {
        data.dateTime = String(data.dateTime)
      } else if (data.created_at) {
        data.created_at = String(data.created_at)
      }/* /end of if */

      var dateMsg = null;
      for (var i = 0; i < 10; i++) {
        if (data.dateTime) {
          if (dateMsg) dateMsg += data.dateTime[i];
          else dateMsg = data.dateTime[i];
        } else if (data.created_at) {
          if (dateMsg) dateMsg += data.created_at[i];
          else dateMsg = data.created_at[i];
        } /* end of if */
      } /* end of for loop */
      var lastMsgDate = new Date(parseInt(dateMsg) * 1000);
      var currentDate = new Date();

      //must convert to date time
      // in same day only the time 11:5pm
      //yestrday
      //normal date 9/5/2021

      if (
        lastMsgDate.getMonth() + 1 == currentDate.getMonth() + 1 &&
        lastMsgDate.getFullYear() == currentDate.getFullYear() &&
        lastMsgDate.getDate() == currentDate.getDate()
      ) {
        //this section used for check the date is in same current date
        if (cookie.get("lang") == 'ar')
          return changeNumberFormat.changeNumberFormat(moment(lastMsgDate).format("LT"), true);
        else
          return moment(lastMsgDate).format("LT")
      } else if (
        lastMsgDate.getMonth() + 1 == currentDate.getMonth() + 1 &&
        lastMsgDate.getFullYear() == currentDate.getFullYear() &&
        lastMsgDate.getDate() + 1 == currentDate.getDate()
      ) {
        //this section used for check the date is yestarday or no
        return this._trans("yesterday");
      } else {
        //this section for old date
        if (cookie.get("lang") == 'ar')
          return changeNumberFormat.changeNumberFormat(moment(lastMsgDate).format("YYYY/MM/DD"), true);
        else
          return moment(lastMsgDate).format("YYYY/MM/DD")
      } /* end of if */
    } /* /checkFormatDate */,

    //this function to take respine when update on message
    reciveEditMessage() {
      this.io.on("editmsg", (data) => {
        var messageCover = document.getElementById(data.message_id);
        const wepperChat = document.getElementsByClassName("wepper-chat")[0];
        if (messageCover && data.edited == 1) {
          if (
            messageCover.children[0].tagName == "DIV" &&
            messageCover.children[0].textContent == this._trans("modified")
          ) {
            messageCover.children[0].innerHTML = "";
            messageCover.children[0].remove();
          } /* end of if */
          var div = document.createElement("div");
          div.classList.add("modified");
          div.textContent = this._trans("modified");
          messageCover.insertBefore(div, messageCover.children[0]);

          if (cookie.get("sndRcvId")) {
            if (
              cookie.get("sndRcvId").sender_id == data.reciver_id &&
              cookie.get("sndRcvId").reciver_id == data.sender_id
            ) {
              if (this.checkUrlInMessage(data.message)) {
                messageCover.children[1].innerHTML = this.checkUrlInMessage(
                  data.message
                );
              } else {
                messageCover.children[1].textContent = data.message;
              } //end of if
              wepperChat.scrollTop = wepperChat.scrollHeight;
            } /* end of if */
          } /* end of if */
        } /* end of if */
      }); /* /editmsg */
    } /* /reciveEditMessage */,

    //this function used for send updated message
    sendEditMessage() {
      if (this.editMyessage) {
        var message = document.getElementById(this.msgId);
        if (message.children[0].textContent != this.editMyessage) {
          this.io.emit("editmsg", {
            message_id: this.msgId,
            message: this.editMyessage,
          });
          for (var i = 0; i < message.children.length; i++) {
            if (
              message.children[i].tagName == "DIV" &&
              message.children[i].textContent == this._trans("modified")
            ) {
              message.children[i].innerHTML = "";
              message.children[i].remove();
            } /* end of if */

            if (message.children[i].tagName == "P") {
              if (this.checkUrlInMessage(this.editMyessage)) {
                message.children[i].innerHTML = this.checkUrlInMessage(
                  this.editMyessage
                );
              } else {
                message.children[i].textContent = this.editMyessage;
              } //end of if
            } /* end of if */
          } /* end of for loop */
          this.editMyessage = null;
          this.msgId = null;
        } else {
          this.editMyessage = null;
          this.msgId = null;
        } /* end of if */
      } else {
        console.log("you can not set empaty message");
      } /* end of if */
    } /* /sendEditMessage */,

    //this function used for update message
    editMessage(msgId) {
      var message = document.getElementById(msgId);
      var dispalyListView = message.children[3];
      var loader = document.createElement("div");
      loader.classList.add("loader");

      if (dispalyListView.tagName == "BUTTON") {
        dispalyListView.blur();
      } /* END OF IF */

      for (var i = 0; i < message.children.length; i++) {
        switch (message.children[i].tagName) {
          //this section to get old text message
          case "P":
            this.editMyessage = message.children[i].textContent;
            this.msgId = msgId;
            break;

          //this section to get old image message
          // case "DIV":
          //   if (message.children[i].children[0])
          //     if (
          //       message.children[i].children[0].tagName == "IMG" &&
          //       message.children[i].children[0].classList.contains("imgType")
          //     ) {
          //       var file = document.getElementById("updateFile");
          //       if (file) {
          //         file.onclick = function () {
          //           this.value = null;
          //         };
          //       } /* end of if */
          //       file.click();
          //       file.addEventListener("change", (e) => {
          //         var extn =
          //           "." +
          //           e.target.files[0].name.split(".")[
          //             e.target.files[0].name.split(".").length - 1
          //           ];
          //         if (
          //           //is validate on image file
          //           extn == ".jpg" ||
          //           extn == ".jpeg" ||
          //           extn == ".gif" ||
          //           extn == ".png" ||
          //           extn == ".tiff" ||
          //           extn == ".raw" ||
          //           extn == ".PNG"
          //         ) {
          //           const fileReader = new FileReader();
          //           fileReader.addEventListener("load", async () => {
          //             setTimeout(() => {
          //               wepperChat.scrollTop =
          //                 weeperTopp
          //             }, 100);
          //             const img64 = await fileReader.result;
          //             message.children[0].children[0].src = img64;
          //             message.children[0].appendChild(loader)
          //             message.children[0].style.display="flex"
          //             message.children[0].style.alignItems="center"
          //             message.children[0].style.justifyContent="center"
          //             loader.style.position="absolute"
          //           });
          //           fileReader.readAsDataURL(file.files[0]);

          //           //this section to create primare prameter and send him to the server

          //         } else {
          //           this.messageWrong = this._trans("unspportedFile");
          //           setTimeout(() => {
          //             if (this.messageWrong) {
          //               this.messageWrong = null;
          //             } /* end of if  */
          //           }, 4999); /* end of setTimeOut */
          //         } /* end of if */
          //       }); /* end of eventListener for change */
          //     } /* end of if */
          //   break;

          default:
            console.log(
              "this tag name is not supported : ",
              message.children[i].tagName
            );
            break;
        } /* end of switch */
      } /* end of for loop */
    } /* /editMessage */,

    //this function used for close EditMyessage
    closeEditMyessage() {
      this.editMyessage = null;
    } /* /closeEditMyessage */,

    //this function to check if the message contain on link or no
    checkUrlInMessage(msg) {
      var urlRegex =
        msg.match(/\bhttps?::\/\/\S+/gi) || msg.match(/\bhttps?:\/\/\S+/gi);
      if (urlRegex) {
        var urlr = null;
        for (var i = 0; i < urlRegex.length; i++) {
          if (!urlr) {
            urlr = msg.replace(urlRegex[i], function (url) {
              return (
                '<a class="msgLink" target="_blank" href="' +
                url +
                '">' +
                url +
                "</a>"
              );
            }); /* end of url function  */
          } else {
            var check = true;
            /* console.log("i : " , i, " i-1 :",i-1) */
            for (var j = 0; j <= 1 - i; j++) {
              if (urlRegex[j] == urlRegex[i]) {
                check = false;
              } /* end if if */
            } /* end of forEach */

            if (check) {
              urlr = urlr.replace(urlRegex[i], function (url) {
                return (
                  '<a class="msgLink" target="_blank" href="' +
                  url +
                  '">' +
                  url +
                  "</a>"
                );
              }); /* end of url function  */
            } /* end of if */
          } /* end of if */
        } /* end of for loop */
        return urlr;
      } /* end of if */
      return null;
    } /* /checkUrlInMessage */,

    //this function used when the user take a unblock from other user and the current user not found in same conversation
    checkUnblockConversation(x) {
      x.forEach((el) => {
        var user_id = null;
        if (cookie.get("sndRcvId").sender_id == cookie.get("user").id) {
          user_id = cookie.get("sndRcvId").reciver_id;
        } else {
          user_id = cookie.get("sndRcvId").sender_id;
        } /* end of if */

        if (el.user_id == cookie.get("user").id && el.my_id == user_id) {
          this.item.blocked_for = el.item.blocked_for;
          this.item.blocked = el.item.blocked;
        } /* end of if */
      }); /* end of forEach */
    } /* /checkUnblockConversation */,

    //this function used when the user take a block from other user and the current user not found in same conversation
    checkBlockConversation(x) {
      x.forEach((el) => {
        var user_id = null;
        if (cookie.get("sndRcvId").sender_id == cookie.get("user").id) {
          user_id = cookie.get("sndRcvId").reciver_id;
        } else {
          user_id = cookie.get("sndRcvId").sender_id;
        } /* end of if */

        if (el.user_id == cookie.get("user").id && el.my_id == user_id) {
          this.item.blocked_for = el.item.item.blocked_for;
          this.item.blocked = el.item.item.blocked;
        } /* end of if */
      }); /* end of forEach */
    } /* /checkBlockConversation */,

    //this function used for unblock user from chat componenet becouse it is found one more than palce
    unblockUser(item) {
      var payload = {
        user_id: null,
        my_id: String(cookie.get("user").id) || null,
        block: false,
      }; /* end of pyload  */

      if (item.sender_id == cookie.get("user").id) {
        payload.user_id = item.reciver_id;
      } else {
        payload.user_id = item.sender_id;
      } /* end of if */

      if (!payload.user_id) {
        payload.user_id = item.id;
      } /* end of  */

      var x = null;
      if (!item.item) {
        x = {};
        x.item = item;
      }
      if (x) {
        this.$emit("unblockUser", payload, x);
        x = null;
      } else {
        this.$emit("unblockUser", payload, item);
      }
    } /* /unblockUser */,

    //this function used for send currentLocation to other user
    sendLocation(replyId) {

      // navigator.permissions.query({ name: 'geolocation' }).then(function (result) {
      //   if (result.state == 'granted') {
      //     report(result.state);
      //     //geoBtn.style.display = 'none';
      //   } else if (result.state == 'prompt') {
      //     report(result.state);
      //     //geoBtn.style.display = 'none';
      //   }/* /end of if */
      // })/* /permission */

      if (navigator.geolocation) {
        //check if geolocation is available
        var aMap = document.createElement("div");
        var imgMap = document.createElement("img");
        var myMessageCover = document.createElement("div");
        var message = document.createElement("div");
        var created = document.createElement("div");
        var msg = "";
        const wepperChat = document.getElementsByClassName("wepper-chat")[0];

        navigator.geolocation.getCurrentPosition(function (position) {
          // aMap.href =
          //   "https://www.google.com/maps?q=" +
          //   position.coords.latitude +
          //   "," +
          //   position.coords.longitude +
          //   "&z=17&hl=ar";
          cookie.set(
            "location",
            JSON.stringify(
              position.coords.latitude + "," + position.coords.longitude
            )
          );
        }); /* end of geolocation */

        msg = cookie.get("location");
        cookie.remove("location");

        //aMap.target = "_blank";

        imgMap.src = map;
        aMap.style.width = "100%";
        aMap.style.height = "200px";
        /* imgMap.style.width = "100%";
        imgMap.style.height = "200px";
        aMap.appendChild(imgMap); */
        created.classList.add("created");

        if (cookie.get("lang") == 'ar')
          created.textContent = changeNumberFormat.changeNumberFormat(moment(new Date()).format("LT"), true);
        else
          created.textContent = moment(new Date()).format("LT");

        message.classList.add("message");
        myMessageCover.classList.add("myMessageCover");
        message.appendChild(aMap);
        message.setAttribute("id", uuid.v4() + new Date().getTime());
        message.appendChild(created);
        this.newFormMessage(this.user.id);
        message.style.minWidth = "260px"

        myMessageCover.classList.add("myMessageCover");
        myMessageCover.appendChild(message);
        wepperChat.appendChild(myMessageCover);
        wepperChat.scrollTop = wepperChat.scrollHeight;
        this.getBoundingReact(message.getAttribute("id"), "snd");

        if (this.showmunu == false) {
          this.showMenu();
        } /* end of if */

        var snd_id = 0;
        var rcv_id = 0;

        if (cookie.get("sndRcvId").sender_id == this.user.id) {
          snd_id = cookie.get("sndRcvId").sender_id;
          rcv_id = cookie.get("sndRcvId").reciver_id;
        } else {
          snd_id = cookie.get("sndRcvId").reciver_id;
          rcv_id = cookie.get("sndRcvId").sender_id;
        }/* /end of if */

        if (msg) {
          this.io.emit("new message", {
            sender_id: snd_id,
            reciver_id: rcv_id,
            message: msg,
            message_type: "location",
            dateTime: new Date().getTime(),
            message_id: message.getAttribute("id"),
            state: 0,
            reply: replyId || null
          }); /* end of new message emit */

          this.replyId = null
          this.fcmToken = cookie.get("fcmToken");
          cookie.remove("fcmToken");
          if (this.fcmToken.data.chat_id) {
            this.fcmToken.data.type = "location";
            this.fcmToken.data.body = msg;
          } /* end of if */
          cookie.set("fcmToken", this.fcmToken);

          this.sendNotfication(this.fcmToken);
        } else {
          console.log("some things wrong");
        } /* end of if */
        console.log(cookie.get("location"));
      } else {
        console.log("this browser not supported this type of message");
      } /* end of if */

      this.newFormMessage();
      this.drawLocation(aMap, msg)
      this.displyReply = false
    } /* /sendLocation */,

    //drawing the location 
    drawLocation(aMap, msg, draw) {

      var divv = document.createElement("div")
      divv.classList.add("loction")
      msg = msg.split(",")
      var myLatLng = new this.google.maps.LatLng(parseFloat(msg[0].split('"')[1]), parseFloat(msg[1]));
      var mapOptions = {
        zoom: 11,
        center: myLatLng,
        mapTypeId: this.google.maps.MapTypeId.ROADMAP
      };

      var map = new this.google.maps.Map(divv, mapOptions);

      var marker = new this.google.maps.Marker({
        position: myLatLng,
        map: map
      });

      this.google.maps.event.addListenerOnce(map, 'click', function (e) {

        var origin = marker.getPosition();
        var coords = [
          origin,
          e.latLng,
          origin,
        ];

        var poly = new this.google.maps.Polygon({
          map: map,
          paths: coords,
          editable: true,
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#FF0000',
          fillOpacity: 0.35
        });
        console.log("poly : ", poly)
      });

      if (draw)
        return divv
      else
        aMap.appendChild(divv)
      //divv.children[2].style.display="none"
      divv.style.width = "100%"
      divv.style.height = "200px"
    },/* /initialize */

    //this function used for display meno for location and file ... etc
    showMenu() {
      var munuOption = document.getElementsByClassName("munuOption")[0];
      if (this.showmunu) {
        this.showmunu = false;
        munuOption.style.transform = "translateY(-180px)";
      } else {
        this.showmunu = true;
        munuOption.style.transform = "translateY(180px)";
      } /* end of if  */
    } /* /showMenu */,

    //this function used when the screen work in mobile mode used for retern for contact page
    returnToBack() {
      var leftSideBar = document.getElementsByClassName("leftSideBar")[0];
      var rightSidebar = document.getElementsByClassName("rightSidebar")[0];
      var screenSize = document.body;

      if (screenSize.offsetWidth < 576) {
        if (leftSideBar && rightSidebar) {
          rightSidebar.style.zIndex = 0;
          leftSideBar.style.zIndex = 3;
          cookie.remove("sndRcvId");
        } /* end of if  */
      } /* end of if */

      document.getElementsByClassName("fullScreen")[0].style.visibility = "visible"
      document.getElementsByClassName("fullScreen")[0].style.zIndex = "200"
    } /* /returnToBack */,

    //this function used to send notifaction for reciver user from old chat
    sendNotfication(x) {
      this.$store.dispatch("sendNotfication", x);
    } /* /sendNotfication */,

    //this function check is user us connect or no and display state on chat room
    // checkUserConnection() {
    //   if (this.$store.state.checkUserConnet.length > 0) {
    //     var stateUser = document.getElementsByClassName("stateUser")[0];
    //     var nameUser = document.getElementsByClassName("nameUser")[0];
    //     if (stateUser) {
    //       if (cookie.get("sndRcvId")) {
    //         if (cookie.get("sndRcvId").chat_id) {
    //           nameUser.style.transform = "translateY(0px)";
    //           var rcv = null;
    //           if (cookie.get("user").id == cookie.get("sndRcvId").sender_id) {
    //             rcv = cookie.get("sndRcvId").reciver_id;
    //           } else {
    //             rcv = cookie.get("sndRcvId").sender_id;
    //           } /* end of if */

    //           this.$store.state.checkUserConnet.forEach((el) => {
    //             if (el.user_id == rcv) {
    //               stateUser.innerHTML = "";
    //               if (el.connect) {
    //                 stateUser.innerHTML = `<p>${this._trans("active")}</p>
    //         <span class="statreciverUser"></span>`;
    //               } else {
    //                 stateUser.innerHTML = "";
    //                 var start = moment(new Date(parseInt(el.lastseen)));
    //                 var end = moment(new Date());
    //                 var time = end.from(start, true);
    //                 stateUser.innerHTML = `<p>${time}</p>`;
    //               } /* end of if */
    //             }
    //           }); /* end of forEach */
    //         } else {
    //           stateUser.innerHTML = "";
    //           nameUser.style.transform = "translateY(12.5px)";
    //         } /* end of if */
    //       } /* end of if */
    //     } /* end of if */
    //   } /* end of of */
    // } /* /checkUserConnection */,

    //this function used to display reciver profile
    showUserProfile() {
      var id = null;

      if (cookie.get("sndRcvId")) {
        if (cookie.get("sndRcvId").sender_id && this.user.id)
          id = cookie.get("sndRcvId").reciver_id;
      } else {
        id = cookie.get("sndRcvId").sender_id;
      } /* end of if */

      this.$store.dispatch("getProfileUser", id);
      var showProfileUser =
        document.getElementsByClassName("showProfileUser")[0];
      if (showProfileUser == document.activeElement) {
        showProfileUser.blur();
      } else {
        showProfileUser.focus();
      }
    },

    //this function for add content same edit and delte and redirect for every message
    getBoundingReact(id, ck, v) {
      try {
        var getBoundingForMessage = document.getElementById(id);
        var wepperChat = document.getElementsByClassName("wepper-chat")[0];

        if (getBoundingForMessage) {
          var downArrow = document.createElement("i");

          var btn = document.createElement("button");
          var listView = document.createElement("div");
          var wepperListView = document.createElement("div");
          var redirectMessage = document.createElement("div");
          var updateMessage = document.createElement("div");
          var deleteMessage = document.createElement("div");
          var replyMessage = document.createElement("div")

          replyMessage.classList.add("replyMessage")
          deleteMessage.textContent = this._trans("delete");
          deleteMessage.classList.add("deleteMessage");

          replyMessage.textContent = this._trans("reply")
          replyMessage.addEventListener("click", () => {
            this.displayReplyForm(true, id)
            btn.blur();
          })/* end of addEventListner */

          //this section used for delete message
          deleteMessage.addEventListener("click", () => {
            this.redirectMessage(id, "delete");
            if (ck == "rcv") this.$store.state.cdelete = "rcv";
            else this.$store.state.cdelete = "snd";
            btn.blur();
          }); /* end of event Listener */

          if (ck != "rcv") {
            if (
              ((getBoundingForMessage.children[0].classList.contains(
                "modified"
              ) || getBoundingForMessage.children[0].classList.contains(
                "coverReplyText"
              )) &&
                (getBoundingForMessage.children[1].tagName == "P" || getBoundingForMessage.children[2].tagName == "P")) ||
              getBoundingForMessage.children[0].tagName == "P"
            ) {
              updateMessage.textContent = this._trans("edit");
              updateMessage.classList.add("updateMessage");
              wepperListView.appendChild(updateMessage);
              updateMessage.addEventListener("click", () => {
                this.editMessage(id);
              }); /* end of addEventListener */
            } /* end of if */
          } /* end of if */

          redirectMessage.textContent = this._trans("redirect");
          redirectMessage.classList.add("redirectMessage");

          //this section used for redirect message
          redirectMessage.addEventListener("click", () => {
            this.redirectMessage(id, "redirct");
            btn.blur();
          }); /* end of event Listener */

          this.wepperContent.push(id);
          wepperListView.appendChild(deleteMessage);
          wepperListView.appendChild(redirectMessage);
          wepperListView.appendChild(replyMessage);
          wepperListView.classList.add("wepperListView");

          listView.appendChild(wepperListView);
          listView.classList.add("listVieww");
          //this function to take information message for redirect message
          /* this.redirectMessage(redirectMessage,item) */

          downArrow.classList.add("arrow");
          downArrow.classList.add("down");

          btn.appendChild(downArrow);

          btn.appendChild(listView);

          btn.appendChild(listView);
          btn.setAttribute("id", "dispalyListView");

          getBoundingForMessage.appendChild(btn);
          btn.addEventListener("focus", () => {
            //this to move the list for the top when the listView is overflow in wepperChat
            if (
              wepperChat.getBoundingClientRect().bottom -
              getBoundingForMessage.getBoundingClientRect().bottom <=
              178
            ) {
              listView.style.top = "-150px";
            } /* end of if */

            if (
              wepperChat.getBoundingClientRect().right -
              getBoundingForMessage.getBoundingClientRect().right >
              0
            ) {
              listView.style.right = "-150px";
            } /* end of if */

            if (
              wepperChat.getBoundingClientRect().left -
              getBoundingForMessage.getBoundingClientRect().left <=
              0
            ) {
              listView.style.left = "0px";
            } /* end of if */

            if (
              wepperChat.getBoundingClientRect().right -
              getBoundingForMessage.getBoundingClientRect().right <
              150
            ) {
              listView.style.right = "0px";
              listView.style.left = "unset";
            } /* end of if */

            //this for disable show date when the button is active
            getBoundingForMessage.addEventListener("click", () => {
              var created =
                getBoundingForMessage.getElementsByClassName("created")[0];
              if (created.classList.contains("showDate"))
                created.classList.remove("showDate");
            }); /* end of event listener */
          }); /* end of if */

          if (getBoundingForMessage.children[1])
            if (ck == "snd") {
              if (
                getBoundingForMessage.children[1].classList.contains(
                  "audioType"
                )
              ) {
                downArrow.style.transform =
                  "rotate(45deg) translate(-4px,-8px)";
              } /* end of if */
            } else if (v) {
              getBoundingForMessage.children.item(2).style.transform =
                "translate(2px, -3px)";
              downArrow.style.transform = "rotate(45deg)";
            }
        } /* end of if */
      } catch (e) {
        console.log(e);
      } /* end of try and catch */
    } /* end of  getBoundingReact*/,

    //this function to redirect meesage where take the message id and type redirct
    //and use for delete when the type delete
    redirectMessage(id, type) {
      try {
        const formInput = document.getElementById("sectionForRedirect");
        var wepperChat = document.getElementsByClassName("wepper-chat")[0];
        this.sectionForRedirect = true;
        if (id != null) {
          this.typeEffect = type;

          formInput.style.display = "none";
          this.meesagesId = [];
          this.countForRedirectMessage = 0;
          this.redirectMessagesId = [];
          /*  this.sectionForRedirect = false; */

          if (
            cookie.get("sndRcvId").chat_id &&
            (type == "redirct" || type == "delete")
          ) {
            //this metter only for get background color
            const contactList =
              document.getElementsByClassName("contactList")[0];

            for (var i = 0; i < wepperChat.children.length; i++) {
              let coverMessage = wepperChat.children[i];
              coverMessage.style.background = "none";
              /*let clicked = this.sectionForRedirect; */
              wepperChat.children[i].onclick = () => {
                var messageId = coverMessage.children[0].getAttribute("id");
                if (!this.meesagesId[messageId]) this.meesagesId[messageId] = 0;

                if (this.meesagesId[messageId] == 0) {
                  this.countForRedirectMessage += 1;
                  coverMessage.style.background =
                    getComputedStyle(contactList).backgroundColor;
                  coverMessage.style.borderRadius = "8px";
                  if (
                    coverMessage.children[0].classList.contains("message") &&
                    coverMessage.children[0].getAttribute("id")
                  ) {
                    this.redirectMessagesId.push(
                      coverMessage.children[0].getAttribute("id")
                    );
                  } /* end of if */
                  this.meesagesId[messageId] = 1;
                } else if (this.meesagesId[messageId] == 1) {
                  this.countForRedirectMessage -= 1;
                  if (this.countForRedirectMessage < 0)
                    this.countForRedirectMessage = 0;
                  coverMessage.style.background = "none";
                  this.redirectMessagesId = this.redirectMessagesId.filter(
                    function (value) {
                      return (
                        value != coverMessage.children[0].getAttribute("id")
                      );
                    }
                  );
                  this.meesagesId[messageId] = 0;
                } /* end of if */
              }; /* end of addEventListener */
            } /* end of for loop */
          } /* end of if */
        } else {
          formInput.style.display = "grid";
          this.sectionForRedirect = false;
          this.countForRedirectMessage = 0;
          this.redirectMessagesId = [];
          this.meesagesId = [];
          for (var j = 0; j < wepperChat.children.length; j++) {
            wepperChat.children[j].style.background = "none";
          } /* end of for loop */
        } /* end of if */
      } catch (e) {
        console.log(e);
      }
    } /* /redirectMessage */,

    //this function only for test where created to delete every thinks from redirectMessage
    // but dont work successfly now
    endEventForRedirectMessage() {
      this.redirectMessage(null);
    } /* /endEventForRedirectMessage */,

    //this function used for send message RedirectId for the vuex if found message RedirectId
    sendRedirectMessageId() {
      try {
        if (this.redirectMessagesId.length > 0) {
          this.$store.state.redirectMessages = {};
          this.$store.state.redirectMessages.message_id =
            this.redirectMessagesId;
        } else {
          console.log("plase detrmain messages and try agine");
        } /* end of if */
      } catch (e) {
        console.log(e);
      }
    } /* /sendRedirectMessageId */,

    //this function for delete message between two user
    deleteMessages() {
      try {
        if (this.redirectMessagesId.length > 0) {
          this.$store.state.deleteMessages = {};
          this.$store.state.deleteMessages.message_id = this.redirectMessagesId;
        } else {
          console.log("plase detrmain messages and try agine");
        } /* end of if */
      } catch (e) {
        console.log(e);
      } /* end of try catch */
    } /* /deleteMessages */,

    //this function to create roomId before any calling
    startCall(requirement, callType) {
      try {
        this.showCalling = true;
        if (requirement) {
          var snd_id = 0;
          var rcv_id = 0;

          //this for detrmaine who is sender and who is reciver
          if (cookie.get("sndRcvId").sender_id == this.user.id) {
            snd_id = cookie.get("sndRcvId").sender_id;
            rcv_id = cookie.get("sndRcvId").reciver_id;
          } else {
            snd_id = cookie.get("sndRcvId").reciver_id;
            rcv_id = cookie.get("sndRcvId").sender_id;
          } /* end of if  */
          //this to request peerId from reciver call
          this.io.emit("getPeerId", {
            snd_id: String(snd_id),
            rcv_id: String(rcv_id),
            user: cookie.get("user"),
            type: callType,
            message: ""
          });
        } else {
          console.log("");
        } /* end of if */
      } catch (e) {
        console.log(e);
      } /* end of try catch */
    } /* /startCall */,

    closeCall() {
      var snd_id = 0;
      var rcv_id = 0;
      if (cookie.get("sndRcvId").sender_id == this.user.id) {
        snd_id = cookie.get("sndRcvId").sender_id;
        rcv_id = cookie.get("sndRcvId").reciver_id;
      } else {
        snd_id = cookie.get("sndRcvId").reciver_id;
        rcv_id = cookie.get("sndRcvId").sender_id;
      } /* end of if  */
      this.showCalling = false;
      this.io.emit("closeCall", { snd_id, rcv_id });
    } /* /closeCall */,

    sendPeerId() {
      //this to send peer id for sender
      this.io.on("sendPeerId", (data) => {

        this.$emit("calling", data);
      }); /* end of sendPeerId */
    } /* /controllerPeerId */,

    fetchPeerId() {
      try {
        this.io.on("fetchPeerId", (data) => {
          if (data.peerId) {
            this.$store.state.rcvPeerId = data;
            //this section for send my id for rciver after accept me
            this.io.emit("take my id", {
              rcv_id: data.rcv_id,
              peerId: this.$store.state.myPeerId,
            });

            this.$router.push({
              path: "/contact",
              query: { snd_id: data.snd_id, rcv_id: data.rcv_id, audio: data.type.audio, video: data.type.video },
            });
          } else {
            this.showCalling = false;
          } /* end of peerId */
        }); /* /fetchPeerId */
      } catch (e) {
        console.log(e);
      } /* end of try catch */
    } /* /fetchPeerId */,

    //this function used when I send new message to other user only text and voice
    async addMsg(replyId) {
      try {
        this.typing = false;

        if (document.getElementsByClassName("myMessageInput")) {
          document.getElementsByClassName("myMessageInput")[0].style.display =
            "block";
          document.getElementsByClassName("voiceMsg")[0].style.display = "none";
          document.getElementsByClassName("sendVoice")[0].style.display =
            "none";
          document.getElementsByClassName("microphone")[0].style.display =
            "flex";
        } /* end of if */

        var created = document.createElement("div");
        var message = document.createElement("div");
        var myMessageCover = document.createElement("div");
        //var messageYouCover = document.createElement("div");
        var audioTag = document.createElement("audio");
        var source = document.createElement("source");
        var p = document.createElement("p");

        var seen = document.createElement("div");
        var imgSeen = document.createElement("div");

        var snd_id = 0;
        var rcv_id = 0;

        var wepperChat = null;
        wepperChat = document.getElementsByClassName("wepper-chat")[0];

        if (!wepperChat) {
          wepperChat = document.createElement("div");
          wepperChat.classList.add("wepper-chat");
          var formMsg = document.getElementsByClassName("formSendMessage")[0];
          var chatRoooooom = document.getElementsByClassName("chat-room")[0];
          chatRoooooom.insertBefore(wepperChat, formMsg);
        } /* end of if */

        //this section for send audio
        if (audio) {
          //here I will send file plob to server after some of update
          var myBlob = new Blob([this.audioBlob], { type: "audio/mpeg" });
          const fsize = myBlob.size;
          const fileSizeInMb = Math.floor(fsize / 1024);

          if (fileSizeInMb < 30000) {
            this.messageWrong = null;

            if (cookie.get("lang") == 'ar')
              created.textContent = changeNumberFormat.changeNumberFormat(moment(new Date()).format("LT"), true);
            else
              created.textContent = moment(new Date()).format("LT");
            created.classList.add("created");

            audioTag.classList.add("audioType");
            source.src = audio.src;
            source.type = "audio/mp3";
            audioTag.controls = "controls";
            audioTag.appendChild(source);
            message.appendChild(audioTag);
            message.appendChild(created);
            message.classList.add("message");
            message.setAttribute("id", uuid.v4() + new Date().getTime());
            message.style.width = "80%";
            message.style.height = "95px";

            seen.classList.add("check-dubole");
            imgSeen.classList.add("loader2");
            imgSeen.style.width = "15px";
            imgSeen.style.height = "15px";
            seen.style.position = "static";

            seen.appendChild(imgSeen);
            message.appendChild(seen);
            audioTag.style.width = "100%";
            audioTag.style.maxHeight = "400px";

            myMessageCover.appendChild(message);
            myMessageCover.classList.add("myMessageCover");
            wepperChat.appendChild(myMessageCover);


            // if (!replyId) {
            //   wepperChat.appendChild(myMessageCover);
            // } /* end of if */

            var checkBoundingType = null;
            //this for detrmaine who is sender and who is reciver
            if (cookie.get("sndRcvId").sender_id == this.user.id) {
              snd_id = cookie.get("sndRcvId").sender_id;
              rcv_id = cookie.get("sndRcvId").reciver_id;
              checkBoundingType = "snd";
            } else {
              snd_id = cookie.get("sndRcvId").reciver_id;
              rcv_id = cookie.get("sndRcvId").sender_id;
              checkBoundingType = "rcv";
            } /* end of if  */
            myMessageCover.setAttribute("cover_id", snd_id);

            wepperChat.scrollTop = wepperChat.scrollHeight;

            //here I will send data as formData
            const ex = new FormData();
            ex.append("sender_id", snd_id);
            ex.append("reciver_id", rcv_id);
            ex.append("message_type", "voice");
            ex.append("dateTime", new Date().getTime());
            ex.append("state", 0);
            ex.append("audios", myBlob, "voice_recording.mp3");

            var resulte = await axios
              .post(
                this.$store.state.pattUrl +
                this.$store.state.port +
                "uploadAudio",
                ex
              )
              .catch((err) => console.log(err));

            if (resulte) {
              //here I will send the resulte over the socket to update on state
              //here you can use socket to send and receave data

              var voiceItem = {
                //here you muste plce real sender and reacever id
                sender_id: snd_id,
                reciver_id: rcv_id,
                message: resulte.data.message,
                message_type: resulte.data.message_type,
                dateTime: resulte.data.created_at,
                message_id: message.getAttribute("id"),
                state: 0,
                chat_id: resulte.data.chat_id,
                id: resulte.data.id,
                newchat: resulte.data.newchat,
                deleted_for: resulte.data.deleted_for || "null",
                reply: replyId || null
              }//end of item

              // if (replyId) {
              //   this.displayReplyMessage(this.createItemForReplyMessage(voiceItem, replyId, voiceItem.message_type, null), myMessageCover)
              // }/* end of if */

              seen.innerHTML = "";
              seen.remove();

              this.io.emit("new message", voiceItem); /* end of new message emit */

              this.replyId = null
              this.getBoundingReact(
                message.getAttribute("id"),
                checkBoundingType
              );

              this.fcmToken = cookie.get("fcmToken");
              cookie.remove("fcmToken");
              if (this.fcmToken.data.chat_id) {
                this.fcmToken.data.type = resulte.data.message_type;
                this.fcmToken.data.body = resulte.data.message;
              } /* end of if */
              cookie.set("fcmToken", this.fcmToken);

              this.inputMsg = "";
              audio = null;

              this.$emit("editOrderMyChat", this.itm)
            } /* end of if */
          } else {
            this.messageWrong = this._trans("audioSizeWrong");
            setTimeout(() => {
              this.messageWrong = null;
            }, 5000);
          } /* end of if */
        } //end of if
        //this section for send text message
        else {
          if (this.inputMsg) {
            if (this.checkUrlInMessage(this.inputMsg)) {
              p.innerHTML = this.checkUrlInMessage(this.inputMsg);
            } else {
              p.textContent = this.inputMsg;
            } /* end of if */

            //create div created
            created.classList.add("created");
            if (cookie.get("lang") == 'ar')
              created.textContent = changeNumberFormat.changeNumberFormat(moment(new Date()).format("LT"), true);
            else
              created.textContent = moment(new Date()).format("LT");
            //create div message
            message.classList.add("message");
            message.setAttribute("id", uuid.v4() + new Date().getTime());
            //create my myMessageCover
            myMessageCover.classList.add("myMessageCover");

            //add p and created into message
            message.appendChild(p);
            message.appendChild(created);
            //add messages div into myMessageCover
            myMessageCover.appendChild(message);


            if (cookie.get("sndRcvId").sender_id == this.user.id) {
              snd_id = cookie.get("sndRcvId").sender_id;
              rcv_id = cookie.get("sndRcvId").reciver_id;
            } else {
              snd_id = cookie.get("sndRcvId").reciver_id;
              rcv_id = cookie.get("sndRcvId").sender_id;
            }/* end of if */

            var item = {
              //here you muste plce real sendet and reaceve id
              sender_id: snd_id,
              reciver_id: rcv_id,
              message: this.inputMsg,
              message_type: "text",
              dateTime: new Date().getTime(),
              message_id: message.getAttribute("id"),
              state: 0,
              reply: replyId || null,
            }//end of item

            //this section to check this message is reply for other message or no
            if (!replyId) {
              wepperChat.appendChild(myMessageCover);
            }//end of if
            //this when i have reply message so i will create cover for reply message
            else {
              var messageCover = document.getElementById(replyId)
              if (messageCover) {
                for (var i = 0; i < messageCover.children.length; i++) {
                  if (messageCover.children[i].tagName == "P") {
                    this.displayReplyMessage(this.createItemForReplyMessage(item, replyId, "text", this.inputMsg), myMessageCover)
                  }//end of if
                  else if (messageCover.children[i].tagName == "AUDIO") {
                    this.displayReplyMessage(this.createItemForReplyMessage(item, replyId, "voice", null), myMessageCover)
                  } //end of if
                  else if (messageCover.children[i].classList.contains("fileType")) {
                    this.displayReplyMessage(this.createItemForReplyMessage(item, replyId, "file", null), myMessageCover)
                  }//end of if
                  else if (messageCover.children[i].tagName == "IMG" && messageCover.children[i].classList.contains("imgType")) {
                        this.displayReplyMessage(this.createItemForReplyMessage(item, replyId, "imageWeb", null), myMessageCover)
                  }//end of if
                  else if (messageCover.children[i].tagName == "VIDEO") {
                    this.displayReplyMessage(this.createItemForReplyMessage(item, replyId, "video", null), myMessageCover)
                  }//end of if
                  else {
                    if (messageCover.children[i].children[0]) {
                      if (messageCover.children[i].children[0].tagName == "IMG" && messageCover.children[i].children[0].classList.contains("imgType")) {
                        this.displayReplyMessage(this.createItemForReplyMessage(item, replyId, "imageWeb", null), myMessageCover)
                      } else if (messageCover.children[i].children[0].classList.contains("loction")) {
                        this.drowLocation = messageCover.children[i].children[0]
                        this.displayReplyMessage(this.createItemForReplyMessage(item, replyId, "location", null), myMessageCover)
                      }/* end of if */
                    }/* end of if */
                  }/* end of if */
                }/* end of for loop */
              }/* end of if */
            }/* end of if */

            this.getBoundingReact(message.getAttribute("id"), "");

            myMessageCover.setAttribute("cover_id", snd_id);
            item.reply_message = null

            //here you can use socket to send and receave data
            this.io.emit("new message", item); /* end of new message emit */

            this.$emit("editOrderMyChat", this.itm)

            this.replyId = null
            this.fcmToken = cookie.get("fcmToken");
            cookie.remove("fcmToken");
            if (this.fcmToken.data.chat_id) {
              this.fcmToken.data.type = "text";
              this.fcmToken.data.body = this.inputMsg;
            } /* end of if */
            cookie.set("fcmToken", this.fcmToken);

            this.inputMsg = "";
            this.displyReply = false
          } /* end of if */
        } /* end of else */

        this.newFormMessage(this.user.id);
        this.sendNotfication(this.fcmToken);

        wepperChat.scrollTop = wepperChat.scrollHeight;
      } catch (e) {
        console.log(e);
      } /* end of try catch */
    } /* /addMsg */,

    //this function used to send files to others users
    sendFileMsg() {
      try {
        var file = document.getElementById("file");

        if (file) {
          file.onclick = function () {
            this.value = null;
          };

          file.addEventListener("change", async (e) => {
            var created = document.createElement("div");
            var message = document.createElement("div");
            var myMessageCover = document.createElement("div");
            var rl = document.createElement("div");
            var img = document.createElement("img");
            var video = document.createElement("video");
            var audio = document.createElement("audio");
            var source = document.createElement("source");
            var p = document.createElement("p");

            var seen = document.createElement("div");
            var imgSeen = document.createElement("div");
            var extn = e.target.files[0].name.split(".");
            const wepperChat =
              document.getElementsByClassName("wepper-chat")[0];

            //this for file messgae
            var coverFile = document.createElement("div");
            var downloadLink = document.createElement("a");
            var img2 = document.createElement("img");
            var title = document.createElement("div");

            extn = "." + extn[extn.length - 1];

            var snd_id = null;
            var rcv_id = null;

            //this for detrmaine who is sender and who is reciver
            if (cookie.get("sndRcvId").sender_id == this.user.id) {
              snd_id = cookie.get("sndRcvId").sender_id;
              rcv_id = cookie.get("sndRcvId").reciver_id;
            } else {
              snd_id = cookie.get("sndRcvId").reciver_id;
              rcv_id = cookie.get("sndRcvId").sender_id;
            } /* end of if  */

            //here I will send data as formData
            const ex = new FormData();
            ex.append("sender_id", snd_id);
            ex.append("reciver_id", rcv_id);
            ex.append("dateTime", new Date().getTime());
            ex.append("state", 0);

            this.showMenu();
            this.messageWrong = null;

            if (
              //is validate on image file
              extn == ".jpg" ||
              extn == ".jpeg" ||
              extn == ".gif" ||
              extn == ".png" ||
              extn == ".tiff" ||
              extn == ".raw" ||
              extn == ".PNG"
            ) {
              //this only for create new objects from elements
              //this to display imagr for sender user
              const fileReader = new FileReader();
              fileReader.addEventListener("load", () => {
                const img64 = fileReader.result;
                img.src = img64;
                img.classList.add("imgType");
                img.classList.add("flex");
                //create div created
                created.classList.add("created");
                if (cookie.get("lang") == 'ar')
                  created.textContent = changeNumberFormat.changeNumberFormat(moment(new Date()).format("LT"), true);
                else
                  created.textContent = moment(new Date()).format("LT");

                seen.classList.add("check-dubole");
                imgSeen.classList.add("loader2");
                imgSeen.style.width = "15px";
                imgSeen.style.height = "15px";
                imgSeen.style.marginTop = "5px";
                seen.style.position = "static";

                seen.appendChild(imgSeen);
                //create div message
                message.classList.add("message");
                message.setAttribute("id", uuid.v4() + new Date().getTime());

                //create my myMessageCover
                myMessageCover.classList.add("myMessageCover");
                //add p and created into message
                rl.appendChild(img);
                rl.target = "_blank";
                rl.href = "#";
                message.appendChild(rl);
                message.appendChild(created);
                message.appendChild(seen);
                message.style.width = "250px";
                //add messages div into myMessageCover
                myMessageCover.appendChild(message);
                myMessageCover.setAttribute("cover_id", snd_id);
                wepperChat.appendChild(myMessageCover);
                this.newFormMessage(this.user.id)
              }); /* end of listener fileReadr */
              fileReader.readAsDataURL(file.files[0]);
              wepperChat.scrollTop = wepperChat.scrollHeight;

              ex.append("message_type", "imageWeb");
              ex.append("img_chat", e.target.files[0]);
              ex.append("orginalName", e.target.files[0].name);

              var resulte = await axios
                .post(
                  this.$store.state.pattUrl +
                  this.$store.state.port +
                  "uploadImgChat",
                  ex
                )
                .catch((err) => console.log(err));

              if (resulte) {
                seen.innerHTML = "";
                seen.remove();
                //here I will send the resulte over the socket to update on state
                //here you can use socket to send and receave data
                this.io.emit("new message", {
                  //here you muste plce real sender and reacever id
                  sender_id: snd_id,
                  reciver_id: rcv_id,
                  message: resulte.data.message,
                  message_type: resulte.data.message_type,
                  dateTime: resulte.data.created_at,
                  message_id: message.getAttribute("id"),
                  state: 0,
                  chat_id: resulte.data.chat_id,
                  orginalName: file.files[0].name,
                  id: resulte.data.id,
                  newchat: resulte.data.newchat,
                  deleted_for: resulte.data.deleted_for || "null",
                  reply: this.replyId || null,
                }); /* end of new message emit */

                this.replyId = null
                this.fcmToken = cookie.get("fcmToken");
                cookie.remove("fcmToken");
                if (this.fcmToken.data.chat_id) {
                  this.fcmToken.data.type = resulte.data.message_type;
                  this.fcmToken.data.body = resulte.data.message;
                } /* end of if */
                cookie.set("fcmToken", this.fcmToken);

                this.getBoundingReact(message.getAttribute("id"), "");
                this.$emit("editOrderMyChat", this.itm)
              } /* end of if */
            } else if (
              //is validate on vedio file
              extn == ".mp4" ||
              extn == ".mov" ||
              extn == ".wmv" ||
              extn == ".avi" ||
              extn == ".avchd" ||
              extn == ".f4v" ||
              extn == ".flv" ||
              extn == ".swf" ||
              extn == ".mkv" ||
              extn == ".webm"
            ) {
              const fsize = e.target.files[0].size;
              const fileSizeInMb = Math.floor(fsize / 1024);

              if (fileSizeInMb < 15000) {
                const fileReader2 = new FileReader();
                fileReader2.addEventListener("load", () => {
                  video.controls = "controls";
                  video.classList.add("videoType");
                  video.classList.add("flex");
                  source.src = fileReader2.result;
                  video.appendChild(source);

                  video.style.width = "100%";
                  video.style.maxHeight = "390px";
                  //create div created
                  created.classList.add("created");
                  if (cookie.get("lang") == 'ar')
                    created.textContent = changeNumberFormat.changeNumberFormat(moment(new Date()).format("LT"), true);
                  else
                    created.textContent = moment(new Date()).format("LT");

                  seen.classList.add("check-dubole");
                  imgSeen.classList.add("loader2");
                  imgSeen.style.width = "15px";
                  imgSeen.style.height = "15px";
                  imgSeen.style.marginTop = "5px";
                  seen.style.position = "static";

                  seen.appendChild(imgSeen);
                  //create div message
                  message.classList.add("message");
                  message.setAttribute("id", uuid.v4() + new Date().getTime());

                  myMessageCover.classList.add("myMessageCover");
                  //add p and created into message

                  message.appendChild(video);
                  message.appendChild(created);
                  message.appendChild(seen);
                  //add messages div into myMessageCover
                  myMessageCover.appendChild(message);
                  myMessageCover.setAttribute("cover_id", snd_id);
                  wepperChat.appendChild(myMessageCover);
                  this.newFormMessage(this.user.id)
                }); /* /fileReader */
                fileReader2.readAsDataURL(file.files[0]);
                wepperChat.scrollTop = wepperChat.scrollHeight;

                ex.append("message_type", "video");
                ex.append("vedios", e.target.files[0]);
                ex.append("orginalName", e.target.files[0].name);

                var resulte2 = await axios
                  .post(
                    this.$store.state.pattUrl +
                    this.$store.state.port +
                    "uploadVedio",
                    ex
                  )
                  .catch((err) => console.log(err));

                if (resulte2) {
                  seen.innerHTML = "";
                  seen.remove();
                  //here I will send the resulte over the socket to update on state
                  //here you can use socket to send and receave data
                  this.io.emit("new message", {
                    //here you muste plce real sender and reacever id
                    sender_id: snd_id,
                    reciver_id: rcv_id,
                    message: resulte2.data.message,
                    message_type: resulte2.data.message_type,
                    dateTime: resulte2.data.created_at,
                    message_id: message.getAttribute("id"),
                    state: 0,
                    chat_id: resulte2.data.chat_id,
                    orginalName: file.files[0].name,
                    id: resulte2.data.id,
                    newchat: resulte2.data.newchat,
                    deleted_for: resulte2.data.deleted_for || "null",
                    reply: this.replyId || null,
                  }); /* end of new message emit */
                } /* end of if */

                this.replyId = null
                this.fcmToken = cookie.get("fcmToken");
                cookie.remove("fcmToken");
                if (this.fcmToken.data.chat_id) {
                  this.fcmToken.data.type = resulte2.data.message_type;
                  this.fcmToken.data.body = resulte2.data.message;
                } /* end of if */
                cookie.set("fcmToken", this.fcmToken);

                this.getBoundingReact(message.getAttribute("id"), "");
              } else {
                this.messageWrong = this._trans("wrongSizeVedio");
                setTimeout(() => {
                  if (this.messageWrong) {
                    this.messageWrong = null;
                  } /* end of if  */
                }, 4999); /* end of setTimeOut */
              } /* end of if */

              this.$emit("editOrderMyChat", this.itm)
            } else if (
              //this validate for audio file
              extn == ".wproj" ||
              extn == ".sdt" ||
              extn == ".ec3" ||
              extn == ".cgrp" ||
              extn == ".weba" ||
              extn == ".nbs" ||
              extn == ".mp3" ||
              extn == ".flac" ||
              extn == ".ckb" ||
              extn == ".l" ||
              extn == ".mui" ||
              extn == ".pna" ||
              extn == ".band" ||
              extn == ".cwb" ||
              extn == ".ust" ||
              extn == ".dmse" ||
              extn == ".4mp" ||
              extn == ".sngx" ||
              extn == ".apl" ||
              extn == ".mmlp" ||
              extn == ".aup" ||
              extn == ".mtm" ||
              extn == ".sf2" ||
              extn == ".wav" ||
              extn == ".vpw" ||
              extn == ".syw" ||
              extn == ".gsf" ||
              extn == ".amxd" ||
              extn == ".vsq" ||
              extn == ".bidule" ||
              extn == ".h5s" ||
              extn == ".cwt" ||
              extn == ".igp" ||
              extn == ".pek" ||
              extn == ".mka" ||
              extn == ".voxal" ||
              extn == ".omg" ||
              extn == ".wft" ||
              extn == ".wvc" ||
              extn == ".mpa" ||
              extn == ".cwp" ||
              extn == ".mmp" ||
              extn == ".wve" ||
              extn == ".vyf" ||
              extn == ".vip" ||
              extn == ".dra" ||
              extn == ".dvf" ||
              extn == ".vox"
            ) {
              const fileReader3 = new FileReader();
              fileReader3.addEventListener("load", () => {
                audio.controls = "controls";
                audio.classList.add("audioType");
                source.src = fileReader3.result;
                audio.appendChild(source);

                message.style.width = "80%";
                message.style.height = "90px";
                audio.style.width = "100%";
                //create div created
                created.classList.add("created");
                if (cookie.get("lang") == 'ar')
                  created.textContent = changeNumberFormat.changeNumberFormat(moment(new Date()).format("LT"), true);
                else
                  created.textContent = moment(new Date()).format("LT");

                seen.classList.add("check-dubole");
                imgSeen.classList.add("loader2");
                imgSeen.style.width = "15px";
                imgSeen.style.height = "15px";
                imgSeen.style.marginTop = "5px";
                seen.style.position = "static";

                seen.appendChild(imgSeen);
                //create div message
                message.classList.add("message");
                message.setAttribute("id", uuid.v4() + new Date().getTime());

                myMessageCover.classList.add("myMessageCover");
                //add p and created into message

                message.appendChild(audio);
                message.appendChild(created);
                message.appendChild(seen);
                //add messages div into myMessageCover
                myMessageCover.appendChild(message);
                myMessageCover.setAttribute("cover_id", snd_id);
                wepperChat.appendChild(myMessageCover);
                this.newFormMessage(this.user.id)
              }); /* /fileReader */
              fileReader3.readAsDataURL(file.files[0]);
              wepperChat.scrollTop = wepperChat.scrollHeight;

              ex.append("message_type", "voice");
              ex.append("audios", e.target.files[0]);
              ex.append("orginalName", e.target.files[0].name);
              var resulte3 = await axios
                .post(
                  this.$store.state.pattUrl +
                  this.$store.state.port +
                  "uploadAudio",
                  ex
                )
                .catch((err) => console.log(err));

              if (resulte3) {
                seen.innerHTML = "";
                seen.remove();
                //here I will send the resulte over the socket to update on state
                //here you can use socket to send and receave data
                this.io.emit("new message", {
                  //here you muste plce real sender and reacever id
                  sender_id: snd_id,
                  reciver_id: rcv_id,
                  message: resulte3.data.message,
                  message_type: resulte3.data.message_type,
                  dateTime: resulte3.data.created_at,
                  message_id: message.getAttribute("id"),
                  state: 0,
                  chat_id: resulte3.data.chat_id,
                  orginalName: file.files[0].name,
                  id: resulte3.data.id,
                  newchat: resulte3.data.newchat,
                  deleted_for: resulte3.data.deleted_for || "null",
                  reply: this.replyId || null,
                }); /* end of new message emit */

                this.replyId = null
                this.fcmToken = cookie.get("fcmToken");
                cookie.remove("fcmToken");
                if (this.fcmToken.data.chat_id) {
                  this.fcmToken.data.type = resulte3.data.message_type;
                  this.fcmToken.data.body = resulte3.data.message;
                } /* end of if */
                cookie.set("fcmToken", this.fcmToken);
                this.$emit("editOrderMyChat", this.itm)
              } /* resulte3 */
              if (this.user.id == snd_id)
                this.getBoundingReact(message.getAttribute("id"), "snd");
              else this.getBoundingReact(message.getAttribute("id"), "rcv");
            } else if (
              //is for file like pdf and others
              extn == ".pdf" ||
              extn == ".zip" ||
              extn == ".rar" ||
              extn == ".docx" ||
              extn == ".dotx" ||
              extn == ".doc" ||
              extn == ".txt" ||
              extn == ".xlsx" ||
              extn == ".xltx" ||
              extn == ".ppt" ||
              extn == ".pptx"
            ) {
              const fileReade4 = new FileReader();
              fileReade4.addEventListener("load", () => {
                downloadLink.href = fileReade4.result;
                img2.src = download;
                img2.style.width = "50px";
                downloadLink.appendChild(img2);
                downloadLink.target = "_blank";
                rl.appendChild(downloadLink);

                p.textContent = file.files[0].name;
                title.appendChild(p);

                //this function used for append img in file message cover
                img.src = file2;
                title.appendChild(img);
                title.classList.add("title");

                coverFile.appendChild(rl);
                coverFile.appendChild(title);
                coverFile.classList.add("fileType");

                seen.classList.add("check-dubole");
                imgSeen.classList.add("loader2");
                imgSeen.style.width = "15px";
                imgSeen.style.height = "15px";
                imgSeen.style.marginTop = "5px";
                seen.style.position = "static";
                seen.appendChild(imgSeen);

                created.classList.add("created");
                if (cookie.get("lang") == 'ar')
                  created.textContent = changeNumberFormat.changeNumberFormat(moment(new Date()).format("LT"), true);
                else
                  created.textContent = moment(new Date()).format("LT");

                message.appendChild(coverFile);
                message.appendChild(created);
                message.appendChild(seen);
                message.setAttribute("id", uuid.v4() + new Date().getTime());
                message.classList.add("message");

                myMessageCover.appendChild(message);
                myMessageCover.setAttribute("cover_id", snd_id);
                myMessageCover.classList.add("myMessageCover");

                wepperChat.appendChild(myMessageCover);
                this.newFormMessage(this.user.id)
              }); /* /endEventListener */
              fileReade4.readAsDataURL(file.files[0]);
              wepperChat.scrollTop = wepperChat.scrollHeight;

              ex.append("message_type", "file");
              ex.append("files", e.target.files[0]);
              ex.append("orginalName", e.target.files[0].name);
              const resulte5 = await axios
                .post(
                  this.$store.state.pattUrl +
                  this.$store.state.port +
                  "uploadFile",
                  ex
                )
                .catch((error) => console.log(error));
              if (resulte5) {
                seen.innerHTML = "";
                seen.remove();
                message.children[0].children[0].children[0].href =
                  this.$store.state.filePath + resulte5.data.message;
                this.io.emit("new message", {
                  //here you muste plce real sender and reacever id
                  sender_id: snd_id,
                  reciver_id: rcv_id,
                  message: resulte5.data.message,
                  message_type: resulte5.data.message_type,
                  dateTime: resulte5.data.created_at,
                  message_id: message.getAttribute("id"),
                  state: 0,
                  chat_id: resulte5.data.chat_id,
                  orginalName: file.files[0].name,
                  id: resulte5.data.id,
                  newchat: resulte5.data.newchat,
                  deleted_for: resulte5.data.deleted_for || "null",
                  reply: this.replyId || null,
                }); /* end of new message emit */
                this.replyId = null
                this.fcmToken = cookie.get("fcmToken");
                cookie.remove("fcmToken");
                if (this.fcmToken.data.chat_id) {
                  this.fcmToken.data.type = resulte5.data.message_type;
                  this.fcmToken.data.body = resulte5.data.message;
                } /* end of if */
                cookie.set("fcmToken", this.fcmToken);
                this.$emit("editOrderMyChat", this.itm)
              } /* /resulte5 */

              this.getBoundingReact(message.getAttribute("id"), "");
            } else {
              this.messageWrong = this._trans("unspportedFile");
              setTimeout(() => {
                if (this.messageWrong) {
                  this.messageWrong = null;
                } /* end of if  */
              }, 4999); /* end of setTimeOut */
            } /* end of if */

            this.sendNotfication(this.fcmToken);
          }); /* end of addEventListener */
        } /* end of if */
        this.displyReply = false
      } catch (e) {
        console.log(e);
      } /* end of try catch */
    } /* end of sendIamge */,

    //this message used to recive new message from the users
    reciveMessage() {
      //this emit to recive message
      this.typing = false;
      this.io.on("new message", (data) => {
        if (cookie.get("sndRcvId")) {
          setTimeout(() => {
            this.dispalyMsg(data);
          }, 100);
        } else {
          var lastMsgs = document.getElementById(data.chat_id);
          if (lastMsgs && !data.seen) {
            var lastMsg = lastMsgs.children[0].children[1].children[1];
            if (lastMsg) {
              switch (data.message_type) {
                case "text":
                  lastMsg.textContent = data.message;
                  break;

                case "video":
                  lastMsg.innerHTML =
                    this._trans("vedio") +
                    `&nbsp;&nbsp;&nbsp;<svg aria-hidden="true" data-prefix="fas" data-icon="film" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-film fa-w-16" data-fa-i2svg>
  <path fill="currentColor" d="M488 64h-8v20c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12V64H96v20c0 6.6-5.4 12-12 12H44c-6.6 0-12-5.4-12-12V64h-8C10.7 64 0 74.7 0 88v336c0 13.3 10.7 24 24 24h8v-20c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v20h320v-20c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v20h8c13.3 0 24-10.7 24-24V88c0-13.3-10.7-24-24-24zM96 372c0 6.6-5.4 12-12 12H44c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12H44c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12H44c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm272 208c0 6.6-5.4 12-12 12H156c-6.6 0-12-5.4-12-12v-96c0-6.6 5.4-12 12-12h200c6.6 0 12 5.4 12 12v96zm0-168c0 6.6-5.4 12-12 12H156c-6.6 0-12-5.4-12-12v-96c0-6.6 5.4-12 12-12h200c6.6 0 12 5.4 12 12v96zm112 152c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40z" class=""></path></svg>`;
                  break;

                case "voice":
                  lastMsg.innerHTML =
                    this._trans("voice") +
                    `&nbsp;&nbsp;&nbsp;<svg aria-hidden="true" data-prefix="fas" data-icon="microphone" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512" class="svg-inline--fa fa-microphone fa-w-11" data-fa-i2svg>
  <path fill="currentColor" d="M176 352c53.02 0 96-42.98 96-96V96c0-53.02-42.98-96-96-96S80 42.98 80 96v160c0 53.02 42.98 96 96 96zm160-160h-16c-8.84 0-16 7.16-16 16v48c0 74.8-64.49 134.82-140.79 127.38C96.71 376.89 48 317.11 48 250.3V208c0-8.84-7.16-16-16-16H16c-8.84 0-16 7.16-16 16v40.16c0 89.64 63.97 169.55 152 181.69V464H96c-8.84 0-16 7.16-16 16v16c0 8.84 7.16 16 16 16h160c8.84 0 16-7.16 16-16v-16c0-8.84-7.16-16-16-16h-56v-33.77C285.71 418.47 352 344.9 352 256v-48c0-8.84-7.16-16-16-16z" class=""></path></svg>`;
                  break;

                case "imageWeb":
                  lastMsg.innerHTML =
                    this._trans("image") +
                    `&nbsp;&nbsp;&nbsp;<svg aria-hidden="true" data-prefix="fas" data-icon="image" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-image fa-w-16" data-fa-i2svg>
  <path fill="currentColor" d="M464 448H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h416c26.51 0 48 21.49 48 48v288c0 26.51-21.49 48-48 48zM112 120c-30.928 0-56 25.072-56 56s25.072 56 56 56 56-25.072 56-56-25.072-56-56-56zM64 384h384V272l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L208 320l-55.515-55.515c-4.686-4.686-12.284-4.686-16.971 0L64 336v48z" class=""></path></svg>`;
                  break;

                case "file":
                  lastMsg.innerHTML =
                    this._trans("file") +
                    `&nbsp;&nbsp;&nbsp;<svg aria-hidden="true" data-prefix="fas" data-icon="file" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="svg-inline--fa fa-image fa-w-16" data-fa-i2svg>
  <path fill="currentColor" d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm160-14.1v6.1H256V0h6.1c6.4 0 12.5 2.5 17 7l97.9 98c4.5 4.5 7 10.6 7 16.9z" class=""></path></svg>`;
                  break;

                case "location":
                  lastMsg.innerHTML =
                    this._trans("location") +
                    `&nbsp;&nbsp;&nbsp;<svg aria-hidden="true" data-prefix="fas" data-icon="map" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-image fa-w-16" data-fa-i2svg>
  <path fill="currentColor" d="M0 117.66v346.32c0 11.32 11.43 19.06 21.94 14.86L160 416V32L20.12 87.95A32.006 32.006 0 0 0 0 117.66zM192 416l192 64V96L192 32v384zM554.06 33.16L416 96v384l139.88-55.95A31.996 31.996 0 0 0 576 394.34V48.02c0-11.32-11.43-19.06-21.94-14.86z" class=""></path></svg>`;
                  break;
              } /* end of switch */

              lastMsg.style.fontWeight = "900";

              if (this.chatId != data.chat_id) {
                this.chatId = data.chat_id;
                var audioObj = new Audio(newMessage);
                audioObj.muted = this.$store.state.mute;
                audioObj.addEventListener("canplaythrough", () => {
                  /* the audio is now playable; play it if permissions allow */
                  audioObj.play();
                });
              } /* end of if */
            } /* end of if */
          } /* end of if */
          if (data.seen == true) {
            var lastMsgss = document.getElementById(data.chat_id);
            var lastMsges = lastMsgss.children[0].children[1].children[1];
            if (lastMsges.children[0]) {
              if (lastMsges.children[0].tagName == "IMG") {
                lastMsges.children[0].remove();
              } else if (lastMsges.children[0].children[0]) {
                //.tagName == "IMG"
                if (lastMsges.children[0].children[0].tagName == "IMG")
                  lastMsges.children[0].children[0].remove();
              } /* end of if */
            } /* end of if */

            if (cookie.get("user").id == data.msg.sender_id) {
              var imgState = document.createElement("img");
              imgState.src = checkDubole;
              imgState.classList.add("imageState");
              lastMsges.prepend(imgState);
            }/* /end of if */
          } /* end of if */
        } /* end of if */

        if (this.$store.state.myChat.length > 0) {
          var myItem = this.$store.state.myChat.filter(value => {
            if (value.id == data.chat_id) {
              return value
            }/* end of if */
          })//filter

          if (data.seen != true) {
            var senderId = null
            if (cookie.get("sndRcvId"))
              if (cookie.get("sndRcvId").sender_id == cookie.get("user").id) {
                senderId = cookie.get("sndRcvId").reciver_id
              } else {
                senderId = cookie.get("sndRcvId").sender_id
              }//end of if
            if(cookie.get("sndRcvId")){
              if ((senderId != data.sender_id && cookie.get("sndRcvId").chat_id !=data.chat_id) && (data.state != 3)) {
              myItem[0].num_msg += 1
            }/* end of if */
            }else if(senderId != data.sender_id){
              myItem[0].num_msg += 1
            }/* end of if */
          }/* end of if  */
          this.$emit("editOrderMyChat", myItem[0])
        }/* end of if */
      }); /* end of new message on */
    } /* /reciveMessage */,

    //this function used to add date for the messages
    datesss() {
      var cImg = document.getElementsByClassName("message");
      for (var i = 0; i < cImg.length; i++) {
        cImg[i].addEventListener("click", function () {
          var dt = this.getElementsByClassName("created")[0];
          dt.classList.toggle("showDate");
        }); /* end of addListener */
      } /* end of for loop */
    } /* end of imgDate */,

    //this to take any message and display him as recverMessage message
    dispalyMsg(data) {
      try {
        this.typing = false;
        /* console.log("data :", data, cookie.get("sndRcvId").chat_id); */

        //here the weppper card own id for reciver i will change him to chat id
        var caradId = document.getElementById(data.reciver_id);
        if (caradId) {
          caradId.setAttribute("id", data.chat_id);
          this.$store.state.caradId = [data.chat_id, data];
        } /* end of if */

        var wepperChat = null;
        wepperChat = document.getElementsByClassName("wepper-chat")[0];

        if (!wepperChat) {
          wepperChat = document.createElement("div");
          /* wepperChat.setAttribute("chat_id",cookie.get("sndRcvId").chat_id) */
          wepperChat.classList.add("wepper-chat");
          var formMsg = document.getElementsByClassName("formSendMessage")[0];
          var chatRoooooom = document.getElementsByClassName("chat-room")[0];
          chatRoooooom.insertBefore(wepperChat, formMsg);
        } /* end of if */

        if (
          data.seen == true &&
          data.chat_id == cookie.get("sndRcvId").chat_id
        ) {
          var msgMyCov = document.getElementsByClassName("myMessageCover");
          if (msgMyCov)
            for (var i = 0; i < msgMyCov.length; i++) {
              var msg = null;
              msg = msgMyCov[i].getElementsByClassName("message")[0];
              for (var j = 0; j < msg.children.length; j++) {
                if (msg.children[j].classList[0] == "check-dubole") {
                  msg.children[j].children[0].src = checkDubole;
                } /* end of if */
              } /* end forloop j */
            } /* end of for loop */
        } /* end of if for seen */

        if (data.seen == true) {
          var lastMsgss = document.getElementById(data.chat_id);
          var lastMsges = lastMsgss.children[0].children[1].children[1];
          if (lastMsges.children[0]) {
            if (lastMsges.children[0].tagName == "IMG") {
              lastMsges.children[0].remove();
            } else if (lastMsges.children[0].children[0]) {
              //.tagName == "IMG"
              if (lastMsges.children[0].children[0].tagName == "IMG")
                lastMsges.children[0].children[0].remove();
            } /* end of if */
          } /* end of if */


          if (cookie.get("user").id == data.msg.sender_id) {
            var imgState = document.createElement("img");
            imgState.src = checkDubole;
            imgState.classList.add("imageState");
            lastMsges.prepend(imgState);
          }/* /end of if */
        } /* end of if */

        if (data.chat_id && !data.seen) {
          var lastMsgs = document.getElementById(data.chat_id);
          if (lastMsgs) {
            var lastMsg = lastMsgs.children[0].children[1].children[1];
            lastMsg.setAttribute("type", data.message_type);
            switch (data.message_type) {
              case "text":
                lastMsg.textContent = data.message;
                break;

              case "video":
                lastMsg.innerHTML =
                  this._trans("vedio") +
                  `&nbsp;&nbsp;&nbsp;<svg aria-hidden="true" data-prefix="fas" data-icon="film" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-film fa-w-16" data-fa-i2svg>
  <path fill="currentColor" d="M488 64h-8v20c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12V64H96v20c0 6.6-5.4 12-12 12H44c-6.6 0-12-5.4-12-12V64h-8C10.7 64 0 74.7 0 88v336c0 13.3 10.7 24 24 24h8v-20c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v20h320v-20c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v20h8c13.3 0 24-10.7 24-24V88c0-13.3-10.7-24-24-24zM96 372c0 6.6-5.4 12-12 12H44c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12H44c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12H44c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm272 208c0 6.6-5.4 12-12 12H156c-6.6 0-12-5.4-12-12v-96c0-6.6 5.4-12 12-12h200c6.6 0 12 5.4 12 12v96zm0-168c0 6.6-5.4 12-12 12H156c-6.6 0-12-5.4-12-12v-96c0-6.6 5.4-12 12-12h200c6.6 0 12 5.4 12 12v96zm112 152c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40z" class=""></path></svg>`;
                break;

              case "voice":
                lastMsg.innerHTML =
                  this._trans("voice") +
                  `&nbsp;&nbsp;&nbsp;<svg aria-hidden="true" data-prefix="fas" data-icon="microphone" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512" class="svg-inline--fa fa-microphone fa-w-11" data-fa-i2svg>
  <path fill="currentColor" d="M176 352c53.02 0 96-42.98 96-96V96c0-53.02-42.98-96-96-96S80 42.98 80 96v160c0 53.02 42.98 96 96 96zm160-160h-16c-8.84 0-16 7.16-16 16v48c0 74.8-64.49 134.82-140.79 127.38C96.71 376.89 48 317.11 48 250.3V208c0-8.84-7.16-16-16-16H16c-8.84 0-16 7.16-16 16v40.16c0 89.64 63.97 169.55 152 181.69V464H96c-8.84 0-16 7.16-16 16v16c0 8.84 7.16 16 16 16h160c8.84 0 16-7.16 16-16v-16c0-8.84-7.16-16-16-16h-56v-33.77C285.71 418.47 352 344.9 352 256v-48c0-8.84-7.16-16-16-16z" class=""></path></svg>`;
                break;

              case "imageWeb":
                lastMsg.innerHTML =
                  this._trans("image") +
                  `&nbsp;&nbsp;&nbsp;<svg aria-hidden="true" data-prefix="fas" data-icon="image" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-image fa-w-16" data-fa-i2svg>
  <path fill="currentColor" d="M464 448H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h416c26.51 0 48 21.49 48 48v288c0 26.51-21.49 48-48 48zM112 120c-30.928 0-56 25.072-56 56s25.072 56 56 56 56-25.072 56-56-25.072-56-56-56zM64 384h384V272l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L208 320l-55.515-55.515c-4.686-4.686-12.284-4.686-16.971 0L64 336v48z" class=""></path></svg>`;
                break;

              case "file":
                lastMsg.innerHTML =
                  this._trans("file") +
                  `&nbsp;&nbsp;&nbsp;<svg aria-hidden="true" data-prefix="fas" data-icon="file" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="svg-inline--fa fa-image fa-w-16" data-fa-i2svg>
  <path fill="currentColor" d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm160-14.1v6.1H256V0h6.1c6.4 0 12.5 2.5 17 7l97.9 98c4.5 4.5 7 10.6 7 16.9z" class=""></path></svg>`;
                break;

              case "location":
                lastMsg.innerHTML =
                  this._trans("location") +
                  `&nbsp;&nbsp;&nbsp;<svg aria-hidden="true" data-prefix="fas" data-icon="map" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-image fa-w-16" data-fa-i2svg>
  <path fill="currentColor" d="M0 117.66v346.32c0 11.32 11.43 19.06 21.94 14.86L160 416V32L20.12 87.95A32.006 32.006 0 0 0 0 117.66zM192 416l192 64V96L192 32v384zM554.06 33.16L416 96v384l139.88-55.95A31.996 31.996 0 0 0 576 394.34V48.02c0-11.32-11.43-19.06-21.94-14.86z" class=""></path></svg>`;
                break;
            } /* end of switch */


          } /* end of if */
        } /* end of if */

        if (cookie.get("sndRcvId")) {
          if (
            this.user.id == data.reciver_id &&
            data.chat_id == cookie.get("sndRcvId").chat_id
          ) {
            //here i will create audio file as notifucation
            var audioObj = new Audio(msg_notifcation);
            audioObj.muted = this.$store.state.mute;
            audioObj.addEventListener("canplaythrough", () => {
              /* the audio is now playable; play it if permissions allow */
              audioObj.play();
            });

            //this line to display message in myContact
            if (lastMsg)
              if (data.orginalName) {
                switch (data.message_type) {
                  case "text":
                    lastMsg.textContent = data.message;
                    break;

                  case "video":
                    lastMsg.innerHTML =
                      this._trans("vedio") +
                      `&nbsp;&nbsp;&nbsp;<svg aria-hidden="true" data-prefix="fas" data-icon="film" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-film fa-w-16" data-fa-i2svg>
  <path fill="currentColor" d="M488 64h-8v20c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12V64H96v20c0 6.6-5.4 12-12 12H44c-6.6 0-12-5.4-12-12V64h-8C10.7 64 0 74.7 0 88v336c0 13.3 10.7 24 24 24h8v-20c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v20h320v-20c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v20h8c13.3 0 24-10.7 24-24V88c0-13.3-10.7-24-24-24zM96 372c0 6.6-5.4 12-12 12H44c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12H44c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12H44c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm272 208c0 6.6-5.4 12-12 12H156c-6.6 0-12-5.4-12-12v-96c0-6.6 5.4-12 12-12h200c6.6 0 12 5.4 12 12v96zm0-168c0 6.6-5.4 12-12 12H156c-6.6 0-12-5.4-12-12v-96c0-6.6 5.4-12 12-12h200c6.6 0 12 5.4 12 12v96zm112 152c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40z" class=""></path></svg>`;
                    break;

                  case "voice":
                    lastMsg.innerHTML =
                      this._trans("voice") +
                      `&nbsp;&nbsp;&nbsp;<svg aria-hidden="true" data-prefix="fas" data-icon="microphone" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512" class="svg-inline--fa fa-microphone fa-w-11" data-fa-i2svg>
  <path fill="currentColor" d="M176 352c53.02 0 96-42.98 96-96V96c0-53.02-42.98-96-96-96S80 42.98 80 96v160c0 53.02 42.98 96 96 96zm160-160h-16c-8.84 0-16 7.16-16 16v48c0 74.8-64.49 134.82-140.79 127.38C96.71 376.89 48 317.11 48 250.3V208c0-8.84-7.16-16-16-16H16c-8.84 0-16 7.16-16 16v40.16c0 89.64 63.97 169.55 152 181.69V464H96c-8.84 0-16 7.16-16 16v16c0 8.84 7.16 16 16 16h160c8.84 0 16-7.16 16-16v-16c0-8.84-7.16-16-16-16h-56v-33.77C285.71 418.47 352 344.9 352 256v-48c0-8.84-7.16-16-16-16z" class=""></path></svg>`;
                    break;

                  case "imageWeb":
                    lastMsg.innerHTML =
                      this._trans("image") +
                      `&nbsp;&nbsp;&nbsp;<svg aria-hidden="true" data-prefix="fas" data-icon="image" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-image fa-w-16" data-fa-i2svg>
  <path fill="currentColor" d="M464 448H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h416c26.51 0 48 21.49 48 48v288c0 26.51-21.49 48-48 48zM112 120c-30.928 0-56 25.072-56 56s25.072 56 56 56 56-25.072 56-56-25.072-56-56-56zM64 384h384V272l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L208 320l-55.515-55.515c-4.686-4.686-12.284-4.686-16.971 0L64 336v48z" class=""></path></svg>`;
                    break;

                  case "file":
                    lastMsg.innerHTML =
                      this._trans("file") +
                      `&nbsp;&nbsp;&nbsp;<svg aria-hidden="true" data-prefix="fas" data-icon="file" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="svg-inline--fa fa-image fa-w-16" data-fa-i2svg>
  <path fill="currentColor" d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm160-14.1v6.1H256V0h6.1c6.4 0 12.5 2.5 17 7l97.9 98c4.5 4.5 7 10.6 7 16.9z" class=""></path></svg>`;
                    break;

                  case "location":
                    lastMsg.innerHTML =
                      this._trans("location") +
                      `&nbsp;&nbsp;&nbsp;<svg aria-hidden="true" data-prefix="fas" data-icon="map" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-image fa-w-16" data-fa-i2svg>
  <path fill="currentColor" d="M0 117.66v346.32c0 11.32 11.43 19.06 21.94 14.86L160 416V32L20.12 87.95A32.006 32.006 0 0 0 0 117.66zM192 416l192 64V96L192 32v384zM554.06 33.16L416 96v384l139.88-55.95A31.996 31.996 0 0 0 576 394.34V48.02c0-11.32-11.43-19.06-21.94-14.86z" class=""></path></svg>`;
                    break;
                } /* end of switch */
              } else {
                //this to check type of message and display him in my contact
                switch (data.message_type) {
                  case "text":
                    lastMsg.textContent = data.message;
                    break;

                  case "video":
                    lastMsg.innerHTML =
                      this._trans("vedio") +
                      `&nbsp;&nbsp;&nbsp;<svg aria-hidden="true" data-prefix="fas" data-icon="film" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-film fa-w-16" data-fa-i2svg>
  <path fill="currentColor" d="M488 64h-8v20c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12V64H96v20c0 6.6-5.4 12-12 12H44c-6.6 0-12-5.4-12-12V64h-8C10.7 64 0 74.7 0 88v336c0 13.3 10.7 24 24 24h8v-20c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v20h320v-20c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v20h8c13.3 0 24-10.7 24-24V88c0-13.3-10.7-24-24-24zM96 372c0 6.6-5.4 12-12 12H44c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12H44c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12H44c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm272 208c0 6.6-5.4 12-12 12H156c-6.6 0-12-5.4-12-12v-96c0-6.6 5.4-12 12-12h200c6.6 0 12 5.4 12 12v96zm0-168c0 6.6-5.4 12-12 12H156c-6.6 0-12-5.4-12-12v-96c0-6.6 5.4-12 12-12h200c6.6 0 12 5.4 12 12v96zm112 152c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40z" class=""></path></svg>`;
                    break;

                  case "voice":
                    lastMsg.innerHTML =
                      this._trans("voice") +
                      `&nbsp;&nbsp;&nbsp;<svg aria-hidden="true" data-prefix="fas" data-icon="microphone" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512" class="svg-inline--fa fa-microphone fa-w-11" data-fa-i2svg>
  <path fill="currentColor" d="M176 352c53.02 0 96-42.98 96-96V96c0-53.02-42.98-96-96-96S80 42.98 80 96v160c0 53.02 42.98 96 96 96zm160-160h-16c-8.84 0-16 7.16-16 16v48c0 74.8-64.49 134.82-140.79 127.38C96.71 376.89 48 317.11 48 250.3V208c0-8.84-7.16-16-16-16H16c-8.84 0-16 7.16-16 16v40.16c0 89.64 63.97 169.55 152 181.69V464H96c-8.84 0-16 7.16-16 16v16c0 8.84 7.16 16 16 16h160c8.84 0 16-7.16 16-16v-16c0-8.84-7.16-16-16-16h-56v-33.77C285.71 418.47 352 344.9 352 256v-48c0-8.84-7.16-16-16-16z" class=""></path></svg>`;
                    break;

                  case "imageWeb":
                    lastMsg.innerHTML =
                      this._trans("image") +
                      `&nbsp;&nbsp;&nbsp;<svg aria-hidden="true" data-prefix="fas" data-icon="image" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-image fa-w-16" data-fa-i2svg>
  <path fill="currentColor" d="M464 448H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h416c26.51 0 48 21.49 48 48v288c0 26.51-21.49 48-48 48zM112 120c-30.928 0-56 25.072-56 56s25.072 56 56 56 56-25.072 56-56-25.072-56-56-56zM64 384h384V272l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L208 320l-55.515-55.515c-4.686-4.686-12.284-4.686-16.971 0L64 336v48z" class=""></path></svg>`;
                    break;

                  case "file":
                    lastMsg.innerHTML =
                      this._trans("file") +
                      `&nbsp;&nbsp;&nbsp;<svg aria-hidden="true" data-prefix="fas" data-icon="file" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="svg-inline--fa fa-image fa-w-16" data-fa-i2svg>
  <path fill="currentColor" d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm160-14.1v6.1H256V0h6.1c6.4 0 12.5 2.5 17 7l97.9 98c4.5 4.5 7 10.6 7 16.9z" class=""></path></svg>`;
                    break;

                  case "location":
                    lastMsg.innerHTML =
                      this._trans("location") +
                      `&nbsp;&nbsp;&nbsp;<svg aria-hidden="true" data-prefix="fas" data-icon="map" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-image fa-w-16" data-fa-i2svg>
  <path fill="currentColor" d="M0 117.66v346.32c0 11.32 11.43 19.06 21.94 14.86L160 416V32L20.12 87.95A32.006 32.006 0 0 0 0 117.66zM192 416l192 64V96L192 32v384zM554.06 33.16L416 96v384l139.88-55.95A31.996 31.996 0 0 0 576 394.34V48.02c0-11.32-11.43-19.06-21.94-14.86z" class=""></path></svg>`;
                    break;
                } /* end of switch */
              } /* end of if */

            var created = document.createElement("div");
            var message = document.createElement("div");
            //var myMessageCover = document.createElement("div");
            var messageYouCover = document.createElement("div");
            var audio = document.createElement("audio");
            var video = document.createElement("video");
            var source = document.createElement("source");
            var img = document.createElement("img");
            var p = document.createElement("p");

            //this for file messgae
            var coverFile = document.createElement("div");
            var downloadLink = document.createElement("a");
            var img2 = document.createElement("img");
            var title = document.createElement("div");
            var rl = document.createElement("div");

            var aMap = document.createElement("div");
            //var imgMap = document.createElement("img");

            console.log("data : ",data)
            switch (data.message_type) {
              case "text":
                if (this.checkUrlInMessage(data.message)) {
                  p.innerHTML = this.checkUrlInMessage(data.message);
                } else {
                  p.textContent = data.message;
                } /* end of if */

                //create div created
                created.classList.add("created");
                if (data.created_at) {
                  if (cookie.get("lang") == 'ar')
                    created.textContent = changeNumberFormat.changeNumberFormat(moment(
                      new Date(parseInt(data.created_at.substring(0, 10)) * 1000)
                    ).format("LT"), true);
                  else
                    created.textContent = moment(
                      new Date(parseInt(data.created_at.substring(0, 10)) * 1000)
                    ).format("LT");
                }/* end of if */

                else if (data.dateTime) {
                  if (cookie.get("lang") == 'ar')
                    created.textContent = changeNumberFormat.changeNumberFormat(moment(
                      new Date(parseInt(data.dateTime.substring(0, 10)) * 1000)
                    ).format("LT"), true);
                  else
                    created.textContent = moment(
                      new Date(parseInt(data.dateTime.substring(0, 10)) * 1000)
                    ).format("LT");
                }/* end of else if */

                //create div message
                message.classList.add("message");
                message.setAttribute("id", data.message_id);
                message.setAttribute("type", data.message_type);
                //create my myMessageCover
                messageYouCover.classList.add("messageYouCover");
                //add p and created into message
                message.appendChild(p);

                message.appendChild(created);
                //add messages div into myMessageCover
                messageYouCover.appendChild(message);
                messageYouCover.setAttribute("cover_id", data.sender_id);
                wepperChat.setAttribute(
                  "chat_id",
                  cookie.get("sndRcvId").chat_id
                );
                wepperChat.appendChild(messageYouCover);
                this.getBoundingReact(data.message_id, "rcv");
                break;

              case "video":
                video.controls = "controls";
                video.classList.add("videoType");
                source.src = this.$store.state.videoPath + data.message;
                //create div created
                created.classList.add("created");

                if (data.created_at) {
                  if (cookie.get("lang") == 'ar')
                    created.textContent = changeNumberFormat.changeNumberFormat(moment(
                      new Date(parseInt(data.created_at.substring(0, 10)) * 1000)
                    ).format("LT"), true);
                  else
                    created.textContent = moment(
                      new Date(parseInt(data.created_at.substring(0, 10)) * 1000)
                    ).format("LT");
                } else if (data.dateTime) {
                  if (cookie.get("lang") == 'ar')
                    created.textContent = changeNumberFormat.changeNumberFormat(moment(
                      new Date(parseInt(data.dateTime.substring(0, 10)) * 1000)
                    ).format("LT"), true);
                  else
                    created.textContent = moment(
                      new Date(parseInt(data.dateTime.substring(0, 10)) * 1000)
                    ).format("LT");
                }/* end of elese if */

                //create div message
                message.classList.add("message");
                //create my myMessageCover
                messageYouCover.classList.add("messageYouCover");
                //add p and created into message
                video.appendChild(source);
                video.style.width = "100%";
                video.style.maxHeight = "390px";
                video.addEventListener("canplay", () => {
                  wepperChat.scrollTop = wepperChat.scrollHeight;
                });
                message.appendChild(video);
                message.setAttribute("id", data.message_id);
                message.appendChild(created);
                //add messages div into myMessageCover
                messageYouCover.appendChild(message);
                messageYouCover.setAttribute("cover_id", data.sender_id);
                wepperChat.appendChild(messageYouCover);
                wepperChat.setAttribute(
                  "chat_id",
                  cookie.get("sndRcvId").chat_id
                );
                this.getBoundingReact(data.message_id, "rcv");
                break;

              case "voice":
                audio.controls = "controls";
                audio.classList.add("audioType");
                source.src = this.$store.state.audioPath + data.message;
                audio.appendChild(source);

                created.classList.add("created");
                if (data.created_at) {
                  if (cookie.get("lang") == 'ar')
                    created.textContent = changeNumberFormat.changeNumberFormat(moment(
                      new Date(parseInt(data.created_at.substring(0, 10)) * 1000)
                    ).format("LT"), true);
                  else
                    created.textContent = moment(
                      new Date(parseInt(data.created_at.substring(0, 10)) * 1000)
                    ).format("LT");
                } else if (data.dateTime) {
                  if (cookie.get("lang") == 'ar')
                    created.textContent = changeNumberFormat.changeNumberFormat(moment(
                      new Date(parseInt(data.dateTime.substring(0, 10)) * 1000)
                    ).format("LT"), true);
                  else
                    created.textContent = moment(
                      new Date(parseInt(data.dateTime.substring(0, 10)) * 1000)
                    ).format("LT");
                }/* end of elese if */

                message.appendChild(audio);
                message.appendChild(created);
                message.style.width = "80%";
                message.style.height = "95px";
                audio.style.width = "100%";
                //create div created

                //create div message
                message.classList.add("message");
                message.setAttribute("id", data.message_id);
                messageYouCover.classList.add("messageYouCover");
                messageYouCover.setAttribute("cover_id", data.sender_id);
                messageYouCover.appendChild(message);
                wepperChat.setAttribute(
                  "chat_id",
                  cookie.get("sndRcvId").chat_id
                );
                wepperChat.appendChild(messageYouCover);
                this.getBoundingReact(data.message_id, "rcv");
                break;

              case "imageWeb":
                img.classList.add("imgType");
                img.classList.add("flex");
                img.src = this.$store.state.imgPath + data.message;
                img.addEventListener("load", () => {
                  var isLoaded = img.complete && img.naturalHeight !== 0;
                  if (isLoaded) {
                    wepperChat.scrollTop = wepperChat.scrollHeight;
                  } /* end of if */
                }); /* end of add event listener */
                //create div created
                created.classList.add("created");
                if (data.created_at) {
                  if (cookie.get("lang") == 'ar')
                    created.textContent = changeNumberFormat.changeNumberFormat(moment(
                      new Date(parseInt(data.created_at.substring(0, 10)) * 1000)
                    ).format("LT"), true);
                  else
                    created.textContent = moment(
                      new Date(parseInt(data.created_at.substring(0, 10)) * 1000)
                    ).format("LT");
                } else if (data.dateTime) {
                  if (cookie.get("lang") == 'ar')
                    created.textContent = changeNumberFormat.changeNumberFormat(moment(
                      new Date(parseInt(data.dateTime.substring(0, 10)) * 1000)
                    ).format("LT"), true);
                  else
                    created.textContent = moment(
                      new Date(parseInt(data.dateTime.substring(0, 10)) * 1000)
                    ).format("LT");
                }/* end of elese if */
                //create div message
                message.classList.add("message");
                message.setAttribute("id", data.message_id);
                //create my myMessageCover
                messageYouCover.classList.add("messageYouCover");
                //add p and created into message
                img.appendChild(source);
                message.appendChild(img);
                message.appendChild(img);
                message.style.maxWidth = "250px";
                message.appendChild(created);
                //add messages div into myMessageCover
                messageYouCover.appendChild(message);
                messageYouCover.setAttribute("cover_id", data.sender_id);
                wepperChat.appendChild(messageYouCover);
                wepperChat.setAttribute(
                  "chat_id",
                  cookie.get("sndRcvId").chat_id
                );
                this.getBoundingReact(data.message_id, "rcv");
                break;

              case "image":
                img.classList.add("imgType");
                img.classList.add("flex");
                img.src = this.$store.state.imgPath + data.message;
                img.addEventListener("load", () => {
                  var isLoaded = img.complete && img.naturalHeight !== 0;
                  if (isLoaded) {
                    wepperChat.scrollTop = wepperChat.scrollHeight;
                  } /* end of if */
                }); /* end of add event listener */
                //create div created
                created.classList.add("created");
                if (data.created_at) {
                  if (cookie.get("lang") == 'ar')
                    created.textContent = changeNumberFormat.changeNumberFormat(moment(
                      new Date(parseInt(data.created_at.substring(0, 10)) * 1000)
                    ).format("LT"), true);
                  else
                    created.textContent = moment(
                      new Date(parseInt(data.created_at.substring(0, 10)) * 1000)
                    ).format("LT");
                } else if (data.dateTime) {
                  if (cookie.get("lang") == 'ar')
                    created.textContent = changeNumberFormat.changeNumberFormat(moment(
                      new Date(parseInt(data.dateTime.substring(0, 10)) * 1000)
                    ).format("LT"), true);
                  else
                    created.textContent = moment(
                      new Date(parseInt(data.dateTime.substring(0, 10)) * 1000)
                    ).format("LT");
                }/* end of elese if */
                //create div message
                message.classList.add("message");
                message.setAttribute("id", data.id);
                //create my myMessageCover
                messageYouCover.classList.add("messageYouCover");
                //add p and created into message
                img.appendChild(source);
                message.appendChild(img);
                message.appendChild(img);
                message.style.maxWidth = "250px";
                //add messages div into myMessageCover
                messageYouCover.appendChild(message);
                wepperChat.appendChild(messageYouCover);
                messageYouCover.setAttribute("cover_id", data.sender_id);
                wepperChat.setAttribute(
                  "chat_id",
                  cookie.get("sndRcvId").chat_id
                );
                this.getBoundingReact(data.message_id, "rcv");
                break;

              case "file":
                downloadLink.href = this.$store.state.filePath + data.message;
                img2.src = download;
                img2.style.width = "50px";
                downloadLink.appendChild(img2);
                downloadLink.target = "_blank";
                rl.appendChild(downloadLink);

                p.textContent = data.orginalName;
                title.appendChild(p);

                img.src = file2;
                title.appendChild(img);
                title.classList.add("title");

                coverFile.appendChild(rl);
                coverFile.appendChild(title);
                coverFile.classList.add("fileType");

                created.classList.add("created");
                if (data.created_at) {
                  if (cookie.get("lang") == 'ar')
                    created.textContent = changeNumberFormat.changeNumberFormat(moment(
                      new Date(parseInt(data.created_at.substring(0, 10)) * 1000)
                    ).format("LT"), true);
                  else
                    created.textContent = moment(
                      new Date(parseInt(data.created_at.substring(0, 10)) * 1000)
                    ).format("LT");
                } else if (data.dateTime) {
                  if (cookie.get("lang") == 'ar')
                    created.textContent = changeNumberFormat.changeNumberFormat(moment(
                      new Date(parseInt(data.dateTime.substring(0, 10)) * 1000)
                    ).format("LT"), true);
                  else
                    created.textContent = moment(
                      new Date(parseInt(data.dateTime.substring(0, 10)) * 1000)
                    ).format("LT");
                }/* end of elese if */

                message.appendChild(coverFile);
                message.appendChild(created);
                message.setAttribute("id", data.message_id);
                message.classList.add("message");

                messageYouCover.appendChild(message);
                messageYouCover.classList.add("messageYouCover");
                messageYouCover.setAttribute("cover_id", data.sender_id);

                wepperChat.appendChild(messageYouCover);
                wepperChat.setAttribute(
                  "chat_id",
                  cookie.get("sndRcvId").chat_id
                );
                this.getBoundingReact(data.message_id, "rcv");
                break;

              case "location":
                //var loction = data.message.split(",");
                // aMap.href =
                //   "https://www.google.com/maps?q=" +
                //   loction[0] +
                //   "," +
                //   loction[1] +
                //   "&z=17&hl=ar";
                // aMap.target = "_blank";
                //imgMap.src = map;
                aMap.style.width = "100%";
                aMap.style.height = "200px";
                //imgMap.style.width = "100%";
                //imgMap.style.height = "200px";
                //aMap.appendChild(imgMap);
                created.classList.add("created");

                if (data.created_at) {
                  data.created_at = String(data.created_at)
                  if (cookie.get("lang") == 'ar')
                    created.textContent = changeNumberFormat.changeNumberFormat(moment(
                      new Date(parseInt(data.created_at.substring(0, 10)) * 1000)
                    ).format("LT"), true);
                  else
                    created.textContent = moment(
                      new Date(parseInt(data.created_at.substring(0, 10)) * 1000)
                    ).format("LT");
                } else if (data.dateTime) {
                  data.dateTime = String(data.dateTime)
                  if (cookie.get("lang") == 'ar')
                    created.textContent = changeNumberFormat.changeNumberFormat(moment(
                      new Date(parseInt(data.dateTime.substring(0, 10)) * 1000)
                    ).format("LT"), true);
                  else
                    created.textContent = moment(
                      new Date(parseInt(data.dateTime.substring(0, 10)) * 1000)
                    ).format("LT");
                }/* end of elese if */
                message.classList.add("message");
                messageYouCover.classList.add("messageYouCover");

                message.style.minWidth = "260px"

                message.appendChild(aMap);
                message.style.display = "flex";
                message.style.flexDirection = "column";
                message.setAttribute("id", data.message_id);
                message.appendChild(created);
                messageYouCover.appendChild(message);
                wepperChat.appendChild(messageYouCover);


                this.getBoundingReact(data.message_id, "rcv");
                this.drawLocation(aMap, data.message)

                //imgMap.addEventListener("load", () => {
                //   var isLoaded = imgMap.complete && imgMap.naturalHeight !== 0;
                //   if (isLoaded) {
                //     wepperChat.scrollTop = wepperChat.scrollHeight;
                //   } /* end of if */
                // }); /* end of add event listener */

                break;
              default:
                console.log("this type of messages is unsuported .");
                break;
            } /* /switch */

            this.newFormMessage(null, cookie.get("sndRcvId").reciver_id)

            if (data.state == "2") {
              data.state = "3";
              this.io.emit("seen", data);
            } /* end of if */
          } else if (data.chat_id == cookie.get("sndRcvId").chat_id) {
            if (cookie.get("sndRcvId").chat_id) {
              this.newMassege = data;
            } else {
              var c = document.getElementsByClassName("carad")[0];
              c.removeAttribute("id");
              if (this.user.id == data.reciver_id) {
                c.setAttribute("id", data.reciver_id);
              } else {
                c.setAttribute("id", data.sender_id);
              }
            } /* end of if */
          } else if (
            data.chat_id != cookie.get("sndRcvId").chat_id &&
            !data.seen
          ) {
            if (lastMsg) {
              switch (data.message_type) {
                case "text":
                  lastMsg.textContent = data.message;
                  break;

                case "video":
                  lastMsg.innerHTML =
                    this._trans("vedio") +
                    `&nbsp;&nbsp;&nbsp;<svg aria-hidden="true" data-prefix="fas" data-icon="film" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-film fa-w-16" data-fa-i2svg>
  <path fill="currentColor" d="M488 64h-8v20c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12V64H96v20c0 6.6-5.4 12-12 12H44c-6.6 0-12-5.4-12-12V64h-8C10.7 64 0 74.7 0 88v336c0 13.3 10.7 24 24 24h8v-20c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v20h320v-20c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v20h8c13.3 0 24-10.7 24-24V88c0-13.3-10.7-24-24-24zM96 372c0 6.6-5.4 12-12 12H44c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12H44c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12H44c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm272 208c0 6.6-5.4 12-12 12H156c-6.6 0-12-5.4-12-12v-96c0-6.6 5.4-12 12-12h200c6.6 0 12 5.4 12 12v96zm0-168c0 6.6-5.4 12-12 12H156c-6.6 0-12-5.4-12-12v-96c0-6.6 5.4-12 12-12h200c6.6 0 12 5.4 12 12v96zm112 152c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40z" class=""></path></svg>`;
                  break;

                case "voice":
                  lastMsg.innerHTML =
                    this._trans("voice") +
                    `&nbsp;&nbsp;&nbsp;<svg aria-hidden="true" data-prefix="fas" data-icon="microphone" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512" class="svg-inline--fa fa-microphone fa-w-11" data-fa-i2svg>
  <path fill="currentColor" d="M176 352c53.02 0 96-42.98 96-96V96c0-53.02-42.98-96-96-96S80 42.98 80 96v160c0 53.02 42.98 96 96 96zm160-160h-16c-8.84 0-16 7.16-16 16v48c0 74.8-64.49 134.82-140.79 127.38C96.71 376.89 48 317.11 48 250.3V208c0-8.84-7.16-16-16-16H16c-8.84 0-16 7.16-16 16v40.16c0 89.64 63.97 169.55 152 181.69V464H96c-8.84 0-16 7.16-16 16v16c0 8.84 7.16 16 16 16h160c8.84 0 16-7.16 16-16v-16c0-8.84-7.16-16-16-16h-56v-33.77C285.71 418.47 352 344.9 352 256v-48c0-8.84-7.16-16-16-16z" class=""></path></svg>`;
                  break;

                case "imageWeb":
                  lastMsg.innerHTML =
                    this._trans("image") +
                    `&nbsp;&nbsp;&nbsp;<svg aria-hidden="true" data-prefix="fas" data-icon="image" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-image fa-w-16" data-fa-i2svg>
  <path fill="currentColor" d="M464 448H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h416c26.51 0 48 21.49 48 48v288c0 26.51-21.49 48-48 48zM112 120c-30.928 0-56 25.072-56 56s25.072 56 56 56 56-25.072 56-56-25.072-56-56-56zM64 384h384V272l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L208 320l-55.515-55.515c-4.686-4.686-12.284-4.686-16.971 0L64 336v48z" class=""></path></svg>`;
                  break;

                case "file":
                  lastMsg.innerHTML =
                    this._trans("file") +
                    `&nbsp;&nbsp;&nbsp;<svg aria-hidden="true" data-prefix="fas" data-icon="file" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="svg-inline--fa fa-image fa-w-16" data-fa-i2svg>
  <path fill="currentColor" d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm160-14.1v6.1H256V0h6.1c6.4 0 12.5 2.5 17 7l97.9 98c4.5 4.5 7 10.6 7 16.9z" class=""></path></svg>`;
                  break;

                case "location":
                  lastMsg.innerHTML =
                    this._trans("location") +
                    `&nbsp;&nbsp;&nbsp;<svg aria-hidden="true" data-prefix="fas" data-icon="map" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-image fa-w-16" data-fa-i2svg>
  <path fill="currentColor" d="M0 117.66v346.32c0 11.32 11.43 19.06 21.94 14.86L160 416V32L20.12 87.95A32.006 32.006 0 0 0 0 117.66zM192 416l192 64V96L192 32v384zM554.06 33.16L416 96v384l139.88-55.95A31.996 31.996 0 0 0 576 394.34V48.02c0-11.32-11.43-19.06-21.94-14.86z" class=""></path></svg>`;
                  break;
              } /* end of switch */
              lastMsg.style.fontWeight = "900";

              if (this.chatId != data.chat_id) {
                this.chatId = data.chat_id;
                var audioOb = new Audio(newMessage);
                audioOb.muted = this.$store.state.mute;
                audioOb.addEventListener("canplaythrough", () => {
                  /* the audio is now playable; play it if permissions allow */
                  audioOb.play();
                });
              } /* end of if */
            } /* end of if */
          } /* end of if */
        } else {
          if (lastMsg) {
            lastMsg.style.fontWeight = "900";
            switch (data.message_type) {
              case "text":
                lastMsg.textContent = data.message;
                break;

              case "video":
                lastMsg.innerHTML =
                  this._trans("vedio") +
                  `&nbsp;&nbsp;&nbsp;<svg aria-hidden="true" data-prefix="fas" data-icon="film" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-film fa-w-16" data-fa-i2svg>
  <path fill="currentColor" d="M488 64h-8v20c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12V64H96v20c0 6.6-5.4 12-12 12H44c-6.6 0-12-5.4-12-12V64h-8C10.7 64 0 74.7 0 88v336c0 13.3 10.7 24 24 24h8v-20c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v20h320v-20c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v20h8c13.3 0 24-10.7 24-24V88c0-13.3-10.7-24-24-24zM96 372c0 6.6-5.4 12-12 12H44c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12H44c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12H44c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm272 208c0 6.6-5.4 12-12 12H156c-6.6 0-12-5.4-12-12v-96c0-6.6 5.4-12 12-12h200c6.6 0 12 5.4 12 12v96zm0-168c0 6.6-5.4 12-12 12H156c-6.6 0-12-5.4-12-12v-96c0-6.6 5.4-12 12-12h200c6.6 0 12 5.4 12 12v96zm112 152c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40z" class=""></path></svg>`;
                break;

              case "voice":
                lastMsg.innerHTML =
                  this._trans("voice") +
                  `&nbsp;&nbsp;&nbsp;<svg aria-hidden="true" data-prefix="fas" data-icon="microphone" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512" class="svg-inline--fa fa-microphone fa-w-11" data-fa-i2svg>
  <path fill="currentColor" d="M176 352c53.02 0 96-42.98 96-96V96c0-53.02-42.98-96-96-96S80 42.98 80 96v160c0 53.02 42.98 96 96 96zm160-160h-16c-8.84 0-16 7.16-16 16v48c0 74.8-64.49 134.82-140.79 127.38C96.71 376.89 48 317.11 48 250.3V208c0-8.84-7.16-16-16-16H16c-8.84 0-16 7.16-16 16v40.16c0 89.64 63.97 169.55 152 181.69V464H96c-8.84 0-16 7.16-16 16v16c0 8.84 7.16 16 16 16h160c8.84 0 16-7.16 16-16v-16c0-8.84-7.16-16-16-16h-56v-33.77C285.71 418.47 352 344.9 352 256v-48c0-8.84-7.16-16-16-16z" class=""></path></svg>`;
                break;

              case "imageWeb":
                lastMsg.innerHTML =
                  this._trans("image") +
                  `&nbsp;&nbsp;&nbsp;<svg aria-hidden="true" data-prefix="fas" data-icon="image" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-image fa-w-16" data-fa-i2svg>
  <path fill="currentColor" d="M464 448H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h416c26.51 0 48 21.49 48 48v288c0 26.51-21.49 48-48 48zM112 120c-30.928 0-56 25.072-56 56s25.072 56 56 56 56-25.072 56-56-25.072-56-56-56zM64 384h384V272l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L208 320l-55.515-55.515c-4.686-4.686-12.284-4.686-16.971 0L64 336v48z" class=""></path></svg>`;
                break;

              case "file":
                lastMsg.innerHTML =
                  this._trans("file") +
                  `&nbsp;&nbsp;&nbsp;<svg aria-hidden="true" data-prefix="fas" data-icon="file" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="svg-inline--fa fa-image fa-w-16" data-fa-i2svg>
  <path fill="currentColor" d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm160-14.1v6.1H256V0h6.1c6.4 0 12.5 2.5 17 7l97.9 98c4.5 4.5 7 10.6 7 16.9z" class=""></path></svg>`;
                break;

              case "location":
                lastMsg.innerHTML =
                  this._trans("location") +
                  `&nbsp;&nbsp;&nbsp;<svg aria-hidden="true" data-prefix="fas" data-icon="map" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-image fa-w-16" data-fa-i2svg>
  <path fill="currentColor" d="M0 117.66v346.32c0 11.32 11.43 19.06 21.94 14.86L160 416V32L20.12 87.95A32.006 32.006 0 0 0 0 117.66zM192 416l192 64V96L192 32v384zM554.06 33.16L416 96v384l139.88-55.95A31.996 31.996 0 0 0 576 394.34V48.02c0-11.32-11.43-19.06-21.94-14.86z" class=""></path></svg>`;
                break;
            } /* end of switch */
          } /* end of if */
        } /* end of if */

        var carad = document.getElementById(data.chat_id);
        if (carad) {
          var datePosition = carad.children[1].children[0];
          if (datePosition) {
            if (!data.seen)
              datePosition.textContent = this.checkFormatDate(data);
          } /* /end of if  */
        } /* end of if */

        wepperChat.scrollTop = wepperChat.scrollHeight;
      } catch (e) {
        console.log(e);
      } /* end of try catch */
    } /* /dispalyMsg */,

    //this function for recored new audio
    async adioRecording() {
      try {
        if (this.recorder == true) {
          this.recorder = null;

          if (document.getElementsByClassName("myMessageInput")) {
            document.getElementsByClassName("myMessageInput")[0].style.display =
              "none";
            document.getElementsByClassName("voiceMsg")[0].style.display =
              "flex";
            document.getElementsByClassName("sendVoice")[0].style.display =
              "flex";
            document.getElementsByClassName("microphone")[0].style.display =
              "none";
          } /* end of if */

          if (mediaRecorder) {
            var track = document.getElementsByClassName("track")[0];
            track.style.animation = "none";
            mediaRecorder.stop();
          } /* end of if */
        } else {
          //HERE WE WILL TAKE SOUND ANDSEND HIM TO ANOTHER PERSON

          navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then((stream) => {
              this.recorder = true;
              mediaRecorder = new MediaRecorder(stream);
              mediaRecorder.start();
              const audioChunks = [];
              countDownDate = new Date().getTime();
              mediaRecorder.addEventListener("dataavailable", (event) => {
                audioChunks.push(event.data);
              });

              mediaRecorder.addEventListener("stop", () => {
                //audioBlob this variable is voice file you can send him to the server
                this.audioBlob = new Blob(audioChunks);
                audioUrl = URL.createObjectURL(this.audioBlob);

                //here i will calculte time of voice
                var now = new Date().getTime();
                var timeleft = countDownDate - now;
                seconds = Math.floor((timeleft % (1000 * 60)) / 1000) * -1;
                document.getElementsByClassName("timeTrack")[0].textContent =
                  seconds + "s";
                if (this.l_.message == "الرسالة") {
                  document.getElementsByClassName("timeTrack")[0].style.left =
                    "0px";
                } else {
                  document.getElementsByClassName("timeTrack")[0].style.right =
                    "0px";
                } /* end of if */
                document.getElementsByClassName("track")[0].style.width = "90%";
                /* const audio = new Audio(audioUrl); */
                var ddt = new Date();
                var start = moment(ddt);
                var end = moment(new Date());
                ddt = end.from(start, true);
                audio = new Audio(audioUrl);
                this.recorder = null;
                /*  audio.play(); */
              }); /* end of  mediaRecorder.addEventListener */

              if (this.recorder == true) {
                setTimeout(() => {
                  this.recorder = null;
                  if (!(mediaRecorder.state == "inactive")) {
                    var track = document.getElementsByClassName("track")[0];
                    track.style.animation = "none";
                    mediaRecorder.stop();
                  } /* end of if */
                }, 59000); /* end of setTime function */
              } /* end of if */
            }); /* end of mediaDevices.geyUserMedia */
        } /* end of if */
      } catch (e) {
        console.log(e);
      } /* end of try catch */
    } /* /adioRecording */,

    playRecord(paus) {
      try {
        var track = document.getElementsByClassName("track")[0];
        var timeTrack = document.getElementsByClassName("timeTrack")[0];
        if (paus == 0) {
          var sec = 1;
          document.getElementsByClassName("track")[0].style.width = "0%";
          track.style.animationName = "palyTrack";
          track.style.animationDuration = seconds + "s";
          track.style.animationTimingFunction = "ease-in-out";

          timeTrack.textContent = sec + "s";
          this.checkAudioPlayOrNo = true;
          var clInterval = setInterval(() => {
            timeTrack.textContent = sec + 1 + "s";
            sec++;
            localStorage.setItem("sec", sec);
            if (seconds < sec) {
              clearIntervall();
              this.checkAudioPlayOrNo = false;
            } /* end of if */
          }, 1000);
          var clearIntervall = () => {
            clearInterval(clInterval);
            sec = 0;
            timeTrack.textContent = seconds + "s";
            document.getElementsByClassName("track")[0].style.width = "90%";
            track.style.animation = "none";
          };
          audio.play();
        } /* end of if */
      } catch (e) {
        console.log(e);
      } /* end of try catch */
    } /* /playRecord */,

    //this function to delete recoreding after send him
    deleteRecording() {
      try {
        if (document.getElementsByClassName("myMessageInput")[0]) {
          document.getElementsByClassName("myMessageInput")[0].style.display =
            "block";
          document.getElementsByClassName("voiceMsg")[0].style.display = "none";
          document.getElementsByClassName("sendVoice")[0].style.display =
            "none";
          document.getElementsByClassName("microphone")[0].style.display =
            "flex";
        } /* end of if */
        audio = null;
      } catch (e) {
        console.log(e);
      }
    } /* /deleteRecording */,

    //this function to get all my contact users
    conectUser() {
      this.io.emit("connect user", { user_id: this.user.id });
    } /* /conectUser */,

    //this function used to check this user is typing or no
    typeing() {
      try {
        const myMessageInput = document.getElementById("myMessageInput");
        if (myMessageInput) {
          myMessageInput.addEventListener("keydown", (e) => {
            if (this.showmunu == false) {
              this.showMenu();
            } /* end of if */

            let ascii,
              key = e.key;
            if (key.length == 1) {
              ascii = key.charCodeAt(0);
              if (ascii < 128 && e.ctrlKey) {
                ascii = ascii & 0x1f;
              } /* end of if */
            } /* end of if  */

            if (key != "Enter") {
              var rcv_id = 0;
              //to detrmain rciveUser
              if (cookie.get("sndRcvId").sender_id == this.user.id) {
                rcv_id = cookie.get("sndRcvId").reciver_id;
              } else {
                rcv_id = cookie.get("sndRcvId").sender_id;
              } /* end of if */
              this.io.emit("on typing", {
                typing: true,
                id: rcv_id,
                chat_id: cookie.get("sndRcvId").chat_id,
                my_id: JSON.stringify(cookie.get("user").id) || null,
              }); /* end of send event typing */
              this.myMessageInput = [rcv_id, this.io, myMessageInput.value];
            } /* end of if */
            // use e.keyCode
          }); /* end of litener for keyPress */
        } /* end of if */
      } catch (e) {
        console.log(e);
      }
    } /* /typing */,

    //this function used to check this user is stop typing or no
    stopTyping() {
      try {
        this.io.on("on typing", (data) => {
          if (data && cookie.get("sndRcvId")) {
            if (
              data.chat_id != null &&
              cookie.get("sndRcvId").chat_id &&
              data.chat_id == cookie.get("sndRcvId").chat_id
            )
              this.typing = data.typing;
          }
        }); /* /end of ontyping */
      } catch (e) {
        console.log(e);
      } /* end of try catch */
    } /* /stopTyping */,

    _trans(x) {
      return this.l_[x];
    } /* _trans */,
  } /* /methods */,

  computed: {
    unblockUserInf() {
      if (this.$store.state.unBlockUserInfo.length) {
        return this.$store.state.unBlockUserInfo;
      } /* end of if  */
      return null;
    } /* /unblockUserInf */,

    seenMsgs() {
      if (this.newMassege) {
        return this.newMassege;
      } /* end of if */
      return null;
    },

    changStyle() {
      var nameUser = document.getElementsByClassName("nameUser");
      return nameUser;
    } /* /changStyle */,

    checkDeleteWindowState() {
      if (this.$store.state.closeSelectElementWindow)
        return this.$store.state.closeSelectElementWindow;
      return false;
    } /* end of this function  */,
  } /* /computed */,

  watch: {
    //this function to display old message between two users
    msgs(x) {
      setTimeout(() => {
        try {

          this.inputMsg = ""
          this.lastDateMsg = null;
          this.displyReply = false;

          this.typeing();
          this.checkBlockConversation(this.blockedUserInfo);
          if (this.$store.state.unBlockUserInfo)
            this.checkUnblockConversation(this.$store.state.unBlockUserInfo);

          //this.checkUserConnection();

          this.itm = this.item;

          if (document.getElementsByClassName("myMessageInput")[0]) {
            document.getElementsByClassName("myMessageInput")[0].style.display =
              "block";
            document.getElementsByClassName("voiceMsg")[0].style.display =
              "none";
            document.getElementsByClassName("sendVoice")[0].style.display =
              "none";
            document.getElementsByClassName("microphone")[0].style.display =
              "flex";
          } /* end of if */

          const wepperChat = document.getElementsByClassName("wepper-chat")[0];
          wepperChat.innerHTML = "";
          wepperChat.setAttribute("chat_id", cookie.get("sndRcvId").chat_id);
          wepperChat.style.justifyContent = "unset";
          wepperChat.style.alignItems = "unset";

          if (x) {
            x.forEach((item) => {
              var p = document.createElement("p");
              var video = document.createElement("video");
              var audio = document.createElement("audio");
              var source = document.createElement("source");
              var created = document.createElement("div");
              var message = document.createElement("div");
              var seen = document.createElement("div");

              var aMap = document.createElement("div");
              var imgMap = document.createElement("img");

              var myMessageCover = document.createElement("div");
              var messageYouCover = document.createElement("div");

              //this for file messgae
              var coverFile = document.createElement("div");
              var rl = document.createElement("div");
              var downloadLink = document.createElement("a");
              var imgf = document.createElement("img");
              var img = document.createElement("img");
              var img2 = document.createElement("img");
              var title = document.createElement("div");

              var createWpperDate = null;
              var createDatePagination = null;
              var getDateMessage = null;

              message.setAttribute("id", item.message_id);

              video.style.width = "100%";
              audio.style.width = "100%";
              audio.style.maxHeight = "400px";
              video.style.maxHeight = "400px";

              /*  var start = moment(parseInt(item.created_at));
              var end = moment(new Date()); */
              switch (item.message_type) {
                case "text":
                  //this section for if not found reply message

                  if (item.sender_id == this.user.id) {
                    if (this.checkUrlInMessage(item.message)) {
                      p.innerHTML = this.checkUrlInMessage(item.message);
                    } else {
                      p.textContent = item.message;
                    } /* end of if */

                    //create div created
                    created.classList.add("created");
                    if (cookie.get("lang") == 'ar')
                      created.textContent = changeNumberFormat.changeNumberFormat(moment(
                        new Date(parseInt(item.created_at.substring(0, 10)) * 1000)
                      ).format("LT"), true);
                    else
                      created.textContent = moment(
                        new Date(parseInt(item.created_at.substring(0, 10)) * 1000)
                      ).format("LT");
                    //create div message
                    message.classList.add("message");
                    //create my myMessageCover
                    myMessageCover.classList.add("myMessageCover");
                    //add p and created into message
                    message.appendChild(p);
                    message.appendChild(created);
                    switch (item.state) {
                      case 1:
                        seen.classList.add("check-dubole");
                        img.src = check;
                        seen.appendChild(img);
                        message.appendChild(seen);
                        break;
                      case 2:
                        seen.classList.add("check-dubole");
                        img.src = checkDuboleNotSeen;
                        seen.appendChild(img);
                        message.appendChild(seen);
                        break;
                      case 3:
                        seen.classList.add("check-dubole");
                        img.src = checkDubole;
                        seen.appendChild(img);
                        message.appendChild(seen);
                        break;
                      default:
                        console.log("something wrong...");
                        break;
                    } /* end of switch */
                    //add messages div into myMessageCover
                    myMessageCover.appendChild(message);

                    //this section to check if message is replay message or no
                    if (!item.reply_message) {
                      wepperChat.appendChild(myMessageCover);

                      getDateMessage = this.checkWepperDate(item, true);
                      if (getDateMessage) {
                        createWpperDate = document.createElement("div");
                        createWpperDate.classList.add("wepperDate");

                        createDatePagination = document.createElement("div");
                        createWpperDate.appendChild(createDatePagination);

                        createDatePagination.textContent = getDateMessage;
                        createDatePagination.classList.add("datePagination");
                        wepperChat.insertBefore(createWpperDate, myMessageCover);
                      } /* end of if */

                    } else {
                      this.displayReplyMessage(item, myMessageCover)
                    }/* end of if */


                  } else {
                    //add text content for p
                    if (this.checkUrlInMessage(item.message)) {
                      p.innerHTML = this.checkUrlInMessage(item.message);
                    } else {
                      p.textContent = item.message;
                    } /* end of if */
                    //create div created
                    created.classList.add("created");

                    if (cookie.get("lang") == 'ar')
                      created.textContent = changeNumberFormat.changeNumberFormat(moment(
                        new Date(parseInt(item.created_at.substring(0, 10)) * 1000)
                      ).format("LT"), true);
                    else
                      created.textContent = moment(
                        new Date(parseInt(item.created_at.substring(0, 10)) * 1000)
                      ).format("LT");
                    //create div message
                    message.classList.add("message");
                    //create my myMessageCover
                    messageYouCover.classList.add("messageYouCover");
                    //add p and created into message
                    message.appendChild(p);
                    message.appendChild(created);
                    //add messages div into myMessageCover
                    messageYouCover.appendChild(message);

                    //this section to check if message is replay message or no
                    if (!item.reply_message) {
                      wepperChat.appendChild(messageYouCover);
                      getDateMessage = this.checkWepperDate(item, true);
                      if (getDateMessage) {
                        createWpperDate = document.createElement("div");
                        createWpperDate.classList.add("wepperDate");

                        createDatePagination = document.createElement("div");
                        createWpperDate.appendChild(createDatePagination);

                        createDatePagination.textContent = getDateMessage;
                        createDatePagination.classList.add("datePagination");
                        wepperChat.insertBefore(createWpperDate, messageYouCover);
                      } /* end of if */
                    } else {
                      this.displayReplyMessage(item, messageYouCover)
                    }/* end of if */

                  } /* end of if */

                  break;
                /* end of text case */
                case "video":

                  /* this section for if not found reply message */
                  if (item.sender_id == this.user.id) {
                    //create p tag
                    /* here we will create video element */
                    video.controls = "controls";
                    video.classList.add("videoType");
                    video.classList.add("flex");
                    video.src = this.$store.state.videoPath + item.message;

                    video.addEventListener("canplay", () => {
                      wepperChat.scrollTop = wepperChat.scrollHeight;
                    });
                    //create div created
                    created.classList.add("created");

                    if (cookie.get("lang") == 'ar')
                      created.textContent = changeNumberFormat.changeNumberFormat(moment(
                        new Date(parseInt(item.created_at.substring(0, 10)) * 1000)
                      ).format("LT"), true);
                    else
                      created.textContent = moment(
                        new Date(parseInt(item.created_at.substring(0, 10)) * 1000)
                      ).format("LT");
                    //create div message
                    message.classList.add("message");
                    //create my myMessageCover
                    myMessageCover.classList.add("myMessageCover");
                    //add p and created into message
                    video.appendChild(source);
                    switch (item.state) {
                      case 1:
                        seen.classList.add("check-dubole");
                        img.src = check;
                        seen.appendChild(img);
                        message.appendChild(seen);
                        break;
                      case 2:
                        seen.classList.add("check-dubole");
                        img.src = checkDuboleNotSeen;
                        seen.appendChild(img);
                        message.appendChild(seen);
                        break;
                      case 3:
                        seen.classList.add("check-dubole");
                        img.src = checkDubole;
                        seen.appendChild(img);
                        message.appendChild(seen);
                        break;
                      default:
                        console.log("something wrong...");
                        break;
                    } /* end of switch */
                    message.appendChild(video);
                    message.appendChild(created);
                    //add messages div into myMessageCover
                    myMessageCover.appendChild(message);

                    //this section to check if message is replay message or no
                    if (!item.reply_message) {
                      wepperChat.appendChild(myMessageCover);
                      getDateMessage = this.checkWepperDate(item, true);
                      if (getDateMessage) {
                        createWpperDate = document.createElement("div");
                        createWpperDate.classList.add("wepperDate");

                        createDatePagination = document.createElement("div");
                        createWpperDate.appendChild(createDatePagination);

                        createDatePagination.textContent = getDateMessage;
                        createDatePagination.classList.add("datePagination");
                        wepperChat.insertBefore(createWpperDate, myMessageCover);
                      } /* end of if */
                    } else {
                      this.displayReplyMessage(item, myMessageCover)
                    }/* end of if */

                  } else {
                    video.controls = "controls";
                    video.classList.add("videoType");
                    video.src = this.$store.state.videoPath + item.message;
                    video.addEventListener("canplay", () => {
                      wepperChat.scrollTop = wepperChat.scrollHeight;
                    });
                    //create div created
                    created.classList.add("created");

                    if (cookie.get("lang") == 'ar')
                      created.textContent = changeNumberFormat.changeNumberFormat(moment(
                        new Date(parseInt(item.created_at.substring(0, 10)) * 1000)
                      ).format("LT"), true);
                    else
                      created.textContent = moment(
                        new Date(parseInt(item.created_at.substring(0, 10)) * 1000)
                      ).format("LT");
                    //create div message
                    message.classList.add("message");
                    //create my myMessageCover
                    messageYouCover.classList.add("messageYouCover");
                    //add p and created into message
                    video.appendChild(source);
                    message.appendChild(video);
                    message.appendChild(created);
                    //add messages div into myMessageCover
                    messageYouCover.appendChild(message);

                    //this section to check if message is replay message or no
                    if (!item.reply_message) {
                      wepperChat.appendChild(messageYouCover);
                      getDateMessage = this.checkWepperDate(item, true);
                      if (getDateMessage) {
                        createWpperDate = document.createElement("div");
                        createWpperDate.classList.add("wepperDate");

                        createDatePagination = document.createElement("div");
                        createWpperDate.appendChild(createDatePagination);

                        createDatePagination.textContent = getDateMessage;
                        createDatePagination.classList.add("datePagination");
                        wepperChat.insertBefore(createWpperDate, messageYouCover);
                      } /* end of if */
                    } else {
                      this.displayReplyMessage(item, messageYouCover)
                    }/* end of if */

                  } /* end of if */

                  //   //this section for sender message
                  //   if (item.sender_id == this.user.id) {
                  //     this.displayReplyMessage(item, "sender")
                  //     //this section for reciver message
                  //   } else {
                  //     this.displayReplyMessage(item, "reciver")
                  //   }/* end of if */
                  // }/* end of if */

                  break;
                /* /case video */
                case "voice":
                  /* this section for if not found reply message */

                  if (item.sender_id == this.user.id) {
                    //create p tag
                    /* here we will create video element */
                    audio.controls = "controls";
                    audio.classList.add("audioType");
                    source.src = this.$store.state.audioPath + item.message;
                    //create div created
                    created.classList.add("created");

                    if (cookie.get("lang") == 'ar')
                      created.textContent = changeNumberFormat.changeNumberFormat(moment(
                        new Date(parseInt(item.created_at.substring(0, 10)) * 1000)
                      ).format("LT"), true);
                    else
                      created.textContent = moment(
                        new Date(parseInt(item.created_at.substring(0, 10)) * 1000)
                      ).format("LT");
                    //create div message
                    message.classList.add("message");
                    message.style.width = "80%";
                    message.style.height = "95px";
                    switch (item.state) {
                      case 1:
                        seen.classList.add("check-dubole");
                        img.src = check;
                        seen.appendChild(img);
                        message.appendChild(seen);
                        break;
                      case 2:
                        seen.classList.add("check-dubole");
                        img.src = checkDuboleNotSeen;
                        seen.appendChild(img);
                        message.appendChild(seen);
                        break;
                      case 3:
                        seen.classList.add("check-dubole");
                        img.src = checkDubole;
                        seen.appendChild(img);
                        message.appendChild(seen);
                        break;
                      default:
                        console.log("something wrong...");
                        break;
                    } /* end of switch */
                    //create my myMessageCover
                    myMessageCover.classList.add("myMessageCover");
                    //add p and created into message
                    audio.appendChild(source);
                    message.appendChild(audio);
                    message.appendChild(created);
                    //add messages div into myMessageCover
                    myMessageCover.appendChild(message);

                    //this section to check if message is replay message or no
                    if (!item.reply_message) {
                      wepperChat.appendChild(myMessageCover);
                      getDateMessage = this.checkWepperDate(item, true);
                      if (getDateMessage) {
                        createWpperDate = document.createElement("div");
                        createWpperDate.classList.add("wepperDate");

                        createDatePagination = document.createElement("div");
                        createWpperDate.appendChild(createDatePagination);

                        createDatePagination.textContent = getDateMessage;
                        createDatePagination.classList.add("datePagination");
                        wepperChat.insertBefore(createWpperDate, myMessageCover);
                      } /* end of if */
                    } else {
                      this.displayReplyMessage(item, myMessageCover)
                    }/* end of if */


                  } else {
                    audio.controls = "controls";
                    audio.classList.add("audioType");
                    source.src = this.$store.state.audioPath + item.message;
                    //create div created
                    created.classList.add("created");

                    if (cookie.get("lang") == 'ar')
                      created.textContent = changeNumberFormat.changeNumberFormat(moment(
                        new Date(parseInt(item.created_at.substring(0, 10)) * 1000)
                      ).format("LT"), true);
                    else
                      created.textContent = moment(
                        new Date(parseInt(item.created_at.substring(0, 10)) * 1000)
                      ).format("LT");
                    //create div message
                    message.classList.add("message");
                    message.style.width = "80%";
                    message.style.height = "95px";
                    //create my myMessageCover
                    messageYouCover.classList.add("messageYouCover");
                    //add p and created into message
                    audio.appendChild(source);
                    message.appendChild(audio);
                    message.appendChild(created);
                    //add messages div into myMessageCover
                    messageYouCover.appendChild(message);

                    //this section to check if message is replay message or no
                    if (!item.reply_message) {
                      wepperChat.appendChild(messageYouCover);
                      getDateMessage = this.checkWepperDate(item, true);
                      if (getDateMessage) {
                        createWpperDate = document.createElement("div");
                        createWpperDate.classList.add("wepperDate");

                        createDatePagination = document.createElement("div");
                        createWpperDate.appendChild(createDatePagination);

                        createDatePagination.textContent = getDateMessage;
                        createDatePagination.classList.add("datePagination");
                        wepperChat.insertBefore(createWpperDate, messageYouCover);
                      } /* end of if */
                    } else {
                      this.displayReplyMessage(item, messageYouCover)
                    }/* end of if */


                  } /* end of if */


                  // //this section for sender message
                  // if (item.sender_id == this.user.id) {
                  //   this.displayReplyMessage(item, "sender")
                  //   //this section for reciver message
                  // } else {
                  //   this.displayReplyMessage(item, "reciver")
                  // }/* end of if */


                  break;
                /* end of voice */
                case "file":
                  /* this section for if not found reply message */
                  if (item.sender_id == this.user.id) {
                    downloadLink.href =
                      this.$store.state.filePath + item.message;
                    img2.src = download;
                    img2.style.width = "50px";
                    downloadLink.appendChild(img2);
                    downloadLink.target = "_blank";
                    rl.appendChild(downloadLink);

                    p.textContent = item.orginalName;
                    title.appendChild(p);

                    imgf.src = file2;
                    title.appendChild(imgf);
                    title.classList.add("title");

                    coverFile.appendChild(rl);
                    coverFile.appendChild(title);
                    coverFile.classList.add("fileType");

                    created.classList.add("created");

                    if (cookie.get("lang") == 'ar')
                      created.textContent = changeNumberFormat.changeNumberFormat(moment(
                        new Date(parseInt(item.created_at.substring(0, 10)) * 1000)
                      ).format("LT"), true);
                    else
                      created.textContent = moment(
                        new Date(parseInt(item.created_at.substring(0, 10)) * 1000)
                      ).format("LT");
                    switch (item.state) {
                      case 1:
                        seen.classList.add("check-dubole");
                        img.src = check;
                        seen.appendChild(img);
                        message.appendChild(seen);
                        break;
                      case 2:
                        seen.classList.add("check-dubole");
                        img.src = checkDuboleNotSeen;
                        seen.appendChild(img);
                        message.appendChild(seen);
                        break;
                      case 3:
                        seen.classList.add("check-dubole");
                        img.src = checkDubole;
                        seen.appendChild(img);
                        message.appendChild(seen);
                        break;
                      default:
                        console.log("something wrong...");
                        break;
                    } /* end of switch */
                    message.appendChild(coverFile);
                    message.appendChild(created);
                    message.classList.add("message");

                    myMessageCover.appendChild(message);
                    myMessageCover.classList.add("myMessageCover");

                    //this section to check if message is replay message or no
                    if (!item.reply_message) {
                      wepperChat.appendChild(myMessageCover);
                      getDateMessage = this.checkWepperDate(item, true);
                      if (getDateMessage) {
                        createWpperDate = document.createElement("div");
                        createWpperDate.classList.add("wepperDate");

                        createDatePagination = document.createElement("div");
                        createWpperDate.appendChild(createDatePagination);

                        createDatePagination.textContent = getDateMessage;
                        createDatePagination.classList.add("datePagination");
                        wepperChat.insertBefore(createWpperDate, myMessageCover);
                      } /* end of if */
                    } else {
                      this.displayReplyMessage(item, myMessageCover)
                    }/* end of if */

                  } else {
                    downloadLink.href =
                      this.$store.state.filePath + item.message;
                    img2.src = download;
                    img2.style.width = "50px";
                    downloadLink.appendChild(img2);
                    downloadLink.target = "_blank";
                    rl.appendChild(downloadLink);

                    p.textContent = item.orginalName;
                    title.appendChild(p);

                    img.src = file2;
                    title.appendChild(img);
                    title.classList.add("title");

                    coverFile.appendChild(rl);
                    coverFile.appendChild(title);
                    coverFile.classList.add("fileType");

                    created.classList.add("created");

                    if (cookie.get("lang") == 'ar')
                      created.textContent = changeNumberFormat.changeNumberFormat(moment(
                        new Date(parseInt(item.created_at.substring(0, 10)) * 1000)
                      ).format("LT"), true);
                    else
                      created.textContent = moment(
                        new Date(parseInt(item.created_at.substring(0, 10)) * 1000)
                      ).format("LT");

                    message.appendChild(coverFile);
                    message.appendChild(created);
                    message.classList.add("message");

                    messageYouCover.appendChild(message);
                    messageYouCover.classList.add("messageYouCover");

                    if (!item.reply_message) {
                      wepperChat.appendChild(messageYouCover);

                      getDateMessage = this.checkWepperDate(item, true);
                      if (getDateMessage) {
                        createWpperDate = document.createElement("div");
                        createWpperDate.classList.add("wepperDate");

                        createDatePagination = document.createElement("div");
                        createWpperDate.appendChild(createDatePagination);

                        createDatePagination.textContent = getDateMessage;
                        createDatePagination.classList.add("datePagination");
                        wepperChat.insertBefore(createWpperDate, messageYouCover);
                      } /* end of if */
                    } else {
                      this.displayReplyMessage(item, myMessageCover)
                    }/* end of if */

                  } /* end of if */

                  // //this section for sender message
                  // if (item.sender_id == this.user.id) {
                  //   this.displayReplyMessage(item, "sender")
                  //   //this section for reciver message
                  // } else {
                  //   this.displayReplyMessage(item, "reciver")
                  // }/* end of if */
                  break;
                /* end of file */
                case "image":
                  if (item.sender_id == this.user.id) {
                    //create p tag
                    /* here we will create video element */
                    img2.classList.add("imgType");
                    img2.classList.add("flex");

                    img2.src = this.$store.state.imgPath + item.message;
                    img2.addEventListener("load", () => {
                      var isLoaded = img2.complete && img2.naturalHeight !== 0;
                      if (isLoaded) {
                        wepperChat.scrollTop = wepperChat.scrollHeight;
                      } /* end of if */
                    }); /* end of add event listener */
                    //create div created
                    created.classList.add("created");

                    if (cookie.get("lang") == 'ar')
                      created.textContent = changeNumberFormat.changeNumberFormat(moment(
                        new Date(parseInt(item.created_at.substring(0, 10)) * 1000)
                      ).format("LT"), true);
                    else
                      created.textContent = moment(
                        new Date(parseInt(item.created_at.substring(0, 10)) * 1000)
                      ).format("LT");
                    //create div message
                    message.classList.add("message");
                    //create my myMessageCover
                    myMessageCover.classList.add("myMessageCover");
                    //add p and created into message
                    rl.appendChild(img2);
                    rl.target = "_blank";
                    rl.href = this.$store.state.imgPath + item.message;
                    message.appendChild(rl);
                    message.appendChild(created);
                    switch (item.state) {
                      case 1:
                        seen.classList.add("check-dubole");
                        img.src = check;
                        seen.appendChild(img);
                        message.appendChild(seen);
                        break;
                      case 2:
                        seen.classList.add("check-dubole");
                        img.src = checkDuboleNotSeen;
                        seen.appendChild(img);
                        message.appendChild(seen);
                        break;
                      case 3:
                        seen.classList.add("check-dubole");
                        img.src = checkDubole;
                        seen.appendChild(img);
                        message.appendChild(seen);
                        break;
                      default:
                        console.log("something wrong...");
                        break;
                    } /* end of switch */
                    message.style.width = "250px";
                    //add messages div into myMessageCover
                    myMessageCover.appendChild(message);
                    wepperChat.appendChild(myMessageCover);

                    getDateMessage = this.checkWepperDate(item, true);
                    if (getDateMessage) {
                      createWpperDate = document.createElement("div");
                      createWpperDate.classList.add("wepperDate");

                      createDatePagination = document.createElement("div");
                      createWpperDate.appendChild(createDatePagination);

                      createDatePagination.textContent = getDateMessage;
                      createDatePagination.classList.add("datePagination");
                      wepperChat.insertBefore(createWpperDate, myMessageCover);
                    } /* end of if */
                  } else {
                    img.classList.add("imgType");
                    img.classList.add("flex");
                    img.src = this.$store.state.imgPath + item.message;
                    img.addEventListener("load", () => {
                      var isLoaded = img.complete && img.naturalHeight !== 0;
                      if (isLoaded) {
                        wepperChat.scrollTop = wepperChat.scrollHeight;
                      } /* end of if */
                    }); /* end of add event listener */
                    //create div created
                    created.classList.add("created");

                    if (cookie.get("lang") == 'ar')
                      created.textContent = changeNumberFormat.changeNumberFormat(moment(
                        new Date(parseInt(item.created_at.substring(0, 10)) * 1000)
                      ).format("LT"), true);
                    else
                      created.textContent = moment(
                        new Date(parseInt(item.created_at.substring(0, 10)) * 1000)
                      ).format("LT");
                    //create div message
                    message.classList.add("message");
                    //create my myMessageCover
                    messageYouCover.classList.add("messageYouCover");
                    //add p and created into message
                    img.appendChild(source);
                    message.appendChild(img);
                    message.appendChild(img);
                    message.style.width = "250px";
                    //add messages div into myMessageCover
                    messageYouCover.appendChild(message);
                    wepperChat.appendChild(messageYouCover);

                    getDateMessage = this.checkWepperDate(item, true);
                    if (getDateMessage) {
                      createWpperDate = document.createElement("div");
                      createWpperDate.classList.add("wepperDate");

                      createDatePagination = document.createElement("div");
                      createWpperDate.appendChild(createDatePagination);

                      createDatePagination.textContent = getDateMessage;
                      createDatePagination.classList.add("datePagination");
                      wepperChat.insertBefore(createWpperDate, messageYouCover);
                    } /* end of if */
                  } /* end of if */
                  break;
                /* end of image */
                case "imageWeb":

                  if (item.sender_id == this.user.id) {
                    //create p tag
                    /* here we will create video element */
                    img2.classList.add("imgType");
                    img2.classList.add("flex");
                    img2.src = this.$store.state.imgPath + item.message;
                    img2.addEventListener("load", () => {
                      var isLoaded = img2.complete && img2.naturalHeight !== 0;
                      if (isLoaded) {
                        wepperChat.scrollTop = wepperChat.scrollHeight;
                      } /* end of if */
                    }); /* end of add event listener */
                    //create div created
                    created.classList.add("created");

                    if (cookie.get("lang") == 'ar')
                      created.textContent = changeNumberFormat.changeNumberFormat(moment(
                        new Date(parseInt(item.created_at.substring(0, 10)) * 1000)
                      ).format("LT"), true);
                    else
                      created.textContent = moment(
                        new Date(parseInt(item.created_at.substring(0, 10)) * 1000)
                      ).format("LT");
                    //create div message
                    message.classList.add("message");
                    //create my myMessageCover
                    myMessageCover.classList.add("myMessageCover");
                    //add p and created into message
                    rl.appendChild(img2);
                    rl.target = "_blank";
                    rl.href = this.$store.state.imgPath + item.message;
                    message.appendChild(rl);
                    message.appendChild(created);
                    switch (item.state) {
                      case 1:
                        seen.classList.add("check-dubole");
                        img.src = check;
                        seen.appendChild(img);
                        message.appendChild(seen);
                        break;
                      case 2:
                        seen.classList.add("check-dubole");
                        img.src = checkDuboleNotSeen;
                        seen.appendChild(img);
                        message.appendChild(seen);
                        break;
                      case 3:
                        seen.classList.add("check-dubole");
                        img.src = checkDubole;
                        seen.appendChild(img);
                        message.appendChild(seen);
                        break;
                      default:
                        console.log("something wrong...");
                        break;
                    } /* end of switch */
                    message.style.width = "250px";
                    //add messages div into myMessageCover
                    myMessageCover.appendChild(message);

                    //this section to check if message is replay message or no
                    if (!item.reply_message) {
                      wepperChat.appendChild(myMessageCover);
                      getDateMessage = this.checkWepperDate(item, true);
                      if (getDateMessage) {
                        createWpperDate = document.createElement("div");
                        createWpperDate.classList.add("wepperDate");

                        createDatePagination = document.createElement("div");
                        createWpperDate.appendChild(createDatePagination);

                        createDatePagination.textContent = getDateMessage;
                        createDatePagination.classList.add("datePagination");
                        wepperChat.insertBefore(createWpperDate, myMessageCover);
                      } /* end of if */
                    } else {
                      this.displayReplyMessage(item, myMessageCover)
                    }/* end of if */

                  } else {
                    img.classList.add("imgType");
                    img.classList.add("flex");
                    img.src = this.$store.state.imgPath + item.message;
                    img.addEventListener("load", () => {
                      var isLoaded = img.complete && img.naturalHeight !== 0;
                      if (isLoaded) {
                        wepperChat.scrollTop = wepperChat.scrollHeight;
                      } /* end of if */
                    }); /* end of add event listener */
                    //create div created
                    created.classList.add("created");

                    if (cookie.get("lang") == 'ar')
                      created.textContent = changeNumberFormat.changeNumberFormat(moment(
                        new Date(parseInt(item.created_at.substring(0, 10)) * 1000)
                      ).format("LT"), true);
                    else
                      created.textContent = moment(
                        new Date(parseInt(item.created_at.substring(0, 10)) * 1000)
                      ).format("LT");
                    //create div message
                    message.classList.add("message");
                    //create my myMessageCover
                    messageYouCover.classList.add("messageYouCover");
                    //add p and created into message
                    img.appendChild(source);
                    message.appendChild(img);
                    message.appendChild(img);
                    message.appendChild(created);
                    message.style.maxWidth = "250px";
                    //add messages div into myMessageCover
                    messageYouCover.appendChild(message);

                    //this section to check if message is replay message or no
                    if (!item.reply_message) {
                      wepperChat.appendChild(messageYouCover);
                      getDateMessage = this.checkWepperDate(item, true);
                      if (getDateMessage) {
                        createWpperDate = document.createElement("div");
                        createWpperDate.classList.add("wepperDate");

                        createDatePagination = document.createElement("div");
                        createWpperDate.appendChild(createDatePagination);

                        createDatePagination.textContent = getDateMessage;
                        createDatePagination.classList.add("datePagination");
                        wepperChat.insertBefore(createWpperDate, messageYouCover);
                      } /* end of if */
                    } else {
                      this.displayReplyMessage(item, messageYouCover)
                    }/* end of if */

                  } /* end of if */

                  // //this section for sender message
                  // if (item.sender_id == this.user.id) {
                  //   this.displayReplyMessage(item, "sender")
                  //   //this section for reciver message
                  // } else {
                  //   this.displayReplyMessage(item, "reciver")
                  // }/* end of if */
                  break;
                /* end of image */
                case "location":

                  // var loction = item.message.split(",");
                  if (item.sender_id == this.user.id) {
                    // aMap.href =
                    //   "https://www.google.com/maps?q=" +
                    //   loction[0] +
                    //   "," +
                    //   loction[1] +
                    //   "&z=17&hl=ar";
                    // aMap.target = "_blank";

                    imgMap.src = map;
                    aMap.style.width = "100%";
                    aMap.style.height = "200px";
                    //imgMap.style.width = "100%";
                    //imgMap.style.height = "200px";
                    //aMap.appendChild(imgMap);
                    created.classList.add("created");
                    if (cookie.get("lang") == 'ar')
                      created.textContent = changeNumberFormat.changeNumberFormat(moment(
                        new Date(parseInt(item.created_at.substring(0, 10)) * 1000)
                      ).format("LT"), true);
                    else
                      created.textContent = moment(
                        new Date(parseInt(item.created_at.substring(0, 10)) * 1000)
                      ).format("LT");
                    message.classList.add("message");
                    myMessageCover.classList.add("myMessageCover");

                    message.appendChild(aMap);
                    message.appendChild(created);

                    message.style.minWidth = "260px"

                    switch (item.state) {
                      case 1:
                        seen.classList.add("check-dubole");
                        img.src = check;
                        seen.appendChild(img);
                        message.appendChild(seen);
                        break;
                      case 2:
                        seen.classList.add("check-dubole");
                        img.src = checkDuboleNotSeen;
                        seen.appendChild(img);
                        message.appendChild(seen);
                        break;
                      case 3:
                        seen.classList.add("check-dubole");
                        img.src = checkDubole;
                        seen.appendChild(img);
                        message.appendChild(seen);
                        break;
                      default:
                        console.log("something wrong...");
                        break;
                    } /* end of switch */

                    myMessageCover.appendChild(message);
                    //this section to check if message is replay message or no
                    if (!item.reply_message) {
                      wepperChat.appendChild(myMessageCover);
                      getDateMessage = this.checkWepperDate(item, true);
                      if (getDateMessage) {
                        createWpperDate = document.createElement("div");
                        createWpperDate.classList.add("wepperDate");

                        createDatePagination = document.createElement("div");
                        createWpperDate.appendChild(createDatePagination);

                        createDatePagination.textContent = getDateMessage;
                        createDatePagination.classList.add("datePagination");
                        wepperChat.insertBefore(createWpperDate, myMessageCover);
                      } /* end of if */

                    } else {
                      this.displayReplyMessage(item, myMessageCover)
                    }/* end of if */

                    imgMap.addEventListener("load", () => {
                      var isLoaded =
                        imgMap.complete && imgMap.naturalHeight !== 0;
                      if (isLoaded) {
                        wepperChat.scrollTop = wepperChat.scrollHeight;
                      } /* end of if */
                    }); /* end of add event listener */
                  } else {
                    // aMap.href =
                    //   "https://www.google.com/maps?q=" +
                    //   loction[0] +
                    //   "," +
                    //   loction[1] +
                    //   "&z=17&hl=ar";
                    // aMap.target = "_blank";
                    //imgMap.src = map;
                    aMap.style.width = "100%";
                    aMap.style.height = "200px";
                    //imgMap.style.width = "100%";
                    //imgMap.style.height = "200px";
                    //aMap.appendChild(imgMap);
                    created.classList.add("created");
                    if (cookie.get("lang") == 'ar')
                      created.textContent = changeNumberFormat.changeNumberFormat(moment(
                        new Date(parseInt(item.created_at.substring(0, 10)) * 1000)
                      ).format("LT"), true);
                    else
                      created.textContent = moment(
                        new Date(parseInt(item.created_at.substring(0, 10)) * 1000)
                      ).format("LT");
                    message.classList.add("message");
                    messageYouCover.classList.add("messageYouCover");
                    message.appendChild(aMap);
                    message.style.display = "flex";
                    message.style.flexDirection = "column";
                    message.appendChild(created);
                    messageYouCover.appendChild(message);

                    message.style.minWidth = "260px"

                    wepperChat.appendChild(messageYouCover);
                    //this section to check if message is replay message or no
                    if (!item.reply_message) {
                      wepperChat.appendChild(messageYouCover);
                      getDateMessage = this.checkWepperDate(item, true);
                      if (getDateMessage) {
                        createWpperDate = document.createElement("div");
                        createWpperDate.classList.add("wepperDate");

                        createDatePagination = document.createElement("div");
                        createWpperDate.appendChild(createDatePagination);

                        createDatePagination.textContent = getDateMessage;
                        createDatePagination.classList.add("datePagination");
                        wepperChat.insertBefore(createWpperDate, messageYouCover);
                      } /* end of if */
                    } else {
                      this.displayReplyMessage(item, messageYouCover)
                    }/* end of if */


                    imgMap.addEventListener("load", () => {
                      var isLoaded =
                        imgMap.complete && imgMap.naturalHeight !== 0;
                      if (isLoaded) {
                        wepperChat.scrollTop = wepperChat.scrollHeight;
                      } /* end of if */
                    }); /* end of add event listener */
                  } /* end of if */
                  this.drawLocation(aMap, item.message)

                  // //this section for sender message
                  // if (item.sender_id == this.user.id) {
                  //   this.displayReplyMessage(item, "sender")
                  //   //this section for reciver message
                  // } else {
                  //   this.displayReplyMessage(item, "reciver")
                  // }/* end of if */

                  break;
                default:
                  console.log(`somethings wrong`);
                  break;
                /* end of default */
              } /* /switch */

              if (item.edited == 1) {
                var div = document.createElement("div");
                div.classList.add("modified");
                div.textContent = this._trans("modified");
                message.insertBefore(div, message.children[0]);
              } /* end of if */

              if (
                item.reciver_id == this.user.id &&
                item.state == "2" &&
                this.enterUser == false
              ) {
                this.enterUser = true;
              } else if (this.enterUser == true) {
                console.log("");
              } /* end of if */

              if (this.user.id == item.sender_id) {
                this.getBoundingReact(item.message_id, "snd");
              } else {
                if (item.message_type == "voice")
                  this.getBoundingReact(item.message_id, "rcv", "voice");
                else this.getBoundingReact(item.message_id, "rcv");
              } /* end of if */


              if (item.sender_id == this.user.id) {
                myMessageCover.setAttribute("usr_id", item.sender_id);
              } else {
                messageYouCover.setAttribute("usr_id", item.sender_id);
              } /* end of if */
            }); /* end of forEach */

            this.newFormMessage();
            wepperChat.scrollTop = wepperChat.scrollHeight;
          } /* end of if */
          var snd_id = 0;
          var rcv_id = 0;
          //this for detrmaine who is sender and who is reciver
          if (cookie.get("sndRcvId").sender_id == this.user.id) {
            snd_id = cookie.get("sndRcvId").sender_id;
            rcv_id = cookie.get("sndRcvId").reciver_id;
          } else {
            snd_id = cookie.get("sndRcvId").reciver_id;
            rcv_id = cookie.get("sndRcvId").sender_id;
          } /* end of if  */

          var lastMsg = null;

          if (this.item.chatRoom) {
            lastMsg = document.getElementById(this.item.chatRoom[0].id);
            if (!lastMsg) {
              var reciver_id = 0;
              if (cookie.get("user").id == this.item.chatRoom[0].sender_id)
                reciver_id = this.item.chatRoom[0].reciver_id;
              else reciver_id = this.item.chatRoom[0].sender_id;
              lastMsg = document.getElementById(reciver_id);
            } /* end of if */
            lastMsg = lastMsg.children[0].children[1].children[1];
            lastMsg.style.fontWeight = "400";
          } else if (cookie.get("sndRcvId").chat_id) {
            lastMsg = document.getElementById(cookie.get("sndRcvId").chat_id)
              .children[0].children[1].children[1];
            lastMsg.style.fontWeight = "400";
          } /* end of if */

          this.io.emit("enter", {
            my_id: snd_id,
            your_id: rcv_id,
            state: 3,
          });

          this.itm.num_msg = 0

        } catch (e) {
          console.log(e);
        }

        this.checkConnect();
        //this.displayReplyMessage()

      }, 10);
    } /* /msgs */,

    //this function to unblock user
    unblockUserInf(x) {
      if (x) {
        if (cookie.get("sndRcvId")) {
          var user_id = null;
          if (cookie.get("user")) {
            if (cookie.get("user").id == cookie.get("sndRcvId").sender_id) {
              user_id = cookie.get("sndRcvId").reciver_id;
            } else {
              user_id = cookie.get("sndRcvId").sender_id;
            } /* end of if */
          } /* end of if */
          if (x[user_id]) {
            if (x[user_id].item) {
              this.item.blocked_for = x[user_id].item.blocked_for;
              this.item.blocked = x[user_id].item.blocked;
            } else {
              this.item.blocked_for = x[user_id].blocked_for;
              this.item.blocked = x[user_id].blocked;
            }
          } /* end 0f if */
        } /* end of if */
      } /* end of if */
    } /* /unblockUserInf */,

    //this function used for check this room is blocked or no
    blockedUserInfo(x) {
      if (cookie.get("sndRcvId")) {
        if (x.length > 0) {
          var user_id = null;
          if (cookie.get("user")) {
            if (cookie.get("user").id == cookie.get("sndRcvId").sender_id) {
              user_id = cookie.get("sndRcvId").reciver_id;
            } else {
              user_id = cookie.get("sndRcvId").sender_id;
            } /* end of if */
          } /* end of if */
          if (x[user_id]) {
            this.item.blocked_for = x[user_id].item.item.blocked_for;
            this.item.blocked = x[user_id].item.item.blocked;
          } /* end 0f if */
        } /* end of if */
      } /* end of if */
    } /* /checkBlockedFor */,

    getItem(x) {
      if (x) {
        this.item = x;
      } /* end of if */
    } /* item */,

    checkUserConnet(x) {
      if (x) {
        this.checkUserConnection();
      }
    } /* /checkUserConnet */,

    checkDeleteWindowState(x) {
      try {
        if (x) {
          const formInput = document.getElementById("sectionForRedirect");
          var wepperChat = document.getElementsByClassName("wepper-chat")[0];
          formInput.style.display = "grid";
          this.sectionForRedirect = false;
          this.countForRedirectMessage = 0;
          this.redirectMessagesId = [];
          this.meesagesId = [];
          for (var j = 0; j < wepperChat.children.length; j++) {
            wepperChat.children[j].style.background = "none";
          } /* end of for loop */
          this.$store.state.closeSelectElementWindow = false;
        } /* end of x */
      } catch (e) {
        console.log(e);
      } /* end of try catch */
    } /* /checkDeleteWindowState */,

    //this to tell reciver the sender user is stop of writeing
    myMessageInput: _.debounce((x) => {
      x[1].emit("on typing", {
        typing: false,
        id: x[0],
        chat_id: cookie.get("sndRcvId").chat_id,
        my_id: cookie.get("user").id || null,
      }); /* end of send event typing */
    }, 3000) /* end of debounce */,

    //this function used only for first message between two user
    newCchat(x) {
      try {
        if (cookie.get("sndRcvId"))
          if (this.user.id == x.sender_id) {
            var wepperChat = document.getElementsByClassName("wepper-chat")[0];
            if (wepperChat.getAttribute("chat_id") == "null") {
              wepperChat.removeAttribute("chat_id");
              wepperChat.setAttribute("chat_id", x.chat_id);
            } /* end of if */
          } /* end of if */
        this.dispalyMsg(x);
      } catch (e) {
        console.log(e);
      } /* end of try catch */
    } /* /newCchat */,

    //this functionto check the message is seen from other user or no
    seenMsgs(x) {
      try {
        var message = document.getElementById(x.message_id);
        var seen = document.createElement("div");
        var img = document.createElement("img");
        var imgcarad = document.createElement("img");
        //var span=document.createElement("span")

        var lastMsgs = document.getElementById(x.chat_id);

        var lastMsg = lastMsgs.children[0].children[1].children[1];

        if (message)
          for (var i = 0; i < message.children.length; i++) {
            if (message.children[i].classList.contains("check-dubole")) {
              message.children[i].innerHTML = "";
              message.children[i].remove();

              if (lastMsg.children[0]) {
                if (lastMsg.children[0].tagName == "IMG") {
                  lastMsg.children[0].remove();
                } else if (lastMsg.children[0].children[0].tagName == "IMG") {
                  lastMsg.children[0].children[0].remove();
                } /* end of if */
              } /* end of if */
            } /* end of if */
          } /* end of if */

        if (message)
          switch (parseInt(x.state)) {
            case 1:
              seen.classList.add("check-dubole");
              img.src = check;
              imgcarad.src = check;
              seen.appendChild(img);
              message.appendChild(seen);

              imgcarad.classList.add("imageState");
              lastMsg.prepend(imgcarad);

              break;
            case 2:
              img.src = checkDuboleNotSeen;
              imgcarad.src = checkDuboleNotSeen;
              if (x.chat_id == cookie.get("sndRcvId").chat_id) {
                seen.classList.add("check-dubole");
                seen.appendChild(img);
                message.appendChild(seen);
              } /* end of if */
              imgcarad.classList.add("imageState");
              lastMsg.prepend(imgcarad);

              /* img.classList.add("imageState")
              lastMsg.appendChild(img) */
              break;
            case 3:
              seen.classList.add("check-dubole");
              img.src = checkDubole;
              imgcarad.src = checkDubole;
              seen.appendChild(img);
              message.appendChild(seen);

              imgcarad.classList.add("imageState");
              lastMsg.prepend(imgcarad);

              break;
            default:
              break;
          } /* end of switch */
      } catch (r) {
        console.log(r);
      }
    } /* /seenMsg */,

    //this function to send event typing = true if user is begin of write and flase if user is stop of write
    //this function to add animation typing in chat_room
    typing(x) {
      try {
        var wepperChat = document.getElementsByClassName("wepper-chat")[0];
        //console.log(wepperChat.attributes.chat_id.value);
        if (wepperChat.attributes.chat_id) {
          if (
            wepperChat.attributes.chat_id.value ==
            cookie.get("sndRcvId").chat_id
          ) {
            var typing = document.createElement("div");
            var coverTyping = document.createElement("div");
            var span = document.createElement("span");
            var span2 = document.createElement("span");
            var span3 = document.createElement("span");
            if (x == true) {
              typing.classList.add("typing");
              coverTyping.classList.add("coverTyping");

              coverTyping.appendChild(span);
              coverTyping.appendChild(span2);
              coverTyping.appendChild(span3);

              typing.appendChild(coverTyping);
              wepperChat.appendChild(typing);
            } else if (x == false) {
              const wp = wepperChat.getElementsByClassName("typing")[0];
              if (wp) {
                for (var i = 0; i < wp.children[0].length; i++) {
                  wp.children[0].children[i].remove();
                }
                wp.children[0].remove();
                wp.remove();
              }
            } /* end of if */
            wepperChat.scrollTop = wepperChat.scrollHeight;
          } /* end of if */
        } /* end of if */
      } catch (e) {
        console.log(e);
      } /* end of try catch */
    } /* /typing */,
  } /* /watch */,
}; /* end of export default */
</script>

<style lang="scss" scoped>
</style>