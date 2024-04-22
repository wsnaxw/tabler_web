$(document).ready(function(){


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



    var pageSize = $('#pageSize').val();  

    let queryData = formCheck()
    queryData.pageNo = pageNo;
    queryData.pageSize = 10;

    console.log(queryData)


    $('#data').html('');


    $.ajax({
        headers:{
            'token':localStorage.getItem("token"),
            Accept:'application/json',
            'Content-Type':'application/json;charset=UTF-8'
        },
        dataType:'json',
        type:'post',
        url:baseUri+'/customer/cstList',
        data:JSON.stringify(queryData),
        success:function(obj){

            var str="";
            if(obj.data.list.length===0){
                $('.table-sort tbody').append("<tr class='text-c'><td colspan='4'>没有数据 !</td></tr>");
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

                    console.log(customerIcon)

                    console.log('level'+level)
                    console.log('level1'+level1)

                    var name = o.name+'';




                    var certification = o.certification+'';

                    var certification1 = '';

                    switch (certification) {
                        case "1":
                            certification1='<div class="avatar avatar-sm bg-red-lt" >是</div>';
                            break;
                        default:
                            certification1='<div class="avatar avatar-sm bg-red-lt" >否</div>';
                    }

                    var jobBeansNum = o.jobBeansNum+'';

                    var customerTeamBeans=o.customerTeamBeans;
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

                    if (customerTeamBeans===undefined || customerTeamBeans==='' ||customerTeamBeans==null)customerTeamBeans='无';
                    if (jobBeansNum==='0' )jobBeansNum='不限';
                    // if (com===undefined || com==='')com='暂无数据';


                    str+="<tr><td>"
                        +sourceType1+"</td><td>"
                        +vip1+level1+name+"</td><td>"
                        +certification1+"</td><td >"
                        +jobBeansNum+"</td><td >"
                        
                        +customerTeamBeans+"</td><td>"
                        +comName+"</td>" +
                        "<td>"+state1+"</td>" +
                        "<td>"+updateTime+"</td>" +
                        "<td>"+numbers+"</td>" +
                        "<td><a herf='#' onclick='checkDetail("+o.id+")' class ='btn'>查看</a><a herf='#' class='btn' onclick='move("+o.id+")'>转移</a></td>" +
                        "</tr>";
                }
                $('#data').html(str);
                //上一页页数
                var forward = pageNo-1;
                if(pageNo==1){
                    forward=1;
                }
                //下一页页数
                var backwards = pageNo+1;
                if(pageNo===obj.data.totalPage){
                    backwards=pageNo;
                }
                //添加首页/上一页按钮功能
                str="<a href='javascript:getPage(1);' id='forward' class='btn btn-hover radius'>首页</a><a onclick='getPage("+forward+");' id='lastPage' class='btn btn-hover radius'><span>上一页</span></a> ";
                var count = 0;//记录第一次循环页数按钮, 用来控制显示的按钮数不得超过5个
                var index = 0;//第二次循环页数
                var pages= pageNo;
                for(var i=1;i<=obj.data.totalPage;i++){
                    if(pageNo>1){
                        i=pageNo++;
                        index = count++;
                        if(index>4){
                            break;
                        }
                        if(i==pages){
                            str+="<a class='btn btn-hover' style='color: #fff;background-color: #5a98de;border-color: #5a98de;' href='javascript:getPage("+(i)+")'>"+(i)+"</a>"
                        }else{
                            str+="<a class='btn btn-hover' href='javascript:getPage("+i+")'>"+i+"</a>"
                        }
                    }else{
                        count++;
                        if(count>5){
                            count=0;
                            break;
                        }else{
                            if(i===pageNo){
                                str+="<a class='btn btn-hover' style='color: #fff;background-color: #5a98de;border-color: #5a98de;' href='javascript:getPage("+i+")'>"+i+"</a>"
                            }else{
                                str+="<a class='btn btn-hover' href='javascript:getPage("+i+")'>"+i+"</a>"
                            }
                        }
                    }
                }
                str+="<a onclick='getPage("+backwards+");' id='nextPage' class='btn btn-hover radius'><span>下一页</span></a><input type='text' value='' name='skip' id='skip' class='input-text' style='width:50px' data-options='required:false' onkeydown='if(event.keyCode==13){return false;}'/><a href='#' onclick='jump("+obj.data.totalPage+")' id='forward' class='btn btn-hover radius'>跳</a><a href='javascript:getPage("+obj.data.totalPage+");' id='forward' class='btn btn-hover radius'>尾页</a>";
                $("#DataTables_Table_0_info").html("显示"+pageSize+"条,总 条 数  "+obj.data.count+"共"+obj.data.totalPage+"页");
                $("#pageDiv").html(str)
                $("#count").html(obj.data.count);
                // $('#select111').html("<button class='btn btn-hover' onclick='getPage("+i+")'>查询</button>");

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


    console.log(data)

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