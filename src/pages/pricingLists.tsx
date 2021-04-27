import React from 'react'
import axios from 'axios'
import { PriceListingsBackdrop } from './../components'
import { PriceListingsTable } from './../components/tables'
import { durationString } from './../lib'
import { withStyles } from '@material-ui/styles';
import { Alert } from '@material-ui/lab'

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

interface State {
  form: {
    company: string,
    origin: string,
    dist: string,
  },
  backdrop: PriceListing | undefined
  priceListings: PriceListing[],
  makeReservation: {
    status: number,
    msg: string
  }
}

class FindPricingListForm extends React.Component<any, State> {
  constructor(props: any) {
    super(props)

    let form = sessionStorage.getItem('form')
    if(form === null) return this.props.history.push('/')
    
    this.state = {
      form: JSON.parse(form),
      priceListings: [],
      backdrop: undefined,
      makeReservation: {
        status: 0,
        msg: ''
      }
    }


    this.openBackdrop = this.openBackdrop.bind(this);
    this.closeBackdrop = this.closeBackdrop.bind(this);
    this.reserve = this.reserve.bind(this);
  }

  openBackdrop(id: number) {

    this.setState(state => ({
      ...state,
      backdrop: state.priceListings.find(x => x.id === id)
    }))
  }
  
  closeBackdrop() {
    this.setState(state => ({ ...state, backdrop: undefined }))
  }

  async reserve(id: number, firstName: string, lastName: string) {

    const data = {
      firstName: firstName,
      lastName: lastName,
      priceListingId: id
    }

    axios.post('https://cosmos-odyssey-app-api.herokuapp.com/reservations', data)
      .then(res => {
        this.setState(state => ({
          ...state, makeReservation: {
            status: 1,
            msg: 'Reservation added'
          }
        }))
      })
      .catch(err => {
        console.log(err.response)
        console.log(err.request)
        this.setState(state => ({
          ...state, makeReservation: {
            status: 2,
            msg: 'Failed to add reservation - try again later'
          }
        }))
      })
      .finally(() => {
          this.closeBackdrop()
      })
  }

  async componentDidMount() {
    const res = await axios.get('https://cosmos-odyssey-app-api.herokuapp.com/priceListings', { params: this.state.form })

    const data = res.data.map((x: any) => this.parsePriceListing(x))

    this.setState(state => ({ ...state, priceListings: data }))
  }

  parsePriceListing(x: any) {
    x.endTime = new Date(x.endTime)
    x.startTime = new Date(x.startTime)
    x.price = parseFloat(x.price)
    
    x.duration = durationString(x.endTime.getTime() - x.startTime.getTime())

    return x
  }

  public render(): JSX.Element {
    const { priceListings, backdrop, makeReservation} = this.state

    let alert: JSX.Element = <div></div>

    if (makeReservation.status === 1)
      alert = <Alert variant="filled" severity="success">{makeReservation.msg}</Alert>
    else if (makeReservation.status === 2)
      alert = <Alert variant="filled" severity="error">{makeReservation.msg}</Alert>

    return (
      <div>
        <div className={this.props.classes.alertContainer}>{alert}</div>
        <PriceListingsTable onView={this.openBackdrop} data={priceListings} />
        <PriceListingsBackdrop onReserve={this.reserve} onClose={this.closeBackdrop} data={backdrop} />
      </div>
    )
  }
}

export default withStyles(styles)(FindPricingListForm)
