<template>
  <div class="deleteProps">
    <div class="deleteBackground"></div>
    <div class="deleteCover">
      <div class="deleteTitle">
        <span>{{ _trans("deleteQusetion") }} </span>
      </div>
      <!-- /deleteTitle -->
      <div class="deleteOption">
        <div class="deltetorYourSelf" @click="deletee">
          {{ _trans("delete") }}
        </div>
        <div
          class="deleteForAll"
          @click="deleteForAll"
          v-if="checkDeLeteForAll && checkDelete=='snd'"
        >
          {{ _trans("deleteForAll") }}
        </div>
        <div class="deleteCancel" @click="cancel">{{ _trans("cancel") }}</div>
      </div>
      <!-- /deleteOption -->
    </div>
    <!-- /deleteCover -->

    <div class="deleteFoucs">
      <div class="coverDeleteFoucs">
        <div class="deleteFoucsColor"></div>
        <div class="deleteNow">{{ _trans("deleteNow") }}</div>
        <div class="loader"></div>
      </div>
      <!-- /coverDeleteFoucs -->
    </div>
    <!-- /deleteFoucs -->
  </div>
  <!-- /deleteProps -->
</template>

<script>
import * as cookie from "vue-cookies";
export default {
  props: ["messages"] /* /props */,
  data() {
    return {
      payload: {},
      l_: this.$store.getters.words,
      io: this.$store.state.socket || {},
      checkDeLeteForAll: true,
      checkDelete:this.$store.state.cdelete|| null
    }; /* end of return */
  } /* /data */,
  mounted() {} /* /mounted */,
  methods: {
    //this function to delete message from sende only
    deletee() {
      this.payload = {
        message_id: JSON.stringify(this.messages.message_id),
        user_id: cookie.get("user").id || null,
      }; /* end of payload */

      this.$store.dispatch("deleteMessage2", this.payload);

      var deleteFoucs = document.getElementsByClassName("deleteFoucs")[0];
      deleteFoucs.style.zIndex = "5";
    } /* /getMessageToDeleted */,

    //this function for cancel this fuck window
    cancel() {
      this.payload = {};
      this.$store.state.deleteMessages = null;
    } /* /cancel */,

    //this for delete message for two user
    deleteForAll() {
      var deleteFoucs = document.getElementsByClassName("deleteFoucs")[0];
      deleteFoucs.style.zIndex = "5";

      var yourId = null;
      var myId = null;

      if (cookie.get("user").id == cookie.get("sndRcvId").sender_id) {
        yourId = cookie.get("sndRcvId").reciver_id;
        myId = cookie.get("sndRcvId").sender_id;
      } else if (cookie.get("user").id == cookie.get("sndRcvId").reciver_id) {
        yourId = cookie.get("sndRcvId").sender_id;
        myId = cookie.get("sndRcvId").reciver_id;
      } /* end of if */

      this.payload = {
        message_to_delete: JSON.stringify(this.messages.message_id),
        anthor_user_id: yourId,
        my_id: myId,
      }; /* end of payload */

      this.$store.state.deleteState = true;
      this.io.emit("delete message", this.payload);
    } /* /deleteForAll */,

    _trans(x) {
      return this.l_[x];
    } /* _trans */,
  } /* /methods */,
  computed: {
    deleteState() {
      if (this.$store.state.deleteState) {
        return this.$store.state.deleteState;
      } /* end of if */
      return false;
    } /* /deleteState */,
  } /* /computed */,
  watch: {
    deleteState(x) {
      if (x) {
        var deleteFoucs = document.getElementsByClassName("deleteFoucs")[0];
        deleteFoucs.style.zIndex = "-1";
        this.$store.state.deleteMessages = null;

        var wepperChat = document.getElementsByClassName("wepper-chat")[0];
        var id = null;

        for (var i = 0; i < wepperChat.children.length; i++) {
          var messageId = null;
          if (wepperChat.children[i].children[0])
            messageId = wepperChat.children[i].children[0].getAttribute("id");
          if (this.payload.message_id) id = JSON.parse(this.payload.message_id);
          else id = JSON.parse(this.payload.message_to_delete);
          for (var j = 0; j < id.length; j++) {
            if (JSON.stringify(id[j]) == JSON.stringify(messageId)) {
              if (i == wepperChat.children.length && i != 0) {
                var contactList =
                  document.getElementsByClassName("contactList")[0];
                var carad = contactList.children[0].children[0];
                if (carad) {
                  carad.children[0].children[1].children[1].textContent =
                    wepperChat.children[
                      i - 1
                    ].children[0].children[0].textContent;
                } else {
                  var carad2 = contactList.children[0].children[0];
                  carad2.children[0].children[1].children[1].textContent =
                    wepperChat.children[
                      i - 1
                    ].children[0].children[0].textContent;
                } /* end of if */
              } /* end of if */
              wepperChat.children[i].innerHTML = "";
              /* wepperChat.children[i].remove(); */
            } /* end of if */
          } /* end of for loop j */
        } /* end of for loop i*/

        for (var k = 0; k < wepperChat.children.length; k++) {
          if (!wepperChat.children[k].children[0])
            wepperChat.children[k].remove();
        } /* end of for loop */
      } /* end of if */
      this.payload = {};
      this.$store.state.deleteState = false;
      this.$store.state.closeSelectElementWindow=true
    } /* /deleteState */,
  } /* /watch */,
}; /* end of default */
</script>