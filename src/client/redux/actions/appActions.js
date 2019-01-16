import * as _ from "lodash";

import {
	FETCH_AUTH,
} from "../actions/types";

export const fetchCurrentUser = () => async (dispatch, getState, api) => {
	const res = await api.get("current_user");

	dispatch({
		type: FETCH_AUTH,
		payload: res.data
	})
}