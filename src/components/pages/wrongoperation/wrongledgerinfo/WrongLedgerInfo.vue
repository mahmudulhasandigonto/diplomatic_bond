<template>
  <div class="">
    <div class="loading" v-if="progressBar.loading"></div>
    <v-app  id="inspire" class="container-fluid" >
     <div class="">
        <!-- <div class="asset-top-panel">
            <div class="row col-12  nopadding">
                <router-link tag="button" v-if="showButton()" class="btn btn-success ripple" style="background-color:#3f740d; border:none;" :to="{name:'New LedgerInfo'}">
                    <i class="fa fa-plus"></i>  
                    Sell
                </router-link>
                <span style="margin-left:auto;">
                    <input v-model="search" class="form-control" placeholder="Search...">                  
                </span>
            </div>
        </div> -->
       
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
                <td class="text-xs-left w-20">{{ props.item.nameofholder }}</td>
                <td class="text-xs-left w-20">{{ props.item.warehouseName }}</td>
                <td class="text-xs-left w-20">{{ props.item.totalQuantity }}</td>
                <td class="text-xs-left w-10">{{ props.item.totalValue }}</td>
                <td class="text-center w-5">
                    <!-- <router-link 
                    tag="span" 
                    :to="{name:'Update LedgerInfo', params: { id: props.item.oid }}"
                    class=" btn-icon-default button-tooltip mr-2">
                    <i class="fa fa-edit" aria-hidden="true"></i>
                    <span class="button-tooltiptext">Edit</span>
                    </router-link> -->
                    <router-link
                        tag="span"
                        :to="{name:'WrongLedgerInfo View', params: { id: props.item.oid }}"
                        class=" btn-icon-default button-tooltip">
                        <i class="fa fa-eye" aria-hidden="true" style="color:steelblue"></i>
                        <span class="button-tooltiptext">View Sales</span>
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
                { text: "Holder Name", value: "nameOfHolder", align: "left" },
                { text: "Warehouse Name", value: "warehouseName", align: "left" },                
                { text: "Total Quantity", value: "totalQuantity", align: "left" },
                { text: "Total Value", value: "totalValue", align: "left" },                
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
        this.getLedgerInfo()
    }, 
    methods:{
        updatePagination (pagination) {
            let limit = pagination.rowsPerPage
            let offset = (pagination.page - 1) * limit;
        },
        showButton(){
            if(localStorage.getItem("lumos_roleOid")=='aroofficer' || localStorage.getItem("lumos_roleOid")=='roofficer' || localStorage.getItem("lumos_roleOid") == 'warehouseadmin' || localStorage.getItem("lumos_roleOid") == 'warehouseoperation'){
                return true;
            } else {
                return false;
            }
        },
        getLedgerInfo(){
            this.progressBar.loading = true;
            this.progressBar.show = true;
            let body = {salesStatus: 'wrong'};
            let req = constant.getRequest(url.operation_ledgerinfo_v1_get_list, body);
            lumos_client.onPost(url.operation_ledgerinfo_v1_get_list, req)
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
