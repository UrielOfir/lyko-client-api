import axios from 'axios';
import fs from 'fs';

const apiJSON = fs.readFileSync("./lykoApi.json", 'utf8');
const apiObject = JSON.parse(apiJSON);
const apiRequests = {};

let API_KEY;
const setAPI_Key = (apiKey) => {
    API_KEY = apiKey;
}
setAPI_Key("api_1264493262");

Object.keys(apiObject.paths).forEach(path => {
    Object.keys(apiObject.paths[path]).forEach(method => {
        const opeartionId = apiObject.paths[path][method].operationId;
        apiRequests[opeartionId] = {
            config: {
                url: `https://api.lyko.tech${path}`,
                method,
                headers: { "X-Api-Key": API_KEY }
            },
            params: (parameters) => { return { params: { ...parameters }, ...apiRequests[opeartionId].config } }
        };
    })
});



const reqConfig = apiRequests.AddressController_autocomplete.params({ text: "paris" });

axios(reqConfig)
    .then(res => console.log(res.data))
    .catch(e => console.log(e))

const reqCounstruct = ({ method }) => {
    axios[method]()
}

export { setAPI_Key }