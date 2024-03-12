var baseUri ='http://admin.fsfhr.com/api/fsfa';
var baseUri1 ='http://admin.fsfhr.com/';
var baseUri2 ='http://127.0.0.1:9090/fsfa'
const menuicon = [{icon:'<span class="nav-link-icon d-md-none d-lg-inline-block"><!-- Download SVG icon from http://tabler-icons.io/i/home -->\n' +
        '                    <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l-2 0l9 -9l9 9l-2 0" /><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" /><path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" /></svg>\n' +
        '                  </span>'},
    {icon:'<span class="nav-link-icon d-md-none d-lg-inline-block"><!-- Download SVG icon from http://tabler-icons.io/i/package -->\n' +
            '                    <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 3l8 4.5l0 9l-8 4.5l-8 -4.5l0 -9l8 -4.5" /><path d="M12 12l8 -4.5" /><path d="M12 12l0 9" /><path d="M12 12l-8 -4.5" /><path d="M16 5.25l-8 4.5" /></svg>\n' +
            '                  </span>'},
    {icon:'<span class="nav-link-icon d-md-none d-lg-inline-block">' +
            '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-4chan" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 11s6.054 -1.05 6 -4.5c-.038 -2.324 -2.485 -3.19 -3.016 -1.5c0 0 -.502 -2 -2.01 -2c-1.508 0 -2.984 3 -.974 8z" /><path d="M13.98 11s6.075 -1.05 6.02 -4.5c-.038 -2.324 -2.493 -3.19 -3.025 -1.5c0 0 -.505 -2 -2.017 -2c-1.513 0 -3 3 -.977 8z" /><path d="M13 13.98l.062 .309l.081 .35l.075 .29l.092 .328l.11 .358l.061 .188l.139 .392c.64 1.73 1.841 3.837 3.88 3.805c2.324 -.038 3.19 -2.493 1.5 -3.025l.148 -.045l.165 -.058a4.13 4.13 0 0 0 .098 -.039l.222 -.098c.586 -.28 1.367 -.832 1.367 -1.777c0 -1.513 -3 -3 -8 -.977z" /><path d="M10.02 13l-.309 .062l-.35 .081l-.29 .075l-.328 .092l-.358 .11l-.188 .061l-.392 .139c-1.73 .64 -3.837 1.84 -3.805 3.88c.038 2.324 2.493 3.19 3.025 1.5l.045 .148l.058 .165l.039 .098l.098 .222c.28 .586 .832 1.367 1.777 1.367c1.513 0 3 -3 .977 -8z" /><path d="M11 10.02l-.062 -.309l-.081 -.35l-.075 -.29l-.092 -.328l-.11 -.358l-.128 -.382l-.148 -.399c-.658 -1.687 -1.844 -3.634 -3.804 -3.604c-2.324 .038 -3.19 2.493 -1.5 3.025l-.148 .045l-.164 .058a4.13 4.13 0 0 0 -.1 .039l-.22 .098c-.588 .28 -1.368 .832 -1.368 1.777c0 1.513 3 3 8 .977z" /></svg>'+
            '                  </span>'},
    {icon:'<span class="nav-link-icon d-md-none d-lg-inline-block">' +
            '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-users-group" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 13a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M8 21v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1" /><path d="M15 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M17 10h2a2 2 0 0 1 2 2v1" /><path d="M5 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M3 13v-1a2 2 0 0 1 2 -2h2" /></svg>'+
            '                  </span>'},

    {icon:'<span class="nav-link-icon d-md-none d-lg-inline-block">' +
            '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-message-dots" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 21v-13a3 3 0 0 1 3 -3h10a3 3 0 0 1 3 3v6a3 3 0 0 1 -3 3h-9l-4 4" /><path d="M12 11l0 .01" /><path d="M8 11l0 .01" /><path d="M16 11l0 .01" /></svg>'+
            '                  </span>'},
    {icon:'<span class="nav-link-icon d-md-none d-lg-inline-block">' +
            '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-vocabulary" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 19h-6a1 1 0 0 1 -1 -1v-14a1 1 0 0 1 1 -1h6a2 2 0 0 1 2 2a2 2 0 0 1 2 -2h6a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-6a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2z" /><path d="M12 5v16" /><path d="M7 7h1" /><path d="M7 11h1" /><path d="M16 7h1" /><path d="M16 11h1" /><path d="M16 15h1" /></svg>'+
            '                  </span>'},
    {icon:'<span class="nav-link-icon d-md-none d-lg-inline-block">' +
            '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-coin" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M14.8 9a2 2 0 0 0 -1.8 -1h-2a2 2 0 1 0 0 4h2a2 2 0 1 1 0 4h-2a2 2 0 0 1 -1.8 -1" /><path d="M12 7v10" /></svg>'+
            '                  </span>'},
    {icon:'<span class="nav-link-icon d-md-none d-lg-inline-block">' +
            '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-accessible" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M10 16.5l2 -3l2 3m-2 -3v-2l3 -1m-6 0l3 1" /><circle cx="12" cy="7.5" r=".5" fill="currentColor" /></svg>'+
            '                  </span>'},
    {icon:'<span class="nav-link-icon d-md-none d-lg-inline-block">' +
            '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-device-desktop" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 5a1 1 0 0 1 1 -1h16a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1 -1v-10z" /><path d="M7 20h10" /><path d="M9 16v4" /><path d="M15 16v4" /></svg>'+
            '                  </span>'},
    {icon:'<span class="nav-link-icon d-md-none d-lg-inline-block">' +
            '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-heart-minus" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19.5 12.572l-2.494 2.47m-5.006 4.958l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" /><path d="M16 19h6" /></svg>'+
            '                  </span>'},
];

 


$(document).ready(function() {




    // 检查token123123

    var x = localStorage.getItem("token");
    if (x==null||x.length<10){
        //x 为null 需要重新请求 并且跳转网页
        console.log("x 为null 需要重新请求 并且跳转网页")
        window.location.href = '/fsf_b_web/sign_in.html'
    }else {
        //判断token是否过期
        $.ajax({
            url: baseUri+'/login/getTokenData', // 替换为你的服务器端点
            type: 'POST', // 请求类型
            headers:{
                'Token':x,
                'Content-Type': 'application/json; charset=utf-8' // 设置内容类型为 JSON
            },
            dataType: 'json', // 预期服务器返回的数据类型
            success: function(response) {
                // 请求成功时执行的回调函数
                // console.log('请求成功:', response);
                // 在这里处理服务器返回的数据
                if (response && response.code === 0 ) {
                    // 无效token 跳转页面
                    var code = response.data;

                    if (code == '1'){
                        window.location.href = '/fsf_b_web/sign_in.html'
                    }

                } else {
                    // 处理无效数据的情况
                    console.error('请求未成功或数据格式不正确:', response);
                    window.location.href = '/fsf_b_web/sign_in.html'
                }

            },
            error: function(jqXHR, textStatus, errorThrown) {
                // 请求失败时执行的回调函数
                console.error('请求失败:', textStatus, errorThrown);
                // 在这里处理请求失败的情况
            }
        });



    }


    console.log('页面加载完成，可以开始执行初始化设置了！');

    console.log()


    let user = JSON.parse(localStorage.getItem('user'));

    $('#userName').html(user.flowerName)

    $('#userLevel').html(user.job)

    // 例如，为某个按钮绑定点击事件
    menuStart();
    $('#loginButton').click(function() {
        login();
    });

    $('#logOut').click(function() {
        loginOut();
    });

    watermark.load({watermark_txt:user.flowerName,watermark_x_space:230})

    // 或者隐藏某个元素
    $('#myElement').hide();

    // 以及其他初始化操作...
});


function menuStart() {

    let menuStr = localStorage.getItem("menuStr")
    if (menuStr===null ||menuStr ==='' || menuStr.length<100){
        getMenuInfo();
    }else{
        
        $("#menu").html(menuStr);
    }






}



function getMenuInfo(){
    $.ajax({
        url: baseUri2+'/login/getMenu', // 替换为你的服务器端点
        headers:{
            'Token': localStorage.getItem('token'), // 设置自定义请求头
            'Content-Type': 'application/json; charset=utf-8' // 设置内容类型为 JSON
        },
        type: 'POST', // 请求类型
        dataType: 'json', // 预期服务器返回的数据类型
        success: function(response) {
            // 请求成功时执行的回调函数
            // console.log('请求成功:', response);
            // 在这里处理服务器返回的数据
            if (response && response.code === 0 ) {
                console.log(response.data)

                //生成菜单

                //一级菜单

                const menuLevel1 = response.data.filter(obj => obj.level===0);
                //

                $("#menu").html("");

                for (let i =0 ;i<menuLevel1.length;i++){


                    if (menuLevel1[i].uri !== 'home'){


                        let menu1 = $("<li class=\"nav-item dropdown\" id='"+menuLevel1[i].uri+"'>" +
                            "</li>");

                        menu1.append(      "<a class=\"nav-link dropdown-toggle\" href=\"#navbar-extra\" data-bs-toggle=\"dropdown\" data-bs-auto-close=\"false\" role=\"button\" aria-expanded=\"false\" >\n" +
                            ""+   menuicon[i].icon +
                            "                  <span class=\"nav-link-title fw-bold\">\n" +
                            ""                    +menuLevel1[i].name+
                            "                  </span>" +
                            "                </a>" )

                        let dropmenu = $('<div class="dropdown-menu">\n' +
                            '            </div>')

                        let dropmenu2 = $('<div class="dropdown-menu-columns">\n' +
                            '            </div>')

                        let dropmenu3 = $('<div class="dropdown-menu-columns">\n' +
                            '            </div>')

                        const menuLevel2 = response.data.filter(obj => (obj.level===1 && obj.superUri === menuLevel1[i].uri ));

                        menuLevel2.forEach(o=>{

                            dropmenu3.append("<a class=\"dropdown-item\" href='"+o.uri+" '>\n" +
                                "" + o.name +
                                "                      </a>")



                        })




                        dropmenu2.append(dropmenu3)
                        dropmenu.append(dropmenu2);


                        menu1.append(dropmenu)




                        $("#menu").append(menu1);



                    }else {
                        let menu1 = $("<li class=\"nav-item\" id='"+menuLevel1[i].uri+"'>" +
                            "</li>");

                        menu1.append(      "                <a class=\"nav-link\" href=\"./\" >\n" +
                            ""+   menuicon[i].icon +
                            "                  <span class=\"nav-link-title\">\n" +
                            ""                    +menuLevel1[i].name+
                            "                  </span>" +
                            "                </a>" )
                        $("#menu").append(menu1);

                    }

                    if (menuLevel1[i].uri !== 'home'){


                        const menuLevel2 = response.data.filter(obj => (obj.level===1 && obj.superUri === menuLevel1[i].uri ));

                        console.log( menuLevel1[i].name  )
                        console.log( menuLevel2  )
                        console.log("----------------------")






                    }


                }


                localStorage.setItem("menuStr",document.getElementById('menu').outerHTML)

                console.log(menuLevel1)
            }

        },
        error: function(jqXHR, textStatus, errorThrown) {
            // 请求失败时执行的回调函数
            console.error('请求失败:', textStatus, errorThrown);
            // 在这里处理请求失败的情况
        }
    });


}






function loginOut(){
    const keys = Object.keys(localStorage);

// 遍历所有键并删除它们
    for (let i = 0; i < keys.length; i++) {
    localStorage.removeItem(keys[i]);
    }

    window.location.href = '/fsf_b_web/sign_in.html'
}




function baseAjax(jsondata,uri){

    let resultData;

    $.ajax({
        url: baseUri2+uri, // 替换为你的服务器端点
        headers:{
            'Token': localStorage.getItem('token'), // 设置自定义请求头
            'Content-Type': 'application/json; charset=utf-8' // 设置内容类型为 JSON
        },
        data:jsondata,
        type: 'POST', // 请求类型
        dataType: 'json', // 预期服务器返回的数据类型
        success: function(response) {
            // 请求成功时执行的回调函数
            // console.log('请求成功:', response);
            // 在这里处理服务器返回的数据
            if (response && response.code === 0 ) {
                console.log(response.data)
                resultData = response.data;

            }

        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('请求失败:', textStatus, errorThrown);
        }
    });

    return resultData;


}