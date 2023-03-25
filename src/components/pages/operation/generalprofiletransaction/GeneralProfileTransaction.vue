<template>
  <div class="">
    <div class="loading" v-if="progressBar.loading"></div>
    <v-app  id="inspire" class="container-fluid" >
     <div class="">
        <div class="asset-top-panel">
            <!-- <div class="row col-12  nopadding">
                <router-link tag="button" class="btn btn-primary ripple" :to="{name:'New GeneralProfileTransaction', params: {type: 'new', pid: $route.params.id }}">
                    <i class="fa fa-plus"></i>  
                    New GeneralProfile Transaction
                </router-link>
                <span style="margin-left:auto;">
                    <input v-model="search" class="form-control" placeholder="Search...">                  
                </span>
            </div> -->
        </div>
        <div class="">
            <v-data-table
                :headers="headers"
                :items="entity"
                :search="search"
                :pagination.sync="pagination"
                :rows-per-page-items="rowsPerPageItems"
                @update:pagination="updatePagination"        
            >
            <template slot="items" slot-scope="props" >   
                <td class="text-xs-left w-10">{{ props.item.slNo }}</td>
                <td class="text-xs-left w-20">{{ props.item.nameOfHolder }}</td>
                <td class="text-xs-left w-15">{{ props.item.userType }}</td>
                <td class="text-xs-left w-10">{{ props.item.status }}</td>
                <td class="text-center w-5">
                    <router-link 
                    tag="span" 
                    :to="{name:'Update GeneralProfileTransaction', params: {type: 'update', id: props.item.oid, pid: $route.params.id }}"
                    class=" btn-icon-default button-tooltip mr-2">
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
</template>

<script>
import {url} from "@/utils/urls";
import {constant} from "@/utils/constant";
import {lumos_client} from "@/utils/lumos-client";
export default {
    name: "Bank",
    data(){
        return{
            entity:[],
            headers: [
                { text: "Passbook/Exemption Number", value: "slNo", align: "left" },
                { text: "Name", value: "nameOfHolder", align: "left" },
                { text: "Type", value: "userType", align: "left" },           
                { text: "Status", value: "status", align: "left" },
                { text: "", value: "", align: "center", sortable: false }
            ],
            pagination: {},
            rowsPerPageItems: [15, 20, 30, 50],
            search: "",
            progressBar: {
                loading: false,
                show: false
            },
            dialog:false,    

            size:"50px",
            snackbar: false,
            y: "bottom",
            x: "right",
            mode: "",
            color: "",
            timeout: 2000,
            messageText: "",

        }
    },
    created(){
        if(this.$route.params.id){ 
            this.getGeneralProfileTransaction(this.$route.params.id);
        }
        
    }, 
    methods:{
        updatePagination (pagination) {
            let limit = pagination.rowsPerPage
            let offset = (pagination.page - 1) * limit;
        },
        getGeneralProfileTransaction(Oid){
            this.progressBar.loading = true;
            this.progressBar.show = true;
            let body = {oid: Oid};
            let req = constant.getRequest(url.operation_generalprofiletransaction_v1_get_list, body);
            lumos_client.onPost(url.operation_generalprofiletransaction_v1_get_list, req)
            .then(result => {
                this.progressBar.loading = false;
                this.progressBar.show = false;
                this.entity = result['data']['body']['data'];
            }).catch(error => {
            });
        }
    }
}

</script>

<style scoped>
.assetCategory-list{
    background: white;
    padding: 10px 10px;
    width:auto;
}

</style>
