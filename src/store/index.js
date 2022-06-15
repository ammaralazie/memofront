import { createStore } from "vuex";
import axios from "axios";
import io from "socket.io-client";
import * as cookie from "vue-cookies";

// const express=require('express');
// const app=express()
//const port =process.env.PORT || 3000

//8080 php api
//3000 sockite

export default createStore({
  state: {
    confirmationResult: null,
    emphasisLen: "",
    phone: "",
    serialNumber: [],
    user_id: "",
    myProfile: null,
    errMsg: null,

    imgProfilePath:
      "https://storage.googleapis.com/memoback-ea9c4.appspot.com/",
    imgPath: "https://storage.googleapis.com/memoback-ea9c4.appspot.com/",
    videoPath: "https://storage.googleapis.com/memoback-ea9c4.appspot.com/",
    audioPath: "https://storage.googleapis.com/memoback-ea9c4.appspot.com/",
    filePath: "https://storage.googleapis.com/memoback-ea9c4.appspot.com/",

    // phpPort: "/",
    // port: "/",
    // pattUrl: "https://memoback.herokuapp.com",
    // socket: io(
    //   "https://memoback.herokuapp.com" /* ,{ transports : ['websocket'] } */
    // ),

    // imgProfilePath: "http://192.168.1.7:8080/yawar_chat/uploads/profile/",
    // imgPath: "http://192.168.1.7:8080/yawar_chat/uploads/chatimage/",
    // videoPath: "http://192.168.1.7:8080/yawar_chat/uploads/video/",
    // audioPath: "http://192.168.1.7:8080/yawar_chat/uploads/audio/",
    // filePath: "http://192.168.1.7:8080/yawar_chat/uploads/files/",

    phpPort: ":8080/yawar_chat/views/",
    port: ":3000/",
    pattUrl: "http://192.168.0.108",
    socket: io(
      "http://192.168.0.108:3000" /* ,{ transports : ['websocket'] } */
    ),

    myChat: [],
    getMessageByUser: null,
    lang: cookie.get("lang") || "en",
    words: null,
    roomId: null,
    peer: null,
    myPeerId: null,
    rcvPeerId: null,
    caradId: null,
    deleteConversationResulte: [],
    redirectMessages: null,
    deleteMessages: null,
    yourContact: [],
    delteInfoUserInput: false,
    deleteState: false,
    payloadDelete: {},
    sendSearchRequest: false,
    page: 1,
    lastEarchValue: "",
    page_nums: null,
    page_num: null,
    page_numss: null,
    pages: 1,
    closeSelectElementWindow: false,
    click: true,
    e: null,
    cdelete: "snd",
    widthforZoom: null,
    oldPage: null,
    oldPages: null,
    userProfile: null,
    userMedia: [],
    senderCall: null,
    rchiveConversations: null,
    checkArchive: false,
    templatCardForAddnewArchivChat: null,
    removedItem: [],
    checkUserConnet: [],
    mute: JSON.parse(cookie.get("mute")) || false,
    blockedUsers: [],
    blockUserInfo: [],
    unBlockUserInfo: [],
    accountDeletedSuccessfly: null,
    searchLoader: false,
    /* reply:false, */
  } /* /state */,
  getters: {
    blockedUsers(state) {
      if (state.blockedUsers) return state.blockedUsers;
      else return null;
    } /* /blockedUsers */,
    rchiveConversations(state) {
      if (state.rchiveConversations) return state.rchiveConversations;
      return null;
    } /* /rchiveConversations */,
    userProfile(state) {
      if (state.userProfile) {
        return state.userProfile;
      } else {
        return null;
      } /* end of if */
    } /* /userProfile */,
    peerJs(state) {
      var newPeer = state.peer;
      return newPeer;
    } /* peerJs */,
    myProfile(state) {
      if (state.myProfile) {
        return state.myProfile;
      } else {
        return null;
      } /* end of if */
    } /* end of my profile */,
    errMsg(state) {
      if (state.errMsg) {
        return state.errMsg;
      } else {
        return "";
      } /* end of if */
    } /* end of errMsg */,
    myChat(state) {
      if (state.myChat) {
        return state.myChat;
      } else {
        return null;
      } /* end of if */
    } /* /myChat */,
    myChat2(state) {
      if (state.myChat) {
        return state.myChat;
      } else {
        return null;
      } /* end of if */
    } /* /myChat */,
    getMessageByUser(state) {
      if (state.getMessageByUser) {
        return state.getMessageByUser;
      } else {
        return null;
      } /* end of if */
    } /* /getMessageByUser */,
    words(state) {
      if (state.words) {
        return state.words;
      }
      return null;
    } /* end of words */,
  } /* /getters */,
  mutations: {
    blockedUsers(state, data) {
      state.blockedUsers = data;
    } /* /blockedUsers */,

    getSignupReslutes(state, data) {
      state.phone = data.data.user[1];
      state.user_id = data.data.user[0];
      state.serialNumber = data.data.numbers;
    } /* /getSignupResute */,
    getMyProfile(state, data) {
      state.myProfile = data;
    } /* end of getMyProfile */,
    getErrorMessage(state, data) {
      state.errMsg = data;
    } /* end of getErrorMessage */,
    myChat(state, data) {
      state.myChat = data;
    } /* /myChat */,
    archiveContact(state, data) {
      if (data) {
        state.rchiveConversations = data;
      } else {
        state.rchiveConversations = [];
      } /* end of if */
    } /* /archiveContact */,

    getMessageByUser(state, data) {
      state.getMessageByUser = data;
    } /* /getMessageByUser */,
    getRoomId(state, roomId) {
      if (roomId) {
        state.roomId = roomId;
      } /* end of if */
    } /* /roomId */,
    yourContact(state, data) {
      if (data) {
        state.yourContact = data;
      } /* end of if */
    } /* /yourContact */,

    getprofileUser(state, data) {
      if (data) state.userProfile = data;
    } /* /getprofileUser */,
  } /* /mutations */,
  actions: {
    signup(context, payload) {
      const ex = new URLSearchParams();
      ex.append("phone", payload.phone);

      axios
        .post(
          context.state.pattUrl + context.state.phpPort + "APIS/signup.php",
          /* payload */ ex
        )
        .then((res) => {
          context.commit("getSignupReslutes", res.data);
        })
        .catch((err) => console.log(err));
    } /* /signup */,

    async login(context, payload) {
      const result = await axios
        .post(context.state.pattUrl + context.state.port + "loginUser", payload)
        .catch((err) => console.log(err));

      if (result.data.profile) {
        context.commit("getMyProfile", result.data.profile);
      } else {
        context.commit("getErrorMessage", result.data);
      } /* end of if */
    } /* end of looooogin */,

    async complateSingup(context, payload) {
      /* var ex = {
        id:payload.id,
        sn:payload.sn,
        first_name:payload.f_name,
        last_name:payload.l_name,
        email:payload.email,
        img_profile: payload.img
      }; */

      var ex = new FormData();
      ex.append("id", payload.id);
      ex.append("sn", payload.sn);
      ex.append("first_name", payload.f_name);
      ex.append("last_name", payload.l_name);
      ex.append("email", payload.email);
      ex.append("img_profile", payload.img);
      const result = await axios
        //3000
        .post(
          context.state.pattUrl + context.state.port + "uploadImgProfile",
          ex
        )
        .catch((err) => console.log(err));
      context.commit("getMyProfile", result.data[0]);
    } /* /complateSingup */,

    async sendprofilePassword(context, payload) {
      if (payload) {
        const resulte = await axios
          //3000
          .post(
            context.state.pattUrl + context.state.port + "setPasswordProfile",
            payload
          )
          .catch((err) => console.log(err));
        context.commit("getMyProfile", resulte.data[0]);
      } else {
        console.log("some thinks is wrong");
      } /* /payload */
    } /* /sendPassword */,

    async myContact(context, payload) {
      delete axios.defaults.headers.common["Authorization"];
      delete axios.defaults.headers.common["Content-Type"];

      context.state.page_nums = 0;
      context.state.page_numss = 0;
      context.state.oldPage = null;
      context.state.oldPages = null;
      context.state.page = 1;
      context.state.pages = 1;

      //this section for display loader
      context.state.searchLoader = true;

      const resulte = await axios
        //8080
        .get(
          context.state.pattUrl +
            context.state.phpPort +
            "APIS/mychat.php?user_id=" +
            payload.user_id
        )
        .catch((err) => console.log(err));
      if (resulte) {
        var myContact = [];
        myContact = resulte.data.data.filter((value) => {
          if (
            (value.state == null || value.state != cookie.get("user").id) &&
            value.state != "0"
          )
            return value;
        }); /* end of filter */


        console.log("myContact : ",myContact)
        
        //this for order the list by timstamp
        myContact.sort(function (x, y) {
          return x.created_at - y.created_at;
        });/* end of sort data */

        context.commit("myChat", myContact.reverse());

        var archivMessageContact = [];
        archivMessageContact = resulte.data.data.filter((value) => {
          if (value.state == "0" || value.state == cookie.get("user").id)
            return value;
        }); /* end of filter */
        context.commit("archiveContact", archivMessageContact);

        //this section for hidden loader
        context.state.searchLoader = false;
      } /* end of if */
    } /* /myContact */,

    async getMessageByUser(context, payload) {
      cookie.set("sndRcvId", payload);
      const resulte = await axios
        //3000
        .post(
          context.state.pattUrl + context.state.port + "messagesbyusers",
          payload
        )
        .catch((err) => console.log(err));
      if (resulte) {
        context.commit("getMessageByUser", resulte.data);
      } /* end of if */
    } /* /getMessageByUser */,

    async getRoomId(context) {
      const resulte = await axios
        //3000
        .post(context.state.pattUrl + context.state.port + "calling")
        .catch((err) => console.log(err));
      if (resulte) {
        context.commit("getRoomId", resulte.data.roomId);
      } /* end of if */
    } /* /getRoomId */,

    async searchUser(context, payload) {
      if (context.state.lastEarchValue != payload.searchValue) {
        context.state.page = 1;
        context.state.lastEarchValue = payload.searchValue;
        context.state.page_nums = 0;
        context.state.oldPage = null;
        payload.page = 1;
      } /* en dof if */

      var resulte = null;
      if (context.state.oldPage != context.state.page) {
        context.state.oldPage = context.state.page;

        var ex = null;
        ex = new FormData();
        ex.append("sn", payload.searchValue);
        ex.append("sercherId", payload.sercherId);
        ex.append("page", context.state.page);

        // payload.sn = payload.searchValue;
        // ex = payload;

        //this section for display loader
        context.state.searchLoader = true;

        resulte = await axios
          //8080
          .post(
            context.state.pattUrl +
              context.state.phpPort +
              "APIS/search_for_user.php",
            /* payload */ ex
          )
          .catch((err) => console.log(err));
      } /* end of if */
      if (resulte) {
        if (context.state.page == 1) {
          if (resulte.data.data)
            var result = resulte.data.data.filter((value) => {
              var myId = cookie.get("user").id;
              if (value.id != myId) return value;
            });
          context.commit("myChat", result);
          context.state.page_nums = resulte.data.pages_number;
        } else {
          if (resulte.data.data) {
            context.state.page_nums = resulte.data.pages_number;
            resulte.data.data.forEach((item) => {
              if (item.id != cookie.get("user").id)
                context.state.myChat.push(item);
            }); /* end of forEach */
          } /* end of if */
        } /* end of if */

        if (resulte.data.data.length > 0) context.state.page += 1;

        //this section for hideen loader
        context.state.searchLoader = false;
      } /* end of if */
    } /* /searchUser */,

    async deleteConversation(context, payload) {
      context.state.delteInfoUserInput = true;
      /* context.dispatch("myContact",{user_id:cookie.get("user").id}) */

      const result = await axios
        //3000
        .post(
          context.state.pattUrl + context.state.port + "deleteconversation",
          payload
        )
        .catch((err) => console.log(err));
      if (result) {
        var l = context.state.myChat.filter((value) => {
          if (value.id != payload.chat_id) return value;
        }); /* /filter */
        context.state.myChat = l;

        var archiveList = context.state.rchiveConversations.filter((value) => {
          if (value.id != payload.chat_id) return value;
        }); /* end of archive filter */
        context.state.rchiveConversations = archiveList;
        // if (context.state.deleteConversationResulte)
        //   context.state.deleteConversationResulte[
        //     context.state.deleteConversationResulte.length
        //   ] = payload;
        // else
        //   context.state.deleteConversationResulte[
        //     0
        //   ] = payload;
      } /* end of if */
    } /* /deleteConversation */,

    async searchRedirectMessage(context, payload) {
      // const ex = new FormData();
      // ex.append("sn", payload.sn);
      // ex.append("sercherId", payload.searcherId);
      // const resulte = await axios
      //   .post(
      //     context.state.pattUrl + ":8080/yawar_chat/APIS/search_for_user.php",
      //     ex
      //   )
      //   .catch((err) => console.log(err));

      // if (resulte.data) {
      //   context.commit("yourContact", resulte.data.data)
      // }/* end of if */

      if (context.state.lastEarchValue != payload.searchValue) {
        context.state.pages = 1;
        context.state.lastEarchValue = payload.searchValue;
        context.state.oldPages = null;
        payload.page = 1;
      } /* en dof if */

      var resulte = null;
      if (context.state.oldPages != context.state.pages) {
        context.state.oldPages = context.state.pages;

        const ex = new FormData();
        ex.append("sn", payload.searchValue);
        ex.append("sercherId", payload.sercherId);
        ex.append("page", context.state.pages);

        payload.sn = payload.searchValue;

        resulte = await axios
          //8080
          .post(
            context.state.pattUrl +
              context.state.phpPort +
              "APIS/search_for_user.php",
            /* payload */ ex
          )
          .catch((err) => console.log(err));
      } /* end of if */

      if (resulte) {
        if (context.state.pages == 1) {
          context.state.yourContact = resulte.data.data;
          context.state.page_numss = resulte.data.pages_number;
        } else {
          if (resulte.data.data) {
            context.state.page_numss = resulte.data.pages_numberss;
            resulte.data.data.forEach((item) => {
              context.state.yourContact.push(item);
            }); /* end of forEach */
          } /* end of if */
        } /* end of if */
        if (resulte.data.data.length > 0) context.state.pages += 1;
      } /* end of if */
    } /* /searchRedirectMessage */,

    async myContactRedirectMessage(context, payload) {
      const resulte = await axios
        .get(
          context.state.pattUrl +
            context.state.phpPort +
            "APIS/mychat.php?user_id=" +
            payload.user_id
        )
        .catch((err) => console.log(err));
      if (resulte.data) {
        /* 
        first_name: "aaaaaaaa"
        id: "103"
        image: "img_profile1642570897321-78450442-6fb4d008-d471-4e74-bcb5-81c554bc972e.png"
        last_name: "qqqqq"
        phone: "+9647510487448"
        sn: "1259199081"
        token: ""
        */

        var orginalObj = [];
        resulte.data.data.forEach((el) => {
          orginalObj.push({
            first_name: el.username,
            id: el.other_id,
            image: el.image,
            last_name: "",
            phone: "",
            sn: "",
            token: "",
          });
          /* end of orginalObj */
        });
        context.commit("yourContact", orginalObj);
      } /* end of if */
    } /* /searchRedirectMessage */,

    async deleteMessage2(context, payload) {
      const resulte = await axios
        .post(
          context.state.pattUrl + context.state.port + "deletemessage2",
          payload
        )
        .catch((e) => console.log(e));
      if (resulte) context.state.deleteState = resulte.data;
    } /* /deleteMessage2 */,

    async getProfileUser(context, id) {
      const resulte = await axios
        .post(context.state.pattUrl + context.state.port + "profile", {
          id: id,
        })
        .catch((err) => console.log(err));
      if (resulte) {
        context.commit("getprofileUser", resulte.data[0]);
        const mediaResult = await axios
          .post(context.state.pattUrl + context.state.port + "getmedia", {
            reciver_id: id,
            sender_id: cookie.get("user").id,
          })
          .catch((err) => console.log(err));

        if (mediaResult) {
          context.state.userMedia = mediaResult.data;
        } /* end of if */
      } /* end of if */
    } /* /getProfileUser */,

    async deletearchive(context, payload) {
      await axios
        .post(
          context.state.pattUrl + context.state.port + "deletearchive",
          payload
        )
        .catch((err) => {
          console.log(err);
        });
    } /* /deletearchive */,

    async archivechat(context, payload) {
      await axios
        .post(
          context.state.pattUrl + context.state.port + "archivechat",
          payload
        )
        .catch((err) => {
          console.log(err);
        });
    } /* /archivechat */,

    sendNotfication(context, payload) {
      if (payload)
        if (payload.data.body) {
          axios.defaults.headers.common["Content-Type"] = "application/json";
          axios.defaults.headers.common["Authorization"] =
            "Key=AAAA4428f68:APA91bGmEQZqZESoHenOQGETIbiOWS9N3r7e_BkHs1KFXi6ThD81FPkIHWp4dCsksTALD9IxaeHySy8ORraWmpjwvGh7Zls7Sc75NZQ0qTEwqIkWQZlMFdDC6OEGRNI22VfnkTu8LjP6";
          axios
            .post("https://fcm.googleapis.com/fcm/send", payload)
            .then((res) => {
              if (res) {
                delete axios.defaults.headers.common["Content-Type"];
                delete axios.defaults.headers.common["Authorization"];
              } /* end of if */
            })
            .catch((err) => console.log(err));
        } /* end of if */
    } /* /sendNotfication */,

    async blockUser(context, payload) {
      const result = await axios
        .post(
          context.state.pattUrl + context.state.port + "addtoblock",
          payload
        )
        .catch((e) => console.log(e));
      if (result) {
        const result2 = await axios
          .post(
            context.state.pattUrl + context.state.port + "myblocklist",
            payload
          )
          .catch((e) => console.log(e));
        if (result2) context.commit("blockedUsers", result2.data);
      } /* end of if */
    } /* /blockUser */,

    async getBlockList(context, payload) {
      const result = await axios
        .post(
          context.state.pattUrl + context.state.port + "myblocklist",
          payload
        )
        .catch((e) => console.log(e));
      if (result) {
        context.commit("blockedUsers", result.data);
      } /* end of if */
    } /* /getBlockList */,

    async unblockUser(context, payload) {
      const result = await axios
        .post(
          context.state.pattUrl + context.state.port + "deleteblock",
          payload
        )
        .catch((e) => console.log(e));
      if (result) {
        context.state.blockedUsers = context.state.blockedUsers.filter(
          (value) => {
            if (value.id != payload.user_id) return value;
          }
        ); /* end of filter */
      } /* end of if */
    } /* /unblockUser */,

    async deleteAcount(context, payload) {
      var ex=new FormData()
      ex.append("user_id",payload.user_id)
      ex.append("sn",payload.sn)

      const resulte = await axios
        .post(
          context.state.pattUrl +
            context.state.phpPort +
            "APIS/delete_my_account.php",
          /* payload */ ex
        )
        .catch((e) => console.log(e));
      if (resulte) {
        if (resulte.data.data) {
          context.state.accountDeletedSuccessfly = resulte.data.data;
        } /* end of if */
        /* context.state.accountDeletedSuccessfly */
      } /* end of if  */
    } /* /deleteAcount */,
  } /* /actions */,
}); /* /createStore */
