import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";

const Datagrid = (props) => {
  const columns = [
    {
      field: "date",
      headerName: "Date",
      width: 250,
      editable: false,
    },
    {
      field: "deposit",
      headerName: "Deposit",
      width: 250,
      editable: false,
    },
    {
      field: "withdraw",
      headerName: "Withdraw",
      width: 250,
      editable: false,
    },
    {
      field: "price",
      headerName: "Spent",
      width: 250,
      editable: false,
    },
    {
      field: "savings",
      headerName: "Saved",
      width: 250,
      editable: false,
    },
    {
      field: "total",
      headerName: "Checkings",
      width: 150,
      editable: false,
    },
    {
      field: "totalSavings",
      headerName: "Savings",
      width: 150,
      editable: false,
    },
  ];

  return (
    <>
      <Box sx={{ height: "50vh", width: "100%" }}>
        <DataGrid
          pageSize={10}
          rowsPerPageOptions={[10]}
          experimentalFeatures={{ newEditingApi: true }}
          columns={columns}
          rows={props.tableData}
        />
      </Box>
    </>
  );
};

export default Datagrid;
