import * as _ from "lodash";

import {
  	SEARCH_PRODUCTS,
  	SEARCH_PRODUCTS_SUCCESS,
  	CREATE_PRODUCT,
  	CREATE_PRODUCT_SUCCESS,
  	DELETE_PRODUCT,
  	LOAD_PRODUCT_SUCCESS,
  	CLEAR_CURRENT_PRODUCT,
  	UPDATE_PRODUCT,
  	UPDATE_PRODUCT_SUCCESS,
  	UPDATE_PRODUCT_FILTERS,
	RESET_PRODUCT_FILTERS,
	UPDATE_PRODUCT_COLLECTION_SETTINGS
} from "../../actions/types";

import { reset } from "redux-form";

// =============================================================================

export const createProduct = (metadata, success) => async (dispatch, getState, api) => {

    dispatch({
        type: CREATE_PRODUCT
    });

	const res = await api.post("/products/create", {
        metadata: metadata
    });

	dispatch({
		type: CREATE_PRODUCT_SUCCESS,
		payload: res.data
	})

  if (success) {
		success(res.data);
	}
}

// =============================================================================

export const searchProducts = (
	criteria,
	sortProperty,
	offset = 0,
	limit = 0,
	success
) => async (dispatch, getState, api) => {

	let user = getState().app.user
	let object = getState().products

	dispatch({
		type: SEARCH_PRODUCTS
	});

	let criteria = getState().products.collectionFilters

	const response = await api.post("/products/search", {
			criteria,
			sortProperty: object.collectionSettings.sortProperty.value,
			offset: object.collectionSettings.offset,
			limit: object.collectionSettings.limit,
			order: object.collectionSettings.order.value 
		}
	);

	dispatch({
		type: SEARCH_PRODUCTS_SUCCESS,
		payload: response.data
	});

	if (response.data && success) {
		success();
	}
};

// =============================================================================

export const deleteProduct = (productId, success) => async (
	dispatch,
	getState,
	api
) => {

    const response = await api.post("/products/delete", { productId });
    
    if(response) {
        dispatch({
            type: DELETE_PRODUCT
        });
    }

	if (success) {
		success(response.data);
	}
};

// =============================================================================

export const updateProduct = (productId, newProduct, success) => async (
	dispatch,
	getState,
	api
) => {
  dispatch({
    type: UPDATE_PRODUCT
  });

	const response = await api.post("/products/update", {
		productId,
		newProduct
	});

    if(response) {
        dispatch({
        type: UPDATE_PRODUCT_SUCCESS,
        payload: response.data.product
        });
    }

	if (success) {
		success(response.data);
	}
};

// =============================================================================

export const loadProduct = (productId, success) => async (
	dispatch,
	getState,
	api
) => {

    const response = await api.post("/products/details", { productId });
    
    if(response) {
        dispatch({
            type: LOAD_PRODUCT_SUCCESS,
            payload: response.data
		});

		if (success) {
			success();
		}
    }

	
};

// =============================================================================

export const clearCurrentProduct = (success) => async (
	dispatch
) => {

    dispatch({
        type: CLEAR_CURRENT_PRODUCT
    });

	if (success) {
		success(response.data);
	}
};

// =============================================================================

export const updateProductFilters = (filters) => async (
	dispatch
) => {

    dispatch({
		type: UPDATE_PRODUCT_FILTERS,
		payload: filters
	});
}

export const resetProductFilters = () => async (
	dispatch
) => {

    dispatch({
		type: RESET_PRODUCT_FILTERS,
	});

	dispatch(reset("product_filters"));
}

// =============================================================================

export const updateProductCollectionSettings = (item, prop) => async (
	dispatch
) => {

    dispatch({
		type: UPDATE_PRODUCT_COLLECTION_SETTINGS,
		payload: item,
		prop: prop
	});

	dispatch(searchProducts())
}

// =============================================================================
