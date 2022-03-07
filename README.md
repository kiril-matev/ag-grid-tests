# ag-grid-tests
AG Grid tests

**Scenario**

This is a React-based sample project using AG Grid as follows:
1. Uses client-side row model with 5,000 rows
2. 30 columns
3. All cells have custom React cell renderers 
5. Cell value update mechanism
5.1 Every second update the all the cell values of all 5,000 rows
5.2 Use rowNode.updateData for each row data and then refresh the grid once all updates have been completed with this.gridApi.refreshCells

**Testing process**

1. Use a Windows machine
2. Compare performance of this project for AG Grid v25.3 and v26.0
3. Scroll the grid and you should see the grid stutter for a few seconds at a time

**Test results**

I tested the rendering performance on my Windows machine using the latest version of Chrome and I can't notice any difference in rendering performance when scrolling. 

Both versions of AG Grid have a rendering delay when scrolling too fast or too far while updating. I can't notice a difference in the rendering between these two versions.
