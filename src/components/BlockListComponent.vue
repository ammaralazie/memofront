<template>
  <div class="blockList">
    <div class="navBlockList">
      <p>{{ _trans("blockMenu") }}</p>
      <div class="closeBlockList" @click="closeBlockList">
        <span></span>
        <span></span>
      </div>
    </div>
    <!-- ظnavBlockList -->
    <div class="wreapperBlockList">
      <div class="wepperCard" v-if="blockedUser.length>0">
        <div v-for="item in blockedUser" :key="item.id" :blocked-id="item.id" class="cardBlockList" @click="unblockUser(item.id,item)" >
          <div class="mainInfo">
            <img v-if="item.profile_image"
              :src="item.profile_image"
              alt=""
              class="avatarUser"
            />
            <img v-else
              src="../assets/uploads/image/default.png"
              alt=""
              class="avatarUser"
            />
            <div class="nameUser" v-text="item.first_name +' '+item.last_name"></div>
          </div>
          <!-- /mainInfo -->
          <div class="unblockUser">{{_trans("unblock")}}</div>
          <!-- /unblockUser -->
        </div>
        <!-- /cardBlockList -->
      </div>
      <!-- /wepperCard -->
    </div>
    <!-- /wreapperBlockList -->
  </div>
  <!-- /blockList -->
</template>
<script>
import * as cookie from "vue-cookies";
export default {
  props: ["blockList"],
  data() {
    return {
      lang: cookie.get("lang") || "en",
      l_: this.$store.getters.words,
      myContactUser: [],
      io: this.$store.state.socket,
      blockedUser:[]
    }; /* /return */
  } /* /data */,

  mounted() {
  } /* /mounted */,

  methods: {
    _trans(x) {
      return this.l_[x];
    } /* _trans */,

    closeBlockList(){
      this.$emit("showBlockList",false)
    }/* /closeBlockList */,

    unblockUser(user_id,item){
      var payload={
        user_id:user_id,
        my_id:cookie.get("user").id || null,
        block:false
      }

      this.$emit("unblockUser",payload,item)


    }/* /unblockUser */
  } /* /methods */,

  watch:{
    blockList(x){
      if(x){
        this.blockedUser=[]
        setTimeout(()=>{
          this.blockedUser=x
        },100)
      }/* end of if */
    }/* /blockList */
  }/* /watch */

};
</script>