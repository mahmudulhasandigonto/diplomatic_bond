<template>
<span class="contact-modal">
    <button type="button" @click="isModalVisible=true">
        <i class="fa fa-plus" aria-hidden="true"></i>
    </button>
    <v-dialog v-model="isModalVisible" max-width="350">
        <v-card>
            <v-card-text class="text-center">
                <h4>New {{ ctype }} Contact</h4>
                <v-form>
                    <v-text-field class="required" label="Contact Name" v-model="newContact.name"/>
                    <v-text-field class="required" label="Designation" v-model="newContact.designation"/>
                    <v-text-field label="Email" v-model="newContact.email"/>
                    <v-text-field label="Mobile Number" v-model="newContact.mobilenumber"/>
                </v-form>
                <v-btn color="success" :disabled="disableContactSave" @click="newContactSave">Save</v-btn>
                <v-btn color="red" @click="isModalVisible=false">Cancel</v-btn>
            </v-card-text>
        </v-card>  
    </v-dialog>
</span>
</template>
<script>
import {url} from "@/utils/urls";
import {constant} from "@/utils/constant";
import {lumos_client} from "@/utils/lumos-client";
import * as _ from 'underscore';

export default {
    name: 'contact',
    props: {
        ctype: {
            type: String,
            required: true,
            note: 'Contact Type. Must provide.',
        }
    },    
    data(){
        return {
            isModalVisible: false,
            newContact:{
                contacttype: this.ctype,
                status:'Active'
            },
        }
    },
    computed: {
        disableContactSave(){
            if(this.newContact.name && this.newContact.designation ) return false;
            else return true;
        },
    },
    methods: {
        async newContactSave(){
            let http_url = url.master_contact_v1_save;
            let body = _.clone(this.newContact);
            let req = constant.getRequest(http_url, body);
            try {
                let result = await lumos_client.onPost(http_url, req);
                if (result.data.header.responseCode!='200') {
                    this.emmited = {
                        color: 'red',
                        messageText: result.data.body.data
                    }
                } else {
                    this.emmited = {
                        color: 'success',
                        messageText: 'Contact Saved Successfully'
                    }
                } 
                this.newContact = {
                    contacttype: this.ctype,
                    status: 'Active'
                }
                this.$emit("inputData", this.emmited);
                this.isModalVisible=false
            } catch (error) {
                this.$log.error(error)
            }
        }
    },
  };
</script>
<style>
.contact-modal{
    position: relative;
}
.required label::after {
    content: "*";
    color: red;
    font-size: 12px;
}
</style>