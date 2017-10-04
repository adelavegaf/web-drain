import React, {Component} from 'react';
import GeneralUsageContainer from '../containers/GeneralUsageContainer';
import DomainUsageLineChartContainer from '../containers/DomainUsageLineChartContainer';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import './Statistics.css';
import GeneralFrequencyContainer from '../containers/GeneralFrequencyContainer';

export default class Statistics extends Component {

    wrapContainerInCard(title, subtitle, container) {
        return (
            <div className="card-padding">
                <Card initiallyExpanded={true}>
                    <CardHeader
                        title={title}
                        subtitle={subtitle}
                        actAsExpander={true}
                        showExpandableButton={true}
                    />
                    <CardText expandable={true}>
                        {container}
                    </CardText>
                </Card>
            </div>
        );
    }

    render() {
        return (
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6">
                    {
                        this.wrapContainerInCard('Time spent on websites',
                            'Ratio between time spent on a particular domain and total time spent on the web',
                            <GeneralUsageContainer/>)
                    }
                    {
                        this.wrapContainerInCard('Website visit frequency',
                            'The five websites you visit most frequently',
                            <GeneralFrequencyContainer/>)
                    }
                    {
                        this.wrapContainerInCard('Time spent on a website',
                            'Shows how your usage of a particular domain has changed through the past week',
                            <DomainUsageLineChartContainer/>)
                    }
                </div>
            </div>
        );
    }
}