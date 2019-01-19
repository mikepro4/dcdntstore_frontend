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
import ReactSelect from "../../../components/form/ReactSelectAsync";

import {
	searchShapesManual
} from '../../../../redux/actions/manager/shapeActions'

class ItemDetailsForm extends Component {
	render() {
		const { handleSubmit } = this.props;

		return (
            <div className="item-details-form">
                <Form onSubmit={handleSubmit} autoComplete="off">
                    <Field
                        name="title"
                        component={Input}
                        label="Title"
                        placeholder="Type product title..."
                        ref="title"
                    />

                    <Field
                        name="description"
                        component={Textarea}
                        label="Description"
                        placeholder="Type product description..."
                        ref="description"
                    />

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
    
    if (!values.title) {
		errors.title = "Title is required";
    }

	return errors;
};

ItemDetailsForm = reduxForm({
	form: "product_edit",
	validate,
})(ItemDetailsForm);

const mapStateToProps = state => ({});

export default connect(mapStateToProps, {
	searchShapesManual
})(ItemDetailsForm);

