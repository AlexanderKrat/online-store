import Page from "../components/page";
import StorePage from "../pages/store-page";
import CartPage from "../pages/card-page";
import ProductPage from "../pages/product-page";
import Header from "../components/layouts/header";
import ErrorPage from "../pages/error-page";
export const enum PageIds {
  StorePage = 'store-page',
  ProductPage = 'product-page',
  CartPage = 'cart-page'
}
class App {
  private static container:HTMLElement = document.body;
  private initialPage: StorePage;
  private header:Header;
  private static defoultPageID:string = 'current-page';

  static renderNewPage(idPage:string){
    const currentPageHTML = document.querySelector(`#${this.defoultPageID}`);
    if(currentPageHTML){
      currentPageHTML.remove();
    }
    let page: Page | null = null;
    if(idPage === PageIds.StorePage){
      page = new StorePage(idPage);
    }else if(idPage === PageIds.ProductPage){
      page = new ProductPage(idPage);
    }else if(idPage === PageIds.CartPage){
      page = new CartPage(idPage);
    }else{
      page = new ErrorPage(idPage, '404')
    }
    if(page){
      const PageHTML = page.render();
      PageHTML.id = App.defoultPageID;
      App.container.append(PageHTML);
    }
  }

  private enableRouteChange(){
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);
      App.renderNewPage(hash)
    })
  }
  constructor(){
    this.initialPage = new StorePage('store-page')
    this.header = new Header('nav', 'navbar navbar-expand-lg bg-light')
  } 

  run(){
    App.container.append(this.header.render(),this.initialPage.createWrapperBlock())
    App.renderNewPage('store-page')
    this.enableRouteChange()
  }
}
export default App;