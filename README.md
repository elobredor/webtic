# Webtic UI Library

## Descripción

**Webtic UI Library** es una librería desarrollada por **Webtic**, diseñada para ofrecer componentes reutilizables y herramientas útiles para acelerar el desarrollo de aplicaciones web. Esta librería está orientada a ser un conjunto modular y flexible de herramientas, ideal para proyectos que requieren un diseño limpio y funcional.

Actualmente, la librería incluye el componente `DataTable`, y en el futuro se agregarán utilidades adicionales como `formatDate` y `formatCurrency` para manipulación y formateo de datos.

---

## Instalación

Puedes instalar esta librería usando npm o yarn:

```bash
npm install @webtic-ui
# o
yarn add @webtic-ui
```

---

## Uso

### DataTable Component

El componente `DataTable` es una tabla personalizable que permite mostrar y administrar datos dinámicamente. Está diseñado para ser modular, accesible y fácil de integrar en cualquier proyecto.

#### Ejemplo básico:

```tsx
<DataTable
	customColumn={columns}
	data={data}
	tableId="example-table"
	onView={(item) => console.log("Ver:", item)}
	loading={false}
/>
```

#### Props de `DataTable`:

| Propiedad       | Tipo                             | Descripción                                                                                     |
| --------------- | -------------------------------- | ----------------------------------------------------------------------------------------------- |
| `customColumn`  | `CustomColumn[]`                 | Lista de columnas personalizadas con propiedades como `property`, `label`, `format` y `colors`. |
| `data`          | `any[]`                          | Arreglo de datos que se mostrarán en la tabla.                                                  |
| `tableId`       | `string`                         | Identificador único de la tabla (usado para las keys internas).                                 |
| `onView`        | `(item: any) => void`            | Callback que se ejecuta al hacer clic en el botón de "Ver detalles".                            |
| `onEdit`        | `(item: any) => void`            | Callback que se ejecuta al hacer clic en el botón de "Editar".                                  |
| `onDelete`      | `(item: any) => void`            | Callback que se ejecuta al hacer clic en el botón de "Eliminar".                                |
| `renderActions` | `(item: any) => React.ReactNode` | Renderiza acciones adicionales personalizadas.                                                  |
| `loading`       | `boolean`                        | Indica si la tabla está cargando datos.                                                         |

---

## Utilidades futuras

Próximamente se agregarán funciones útiles para la manipulación y el formateo de datos:

### `formatDate`

Formatea fechas en diferentes formatos personalizados:

```tsx
import { formatDate } from "@webtic/ui-library/utils";

const formattedDate = formatDate("2025-01-24", "DD/MM/YYYY");
console.log(formattedDate); // "24/01/2025"
```

### `formatCurrency`

Convierte valores numéricos a formatos monetarios:

```tsx
import { formatCurrency } from "@webtic/ui-library/utils";

const formattedCurrency = formatCurrency(1500.5, "USD");
console.log(formattedCurrency); // "$1,500.50"
```

---

## Contribuir

Si deseas contribuir a esta librería, sigue estos pasos:

1. Clona el repositorio:

```bash
git clone https://github.com/webtic/ui-library.git
```

2. Instala las dependencias:

```bash
npm install
```

3. Realiza tus cambios y envía un pull request.

---

## Licencia

Esta librería está licenciada bajo la licencia MIT. Puedes usarla libremente en tus proyectos personales o comerciales.
