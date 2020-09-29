import React from 'react';
import { withTaskContext } from '@twilio/flex-ui';
import SlotItem from './SlotItem';
import {StyledBlock, BoxLabel} from './styles';



class SuperStateContext extends React.Component {

    constructor(props) {
        super(props);
        this.updateSlotValue = this.updateSlotValue.bind(this);
        this.state={slots: this.props.slots};
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.slots!==this.state.slots) {
            this.setState({slots: nextProps.slots});
        }
        return(true);
    }

    updateSlotValue(updatedSlot) {
        console.log('SuperStateContext: updated slot ',updatedSlot);
        this.props.onContextChange({name: updatedSlot.name, value: updatedSlot.value});

        // Now update local state
        let i=0;
        let slotsCopy=this.state.slots;
        console.log(slotsCopy);
        while (i<slotsCopy.length && slotsCopy[i].name!==updatedSlot.name ){
            i++
        }
        if (i<this.state.slots.length) {
            slotsCopy[i].value=updatedSlot.value;
            this.setState({slots:slotsCopy},() => {console.log(this.state)});
        }
    }



    render() {
            const slotCopy=this.state.slots;

            const slotList= slotCopy.map((slot,key) =>
                <SlotItem key={key} slotdetails={slot} onValueChange={this.updateSlotValue}/>
            )
     
            return (
                <StyledBlock>
                    <BoxLabel>Activity: {this.props.activityname}</BoxLabel>
                    {slotList}
                </StyledBlock>

            );

        }
    }


export default withTaskContext(SuperStateContext);
