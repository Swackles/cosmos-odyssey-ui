import React from 'react'
import { DataGrid, GridColDef } from '@material-ui/data-grid';

interface data {
  companiesId: number
  destination: string
  importsId: number
  origin: string
  ref: string
  routesId: number
  company: string
  id: number,
  price: number,
  distance: string,
  startTime: Date,
  endTime: Date,
  duration: string
}

interface Input {
  data: data[]
}

class PriceListingsTable extends React.Component<Input> {
  public render(): JSX.Element {
    const { data, } = this.props

    let columns: GridColDef[] = [
      { field: 'origin', headerName: 'From', flex: .8 },
      { field: 'destination', headerName: 'Dest', flex: .8 },
      { field: 'company', headerName: 'Company', flex: 1.5 },
      { field: 'distance', headerName: 'Distance', flex: 1 },
      { field: 'price', headerName: 'Price', flex: 1 },
      { field: 'startTime', headerName: 'Departing time', type: 'dateTime', flex: 1.5 },
      { field: 'endTime', headerName: 'Arrival Time', type: 'dateTime', flex: 1.5 },
      { field: 'duration', headerName: 'Duration', sortable: false, type: 'string', flex: 1.5 }
    ]

    return (
      <div style={{ height: 600, width: '100%', minWidth: 300 }}>
        <DataGrid
          disableSelectionOnClick={true}
          loading={data === []}
          rows={data}
          columns={columns}
          pageSize={data.length}
          disableColumnMenu={true}
          hideFooter={true} />
      </div>
    )
  }
}

export default PriceListingsTable
