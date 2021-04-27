import React from 'react'
import { FormControl, InputLabel, Select, MenuItem, Grid, TextField, Button } from '@material-ui/core/';
import { withRouter } from "react-router";
import axios from 'axios';

interface State {
  planets: string[]
  form: {
    origin: string,
    dest: string,
    company: string
  },
  error: {
    originError: boolean,
    destError: boolean
  }
}

class FindPricingListForm extends React.Component<any, State> {
  constructor(props: any) {
    super(props)

    this.state = {
      planets: [],
      form: {
        origin: '',
        dest: '',
        company: ''
      },
      error: {
        originError: false,
        destError: false
      }
    }

    this.setOrigin = this.setOrigin.bind(this);
    this.setDest = this.setDest.bind(this);
    this.setCompany = this.setCompany.bind(this);
    this.submit = this.submit.bind(this);
  }

  setOrigin(event: any) {
    this.setState(state => ({ ...state, form: { ...state.form, origin: event.target.value }, error: { ...state.error, originError: false }}))
  }

  setDest(event: any) {
    this.setState(state => ({ ...state, form: { ...state.form, dest: event.target.value }, error: { ...state.error, destError: false }}))

  }

  setCompany(event: any) {
    this.setState(state => ({ ...state, form: { ...state.form, company: event.target.value }}))

  }

  async componentDidMount() {
    const res = await axios.get('https://cosmos-odyssey-app-api.herokuapp.com/planets')
      
    this.setState(state => ({ ...state, planets: res.data.map((x: any) => x.name) }))

  }

  submit() {
    const { form: { origin, dest }} = this.state

    if (origin === "") return this.setState(state => ({ ...state, error: { ...state.error, originError: true }}))
    if (dest === "") return this.setState(state => ({ ...state, error: { ...state.error, destError: true } }))
    
    sessionStorage.setItem('form', JSON.stringify(this.state.form))
    this.props.history.push('/pricingLists')
  }

  public render(): JSX.Element {
    const { planets,
            error: { originError, destError },
      form: { origin, dest, company } } = this.state

    return (
      <Grid
        container
        spacing={1}
        direction="row"
        alignItems="center"
        justify="center">
        <Grid item xs={2}>
          <FormControl variant="outlined" style={{ minWidth: 120 }} >
            <InputLabel>Origin</InputLabel>
            <Select autoWidth={true} labelId="origin-select" onChange={this.setOrigin} value={origin} error={originError} label="origin">
              <MenuItem value=""><em>None</em></MenuItem>
              {planets.map(x => <MenuItem key={`origin-${x}`} value={x}>{x}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <FormControl variant="outlined" style={{ minWidth: 120 }} >
            <InputLabel>Destination</InputLabel>
            <Select autoWidth={true} labelId="dest-select" onChange={this.setDest} value={dest} error={destError} label="dest">
              <MenuItem value=""><em>None</em></MenuItem>
              {planets.map(x => <MenuItem key={`dest-${x}`} value={x}>{x}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <TextField onChange={this.setCompany} id="outlined-basic" label="Company name" variant="outlined" />
        </Grid>
        <Grid container item xs={12} alignItems='center' justify='center'>
          <Grid item xs={1}>
            <Button onClick={this.submit} value={company} variant="contained" color="primary"> Search </Button>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default withRouter(FindPricingListForm)
