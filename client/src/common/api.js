import instance from './axiosInstace.js';

// register
exports.register = (data) => {
    return instance.post('/login/register', data);
 };

// login
exports.login = (data) => {
    return instance.post('/login', data);
};
// signout
exports.signout = (data) => {
    return instance.get('/login/signout', data);
};
  
exports.getUserInfo = (data) => {
    return instance.get('/user/info', data);
}

exports.getPersonalInfo = (data) => {
    return instance.get('/user/personal', data);
}

exports.updatePersonalInfo = (data) => {
    return instance.post('/user/update', data);
}

exports.addTopic = (data) => {
    return instance.post('/topic/add', data);
}

exports.topicLike = (data) => {
    return instance.put('/topic/like', data);
}

exports.frientTopicList = (data) => {
    let ls = [];
    return instance.get('/topic/friend/list', data);
}

exports.addDiscuss = (data) => {
    return instance.post('/topic/discuss/add', data);
}
exports.searchTopic = (data) => {
    return instance.get('/topic/search', data);
}




// 未关注列表
exports.friendList = (data) => {
    return instance.get('/friend/list', data);
}

// 关注
exports.followUser = (data) => {
    return instance.post('/friend/follow', data);
}


// 关注
exports.getToken = (data) => {
    return instance.get('/handle/upload/get-token', data);
}
