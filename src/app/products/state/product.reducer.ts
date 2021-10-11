import { createReducer, on, createAction, createFeatureSelector, createSelector } from "@ngrx/store";
import { Product } from "../product";
import * as AppState from './../../state/app.state';
import * as ProductActions from './product.actions';

export interface ProductState {
    showProductCode: boolean;
    currentProduct: Product;
    products: Product[];
}

export interface State extends AppState.State {
    products: ProductState;
}

const initialState: ProductState = {
    showProductCode: true,
    currentProduct: null,
    products: []
};

const getProductFeatureSelector = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(
    getProductFeatureSelector,
    state => state.showProductCode
);

export const getCurrentProduct = createSelector(
    getProductFeatureSelector,
    state => state.currentProduct
);

export const getProducts = createSelector(
    getProductFeatureSelector,
    state => state.products
);

export const productReducer = createReducer<ProductState>(
    initialState as ProductState,
    on(ProductActions.toggleProductCode, (state): ProductState => {
        return {
            ...state,
            showProductCode: !state.showProductCode
        };
    }),
    on(ProductActions.setCurrentProduct, (state, action): ProductState => {
        return {
            ...state,
            currentProduct: action.product
        };
    }),
    on(ProductActions.intializeCurrentProduct, (state): ProductState => {
        return {
            ...state,
            currentProduct: {
                id: 0,
                productName: '',
                productCode: 'New',
                description: '',
                starRating: 0
            }
        };
    })
);