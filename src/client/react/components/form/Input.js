import React, { PropTypes } from "react";
import classnames from "classnames";

const Input = ({
	input,
	label,
	placeholder,
	icon,
	large,
	type,
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
			{label ? (
				<div className="input-group-left">
					<div className="input-label">{label}</div>
				</div>
			) : (
				""
			)}

			<div className="input-group-right">
				{icon ? <span className={`bp3-icon bp3-icon-${icon}`} /> : ""}

				<input
					{...input}
					className={inputClassName}
					placeholder={placeholder}
					type={type}
				/>

				{touched && error ? (
					<div className="input-error">
						{touched && error && <span>{error}</span>}
					</div>
				) : (
					""
				)}

				{touched && !error ? (
					<div className="input-valid">
						ok
					</div>
				) : (
					""
				)}
			</div>
		</div>
	);
};

export default Input;
