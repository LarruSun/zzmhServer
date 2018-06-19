var express=require('express');
var app=express();
var fs = require('fs');


var bodyParser = require('body-parser');//post数据解析插件
app.use(bodyParser.urlencoded({}));

var reqO = require("request");//引入向第三方发送请求的插件  先得npm i request安装


var styleData=[]
//解决跨域的问题
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});





//首页排行榜
app.use('/slp/home/rankings',(req,res)=>{
    var page='';
    var pagenum='';
    var type='';
    //判断请求方式解析参数
    if(req.method=='GET'){
        page=req.query.page;
        pagenum=req.query.pagenum;       
        type=req.query.type;       
    }else if(req.method=='POST'){
        page=req.body.page;
        pagenum=req.body.pagenum;
        type=req.body.type;
    };
    var rankType={
        'RDB':'read_times',
        'CXB':'depleterecord',
        'XZB':'created_at',
        'WJB':'finished'
    };
    type=rankType[type];
    //发起请求
    var api=`http://mgadmin.aizhuizhui.com/index.php?s=/Api/Ranking/get_all&thirdsession=2fvrU94nDoC7MFGStePK80JwIEc3iuBX&type=${type}&page=${page}&pagenum=${pagenum}`;
    reqO(api,(err,resp,body)=>{
        if(err){
            console.log(err);
            return;
        }
        res.send(JSON.parse(resp.body))
    })
    
});

//首页推荐
app.use('/slp/home/recommend',(req,res)=>{
    var api=`http://api.zhuizhuiyoyo.com/request.php?method=homepagev2&timestamp=1528088904359&param=%7B%22v%22%3A1%2C%22sex%22%3A%221%22%7D&sig=61f1dc6ef7924570b1e59afa7f650610`;
    reqO(api,(err,resq,body)=>{
        if(err){
            console.log(err);
            return;
        }
        res.send(JSON.parse(resq.body));
    })
});

//首页国漫
app.use('/slp/home/caricature',(req,res)=>{
    var type='';
    //判断请求方式解析参数
    if(req.method=='GET'){
        type=req.query.type;       
    }else if(req.method=='POST'){
        type=req.body.type;
    };

    var obj={
        'ALL':{timestamp:1528089296560,filter:'%22%3A0%7D',sig:'df20ead535eb55b6b16bebaea6c11985'},
        'HOT':{timestamp:1528089831956,filter:'%22%3A3%7D',sig:'4ddf22c4edc6c8d1847877bccd079e2d'},
        'YWJ':{timestamp:1528089892963,filter:'%22%3A1%7D',sig:'87828640b7d0fe930dd9d1764e26fd95'},
        'LZZ':{timestamp:1528090039530,filter:'%22%3A2%7D',sig:'b5f1ae374b9bd8792f0f82d3026ee3e7'},
    }
    var timestamp=obj[type].timestamp;
    var filter=obj[type].filter;
    var sig=obj[type].sig;
    var api=`http://api.zhuizhuiyoyo.com/request.php?method=theme%2Finfo&timestamp=${timestamp}&param=%7B%22v%22%3A1%2C%22t%22%3A0%2C%22id%22%3A%2244%22%2C%22page%22%3A1%2C%22count%22%3A18%2C%22filter${filter}&sig=${sig}`;
    reqO(api,(err,resq,body)=>{
        if(err){
            console.log(err);
            return;
        }
        res.send(JSON.parse(resq.body));
    })
    
});

//首页日漫
app.use('/slp/home/JPcaricature',(req,res)=>{
    var type='';
    //判断请求方式解析参数
    if(req.method=='GET'){
        type=req.query.type;       
    }else if(req.method=='POST'){
        type=req.body.type;
    };

    var obj={
        'ALL':{timestamp:1528090941503,filter:'%22%3A0%7D',sig:'12c1ea686a4a308058b60e8bcb2f10c8'},
        'HOT':{timestamp:1528092456535,filter:'%22%3A3%7D',sig:'3fb0c04df764ce7faae63356bd8dc871'},
        'YWJ':{timestamp:1528092570866,filter:'%22%3A1%7D',sig:'f0641cb4dbc91d23379b677fc219e911'},
        'LZZ':{timestamp:1528092689967,filter:'%22%3A2%7D',sig:'b7db1f3fc63a1301963f782d9fd90a6a'},
    }
    var timestamp=obj[type].timestamp;
    var filter=obj[type].filter;
    var sig=obj[type].sig;
    
    var api=`http://api.zhuizhuiyoyo.com/request.php?method=theme%2Finfo&timestamp=${timestamp}&param=%7B%22v%22%3A1%2C%22t%22%3A0%2C%22id%22%3A%2245%22%2C%22page%22%3A1%2C%22count%22%3A18%2C%22filter${filter}&sig=${sig}`;
    reqO(api,(err,resq,body)=>{
        if(err){
            console.log(err);
            return;
        }
        res.send(JSON.parse(resq.body));
    })
    
});

//发现-大家在推
app.use('/slp/find/djzt',(req,res)=>{
    var page='';
    var page_datas='';

    //判断请求方式解析参数
    if(req.method=='GET'){
        page=req.query.page;       
        page_datas=req.query.page_datas;       
    }else if(req.method=='POST'){
        page=req.body.page;
        page_datas=req.body.page_datas;
    };

    var api=`http://mgadmin.aizhuizhui.com/index.php?s=/Api/Discover/recommend_list&thirdsession=2fvrU94nDoC7MFGStePK80JwIEc3iuBX&page=${page}&page_datas=${page_datas}`;
    reqO(api,(err,resq,body)=>{
        if(err){
            console.log(err);
            return;
        }
        res.send(JSON.parse(resq.body));
    })

});

//发现-游戏
app.use('/slp/find/game',(req,res)=>{
    var api=`http://api.zhuizhuiyoyo.com/request.php?method=page%2Fgame&timestamp=1528092983842&param=%7B%22page%22%3A1%2C%22count%22%3A1000%7D&sig=f06752c95c6e74bd6884d771e4beaf02`;
    reqO(api,(err,resq,body)=>{
        if(err){
            console.log(err);
            return;
        };
        res.send(JSON.parse(resq.body))
    })


});

//发现-更新
app.use('/slp/find/updata',(req,res)=>{
    var week='';
    //判断请求方式解析参数
    if(req.method=='GET'){
        week=req.query.week;       
    }else if(req.method=='POST'){
        week=req.body.week;
    };
    var obj=[
        {'timestamp':'',date:'',sig:''},//0
        {'timestamp':'',date:'',sig:''},//1
        {'timestamp':1528099064632,date:'%22%3A6%7D',sig:'310bc7a319814bad1905225b30467825'},//2
        {'timestamp':1528099208162,date:'%22%3A5%7D',sig:'9767331cf94ea35e270e0dca41404e76'},//3
        {'timestamp':1528105271703,date:'%22%3A4%7D',sig:'3596fe4fc2a37a0231ae259145b88209'},//4
        {'timestamp':1528105345308,date:'%22%3A3%7D',sig:'3df813f54de253530f42f575944c05b1'},//5
        {'timestamp':1528105464733,date:'%22%3A2%7D',sig:'02622761b2d178cbb930710abe4858a8'},//6
    ]
    var timestamp=obj[week].timestamp;
    var date=obj[week].date;
    var sig=obj[week].sig;

    var api=`http://api.zhuizhuiyoyo.com/request.php?method=theme%2Finfov1&timestamp=${timestamp}&param=%7B%22v%22%3A1%2C%22t%22%3A0%2C%22id%22%3A%2239%22%2C%22page%22%3A1%2C%22count%22%3A18%2C%22filter%22%3A0%2C%22date${date}&sig=${sig}`
    reqO(api,(err,resq,body)=>{
        if(err){
            console.log(err);
            return;
        }
        res.send(JSON.parse(resq.body));
    })
})

//登录
app.use('/slp/login',(req,res)=>{
    var id='';
    var pass='';
    //判断请求方式解析参数
    if(req.method=='GET'){
        id=req.query.id;       
        pass=req.query.pass;       
    }else if(req.method=='POST'){
        id=req.body.id;
        pass=req.body.pass;
    };
   
    fs.readFile('./userId.txt','utf-8',(err,data)=>{
        if(err){
            console.log(err);
            return;
        }
        var loginData=eval('('+data+')');
          
        for(item of loginData){
            if(item.id==id && item.pass==pass){
                res.send({type:'success',message:'登录成功'});
                return;
            }
        }

        res.send({type:'fail',message:'账号或密码错误'});


       
    })

})

//注册
app.use('/slp/register',(req,res)=>{
    var id='';
    var pass='';
    //判断请求方式解析参数
    if(req.method=='GET'){
        id=req.query.id;       
        pass=req.query.pass;       
    }else if(req.method=='POST'){
        id=req.body.id;
        pass=req.body.pass;
    };
    fs.readFile('./userId.txt','utf-8',(err,data)=>{
        if(err){
            console.log(err);
            return;
        }
        var loginData=eval('('+data+')');
        for(item of loginData){
            if(item.id==id){
                res.send({type:'fail',message:'该账户已经注册'});
                return;
            }
        };
        var obj={};
        obj.id=id;
        obj.pass=pass;
        loginData.push(obj);

        fs.writeFile('./userId.txt',JSON.stringify(loginData),(err)=>{
            if(err){
                console.log(err);
                res.send({type:'fail',message:'系统错误，请重试'});
                return;
            };
            res.send({type:'success',message:'恭喜，注册成功'})
        })

        

    })
})


app.use('/slp/setData',(req,res)=>{


    //判断请求方式解析参数
    if(req.method=='GET'){
        styleData=req.query.styleData;       
     
    }else if(req.method=='POST'){
        styleData=req.body.styleData;
    };
    // console.log(styleData);
    res.send({type:'成功'});
})


app.use('/slp/getData',(req,res)=>{
    // var  obj=[
    //     {name:'ScrollAd',text:'轮播图模块',style:'color:red;backgeound:#ccc'},
    //     {name:'List',text:'商品列表模块',style:'color:#ccc'},
    //     {name:'List1',text:'商品列表模块1',style:'color:red'},
    //     {name:'List2',text:'商品列表模块2',style:'color:red'},
    //     {name:'List3',text:'商品列表模块3',style:'color:red'},
    //     {name:'List4',text:'商品列表模块4',style:'color:red'},
    //     {name:'List5',text:'商品列表模块5',style:'color:red'},
    //   ];

      res.send(styleData);
})







app.listen(2018,()=>{
    console.log('监听端口号2018');
    console.log('首页排行API:http://localhost:2018/slp/home/rankings');
    console.log('首页推荐API:http://localhost:2018/slp/home/recommend');
    console.log('首页国漫API:http://localhost:2018/slp/home/caricature');
    console.log('首页日漫API:http://localhost:2018/slp/home/JPcaricature');
    console.log('发现-大家在推API:http://localhost:2018/slp/find/djzt');
    console.log('发现-游戏API:http://localhost:2018/slp/find/game');
    console.log('发现-更新API:http://localhost:2018/slp/find/updata');
    console.log('登录API:http://localhost:2018/slp/login');
    console.log('注册API:http://localhost:2018/slp/register');
    console.log('小程序测试API:http://localhost:2018/slp/getData');
});
