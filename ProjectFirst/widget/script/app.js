var SERVERURL = "http://47.114.90.96/zhiboCms/api/";
var  SERVERURL = "http://192.168.16.100:8980/js/api/";
var IMAGEURL = "http://images.caiyaoren.ltd/";
 var productDetail=   SERVERURL+"productDetail";
var  homeData =   SERVERURL +"homeData";
var homeDataDetail=  SERVERURL+"homeDataDetail";
var  listBusiness =   SERVERURL +"listBusiness";
var listProduct =   SERVERURL +"listProduct";
var businessDetail =   SERVERURL +'businessDetail';
var  sendCode=    SERVERURL+"sendCode";
var saveYjfk=  SERVERURL+"saveYjfk";
var checkPhoneCode=  SERVERURL+"checkPhoneCode";
var  registerApi =   SERVERURL+"registerApi";
var sendPhoneCode=   SERVERURL+"sendPhoneCode";
var loginPost=  SERVERURL +"loginPost";
var listFklx=  SERVERURL+"listFklx";
var saveInfoData  =  SERVERURL+"saveInfoData";
var editPhoneData=  SERVERURL+"editPhoneData";
var delMyAddressDetail=   SERVERURL+"delMyAddressDetail";
var getSysConfig =  SERVERURL +"getSysConfig";
var collectProduct=   SERVERURL+"collectProduct";
var addGwc  =  SERVERURL+"addGwc";
var  submitOrder =   SERVERURL+"submitOrder";
var  orderDetails =   SERVERURL+"orderDetails";
var  listMyAddress=   SERVERURL+"listMyAddress";
var setDefalutAddress =  SERVERURL+"setDefalutAddress";
var  saveMyAddressDetail =   SERVERURL +"saveMyAddressDetail";
var listMyAddressDetail  =    SERVERURL  +"listMyAddressDetail";
var updateOrders=  SERVERURL +"updateOrders";
var collectBusiness=   SERVERURL+"collectBusiness";
var listBusinessCollect=  SERVERURL+"listBusinessCollect";
var listGwc=   SERVERURL+"listGwc";
var  updateGwcNums =   SERVERURL +"updateGwcNums";
var delGwcNums=   SERVERURL+"delGwcNums";
var checkGwcData=  SERVERURL +"checkGwcData";
var checkAllGwcData=   SERVERURL+"checkAllGwcData";
var submitGwcData =  SERVERURL+'submitGwcData';
var delSelectGwc=  SERVERURL+"delSelectGwc";
var getUserInfo=  SERVERURL+"getUserInfo"
var editPassword  =   SERVERURL+"editPassword";
var  listMyShouCang =   SERVERURL+"listMyShouCang";
var listFklx=   SERVERURL +"listFklx";
var getFileToken=   SERVERURL+'getFileToken';

 function  getHighRight(value,v){
  //
  if(v!= ""){
     value = value.replaceAll(v,"<font color='red'>" +  v + "</font>" )
     return value;
  }else {
     return value ;
  }
 }


function toThousands(num) {
    var num = (num || 0).toString(),
        re = /\d{3}$/,
        result = '';
    while (re.test(num)) {
        result = RegExp.lastMatch + result;
        if (num !== RegExp.lastMatch) {
            result = ',' + result;
            num = RegExp.leftContext;
        } else {
            num = '';
            break;
        }
    }
    if (num) {
        result = num + result;
    }
    return result;
}


function checkUpdate(fn) {
    var mam = api.require('mam');

    api.clearCache(function() {});
    if (mam != undefined) {
        mam.checkUpdate(function(ret, err) {

            var status = ret.status
            if (ret && status == "true") {
                var result = ret.result || "";
                if (result == "") {
                    return;
                }
                if (result.update == true & result.closed == false) {
                    var str = '新版本型号:' + result.version + ';更新提示语:' + result.updateTip + ';下载地址:' + result.source + ';发布时间:' + result.time;
                    api.confirm({
                        title: '有新的版本,是否下载并安装 ',
                        msg: str,
                        buttons: ['确定', '取消']
                    }, function(ret, err) {
                        if (ret.buttonIndex == 1) {
                            if (api.systemType == "android") {
                                api.download({
                                    url: result.source,
                                    report: true
                                }, function(ret, err) {
                                    if (ret && 0 == ret.state) { /* 下载进度 */
                                        api.toast({
                                            msg: "正在下载应用" + ret.percent + "%",
                                            duration: 2000
                                        });
                                    }
                                    if (ret && 1 == ret.state) { /* 下载完成 */
                                        var savePath = ret.savePath;
                                        api.installApp({
                                            appUri: savePath
                                        });
                                    }
                                });
                            }
                        }
                    });
                } else {
                    api.toast({
                        msg: '暂无更新'
                    });
                }
            } else {
                if (fn) {
                    fn()
                }
            }
        });
    }
}

String.prototype.startWith = function(str) {
    var reg = new RegExp("^" + str);
    return reg.test(this);
}

String.prototype.endWith = function(str) {
    var reg = new RegExp(str + "$");
    return reg.test(this);
}
var actionSheet = function(title, buttons, fun, destructiveTitle) {
    destructiveTitle = destructiveTitle || "";
    if (destructiveTitle == "") {
        api.actionSheet({
            title: title,
            cancelTitle: '取消',
            buttons: buttons
        }, function(ret, err) {
            fun(ret);
        });
    } else {
        api.actionSheet({
            title: title,
            cancelTitle: '取消',
            buttons: buttons,
            destructiveTitle: destructiveTitle
        }, function(ret, err) {
            fun(ret);
        });
    }
}
String.prototype.replaceAll = function(s1, s2) {
    return this.replace(new RegExp(s1, "gm"), s2);
}
var delArray = function(array, index) {
    var data = [];
    for (i = 0; i < array.length; i++) {
        console.log(array[i] + "  " + index)
        if (array[i] != index) {
            data.push(array[i]);
        }
    }

    return data;
}

function closeWin() {
    var name = api.winName;
    var source = api.pageParam.source;
    if (source == "root") {

    }

    api.closeWin({});
}

var apiDownLoad = function(url, funs) {
    api.download({
        url: url,

        report: true,
        cache: true,
        allowResume: true
    }, function(ret, err) {
        if (ret.state == 1) {
            //下载成功
            funs(ret);
        } else {

        }
    });
}
Date.prototype.Format = function(fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

/**
 *  网络数据请求
 * @param {Object} url  链接的服务器地址
 * @param {Object} type   传递的是 GET  OR POST
 * @param {Object} params   参数   JSON 参数   values:JSON 参数    files 表示你要上传的文件
 * @param {Object} successFun   成功的执行方法
 * @param {Object} errorFun  失败的执行方法
 */

var doAjax = function(url, type, params, successFun, errorFun, isfirst, setTime, showp) {
    var token = $api.getStorage("token");
    showp = showp || "";

    api.showProgress({
        style: 'default',
        animationType: 'fade',
        title: '努力加载中...',
        text: '努力加载中...',
        modal: true
    });

    var token = $api.getStorage("token") || "";

    if (params.values == null) {
        params.values = {

        }
    }

    var signature = api.require('signature');

    var times = new Date().getTime();
    var code = Math.random() * (9999 - 1000) + 1000;

    console.log(times + " " + code);
    var sign = signature.md5Sync({
        data: signature.md5Sync({
            data: times
        })
    }) + signature.md5Sync({
        data: signature.md5Sync({
            data: code
        })
    });

    console.log(sign);
    params.values.token = token;
    console.log(url + "  " + JSON.stringify(params));

    var isfirst = isfirst || "";

    var setTime = setTime || "";
    if (setTime == "") {
        setTime = 60;
    }


    var uuid = "";
    api.ajax({
        url: url,
        method: type,
        data: params,
        headers: {
            sign: sign,
            times: times,
            code: code
        },
        timeout: setTime
    }, function(ret, err) {
        //新增加数据
     // console.warn(JSON.stringify(ret))
        if (ret) {
          console.warn(JSON.stringify(ret))
            successFun(ret);
        } else {
          console.log("erro");
        }
        api.hideProgress();
    });
}


var doAjax2 = function(url, type, params, successFun, errorFun, isfirst, setTime, showp) {
        var token = $api.getStorage("token");
        showp = showp || "";
        // console.log(showp + "-----");

        var link = SERVERURL2 + "addLong"
        api.ajax({
            url: link,
            method: 'post',
            data: {
                values: {
                    token: token,
                    url: url
                }
            }
        }, function(ret, err) {
         });

        var signature = api.require('signature');

        var times = new Date().getTime();
        var code = Math.random() * (9999 - 1000) + 1000;

        // console.log(times + " " + code);
        var sign = signature.md5Sync({
            data: signature.md5Sync({
                data: times
            })
        }) + signature.md5Sync({
            data: signature.md5Sync({
                data: code
            })
        });

        // console.log(sign);

        //先mo

        if (showp == "") {
            // console.log(url + "----" + JSON.stringify(params));


        }
        // console.log(url + "  " + JSON.stringify(params));

        var isfirst = isfirst || "";


        var setTime = setTime || "";
        if (setTime == "") {
            setTime = 30;
        }



        var uuid = "";
        api.ajax({
            url: url,
            method: type,
            data: params,
            headers: {},
            timeout: setTime
        }, function(ret, err) {

            if (ret) {
                // console.log(JSON.stringify(ret));
                successFun(ret);
            } else {
                if (errorFun) {
                    errorFun(err);

                }
            }

            api.hideProgress();


        });
    }
    /**
     *dakai
     */
var openWindow = function(name, url, pageParam) {
    var curr = api.winName
    if (pageParam) {
        pageParam.source = curr;
    } else {
        pageParam = {};
        pageParam.source = curr;

    }
    api.openWin({
        name: name,
        url: url,
        pageParam: pageParam,
        delay: 200,
        slidBackEnabled: false,
        hScrollBarEnabled: false,
        reload: true

    });
}
var convertDate = function(data) {
    var date = new Date();
    data = data || "";

    if (data == "") {
        return "";
    }
    date.setTime(data);
    return date.Format("yyyy-MM-dd")
}
var converMMtDate = function(data) {
    var date = new Date();
    date.setTime(data);
    return date.Format("MM-dd")
}
var convertDateTime = function(data) {
    var date = new Date();
    date.setTime(data);
    return date.Format("hh:mm")
}
var convertFullDateTime = function(data) {
    var date = new Date();
    date.setTime(data);
    return date.Format("yyyy-MM-dd hh:mm:ss")
}

var convertFullDateTime33 = function(data) {
    var date = new Date();
    date.setTime(data);
    return date.Format("MM-dd hh:mm")
}
var convertFullDateTime2 = function(data) {
    var date = new Date();
    date.setTime(data);
    return date.Format("yyyy-MM-dd hh:mm")
}
var isImgFile = function(fileName) {
    if (fileName.toUpperCase().endWith("JPG") || fileName.toUpperCase().endWith("JPEG") || fileName.toUpperCase().endWith("PNG") || fileName.toUpperCase().endWith("BMP")) {
        return true;
    } else {
        return false;
    }
}
var dateDiff = function(hisTime, nowTime) {
        var now = nowTime ? nowTime : new Date().getTime(),
            diffValue = now - hisTime,
            result = '',
            minute = 1000 * 60,
            hour = minute * 60,
            day = hour * 24,
            halfamonth = day * 15,
            month = day * 30,
            year = month * 12,
            _year = diffValue / year,
            _month = diffValue / month,
            _week = diffValue / (7 * day),
            _day = diffValue / day,
            _hour = diffValue / hour,
            _min = diffValue / minute;

        var changeTime = new Date();
        changeTime.setTime(hisTime)

        //console.log(changeTime+"~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        //console.log(convertDate(changeTime))
        var changeday = changeTime.getDate();
        var changemonth = changeTime.getMonth() + 1;
        var changeyear = changeTime.getFullYear();
        var changeHours = changeTime.getHours();
        //console.log("11" + hisTime + " "   + changeHours)
        var changeMinutes = changeTime.getMinutes();

        if (changeHours < 10) {
            changeHours = "0" + changeHours;
        }
        if (changeMinutes < 10) {
            changeMinutes = "0" + changeMinutes;
        }

        //console.log(_day+"***************************");

        //	if (_year >= 1)
        //		result = parseInt(_year) + "年前";
        //	else if (_month >= 1)
        //		result = parseInt(_month) + "个月前";
        //	else if (_week >= 1)
        //		result = parseInt(_week) + "周前";
        //	 alert(changeHours)
        if (_year >= 1)
            result = changeyear + "-" + changemonth + "-" + changeday;
        else if (_day >= 2)
            result = changemonth + "-" + changeday;
        else if (_day >= 1)
            result = "昨天" + changeHours + ":" + changeMinutes;
        else if (_hour >= 1)
            result = parseInt(_hour) + "个小时前";
        else if (_min >= 1)
            result = parseInt(_min) + "分钟前";
        else
            result = "刚刚";
        return result;
    }
    //初始化 融云
function initRongYun() {}

//退出 融云

function exitRong(fun) {}


function openDataBase(type) {}

/**
 *add  2016   07 01
 */


function isFirst(funs) {
    var isFirst = $api.getStorage("isFirstN") || "";
    console.log("isFirst" + isFirst)
    var db = api.require('db');
    if (isFirst == "") {
        //首次加载创建数据库
        db.openDatabase({
            name: 'msg'
        }, function(ret, err) {
            if (ret.status) {

                var sql = "CREATE TABLE if not exists  msg(userId varchar(255),  createtime varchar(255),roomid varchar(255), contents varchar(255) ,isread varchar(1) ,messageType varchar(255) )";
                console.warn(sql);
                //更新SQL
                upDataSql(sql, function() {
                    console.log("执行sql ");
                    funs();
                });

            } else {
                api.toast({
                    msg: '系统初始化失败'
                });
            }
        });
    } else {
        db.openDatabase({
            name: 'msg'
        }, function(ret, err) {
            funs();
        });
    }

    $api.setStorage("isFirstN", "isFirst");

}

function upDataSql(sql, fun) {
    //  console.log(sql)
    var db = api.require('db');
    db.executeSql({
        name: 'msg',
        sql: sql
    }, function(ret, err) {
        if (ret.status) {
            fun(ret.status);
        } else {
            console.log(JSON.stringify(err.msg));
        }
    });
}

function readSQL(sql, fun) {
    var db = api.require('db');
    db.selectSql({
        name: 'msg',
        sql: sql
    }, function(ret, err) {
        if (ret.status) {

            var data = ret.data;
            fun(data);
        } else {
            //  console.log(JSON.stringify(err));
            api.alert({
                "title": "提示",
                "msg": "数据查询失败"
            }, function(ret, err) {});
        }
    });
}

function shareWx(title, scene, url) {
    var wx = api.require('wx');
    wx.isInstalled(function(ret, err) {
        if (ret.installed) {
            wx.shareWebpage({
                apiKey: '',
                scene: scene,
                title: title,
                description: title,
                thumb: 'widget://res/logo.png',
                contentUrl: url
            }, function(ret, err) {
                if (ret.status) {
                    api.toast({
                        msg: '分享成功'
                    });

                        api.sendEvent({
                            name: 'share2',
                            extra: {
                                key1: 'value1',
                                key2: 'value2'
                            }
                        });



                      var parame = {
                        values:{
                          token :  $api.getStorage('token')
                        }
                      }


                } else {

                }
            });
        } else {
            api.alert({
                msg: "当前设备未安装微信客户端"
            }, function(ret, err) {

            });
        }
    });
}

function readSQL(sql, fun) {
    var db = api.require('db');
    db.selectSql({
        name: 'msg',
        sql: sql
    }, function(ret, err) {
        if (ret.status) {

            //console.log("查询表返回数据"+JSON.stringify(ret));
            var data = ret.data;
            fun(data);
        } else {
            console.log(JSON.stringify(err));
            //			api.alert({
            //				"title" : "提示",
            //				"msg" : "数据查询失败"
            //			}, function(ret, err) {
            //			});
        }
    });
}

//执行SQL
function upDataSql(sql, fun) {
    // console.log(sql)
    var db = api.require('db');
    db.executeSql({
        name: 'msg',
        sql: sql
    }, function(ret, err) {
        if (ret.status) {
            fun(ret.status);
        } else {
            console.log(JSON.stringify(err.msg));
        }
    });
}


//执行SQL
function delectSql(sql, fun) {
    console.log(sql)
    var db = api.require('db');
    db.executeSql({
        name: 'msg',
        sql: sql
    }, function(ret, err) {
        if (ret.status) {
            fun(ret.status);
        } else {
            console.log(JSON.stringify(err.msg));
        }
    });
}

//获取摄像头数据

var getPicture = function(parame, funs) {
        api.getPicture({
            sourceType: parame.sourceType,
            encodingType: 'jpg',
            mediaValue: 'pic',
            destinationType: 'url',
            allowEdit: true,
            quality: 100,
            saveToPhotoAlbum: false
        }, function(ret, err) {
            if (ret) {
                funs(ret);
            } else {}
        });
    }


    var getPicture2 = function(parame, funs) {
            api.getPicture({
                  mediaValue: 'video',
                destinationType: 'url',
                allowEdit: true,
                quality: 100,
                saveToPhotoAlbum: false
            }, function(ret, err) {
                if (ret) {
                    funs(ret);
                } else {}
            });
        }
    /**
     *ibm  监听事件
     * @param {Object} name
     * @param {Object} funs
     */
function ibmAddEventListener(name, funs) {
    api.addEventListener({
        name: name
    }, function(ret, err) {
        funs(ret);
    });
}

//stanko  验证框架
function reflush(fun) {
    api.setRefreshHeaderInfo({
        visible: true,
        loadingImg: 'widget://image/refresh.png',
        bgColor: '##f2f2f2',
        textColor: '#000',
        textDown: '下拉刷新...',
        textUp: '松开刷新...',
        showTime: false
    }, function(ret, err) {
        fun();
        api.refreshHeaderLoadDone();

    });
}

/**
 * 0            //下载中
 1            //下载完成
 2            //下载失败
 * @param {Object} parame
 * @param {Object} funs
 */
var ApidownLoad = function(parame, funs) {
    api.showProgress({
        title: '开始下载...',
        modal: true
    });

    api.download({
        url: parame.url,
        savePath: parame.savePath,
        report: true,
        cache: true,
        allowResume: true
    }, function(ret, err) {
        if (ret.state == 1) {
            api.hideProgress();
            funs(ret)
        }
    });
}

function setRefreshHeaderInfo(funs) {
    api.setRefreshHeaderInfo({
        visible: true,
        loadingImg: 'widget://image/refresh.png',
        bgColor: '#ccc',
        textColor: '#fff',
        textDown: '下拉刷新...',
        textUp: '松开刷新...',
        showTime: true
    }, function(ret, err) {
        funs();
        api.refreshHeaderLoadDone();
    });
}

function checkLogin(succ, err) {
    var token = $api.getStorage("token") || "";
    if (token == "") {
        err(token);
    } else {
        succ(token);
    }
}

function getImgage(v) {
    if (v) {
        if (v.indexOf("http") >= 0) {
            return v;
        } else {
            return FileUrl + v
        }
    } else {
        return "../image/tx2.png";
    }
}


function getImgage2(v) {
    if (v) {
        if (v.indexOf("http") >= 0) {
            return v;
        } else {
            return FileUrl + v
        }
    } else {
        return "../../image/tx2.png";
    }
}

function openDataLoaction(type, title, funs) {
    api.openPicker({
        type: type,
        title: title
    }, function(ret, err) {
        funs(ret)
    });
}

//转换状态
var convertStatus = function(v) {
        if (v == "1") {
            return "未认证!";
        } else if (v == "2") {
            return "已实名";
        } else if (v == "3") {
            return "正在审核!"
        }
    }
    //记闻项目的公用接口判断是否认证通过(改为后端判断接口保留：)
function isPass(yesss) {
    var parame = {
        values: {}
    }
    doAjax(GETINFO, "POST", parame, function(data) {

        console.log("公共接口判断是否通过" + JSON.stringify(data));

        var flag = data.flag || "";
        if (flag == "true") {
            var data = data.data;
            if (data.status == 2) {
                yesss(true);
            } else {
                yesss(false);
            }
        }

    }, function(data) {

    });

}

//认证弹窗
function goAuthentication(type, data, fun) {

    //type：1：文章。2：图文。3：视频
    //data:保存为草稿的数据JSON对象
    //后端判断把这段代码加上
    api.confirm({
        msg: '认证后才能发布报道',
        buttons: ['去认证', '残忍拒绝']
    }, function(ret, err) {
        var index = ret.buttonIndex;
        console.log("点击 的是：" + ret.buttonIndex);
        if (index == 1) {
            //先保存草稿
            if (type == 1) {
                //保存文字
                console.log("接到的保存文字数据。。。。。" + JSON.stringify(data));

                var parame = {
                    values: {
                        title: data.getTitlee,
                        content: data.getCommonn,
                        type: 'text'
                    }
                }

                doAjax(ReportCache, "POST", parame, function(data) {
                    console.log("保存文章草稿是否成功返回！！！！！" + JSON.stringify(data));

                    //跳转认证页面：去认证
                    if (fun) {
                        fun()
                    }

                }, function(data) {});

            } else if (type == 2) {
                //保存图文
                console.log("接到的图片文字数据。。。。。" + JSON.stringify(data));

                if (data.tpyeee == "text") {

                    var parame = {
                        values: {
                            title: data.getTitlee,
                            content: data.getCommonn,
                            type: 'text'
                        }
                    }

                    doAjax(ReportCache, "POST", parame, function(data) {
                        console.log("保存文章草稿是否成功返回！！！！！" + JSON.stringify(data));
                        //跳转认证页面：去认证
                        if (fun) {
                            fun()
                        }
                    }, function(data) {});

                }
                if (data.tpyeee == "img") {
                    downloadddding();

                    var parame = { //ajax数据
                        values: {
                            title: data.title,
                            content: data.content,
                            type: 'img',
                            imgs: data.filesImg.join(",")
                        }
                    };

                    doAjax(PUSHREPORTIMGSCACHE2, "POST", parame, function(dataa) {
                        closeDownloadddding();
                        console.log("保存图文草稿是否成功返回！！！！！" + JSON.stringify(dataa));
                        //跳转认证页面：去认证
                        if (fun) {
                            fun()
                        }

                    }, function(data) {}, "1", "300");

                    //					var parame = {//ajax数据
                    //						values : {
                    //							title : data.title,
                    //							content : data.content,
                    //							type : 'img'
                    //						},
                    //						files : {
                    //							imgs : data.filesImg
                    //						},
                    //					};
                    //
                    //
                    //					doAjax(PUSHREPORTIMGSCACHE, "POST", parame, function(data) {
                    //					closeDownloadddding();
                    //						console.log("保存图文草稿是否成功返回！！！！！" + JSON.stringify(data));
                    //
                    //						//跳转认证页面：去认证
                    //						if (fun) {
                    //							fun()
                    //						}
                    //
                    //					}, function(data) {
                    //					},'1','300');
                }

            } else if (type == 3) {
                //保存视频
                console.log("接到的保存视频数据。。。。。" + JSON.stringify(data));

                var parame = {
                    values: {
                        title: data.getTitlee,
                        content: data.getCommonn,
                        img: data.img,
                        video: data.video,
                        type: 'video'
                    }
                }

                doAjax(ReportCache, "POST", parame, function(data) {
                    console.log("保存视频草稿返回！！！！！" + JSON.stringify(data));
                    //跳转认证页面：去认证
                    if (fun) {
                        fun()
                    }

                }, function(data) {});

            }
            //跳转认证页面：去认证
            //openWindow("authentication_method_win", "../my/authentication_method_win.html", {})

        }
    });
}

//保存到草稿
function toSaveDraft(type, data) {
    //type：1：文章。2：图文。3：视频
    //data:保存为草稿的数据JSON对象

    console.log("接到保存草稿数据！！！" + JSON.stringify(data));

    api.confirm({
        msg: '是否保存为草稿',
        buttons: ['是', '否']
    }, function(ret, err) {
        var index = ret.buttonIndex;
        console.log("点击 的是：" + ret.buttonIndex);
        if (index == 1) {
            //先保存草稿
            if (type == 1) {
                //保存文字
                console.log("接到的保存文字数据。。。。。" + JSON.stringify(data));

                if (data.cGrowid) {
                    var parame = {
                        values: {
                            title: data.title,
                            content: data.content,
                            rowid: data.cGrowid,
                            type: 'text'
                        }
                    }

                } else {
                    var parame = {
                        values: {
                            title: data.title,
                            content: data.content,
                            type: 'text'
                        }
                    }
                }

                doAjax(ReportCache, "POST", parame, function(dataa) {
                    console.log("保存文章草稿是否成功返回！！！！！" + JSON.stringify(dataa));
                    var flag = dataa.flag || "";
                    if (flag == "true") {

                        if (data.again) {

                            var jsfun = 'initData();';
                            api.execScript({
                                name: 'draft_win',
                                frameName: 'draft_frm',
                                script: jsfun
                            });

                            setTimeout(api.closeWin(), 300);

                        } else {

                            //保存成功之后关闭win
                            api.closeToWin({
                                name: 'root'
                            });

                        }

                    } else {

                        api.toast({
                            msg: dataa.msg,
                            location: "middle"
                        });

                    }

                }, function(data) {});

            } else if (type == 2) {
                //保存图文
                //保存图文
                console.log("接到的图片文字数据。。。。。" + JSON.stringify(data));

                if (data.tpyeee == "text") {

                    if (data.cGrowid) {
                        var parame = {
                            values: {
                                title: data.getTitlee,
                                content: data.getCommonn,
                                rowid: data.cGrowid,
                                type: 'text'
                            }
                        }

                    } else {

                        var parame = {
                            values: {
                                title: data.getTitlee,
                                content: data.getCommonn,
                                type: 'text'
                            }
                        }
                    }

                    doAjax(ReportCache, "POST", parame, function(dataa) {
                        console.log("保存文章草稿是否成功返回！！！！！" + JSON.stringify(data));
                        var flag = dataa.flag || "";
                        if (flag == "true") {

                            if (data.again) {

                                var jsfun = 'initData();';
                                api.execScript({
                                    name: 'draft_win',
                                    frameName: 'draft_frm',
                                    script: jsfun
                                });

                                setTimeout(api.closeWin(), 300);

                            } else {

                                //保存成功之后关闭win
                                api.closeToWin({
                                    name: 'root'
                                });

                            }

                        } else {

                            api.toast({
                                msg: dataa.msg,
                                location: "middle"
                            });

                        }

                    }, function(data) {});

                }
                if (data.tpyeee == "img") {

                    downloadddding();

                    if (data.cGrowid) {
                        var parame = { //ajax数据
                            values: {
                                title: data.title,
                                content: data.content,
                                type: 'img',
                                rowid: data.cGrowid,
                                imgs: data.filesImg.join(",")
                            }
                        };
                    } else {

                        var parame = { //ajax数据
                            values: {
                                title: data.title,
                                content: data.content,
                                type: 'img',
                                imgs: data.filesImg.join(",")
                            }
                        };
                    }

                    doAjax(PUSHREPORTIMGSCACHE2, "POST", parame, function(dataa) {
                        closeDownloadddding();
                        console.log("保存图文草稿是否成功返回！！！！！" + JSON.stringify(dataa));
                        var flag = dataa.flag || "";
                        if (flag == "true") {

                            if (data.again) {

                                var jsfun = 'initData();';
                                api.execScript({
                                    name: 'draft_win',
                                    frameName: 'draft_frm',
                                    script: jsfun
                                });

                                setTimeout(api.closeWin(), 300);

                            } else {

                                //保存成功之后关闭win
                                api.closeToWin({
                                    name: 'root'
                                });

                            }

                        } else {

                            api.toast({
                                msg: dataa.msg,
                                location: "middle"
                            });

                        }

                    }, function(data) {}, "1", "300");
                }

            } else if (type == 3) {
                //保存视频
                console.log("接到的保存视频数据。。。。。" + JSON.stringify(data));

                if (data.cGrowid) {
                    var parame = {
                        values: {
                            title: data.title,
                            content: data.content,
                            img: data.img,
                            video: data.video,
                            type: 'video',
                            rowid: data.cGrowid
                        }
                    }

                } else {

                    var parame = {
                        values: {
                            title: data.title,
                            content: data.content,
                            img: data.img,
                            video: data.video,
                            type: 'video'
                        }
                    }

                }

                doAjax(ReportCache, "POST", parame, function(dataa) {
                    console.log("保存视频草稿返回！！！！！" + JSON.stringify(dataa));
                    var flag = dataa.flag || "";
                    if (flag == "true") {

                        if (data.again) {

                            var jsfun = 'initData();';
                            api.execScript({
                                name: 'draft_win',
                                frameName: 'draft_frm',
                                script: jsfun
                            });

                            setTimeout(api.closeWin(), 300);

                        } else {

                            //保存成功之后关闭win
                            api.closeToWin({
                                name: 'root'
                            });

                        }

                    } else {

                        api.toast({
                            msg: dataa.msg,
                            location: "middle"
                        });

                    }

                }, function(data) {});

            }

        } else if (index == 2) {

            if (data.again) {

                api.closeWin();

            } else {

                api.closeToWin({
                    name: 'root'
                });

            }
        }
    });
}

function ChangeContent(data) {
    data = data.replaceAll("<div>", "").replaceAll("</div>", "");
    $api.html($api.byId("hidden"), data);
    var list = $api.domAll($api.byId("hidden"), "p");
    //console.log(list.length + "  ----"  +"  ")
    if (list != null && list.length > 0) {
        console.log(list.length)
        if (list.length >= 2) {
            list.length = 2
        }
        var html = "";
        for (var i = 0; i < list.length; i++) {
            html = html + $api.html(list[i])
        }

        return html;
    }
    $api.html($api.byId("hidden"), "");
    return data;
}



function convertImg2(el) {


    console.log(el + "////////////////////");
    console.log("////////////////////" + el + "?v=" + new Date());
    if (el) {
        console.warn(el)
        return el + "?v2=" + new Date();
    } else {
        return "../../image/new1_03.png";
    }
}



function uploadQiNiuFile(obj, parame, fun) {
    obj.upfile(parame, function(ret, err) {
        console.log(JSON.stringify(ret))
        if (ret.status) {
            if (ret.oper == "complete") {
                fun(ret.info.key)

            } else if (ret.oper == "progress") {

            }
        }
    });
}

function uuid() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}

/**
添加 前段排序算法
**/

var apiCompare = function(prop) {
    return function(obj1, obj2) {
        var val1 = obj1[prop];
        var val2 = obj2[prop];
        if (val1 < val2) {
            return 1;
        } else if (val1 > val2) {
            return -1;
        } else {
            return 0;
        }
    }
}

var apiCompare2 = function(prop) {
    return function(obj1, obj2) {
        var val1 = obj1[prop];
        var val2 = obj2[prop];
        if (val1 > val2) {
            return 1;
        } else if (val1 < val2) {
            return -1;
        } else {
            return 0;
        }
    }
}

function toast(text) {
  api.toast({
      msg: text,
      duration: 2000,
      location: 'middle'
  });

}

function getRzLx(v) {
    if (v == "1") {
        return "股权融资";
    } else if (v == "2") {
        return "整体转让";
    } else if (v == "3") {
        return "抵押";
    } else {
        return "";
    }
}

function   tarastData(v){
  for(var  i =  0;i< 50;i++)
  {
    v  =    v.replaceAll(" ","<br>").replaceAll("<br><br>","<br>").replaceAll("\\n","<br>")

  }
  if(v.indexOf("<br>") ==0){
    v  = v.substr(4,v.length);
  }
  v  ="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+ v.replaceAll("<br>","<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")
return v
}
function getEndTime(v){
  if(v == "23:59"){
    v = "24:00";
  }
  return v
}

function  convertSex(v){
  if(v =="2"){
    return "女";
  }else {
    return "男";
  }
}
