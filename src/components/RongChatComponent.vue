<template>
  <div class="wrongMsg">
      <div class="wrepperWrong">
          <div class="messageWrong">
              {{messageWrong}}
          </div>
          <!-- /messageWrong -->
      </div>
      <!-- /wrepperWrong -->
      <div class="timerMessageWrong"></div>
  </div>
  <!-- /wrongMsg -->
</template>

<script>
export default {
    props:["messageWrong"],
}/* end of export default */
</script>

<style>

</style>