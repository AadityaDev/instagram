import React from 'react'
import Style from './index.scss'
import { connect } from "react-redux";
import { withRouter } from 'react-router'
import Avatar from '@components/avatar'
import Carousel from '@components/carousel'
import { notification} from 'antd';
import API from '@common/api.js'
import Upload from '@components/upload'


let ImageUpload = ({ changeUploadStatus, uploadImgSuccess }) => {
    return (
        <section className="image-upload">
            <div>
                <span className="icon camera"></span>
                <span><Upload successCb={uploadImgSuccess} className={'placeholder'} />upload photos</span>
            </div>
            <div>
                <span className="icon network" onClick={() => {changeUploadStatus(1)}}></span>
                <span>Add pictures from the web</span>
            </div>
        </section>
    )
}

@connect(
    store => {
        return {
            userInfo: store.userInfo
        }
    }
)

class PostTopic extends React.Component {
    constructor(props){
        super(props);
    }

    state = {
        uploadStatus: 0, // ]
        imageList: [],
        showInputNotice: true,
        inputUrl: '',
        topicDescript: ''
    }

    changeUploadStatus =  (status) => {
        this.setState({
            uploadStatus: status,
            imageList: []
        })
    }

    changeInpurUrlStatus = () => {
        this.setState({
            showInputNotice: !this.state.showInputNotice,
            inputUrl: ''
        })
    }

    closeInputUrl = () => {
        let imgLength = this.state.imageList.length
        if (imgLength === 0) {
            this.setState({
                uploadStatus: 0
            })
        } else if (imgLength > 0) {
            this.setState({
                showInputNotice: true
            })
        }
    }

    handelChange = (value) => {
        this.setState({ inputUrl: value })
    }

    handelChangeTextArea = (event) => {
        this.setState({ topicDescript: event.target.value })
    }

    delectPhoto = (index) => {
        this.setState({
            imageList:  this.state.imageList.filter((_, i) => i !== index)
        })
    }


    uploadImgSuccess = async (url) => {
        this.setState({
            imageList: [...this.state.imageList, url],
            uploadStatus: 2
        })
        console.log(this.state.imageList)
    }

    pushImgUrl = (event) => {
        if (event.key === 'Enter') {
            let url = event.target.value
            var img = document.createElement('img');
            img.style.display = 'none';
            img.crossorigin = 'anonymous';
            img.src = url;

            // 图片无效
            img.onerror = () => {
                notification['error']({
                    message: 'Please enter the correct image address'
                })
            };

            // 图片有效
            img.onload = () => {

                if (this.state.imageList.length === 0) {
                    this.setState({
                        showInputNotice: true
                    })
                }
                this.setState({
                    imageList: [...this.state.imageList, url],
                    inputUrl: ''
                })
            };
        }
    }

    // 发帖
    postTopic = async () => {
        if (this.state.imageList.length === 0) { 
            notification['error']({
                message: "Please select an image"
            });
            return
        }

        let resposne = await API.addTopic({
            topicImg: this.state.imageList,
            topicTitle: this.state.topicDescript
        })
        notification['success']({
            message: resposne.message
        });
        // 关闭发帖弹窗

        this.props.togglePostTopic(true)
    }

    render () {
        let {userInfo} = this.props

        let avatarStyle = {
            width: '40px',
            height: '40px'
        }

        let InputUrl = () => {
            return (
                <section key={1} className="input-url">
                    {
                        this.state.showInputNotice ?
                            <div className="notice" onClick={this.changeInpurUrlStatus}>
                                <i className="icon"></i>
                                {
                                    this.state.imageList.length > 0 ?
                                        <span>Add another</span>
                                        :
                                        <span>Add photo</span>
                                }
                            </div>
                            :
                            <div className="input-container">
                                <span className="close-circle" onClick={this.closeInputUrl}></span>
                                <input 
                                    type = 'text' 
                                    defaultValue={this.state.inputUrl} 
                                    // onChange={this.handelChange} 
                                    // onChange={(event) => { this.handelChange(event.target.value) }}
                                    onKeyPress={this.pushImgUrl} 
                                    placeholder="After entering the image address, press Enter." />
                            </div>
                        }
                </section>
            )
        }

        let ImgUpload = () => {
            return (
                <section key={2} className="input-url">
                    <div className="notice">
                        <span className="close-circle" onClick={this.closeInputUrl}></span>
                        <i className="icon"></i>
                        <span><Upload successCb={this.uploadImgSuccess} className={'placeholder'} />Add another</span>
                    </div>
                </section>
            )
        }

        let UploadPlaceholder = () => {
            return (
                <div>
                    {
                        this.state.uploadStatus === 1 ? <InputUrl /> : ''
                    }
                    {
                        this.state.uploadStatus === 2 ? <ImgUpload /> : ''
                    }
                    {
                        this.state.uploadStatus === 0 ? 
                        <ImageUpload
                            uploadImgSuccess={this.uploadImgSuccess}
                            changeUploadStatus={this.changeUploadStatus}
                        /> : ''
                    }
                </div>
            )
        }

        return (
            <div className={`${Style['post-topic']}`} >
                <section className="topic-content">
                    <header>
                        <Avatar userInfo={userInfo} avatarStyle={avatarStyle}/>
                    </header>
                    
                    {
                        this.state.imageList.length > 0?
                        (
                            <section className="image-list">
                                <Carousel imageList={this.state.imageList} delectPhoto={this.delectPhoto} showCloseBtn={true} showSlickDot={false}></Carousel>
                            </section>
                        )
                        :
                        ""
                    }

                    <div className="upload-style">
                        <UploadPlaceholder />
                    </div>

                    <div className="descript">
                        <textarea  value={this.state.topicDescript} onChange={this.handelChangeTextArea} rows="4" cols="50" placeholder="If you like, you can add a description"></textarea>
                    </div>

                    <footer className="footer">
                        <span className="close" onClick={()=> this.props.togglePostTopic()}>shut down</span>
                        <span className="post" onClick={this.postTopic}>Post</span>
                    </footer>
                </section>
            </div>
        )
    }
}

export default withRouter(PostTopic)