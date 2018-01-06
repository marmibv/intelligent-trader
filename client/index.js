import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Select from 'react-select';
import moment from 'moment';
import 'react-select/dist/react-select.css';
import 'bootstrap/dist/css/bootstrap.css';
import marketListJSON from './market-list';
import {Line} from 'react-chartjs-2';
import BTCChart from './btc-chart';

class BittrexComponent extends React.Component {
  constructor() {
    super();
    const marketList = marketListJSON.map((market) => {
      const combinedName = market.MarketCurrencyLong + ' (' + market.MarketCurrency + ')';
      market['combinedName'] = combinedName;
      return market
    })
    this.state = {
      marketList,
      selectedMarket: null
    };
    this.onSelectMarketListChange = this.onSelectMarketListChange.bind(this);

  }

  componentDidMount() {
  }

  onSelectMarketListChange(selectedMarket) {
    this.setState({selectedMarket})
  }

  render() {
    const {marketList, selectedMarket} = this.state;

    return (
      <div>
        <Select
          onChange={this.onSelectMarketListChange}
          value={this.state.selectedMarket}
          valueKey='MarketCurrency'
          labelKey='combinedName'
          options={marketList}
        />
        <div className="content-container">
        {
          selectedMarket && <BTCChart selectedMarket={selectedMarket}/>
        }
        </div>
      </div>
    )


  }
}

const BittrexTrader = props => <BittrexComponent/>

ReactDOM.render(
  <BittrexTrader
  />

  , document.getElementById('root'));