import React, { Component } from "react";
import { Field, reduxForm, formValueSelector } from "redux-form";
import classnames from "classnames";
import { Form } from "redux-form";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Intent } from "@blueprintjs/core";

import ReactSelect from "../form/ReactSelectAsync";

import { searchShapesManual } from '../../../redux/actions/manager/shapeActions'

class ShapesLinkerForm extends Component {
    searchShapes = (input, callback) => {
        this.props.searchShapesManual(
            { title: input },
            "createdAt",
            0,
            20,
            data => {
                let values = data.all.map(shape => ({
                    value: shape._id,
                    label: shape.metadata.title
                }))
                callback(values);
            }
        );
    };


	render() {
        const { handleSubmit } = this.props;
        console.log(this.props)

		return (
            <div className="linker-container">
                <Form onSubmit={handleSubmit} autoComplete="off" >

                    <Field
                        name="shape"
                        component={ReactSelect}
                        loadOptions={(input, callback) => this.searchShapes(input, callback)}
                        placeholder="Search shapes..."
                        ref="shape"
                    />

		            <Button
                        intent={Intent.PRIMARY}
                        loading={this.props.loading}
                        type="submit"
                        text="Update link"
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

ShapesLinkerForm = reduxForm({
	form: "linker",
    validate,
})(ShapesLinkerForm);

const mapStateToProps = state => ({});

export default connect(mapStateToProps, {
    searchShapesManual
})(ShapesLinkerForm);

