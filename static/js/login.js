var baseUri ='http://admin.fsfhr.com/api/fsfa';

$(document).ready(function() {



    // window.onload = addWatermark;
    // 检查token


    const isLogin = localStorage.getItem('isLogin');



    console.log(isLogin)
    if('yes'===isLogin)window.location.href =window.location.href.replace('/sign_in.html',"").replace('#',"")+ '/index.html'


    var x = localStorage.getItem("token");
    if (x==''||x==null){
        console.log('x 为null 需要重新请求')

        $.ajax({
            url: baseUri+'/login/getToken', // 替换为你的服务器端点
            type: 'POST', // 请求类型
            dataType: 'json', // 预期服务器返回的数据类型
            success: function(response) {
                // 请求成功时执行的回调函数
                console.log('请求成功:', response);
                // 在这里处理服务器返回的数据
                if (response && response.code === 0 ) {
                    // 如果数据有效，则提取token
                    var token = response.data.token;
                    console.log('Token:', token); // 在控制台打印token
                    // 在这里你可以使用token进行其他操作，比如更新DOM、发起其他请求等。
                    localStorage.setItem('token',token);
                    getCode();

                } else {
                    // 处理无效数据的情况
                    console.error('请求未成功或数据格式不正确:', response);
                }

            },
            error: function(jqXHR, textStatus, errorThrown) {
                // 请求失败时执行的回调函数
                console.error('请求失败:', textStatus, errorThrown);
                // 在这里处理请求失败的情况
            }
        });


    }else{
        getCode();

    }


    console.log('页面加载完成，可以开始执行初始化设置了！');


    // 例如，为某个按钮绑定点击事件
    $('#captcha').click(function() {
        getCode();
    });

    $('#loginButton').click(function() {
        login();
    });
    addWatermark();



    document.addEventListener('keypress', function(event) {
        // event.keyCode 在现代浏览器中已被弃用，推荐使用 event.key
        if (event.key === 'Enter') {
            login();
        }
    });

    // 或者隐藏某个元素
    $('#myElement').hide();

    // 以及其他初始化操作...
});



function getCode(){
    $.ajax({
        url: baseUri+'/login/getVerifyCode', // 后端处理验证码的URL
        type: 'post', // 使用GET请求，因为通常不需要发送数据到服务器
        dataType: 'json', // 预期服务器返回JSON格式的数据
        headers:{
            'Token': localStorage.getItem('token'), // 设置自定义请求头
            'Content-Type': 'application/json; charset=utf-8' // 设置内容类型为 JSON
        },
        success: function(response) {
            // 请求成功，处理返回的验证码
            if (response && response.code === 0) {
                // 假设服务器返回的JSON数据结构为 { success: true, captcha: '1234' }
                var captcha = response.data.verifyCode;
                sessionStorage.setItem('code',captcha);
                // 显示验证码
                $('#captcha').html('验证码：' + captcha);
            } else {
                // 处理获取验证码失败的情况
                console.error('获取验证码失败:', response);

                if (response && (response.code === 2|| response.message =='token失效')){
                    getTokenForVoid();
                }



            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // 处理请求失败的情况
            console.error('请求失败:', textStatus, errorThrown);
        }
    });


}



function getTokenForVoid(){
    $.ajax({
        url: baseUri+'/login/getToken', // 替换为你的服务器端点
        type: 'POST', // 请求类型
        dataType: 'json', // 预期服务器返回的数据类型
        success: function(response) {
            // 请求成功时执行的回调函数
            console.log('请求成功:', response);
            // 在这里处理服务器返回的数据
            if (response && response.code === 0 ) {
                // 如果数据有效，则提取token
                var token = response.data.token;
                console.log('Token:', token); // 在控制台打印token
                // 在这里你可以使用token进行其他操作，比如更新DOM、发起其他请求等。
                localStorage.setItem('token',token)
            } else {
                // 处理无效数据的情况
                console.error('请求未成功或数据格式不正确:', response);
            }

        },
        error: function(jqXHR, textStatus, errorThrown) {
            // 请求失败时执行的回调函数
            console.error('请求失败:', textStatus, errorThrown);
            // 在这里处理请求失败的情况
        }
    });

}


function  check(account,pwd,verifyCode) {

    var check = true;

    if(account ==null ||account===''){
        $("#account").prop("placeholder", "Invalid account");
        $("#account").prop("class", "form-control is-invalid");
        check =false;
    }
    if(pwd ==null ||pwd===''){
        $("#pwd").prop("placeholder", "Invalid password");
        $("#pwd").prop("class", "form-control is-invalid");
        check =false;
    }
    if(verifyCode ==null ||verifyCode===''){
        $("#code").prop("placeholder", "verifyCode is empty");
        $("#code").prop("class", "form-control is-invalid");
        check =false;
    }


    var code = sessionStorage.getItem("code");


    if (verifyCode != code) {
        $('#tip').html('请填写正确的验证码！')
        check =false;
    }

    return check;

}


function login(){
    //login
    var account = $("#account").val();




    var pwd = $("#pwd").val();


    var verifyCode = $("#code").val();

    if (check(account,pwd,verifyCode) == false){
        return;
    }

    let urltoHref = window.location.href.replace('/sign_in.html',"").replace('#',"");

    // let urltoHref = window.location.host;



    //data

    $.ajax({
        url: baseUri+'/login/login', // 替换为你的服务器端点
        headers:{
            'Token': localStorage.getItem('token'), // 设置自定义请求头
            'Content-Type': 'application/json; charset=utf-8' // 设置内容类型为 JSON
        },
        data:JSON.stringify({
            'account':account,
            'pwd':CryptoJS.MD5(pwd).toString(),
            'verifyCode':verifyCode
        }),
        type: 'POST', // 请求类型
        dataType: 'json', // 预期服务器返回的数据类型
        success: function(response) {
            // 请求成功时执行的回调函数
            console.log('请求成功:', response);
            // 在这里处理服务器返回的数据
            if (response && response.code === 0 ) {
                // 如果数据有效，则提取token
                // 在这里你可以使用token进行其他操作，比如更新DOM、发起其他请求等。

                var myJSONString = JSON.stringify(response.data);

                localStorage.setItem('user',myJSONString);

                deleteCookie('isLogin');

                setCookieForMidnight('isLogin','yes');

                localStorage.setItem('isLogin','yes');









                window.location.href =urltoHref+ '/index.html'
            } else {
                $('#tip').html(response.message)
                // 处理无效数据的情况
                console.error('请求未成功或数据格式不正确:', response);
            }

        },
        error: function(jqXHR, textStatus, errorThrown) {
            // 请求失败时执行的回调函数
            console.error('请求失败:', textStatus, errorThrown);
            // 在这里处理请求失败的情况
        }
    });



    // 在页面加载时添加水印


}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}


function setCookieForMidnight(key, value) {
    // 获取当前日期和时间
    const now = new Date();

    // 设置cookie的过期时间为今天晚上12点
    const expiryDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0); // 次日0点0分0秒

    // 创建cookie字符串
    const cookieString = `${key}=${encodeURIComponent(value)}; expires=${expiryDate.toUTCString()}; path=/`;

    // 设置cookie
    document.cookie = cookieString;
}
// /go to index

    function addWatermark(){
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // 设置画布大小
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // 绘制水印内容
        ctx.font = '20px Arial';
        ctx.fillStyle = 'rgba(255, 255, 0, 0.5)';
        ctx.fillText('用户标识', 10, 50);

        // 将画布内容添加到 body 背景
        document.body.style.backgroundImage = 'url(' + canvas.toDataURL() + ')';
        document.body.style.backgroundSize = 'cover';
    }