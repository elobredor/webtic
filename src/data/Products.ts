export interface Product {
	id: number;
	name: string;
	image: string;
	um: string;
	freeShipping: boolean;
	status: boolean;
	seller: any;
	stock: string;
	stockmax: any;
	price: any;
	rating: any;
	descripcion: any;
	brand: number;
	categoria: number;
	nombrecategoria: string;
	tipoenvio: string;
	nombremarca: string;
	MiNegocioModel?: MiNegocioModel;
	disponible?: string;
	vendedor?: string;
	marca?: string;
	tipoenv?: number;
	sales?: any;
	shipping?: any;
}
