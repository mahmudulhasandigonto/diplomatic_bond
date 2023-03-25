<template>
  <div class="">
    <div class="loading" v-if="progressBar.loading"></div>
    <v-app  id="inspire" class="container-fluid" >
     <div class="">
        <div class="asset-top-panel">
            <div class="row col-12  nopadding">
                <router-link tag="button" class="btn btn-success ripple" style="background-color:#3f740d; border:none;" :to="{name:'New Office'}">
                    <i class="fa fa-plus"></i>  
                    Add new Office
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
                <td class="text-xs-left w-11">{{ props.item.code }}</td>
                <td class="text-xs-left w-23">{{ props.item.name }}</td>
                <td class="text-xs-left w-30">{{ props.item.address1 }}</td>
                <td class="text-xs-left w-30">{{ props.item.address2 }}</td>
                <td class="text-center w-5">
                    <router-link 
                    tag="span" 
                    :to="{name:'Update Office', params: { id: props.item.oid }}"
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
                { text: "Office Code", value: "code", align: "left" },
                { text: "Name of the Office", value: "name", align: "left" },
                { text: "First Address", value: "address1", align: "left" },
                { text: "Second Address", value: "address2", align: "left" },
                { text: "", value: "", align: "center", sortable: false }
            ],
            pagination: {},
            rowsPerPageItems: [15, 50, 100, 150],
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
        this.getOffice()
    }, 
    methods:{
        updatePagination (pagination) {
            let limit = pagination.rowsPerPage
            let offset = (pagination.page - 1) * limit;
        },
        getOffice(){
            this.progressBar.loading = true;
            this.progressBar.show = true;
            let body = {};
            let req = constant.getRequest(url.master_office_v1_get_list, body);
            lumos_client.onPost(url.master_office_v1_get_list, req)
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
