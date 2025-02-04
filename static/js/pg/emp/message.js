$(document).ready(function(){
    // var customerId = getParameterByName('customerId');
  jeDate("#ymd01",{
      theme:{bgcolor:"#4cc9f0",pnColor:"#00CCFF"},
      format: "YYYY-MM-DD"
  });
  jeDate("#ymd02",{
    theme:{bgcolor:"#4cc9f0",pnColor:"#00CCFF"},
    format: "YYYY-MM-DD"
});


document.querySelectorAll('#myForm input[type="radio"]').forEach(radio => {
    radio.addEventListener('change', function() {
        getPage(1);
    });
});

    // console.log('customerId:'+customerId)
    //默认进行分页数据查询
    getPage(1);


    receiver= new TomSelect('#receiver',{
        maxItems: 1,
        valueField: 'userId',
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

                var url = baseUri+'/customer/ulfq';
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
        </span>${ escape(item.name) }</div>`;
    
                
            },
            item: function(item, escape) {
        return `<div><span class="dropdown-item-indicator"  >
        </span>${ escape(item.name) }</div>`;
    
            }
        },
        onInitialize: function() {
            this.clearOptions(); // 清空初始选项
            this.load(''); // 传入空字符串以加载所有选项或基于默认查询
        },
    });
})

let receiver;





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
        url:baseUri+'/home/selectMsgList',
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
        
                    let outType = '其他';

                    switch (o.type) {
                        case 0:
                            outType = '客户交流';
                            break;
                        case 1:
                            outType = '职位交流';
                            break;
                        case 2:
                            outType = '人选交流';
                            break;
                        case 3:
                            outType = '喜报';
                            break;
                        case 4:
                            outType = '请假事宜';
                            break;
                        default:
                            outType = '其他';
                            break;
                    }

                 


                    str+=
                    `
                    <tr>
                        <td class='wordbold'>${outType}</td>
                        <td style='color:blue'>${o.sendName}</td>
                        <td style="color: blue;">${o.userName}</td>
                        <td >${o.name}</td>
                        <td class="${o.state==0?'wordbold':''}">${o.details}</td>
                        <td >${o.createTime}</td>
                        <td ><a class='btn btn-danger btn-sm' onclick='delmsg(${o.id})'>删除</a>${o.state==0?"<a class='btn btn-info btn-sm' onclick='changemsg("+o.id+")'>标记为已处理</a>":''}</td>
       
                        
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
                document.getElementById('table-default').scrollIntoView({ behavior: 'smooth' });


            }


        }
    });
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


function checkcusd(id){
 
    //跳转页面并且携带参数

  let bigNumber = BigInt(id);
  let customerId = bigNumber.toString(); // 转换为字符串


  // 创建一个新的URL，携带参数
  var url = '../customer/cusd.html?customerId=' + encodeURIComponent(customerId)+'' ;

  sessionStorage.setItem('nowactive','')

  // 使用jQuery来跳转到新页面
  // window.location.href = url;

  window.open(url, '_blank');


}



function delmsg(id){

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
  
      var url = baseUri+'/employ/delMsg';
  fetch(url,options)
      .then(response => response.json())
      .then(json => {
          console.log(json)
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

  
  
function changemsg(id){
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
  
        var url = baseUri+'/employ/changeMsgState';
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
  


  function addMsg(){


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
    inputValue.receiverId =  receiver.getValue();
    inputValue.receiverName = receiver.options[receiver.getValue()].name;
    inputValue.workId = 0;

  console.log(inputValue)



  const options = {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    'token':localStorage.getItem('token')
    },
    body: JSON.stringify(inputValue),
    };

    var url = baseUri+'/employ/addMsg';
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