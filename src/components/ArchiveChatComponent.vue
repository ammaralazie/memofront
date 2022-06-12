<template>
  <div class="archiveWepper">
    <div class="navProfile">
      <p @click="closeArchive">
        <svg id="exitArchive" xmlns="http://www.w3.org/2000/svg" width="12.532" height="22.354"
          viewBox="0 0 12.532 22.354" style="width:10px">
          <g id="Group_197" data-name="Group 197" transform="translate(22.355 11.177) rotate(135)">
            <rect id="Rectangle_348" data-name="Rectangle 348" width="15.807" height="1.916" rx="0.958"
              transform="translate(0 13.891)" fill="#fff" />
            <rect id="Rectangle_349" data-name="Rectangle 349" width="15.807" height="1.916" rx="0.958"
              transform="translate(15.807 0.001) rotate(90)" fill="#fff" />
          </g>
        </svg>
      </p>
      <p>{{ _trans("archive") }}</p>
    </div>
    <!-- /navProfile -->

    <div class="wepperContactList">
      <div class="contactList">
        <div class="wepper-card">
          <div class="carad" v-for="(item, index) in reciveMyChat" :key="index" :id="item.id">
            <!-- this run when get old chat -->
            <router-link v-if="!item.chatRoom && item.reciver_id" @click.prevent="
              getMessageByUser(
                sndRcvId[index].rcv_id,
                sndRcvId[index].snd_id,
                item.id,
                item
              )
            " to="">
              <div class="imgContactProfile">
                <div v-if="item.image">
                  <img :src="item.image" alt="" />
                </div>
                <div v-else>
                  <img src="../assets/uploads/image/default.png" alt="" />
                </div>
              </div>
              <div class="user-lastMsg">
                <div class="user" v-if="item.username">
                  {{ item.username }}
                </div>
                <div class="user" v-else-if="item.first_name">
                  {{ item.first_name + " " + item.last_name }}
                </div>
                <div v-if="item.state == '2' && user.id != item.other_id" style="font-weight: 700" class="lastMessage">
                  {{ item.last_message }}
                </div>
                <div v-else class="lastMessage">
                  {{ item.last_message }}
                </div>
              </div>
              <!-- /user-lastMsg -->
            </router-link>

            <!-- this run when i do search and i have chat room for this user -->
            <router-link v-else-if="item.chatRoom != null && !item.reciver_id" @click.prevent="
              getMessageByUser(
                item.chatRoom[0].reciver_id,
                item.chatRoom[0].sender_id,
                item.chatRoom[0].id,
                item
              )
            " to="">
              <div class="imgContactProfile">
                <div v-if="item.image">
                  <img :src="item.image" alt="" />
                </div>
                <div v-else>
                  <img src="../assets/uploads/image/default.png" alt="" />
                </div>
              </div>
              <div class="user-lastMsg">
                <div class="user" v-if="item.username">
                  {{ item.username }}
                </div>
                <div class="user" v-else-if="item.first_name">
                  {{ item.first_name + " " + item.last_name }}
                </div>
                <div class="lastMessage" v-if="item.chatRoom[0].last_message">
                  {{ item.last_message }}
                </div>
                <div class="lastMessage" v-else>
                  {{ item.last_message }}
                </div>
              </div>
              <!-- /user-lastMsg -->
            </router-link>

            <!-- this run when i dont have chat room for this user -->
            <router-link v-else @click.prevent="getMessageByUser(item.id, user.id, null, item)" to="">
              <div class="imgContactProfile">
                <div v-if="item.image">
                  <img :src="item.image" alt="" />
                </div>
                <div v-else>
                  <img src="../assets/uploads/image/default.png" alt="" />
                </div>
              </div>
              <div class="user-lastMsg">
                <div class="user" v-if="item.username">
                  {{ item.username }}
                </div>
                <div class="user" v-else-if="item.first_name">
                  {{ item.first_name + " " + item.last_name }}
                </div>
                <div class="lastMessage" v-if="item.chatRoom">
                  {{ item.chatRoom[0].last_message }}
                </div>
                <div class="lastMessage" v-else>
                  {{ item.last_message }}
                </div>
              </div>
              <!-- /user-lastMsg -->
            </router-link>

            <div class="dateAndOptions">
              <span v-if="item.created_at">{{ item.created_at }}</span>
              <div class="aroow">
                <button class="focusBtn" data-check="0" @click="contactsOptionsM(index, item)" data-rotate-arow="180">
                  <fa icon="chevron-down" style="font-size: 13px" />
                </button>
              </div>
              <!-- /aroow -->
            </div>
            <!-- /dateAndOptions -->
          </div>
          <!-- /carad -->
        </div>
        <!-- <div class="wepper-card" v-else>dont have any chat</div> -->
        <!-- /wepper-card -->
      </div>
    </div>
    <!-- /wepperContactList -->
  </div>
</template>
<script>
import * as cookie from "vue-cookies";
import moment from "moment";
import changeNumberFormat from "../lang/changeNumber.js"
export default {
  props: ["checkArchive"],
  data() {
    return {
      lang: cookie.get("lang") || "en",
      l_: this.$store.getters.words,
      sndRcvId: [],
      myContactUser: [],
      io: this.$store.state.socket,
      user: cookie.get("user") || {}
    }; /* /return */
  } /* /data */,

  mounted() {
    //this.checkConnect();
  } /* /mounted */,

  methods: {
    //this function used for check format date
    checkFormatDate(data) {
      //var currentDate=new Date()

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
          return changeNumberFormat.changeNumberFormat(moment(lastMsgDate).format("LT"));
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
          return changeNumberFormat.changeNumberFormat(moment(lastMsgDate).format("YYYY/MM/DD"));
        else
          moment(lastMsgDate).format("YYYY/MM/DD")

      } /* end of if */
    } /* /checkFormatDate */,

    //this function used to display option for chat in chat room
    contactsOptionsM(index, item) {
      this.$emit("contactsOptionsM", index, item, null, true);
    } /* /contactsOptionsM */,

    //this function used for close archive list view
    closeArchive() {
      this.$store.state.checkArchive = false;
      this.$emit("showArchiveContact", false);
    } /* /closeArchive */,

    checkDisplayList() {
      var wpCard = document.getElementsByClassName("wepper-card")[0];
      for (var i = 0; i < wpCard.children.length; i++) {
        if (getComputedStyle(wpCard.children[i]).display == "none")
          wpCard.children[i].style.display = "flex";
      } /* end of for loop */
    } /* /checkDisplayList */,

    getMessageByUser(reciver, sender, chat_id, item) {
      this.$emit("reciverUseer", item);
      if (chat_id) {
        var payload = {
          sender_id: sender,
          reciver_id: reciver,
          chat_id: chat_id,
        };
        this.$store.dispatch("getMessageByUser", payload);
      } else {
        cookie.remove("sndRcvId");
        cookie.set("sndRcvId", {
          sender_id: sender,
          reciver_id: reciver,
          chat_id: null,
        });
        this.$store.state.getMessageByUser = [];
      } /* end of if */

      var leftSideBar = document.getElementsByClassName("leftSideBar")[0];
      var rightSidebar = document.getElementsByClassName("rightSidebar")[0];
      var screenSize = document.body;

      if (screenSize.offsetWidth < 576) {
        if (leftSideBar && rightSidebar) {
          rightSidebar.style.zIndex = 1;
          leftSideBar.style.zIndex = 0;
        } /* end of if  */
      }
    } /* /getMessageByUser */,

    _trans(x) {
      return this.l_[x];
    } /* _trans */,

    // checkConnect() {
    //   var ccc = null;
    //   this.io.on("ammar user1", (data) => {
    //     setTimeout(() => {
    //       this.$store.state.checkUserConnet =
    //         this.$store.state.checkUserConnet.filter((value) => {
    //           if (value.user_id != data.user_id) return value;
    //         }); /* /filter */
    //       this.$store.state.checkUserConnet.push(data);
    //       this.checkUserConnet = this.$store.state.checkUserConnet;

    //       var contactUser = document.getElementById(data.chat_id);

    //       if (!contactUser) {
    //         //this user id is actual is reciver_id
    //         contactUser = document.getElementById(data.user_id);
    //       } /* end of if */

    //       if (contactUser) {
    //         var userConnect = contactUser.children[1].children[0];
    //         userConnect.innerHTML = "";

    //         var span = null;
    //         clearInterval(ccc);
    //         if (data.connect == true) {
    //           span = document.createElement("div");
    //           span.innerHTML = "";
    //           span.style.width = "14px";
    //           span.style.height = "14px";
    //           span.style.borderRadius = "50%";
    //           span.style.background = "#3cab44";
    //           userConnect.appendChild(span);
    //         } else {
    //           span = document.createElement("div");
    //           span.innerHTML = "";
    //           var start = moment(new Date(parseInt(data.lastseen)));
    //           var end = moment(new Date());
    //           span.textContent = end.from(start, true);
    //           userConnect.appendChild(span);

    //           ccc = setInterval(() => {
    //             var userConnect = contactUser.children[1].children[0];
    //             userConnect.innerHTML = "";
    //             span.innerHTML = "";
    //             var end = moment(new Date());
    //             span.textContent = end.from(start, true);
    //             userConnect.appendChild(span);
    //           }, 60000);

    //           // if (contactUser.children[1].children[0].children[0])
    //           //   contactUser.children[1].children[0].innerHTML = "";

    //           // var start = moment(data.lastseen);
    //           // var end = moment(new Date());

    //           // var humanDate=end.from(start, true);
    //           // contactUser.children[1].children[0].textContent=humanDate
    //         } /* end of if */
    //       } /* end of if */
    //     }, 250);
    //   }); /* check connect ammar */
    // } /* /checkConnect */,
  } /* /methods */,

  computed: {
    conntactUser() {
      if (this.$store.state.rchiveConversations) {
        return this.$store.state.rchiveConversations;
      } /* /conntactUser */
      return null;
    } /* /conntactUser */,
    reciveMyChatt() {
      if (this.$store.getters.rchiveConversations) {
        if (this.$store.getters.rchiveConversations.length > 0) {
          this.$store.getters.rchiveConversations.forEach((item) => {

            if (!item.formatDate) {
              item.created_at = this.checkFormatDate(item)
              item.formatDate = true
            }
            if (item.image && !item.c) {
              item.image = this.$store.state.imgProfilePath + item.image;
              item.c = true;
            } /* end of if */
          }); /* end of for each */

          //this section o detrmain who is sender and reciver id
          if (cookie.get("user")) {
            this.$store.getters.rchiveConversations.forEach((value, index) => {
              if (!this.$store.getters.rchiveConversations[index].gg) {
                if (cookie.get("user").id == value.reciver_id) {
                  this.sndRcvId[index] = {
                    snd_id: value.reciver_id,
                    rcv_id: value.sender_id,
                  };
                } else {
                  this.sndRcvId[index] = {
                    snd_id: value.sender_id,
                    rcv_id: value.reciver_id,
                  };
                } /* end if if */
              } else {
                if (cookie.get("user").id == value.reciver_id) {
                  this.sndRcvId.push({
                    snd_id: value.reciver_id,
                    rcv_id: value.sender_id,
                  });
                } else {
                  this.sndRcvId.push({
                    snd_id: value.sender_id,
                    rcv_id: value.reciver_id,
                  });
                } /* end if if */
              } /* end of if */
            }); /* end of forEach */
          } /* end of if */

          return this.$store.getters.rchiveConversations;
        } else {
          return [];
        } /* end of if */
      } else {
        return [];
      }
    } /* end of reciveMyChat */,
  } /* /computed */,

  watch: {

    //this function to check ican display archive menu or no
    checkArchive(x) {
      var archiveWepper = document.getElementsByClassName("archiveWepper")[0];
      if (x) {
        //this section when archive messages is active
        archiveWepper.style.display = "inline-block";
        this.io.emit("ammar user", {
          userArr: this.myContactUser,
          myId: cookie.get("user").id || null,
        });
      } else {
        //this section when archive messages is not active
        archiveWepper.style.display = "none";
      } /* end of if  */
    } /* /checkDisplay */,

    reciveMyChatt(x) {
      if (x) {
        if (x.length > 0) {
          this.reciveMyChat = x;
          this.checkDisplayList();
        } else this.reciveMyChat = [];
      } /* end of if */
    } /* /reciveMyChatt */,

    //this function to get state for contact user if active or no
    conntactUser(x) {
      if (x) {
        var vv = 0;
        x.forEach((el) => {
          if (cookie.get("user")) {
            if (cookie.get("user").id == el.sender_id) {
              vv = el.reciver_id;
            } else if (cookie.get("user").id == el.reciver_id) {
              vv = el.sender_id;
            } /* end of if */
            this.myContactUser.push({
              user_id: vv,
              chat_id: el.id,
            });
          } /* end of if */
        }); /* end of forEach */
        if (!this.serachUser)
          this.io.emit("ammar user", {
            userArr: this.myContactUser,
            myId: cookie.get("user").id || null,
          });
      } /* end of if */
    } /* /conntactUser */,
  } /* /methods */,
};
</script>