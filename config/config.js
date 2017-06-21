// An example configuration file.
let path = require("path");
let fs = require("fs");

exports.config = {
  directConnect: true,

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome'
  },
  // Framework to use. Jasmine is recommended.
  framework: 'jasmine2',
  directConnect: true,
  onPrepare: () =>{
    browser.driver.manage().window().maximize();
     browser.ignoreSynchronization = true;
     browser.baseUrl = "http://www.imdb.com/";
    browser.params.dbPath = path.resolve(__dirname+"./../db/database.db");
    fs.readdir(path.resolve(__dirname+"./../db"), function(err, list){
      list.forEach((file)=>{
        fs.unlinkSync(path.resolve(__dirname+"./../db/"+file));
      });
        fs.writeFileSync(path.resolve(__dirname+"./../db/database.db"),"");
    });
  },
  onComplete: () =>{
    // let db = require("./../pages/sqliteDb.js");
    // db.closeDB();
  },
  // Spec patterns are relative to the current working directory when
  // protractor is called.
  specs: ['./../spec/imdb.top250.js'],

  // Options to be passed to Jasmine.
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 60000
  }
};
