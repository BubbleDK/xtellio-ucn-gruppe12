import { APISettings } from './APISettings.config';
export default {
    
    index( ){
        return fetch( APISettings.baseURL + 'auth/me', {
            method: 'GET',
            token: APISettings.token,
            headers:  APISettings.headers,
            
        })
        .then( function(response){
            if(response.status !== 200){
                throw response.status;
            }else{
                return response.json();
            }
        });
    },

    // store( data ){
    //     APISettings.headers.set('Content-Type', 'multipart/form-data');
    //     APISettings.headers.set('Authorization', APISettings.token);

    //     return fetch(APISettings.baseURL + '/')
    // }
}