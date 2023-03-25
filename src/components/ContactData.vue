<template>
<span>
    <label><b>{{ ctitle }} Info</b></label>
    <div v-if="contactData">
        <tr class="row">
            <td class="col-7">
                <b>Name : </b>{{ contactData.name }}
            </td>
            <td class="col-5">
                <b>Designation : </b>{{ contactData.designation }}
            </td>
        </tr>
        <tr class="row">
            <td class="col-7">
                <b>Phone : </b>{{ contactData.mobilenumber }}
            </td>
            <td class="col-5">
                <b>Email : </b>{{ contactData.email }}
            </td>
        </tr>  
    </div>
</span>
</template>
<script>
import {url} from "@/utils/urls";
import {constant} from "@/utils/constant";
import {lumos_client} from "@/utils/lumos-client";
export default {
    name: 'ContactData',
    props: {
        ctitle: {
            type: String,
            required: true,
            note: 'Contact Type. Must provide.',
        },
        oid:{
            type: String,
            required: true,
            note: "Contact Oid"
        }
    },    
    data(){
        return {
            contactData: {}
        }
    },
    methods: {
        async getContactByOid(){
            let body = {oid: this.oid};
            let req = constant.getRequest(url.master_contact_v1_get_by_oid, body);
            let result = await lumos_client.onPost(url.master_contact_v1_get_by_oid, req);
            try {
                this.contactData = result['data']['body'];
            } catch (error) {
                console.error(error);
            }
        },
    },
    watch: {
        oid() {
            this.getContactByOid();
        }
    },
};
</script>
<style>
tr{
    font-size: 11px;
}
</style>