import { createReducer, on, createAction, createFeatureSelector, createSelector } from "@ngrx/store";
import { Product } from "../product";
import * as AppState from './../../state/app.state';
import * as ProductActions from './product.actions';

export interface ProductState {
    showProductCode: boolean;
    currentProductId: number | null;
    products: Product[];
    error: string;
}

export interface State extends AppState.State {
    products: ProductState;
}

const initialState: ProductState = {
    showProductCode: true,
    currentProductId: null,
    products: [],
    error: null
};

const getProductFeatureSelector = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(
    getProductFeatureSelector,
    state => state.showProductCode
);

export const getCurrentProductId = createSelector(
    getProductFeatureSelector,
    state => state.currentProductId
);

export const getCurrentProduct = createSelector(
    getProductFeatureSelector,
    getCurrentProductId,
    (state, currentProductId) => {
        if (currentProductId == 0) {
            return {
                id: 0,
                productName: '',
                productCode: 'New',
                description: '',
                starRating: 0
            };
        } else {
            return currentProductId ? state.products.find(p => p.id === currentProductId) : null;
        }
    }
);


export const getProducts = createSelector(
    getProductFeatureSelector,
    state => state.products
);

export const getError = createSelector(
    getProductFeatureSelector,
    state => state.error
);

export const productReducer = createReducer<ProductState>(
    initialState as ProductState,
    on(ProductActions.toggleProductCode, (state): ProductState => {
        return {
            ...state,
            showProductCode: !state.showProductCode
        };
    }),
    on(ProductActions.setCurrentProductId, (state, action): ProductState => {
        return {
            ...state,
            currentProductId: action.currentProductId
        };
    }),
    on(ProductActions.intializeCurrentProduct, (state): ProductState => {
        return {
            ...state,
            currentProductId: 0
        };
    }),
    on(ProductActions.loadProductsSuccess, (state, action) => {
        return {
            ...state,
            products: action.products,
            error: null
        };
    }),
    on(ProductActions.loadProductsFailure, (state, action) => {
        return {
            ...state,
            error: action.error
        };
    }),
    on(ProductActions.updateProductSuccess, (state, action) => {
        const updatedProducts = state.products.map((item: Product) => item.id === action.product.id ? action.product : item);

        return {
            ...state,
            products: updatedProducts,
            currentProductId: action.product.id,
            error: null
        };
    }),
    on(ProductActions.updateProductFailure, (state, action) => {
        return {
            ...state,
            error: action.error
        };
    })
);