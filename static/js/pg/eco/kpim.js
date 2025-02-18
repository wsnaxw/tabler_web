$(function(){
    // var customerId = getParameterByName('customerId');
  jeDate("#ymd01",{
      theme:{bgcolor:"#4cc9f0",pnColor:"#00CCFF"},
      format: "YYYY-MM"
  });
  jeDate("#ymd02",{
    theme:{bgcolor:"#4cc9f0",pnColor:"#00CCFF"},
    format: "YYYY-MM"
});
  


    // console.log('customerId:'+customerId)
    //默认进行分页数据查询
    getPage(1);
})







function getFormDate() {
  let form = document.getElementById('myForm');  // 用你的form的ID替换'myForm'
 
  let formData = new FormData(form);
  let object = {};

  for (let pair of formData.entries()) {
      object[pair[0]] = pair[1];
  }
  let newJsonData = removeEmptyValues(object);



  return newJsonData;


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




function getPage(pageNo){

  arrowPageNo = pageNo;
  let data = getFormDate()

  data.pageNo = pageNo;
 



    $('#data').html('');


    $.ajax({
        headers:{
            'token':localStorage.getItem("token"),
            Accept:'application/json',
            'Content-Type':'application/json;charset=UTF-8'
        },
        dataType:'json',
        type:'post',
        url:baseUri+'/eco/selectKpiList',
        data:JSON.stringify(data),
        success:function(obj){

            var str="";
            if(obj.data.list.length===0){
              $('.table-sort tbody').append("<tr class='text-c'><td colspan='8'>没有数据 !</td></tr>");
              $('#pageSelect').html('');
              $('#totalPageNum').html(0);
              $('#totalPageNum1').html(0);
                
            }else{
                // $("#countsss").css("display","");
                for(var i =0;i<obj.data.list.length;i++){

                    var o = obj.data.list[i];
                    let statestr = '';
                    if(o.state==0){
                        statestr = `<span style="color:green">待审核</span>`;
                    }else if(o.state==1){
                        statestr = `<span style="color:blue">已通过</span>`;
                    }else if(o.state==2){
                        statestr = '已驳回'; 
                    }else if(o.state==3){
                        statestr = '已退回'; 
                    }


        
                    str+=
                    `
                    <tr>
                        <td >${toStr(o.comName)}</td>
                        <td >${toStr(o.ownerName)}</td>
                        <td >${toStr(o.customerName)}</td>
                        <td style="color:red">${toNumber(o.serviceFee)}</td>
                        <td >${toStr(o.talentName)}</td>
                        <td >${toNumber(o.commissionFee)}</td>
                        <td >${toStr(o.rate)}</td>
                        <td >${statestr}</td>

                        <td >${toStr(o.userName)}</td>
                        <td >${toStr(o.createTime)}</td>



                        <td>
                        
                        <a class='btn btn-ghost btn-sm' onclick='checkDetails(${o.id})'>查看</a>
                        
                        <a class='btn btn-danger btn-sm' onclick='deltrip(${o.id})'>退回</a>
                        
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
                document.getElementById('table-default').scrollIntoView({ behavior: 'smooth' });


            }


        }
    });
}



function toNumber(str){
  const num = Number(str);
  return num.toFixed(2);
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

function checkDetails(id) {
  const data = JSON.parse(sessionStorage.getItem(id));
  if (data) {
    $('#addtrip input, #addtrip textarea').each(function() {
      const name = $(this).attr('name');
      if (name && data[name] !== undefined) {
        $(this).val(data[name]).prop('disabled', true);
      }
      
    });

    $("#totalDays").prop('disabled', true);

    $("#addtrip").modal('show');
  }
}

function editSalary(id) {
  const data = JSON.parse(sessionStorage.getItem(id));
  if (data) {
    $('#addtrip input, #addtrip textarea').each(function() {
      const name = $(this).attr('name');
      if (name && data[name] !== undefined) {
        $(this).val(data[name]).prop('disabled', false);
      }
    });
    if (!$('#addtrip input[name="userId"]').length) {
      $('#addtrip').append('<input type="hidden" name="userId" value="' + data.userId + '">');
    } else {
      $('#addtrip input[name="userId"]').val(data.userId);
    }
    $("#totalDays").prop('disabled', false);
    $("#addtrip").modal('show');
  }
}



function initAddtrip(){
  $('#addtrip input, #addtrip textarea').each(function() {
    const name = $(this).attr('name');
    $(this).prop('disabled', false);
  
  });
}