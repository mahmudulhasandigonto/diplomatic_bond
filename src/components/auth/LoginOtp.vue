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
              <h4><p>OTP for login</p></h4>
            </div>
            <br><br>
            <div class="row d-flex justify-content-center">
              <div class="col-md-6 col-12">
                <div class="login-form">
                  <!-- <h4 class="text-center"> Sign in to LUMOS</h4> -->
                    <v-app id="inspire">
                        <v-form @submit.prevent="submitOtp()">
                            <v-text-field
                                v-model="otp"
                                label="Enter your otp"
                                @keyup.enter="submitOtp()"
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
                                <button class=" button-width btn btn-primary ripple" @click="submitOtp()"> Submit</button>
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
      otp: "",
      message: "",
      show: false,
      usernameRules: [
      v => !!v || 'Username is required' ],
      passwordRules: [
      v => !!v || 'Password is required' ],
      passwordShow: 'password',
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
    submitOtp() {
        if(this.otp){
            this.loading = true;
            this.loadingColor = "blue";
            let body = {
                loginId: this.$route.params.loginId,
                otpOid: this.$route.params.otpOid,
                otp:this.otp,
                password:"otp"
            };
            let req = constant.getRequest(url.authentication_user_v1_login, body);
            lumos_client
            .onPost(url.authentication_user_v1_login, req)
            .then(result => {   
              this.progressBar.loading = false;
              this.progressBar.show = false;
              let res = result.data.header.responseCode;                    
              this.snackbar = true;
              if(res =="202"){
                this.color = "red";
                this.messageText = result.data.body.data;
                return;
              } else if(res =="200"){
                  this.snackbar = false;
                  this.messageClass = "text-center text-green"
                  this.messageText = result.data.body.data;
                  let token = result.data.body.accessToken;
                  
                  let menu = result.data.body.menuJson;
                  if((result.data.body.roleOid =='warehouseadmin' || result.data.body.roleOid=='warehouseoperation') && result.data.body.dutyPaid=="0"){
                    let jsonMenu = JSON.parse(menu)
                    jsonMenu[4].children[2].enable = false;
                    menu = JSON.stringify(jsonMenu);
                  } 
                  let dataJson = result.data.body.dataJson;
                  let username = result.data.body.name;
                  let loginId = result.data.body.loginId;
                  let roleOid = result.data.body.roleOid;
                  let roleId = result.data.body.roleId;
                  let roleType = result.data.body.roleType;
                  let dutyPaid = result.data.body.dutyPaid;
                  let warehouseOid = result.data.body.warehouseOid;
                  let photoPath = result.data.body.photoPath;
                  localStorage.setItem("token", token);
                  localStorage.setItem("lumos_menu", menu );
                  localStorage.setItem("lumos_dataJson", dataJson );
                  localStorage.setItem("lumos_loginId", loginId );
                  localStorage.setItem("lumos_roleOid", roleOid );
                  localStorage.setItem("lumos_roleId", roleId);
                  localStorage.setItem("lumos_username", username);
                  localStorage.setItem("lumos_warehouseOid", warehouseOid);
                  localStorage.setItem("lumos_roleType", roleType);
                  localStorage.setItem("lumos_dutyPaid", dutyPaid);

                  if(photoPath!=null){
                    photoPath = url.baseUrl+url.master_generalprofile_document_v1_download+ photoPath;
                    localStorage.setItem("lumos_photoPath", photoPath);
                  }
                  if(roleOid ==='whadmin'){
                    this.$router.push("operation/dpledgerinfo");
                  // this.message = result.data.header.responseMessage;
                    this.message = "Login is successfull";
                  } else if(roleOid ==='admin'){
                    this.$router.push("settings/user");
                  // this.message = result.data.header.responseMessage;
                    this.message = "Login is successfull";
                  } else if(roleType==='Report'){
                    if(roleOid =="20220207-105349-iib5tFfeM0iz4Yt"){
                    this.$router.push("report/warehouseinfo");
                    // this.message = result.data.header.responseMessage;
                    this.message = "Login is successfull";
                    } else if(roleId =="ReportChairman"){ 
                      this.$router.push("report/warehousewisepurchase");
                    // this.message = result.data.header.responseMessage;
                      this.message = "Login is successfull";
                    } else{
                      this.$router.push("report/warehouseinfo");
                    // this.message = result.data.header.responseMessage;
                      this.message = "Login is successfull";
                    }
                  } else {
                    this.$router.push("/dashboard");
                    this.message = "Login is successfull";
                  }
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