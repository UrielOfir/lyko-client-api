import fs from 'fs';

const apiJSON = fs.readFileSync("./lykoApi.json", 'utf8');
const apiObject = JSON.parse(apiJSON);

let apiRequests = {};
let API_KEY;

const setAPI_Key = (apiKey) => {
    API_KEY = apiKey;
    apiRequests = apiRequestsConstructor(apiObject)
}

function apiRequestsConstructor(apiObject) {
    const apiRequests = {};
    const apiPathsArr = Object.keys(apiObject.paths);
    const api_Paths_And_Methods_Arr = apiPathsArr.map(
        (path) => { return { path, methods: Object.keys(apiObject.paths[path]) } }
    )
    api_Paths_And_Methods_Arr.forEach(
        (path_And_His_Methods) => {
            const path = path_And_His_Methods.path;
            path_And_His_Methods.methods.forEach((method) => {
                const operationId = apiObject.paths[path][method].operationId;
                apiRequests[operationId] = {
                    url: `https://api.lyko.tech${path}`,
                    method,
                    headers: { "X-Api-Key": API_KEY }
                };
            })

        }
    )
    return apiRequests;
}

export {setAPI_Key, apiRequests}