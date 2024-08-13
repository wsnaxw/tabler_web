$(function(){
  jeDate("#ymd01",{
      theme:{bgcolor:"#4cc9f0",pnColor:"#00CCFF"},
      format: "YYYY"
  });
  getPage();
})
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

function getFormDate() {
  let form = document.getElementById('myForm');  // 用你的form的ID替换'myForm' 
  let formData = new FormData(form);
  let object = {};
  for (let pair of formData.entries()) {
      object[pair[0]] = pair[1];
  }
  let newJsonData = removeEmptyValues(object);
  if( comMember.items !=null){
    newJsonData.appUserId=comMember.getValue();
  }
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





document.addEventListener("DOMContentLoaded", function () {
  comMember=  new TomSelect('#comMember',{
      //设置可选最大值
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
  });
});

function getPage(){
  let data = getFormDate()
  $('#data').html('');
  $.ajax({
    headers:{
        'token':localStorage.getItem("token"),
        Accept:'application/json',
        'Content-Type':'application/json;charset=UTF-8'
    },
    dataType:'json',
    type:'post',
    url:baseUri+'/kpi/userKpiData',
    data:JSON.stringify(data),
    success:function(obj){

        var str="";
        if(obj.data.length===0){
          $('.table-sort tbody').append("<tr class='text-c'><td colspan='4'>没有数据 !</td></tr>");
          $('#pageSelect').html('');
          $('#totalPageNum').html(0);
          $('#totalPageNum1').html(0);
            
        }else{
            // $("#countsss").css("display","");
            for(var i =0;i<obj.data.length;i++){

                var o = obj.data[i];
    


                str+=
                `
                <tr  id=${i} onclick="clickable(this)"   style="font-weight: bold;"> 
                    <td name='firsticon'>${icon_right}</td>
                    <td >${o.userName}</td>
                    <td >${toStr(o.dataTime)}</td>    
                    <td >${toStr(o.job)}</td>
                    <td >${toStr(o.tgkh)}</td>    
                    <td >${toStr(o.khms)}</td>
                    <td >${toStr(o.offer)}</td>    
                    <td >${toStr(o.cgrz)}</td>
                    <td >${toStr(o.lrrx)}</td>    
                    <td >${toStr(o.qykh)}</td>
                    <td >${toStr(o.fee)}</td>    
                    <td >${toStr(o.score)}</td>
                    
                  </tr>
                `



                var o1 = o.childList;

                if(o1!=null){

                  for (let j = 0; j < o1.length; j++) {
                    const child = o1[j];

                    if(child.dataTime==null)continue;

                    str+=
                    `
                    <tr name="${i}" class="hidden-row">
                        <td></td>
                        <td></td>
                        <td><span style="font-weight: bold;" class="bg-azure-lt">${toStr(child.dataTime)}</span></td><td ></td>
                        <td style='color:#49b6ff'><a onclick="kpiPop1(1,'${toStr(child.userId)}','${toStr(child.dataTime)}',1,${toStr(child.tgkh)})">${toStr(child.tgkh)}</a></td> 
                        <td style='color:#49b6ff'><a onclick="kpiPop1(2,'${toStr(child.userId)}','${toStr(child.dataTime)}',1,${toStr(child.khms)})">${toStr(child.khms)}</a></td>    
                        <td style='color:#49b6ff'><a onclick="kpiPop1(3,'${toStr(child.userId)}','${toStr(child.dataTime)}',1,${toStr(child.offer)})">${toStr(child.offer)}</a></td>    
                        <td style='color:#49b6ff'><a onclick="kpiPop1(4,'${toStr(child.userId)}','${toStr(child.dataTime)}',1,${toStr(child.cgrz)})">${toStr(child.cgrz)}</a></td>    
                        <td style='color:#49b6ff'><a onclick="kpiPop1(5,'${toStr(child.userId)}','${toStr(child.dataTime)}',1,${toStr(child.lrrx)})">${toStr(child.lrrx)}</a></td>    
                        <td style='color:#49b6ff'><a onclick="kpiPop1(6,'${toStr(child.userId)}','${toStr(child.dataTime)}',1,${toStr(child.qykh)})">${toStr(child.qykh)}</a></td>    
                        <td style='color:#49b6ff'><a onclick="kpiPop1(7,'${toStr(child.userId)}','${toStr(child.dataTime)}',1,${toStr(child.fee)})">${toStr(child.fee)}</a></td>       
           
                        <td ></td>
                      </tr>
                    ` 
                  }
                }
            }
            $('#data').html(str);
            document.getElementById('table-default').scrollIntoView({ behavior: 'smooth' });
        }
    }
  });

    
}



function clearForm(){

  comMember.clear();

    $('#formdata input[type="checkbox"], #formdata select, #formdata input[type="text"]').each(function() {
        // 将这些元素的值设置为空
        $(this).val('');
        // 对于checkbox，还需要取消选中状态
        if ($(this).is('input[type="checkbox"]')) {
          $(this).prop('checked', false);
        }
      });
}


function kpiPop1(type,appUserId,date,pageNo,number){

  if(number==0)return;


  let title,uri = '';

  let thead = ` <tr>
              <th>人选名称</th>
              <th>岗位名称</th>
              <th>公司名称</th>
              <th>日期</th>
              </tr>`;

  switch(type){
    case 1:
      title='推给客户-人选列表';
      uri='kpiPop1'
      break;
    case 2:
        title='客户面试-人选列表';
        uri='kpiPop6'
      
      break;  
    case 3:
      title='offer-人选列表';
      uri='kpiPop8'
    
      break;
    case 4:
      title='入职-人选列表';
      uri='kpiPop9'
     
      break;      
    case 5:
      title='录入-人选列表';
      uri='kpiPop12'
      thead=` <tr>
              <th>录入日期</th>
              <th>人选名称</th>
              <th>岗位名称</th>
              </tr>`
      break;
    case 6:
      title='签约客户-客户列表';
      uri='kpiPop13'
      thead=` <tr>
              <th>签约日期</th>
              <th>客户名称</th>
              </tr>`
      break;      
    case 7:
      title='业绩明细';
      uri='kpiFeePop'
      thead=` <tr>
              <th>业绩日期</th>
              <th>客户名称</th>
              <th>回款金额</th>
              <th>业绩比例</th>
              <th>业绩金额</th>
              <th>回款用户</th>
              </tr>`
      break;
  }
















  $("#kpoptitle").html(`${title}`)
  $("#kpopdata").html("");
  $("#kpopmodal").modal("show")

  $.ajax({
    headers:{
        'token':localStorage.getItem("token"),
        Accept:'application/json',
        'Content-Type':'application/json;charset=UTF-8'
    },
    dataType:'json',
    type:'post',
    url:baseUri+'/kpi/'+uri,
    data:JSON.stringify({"appUserId":appUserId,"time":date,"pageNo":pageNo,"pageSize":10}),
    success:function(obj){

        var str="";
        if(obj.data.list.length===0){
          $('#kpopdata').append(`<div style="text-align: center;"><h1>没有数据</h1></div>`);
          $('#pageSelect').html('');
          $('#totalPageNum').html(0);
          $('#totalPageNum1').html(0);
            
        }else{
            // $("#countsss").css("display","");
            for(var i =0;i<obj.data.list.length;i++){

                var o = obj.data.list[i];


                if(type==5){
                  str+=
                  `<tr> 
                     <td >${toStr(o.createTime)}</td>   
                      <td ><a onclick=checktalentdetail("${toStr(o.talentId)}")>${o.talentName}</a></td>
                      <td >${toStr(o.job)}</td>    
                     
                    </tr>`
                }else if(type==6){
                  str+=
                  `<tr> 
                      <td >${toStr(o.createTime)}</td>    
                      <td ><a onclick=checktalentdetail("${toStr(o.customerName)}")>${o.customerName}</a></td>
                    </tr>`
                }else if(type==7){
                  str+=
                  `<tr> 
                      <td >${toStr(o.createTime)}</td>    
                      <td >${toStr(o.customerName)}</td>
                      <td >${toStr(o.serviceFee)}</td>
                      <td >${toStr(o.rate)}</td>
                      <td >${toStr(o.kpiFee)}</td>    
                      <td >${toStr(o.userName)}</td>
                    </tr>`
                }else{

                  str+=
                  `<tr> 
                      <td ><a onclick=checktalentdetail("${toStr(o.talentId)}")>${o.talentName}</a></td>
                      <td >${toStr(o.job)}</td>    
                      <td >${toStr(o.company)}</td>
                      <td >${toStr(o.createTime)}</td>    
                    </tr>`
                 
                }
    


        

            }
            $('#kpopdata').html(`<thead>
              ${thead}
              </thead>
              <tbody>${str}</tbody>`);


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
                    +'<a class="page-link" href="#" onclick="kpiPop1('+appUserId+","+date+","+forward+');">'
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
                    +'<a class="page-link" href="#"  onclick="kpiPop1('+appUserId+","+date+","+backwards+');" >'
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
                            str+= '<li class="page-item active" ><a class="page-link" href="#"  onclick="kpiPop1('+appUserId+","+date+","+i+');" >'+i+'</a></li>'
                        }else{
                            str+= '<li class="page-item" ><a class="page-link" href="#"  onclick="kpiPop1('+appUserId+","+date+","+i+');" >'+i+'</a></li>'
                        }
                    }else{
                        count++;
                        if(count>5){
                            count=0;
                            break;
                        }else{
                            if(i===pageNo){
                                str+= '<li class="page-item active" ><a class="page-link" href="#"  onclick="kpiPop1('+appUserId+","+date+","+i+');" >'+i+'</a></li>'
                            }else{
                                str+= '<li class="page-item" ><a class="page-link" href="#"  onclick="kpiPop1('+appUserId+","+date+","+i+');" >'+i+'</a></li>'
                            }
                        }
                    }
                }

                str+=backwards1;


                $('#pageSelect').html('');
                $('#pageSelect').html(str);
        }
    }
  });






}


function checktalentdetail(talentId){
  alert(talentId)
}