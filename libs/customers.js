import axios from 'axios';
import { apiRequests } from '../api_requests_constructor.js';

const createCustomer = async ({ firstname, lastname, email, phone }) => {
    const createCustomerReq = apiRequests.CustomerController_create;
    createCustomerReq.data = { firstname, lastname, email, phone }
    axios(createCustomerReq)
        .then(res => {
            console.log(res.data)
        })
        .catch(e => console.log(e))
}

const getCustomers = async () => {
    const getCustomersReq = apiRequests.CustomerController_list;
    return await axios(getCustomersReq)
        .then(res => {
            return res.data
        })
        .catch(e => console.log(e))
}

const getCustomer = async ({ customerId }) => {
    const getCustomersReq = apiRequests.CustomerController_detail;
    getCustomersReq.url = getCustomersReq.url.replace('{customerId}', customerId);
    return await axios(getCustomersReq)
        .then(res => {
            return res.data
        })
        .catch(e => console.log("getCustomer:", customerId, e.response.data))
}

const deleteCustomer = ({ customerId }) => {
    const deleteCustomerReq = apiRequests.CustomerController_delete;
    deleteCustomerReq.url = deleteCustomerReq.url.replace('{customerId}', customerId);
    axios(deleteCustomerReq)
        .then(res => {
            console.log("delete:", res.data)
        })
        .catch(e => console.error(customerId, e.response.data))

}

const updateCustomer = async ({ customerId, firstname, lastname, email, phone }) => {
    const updateCustomerReq = apiRequests.CustomerController_update;
    updateCustomerReq.data = { firstname, lastname, email, phone }
    updateCustomerReq.url = updateCustomerReq.url.replace('{customerId}', customerId);
    axios(updateCustomerReq)
        .then(res => {
            console.log(res.data)
        })
        .catch(e => console.log(e))
}

export { createCustomer, getCustomers, getCustomer, deleteCustomer, updateCustomer }