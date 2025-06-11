$(function(){
    // var customerId = getParameterByName('customerId');
  jeDate("#ymd01",{
      theme:{bgcolor:"#4cc9f0",pnColor:"#00CCFF"},
      format: "YYYY-MM-DD"
  });
  jeDate("#ymd02",{
    theme:{bgcolor:"#4cc9f0",pnColor:"#00CCFF"},
    format: "YYYY-MM-DD"
});
  

    // var customerId = getParameterByName('customerId');
    jeDate("#ymd03",{
      theme:{bgcolor:"#4cc9f0",pnColor:"#00CCFF"},
      format: "YYYY-MM-DD"
  });
  jeDate("#ymd04",{
    theme:{bgcolor:"#4cc9f0",pnColor:"#00CCFF"},
    format: "YYYY-MM-DD"
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


                    let payTypestr = '';

                    if(o.payType==0){
                      payTypestr = `服务费`;
                    }else if(o.payType==1){
                      payTypestr = `咨询费`;
                    }else if(o.payType==2){
                      payTypestr = '首付款'; 
                    }



        
                    str+=
                    `
                    <tr>
                        <td >${toStr(o.comName)}</td>
                        <td >${toStr(o.ownerName)}</td>
                        <td >${toStr(o.customerName)}</td>
                        <td style="color:red">${toNumber(o.serviceFee)}</td>
                        <td >${toStr(o.talentName)}</td>
                        <td >${toNumber(o.commissionFee)} / ${toStr(o.rate)}%</td>
                        <td >${toStr(payTypestr)}</td>
                        <td >${statestr}</td>

                        <td >${toStr(o.userName)}</td>
                        <td >${toStr(o.createTime)}</td>



                        <td>
                        
                        <a class='btn btn-ghost btn-sm' onclick='checkDetails(${o.sourceId})'>查看</a>
                        
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
  return num.toFixed(3);
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





let isTrue = false;
function initWay(){


  if( parseFloat($('#allotFee').text()).toFixed(3)=='0.000'&&allotFeeSpan<=0){
    allotFeeSpan==0;
    return;
  }


  if($('#realAllotFee').val()==0){

      $('#nowAllotFee').text(allotFeeSpan);
      $('#realAllotFee').val(allotFeeSpan);
      allotFeeSpan=0;
       $('#allotFee').text(allotFeeSpan);

  }else{
      $('#nowAllotFee').text($('#realAllotFee').val());
      $('#allotFee').text((allotFeeSpan- $('#realAllotFee').val()).toFixed(3));
      allotFeeSpan = (allotFeeSpan- $('#realAllotFee').val()).toFixed(3);
  }





  let user = JSON.parse(localStorage.getItem('user'));
  for (let index = 0; index < 6; index++) {

      tomins[index] = document.getElementById('employer' + (index+1)).tomselect;
      tomins[index].addOption({
           userId: user.userId,
          name: user.name,
      });
              
    tomins[index].addItem(user.userId);


     tomins[index].on('change', function() {
        confirmUserKpi()
     })

  }

  const table = document.getElementById('calcData');
  const rows = table.querySelectorAll('tr');

    rows.forEach((row, index) => {

    const cells = row.querySelectorAll('td');
    cells[2].textContent = user.comName;

    })

isTrue=true;

    confirmUserKpi()  
    





  }



  function confirmUserKpi(){

    let rate = $('#tcbl').val();
    let serviceFee = $('#realAllotFee').val();


    let kpiUserInfos = [];

    const jsonData = {
      "rate": rate,
      "serviceFee": serviceFee,
    }


  const table = document.getElementById('calcData');
  const rows = table.querySelectorAll('tr');

    rows.forEach((row, index) => {

    const cells = row.querySelectorAll('td');
    const percentageInput = cells[3].querySelector('input');
                    const percentage = parseInt(percentageInput.value);

    let selectEl = tomins[index];



      kpiUserInfos.push({
        userId: selectEl.options[selectEl.getValue()].userId,
        userName: selectEl.options[selectEl.getValue()].name,
        rate:percentage
      })



    })


  

    jsonData.kpiUserInfos = kpiUserInfos;
      console.log(jsonData)




        const options = {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      'token':localStorage.getItem('token')
      },
      body: JSON.stringify(jsonData),
      };

      var url = baseUri+'/eco/confirmUserKpi';
  fetch(url,options)
      .then(response => response.json())
      .then(json => {
          // console.log(json)
          if(json.code==0){
              
            console.log(json.data)

              const table = document.getElementById('calcData');
              const rows = table.querySelectorAll('tr');

                rows.forEach((row, index) => {

                const cells = row.querySelectorAll('td');

                cells[4].textContent = parseFloat(json.data[index].kpiFee).toFixed(3);
                cells[5].textContent = parseFloat(json.data[index].commissionFee).toFixed(3);

                })


                const mergedData = {}; 
                let totalKpiFee = 0;
                let totalCommissionFee = 0;
                totalstr = '';
                json.data.forEach(item => {
                                const userId = item.userId;
                                
                                if (!mergedData[userId]) {
                                    mergedData[userId] = {
                                        userId: userId,
                                        userName: item.userName,
                                        kpiFee: 0,
                                        commissionFee: 0,
                                        count: 0,
                                        rate:0
                                    };
                                }
                                
                                // 累加金额
                                mergedData[userId].kpiFee += parseFloat(item.kpiFee);
                                mergedData[userId].commissionFee += parseFloat(item.commissionFee);
                                mergedData[userId].rate+= parseFloat(item.rate);
                                mergedData[userId].count++;
                                
                                // 累加总计
                                totalKpiFee += parseFloat(item.kpiFee);
                                totalCommissionFee += parseFloat(item.commissionFee);
                                
                    });

                            console.log(mergedData)

                            Object.keys(mergedData).forEach(key => {
                            
                              totalstr +=`${mergedData[key].userName} : ${mergedData[key].rate.toFixed(3)}%-${mergedData[key].kpiFee.toFixed(3)} / ${mergedData[key].commissionFee.toFixed(3)} <br>`;
                            })

                            totalstr+=`总计：${totalKpiFee.toFixed(3)} / ${totalCommissionFee.toFixed(3)}`;

                            $('#totalstr').html(totalstr);
                            

        
                }else{
                    showMessage(1,"计算失败")
                }



      }).catch((error)=>{
        console.log(error)
      });










  }

 

 
 


const MAX_TOTAL = 100;


        function updateCalculations() {
          

        const remainingDisplay = document.getElementById('remaining');

            let sum = 0;
            inputs.forEach(input => {
                sum += Number(Math.max(0, Number(input.value) || 0)) || 0;
            });

            // 更新显示
       
            const remaining = Math.max(0, MAX_TOTAL - sum);

            console.log(remainingDisplay)

            remainingDisplay.textContent = remaining || 0;
            
            // 高亮超额情况
            remainingDisplay.className = sum > MAX_TOTAL ? 'error' : '';
             confirmUserKpi();
        }

        function enforceLimits() {
            let sum = 0;
            const activeInputs = [];
            
            // 计算非当前输入框的总和
            inputs.forEach(input => {
                if (input !== this) {
                    sum += Number(Math.max(0, Number(input.value) || 0)) || 0;
                } else {
                    activeInputs.push(input);
                }
            });

            // 对当前输入框应用限制
            activeInputs.forEach(input => {
                const maxAllowed = Math.max(0, MAX_TOTAL - sum);
                if (Number(Math.max(0, Number(input.value) || 0)) > maxAllowed) {
                    input.value = maxAllowed;
                }
            });

            updateCalculations();
            confirmUserKpi();
        }

let allotInfos = [];
let count=0
let serviceFeeTatol = 0;
let commissionFeeTotal = 0;
let kpiUserInfosAll = [];
let kpiUserInfosOne = {};
function confirmAllot(){

  if(!isTrue){
    return;
  }
  isTrue= false;
  let user = JSON.parse(localStorage.getItem('user'));
  let kpiUserInfos = [];

  
    let rate = $('#tcbl').val();
    let serviceFee = $('#realAllotFee').val();


  const table = document.getElementById('calcData');
  const rows = table.querySelectorAll('tr');

    rows.forEach((row, index) => {

    const cells = row.querySelectorAll('td');
    const percentageInput = cells[3].querySelector('input');
                    const percentage = parseInt(percentageInput.value);

    let selectEl = tomins[index];

        var selectElement = $('#talentInfo');
        var selectedOption = selectElement.find('option:selected');
        let talentId= '';
        let talentName = '';
        if (selectedOption.length > 0 && selectedOption.val()) {
            // 有选中值的情况
             talentId = selectedOption.val();
             talentName = selectedOption.text();
        } 

      kpiUserInfos.push({
        userId: selectEl.options[selectEl.getValue()].userId,
        userName: selectEl.options[selectEl.getValue()].name,
        rate:percentage,
        type:$('#allotType').val(),
        typeName:$('#allotType option:selected').text(),
        commissionFee: cells[5].textContent,
        kpiFee: cells[4].textContent,
        serviceFee: serviceFee,
        comId:user.comId,
        comName:user.comName,
        talentId:talentId,
        talentName:talentName,
        comisType:cells[0].textContent,
      })



    })

    let allotId = 'displayData'+count;

    kpiUserInfosOne[allotId] = kpiUserInfos;
   
    const mergedData = {}; 

                totalstr = '';
                kpiUserInfos.forEach(item => {
                                const userId = item.userId;
                                
                                if (!mergedData[userId]) {
                                    mergedData[userId] = {
                                        userId: userId,
                                        userName: item.userName,
                                        kpiFee: 0,
                                        commissionFee: 0,
                                        count: 0,
                                        rate:0
                                    };
                                }
                                
                                // 累加金额
                                mergedData[userId].kpiFee += parseFloat(item.kpiFee);
                                mergedData[userId].commissionFee += parseFloat(item.commissionFee);
                                mergedData[userId].rate+= parseFloat(item.rate);
                                mergedData[userId].count++;
                                
                                // 累加总计
                
                                
                    });

                            console.log(mergedData)

                            Object.keys(mergedData).forEach(key => {
                            
                              totalstr +=`${mergedData[key].userName} : ${mergedData[key].rate.toFixed(3)}%-${mergedData[key].kpiFee.toFixed(3)} / ${mergedData[key].commissionFee.toFixed(3)} <br>`;
                            })

                  









    const mergedDataAll = {};
       let totalKpiFee = 0;
                let totalCommissionFee = 0;
                let totalstrALL = '';

         Object.keys(kpiUserInfosOne).forEach(key => {




             
             
                kpiUserInfosOne[key].forEach(item => {
                                const userId = item.userId;
                                
                                if (!mergedDataAll[userId]) {
                                    mergedDataAll[userId] = {
                                        userId: userId,
                                        userName: item.userName,
                                        kpiFee: 0,
                                        commissionFee: 0,
                                        count: 0,
                                        rate:0
                                    };
                                }
                                
                                // 累加金额
                                mergedDataAll[userId].kpiFee += parseFloat(item.kpiFee);
                                mergedDataAll[userId].commissionFee += parseFloat(item.commissionFee);
                                mergedDataAll[userId].rate+= parseFloat(item.rate);
                                mergedDataAll[userId].count++;
                                
                                // 累加总计
                                totalKpiFee += parseFloat(item.kpiFee);
                                totalCommissionFee += parseFloat(item.commissionFee);
                                
                    });


                          



                            
          })

            Object.keys(mergedDataAll).forEach(key => {
                            
                              totalstrALL +=`${mergedDataAll[key].userName} : ${mergedDataAll[key].rate.toFixed(3)}%-${mergedDataAll[key].kpiFee.toFixed(3)} / ${mergedDataAll[key].commissionFee.toFixed(3)} <br>`;
                            })

                             totalstrALL += `总计：${totalKpiFee.toFixed(3)} / ${totalCommissionFee.toFixed(3)}`;

                              console.log('kpiUserInfosAll',kpiUserInfosAll)

                              $('#totalALL').html(totalstrALL);














    let str = `<div class="col-lg-6 " id="displayData${count}">
                              <div class="card">
                                <div class="card-header">
                                      <span>
                                    人选：${kpiUserInfos[0].talentName || '暂无  '} <br>
                                    ${kpiUserInfos[0].typeName} 
                                  </span>
                                    &nbsp;
                                  &nbsp;
                                  <span style="color: red;"> 
                                    ${totalstr}
                                  </span>
                             
                                            
                                  <div class="ms-auto">
                                    
                                  <a  class="btn btn-danger btn-sm" onclick='delinfo("displayData${count}")'>删除</a>
                                  </div>


                                 
                                </div>
                                <div class="card-body">
                                  <dl class="row"  style="text-align: left">  
                                    <dt class="col-3">${kpiUserInfos[0].userName}</dt><dd class="col-3">${kpiUserInfos[0].comisType}</dd> <dt class="col-2">${kpiUserInfos[0].rate}%</dt><dd class="col-4">${kpiUserInfos[0].commissionFee}/${kpiUserInfos[0].kpiFee}</dd>
                                     <dt class="col-3">${kpiUserInfos[1].userName}</dt><dd class="col-3">${kpiUserInfos[1].comisType}</dd> <dt class="col-2">${kpiUserInfos[1].rate}%</dt><dd class="col-4">${kpiUserInfos[1].commissionFee}/${kpiUserInfos[1].kpiFee}</dd>
                                     <dt class="col-3">${kpiUserInfos[2].userName}</dt><dd class="col-3">${kpiUserInfos[2].comisType}</dd> <dt class="col-2">${kpiUserInfos[2].rate}%</dt><dd class="col-4">${kpiUserInfos[2].commissionFee}/${kpiUserInfos[2].kpiFee}</dd>
                                     <dt class="col-3">${kpiUserInfos[3].userName}</dt><dd class="col-3">${kpiUserInfos[3].comisType}</dd> <dt class="col-2">${kpiUserInfos[3].rate}%</dt><dd class="col-4">${kpiUserInfos[3].commissionFee}/${kpiUserInfos[3].kpiFee}</dd>
                                     <dt class="col-3">${kpiUserInfos[4].userName}</dt><dd class="col-3">${kpiUserInfos[4].comisType}</dd> <dt class="col-2">${kpiUserInfos[4].rate}%</dt><dd class="col-4">${kpiUserInfos[4].commissionFee}/${kpiUserInfos[4].kpiFee}</dd>
                                     <dt class="col-3">${kpiUserInfos[5].userName}</dt><dd class="col-3">${kpiUserInfos[5].comisType}</dd> <dt class="col-2">${kpiUserInfos[5].rate}%</dt><dd class="col-4">${kpiUserInfos[5].commissionFee}/${kpiUserInfos[5].kpiFee}</dd>
                                    
                                  </dl>
                                 


                                </div>

                              </div>
                              

                            </div>`;
    
  

    

    console.log(kpiUserInfosOne)

   


    $('#displayData').append(str);
count++;
}


function delinfo(id){

 let returnFee = kpiUserInfosOne[id][0].serviceFee

 allotFeeSpan = (parseFloat(allotFeeSpan) + parseFloat(returnFee)).toFixed(3);
  $('#allotFee').text(allotFeeSpan);
  isTrue=true;

   $('#realAllotFee').val(0);


  delete kpiUserInfosOne[id];

  $('#displayData #' + id).remove();

  $('#totalALL').html('');
  //重新计算
  if (Object.keys(kpiUserInfosOne).length === 0) {
    console.log("JSON 是空的");
} else {
    const mergedDataAll = {};
       let totalKpiFee = 0;
                let totalCommissionFee = 0;
                let totalstrALL = '';

         Object.keys(kpiUserInfosOne).forEach(key => {




             
             
                kpiUserInfosOne[key].forEach(item => {
                                const userId = item.userId;
                                
                                if (!mergedDataAll[userId]) {
                                    mergedDataAll[userId] = {
                                        userId: userId,
                                        userName: item.userName,
                                        kpiFee: 0,
                                        commissionFee: 0,
                                        count: 0,
                                        rate:0
                                    };
                                }
                                
                                // 累加金额
                                mergedDataAll[userId].kpiFee += parseFloat(item.kpiFee);
                                mergedDataAll[userId].commissionFee += parseFloat(item.commissionFee);
                                mergedDataAll[userId].rate+= parseFloat(item.rate);
                                mergedDataAll[userId].count++;
                                
                                // 累加总计
                                totalKpiFee += parseFloat(item.kpiFee);
                                totalCommissionFee += parseFloat(item.commissionFee);
                                
                    });


                          



                            
          })

            Object.keys(mergedDataAll).forEach(key => {
                            
                              totalstrALL +=`${mergedDataAll[key].userName} : ${mergedDataAll[key].rate.toFixed(3)}%-${mergedDataAll[key].kpiFee.toFixed(3)} / ${mergedDataAll[key].commissionFee.toFixed(3)} <br>`;
                            })

                             totalstrALL += `总计：${totalKpiFee.toFixed(3)} / ${totalCommissionFee.toFixed(3)}`;

                              console.log('kpiUserInfosAll',kpiUserInfosAll)

                              $('#totalALL').html(totalstrALL);


}



}


function addKPi(){



  try {
    let jsonData={
    sfId:customerMember.options[customerMember.getValue()].sfId,
    customerId:customerMember.options[customerMember.getValue()].customerId,
    customerName:customerMember.options[customerMember.getValue()].customerName,
    serviceFee:customerMember.options[customerMember.getValue()].fee,
    serviceType:customerMember.options[customerMember.getValue()].serviceType,
    type:$("#tcfl").val(),
    rate:$('#tcbl').val(),
  }

  const mergedDataAll = {};
  let totalCommissionFee = 0;

  Object.keys(kpiUserInfosOne).forEach(key => {


    kpiUserInfosOne[key].forEach(item => {
    kpiUserInfosAll.push(item);
    const userId = item.userId;
    if (!mergedDataAll[userId]) {
          mergedDataAll[userId] = {
          userId: userId,
          userName: item.userName,
          kpiFee: 0,
          commissionFee: 0,
          count: 0,
          rate:0
          };
    }
                                
                                // 累加金额
    mergedDataAll[userId].kpiFee += parseFloat(item.kpiFee);
    mergedDataAll[userId].commissionFee += parseFloat(item.commissionFee);
    mergedDataAll[userId].rate+= parseFloat(item.rate);
    mergedDataAll[userId].count++;                                                                                                               
    totalCommissionFee += parseFloat(item.commissionFee);
                                
    });
  })


  jsonData.allotPlan = kpiUserInfosAll;
  jsonData.commissionFee = totalCommissionFee;


  if(jsonData.allotPlan.length ===0 || jsonData.allotPlan.length%6 !==0){
   showMessage(1,'请先完成分配')
   return;
  }

  console.log(jsonData)
  } catch (error) {
     showMessage(1,'请先完成分配')
  }

  //数据汇总


  


}



function checkDetails(id){

  
  const options = {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    'token':localStorage.getItem('token')
    },
    body: JSON.stringify({'sourceId':id}),
    };

    var url = baseUri+'/eco/selectKpiFeeById';
fetch(url,options)
    .then(response => response.json())
    .then(json => {
        // console.log(json)
        if(json.code==0){
            
            let data = json.data;
            console.log(data)

            let payTypestr = '';
            if(data.payType==0){
              payTypestr = '服务费'
            }else if(data.payType==1){
              payTypestr = '咨询费'
            }else if(data.payType==2){
              payTypestr = '首付款'
            }else {
              payTypestr = '其他'
            }


            let allotPlans = data.allotPlans;

            let kpiUserInfosAll = allotPlans[0].kpiUserInfos;

            let kpiusergroup = groupArray(kpiUserInfosAll, 6);
            console.log(kpiusergroup)



            let allotStr = ``;
            if(kpiusergroup){
              kpiusergroup.forEach(kpiUserInfos => {

                const mergedData = {}; 

                let totalstr1 = '';
                kpiUserInfos.forEach(item => {
                                const userId = item.userId;
                                
                                if (!mergedData[userId]) {
                                    mergedData[userId] = {
                                        userId: userId,
                                        userName: item.userName,
                                        kpiFee: 0,
                                        commissionFee: 0,
                                        count: 0,
                                        rate:0
                                    };
                                }
                                
                                // 累加金额
                                mergedData[userId].kpiFee += parseFloat(item.kpiFee);
                                mergedData[userId].commissionFee += parseFloat(item.commissionFee);
                                mergedData[userId].rate+= parseFloat(item.rate);
                                mergedData[userId].count++;
                                
                                // 累加总计
                
                                
                    });


                            Object.keys(mergedData).forEach(key => {
                            
                              totalstr1 +=`${mergedData[key].userName} : ${mergedData[key].rate.toFixed(3)}%-${mergedData[key].kpiFee.toFixed(3)} / ${mergedData[key].commissionFee.toFixed(3)} <br>`;
                            })


                            let type = '';
                            if(kpiUserInfos[0].typeName==0){
                              type = '独立运作';
                            }else if(kpiUserInfos[0].typeName==1){
                              type = '合作运作'; 
                            }else if(kpiUserInfos[0].typeName==2){
                              type = '团队运作';
                            }else{
                              type = '跨区合作';}



                 allotStr += `<div class="col-lg-6 " id="displayData${count}">
                              <div class="card">
                                <div class="card-header">
                                      <span>
                                    人选：${kpiUserInfos[0].talentName || '暂无  '} <br>
                                    ${type} 
                                  </span>
                                    &nbsp;
                                  &nbsp;
                                  <span style="color: red;"> 
                                    ${totalstr1}
                                  </span>
                             
                                            
                          

                                 
                                </div>
                                <div class="card-body">
                                  <dl class="row" style="text-align: left">  
                                    <dt class="col-3">${kpiUserInfos[0].userName}</dt><dd class="col-3">${kpiUserInfos[0].comisType}</dd> <dt class="col-2">${kpiUserInfos[0].rate}%</dt><dd class="col-4">${parseFloat(kpiUserInfos[0].commissionFee).toFixed(2)}/${parseFloat(kpiUserInfos[0].kpiFee).toFixed(2)}</dd>
                                     <dt class="col-3">${kpiUserInfos[1].userName}</dt><dd class="col-3">${kpiUserInfos[1].comisType}</dd> <dt class="col-2">${kpiUserInfos[1].rate}%</dt><dd class="col-4">${parseFloat(kpiUserInfos[1].commissionFee).toFixed(2)}/${parseFloat(kpiUserInfos[1].kpiFee).toFixed(2)}</dd>
                                     <dt class="col-3">${kpiUserInfos[2].userName}</dt><dd class="col-3">${kpiUserInfos[2].comisType}</dd> <dt class="col-2">${kpiUserInfos[2].rate}%</dt><dd class="col-4">${parseFloat(kpiUserInfos[2].commissionFee).toFixed(2)}/${parseFloat(kpiUserInfos[2].kpiFee).toFixed(2)}</dd>
                                     <dt class="col-3">${kpiUserInfos[3].userName}</dt><dd class="col-3">${kpiUserInfos[3].comisType}</dd> <dt class="col-2">${kpiUserInfos[3].rate}%</dt><dd class="col-4">${parseFloat(kpiUserInfos[3].commissionFee).toFixed(2)}/${parseFloat(kpiUserInfos[3].kpiFee).toFixed(2)}</dd>
                                     <dt class="col-3">${kpiUserInfos[4].userName}</dt><dd class="col-3">${kpiUserInfos[4].comisType}</dd> <dt class="col-2">${kpiUserInfos[4].rate}%</dt><dd class="col-4">${parseFloat(kpiUserInfos[4].commissionFee).toFixed(2)}/${parseFloat(kpiUserInfos[4].kpiFee).toFixed(2)}</dd>
                                     <dt class="col-3">${kpiUserInfos[5].userName}</dt><dd class="col-3">${kpiUserInfos[5].comisType}</dd> <dt class="col-2">${kpiUserInfos[5].rate}%</dt><dd class="col-4">${parseFloat(kpiUserInfos[5].commissionFee).toFixed(2)}/${parseFloat(kpiUserInfos[5].kpiFee).toFixed(2)}</dd>
                                    
                                  </dl>
                                 


                                </div>

                              </div>
                              

                            </div>`;
    





















































               
              })
            }






             const mergedData = {}; 

                  let totalKpiFee = 0;
                let totalCommissionFee = 0;
                let totalstr1 = '';
                kpiUserInfosAll.forEach(item => {
                                const userId = item.userId;
                                
                                if (!mergedData[userId]) {
                                    mergedData[userId] = {
                                        userId: userId,
                                        userName: item.userName,
                                        kpiFee: 0,
                                        commissionFee: 0,
                                        count: 0,
                                        rate:0
                                    };
                                }
                                
                                // 累加金额
                                mergedData[userId].kpiFee += parseFloat(item.kpiFee);
                                mergedData[userId].commissionFee += parseFloat(item.commissionFee);
                                mergedData[userId].rate+= parseFloat(item.rate);
                                mergedData[userId].count++;
                                
                                // 累加总计
                
                                totalKpiFee += parseFloat(item.kpiFee);
                                totalCommissionFee += parseFloat(item.commissionFee);
                                
                    });


                            Object.keys(mergedData).forEach(key => {
                            
                              totalstr1 +=`${mergedData[key].userName} : ${mergedData[key].rate.toFixed(3)}%-${mergedData[key].kpiFee.toFixed(3)} / ${mergedData[key].commissionFee.toFixed(3)} <br>`;
                            })




                              totalstr1+=`总计：${totalKpiFee.toFixed(3)} / ${totalCommissionFee.toFixed(3)}`;




















            let mainStr = `<div class="row row-cards" style='text-align: left'>
                        <div class="col-lg-12  row">
                          <div class="col-4 row">
                             <label class="form-label wordbold col-3" >回款信息:</label>
                              <div class="col"  >
                                    <span> ${data.customerName}</span>
                              </div>
                          </div>

                             <div class="col-4 row">
                             <label class="form-label wordbold col-5" >回款金额/提成比例:</label>
                              <div class="col"  >
                                    ${data.serviceFee} / ${data.rate}%
                              </div>
                          </div>
                              <div class="col-2 row">
                             <label class="form-label wordbold col-6" >归属公司:</label>
                              <div class="col"  >
                                    ${data.comName}
                              </div>
                          </div>
                              <div class="col-2 row">
                             <label class="form-label wordbold col-6" >提成分类:</label>
                              <div class="col"  >
                                    ${payTypestr}
                              </div>
                          </div>
                           
                        
                        </div>
                        <hr>
                        <div class="col-lg-12  row">

                         ${allotStr}




                       

                        </div>
                        <hr>
                        <div class="card-footer" >
                        <div class="col-lg-12 row">
                            <div class="col-lg-1"></div>
                        
                            
                            <div class="col-lg-6" style='text-align: left'>
                            <span style="color: red;" >${totalstr1}</span>
                            </div>
                        </div>
                       
                        </div>


                      </div>`;













































































        $('#showdetailbody').html(mainStr);




        }else{
            showMessage(1,"查询失败")
        }



    }).catch((error)=>{
        console.log(error)
    });


 $("#showdetail").modal('show')

}


function groupArray(data, groupSize) {
    const groups = [];
    for (let i = 0; i < data.length; i += groupSize) {
        groups.push(data.slice(i, i + groupSize));
    }
    return groups;
}