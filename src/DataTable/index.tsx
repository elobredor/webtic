"use client";
import React, { useState, useMemo, useEffect } from "react";
import {
	ColumnSelector,
	DataTableBody,
	DataTableHeader,
	DataTableFooter,
} from "./components";
import { Column } from "../Column";

interface DataTableProps {
	columns: Column[];
	data: any[];
	loading?: boolean;
	
	// Propiedades para paginación
	pageSize?: number;
	defaultPageSize?: number;
	currentPage?: number;
	totalRecords?: number;
	pageSizeOptions?: number[];
	onPageChange?: (page: number) => void;
	onPageSizeChange?: (size: number) => void;
	
	// Propiedades para acciones de tabla
	onRefresh?: () => void;
	onDownload?: () => void;
	onAdd?: () => void;
	onEdit?: (item: any) => void;
	onDelete?: (item: any) => void;
	onView?: (item: any) => void;
	renderActions?: (item: any) => React.ReactNode;
	tableId: string;
}

const filterData = (
	data: any[],
	searchTerm: string,
	visibleColumns: Set<string>
) => {
	if (!searchTerm) return data;
	return data.filter((item) =>
		Object.entries(item).some(([key, value]) => {
			if (visibleColumns.has(key) && value != null) {
				return String(value).toLowerCase().includes(searchTerm.toLowerCase());
			}
			return false;
		})
	);
};

const sortData = (
	data: any[],
	sortConfig: { key: string; direction: "asc" | "desc" } | null
) => {
	if (!sortConfig) return data;
	return [...data].sort((a, b) => {
		if (a[sortConfig.key] < b[sortConfig.key])
			return sortConfig.direction === "asc" ? -1 : 1;
		if (a[sortConfig.key] > b[sortConfig.key])
			return sortConfig.direction === "asc" ? 1 : -1;
		return 0;
	});
};

const DataTable: React.FC<DataTableProps> = ({
	columns,
	data,
	loading = false,
	// Propiedades para paginación
	pageSize: externalPageSize,
	defaultPageSize = 10,
	currentPage: externalCurrentPage,
	totalRecords: externalTotalRecords,
	pageSizeOptions = [5, 10, 25, 50, 100],
	onPageChange: externalOnPageChange,
	onPageSizeChange: externalOnPageSizeChange,
	// Propiedades para acciones
	onRefresh,
	onDownload,
	onAdd,
	onEdit,
	onDelete,
	onView,
	renderActions,
	tableId,
}) => {
	const columnSelectorRef = React.useRef<HTMLDivElement>(null);
	const [sortConfig, setSortConfig] = useState<{
		key: string;
		direction: "asc" | "desc";
	} | null>(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectorVisible, setSelectorVisible] = useState(false);
	const [visibleColumns, setVisibleColumns] = useState<Set<string>>(() => {
		if (typeof window !== "undefined") {
			const savedColumns = localStorage.getItem(`${tableId}-visible-columns`);
			return savedColumns
				? new Set(JSON.parse(savedColumns))
				: new Set(columns.map((col) => col.key));
		}
		return new Set(columns.map((col) => col.key));
	});
	
	// Estado interno para paginación
	const [internalCurrentPage, setInternalCurrentPage] = useState(1);
	const [internalPageSize, setInternalPageSize] = useState(defaultPageSize);
	
	// Determinar si usamos valores controlados o internos
	const isPageControlled = externalCurrentPage !== undefined;
	const isPageSizeControlled = externalPageSize !== undefined;
	
	// Valores actuales para los cálculos
	const currentPage = isPageControlled ? externalCurrentPage : internalCurrentPage;
	const pageSize = isPageSizeControlled ? externalPageSize : internalPageSize;
	
	const safeData = Array.isArray(data) ? data : [];

	// Reset a la primera página cuando cambia el término de búsqueda o el tamaño de página
	useEffect(() => {
		if (!isPageControlled) {
			setInternalCurrentPage(1);
		} else if (externalOnPageChange) {
			externalOnPageChange(1);
		}
	}, [searchTerm, isPageControlled, externalOnPageChange]);

	// Guardar columnas visibles en localStorage
	useEffect(() => {
		if (typeof window !== "undefined") {
			localStorage.setItem(
				`${tableId}-visible-columns`,
				JSON.stringify(Array.from(visibleColumns))
			);
		}
	}, [visibleColumns, tableId]);

	const handleSort = (key: string) => {
		let direction: "asc" | "desc" = "asc";
		if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
			direction = "desc";
		}
		setSortConfig({ key, direction });
	};

	const filteredData = useMemo(
		() => filterData(safeData, searchTerm, visibleColumns),
		[safeData, searchTerm, visibleColumns]
	);

	const sortedData = useMemo(
		() => sortData(filteredData, sortConfig),
		[filteredData, sortConfig]
	);

	// Usar totalRecords externo o calcular del array filtrado
	const totalRecordsValue = externalTotalRecords !== undefined 
		? externalTotalRecords 
		: sortedData.length;
	
	const startIndex = (currentPage - 1) * pageSize;
	const endIndex = Math.min(startIndex + pageSize, totalRecordsValue);

	// Paginar datos solo si no se proporciona paginación externa
	const paginatedData = useMemo(() => {
		// Si tenemos totalRecords externo, asumimos que los datos ya están paginados
		if (externalTotalRecords !== undefined) {
			return sortedData;
		}
		return sortedData.slice(startIndex, endIndex);
	}, [sortedData, startIndex, endIndex, externalTotalRecords]);

	const totalPages = Math.ceil(totalRecordsValue / pageSize);

	const visibleColumnsList = useMemo(
		() => columns.filter((col) => visibleColumns.has(col.key)),
		[columns, visibleColumns]
	);

	const toggleColumnVisibility = (key: string) => {
		setVisibleColumns((prev) => {
			const next = new Set([...prev]);
			if (next.has(key)) {
				if (next.size > 1) next.delete(key);
			} else {
				next.add(key);
			}
			return next;
		});
	};

	const handlePageChange = (page: number) => {
		const safePage = Math.max(1, Math.min(page, totalPages));
		
		if (externalOnPageChange) {
			externalOnPageChange(safePage);
		} else {
			setInternalCurrentPage(safePage);
		}
	};
	
	const handlePageSizeChange = (size: number) => {
		if (externalOnPageSizeChange) {
			externalOnPageSizeChange(size);
		} else {
			setInternalPageSize(size);
			// Reset a la primera página
			if (!isPageControlled) {
				setInternalCurrentPage(1);
			} else if (externalOnPageChange) {
				externalOnPageChange(1);
			}
		}
	};

	return (
		<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
			<DataTableHeader
				searchTerm={searchTerm}
				setSearchTerm={setSearchTerm}
				onAdd={onAdd}
				onDownload={onDownload}
				onRefresh={onRefresh}
				visibleColumns={visibleColumns}
				toggleColumnVisibility={toggleColumnVisibility}
				columnSelectorRef={columnSelectorRef}
				showColumnSelector={false}
				columns={columns}
				setShowColumnSelector={setSelectorVisible}
			/>
			<ColumnSelector
				visible={selectorVisible}
				columns={columns}
				visibleColumns={visibleColumns}
				toggleColumnVisibility={toggleColumnVisibility}
				onClose={() => setSelectorVisible(false)}
			/>

			<div className="overflow-x-auto">
				<table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
					<thead className="bg-gray-50 dark:bg-gray-700">
						<tr>
							{visibleColumnsList.map((column) => (
								<th
									key={column.key.trim()}
									className={` ${
										column.class || ""
									} px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider ${
										column.sortable
											? "cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
											: ""
									}`}
									onClick={() => column.sortable && handleSort(column.key.trim())}
									aria-sort={
										sortConfig?.key === column.key.trim()
											? sortConfig.direction === "asc"
												? "ascending"
												: "descending"
											: undefined
									}
								>
									<div className="flex items-center gap-1">
										{column.title}
										{sortConfig?.key === column.key.trim() && (
											<span className="text-gray-400">
												{sortConfig.direction === "asc" ? "↑" : "↓"}
											</span>
										)}
									</div>
								</th>
							))}
							{(onView || onEdit || onDelete || renderActions) && (
								<th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
									Acciones
								</th>
							)}
						</tr>
					</thead>
					<tbody>
					<DataTableBody
						paginatedData={paginatedData}
						visibleColumnsList={visibleColumnsList}
						loading={loading}
						tableId={tableId}
						onView={onView}
						onEdit={onEdit}
						onDelete={onDelete}
						renderActions={renderActions}
					/>
					</tbody>
				</table>
			</div>

			<DataTableFooter
				pageSize={pageSize}
				currentPage={currentPage}
				totalPages={totalPages}
				totalRecords={totalRecordsValue}
				startIndex={startIndex}
				endIndex={endIndex}
				onPageSizeChange={handlePageSizeChange}
				onPageChange={handlePageChange}
				pageSizeOptions={pageSizeOptions}
			/>
		</div>
	);
};

export default DataTable;