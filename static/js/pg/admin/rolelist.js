$(function(){
    // var customerId = getParameterByName('customerId');
  // jeDate("#ymd01",{
  //     theme:{bgcolor:"#4cc9f0",pnColor:"#00CCFF"},
  //     format: "YYYY-MM-DD"
  // });
  // jeDate("#ymd02",{
  //   theme:{bgcolor:"#4cc9f0",pnColor:"#00CCFF"},
  //   format: "YYYY-MM-DD"
  // });


    // console.log('customerId:'+customerId)
    //默认进行分页数据查询
    getPage(1);

   getABC();
    
})



function getABC(){
        $.ajax({
            headers:{
                'token':localStorage.getItem("token"),
                Accept:'application/json',
                'Content-Type':'application/json;charset=UTF-8'
            },
            dataType:'json',
            type:'post',
            url:baseUri+'/admin/permissionList',
            data:JSON.stringify({'pageNo':1,'pageSize':10000}),
            success:function(obj){

                sessionStorage.setItem("permissionList",JSON.stringify(obj.data.list));

                const items = obj.data.list;

                const newList = categorizeMenus(items);

                renderMenusToTable(newList,'data');



                

                
                const newList1 = categorizeMenus1(items);
                renderMenusToTable(newList1,'data1');



            }
        });



}





function removeEmptyValues(obj) {
  if (obj === null || typeof obj !== 'object') {
      return obj;
  }

  const newObj = Array.isArray(obj) ? [] : {};

  for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
          const value = removeEmptyValues(obj[key]);
          if (value !== undefined && value!=='' && value!=='null') {
              newObj[key] = value;
          }
      }
  }

  return newObj;
}


let roleList;


function getPage(pageNo){

  arrowPageNo = pageNo;
  let data= {}

  data.pageNo = pageNo;
 



    $('#roleData').html('');


    $.ajax({
        headers:{
            'token':localStorage.getItem("token"),
            Accept:'application/json',
            'Content-Type':'application/json;charset=UTF-8'
        },
        dataType:'json',
        type:'post',
        url:baseUri+'/admin/roleList',
        data:JSON.stringify(data),
        success:function(obj){

            var str="";
            if(obj.data.list.length===0){
              $('.table-sort tbody').append("<tr class='text-c'><td colspan='8'>没有数据 !</td></tr>");
              $('#pageSelect').html('');
              $('#totalPageNum').html(0);
              $('#totalPageNum1').html(0);
                
            }else{
                roleList = obj.data.list;
                // $("#countsss").css("display","");
                for(var i =0;i<obj.data.list.length;i++){

                    var o = obj.data.list[i];
        








                    str+=
                    `
                    <tr>
                        <td >${o.name}</td>
                        <td >${toStr(o.remark)}</td>
                        <td >${o.outName}</td>
                        <td >${toStr(o.createTime)}</td>
                    
                        <td>
                        
                          <a class='btn btn-ghost btn-sm' onclick='editRole(${i})'>编辑</a>
                        
                        </td>
                        
                      </tr>
                    `
                }
                $('#roleData').html(str);
                
           
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
                document.getElementById('table-default').scrollIntoView({ behavior: 'smooth' });


            }


        }
    });
}






function searchList(){
    getPage(1)
}


function changetrip(id){
  const options = {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      'token':localStorage.getItem('token')
      },
      body: JSON.stringify({
        "id": id,
        "state": 1
      }),
      };

      var url = baseUri+'/home/changeTripState';
  fetch(url,options)
      .then(response => response.json())
      .then(json => {
          // console.log(json)
          if(json.code==0){
              
      showMessage(0,'处理成功!!')

      getPage(1)

   
          }else{
              showMessage(1,"处理失败")
          }



      }).catch((error)=>{
        console.log(error)
      });


}



function deltrip(id){

  const options = {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    'token':localStorage.getItem('token')
    },
    body: JSON.stringify({
      "id": id
    }),
    };

    var url = baseUri+'/employ/delTrip';
fetch(url,options)
    .then(response => response.json())
    .then(json => {
        // console.log(json)
        if(json.code==0){
            
    showMessage(0,'删除成功!!')

    getPage(1)
        }else{
            showMessage(1,"删除失败")
        }



    }).catch((error)=>{
        console.log(error)
    });


}




function addTrip(){


  let inputValue = {};

  $('#addtrip input,#addtrip textarea').each(function() {
    var $input = $(this);

 
    if ($input.attr('name') && $input.val()) {

      if($input.attr('type')=='radio'){
          if($input.is(':checked')){
              inputValue[$input.attr('name')] = $input.val();
          }
          
        }else{
          inputValue[$input.attr('name')] = $input.val();
          
        }
        
      
    }

  });



  const options = {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    'token':localStorage.getItem('token')
    },
    body: JSON.stringify(inputValue),
    };

    var url = baseUri+'/employ/addTrip';
fetch(url,options)
    .then(response => response.json())
    .then(json => {
        // console.log(json)
        if(json.code==0){
            
    showMessage(0,'添加成功!!')
    $("#addtrip").modal('hide')
    getPage(1)
        }else{
            showMessage(1,"添加失败！")
        }



    }).catch((error)=>{
        console.log(error)
    });


}


function checkDetails(id){
  $('#usermodal').modal('show');


};




function editRole(id){

   
    $('#modaltitle').html('编辑角色');

    $('#addTrip').modal('hide');

    const items = roleList[id].permissionList;


    checkMatchingCheckboxes(items);

    $('#addTrip').modal('show');
  
}




function categorizeMenus1(data) {
    const menuList = [];
    const menuMap = {};

    // 先处理一级菜单
    data.forEach(item => {
        const parts = item.url.split('/');
        if (item.url.startsWith('/') && parts.length == 2) {
            const menu = {
                id:item.id,
                name: item.name,
                url: item.url,
                childMenus: []
            };
            menuList.push(menu);
            menuMap[item.url] = menu;
        }
    });


    // 处理子菜单
    data.forEach(item => {
        
        const parts = item.url.split('/');
        if (item.url.startsWith('/') && parts.length > 2) {
            const parentUrl = item.url.split('/').slice(0, 2).join('/');
            if (menuMap[parentUrl]) {
                const childMenu = {
                    id:item.id,
                    name: item.name,
                    url: item.url
                };
                menuMap[parentUrl].childMenus.push(childMenu);
            }
        }
    });

    return menuList;
}




function categorizeMenus(data) {
    const menuList = [];
    const menuMap = {};

    // 先处理一级菜单
    data.forEach(item => {
        const parts = item.url.split('/');
        if (item.url.startsWith('route') && parts.length == 2) {
            const menu = {
                id:item.id,
                name: item.name,
                url: item.url,
                childMenus: []
            };
            menuList.push(menu);
            menuMap[item.url] = menu;
        }
    });


    // 处理子菜单
    data.forEach(item => {
        
        const parts = item.url.split('/');
        if (item.url.startsWith('route') && parts.length > 2) {
            const parentUrl = item.url.split('/').slice(0, 2).join('/');
            if (menuMap[parentUrl]) {
                const childMenu = {
                    id:item.id,
                    name: item.name,
                    url: item.url
                };
                menuMap[parentUrl].childMenus.push(childMenu);
            }
        }
    });

    return menuList;
}


function renderMenusToTable(menus,id) {
            const tbody = document.getElementById(id);
            menus.forEach(menu => {
                const tr = document.createElement('tr');

                // 渲染父级菜单
                const parentTd = document.createElement('td');
                const parentLabel = document.createElement('label');
                parentLabel.className = 'form-check form-check-inline';
                const parentCheckbox = document.createElement('input');
                parentCheckbox.className = 'form-check-input';
                parentCheckbox.type = 'checkbox';
                parentCheckbox.value = menu.id;
                const parentSpan = document.createElement('span');
                parentSpan.className = 'form-check-label wordbold';
                parentSpan.textContent = menu.name;
                parentLabel.appendChild(parentCheckbox);
                parentLabel.appendChild(parentSpan);
                parentTd.appendChild(parentLabel);
                tr.appendChild(parentTd);

                // 渲染子菜单
                const childTd = document.createElement('td');
                let counter = 0;
                const childCheckboxes = [];
                menu.childMenus.forEach((childMenu, index) => {
                    const childLabel = document.createElement('label');
                    childLabel.className = 'form-check form-check-inline';
                    const childCheckbox = document.createElement('input');
                    childCheckbox.className = 'form-check-input';
                    childCheckbox.type = 'checkbox';
                    childCheckbox.value = childMenu.id;
                    const childSpan = document.createElement('span');
                    childSpan.className = 'form-check-label';
                    childSpan.textContent = childMenu.name;
                    childLabel.appendChild(childCheckbox);
                    childLabel.appendChild(childSpan);
                    childTd.appendChild(childLabel);
                    childCheckboxes.push(childCheckbox);

                    counter++;
                    if (counter % 5 === 0 && index < menu.childMenus.length - 1) {
                        const br = document.createElement('br');
                        childTd.appendChild(br);
                    }
                });
                tr.appendChild(childTd);

                tbody.appendChild(tr);

                // 父级 checkbox 事件处理
                parentCheckbox.addEventListener('change', function () {
                    const isChecked = this.checked;
                    childCheckboxes.forEach(checkbox => {
                        checkbox.checked = isChecked;
                    });
                });

                // 子级 checkbox 事件处理
                childCheckboxes.forEach(checkbox => {
                    checkbox.addEventListener('change', function () {
                        const allChecked = childCheckboxes.every(cb => cb.checked);
                        parentCheckbox.checked = allChecked;
                    });
                });
            });
}



        function checkMatchingCheckboxes(newData) {
            const checkboxes = document.querySelectorAll('input[type="checkbox"]');
            newData.forEach(item => {
                const targetId = item.id.toString();
                checkboxes.forEach(checkbox => {
                    if (checkbox.value === targetId) {
                        checkbox.checked = true;
                        // 触发子菜单的联动更新
                        const parentCheckbox = checkbox.closest('tr').querySelector('.form-check-input:first-child');
                        const childCheckboxes = Array.from(checkbox.closest('td').querySelectorAll('.form-check-input'));
                        const allChecked = childCheckboxes.every(cb => cb.checked);
                        parentCheckbox.checked = allChecked;
                    }
                });
            });
        }
