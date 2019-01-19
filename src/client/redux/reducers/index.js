import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { routerReducer } from "react-router-redux";
import { appReducer } from "./appReducer";
import { shapesReducer } from "./manager/shapesReducer";
import { productsReducer } from "./manager/productsReducer";
import { categoriesReducer } from "./manager/categoriesReducer";
import { modalsReducer } from "./modalsReducer"

const REDUCERS_OBJECT = {
	app: appReducer,
	form: formReducer,
	shapes: shapesReducer,
	products: productsReducer,
	categories: categoriesReducer,
	router: routerReducer,
	modals: modalsReducer
};

export default combineReducers(REDUCERS_OBJECT);
