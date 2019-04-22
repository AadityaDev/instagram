import { Service } from 'egg';
const qiniu = require('qiniu')

/**
 * Service
 */
interface qiniuOptioin {
    scope: string, //  
    expires: number
}

export default class qiniuService extends Service {
    private accessKey: string = '';
    private secretKey: string = '';
    private publicBucketDomain = 'http://piyhxgz90.bkt.clouddn.com';

    private options: qiniuOptioin = {
        scope: 'instagram',
        expires: 7200
    }


    public async getQiniuToken () {
        if (!this.accessKey || !this.secretKey || !this.publicBucketDomain) {
            this.ctx.throw(400, 'Male please configure seven cattle authentication parameters')
        }
        let mac = new qiniu.auth.digest.Mac(this.accessKey, this.secretKey);
        let putPolicy = new qiniu.rs.PutPolicy(this.options);
        let uploadToken = putPolicy.uploadToken(mac);

        return uploadToken
    }

    /**
     * 
     */
     public async upload (stream: any) {

        let {ctx} = this

        let config = new qiniu.conf.Config();
        config.zone = qiniu.zone.Zone_z2;

        let formUploader  = new qiniu.form_up.FormUploader(config);
        let putExtra = new qiniu.form_up.PutExtra();
        let uploadToken = this.getQiniuToken()
        
        formUploader.putFile(uploadToken, '', stream, putExtra, (respErr,
            respBody, respInfo) => {
            if (respErr) {
              throw respErr;
            }
            if (respInfo.statusCode == 200) {
                ctx.returnBody(200, "Upload success", {
                    key: respBody.key,
                    hash: respBody.hash,
                    url: this.publicBucketDomain
                })
            } else {
                ctx.returnBody(respInfo.statusCode, "upload failed")
            }
          });
     }


}
