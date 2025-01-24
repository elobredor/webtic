import { Column } from "../../data/Column";

import { FC } from "react";

interface ColumnSelectorProps {
	columns: Column[];
	visibleColumns: Set<string>;
	toggleColumnVisibility: (key: string) => void;
	onClose: () => void;
}

const ColumnSelector: FC<ColumnSelectorProps> = ({
	columns,
	visibleColumns,
	toggleColumnVisibility,
	onClose,
}) => (
	<div className=" absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10">
		<div className="p-2">
			<h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
				Columnas visibles
			</h3>
			<div className="space-y-2">
				{columns.map((column) => (
					<label
						key={column.key.trim()}
						className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-300 px-2 py-1 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg cursor-pointer"
					>
						<span>{column.title}</span>
						<div className="relative inline-block">
							<input
								type="checkbox"
								checked={visibleColumns.has(column.key.trim())}
								onChange={() => toggleColumnVisibility(column.key.trim())}
								className="sr-only peer"
							/>
							<div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
						</div>
					</label>
				))}
			</div>
			<button
				onClick={onClose}
				className="mt-2 w-full text-center text-sm text-gray-600 dark:text-gray-400"
			>
				Cerrar
			</button>
		</div>
	</div>
);
export default ColumnSelector;
