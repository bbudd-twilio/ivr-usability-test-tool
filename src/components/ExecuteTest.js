import React from 'react';
import { withTaskContext } from '@twilio/flex-ui';
import Grid from '@material-ui/core/Grid';
import {StyledButton, StyledBlock, StageBanner, TransitionButton, BoxLabel, DialogueStateHeader,StopButton} from './styles';
import SuperStateContext from './SuperStateContext';
import PromptBlock from './PromptBlock';


// Load the dialogue definition file - locally for now
import dialogueDefinition from '../flowdef.json';

class ExecuteTest extends React.Component {

    constructor(props) {
        super(props);
        this.removeIVR = this.removeIVR.bind(this);
        this.updateErrorCount= this.updateErrorCount.bind(this);
        this.updateSlotValue = this.updateSlotValue.bind(this);
        this.executeTransition=this.executeTransition.bind(this);
        this.state={
            currentActivity: dialogueDefinition.activities[0].name,
            slots: dialogueDefinition.activities[0].slots,
            currentActivityIndex: 0,
            currentStateIndex: 0,
            inputNMCount: 0,
            inputNICount: 0,
            currentPromptPosition: 'initial',
            randomKey:0
        }
        console.log('ExecuteTest: slots=',this.state.slots);

    }


    removeIVR(e) {
        removeIVRFromCall(this.props.task.taskSid)
        .then( result => {
            console.log('ExecuteTest:removeIVRFromCall result=',result);
            this.props.task.setAttributes({ivrResult:'complete', ...this.props.task.attributes});
            this.props.flexInstance.Actions.invokeAction("ToggleMute");
            this.props.setExecutionState('postcall');
        }).catch(err=>{
            console.log('ExecuteTest: error ',err);
        })
    }

    updateErrorCount(e) {
        if (e.target.value==='nomatch') {
            this.setState({inputNMCount: this.state.inputNMCount+1});
            this.setState({currentPromptPosition: 'nm'});
        } else {
            this.setState({inputNICount: this.state.inputNICount+1});       
            this.setState({currentPromptPosition: 'ni'});
        }
    }

    updateSlotValue(updatedSlot) {
        console.log('ExecuteTest: updated slot at top level ',updatedSlot);
        let i=0;
        let slotsCopy=this.state.slots;
        console.log(slotsCopy);
        while (i<slotsCopy.length && slotsCopy[i].name!==updatedSlot.name ){
            i++
        }
        console.log(`i=${i}`);
        if (i<this.state.slots.length) {
            slotsCopy[i].value=updatedSlot.value;
            this.setState({slots:slotsCopy},() => {console.log('update in ExecuteText, state now',this.state)});
        }
        this.setState({randomKey: Math.random()});

    }

    executeTransition(e) {
        console.log(`ExecuteTest: taking transition ${e.target.value}`);
        let specifiedTransition=e.target.value;
        let nextStateIndex=-1;
        let nextActivityIndex=-1;
        this.setState({currentPromptPosition: 'initial'});
        switch (dialogueDefinition.activities[this.state.currentActivityIndex].states[this.state.currentStateIndex].transitions[specifiedTransition].targettype) {
            case 'state':       nextStateIndex=this.findStateIndex(this.state.currentActivityIndex,dialogueDefinition.activities[this.state.currentActivityIndex].states[this.state.currentStateIndex].transitions[specifiedTransition].target);
                                if (nextStateIndex!==-1) {                   
                                    this.setState({currentStateIndex: nextStateIndex});
                                } else {
                                    alert(`State "${dialogueDefinition.activities[this.state.currentActivityIndex].states[this.state.currentStateIndex].transitions[specifiedTransition].target}" not found`);
                                }
                                break;

            case 'activity':    nextActivityIndex=this.findActivityIndex(dialogueDefinition.activities[this.state.currentActivityIndex].states[this.state.currentStateIndex].transitions[specifiedTransition].target);
                                if (nextActivityIndex!==-1) {
                                    this.setState({currentActivityIndex: nextActivityIndex});
                                    this.setState({currentStateIndex:0});
                                    this.setState({slots: dialogueDefinition.activities[nextActivityIndex].slots})
                                } else {
                                    alert(`Activity "${dialogueDefinition.activities[this.state.currentActivityIndex].states[this.state.currentStateIndex].transitions[specifiedTransition].target} not found"`);
                                }
                                break

            default: console.log('ERROR - Invalid TargetType');

        }

    }   

    findStateIndex(activityIndex, stateToFind){
        let i;
        for (i=0;i<dialogueDefinition.activities[activityIndex].states.length;i++) {
            if (dialogueDefinition.activities[activityIndex].states[i].id===stateToFind) {
                return i;
            }

        }
        return(-1);
    }

    findActivityIndex(activityToFind) {
        let i;
        for (i=0;i<dialogueDefinition.activities.length;i++) {
            if (dialogueDefinition.activities[i].activity_name===activityToFind) {
                return i;
            }

        }
        return(-1);
    }

    render() {
        let currentActivity=dialogueDefinition.activities[this.state.currentActivityIndex];  // extract the current Activity
        let currentState=currentActivity.states[this.state.currentStateIndex]; // extract the dialogue state
        let transitionButtons;
        let promptBlockContent;
        let inputControlButtons=null;
        console.log(currentState);

        if (currentState.type==='ask' || currentState.type==='prompt') {
            transitionButtons= currentState.transitions.map((transition,key) =>
                <TransitionButton key={key} value={key} onClick={this.executeTransition}>{transition.condition} </TransitionButton>
            )   
            promptBlockContent= <PromptBlock key={this.state.randomKey} type={currentState.type} prompts={currentState.prompts} nmCount={this.state.inputNMCount} niCount={this.state.inputNICount} promptPosition={this.state.currentPromptPosition} slots={this.state.slots}/>;
        } else if (currentState.type==='decision') {
            transitionButtons= currentState.transitions.map((transition,key) =>
            <TransitionButton key={key} value={key} onClick={this.executeTransition}>{transition.condition} </TransitionButton>
            )   
            promptBlockContent=<StyledBlock>Select a transition</StyledBlock>;
        } else if (currentState.type==='hangup') {
            transitionButtons=<StopButton onClick={this.removeIVR} >Remove IVR from Call</StopButton>
        } else {
            transitionButtons=<div></div>;
            promptBlockContent=<StyledBlock>Call Terminated</StyledBlock>
        }

        if (currentState.type==='ask') {
                inputControlButtons=
                    <StyledBlock>
                        <BoxLabel>Input Control:</BoxLabel>  <p>NoMatch={this.state.inputNMCount}&nbsp;&nbsp;NoInput={this.state.inputNICount}</p>
                        <StyledButton onClick={this.updateErrorCount} value='nomatch'>NoMatch</StyledButton>
                        <StyledButton onClick={this.updateErrorCount} value='noinput'>NoInput</StyledButton> 
                    </StyledBlock>
        }

        return (
            <div>
                <Grid container>
                    <Grid item xs={12}><StageBanner>Test Execution</StageBanner></Grid>
                    <Grid item xs={3}><SuperStateContext activityname={currentActivity.activity_name} slots={currentActivity.slots} onContextChange={this.updateSlotValue} /></Grid>
                    <Grid item xs={9}>
                        <StyledBlock><DialogueStateHeader>{currentState.id} {currentState.type.toUpperCase()} {currentState.description}</DialogueStateHeader></StyledBlock>
                        {promptBlockContent}
                        {inputControlButtons}
                        <StyledBlock><BoxLabel>Transitions:</BoxLabel><br/>{transitionButtons}</StyledBlock>  
                    </Grid>
                </Grid>
            </div>
        );
    }
}

function removeIVRFromCall(taskSid) {
    return new Promise(function(resolve,reject) {
        const body = { action: 'hangup', promptText:'' };

        // Set up the HTTP options for your request
        const options = {method: 'POST', body: new URLSearchParams(body), headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}};

        // Make the network request using the Fetch API
        fetch(`${process.env.REACT_APP_WOZ_SERVER_BASE_URL}/setPrompt`, options)
        .then(resp => {
            console.log('ExecuteTest: fetch responded');
            return( resolve(resp.text()));
        })
        .catch(e  => {
            console.log(e);
            return(reject(e));
        });
    });
}

export default withTaskContext(ExecuteTest);
