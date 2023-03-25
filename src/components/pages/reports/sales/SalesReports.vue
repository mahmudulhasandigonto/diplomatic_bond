<template>
    <div class="container-fluid">
        <div class="loading" v-if="progressBar.loading"></div>
        <div class="row">
            <div class="col-12 col-md-6">
                <fieldset class="well mt-2 ml-4" >
                    <legend class="well-legend" style="background-color:#3f740d; border:none;"> <b>Sales Reports</b></legend>
                    <div class="card-body row">
                        <div class="col-md-6 col-12"> 
                            <!-- <div>
                                <router-link tag="h6" :to= "{name:'Sales Report List'}" class="asset-profile-document">
                                    Sales List                      
                                </router-link>
                            </div> -->
                            <div>
                                <router-link tag="h6" :to= "{name:'Warehouse-wise Sales'}" class="asset-profile-document">
                                    Warehouse-wise Sales                      
                                </router-link>
                            </div>
                            <br>
                            <div>
                                <router-link tag="h6" :to= "{name:'Sales Details'}" class="asset-profile-document">
                                    Sales Details                      
                                </router-link>
                            </div>
                             <br>
                            <div>
                                <router-link tag="h6" :to= "{name:'Invoice-wise Sales'}" class="asset-profile-document">
                                    Invoice-wise Sales                      
                                </router-link>
                            </div>
                            <br>
                            <div>
                                <router-link tag="h6" :to= "{name:'Date-wise Invoice'}" class="asset-profile-document">
                                    Date-wise Invoice                      
                                </router-link>
                            </div>  
                            <br> 
                            <div v-if='showDutyPaid()'>
                                <router-link tag="h6" :to= "{name:'Duty-paid Sales'}" class="asset-profile-document">
                                    Duty paid Sales                      
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
                            <router-link tag="h6" :to= "{name:'Sales Report By Date' , params:{id:'issue-date' }}" class="asset-profile-document">
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
    mounted() {
        // window.addEventListener('online',  this.updateOnlineStatus);
        // window.addEventListener('offline', this.updateOnlineStatus);
    },
    methods: {
            showDutyPaid(){
                if(localStorage.getItem("lumos_dutyPaid") == "1"){
                    return true;
                } else{
                    return false;
                }
            }
    }  
}
</script>
<style scoped>
    .card-body{
        height: 200px;
        overflow: auto;
    }
</style>


