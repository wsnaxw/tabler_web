$(document).ready(function () {

    // var customerId = getParameterByName('customerId');



    // 输出树形结构以验证层级标记

    // console.log('customerId:'+customerId)
    //默认进行分页数据查询
    getPage(1);
   

        
    document.querySelectorAll('input[name="mystate"]').forEach(radio => {
      radio.addEventListener('change', function() {
        getPage(1);
      });
    });

    document.querySelectorAll('input[name="gender"]').forEach(radio => {
      radio.addEventListener('change', function() {
        getPage(1);
      });
    });




})


// 递归函数来构建子菜单  
function buildDropdownMenu(items, parent) {  
  items.forEach(item => {  
    var dropdownDiv = document.createElement('div');  
    
  
    var link = document.createElement('a');  

  
    var dropdownMenu = document.createElement('div');  
    dropdownMenu.classList.add('dropdown-menu');  
  
    if (item.children) {  

      dropdownDiv.classList.add('dropend');  

      link.classList.add('dropdown-item', 'dropdown-toggle');  
      link.setAttribute('data-bs-toggle', 'dropdown');  
      link.setAttribute('data-bs-auto-close', 'outside');  
      link.setAttribute('role', 'button');  
      link.setAttribute('value', item.value);  
      link.setAttribute('aria-expanded', 'false');  
      link.textContent = item.label;  
      
      buildDropdownMenu(item.children, dropdownMenu);  
      
    } else {  
      // 创建非嵌套的下拉菜单项  
      link.classList.add('dropdown-item');  
      link.setAttribute('onClick', 'chooseThis(this)');  
      link.setAttribute('value', item.value);  
      link.textContent = item.label;  
      dropdownMenu.appendChild(link);  
    }  
  
    dropdownDiv.appendChild(link); 
    dropdownDiv.appendChild(dropdownMenu);  
    parent.appendChild(dropdownDiv);  
  });  
}



function chooseThisCity(o){
  $('#cityinputshow').val($(o).text())
  $('#cityinputvalue').val($(o).attr('value'))

  $('#citymenu.show').removeClass('show');

}


function chooseThis(o){


  


  let str = '';

  var showLinks = $('a.show');


  if(showLinks.length>1){

    showLinks.each(function() {
  
      str +=   $(this).attr('value') + ' / '
  
  
    });
  
    str+=$(o).attr('value');
    $('#jobinput').val(str)
  }else{
    $('#jobinput').val(str)
  }

  $('#jobmenu.show').removeClass('show');


}









let plugins_icon = `<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="#2e76ea"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-settings"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" /><path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /></svg>`





function getPage(pageNo){




    arrowPageNo=pageNo;
    let queryData = formCheck()

    let exturl = 'myTalentList';

    if(queryData.mystate!=null&&queryData.mystate==1){
      exturl = 'myTalentUpdateList'
    }




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
        url:baseUri+'/talent/'+exturl,
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
                  
                    let gender = '';

                    if(o.gender==1){
                      gender = male_icon;
                    }else if (o.gender==2){
                      gender = female_icon;
                    }

                    let exEdu =``;

                    
                    

               
                    if(o.experienceEdus){
                      o.experienceEdus.forEach((value,index)=>{

                        let backgroundColor = index % 2 === 0 ?'#ffffff': '#f0f0f0'  ;
                        exEdu+= `<div style="background-color: ${backgroundColor};padding: 2px">${toStr(value.startTime)} - ${toStr(value.endTime)} | ${value.name} | ${value.classes} | ${value.education}</div>`;
                      })
                    }


                    let exCom = ``;

                    if(o.experienceCompanies){
                      o.experienceCompanies.forEach((value,index)=>{
                        let endTime = value.endTime;

                        if(value.isNow == 1 && endTime==null){
                          endTime = '至今'
                        }

                        let backgroundColor = index % 2 === 0 ?'#ffffff': '#f0f0f0'  ;

                        exCom += `<div style="background-color: ${backgroundColor};padding: 2px">${toStr(value.startTime)} - ${toStr(endTime)} | <span>${value.name}</span> | ${checkAndCutString(value.job)}</div>`;
                      


                      })
                    }

                    let plugins = ``;

                    if(o.source != 0 ){
                      plugins = plugins_icon;
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





// style="font-weight: bold;

                    str+=
                    `
                    <tr  id=${i} onclick="clickable(this)"   "> 
                        <td name='firsticon'>${icon_right}</td>
                        <td > ${gender}${o.name}</td>
                        <td >${toStr(o.age)}岁</td>    
                        <td >${toStr(edu)}</td>
                        <td >${toStr(o.experience)}</td>    
                        <td >${toStr(o.location)}</td>
                        <td >${toStr(o.lastCompany)}</td>
                        <td >${checkAndCutString(o.job)}</td>      
                        <td >${toStr(o.userName)}  ${plugins}</td>
                        <td >${toStr(o.updateTime)}</td>    
                        <td ><a  onclick='checkDetail("${o.talentId}")' class ='btn'>查看</a><a  class='btn' onclick='join("${o.talentId}")'>加入项目</a></td>
                        
                      </tr>
                      <tr name="${i}" class="hidden-row">
                            <td colspan="11">
                              <div class="row ">
                    
                                <div class="col-lg-5 text-truncate">
                                  <address >
                                    ${exEdu}
                                  </address>
                                </div>
                  
                             
                                <div class="col-lg-5">
                                  <address>
                                     ${exCom}
                                  </address>
                                </div>
                              </div>
                            </td>
                           
                          </tr>
                    `
    



                    











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


function checkAndCutString(str) {
  if(str == null) return "";
  if (str.length > 10) {
    return str.substring(0, 10);
  } else {
    return str;
  }
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


function checkDetail(id){
    //跳转页面并且携带参数

    let bigNumber = BigInt(id);
    let workId = bigNumber.toString(); // 转换为字符串


// 创建一个新的URL，携带参数
var url = 'detail.html?workId=' + encodeURIComponent(workId)+'' ;

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

let icon_right = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-big-right-lines">
  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M12 9v-3.586a1 1 0 0 1 1.707 -.707l6.586 6.586a1 1 0 0 1 0 1.414l-6.586 6.586a1 1 0 0 1 -1.707 -.707v-3.586h-3v-6h3z" />
  <path d="M3 9v6" />
  <path d="M6 9v6" />
</svg>`
let icon_down = `<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-big-down-lines"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 12h3.586a1 1 0 0 1 .707 1.707l-6.586 6.586a1 1 0 0 1 -1.414 0l-6.586 -6.586a1 1 0 0 1 .707 -1.707h3.586v-3h6v3z" /><path d="M15 3h-6" /><path d="M15 6h-6" /></svg>`
function clickable(obj){
  let name = $(obj).attr('id')
  $('tr[name="'+name+'"]').toggleClass('show')
  if($('tr[name="'+name+'"].show').length>0){
    $(obj).find('td[name="firsticon"]').html(icon_down);
  }else{
    $(obj).find('td[name="firsticon"]').html(icon_right);
  }
}





document.addEventListener("DOMContentLoaded", function () {
  tomselect = new TomSelect('#addProject',{
      valueField: 'projectId',
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

              var url = baseUri+'/project/selectPForJohn';
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
      </span>${ escape(item.name) } - ${item.customerName}</div>`;
  
              
          },
          item: function(item, escape) {
      return `<div><span class="dropdown-item-indicator"  >
      </span>${ escape(item.name) } - ${item.customerName}</div>`;
  
          }
      },
      onInitialize: function() {
        this.clearOptions(); // 清空初始选项
        this.load(''); // 传入空字符串以加载所有选项或基于默认查询
      },
  });
});



function addProject(){


  let projectid ='' ;

  if( tomselect.items !=null&&tomselect.getValue()!=''){


    projectid=tomselect.getValue();
  }
  var data={'talentId':currentId,'projectId':projectid};


  const options = {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      'token':localStorage.getItem('token')
      },
      body: JSON.stringify(data),
  };

      var url = baseUri+'/talent/talentJoinProject';
  fetch(url,options)
      .then(response => response.json())
      .then(json => {

         
        if(json.code==0){
                
          showMessage(0,'加入成功')
  
          window.open("my-list.html", '_blank');
  
              }else{
                  showMessage(1,json.message)
              }
  



      }).catch((error)=>{
          console.log(error)
        
      });

  


}


let currentId;

function join(talentId){

  currentId = talentId;

  $("#joinmodal").modal('show')



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