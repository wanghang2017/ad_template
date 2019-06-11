
exports.cluster = {
    listen: {
        port: 18650,
    }
}

exports.keys = "wanghang";
exports.security = {
    domainWhiteList: ['http://127.0.0.1:7001'],
    scp: {
        ignore: '/api',
    },
    xframe: {
        ignore: '/api',
    },
    csrf: {
        ignore: "/api"
    },

};

exports.myhost="https://agent-api.emarbox.com";

