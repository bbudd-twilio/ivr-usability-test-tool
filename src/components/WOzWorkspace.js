import React from 'react';
import { withTaskContext } from '@twilio/flex-ui';


import InactiveView from './Inactive';
import PreCallView from './PreCall';
import PostCallView from './PostCall';
import ExecuteTest from './ExecuteTest';


class WOzWorkspace extends React.Component {

    constructor(props) {
        super(props);

        this.state={
            currentView:'inactive'
        };
        this.setExecutionState=this.setExecutionState.bind(this);
        
    }

    componentDidUpdate(){   
        if (this.props.task){
            if (this.props.task.attributes.ivrCallSid && this.state.currentView==='precall') {
                this.setState({currentView:'executing'});
                console.log('WOzWorkspace: Updated to executing');
            }
        } 

    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('WOzWorkspace: ',nextProps.task)
        if (nextProps.task!==this.state.task) {
            if (this.state.currentView==='inactive' && nextProps.task.status!=='wrapping') {
                this.setState({currentView:'precall'});
            }
        } else {  // if the update will show that no task is currently active (i.e. no call) and we're not already at the 'inactive' screen, set the state so we will be
            if (!nextProps.task && this.state.currentView!=='inactive') {
                this.setState({currentView:'inactive'});
            }
        }
        return(true);
    }

    setExecutionState(stageName) {
        console.log(`WOzWorkspace: setting ${stageName}`)
        this.setState({currentView: stageName});
    }


    render() {
        let currentView;
        switch (this.state.currentView) {
            case 'precall':     currentView=<PreCallView flexInstance={this.props.flexInstance} manager={this.props.manager}/>; break;
            case 'executing':   currentView=<ExecuteTest setExecutionState={this.setExecutionState} flexInstance={this.props.flexInstance}/>; break;
            case 'postcall':    currentView=<PostCallView setExecutionState={this.setExecutionState}/>; break;
            default:            currentView=<InactiveView/>; break;
        }


        return( 
            <div>
                {currentView}
            </div>
        );
    }


}




export default withTaskContext(WOzWorkspace);
