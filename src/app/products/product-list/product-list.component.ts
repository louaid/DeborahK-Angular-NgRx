import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { getCurrentProduct, getError, getProducts, getShowProductCode, State } from 'src/app/products/state/product.reducer';

import { Product } from '../product';
import { ProductService } from '../product.service';

import * as ProductActions from './../state/product.actions';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Products';
  errorMessage$: Observable<string>;

  displayCode$: Observable<boolean>;

  products$: Observable<Product[]>;

  // Used to highlight the selected product in the list
  selectedProduct$: Observable<Product | null>;

  constructor(
    private productService: ProductService,
    private store: Store<State>
  ) { }

  ngOnInit(): void {
    // TODO: Unsubscribe
    this.selectedProduct$ = this.store.select(getCurrentProduct);

    this.store.dispatch(ProductActions.loadProducts());

    this.errorMessage$ = this.store.select(getError);

    this.products$ = this.store.select(getProducts);

    this.displayCode$ = this.store.select(getShowProductCode);
  }

  checkChanged(): void {
    this.store.dispatch(ProductActions.toggleProductCode());
  }

  newProduct(): void {
    this.store.dispatch(ProductActions.intializeCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(ProductActions.setCurrentProductId({
      currentProductId: product.id
    }));
  }

}
