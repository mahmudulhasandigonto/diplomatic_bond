import moment from 'moment' 

export const constant ={
    uuid(){
        return moment().format("YYYYMMDDHHmmss") + '-' + (constant.s4() + constant.s4() + constant.s4() + constant.s4()).toLowerCase();     
    },
    s4(){
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    },
    getRequest(url, body) {  
        var request = {
            header : {
                requestId : constant.uuid(),
                requestClient : 'abl',
                requestType : url,
                requestSource : 'lumos-portal',
                requestSourceService : url,
                requestVersion : '1.0',
                requestTime: moment().toISOString(),
                requestTimeoutInSeconds: 30,
                requestRetryCount: 0
            },
            meta : {},
            body : {}
        };
        if(body != null)
            request['body'] = body;
        return request;
    }
   
}
