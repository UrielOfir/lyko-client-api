import { setAPI_Key } from './api_requests_constructor.js'
import { createCustomer, getCustomers, getCustomer, deleteCustomer, updateCustomer } from './libs/customers.js'

const lykoApi = { setAPI_Key, createCustomer, getCustomers , getCustomer, deleteCustomer, updateCustomer }

export { lykoApi }