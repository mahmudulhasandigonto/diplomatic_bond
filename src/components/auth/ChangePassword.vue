<template>
  <div class="">
    <div class="container-fluid">
      <b-row class="justify-content-center">
        <div class="col-md-5 col-12 col-sm-8">
          <div class="elevation-3 login-panel">
            <div class="login-form">
              <h4 class="text-center"> Change Password</h4>
              <h6 class="text-red  text-center">{{message}}</h6>
                <v-app id="inspire">
                    <v-form @submit.prevent="login()">
                          <v-text-field
                            v-model="credentials.password"
                            label="Current Password"
                            :rules="passwordRules"
                            :type="passwordShow ? 'password' : 'text'"
                            :append-icon="passwordShow ? 'visibility' : 'visibility_off'"
                            @click:append="() => (passwordShow = !passwordShow)"
                            @keyup.enter="login()"
                            required
                            autofocus
                        ></v-text-field>
                          <v-text-field
                            v-model="credentials.newPassword"
                            label="New Password"
                            :rules="passwordRules"
                            :type="newPasswordShow ? 'password' : 'text'"
                            :append-icon="newPasswordShow ? 'visibility' : 'visibility_off'"
                            @click:append="() => (newPasswordShow = !newPasswordShow)"
                            v-validate="'required|min:6'"
                            :error-messages="errors.collect('name')"
                            data-vv-name="name"
                            required
                        ></v-text-field>
                        <v-text-field
                            v-model="confirmPassword"
                            label="Confirm Password"
                            v-validate="'min:6'"
                            :rules="passwordRules"
                            :type="confirmPasswordShow ? 'password' : 'text'"
                            :append-icon="confirmPasswordShow ? 'visibility' : 'visibility_off'"
                            @click:append="() => (confirmPasswordShow = !confirmPasswordShow)"
                            @keyup.enter="changePassword()"
                            required
                        ></v-text-field>
                    </v-form>
                    <div class="login-bottom-panel text-center" >
                        <button class=" btn btn-success" @click="changePassword()"  :disabled="buttonEnable" >Change Password</button>
                        <button class="btn btn-danger" @click="$router.go(-1)"> Cancel</button>
                    </div>
                      <div>
                    <v-snackbar v-model="snackbar" :bottom="y === 'bottom'" :left="x === 'left'" :multi-line="mode === 'multi-line'" :right="x === 'right'" :timeout="timeout" :top="y === 'top'" :vertical="mode === 'vertical'" :color="color">
                        {{messageText}}
                        <v-btn  flat @click="snackbar = false"> 
                        <i class="fa fa-window-close" aria-hidden="true"></i>   
                        </v-btn>
                    </v-snackbar>
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
        credentials:{}, 
        confirmPassword:'',
        message: "",
        show: false,
        passwordRules: [
        v => !!v || 'This field is required' ],
        passwordShow: 'password',
        newPasswordShow: 'password',
        confirmPasswordShow: 'password',
        dictionary: {
          attributes: {
            email: 'E-mail Address'
          },
          custom: {
            name: {
              required: () => 'Password can not be empty',
              min: 'Password can not be less than 6'
            },
          }
        },
        size:"50px",
        snackbar: false,
        y: "bottom",
        x: "right",
        mode: "",
        color: "",
        timeout: 3000,
        messageText: "",
        $_veeValidate: {
          validator: 'new'
        },
    };
  },
  computed:{
        buttonEnable(){
            if( !this.credentials.password || this.credentials.newPassword !== this.confirmPassword  ){
                return true
            }
            else{
                return false
            }
        },
  },
  mounted(){
     this.$validator.localize('en', this.dictionary)
  },
  methods: {
    changePassword() {
       // if(this.username && this.password){
             let body = {
                loginid: localStorage.getItem("lumos_loginId"),
                password: this.credentials.password,
                newPassword: this.credentials.newPassword
            };
            let req = constant.getRequest(url.authentication_user_v1_changePassword, body);
            lumos_client
            .onPost(url.authentication_user_v1_changePassword, req)
            .then(result => {
             this.snackbar = true
            if (result.data.header.responseCode === "200"){
                this.color = "success"
                this.messageText = "Password changed successfully. Please login again"
                setTimeout( () => this.$router.push({ path: '/'}), 3000);
            }else{
                 this.color = "red"
                this.messageText = "Current password doesn't match"
            }
            })
            .catch(error => {
                this.$log.error(error);
            });

       // }
     
    }
  }
}

</script>

<style scoped>
</style>


