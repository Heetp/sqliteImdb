let imdb = require("./../pages/home.js");
let moviesList= require("./../pages/movieList.js");
let db;

describe("Store and Display top 250 movies in IMDB", ()=>{
    beforeAll(()=>{
      db = require("./../pages/sqliteDb.js");
      db.createTop250Table();
    });
    afterAll(()=>{
      db.closeDB();
    });
    it("Navigate to the IMDB page", ()=>{
        imdb.fNavigate();
    });
    it("Hover over the Movies, TV & Showtimes menu and select Top Rated movies", () =>{
      imdb.selectMegaMenu("Movies", "Top Rated Movies");
    });
    it("Store the movies, year of release and IMDB rating in the SQLLite database",(done)=>{
        moviesList.setListHeaders().then(()=>{
          moviesList.retrieveListInformation().then((arr)=>{
            db.storeTop250Movies(arr).then(()=>{
              done();
            })
          })
        })
    });
    it("Display all the records from the movie database", (done)=>{
      db.printTop250Movies().then(done);
    });
});
