
$(function(){


    // var customerId = getParameterByName('customerId');



    // 输出树形结构以验证层级标记

    // console.log('customerId:'+customerId)
    //默认进行分页数据查询
    getPage(1);





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



  obj2 = getUrlParams();
  arrowPageNo=pageNo;

    let queryData = formCheck()
    queryData.pageNo = pageNo;
    queryData.pageSize = 10;

    // console.log(queryData)


    const mergedObj = {};
    for (const key in obj2) {
        mergedObj[key] = obj2[key];
    }

    for (const key in queryData) {
      mergedObj[key] = queryData[key];
    }
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
        url:baseUri+'/talent/selectTalentList',
        data:JSON.stringify(mergedObj),
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
                        <td ><a herf='#' onclick='checkDetail("${o.talentId}")' class ='btn'>查看</a><a herf='#' class='btn' onclick='join("${o.talentId}")'>加入项目</a></td>
                        
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


                const pageCount = obj.data.count;
            const totalPage = obj.data.totalPage;
            $('#totalPageNum').html(pageCount);
            $('#totalPageNum1').html(totalPage);

            // 生成分页按钮
            const paginationHTML = generatePagination(pageNo, totalPage);
            $('#pageSelect').html(paginationHTML);
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

function join(id){
  
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