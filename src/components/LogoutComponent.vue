<template>
    <dir></dir>
</template>
<script>
import * as cookie from "vue-cookies"
export default {
    created(){
       this.logout() 
    }/* /mounted */,
    methods:{
        logout(){
            cookie.remove("user")
            cookie.remove("sndRcvId")
            cookie.remove("mode")
            cookie.remove("lang")
            cookie.set("mode","light")
            this.$router.push({name:"verify"})
        },/* logout */
    }/* /methods */
}
</script>