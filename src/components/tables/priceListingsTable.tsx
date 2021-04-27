import React from 'react'
import { DataGrid, GridCellParams, GridColDef } from '@material-ui/data-grid';
import { Button } from '@material-ui/core';

interface data {
  id: number,
  price: number,
  distance: string,
  startTime: Date,
  endTime: Date,
  duration?: string
}

interface Input {
  onView: (id: number) => void
  data: data[]
}

class PriceListingsTable extends React.Component<Input> {
  public render(): JSX.Element {
    const { onView, data, } = this.props

    let columns: GridColDef[] = [
      { field: 'id', headerName: 'ID', type: 'number', flex: .8 },
      { field: 'price', headerName: 'price', type: 'number', flex: 1 },
      { field: 'distance', headerName: 'Distance', flex: 1 },
      { field: 'startTime', headerName: 'Departing time', type: 'dateTime', flex: 2 },
      { field: 'endTime', headerName: 'Arrival Time', type: 'dateTime', flex: 2 },
      { field: 'duration', headerName: 'Duration', sortable: false, type: 'string', flex: 2.5 },
      { field: '', headerName: '', sortable: false, flex: 1.5,
        renderCell: (params: GridCellParams) => (
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ marginLeft: 16 }}
            onClick={() => { onView(parseInt(params.getValue('id') as string)) }} > View </Button>
        )
      }
    ]

    return (
      <div style={{ height: 600, width: '100%', minWidth: 300 }}>
        <DataGrid
          disableSelectionOnClick={true}
          loading={data === []}
          rows={data}
          columns={columns}
          pageSize={15}
          disableColumnMenu={true} />
      </div>
    )
  }
}

export default PriceListingsTable
