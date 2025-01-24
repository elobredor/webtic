import { Eye } from "lucide-react";
import { columns } from "./columnConfig";
import { example } from "./data/example";
import DataTable from "./DataTable";

function App() {
	const renderActions = (item: any) => (
		<div className="flex gap-2">
			<button
				onClick={() => {
					// setSelectedPQR(item);
					// setModalOpen(true);
					console.log("Ver detalles", item);
				}}
				className="px-4 py-2 border-2 border-green-400 text-green-400 rounded-md hover:bg-green-400 hover:text-white transition"
				title="Ver detalles"
			>
				<Eye />
			</button>
		</div>
	);

	return (
		<>
			<h2 className="text-green-500">MEJORANDO DATATABLE</h2>
			<DataTable
				columns={columns}
				data={example}
				tableId="pqrs-table"
				renderActions={renderActions}
			/>
		</>
	);
}

export default App;
