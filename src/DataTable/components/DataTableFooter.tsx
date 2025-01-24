import React from "react";
import {
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
} from "lucide-react";

interface DataTableFooterProps {
	pageSize: number;
	currentPage: number;
	totalPages: number;
	totalRecords: number;
	startIndex: number;
	endIndex: number;
	onPageSizeChange: (size: number) => void;
	onPageChange: (page: number) => void;
	pageSizeOptions?: number[];
}

const DataTableFooter: React.FC<DataTableFooterProps> = ({
	pageSize,
	currentPage,
	totalPages,
	totalRecords,
	startIndex,
	endIndex,
	onPageSizeChange,
	onPageChange,
	pageSizeOptions = [5, 10, 25, 50, 100],
}) => {
	return (
		<div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
			<div className="flex flex-wrap items-center justify-between gap-4">
				{/* Page size selector */}
				<div className="flex items-center gap-4">
					<select
						value={pageSize}
						onChange={(e) => onPageSizeChange(Number(e.target.value))}
						className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
					>
						{pageSizeOptions.map((size) => (
							<option key={size} value={size}>
								{size} por página
							</option>
						))}
					</select>
					<span className="text-sm text-gray-600 dark:text-gray-400">
						Mostrando {totalRecords > 0 ? startIndex + 1 : 0}-{endIndex} de{" "}
						{totalRecords}
					</span>
				</div>

				{/* Pagination controls */}
				<div className="flex items-center gap-2">
					<button
						onClick={() => onPageChange(1)}
						disabled={currentPage === 1}
						className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
						title="Primera página"
					>
						<ChevronsLeft className="w-4 h-4" />
					</button>
					<button
						onClick={() => onPageChange(currentPage - 1)}
						disabled={currentPage === 1}
						className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
						title="Página anterior"
					>
						<ChevronLeft className="w-4 h-4" />
					</button>
					<span className="text-sm text-gray-600 dark:text-gray-400">
						Página {currentPage} de {totalPages}
					</span>
					<button
						onClick={() => onPageChange(currentPage + 1)}
						disabled={currentPage === totalPages}
						className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
						title="Página siguiente"
					>
						<ChevronRight className="w-4 h-4" />
					</button>
					<button
						onClick={() => onPageChange(totalPages)}
						disabled={currentPage === totalPages}
						className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
						title="Última página"
					>
						<ChevronsRight className="w-4 h-4" />
					</button>
				</div>
			</div>
		</div>
	);
};

export default DataTableFooter;
