
$(function(){


    // var customerId = getParameterByName('customerId');

    // generateDropdown(positionList, 'selectdiv1');

    // traverseTree(positionList);

    // 输出树形结构以验证层级标记

    // console.log('customerId:'+customerId)
    checkboxChcek()
    //默认进行分页数据查询
    getPage(1);





    const ct = document.getElementById("jobdiv");  
    ct.innerHTML = '';  
    // positionList.forEach(item=>{
    //   if(item.children){
    //     var dd = document.createElement('div');  
    //     dd.classList.add('dropend');  
    //     const link = document.createElement('a');  
        // link.classList.add('dropdown-item', 'dropdown-toggle');  
        // link.setAttribute('data-bs-toggle', 'dropdown');  
        // link.setAttribute('data-bs-auto-close', 'outside');  
        // link.setAttribute('role', 'button');  
        // link.setAttribute('aria-expanded', 'false');  
        // link.textContent = item.label;  
    //     dd.appendChild(link);  
    //     ct.appendChild(dd); 
    //     var dd12 = document.createElement('div');  
    //     dd12.classList.add('dropdown-menu');  
    //     item.children.forEach(item1=>{           
    //       var dd1 = document.createElement('div');        
    //       dd1.classList.add('dropend');  
    //       const link = document.createElement('a');  
    //       link.classList.add('dropdown-item', 'dropdown-toggle');  
    //       link.setAttribute('data-bs-toggle', 'dropdown');  
    //       link.setAttribute('data-bs-auto-close', 'outside');  
    //       link.setAttribute('role', 'button');  
    //       link.setAttribute('aria-expanded', 'false');         
    //       link.textContent = item1.label;  
    //       dd1.appendChild(link);  
    //       dd12.appendChild(dd1);   
    //       var dd22 = document.createElement('div');  
    //       dd22.classList.add('dropdown-menu');  
    //       item1.children.forEach(item2=>{  
    //        const link = document.createElement('a');  
    //         link.classList.add('dropdown-item');  
    //         link.setAttribute('onClick', 'chooseThis(this)');  
    //         link.setAttribute('value', item2.value);  
    //         link.textContent = item2.label;         
    //         dd22.appendChild(link); 
    //       })
    //       dd1.appendChild(dd22); 
    //     })
    //     dd.appendChild(dd12)
    //   }else{
    //     const link = document.createElement('a');  
    //     link.classList.add('dropdown-item');  
    //     link.setAttribute('onClick', 'chooseThis(this)');  
    //     link.setAttribute('value', item.value);  
    //     link.textContent = item.label;  
    //     ct.appendChild(link); 
    //   }
    // })







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

function traverseTree(node, level = 1) {
  // 标记当前节点的层级
  node.level = level;
  if (!node.children) {
    node.children = [];
  }
  // 如果有子节点，递归遍历子节点
  console.log(node.children)
  if (node.children) {
      for (let child of node.children) {
      
          traverseTree(child, level + 1);
      }
  }
}


function generateDropdown(data, containerId) {  
  const container = document.getElementById(containerId);  
  if (!container) {  
    console.error('Container not found');  
    return;  
  }  
  
  // 清除容器内的旧内容  
  container.innerHTML = '';  
  
  // 递归函数，用于构建每个层级的下拉菜单  
  function buildDropdown(items, parent) {  
    const dropdown = document.createElement('div');  
    dropdown.classList.add('dropdown-menu');  
      
    items.forEach(item => {  
      const link = document.createElement('a');  
      link.classList.add('dropdown-item', 'dropdown-toggle');  
      link.setAttribute('data-bs-toggle', 'dropdown');  
      link.setAttribute('data-bs-auto-close', 'outside');  
      link.setAttribute('role', 'button');  
      link.textContent = item.label;  
        
      // 检查是否有子项  
      if (item.children && item.children.length > 0) {  
        // 设置aria-expanded为false，除非您想默认展开它  
        link.setAttribute('aria-expanded', 'false');  
          
        // 递归构建子菜单  
        const childDropdown = buildDropdown(item.children, link);  
        dropdown.appendChild(childDropdown);  
      } else {  
        // 对于没有子项的项，添加一个点击事件处理程序（如果需要）  
        link.onclick = function(e) {  
          e.preventDefault(); // 阻止默认的链接行为  
          // 在这里处理选择项的逻辑  
          console.log('Selected:', item.label);  
        };  
      }  
        
      // 将链接添加到当前下拉菜单中  
      dropdown.appendChild(link);  
    });  
      

    console.log(parent)
    // 如果这是顶级下拉菜单，则不需要包装在另一个dropend div中  
    if (parent) {  
      const dropend = document.createElement('div');  
      dropend.classList.add('dropend');  
      dropend.appendChild(dropdown);  
      parent.appendChild(dropend);  
    } else {  
      // 否则，直接添加下拉菜单到容器中  
      container.appendChild(dropdown);  
    }  
      
    // 返回构建的下拉菜单（用于递归）  
    return dropdown;  
  }  
  

  
  // 开始构建下拉菜单  
  buildDropdown(data, container);  
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


                    


                    str+= `<tr>
                    <td>${o.stateData}</td>
                    <td>${o.customerName}</td>
                    <td><span style='font-weight: bold;' class ='bg-primary-lt'><a onclick='checkDetail("${o.projectId}")'>${o.name}</a></span></td>
                    <td>${cityCode}</td>
                    <td>${o.createTime}</td>
                    <td><a herf="#" onclick="checkDetail(698345291966844928)" class="btn">查看</a><a herf="#" class="btn" onclick="move(698345291966844928)">转移</a></td></tr>`
          



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
var url = 'cusd.html?customerId=' + encodeURIComponent(customerId)+'' ;

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



