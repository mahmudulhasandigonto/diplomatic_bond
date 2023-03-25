<template>
  <div class="">
    <div class="loading" v-if="progressBar.loading"></div>
    <v-app  id="inspire" class="container-fluid" >
     <div class="">
        <div class="asset-top-panel">
            <div class="row col-12  nopadding">
                <router-link tag="button" class="btn btn-primary ripple" :to="{name:'New GeneralProfileArticles'}">
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
                :pagination.sync="pagination"
                :rows-per-page-items="rowsPerPageItems"
                @update:pagination="updatePagination"        
            >
            <template slot="items" slot-scope="props" >
                <td class="text-xs-left w-25">{{ props.item.profileName }}</td>
                <td class="text-xs-left w-25">{{ props.item.productName }}</td>
                <td class="text-xs-left w-20">{{ props.item.quantity }}</td>
                <td class="text-xs-left w-20">{{ props.item.weight }}</td>
                <td class="text-xs-left w-20">{{ props.item.pieces }}</td>
                <td class="text-xs-left w-10">{{ props.item.valueUSD }}</td>
                <td class="text-xs-left w-10">{{ props.item.consumeQuantity }}</td>
                <td class="text-xs-left w-10">{{ props.item.consumeWeight }}</td>
                <td class="text-xs-left w-10">{{ props.item.consumePieces }}</td>
                <td class="text-xs-left w-10">{{ props.item.consumeUSD }}</td>
                <td class="text-center w-5">
                    <router-link 
                    tag="span" 
                    :to="{name:'Update GeneralProfileArticles', params: { id: props.item.oid }}"
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
                { text: "Profile Name", value: "profileName", align: "left" },
                { text: "Product Name", value: "productName", align: "left" },
                { text: "Quantity", value: "quantity", align: "left" },
                { text: "Weight", value: "weight", align: "left" },
                { text: "Pieces", value: "pieces", align: "left" },
                { text: "Value USD", value: "valueUSD", align: "left" },
                { text: "Consume Quantity", value: "consumeQuantity", align: "left" },
                { text: "Consume Weight", value: "consumeWeight", align: "left" },
                { text: "Consume Pieces", value: "consumePieces", align: "left" },
                { text: "Consume USD", value: "consumeUSD", align: "left" },
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
        this.getGeneralProfileArticles()
    }, 
    methods:{
        updatePagination (pagination) {
            let limit = pagination.rowsPerPage
            let offset = (pagination.page - 1) * limit;
        },
        getGeneralProfileArticles(){
            this.progressBar.loading = true;
            this.progressBar.show = true;
            let body = {};
            let req = constant.getRequest(url.operation_generalprofilearticles_v1_get_list, body);
            lumos_client.onPost(url.operation_generalprofilearticles_v1_get_list, req)
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
