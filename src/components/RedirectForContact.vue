<template>
  <div class="homeRedirect">
    <div class="backgroundForHomeRedirect"></div>
    <!-- /backgroundForHomeRedirect -->
    <div class="coverForContactMessage">
      <div class="navRedirecMsg">
        <div class="titleRedirect">
          <span>{{ _trans("titleRedirectMesssage") }}</span>
          <div class="closeRedirectMessage" @click="closeWindow">
            <span></span>
            <span></span>
          </div>
          <!-- /closeRedirectMessage -->
        </div>
        <!-- /titleRedirect -->
        <div class="searchRedirectMessage">
          <div class="searchInputR">
            <input
              type="search"
              :placeholder="_trans('search') + ' ...'"
              name=""
              id=""
              v-model="searchInput"
            />
            <div class="coverLoder">
              <div class="loader"></div>
            </div>
          </div>
        </div>
        <!-- searchRedirectMessage -->
      </div>
      <!-- /navRedirecMsg -->
      <div class="wepperCardRedirectMessage">
        <div class="cover" v-if="myContactUser">
          <div
            v-for="item in myContactUser"
            :key="item.id"
            :id="item.id"
            @click="redirectMessages(item.id)"
            class="cardWepperMessageRedirect"
          >
            <div class="section1">
              <div class="imageUser">
                <img :src="item.image" alt="" v-if="item.image" />
                <img src="../assets/uploads/image/default.png" alt="" v-else />
              </div>
              <div class="nameUser">
                <div
                  class="name"
                  v-if="item.first_name"
                  v-text="item.first_name + ' ' + item.last_name"
                ></div>
                <div class="name" v-else>Memo User</div>
              </div>
            </div>
            <!-- /section1 -->

            <div class="section2">
              <div class="checked"></div>
            </div>
            <!-- /section2 -->
          </div>
          <!-- /cardWepperMessageRedirect -->
        </div>
        <!-- /cover -->
      </div>
      <div class="sendRedirectMessage" v-if="slectedUser.length > 0">
        <div class="wepperSendRedirectMessage">
          <div class="sendMessages" @click="sendEveryThinks">
            <fa icon="paper-plane"></fa
            ><!-- <i class="fas fa-paper-plane"></i> -->
          </div>
          <div class="countSekectedUser" v-text="slectedUser.length"></div>
          <!-- /countSekectedUser -->
        </div>
        <!-- /wepperSendRedirectMessage -->
      </div>
      <!-- /sendRedirectMessage -->
      <!-- /wepperCardRedirectMessage -->
    </div>
    <!-- /coverForContactMessage -->
  </div>
  <!-- /homeRedirect -->
</template>
<script>
import * as cookie from "vue-cookies";
import _ from "lodash";
import store from "../store/index";

var searchV = null;
export default {
  props: ["redirectMessage"],
  data() {
    return {
      l_: this.$store.getters.words,
      searchInput: null,
      user: cookie.get("user") || {},
      myContactUser: [],
      slectedUser: [],
      id: [],
      messages: null,
      io: this.$store.state.socket || {},
    }; /* /return */
  } /* end of data */,
  mounted() {
    this.redirectMessages();
    this.chackLang();
    this.getMyContact();
    this.redirectMessages();
    this.scrollComputed();
  } /* /mounted */,
  methods: {
    //this function used for request another search when the scroll go down to the bottom
    scrollComputed() {
      var wepperCard = document.getElementsByClassName("cover")[0];
      var contactList = document.getElementsByClassName(
        "wepperCardRedirectMessage"
      )[0];
      contactList.addEventListener("scroll", () => {
        if (
          wepperCard.getBoundingClientRect().bottom <=
          contactList.getBoundingClientRect().bottom
        ) {
          if (store.state.pages > 1) {
            store.dispatch("searchRedirectMessage", {
              searchValue: searchV,
              sercherId: cookie.get("user").id,
            });
          } /* end of if */
        } /* end of if */
      }); /* end of event listener */
    } /* /scrollComputed */,

    //this function for close window
    closeWindow() {
      this.slectedUser = [];
      this.id = [];
      this.$store.state.redirectMessages = null;
    } /* /closeWindow */,

    //this function to reciveMessageRedirect id for display contact user
    redirectMessages(id) {
      if (!this.id[id]) {
        this.id[id] = 0;
      } /* end of if */
      var contactUser = document.getElementById(id);
      if (contactUser) {
        if (contactUser.children[1].classList.contains("section2")) {
          contactUser
            .getElementsByClassName("checked")[0]
            .classList.toggle("checkMark");
        } /* end of if */
        if (this.id[id] == 0) {
          this.id[id] = 1;
          this.slectedUser.push(id);
        } else if (this.id[id] == 1) {
          this.id[id] = 0;
          this.slectedUser = this.slectedUser.filter(function (value) {
            return value != id;
          });
        } /* end of if */
        this.messages = this.redirectMessage;
        this.messages.id = this.slectedUser;
      } /* end of if */
    } /* /redirectMessage */,

    //this function only used for chack langunge before load the page
    chackLang() {
      document.getElementsByClassName("coverLoder")[0].style.display = "none";
      if (cookie.get("lang") == "ar") {
        document.getElementsByClassName("coverLoder")[0].style.left = "2px";
      } else {
        document.getElementsByClassName("coverLoder")[0].style.right = "2px";
      } /* end of if */
    } /* /chackLang */,

    //this function only used for request my contact befor load the page
    getMyContact() {
      store.dispatch("myContactRedirectMessage", {
        user_id: cookie.get("user").id,
      });
    } /* /getMyContact */,

    //this function used for the search
    searchRedirectMessage: _.debounce((x) => {
      if (x.length > 0) {
        document.getElementsByClassName("coverLoder")[0].style.display = "flex";
        searchV = x;
        store.dispatch(
          "searchRedirectMessage",
          { searchValue: x, sercherId: cookie.get("user").id } || null
        );
      } else {
        store.dispatch("myContactRedirectMessage", {
          user_id: cookie.get("user").id,
        });
      } /* end of if */
    }, 2000) /* /searchRedirectMessage */,

    _trans(x) {
      return this.l_[x];
    } /* _trans */,

    //this function to send every things for aother users
    sendEveryThinks() {
      if (this.messages) {
        var messagesId = [];
        messagesId = JSON.stringify(this.messages.message_id);
        this.messages.message_id = messagesId;

        var userId = [];
        userId = JSON.stringify(this.messages.id);
        this.messages.id = userId;

        if (cookie.get("user").id) {
          /* this.messages.message_id=messagesId */
          this.messages.sender_id = cookie.get("user").id;
          this.io.emit("forward message", this.messages);
          this.slectedUser = [];
          this.id = [];
          this.$store.state.redirectMessages = null;
        } /* end of if */
      } /* end of if */
    } /* /sendEveryThinks */,
  } /* /methods */,

  computed: {
    slectedUserr() {
      if (this.slectedUser.length > 0) {
        return this.slectedUser;
      }
      return null;
    } /* /slectedUser */,

    pageNums() {
      if (this.$store.state.page_numss) return this.$store.state.page_numss;
      else return null;
    } /* /pageNums */,

    getYourContact() {
      if (this.$store.state.yourContact) {
        var x = this.$store.state.yourContact.filter((value) => {
          if (!(value.id == this.user.id)) return value;
        }); /* end of filter */
        return x;
      }
      return null;
    } /* /getYourCintact */,
  } /* /computed */,

  watch: {
    //this function used when take element from search but the displed element dot display all and i have page number
    pageNums(x) {
      var wepperCard = document.getElementsByClassName("cover")[0];
      var contactList = document.getElementsByClassName(
        "wepperCardRedirectMessage"
      )[0];
      var srch = setInterval(() => {
        if (
          wepperCard.getBoundingClientRect().bottom <=
          contactList.getBoundingClientRect().bottom
        ) {
          if (this.$store.state.pages <= x) {
            store.dispatch("searchRedirectMessage", {
              searchValue: searchV,
              sercherId: cookie.get("user").id,
            });
          } else {
            clearSrch();
          } /* end of if */
        } else {
          clearSrch();
        } /* end of if */
      }, 300); /* end if setInterval */

      function clearSrch() {
        clearInterval(srch);
      } /* end of clearSrch */
    } /* end of pageNums */,

    searchInput(x) {
      if (x.length > 0) {
        this.searchRedirectMessage(x);
      } else {
        this.searchRedirectMessage(x);
        document.getElementsByClassName("coverLoder")[0].style.display = "none";
      } /* end of if */
    } /* /searchInput */,

    //this function to get all your contact
    getYourContact(x) {
      if (x) {
        x.forEach((el, i) => {
          if (el.image && !el.check) {
            x[i].image = this.$store.state.imgProfilePath + el.image;
            x[i].check = true;
          } /* end of if */
        });

        if(cookie.get("sndRcvId")){
          var reciverId=null;
          if(cookie.get("sndRcvId").sender_id ==cookie.get("user").id){
            reciverId=cookie.get("sndRcvId").reciver_id
          }else{
            reciverId=cookie.get("sndRcvId").sender_id
          }/* end of if */

          x=x.filter(value=>{
            if(value.id != reciverId){
              return value
            }/* end of if */
          })/* end of filter */
          
        }/* end of if */
        this.myContactUser = x;
      } /* end of if */
    } /* /getYourCintact */,
  } /* /watch */,
}; /* end of export default */
</script>