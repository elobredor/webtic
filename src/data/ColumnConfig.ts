// Define la interfaz para ColumnConfig
export interface ColumnConfig {
	key: string; // Clave del campo de datos
	title: string; // Título que se muestra en la cabecera
	sortable?: boolean; // Si la columna puede ordenarse
	render?: (value: any, record?: any) => JSX.Element; // Renderizado personalizado para la celda
}
