<template>
  <div class="app flex-row align-items-center login-cover" v-cloak>
    <div class="container-fluid">
      <b-row class="justify-content-center" style="height: 500px">
        <div class="col-md-6 col-12 col-sm-8">
          <div class="elevation-3 login-panel">
            <div class="logo text-center mt-5">
              <!-- <img src="../../../static/img/logo.png" alt="lumos-logo" height="50px"> -->
              <h3><p> DIPLOMATIC BOND AUTOMATION SYSTEM</p></h3>
            </div>
            <div class="row">
              <div class="col-md-5 col-12">
                <div class="login-form">
                  <!-- <h4 class="text-center"> Sign in to LUMOS</h4> -->
                    <v-app id="inspire">
                        <v-form @submit.prevent="login()">
                            <v-text-field
                                v-model="username"
                                label="Username"
                                :rules="usernameRules"
                                required
                                autofocus
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

                        <div style="height:10px;">
                          <h6 :class="messageClass" >{{message}}</h6>
                          <h6 v-if="onLine === false" class="text-center text-red">No Internet Connection! </h6>
                        </div>
                        <div class="login-bottom-panel " >
                            <!-- <router-link to="register">
                                Create Account
                            </router-link> -->
                            <span class="float-right">
                                <v-progress-circular  :indeterminate="loading" v-show="loading" :color="loadingColor" ></v-progress-circular>
                                <button class=" button-width btn btn-primary ripple" @click="login()"  :disabled="buttonEnable" > Sign In</button>
                            </span>
                            <router-link :to="{ name: 'ForgetPassword' }">
                              <span class="float-left" style="padding-top: 8px">
                                <!-- <v-progress-circular  :indeterminate="loading" v-show="loading" :color="loadingColor" ></v-progress-circular> -->
                                <a class="" id="temp" >Forgot Password?</a>
                              </span>
                            </router-link>
                        </div>
                    </v-app>
                </div>
              </div>
              <div class="col-md-6 col-11 offset-sm-1">
                <div class="">
                  <img class="details-img img-fluid" src="../../../static/img/NewProject(2).jpg" alt="">
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12 mt-5">
                <div class="text-center details-text">
                  Diplomatic Bond Automation System (DBAS) is developed and maintained by IT Division, <br>NBR © 2021 All rights reserved.
                </div>
              </div>
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
      otpOid:null,
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
                if (result.data.header.responseCode === "201"){
                      this.messageClass = "text-center text-green"
                      // let token = result.data.body.accessToken;
                      // let menu = result.data.body.menuJson;
                      // let dataJson = result.data.body.dataJson;
                      // let username = result.data.body.name;
                      // let loginId = result.data.body.loginId;
                      // let roleOid = result.data.body.roleOid;
                      // let roleId = result.data.body.roleId;
                      // let warehouseOid = result.data.body.warehouseOid;
                      // let photoPath = result.data.body.photoPath;
                      // localStorage.setItem("token", token);
                      // localStorage.setItem("lumos_menu", menu );
                      // localStorage.setItem("lumos_dataJson", dataJson );
                      // localStorage.setItem("lumos_loginId", loginId );
                      // localStorage.setItem("lumos_roleOid", roleOid );
                      // localStorage.setItem("lumos_roleId", roleId);
                      // localStorage.setItem("lumos_username", username);
                      // localStorage.setItem("lumos_warehouseOid", warehouseOid);

                      // if(photoPath!=null){
                      //   photoPath = url.baseUrl+url.master_generalprofile_document_v1_download+ photoPath;
                      //   localStorage.setItem("lumos_photoPath", photoPath);
                      // }
                      // if(roleId ==='WHAdmin'){
                      //   this.$router.push("wrongoperation/wrongpurchase");
                      // this.message = result.data.header.responseMessage;
                      // } else if(roleId ==='Admin'){
                      //   this.$router.push("settings/user");
                      // this.message = result.data.header.responseMessage;
                      // }
                      //  else{
                      //   this.$router.push("/dashboard");
                      //   this.message = result.data.header.responseMessage;
                      // }
                    this.otpOid = result.data.body.data;
                    this.messageClass = "text-center text-green"
                    this.message = "OTP Sent successfully"
                    this.loading = false;
                    this.$router.push({ name: "LoginOtp", params: {otpOid: this.otpOid, loginId: this.username} });
                    

                }else if(result.data.header.responseCode === "402"){
                    this.loading = false
                    this.messageClass = "text-center text-red"
                    this.message = result.data.body.data;
                } else{
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
.button-width{
  width:80px !important;
}
#temp{
  color: black;
  opacity:1;
}
#temp:hover{
  /* opacity:0.3; */
  color: blue;
}
.details-img{
  height: 200px;
}
.details-text{
  color : grey;
  font-size: 12px
}
[v-cloak] {display: none}
</style>
