import {
    SEARCH_SHAPES,
    SEARCH_SHAPES_SUCCESS,
    CREATE_SHAPE,
    CREATE_SHAPE_SUCCESS,
    DELETE_SHAPE,
    LOAD_SHAPE_SUCCESS,
    CLEAR_CURRENT_SHAPE,
    UPDATE_SHAPE,
    UPDATE_SHAPE_SUCCESS,
    UPDATE_SHAPE_FILTERS,
    RESET_SHAPE_FILTERS,
    UPDATE_SHAPE_COLLECTION_SETTINGS
  } from "../../actions/types";

  import * as _ from "lodash";
  
  export const initialState = {
    loading: false,
    current: {},
    loadedCollection: [],
    loadedCollectionCount: null,
    updateCollection: false,
    collectionFilters: {},
    collectionSettings: {
        order: {
            label: "DESC",
            value: -1,
        },
        sortProperty: {
            label: "Date Created",
            value: "createdAt"
        },
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
        case UPDATE_SHAPE_FILTERS:
            return {
                ...state,
                collectionFilters: action.payload
            }
        case RESET_SHAPE_FILTERS:
            return {
                ...state,
                collectionFilters: {}
            }
        case UPDATE_SHAPE_COLLECTION_SETTINGS:
            let newColelctionSettings = _.merge({}, state.collectionSettings, {
                [action.prop]: action.payload
            })
            return {
                ...state,
                collectionSettings: newColelctionSettings
            }
        default:
            return state;
        }
  };
  