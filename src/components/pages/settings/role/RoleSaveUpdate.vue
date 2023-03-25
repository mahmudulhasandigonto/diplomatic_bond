<template>
    <div class="container-fluid">
        <router-link :to="{ name: 'Role' }"  tag="span" class="button-tooltip pt-1 pl-1 float-left">
           <i class="fa fa-arrow-circle-left" style="font-size:28px; color: green;" aria-hidden="true"></i>
            <span class="button-tooltiptext">Back</span>
        </router-link>
        <br><br>
        <div class="loading" v-if="progressBar.loading"></div>
        <div class="row">
            <div class="col-12">
                <div class="row">
                <div class="col-12 col-md-6">
                    <fieldset class="well" >
                        <legend class="well-legend"> <b> Role Details </b></legend> 
                            <div class="mb-3">
                                <label class="required" > <b> Role ID </b></label>
                                <input type="text" class="form-control mb-1" v-model="entity.roleId" placeholder=" Enter Role ID" v-validate="'required'" name="Role ID">
                                <small v-show="errors.has('Role ID')" class="help is-danger"><i v-show="errors.has('Role ID')" class="fa fa-exclamation-circle"></i>{{ errors.first('Role ID') }} </small>

                            </div>
                            <div class="mb-3">
                                <label class="required" > <b> Role Description </b></label>
                                <textarea class="form-control mb-1" v-model="entity.roleDescription" placeholder=" Enter Role Description" rows="1" v-validate="'required'" name="Role Description" ></textarea>
                                <small v-show="errors.has('Role Description')" class="help is-danger"><i v-show="errors.has('Role Description')" class="fa fa-exclamation-circle"></i>{{ errors.first('Role Description') }} </small>

                            </div>
                            <div class="mb-3">
                                <label class=" required" > <b>Status </b></label>
                                <model-list-select class="form-control mb-1" :list="statusList" v-model="entity.status" option-value="status" optionText="statusText" placeholder="Role Status" v-validate="'required'" name="Role Status"/>
                                <small v-show="errors.has('Role Status')" class="help is-danger"><i v-show="errors.has('Role Status')" class="fa fa-exclamation-circle"></i>{{ errors.first('Role Status') }} </small>
                            </div>
                            <div class="mb-3">
                                <label class=" required" > <b>Role Type </b></label>
                                <model-list-select class="form-control mb-1" :list="roleTypeList" v-model="entity.roleType" option-value="status" optionText="statusText" placeholder="Role Type" v-validate="'required'" name="Role Type"/>
                                <small v-show="errors.has('Role Type')" class="help is-danger"><i v-show="errors.has('Role Type')" class="fa fa-exclamation-circle"></i>{{ errors.first('Role Type') }} </small>
                            </div>
                    </fieldset>
                </div>
                <div class="col-12 col-md-6">
                    <fieldset class="well" >
                        <legend class="well-legend"> <b> Menu </b></legend>
                        <ul class="tree">
                            <li v-for="m in menu">
                                <div @click="m.enable= !m.enable" class="md-checkbox" >
                                    <input  :id="m.name" type="checkbox" v-model="m.enable" value="true" >
                                    <label :for="m.name">{{m.name}} </label>

                                </div>
                                <ul v-if="m.enable==true" >
                                    <li v-for="n in m.children" >
                                        <div @click="n.enable= !n.enable" class="md-checkbox" >
                                            <input :id="n.name" type="checkbox" v-model="n.enable" value="true">                                            
                                            <label :for="n.name">{{n.name}} </label>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </fieldset>            
                </div>
                </div>
                <div class="text-center">
                    <button class="btn btn-success button-width ripple mr-3"  @click="RoleSaveUpdate()">
                        {{buttonText}}
                    </button>
                    <router-link tag="button" class="btn btn-danger ripple button-width" :to="{name:'Role'}" >
                        Cancel
                    </router-link>
                </div>

                </div>
                <v-app  id="inspire" class="" >
                    <v-snackbar v-model="snackbar" :bottom="y === 'bottom'" :left="x === 'left'" :multi-line="mode === 'multi-line'" :right="x === 'right'" :timeout="timeout" :top="y === 'top'" :vertical="mode === 'vertical'" :color="color">
                        {{messageText}}
                        <v-btn  flat @click="snackbar = false"> 
                        <i class="fa fa-window-close" aria-hidden="true"></i>   
                        </v-btn>
                    </v-snackbar>
                </v-app>
            </div>
        </div>
    </div>
</template>
<script>
import {url} from "@/utils/urls";
import {constant} from "@/utils/constant";
import {lumos_client} from "@/utils/lumos-client";
import { ModelListSelect} from 'vue-search-select';
import * as _ from 'underscore';
export default {
    components: {
        ModelListSelect
    },
    data(){
        return{
            entity:{},
            organizationList:[],
            statusList:[
                {status:'Active', statusText:'Active'},
                {status:'Inactive', statusText:'Inactive'},              
            ],
            roleTypeList:[
                {status:'Report', statusText:'Report'},
                {status:'Other', statusText:'Other'},  
            ],
            size:"50px",
            buttonText:'',
            progressBar:{
                loading: false,
                show: false
            },
            snackbar: false,
            y: "bottom",
            x: "right",
            mode: "",
            color: "",
            timeout: 2000,
            messageText: "",
            menu:[],
            roleOid: localStorage.getItem("lumos_roleOid"),
           
        }
    },
    created(){
      this.init()
      this.getMenuFromStorage()

    },
    methods:{
        init(){
            if(this.$route.params.id){
                this.buttonText = "Update"
                this.getRole(this.$route.params.id)             
            } else {
                this.buttonText = "Save"
            }      
        },
        getMenuFromStorage(){

                if(!this.$route.params.id){
            let menu = JSON.parse( localStorage.getItem("lumos_menu"))
            const removeEnable = (menu) => 
                Array.isArray(menu) ? menu.filter(x => 
                x.enable!= false).map(x => removeEnable(x)) :
                typeof(menu) == 'object' ? Object.entries(menu).reduce((r, [k,v]) => 
                (r[k] = removeEnable(v), r), {}) : menu
                
            this.menu = removeEnable(menu)
            this.menu.forEach(function iter(a) {
                    a.enable = false;                      
                Array.isArray( a.children) && a.children.forEach(iter);
            });

                }
        },
        getRole(oid){
            this.progressBar.loading = true;
            this.progressBar.show = true;
            let body = {oid: oid};
            let req = constant.getRequest(url.authorization_user_v1_role_get_by_oid, body);
            lumos_client.onPost(url.authorization_user_v1_role_get_by_oid, req)
            .then(result => {
                this.progressBar.loading = false;
                this.progressBar.show = false;
                this.entity = result['data']['body'];
                let showMenu = 0
                // this.menu = JSON.parse(this.entity.accessJson)
                let menu = JSON.parse(localStorage.getItem("lumos_menu"))
                let accessJson = JSON.parse(this.entity.accessJson)
                for(let i=0; i<accessJson.length;  i++){
                    menu[i].enable = accessJson[i].enable
                    if(accessJson[i].hasOwnProperty('children') && accessJson[i].children.length > 0 && accessJson[i].enable){
                        for(let n=0; n<accessJson[i].children.length;  n++){                            
                            menu[i].children[n].enable = accessJson[i].children[n].enable  
                        }
                    }        
                    showMenu = showMenu  + 1  

                }
                if(showMenu == menu.length){
                this.menu = menu

                }

            }).catch(error =>{
            });

        },
        RoleSaveUpdate(){
            this.$validator.validateAll().then(result => {
                if (!result){
                    return;
                }
                this.progressBar.loading = true;
                this.progressBar.show = true;
                let http_url = '';
                if(this.$route.params.id){
                    http_url = url.authorization_user_v1_role_update;                
                } else {    
                    http_url = url.authorization_user_v1_role_save;
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
                        this.messageText = result.data.header.responseMessage;
                        return;
                    }
                    this.color = "success"; 
                    if(this.$route.params.id){
                        this.messageText = "Role Updated Successfully";
                         setTimeout( () => this.$router.push({name:'Role'}), 3000);
                    } else {
                        this.messageText = "Role Saved Successfully";
                        setTimeout( () => this.entity = {}, 2000)
                        this.getMenuFromStorage()
                    }
                }).catch(error => {
                    this.$log.error(error)
                })               
            });
            
        },
        modifier(entity){
            let hasFalseKeys;
            let data = localStorage.getItem("lumos_dataJson");
            let dataJson = JSON.parse(data);
            var obj = _.clone(entity);
            obj.accessJson = JSON.stringify(this.menu);
            
            return obj;
        }
    }
}
</script>

<style scoped>
/* .tree, */
.tree ul {
  margin:0 0 0 1em; /* indentation */
  padding:0;
  list-style:none;
  color:#369;
  position:relative;
  border-left:1px solid;
  cursor: pointer;
  /* margin-bottom: 10px */
}

.tree ul {margin-left:.5em} /* (indentation/2) */

.tree:before,
.tree ul:before {
  content:"";
  display:block;
  width:0;
  position:absolute;
  top:0;
  bottom:0;
  left:0;
   /* border-left:1px solid; */
}

.tree li {
  margin:0;
  padding:0 1.5em; /* indentation + .5em */
  line-height:2em; /* default list item's `line-height` */
  font-weight:bold;
  position:relative;
  cursor: pointer;
  border-left:1px solid;
}

.tree li:before {
  content:"";
  display:block;
  width:10px; /* same with indentation */
  height:0;
  border-top:1px solid;
  margin-top:-1px; /* border top width */
  position:absolute;
  top:.7em; /* (line-height/2) */
  left:0;
  
}

.tree li:last-child:before {
  background:white; /* same with body background */
  height:auto;
  top:.7em; /* (line-height/2) */
  bottom:0;
}

li{
    list-style: none;
}
</style>>
