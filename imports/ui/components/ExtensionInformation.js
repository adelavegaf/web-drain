import React, {Component} from 'react';
import {Step, Stepper, StepLabel, StepContent} from 'material-ui/Stepper';

const stepInformationStyle = {
    color: 'rgba(0, 0, 0, 0.54)'
};

export default class ExtensionInformation extends Component {
    getCurrentIndex() {
        if (this.props.authenticated) {
            return 3;
        }
        else if (this.props.installed) {
            return 1;
        }
        else {
            return 0;
        }
    }

    render() {
        return (
            <div className="row justify-content-center">
                <Stepper orientation="vertical" activeStep={this.getCurrentIndex()}>
                    <Step>
                        <StepLabel>Install extension</StepLabel>
                        <StepContent>
                            <p style={stepInformationStyle}>
                                Download and install our <a
                                href="https://chrome.google.com/webstore/detail/web-drain/llepmjjmpmpcheageoaclebkfpbegmbk"
                                target="_blank"> extension</a>
                            </p>
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>Authenticate</StepLabel>
                        <StepContent>
                            <p style={stepInformationStyle}>
                                Click on the extension icon and log in
                            </p>
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>Ready to go!</StepLabel>
                    </Step>
                </Stepper>
            </div>
        );
    }
}