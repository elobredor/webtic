import { columns } from "./columnConfig";
import { example } from "./data/example";
import DataTable from "./DataTable";

function App() {
	return (
		<>
			<h2 className=" text-4xl">MEJORANDO DATATABLE</h2>
			<DataTable
				columns={columns}
				data={example}
				tableId="pqrs-table"
				onView={(item) => console.log("Ver", item)}
			/>
		</>
	);
}

export default App;
