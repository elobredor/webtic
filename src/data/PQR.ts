// Define la interfaz PQR como antes
export interface PQR {
	id: string;
	fechaCreacion: string;
	tipo: string;
	descripcion: string;
	estado: string;
	adjuntos: string[];
}

// Agrega un objeto que describe las propiedades del modelo PQR
export const PQRModel = {
	id: "string",
	fechaCreacion: "string",
	tipo: "string",
	descripcion: "string",
	estado: "string",
	adjuntos: "array",
};
