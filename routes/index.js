var express = require('express'),
    router = express.Router(),
    request = require("request"),
    async = require("async");

var DECADES = [
    1960,
    1970,
    1980,
    1990,
    2000,
    2010
];


var yleGenre = "Musiikki",
    svtGenre = "Musik",
    //yleApi = "http://haku.yle.fi/api/search?category=elavaarkisto&keyword=" + yleGenre + "&media=video&sort=relevancy&page=1&UILanguage=fi&decade=",
    yleApi = "http://localhost:3000/archive",
    svtApi = "http://www.svt.se/oppet-arkiv-api/search/tags/?genreFacet=" + svtGenre + "&pretty=true&yearFacet=";

router.get('/', function(req, res, next) {

    async.map(DECADES, fetch, function(err, results) {
        var decades = parse(results);
        res.render("index", { decades: decades });
    });
});

var fetch = function(decade, callback) {

    var api = [
        yleApi + params("yle", decade),
        svtApi + params("svt", decade)
    ];

    async.map(api, fetchData, function(err, results) {
        callback(err, results);
    });
};

var fetchData = function(url, callback) {
    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        callback(error, JSON.parse(body));
      }
    });
};

var params = function(service, decade) {
    decade = parseInt(decade);
    if (service == "yle") {
        return  "/" + decade + "/" + yleGenre
    } else {
        var param = [];
        for (var i = 0; i < 10; i++) { param.push(decade + i)}
        return param.join("%7C");
    }; 
};

var parse = function (data) {
    var decades = [];

    for (i in data) {
        console.log("FOOO",i)
        var decade = data[i];
        decades.push( { decade: DECADES[i], yle: parseYle(decade[0]), svt: parseSvt(decade[1]) })
    }
    return decades;
};

var parseYle = function(data) {
    var programs = [];
    for(var i in data.newresult) {
        var obj = {},
        program = data.newresult[i];

        obj.title = program.title;
        obj.image = program.image.replace("h_116,w_235", "h_348,w_705");
        obj.url = program.url;
        obj.mediaId = program.mediaId;
        obj.id = program.articleId;
        programs.push(obj);
    }
    return programs;
};

var parseSvt = function(data) {
    var programs = [];
    for(var i in data.entries) {
        var obj = {},
        program = data.entries[i];

        obj.title = program.programTitle;
        obj.image = program.thumbnailXL;
        obj.id = program.id;
        programs.push(obj);
    }
    return programs;
}

    
module.exports = router;