import React from 'react';
import { withTaskContext } from '@twilio/flex-ui';
import {StyledBlock, StyledButton, BoxLabel,PromptsTable,PromptsRow, PromptsCell} from './styles';
import {setPromptToPlay} from './SetPromptToPlay';


class PromptBlock extends React.Component {

    constructor(props) {
        super(props);
        this.playPrompt=this.playPrompt.bind(this);
    }

    playPrompt(e) {
        setPromptToPlay(assemblePrompt(e.target.value))
        .then( result => {
            console.log('BBTRACE: setPromptToPlay result=',result);
        }).catch(err=>{
            console.log('BBTRACE: error ',err);
        })
        console.log(e.target.value);
    }

    render() {

        let currentPosition=this.props.promptPosition;

        // Filter to create an array of just the required prompts
        console.log('prompts ',this.props.prompts);
        let inScopePrompts=[...this.props.prompts];  // temporary clone of the prompts array
        let i=0;
        while (i<inScopePrompts.length) {
            if (inScopePrompts[i].position!==currentPosition) {
                inScopePrompts.splice(i,1);
            } else {
                if (currentPosition==='nm') {   //NM & NI, find if we're in the right prompt of the sequence  - ALWAYS ASSUMES NM1 AND NM2 available at present
                    if (inScopePrompts[i].sequence!==this.props.nmCount) {
                        inScopePrompts.splice(i,1);
                    } else {
                        i++;
                    }
                } else if (currentPosition==='ni') {
                    if (inScopePrompts[i].sequence!==this.props.niCount) {
                        inScopePrompts.splice(i,1);
                    } else {
                        i++;
                    }            
                } else {
                    i++;
                }
            }
        }

        let promptTableBody= inScopePrompts.map((prompt,key) =>
            <PromptsRow key={key}><PromptsCell>{prompt.condition}</PromptsCell><PromptsCell>{assemblePrompt(prompt.text,this.props.slots)}</PromptsCell><PromptsCell> <StyledButton onClick={this.playPrompt} value={assemblePrompt(prompt.text,this.props.slots)}>Play</StyledButton></PromptsCell></PromptsRow>
        )  

            return (
                <StyledBlock>
                    <BoxLabel>Prompts:</BoxLabel>
                    <PromptsTable>
                        <thead><tr><th>Condition</th><th>Prompt Text</th><th></th></tr></thead>
                        <tbody>
                            {promptTableBody}
                        </tbody>
                    </PromptsTable>
                </StyledBlock>

            );

        }
    }


    function assemblePrompt(sourceText,slots) {
        if (sourceText.indexOf('[')===-1) {
            return(sourceText);
        }

        //Highly inefficient string processing character by character!
        let i=sourceText.indexOf('[')
        let assembledString=sourceText.slice(0,i);
        while (i < sourceText.length) {
            if (sourceText.substr(i,1) === '['){
                let slotNameToFill=sourceText.substring(i+1, sourceText.indexOf(']',i));
                console.log(`slotNameToFill: ${slotNameToFill}`);
                assembledString=assembledString+slotValue(slotNameToFill,slots)
                i=sourceText.indexOf(']',i)+1;
            } else {
                assembledString=assembledString+sourceText.substr(i,1);
                i++;
            }
        }

        return(assembledString);
    }

    function slotValue(slotName,slots) {
        let i;
        for (i=0; i<slots.length; i++ ) {
            console.log(`find value for ${slotName} vs ${slots[i].name}`);
            if ('slot.'+slots[i].name===slotName) {
                return (slots[i].value);
            }
        }
        return '-no value-';
    }

export default withTaskContext(PromptBlock);
