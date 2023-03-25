<template>
    <div class="container-fluid">
        <div class="loading" v-if="progressBar.loading"></div>
        <div class="row">
            <div class="col-12 col-md-6">
                <fieldset class="well mt-2 ml-4" >
                    <legend class="well-legend" style="background-color:#3f740d; border:none;"> <b>Purchase Reports</b></legend>
                    <div class="card-body row">
                        <div class="col-md-6 col-12"> 
                            <div>
                                <router-link tag="h6" :to= "{name:'Warehouse-wise Purchase'}" class="asset-profile-document">
                                    Warehouse-wise Purchase
                                </router-link>
                            </div>
                            <br>
                            <div>
                                <router-link tag="h6" :to= "{name:'Purchase Details'}" class="asset-profile-document">
                                    Purchase Details
                                </router-link>
                            </div>
                        </div>                        
                    </div>                        
                </fieldset>
            </div>
             <!-- <div class="col-12 col-md-6">
                <fieldset class="well" >
                    <legend class="well-legend bg-success"> <b> Date-wise Report</b></legend>
                    <div class="card-body">
                        <div>
                            <router-link tag="h6" :to= "{name:'Purchase Report By Date' , params:{id:'issue-date' }}" class="asset-profile-document">
                                By Issue Date
                            </router-link>
                        </div>                           
                    </div>
                </fieldset>
            </div> -->
        </div>
    </div>
</template>
<script>

import {url} from "@/utils/urls";
import {constant} from "@/utils/constant";
import {lumos_client} from "@/utils/lumos-client";
import axios from 'axios';
export default {
    data(){
        return{
            progressBar:{
                loading: false,
                show: false
            },
        }
    },    
}
</script>
<style scoped>
    .card-body{
        height: 180px;
        overflow: auto;
    }
</style>

