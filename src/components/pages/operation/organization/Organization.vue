<template>
    <div>
        <div class="loading" v-if="progressBar.loading"></div>
        <div class="container-fluid">
            <div class="row">
                <div class="col-12 col-xl-12">
                    <v-app  id="inspire" class="" >
                        <div class="">
                            <div class="asset-top-panel">
                                <!-- <div class="row col-12  nopadding"> -->
                                    <!-- <router-link tag="button" class="btn btn-success ripple" style="background-color:#3f740d; border:none;" :to="{name:'New Organization'}">
                                        <i class="fa fa-plus"></i> 
                                        Create Organization
                                    </router-link> -->
                                    <!-- <span style="margin-left:auto;">
                                        <input v-model="search" class="form-control" placeholder="Search...">       
                                    </span> -->
                                <!-- </div> -->
                            </div>
                            <div class="">          
                                <v-data-table
                                    :headers="headers"
                                    :items="entity"
                                    :search="search"  
                                    hide-actions          
                                >
                                <template slot="items" slot-scope="props" >
                                    <td class="text-xs-left">{{ props.item.orgName }}</td>
                                    <td class="text-xs-left">{{ props.item.address }}</td>      
                                    <td class="text-xs-left status-switch">
                                        {{ props.item.status }}
                                        <label class="switch switch-3d switch-xs switch-success-outline-alt">
                                            <input type="radio" class="switch-input" value="Active" v-model="props.item.status" @click="dialogStatusChange=true, item=props.item" :disabled="props.item.status=='Active'">
                                            <span class="switch-label"></span>
                                            <span class="switch-handle"></span>
                                        </label>
                                        <label class="switch switch-3d switch-xs switch-danger-outline-alt">
                                            <input type="radio" class="switch-input" value="Inactive" v-model="props.item.status"  @click="dialogStatusChange=true, item=props.item" :disabled="props.item.status=='Inactive'">
                                            <span class="switch-label"></span>
                                            <span class="switch-handle"></span>
                                        </label>
                                    </td>
                                    <td class="text-center w-5">  
                                    <router-link 
                                        tag="span" 
                                        :to="{name:'Update Organization', params: { id: props.item.oid }}"
                                        class="btn-icon-default button-tooltip">
                                        <i class="fa fa-edit" aria-hidden="true" ></i>
                                        <span class="button-tooltiptext">Edit</span>
                                    </router-link>
                                    </td>
                                </template>
                                <v-alert slot="no-results-text" :value="true"   icon="warning">
                                    Your search for " {{ search }} " found no results.
                                </v-alert>
                                </v-data-table>
                            </div>
                        </div>
                        <v-dialog v-model="dialogStatusChange" max-width="400">
                            <v-card>
                                <v-card-text class="text-center">
                                    <h4> Are you sure you want to change status?</h4>
                                    <hr>
                                    <v-btn color="green darken-2" flat="flat" @click="changeOrganizationStatus(item)" >Yes</v-btn> 
                                    <v-btn color="purple" flat="flat" @click.native="toggleStatus(item)">No</v-btn>
                                </v-card-text>
                            </v-card>
                        </v-dialog>
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
    </div>
</template>

<script>
import {url} from "@/utils/urls";
import {constant} from "@/utils/constant";
import {lumos_client} from "@/utils/lumos-client";
export default {
    name: "Organization",
    data(){
        return{
            entity:[],
            headers: [
                { text: "Organization Name", value: "orgName", align: "left" },
                { text: "Address", value: "address", align: "left" },
                { text: "Status", value: "status", align: "left" },
                { text: "", value: "", align: "center", sortable: false }
            ],
            search: "",
            dialogStatusChange: false,
            snackbar: false,
            y: "bottom",
            x: "right",
            mode: "",
            color: "",
            timeout: 2000,
            messageText: "",
            progressBar: {
                loading: false,
                show: false
            },
        }
    },
    mounted(){
        this.getOrganization()
    },
    methods:{
        getOrganization(){
            this.progressBar.loading = true;
            this.progressBar.show = true;
            let body = {};
            let req = constant.getRequest(url.meta_organization_v1_get_list, body);
            lumos_client.onPost(url.meta_organization_v1_get_list, req)
            .then(result => {
                this.progressBar.loading = false;
                this.progressBar.show = false;
                this.entity = result['data']['body']['data'];
            }).catch(error => {
            });
        },
        changeOrganizationStatus(item){  
            this.dialogStatusChange = false
            let http_url = url.meta_organization_v1_update        
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
                    this.getOrganization()
                }
            }).catch(error => {
                this.$log.error(error)
            }) 
        },
        toggleStatus(item){
            this.dialogStatusChange = false
            item.status = item.status == 'Active'? 'Inactive' : 'Active';
        }
    }
}
</script>

<style scoped>
</style>