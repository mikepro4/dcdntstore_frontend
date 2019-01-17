import App from "../App";
import Home from "../react/pages/home";
import Manager from "../react/pages/manager";
import Shapes from "../react/pages/manager/shapes";
import Products from "../react/pages/manager/products";
import Users from "../react/pages/manager/users";
import Shape from "../react/pages/manager/shapes/Item";

export default [
	{
		...App,
		routes: [
			{
				...Home,
				path: "/",
				exact: true,
				params: {
					name: "home"
				}
			},
			{
				...Manager,
				path: "/manager",
				params: {
					name: "manager"
				},
				routes: [
					{
						...Shapes,
						path: "/manager/shapes",
						exact: true,
						params: {
							name: "manager_shapes"
						}
					},
					{
						...Shape,
						path: "/manager/shapes/:shapeId",
						exact: true,
						params: {
							name: "manager_shape_details"
						}
					},
					{
						...Products,
						path: "/manager/products",
						exact: true,
						params: {
							name: "manager_products"
						}
					},
					{
						...Users,
						path: "/manager/users",
						exact: true,
						params: {
							name: "manager_users"
						}
					}
				]
			}
		]
	}
];
