import { Controller } from 'egg'

/**
 * 
 */

class HandlerController extends Controller {

    public async getQiniuToken () {
        const {ctx} = this
        let token = await ctx.service.qiniu.getQiniuToken()
        ctx.returnBody(200, "token", {
            token: token,
            baseUrl: 'http://piyhxgz90.bkt.clouddn.com'
        })
    }

    public async uploadImage () {
        const {ctx} = this
        const stream = await ctx.getFileStream()
        await ctx.service.qiniu.upload(stream)
    }
}

module.exports = HandlerController
