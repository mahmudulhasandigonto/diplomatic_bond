<template>
  <header class="app-header navbar gradient-light-blue-cyan">
    <button class="navbar-toggler mobile-sidebar-toggler d-lg-none" type="button" @click="mobileSidebarToggle">
      <span class="navbar-toggler-icon"> </span>
    </button>
    <b-link to="/dashboard" class="navbar-brand"  >
		  <!--<img class="img-fluid" src="../../static/img/logo-diplomaticbond.png" style="height:28px" alt="">-->
      <p>DBAS</p>
    </b-link>
    <button class="navbar-toggler sidebar-toggler d-md-down-none mr-auto" type="button" @click="sidebarToggle">
      <span class="navbar-toggler-icon"></span>
    </button>

    <!-- search-box starts -->

    <!-- <div class="form-inline col-md-6 col-6 mr-2 my-lg-0">
      <input class="gradient-light-blue-cyan col-10 search-box" v-model="search" type="text" placeholder="Search by Product Serial" aria-label="Search">
      <button  class="btn btn-outline-header ripple my-sm-0" @click="serialSearch()" >
        <i class="fa fa-search"></i>
      </button>
    </div> -->

    <!-- search box end -->
    
    <!-- <div class="input-group">
      <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2">
      <div class="input-group-append">
        <button class="btn btn-outline-secondary" type="button">Button</button>
      </div>
    </div> -->
    <div class="user">
        <span class="text-white">  
           <i class="fa fa-user-circle" style="font-size: 13px;"></i>
        </span> 
        <b-dropdown id="ddown-right" :text=loginId variant="default text-white" class="dropdownMenu">
        <!-- <b-dropdown-item > {{this.$store.state.userName}} </b-dropdown-item>
        <b-dropdown-item > <b>{{this.$store.state.roleOid}}</b> </b-dropdown-item> -->
        <!-- <div class="header-dropdown elevation-3">
            <div class="text-center header-dropdown-item mt-4">
                <p> {{userName}}</p>
                <p><b> {{roleId}}</b></p>
            </div>
            <div class="header-button">
                <router-link tag="button" :to="{name:'Change Password'}" class="btn-header" > Change Password</router-link>
                <button  class=" btn-header float-right" v-on:click="logout"> Sign out</button>
            </div>          
        </div> -->
          <div class="header-dropdown elevation-3">
            <div class="text-left header-dropdown-item">
              <div class="row header-name" style="font-size:20px;">
                 <!-- <div v-if="this.entity.photoPath!=null" class="col-2 text-center " style="background-color:#1D3D00;">
                   <img :src="abc" width="300" height="300">
                </div> -->
                <div class="col-2 text-center " style="background-color:#1D3D00;">
                  <!-- <div v-if="this.photoPath!=null" class="col-2 text-center " style="background-color:#1D3D00;">
                   <img :src="photoPath" width="20" height="20">
                </div> -->
                  <i class="fa fa-user-circle-o" aria-hidden="true"></i>
                <!-- <img src="https://images.app.goo.gl/SPsjjeJSnBtYBb1g6" width="25" height="25"> -->
                </div>
                <div class="col-10">
                  <div >
                  
                  {{userName}}
                  <!-- {{photoPath}} -->
                  <!-- <img :src="this.photoPath" width="25" height="25"> -->
                  </div>
                </div>
              </div>
              <div class="row header-role">
                <div class="col-2 text-center" style="background-color:#1D3D00;">
                 <i class="fa fa-certificate" aria-hidden="true"></i>
                </div>
                <div class="col-10">
                  <div>
                   {{roleId}}
                  </div>                
                </div>
              </div>
              <div class="row header-password">
                <div class="col-2 text-center" style="background-image: linear-gradient(to right bottom, #1d3d00, #2a5802, #387501, #479401, #55b300);"> 
                 <i class="fa fa-key" aria-hidden="true"></i>
                </div>
                <div class="col-10">
                  <router-link tag="div" :to="{name:'Change Password'}"> Change Password</router-link>
                </div>
              </div>
              <div class="row header-sign-out">
                <div class="col-2 text-center" style="background-image: linear-gradient(to right bottom, #1d3d00, #2a5802, #387501, #479401, #55b300);">
                  <i class="fa fa-sign-out"></i>
                </div>
                <div class="col-10">
                  <div v-on:click="logout"> Sign out</div>
                </div>
              </div>

              <!-- <div class="row header-password">
                <div class="col-2 text-center">
                  <i class="fa fa-list-alt" aria-hidden="true"></i>
                </div>
                 <div class="col-10">
                  <div v-on:click="manual()"> Manual</div>
                </div>
              </div> -->
            </div>
            
            <!-- <div class="header-button">
                <router-link tag="button" :to="{name:'Change Password'}" class="btn-header" > Change Password</router-link>
                <button  class=" btn-header float-right" v-on:click="logout"> Sign out</button>
            </div>           -->
        </div>
       </b-dropdown>
    </div>
  </header>
</template>
<script>
import {url} from "@/utils/urls";
import {constant} from "@/utils/constant";
import {lumos_client} from "@/utils/lumos-client";

export default {
  name: 'c-header',
  data(){
    return{
        userName : localStorage.getItem("lumos_username"),
        loginId: localStorage.getItem("lumos_loginId"),
        roleId: localStorage.getItem("lumos_roleId"),
        search:'',
        photoPath: localStorage.getItem("lumos_photoPath")
    }
  },
  methods: {
    sidebarToggle (e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-hidden')
    },
    sidebarMinimize (e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-minimized')
    },
    mobileSidebarToggle (e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-mobile-show')
    },

    serialSearch(){
      if(this.search){
        this.$router.push(
          {
            name:'Asset By Product Serial', 
            params:{id:this.search, filter:'serial'}
          }
        )
        this.search =''
      }
    },
    manual(){
      // window.open("http://192.168.0.155:3000", '_blank')
      window.open(url.manualUrl, '_blank')
    },
    logout(){
        let body = {
            "operation": "Logout"
        };
        let req = constant.getRequest(url.authentication_user_v1_logout, body);
        lumos_client.onPost(url.authentication_user_v1_logout, req)
        .then(result => {
             if (result.data.header.responseCode === "200")
                this.$router.push('/')
        }).catch(error => {
            console.log(error);
        });
        localStorage.clear()
        // localStorage.removeItem("token");
        // localStorage.removeItem("lumos_menu");
        // localStorage.removeItem("lumos_dataJson");
        // localStorage.removeItem("lumos_loginId");
        // localStorage.removeItem("lumos_roleOid");
        // localStorage.removeItem("lumos_roleId");
        // localStorage.removeItem("lumos_username");

        // this.$store.state.loginId='';
        // this.$store.state.userName='';
        // this.$store.state.email= '';
        // this.$store.state.roleOid= '';
        // this.$store.state.roleId= '';
        // this.$store.state.dataJson= ''
    }
  }
}
</script>

<style scoped>
  .user a {
    text-align: center;
  }
  .header-dropdown{  
    background: rgb(255, 255, 255);
  }
  .header-dropdown-item{
      padding: 18px 15px 10px 15px;
      width: 300px;
      background: rgb(255, 255, 255);
      -webkit-box-shadow: 1px 3px 17px -2px rgba(0,139,210,1);
      -moz-box-shadow: 1px 3px 17px -2px rgba(0,139,210,1);
      box-shadow: 1px 3px 17px -2px rgba(0,139,210,1);
  }
  .header-name, .header-role, .header-password, .header-sign-out{
    padding: 0px 5px;
  }
  .header-name i, .header-role i, .header-password i, .header-sign-out i{
    color: white
  }

  .header-name .col-2, .header-role .col-2, .header-password .col-2, .header-sign-out .col-2{
    background: #0090D2;
    border-radius: 2px;
  }
  .header-password, .header-role, .header-sign-out{
    height: 30px;
    padding-top: 7px;
  }
  .header-password .col-10:hover, .header-sign-out .col-10:hover{
    background:  #3f740d;
    color: #ffffff;
    cursor: pointer;
    border-radius: 2px;
  }
  .btn-header{
      background: #ffffff;
      border: 1px solid #c6c6c6;
      text-decoration: none;
      color: rgb(49, 49, 49);
      padding: 5px 7px;
      font-size: 12px;
      border-radius: 2px;
  }
  .btn-header:hover{
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.24), 0 2px 2px 0 rgba(0,0,0,0.19);
  }
  .header-button{
      border-top: 1px solid whitesmoke;
      background: #F5F5F5;
      padding: 10px;
      margin-top: 10px;
  }
  .btn-outline-header{
    color: white;
    background-color: transparent;
    background-image: none;
    border-color: #4AB6D9;
  }
  .btn-outline-header:hover{
    background: #4AB6D9;
    color: white;
  }
  .form-inline .search-box{
    height: 30px;
    color: white;
  }
  .form-inline ::placeholder{
    color: #E0E0E0
  }
  @media only screen and (max-width: 600px) {
    .form-inline{
      display: none
    }
}
</style>
