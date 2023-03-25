<template>
    <div class="container-fluid">
        <div class="loading" v-if="progressBar.loading"></div>
        <div class="row">
            <div class="col-12 col-md-6">
                <fieldset class="well mt-2 ml-4" >
                    <legend class="well-legend" style="background-color:#3f740d; border:none;"> <b>Foreign Ministry Reports</b></legend>
                    <div class="card-body row">
                        <div class="col-md-6 col-12"> 
                            <div>
                                <router-link tag="h6" :to= "{name:'Exemption Details'}" class="asset-profile-document">
                                    Exemption Certificate details
                                </router-link>
                            </div>
                        </div>                        
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

