import { Service } from 'egg';
const jwt = require('jsonwebtoken');
const uuid = require('uuid');

/**
 * Service
 */

interface RegisterParams {
  username: string,
  password: string,
  mobile?: number,
  email: string,
  userId?: string
}

interface LoginParams {
    email: string,
    password: string
}

export default class UserService extends Service {

    public async register(user: RegisterParams) {
        const {ctx} = this
        
        user.userId = uuid.v4().replace(/-/g,'')

        const queryResult = await this.hasRegister(user.email)
        if (queryResult) {
            ctx.returnBody(200, "邮箱已被使用", {
                flag: false  
            })
            return
        }
        
        const userInfo = await this.ctx.model.User.create(user);

        ctx.status = 200;
        ctx.returnBody(200, "注册成功", {
            userId: userInfo.dataValues.userId,
            flag: true  
        })
        return userInfo.dataValues;
    }

    public async login(user:LoginParams) {
        const {app} = this

        const existUser = await this.getUserByMail(user.email)

        if (!existUser) {
            return null
        }

        const passhash = existUser.password;
        // TODO: change to async compare
        const equal = passhash == user.password
        if (!equal) {
            return false
        }

        const token = jwt.sign({userId: existUser.userId,}, app.config.jwtSecret, {expiresIn: '7d'});
        return token;
    }

    
    private async hasRegister(email) {

        const user = await this.ctx.model.User.findOne({
            where: {email: email}
        });

        if (user && user.dataValues.userId) {
            return true;
        }

        return false;
    }
    
    public async getUserByUserId(userId) {
        const query = { userId: userId };
        return this.ctx.model.User.findOne({
            where: query
        })
    }

    public async getUserByMail(email) {
        return this.ctx.model.User.findOne({ 
            where: {
                email
            }
        })
    }

    public async updateUserInfo(query, updateValue) {

        return this.ctx.model.User.update(updateValue, { 
            where: query
        })
    }

    public async getUserList(userId) {
        let {app} = this
        const Op = app.Sequelize.Op

        let followList  = await this.ctx.model.Follow.findAll({
            attributes: ['userId'],
            where: {
                followedId: userId,
                status: 1
            }
        })

        followList = followList.map(item => {
            return item.userId
        })


        return this.ctx.model.User.findAll({
            attributes: ['userId', 'username', 'email', 'avatarUrl', 'abstract'],
            where: { 
                userId: {
                    [Op.ne]: userId, 
                    [Op.notIn]: followList
                }
            }
        })
    }
}
