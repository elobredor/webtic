import { Download, MoreVertical, Plus, RefreshCw, Search } from "lucide-react";

interface TableHeaderProps {
	searchTerm: string;
	setSearchTerm: (value: string) => void;
	onAdd?: () => void;
	onDownload?: () => void;
	onRefresh?: () => void;
	columnSelectorRef: React.RefObject<HTMLDivElement>;
	showColumnSelector: boolean;
	setShowColumnSelector: (value: boolean) => void;
	columns: { key: string; title: string }[];
	visibleColumns: Set<string>;
	toggleColumnVisibility: (key: string) => void;
}

const DataTableHeader: React.FC<TableHeaderProps> = ({
	searchTerm,
	setSearchTerm,
	onAdd,
	onDownload,
	onRefresh,
	columnSelectorRef,
	showColumnSelector,
	setShowColumnSelector,
	columns,
	visibleColumns,
	toggleColumnVisibility,
}) => {
	return (
		<div className="p-4 border-b border-gray-200 dark:border-gray-700 flex flex-wrap items-center justify-between gap-4">
			<div className="relative">
				<input
					type="text"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					placeholder="Buscar..."
					className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white w-64"
				/>
				<Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
			</div>

			<div className="flex items-center gap-2">
				{onAdd && (
					<button
						onClick={onAdd}
						className="p-2 bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 rounded-lg transition-colors duration-200"
						title="Agregar"
					>
						<Plus className="w-5 h-5" />
					</button>
				)}
				{onDownload && (
					<button
						onClick={onDownload}
						className="p-2 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400 dark:hover:bg-emerald-900/50 rounded-lg transition-colors duration-200"
						title="Descargar"
					>
						<Download className="w-5 h-5" />
					</button>
				)}
				{onRefresh && (
					<button
						onClick={onRefresh}
						className="p-2 bg-violet-50 text-violet-600 hover:bg-violet-100 dark:bg-violet-900/30 dark:text-violet-400 dark:hover:bg-violet-900/50 rounded-lg transition-colors duration-200"
						title="Refrescar"
					>
						<RefreshCw className="w-5 h-5" />
					</button>
				)}
				<div className="relative" ref={columnSelectorRef}>
					<button
						onClick={() => setShowColumnSelector(!showColumnSelector)}
						className="p-2 bg-gray-50 text-gray-600 hover:bg-gray-100 dark:bg-gray-900/30 dark:text-gray-400 dark:hover:bg-gray-900/50 rounded-lg transition-colors duration-200"
						title="Configurar columnas"
					>
						<MoreVertical className="w-5 h-5" />
					</button>
					{showColumnSelector && (
						<div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10">
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
													disabled={
														visibleColumns.has(column.key.trim()) && visibleColumns.size === 1
													}
												/>
												<div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
											</div>
										</label>
									))}
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default DataTableHeader;
