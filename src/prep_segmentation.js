const fs = require('fs');
const brandDomain = process.argv[2];
var crawledURLs = [];

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
    
    crawledURLs = await page.$$eval('a', as => as.map(a => a.crawledURLs));
        console.log(crawledURLs);
        
        
    await page.close();
    await browser.close();
    return crawledURLs;

    })().catch((error) => {
        console.error(error);
    });;

} 

var qdata = [];

for (let i = 0; i < crawledURLs.length; i++) {
    var q = url.parse(crawledURLs, true);
    qdata.push(q.query);
    };


fs.writeFile("/Documents/test", "test1.csv", function(err) {

    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});