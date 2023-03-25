<template>
<div class="center">
  <div class="">
    <div class="loading" v-if="progressBar.loading"></div>
    <v-app  id="inspire" class="container-fluid" >
     <div class="">
        <div class="asset-top-panel">
            <div class="row col-12  nopadding">
                <router-link tag="button" class="btn btn-success ripple" style="background-color:#3f740d; border:none;" :to="{name:'New ProductDestroy'}">
                    <i class="fa fa-plus"></i>  
                    Product Destroy
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
                <td class="text-xs-left w-30">{{ props.item.pddBoe }}</td>
                <td class="text-xs-left w-35">{{ props.item.pddTotalQuantity }}</td>
                <td class="text-xs-left w-35">{{ props.item.pddTotalValue }}</td>
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
                { text: "Bill of entry No", value: "pddBoe", align: "left" },
                { text: "Total Quantity", value: "pddTotalQuantity", align: "left" },
                { text: "Total Value", value: "pddTotalValue", align: "left" }
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
        this.getProductDestroy()
    }, 
    methods:{
        updatePagination (pagination) {
            let limit = pagination.rowsPerPage
            let offset = (pagination.page - 1) * limit;
        },
        getProductDestroy(){
            this.progressBar.loading = true;
            this.progressBar.show = true;
            let body = {};
            let req = constant.getRequest(url.operation_boedestroy_v1_get_list, body);
            lumos_client.onPost(url.operation_boedestroy_v1_get_list, req)
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
