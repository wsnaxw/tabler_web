
$(function(){



    getPage(1);


    document.querySelectorAll('input[name="state"]').forEach(radio => {
      radio.addEventListener('change', function() {
        getPage(1);
      });
    });


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
                                    <a class="btn btn-teal btn-sm" onclick="operateTgkh('${o.projectId}','${o.id}')">
                                        推给客户
                                    </a>
                                    <a class="btn btn-danger btn-sm" onclick="operateAbandon('${o.projectId}','${o.id}')">
                                        放弃人选
                                    </a>
                                    `;
                            break;
                        case 1:
                            operate=`
                                    <a class="btn btn-yellow btn-sm" onclick="operateYyms('${o.projectId}','${o.id}')">
                                        预约面试
                                    </a>
                                    <a class="btn btn-danger btn-sm" onclick="operateAbandon('${o.projectId}','${o.id}')">
                                        放弃人选
                                    </a>
                                    `;
                            break;
                        case 5:
                            operate=`
                                    <a class="btn btn-yellow btn-sm" onclick="operateYyms('${o.projectId}','${o.id}')">
                                        预约面试
                                    </a>
                                    <a class="btn btn-orange btn-sm" onclick="operateKhms('${o.projectId}','${o.id}')">
                                        客户面试
                                    </a>
                                    <a class="btn btn-danger btn-sm" onclick="operateAbandon('${o.projectId}','${o.id}')">
                                        放弃人选
                                    </a>
                                    `;
                            break;
                        case 6:
                            operate=`
                                    <a class="btn btn-yellow btn-sm" onclick="operateYyms('${o.projectId}','${o.id}')">
                                        预约面试
                                    </a>
                                    <a class="btn btn-success btn-sm" onclick="operateOffer('${o.projectId}','${o.id}')">
                                        确认offer
                                    </a>
                                    <a class="btn btn-danger btn-sm" onclick="operateAbandon('${o.projectId}','${o.id}')">
                                        放弃人选
                                    </a>
                                    `;
                        break;  
                        case 8:
                            operate=`
                                    <a class="btn btn-primary btn-sm" onclick="operateWork('${o.projectId}','${o.id}')">
                                        确认入职
                                    </a>
                                    <a class="btn btn-danger btn-sm" onclick="operateAbandon('${o.projectId}','${o.id}')">
                                        放弃人选
                                    </a>
                                    `;
                        break; 
                        case 9:
                            operate=`
                                    <a class="btn btn-secondary btn-sm" onclick="operateLeave('${o.projectId}','${o.id}')">
                                        人选离职
                                    </a>
                                    <a class="btn btn-danger btn-sm" onclick="operateAbandon('${o.projectId}','${o.id}')">
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





function operateTgkh(projectId,id){




  $("#operatediv").html(`              <div class="modal-header">
              <h5 class="modal-title">推给客户</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">

              <label class="form-label"  style="font-weight: bold;">备注信息</label>

              <div class="input-group input-group-flat">
                <textarea rows="3" class="form-control" name="remark"></textarea>

              </div>  
              <input type="hidden" name="id" value="${id}">
              <input type="hidden" name="projectId" value="${projectId}">
               
             
            </div>
            <div class="modal-footer">
              <button type="button" class="btn me-auto" data-bs-dismiss="modal">取消</button>
              <button type="button" class="btn btn-primary" onclick="tgkh()" >确定</button>
            </div>`)




  $("#operate-modal").modal('show')
}

function tgkh(){
  var data = {};

    // 获取operatediv元素内部所有input和textarea元素
    $('#operatediv input, #operatediv textarea').each(function () {
      var name = $(this).attr('name');
      var value = $(this).val();
      if (name) {  // 只收集有name属性的input和textarea
          data[name] = value;
      }
    });
    $("#operate-modal").modal('hide')
    const options = {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      'token':localStorage.getItem('token')
      },
      body: JSON.stringify(data),
      };
      var url = baseUri+'/project/recommendTalent';
  fetch(url,options)
      .then(response => response.json())
      .then(json => {
          showMessage(json.code)
          getPage(1);
      }).catch((error)=>{            
      });
}


function operateYyms(projectId,id){



  $("#operatediv").html(`<div class="modal-header">
              <h5 class="modal-title">预约面试</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">


              <div class="card-body">

                <div class="row mb-3">
                  <dt  class="col-3">面试类型</dt>
                  <dl class="col-9">
                    <select class="form-select"  name="way">
                      <option selected value="1">线上面试</option>
                      <option  value="0">线下面试</option>
                    </select>
                  </dl>

                
                </div>

                <div class="row mb-3">
                  <dt  class="col-3">面试时间</dt>
                  <dl class="col-3">
                    <select class="form-select"  name="type">
                      <option selected value="0">初试</option>
                      <option  value="1">复试</option>
                      <option  value="2">终试</option>
                    </select>
                  </dl>
                  <dl class="col-6 input-icon">
                    <input type="text" class="form-control dateinput dateicon je-mr25" name="time" id="mstime" autocomplete="off">
                  <span class='input-icon-addon'><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-calendar-month"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" /><path d="M16 3v4" /><path d="M8 3v4" /><path d="M4 11h16" /><path d="M7 14h.013" /><path d="M10.01 14h.005" /><path d="M13.01 14h.005" /><path d="M16.015 14h.005" /><path d="M13.015 17h.005" /><path d="M7.01 17h.005" /><path d="M10.01 17h.005" /></svg></span>

                  </dl>
                </div>
              </div>

              <div class="row mb-3">
                <dt  class="col-3">面试地点</dt>
                <dl class="col-9">
                  <input type="text" class="form-control" name="address">
                </dl>

              </div>

              <div class="row mb-3">
                <dt  class="col-3">备注信息</dt>
                <dl class="col-9">
                  <textarea rows="5" class="form-control"  name="remark"></textarea>
                </dl>

              </div>

             <input type="hidden" name="id" value="${id}">
              <input type="hidden" name="projectId" value="${projectId}">
               
             
            </div>
            <div class="modal-footer">
              <button type="button" class="btn me-auto" data-bs-dismiss="modal">取消</button>
              <button type="button" class="btn btn-primary" onclick="yyms()" >确定</button>
            </div>`)




  jeDate("#mstime",{
      theme:{bgcolor:"#4cc9f0",pnColor:"#00CCFF"},
      format: "YYYY-MM-DD hh:mm:ss"
  });
  
  $("#operate-modal").modal('show')
}

function yyms(){


    var data = {};

    // 获取operatediv元素内部所有input和textarea元素
    $('#operatediv input, #operatediv textarea,#operatediv select').each(function () {
      var name = $(this).attr('name');
      var value = $(this).val();
      if (name) {  // 只收集有name属性的input和textarea
          data[name] = value;

      }
    });
    $("#operate-modal").modal('hide')
    const options = {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      'token':localStorage.getItem('token')
      },
      body: JSON.stringify(data),
      };
      var url = baseUri+'/project/interview';
  fetch(url,options)
      .then(response => response.json())
      .then(json => {
          showMessage(json.code)
          getPage(1);
      }).catch((error)=>{            
      });

}




function operateKhms(projectId,id){




  $("#operatediv").html(`              <div class="modal-header">
              <h5 class="modal-title">客户面试</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">

              <label class="form-label"  style="font-weight: bold;">备注信息</label>

              <div class="input-group input-group-flat">
                <textarea rows="3" class="form-control" name="remark"></textarea>

              </div>  
              <input type="hidden" name="id" value="${id}">
              <input type="hidden" name="projectId" value="${projectId}">
               
             
            </div>
            <div class="modal-footer">
              <button type="button" class="btn me-auto" data-bs-dismiss="modal">取消</button>
              <button type="button" class="btn btn-primary" onclick="khms()" >确定</button>
            </div>`)




  $("#operate-modal").modal('show')
}

function khms(){
  var data = {};

    // 获取operatediv元素内部所有input和textarea元素
    $('#operatediv input, #operatediv textarea').each(function () {
      var name = $(this).attr('name');
      var value = $(this).val();
      if (name) {  // 只收集有name属性的input和textarea
          data[name] = value;
      }
    });
    // console.log(JSON.stringify(data));
    $("#operate-modal").modal('hide')
    const options = {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      'token':localStorage.getItem('token')
      },
      body: JSON.stringify(data),
      };
      var url = baseUri+'/project/customerInterview';
  fetch(url,options)
      .then(response => response.json())
      .then(json => {
          showMessage(json.code)
          getPage(1);
      }).catch((error)=>{            
      });
}


function operateOffer(projectId,id){

  $("#operatediv").html(` 
            <div class="modal-header">
              <h5 class="modal-title">确认offer</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">


              <div class="card-body">

               

                <div class="row mb-3">
                  <div class="col-6">
                    <label class="form-label required" style="font-weight: bolder;">offer时间</label>
                    <div class="input-group input-group-flat">
                    
                      <input type="text" class="form-control dateinput dateicon je-mr25" name="offerDate" id="offertime" autocomplete="off">
                      <span class='input-group-text'><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-calendar-month"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" /><path d="M16 3v4" /><path d="M8 3v4" /><path d="M4 11h16" /><path d="M7 14h.013" /><path d="M10.01 14h.005" /><path d="M13.01 14h.005" /><path d="M16.015 14h.005" /><path d="M13.015 17h.005" /><path d="M7.01 17h.005" /><path d="M10.01 17h.005" /></svg></span>

                      <div class="invalid-feedback">不能为空！</div>

                    </div>
                  </div>
                  <div class="col-6">
                    <label class="form-label required" style="font-weight: bolder;">入职时间</label>
                    <div class="input-group input-group-flat">
                      <input type="text" class="form-control dateinput dateicon je-mr25" name="workDate" id="rztime" autocomplete="off">
                      <span class='input-group-text'><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-calendar-month"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" /><path d="M16 3v4" /><path d="M8 3v4" /><path d="M4 11h16" /><path d="M7 14h.013" /><path d="M10.01 14h.005" /><path d="M13.01 14h.005" /><path d="M16.015 14h.005" /><path d="M13.015 17h.005" /><path d="M7.01 17h.005" /><path d="M10.01 17h.005" /></svg></span>
                      <div class="invalid-feedback">不能为空！</div>
                    </div>
                  </div>
                </div>

                
                <div class="row mb-3" >
                  <div class="col-4">
                    <label class="form-label required" style="font-weight: bolder;">年薪</label>
                    <div class="input-group input-group-flat">
                      <input type="text" class="form-control" name="salary" autocomplete="off">
                      <span class="input-group-text">
                        <kbd>万</kbd>
                      </span>
                      <div class="invalid-feedback">不能为空！</div>
                    </div>
                  </div>
                  <div class="col-4">
                    <label class="form-label" style="font-weight: bolder;">预收服务费</label>
                    <div class="input-group input-group-flat">
                      <input type="text" class="form-control" name="needPayment" autocomplete="off">
                      <span class="input-group-text">
                        <kbd>元</kbd>
                      </span>
                    </div>
                  </div>
                  <div class="col-4">
                    <label class="form-label required" style="font-weight: bolder;">保用期</label>
                    <div class="input-group input-group-flat">
                      <input type="number" class="form-control" name="quot" value='6' autocomplete="off">
                      <span class="input-group-text">
                        <kbd>月</kbd>
                      </span>
                      <div class="invalid-feedback">不能为空！</div>
                    </div>
                  </div>
                </div>


                <div class="mb-3">
                  <div class="form-label" style="font-weight: bolder;">收费方式</div>
                  <div>
                    <label class="form-check form-check-inline">
                      <input class="form-check-input" type="radio" name="chargeWay" checked="" value="0">
                      <span class="form-check-label">按固定比例收费</span>
                    </label>
                    <label class="form-check form-check-inline">
                      <input class="form-check-input" type="radio" name="chargeWay" value="1">
                      <span class="form-check-label">按固定金额收费</span>
                    </label>
                    
                  </div>
                </div>
       
         
                
                <div class="row ">
                  <dt  class="col-3 required">税率</dt>
                  <dl class="col-9">
                    <select class="form-select"  name="feeRate">
                      <option  value="0%">0%</option>
                      <option  value="1%">1%</option>
                      <option selected  value="3%">3%</option>
                      <option  value="6%">6%</option>
                    </select>
                  </dl>
                </div>

                <div class="row mb-3" >
                  <div class="col-6" >
                    <label class="form-label required" style="font-weight: bolder;">固定比例</label>
                    <div class="input-group" >
                      <input type="text" class="form-control" name="rate" value='20' autocomplete="off"  >
                      <span class="input-group-text" >
                        %
                      </span>
                      <div class="invalid-feedback">不能为空！</div>
                    </div>
                  </div>
                  <div class="col-6">
                    <label class="form-label required" style="font-weight: bolder;">固定金额</label>
                    <div class="input-group">
                      <input type="text" class="form-control" name="ration" autocomplete="off" disabled>
                      <span class="input-group-text">
                        元
                      </span>
                      <div class="invalid-feedback">不能为空！</div>
                    </div>
                  </div>
                  
                </div>


                <div class="row mb-3">
                  <label class="form-label" style="font-weight: bolder;">备注</label>
                  <textarea rows="5" class="form-control" placeholder="Here can be your description" name="remark"></textarea>
                </div>
              <input type="hidden" name="id" value="${id}">
              <input type="hidden" name="projectId" value="${projectId}">
            </div>
            <div class="modal-footer">
              <button type="button" class="btn me-auto" data-bs-dismiss="modal">取消</button>
              <button type="button" class="btn btn-primary" onclick="offer()" >确定</button>
            </div>
          `)






  jeDate("#offertime",{
      theme:{bgcolor:"#4cc9f0",pnColor:"#00CCFF"},
      format: "YYYY-MM-DD"
  });

  
  jeDate("#rztime",{
      theme:{bgcolor:"#4cc9f0",pnColor:"#00CCFF"},
      format: "YYYY-MM-DD"
  });





  const radios = document.querySelectorAll('input[name="chargeWay"]');

      // 为每个单选按钮添加'change'事件监听器
      radios.forEach(radio => {
          radio.addEventListener('change', function() {
              // 检查选中的单选按钮的值
              if (this.value === '0') {

                  $("input[name='rate']").prop('disabled',false);

                  $("input[name='ration']").prop('disabled',true);
                  

              } else if (this.value === '1') {
                  $("input[name='rate']").prop('disabled',true);

                  $("input[name='ration']").prop('disabled',false);
              }
          });
      });








  
  $("#operate-modal").modal('show')
}


function offer(){



  let data = offerformcheck();



  if(data.check){

    $("#operate-modal").modal('hide')
    const options = {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      'token':localStorage.getItem('token')
      },
      body: JSON.stringify(data),
      };
      var url = baseUri+'/project/sendOffer';
      fetch(url,options)
      .then(response => response.json())
      .then(json => {
          showMessage(json.code)
          getPage(1);
      }).catch((error)=>{            
      });
  }




}

function offerformcheck(){


  let check =true;
  
  const divElement = document.getElementById("operatediv");


  // 使用querySelectorAll选择div内的所有input元素
  const elements = divElement.querySelectorAll('select, input,textarea');
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


  var inputElements = divElement.querySelectorAll('input:not([disabled])');
  // console.log(inputElements)
  inputElements.forEach(function(input) {
      input.classList.remove('is-valid', 'is-invalid','is-valid-lite','is-invalid-lite');
      if(input.name == 'offerDate'||input.name =='workDate'||input.name =='salary'||input.name =='quot'){
          input.classList.remove('is-valid', 'is-invalid','is-valid-lite','is-invalid-lite');
          if (values[input.name]==undefined||values[input.name].trim() == '') {
              input.classList.add('is-invalid');
              input.classList.add('is-invalid-lite');
              check=false;

            }
      }

      if(values['chargeWay']=='0'&&input.name == 'rate'){

          if (values[input.name]==undefined||values[input.name].trim() == '') {
              input.classList.add('is-invalid');
              input.classList.add('is-invalid-lite');
              check=false;

            }
      }else if(values['chargeWay']=='1'&&input.name == 'ration'){
          if (values[input.name]==undefined||values[input.name].trim() == '') {
              input.classList.add('is-invalid');
              input.classList.add('is-invalid-lite');
              check=false;

            }
      }









  })





  values.check=check;

  return values;
}




function operateWork(projectId,id){




  $("#operatediv").html(`              <div class="modal-header">
              <h5 class="modal-title">确认入职</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">

              <label class="form-label"  style="font-weight: bold;">备注信息</label>

              <div class="input-group input-group-flat">
                <textarea rows="3" class="form-control" name="remark"></textarea>

              </div>  
              <input type="hidden" name="id" value="${id}">
              <input type="hidden" name="projectId" value="${projectId}">
               
             
            </div>
            <div class="modal-footer">
              <button type="button" class="btn me-auto" data-bs-dismiss="modal">取消</button>
              <button type="button" class="btn btn-primary" onclick="qrrz()" >确定</button>
            </div>`)




  $("#operate-modal").modal('show')
}

function qrrz(){
  var data = {};

    // 获取operatediv元素内部所有input和textarea元素
    $('#operatediv input, #operatediv textarea').each(function () {
      var name = $(this).attr('name');
      var value = $(this).val();
      if (name) {  // 只收集有name属性的input和textarea
          data[name] = value;
      }

      
    });
    $("#operate-modal").modal('hide')
    const options = {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      'token':localStorage.getItem('token')
      },
      body: JSON.stringify(data),
      };
      var url = baseUri+'/project/confirmOffer';
  fetch(url,options)
      .then(response => response.json())
      .then(json => {
          showMessage(json.code)
          getPage(1);
      }).catch((error)=>{            
      });
}





function operateLeave(projectId,id){




  $("#operatediv").html(`              <div class="modal-header">
              <h5 class="modal-title">人选离职</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">

                <div class="mb-3">
                  <div class="form-label" style="font-weight: bolder;">是否过保</div>
                  <div>
                    <label class="form-check form-check-inline">
                      <input class="form-check-input" type="radio" name="chargeWay" checked="" value="0">
                      <span class="form-check-label">保内</span>
                    </label>
                    <label class="form-check form-check-inline">
                      <input class="form-check-input" type="radio" name="chargeWay" value="1">
                      <span class="form-check-label">保外</span>
                    </label>
                    
                  </div>
                </div>
       

              <label class="form-label"  style="font-weight: bold;">备注信息</label>

              <div class="input-group input-group-flat">
                <textarea rows="3" class="form-control" name="remark"></textarea>

              </div>  
              <input type="hidden" name="id" value="${id}">
              <input type="hidden" name="projectId" value="${projectId}">
               
             
            </div>
            <div class="modal-footer">
              <button type="button" class="btn me-auto" data-bs-dismiss="modal">取消</button>
              <button type="button" class="btn btn-primary" onclick="leave()" >确定</button>
            </div>`)




  $("#operate-modal").modal('show')
}

function leave(){
  var data = {};

    // 获取operatediv元素内部所有input和textarea元素
    $('#operatediv input[type="radio"]:checked, #operatediv textarea,#operatediv input[type="hidden"]').each(function () {
      var name = $(this).attr('name');
      var value = $(this).val();
      if (name) {  // 只收集有name属性的input和textarea
          data[name] = value;
      }
    });
    $("#operate-modal").modal('hide')
    const options = {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      'token':localStorage.getItem('token')
      },
      body: JSON.stringify(data),
      };
      var url = baseUri+'/project/quitWork';
  fetch(url,options)
      .then(response => response.json())
      .then(json => {
          showMessage(json.code);
          getPage(1);
  
      }).catch((error)=>{            
      });
}



function operateAbandon(projectId,id){




  $("#operatediv").html(`  <div class="modal-header">
              <h5 class="modal-title">放弃人选</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">

           
       

              <label class="form-label"  style="font-weight: bold;">备注信息</label>

              <div class="input-group input-group-flat">
                <textarea rows="3" class="form-control" name="remark"></textarea>

              </div>  
              <input type="hidden" name="id" value="${id}">
              <input type="hidden" name="projectId" value="${projectId}">
               
             
            </div>
            <div class="modal-footer">
              <button type="button" class="btn me-auto" data-bs-dismiss="modal">取消</button>
              <button type="button" class="btn btn-primary" onclick="abandon()" >确定</button>
            </div>`)




  $("#operate-modal").modal('show')
}

function abandon(){
  var data = {};

    // 获取operatediv元素内部所有input和textarea元素
    $('#operatediv input, #operatediv textarea').each(function () {
      var name = $(this).attr('name');
      var value = $(this).val();
      if (name) {  // 只收集有name属性的input和textarea
          data[name] = value;
      }
    });
    $("#operate-modal").modal('hide')
    const options = {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      'token':localStorage.getItem('token')
      },
      body: JSON.stringify(data),
      };
      var url = baseUri+'/project/talentGiveUp';
  fetch(url,options)
      .then(response => response.json())
      .then(json => {
          showMessage(json.code)
          getPage(1);
      }).catch((error)=>{            
      });
}


function showMessage(type,text) {
  const messageElement = document.createElement('div');
  if(type==0||type==='success'){
      messageElement.className = 'message visible alert alert-success';
      if(text==null)text='成功！！！';

      messageElement.textContent = text;
  }else if(type==1||type==='fail'){
      messageElement.className = 'message visible alert alert-warning';
      if(text==null)text='失败！！！';

      messageElement.textContent = text;
  }else if(type==2||type==='error'){
      messageElement.className = 'message visible alert alert-warning';
      if(text==null)text='异常！！！';

      messageElement.textContent = text;
  }else if(type==9||type==='error'){
      messageElement.className = 'message visible alert alert-warning';
      if(text==null)text='请规范操作！！！';

      messageElement.textContent = text;
  }else{
      messageElement.className = 'message visible alert alert-info';
      if(text==null)text='已操作！！！';

      messageElement.textContent = text;
  }



  // Create the message element



  // Append the message to the container
  const messageContainer = document.getElementById('messageContainer');
  messageContainer.appendChild(messageElement);

  // Remove the message after a while
  setTimeout(() => {
      messageElement.classList.remove('visible');
      setTimeout(() => {
          messageContainer.removeChild(messageElement);
      }, 300); // Remove from DOM after the opacity transition ends
  }, 3000); // Display the message for 3 seconds
}