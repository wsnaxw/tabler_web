
$(function(){



    getPage(1);




})
















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
        url:baseUri+'/talent/selectMyRecommend',
        data:JSON.stringify(queryData),
        success:function(obj){

            var str="";
            if(obj.data.list.length===0){
                $('.table-sort tbody').append("<tr class='text-c'><td colspan='10'>没有数据 !</td></tr>");
                $('#pageSelect').html('');
                $('#totalPageNum').html(0);
                $('#totalPageNum1').html(0);
            }else{




              









                // $("#countsss").css("display","");
                for(var i =0;i<obj.data.list.length;i++){

                    var o = obj.data.list[i];



                    let isNeedAlternate = '否';
                    let alternate = '无'
                    if(o.isNeedAlternate==1){
                      alternate = `<a onclick="checkDetail(1,'${o.alternateTalentId}')">${toStr(o.alternateTalentName)}</a>`;
                      isNeedAlternate = '是';
                    }
                    

                    let state = '';
                    switch (o.state) {
                      case 0:
                        state = '加项目';
                        break;
                      case 1:
                        state = '给客户';
                        break;
                      case 5:
                        state = '约面试';
                        break;
                      case 6:
                        state = '客户面试';
                        break;
                      case 8:
                        state = '确认offer';
                        break;
                      case 9:
                        state = '已入职';
                        break;
                      case 10:
                        state = '人选离职';
                        break;
                      case 4:
                        state = '放弃人选';
                        break;
                      default:
                        state = '加项目';
                    }


                    let operate = ``;

                    switch (o.state) {
                        case 0:
                            operate=`
                                    <a class="btn btn-teal btn-sm" onclick="operateTgkh('${o.talentId}','${o.id}')">
                                        推给客户
                                    </a>
                                    <a class="btn btn-danger btn-sm" onclick="operateAbandon('${o.talentId}','${o.id}')">
                                        放弃人选
                                    </a>
                                    `;
                            break;
                        case 1:
                            operate=`
                                    <a class="btn btn-yellow btn-sm" onclick="operateYyms('${o.talentId}','${o.id}')">
                                        预约面试
                                    </a>
                                    <a class="btn btn-danger btn-sm" onclick="operateAbandon('${o.talentId}','${o.id}')">
                                        放弃人选
                                    </a>
                                    `;
                            break;
                        case 5:
                            operate=`
                                    <a class="btn btn-yellow btn-sm" onclick="operateYyms('${o.talentId}','${o.id}')">
                                        预约面试
                                    </a>
                                    <a class="btn btn-orange btn-sm" onclick="operateKhms('${o.talentId}','${o.id}')">
                                        客户面试
                                    </a>
                                    <a class="btn btn-danger btn-sm" onclick="operateAbandon('${o.talentId}','${o.id}')">
                                        放弃人选
                                    </a>
                                    `;
                            break;
                        case 6:
                            operate=`
                                    <a class="btn btn-yellow btn-sm" onclick="operateYyms('${o.talentId}','${o.id}')">
                                        预约面试
                                    </a>
                                    <a class="btn btn-success btn-sm" onclick="operateOffer('${o.talentId}','${o.id}')">
                                        确认offer
                                    </a>
                                    <a class="btn btn-danger btn-sm" onclick="operateAbandon('${o.talentId}','${o.id}')">
                                        放弃人选
                                    </a>
                                    `;
                        break;  
                        case 8:
                            operate=`
                                    <a class="btn btn-primary btn-sm" onclick="operateOffer('${o.talentId}','${o.id}')">
                                        确认入职
                                    </a>
                                    <a class="btn btn-danger btn-sm" onclick="operateAbandon('${o.talentId}','${o.id}')">
                                        放弃人选
                                    </a>
                                    `;
                        break; 
                        case 9:
                            operate=`
                                    <a class="btn btn-secondary btn-sm" onclick="operateOffer('${o.talentId}','${o.id}')">
                                        人选离职
                                    </a>
                                    <a class="btn btn-danger btn-sm" onclick="operateAbandon('${o.talentId}','${o.id}')">
                                        放弃人选
                                    </a>
                                    `;
                        break;                
                        default:
                            operate='' ;
                    }
            










                  






                    str+= `<tr>
                    <td><span style='font-weight: bold;' class ='bg-primary-lt'><a onclick="checkDetail(1,'${o.talentId}')">${o.talentName}</a></span></td>
                    <td>${o.comName}</td>
                    <td><span style='font-weight: bold;' class ='bg-primary-lt'><a onclick='checkDetail(2,"${o.customerId}")'>${o.customerName}</a></span></td>
                    <td><span style='font-weight: bold;' class ='bg-primary-lt'><a onclick='checkDetail(3,"${o.projectId}")'>${o.projectName}</a></span></td>
                    <td>${state}</td>
                    <td>${alternate}</td>
                    <td>${isNeedAlternate}</td>

                    <td>${o.createTime}</td>
                    <td>${operate}</td>`
                    
          



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




  const divElement = document.getElementById("formdata");


  // 使用querySelectorAll选择div内的所有input元素
  const elements = divElement.querySelectorAll('select, input');
  // 存储获取到的值的对象
  const values = {};

  elements.forEach((element) => {
    // 获取元素的name属性作为键
    const name = element.name || element.id || element.tagName.toLowerCase();
    // 获取元素的值
    const value = element.value;
    // 将值存储到values对象中
   

    if(element.type=='checkbox'||element.type=='radio'){
      if(element.checked){
        values[name] = value;
      }
      
    }else{
      values[name] = value;
    }
    

  });

console.log(values)






    let data = cleanseJSON(values);


    // console.log(data)

    return data;

}

function clearForm(){

    $('#formdata input[type="checkbox"], #formdata select, #formdata input[type="text"],#formdata input[type="number"],#formdata input[type="hidden"],#formdata input[type="radio"]').each(function() {
        // 将这些元素的值设置为空
        $(this).val('');
        // 对于checkbox，还需要取消选中状态
        if ($(this).is('input[type="checkbox"]')||$(this).is('input[type="radio"]')) {
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



function searchList(){
    getPage(1)
}


function checkDetail(type,id){
    //跳转页面并且携带参数

    let bigNumber = BigInt(id);
    let workId = bigNumber.toString(); // 转换为字符串

    let url ;
    if(type==1){
       url = 'detail.html?workId=' + encodeURIComponent(workId)+'' ;
              
        window.open(url, '_blank');
    }else if (type==2){
      url = '../customer/cusd.html?customerId=' + encodeURIComponent(workId)+'' ;

            
      window.open(url, '_blank');
    } else if (type==3){
      url = '../project/prod.html?workId=' + encodeURIComponent(workId)+'' ;

      window.open(url, '_blank');
      
    }





// 创建一个新的URL，携带参数
// var url = 'prod.html?workId=' + encodeURIComponent(workId)+'' ;

// 使用jQuery来跳转到新页面
// window.location.href = url;


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



