import React from 'react'
import { Backdrop, Button, Grid, Paper, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { ProvidersTable } from './tables';

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

interface Input {
  data: Reservation | undefined
  onClose: () => void
  classes?: any
}

class FindPricingListForm extends React.Component<Input> {
  parseDate(input: Date | undefined): string {
    if (input === undefined) return '--'

    const month = input.getMonth() + 1
    const date = input.getDate()
    const year = input.getFullYear()
    const hour = input.getHours()
    const minute = input.getMinutes()

    return `${month}/${date}/${year}, ${hour}:${minute}`
  }

  public render(): JSX.Element {
    const { data, onClose, classes } = this.props

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
                  <b>From: </b>{data?.priceListing.origin || '--'}
                </Typography>
                <Typography variant="h6">
                  <b>Departing time: </b>{this.parseDate(data?.startTime)}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="h4">
                  <b>To: </b>{data?.priceListing.dest || '--'}
                </Typography>
                <Typography variant="h6">
                  <b>Arrival time: </b>{this.parseDate(data?.endTime)}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography align="right" variant="h5">
                  <b>Price: </b>{data?.priceListing.price || '--'}
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12}><hr /></Grid>
            <Grid style={{ margin: 20 }} item container xs={12}>
              <Grid item xs={12}>
                <Typography variant="h6">
                  <b>First name: </b>{data?.firstName}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">
                  <b>Last name: </b>{data?.lastName}
                </Typography>
              </Grid>
              <br />
              <Grid item xs={12}>
                <Typography variant="h6">
                  <b>Duration: </b>{data?.duration}
                </Typography>
              </Grid>
            </Grid>

            <Grid item xs={12}><hr /></Grid>
            
            <Grid className={classes.table} item xs={12}>
              <ProvidersTable data={data?.priceListing.providers || []} />
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
                <Button onClick={onClose} color="primary">Close</Button>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Backdrop >)
  }
}

export default withStyles(styles)(FindPricingListForm)
