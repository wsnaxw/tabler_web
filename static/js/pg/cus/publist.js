$(document).ready(function(){

    // var customerId = getParameterByName('customerId');

    // console.log('customerId:'+customerId)
    checkboxChcek()
    //默认进行分页数据查询
    getPage(1);


})



const customerIcon =
{

    vip0:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-circle-number-0"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path><path d="M10 10v4a2 2 0 1 0 4 0v-4a2 2 0 1 0 -4 0z"></path></svg>',
    vip1:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e6b400" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-circle-number-1"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path><path d="M10 10l2 -2v8"></path></svg>',
    vip2:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e6b400" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-circle-number-2"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path><path d="M10 8h3a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-2a1 1 0 0 0 -1 1v2a1 1 0 0 0 1 1h3"></path></svg>',
    vip3:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e6b400" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-circle-number-3"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path><path d="M10 9a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-2h2a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1"></path></svg>',

    vip4:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e6b400" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-circle-number-4"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path><path d="M10 8v3a1 1 0 0 0 1 1h3"></path><path d="M14 8v8"></path></svg>',
    vip5:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e6b400" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-circle-number-5"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path><path d="M10 15a1 1 0 0 0 1 1h2a1 1 0 0 0 1 -1v-2a1 1 0 0 0 -1 -1h-3v-4h4"></path></svg>',
    bigC:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#82d7f7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-diamond"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M6 5h12l3 5l-8.5 9.5a.7 .7 0 0 1 -1 0l-8.5 -9.5l3 -5"></path><path d="M10 12l-2 -2.2l.6 -1"></path></svg>',
    normalC:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-diamond"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M6 5h12l3 5l-8.5 9.5a.7 .7 0 0 1 -1 0l-8.5 -9.5l3 -5"></path><path d="M10 12l-2 -2.2l.6 -1"></path></svg>'

};

function getPage(pageNo){




  arrowPageNo=pageNo;
    let queryData = formCheck()
    queryData.pageNo = pageNo;
    queryData.pageSize = 10;

    // console.log(queryData)


    $('#data').html('');


    $.ajax({
        headers:{
            'token':localStorage.getItem("token"),
            Accept:'application/json',
            'Content-Type':'application/json;charset=UTF-8'
        },
        dataType:'json',
        type:'post',
        url:baseUri+'/customer/ggCustomerList',
        data:JSON.stringify(queryData),
        success:function(obj){

            var str="";
            if(obj.data.list.length===0){
                $('.table-sort tbody').append("<tr class='text-c'><td colspan='4'>没有数据 !</td></tr>");
                $('#pageSelect').html('');
                $('#totalPageNum').html(0);
                $('#totalPageNum1').html(0);
            }else{
                // $("#countsss").css("display","");
                for(var i =0;i<obj.data.list.length;i++){

                    var o = obj.data.list[i];
                    //来源
                    var sourceType = o.sourceType+'';

                    var sourceType1 = '';
                    switch (sourceType) {
                        case "1":
                            sourceType1='广告呼入';
                            break;
                        case "2":
                            sourceType1='主动BD';
                            break;
                        case "3":
                            sourceType1='电销开发';
                            break;
                        default:
                            sourceType1='公共池' ;
                    }

                    




                    var vip = o.vip +'';
                    var vip1 = '';

                    switch (vip) {
                        case "1":
                            vip1=customerIcon.bigC;
                            break;
                        default:
                            vip1=customerIcon.normalC ;
                    }

                    var level = o.level+'';

                    var level1 = '';
                    switch (level) {
                        case "1":
                            level1=customerIcon.vip1;
                            break;
                        case "2":
                            level1=customerIcon.vip2;
                            break;
                        case "3":
                            level1=customerIcon.vip3;
                            break;
                        case "4":
                            level1=customerIcon.vip4;
                            break;
                        case "5":
                            level1=customerIcon.vip5;
                            break;
                        default:
                            level1=customerIcon.vip0;
                    }

          

                    var name = o.name+'';




                    // var certification = o.certification+'';

                    // var certification1 = '';

                    // switch (certification) {
                    //     case "1":
                    //         certification1='<div class="avatar avatar-sm bg-red-lt" >是</div>';
                    //         break;
                    //     default:
                    //         certification1='<div class="avatar avatar-sm bg-red-lt" >否</div>';
                    // }

                    var jobBeansNum = o.jobBeansNum+'';

                  
                    var comName=o.comName+'';
                    var state=o.state+'';
                    var state1= '';
                    switch (state) {
                        case "1":
                            state1='签约运作';
                            break;
                        case "2":
                            state1='签约暂停';
                            break;
                        case "3":
                            state1='签约终止';
                            break;
                        default:
                            state1='潜在客户' ;
                    }

                    

                    var updateTime=o.updateTime+'';
                    var customerCommunicateBeansNum= o.customerCommunicateBeansNum+''

                    var numbers = '<div style="width: 28px; height: 28px; line-height: 28px; border-radius: 50%; text-align: center; background-color: rgb(27, 188, 155); color: rgb(255, 255, 255);">'+customerCommunicateBeansNum+'</div>'
                    var cteams= '';
                    if (o.customerTeamBeans!=null&& o.customerTeamBeans.length>0){
                      o.customerTeamBeans.forEach(element => {
                        cteams += `<span class="badge badge-outline text-lime">${element.userName}</span>`
                      });
                    }else{
                      cteams='无'
                    }
                    if (jobBeansNum==='0' )jobBeansNum='暂无';
                    // if (com===undefined || com==='')com='暂无数据';


                    str+="<tr><td>"
                        +sourceType1+"</td><td>"
                        +vip1+level1+"<span style='font-weight: bold;' class ='bg-primary-lt'><a onclick='checkDetail("+o.customerId+")'>"+name+"</a></span></td><td>"
                        // +certification1+"</td><td >"
                        +jobBeansNum+"</td><td >"
                        
                        +cteams+"</td><td>"
                        +comName+"</td>" +
                        "<td>"+state1+"</td>" +
                        "<td>"+updateTime+"</td>" +
                        "<td>"+numbers+"</td>" +
                        "<td><a herf='#' onclick='checkDetail("+o.customerId+")' class ='btn'>查看</a><a herf='#' class='btn' onclick='move("+o.customerId+")'>转移</a></td>" +
                        "</tr>";
                }
                $('#data').html(str);



                var pageCount = obj.data.count

                $('#totalPageNum').html('');
                $('#totalPageNum').html(pageCount);

                var totalPage = obj.data.totalPage;
                arrowTotalPage = totalPage;

                $('#totalPageNum1').html('');
                $('#totalPageNum1').html(totalPage);
                //上一页页数
                var forward = pageNo-1;
                var forward1 = '';
                if(pageNo==1){
                    forward=1;
                    forward1 = '<li class="page-item disabled">'
                    +'<a class="page-link" href="#"  tabindex="1" aria-disabled="true">'
                      +'<svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M15 6l-6 6l6 6"></path></svg>'
                      +'prev'
                    +'</a>'
                  +'</li>'
                }else {
                    forward1 = '<li class="page-item" >'
                    +'<a class="page-link" href="#" onclick="getPage('+forward+');">'
                      +'<svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M15 6l-6 6l6 6"></path></svg>'
                      +'prev'
                    +'</a>'
                  +'</li>'
                }
                //下一页页数
                var backwards = pageNo+1;
                var backwards1 = '';
                if(pageNo===obj.data.totalPage){
                    backwards=pageNo;

                    backwards1 = '<li class="page-item disabled">'
                    +'<a class="page-link" href="#"  tabindex="1" aria-disabled="true">'
                      +'<svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M9 6l6 6l-6 6"></path></svg>'
                      +'next'
                    +'</a>'
                  +'</li>'
                }else{
                    backwards1 = '<li class="page-item">'
                    +'<a class="page-link" href="#"  onclick="getPage('+backwards+');" >'
                      +'<svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M9 6l6 6l-6 6"></path></svg>'
                      +'next'
                    +'</a>'
                  +'</li>'
                }

                str='';
                str+=forward1;

                //添加首页/上一页按钮功能
                var count = 0;//记录第一次循环页数按钮, 用来控制显示的按钮数不得超过5个
                var index = 0;//第二次循环页数
                var pages= pageNo;
                for(var i=1;i<=totalPage;i++){
                    if(pageNo>1){
                        i=pageNo++;
                        index = count++;
                        if(index>4){
                            break;
                        }
                        if(i==pages){
                            str+= '<li class="page-item active" ><a class="page-link" href="#"  onclick="getPage('+i+');" >'+i+'</a></li>'
                        }else{
                            str+= '<li class="page-item" ><a class="page-link" href="#"  onclick="getPage('+i+');" >'+i+'</a></li>'
                        }
                    }else{
                        count++;
                        if(count>5){
                            count=0;
                            break;
                        }else{
                            if(i===pageNo){
                                str+= '<li class="page-item active" ><a class="page-link" href="#"  onclick="getPage('+i+');" >'+i+'</a></li>'
                            }else{
                                str+= '<li class="page-item" ><a class="page-link" href="#"  onclick="getPage('+i+');" >'+i+'</a></li>'
                            }
                        }
                    }
                }

                str+=backwards1;


                $('#pageSelect').html('');
                $('#pageSelect').html(str);
                document.getElementById('pageSelect').scrollIntoView({ behavior: 'smooth' });
            }


        }
    });













}


function formCheck(){
    //参数
    var name = $('#name').val();

    var appUserName = $('#appUserName').val();

    var employComId = $('#employComId').val();

    var sourceType = $('#sourceType').val();

    var state=$('#state').val()

    var level = $('#level').val();

    var customerSize = $('#customerSize').val();

    var industryType = $('#industryType').val();



    var certification = $('input[type="checkbox"][name="certification"]:checked').map(function() {
        return this.value;
      }).get();

      
    var vip = $('input[type="checkbox"][name="vip"]:checked').map(function() {
        return this.value;
      }).get();

      
    var belong = $('input[type="checkbox"][name="belong"]:checked').map(function() {
        return this.value;
      }).get();

    let sourceData = {
        'name':name,
        'appUserName':appUserName,
        'employComId':employComId,
        'sourceType':sourceType,
        'state':state,
        'certification':certification[0],
        'vip':vip[0],
        'belong':belong[0],
        'level':level,
        'customerSize':customerSize,
        'industryType':industryType
    }

    let data = cleanseJSON(sourceData);


    // console.log(data)

    return data;

}

function clearForm(){

    $('#formdata input[type="checkbox"], #formdata select, #formdata input[type="text"]').each(function() {
        // 将这些元素的值设置为空
        $(this).val('');
        // 对于checkbox，还需要取消选中状态
        if ($(this).is('input[type="checkbox"]')) {
          $(this).prop('checked', false);
        }
      });
}


function cleanseJSON(obj) {
    if (obj === null || obj === undefined) {
      return null;
    }
  
    if (typeof obj !== 'object' || Array.isArray(obj)) {
      // 如果值不是对象或者是一个数组，那么检查它是否为空值
      return obj === '' || obj === null || obj === undefined ? null : obj;
    }
  
    // 对于对象，遍历其所有属性
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        let val = obj[key];
        if (val === '' || val === null || val === undefined) {
          // 如果属性值为空值，删除该属性
          delete obj[key];
        } else if (typeof val === 'object') {
          // 如果属性值仍然是对象，递归地清理它
          cleanseJSON(val);
        }
      }
    }
  
    return obj;
  }


function checkboxChcek(){


    var checkboxescert = $('input[name="certification"]');

    // 当任何一个checkbox的状态发生变化时
    checkboxescert.change(function() {
      // 如果当前checkbox被选中
      if ($(this).is(':checked')) {
        // 取消选中其他所有的同名checkbox
        checkboxescert.not(this).prop('checked', false);
      }
    });

    var checkboxesvip = $('input[name="vip"]');

    // 当任何一个checkbox的状态发生变化时
    checkboxesvip.change(function() {
      // 如果当前checkbox被选中
      if ($(this).is(':checked')) {
        // 取消选中其他所有的同名checkbox
        checkboxesvip.not(this).prop('checked', false);
      }
    });

    var checkboxesbelong = $('input[name="belong"]');

    // 当任何一个checkbox的状态发生变化时
    checkboxesbelong.change(function() {
      // 如果当前checkbox被选中
      if ($(this).is(':checked')) {
        // 取消选中其他所有的同名checkbox
        checkboxesbelong.not(this).prop('checked', false);
      }
    });




}

function searchList(){
    getPage(1)
}


function checkDetail(id){
    //跳转页面并且携带参数

    let bigNumber = BigInt(id);
    let customerId = bigNumber.toString(); // 转换为字符串


// 创建一个新的URL，携带参数
var url = 'cusd.html?customerId=' + encodeURIComponent(customerId) ;

// 使用jQuery来跳转到新页面
// window.location.href = url;

window.open(url, '_blank');

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


function move(csid){
  let bigNumber = BigInt(csid);
  let customerId = bigNumber.toString(); // 转换为字符串
  $("#hidencsid").val(customerId)
  $("#movemember").modal('show')
}
let addMoveMember;
document.addEventListener("DOMContentLoaded", function () {
  addMoveMember=  new TomSelect('#addMoveMember',{
      //设置可选最大值
      maxItems: 1,
      valueField: 'userId',
      labelField: 'name',
      searchField: 'name',
      // fetch remote data
      load: function(query, callback) {

          const options = {
              method: 'POST',
              headers: {
              'Content-Type': 'application/json',
              'token':localStorage.getItem('token')
              },
              body: JSON.stringify({ 'name': query }),
              };

              var url = baseUri+'/customer/ulfq';
          fetch(url,options)
              .then(response => response.json())
              .then(json => {
                var item = json.data.list;
      
                  callback(item);
              }).catch((error)=>{
                  callback();
              });

      },
      // custom rendering functions for options and items
      render: {
          option: function(item, escape) {
      return `<div><span class="dropdown-item-indicator"  >
      </span>${ escape(item.name) }</div>`;
  
              
          },
          item: function(item, escape) {
      return `<div><span class="dropdown-item-indicator"  >
      </span>${ escape(item.name) }</div>`;
  
          }
      },
  });
});

function moveCustomer(){
  if(addMoveMember.getValue()==null)return;
  const options = {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      'token':localStorage.getItem('token')
      },
      body: JSON.stringify({ 'appUserId': addMoveMember.getValue(),'customerId':$("#hidencsid").val()}),
      };
      var url = baseUri+'/customer/shiftCustomer';
  fetch(url,options)
      .then(response => response.json())
      .then(json => {
          // console.log(json)
          if(json.code==0){   
      showMessage(0,'成功！！')
          }
      }).catch((error)=>{
          console.log(error);
      });
      $('#movemember').modal('hide')
}

