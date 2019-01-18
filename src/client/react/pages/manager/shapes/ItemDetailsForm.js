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
                        placeholder="Type shape title..."
                        ref="title"
                    />

                    <Field
                        name="description"
                        component={Textarea}
                        label="Description"
                        placeholder="Type shape description..."
                        ref="description"
                    />

                    <Field
                        name="catalogNumber"
                        component={Input}
                        label="Catalog Number"
                        placeholder="Type catalog number..."
                        ref="description"
                    />

                    <Field
                        name="urlName"
                        component={Input}
                        label="URL Name"
                        placeholder="Type url name..."
                        ref="urlName"
                    />

                    <Field
                        name="status"
                        component={Select}
                        label="Status"
                        ref="status"
                    >
                        <option />
                        <option value="private">Private</option>
                        <option value="public">Public</option>
                    </Field>

                    <Field
                        name="discountEnabled"
                        component={Select}
                        label="Discount Enabled"
                        ref="discountEnabled"
                    >
                        <option />
                        <option value={true}>Enabled</option>
                        <option value={false}>Disabled</option>
                    </Field>

                    <Field
                        name="discountAmount"
                        component={Input}
                        label="Discount Amount"
                        placeholder="Type percenteage amount..."
                        ref="discountAmount"
                    />

                    <Field
                        name="labelEnabled"
                        component={Select}
                        label="Label Enabled"
                        ref="labelEnabled"
                    >
                        <option />
                        <option value={true}>Enabled</option>
                        <option value={false}>Disabled</option>
                    </Field>

                    <Field
                        name="order"
                        component={Input}
                        label="Order"
                        placeholder="Type order..."
                        ref="urlName"
                    />

                    <Field
                        name="isHighlighted"
                        component={Select}
                        label="Is highlighted?"
                        ref="isHighlighted"
                    >
                        <option />
                        <option value={true}>Enabled</option>
                        <option value={false}>Disabled</option>
                    </Field>

                    <Field
                        name="highlightedOrder"
                        component={Input}
                        label="Order"
                        placeholder="Type order..."
                        ref="highlightedOrder"
                    />

                    <Field
                        name="links.vectorPurchase"
                        component={Input}
                        label="Vector Purchase"
                        placeholder="Add link..."
                        ref="vectorPurchase"
                    />

                    <Field
                        name="links.rasterPurchase"
                        component={Input}
                        label="Raster Purchase"
                        placeholder="Add link..."
                        ref="rasterPurchase"
                    />

                    <Field
                        name="links.instagram"
                        component={Input}
                        label="instagram"
                        placeholder="Add link..."
                        ref="instagram"
                    />

                    <Field
                        name="links.dribbble"
                        component={Input}
                        label="dribbble"
                        placeholder="Add link..."
                        ref="dribbble"
                    />

                    <Field
                        name="links.behance"
                        component={Input}
                        label="behance"
                        placeholder="Add link..."
                        ref="behance"
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
    
    if (values.discountAmount) {
        let reg = new RegExp('^[0-9]+$');
        let isNumber = reg.test(values.discountAmount);
        if (!isNumber) {
            errors.discountAmount = "Has to contain only numbers";
        }
    }
    
    if (values.order) {
        let reg = new RegExp('^[0-9]+$');
        let isNumber = reg.test(values.order);
        if (!isNumber) {
            errors.order = "Has to contain only numbers";
        }
    }
    
    if (values.highlightedOrder) {
        let reg = new RegExp('^[0-9]+$');
        let isNumber = reg.test(values.highlightedOrder);
        if (!isNumber) {
            errors.highlightedOrder = "Has to contain only numbers";
        }
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
