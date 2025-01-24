export interface Column {
	key: string;
	title: string;
	sortable?: boolean;
	editable?: boolean;
	render?: (value: any, row: any) => React.ReactNode;
	class?: string;
}
