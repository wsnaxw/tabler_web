let baseUri ='http://admin.fsfhr.com/api/fsfa';
// let baseUri ='http://127.0.0.1:9090/fsfa';
var baseUri1 ='http://admin.fsfhr.com/';
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
const dazuanshi = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" '+
                          '    stroke="#87ceeb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" '+
                          '    class="icon icon-tabler icons-tabler-outline icon-tabler-diamond"> '+
                          '   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path> '+
                          '   <path d="M6 5h12l3 5l-8.5 9.5a.7 .7 0 0 1 -1 0l-8.5 -9.5l3 -5"></path>'+
                          '   <path d="M10 12l-2 -2.2l.6 -1"></path></svg>' 
const dashijian = '  <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="#fd7275"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-news"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M16 6h3a1 1 0 0 1 1 1v11a2 2 0 0 1 -4 0v-13a1 1 0 0 0 -1 -1h-10a1 1 0 0 0 -1 1v12a3 3 0 0 0 3 3h11" /><path d="M8 8l4 0" /><path d="M8 12l4 0" /><path d="M8 16l4 0" /></svg>'
const dayuanbao = '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="#ffeb00"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-coin"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M14.8 9a2 2 0 0 0 -1.8 -1h-2a2 2 0 1 0 0 4h2a2 2 0 1 1 0 4h-2a2 2 0 0 1 -1.8 -1" /><path d="M12 7v10" /></svg>'



let male_icon= `<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="#41c1d2"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-gender-male"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 14m-5 0a5 5 0 1 0 10 0a5 5 0 1 0 -10 0" /><path d="M19 5l-5.4 5.4" /><path d="M19 5h-5" /><path d="M19 5v5" /></svg>`

let female_icon =`<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="#eb2f96"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-gender-female"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 9m-5 0a5 5 0 1 0 10 0a5 5 0 1 0 -10 0" /><path d="M12 14v7" /><path d="M9 18h6" /></svg>`





$(document).ready(function () {
    $('.page-loader').show();
    var x = localStorage.getItem("token");
    if (x==null||x.length<10){
        //x 为null 需要重新请求 并且跳转网页
        // console.log("x 为null 需要重新请求 并且跳转网页")
        window.location.href = '/tabler_web/sign_in.html'
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
                if (response && response.code === 0 ) {
                    var code = response.data;

                    if (code == '1'){
                        loginOut()
                        window.location.href = '/tabler_web/sign_in.html'
                    }

                } else {
                    console.error('请求未成功或数据格式不正确:', response);
                    loginOut()
                }

            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('请求失败:', textStatus, errorThrown);
            }
        });
    }
    let user = JSON.parse(localStorage.getItem('user'));
    if(user == null){
        loginOut()
    }

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
    menuClick();
    menuActive();
    // usermessage();
    
  document.addEventListener('keydown', function(event) {
    // 监听左右方向键
    if (event.key === "ArrowLeft") {
      leftpage()
    } else if (event.key === "ArrowRight") {
     rightpage()
    }else if (event.target.id != 'indexsearch'&&event.key === "Enter") {
        searchList()
    }
  });

  var inputElement = document.getElementById('indexsearch');

  inputElement.addEventListener('keydown', function(event) {
      // 检查是否是回车键
      if (event.key === "Enter") {
          event.preventDefault();

          var inputValue = this.value; // 或者使用 event.target.value
          console.log(inputValue);
      }
  });


  var element = document.querySelector('.navbar-brand.navbar-brand-autodark.d-none-navbar-horizontal.p-0.pe-md-6');

  if (element) {
    $(".navbar-brand.navbar-brand-autodark.d-none-navbar-horizontal.p-0.pe-md-6").html(`<svg viewBox="64 64 896 896" focusable="false" data-icon="menu-fold" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM115.4 518.9L271.7 642c5.8 4.6 14.4.5 14.4-6.9V388.9c0-7.4-8.5-11.5-14.4-6.9L115.4 505.1a8.74 8.74 0 000 13.8z"></path></svg>`)


    // 为元素添加点击事件监听器
    element.addEventListener('click', function() {
      // 在这里编写点击事件处理逻辑
      spidermenu()
      // 例如，你可以更改元素的内容、样式或执行其他操作
    });
  } 
  $("#webBody").append(`
    <div class="modal modal-blur fade" id="indexsearchmodal" tabindex="-1" role="dialog" aria-hidden="true">
              <div class="modal-dialog modal-full-width modal-xl modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-body">
                    <div class="row row-cards">
                      <div class="card-header">
                        <h3 class="wordbold">查询结果</h3>
                      </div>
                      <div class="card-body">
                        <div class="row row-deck">
                          <div class="col-3">
                            <div class="card">
                              <div class="card-body">
                                <div class="card-header border-0">
                                  <div class="card-title">客户查询 (<a id="cusatag" target="_blank" href="./page/customer/list.html">更多</a>)</div>
                                </div>
                                <div class="card-table table-responsive">
                                  <table class="table table-vcenter">
                                    <thead>		
                                      <tr>
                                        <th>客户名称</th>
                                        <th>岗位数量</th>
                                        <th>记录</th>
                                        <th>操作</th>
                                      </tr>
                                    </thead>
                                    <tbody id="khcx">
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="col-4">
                            <div class="card">
                              <div class="card-body">
                                <div class="card-header border-0">
                                  <div class="card-title">职位查询 (<a id="proatag" target="_blank" href="./page/project/p-list.html">更多</a>)</div>
                                </div>
                                <div class="card-table table-responsive">
                                  <table class="table table-vcenter">
                                    <thead>		
                                      <tr>
                                        <th>客户名称</th>
                                        <th>职位名称</th>
                                        <th>状态</th>
                                        <th>推荐人数</th>
                                        <th>操作</th>
                                      </tr>
                                    </thead>
                                    <tbody id="zwcx">    
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="col-5">
                            <div class="card">
                              <div class="card-body">
                                <div class="card-header border-0">
                                  <div class="card-title">人选查询 (<a id="tlatag" target="_blank" href="./page/talent/t-list.html">更多</a>)</div>
                                </div>
                                <div class="card-table table-responsive">
                                  <table class="table table-vcenter">
                                    <thead>		
                                      <tr>
                                        <th>人选名称</th>
                                        <th>学历</th>
                                        <th>公司</th>
                                        <th>职位</th>
                                        <th>操作</th>
                                      </tr>
                                    </thead>
                                    <tbody id="rxcx">
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-link link-secondary me-auto" data-bs-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">确认</button>
                  </div>
                </div>
              </div>
            </div>`)




            let menuStr = localStorage.getItem("menuStr")
            const menu = document.getElementById('menu');
            if(menuStr){
              // 用于存储所有menu链接对应的页面路径
              const menuPaths = [];
              const links = menu.querySelectorAll('a');
              links.forEach(link => {
                const href = link.getAttribute('href');
                menuPaths.push(href);
              });
              const currentPath = window.location.pathname;
              console.log(currentPath)
              if(!currentPath.startsWith('/tabler_web/403.html')||!currentPath.startsWith('/tabler_web/sign_in.html')){
                let isInMenu = false;
                menuPaths.forEach(path => {
                  console.log(currentPath.startsWith(path))
                  if (currentPath.startsWith(path)) {
                    isInMenu = true;
                  }
                });
                console.log(isInMenu)
  
                if (!isInMenu) {
                  window.location.href = '/tabler_web/403.html'; // 假设你的403页面路径是/403.html，根据实际情况修改
                }
              }
           
  
  
            }
     




});

function menuStart() {
    let menuStr = localStorage.getItem("menuStr")
    if (menuStr===null ||menuStr ==='' || menuStr.length<100){
        getMenuInfo();
    }else{  
        $("#sidebar-menu").html(menuStr);
    }
}



function getMenuInfo(){
    $.ajax({
        url: baseUri+'/login/getMenu', // 替换为你的服务器端点
        headers:{
            'Token': localStorage.getItem('token'), // 设置自定义请求头
            'Content-Type': 'application/json; charset=utf-8', // 设置内容类型为 JSON
            'Access-Control-Allow-Origin':'*'
        },
        type: 'POST', // 请求类型
        dataType: 'json', // 预期服务器返回的数据类型
        success: function(response) {
            if (response && response.code === 0 ) {
                const menuLevel1 = response.data.filter(obj => obj.level===0);
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

                            dropmenu3.append("<a class=\"dropdown-item\" href='/tabler_web"+o.url+"'>\n" +
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

                        menu1.append(      "                <a class=\"nav-link\" href=\"/tabler_web/index.html\" >\n" +
                            ""+   menuicon[i].icon +
                            "                  <span class=\"nav-link-title\">\n" +
                            ""                    +menuLevel1[i].name+
                            "                  </span>" +
                            "                </a>" )
                        $("#menu").append(menu1);

                    }

                    if (menuLevel1[i].uri !== 'home'){
                        const menuLevel2 = response.data.filter(obj => (obj.level===1 && obj.superUri === menuLevel1[i].uri ));
                    }
                }
                // console.log(document.getElementById('menu').outerHTML)
                localStorage.setItem("menuStr",document.getElementById('menu').outerHTML)
            }

        },
        error: function(jqXHR, textStatus, errorThrown) {
            // console.error('请求失败:', textStatus, errorThrown);
        }
    });
}

function loginOut(){
    const keys = Object.keys(localStorage);

// 遍历所有键并删除它们
    for (let i = 0; i < keys.length; i++) {
    localStorage.removeItem(keys[i]);
    }
    deleteCookie('isLogin');

    window.location.href = '/tabler_web/sign_in.html'
}

function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}

function baseAjax(jsondata,uri) {
    // 返回一个Promise
    return new Promise((resolve, reject) => {
        $.ajax({
            url: baseUri+uri,
            headers:{
                'Token': localStorage.getItem('token'), 
                'Content-Type': 'application/json; charset=utf-8'
            },
            data:JSON.stringify(jsondata),
            type: 'POST', 
            dataType: 'json', 
            success: function(response) {
                if (response && response.code === 0 ) {
                    resolve(response.data);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                reject(new Error('请求失败: ' + textStatus));
            }
        });
    });
}


async function getData(data,uri) {
    try {
        // 调用fetchData函数并等待结果
        const obj = await baseAjax(data,uri);
        // 在这里处理数据
        // console.log(obj);
        return obj; // 这里返回数据并不实际返回给调用者，因为这是一个异步函数
    } catch (error) {
        // 处理错误
        console.error('获取数据失败:', error);
    }
}



function indexSearch(){

    let checkname = $("#indexsearch").val()

    

    getCUSpage(checkname)

    getPropage(checkname)
    
    getTlpage(checkname)
    
    $("#indexsearchmodal").modal('show')


    
}







function getCUSpage(checkname){
    var domain = window.location.protocol + "//" + window.location.host;
    $.ajax({
        headers:{
            'token':localStorage.getItem("token"),
            Accept:'application/json',
            'Content-Type':'application/json;charset=UTF-8'
        },
        dataType:'json',
        type:'post',
        url:baseUri+'/customer/cstList',
        data:JSON.stringify({'name':checkname}),
        success:function(obj){
            var str="";
            if(obj.data.list.length===0){
                $('#indexsearchmodal').find('#khcx').html(`<tr class='text-c'><td colspan='4'>没有数据 !</td></tr>`);          
            }else{
                $('#indexsearchmodal').find("#cusatag").attr('href',domain+'/tabler_web/page/customer/list.html?name='+checkname);
                for(var i =0;i<obj.data.list.length;i++){
                    var o = obj.data.list[i];
                    var jobBeansNum = o.jobBeansNum+'';
                    var customerCommunicateBeansNum= o.customerCommunicateBeansNum+''
                    var numbers = '<div style="width: 28px; height: 28px; line-height: 28px; border-radius: 50%; text-align: center; background-color: rgb(27, 188, 155); color: rgb(255, 255, 255);">'+customerCommunicateBeansNum+'</div>'
                    str += `
                                    <tr>
                                      <td class="text-nowrap text-secondary"><span style="font-weight: bold;" class="bg-primary-lt"><a target='_blank' href='./customer/cusd.html?customerId=encodeURIComponent(${o.customerId})'>${o.name}</a></span></td>
                                      <td class="text-secondary text-nowrap">${jobBeansNum}</td>
                                      <td class="text-nowrap">${numbers}</td>
                                      <td class="text-secondary text-nowrap"><a target='_blank' href='./page/customer/cusd.html?customerId=${o.customerId}' class="btn btn-sm">查看</a></td>
                                    </tr>                                
                    `;
                }
                $('#indexsearchmodal').find('#khcx').html(str);
            }
        }
    });  
}





function getPropage(checkname){
    var domain = window.location.protocol + "//" + window.location.host;
    $.ajax({
        headers:{
            'token':localStorage.getItem("token"),
            Accept:'application/json',
            'Content-Type':'application/json;charset=UTF-8'
        },
        dataType:'json',
        type:'post',
        url:baseUri+'/project/selectPList',
        data:JSON.stringify({'name':checkname}),
        success:function(obj){
            var str="";
            if(obj.data.list.length===0){
                $('#indexsearchmodal').find('#zwcx').html(`<tr class='text-c'><td colspan='5'>没有数据 !</td></tr>`);           
            }else{
                $('#indexsearchmodal').find("#proatag").attr('href',domain+'/tabler_web/page/project/p-list.html?name='+checkname);
                for(var i =0;i<obj.data.list.length;i++){


                    var o = obj.data.list[i];
                  var numbers = '<div style="width: 28px; height: 28px; line-height: 28px; border-radius: 50%; text-align: center; background-color: rgb(27, 188, 155); color: rgb(255, 255, 255);">'+o.recommendNumber+'</div>'

                    str+=`
                                        <tr>
                                        <td class="text-nowrap text-secondary">${o.customerName}</td>
                                        <td class="text-secondary text-nowrap"><span style="font-weight: bold;" class="bg-primary-lt"><a target='_blank' href='./page/project/prod.html?workId=${o.projectId}'>${o.name}</a></span></td>
                                        <td class="text-secondary text-nowrap">${o.stateData}</td>
                                        <td class="text-nowrap" >${numbers}</td>
                                        <td class="text-secondary text-nowrap"><a target='_blank' href='./page/project/prod.html?workId=${o.projectId}' class='btn btn-sm'>查看</a></td>
                                      </tr>
                    `



                }
                $('#indexsearchmodal').find('#zwcx').html(str);
            }
        }
    });  
}








function getTlpage(checkname){
    var domain = window.location.protocol + "//" + window.location.host;
    $.ajax({
        headers:{
            'token':localStorage.getItem("token"),
            Accept:'application/json',
            'Content-Type':'application/json;charset=UTF-8'
        },
        dataType:'json',
        type:'post',
        url:baseUri+'/talent/selectTalentList',
        data:JSON.stringify({'name':checkname}),
        success:function(obj){
            var str="";
            if(obj.data.list.length===0){
                $('#indexsearchmodal').find('#rxcx').html(`<tr class='text-c'><td colspan='5'>没有数据 !</td></tr>`);           
            }else{
                $('#indexsearchmodal').find("#tlatag").attr('href',domain+'/tabler_web/page/talent/t-list.html?name='+checkname);
                for(var i =0;i<obj.data.list.length;i++){


                    var o = obj.data.list[i];
                  
                    let gender = '';

                    if(o.gender==1){
                      gender = male_icon;
                    }else if (o.gender==2){
                      gender = female_icon;
                    }

                   



                    var edu = '';
                    switch (o.education) {
                        case "0":
                          edu='';
                          break;
                        case "1":
                          edu='初中';
                            break;
                        case "2":
                          edu='中专';
                            break;
                        case "3":
                          edu='高中';
                            break;
                        case "4":
                          edu='大专';
                            break;
                        case "5":
                          edu='本科';
                            break;
                        case "6":
                          edu='硕士';
                                break;
                        case "7":
                          edu='博士';
                            break;
                        default:
                          edu=o.education;
                    }


                    str+=
                    `
                    <tr > 
                        <td > ${gender}${o.name}</td>
                        <td >${toStr(edu)}</td>
                        <td >${toStr(o.lastCompany)}</td>
                        <td >${checkAndCutString(o.job)}</td>      
                         <td class="text-secondary text-nowrap"><a target='_blank' href='./page/talent/detail.html?workId=${o.talentId}' class='btn btn-sm'>查看</a></td>
                      </tr>
                    `

                }
                $('#indexsearchmodal').find('#rxcx').html(str);
            }
        }
    });  
}






function checkAndCutString(str) {
    if(str == null) return "";
    if (str.length > 10) {
      return str.substring(0, 10);
    } else {
      return str;
    }
  }









  function getUrlParams() {
    var search = window.location.search;
    var params = {};
    if (search.length > 1) {
        search = search.substring(1).split('&');
        for (var i = 0; i < search.length; i++) {
            var pair = search[i].split('=');
            params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || "");
        }
    }
    return params;
}











































function usermessage(){



    $('#messagediv').show()
    
    $('#tripdiv').hide()

    
    getData({},'/home/selectMsgList').then(data => {
        // 这里处理从getData返回的数据

        
        if (data==null||data.list==null||data.list.length<1){

            $('#msgstr').html('')
            $('#msgstr').html('<h3>无更多数据！</h3>')

        };

        try {

            let str ='';
            
            $('#msgstr').html('')
            
            data.list.forEach(o=>{
               


                str += '<div class="row align-items-center col-lg-12">'+
                '<div class="col-3"><span class="badge">'+o.sendName+'</span></div>'
                +'<div class="col-9">'
                +'<a href="#" class="text-body d-block"><span style="font-weight: bold;">'+o.name+'</span></a>'
                +'<div class="d-block text-muted text-truncate mt-n1">'
                + o.details
                +'</div><span style="font-weight: bold;">'+o.createTime+'</span></div></div>'
                
            });

            $('#msgstr').html(str)            
        } catch (error) {
            
        }

    }).catch(error => {
        // 处理错误
        console.error('获取数据失败:', error);
    });

}


function usertrip(){


    $('#tripdiv').show()
    
    $('#messagediv').hide()

    getData({},'/home/selectTripList').then(data => {
        // 这里处理从getData返回的数据

        if (data==null||data.list==null||data.list.length<1){

            $('#tripstr').html('')
            $('#tripstr').html('<h3>无更多数据！</h3>')

        };

        try {

            let str ='';
            
            $('#tripstr').html('')
            
            data.list.forEach(o=>{
               


                str+= '<div class="row align-items-center col-lg-12">'
                +'<div class="col-4"><span class="badge">'+o.outType+'</span></div><div class="col-8">'
                +'<a href="#" class="text-body d-block"><span style="font-weight: bold;">'+ o.time +'   '+o.name+'</span></a>'
                +'<div class="d-block text-muted text-truncate mt-n1">'
                + o.details+'</div></div></div>'
             


            });

            $('#tripstr').html(str)            
        } catch (error) {
            
        }

    }).catch(error => {
        // 处理错误
        console.error('获取数据失败:', error);
    });

}

function menuActive(){
    let nowpagekey = pagemenukey;
    let key;
    if(nowpagekey!=null){
         key = nowpagekey;
    }else{
        key = sessionStorage.getItem("nowactive")
        pagemenukey = key;
    }



    if  (key==null || key=='')return;
    // key = "/tabler_web/page/customer/list.html ";
    $('a[href*="'+key+'"]').addClass("active");
    $('a[href*="'+key+'"]').parent().parent().parent()
    .siblings('a').attr("aria-expanded",true)

    $('a[href*="'+key+'"]').parent().parent().parent().addClass("show")
    $('a[href*="'+key+'"]').parent().parent().parent().parent().addClass("active")
    // localStorage.setItem("nowactive",'')
 
    
}

let pagemenukey;
function menuClick(){

var menudive = document.getElementById('sidebar-menu');

// 获取testDiv内的所有a标签
var aTags = menudive.querySelectorAll('a');

// 遍历所有的a标签，并给它们添加点击事件监听器
aTags.forEach(function(aTag) {
    aTag.addEventListener('click', function(event) {
        // 阻止a标签的默认行为（例如跳转）
        // event.preventDefault();
        
        // 获取a标签的href属性值
        // var hrefValue = this.href;

        var hrefValue =  $(this).attr("href")

        sessionStorage.setItem("nowactive",hrefValue);


        
        // 打印href值到控制台
        // console.log(hrefValue);
    });
});

}

function isNumeric(str) {  
    var pattern = /^\d+(\.\d+)?$/;  
    return pattern.test(str);  
}  

function splitOrGet(str) {  
    // 使用split方法根据'/'字符分割字符串  
    // 如果没有'/'，split方法将返回只包含原字符串的数组  
    const parts = str.split('/');  
  

  
    // 否则，返回分割后的数组  
    return parts;  
} 


function getFetchOptions(data){
    const options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'token':localStorage.getItem('token')
        },
        body: JSON.stringify(data),
    };

    return options;
}

function toStr(value) {
    if (value === null || value === undefined) {
        return '';
    }

    return value.toString();
}

function isNumber(value) {
    return typeof value === 'number' && !Number.isNaN(value) && Number.isFinite(value);
  }
function getParameterByName(name) {
    url = window.location.href;
   name = name.replace(/[\[\]]/g, "\\$&");
   var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
       results = regex.exec(url);
   if (!results) return null;
   if (!results[2]) return '';
   return decodeURIComponent(results[2].replace(/\+/g, " "));
}
let arrowPageNo =1;
let arrowTotalPage =1
function leftpage(){

    if(arrowPageNo!=null&&arrowPageNo>1){
      getPage(arrowPageNo-1) 
  
    }
  
  }
  
  function rightpage(){
    let maxPage = arrowTotalPage - arrowPageNo;
  
    if(arrowPageNo!=null&&arrowPageNo>0&&maxPage>0){
      getPage(arrowPageNo+1) 
    }
  
  }


function spidermenu(){

  $('.navbar.navbar-vertical').each(function() {
    
    // 检查当前元素是否包含.navbar-expand-lg类
    if ($(this).hasClass('navbar-expand-lg')) {
      console.log($(this))
      // 如果包含，则移除该类
      $(this).removeClass('navbar-expand-lg');
    $(".navbar-brand.navbar-brand-autodark.d-none-navbar-horizontal.p-0.pe-md-6").html(`<svg viewBox="64 64 896 896" focusable="false" data-icon="menu-unfold" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 000-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0014.4 7z"></path></svg>`)

    } else {
      // 如果不包含，则添加该类
      $(this).addClass('navbar-expand-lg');
    $(".navbar-brand.navbar-brand-autodark.d-none-navbar-horizontal.p-0.pe-md-6").html(`<svg viewBox="64 64 896 896" focusable="false" data-icon="menu-fold" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM115.4 518.9L271.7 642c5.8 4.6 14.4.5 14.4-6.9V388.9c0-7.4-8.5-11.5-14.4-6.9L115.4 505.1a8.74 8.74 0 000 13.8z"></path></svg>`)

    }
  });
}