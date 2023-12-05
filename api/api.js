import axios from 'axios';
const https = require('https');

const agent = new https.Agent({  
    rejectUnauthorized: false  
 });


const empresa1Api = axios.create({
    baseURL: 'https://191.242.203.32:9976/server-sigom/rest',
   httpsAgent: agent,
   headers: {
        'Auth-Token': 'b25wYWcgb25wYWcjMjAyM0BDYXJh',
   }
});

const adrianApi = axios.create({
    baseURL: 'https://cloudonpag.com.br:8090',
});


export const getUsuarioEmpresa1 = async (cpf) => {
    try {
        const response = await empresa1Api.get(`/usuario/pessoa/cpf/${cpf}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

async function getNewToken() {
    try {

        const response = await adrianApi.post('/v1/oncardbusiness/auth/', {
            "username": "adm",
            "password": "adm"
        });
        return response.data.token;
    } catch (error) {
        
        throw error;
    }
}


export const postSegundaViaAdrian = async (data) => {

    try {
        const token = await getNewToken(); // Get the token

        const response = await adrianApi.post('/segunda-via', data, {
            headers: {
                'Authorization': `Bearer ${token}` // Pass the token in the Authorization header
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}
