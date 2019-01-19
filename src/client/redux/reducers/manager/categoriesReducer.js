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

  import * as _ from "lodash";
  
  export const initialState = {
    loading: false,
    current: {},
    loadedCollection: [],
    loadedCollectionCount: null,
    updateCollection: false,
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
  
  export const categoriesReducer = (state = initialState, action) => {
      switch (action.type) {
        case SEARCH_CATEGORIES:
            return {
                ...state,
                loading: true,
                updateCollection: false
            }
        case SEARCH_CATEGORIES_SUCCESS:
            return {
                ...state,
                loading: false,
                loadedCollection: action.payload.all,
                loadedCollectionCount: action.payload.count
            }
        case CREATE_CATEGORY:
            return {
                ...state,
                loading: true,
            }
        case CREATE_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                updateCollection: true
            }
        case DELETE_CATEGORY:
            return {
                ...state,
                updateCollection: true
            }
        case LOAD_CATEGORY_SUCCESS:
            return {
                ...state,
                current: action.payload
            }
        case CLEAR_CURRENT_CATEGORY:
            return {
                ...state,
                current: {}
            };
        case UPDATE_CATEGORY:
            return {
                ...state,
                loading: true,
            }
        case UPDATE_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                current: action.payload
            }
        case UPDATE_CATEGORY_COLLECTION_SETTINGS:
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
  