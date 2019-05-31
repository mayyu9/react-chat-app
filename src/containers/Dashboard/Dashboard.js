import React, {Fragment} from 'react';
import Channel from '../Channels/Groups';
import Chatbox from '../Chatbox/Chatbox';

export default class Dashboard extends React.Component{
    constructor(props){
        super(props);
        this.state={
            channelUUID:"",
            isShowMessage:false
        };
    }

    updateState = channel => {
        // this.setState({channelUUID: channel, isShowMessage: true}, () =>{
        //     return {channelUUID: channel, isShowMessage: true}
        // });

        this.setState({channelUUID: channel, isShowMessage:true})
    }

    render(){
        return(
            <Fragment>
                <Channel updateState={this.updateState} />
                <Chatbox chanelUID={this.state.channelUUID} showMessage={this.state.isShowMessage} />
            </Fragment>
        )
    }
}