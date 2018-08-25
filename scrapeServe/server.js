const PORT = process.env.PORT || 3002;
const mongoose = require("mongoose");
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/Project3";
const extractor = require('unfluff');
var request = require("request");
const db = require("./models");
let cheerio = require('cheerio');

// Connect to Mongo DB
mongoose.connect(MONGODB_URI);

// https://www.dailykos.com/
    // https://www.theblaze.com/
    // https://www.foxnews.com/

const random = () => Math.floor(Math.random() * 5);

const results = [];

function nprArticleScrape(){

let url = "https://www.npr.org/sections/news";

request(url, function (error, response, html) {

    // First we'll check to make sure no errors occurred when making the request

    if (!error) {
        // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality

        var $ = cheerio.load(html);

        let site = $.html();

        let siteData = extractor(site, "en");

        let newUrl = siteData.links[4].href;
        // console.log("newUrl",newUrl);

        request(newUrl, function (error, response, html) {

            // First we'll check to make sure no errors occurred when making the request

            if (!error) {
                // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality

                var $ = cheerio.load(html);

                let site = $.html();

                let siteData = extractor(site, "en");

                // console.log(siteData.text);

                let formData = {
                    headline: siteData.title,
                    author: siteData.author[0],
                    body: siteData.text,
                    article_url: newUrl,
                    // "source_id": ,
                    // "date": siteData.data,
                }

                // console.log("formData", formData);

                db.Article.create(formData).then(function (dbArticle) {
                    console.log("dbArticle", dbArticle);
                }).catch(err => console.log(err));


            }
        })
    }
})
}

function kosArticleScrape() {

    let url = "https://www.dailykos.com/";

    request(url, function (error, response, html) {

        // First we'll check to make sure no errors occurred when making the request

        if (!error) {
            // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality

            var $ = cheerio.load(html);

            let site = $.html();

            let siteData = extractor(site, "en");

            let newUrl = siteData.links[4].href;
            // console.log("newUrl",newUrl);

            request(newUrl, function (error, response, html) {

                // First we'll check to make sure no errors occurred when making the request

                if (!error) {
                    // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality

                    var $ = cheerio.load(html);

                    let site = $.html();

                    let siteData = extractor(site, "en");

                    // console.log(siteData.text);

                    let formData = {
                        headline: siteData.title,
                        author: siteData.author[0],
                        body: siteData.text,
                        article_url: newUrl,
                        // "source_id": ,
                        // "date": siteData.data,
                    }

                    // console.log("formData", formData);

                    db.Article.create(formData).then(function (dbArticle) {
                        console.log("dbArticle", dbArticle);
                    }).catch(err => console.log(err));

                }
            })
        }
    })
}

function foxArticleScrape() {

    let url = "https://www.foxnews.com/";

    request(url, function (error, response, html) {

        // First we'll check to make sure no errors occurred when making the request

        if (!error) {
            // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality

            var $ = cheerio.load(html);

            let site = $.html();

            let siteData = extractor(site, "en");

            let newUrl = siteData.links[4].href;
            // console.log("newUrl",newUrl);

            request(newUrl, function (error, response, html) {

                // First we'll check to make sure no errors occurred when making the request

                if (!error) {
                    // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality

                    var $ = cheerio.load(html);

                    let site = $.html();

                    let siteData = extractor(site, "en");

                    // console.log(siteData.text);

                    let formData = {
                        headline: siteData.title,
                        author: siteData.author[0],
                        body: siteData.text,
                        article_url: newUrl,
                        // "source_id": ,
                        // "date": siteData.data,
                    }

                    // console.log("formData", formData);

                    db.Article.create(formData).then(function (dbArticle) {
                        console.log("dbArticle", dbArticle);
                    }).catch(err => console.log(err));

                }
            })
        }
    })
}

function blazeArticleScrape() {

    let url = "https://www.theblaze.com";

    request(url, function (error, response, html) {

        // First we'll check to make sure no errors occurred when making the request

        if (!error) {
            // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality

            var $ = cheerio.load(html);
            // let site = $.html();

            let blazeLinks = [];

            $("article").each(function (i, element) {

                var title = $(element).children("a").children("div.feed-bottom").children("h3").text()
                var link = $(element).children("a").attr("href");

                blazeLinks.push({
                    title: title,
                    link: link
                });
            });


            // console.log(blazeLinks);

            // let siteData = extractor(site, "en");

            let newUrl = "https://www.theblaze.com" + blazeLinks[0];
            // let newrUrl = siteData.links[4].href;

            // console.log(siteData);

            console.log("newUrl",newUrl);

            request(newUrl, function (error, response, html) {

                // First we'll check to make sure no errors occurred when making the request

                if (!error) {
                    // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality

                    var $ = cheerio.load(html);

                    let site = $.html();

                    let siteData = extractor(site, "en");

                    console.log(siteData);

                    let formData = {
                        headline: siteData.title,
                        author: siteData.author[0],
                        body: siteData.text,
                        article_url: newUrl,
                        // "source_id": ,
                        // "date": siteData.data,
                    }

                    // console.log("formData", formData);

                    // db.Article.create(formData).then(function (dbArticle) {
                    //     console.log("dbArticle", dbArticle);
                    // }).catch(err => console.log(err));


                }
            })
        }
    })
}


const randomArticleScrape = function(){

    // let funcs = [nprArticleScrape, blazeArticleScrape, kosArticleScrape, foxArticleScrape];
    // funcs[Math.floor(Math.random() * funcs.length)]();

    blazeArticleScrape();

}
randomArticleScrape();
