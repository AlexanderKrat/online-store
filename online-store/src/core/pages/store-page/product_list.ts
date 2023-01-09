import { CardInterface, Product } from "../../components/types";

export class Product_list implements CardInterface {

    readonly productsData!: Product;
    button!: HTMLButtonElement;
    currentQuantity!: string | null;
    addedQuantity!: HTMLDivElement;
    constructor(productsData: Product) {
        this.productsData = productsData;
        this.currentQuantity = localStorage.getItem(`addedQuantity ${this.productsData.id}`);
    }
    createImg(): HTMLElement {
        const img: HTMLImageElement = new Image();
        img.src = this.productsData.images[0];
        img.alt = this.productsData.title;
        return img;
    }
    createImageContent(): HTMLElement {
        const item_image: HTMLDivElement = document.createElement('div');
        item_image.className = 'item-image';
        item_image.append(this.createImg());
        return item_image;
    }
    createTitle(): HTMLElement {
        const name_product: HTMLElement = document.createElement('p');
        name_product.className = 'name-product';
        name_product.innerText = `${this.productsData.title}`;
        return name_product;
    }
    createPrice(): HTMLElement {
        const price_product: HTMLElement = document.createElement('p');
        price_product.className = 'price-product';
        price_product.innerText = `${this.productsData.price} $`;
        return price_product;
    }
    createTitleContent(): HTMLElement {
        const item_title: HTMLDivElement = document.createElement('div');
        item_title.className = 'item-title mt-1';
        item_title.append(this.createTitle(), this.createPrice());
        return item_title;
    }
    createCardButton(): HTMLElement {
        const card_btn: HTMLButtonElement = document.createElement('button');
        card_btn.className = 'btn btn-success';
        card_btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
        class="bi bi-cart3" viewBox="0 0 16 16">
        <path
            d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
    </svg>`;
        this.button = card_btn;
        return card_btn;
    }
    createDetalisButton(): HTMLElement {
        const detalis_btn: HTMLButtonElement = document.createElement('button');
        detalis_btn.className = 'btn btn-info';
        detalis_btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
        class="bi bi-info-circle" viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
        <path
            d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
    </svg>`;
        this.button = detalis_btn;
        return detalis_btn;
    }
    createButtonContent(): HTMLElement {
        const item_button: HTMLDivElement = document.createElement('div');
        item_button.className = 'item-button d-flex justify-content-around';
        item_button.append(this.createCardButton(), this.createDetalisButton());
        return item_button;
    }
    createProductList(): HTMLElement {
        const products_item = document.createElement("div");
        products_item.className = "product-item rounded-3";
        if (!this.currentQuantity) {
            localStorage.setItem(`addedQuantity ${this.productsData.id}`, '0');
            this.currentQuantity = '0';
        }
        const image = this.createImageContent();
        const title = this.createTitleContent();
        const button = this.createButtonContent();

        products_item.append(image, title, button);
        return products_item;
    }
}
