import { PQRModel } from "./PQR";
import { OtroTipoModel } from "./OtroTipo"; // Asegúrate de definir un modelo para cada tipo

const typeMap: Record<string, any> = {
	pqr: PQRModel, // Ahora usa PQRModel
	otroTipo: OtroTipoModel,
};

export function getInterface(type: string): any {
	return typeMap[type] || null;
}
