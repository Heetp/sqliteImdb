  let EC = protractor.ExpectedConditions;

  function MoviesList(){
    const headerList = {};
    let moviesListElements = {
      pageHeader: element(by.css("h1.header")),
      listHeaders: element(by.css("table[data-caller-name='chart-top250movie']")).all(by.css("thead tr th")),
      listRows: element(by.css("table[data-caller-name='chart-top250movie']")).all(by.css("tbody tr")),
    }

    this.verifyPageHeader =  (expectedHeader)=>{
      expect(moviesListElements.pageHeader).toEqual(expectedHeader);
    }

    this.setListHeaders = ()=>{
      let p = protractor.promise.defer();

       moviesListElements.listHeaders.count().then((headerCount)=>{
         let headers = moviesListElements.listHeaders.map((elem, index)=>{
           return elem.getText().then((text)=>{
             return text;
           });
         });
         headers.then((headersArray)=>{
           headersArray.forEach((header, index)=>{
             headerList[header] = index;
             if(index === headerCount - 1)
             p.fulfill(headerList);
           });
         });
       });
     return p.promise;
    }

    this.retrieveListInformation = ()=>{
        let rankTitleIndex = headerList["Rank & Title"];
        let ratingIndex =  headerList["IMDb Rating"];
        let returnObj = [];
        let p = protractor.promise.defer();
        moviesListElements.listRows.count().then((rowsCount)=>{
          moviesListElements.listRows.each((row, index)=>{
            let dataCells = row.all(by.css("td"));
            dataCells.get(rankTitleIndex).getText().then((titleRankText)=>{
              dataCells.get(rankTitleIndex).element(by.css("a")).getText().then((titleText)=>{
                dataCells.get(rankTitleIndex).element(by.css("span")).getText().then((year)=>{
                  dataCells.get(ratingIndex).getText().then((ratingText)=>{
                    let tmpObj = {};
                    tmpObj.rating = Number(ratingText);
                    tmpObj.rank =  Number(titleRankText.split(".")[0]);
                    tmpObj.title = titleText;
                    tmpObj.year = Number(year.match(/\d+/g)[0]);
                    returnObj.push(tmpObj);
                    p.fulfill(returnObj);
                  });
                });
              });
            });
          });
        });
        return p.promise;
    }
}

module.exports =  new MoviesList();
