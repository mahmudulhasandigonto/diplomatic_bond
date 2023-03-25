<template>
  <div class="app flex-row align-items-center login-cover" v-cloak>
    <div class="container-fluid">
      <b-row class="justify-content-center" style="height: 400px;">
        <div class="col-md-6 col-12 col-sm-8">
                               
          <div class="elevation-3 login-panel">
         
            <div class="logo text-center mt-5">
              <!-- <img src="../../../static/img/logo.png" alt="lumos-logo" height="50px"> -->
              <h3><p>DIPLOMATIC BOND AUTOMATION SYSTEM</p></h3>
              <br>
              <h4><p>Account recovery</p></h4>
            </div>
            <br><br>
            <div class="row d-flex justify-content-center">
              <div class="col-md-6 col-12">
                <div class="login-form">
                  <!-- <h4 class="text-center"> Sign in to LUMOS</h4> -->
                    <v-app id="inspire">
                        <v-form @submit.prevent="recoverPassword()">
                            <v-text-field
                                v-model="username"
                                label="Enter your username"
                                @keyup.enter="recoverPassword()"
                                required
                                autofocus
                            ></v-text-field>                           
                        </v-form>

                        <div style="height:10px;">
                          <h6 :class="messageClass" >{{message}}</h6>
                          <h6 v-if="onLine === false" class="text-center text-red">No Internet Connection! </h6>
                        </div>
                        <div class="login-bottom-panel " >
                            <span class="float-right"> 
                                <!--<v-progress-circular  :indeterminate="loading" v-show="loading" :color="loadingColor" ></v-progress-circular>-->
                                <button class=" button-width btn btn-primary ripple" @click="recoverPassword()"> Submit</button>
                            </span>
                            <span class="float-left"> 
                             <router-link tag="button" class="button-width btn btn-info ripple" style="width:100px;" :to="{name:'Login'}" >
                                BACK
                            </router-link>
                                <!--<v-progress-circular  :indeterminate="loading" v-show="loading" :color="loadingColor" ></v-progress-circular>-->
                               <!-- <button class=" button-width btn btn-primary ripple" @click="recoverPassword()"> Submit</button>-->
                            </span>
                        </div>
                        <v-flex>
                          <div>
                            <v-snackbar v-model="snackbar" :bottom="y === 'bottom'" :left="x === 'left'" :multi-line="mode === 'multi-line'"
                              :right="x === 'right'" :timeout="timeout" :top="y === 'top'" :vertical="mode === 'vertical'" :color="color"
                            >
                              {{ messageText }}
                              <v-btn flat @click="snackbar = false">
                                <i class="fa fa-window-close" aria-hidden="true"></i>
                              </v-btn>
                            </v-snackbar>
                          </div>
                        </v-flex>
                    </v-app>
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
      timeout: 2000,
      messageText: "",
      color: "",
      loadingColor:'',
      messageClass:'',
      snackbar: false,
      size: "50px",
      y: "bottom",
      x: "right",
      mode: "",
      tabIndex: 0,
      progressBar: {
        loading: false,
        show: false,
      },
      onLine: navigator.onLine,
   
    };
  },
  computed:{
    buttonEnable(){
      if(!this.username){
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
    recoverPassword() {
        if(this.username){
            this.loading = true;
            this.loadingColor = "blue";
            let body = {
                loginId:this.username
            };
            let req = constant.getRequest(url.authentication_user_v1_forgetpassword, body);
            lumos_client
            .onPost(url.authentication_user_v1_forgetpassword, req)
            .then(result => {   
              this.progressBar.loading = false;
              this.progressBar.show = false;
              let res = result.data.header.responseCode;                    
              this.snackbar = true;
              if(res !="200"){
                this.color = "red";
                this.messageText = result.data.body.data;
                return;
              } else if(res =="200"){
                  this.loading = false
                  this.color = "success";
                  // this.message = result.data.header.responseMessage
                  this.messageText = "Password is sent to your email";
                  setTimeout(() => this.$router.push({ name: "Login" }), 3000);
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
.details-img{
  height: 200px;
}
.details-text{
  color : grey;
  font-size: 12px
}
[v-cloak] {display: none}
</style>