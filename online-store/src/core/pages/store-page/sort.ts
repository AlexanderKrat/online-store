import { SortByEnum, SortersInterface } from './../../components/types';
import { Filters } from "./filter";
import { SearchField } from './search';

export class Sorters extends Filters implements SortersInterface{
    static activeSortBtn: HTMLButtonElement | null;

    checkLocalStorageSorter(sorterVal = ''): void {
        const currentSorters: string|null=localStorage.get('sorter');
        if(currentSorters!==sorterVal&& currentSorters){
            localStorage.setItem('sorter', sorterVal)
        } else if(!currentSorters){
            localStorage.setItem('sorter', sorterVal)
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
    createSorters(): HTMLElement {
        throw new Error('Method not implemented.');
    }
    createSortersBtns(sorterName: string, innerText: string): HTMLButtonElement {
        throw new Error('Method not implemented.');
    }
    checkForActiveSorterBtn(btn: HTMLButtonElement): void {
        throw new Error('Method not implemented.');
    }
    checkForActiveSortersOnReload(): void {
        throw new Error('Method not implemented.');
    }

}

