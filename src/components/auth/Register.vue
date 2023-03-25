<template>
  <div class="app flex-row align-items-center login-cover">
    <div class="container-fluid">
      <b-row class="justify-content-center">
        <div class="col-md-5 col-12 col-sm-8">
          <div class="elevation-3 login-panel">
            <div class="logo text-center">
              <!-- <img src="../../../static/img/logo.png" alt="lumos-logo"> -->
            </div>
            <div class="login-form">
              <h4 class="text-center"> Sign Up</h4>
              <h6 class="text-red  text-center">{{message}}</h6>
               <v-app id="inspire">
                <v-form >
                  <v-text-field
                    label="Username"
                    required
                  ></v-text-field>
                  <v-text-field
                    label="Organization name"
                    required
                  ></v-text-field>
                  <v-text-field
                    label="Password"
                    required
                  ></v-text-field>
                </v-form>
                <div class="login-bottom-panel " >
                  <!-- <span class="float-left"> Create Account </span> -->
                  <router-link to="/">
                    Go to Sign in
                  </router-link>
                  <button class=" button-width float-right btn btn-primary" :disabled="buttonEnable" > Sign Up</button>
                </div>
              </v-app>
            </div>         
          </div>
        </div>    
      </b-row>
    </div>
  </div>
</template>