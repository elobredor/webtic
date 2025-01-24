import { FC } from "react";
import { Column } from "../../data/Column";
import { Eye } from "lucide-react";

interface DataTableBodyProps {
	visibleColumnsList: Column[];
	paginatedData: any[];
	onView?: (item: any) => void;
	onEdit?: (item: any) => void;
	onDelete?: (item: any) => void;
	renderActions?: (item: any) => React.ReactNode;
	tableId: string;
	loading?: boolean;
}

const DataTableBody: FC<DataTableBodyProps> = ({
	visibleColumnsList,
	paginatedData,
	onView,
	onEdit,
	onDelete,
	renderActions,
	tableId,
	loading = false,
}) => {
	if (loading) {
		return (
			<tr>
				<td
					colSpan={
						visibleColumnsList.length +
						(onView || onEdit || onDelete || renderActions ? 1 : 0)
					}
					className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400"
				>
					Cargando datos...
				</td>
			</tr>
		);
	}

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
					{(onView || onEdit || onDelete || renderActions) && (
						<td className="px-6 py-4 text-right">
							<div className="flex gap-2">
								{onView && (
									<button
										onClick={() => onView(item)}
										className=" px-4 py-2 border-2 border-green-400 text-green-400 rounded-md hover:bg-green-400 hover:text-white transition cursor-pointer"
										title="Ver detalles"
									>
										<Eye />
									</button>
								)}

								{renderActions && renderActions(item)}
							</div>
						</td>
					)}
				</tr>
			))}
		</>
	);
};

export default DataTableBody;
