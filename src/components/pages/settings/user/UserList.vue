<template>
    <div class="container-fluid">
        <div class="loading" v-if="progressBar.loading"></div>
        <div class="row">
            <div class="col-12">
                 <v-app  id="inspire" class="" >
                    <div class="">
                        <div class="asset-top-panel">
                            <div class="row col-12  nopadding">
                                <router-link tag="button" class="btn btn-primary ripple" style="background-color:#3f740d; border:none;" :to="{name:'New User'}">
                                    <i class="fa fa-plus"></i>
                                    New
                                </router-link>

                                <span style="margin-left:auto;">
                                    <input v-model="search" class="form-control" placeholder="Search...">                  
                                </span>
                            </div>
                        </div>
                        <div class="">         
                            <v-data-table
                                :headers="headers"
                                :items="entity"
                                :search="search"  
                                hide-actions          
                            >
                            <template slot="items" slot-scope="props" >
                                <td class="text-xs-left">{{ props.item.name }}</td>
                                <td class="text-xs-left">{{ props.item.loginId }}</td>
                                <td class="text-xs-left">{{ props.item.email }}</td>
                                <td class="text-xs-left">{{ props.item.roleId }}</td>
                                <!-- <td class="text-xs-left status-switch">
                                    {{ props.item.status }}
                                        <label class="switch switch-3d switch-xs switch-success-outline-alt">
                                            <input type="radio" class="switch-input" value="Active" v-model="props.item.status" @input="status = 'Active' ,changeStatus(props.item,status)" >
                                            <span class="switch-label"></span>
                                            <span class="switch-handle"></span>
                                        </label>
                                        <label class="switch switch-3d switch-xs switch-danger-outline-alt">
                                            <input type="radio" class="switch-input" value="Inactive" v-model="props.item.status"  @input="status = 'Inactive' , changeStatus(props.item, status)">
                                            <span class="switch-label"></span>
                                            <span class="switch-handle"></span>
                                        </label>
                                    &nbsp;&nbsp;&nbsp;
                                  
                                </td> -->
                                <td class="text-center">  
                                <router-link 
                                tag="span" 
                                :to="{name:'Update User', params: { id: props.item.oid }}"
                                class="btn-icon-default button-tooltip mr-2">
                                <i class="fa fa-edit" aria-hidden="true"></i>
                                <span class="button-tooltiptext">Edit</span>
                                </router-link>
                                <span class="btn-icon-default button-tooltip" @click="dialog = true , userdata = props.item" >
                                
                                <i class="fa fa-key"></i>
                                <span class="button-tooltiptext">Reset Password</span>
                                </span>
                                </td>
                            </template>
                            <v-alert slot="no-results-text" :value="true"   icon="warning">
                                Your search for " {{ search }} " found no results.
                            </v-alert>
                            </v-data-table>
                        </div>
                        <v-dialog v-model="dialog" max-width="290">
                        <v-card>
                            <v-card-title> <b> Reset Password </b>
                            <v-text-field label=" New Password" v-model="resetPassword" ></v-text-field>
                          
                            <v-card-actions>
                                <v-spacer></v-spacer>
                    
                                <v-btn
                                color="green darken-1"
                                flat="flat"
                                @click.native="passwordReset(userdata, resetPassword)"
                                >
                                Yes
                                </v-btn>
                    
                                <v-btn
                                color="red darken-1"
                                flat="flat"
                                @click.native="dialog = false"
                                >
                                No
                                </v-btn>
                            </v-card-actions>
                        </v-card-title>
                        </v-card>
                    </v-dialog>
                    </div>
                    <v-snackbar v-model="snackbar" :bottom="y === 'bottom'" :left="x === 'left'" :multi-line="mode === 'multi-line'" :right="x === 'right'" :timeout="timeout" :top="y === 'top'" :vertical="mode === 'vertical'" :color="color">
                        {{messageText}}
                        <v-btn  flat @click="snackbar = false"> 
                        <i class="fa fa-window-close" aria-hidden="true"></i>   
                        </v-btn>
                    </v-snackbar>
                </v-app>
            </div>
        </div>
    </div>
</template>
<script>
import {url} from "@/utils/urls";
import {constant} from "@/utils/constant";
import {lumos_client} from "@/utils/lumos-client";
import * as _ from 'underscore';
export default {
    name: "AssetCategory",
    data(){
        return{
            entity:[],
            headers: [
                { text: "User Name", value: "name", align: "left" },
                { text: "Login ID", value: "loginId", align: "left" },
                { text: "Email", value: "email", align: "left" },
                { text: "Role", value: "roleId", align: "left" },
                // { text: "Status", value: "status", align: "left" },
                { text: "Actions", value: "actions", align: "center", sortable: false }
            ],
            search: "",
            dialog: false,
            resetPassword:'',
            retypePassword:'',
            passwordMessage: "",
            size:"50px",
            snackbar: false,
            y: "bottom",
            x: "right",
            mode: "",
            color: "",
            timeout: 2000,
            messageText: "",
            progressBar:{
                loading: false,
                show: false
            },
        }
    },
    mounted(){
        this.getUserList()
    },
    methods:{
    getUserList(){
        this.progressBar.loading = true;
        let body = {};
        let req = constant.getRequest(url.authentication_user_v1_get_list, body);
        lumos_client.onPost(url.authentication_user_v1_get_list, req)
        .then(result => {
            this.entity = result['data']['body']['data']
            this.progressBar.loading = false;
        }).catch(error => {
        });
    },
    passwordReset(userdata, resetPassword){
        if(this.resetPassword){
            var entity = userdata
            entity.password = resetPassword
            this.dialog = false
            let http_url = url.authentication_user_v1_update        
            let body = this.modifier(entity); 
            let req = constant.getRequest(http_url, body); 
            lumos_client.onPost(http_url, req)
            .then(result => {            
                    let res = result.data.header.responseCode;
                    this.resetPassword = ""
                    this.retypePassword = ""
                    this.snackbar = true;
                if (res != "200"){
                    this.color = "red"; 
                    this.messageText = " Couldn't Reset Password";
                    return;
                }else {
                    this.color = "success" 
                    this.messageText = "Password Reset Successfully";
                }
            }).catch(error => {
                this.$log.error(error)
            }) 
            } else {
                this.passwordMessage = "Retype Password doesn't match"                
            }
        
        
    },
    changeStatus(item, status){  
        var entityList = item
        entityList.status = status
        let http_url = url.authentication_user_v1_update        
        let body = entityList;
        let req = constant.getRequest(http_url, item); 
        lumos_client.onPost(http_url, req)
        .then(result => {            
            let res = result.data.header.responseCode;
            this.snackbar = true;
            if (res != "200"){
                this.color = "red"; 
                this.messageText = " Couldn't Update Status";
                return;
            }else {
                this.color = "success" 
                this.messageText = "Status Updated Successfully";
                this.getUserList()
            }
        }).catch(error => {
            this.$log.error(error)
        }) 

    },
    modifier(entity){
        var obj = _.clone(entity);
        return obj;
    },
    }
}
</script>

<style scoped>
.assetCategory-list{
    background: white;
    padding: 10px 10px;
    width:auto;
}
.status-switch label{
    margin-bottom: 0rem !important;
    align-items: center

}

</style>>
