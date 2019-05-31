import React, {Fragment} from 'react';
import { CometChat } from "@cometchat-pro/chat";
import { Link } from "react-router-dom";

export default class Groups extends React.Component{
    constructor(props){
        super(props);
        this.channelLimit = 30;
        this.state={channels:[], isChannelActive: ""}
    }

    componentWillMount(){
        //debugger;
        //we are pulling previous chatmessages from the api immediately the channel is activated
        this.groupsRequest = new CometChat.GroupsRequestBuilder()
            .setLimit(this.channelsLimit)
            .build();
        this.groupsRequest.fetchNext().then(
            channels => {
                /* groupList will be the list of Group class */
                console.log("Groups list fetched successfully", channels);
                this.setState({ channels });
            },
            error => {
                console.log("channels list fetching failed with error", error);
            }
            );
    }

    selectGroup = (channelID) => {
        console.log(channelID)
        this.password = "";
        this.groupType = CometChat.GROUP_TYPE.PUBLIC;
        this.props.updateState(channelID);
        CometChat.joinGroup(channelID, this.groupType, this.password).then(
          channel => {
            console.log(" Joined channels successfully:", channel);
          },
          error => {
            console.log("You are already a member of this group");
          }
        );
      }

    render(){
        return(
            <Fragment>
                <div className="group" style={{width: '40%', border:'1px solid', height:'100%'}}>
                <div className="groupList">
                    <ul style={{listStyle: 'none', margin:'0px'}}>
                    {this.state.channels.map(channels => (
                        <li
                        key={channels.guid}
                        onClick={ () =>this.selectGroup(this, channels.guid)}
                        >
                        <div className="groupName"> # {channels.name}</div>
                        </li>
                    ))}
                    </ul>
                </div>
                <div className="createGroup" style={{marginBottom: '20px'}}>
                    <button className="createGroupBtn button">
                    <Link className="a" to="/createchannel">
                        Create A Channel
                    </Link>
                    </button>
                </div>
                </div>
            </Fragment>
        );
    }
}