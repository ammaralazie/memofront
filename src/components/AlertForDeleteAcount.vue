<template>
  <div class="deleteAcount">
    <div class="backgroundDeleteAccount"></div>
    <div class="weppperDeleteAcount">
      <div class="worningDeleteAcount" v-if="!waiting">{{ _trans("note8") }}</div>
      <div class="check" v-if="!waiting">
        <div class="delete" @click="deleteAccount">{{ _trans("delete") }}</div>
        <div class="cancel" @click="cancel">{{ _trans("cancel") }}</div>
      </div>
      <!-- /check -->
      <div class="waiting" v-if="waiting">
          <p>{{_trans("note9")}}</p>
          <div class="loader"></div>
      </div>
      <!-- /waiting -->
    </div>
    <!-- /weppperDeleteAcount -->
  </div>
  <!-- ظdeleteAcount -->
</template>

<script>
import * as cookie from "vue-cookies"
export default {
  props: ["data"],
  data() {
    return {
      l_: this.$store.getters.words,
      waiting:false
    };
  } /* /data */,
  computed:{
      closeWaiting(){
          if(this.$store.state.accountDeletedSuccessfly){
              return this.$store.state.accountDeletedSuccessfly
          }else{
              return null
          }/* end of if */
      }/* /closeWaiting */
  },/* /computed */
  watch:{
      closeWaiting(x){
          if(x){
              this.waiting=false
              this.$emit("cansel",false)
              this.$store.state.accountDeletedSuccessfly=null
              
              cookie.remove("user")
              cookie.remove("sndRcvId")
              cookie.remove("mode")
              cookie.remove("lang")
              cookie.set("mode","light")
              this.$router.push({name:"verify"})

          }/* end of if */
      },/* /closeWaiting */
  },/* /watch */
  methods: {
    _trans(x) {
      console.log(this.l_);
      return this.l_[x];
    } /* _trans */,

    cancel(){
        this.$emit("cansel",false)
    }/* /cancel */,

    deleteAccount(){
        this.waiting=true
        this.$store.dispatch("deleteAcount",{user_id:cookie.get("user").id,sn:cookie.get("user").sn})
    }/* /delete */
  } /* /method */,
};
</script>

<style lang="scss" scoped>
</style>