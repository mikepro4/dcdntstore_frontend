import React, { PropTypes } from "react";
import classnames from "classnames";
import Async from 'react-select/lib/Async'
import * as _ from 'lodash'

const ReactSelect = ({
	input,
	label,
	placeholder,
	large,
	type,
	minDate,
	loadOptions,
	meta: { touched, error }
}) => {
	let containerClassName = classnames({
		"input-group": true,
		"bp3-large": large,
		"input-valid": touched && !error,
		"input-invalid": touched && error
	});

	let inputClassName = classnames({
		"bp3-input": true,
		"bp3-intent-success": touched && !error,
		"bp3-intent-danger": touched && error
	});


	return (
		<div className={containerClassName}>
			<div className="input-group-left">
				{label ? <div className="input-label">{label}</div> : ""}
			</div>

			<div className="input-group-right">
				<Async
					{...input}
					onChange={value => input.onChange(value)}
					onBlur={() => input.onBlur(input.value)}
					loadOptions={_.throttle(loadOptions, 500)}
					value={input.value}
					className="react-select"
					autoload={true}
					placeholder={placeholder}
					simpleValue
					clearable
					searchable
				/>

				{touched && error ? (
					<div className="input-error">
						{touched && error && <span>{error}</span>}
					</div>
				) : (
					""
				)}
			</div>
		</div>
	);
};

export default ReactSelect;
