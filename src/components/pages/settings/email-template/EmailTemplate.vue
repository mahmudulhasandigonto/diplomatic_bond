<template>
    <div>
        <div class="loading" v-if="progressBar.loading"></div>
        <div class="container-fluid">
            <div class="row">
                <div class="col-12 col-xl-12">
                    <v-app  id="inspire" class="" >
                        <div class="">
                            <div class="asset-top-panel">
                                <div class="row col-12  nopadding">
                                    <router-link tag="button" class="btn btn-primary ripple" :to="{name:'New Email Template'}">
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
                                    hide-actions          
                                >
                                <template slot="items" slot-scope="props" >
                                    <td class="text-xs-left">{{ props.item.type }}</td>
                                    <td class="text-xs-left">{{ props.item.subjectEmail }}</td>
                                    <td class="text-center">  
                                    <router-link 
                                    tag="span" 
                                    :to="{name:'Update Email Template', params: { id: props.item.oid }}"
                                    class="btn-icon-default button-tooltip">
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
    </div>
</template>

<script>
    import {url} from "@/utils/urls";
    import {constant} from "@/utils/constant";
    import {lumos_client} from "@/utils/lumos-client";
    export default {
        name: "Site",
        data(){
            return{
                entity:[],
                headers: [
                    { text: "Type", value: "type", align: "left" },
                    { text: "Subject", value: "subjectEmail", align: "left" },
                    { text: "Action", value: "status", align: "center", sortable: false }
                ],
                search: "",
                size:"50px",
                snackbar: false,
                y: "bottom",
                x: "right",
                mode: "",
                color: "",
                timeout: 2000,
                messageText: "",
                progressBar: {
                    loading: false,
                    show: false
                },

            }
        },
        mounted(){
            this.getEmailTemplateList();
        },
        methods:{
            getEmailTemplateList(){
            this.progressBar.loading = true;
                let body = {oid:''  };
                let req = constant.getRequest(url.master_email_v1_get_list, body);
                lumos_client.onPost(url.master_email_v1_get_list, req)
                .then(result => {
                    this.progressBar.loading = false;
                    this.entity = result['data']['body']['data'];                   
                })
                .catch(error => {
                    this.$log.error(error);
                });
            },

            changeStatus(item, status){  
                var entityList = item
                entityList.status = status
                let http_url = url.master_email_v1_update        
                let body = entityList;
                let req = constant.getRequest(http_url, item); 
                lumos_client.onPost(http_url, req)
                .then(result => {            
                    let res = result.data.header.responseCode;
                    this.snackbar = true;
                    if (res != "200"){
                        this.color = "red"; 
                        this.messageText = " Couldn't Update Status";
                        return;
                    }else {
                        this.color = "success" 
                        this.messageText = "Status Updated Successfully";
                        this.getEmailTemplateList()
                    }
                }).catch(error => {
                    this.$log.error(error)
                }) 

            },
        }
    }
</script>

<style scoped>

</style>
