import React from 'react'
import { Backdrop, Button, Grid, Paper, Typography, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { ProvidersTable } from './tables';
import { durationString } from './../lib'

const styles = (theme: any) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  paper: {
    padding: 25,
    minWidth: 1000
  },
  table: {
    margin: 25
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

interface Input {
  data: PriceListing | undefined
  onClose: () => void
  onReserve: (id: number, fistName: string, lastName: string) => void
  classes?: any
}

interface State {
  firstName: string, 
  lastName: string,
  errors: {
    firstNameError: boolean,
    lastNameError: boolean
  }
}


class FindPricingListForm extends React.Component<Input, State> {
  constructor(props: Input) {
    super(props)

    this.state = {
      firstName: '',
      lastName: '',
      errors: {
        firstNameError: false,
        lastNameError: false
      }
    }

    this.handleFirstName = this.handleFirstName.bind(this);
    this.handleLastName = this.handleLastName.bind(this);
    this.handleReserveClick = this.handleReserveClick.bind(this);
  }

  parseProvider(provider: Provider) {
    provider.startTime = new Date(provider.startTime)
    provider.endTime = new Date(provider.endTime)

    provider.duration = durationString(provider.endTime.getTime() - provider.startTime.getTime())

    return provider
  }

  parseDate(input: Date | undefined): string {
    if (input === undefined) return '--'

    const month = input.getMonth() + 1
    const date = input.getDate()
    const year = input.getFullYear()
    const hour = input.getHours()
    const minute = input.getMinutes()

    return `${month}/${date}/${year}, ${hour}:${minute}`
  }

  handleFirstName(e: any) {
    this.setState(state => ({ ...state, firstName: e.target.value }))
  }

  handleLastName(e: any) {
    this.setState(state => ({ ...state, lastName: e.target.value }))
  }

  handleReserveClick() {
    const { firstName, lastName } = this.state
    const { data, onReserve } = this.props

    if (firstName === '' || lastName === '') return this.setState(state => ({ ...state, errors: {
      firstNameError: firstName === '',
      lastNameError: lastName === ''
    }}))
    
    if (data === undefined || data.id === undefined) return

    onReserve(data.id, firstName, lastName)
  }

  public render(): JSX.Element {
    const { data, onClose, classes } = this.props
    const { firstName, lastName, errors: { firstNameError, lastNameError } } = this.state


    if (data !== null && data !== undefined) 
      data.providers = data.providers.map(x => this.parseProvider(x))

    return(
      <Backdrop
        className={classes.backdrop}
        open = { data !== undefined} >
        <Paper className={classes.paper}>
          <Grid
            container
            direction="row"
            alignItems="center">
            <Grid container item xs={12}>
              <Grid item xs={4}>
                <Typography variant="h4">
                  <b>From: </b>{data?.origin || '--'}
                </Typography>
                <Typography variant="h6">
                  <b>Departing time: </b>{this.parseDate(data?.startTime)}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="h4">
                  <b>To: </b>{data?.dest || '--'}
                </Typography>
                <Typography variant="h6">
                  <b>Arrival time: </b>{this.parseDate(data?.endTime)}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography align="right" variant="h5">
                  <b>Price: </b>{data?.price || '--'}
                </Typography>
              </Grid>
            </Grid>

            <Grid item xs={12}><hr /></Grid>

            <Grid style={{ margin: 20 }} item container xs={12}>
              <Grid item xs={2}>
                <TextField error={firstNameError} value={firstName} onChange={this.handleFirstName} id="firstName" label="First Name" variant="outlined" />
              </Grid>
              <Grid item xs={2}>
                <TextField error={lastNameError} value={lastName} onChange={this.handleLastName} id="lastName" label="Last Name" variant="outlined" />
              </Grid>
            </Grid>

            <Grid item xs={12}><hr /></Grid>
            
            <Grid className={classes.table} item xs={12}>
              <ProvidersTable data={data?.providers || []} />
            </Grid>

            <Grid item xs={12}><hr /></Grid>

            <Grid
              item
              xs={12}
              container
              direction="row"
              justify="flex-end"
              alignItems="center" >
              <Grid item xs={2}>
                <Button
                  onClick={this.handleReserveClick}
                  variant="contained" color="primary">Reserve</Button>
              </Grid>
              <Grid item xs={2}>
                <Button onClick={onClose} color="primary">Close</Button>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Backdrop >)
  }
}

export default withStyles(styles)(FindPricingListForm)
