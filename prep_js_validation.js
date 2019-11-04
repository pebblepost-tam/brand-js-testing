//* possible command like arguments: node pre;_js_validtion.js pathToCSVFile brandID brandDomain an example is
const csv = require('csv-parser');
const fs = require('fs');
const puppeteer = require('puppeteer');
var url = require('url');
//* const spawn = require("child_process").spawn;
//* const pythonProcess = spawn('python3',["/Volumes/GoogleDrive/Shared drives/TAM Team Drive/Scripts_python3/p3_sitemap_callJS.py", arg1, arg2, ...]);
const brid = process.argv[3];
const brandDomain = process.argv[4];
var regexArray = [];
//*This is setting the 3rd argument to the constant type variable csvFilePath so that we can 'import' the csv file with the regex for evalution
const csvFilePath = process.argv[2];
//*The following are hardcoding the constant variables to the three URLs that we need to evaluate to ensure it is firing the correct requests
const whiteListedJS = 'https://cdn.pbbl.co/r/';
const whiteListedP2 = 'https://px0.pbbl.co/ns/__p2.gif';
const whiteListedAdvisor = 'https://px0.pbbl.co/adadvisor.gif';
const firstName = 'testTastical';
const lastName = 'testYmore';
const address1 = '400 Lafayette St';
const addrtess2 = '2nd Floor';
const city = 'New York';
const state = 'New York';
const zipCode = '10003';



//*This block uses the csv file patha arugment passed within the command line to 'import' the said csv file and then parse it into an object key pairs based on the header value combination 
/* fs.createReadStream(csvFilePath)
   .pipe(csv())
   .on('data', (data) => regexArray.push(data))
   .on('end', () => {
    console.log('The csv file was successfully parsed into an object');
  });
*/
crawlPage();

function crawlPage() {
    (async () => {
    
    const args = [
            "--disable-setuid-sandbox",
            "--no-sandbox",
            "--blink-settings=imagesEnabled=false",
        ];
        const options = {
            args,
            headless: true,
            ignoreHTTPSErrors: true,
        };

    const browser = await puppeteer.launch(options);
        const page = await browser.newPage();
    await page.goto(brandDomain + '.com', {
            waitUntil: 'networkidle2',
            timeout: 30000
        });
    
    const crawledURLs = await page.$$eval('a', as => as.map(a => a.crawledURLs));
        console.log(crawledURLs);
        
        
    await page.close();
    await browser.close();
    return crawledURLs;

    })().catch((error) => {
        console.error(error);
    });;

}

function run() {
return new Promise(async (resolve, reject) => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        for (let i = 0; i < urls.length; i++) {
            const crawledURLs = crawledURLs[i];
            await page.goto(url);
            page.on('request', interceptedRequest => {
//* This 'test' if satified completes the requirements to 'pass'. Meaning, if our 'listener' intercepts a request that startsWith whiteListedJS and includes brid then we know that there is at least one event firing appropriately. We will use the stored array to validate if there is only one fire per pafe later. 
                if (interceptedRequest.url().startsWith(whiteListedJS) || interceptedRequest.url().includes(brid)) {
//* below,I am trying to create a key pay that uses the regex in the csv file with the url. Above, I a
                    javaScriptURLs = {regexArray.regex:interceptedRequest.url}
                } else if (interceptedRequest.url().startsWith(whiteListedP2) || interceptedRequest.url().includes(brid)) {
                    var adr = interceptedRequest.url();
                    var q = url.parse(adr, true);
                    var qdata = q.query;
                    p2URLs = {regexArray.regex:[interceptedRequest.url, qdata.markerId, qdata.markerType]}
                } else if  (interceptedRequest.url().startsWith(whiteListedAdvisor) || interceptedRequest.url().includes(brid)) {
                    advisorURLs = {regexArray.regex:interceptedRequest.url}
                } else
                    interceptedRequest.abort();
                    console.log('There are no JS requests firing, which could mean it has not been implimented or it has not been implimented correctly.');
                });
            };
        }
    catch(err) {
        message.innerHTML = "Error: " + err + ".";
        }
    finally {
        console.log('Iteration completed');
};

await browser.close();;

//*evaluate the first set of URLs

//*evaluate the second set of URLs

//* evaluate the third set of URLs
