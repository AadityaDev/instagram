import React from 'react'
import Style from './index.scss'
class Footer extends React.Component{
    constructor(props){
        super(props)
        this.state = {}
    }
 
    render () {
        return (
            <footer className={Style['page-footer']}>
                <ul className="nav">
                    <li>about us</li>
                    <li>stand by</li>
                    <li>News Center</li>
                    <li>API</li>
                    <li>Jobs</li>
                    <li>Privacy</li>
                    <li>Terms</li>
                    <li>table of Contents</li>
                    <li>Homepage</li>
                    <li>Topic Tag</li>
                    <li>Language</li>
                </ul>
                <span className="sign u-f-lightblack2">© 2019 Instagram</span>
            </footer>
        )
    }

}
export default Footer