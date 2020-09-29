import React from 'react';
import { withTaskContext } from '@twilio/flex-ui';
import {SlotNameLabel} from './styles';



class SlotItem extends React.Component {

    constructor(props) {
        super(props);
        this.slotValueChange = this.slotValueChange.bind(this);
        this.state={name:this.props.slotdetails.name, value:this.props.slotdetails.value};

    }

    slotValueChange(e) {
        this.props.onValueChange({name: this.props.slotdetails.name, value: e.target.value});
        this.setState({value:e.target.value});
    }

    render() {
            console.log('SlotItem:',this.props.slotdetails.name)
            return (
                <div>
                    <hr/>
                   <SlotNameLabel>{this.props.slotdetails.name}</SlotNameLabel>
                    <input type="textarea" onChange={this.slotValueChange} value={this.props.slotdetails.value} />          
                </div>

            );

        }
    }


export default withTaskContext(SlotItem);
