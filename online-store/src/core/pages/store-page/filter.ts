import { SearchField } from './search';
import { PRODUCTS } from './../../components/data';
import { Product, FilterDataType, FiltersNameEnum, FilterStringDataType, FilterRangeDataType, FilterRangeType } from './../../components/types';
import { FilterStringType, ValueFiltersInterface } from "../../components/types";
import { Sorters } from './sort';
export class Filters implements ValueFiltersInterface {
    static currentCollection: Product[];

    static initialFilter(): void {
        if (!localStorage.getItem('filters')) {
            localStorage.setItem(
                'filters',
                JSON.stringify(<FilterDataType>{
                    filterString: { category: [], brand: [] },
                    filterRange: { price: [], stock: [] },
                })
            );
        } else {

        }
    }
    
    createValueFilters(filterName:string, createFilter: HTMLDivElement): HTMLDivElement {
        const filterType: HTMLDivElement = document.createElement("div");
        filterType.className = "mb-5";
        const filterTitle: HTMLParagraphElement = document.createElement('h2');
        filterTitle.className = "title text-center";
        filterTitle.innerHTML =  `${filterName.toUpperCase()}`
        filterType.append(filterTitle, createFilter);
        
        Filters.initialFilter();
        this.checkActiveFilterBtns();
        
        return filterType;
    }

    createMakerFilter(): HTMLDivElement {
        const filter_list = document.createElement("div");
        filter_list.className = "filter-list";

        const set: Set<string> = new Set();
        PRODUCTS.forEach((el) => set.add(el.category));
        set.forEach((el) => {
            const checkbox_line = document.createElement("div");
            checkbox_line.className = "checkbox-line item-active d-grid mt-2";
            const makerBtn = this.createMakerFilterBtn(el);

            checkbox_line.append(makerBtn);
            filter_list.append(checkbox_line);
        });
       
        return filter_list;
    }

    createMakerFilterBtn(makerName: string): HTMLButtonElement {
        const makerData = PRODUCTS.find((el) => el.category === makerName) as Product;
        const makerFiilterBtn = document.createElement("button");
        makerFiilterBtn.className = "btn catalog_btn";
        makerFiilterBtn.innerText = makerData.category;
        makerFiilterBtn.setAttribute(FiltersNameEnum.Category, makerName);
        makerFiilterBtn.addEventListener('click', () => {
            makerFiilterBtn.classList.toggle('common-btn--active');
            this.controlLocalStorageFilter(FiltersNameEnum.Category, makerName);
            Filters.filterProducts();
        });
        return makerFiilterBtn;
    }
    static filterProducts(): void {
        const filterObj: FilterDataType = JSON.parse(localStorage.getItem('filters') as string);
        const filterString: FilterStringDataType = filterObj.filterString;
        const filterRange: FilterRangeDataType = filterObj.filterRange;
        const activeSorter = localStorage.getItem('sorter') as string;

        let filteredArr: Product[] = this.filterStringProducts(PRODUCTS.slice(), filterString);
        filteredArr = this.filterRangeProducts(filteredArr, filterRange);

        Filters.currentCollection = filteredArr;
        Sorters.currentCollection = filteredArr;
        const createProductsItems = new Storage();
        createProductsItems.createProductsItems(filteredArr);

        if (activeSorter) {
            Sorters.sortBy(activeSorter);
        }
    }
    static filterRangeProducts(
        filteredArr: Product[],
        filterRange: FilterRangeDataType
    ): Product[] {
        let newArr: Product[] = filteredArr;
        let isEmptyFilters = true;
        for (const key in filterRange) {
            if (filterRange[key as FilterRangeType]?.length) {
                newArr = this.filterWithRangeFilter(
                    filterRange[key as FilterRangeType],
                    newArr,
                    key as FilterRangeType
                );
                isEmptyFilters = false;
            }
        }

        return isEmptyFilters ? filteredArr : newArr;
    }

    static filterWithRangeFilter(
        filterValues: number[],
        items: Product[],
        filterName: FilterRangeType
    ): Product[] {
        let filteredArr: Product[] = items;
        filteredArr = filteredArr.filter(
            (item) => item[filterName] >= filterValues[0] && item[filterName] <= filterValues[1]
        );

        return filteredArr;
    }

    static filterStringProducts(
        filteredArr: Product[],
        filterString: FilterStringDataType
    ): Product[] {
        let newArr: Product[] = filteredArr;
        let isEmptyFilters = true;
        for (const key in filterString) {
            if (filterString[key as FilterStringType]?.length) {
                newArr = this.filterWithStringFilter(
                    filterString[key as FilterStringType],
                    newArr,
                    key as FilterStringType
                );
                isEmptyFilters = false;
            }
        }
        if (SearchField.currentInput && isEmptyFilters) {
            newArr = filteredArr.filter((item) => item.title.toLowerCase().includes(SearchField.currentInput));
        }
        return isEmptyFilters && SearchField.currentInput === '' ? PRODUCTS.slice() : newArr;
    }

    static filterWithStringFilter(
        filterValues: string[],
        items: Product[],
        filterName: FilterStringType
    ): Product[] {
        let filteredArr: Product[] = items;
        filteredArr = filteredArr.filter((item) => {
            return filterValues.find((filterValue) => item[filterName] === filterValue);
        });
        if (SearchField.currentInput) {
            filteredArr = filteredArr.filter((item) => item.title.toLowerCase().includes(SearchField.currentInput));
        }
        return filteredArr;
    }

    createMakerFilterLabel(makerName: string): HTMLLabelElement {
        const makerData = PRODUCTS.find((el) => el.category === makerName) as Product;
        const makerLabel = document.createElement("label");
        makerLabel.className = "ms-3"
        makerLabel.innerText = makerData.category;
        return makerLabel;
    }

    controlLocalStorageFilter(filterName: FilterStringType, filterValue: string): void {
        const filterObj: FilterDataType = JSON.parse(localStorage.getItem('filters') as string);
        let filterArr = filterObj.filterString[filterName];

        if(filterArr.includes(filterValue)){
            filterArr = filterArr.filter((el:string) => el !== filterValue);
        } else{
            filterArr.push(filterValue);
        }
        filterObj.filterString[filterName]= filterArr;
        localStorage.setItem('filters', JSON.stringify(filterObj));
    }
    checkActiveFilterBtns(): void {
        const makerFilterBtn:HTMLCollection = document.getElementsByClassName('category-checkbox');
        const brandFilterBtn:HTMLCollection = document.getElementsByClassName('brand-checkbox');
        this.setActiveBtnsOnReload(FiltersNameEnum.Category, makerFilterBtn);
        this.setActiveBtnsOnReload(FiltersNameEnum.Brand, brandFilterBtn);
    }
    setActiveBtnsOnReload(filterName: FilterStringType, filterBtns: HTMLCollection): void {
        const filterObj: FilterDataType = JSON.parse(localStorage.getItem('filters') as string);
        const filterStringObj: FilterStringDataType = filterObj.filterString;
        const filterArr:string []=filterStringObj[filterName];

        if(filterArr?.length){
            for (const key of filterBtns) {
                if (filterArr.includes(key.getAttribute(filterName)as string)) {
                    key.className = "'common-btn--active";
                }
            }
        }
    }


}