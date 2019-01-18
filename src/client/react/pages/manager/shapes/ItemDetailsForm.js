import React, { Component } from "react";
import { Field, reduxForm, formValueSelector } from "redux-form";
import classnames from "classnames";
import { Form } from "redux-form";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@blueprintjs/core";

import Input from "../../../components/form/Input";

class ItemDetailsForm extends Component {
	render() {
		const { handleSubmit } = this.props;

		return (
            <div className="metadata-settings-form">
                <Form onSubmit={handleSubmit} autoComplete="off">
                    <Field
                        name="title"
                        component={Input}
                        label="Title"
                        placeholder="Type..."
                        ref="title"
                    />
                </Form>
            </div>
		);
	}
}

const validate = values => {
    const errors = {};
    
    if (!values.title) {
		errors.title = "Title is required";
	}

	return errors;
};

ItemDetailsForm = reduxForm({
	form: "shape_edit",
	validate,
})(ItemDetailsForm);

ItemDetailsForm = connect(state => {
	return {
	};
})(ItemDetailsForm);

export default ItemDetailsForm;
