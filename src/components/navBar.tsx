import React from 'react'
import { AppBar, Button, Toolbar } from "@material-ui/core";
import { withRouter } from "react-router";

class FindPricingListForm extends React.Component<any> {
  constructor(props: any) {
    super(props)

    this.redirectToHome = this.redirectToHome.bind(this);
    this.redirectToReservations = this.redirectToReservations.bind(this);
  }
  redirectToHome() {
    this.props.history.push('/')
  }

  redirectToReservations() {
    this.props.history.push('/reservations')
  }

  render(): JSX.Element {
    return (
      <AppBar position="static">
        <Toolbar>
          <Button onClick={this.redirectToHome}>Search</Button>
          <Button onClick={this.redirectToReservations}>Reservations</Button>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withRouter(FindPricingListForm)
