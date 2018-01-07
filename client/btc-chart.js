import React from 'react';
import axios from 'axios';
import moment from 'moment-timezone';
import 'bootstrap/dist/css/bootstrap.css';
import {Line} from 'react-chartjs-2';

class BTCChart extends React.Component {
  constructor() {
    super();
    this.state = {
      intervalId: null,
      exacoinAPIResult: null,
    }
    this.getExacoinAPIResult = this.getExacoinAPIResult.bind(this);
  }

  componentDidMount() {

    const intervalId = setInterval(this.getExacoinAPIResult, 30000);
    this.setState({intervalId})

  }

  getExacoinAPIResult() {
    axios.get(`/${this.props.selectedMarket.MarketName}`
    ) .then((response) => {
      this.setState({exacoinAPIResult: response.data})
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  componentWillReceiveProps(nextProps) {

  }

  renderChart() {
    let render = <div className="loader"></div>
    const {exacoinAPIResult} = this.state;
    if (exacoinAPIResult) {
      if (exacoinAPIResult.result) {
        const exacoinChartData = JSON.parse(exacoinAPIResult.result);
        const dataDateList = [];
        exacoinChartData.data_date.forEach((data_date) => {
          const format = 'MM/DD HH:mm:ss';
          const updateDataDate = moment.tz(data_date, 'Asia/Bangkok').format(format);
          dataDateList.push(updateDataDate);
        })
        var data = {
          labels: dataDateList,
          datasets: [{
            label: 'BTC Value',
            fill: true,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: exacoinChartData.data_close
          }]
        }
        render = <div className="chart-container"><Line data={data} height={500} options={{
          maintainAspectRatio: false
        }}/></div>
      } else {
        render = <div>API not support this coin :(</div>
      }

    }
    return render;
  }

  render() {
    return (
      <div>
        {
          this.renderChart()
        }
      </div>
    )


  }
}

export default BTCChart