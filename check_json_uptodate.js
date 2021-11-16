import scrape from 'website-scraper';
import fs from 'fs';
import is_strings_equal from './is_strings_equal.js';

const get_the_current_api = async () => {
    if (await fs.existsSync("./api-website")){
        await fs.rmSync("./api-website", { recursive: true });
    }

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

    const currentLykoApi = jsfile.slice(swagger_start_index, swagger_end_index);
    return currentLykoApi;
}

const is_json_uptodate = async () => {
    let currentLykoApi = await get_the_current_api();

    let oldLykoApi = await fs.readFileSync('./lykoApi.json', { encoding: 'utf8' });

    oldLykoApi = JSON.stringify(JSON.parse(oldLykoApi));
    currentLykoApi = JSON.stringify(JSON.parse(currentLykoApi));


    return is_strings_equal(oldLykoApi, currentLykoApi);
}

export default is_json_uptodate;
