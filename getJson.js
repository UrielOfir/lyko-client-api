import scrape from 'website-scraper';
import fs from 'fs';
import stringsCompare from './stringsCompare.js';

await fs.rmSync("./api-website", { recursive: true });

const options = {
    urls: ['http://api.lyko.tech/v1/docs'],
    directory: './api-website',
    sources: [
        { selector: 'script', attr: 'src' }
    ]
};

await scrape(options);

const jsfile = await fs.readFileSync(`./api-website/js/swagger-ui-init.js`, { encoding: 'utf8' });
const swagger_start_index = jsfile.search(`"swaggerDoc": `) + `"swaggerDoc": `.length;
const swagger_end_index = jsfile.search(`,
  "customOptions": {},`);

let currentLykoApi = jsfile.slice(swagger_start_index, swagger_end_index);

fs.writeFile("./currentJSON.json", currentLykoApi, function (err) {
    if (err) return console.log(err);

});

let oldLykoApi = await fs.readFileSync('./lykoApi.json', { encoding: 'utf8' });

oldLykoApi = JSON.stringify(JSON.parse(oldLykoApi));
currentLykoApi = JSON.stringify(JSON.parse(currentLykoApi));


const result = stringsCompare(oldLykoApi, currentLykoApi);
console.log(result);





// console.log(diffSentences(oldLykoApi, currentLykoApi));

// with promise
// scrape(options).then((result) => { });


// import axios from 'axios';
// import fs from 'fs';
// axios('https://api.codetabs.com/v1/proxy?quest=api.lyko.tech/v1/docs')
//     .then((response) => {
//         console.log("got to axios then");
//         fs.writeFile('log.json', response.data.toString(), function (err) {
//             if (err) return console.log(err);
//             console.log('Hello World > helloworld.txt');
//         });
//     })
