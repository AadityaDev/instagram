import React from 'react'
import Style from './index.scss'
import myUtil from '@common/utils.js'
import Avatar from '@components/avatar'
import { connect } from "react-redux";
import { withRouter } from 'react-router'

@connect(
    store => {
        return {
            userInfo: store.userInfo
        }
    }
)
class Recommend extends React.Component {
    constructor(props){
        super(props);
        this.setLeftFn = myUtil.debunce(this.setLeftFn, 200)
    }
    state = {
        friend_list: [],
        attach: {
            isAttach: false,
            top: 78,
            left: 0
        },
        hadSetScrollFn: false
    }
    
    // 设置边缘
    setLeftFn = () => {
        if (!this.refs.recommend) return
        let offsetleft = this.refs.recommend.offsetLeft
        let attach = Object.assign({}, this.state.attach, {
            left: offsetleft
        })
        this.setState({
            attach
        })

        if (!this.state.hadSetScrollFn) {
            window.addEventListener('scroll', this.attachFn)
            this.setState({
                hadSetScrollFn: true
            })
        }
    }

    attachFn = () => {
        let isAttach = window.scrollY >= 78
    
        if (isAttach !== this.state.attach.isAttach) {
            let attach = Object.assign({}, this.state.attach, {
                isAttach
            })
            this.setState({
                attach
            })
        }
    }

    componentDidMount () {
        this.setLeftFn()
        
        window.addEventListener('resize', this.setLeftFn)
    }

    componentWillUnmount(){
        this.setState = (state, callback) => {
            return;
        };

        window.removeEventListener("resize", this.setLeftFn);
        window.removeEventListener("scroll", this.attachFn);
    }


    render () {
        const { userInfo, followList} = this.props
        let avatarStyle = {
            width: '50px',
            height: '50px'
        }
        let avatarStyle2 = {
            width: '40px',
            height: '40px'
        }

        return (
            <div 
                style={{ left: this.state.attach.left + 'px', top: this.state.attach.top + 'px'}}
                className={`${Style.recommend} ${this.state.attach.isAttach && 'is-attach'}`} 
                ref="recommend">
                <header className="header">
                    <Avatar userInfo={userInfo} avatarStyle={avatarStyle}/>
                </header>
                <section className="post" onClick={()=> this.props.togglePostTopic()}>
                Post
                </section>

                <section className="container">
                    <nav className="title">Recommended attention</nav>
                    {
                    followList.length === 0
                    ?<p className="notice">No recommendation</p>
                    :<ul className="friend_photo">
                        {/* <p className="notice">推荐关注</p> */}
                        {
                            followList.map((item, index)=>{
                                return (
                                    <li className="list" key={index}>
                                        <Avatar userInfo={item} avatarStyle={avatarStyle2} usernameStyle={{width: '120px', fontSize: '12px'}} abstractStyle={{width: '120px', fontSize: '12px'}}/>
                                        {
                                            item.hasFollow
                                                ? <span onClick={() => { this.props.setFollowStatus(index, false) }}>Unfollow</span>
                                                : <span className="follow" onClick={() => {this.props.setFollowStatus(index, true)}}>Follow</span>
                                        }
                                    </li>
                                )
                            })
                        }
                    </ul>
                    }
                </section>
                <section className="introduce">
                    <p>About Us·Support·News Center·API·Work·Privacy·Terms and Conditions·Personal Home·Topic Label·Language</p>
                    <p className="brand">@ 2019 Aditya</p>
                </section>
            </div>
        )
    }
}

export default withRouter(Recommend);