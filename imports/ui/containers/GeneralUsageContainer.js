import React, {Component} from 'react';
import Api from '../utils/Api';
import DateUtil from '../utils/DateUtil';
import GeneralUsage from '../components/GeneralUsage';

export default class UsagePieChartContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            percentages: [],
            totals: [],
            selectedIndex: 0,
            sinceDate: DateUtil.getFirstDayOfPastWeek()
        }
    }

    setSinceDate(sinceDate) {
        this.setState({sinceDate: sinceDate});
    }

    setSelectedIndex(index) {
        this.setState({selectedIndex: index});
    }

    convertUsageToTopFivePercentages(response) {
        const totalTime = response.reduce((total, cur) => total + cur.total, 0);
        const percentages = response.map((cur) => {
            let percentage = cur.total / totalTime;
            return {hostname: cur._id, percentage: percentage};
        });
        const sortedPercentages = percentages.sort((a, b) => b.percentage - a.percentage);
        const parsedPercentages = sortedPercentages.slice(0, 4);
        let otherPercentage = 0;
        for (let i = 4; i < sortedPercentages.length; i++) {
            otherPercentage += sortedPercentages[i].percentage;
        }
        parsedPercentages.push({hostname: 'Other Domains', percentage: otherPercentage});
        return parsedPercentages;
    }

    convertUsageToTopFiveTotals(response) {
        return response.map(value => {
            return {
                hostname: value._id,
                total: value.total/1000
            };
        }).sort((a, b) => b.total - a.total).slice(0, 5);
    }

    componentDidMount() {
        Api.getUsageSince(this.state.sinceDate)
           .then((response) => {
               this.setState({
                   percentages: this.convertUsageToTopFivePercentages(response),
                   totals: this.convertUsageToTopFiveTotals(response)
               });
           })
           .catch((error) => {
               console.error(error);
           });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.sinceDate.getTime() === this.state.sinceDate.getTime()) {
            return;
        }
        Api.getUsageSince(this.state.sinceDate)
           .then((response) => {
               this.setState({
                   percentages: this.convertUsageToTopFivePercentages(response),
                   totals: this.convertUsageToTopFiveTotals(response)
               });
           })
           .catch((error) => {
               console.error(error);
           });
    }

    render() {
        return React.createElement(GeneralUsage, {
            percentages: this.state.percentages,
            totals: this.state.totals,
            selectedIndex: this.state.selectedIndex,
            onSelectedIndexChange: (index) => this.setSelectedIndex(index),
            onSinceDateChange: (date) => this.setSinceDate(date)
        });
    }
}