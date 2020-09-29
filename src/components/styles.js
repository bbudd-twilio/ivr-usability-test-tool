import { default as styled } from 'react-emotion';


export const Header = styled('div')`
  font-size: 14px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin: 0px 0px 0px;
  padding:  4px 12px 4px 12px;
  background-color: ${props => props.theme.MainHeader.Container.background};;
  color: white;
`;

export const DetailsTable = styled('table')`
    color: ${props => props.theme.calculated.textColor}};
    border: 2px solid   ${props => props.theme.MainHeader.Container.background};
`;

export const TitlesTD = styled('td') `
    border: 0px solid;
    width: 30%;
`;

export const DetailRow = styled('tr') `
    border: 0px solid;
`;

export const StageBanner = styled('div') `
    background-color: #193b70;
    color: white;
    padding: 4px 12px 4px 12px;
    margin: 2px 2px 2px 2px;
    font-weight: bold;
    text-transform: uppercase;

`;

export const CallReasonBanner = styled('div') `
    background-color: #dc308c;
    color: white;
    padding: 6px 12px 6px 12px;
`;

export const PaddedBox = styled('div') `
    padding: 4px 4px 4px 4px;
`;

export const TimeStamp = styled('div') `
    font-weight: bold;
    font-size : 10px;
` ;

export const SummaryText = styled('div') `
    font-size: 12px
`;

export const StyledButton = styled('button')`
	background: ${(props) => (props.background ? props.background : '#ccc')};
	color: ${(props) => (props.color ? props.color : '#000')};
	letter-spacing: 2px;
	text-transform: uppercase;
	font-weight: bold;
	margin-right: 1em;
	padding: 0px 16px;
	height: 28px;
	font-size: 10px;
	outline: none;
	border-radius: 100px;
	align-self: center;
	border-width: initial;
	border-style: none;
	border-color: initial;
	&:hover {
		cursor: pointer;
    }
    &:disabled {
        background: ${(props) => (props.background ? props.background : '#ccc')};
        color: ${(props) => (props.color ? props.color : '#cdd')};
    }
`;

export const GoButton = styled('button')`
	background: #007000;
	color: #ffffff;
	letter-spacing: 2px;
	text-transform: uppercase;
	font-weight: bold;
	margin-right: 1em;
	padding: 0px 16px;
	height: 28px;
	font-size: 10px;
	outline: none;
	border-radius: 100px;
	align-self: center;
	border-width: initial;
	border-style: none;
	border-color: initial;
	&:hover {
		cursor: pointer;
    }
    &:disabled {
        background: ${(props) => (props.background ? props.background : '#ccc')};
        color: ${(props) => (props.color ? props.color : '#cdd')};
    }
`;

export const StopButton = styled('button')`
	background: #d32e2f;
	color: #ffffff;
	letter-spacing: 2px;
	text-transform: uppercase;
	font-weight: bold;
	margin-right: 1em;
	padding: 0px 16px;
	height: 28px;
	font-size: 10px;
	outline: none;
	border-radius: 100px;
	align-self: center;
	border-width: initial;
	border-style: none;
	border-color: initial;
	&:hover {
		cursor: pointer;
    }
    &:disabled {
        background: ${(props) => (props.background ? props.background : '#ccc')};
        color: ${(props) => (props.color ? props.color : '#cdd')};
    }
`;

export const SlotNameLabel = styled('div')`
    font-size: 12px;
    padding: 4px 4px 4px 4px;
    color: ${(props) => (props.color ? props.color : '#000')};
`;

export const StyledBlock = styled('div') `
    background-color: #ffffff;
    color: ${(props) => (props.color ? props.color : '#000')};
    padding: 6px 12px 6px 12px;
    border-color:  ${(props) => (props.color ? props.color : '#000')};
    border: 2px solid; 
    margin: 4px 4px 4px;
`;

export const TransitionButton = styled('button')`
	background: ${(props) => (props.background ? props.background : '#ccc')};
	color: ${(props) => (props.color ? props.color : '#000')};
	letter-spacing: 2px;
	text-transform: uppercase;
	font-weight: bold;
	margin: 1em 1em 1em 1em;
	padding: 0px 16px;
	height: 28px;
	font-size: 10px;
	outline: none;
	border-radius: 0px;
	align-self: left;
	border-width: initial;
	border-style: none;
	border-color: initial;
	&:hover {
		cursor: pointer;
    }

`;

export const BoxLabel = styled('div') `
    font-size: 12px;
    font-weight: 600;  
`;
export const DialogueStateHeader = styled('div') `
    font-size: 16px;
    font-weight: 800;  
`;

export const PromptsTable = styled('table')`
    color: black;
    border: 2px solid  black;
`;

export const PromptsRow = styled('tr')`
    color: black;
    border: 1px solid  black;
`;

export const PromptsCell = styled('td')`
    color: black;
    border: 1px solid  black;
    padding:  2px 10px 2px 10px;
`;