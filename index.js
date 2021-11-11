import { setAPI_Key } from './api-requests-constructor.js'
import { createCustomer, getCustomers, getCustomer, deleteCustomer, updateCustomer } from './customers.js'

const lykoApi = { setAPI_Key, createCustomer, getCustomers , getCustomer, deleteCustomer, updateCustomer }

export { lykoApi }