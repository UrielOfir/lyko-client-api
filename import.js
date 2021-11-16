import { lykoApi } from "./index.js";

await lykoApi.setAPI_Key("api_1264493262");
let customerId = "0d1fbed2-d047-45eb-ab11-03244b402f04"

lykoApi.updateCustomer({
    customerId,
    "firstname": "13:55",
    "lastname": "Doe",
    "email": "johndoe@example.com",
    "phone": "+33601020304"
})


// lykoApi.deleteCustomer({ customerId: '59ba12c7-31bf-47d2-bbc1-6a7027efa1ee' });
const data = await lykoApi.getCustomers({ customerId });
console.log(data);
data.forEach((customer) => {
    console.log(customer.id, customer.deleted);
})


