<template>
  <div class="app" v-cloak>
    <AppHeader/>
    <div class="app-body ">
      <Sidebar />
      <main class="main">
        <breadcrumb  style="z-index:1000; position:fixed; width:100%"  :list="list"/>
        <div style="margin-top:33px" >
          <router-view class="animated fadeIn "></router-view>
        </div>
      </main>
      <!-- <AppAside/> -->
    </div>
    <!-- <AppFooter/> -->
  </div>
</template>

<script>
import { Header as AppHeader, Sidebar,Breadcrumb } from '../components/'

export default {
  name: 'appshell',
  components: {
    AppHeader,
    Sidebar,
    Breadcrumb
  },
  computed: {
    name () {
      return this.$route.name
    },
    list () {
      return this.$route.matched
    }
  }
}
</script>

<style scoped>
[v-cloak] {display: none}
</style>
