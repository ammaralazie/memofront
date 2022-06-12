<template>
  <div class="alertBlock" v-if="payload.block == false || payload.block== true">
    <div class="backgroundAlter"></div>

    <div class="contenerAlert">
      <div class="messageBlock" v-if="payload.block==false">{{_trans("note6")}}</div>
      <div class="messageBlock" v-if="payload.block">{{_trans("note7")}}</div>
      <div class="userInfo" v-if="!item.item &&payload.block==false">
        <img v-if="item.profile_image" :src="item.profile_image" alt="" class="avatar" />
        <img v-else src="../assets/uploads/image/default.png" alt="" class="avatar" />
        <div class="username" v-if="item.first_name">{{item.first_name + " "+item.last_name}}</div>
      </div>
      <!-- /userInfo -->

      <div class="userInfo" v-if="item.item &&payload.block==false">
        <img v-if="item.item.image" :src="item.item.image" alt="" class="avatar" />
        <img v-else src="../assets/uploads/image/default.png" alt="" class="avatar" />
        <div class="username" v-if="item.item.username">{{item.item.username}}</div>
      </div>
      <!-- /userInfo -->

      <div class="userInfo" v-if="item.item && payload.block==true">
        <img v-if="item.item.image" :src="item.item.image" alt="" class="avatar" />
        <img v-else src="../assets/uploads/image/default.png" alt="" class="avatar" />
        <div class="username" v-if="item.item.username">{{item.item.username}}</div>
      </div>
      <!-- /userInfo -->

      <div class="userInfo" v-if="!item.item && payload.block==true">
        <img v-if="item.profile_image" :src="item.profile_image" alt="" class="avatar" />
        <img v-else src="../assets/uploads/image/default.png" alt="" class="avatar" />
        <div class="username" v-if="item.first_name">{{item.first_name+" "+item.last_name}}</div>
      </div>
      <!-- /userInfo -->
      <div class="choser" v-if="payload.block==false">
        <div class="yes" @click="unblockUser(true)">{{_trans("yes")}}</div>
        <div class="no" @click="unblockUser(false)">{{_trans("no")}}</div>
      </div>
      <!-- /choser -->
      <div class="choser" v-if="payload.block">
        <div class="yes" @click="blockUser(true)">{{_trans("yes")}}</div>
        <div class="no" @click="blockUser(false)">{{_trans("no")}}</div>
      </div>
    </div>
    <!-- /contenerAlert -->
  </div>
  <!-- /alertBlock -->
</template>

<script>
import * as cookie from "vue-cookies"
export default {

  props:["item","payload"],

  data() {
    return {
      lang: cookie.get("lang") || "en",
      l_: this.$store.getters.words,
    }; /* /return */
  } /* /data */,
  methods: {
    _trans(x) {
      return this.l_[x];
    } /* _trans */,
    unblockUser(type){
        this.$emit("unblockUser",this.payload,this.item,type)
    }/* /blockUser */,

    blockUser(type){
       this.$emit("blockUser",this.payload,this.item,type) 
    }/* /blockUser */

  } /* /methods */,

};
</script>

<style lang="scss" scoped>
</style>