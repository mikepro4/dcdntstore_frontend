import * as _ from "lodash";

import {
  SEARCH_SHAPES,
  SEARCH_SHAPES_SUCCESS,
  CREATE_SHAPE,
  CREATE_SHAPE_SUCCESS,
  DELETE_SHAPE,
  LOAD_SHAPE_SUCCESS,
  CLEAR_CURRENT_SHAPE,
  UPDATE_SHAPE,
  UPDATE_SHAPE_SUCCESS
} from "../../actions/types";

// =============================================================================

export const createShape = (metadata, success) => async (dispatch, getState, api) => {

    dispatch({
        type: CREATE_SHAPE
    });

	const res = await api.post("/shapes/create", {
        metadata: metadata
    });

	dispatch({
		type: CREATE_SHAPE_SUCCESS,
		payload: res.data
	})

  if (success) {
		success(res.data);
	}
}

// =============================================================================

export const searchShapes = (
	criteria,
	sortProperty,
	offset = 0,
	limit = 0,
	success
) => async (dispatch, getState, api) => {

	let user = getState().app.user
	let object = getState().shapes

	dispatch({
		type: SEARCH_SHAPES
	});

	let criteria = { }

	const response = await api.post("/shapes/search", {
			criteria,
			sortProperty: object.collectionSettings.sortProperty,
			offset: object.collectionSettings.offset,
			limit: object.collectionSettings.limit,
			order: object.collectionSettings.order 
		}
	);

	dispatch({
		type: SEARCH_SHAPES_SUCCESS,
		payload: response.data
	});

	if (response.data && success) {
		success();
	}
};

// =============================================================================

export const deleteShape = (shapeId, success) => async (
	dispatch,
	getState,
	api
) => {

    const response = await api.post("/shapes/delete", { shapeId });
    
    if(response) {
        dispatch({
            type: DELETE_SHAPE
        });
    }

	if (success) {
		success(response.data);
	}
};

// =============================================================================

export const updateShape = (shapeId, newShape, success) => async (
	dispatch,
	getState,
	api
) => {
  dispatch({
    type: UPDATE_SHAPE
  });

	const response = await api.post("/shapes/update", {
		shapeId,
		newShape
	});

    if(response) {
        dispatch({
        type: UPDATE_SHAPE_SUCCESS,
        payload: response.data.shape
        });
    }

	if (success) {
		success(response.data);
	}
};

// =============================================================================

export const loadShape = (shapeId, success) => async (
	dispatch,
	getState,
	api
) => {

    const response = await api.post("/shapes/details", { shapeId });
    
    if(response) {
        dispatch({
            type: LOAD_SHAPE_SUCCESS,
            payload: response.data
        });
    }

	if (success) {
		success(response.data);
	}
};

// =============================================================================

export const clearCurrentShape = (success) => async (
	dispatch
) => {

    dispatch({
        type: CLEAR_CURRENT_SHAPE
    });

	if (success) {
		success(response.data);
	}
};

// =============================================================================
