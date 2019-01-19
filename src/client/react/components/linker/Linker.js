import React, { Component } from "react";
import { Field, reduxForm, formValueSelector } from "redux-form";
import classnames from "classnames";
import { Form } from "redux-form";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Intent } from "@blueprintjs/core";
import uuid from 'uuid'

import ReactSelect from "../form/ReactSelectAsync";

class ShapesLinkerForm extends Component {

	render() {
        const { handleSubmit } = this.props;

		return (
            <div className="linker-container">

                <div className="linked-item-deatils">
                    <Link 
                        to={this.props.itemLink}
                    >
                        <div className="linked-item-avatar">
                            <img src={this.props.itemAvatar}/>
                        </div>

                        <div className="linked-item-label">
                            {this.props.itemLabel}
                        </div>
                    </Link>
                </div>
                <Form onSubmit={handleSubmit} autoComplete="off" >

                    <Field
                        name="itemToLink"
                        component={ReactSelect}
                        loadOptions={(input, callback) => this.props.loadOptions(input, callback)}
                        placeholder="Search..."
                        label="Select item to link:"
                        ref="itemToLink"
                    />

		            <Button
                        intent={Intent.PRIMARY}
                        loading={this.props.loading}
                        disabled={this.props.pristine}
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
	form: uuid(),
    validate,
})(ShapesLinkerForm);

const mapStateToProps = state => ({});

export default connect(mapStateToProps, {
})(ShapesLinkerForm);

