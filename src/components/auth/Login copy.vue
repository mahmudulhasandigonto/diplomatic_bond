<template>
  <div class="app flex-row align-items-center login-cover" v-cloak>
    <div class="container-fluid">
      <b-row class="justify-content-center">
        <div class="col-md-4 col-12 col-sm-8">
          <div class="elevation-3 login-panel">
            <div class="logo text-center">
              <!-- <img src="../../../static/img/logo-diplomaticbond.png" style="width: 100%; height: auto;" alt=""> -->
              <!-- <h4 style="color:#3949AB"> <b><i>SCM</i></b> </h4>
              <h4 style="color:#3949AB"> <b><i>Automation</i></b> </h4> -->
              <h3 class="text-info"><b>Diplomatic Bond Automation System</b></h3>
              
            </div>
            <div class="login-form">
              <div style="height:10px;">
                <h6 :class="messageClass" >{{message}}</h6>
                <h6 v-if="onLine === false" class="text-center text-red">No Internet Connection! </h6>
              </div>
                <v-app id="inspire">
                    <v-form @submit.prevent="login()">
                        <v-text-field
                            v-model="username"
                            label="Username"
                            :rules="usernameRules"
                            required
                        ></v-text-field>
                        <v-text-field
                            v-model="password"
                            label="Password"
                            :rules="passwordRules"
                            :type="passwordShow ? 'password' : 'text'"
                            @click:append="() => (passwordShow = !passwordShow)"
                            @keyup.enter="login()"
                            required
                        ></v-text-field>
                    </v-form>
                    <div class="login-bottom-panel " >
                        <span class="float-right"> 
                            <v-progress-circular  :indeterminate="loading" v-show="loading" :color="loadingColor" ></v-progress-circular>
                            <button class="button-width btn btn-primary ripple" @click="login()"  :disabled="buttonEnable">Sign In</button>
                        </span>
                    </div>
                </v-app>
            </div>         
          </div>
        </div>    
      </b-row>
    </div>
  </div>
</template>

<script>
import { url } from "@/utils/urls";
import { constant } from "@/utils/constant";
import { lumos_client } from "@/utils/lumos-client";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      message: "",
      show: false,
      usernameRules: [
      v => !!v || 'Username is required' ],
      passwordRules: [
      v => !!v || 'Password is required' ],
      passwordShow: 'password',
      message:"",
      loading: false,
      loadingColor:'',
      messageClass:'',
      onLine: navigator.onLine,
   
    };
  },
  computed:{
    buttonEnable(){
      if(!this.username || !this.password){
		return true
      }
      else{
        return false
      }
    },
  },
  mounted() {
    window.addEventListener('online',  this.updateOnlineStatus);
    window.addEventListener('offline', this.updateOnlineStatus);
  },
  beforeDestroy() {
    window.removeEventListener('online',  this.updateOnlineStatus);
    window.removeEventListener('offline', this.updateOnlineStatus);
  },
  methods: {
    login() {
        if( this.username && this.password){
            this.loading = true;
            this.loadingColor = "blue";
            let body = {
                loginId:  this.username,
                password: this.password
            };
            let req = constant.getRequest(url.authentication_user_v1_login, body);
            lumos_client
            .onPost(url.authentication_user_v1_login, req)
            .then(result => {                 
                if (result.data.header.responseCode === "200"){
                      this.messageClass = "text-center text-green"
                      let token = result.data.body.accessToken;
                      let menu = result.data.body.menuJson;
                      let dataJson = result.data.body.dataJson;
                      let username = result.data.body.name;
                      let loginId = result.data.body.loginId;
                      let roleOid = result.data.body.roleOid;
                      let roleId = result.data.body.roleId;
                      let warehouseOid = result.data.body.warehouseOid;

                      localStorage.setItem("token", token);
                      localStorage.setItem("lumos_menu", menu );
                      localStorage.setItem("lumos_dataJson", dataJson );
                      localStorage.setItem("lumos_loginId", loginId );
                      localStorage.setItem("lumos_roleOid", roleOid );
                      localStorage.setItem("lumos_roleId", roleId);
                      localStorage.setItem("lumos_username", username);
                      localStorage.setItem("lumos_warehouseOid", warehouseOid);

                      this.$router.push("/dashboard");
                      this.message = result.data.header.responseMessage;
                }else{
                    this.loading = false
                    this.messageClass = "text-center text-red"
                    this.message = result.data.header.responseMessage
                }
            })
            .catch(error => {
                this.$log.error(error);
            });

        }
     
    },
    updateOnlineStatus(e) {
          const { type } = e;
          this.onLine = type === 'online';
    }
  }
};
</script>

<style scoped>
.login-panel{
  background: #f9fafc;
}
.button-width{
  width:80px !important;
}
[v-cloak] {display: none}
</style>


