import React from 'react'
import Style from './index.scss'
import API from '@common/api.js'
import { notification } from 'antd';
import { connect } from "react-redux";


@connect(
    store => {
        return {
            userInfo: store.userInfo
        }
    }
)
class Comments extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            replyContent: '',
            selfLove: false,
            topicLike: props.topicLike,
            showMoreComments: false
        }
        this._handleKeyPress = this._handleKeyPress.bind(this);
    }

    handelChange (event){
        this.setState({replyContent:event.target.value});
    }

    __showMoreComments () {
        this.setState({
            showMoreComments: true
        })
    }

    focus () {
        this.refs.textInput.focus();
    }

    async topicLike() {
        let response = await API.topicLike({ topicId: this.props.topicId, status: this.props.topicLike? 0 : 1 })

        let dotCounts;
        if (response.data.status){
            dotCounts = this.props.dotCounts + 1;
        } else {
            dotCounts = this.props.dotCounts - 1 >= 0 ? this.props.dotCounts - 1 : 0;
        }
        this.props.topicLikeFn({
            topicLikeCounts: dotCounts, 
            topicLike: response.data.status === 1,
            index: this.props.topicIndex
        })
    }

    async _handleKeyPress (event) {
        if (event.key === 'Enter') {
            if (!this.state.replyContent) {
                notification['error']({
                    message: 'error occurred'
                })
                return
            }

            let response = await API.addDiscuss({topicId: this.props.topicId,replyContent: this.state.replyContent})
			notification['success']({
				message: response.message
            })
            

            this.props.addComments({
                replyContent: this.state.replyContent,
                replyName: this.props.userInfo.username,
                index: this.props.topicIndex
            })

            this.setState({
                replyContent: ''
            })
        }
    }

    _handlerCommentTime = () => {
        if (this.props.createdAt) {
            // 距离现在过去了多少秒
            let date = (new Date() - new Date(this.props.createdAt)) / 1000;
            
            // 过去了多少天
            let days = Math.floor(date / (60 * 60 * 24))
            let hours = Math.floor(date / (60 * 60))
            let minutes = Math.floor(date / 60)
            let second = Math.floor(date)

            if (days) return days + 'days';
            if (hours) return hours + 'hours';
            if (minutes) return minutes + 'minutes';
            if (second) return second + 'seconds';
        }
        return '';
    }

    render () {
        const CommentsList = () => {
            return (
                <ul className={`comments-list ${this.props.dialog && 'fill'}`}>
                    {
                        this.props.dialog && this.props.discuss.length === 0 ?
                            <li className="content">
                                comments
                            </li>
                            : ""
                    }
                    { 
                        this.props.discuss.map((item,index) => {
                            if (this.props.dialog || index!==3) {
                                return (
                                    <li className={`content ${(index > 3 && !this.props.dialog) && 'hidden'} ${this.state.showMoreComments && 'no-hidden'}`} key={index}>
                                        <span className="username  u-f-black">{item.replyName}</span>
                                        <span className="replay-content u-f-black-blod">{item.replyContent}</span>
                                    </li>
                                )
                            }  else {
                                return (
                                    <div key={index}>
                                        <li className={`content ${this.state.showMoreComments && 'no-hidden'}`} >
                                            <span className="username  u-f-black">{item.replyName}</span>
                                            <span className="replay-content u-f-black-blod">{item.replyContent}</span>
                                        </li>
                                        {
                                            this.props.discuss.length > 4?
                                             <li className={`content show-more u-f-lightblack2 ${this.state.showMoreComments && 'hidden'}`}>
                                                <span onClick={this.__showMoreComments.bind(this)}>显示所有</span>
                                            </li>
                                            : ''
                                        }
                                    </div>
                                )
                            }
                        })
                    }
                </ul>
            )
        }
        return (
            <div className={Style['comments-section']}>
                {
                    this.props.dialog?
                        <CommentsList />
                        :''
                }
                <div className="opetions">
                    <div className="fl-left">
                        <span className={`favorite  ${this.props.topicLike && 'active'}`} onClick={this.topicLike.bind(this)}></span>
                        <span className="comments" onClick={this.focus.bind(this)}></span>
                    </div>
                    <span className="fl-right collect"></span>
                </div>
                {
                    this.props.dotCounts?
                    <div className="dot-counts u-f-black">{this.props.dotCounts}次赞</div>
                    :
                    <div className="dot-counts u-f-black">Like</div>
                }
                {
                    !this.props.dialog?
                        <CommentsList />
                        :''
                }
                <div className="release-time u-f-lightblack2">{this._handlerCommentTime()}</div>
                <div className="add-comments">
                    <input type="text" 
                        ref="textInput"
                        className="u-f-black"
                        placeholder="add comment..." 
                        onChange={this.handelChange.bind(this)} 
                        value={this.state.replyContent} 
                        onKeyPress={this._handleKeyPress}/>
                    <span className="more"></span>
                </div>
            </div>
        )
    }
}

Comments.defaultProps = {
    dialog: false
}

export default Comments
