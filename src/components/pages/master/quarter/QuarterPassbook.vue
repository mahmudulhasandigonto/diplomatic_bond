<template>
<div class="center">
  <div class="">
    <div class="loading" v-if="progressBar.loading"></div>
    <v-app  id="inspire" class="container-fluid" >
     <div class="">
        <div class="asset-top-panel">
            <div class="row col-12  nopadding">
                <router-link tag="button" class="btn btn-success ripple" style="background-color:#3f740d; border:none;" :to="{name:'New QuarterPassbook'}">
                    <i class="fa fa-plus"></i>  
                    Add Quarter for Passbook
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
                :pagination.sync="pagination"
                :rows-per-page-items="rowsPerPageItems"
                @update:pagination="updatePagination"        
            >
            <template slot="items" slot-scope="props" >
                <td class="text-xs-left w-25">{{ props.item.oid }}</td>
                <td class="text-xs-left w-30">{{ props.item.dateFrom }}</td>
                <td class="text-xs-left w-30">{{ props.item.dateTo }}</td>
                <td class="text-xs-left w-20">
                <span v-if="props.item.status == 'Active'" style="background: #4caf50; color: white; padding: 2px; border-radius: 2px; ">{{props.item.status}}</span>
                <span v-if="props.item.status == 'Inactive'" style="background: #E53935; color: white; padding: 2px; border-radius: 2px; "> {{ props.item.status}} </span>
                </td>
                <td class="text-center w-5">
                    <router-link 
                    tag="span" 
                    :to="{name:'Update QuarterPassbook', params: { id: props.item.oid }}"
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
                { text: "Quarter Name", value: "oid", align: "left" },
                { text: "From Date", value: "dateFrom", align: "left" },
                { text: "To Date", value: "dateTo", align: "left" },
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
        this.getQuarter()
    }, 
    methods:{
        updatePagination (pagination) {
            let limit = pagination.rowsPerPage
            let offset = (pagination.page - 1) * limit;
        },
        getQuarter(){
            this.progressBar.loading = true;
            this.progressBar.show = true;
            let body = {oid: "quarterPassbook"};
            let req = constant.getRequest(url.master_quarter_v1_get_list, body);
            lumos_client.onPost(url.master_quarter_v1_get_list, req)
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
.center {
  margin: auto;
  width: 100%;
  border: 0px solid rgb(4, 58, 4);
  padding: 10px;
}

</style>
