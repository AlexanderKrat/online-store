import { PRODUCTS } from "../../components/data";
import Page from "../../components/page";
import { BrandFilterInterface, CardInterface, FiltersNameEnum, Product } from "../../components/types";
import { BrandFilter } from "./brand_filter";
import { Filters } from "./filter";
import { Product_list } from "./product_list";
import { SearchField } from "./search";
import { Sorters } from "./sorts";

export class StorePage extends Page{

  
  constructor(id:string){
   super(id)
  }
  createProductsItems(products: Product[] = PRODUCTS) {
    const products_items: HTMLDivElement = document.createElement('div');
    products_items.className = "products-items";
    for (let i = 0; i < products.length; i++) {
      const products_lists: CardInterface = new Product_list(products[i]);
      products_items.append(products_lists.createProductList());
    }
    return products_items;
  }
  createWrapperBlock() {
    const wrapper: HTMLDivElement = document.createElement('div');
    wrapper.className = "wrapper d-flex";

    const filter_block = document.createElement("aside");
    filter_block.className = "filter-block me-4 col-3 rounded-3";

    const valueFilter = new Filters();
    const brandFilter: BrandFilterInterface = new BrandFilter();

    filter_block.append(valueFilter.createValueFilters(FiltersNameEnum.Category, valueFilter.createMakerFilter()), brandFilter.createValueFilters(FiltersNameEnum.Brand, brandFilter.createBrandFilter()))

    const products_block: HTMLDivElement = document.createElement('div');
    products_block.className = "products-block rounded-3";

    const sort_products: HTMLDivElement = document.createElement('div');
    sort_products.className = "sort-products d-flex justify-content-between";

    const createSort = new Sorters();

    const search_bar = new SearchField();
    
    const products_items = this.createProductsItems();
    sort_products.append(createSort.createSorters(), search_bar.createSearchField());
    
    products_block.append(sort_products,products_items);
    wrapper.append(filter_block,products_block);

    return wrapper;
  }

  render(){
    this.createWrapperBlock()
    return this.container
  }
}

export default StorePage 