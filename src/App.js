import React, {useCallback, useRef} from "react";
import CustomCellRenderer from "./CustomCellRenderer";
import {AgGridReact} from "ag-grid-react";
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

function createColDefs(amountOfCols) {
  return [...Array(amountOfCols)]
      .map((_, id) =>
          ({
            field: `col_${id + 1}`,
            cellRendererFramework: CustomCellRenderer
          })
      );
}

function createRowData(colDefs, amountOfRows) {
  const fields = colDefs.map(col => col.field);
  return [...Array(amountOfRows)]
      .map((_, id) => {
            const row = {id, minWidth: 100};
            fields.forEach(field => row[field] = 0);
            return row;
          }
      );
}

function getColumnDefsAndData(amountOfCols = 10, amountOfRows = 10) {
  const columnDefs = createColDefs(amountOfCols);
  return {
    columnDefs,
    rowData: createRowData(columnDefs, amountOfRows)
  };
}

function App() {
  const dataFields = useRef(null);
  const nextValue = useRef(0);
  const increaseCellValue = useCallback(()=> nextValue.current++, []);
  const onGridReady = useCallback((params) => {
    const {columnDefs, rowData } = getColumnDefsAndData(30,5000);
    params.api.setColumnDefs(columnDefs);
    params.api.setRowData(rowData);
    dataFields.current = columnDefs.map(col => col.field);
  }, []);

  const onFirstDataRendered = useCallback((params) => {

    setInterval(()=>{
      increaseCellValue();
      params.api.forEachNode(node => {
        const newData = {id: node.data.id};
        dataFields.current.forEach(field => newData[field] = nextValue.current);
        node.updateData(newData);
      });
      params.api.refreshCells()
    },1000);
  }, []);

  return (
      <div
          className="ag-theme-alpine"
          style={{height: '98vh', width: '98vw'}}>
        <AgGridReact
            onGridReady={onGridReady}
            onFirstDataRendered={onFirstDataRendered}
        />
      </div>
  );
}

export default App;
