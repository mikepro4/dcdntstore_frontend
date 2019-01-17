import App from "../App";
import Home from "../react/pages/home";
import Manager from "../react/pages/manager";
import Shapes from "../react/pages/manager/shapes";
import Products from "../react/pages/manager/products";
import Users from "../react/pages/manager/users";

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
						params: {
							name: "manager_shapes"
						}
					},
					{
						...Products,
						path: "/manager/products",
						params: {
							name: "manager_products"
						}
					},
					{
						...Users,
						path: "/manager/users",
						params: {
							name: "manager_users"
						}
					}
				]
			}
		]
	}
];
