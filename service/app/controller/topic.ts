import { Controller } from 'egg'

class TopicController extends Controller {
    
    /**
     * 
     */
    public async addTopic () {
        const {ctx} = this;
        const {topicImg, topicTitle} = ctx.request.body

        let userId = ctx.user.userId

        let newTopic = {
            topicImg: JSON.stringify(topicImg),
            topicTitle: topicTitle,
            userId,
        }

        await ctx.service.topic.insertTopic(newTopic)
        
        ctx.returnBody(200, "Posted")
    }


    /**
     * 
     */
    public async addDiscuss () {
        const {ctx} = this;
        const {topicId, replyContent} = ctx.request.body

        let userId = ctx.user.userId
        let user = await this.service.user.getUserByUserId(userId)

        let newDiscuss = {
            topicId: topicId,
            replyContent: replyContent,
            replyName: user.username,
            userId,
        }

        let discuss: any =  await ctx.service.topic.insertDiscuss(newDiscuss)
        
        discuss && ctx.returnBody(200, "Comment successful")
        !discuss && ctx.returnBody(400, "Network exception, please try again later")
    }


    /**
     * 
     */
    public async topicDetail () {
        const {ctx} = this;
        const {topicId} = ctx.request.query

        let topicDetail = await ctx.service.topic.topicDetailHanderl(topicId)
        
        ctx.returnBody(200, "success", topicDetail)
    }

    /**
     * 
     */
    public async friendsTopicList () {
        const {ctx} = this;

        let userId = ctx.user.userId

        let follower =  await ctx.service.follow.findFollow({
            followedId: userId,
            status: 1
        })
        
        let followList = follower.map((item) => {
            return item.userId
        })
        followList.push(userId)

        const Op = this.app.Sequelize.Op
        let topics = await ctx.service.topic.queryTopicList({
            userId: {
                [Op.in]: followList
            }
        })
        let topicList: any = [];

        for (let topic of topics) {
            let item = await ctx.service.topic.topicDetailHanderl(topic.topicId)
            topicList.push(item)
        }

        topicList && ctx.returnBody(200, "success", topicList)
    }

    public async putLikeTopic () {
        const {ctx} = this;
        const {topicId, status} = ctx.request.body

        let userId = ctx.user.userId

        let topicStatus = {
            topicId: topicId,
            userId,
            status
        }
        let query = {
            topicId: topicId,
            userId,
        }

        await ctx.service.topic.putTopicLike(query, topicStatus)
        
        ctx.returnBody(200, "Search update succeeded", {
            status: +status
        })
    }

    /**
     * 
     */
    public async searchTopic () {
        const {search} = this.ctx.request.query

        const Op = this.app.Sequelize.Op
        let topics = await this.ctx.service.topic.queryTopicList({
            topicTitle: {
                [Op.regexp]: search
            }
        })
        let topicList: any = [];

        for (let topic of topics) {
            let item = await this.ctx.service.topic.topicDetailHanderl(topic.topicId)
            topicList.push(item)
        }

        this.ctx.returnBody(200, "success", topicList)
    }


    public async queryTopic () {
        let {ctx} = this
        let topicCounts = await ctx.service.topic.queryTopicCounts({
            userId: ctx.user.userId
        })

        return topicCounts
    }
}

module.exports = TopicController;
