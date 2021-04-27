import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { FindPricingListForm } from './components'
import { Container, ThemeProvider } from '@material-ui/core/';
import { PricingList, Reservations } from './pages'
import { createMuiTheme } from '@material-ui/core/styles';

ReactDOM.render(
  <React.StrictMode>
    <Router forceRefresh={true}>
      <Container style={{ marginTop: 80 }}>
        <ThemeProvider theme={createMuiTheme()}>
          <Switch>
            <Route path='/pricingLists' component={PricingList} />
            <Route path='/reservations' component={Reservations} />
            <Route path="/" component={FindPricingListForm} />
          </Switch>
        </ThemeProvider>
      </Container>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
