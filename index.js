import axios from 'axios';

import { setAPI_Key, apiRequests } from './api-requests-constructor.js'

//TODO: new folder only for customers funcs

//TODO: functions- getCustomer, uptadeCustomer, deleteCustomer

const createCustomer = async ({ firstname, lastname, email, phone }) => {
    const createUserReq = apiRequests.CustomerController_create;
    createUserReq.data = { firstname, lastname, email, phone }
    axios(createUserReq)
        .then(res => {
            console.log(res.data)
        })
        .catch(e => console.log(e))
}

const getCustomers = async () => {
    const createUserReq = apiRequests.CustomerController_list;
    return await axios(createUserReq)
        .then(res => {
            return res.data
        })
        .catch(e => console.log(e))
}

export { setAPI_Key, createCustomer, getCustomers }