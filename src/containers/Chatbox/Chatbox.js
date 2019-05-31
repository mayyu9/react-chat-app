import React, { Component } from "react";
import { CometChat } from "@cometchat-pro/chat";
// import "./index.css";


export default class Chatbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      receiverID: this.props.chanelUID,
      messageText: null,
      channelMessages: [],
      user: {}
    };
    this.receiverID = this.state.receiverID;
    this.messageType = CometChat.MESSAGE_TYPE.TEXT;
    this.receiverType = CometChat.RECEIVER_TYPE.GROUP;
    this.messagesLimit = 30;
    this.listenerID = "groupMessage";
    this.send = this.send.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleMessageInput = this.handleMessageInput.bind(this);
    this.fetchNewMessages = this.fetchNewMessages.bind(this);
    this.getUser = this.getUser.bind(this);
    this.newMessageListener = this.newMessageListener.bind(this);
  }
  componentDidUpdate() {
      console.log('didupdate')
    if (this.props.chanelUID !== this.state.receiverID) {
      this.fetchNewMessages();
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log('should')
    if (this.state.recieverID === this.props.chanelUID) {
        console.log('inside');
      return true;
    }
    return true;
  }
  componentDidMount() {
    this.getUser();
    this.newMessageListener();
  }
  componentWillUnmount(){
    CometChat.removeMessageListener(this.MessageListener);
  }

  fetchNewMessages() {
    console.log('messages1: ',this.props.chanelUID );
    this.messagesRequest = new CometChat.MessagesRequestBuilder()
    //   .setGUID(this.props.chanelUID)
      .setLimit(this.messagesLimit)
      .build();
    this.messagesRequest.fetchPrevious().then(
      messages => {
          console.log('messages2: ',messages);
        // this.setState(
        //   {
        //     channelMessages: messages,
        //     receiverID: this.props.chanelUID
        //   },
        //   () => {
        //     return {
        //       channelMessages: messages,
        //       receiverID: this.props.chanelUID
        //     };
        //   }
        // );
        this.setState({channelMessages: messages});
        this.scrollToBottom();
      },
      error => {
        console.log("Message fetching failed with error:", error);
      }
    );
  }
  send() {
    let textMessage = new CometChat.TextMessage(
      this.state.receiverID,
      this.state.messageText,
      this.messageType,
      this.receiverType
    );
    CometChat.sendMessage(textMessage).then(
      message => {
        console.log("Message sent successfully:", message);
      },
      error => {
        console.log("Message sending failed with error:", error);
      }
    );
  }
  scrollToBottom() {
    const chat = document.querySelectorAll(".chat")[0];
    chat.scrollTop = chat.scrollHeight;
  }
  handleSubmit(e) {
    e.preventDefault();
    this.send();
    e.target.reset();
  }
  handleMessageInput(e) {
    this.setState({ messageText: e.target.value });
  }
  // Get the current logged in user
  getUser() {
    CometChat.getLoggedinUser().then(
      user => {
        this.setState({user:user});
        console.log("user details:", {user})
      },
      error => {
        console.log("error getting details:", { error });
        return false;
      }
    );
  }
  newMessageListener() {
      console.log('message lsitener: ')
    
    CometChat.addMessageListener(
      this.listenerID,
      new CometChat.MessageListener({
        onTextMessageReceived: textMessage => {
            console.log('textMessages: '+textMessage)
          this.setState(({ channelMessages }) => {
            return { channelMessages: [...channelMessages, textMessage] };
          });
        }
      })
    );
  }
  renderMessages() {
    return this.props.showMessage
      ? this.state.channelMessages.map(data => (
          <div>
            {/* Render loggedin user chat at the right side of the page */}
            {this.state.user.uid === data.sender.uid ? (
              <li className="self" key={data.id}>
                <div className="msg">
                  <p>{data.sender.uid}</p>
                  <div className="message"> {data.data.text}</div>
                </div>
              </li>
            ) : (
              // render loggedin users chat at the left side of the chatwindow
              <li className="other" key={data.id}>
                <div className="msg">
                  <p>{data.sender.uid}</p>
                  <div className="message"> {data.data.text} </div>
                </div>
              </li>
            )}
          </div>
        ))
      : "";
  }
  renderChatInputBox() {
      console.log('çhat input: '+this.props.showMessage);
    return this.props.showMessage ? (
      <div className="chatInputWrapper">
        <form onSubmit={this.handleSubmit}>
          <input
            className="textarea input"
            type="text"
            placeholder="Type a message..."
            onChange={this.handleMessageInput}
          />
        </form>
        <div className="emojis" />
      </div>
    ) : (
      ""
    );
  }
  render() {
      console.log('chatbox: '+this.props.showMessage );
    return (
      <React.Fragment>
        <div className="chatWindow" style={{width: '60%', border:'1px solid red', height:'100%'}}>
            chatbox window
          <ol className="chat">{this.renderMessages()}</ol>
          {this.renderChatInputBox()}
          
        </div>
      </React.Fragment>
    );
  }
}