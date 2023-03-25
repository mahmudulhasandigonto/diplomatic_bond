<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'app',
}


</script>

<style lang="scss">
  /* Import Font Awesome Icons Set */
  $fa-font-path: '~font-awesome/fonts/';
  @import '~font-awesome/css/font-awesome.min.css';
  /* Import Simple Line Icons Set */
  $simple-line-font-path: '~simple-line-icons/fonts/';
  @import '~simple-line-icons/css/simple-line-icons.css';
  /* Import Bootstrap Vue Styles */
  @import '~bootstrap-vue/dist/bootstrap-vue.css';
 
  /* @import '~bootstrap/scss/mixins/breakpoints';
  @import "~bootstrap/scss/functions";
  @import '~bootstrap/scss/variables'; */
  /* Import Main styles for this application */
  @import './scss/style';
  // @import url('https://fonts.googleapis.com/css?family=Roboto');
  // @import url('https://fonts.googleapis.com/css?family=Roboto|Srisakdi');

</style>
