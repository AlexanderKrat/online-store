import { SearchField } from './search';
import { SortByEnum, SortersInterface } from './../../components/types';
import { Filters } from "./filter";

export class Sorters extends Filters implements SortersInterface {
    static activeSortBtn: HTMLButtonElement | null;

    checkLocalStorageSorter(sorterVal = ''): void {
        const currentSorters: string | null = localStorage.getItem('sorter');
        if (currentSorters !== sorterVal && currentSorters) {
            localStorage.setItem('sorter', sorterVal)
        } else if (!currentSorters) [
            localStorage.setItem('sorter', sorterVal)
        ]
    }
    createSorters(): HTMLElement {
        const sort_bar = document.createElement("div");
        const sortByNameAscendingBtn: HTMLButtonElement = this.createSortersBtns(
            SortByEnum.NameAsc,
            'A-z'
        );
        const sortByNameDecendingBtn: HTMLButtonElement = this.createSortersBtns(
            SortByEnum.NameDes,
            'z-A'
        );
        const sortByPriceAscendingBtn: HTMLButtonElement = this.createSortersBtns(
            SortByEnum.PriceAsc,
            'Higher Price'
        );
        const sortByPriceDecendingBtn: HTMLButtonElement = this.createSortersBtns(
            SortByEnum.PriceDes,
            'Lower Price'
        );
        sort_bar.append(
            sortByNameAscendingBtn,
            sortByNameDecendingBtn,
            sortByPriceAscendingBtn,
            sortByPriceDecendingBtn
        )
        this.checkForActiveSortersOnReload();
        return sort_bar;
    }
    createSortersBtns(sorterName: string, innerText: string): HTMLButtonElement {
        const sortBtn: HTMLButtonElement = document.createElement('button');
        sortBtn.className = "btn btn-secondary me-2";
        sortBtn.setAttribute('sorter', sorterName);
        sortBtn.innerText = innerText;

        sortBtn.addEventListener('click', (): void => {
            this.checkLocalStorageSorter(sorterName);
            Sorters.sortBy(sorterName);
            this.checkForActiveSorterBtn(sortBtn);
        });
        return sortBtn;
    }
    checkForActiveSorterBtn(btn: HTMLButtonElement): void {
        if (Sorters.activeSortBtn) {
            Sorters.activeSortBtn.classList.toggle('sorters__btn--active');
            Sorters.activeSortBtn = btn;
            btn.classList.toggle('sorters__btn--active');
        } else {
            btn.classList.toggle('sorters__btn--active');
            Sorters.activeSortBtn = btn;
        }
    }
    checkForActiveSortersOnReload(): void {
        const activeSorters: string | null = localStorage.getItem('sorter');
        const sorterBtns: HTMLCollection = document.getElementsByClassName('btn btn-secondary me-2');
        if (activeSorters) {
            for (const btn of sorterBtns) {
                if (btn.getAttribute('sorter') === activeSorters) {
                    btn.classList.add('sorters__btn--active');
                    Sorters.activeSortBtn = btn as HTMLButtonElement;
                    return;
                }
            }
        }
    }
    static sortBy(activeSorter: string) {
        if (SearchField.currentInput) {
            Sorters.currentCollection = Sorters.currentCollection.filter((item) =>
                item.title.toLowerCase().includes(SearchField.currentInput)
            );
        }
        switch (activeSorter) {
            case SortByEnum.NameAsc:
                Sorters.currentCollection.sort((a, b) => (a.title > b.title ? 1 : -1));
                break;
            case SortByEnum.NameDes:
                Sorters.currentCollection.sort((a, b) => (a.title < b.title ? 1 : -1));
                break;
            case SortByEnum.PriceAsc:
                Sorters.currentCollection.sort((a, b) => (a.price > b.price ? 1 : -1));
                break;
            case SortByEnum.PriceDes:
                Sorters.currentCollection.sort((a, b) => (a.price < b.price ? 1 : -1))
            default:
                break;
        }
        const createProductsItems = new Storage();
        createProductsItems.createProductsItems(Sorters.currentCollection); 
    }
}