
// @templateId   模板id
// @publishId    渠道号
// @picHeight    图片高度
// @picWidth     图片宽度
// @bidfloor     底价 
// @placementId  广告位id

import md5 from 'js-md5';

~function () {

    var date = new Date();
    var initData = process.env;


    // console.log(initData);
    var bid = initData.bid;
    var length = bid.length;
    var index = 0;
    if (length > 0) {
        index = Math.round(Math.random() * (length - 1));
    }
    // console.log(index);
    var initParamsData = {
        templateId: bid[index].creative.templateId,
        publishId: bid[index].channelId,
        picHeight: "",
        picWidth: "",
        bidfloor: bid[index].price,
        placementId: bid[index].placementId,
    }
    // console.log(initParamsData);
    function formateDate(date) {
        var obj = {
            yyyy: date.getFullYear() + "",
            MM: getNum(date.getMonth() + 1),
            dd: getNum(date.getDate()),
            hh: getNum(date.getHours()),
            mm: getNum(date.getMinutes()),
            ss: getNum(date.getMilliseconds()),
        }

        function getNum(num) {
            return num < 10 ? "0" + num : num + ""
        }
        return obj.yyyy + obj.MM + obj.dd + obj.hh + obj.mm + obj.ss;
    }

    function Ad_yima() {
        var _this = this;
        _this.init = function () {
            _this.Ajax.post("https://nonstandard.emarbox.com:5800", this.params, function (response) {
                var result = JSON.parse(response);
                createTemplate(result);
                bindEvent(result);
            }, function () {
                var infoRes = _this.createInfo();
                infoRes = Base64.encode(infoRes);
                infoRes = infoRes + "_" + md5(infoRes + "_impr_click_key_23ser@df&").toLocaleUpperCase();
                for (var i = 0; i < bid.length; i++) {
                    var item = bid[i];
                    item.clickMonitorUrl = "https://testmm.emarbox.com/nonstandard/click?info=" + infoRes + "&c=" + initParamsData.bidfloor;
                    item.impressMonitorUrl = "https://testmm.emarbox.com/nonstandard/impression?info=" + infoRes + "&c=" + initParamsData.bidfloor;
                }
                var result = {
                    bid: bid
                }
                createTemplate(result);
                bindEvent(result);


            })
        };

        function moniter(url) {
            var img = document.createElement("img");
            img.src = url;
        }
        function bindEvent(result) {
            var bid = result.bid || null;
            if (!bid) {
                return;
            }
            bid = bid[index] || {};
            var clickMonitorUrl = bid.clickMonitorUrl;
            var impressMonitorUrl = bid.impressMonitorUrl;
            var url = bid.url;
            var ad_container = document.getElementsByClassName("ad-container")[0];
            ad_container.addEventListener("click", function (e) {
                e.stopPropagation();
                moniter(clickMonitorUrl);
                var a = document.createElement("a");
                a.href = url;
                a.click();
            });

            var body = document.documentElement || document.body;
            function getElementToPageTop(el) {
                if (el.parentElement) {
                    return getElementToPageTop(el.parentElement) + el.offsetTop;
                }
                return el.offsetTop;
            }
            var top = getElementToPageTop(ad_container);
            function impressMonitor(e) {
                if ((body.scrollTop + body.clientHeight) > top) {
                    moniter(impressMonitorUrl);
                    window.removeEventListener("scroll", impressMonitor);
                }
            }

            if (top < body.clientHeight) {
                moniter(impressMonitorUrl);
            } else {
                window.addEventListener("scroll", impressMonitor);
            }
        }
        function createTemplate(result) {
            var bid = result.bid || null;
            if (!bid) {
                return;
            }
            bid = bid[index] || {};
            var lickMonitorUrl = bid.clickMonitorUrl;
            var impressMonitorUrl = bid.impressMonitorUrl;
            var creative = bid.creative || {};
            var imgs = creative.picUrl || [];
            var text = creative.text || {};

            var imgCount = imgs.length || 0;
            var advertiserName = text.advertiserName || "";
            var description = text.description || "";
            var title = text.title || "";

            var outerPadding = 2;
            var template = '<div class="ad-container" style="position: relative"> ';
            var adTemplate = '<span style=" position: absolute;right: 2vw;bottom: 0;color: #ccc;font-size: 12px;border: 1px solid #ccc;padding: 0 3px;border-radius: 3px; ">广告</span>';
            var titleBox = "";
            var contentBox = "";
            var footerBox = "";

            if (title.trim().length > 0) {
                titleBox = '<h3>' + title + '</h3>';
            }
            if (advertiserName.trim().length > 0) {
                footerBox = '<h3>' + "广告主" + '|' + advertiserName + '</h3>';
            }

            function computeStyle(all) {
                var count = all <= 3 ? all : 0;
                if (all == 4) {
                    count = 2;
                } else if (all == 6) {
                    count = 3;
                }
                var width = 100 - outerPadding * 2;
                var total = 10 - outerPadding * 2;
                var padding = 0;
                if (count >= 2) {
                    padding = total / (count - 1);
                    width = 90 / count;
                }
                return {
                    padding: padding,
                    width: width,
                    count: count
                };
            }
            function computeContent(total) {
                var style = computeStyle(total);
                var contentBox = '<ul class="ad-list" style="list-style: none;overflow: hidden;width: 100vw; padding:0 2vw;box-sizing:border-box">';
                var padding = style.padding;
                var width = style.width;
                var count = style.count;
                for (var i = 1; i <= total; i++) {
                    padding = (i % count == 0) ? 0 : style.padding;
                    contentBox += '<li class="ad-item" style="list-style: none;box-sizing:border-box;float: left; width: ' + width + 'vw ; margin-right: ' + padding + 'vw; border: 1px solid #ccc">' +
                        '<img style="width:100%;" src="' + imgs[i - 1] + '" alt="">' +
                        '</li>';

                }
                contentBox += '</ul>';
                return contentBox;
            }

            var style = computeStyle(imgCount);

            if (imgCount == 1 && description.length > 0) {
                contentBox = '<div style="width:100%; padding:2%; overflow: hidden;">' +
                    '<div style="float:left;width:30vw;margin-right:2vw;border: 1px solid #ccc">' +
                    '<img style="width:100%" src="' + imgs[0] + '" alt="">' +
                    '</div>' +
                    '<div style=" width:64vw; float: left; overflow: hidden;">' +
                    '<p style="float:left">'+description+'</p>' +
                    '</div>' +
                    '</div>';
            } else {
                contentBox = computeContent(imgCount);
            }
            template = template + adTemplate + titleBox + contentBox + footerBox + "</div>";

            var containers = document.getElementsByClassName("ad-box");
            containers[0].innerHTML = template;
        }
        _this.params = {
            requestId: Date.now() + "" + _this.randomn(10),
            publishId: parseInt(initParamsData.publishId),                  // 渠道号
            requestTs: Date.now(),
            impression: [
                {
                    impressionId: "1",
                    placementId: initParamsData.placementId,           // 广告位id
                    placementType: 0,
                    templateId: parseInt(initParamsData.templateId),
                    bidfloor: parseInt(initParamsData.bidfloor),
                }
            ],
            device: {
                ua: navigator.userAgent,
            }
        };
    }
    Ad_yima.prototype.Ajax = {
        get: function (url, fn, onFail) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200 || xhr.status == 304) {
                        fn.call(this, xhr.responseText);
                    } else {
                        onFail.call(this);
                    }
                }

            };
            xhr.send();
        },
        post: function (url, data, fn, onFail) {
            var xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 304)) {
                    fn.call(this, xhr.responseText);
                } else {
                    onFail.call(this);
                }
            };
            xhr.send(JSON.stringify(data));
        }
    };
    Ad_yima.prototype.randomn = function (n) {
        if (n > 21) return null;
        return parseInt((Math.random() + 1) * Math.pow(10, n - 1));
    };
    Ad_yima.prototype.createInfo = function (fn) {
        var _this = this;
        var request_id = Date.now() + "" + _this.randomn(10);
        var bid_time = formateDate(date);
        var click_id = new Date().getSeconds() + "" + new Date().getMilliseconds() + _this.randomn(10);
        var infoData = bid[index];
        var info = new proto.Emarbox.Interface.Info();
        var creativeInfo = new proto.Emarbox.Interface.CreativeInfo();
        // var adslotInfo = new proto.Emarbox.Interface.CreativeInfo.AdslotInfo();
        info.setChannelId(infoData.channelId);    // int
        info.setRequestId(request_id);     // string
        info.setBidTime(bid_time);     // string
        info.setClickId(click_id);     // string
        creativeInfo.setProjectId(infoData.projectId); // int
        creativeInfo.setCampaignId(infoData.campaignId)
        creativeInfo.setCreativeId(infoData.creative.creativeId);
        creativeInfo.setDealId(infoData.dealId);
        creativeInfo.setFeeType(infoData.feeType);
        creativeInfo.setBidPrice(infoData.price);
        creativeInfo.setAdPrice(infoData.price)
        // creativeInfo.setAdslotInfo(adslotInfo);
        info.setCreativeInfo(creativeInfo);
        function Uint8ArrayToString(fileData) {
            var dataString = "";
            for (var i = 0; i < fileData.length; i++) {
                dataString += String.fromCharCode(fileData[i]);
            }
            return dataString
        }
        return Uint8ArrayToString(info.serializeBinary());
    };
    var Base64 = {
        _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
        // modified by wanghang  2019/5/29
        encode: function (e) {
            var t = "";
            var n, r, i, s, o, u, a, x, y, z;
            var f = 0;
            var newLength = Math.floor(e.length / 3) * 3 - 2;
            while (f < newLength) {
                n = e.charCodeAt(f++);
                r = e.charCodeAt(f++);
                i = e.charCodeAt(f++);
                s = n >> 2;
                o = ((n << 4) | (r >> 4)) & 63;
                u = ((r << 2) | (i >> 6)) & 63;
                a = i & 63;
                t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a)
            }

            var mode = e.length % 3;
            if (mode == 1) {
                n = e.charCodeAt(f++);
                x = (n & 252) >> 2;
                y = (n & 3) << 4;
                t += this._keyStr.charAt(x) + this._keyStr.charAt(y);
            } else if (mode == 2) {
                n = e.charCodeAt(f++);
                r = e.charCodeAt(f++);
                x = (n & 252) >> 2;
                y = ((n & 3) << 4) | ((r & 240) >> 4);
                z = ((r & 15) << 2)
                t += this._keyStr.charAt(x) + this._keyStr.charAt(y) + this._keyStr.charAt(z)
            }
            return t
        },
        decode: function (e) {
            var t = "";
            var n, r, i;
            var s, o, u, a;
            var f = 0;
            e = e.replace(/[^A-Za-z0-9+/=]/g, "");
            while (f < e.length) {
                s = this._keyStr.indexOf(e.charAt(f++));
                o = this._keyStr.indexOf(e.charAt(f++));
                u = this._keyStr.indexOf(e.charAt(f++));
                a = this._keyStr.indexOf(e.charAt(f++));
                n = s << 2 | o >> 4;
                r = (o & 15) << 4 | u >> 2;
                i = (u & 3) << 6 | a;
                t = t + String.fromCharCode(n);
                if (u != 64) {
                    t = t + String.fromCharCode(r)
                }
                if (a != 64) {
                    t = t + String.fromCharCode(i)
                }
            }
            t = Base64._utf8_decode(t);
            return t
        },
        _utf8_encode: function (e) {
            e = e.replace(/rn/g, "n");
            var t = "";
            for (var n = 0; n < e.length; n++) {
                var r = e.charCodeAt(n);
                if (r < 128) {
                    t += String.fromCharCode(r)
                } else if (r > 127 && r < 2048) {
                    t += String.fromCharCode(r >> 6 | 192);
                    t += String.fromCharCode(r & 63 | 128)
                } else {
                    t += String.fromCharCode(r >> 12 | 224);
                    t += String.fromCharCode(r >> 6 & 63 | 128);
                    t += String.fromCharCode(r & 63 | 128)
                }
            }
            return t
        },
        _utf8_decode: function (e) {
            var t = "";
            var n = 0;
            var r = c1 = c2 = 0;
            while (n < e.length) {
                r = e.charCodeAt(n);
                if (r < 128) {
                    t += String.fromCharCode(r);
                    n++
                } else if (r > 191 && r < 224) {
                    c2 = e.charCodeAt(n + 1);
                    t += String.fromCharCode((r & 31) << 6 | c2 & 63);
                    n += 2
                } else {
                    c2 = e.charCodeAt(n + 1);
                    c3 = e.charCodeAt(n + 2);
                    t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
                    n += 3
                }
            }
            return t
        }
    };



    new Ad_yima().init();

}();