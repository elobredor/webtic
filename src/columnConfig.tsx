import { formatDate } from "./utils/formatters";

export const columns = [
	{ key: "id", title: "ID", sortable: true },
	{
		key: "fechaCreacion",
		title: "Fecha",
		sortable: true,
		render: (value: string) => <span>{formatDate(new Date(value))}</span>,
	},
	{ key: "tipo", title: "Tipo", sortable: true },
	{ key: "descripcion", title: "Descripción", sortable: false },
	{
		key: "estado",
		title: "Estado",
		sortable: true,
		render: (value: string) => (
			<span
				className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
					value === "ABIERTO"
						? "bg-green-100 text-green-800"
						: value === "ENPROCESO"
						? "bg-blue-100 text-blue-800"
						: "bg-red-100 text-red-800"
				}`}
			>
				{value.toLowerCase().charAt(0).toUpperCase() + value.slice(1)}
			</span>
		),
	},
];
