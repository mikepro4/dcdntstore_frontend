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
  
  export const productsReducer = (state = initialState, action) => {
      switch (action.type) {
        case SEARCH_PRODUCTS:
            return {
                ...state,
                loading: true,
                updateCollection: false
            }
        case SEARCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                loadedCollection: action.payload.all,
                loadedCollectionCount: action.payload.count
            }
        case CREATE_PRODUCT:
            return {
                ...state,
                loading: true,
            }
        case CREATE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                updateCollection: true
            }
        case DELETE_PRODUCT:
            return {
                ...state,
                updateCollection: true
            }
        case LOAD_PRODUCT_SUCCESS:
            return {
                ...state,
                current: action.payload
            }
        case CLEAR_CURRENT_PRODUCT:
            return {
                ...state,
                current: {}
            };
        case UPDATE_PRODUCT:
            return {
                ...state,
                loading: true,
            }
        case UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                current: action.payload
            }
        case UPDATE_PRODUCT_FILTERS:
            return {
                ...state,
                collectionFilters: action.payload
            }
        case RESET_PRODUCT_FILTERS:
            return {
                ...state,
                collectionFilters: {}
            }
        case UPDATE_PRODUCT_COLLECTION_SETTINGS:
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
  