<template>
  <div class="contactOptions">
    <div class="navContact">
      <div class="reciveName" v-if="data.item.username" v-text="data.item.username"></div>
      <!-- /reciveName -->
      <button @click="closeList"><fa icon="times"></fa></button>
    </div>
    <!-- /navContaxt -->
    <div class="lostOptionContact">
      <ul>
        <li v-if="checkArch == true" @click="deletearchive">
          <router-link to="">{{ _trans("unarchivechat") }}</router-link>
        </li>
        <li v-else @click="archivechat">
          <router-link to="">{{ _trans("archiveChat") }}</router-link>
        </li>
        <li @click="deleteConversation" v-if="oldConversation">
          <router-link to="">{{ _trans("deleteConversation") }}</router-link>
        </li>
        <li @click="blockUser" v-if="data.item.blocked_for == null || data.item.blocked_for != String(user.id)">
          <router-link to="" >{{ _trans("block") }}</router-link>
          <router-link to="" v-if="data.item.blocked_for == '0' || data.item.blocked_for == String(user.id)">{{ _trans("unblock") }}</router-link>
        </li>

        <li @click="unblockUser" v-if="data.item.blocked_for == '0' || data.item.blocked_for == String(user.id)">
          <router-link to="">{{ _trans("unblock") }}</router-link>
        </li>
      </ul>
    </div>
    <!-- /lostOptionContact -->
  </div>
  <!-- /contactOptions -->
</template>

<script>
import * as cookie from "vue-cookies";
export default {
  props: ["data"],
  data() {
    return {
      l_: this.$store.getters.words,
      io: this.$store.state.socket,
      oldConversation: true,
      checkArch: false,
      user:cookie.get("user") || {}
    }; /* /return */
  } /* /data */,
  mounted() {
    this.checkOldConversation();
  } /* /created */,
  methods: {
    //this function used for unblock user
    unblockUser(){
      var payload={
        user_id:null,
        my_id:String(cookie.get("user").id) || null,
        block:false
      }/* end of pyload  */

      if (this.data.item.sender_id == cookie.get("user").id) {
        payload.user_id = this.data.item.reciver_id;
      } else {
        payload.user_id = this.data.item.sender_id;
      } /* end of if */

      if(!payload.user_id){
         payload.user_id = this.data.item.id;
      }/* end of  */

      this.$emit("unblockUser",payload,this.data)
      this.$emit("closeContactsOptionsM", null, null, true);

    }/* /unblockUser */,

    //this function used for block user 
    blockUser(){
      var payload={
        user_id:null,
        my_id:String(cookie.get("user").id) || null,
        block:true
      }/* end of pyload  */

      if (this.data.item.sender_id == cookie.get("user").id) {
        payload.user_id = this.data.item.reciver_id;
      } else {
        payload.user_id = this.data.item.sender_id;
      } /* end of if */

      if(!payload.user_id){
         payload.user_id = this.data.item.id;
      }/* end of  */

      this.$emit("blockUser",payload,this.data)

      /* this.$store.state.myChat=this.$store.state.myChat.filter(value=>{
        return value !=this.data.item
      }) */
      this.$emit("closeContactsOptionsM", null, null, true);
      
    }/* /blockUser */,

    //this function used for add archive chat
    archivechat() {
      var payload = {};
      var archiveCard = null;
      if (this.data.item.chatRoom) {
        if (cookie.get("user").id == this.data.item.chatRoom.sender_id) {
          payload = {
            my_id: this.data.item.chatRoom.sender_id,
            your_id: this.data.item.chatRoom.reciver_id,
          }; /* end of payload */
        } else {
          payload = {
            my_id: this.data.item.chatRoom.reciver_id,
            your_id: this.data.item.chatRoom.sender_id,
          }; /* end of payload */
        } /* end of if  */

        archiveCard = document.getElementById(this.data.item.chatRoom.id);
      } else {
        if (cookie.get("user").id == this.data.item.sender_id) {
          payload = {
            my_id: this.data.item.sender_id,
            your_id: this.data.item.reciver_id,
          }; /* end of payload */
        } else {
          payload = {
            my_id: this.data.item.reciver_id,
            your_id: this.data.item.sender_id,
          }; /* end of payload */
        } /* end of if  */

        archiveCard = document.getElementById(this.data.item.id);
        this.$store.state.templatCardForAddnewArchivChat =
          archiveCard.innerHTML;
        archiveCard.innerHTML = "";

        this.$store.state.rchiveConversations =
          this.$store.state.rchiveConversations.filter((value) => {
            return value != this.data.item;
          });
        this.$store.state.rchiveConversations.push(this.data.item);

        this.$store.state.myChat = this.$store.state.myChat.filter((value) => {
          return value != this.data.item;
        });

        archiveCard.remove();

        this.$store.dispatch("archivechat", payload);
        this.$emit("closeContactsOptionsM", null, null, true, true);
      } /* end of if */
    } /* /archivechat */,

    //this function used to remove archive chat from archive list
    deletearchive() {
      var payload = {};
      var archiveCard = null;
      if (this.data.item.chatRoom) {
        if (cookie.get("user").id == this.data.item.chatRoom.sender_id) {
          payload = {
            my_id: this.data.item.chatRoom.sender_id,
            your_id: this.data.item.chatRoom.reciver_id,
          }; /* end of payload */
        } else {
          payload = {
            my_id: this.data.item.chatRoom.reciver_id,
            your_id: this.data.item.chatRoom.sender_id,
          }; /* end of payload */
        } /* end of if  */

        archiveCard = document.getElementById(this.data.item.chatRoom.id);
      } else {
        if (cookie.get("user").id == this.data.item.sender_id) {
          payload = {
            my_id: this.data.item.sender_id,
            your_id: this.data.item.reciver_id,
          }; /* end of payload */
        } else {
          payload = {
            my_id: this.data.item.reciver_id,
            your_id: this.data.item.sender_id,
          }; /* end of payload */
        } /* end of if  */

        archiveCard = document.getElementById(this.data.item.id);
      } /* end of if */
      archiveCard.innerHTML = "";

      this.$store.state.myChat = this.$store.state.myChat.filter((value) => {
        return value != this.data.item;
      });
      this.$store.state.myChat.push(this.data.item);

      this.$store.state.rchiveConversations =
        this.$store.state.rchiveConversations.filter((value) => {
          return value != this.data.item;
        });

      archiveCard.remove();
      this.$store.dispatch("deletearchive", payload);
      this.$emit("closeContactsOptionsM", null, null, true, true);
    } /* /deletearchive */,

    checkOldConversation() {
      if (this.data.checkArchive) this.checkArch = this.data.checkArchive;
      if (this.data.item.chatRoom || this.data.item.last_message)
        this.oldConversation = true;
      else this.oldConversation = true;
    } /* /checkOldConversation */,
    closeList() {
      this.$emit("closeContactsOptionsM", null, null, true);
    } /* /closeList */,
    _trans(x) {
      return this.l_[x];
    } /* _trans */,

    deleteConversation() {
      try {
        var myContact = null;
        var chat_id = 0;
        var sender_id = 0;
        var reciver_id = 0;
        if (this.data.item.chatRoom) {
          if (this.data.item.chatRoom.id)
            chat_id = this.data.item.chatRoom[0].id;
          else if (cookie.get("sndRcvId")) {
            if (cookie.get("sndRcvId").chat_id) {
              chat_id = cookie.get("sndRcvId").chat_id;
            }
          } else {
            chat_id = null;
          }
          myContact = document.getElementById(chat_id);

          if (cookie.get("user").id == this.data.item.chatRoom[0].sender_id) {
            sender_id = this.data.item.chatRoom[0].sender_id;
            reciver_id = this.data.item.chatRoom[0].reciver_id;
          } else {
            sender_id = this.data.item.chatRoom[0].reciver_id;
            reciver_id = this.data.item.chatRoom[0].sender_id;
          } /* end of if */

          if (chat_id && !myContact)
            myContact = document.getElementById(reciver_id);
        } else {
          myContact = document.getElementById(this.data.item.id);

          chat_id = this.data.item.id;
          if (cookie.get("user").id == this.data.item.sender_id) {
            sender_id = this.data.item.sender_id;
            reciver_id = this.data.item.reciver_id;
          } else {
            sender_id = this.data.item.reciver_id;
            reciver_id = this.data.item.sender_id;
          } /* end of if */
        } /* end of if */

        var len=myContact.children.length
        for (var i = 0; i < len; i++) {
          if(!myContact.children[i]){
            myContact.innerHTML=""
            myContact.remove()
          }else{
            if (myContact.children[i].classList.contains("router-link-active")) {
            //you must delete every child here
            for (var j = 0; j < myContact.children[i].length; j++) {
              if (
                myContact.children[i].children[j].contains("imgContactProfile")
              ) {
                myContact.children[i].children[
                  j
                ].children[0].children[0].remove();
                myContact.children[i].children[j].children[0].remove();
                myContact.children[i].children[j].remove();
              } else if (
                myContact.children[i].children[j].contains("user-lastMsg")
              ) {
                myContact.children[i].children[j].children[0].remove();
                myContact.children[i].children[j].children[1].remove();
              } /* end of if */
            } /* end of for loop */
            myContact.children[i].remove();
          } else if (
            myContact.children[i].classList.contains("dateAndOptions")
          ) {

            console.log("this function is work ''''")
            for (var k = 0; k < myContact.children[i].children.length; k++) {
              if (
                !myContact.children[i].children[k].classList.contains("aroow")
              ) {
                myContact.children[i].children[k].remove();
              } else if (
                myContact.children[i].children[k].classList.contains("aroow")
              ) {
                myContact.children[i].children[
                  k
                ].children[0].children[0].remove();
                myContact.children[i].children[k].children[0].remove();
                myContact.children[i].children[k].remove;
              } /* end of if */
            } /* end of for loop */
            myContact.children[i].remove();
          } /* end of of */
          }/* end of if */

        } /* end of for loop */
        //myContact.style.display = "none";
        if (cookie.get("sndRcvId")) {
          if (cookie.get("sndRcvId").chat_id == chat_id) {
            var wepperChat = document.querySelector(
              "div[chat_id='" + chat_id + "']"
            );
            wepperChat.innerHTML = "";
            wepperChat.removeAttribute("chat_id");
            const memologo = document.getElementsByClassName("memologo")[0];
            memologo.style.display = "inherit";
            const chatRoom = document.getElementsByClassName("chatRoom")[0];
            chatRoom.style.zIndex = "-1";
            cookie.remove("sndRcvId");
          } /* end of if */
        } /* end of if */

        this.$store.dispatch("deleteConversation", {
          my_id: sender_id,
          your_id: reciver_id,
          chat_id: chat_id,
        }); /* /deleteConversation */

        this.closeList(null, null, true);
      } catch (z) {
        console.log(z);
      }
    } /* /deleteConversation */,
  } /* /methods */,
  computed: {
    checkChat_id() {
      if (cookie.get("sndRcvId")) {
        if (!cookie.get("sndRcvId").chat_id) {
          return false;
        } else {
          return true;
        } /* end of if */
      } else {
        return false;
      } /* end of if */
    } /* end of checkChat_id */,
  } /* end of computed */,
};
</script>

<style lang="scss" scoped>
</style>