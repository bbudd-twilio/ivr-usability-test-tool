import React from 'react';
import { withTaskContext } from '@twilio/flex-ui';

console.log('BBTRACE: .env=',process.env);
const idleScreenUrl=`${process.env.REACT_APP_WOZ_SERVER_BASE_URL}/idle.html`;
console.log('BBTRACE: idle=',idleScreenUrl)


class InactiveView extends React.Component {

    render() {
     
            return (
                <div>
                    <iframe title='Idle' src={idleScreenUrl} width='100%' height='600'/>
                </div>

            );

        }
    }


export default withTaskContext(InactiveView);
