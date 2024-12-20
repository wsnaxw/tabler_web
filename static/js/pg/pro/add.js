
$(document).ready(function(){

  getID()

  
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


function getID(){
  $('#projectId').val('')
  fetch(baseUri+'/project/getProjectId',getFetchOptions())
.then(response => response.json())
.then(json => {
 

   $('#projectId').val(json.data)


}).catch((error)=>{
    console.log(error)
});

}

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













function getParameterByName(name) {
     url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}






// function test(){
//   console.log(citys.getValue())
//   // const cities = ["北京市", "天津市", "石家庄市", "唐山市", "秦皇岛市", "邯郸市", "邢台市"];

// // 使用join方法将数组元素连接成一个字符串，使用'、'作为分隔符
// const citiesStringWithSeparator = citys.getValue().join('、');

// // 但是这样会在最后一个元素后面也多加一个分隔符，所以我们需要去掉它
// const citiesString = citiesStringWithSeparator.slice(0, -1);

// console.log(citiesString); // 输出：北京市、天津市、石家庄市、唐山市、秦皇岛市、邯郸市、邢台市

// }


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
          if (['customerId', 'name', 'job','details'].includes(name) && (!value || value.trim() === '')) {
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
    })
    data['cityCode']=citystr;
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




  if(isNUll){





    const options = {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      'token':localStorage.getItem('token')
      },
      };

   
      data.projectId =  $('#projectId').val()
      console.log(data,$('#projectId'));

      var url = baseUri+'/project/addProject';
  fetch(url,getFetchOptions(data))
      .then(response => response.json())
      .then(json => {
          // console.log(json)
          if(json.code==0){
              
      showMessage(0,'新增成功！')
      window.open("pm-list.html", '_blank');

          }else{
              showMessage(1,"新增失败！")
          }

          getID()

      }).catch((error)=>{
          console.log(error)
      });



    
  }


}


function saveProject(){
  addProject(0)
}

function clearForm(){


  customerMember.clear();
  manageMember.clear();
  citys.clear();
  $('input[type="checkbox"], select,input[type="text"],input[type="number"],textarea').each(function() {
      // 将这些元素的值设置为空
      $(this).val('');
      // 对于checkbox，还需要取消选中状态
      if ($(this).is('input[type="checkbox"]')||$(this).is('input[type="radio"]')) {
        $(this).prop('checked', false);
      }
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