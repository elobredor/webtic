export interface OtroTipo {
	key: string;
	title: string;
	sortable?: boolean;
	editable?: boolean;
	render?: (value: any, row: any) => React.ReactNode;
	class?: string;
}

export const OtroTipoModel = {
	id: "id",
	fechaCreacion: "fechaCreacion",
	tipo: "tipo",
	descripcion: "descripcion",
	estado: "estado",
	adjuntos: "adjuntos",
};
