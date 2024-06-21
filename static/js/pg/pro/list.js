
$(function(){


    // var customerId = getParameterByName('customerId');



    // 输出树形结构以验证层级标记

    // console.log('customerId:'+customerId)
    //默认进行分页数据查询
    getPage(1);


    const provinces = cn.getProvinces()

    console.log(cn.getPrefectures('100000'))


    const citydiv = document.getElementById("citydiv");  
    citydiv.innerHTML = '';  


    provinces.forEach(province=>{
      const citys = cn.getPrefectures(province.code)


      if(citys.length>0){
        var dd = document.createElement('div');  
        dd.classList.add('dropend');  
        const link = document.createElement('a');  
        link.classList.add('dropdown-item', 'dropdown-toggle');  
        link.setAttribute('data-bs-toggle', 'dropdown');  
        link.setAttribute('data-bs-auto-close', 'outside');  
        link.setAttribute('role', 'button');  
        link.setAttribute('aria-expanded', 'false');  
        link.textContent = province.name;  
        dd.appendChild(link);  
        citydiv.appendChild(dd); 
        var dd22 = document.createElement('div');  
        dd22.classList.add('dropdown-menu');  

        

        citys.forEach(city=>{  
           const link = document.createElement('a');  
            link.classList.add('dropdown-item');  
            link.setAttribute('onClick', 'chooseThisCity(this)');  
            link.setAttribute('value', city.code);  
            link.textContent = city.name;         
            dd22.appendChild(link); 
          })

          dd.appendChild(dd22)



      }else{
        const link = document.createElement('a');  
        link.classList.add('dropdown-item');  
        link.setAttribute('onClick', 'chooseThisCity(this)');  
        link.setAttribute('value', province.code);  
        link.textContent = province.name;  
        citydiv.appendChild(link); 


      }







    })









    const ct = document.getElementById("jobdiv");  
    ct.innerHTML = '';  



    positionList.forEach(item => {  
      if (item.children) {  
        // 创建顶级下拉菜单  
        var dropdownDiv = document.createElement('div');  
        dropdownDiv.classList.add('dropend');  
      
        // 创建触发元素  
        var link = document.createElement('a');  
        link.classList.add('dropdown-item', 'dropdown-toggle');  
        link.setAttribute('data-bs-toggle', 'dropdown');  
        link.setAttribute('data-bs-auto-close', 'outside');  
        link.setAttribute('role', 'button');  
        link.setAttribute('value', item.value);  
        link.setAttribute('aria-expanded', 'false');  
        link.textContent = item.label;  
      
        // 创建顶级下拉菜单的内容容器  
        var dropdownMenu = document.createElement('div');  
        dropdownMenu.classList.add('dropdown-menu');  
      
        // 递归地构建子菜单  
        buildDropdownMenu(item.children, dropdownMenu);  
      
        // 将触发元素和内容容器添加到顶级下拉菜单  
        dropdownDiv.appendChild(link);  
        dropdownDiv.appendChild(dropdownMenu);  
      
        // 将顶级下拉菜单添加到某个容器（例如ct）  
        ct.appendChild(dropdownDiv);  
      } else {  
        // 创建非嵌套的下拉菜单项  
        var link = document.createElement('a');  
        link.classList.add('dropdown-item');  
        link.setAttribute('onClick', 'chooseThis(this)');  
        link.setAttribute('value', item.value);  
        link.textContent = item.label;  
        ct.appendChild(link);  
      }  
    });  








})

let flame = `<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="#ff3d3d"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-flame"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12c2 -2.96 0 -7 -1 -8c0 3.038 -1.773 4.741 -3 6c-1.226 1.26 -2 3.24 -2 5a6 6 0 1 0 12 0c0 -1.532 -1.056 -3.94 -2 -5c-1.786 3 -2.791 3 -4 2z" /></svg>`

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

  $('.dropdown-menu.show').removeClass('show');

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

  $('.dropdown-menu.show').removeClass('show');


}



















function getPage(pageNo){




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
        url:baseUri+'/project/selectPList',
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
                  
                    let cityCode = '';

                    if(o.cityCode!=null&&o.cityCode.length>4){
                        let cityarray = splitOrGet(o.cityCode)
                        if(cityarray!=null&&cityarray.length>0){
                            cityarray.forEach(element => {
                                cityCode += cn.info(element.trim()).name + ' '
                            });
                        }
                        // console.log(cityCode)
                    }else if(!isNumeric(o.cityCode)){
                        cityCode = o.cityCode;
                    }else{
                        cityCode = '不限';
                    }


                    let level=''

                    switch (o.level) {
                      case "1":
                        level=flame+flame+flame;
                          break;
                      case "2":
                        level=flame+flame;
                          break;
     
                      default:
                        level=flame+flame+flame ;
                  }


                  var numbers = '<div style="width: 28px; height: 28px; line-height: 28px; border-radius: 50%; text-align: center; background-color: rgb(27, 188, 155); color: rgb(255, 255, 255);">'+o.recommendNumber+'</div>'
                  var rnum = o.recruitNum;

                  if(rnum==0){
                    rnum = '若干'
                  }




                    str+= `<tr>
                    <td>${level}</td>
                    <td>${o.customerName}</td>
                    <td><span style='font-weight: bold;' class ='bg-primary-lt'><a onclick='checkDetail("${o.projectId}")'>${o.name}</a></span></td>
                    <td>${cityCode}</td>
                      <td>${rnum}</td>
                    <td>${o.stateData}</td>

                    <td>${o.createTime}</td>
                    <td>${numbers}</td>
                    
                    <td><a herf="#" onclick="checkDetail('${o.projectId}')" class="btn">查看</a><a herf="#" class="btn" onclick="move('${o.projectId}')">转移</a></td></tr>`
          



                }
                $('#data').html(str);



                var pageCount = obj.data.count

                $('#totalPageNum').html('');
                $('#totalPageNum').html(pageCount);

                var totalPage = obj.data.totalPage;


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


function checkDetail(id){
    //跳转页面并且携带参数

    let bigNumber = BigInt(id);
    let workId = bigNumber.toString(); // 转换为字符串


// 创建一个新的URL，携带参数
var url = 'prod.html?workId=' + encodeURIComponent(workId)+'' ;

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



