import * as _ from "lodash";

import {
    SHOW_MODAL_CONFIRM_DELETE,
    HIDE_MODAL_CONFIRM_DELETE
} from "../actions/types";

/////////////////////////////////////////////////

export const showConfirmDelete = () => async (dispatch, getState, api) => {
	dispatch({
		type: SHOW_MODAL_CONFIRM_DELETE,
	})
}

export const hideConfirmDelete = () => async (dispatch, getState, api) => {
	dispatch({
		type: HIDE_MODAL_CONFIRM_DELETE,
	})
}

/////////////////////////////////////////////////