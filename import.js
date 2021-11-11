import { createCustomer , getCustomers, setAPI_Key } from "./index.js";

setAPI_Key("api_1264493262");

// createCustomer({
//     "firstname": "bibi",
//     "lastname": "Doe",
//     "email": "johndoe@example.com",
//     "phone": "+33601020304"
// })


    const data = await getCustomers()
    console.log("fucnction return:", data);
