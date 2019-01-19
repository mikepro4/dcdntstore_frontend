import * as _ from "lodash";

import {
  	SEARCH_CATEGORIES,
  	SEARCH_CATEGORIES_SUCCESS,
  	CREATE_CATEGORY,
  	CREATE_CATEGORY_SUCCESS,
  	DELETE_CATEGORY,
  	LOAD_CATEGORY_SUCCESS,
  	CLEAR_CURRENT_CATEGORY,
  	UPDATE_CATEGORY,
  	UPDATE_CATEGORY_SUCCESS,
	UPDATE_CATEGORY_COLLECTION_SETTINGS
} from "../../actions/types";

// =============================================================================

export const createCategory = (metadata, success) => async (dispatch, getState, api) => {

    dispatch({
        type: CREATE_CATEGORY
    });

	const res = await api.post("/categories/create", {
        metadata: metadata
    });

	dispatch({
		type: CREATE_CATEGORY_SUCCESS,
		payload: res.data
	})

  if (success) {
		success(res.data);
	}
}

// =============================================================================

export const searchCategories = (success) => async (dispatch, getState, api) => {

	let user = getState().app.user
	let object = getState().categories

	dispatch({
		type: SEARCH_CATEGORIES
	});

	let criteria = {}

	const response = await api.post("/categories/search", {
			criteria,
			sortProperty: object.collectionSettings.sortProperty.value,
			offset: object.collectionSettings.offset,
			limit: object.collectionSettings.limit,
			order: object.collectionSettings.order.value 
		}
	);

	dispatch({
		type: SEARCH_CATEGORIES_SUCCESS,
		payload: response.data
	});

	if (response.data && success) {
		success(response.data);
	}
};

// =============================================================================

export const searchCategoriesManual = (
	criteria,
	sortProperty,
	offset = 0,
	limit = 0,
	success
) => async (dispatch, getState, api) => {

	let order = -1 

	const response = await api.post("/categories/search", {
			criteria,
			sortProperty,
			offset,
			limit,
			order
		}
	);

	if (success) {
		success(response.data);
	}
};
// =============================================================================

export const deleteCategory = (categoryId, success) => async (
	dispatch,
	getState,
	api
) => {

    const response = await api.post("/categories/delete", { categoryId });
    
    if(response) {
        dispatch({
            type: DELETE_CATEGORY
        });
    }

	if (success) {
		success(response.data);
	}
};

// =============================================================================

export const updateCategory = (categoryId, newCategory, success) => async (
	dispatch,
	getState,
	api
) => {
  dispatch({
    type: UPDATE_CATEGORY
  });

	const response = await api.post("/categories/update", {
		categoryId,
		newCategory
	});

    if(response) {
        dispatch({
            type: UPDATE_CATEGORY_SUCCESS,
            payload: response.data.category
        });
    }

	if (success) {
		success(response.data);
	}
};

// =============================================================================

export const loadCategory = (categoryId, success) => async (
	dispatch,
	getState,
	api
) => {

    const response = await api.post("/categories/details", { categoryId });
    
    if(response) {
        dispatch({
            type: LOAD_CATEGORY_SUCCESS,
            payload: response.data
        });
    }

	if (success) {
		success(response.data);
	}
};

// =============================================================================

export const clearCurrentCategory = (success) => async (
	dispatch
) => {

    dispatch({
        type: CLEAR_CURRENT_CATEGORY
    });

	if (success) {
		success(response.data);
	}
};

// =============================================================================

export const updateCategoryCollectionSettings = (item, prop) => async (
	dispatch
) => {

    dispatch({
		type: UPDATE_CATEGORY_COLLECTION_SETTINGS,
		payload: item,
		prop: prop
	});

	dispatch(searchCategories())
}

// =============================================================================
