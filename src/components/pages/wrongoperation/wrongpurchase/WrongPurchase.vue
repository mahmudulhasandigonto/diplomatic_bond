<template>
  <div class="">
    <div class="loading" v-if="progressBar.loading"></div>
    <v-app  id="inspire" class="container-fluid" >
     <div class="">       
        <div class="">
            <v-data-table
                :headers="headers"
                :items="entity"
                :search="search"
                :pagination.sync="pagination"
                :rows-per-page-items="rowsPerPageItems"
                @update:pagination="updatePagination"        
            >
                 
            <template slot="items" slot-scope="props">
                <td class="text-xs-left w-20">{{ props.item.billOfEntryNo }}</td>
                <td class="text-xs-left w-20">{{ props.item.billOfEntryOfficeCode }}</td>
                <td class="text-xs-left w-20">{{ props.item.billOfEntryDate }}</td>
                <td class="text-xs-left w-15">{{ props.item.totalQuantity }}</td>
                <td class="text-xs-left w-15">{{ props.item.totalValue }}</td> 
                <td class="text-center w-6">
                    <router-link
                        tag="span"
                        :to="{name:'WrongPurchase View', params: { id: props.item.oid }}"
                        class=" btn-icon-default button-tooltip">
                        <i class="fa fa-eye" aria-hidden="true" style="color:steelblue"></i>
                        <span class="button-tooltiptext">View Purchase</span>
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
                { text: "Bill Of Entry No", value: "billOfEntryNo", align: "left" },
                { text: "Bill Of Entry Office", value: "billOfEntryOfficeId", align: "left" },
                { text: "Bill Of Entry Date", value: "billOfEntryDate", align: "left" },
                { text: "Total Quantity", value: "totalQuantity", align: "left" },
                { text: "Total Price", value: "totalValue", align: "left" },
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
        this.getPurchase()
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
        getPurchase(){
            this.progressBar.loading = true;
            this.progressBar.show = true;
            let body = {purchaseStatus: 'wrong'};
            let req = constant.getRequest(url.operation_purchase_v1_get_list, body);
            lumos_client.onPost(url.operation_purchase_v1_get_list, req)
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
