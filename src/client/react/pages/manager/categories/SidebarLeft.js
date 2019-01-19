import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import * as _ from 'lodash'

import * as objTraverse from "obj-traverse/lib/obj-traverse";

import {
	ContextMenu,
	Menu,
	MenuDivider,
	MenuItem,
	Popover,
	PopoverInteractionKind,
	Button,
	Classes,
	Intent,
	Icon,
	ITreeNode,
	Tooltip,
	Tree
} from "@blueprintjs/core";

// import {
// 	addEntityType,
// 	updateTree,
// 	updateTreeSelection,
// 	showLinker,
// 	deleteEntityType,
// 	addParentEntityType,
// 	loadAllEntityTypes
// } from "../../../redux/actions/pageOntologyActions";

import {
    searchCategories,
    loadCategory,
	deleteCategory,
	clearCurrentCategory,
    updateCategory,
    updateCategoriesTree,
    getCategory,
    checkExpandedCategory,
    checkSelectedCategory,
    updateCategoriesTreeSelection
} from '../../../../redux/actions/manager/categoryActions'

import {
	submitForm,
} from '../../../../redux/actions/formActions'

class Sidebar extends Component {
    state = {
		nodes: []
    };
    
    componentDidMount = () => {
		this.computeTree();
	};

	componentDidUpdate = (prevProps, prevState) => {
		if (
			!_.isEqual(
				prevProps.categories.loadedCollection.sort(),
				this.props.categories.loadedCollection.sort()
			)
		) {
			this.computeTree();
        }
        
        if (prevProps.categories.current && this.props.categories.current && prevProps.categories.current._id !== this.props.categories.current._id) {
			this.computeTree();
		}
	};

    handleNodeClick = (nodeData, _nodePath, e) => {
        let noExpand = e.target.className.includes("no-expand");

        if (!noExpand) {
			if (!this.props.checkSelectedCategory(nodeData.id)) {
                if (!e.shiftKey) {
                    let tree = this.props.categories.tree
                    this.forEachNode(tree, n => (n.isSelected = false));
                    this.props.updateCategoriesTree(tree)
				}
				nodeData.isSelected = true;
				nodeData.isExpanded = true;
				this.props.loadCategory(nodeData.id);
				this.updateTreeState();
			}
		}
    }

    forEachNode = (nodes, callback) => {
		if (nodes == null) {
			return;
		}

		for (const node of nodes) {
			callback(node);
			this.forEachNode(node.childNodes, callback);
		}
	};

    handleNodeCollapse = nodeData => {
        console.log(nodeData)
    };

    handleNodeExpand = nodeData => {
        console.log(nodeData)
    };

    updateTreeState = () => {
		let expanded = objTraverse.findAll(
			{ childNodes: this.props.categories.tree },
			"childNodes",
			{
				isExpanded: true
			}
		);

		let selected = objTraverse.findAll(
			{ childNodes: this.props.categories.tree },
			"childNodes",
			{
				isSelected: true
			}
		);

		this.props.updateCategoriesTreeSelection(expanded, selected);
	};

    createChild = (categoryId) => {}
    deleteCategory = (categoryId) => {}

    renderMenu = category => {
		return (
			<Menu>
				<MenuItem
					icon="log-in"
					key="1"
					onClick={() => console.log("add parent")}
					text="Add Parent Category"
				/>
				<MenuItem
					icon="log-out"
					key="2"
					onClick={() => console.log("add child")}
					text="Add Child Category"
				/>
				<MenuDivider key="divider-2" />
				<MenuItem
					icon="trash"
					key="3"
					onClick={() => this.props.deleteCategory(category._id)}
					text="Delete Category"
				/>
			</Menu>
		);
	};
    
    generateNode = (category) => {
        let categoryChildren = []
        let categoryId = category._id
        let categoryImage = ""

        if(category.metadata.images && category.metadata.images.small) {
            categoryImage = category.metadata.images.small
        }

        if (category.childCategories) {
            categoryChildren = category.childCategories
        }

        const childNodes = categoryChildren.map(categoryChild => {
            let child = this.props.getCategory(categoryChild.categoryId)
            if(!_.isEmpty(child)) {
                return this.generateNode(child)
            }
        })

        return {
            childNodes,
            hasCaret: categoryChildren.length > 0,
            id: categoryId,
            isExpanded: this.props.checkExpandedCategory(categoryId),
            isSelected: this.props.checkSelectedCategory(categoryId),
            label: (
                <div className="label-container">
                    {categoryImage ? (
                        <span className="category-icon">
                            <img src={categoryImage}/>
                        </span>
                    ) : ""}

                    <span className="category-label">
                        {category.metadata.title} ({
                            category.childCategories.length
                        })
                    </span>
                </div>
            ),
            secondaryLabel : (
                <div className="right-label-container">
					<span
						className="bp3-icon-standard bp3-icon-plus create-child no-expand"
						onClick={() => console.log("create child category")}
					/>
					<Popover
						content={this.renderMenu(category)}
						interactionKind={PopoverInteractionKind.CLICK}
						className="au-no-expand"
					>
						<span className="bp3-icon-standard bp3-icon-more au-no-expand no-expand" />
					</Popover>
				</div>
            )
        }
    }

    computeTree = () => {
        let rootLevelCategories = _.filter(this.props.categories.loadedCollection, category => {
			return category.parentCategories.length == 0;
		});

		let sortedCategories = _.orderBy(
			rootLevelCategories,
			[category => category.metadata.title.toLowerCase()],
			["asc"]
		);

		let nodes = _.map(sortedCategories, category => {
			return this.generateNode(category);
        });
        
        console.log(nodes)

        this.props.updateCategoriesTree(nodes)
    }

    resetTree = () => {}
    
	render() {
		return (
			<div className="route-sidebar">
                <div className="route-sidebar-header">

					<div className="route-sidebar-header-section route-sidebar-header-left">
						<div className="route-sidebar-header-title">
							Category Structure
						</div>
					</div>

					<div className="route-sidebar-header-section route-sidebar-header-right">
						<Button
							intent={Intent.PRIMARY}
                            minimal="true"
                            icon="add"
							text="New"
							onClick={()=> console.log("add new")}
						/>
					</div>
				</div>

				<div className="route-sidebar-content">
                    <div className="browser-tree">
                        <Tree
                            contents={this.props.categories.tree}
                            onNodeClick={this.handleNodeClick}
                            onNodeCollapse={this.handleNodeCollapse}
                            onNodeExpand={this.handleNodeExpand}
                        />
                    </div>
				</div>
            </div>
		);
	}
}

function mapStateToProps(state) {
	return {
		location: state.router.location,
		categories: state.categories
	};
}

export default connect(mapStateToProps, {
	searchCategories,
    submitForm,
    getCategory,
    updateCategoriesTree,
    checkExpandedCategory,
    checkSelectedCategory,
    updateCategoriesTreeSelection,
    loadCategory,
    deleteCategory
})(withRouter(Sidebar));
