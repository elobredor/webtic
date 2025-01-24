export interface LinkItem {
	href: string;
	label: string;
	subLinks?: LinkItem[];
}

export const links: LinkItem[] = [
	{ href: "/dashboard", label: "Dashboard" },
	{ href: "/dashboard/solicitudes", label: "Solicitudes" },
	{ href: "/dashboard/pedidos", label: "Pedidos" },
	{ href: "/dashboard/productos", label: "Productos" },
	{ href: "/dashboard/vendedores", label: "Vendedores" },
	{ href: "/dashboard/pqrs", label: "PQRS" },
	// {
	// 	href: "/dashboard/menu",
	// 	label: "MENU CON INCISOS",
	// 	subLinks: [
	// 		{ href: "/dashboard/menu/example1", label: "Ejemplo1" },
	// 		{ href: "/dashboard/menu/example2", label: "Ejemplo2" },
	// 		{ href: "/dashboard/menu/example3", label: "Ejemplo3" },
	// 	],
	// },
];
