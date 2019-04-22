import { Controller } from 'egg'

class UserController extends Controller {
    /**
     * 
     * @return {Promise<*>}
     */

    // 
    public async register () {
        const {ctx} = this;
        const {password, username, email} = ctx.request.body

        // 
        if (!this.__errNotice) return

        // 
        await ctx.service.user.register({ password, username, email});

    }

    // 
    public async loginIn () {
        const {ctx} = this;
        const {password, email} = ctx.request.body

        // 
        const token = await ctx.service.user.login({password, email})

        // set cookie
        if (token) {
            // Cookie.
            const opts = {
                path: '/',
                maxAge: 1000 * 60 * 60 * 24 * 30,
                // maxAge: 1000 * 40,
                // signed: true,
                httpOnly: false,
                domain: '127.0.0.1'
            };
            ctx.cookies.set(this.config.auth_cookie_name, token, opts); // cookie 
            ctx.returnBody(200, "login successful")
        } else {
            ctx.throw(400, 'wrong user name or password')
        }
    }

    public async signOut () {
        const { ctx } = this;
        ctx.logout();
        ctx.cookies.set(this.config.auth_cookie_name, ""); // cookie 
        ctx.returnBody(200, "Logout successful")
    }

    private __errNotice () {
        const {ctx} = this;
        const {mobile, password, code, username, email} = ctx.request.body
        let message;
        if (!mobile || !email) {
            message = 'Phone number or mailbox cannot be empty'
        } else if (!code) {
            message = 'verification code must be filled'
        } else if (!username) {
            message = 'User name is empty'
        } else if (!password) {
            message = 'password can not be blank'
        }

        // 
        if (message) {
            ctx.throw(400, message);
            return false
        }
        return true
    }

}

module.exports = UserController
