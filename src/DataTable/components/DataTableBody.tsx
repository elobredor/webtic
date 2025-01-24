import { FC } from "react";
import { Column } from "../../data/Column";

interface DataTableBodyProps {
	visibleColumnsList: Column[];
	paginatedData: any[];
	onView?: (item: any) => void;
	onEdit?: (item: any) => void;
	onDelete?: (item: any) => void;
	renderActions?: (item: any) => React.ReactNode;
	tableId: string;
}

const DataTableBody: FC<DataTableBodyProps> = ({
	visibleColumnsList,
	paginatedData,
	onView,
	onEdit,
	onDelete,
	renderActions,
	tableId,
}) => {
	if (paginatedData.length === 0) {
		return (
			<tr>
				<td
					colSpan={
						visibleColumnsList.length +
						(onView || onEdit || onDelete || renderActions ? 1 : 0)
					}
					className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400"
				>
					No hay datos disponibles
				</td>
			</tr>
		);
	}

	return (
		<>
			{paginatedData.map((item, index) => (
				<tr
					key={`${tableId}-row-${index}`}
					className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
				>
					{visibleColumnsList.map((column) => (
						<td
							key={`${tableId}-cell-${index}-${column.key.trim()}`}
							className="px-6 py-4"
						>
							{column.render
								? column.render(item[column.key.trim()], item)
								: item[column.key.trim()]}
						</td>
					))}
					{/* Renderiza acciones */}
				</tr>
			))}
		</>
	);
};

export default DataTableBody;
