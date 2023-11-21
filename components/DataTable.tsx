"use client";
import React, { useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ColDef } from "ag-grid-community";
interface TableComponentProps {
  attachmentData: [] | null;
}
const DataTable: React.FC<TableComponentProps> = ({ attachmentData }) => {
  const columnDefs: ColDef<any>[] = useMemo(
    () => [
      {
        headerName: `Event Title`,
        field: "title",
        minWidth: 200,
        sortable: true,
      },
      {
        headerName: `Event Type`,
        field: "eventType",
        minWidth: 200,
        sortable: true,
      },
      {
        headerName: `Sourcing Strategy `,
        field: "sourcingStrategy",
        minWidth: 150,
        sortable: true,
      },
      {
        headerName: `Description`,
        field: "description",
        minWidth: 150,
        sortable: true,
      },
    ],
    []
  );
  const defaultColDef = useMemo(() => {
    return {
      sortable: true,
      flex: 1,
      resizable: true,
      filter: true,
    };
  }, []);

  return (
    <section>
      <div
        className="ag-theme-alpine pt-5"
        style={{ width: "500", height: "615px" }}
      >
        <AgGridReact
          rowData={attachmentData || []}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowSelection="multiple"
          animateRows={true}
          gridOptions={{
            pagination: true,
            paginationPageSize: 10,
            rowHeight: 50,
            enableCellTextSelection: true,
          }}
        />
      </div>
    </section>
  );
};

export default DataTable;
