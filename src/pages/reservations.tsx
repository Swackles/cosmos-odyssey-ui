import React from 'react'
import axios from 'axios'
import { ReservationBackdrop } from './../components'
import { ReservationsListingsTable } from './../components/tables'
import { withStyles } from '@material-ui/styles';
import { durationString } from '../lib'

const styles = (theme: any) => ({
  alertContainer: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    }
  }
});

interface Provider {
  companiesId: number
  destination: string
  distance: string
  endTime: Date
  id: number
  importsId: number
  origin: string
  price: number
  ref: string
  routesId: number
  startTime: Date
  company: string
  duration: string
}

interface PriceListing {
  dest: string
  distance: string
  endTime: Date
  id: number
  origin: string
  price: number
  providers: Provider[]
  startTime: Date
  duration: string
}

interface Reservation {
  id: number,
  firstName: string,
  lastName: string,
  priceListing: PriceListing
  fullName?: string
  endTime?: Date
  startTime?: Date
  duration?: string
}

interface State {
  reservations: Reservation[]
  backdrop: Reservation | undefined
}

class FindPricingListForm extends React.Component<any, State> {
  constructor(props: any) {
    super(props)

    this.state = {
      reservations: [],
      backdrop: undefined
    }

    this.handleView = this.handleView.bind(this);
    this.handleCloseView = this.handleCloseView.bind(this);
  }

  async componentDidMount() {
    const res = await axios.get('https://cosmos-odyssey-app-api.herokuapp.com/reservations')

    let data = res.data.map((r: Reservation) => {
      r.fullName = `${r.firstName} ${r.lastName}`

      r.startTime = new Date(r.priceListing.startTime)
      r.endTime = new Date(r.priceListing.endTime)

      r.priceListing.providers = r.priceListing.providers.map((provider: Provider) => {
        provider.startTime = new Date(provider.startTime)
        provider.endTime = new Date(provider.endTime)

        provider.duration = durationString(provider.endTime.getTime() - provider.startTime.getTime())

        return provider
      })

      r.duration = durationString(r.endTime.getTime() - r.startTime.getTime())
      return r
    })

    this.setState(state => ({ ...state, reservations: data }))
  }

  handleView(id: number) {
    this.setState(state => ({ ...state, backdrop: state.reservations.find( x => x.id === id )}))
  }

  handleCloseView() {
    this.setState(state => ({ ...state, backdrop: undefined }))
  }

  render(): JSX.Element {
    return(
      <div>
        <ReservationsListingsTable onView={this.handleView} data={this.state.reservations} />
        <ReservationBackdrop data={this.state.backdrop} onClose={this.handleCloseView} />
      </div>
    )
  }
}

export default withStyles(styles)(FindPricingListForm)
