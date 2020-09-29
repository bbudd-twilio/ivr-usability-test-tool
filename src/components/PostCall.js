import React from 'react';
import { withTaskContext } from '@twilio/flex-ui';
import Grid from '@material-ui/core/Grid';
import {StageBanner,StyledButton,StyledBlock} from './styles';




class PostCallView extends React.Component {
    
    constructor(props) {
        super(props);
        this.submitResults=this.submitResults.bind(this);
    }
    
    submitResults(e) {
        this.props.setExecutionState('inactive');
    }
    

    render() {
     
            return (
                <div>
                <Grid container>
                    <Grid item xs={12}><StageBanner>Post IVR Call Questions</StageBanner></Grid>
                    <Grid item xs={12}><StyledBlock><iframe title='Questionnaire' src={process.env.REACT_APP_WOZ_SERVER_BASE_URL+'/questions.html'} width='100%' height='600'/></StyledBlock></Grid>
                    <Grid item xs={12}><center><StyledButton onClick={this.submitResults} >Submit Responses</StyledButton></center></Grid>
                </Grid>
            </div>

            );

        }
    }


export default withTaskContext(PostCallView);
