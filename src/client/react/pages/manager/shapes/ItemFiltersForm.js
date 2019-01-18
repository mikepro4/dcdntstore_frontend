import React, { Component } from "react";
import { Field, reduxForm, formValueSelector } from "redux-form";
import classnames from "classnames";
import { Form } from "redux-form";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@blueprintjs/core";

import Input from "../../../components/form/Input";
import Select from "../../../components/form/Select";
import Textarea from "../../../components/form/Textarea";

class ItemFiltersForm extends Component {
	render() {
		const { handleSubmit } = this.props;

		return (
            <div className="item-filters-form">
                <Form onSubmit={handleSubmit} autoComplete="off">
                    <Field
                        name="title"
                        component={Input}
                        label="Title"
                        placeholder="Type shape title..."
                        ref="title"
                    />

                    <Field
                        name="description"
                        component={Input}
                        label="Description"
                        placeholder="Type shape description..."
                        ref="description"
                    />

                    <Field
                        name="catalogNumber"
                        component={Input}
                        label="Catalog Number"
                        placeholder="Type catalog number..."
                        ref="catalogNumber"
                    />

                    <Field
                        name="urlName"
                        component={Input}
                        label="Url Name"
                        placeholder="Type url name..."
                        ref="urlName"
                    />

                    <Field
                        name="status"
                        component={Select}
                        label="Status"
                        ref="status"
                    >
                        <option>Select...</option>
                        <option value="private">Private</option>
                        <option value="public">Public</option>
                    </Field>

                    <Field
                        name="isHighlighted"
                        component={Select}
                        label="Is highlighted?"
                        ref="isHighlighted"
                    >
                        <option>Select...</option>
                        <option value={true}>Enabled</option>
                        <option value={false}>Disabled</option>
                    </Field>

		            <Button
                        style={{display: "none"}}
                        loading={this.props.loading}
                        type="submit"
                    />
                </Form>
            </div>
		);
	}
}

const validate = values => {
    const errors = {};
	return errors;
};

ItemFiltersForm = reduxForm({
	form: "shape_filters",
	validate,
})(ItemFiltersForm);

ItemFiltersForm = connect(state => {
	return {
	};
})(ItemFiltersForm);

export default ItemFiltersForm;
