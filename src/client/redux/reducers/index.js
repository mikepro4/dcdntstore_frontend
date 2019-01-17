import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { routerReducer } from "react-router-redux";
import { appReducer } from "./appReducer";
import { shapesReducer } from "./manager/shapesReducer";

const REDUCERS_OBJECT = {
	app: appReducer,
	form: formReducer,
	shapes: shapesReducer,
	router: routerReducer,
};

export default combineReducers(REDUCERS_OBJECT);
