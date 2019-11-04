const fs = require('fs');
const url = require('url');

const puppeteer = require('puppeteer');

// const csvFilePath = process.argv[2];
// const brid = process.argv[3];
// const brandDomain = process.argv[4];

async function crawlPages(brandName) {
  const args = ['--disable-setuid-sandbox', '--no-sandbox', '--blink-settings=imagesEnabled=false'];
  const options = {
    args,
    headless: true,
    ignoreHTTPSErrors: true,
  };

  const browser = await puppeteer.launch(options);
  const page = await browser.newPage();

  const brandDomain = `https://${brandName}.com`;
  const waitUntil = 'networkidle2';
  await page.goto(brandDomain, {
    waitUntil,
    timeout: 30000,
  });

  const crawledURLs = await page.$$eval('a', (anchors) => anchors.map((a) => a.href));

  await page.close();
  await browser.close();

  return crawledURLs;
}

// async function validateUrl() {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   for (let i = 0; i < urls.length; i++) {
//     const crawledURLs = crawledURLs[i];
//     await page.goto(url);
//     page.on('request', interceptedRequest => {
// //* This 'test' if satified completes the requirements to 'pass'. Meaning, if our 'listener' intercepts a request that startsWith whiteListedJS and includes brid then we know that there is at least one event firing appropriately. We will use the stored array to validate if there is only one fire per pafe later.
//       if (interceptedRequest.url().startsWith(whiteListedJS) || interceptedRequest.url().includes(brid)) {
// //* below,I am trying to create a key pay that uses the regex in the csv file with the url. Above, I a
//         javaScriptURLs = {regexArray.regex:interceptedRequest.url}
//       } else if (interceptedRequest.url().startsWith(whiteListedP2) || interceptedRequest.url().includes(brid)) {
//         var adr = interceptedRequest.url();
//         var q = url.parse(adr, true);
//         var qdata = q.query;
//         p2URLs = {regexArray.regex:[interceptedRequest.url, qdata.markerId, qdata.markerType]}
//       } else if  (interceptedRequest.url().startsWith(whiteListedAdvisor) || interceptedRequest.url().includes(brid)) {
//         advisorURLs = {regexArray.regex:interceptedRequest.url}
//       } else
//         interceptedRequest.abort();
//       console.log('There are no JS requests firing, which could mean it has not been implimented or it has not been implimented correctly.');
//     });
//   };
// }

async function main() {
  const brandName = process.argv[2];

  const urlsToVisit = await crawlPages(brandName);

  const whiteList = [
    'https://cdn.pbbl.co/r/',
    'https://px0.pbbl.co/ns/__p2.gif',
    'https://px0.pbbl.co/adadvisor.gif',
  ];

  const billing = {
    firstName: 'testTastical',
    lastName: 'testYmore',
    address1: '400 Lafayette St',
    address2: '2nd Floor',
    city: 'New York',
    state: 'New York',
    zipCode: '10003',
  };
}

main().then(() => {
  console.log('Done...');
});


