import React, { Component } from "react";
import ee from "wolfy87-eventemitter"
// import '../src/index.css';

//Action events:
const FTUX_ACTION_END = 'ftuxActionEnd';
const FTUX_ACTION_INCREASE = 'ftuxActionIncrease';
const FTUX_ACTION_DECREASE = 'ftuxActionDecrease';
//Reducer events:
const FTUX_REDUCER = 'ftuxReducer';

const eventEmitter = new ee();

let ftuxStore = {};

class ReactFtux extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.increaseStep = () => {
      const nextStep = ftuxStore.currentStep + 1;
      ftuxStore = {currentStep: nextStep, total: this.props.total};
      eventEmitter.trigger(FTUX_REDUCER, [ftuxStore]);
    };

    this.decreaseStep = () => {
      const nextStep = ftuxStore.currentStep - 1 > 0 ? ftuxStore.currentStep - 1 : 0;
      ftuxStore = {currentStep: nextStep, total: this.props.total};
      eventEmitter.trigger(FTUX_REDUCER, [ftuxStore]);
    }

    this.init = () => {
      ftuxStore = {currentStep: 0, total: this.props.total};
      eventEmitter.trigger(FTUX_REDUCER, [ftuxStore]);
    }
  }

  componentDidMount() {
    eventEmitter.on(FTUX_ACTION_INCREASE, () => {
      this.increaseStep();
    });
    eventEmitter.on(FTUX_ACTION_DECREASE, () => {
      this.decreaseStep();
    });
    eventEmitter.on(FTUX_ACTION_END, () => {
      this.props.ftuxEnd();
    });
    eventEmitter.on(FTUX_REDUCER, (stepState) => {
      this.setState(stepState);
    });
    if(!this.props.disable){
      this.init();
    }
  }

  componentWillUnmount() {
    eventEmitter.off(FTUX_ACTION_INCREASE);
    eventEmitter.off(FTUX_ACTION_DECREASE);
    eventEmitter.off(FTUX_ACTION_END);
    eventEmitter.off(FTUX_REDUCER);
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}

class ReactFtuxTooltip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: false, 
      last: false,
      first: false,
      triggerEndFtux: () => {
        eventEmitter.trigger(FTUX_ACTION_END);
      },
      triggerIncreaseStep: () => {
        eventEmitter.trigger(FTUX_ACTION_INCREASE);
      },
      triggerDecreaseStep: () => {
        eventEmitter.trigger(FTUX_ACTION_DECREASE);
      },
      style: {
        background: "black",
        color: "white",
        padding: 20,
        position: "fixed",
        "borderRadius": 3,
        "boxShadow": "4px 4px 5px 0px grey",
        width: 300
      }
    };
  }

  updateState(stepState, hide) {
    if (this.props.step === stepState.currentStep) {
      this.setState({
        display: true
      })
    } else {
      this.setState({
        display: false
      });
    }
    if (this.props.step === stepState.total - 1){
      this.setState({
        last: true
      });
    }
    if (this.props.step === 0) {
      this.setState({
        first: true
      });
    }
    if (hide) {
      this.setState({
        display: false
      });
    }
    if(this.props.tooltipStyle) {
      this.setState({
        style: Object.assign({}, this.state.style, this.props.tooltipStyle)
      });
    }
  }

  componentDidMount() {
    eventEmitter.on(FTUX_REDUCER, (stepState) => {
      this.updateState(stepState);
    });
    eventEmitter.on(FTUX_ACTION_END, () => {
      this.updateState({}, true);
    });
    eventEmitter.trigger(FTUX_REDUCER, [ftuxStore]);
  }

  componentWillUnmount() {
    eventEmitter.off(FTUX_ACTION_END);
    eventEmitter.off(FTUX_REDUCER);
  }

  render() {
    let buttons;

    if(this.state.last) {
      buttons = (<div>
                <button
        onClick={this.state.triggerDecreaseStep}>
          Previous
        </button>
        <button onClick={this.state.triggerEndFtux}>
        Done
      </button>
      </div>)
    } else {
      buttons = (
        <div>
        {!this.state.first &&
                <button
                onClick={this.state.triggerDecreaseStep}>
                  Previous
                </button>
        }
        <button 
        onClick={this.state.triggerIncreaseStep}>
        Next
      </button>
        </div>
      )
    }

    return (
      <div style={{transform: 'scale(1)', 'zIndex': 99}}>
          <div style={Object.assign(this.state.style, {display: this.state.display ? null : 'none'})}>
            <div style={{display: "block"}}>
              {this.props.children}
            </div>
            <div style={{float: "right", "paddingTop": 10}}>
              {buttons}
            </div>
          </div>
      </div>
    )
  }
}

export { ReactFtux, ReactFtuxTooltip };
