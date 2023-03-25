<template>

    <div class="container-fluid">
        <div class="loading" v-if="progressBar.loading"></div>
        <div class="row">
            <div class="col-12">
                 <v-app  id="inspire" class="" >
                    <div class="">
                        <div class="asset-top-panel">
                            <div class="row col-12  nopadding">
                                <router-link tag="button" class="btn btn-primary ripple"  style="background-color:#3f740d; border:none;" :to="{name:'New Role'}">
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
                                <td class="text-xs-left">{{ props.item.roleId }}</td>
                                <td class="text-xs-left">
                                    <span v-if="props.item.status == 'Active'" style="background: #4caf50; color: white; padding: 2px; border-radius: 2px; ">{{props.item.status}}</span>
                                    <span v-if="props.item.status == 'Inactive'" style="background: #E53935; color: white; padding: 2px; border-radius: 2px; "> {{ props.item.status}} </span>
                                </td>
                                <td class="text-center">  
                                    <router-link 
                                    tag="span" 
                                    :to="{name:'Update Role', params: { id: props.item.oid }}"
                                    class="btn-icon-default button-tooltip mr-2">
                                    <i class="fa fa-edit" aria-hidden="true"></i>
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
                { text: "Role", value: "roleId", align: "left" },
                { text: "Status", value: "status", align: "left" },
                { text: "Actions", value: "actions", align: "center", sortable: false }
            ],
            search: "",
            dialog: false,
            progressBar:{
                loading: false,
                show: false
            },
            size:"50px",
            snackbar: false,
            y: "bottom",
            x: "right",
            mode: "",
            color: "",
            timeout: 2000,
        }
    },
    mounted(){
        this.getRoleList()
    },
    methods:{
        getRoleList(){
            this.progressBar.loading = true;
            this.progressBar.show = true;
            let body = {};
            let req = constant.getRequest(url.authorization_user_v1_get_roleList, body);
            lumos_client.onPost(url.authorization_user_v1_get_roleList, req)
            .then(result => {
                this.progressBar.loading = false;
                this.progressBar.show = false;
                this.entity = result['data']['body']['data'];
            }).catch(error =>{
            });

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
