<template>
    <div class="container-fluid">
        <div class="loading" v-if="progressBar.loading"></div>
        <div class="row">
            <div class="col-12 col-md-6">
                <fieldset class="well" >
                    <legend class="well-legend"> <b>Warehouse Reports</b></legend>
                    <div class="card-body row">
                        <div class="col-md-6 col-12"> 
                            <div>
                                <router-link tag="h6" :to= "{name:'Warehouse Report List'}" class="asset-profile-document">
                                    Warehouse List                      
                                </router-link>
                            </div>
                            <br>
                            <!--<div>
                                <router-link tag="h6" :to= "{name:'Warehouse Summary'}" class="asset-profile-document">
                                    Warehouse Summary                      
                                </router-link>
                            </div> -->                             
                        </div>                        
                    </div>                        
                </fieldset>
            </div>
             <div class="col-12 col-md-6">
                <fieldset class="well" >
                    <legend class="well-legend bg-success"> <b> Warehouse Details Report</b></legend>
                    <div class="card-body">
                        
                            <div>
                                <router-link tag="h6" :to= "{name:'Product wise Current Stock'}" class="asset-profile-document">
                                    Product wise Current Stock                      
                                </router-link>
                            </div>
                            <br>
                            <div>
                                <router-link tag="h6" :to= "{name:'Category wise Current Stock'}" class="asset-profile-document">
                                    Category wise Current Stock                      
                                </router-link>
                            </div> 
                        
                        <!-- <div>
                            <router-link tag="h6" :to= "{name:'Warehouse Report By Date' , params:{id:'issue-date' }}" class="asset-profile-document">
                                By Issue Date
                            </router-link>
                        </div>                            -->
                    </div>
                </fieldset>
            </div>
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

