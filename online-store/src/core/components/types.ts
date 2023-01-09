export type Product = Record<FilterStringType, string> & {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
}


export interface RootObject {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
}

export interface CardInterface {
    productsData: Product;
    button: HTMLButtonElement;
    currentQuantity: string | null;
    addedQuantity: HTMLDivElement;
    createProductList(): HTMLElement;
    createImg(): HTMLElement;
    createImageContent(): HTMLElement;
    createTitle(): HTMLElement;
    createTitleContent(): HTMLElement;
    createCardButton(): HTMLElement;
    createDetalisButton(): HTMLElement;
    createButtonContent(): HTMLElement;
    createPrice(): HTMLElement;
}
export type FilterStringType = 'category' | 'brand';
export type FilterRangeType = 'price' | 'stock';
export type FilterStringDataType = Record<FilterStringType, string[]>;
export type FilterRangeDataType = Record<FilterRangeType, number[]>;
export type FilterDataType = {
    filterString: FilterStringDataType;
    filterRange: FilterRangeDataType;
}

export enum FiltersNameEnum{
    Category = 'category',
    Brand = 'brand',
}
export enum SortByEnum {
    NameAsc = 'sortByNameAscending',
    NameDes = 'sortByNameDescending',
    PriceAsc = 'sortByPriceAscending',
    PriceDes = 'sortByPriceDescending',
}

export interface ValueFiltersInterface {
    createValueFilters(filterName:string, createFilter: HTMLDivElement): HTMLElement;
    createMakerFilter(): HTMLDivElement;
    createMakerFilterBtn(makerName:string): HTMLButtonElement;
    controlLocalStorageFilter(filterName: FilterStringType, filterValue: string): void;
    checkActiveFilterBtns(): void;
    setActiveBtnsOnReload(filterName: FilterStringType, filterBtns: HTMLCollection): void;
}
export interface BrandFilterInterface extends ValueFiltersInterface{
    createBrandFilter():HTMLDivElement;
    createBrandFilterBtn(makerName:string): HTMLButtonElement;
}
export interface SortersInterface {
    checkLocalStorageSorter(sorterVal: string): void;
    createSorters(): HTMLElement;
    createSortersBtns(sorterName: string, innerText: string): HTMLButtonElement;
    checkForActiveSorterBtn(btn: HTMLButtonElement): void;
    checkForActiveSortersOnReload(): void;
}
export interface SearchFieldInterface{
    createSearchField():HTMLElement;
    createSearchFieldClearBtn(inputElem: HTMLInputElement): HTMLButtonElement;

}
