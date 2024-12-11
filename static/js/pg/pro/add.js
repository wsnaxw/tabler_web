
$(document).ready(function(){





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






function test(){
  console.log(citys.getValue())
  const cities = ["北京市", "天津市", "石家庄市", "唐山市", "秦皇岛市", "邯郸市", "邢台市"];

// 使用join方法将数组元素连接成一个字符串，使用'、'作为分隔符
const citiesStringWithSeparator = citys.getValue().join('、');

// 但是这样会在最后一个元素后面也多加一个分隔符，所以我们需要去掉它
const citiesString = citiesStringWithSeparator.slice(0, -1);

console.log(citiesString); // 输出：北京市、天津市、石家庄市、唐山市、秦皇岛市、邯郸市、邢台市

}