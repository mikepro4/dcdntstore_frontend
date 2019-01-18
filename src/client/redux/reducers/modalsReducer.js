import {
    SHOW_MODAL_CONFIRM_DELETE,
    HIDE_MODAL_CONFIRM_DELETE
} from "../actions/types";

export const initialState = {
	confirmDelete: false,
};

export const modalsReducer = (state = initialState, action) => {
	switch (action.type) {
		case SHOW_MODAL_CONFIRM_DELETE:
			return {
				...state,
				confirmDelete: true
            }
        case HIDE_MODAL_CONFIRM_DELETE:
			return {
				...state,
				confirmDelete: false
			}
		default:
			return state;
	}
};
