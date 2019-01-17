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
  
  export const initialState = {
    loading: false,
    current: {},
    loadedCollection: [],
    loadedCollectionCount: null,
    updateCollection: false,
    collectionFilters: [],
    collectionSettings: {
        results: "all",
        order: -1,
        sortProperty: "createdAt",
        scrollPosition: 0,
        offset: 0,
        limit: 0
    }
  };
  
  export const shapesReducer = (state = initialState, action) => {
      switch (action.type) {
        case SEARCH_SHAPES:
            return {
                ...state,
                loading: true,
                updateCollection: false
            }
        case SEARCH_SHAPES_SUCCESS:
            return {
                ...state,
                loading: false,
                loadedCollection: action.payload.all,
                loadedCollectionCount: action.payload.count
            }
        case CREATE_SHAPE:
            return {
                ...state,
                loading: true,
            }
        case CREATE_SHAPE_SUCCESS:
            return {
                ...state,
                loading: false,
                updateCollection: true
            }
        case DELETE_SHAPE:
            return {
                ...state,
                updateCollection: true
            }
        case LOAD_SHAPE_SUCCESS:
            return {
                ...state,
                current: action.payload
            }
        case CLEAR_CURRENT_SHAPE:
            return {
                ...state,
                current: {}
            };
        case UPDATE_SHAPE:
            return {
                ...state,
                loading: true,
            }
        case UPDATE_SHAPE_SUCCESS:
            return {
                ...state,
                loading: false,
                current: action.payload
            }
            default:
                return state;
        }
  };
  