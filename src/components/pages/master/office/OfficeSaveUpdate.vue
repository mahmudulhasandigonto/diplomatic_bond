<template>
<div class="asset-form">
    <div class="loading" v-if="progressBar.loading"></div>
        <div class="container-fluid">
            <router-link :to="{ name: 'Office' }"  tag="span" class="button-tooltip pt-1 float-left">
                <i class="fa fa-arrow-circle-left" style="font-size:28px; color: green;" aria-hidden="true"></i>
                <span class="button-tooltiptext">Back</span>
            </router-link>
            <form class="form-group" @submit.prevent="officeSaveUpdate()">
                <div class="row justify-content-center">
                    <div class="col-12 col-md-6 col-xl-6 ">
                        <div class="new-office-info">
                            <div class="mt-3 ml-3 mr-3 mb-3">
                                <div class="mb-3">
                                    <label class="required"> <b>Office Code</b></label>
                                    <input type="text" class="form-control mb-1" v-model="entity.code" @keypress="onKeydown" v-validate="'required'" placeholder="Office Code" name="Office Code" autocomplete="off">
                                    <small v-show="errors.has('Office Code')" class="help is-danger"><i v-show="errors.has('Office Code')" class="fa fa-exclamation-circle"></i>{{ errors.first('Office Code') }} </small>
                                </div>
                                <div class="mb-3">
                                    <label class="required"> <b>Office Name</b></label>
                                    <input type="text" class="form-control mb-1" v-model="entity.name" v-validate="'required'" placeholder="Office Name" name="Office Name" autocomplete="off">
                                    <small v-show="errors.has('Office Name')" class="help is-danger"><i v-show="errors.has('Office Name')" class="fa fa-exclamation-circle"></i>{{ errors.first('Office Name') }} </small>
                                </div>
                                <div class="mb-3">
                                    <label class="required"> <b>First Address</b></label>
                                    <input type="text" class="form-control mb-1" v-model="entity.address1" v-validate="'required'" placeholder="First Address" name="First Address" autocomplete="off">
                                    <small v-show="errors.has('First Address')" class="help is-danger"><i v-show="errors.has('First Address')" class="fa fa-exclamation-circle"></i>{{ errors.first('First Address') }} </small>
                                </div>
                                <div class="mb-3">
                                    <label > <b>Second Address</b></label>
                                    <input type="text" class="form-control mb-1" v-model="entity.address2" placeholder="Second Address" name="Second Address" autocomplete="off">
                                </div>
                                <div class="text-center mt-4">
                                    <button class="btn btn-success button-width ripple mr-3" @submit.prevent="officeSaveUpdate()">
                                        {{buttonText}}
                                    </button>
                                    <router-link tag="button" class="btn btn-danger button-width ripple" :to="{name:'Office'}" >
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
            },
            contactList:[],
            typeList:[],
            buttonText:'',
            statusList:[
                { name : "Active" }, 
                { name : "Inactive" }
            ],
            quarterList:[
                { name : "first" }, 
                { name : "second" },
                { name : "third" },
                { name : "fourth" }
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
        },
        init(){
            if(this.$route.params.id){
                this.buttonText = "Update"
                this.getOffice(this.$route.params.id)
            } else {
                this.buttonText = "Save"
            }      
        },
        onKeydown (event) {
    	let char = String.fromCharCode(event.keyCode)
    	if (!/[0-9]/.test(char)) {
      	    event.preventDefault()
            }
        },
        getOffice(oid){
            this.progressBar.loading = true;
            this.progressBar.show = true;
            let body = {oid: oid};
            let req = constant.getRequest(url.master_office_v1_get_by_oid, body);
            lumos_client.onPost(url.master_office_v1_get_by_oid, req)
            .then(result => {
                this.progressBar.loading = false;
                this.progressBar.show = false;
                this.entity = result['data']['body'];
                this.oidModifier(this.entity);
            }).catch(error =>{
            });
        },
        officeSaveUpdate(){
            this.$validator.validateAll().then(result => {
                if (!result){
                    return;
                }
                this.progressBar.loading = true;
                this.progressBar.show = true;
                let http_url = '';
                if(this.$route.params.id){
                    http_url = url.master_office_v1_update;                
                } else {    
                    http_url = url.master_office_v1_save;
                }                
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
                        this.messageText = "Office Updated Successfully";
                        setTimeout( () => this.$router.push({name:'Office'}), 3000);
                    } else {
                        this.messageText = "Office Saved Successfully";
                        setTimeout( () => this.entity = {
                            
                        }, 2000 )
                    }
                }).catch(error => {
                    this.$log.error(error)
                })               
            }); 
        },
        modifier(entity){
            var obj = _.clone(entity);
            if(this.entity.dateForm){
                obj.dateForm = obj.dateForm.toISOString();
            }
            if(this.entity.dateTo){
                obj.dateTo = obj.dateTo.toISOString();
            }
            return obj;
        },
        oidModifier(entity){
            if(this.entity.dateForm){
                this.entity.dateForm = new Date(this.entity.dateForm);
            }
            if(this.entity.dateTo){
                this.entity.dateTo = new Date(this.entity.dateTo);
            }
        },
    }
}
</script>
<style scoped>
.center {
  margin: auto;
  width: 60%;
  border: 0px solid rgb(4, 58, 4);
  padding: 10px;
}

.new-office-info {
    background: white;
    padding: 10px 10px;
    border-radius: 2px;
    border: 1px solid rgba(0, 0, 0, 0.03);
    -webkit-box-shadow: 0px 1px 1px -1px rgb(129 129 129 / 20%), 0px 1px 1px 0px rgb(129 129 129 / 20%), 0px 1px 1px 0px rgb(129 129 129 / 20%); 
    box-shadow: 0px 1px 1px -1px rgb(129 129 129 / 20%), 0px 1px 1px 0px rgb(129 129 129 / 20%), 0px 1px 1px 0px rgb(129 129 129 / 20%);
}
</style>
