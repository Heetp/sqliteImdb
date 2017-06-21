let sqlite3 = require('sqlite3').verbose();
let sqliteDb = new sqlite3.Database(browser.params.dbPath);

 function DB(){
   this.createTop250Table = ()=>{
     sqliteDb.serialize(()=> {
       sqliteDb.run("CREATE TABLE Top250 (title TEXT, year INT, rank INT, rating REAL)");
     });
   }

   this.storeTop250Movies = (arr)=>{
     let p = protractor.promise.defer();
    sqliteDb.serialize(()=>{
      arr.forEach((elem, index)=>{
          sqliteDb.run("INSERT INTO Top250 VALUES (\""+elem.title+"\","+elem.year+","+elem.rank+","+elem.rating+")")
          if(index == arr.length - 1){
              p.fulfill();
          }
      });
    });
    return p.promise;
   }

   this.printTop250Movies = ()=>{
     let p = protractor.promise.defer();
     sqliteDb.serialize(()=>{
        sqliteDb.each("SELECT * from Top250", (err, rows)=>{
          if(err){
            expect(err).toBeNull();
            p.reject();
          }
          console.log(rows.rank, rows.title, rows.year, rows.rating);
          p.fulfill();
        });
     });
     return p.promise;
   }

   this.closeDB = ()=>{
     sqliteDb.serialize(()=>{
       sqliteDb.run("Drop TABLE Top250");
     });
     sqliteDb.close();
   }
 }

module.exports = new DB();
