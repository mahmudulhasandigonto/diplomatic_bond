<template>
    <div class="asset-form">
        <div class="loading" v-if="progressBar.loading"></div>
            <div class="container-fluid">
                <!-- <router-link :to="{ name: 'QuarterPassbook' }"  tag="span" class="button-tooltip pt-1 float-left" >
                    <i class="fa fa-arrow-circle-left" style="font-size:28px; color: white; background-image: radial-gradient(circle, #55b300, #479401, #387501, #2a5802, #1d3d00);" aria-hidden="true"></i>
                    <span class="button-tooltiptext">Back</span>
                </router-link>
                <br> -->
                <router-link :to="{ name: 'QuarterPassbook' }"  tag="span" class="button-tooltip pt-1 float-left" >
                    <i class="fa fa-arrow-circle-left" style="font-size:28px; color: green;" aria-hidden="true"></i>
                    <span class="button-tooltiptext">Back</span>
                </router-link>
                <form class="form-group" @submit.prevent="quarterSaveUpdate()">
                    <div class="row justify-content-center">
                        <div class="col-12 col-md-6 col-xl-6">
                            <div class="new-quarter-passbook">
                                <div class="mt-3 ml-3 mr-3 mb-3">
                                    <div class="mb-3">
                                        <label class="required"> <b>Quarter Name</b> (Hints: 01-january-2021)</label>
                                        <input class="form-control mb-1" v-model="entity.oid"  placeholder="Passbook Quarter" v-validate="'required'" name="Quarter Name"/>
                                        <!-- <model-list-select class="form-control mb-1" :list="quarterList" v-model="entity.oid" option-value="oid" optionText="oid" placeholder="Select Quarter" v-validate="'required'" name="Quarter"/> -->
                                        <small v-show="errors.has('Quarter Name')" class="help is-danger"><i v-show="errors.has('Quarter Name')" class="fa fa-exclamation-circle"></i>{{ errors.first('Quarter Name') }} </small>
                                    </div>
                                    <div class="mb-3">
                                        <label class="required"> <b>From Date</b></label>
                                        <datepicker placeholder="Date From" :bootstrap-styling = "true" calendar-class="filter-date" :clear-button="true" clear-button-icon="fa fa-times-circle" v-model="entity.dateFrom"  name="From Date"></datepicker>
                                    </div>
                                    <div class="mb-3">
                                        <label class="required"> <b>To Date</b></label>
                                        <datepicker placeholder="Date To" :bootstrap-styling = "true" calendar-class="filter-date" :clear-button="true" clear-button-icon="fa fa-times-circle" v-model="entity.dateTo"  name="To Date"></datepicker>
                                    </div>
                                    <div class="mb-3">
                                        <label class=" required" > <b> Status </b></label>
                                        <model-list-select class="form-control mb-1" :list="statusList" v-model="entity.status" option-value="status" optionText="statusText" placeholder="Status" v-validate="'required'" name="User Status"/>
                                        <small v-show="errors.has('User Status')" class="help is-danger"><i v-show="errors.has('User Status')" class="fa fa-exclamation-circle"></i>{{ errors.first('User Status') }} </small>
                                    </div>
                                    <div class="text-center mt-4">
                                        <button class="btn btn-success button-width ripple mr-3" @submit.prevent="quarterSaveUpdate()">
                                            {{buttonText}}
                                        </button>
                                        <router-link tag="button" class="btn btn-danger button-width ripple" :to="{name:'QuarterPassbook'}" >
                                            Cancel
                                        </router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> 
                </form>              
            </div>
        <v-app>
            <v-flex>
                <div>
                    <v-snackbar v-model="snackbar" :bottom="y === 'bottom'" :left="x === 'left'" :multi-line="mode === 'multi-line'" :right="x === 'right'" :timeout="timeout" :top="y === 'top'" :vertical="mode === 'vertical'" :color="color">
                        {{messageText}}
                        <v-btn  flat @click="snackbar = false"> 
                        <i class="fa fa-window-close" aria-hidden="true"></i>   
                        </v-btn>
                    </v-snackbar>
                </div>
            </v-flex>
        </v-app>
</div>    
</template>
<script>
import {url} from "@/utils/urls";
import {constant} from "@/utils/constant";
import {lumos_client} from "@/utils/lumos-client";
import { ModelListSelect} from 'vue-search-select';
import contact from '@/components/Contact.vue';
import contactData from '@/components/ContactData.vue';
import Datepicker from "vuejs-datepicker/dist/vuejs-datepicker";
import * as _ from 'underscore';

export default {
    components: {
        ModelListSelect, Datepicker, contact, contactData
    },
    data(){
        return{
            entity:{
                quarterType: ""
               // branchmanageroid: "",
               // relationshipmanageroid: "",
               // type: ""
            },
            statusList:[
                {status:'Active', statusText:'Active'},
                {status:'Inactive', statusText:'Inactive'},              
            ],
            contactList:[],
            typeList:[],
            buttonText:'',
            quarterList:[
                { name : "1st-quarter" }, 
                { name : "2nd-quarter" },
                { name : "3rd-quarter" },
                { name : "4rth-quarter" }
            ],
            progressBar:{
                loading: false,
                show: false
            },
            size:"50px",
            snackbar: false,
            y: "bottom",
            x: "right",
            mode: "",
            color: "",
            timeout: 2000,
            messageText: "",
            tabIndex: 0
        }
    },
    mounted(){
        this.init()
    },
    methods:{
        updateSnackbarInfo(variable){
            this.snackbar = true;
            this.color = variable.color;
            this.messageText = variable.messageText;
            //this.getContactList();
        },
        init(){
            //this.getContactList();
            if(this.$route.params.id){
                this.buttonText = "Update"
                this.getQuarter(this.$route.params.id)
            } else {
                this.buttonText = "Save"
            }      
        },
        getQuarter(oid){
            this.progressBar.loading = true;
            this.progressBar.show = true;
            let body = {oid: oid, quarterType: "quarterPassbook"};
            let req = constant.getRequest(url.master_quarter_v1_get_by_oid, body);
            lumos_client.onPost(url.master_quarter_v1_get_by_oid, req)
            .then(result => {
                this.progressBar.loading = false;
                this.progressBar.show = false;
                this.entity = result['data']['body'];
                this.oidModifier(this.entity);
            }).catch(error =>{
            });
        },
        quarterSaveUpdate(){
            this.$validator.validateAll().then(result => {
                if (!result){
                    return;
                }
                this.progressBar.loading = true;
                this.progressBar.show = true;
                let http_url = '';
                if(this.$route.params.id){
                    http_url = url.master_quarter_v1_update;                
                } else {    
                    http_url = url.master_quarter_v1_save;
                }     
                this.entity.quarterType="quarterPassbook";           
                let body = this.modifier(this.entity); 
                let req = constant.getRequest(http_url, body); 
                lumos_client.onPost(http_url, req)
                .then(result => {
                    this.progressBar.loading = false;
                    this.progressBar.show = false;                
                    let res = result.data.header.responseCode;
                    this.snackbar = true;
                    if (res != "200"){
                        this.color = "red"; 
                        this.messageText =  result.data.body.data;
                        return;
                    }
                    this.color = "success"; 
                    if(this.$route.params.id){
                        this.messageText = "Quarter Updated Successfully";
                        setTimeout( () => this.$router.push({name:'QuarterPassbook'}), 3000);
                    } else {
                        this.messageText = "Quarter Saved Successfully";
                        setTimeout( () => this.entity = {
                            branchmanageroid: "",
                            relationshipmanageroid: "",
                            type: "Issuing Quarter"
                        }, 2000 )
                    }
                }).catch(error => {
                    this.$log.error(error)
                })               
            }); 
        },
        modifier(entity){
            var obj = _.clone(entity);
            if(this.entity.dateFrom){
                obj.dateFrom = obj.dateFrom.toISOString();
            }
            if(this.entity.dateTo){
                obj.dateTo = obj.dateTo.toISOString();
            }
            return obj;
        },
        oidModifier(entity){
            if(this.entity.dateFrom){
                this.entity.dateFrom = new Date(this.entity.dateFrom);
            }
            if(this.entity.dateTo){
                this.entity.dateTo = new Date(this.entity.dateTo);
            }
        },
    }
}
</script>
<style scoped>
.new-quarter-passbook {
    background: white;
    padding: 10px 10px;
    border-radius: 2px;
    border: 1px solid rgba(0, 0, 0, 0.03);
    -webkit-box-shadow: 0px 1px 1px -1px rgb(129 129 129 / 20%), 0px 1px 1px 0px rgb(129 129 129 / 20%), 0px 1px 1px 0px rgb(129 129 129 / 20%); 
    box-shadow: 0px 1px 1px -1px rgb(129 129 129 / 20%), 0px 1px 1px 0px rgb(129 129 129 / 20%), 0px 1px 1px 0px rgb(129 129 129 / 20%);
}
</style>