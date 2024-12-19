
$(document).ready(function(){


  
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





  const buttons = document.querySelectorAll('.btn.btn-primary');
  // button.addEventListener('click', function() {
  //     addProject();
  //     // 后续逻辑
  // });


  buttons.forEach((button) => {
    button.addEventListener('click', addProject);
  });


  const buttons1 = document.querySelectorAll('.btn.btn-success');


  buttons1.forEach((button) => {
    button.addEventListener('click', saveProject);
  });


  const claerBtn = document.querySelectorAll('.btn.btn-info');


  claerBtn.forEach((button) => {
    button.addEventListener('click', clearForm);
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
    if($(o).attr('value')=='不限'){
      $('#jobinput').val('不限')
    }else{
      $('#jobinput').val(str)

    }
  }

  $('#jobmenu.show').removeClass('show');


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






function test(){
  console.log(citys.getValue())
  // const cities = ["北京市", "天津市", "石家庄市", "唐山市", "秦皇岛市", "邯郸市", "邢台市"];

// 使用join方法将数组元素连接成一个字符串，使用'、'作为分隔符
const citiesStringWithSeparator = citys.getValue().join('、');

// 但是这样会在最后一个元素后面也多加一个分隔符，所以我们需要去掉它
const citiesString = citiesStringWithSeparator.slice(0, -1);

console.log(citiesString); // 输出：北京市、天津市、石家庄市、唐山市、秦皇岛市、邯郸市、邢台市

}


function addProject(state){

  const combinedElements = $('input[type="text"],input[type="number"], textarea, input[type="radio"]:checked, select, input[type="checkbox"]:checked');

  let isNUll = true;
  const data = {};
  combinedElements.each(function () {
      const name = $(this).attr('name');
      if (name) {

          $(this).removeClass('is-valid', 'is-invalid','is-valid-lite','is-invalid-lite')

          let value;
          if ($(this).is('input') || $(this).is('textarea') || $(this).is('select')) {
              value = $(this).val();
          }
          data[name] = value;
          if (['customerId', 'name', 'job'].includes(name) && (!value || value.trim() === '')) {
            isNUll= false;
            $(this).addClass('is-invalid','is-invalid-lite');
        } else {
            $(this).removeClass('is-invalid','is-invalid-lite');
        }
      }
  });


  let teams = [];

  let nm = manageMember.getValue();
  if(nm){
    nm.forEach(value=>{
        let obj = manageMember.options[value]
        teams.push({'appUserId':obj.userId,'appUserName':obj.name})
    })
  }




  let cv = customerMember.getValue();
  if(cv){
    data['customerName']=customerMember.options[cv].name
   
  }


  let cc = citys.getValue()
  if(cc){
    let citystr = ''
    cc.forEach(value=>{
      let obj = citys.options[value]
      citystr+=obj.value+' '
      console.log(obj)
    })
    data['citycode']=citystr;
  }

  
  data['teams']=teams;

  if(data.requireAgeState==0){
    data.requireAgeS='0';
    data.requireAgeE='0';
  }



  if(state==0){
    data['state']='0';
  }else{
    data['state']='1';
  }

  console.log(data);


  if(isNUll){
    console.log('success')
  }


}


function saveProject(){
  addProject(0)
}