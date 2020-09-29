import React from 'react';
import { withTaskContext } from '@twilio/flex-ui';
import Grid from '@material-ui/core/Grid';
import {GoButton,StageBanner,StyledBlock} from './styles';
import {setPromptToPlay} from './SetPromptToPlay';


class PreCallView extends React.Component {

    constructor(props) {
        super(props);
        this.addIVR = this.addIVR.bind(this);
    }

    addIVR(e) {
        let ssoToken=this.props.manager.store.getState().flex.session.ssoTokenPayload.token;
        setPromptToPlay('')
        .then ( () => {
            addIVRToCall(this.props.task.taskSid, ssoToken)
            .then( result => {
                console.log('Precall:addIVR result=',result);
                this.props.task.setAttributes({ivrCallSid:result.callSid, ...this.props.task.attributes});
                this.props.flexInstance.Actions.invokeAction("ToggleMute");
            }).catch(err=>{
                console.log('Precall: error ',err);
            })
        })
    }

    render() {
        const introPageUrl=`${process.env.REACT_APP_WOZ_SERVER_BASE_URL}/intro.html`;
        return (
            <div>
                <Grid container>
                    <Grid item xs={12}><StageBanner>Pre-Test</StageBanner></Grid>
                    <Grid item xs={12}><StyledBlock><iframe title='Introduction Script' src={introPageUrl} width='100%'/></StyledBlock></Grid>
                    <Grid item xs={12}><center><GoButton onClick={this.addIVR} >Start IVR</GoButton></center></Grid>
                </Grid>
            </div>

        );

        }

        
}

function addIVRToCall(taskSid,token) {
    return new Promise(function(resolve,reject) {
        const functionUrl=`${process.env.REACT_APP_TWILIO_FUNCTIONS_BASE_URL}/addIVR`;
        console.log('BBTRACE: functionUrl=',functionUrl)
        const body = { taskSid: taskSid,  Token: token
        };

        // Set up the HTTP options for your request
        const options = {method: 'POST', body: new URLSearchParams(body), headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}};

        // Make the network request using the Fetch API
        fetch(functionUrl, options)
        .then(resp => {
            console.log('Precall: fetch responded');
            return( resolve(resp.json()));
        })
        .catch(e  => {
            console.log(e);
            return(reject(e));
        });
    });
}


export default withTaskContext(PreCallView);
