import { PRODUCTS } from '../../components/data';
import { BrandFilterInterface, FiltersNameEnum, Product } from './../../components/types';
import { Filters } from "./filter";

export class BrandFilter extends Filters implements BrandFilterInterface {

    createBrandFilter(): HTMLDivElement {
        const filter_list = document.createElement("div");
        filter_list.className = "filter-list";

        const set: Set<string> = new Set();
        PRODUCTS.forEach((el) => set.add(el.category));
        set.forEach((el) => {
            const checkbox_line = document.createElement("div");
            checkbox_line.className = "checkbox-line item-active d-grid mt-2";
            const makerBtn = this.createBrandFilterBtn(el);

            checkbox_line.append(makerBtn);
            filter_list.append(checkbox_line);
        });
       
        return filter_list;
    }
    createBrandFilterBtn(makerName: string): HTMLButtonElement {
        const makerData = PRODUCTS.find((el) => el.category === makerName) as Product;
        const makerFiilterBtn = document.createElement("button");
        makerFiilterBtn.className = "btn brand_btn";
        makerFiilterBtn.innerHTML = makerData.brand
        makerFiilterBtn.setAttribute(FiltersNameEnum.Category, makerName);
        makerFiilterBtn.addEventListener('click', () => {
            makerFiilterBtn.classList.toggle('common-btn--active');
            this.controlLocalStorageFilter(FiltersNameEnum.Brand, makerName);
            Filters.filterProducts();
        });
        return makerFiilterBtn;
    }
} 