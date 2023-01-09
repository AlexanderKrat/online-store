import StorePage from ".";
import { Product, SearchFieldInterface } from "../../components/types";
import { Filters } from "./filter";

export class SearchField implements SearchFieldInterface {

    static currentInput: string;
    static currentCollection: Product[];

    createSearchField(): HTMLElement {

        const search_bar = document.createElement('div');
        search_bar.className = 'search-bar d-flex justify-content-between';

        const inputElem: HTMLInputElement = document.createElement('input');
        inputElem.type = 'text';
        inputElem.name = 'text';
        inputElem.autocomplete = 'off';
        inputElem.placeholder = 'Search products';
        inputElem.className = 'form-control search-reset__input me-3';

        inputElem.addEventListener('input', () => {
            SearchField.currentInput = inputElem.value;
            if (!SearchField.currentInput) {
                const createProductsItems = new StorePage('store-page');
                createProductsItems.createProductsItems(Filters.currentCollection);
            }
            const currentCollection = Filters.currentCollection.filter((item) => {
                const title = item.title.toLocaleLowerCase();
                return title.includes(SearchField.currentInput.toLowerCase());
            });
            SearchField.currentCollection = currentCollection;
            const createProductsItems = new StorePage('store-page');
            createProductsItems.createProductsItems(currentCollection);
        });

        const clearBtn = this.createSearchFieldClearBtn(inputElem);
        window.addEventListener('DOMContentLoaded', () => {
            inputElem.focus();
        });

        search_bar.append(inputElem, clearBtn)
        return search_bar;
    }
    createSearchFieldClearBtn(inputElem: HTMLInputElement): HTMLButtonElement {
        const clearBtn: HTMLButtonElement = document.createElement('button');
        clearBtn.className = 'btn btn-info search-reset__clear';
        clearBtn.innerHTML = '&#x2715';

        clearBtn.addEventListener('click', () => {
            inputElem.value = '';
            SearchField.currentInput = '';
            Filters.filterProducts();
            inputElem.focus();
        });

        return clearBtn;
    }

}