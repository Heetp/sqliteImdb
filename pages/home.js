let EC = protractor.ExpectedConditions;

function HomePage(){
  let homePageElements = {
    imdbIcon: element(by.css("span#home_img_holder")),
    megaMenu: element(by.css("div#megaMenu")).all(by.css("li[class='js_nav_item']"))
  }

  this.fNavigate = ()=>{
    browser.get(browser.baseUrl);
    browser.wait(()=>{
      return homePageElements.megaMenu.count().then((count)=>{
         return count === 4;
      })
    }, 30000);
    expect(homePageElements.imdbIcon.isDisplayed()).toBeTruthy();
  }

  this.selectMegaMenu = (megaMenu, subMenu)=>{
    homePageElements.megaMenu.filter((elem, index)=>{
      return elem.element(by.css("p.navCategory")).getText().then((menuText)=>{
          return menuText.indexOf(megaMenu) > -1;
      });
    }).then((selectedMenu)=>{
      if(selectedMenu[0]){
        browser.actions().mouseMove(selectedMenu[0]).perform();
        browser.wait(()=>{
          return selectedMenu[0].element(by.css("div[class='sub_nav']")).isDisplayed().then((flag)=>{
               return flag;
          });

        }, 30000);
        let link = selectedMenu[0].element(by.linkText(subMenu));
        link.isDisplayed().then((flag)=>{
          expect(flag).toBeTruthy(megaMenu+" is not dispplayed on mouse hover");
          if(flag) link.click();
        })
      }
      else{
        expect(0).toBeTruthy("Incorrect megaMenu option:"+megaMenu);
      }
    });
  };
}

module.exports = new HomePage();
