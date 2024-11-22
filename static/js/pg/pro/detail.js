$(function(){
    workId = getParameterByName('workId');
    //  数据填充
    basedatanumber(workId)
  
     // 基本信息
    baseinfo(workId)

    rxxx('',1)
    // $('#rxxqdiv').hide();




    $('#closerxxq').on('click', function(event) {
        // 阻止事件的默认行为（如果有的话）
        event.preventDefault();
    
        // 隐藏元素
        $('#rxxqdiv').hide();
        document.getElementById('rxxxdiv').scrollIntoView({ behavior: 'smooth' });
    
        // 确保没有其他代码导致页面滚动
        // ... 其他逻辑 ...
    });







})

let workId;
let editInfo = {}

function getParameterByName(name) {
    url = window.location.href;
   name = name.replace(/[\[\]]/g, "\\$&");
   var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
       results = regex.exec(url);
   if (!results) return null;
   if (!results[2]) return '';
   return decodeURIComponent(results[2].replace(/\+/g, " "));
}


function rxxx(state,pageNo){
    let state1 = '999';    
    let isForward = true;

    if(state==null||state==undefined||state=='')isForward = false;


    if(state == state1 ){
        state = null;
    }else if(state !='' ){
        state1 =state;
    }

    var data={};
    if(state==null||state==undefined||state==''){
        data ={'projectId':workId ,'pageNo':pageNo}
    }else{
        data ={ 'state': state,'projectId':workId,'pageNo':pageNo}
    }


    const options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'token':localStorage.getItem('token')
        },
        body: JSON.stringify(data),
    };

        var url = baseUri+'/project/selectTPList';
    fetch(url,options)
        .then(response => response.json())
        .then(json => {
            if(json.data.list!=null&&json.data.list.length>0){

                let str =''
               
           
                json.data.list.forEach(o=>{

                  
                    let operate = ``;
                    let tpState ;

                    switch (o.state) {
                        case 0:
                            operate=`
                                    <a class="btn btn-teal btn-sm" onclick="operateTgkh('${o.talentId}','${o.id}')">
                                        推给客户
                                    </a>
                                    <a class="btn btn-danger btn-sm" onclick="operateAbandon('${o.talentId}','${o.id}')">
                                        放弃人选
                                    </a>
                                    `;
                            break;
                        case 1:
                            operate=`
                                    <a class="btn btn-yellow btn-sm" onclick="operateYyms('${o.talentId}','${o.id}')">
                                        预约面试
                                    </a>
                                    <a class="btn btn-danger btn-sm" onclick="operateAbandon('${o.talentId}','${o.id}')">
                                        放弃人选
                                    </a>
                                    `;
                            break;
                        case 5:
                            operate=`
                                    <a class="btn btn-yellow btn-sm" onclick="operateYyms('${o.talentId}','${o.id}')">
                                        预约面试
                                    </a>
                                    <a class="btn btn-orange btn-sm" onclick="operateKhms('${o.talentId}','${o.id}')">
                                        客户面试
                                    </a>
                                    <a class="btn btn-danger btn-sm" onclick="operateAbandon('${o.talentId}','${o.id}')">
                                        放弃人选
                                    </a>
                                    `;
                            break;
                        case 6:
                            operate=`
                                    <a class="btn btn-yellow btn-sm" onclick="operateYyms('${o.talentId}','${o.id}')">
                                        预约面试
                                    </a>
                                    <a class="btn btn-success btn-sm" onclick="operateOffer('${o.talentId}','${o.id}')">
                                        确认offer
                                    </a>
                                    <a class="btn btn-danger btn-sm" onclick="operateAbandon('${o.talentId}','${o.id}')">
                                        放弃人选
                                    </a>
                                    `;
                        break;  
                        case 8:
                            operate=`
                                    <a class="btn btn-primary btn-sm" onclick="operateWork('${o.talentId}','${o.id}')">
                                        确认入职
                                    </a>
                                    <a class="btn btn-danger btn-sm" onclick="operateAbandon('${o.talentId}','${o.id}')">
                                        放弃人选
                                    </a>
                                    `;
                        break; 
                        case 9:
                            operate=`
                                    <a class="btn btn-secondary btn-sm" onclick="operateLeave('${o.talentId}','${o.id}')">
                                        人选离职
                                    </a>
                                    <a class="btn btn-danger btn-sm" onclick="operateAbandon('${o.talentId}','${o.id}')">
                                        放弃人选
                                    </a>
                                    `;
                        break;                
                        default:
                            operate='' ;
                    }

                    str +=
                    `<tr>
                    <td>
                    ${o.userName}
                    </td>
                    <td><span style='font-weight: bold;' class ='bg-primary-lt'><a onclick='checkDetail("${o.talentId}","${o.id}")'>${o.talentName}</a></span></td>
                    <td>
                    ${o.phone}
                    </td>
                    <td>
                    ${toStr(o.company)}
                    </td>
                    <td>
                    ${toStr(o.job)}
                    </td>
                    <td>
                    ${o.createTime}
                    </td>
               
                    <td >
                      <a class="btn btn-info btn-sm" onclick="checkDetail('${o.talentId}','${o.id}')">
                        沟通记录查询
                      </a>
                      ${operate}
                    </td>
                  </tr>`

                })


                $("#rxxxdata").html(str)  
                
                if(state == null)state='';
          
                var pageCount = json.data.count
                

                $('#totalPageNum').html('');
                $('#totalPageNum').html(pageCount);

                var totalPage = json.data.totalPage;
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
                    +'<a class="page-link" href="#" onclick="rxxx('+state1+','+forward+');">'
                      +'<svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M15 6l-6 6l6 6"></path></svg>'
                      +'prev'
                    +'</a>'
                  +'</li>'
                }
                //下一页页数
                var backwards = pageNo+1;
                var backwards1 = '';
                if(pageNo===json.data.totalPage){
                    backwards=pageNo;

                    backwards1 = '<li class="page-item disabled">'
                    +'<a class="page-link" href="#"  tabindex="1" aria-disabled="true">'
                      +'<svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M9 6l6 6l-6 6"></path></svg>'
                      +'next'
                    +'</a>'
                  +'</li>'
                }else{
                    backwards1 = '<li class="page-item">'
                    +'<a class="page-link" href="#"  onclick="rxxx('+state1+','+backwards+');" >'
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
                            str+= '<li class="page-item active" ><a class="page-link" href="#"  onclick="rxxx('+state1+','+i+');" >'+i+'</a></li>'
                        }else{
                            str+= '<li class="page-item" ><a class="page-link" href="#"  onclick="rxxx('+state1+','+i+');" >'+i+'</a></li>'
                        }
                    }else{
                        count++;
                        if(count>5){
                            count=0;
                            break;
                        }else{
                            if(i===pageNo){
                                str+= '<li class="page-item active" ><a class="page-link" href="#"  onclick="rxxx('+state1+','+i+');" >'+i+'</a></li>'
                            }else{
                                str+= '<li class="page-item" ><a class="page-link" href="#"  onclick="rxxx('+state1+','+i+');" >'+i+'</a></li>'
                            }
                        }
                    }
                }

                str+=backwards1;


               
                $('#pageSelect').html('');
                $('#pageSelect').html(str);















            }else{
                $("#rxxxdata").html(` <tr>
                <td colspan="6" style="font-weight: bold;text-align: center;">暂无数据 </td>
              </tr>`) 
            }


            if(isForward )document.getElementById('rxxxdata').scrollIntoView({ behavior: 'smooth' });
        }).catch((error)=>{
            console.log(error)
        });

}





function splitOrGet(str) {  
    // 使用split方法根据'/'字符分割字符串  
    // 如果没有'/'，split方法将返回只包含原字符串的数组  
    const parts = str.split('/');  
    
    // 否则，返回分割后的数组  
    return parts;  
} 


function basedatanumber(pid){
    getData({'projectId': pid},'/project/selectTPListNumber').then(data => {
        try {
            $('#all').html(data.all);
            $('#jxm').html(data.jxm);
            $('#gkh').html(data.gkh);
            $('#yms').html(data.yms);
            $('#khms').html(data.khms);
            $('#offer').html(data.offer);
            $('#yrz').html(data.yrz);
            $('#rxlz').html(data.rxlz);
            $('#fqrx').html(data.fqrx); 
        
        } catch (error) {
            
        }

    }).catch(error => {
        // 处理错误
        console.error('获取数据失败:', error);
    });

 


}


let flame = `<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="#ff3d3d"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-flame"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12c2 -2.96 0 -7 -1 -8c0 3.038 -1.773 4.741 -3 6c-1.226 1.26 -2 3.24 -2 5a6 6 0 1 0 12 0c0 -1.532 -1.056 -3.94 -2 -5c-1.786 3 -2.791 3 -4 2z" /></svg>`


function baseinfo(workId){
    getData({'projectId': workId},'/project/selectPById').then(data => {
        try {
            $('#formdata').html('')
            let cityCode = '';
            if(data.cityCode!=null&&data.cityCode.length>4){
                let cityarray = splitOrGet(data.cityCode)
                if(cityarray!=null&&cityarray.length>0){
                    cityarray.forEach(element => {
                        cityCode += cn.info(element.trim()).name + ' '
                    });
                }
            }else if(!isNumeric(data.cityCode)){
                cityCode = data.cityCode;
            }else{
                cityCode = '不限';
            }

            let level=''

            switch (data.level) {
              case "1":
                level=flame+flame+flame;
                  break;
              case "2":
                level=flame+flame;
                  break;

              default:
                level=flame+flame+flame ;
          }


          let jobGender=''

            switch (data.requireGender) {
              case 1:
                jobGender='男'
                  break;
              case 2:
                 jobGender='女'
                  break;

              default:
                  jobGender='不限'
          }



          let requireEduStr = '';
          switch (data.requireEdu) {
            case 0:
                requireEduStr = '不限';
              break;
            case 1:
                requireEduStr = '初中以上';
              break;
            case 2:
                requireEduStr = '中专以上';
              break;
            case 3:
                requireEduStr = '高中以上';
              break;
            case 4:
                requireEduStr = '大专以上';
              break;
            case 5:
                requireEduStr = '本科以上';
              break;
            case 6:
                requireEduStr = '硕士以上';
              break;
            case 7:
                requireEduStr = '博士及以上';
              break;
            default:
                requireEduStr = '不限';
          }
   
        //   0 草稿 1 运作、2结束、3暂停、4关闭
          let state=''
          if(data.state==0){

           state =`<a class="btn btn-outline-info btn-sm" onclick="changeCState(1)">直接发布</a>`;


        }else if(data.state==1){
            state =`<a class="btn btn-outline-secondary btn-sm" onclick="changeCState(3)">暂停</a><a class="btn btn-outline-danger btn-sm" onclick="changeCState(4)">关闭</a>`;


        }else if(data.state==3){
            state =`<a class="btn btn-outline-success btn-sm" onclick="changeCState(1)">恢复</a><a class="btn btn-outline-danger btn-sm" onclick="changeCState(2)">结束</a>`;


        
        }

        let str =` <div class="row row-cards"> 
                      <div class="col-lg-12">
                        <div class="card">
                          <div class="card-status-start bg-primary"></div>
                          <div class="card-header">
                            <h2 class="card-title" style="font-weight: bold;">${toStr(data.name)}</h2>&nbsp;&nbsp;<span  style="color: red;font-weight: bold;">${toStr(data.salary)}万</span>&nbsp;&nbsp;${toStr(level)}
                            <div class="card-actions">
                              <a href="p-creation.html" target='_blank' class="btn btn-ghost-primary" >
                                新增职位 
                              </a>
                              <a href="#" class="btn btn-ghost-info"  data-bs-toggle='modal' data-bs-target='#modal-edit' onclick="initEdit()">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon ms-1" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"></path><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z"></path><path d="M16 5l3 3"></path></svg>
                              </a>
                            </div>
                          </div>
                          <div class="card-body">
                            <div class="row mb-3">
                              <div class="col-lg-3 row">
                                <h3 class="col" >${toStr(data.customerName)}</h3>
                                <small class="form-hint">岗位编码：${toStr(data.projectId)}</small>
                              </div>
                              <div class="col-3">
                                <span >${toStr(data.requireAgeS)} - ${toStr(data.requireAgeE)} 岁</span>
                                <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="#000000"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-minus-vertical"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5v14" /></svg>
                                <span >${requireEduStr}</span>
                                <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="#000000"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-minus-vertical"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5v14" /></svg>
                                <span>${jobGender}</span>
                              </div>
                              <div class="col-lg-6">
                                创建时间：<span >${data.createTime}</span>
                              </div>
                            </div>
                            <dl class="row mb-3">
                              <dt class="col-1">职位类别:</dt>
                              <dd class="col-2" >${toStr(data.requireAgeS)}</dd>
                              <dt class="col-1">招聘人数:</dt>
                              <dd class="col-2" >${data.recruitNum}</dd>
                              <dt class="col-1">归属部门:</dt>
                              <dd class="col-2" >无</dd>
                              <dt class="col-1">工作地点:</dt>
                              <dd class="col-2">${toStr(cityCode)}</dd>
                              <dt class="col-1">状态:</dt>
                               <dd class="col-2"><span>${toStr(data.stateData)}</span>  ${state}</dd>
                              <dt class="col-1">执行团队:</dt>
                              <dd class="col-6">
                                <div id='teamlist'>
                               </div>
                              <dt class="col-2"></dt>
                              <dt class="col-1">职位描述:</dt>
                              <dd class="col-6">
                                <span>
                                  ${toTextbr(data.details)}
                                </span>
                              </dd>                          
                            </dl>
                          </div>
                        </div>
                      </div>
                    </div>`
            $('#formdata').html(str)
               

            teamlist(workId)
        } catch (error) {
            
        }

    }).catch(error => {
        // 处理错误
        console.error('获取数据失败:', error);
    });

      // 团队成员
 

}




function teamlist(customerId){

    getData({'projectId': customerId},'/project/selectPTList').then(data => {
        // 这里处理从getData返回的数据

        try {

            let str =''

            let newteammember=     
            ' <span class="badge bg-green-lt" onclick="newTeamList()">新增'
            +'<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg> </span>'  
       
            if(data.list!=null||data.list.length>0){
                
               
                $('#teamlist').html('')
                data.list.forEach(o=>{

                    str+=

                    // '<span class="badge bg-twitter-lt" >'
                    // + o.userName
                    // + '<a onclick="deletemember('+o.userId+')" style="color: black;">'
                    //  +' <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>'
                    // +'</a></span>'                    
                    
                  `<span class="tag">
                        ${o.userName}
                        <a onclick="deletemember(${o.userId})"  class="btn-close"></a>
                      </span>`

                })
                $('#teamlist').html(str+newteammember)
            }else{
                $('#teamlist').html(newteammember)
            }

        } catch (error) {
        }

    }).catch(error => {
        // 处理错误
        console.error('获取数据失败:', error);
    });


}


function newTeamList(){

    $("#membermodal").modal('show')
    
    // $("#operate-modal").modal('show')


}


function deletemember(uid){

    var isConfirmed = confirm("您确定要删除吗？");
    if (isConfirmed) {
        // 用户点击了“确定”按钮
        // 执行删除操作
        console.log("删除操作已执行");

        const options = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'token':localStorage.getItem('token')
            },
            body: JSON.stringify({ 'appUserId': uid,'projectId':workId }),
            };

            var url = baseUri+'/project/delTeamPerson';
        fetch(url,options)
            .then(response => response.json())
            .then(json => {
    
                showMessage(json.code)
                teamlist(workId)
            }).catch((error)=>{
                
            });



    } else {
        // 用户点击了“取消”按钮或关闭了对话框
        console.log("删除操作被取消");
    }

}


function toStr(value) {
    if (value === null || value === undefined) {
        return '';
    }
    return value.toString();
}


let tomselectmember;

document.addEventListener("DOMContentLoaded", function () {
    tomselectmember= new TomSelect('#addTeamMember',{
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

function addTeamList(){
    var selectElement = document.getElementById('addTeamMember');
    // console.log(selectElement.value)


     // 获取所有具有相同name属性的radio元素
    var radios = document.getElementsByName('myRadio');
    var jobManage ='0';
    for (var i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
            jobManage = radios[i].value;
            break; 
        }
    }
    //获取tomselect得某项json值

// console.log(tomselectmember.options[selectElement.value].name);

// console.log(tomselectmember);



    const options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'token':localStorage.getItem('token')
        },
        body: JSON.stringify({ 'appUserId': selectElement.value,'appUserName':tomselectmember.options[selectElement.value].name,"projectId":workId }),
        };

        var url = baseUri+'/project/addTeamPerson';
    fetch(url,options)
        .then(response => response.json())
        .then(json => {
            // console.log(json)
            if(json.code==0){
                
        teamlist(workId)
        showMessage(0,'添加成功！！')
            }



        }).catch((error)=>{
            console.log(error)
        });




}



function signCustomer(){

// 获取div元素
var divElement = document.getElementById('modal-sign');
// 获取div内所有的input元素
var inputElements = divElement.querySelectorAll('input');


// 遍历input元素，并为每个元素添加input事件监听器
inputElements.forEach(function(input) {
    input.addEventListener('input', function() {
        // 移除之前的valid和invalid类
        this.classList.remove('is-valid', 'is-invalid','is-valid-lite','is-invalid-lite');
        // 根据输入内容添加相应的类
        if (this.value.trim() !== '') {
            this.classList.add('is-valid-lite');
            this.classList.add('is-valid');
        } else {
            this.classList.add('is-invalid');
            this.classList.add('is-invalid-lite');
        }
    });
});


  $('#modal-sign').modal('show')


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
    }else if(type==9||type==='error'){
        messageElement.className = 'message visible alert alert-warning';
        if(text==null)text='请规范操作！！！';

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


function signC(){

    // 获取div元素
    var divElement = document.getElementById('modal-sign');
 
    // 获取div内所有非disabled的input元素
    var inputElements = divElement.querySelectorAll('input:not([disabled])');
    var inputValues = {};
    var isCheck = true;
    // 遍历input元素，检查值是否为空，并进行提示
    inputElements.forEach(function(input) {
     input.classList.remove('is-valid', 'is-invalid','is-valid-lite','is-invalid-lite');
     
     // 根据输入内容添加相应的类
     if (input.value.trim() !== '') {
         inputValues[input.name]=input.value;
      input.classList.add('is-valid');
      input.classList.add('is-valid-lite');
     } else {
      input.classList.add('is-invalid');
      input.classList.add('is-invalid-lite');
      isCheck=false;
     }
 
    });


    if(filenames.length==0){
        $('#fileerror').show()
        isCheck=false;
    }
    
    inputValues['files']=filenames
    console.log(inputValues)



    if(!isCheck){
         return;
    }else{

        
        inputValues['customerId']=csid;
        const options = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'token':localStorage.getItem('token')
            },
            body:  JSON.stringify(inputValues) ,
            };

            var url = baseUri+'/customer/signCustomer';
        fetch(url,options)
            .then(response => response.json())
            .then(json => {
    
                showMessage(json.code)
            }).catch((error)=>{
                
            });


    }

 $('#modal-sign').modal('hide')

}


function check1(){
    document.querySelector('input[name="downPayment"]').disabled=true;
}


function check2(){
    document.querySelector('input[name="downPayment"]').disabled=false;
}





function changeCState(state){

    let url1 ;
    switch (state) {
        case 1:
            url1 = 'runProject';
          break;
        case 3:
            url1 = 'pauseProject';
          break;
        case 4:
            url1 = 'closeProject';
          break;
        case 2:
            url1 = 'finishProject';
          break;
        
      }

    //   0 草稿 1 运作、2结束、3暂停、4关闭
    


    
    var isConfirmed = confirm("是否变更状态？");

    if (isConfirmed) {
        const options = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'token':localStorage.getItem('token')
            },
            body: JSON.stringify({ 'projectId':workId }),
            };
    
            var url = baseUri+'/project/'+url1;
        fetch(url,options)
            .then(response => response.json())
            .then(json => {
                // console.log(json)
                if(json.code==0){
                    
            baseinfo(workId)
            showMessage(0,'变更成功')
                }
    
    
    
            }).catch((error)=>{
                callback();
            });





    } else {
        // 用户点击了“取消”按钮或关闭了对话框
        console.log("删除操作被取消");
    }

    

}



function initEdit(){



    $('input[name="outName"]').val(editInfo.outName)


    $('input[name="registeredAddress"]').val(editInfo.registeredAddress)

    $('input[name="webSite"]').val(editInfo.webSite)



    // 获取select元素
    const selectElement1 = document.getElementById('customerSize');
    // 遍历select元素下的所有option元素
    for (let i = 0; i < selectElement1.options.length; i++) {
        const option = selectElement1.options[i]; 
        // 检查option的value是否和后端返回的customerType匹配
        if (option.value === editInfo.customerSize.toString()) {
            // 如果匹配，设置该option为selected
            option.selected = true;
            break; // 找到匹配项后，跳出循环
        }
    }


    // 获取select元素
    const selectElement2 = document.getElementById('customerNature');
    // 遍历select元素下的所有option元素
    for (let i = 0; i < selectElement2.options.length; i++) {
        const option = selectElement2.options[i]; 
        // 检查option的value是否和后端返回的customerType匹配
        if (option.value === editInfo.customerNature.toString()) {
            // 如果匹配，设置该option为selected
            option.selected = true;
            break; // 找到匹配项后，跳出循环
        }
    }


        // 获取select元素
        const selectElement3 = document.getElementById('industryType');
        // 遍历select元素下的所有option元素
        for (let i = 0; i < selectElement3.options.length; i++) {
            const option = selectElement3.options[i]; 
            // 检查option的value是否和后端返回的customerType匹配
            if (option.value === editInfo.industryType.toString()) {
                // 如果匹配，设置该option为selected
                option.selected = true;
                break; // 找到匹配项后，跳出循环
            }
        }
    
    




}



function editCustomer(){

    // 获取 modal-edit 容器
    var modalEditContainer = document.getElementById('modal-edit');

    // 创建一个对象来存储表单值
    var formValues = {};

    var check=true;
    // 遍历 modal-edit 容器内的所有 select 和 input 元素
    var inputs = modalEditContainer.querySelectorAll('select, input');
    inputs.forEach(function(input) {
        // 获取元素的id作为键
        var inputId = input.name;
        if (inputId) { // 确保元素有id
            // 获取元素的值
            var value = input.value.trim(); // 去除值两侧的空白字符

            // 判断值是否为空
            if (value === '') {
                check= false;
            } else {
            // 如果值不为空，则添加到formValues对象中
            formValues[inputId] = value;
            }
        }
    });



    if(!check){
        showMessage(1,'信息不能为空')
    }else{

        

        if(objectsAreEqual(editInfo,formValues)){


            $('#modal-edit').modal('hide');

            return;
        }



    formValues['customerId']=csid;

        const options = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'token':localStorage.getItem('token')
            },
            body: JSON.stringify(formValues),
            };

            var url = baseUri+'/customer/updateCustomer';
        fetch(url,options)
            .then(response => response.json())
            .then(json => {
    
                showMessage(json.code)
                baseinfo(csid)
            }).catch((error)=>{
                
            });

        $('#modal-edit').modal('hide')


    }


}


function objectsAreEqual(obj1, obj2) {
    // 如果两个对象不是同种类型，则它们不相等
    if (typeof obj1 !== typeof obj2) {
        return false;
    }

    // 如果它们都是原始类型，直接比较
    if (typeof obj1 !== 'object' || obj1 === null || obj2 === null) {
        return obj1 === obj2;
    }

    // 获取对象的所有键
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    // 如果键的数量不同，则对象不相等
    if (keys1.length !== keys2.length) {
        return false;
    }

    // 检查每个键的值是否相等
    for (let key of keys1) {
        if (!objectsAreEqual(obj1[key], obj2[key])) {
            return false;
        }
    }

    // 所有键的值都相等，对象相等
    return true;
}






function checkDetail(tanlentId,pid){
    $('#rxxqdiv').show()
    const options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'token':localStorage.getItem('token')
        },
        body: JSON.stringify({ 'id': pid }),
        };

        var url = baseUri+'/talent/selectTPById';
    fetch(url,options)
        .then(response => response.json())
        .then(json => {


            
          let gender=''

          switch (json.data.talentInfo.gender) {
            case 1:
                gender='男'
                break;
            case 2:
                gender='女'
                break;

            default:
                gender='无'
        }



        let requireEduStr = '';
        switch (json.data.talentInfo.education) {
          case 0:
              requireEduStr = '无';
            break;
          case 1:
              requireEduStr = '初中';
            break;
          case 2:
              requireEduStr = '中专';
            break;
          case 3:
              requireEduStr = '高中';
            break;
          case 4:
              requireEduStr = '大专';
            break;
          case 5:
              requireEduStr = '本科';
            break;
          case 6:
              requireEduStr = '硕士';
            break;
          case 7:
              requireEduStr = '博士';
            break;
          default:
              requireEduStr = '无';
        }


        
        let state = '';
        switch (json.data.state) {
          case 0:
            state = '加项目';
            break;
          case 1:
            state = '给客户';
            break;
          case 5:
            state = '约面试';
            break;
          case 6:
            state = '客户面试';
            break;
          case 8:
            state = '确认offer';
            break;
          case 9:
            state = '已入职';
            break;
          case 10:
            state = '人选离职';
            break;
          case 4:
            state = '放弃人选';
            break;
          default:
            state = '加项目';
        }





            let basedata = `<div class="row mb-3">
                                  <div >
                                    <h3>${toStr(json.data.talentInfo.name)}</h3>
                                    <span>${toStr(json.data.talentInfo.phone)}</span>
                                    <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="#000000"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-minus-vertical"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5v14" /></svg>   
                                    <span>${gender}</span>
                                    <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="#000000"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-minus-vertical"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5v14" /></svg>
                                    <span>${requireEduStr}</span>
                                    <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="#000000"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-minus-vertical"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5v14" /></svg>
                                    <span>${toStr(json.data.talentInfo.age)} 岁</span>
                                  </div>
                                </div>
                                <dl class="row mb-3">
                                  <dt class="col-2">当前公司:</dt>
                                  <dd class="col-4">${toStr(json.data.talentInfo.lastCompany)}</dd>
                                  <dt class="col-2">电子邮箱:</dt>
                                  <dd class="col-4">${toStr(json.data.talentInfo.email)}</dd>
                                </dl>
                                <dl class="row mb-3">
                                  <dt class="col-2">当前职位:</dt>
                                  <dd class="col-4">${toStr(json.data.talentInfo.job)}</dd>
                                  <dt class="col-2">目前薪资:</dt>
                                  <dd class="col-4">${toStr(json.data.talentInfo.salary)}</dd>
                                </dl>
                                <dl class="row mb-3">
                                  <dt class="col-2">人选状态:</dt>
                                  <dd class="col-4">${state}</dd>
                                  <dt class="col-2">保用期:</dt>
                                  <dd class="col-4">${json.data.quot}</dd>
                                </dl>
                                <dl class="row mb-3">
                                  <dt class="col-2">推荐人:</dt>
                                  <dd class="col-4" >${json.data.userName}</dd>
                                  <dt class="col-6"></dt>
                                </dl>
                                <dl class="row mb-3">
                                  <dt class="col-2">备注:</dt>
                                  <dd class="col-6">${toStr(json.data.remark)}</dd>  
                                </dl>`


            $('#talentDetailDiv').html('')


            $('#talentDetailDiv').html(basedata)

            
            $('#tpFlowDiv').html('')


            if(json.data.tpFlowList!=null&&json.data.tpFlowList.length>0){


                
                let datastr=``;
                for(var i =0;i<json.data.tpFlowList.length;i++){
                    let o = json.data.tpFlowList[i]


                    
                    let state1 = '';
                    switch (o.state) {
                    case '0':
                        state1 = '加入项目';
                        break;
                    case '1':
                        state1 = '推给客户';
                        break;
                    case '5':
                        state1 = '预约面试';
                        break;
                    case '6':
                        state1 = '客户面试';
                        break;
                    case '8':
                        state1 = '确认offer';
                        break;
                    case '9':
                        state1 = '人选入职';
                        break;
                    case '10':
                        state1 = '人选离职';
                        break;
                    case '4':
                        state1 = '放弃人选';
                        break;
                    default:
                        state1 = '加项目';
                    }

                    let str=``
                    if(i==0){
                        str =`<li class="step-item" ondblclick='edittpflow("${o.id}","${pid}")'>
                                    <div class="h4 m-0" style="color: red;">${state1}</div>
                                    <div class="text-secondary">${o.createTime}</div>
                                    <div style="border:black">
                                    ${toTextbr(o.remark)}
                                    </div>
                                  </li>`;
                    }else{
                         str =`<li class="step-item" ondblclick='edittpflow("${o.id}","${pid}")'>
                                    <div class="h4 m-0">${state1}</div>
                                    <div class="text-secondary">${o.createTime}</div>
                                    <div style="border:black">
                                    ${toTextbr(o.remark)}
                                    </div>
                                  </li>`;
                    }
                    sessionStorage.setItem(o.id,o.remark);
                              
                    datastr+=str;

                }

                $('#tpFlowDiv').html(datastr)


            }


        }).catch((error)=>{
            
    })


    $('#rxxqdiv').show()
    document.getElementById('rxxqdiv').scrollIntoView({ behavior: 'smooth' });

}


function edittpflow(id,pid){

    let str =    sessionStorage.getItem(id);

    $("#operatediv").html(`              <div class="modal-header">
        <h5 class="modal-title">编辑备注信息</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">

        <label class="form-label"  style="font-weight: bold;">备注信息</label>

        <div class="input-group input-group-flat">
          <textarea rows="3" class="form-control" name="remark">${str}</textarea>

        </div>  
        <input type="hidden" name="id" value="${id}">
         <input type="hidden" name="projectId" value="${workId}">
       
      </div>
      <div class="modal-footer">
        <button type="button" class="btn me-auto" data-bs-dismiss="modal">取消</button>
        <button type="button" class="btn btn-primary" onclick="edittf(${pid})" >确定</button>
      </div>`)




$("#operate-modal").modal('show')
                              
}


function edittf(pid){
    var data = {};

    // 获取operatediv元素内部所有input和textarea元素
    $('#operatediv input, #operatediv textarea').each(function () {
      var name = $(this).attr('name');
      var value = $(this).val();
      if (name) {  // 只收集有name属性的input和textarea
          data[name] = value;
      }
    });

    $("#operate-modal").modal('hide')
    const options = {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      'token':localStorage.getItem('token')
      },
      body: JSON.stringify(data),
      };
      var url = baseUri+'/project/updateTPFlow';
  fetch(url,options)
      .then(response => response.json())
      .then(json => {
          showMessage(json.code);
         
          checkDetail(pid,pid);
      }).catch((error)=>{       
        console.log(error);     
      });
}

function toTextbr(text){
    if(text==null)return '';

    return text.replace(/\n/g, '<br>');



}


function operateTgkh(talentId,id){




    $("#operatediv").html(`              <div class="modal-header">
                <h5 class="modal-title">推给客户</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">

                <label class="form-label"  style="font-weight: bold;">备注信息</label>

                <div class="input-group input-group-flat">
                  <textarea rows="3" class="form-control" name="remark"></textarea>

                </div>  
                <input type="hidden" name="id" value="${id}">
                <input type="hidden" name="projectId" value="${workId}">
                 
               
              </div>
              <div class="modal-footer">
                <button type="button" class="btn me-auto" data-bs-dismiss="modal">取消</button>
                <button type="button" class="btn btn-primary" onclick="tgkh()" >确定</button>
              </div>`)




    $("#operate-modal").modal('show')
}

function tgkh(){
    var data = {};

      // 获取operatediv元素内部所有input和textarea元素
      $('#operatediv input, #operatediv textarea').each(function () {
        var name = $(this).attr('name');
        var value = $(this).val();
        if (name) {  // 只收集有name属性的input和textarea
            data[name] = value;
        }
      });
      console.log(JSON.stringify(data));
      $("#operate-modal").modal('hide')
      const options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'token':localStorage.getItem('token')
        },
        body: JSON.stringify(data),
        };
        var url = baseUri+'/project/recommendTalent';
    fetch(url,options)
        .then(response => response.json())
        .then(json => {
            showMessage(json.code)
            basedatanumber(workId);
            rxxx('',1)
        }).catch((error)=>{            
        });
}


function operateYyms(talentId,id){



    $("#operatediv").html(`<div class="modal-header">
                <h5 class="modal-title">预约面试</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">


                <div class="card-body">

                  <div class="row mb-3">
                    <dt  class="col-3">面试类型</dt>
                    <dl class="col-9">
                      <select class="form-select"  name="way">
                        <option selected value="1">线上面试</option>
                        <option  value="0">线下面试</option>
                      </select>
                    </dl>

                  
                  </div>

                  <div class="row mb-3">
                    <dt  class="col-3">面试时间</dt>
                    <dl class="col-3">
                      <select class="form-select"  name="type">
                        <option selected value="0">初试</option>
                        <option  value="1">复试</option>
                        <option  value="2">终试</option>
                      </select>
                    </dl>
                    <dl class="col-6 input-icon">
                      <input type="text" class="form-control dateinput dateicon je-mr25" name="time" id="mstime" autocomplete="off">
                    <span class='input-icon-addon'><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-calendar-month"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" /><path d="M16 3v4" /><path d="M8 3v4" /><path d="M4 11h16" /><path d="M7 14h.013" /><path d="M10.01 14h.005" /><path d="M13.01 14h.005" /><path d="M16.015 14h.005" /><path d="M13.015 17h.005" /><path d="M7.01 17h.005" /><path d="M10.01 17h.005" /></svg></span>

                    </dl>
                  </div>
                </div>

                <div class="row mb-3">
                  <dt  class="col-3">面试地点</dt>
                  <dl class="col-9">
                    <input type="text" class="form-control" name="address">
                  </dl>

                </div>

                <div class="row mb-3">
                  <dt  class="col-3">备注信息</dt>
                  <dl class="col-9">
                    <textarea rows="5" class="form-control"  name="remark"></textarea>
                  </dl>

                </div>

               <input type="hidden" name="id" value="${id}">
                <input type="hidden" name="projectId" value="${workId}">
                 
               
              </div>
              <div class="modal-footer">
                <button type="button" class="btn me-auto" data-bs-dismiss="modal">取消</button>
                <button type="button" class="btn btn-primary" onclick="yyms()" >确定</button>
              </div>`)




    jeDate("#mstime",{
        theme:{bgcolor:"#4cc9f0",pnColor:"#00CCFF"},
        format: "YYYY-MM-DD hh:mm:ss"
    });
    
    $("#operate-modal").modal('show')
}

function yyms(){


      var data = {};

      // 获取operatediv元素内部所有input和textarea元素
      $('#operatediv input, #operatediv textarea,#operatediv select').each(function () {
        var name = $(this).attr('name');
        var value = $(this).val();
        if (name) {  // 只收集有name属性的input和textarea
            data[name] = value;
 
        }
      });
      console.log(JSON.stringify(data));
      $("#operate-modal").modal('hide')
      const options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'token':localStorage.getItem('token')
        },
        body: JSON.stringify(data),
        };
        var url = baseUri+'/project/interview';
    fetch(url,options)
        .then(response => response.json())
        .then(json => {
            showMessage(json.code)
            basedatanumber(workId);
            rxxx('',1)
        }).catch((error)=>{            
        });

}




function operateKhms(talentId,id){




    $("#operatediv").html(`              <div class="modal-header">
                <h5 class="modal-title">客户面试</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">

                <label class="form-label"  style="font-weight: bold;">备注信息</label>

                <div class="input-group input-group-flat">
                  <textarea rows="3" class="form-control" name="remark"></textarea>

                </div>  
                <input type="hidden" name="id" value="${id}">
                <input type="hidden" name="projectId" value="${workId}">
                 
               
              </div>
              <div class="modal-footer">
                <button type="button" class="btn me-auto" data-bs-dismiss="modal">取消</button>
                <button type="button" class="btn btn-primary" onclick="khms()" >确定</button>
              </div>`)




    $("#operate-modal").modal('show')
}

function khms(){
    var data = {};

      // 获取operatediv元素内部所有input和textarea元素
      $('#operatediv input, #operatediv textarea').each(function () {
        var name = $(this).attr('name');
        var value = $(this).val();
        if (name) {  // 只收集有name属性的input和textarea
            data[name] = value;
        }
      });
      console.log(JSON.stringify(data));
      $("#operate-modal").modal('hide')
      const options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'token':localStorage.getItem('token')
        },
        body: JSON.stringify(data),
        };
        var url = baseUri+'/project/customerInterview';
    fetch(url,options)
        .then(response => response.json())
        .then(json => {
            showMessage(json.code)
            basedatanumber(workId);
            rxxx('',1)
        }).catch((error)=>{            
        });
}


function operateOffer(talentId,id){

    $("#operatediv").html(` 
              <div class="modal-header">
                <h5 class="modal-title">确认offer</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">


                <div class="card-body">

                 

                  <div class="row mb-3">
                    <div class="col-6">
                      <label class="form-label required" style="font-weight: bolder;">offer时间</label>
                      <div class="input-group input-group-flat">
                      
                        <input type="text" class="form-control dateinput dateicon je-mr25" name="offerDate" id="offertime" autocomplete="off">
                        <span class='input-group-text'><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-calendar-month"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" /><path d="M16 3v4" /><path d="M8 3v4" /><path d="M4 11h16" /><path d="M7 14h.013" /><path d="M10.01 14h.005" /><path d="M13.01 14h.005" /><path d="M16.015 14h.005" /><path d="M13.015 17h.005" /><path d="M7.01 17h.005" /><path d="M10.01 17h.005" /></svg></span>

                        <div class="invalid-feedback">不能为空！</div>

                      </div>
                    </div>
                    <div class="col-6">
                      <label class="form-label required" style="font-weight: bolder;">入职时间</label>
                      <div class="input-group input-group-flat">
                        <input type="text" class="form-control dateinput dateicon je-mr25" name="workDate" id="rztime" autocomplete="off">
                        <span class='input-group-text'><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-calendar-month"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" /><path d="M16 3v4" /><path d="M8 3v4" /><path d="M4 11h16" /><path d="M7 14h.013" /><path d="M10.01 14h.005" /><path d="M13.01 14h.005" /><path d="M16.015 14h.005" /><path d="M13.015 17h.005" /><path d="M7.01 17h.005" /><path d="M10.01 17h.005" /></svg></span>
                        <div class="invalid-feedback">不能为空！</div>
                      </div>
                    </div>
                  </div>

                  
                  <div class="row mb-3" >
                    <div class="col-4">
                      <label class="form-label required" style="font-weight: bolder;">年薪</label>
                      <div class="input-group input-group-flat">
                        <input type="text" class="form-control" name="salary" autocomplete="off">
                        <span class="input-group-text">
                          <kbd>万</kbd>
                        </span>
                        <div class="invalid-feedback">不能为空！</div>
                      </div>
                    </div>
                    <div class="col-4">
                      <label class="form-label" style="font-weight: bolder;">预收服务费</label>
                      <div class="input-group input-group-flat">
                        <input type="text" class="form-control" name="needPayment" autocomplete="off">
                        <span class="input-group-text">
                          <kbd>元</kbd>
                        </span>
                      </div>
                    </div>
                    <div class="col-4">
                      <label class="form-label required" style="font-weight: bolder;">保用期</label>
                      <div class="input-group input-group-flat">
                        <input type="number" class="form-control" name="quot" value='6' autocomplete="off">
                        <span class="input-group-text">
                          <kbd>月</kbd>
                        </span>
                        <div class="invalid-feedback">不能为空！</div>
                      </div>
                    </div>
                  </div>


                  <div class="mb-3">
                    <div class="form-label" style="font-weight: bolder;">收费方式</div>
                    <div>
                      <label class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="chargeWay" checked="" value="0">
                        <span class="form-check-label">按固定比例收费</span>
                      </label>
                      <label class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="chargeWay" value="1">
                        <span class="form-check-label">按固定金额收费</span>
                      </label>
                      
                    </div>
                  </div>
         
           
                  
                  <div class="row ">
                    <dt  class="col-3 required">税率</dt>
                    <dl class="col-9">
                      <select class="form-select"  name="feeRate">
                        <option  value="0%">0%</option>
                        <option  value="1%">1%</option>
                        <option selected  value="3%">3%</option>
                        <option  value="6%">6%</option>
                      </select>
                    </dl>
                  </div>

                  <div class="row mb-3" >
                    <div class="col-6" >
                      <label class="form-label required" style="font-weight: bolder;">固定比例</label>
                      <div class="input-group" >
                        <input type="text" class="form-control" name="rate" value='20' autocomplete="off"  >
                        <span class="input-group-text" >
                          %
                        </span>
                        <div class="invalid-feedback">不能为空！</div>
                      </div>
                    </div>
                    <div class="col-6">
                      <label class="form-label required" style="font-weight: bolder;">固定金额</label>
                      <div class="input-group">
                        <input type="text" class="form-control" name="ration" autocomplete="off" disabled>
                        <span class="input-group-text">
                          元
                        </span>
                        <div class="invalid-feedback">不能为空！</div>
                      </div>
                    </div>
                    
                  </div>


                  <div class="row mb-3">
                    <label class="form-label" style="font-weight: bolder;">备注</label>
                    <textarea rows="5" class="form-control" placeholder="Here can be your description" name="remark"></textarea>
                  </div>
                <input type="hidden" name="id" value="${id}">
                <input type="hidden" name="projectId" value="${workId}">
              </div>
              <div class="modal-footer">
                <button type="button" class="btn me-auto" data-bs-dismiss="modal">取消</button>
                <button type="button" class="btn btn-primary" onclick="offer()" >确定</button>
              </div>
            `)






    jeDate("#offertime",{
        theme:{bgcolor:"#4cc9f0",pnColor:"#00CCFF"},
        format: "YYYY-MM-DD"
    });

    
    jeDate("#rztime",{
        theme:{bgcolor:"#4cc9f0",pnColor:"#00CCFF"},
        format: "YYYY-MM-DD"
    });





    const radios = document.querySelectorAll('input[name="chargeWay"]');

        // 为每个单选按钮添加'change'事件监听器
        radios.forEach(radio => {
            radio.addEventListener('change', function() {
                // 检查选中的单选按钮的值
                if (this.value === '0') {

                    $("input[name='rate']").prop('disabled',false);

                    $("input[name='ration']").prop('disabled',true);
                    

                } else if (this.value === '1') {
                    $("input[name='rate']").prop('disabled',true);

                    $("input[name='ration']").prop('disabled',false);
                }
            });
        });








    
    $("#operate-modal").modal('show')
}


function offer(){



    let data = offerformcheck();



    if(data.check){

      $("#operate-modal").modal('hide')
      const options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'token':localStorage.getItem('token')
        },
        body: JSON.stringify(data),
        };
        var url = baseUri+'/project/sendOffer';
        fetch(url,options)
        .then(response => response.json())
        .then(json => {
            showMessage(json.code)
            basedatanumber(workId);
            rxxx('',1)
        }).catch((error)=>{            
        });
    }




}

function offerformcheck(){


    let check =true;
    
    const divElement = document.getElementById("operatediv");


    // 使用querySelectorAll选择div内的所有input元素
    const elements = divElement.querySelectorAll('select, input,textarea');
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


    var inputElements = divElement.querySelectorAll('input:not([disabled])');
    console.log(inputElements)
    inputElements.forEach(function(input) {
        input.classList.remove('is-valid', 'is-invalid','is-valid-lite','is-invalid-lite');
        if(input.name == 'offerDate'||input.name =='workDate'||input.name =='salary'||input.name =='quot'){
            input.classList.remove('is-valid', 'is-invalid','is-valid-lite','is-invalid-lite');
            if (values[input.name]==undefined||values[input.name].trim() == '') {
                input.classList.add('is-invalid');
                input.classList.add('is-invalid-lite');
                check=false;

              }
        }

        if(values['chargeWay']=='0'&&input.name == 'rate'){

            if (values[input.name]==undefined||values[input.name].trim() == '') {
                input.classList.add('is-invalid');
                input.classList.add('is-invalid-lite');
                check=false;

              }
        }else if(values['chargeWay']=='1'&&input.name == 'ration'){
            if (values[input.name]==undefined||values[input.name].trim() == '') {
                input.classList.add('is-invalid');
                input.classList.add('is-invalid-lite');
                check=false;

              }
        }









    })





    values.check=check;

    return values;
}




function operateWork(talentId,id){




    $("#operatediv").html(`              <div class="modal-header">
                <h5 class="modal-title">确认入职</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">

                <label class="form-label"  style="font-weight: bold;">备注信息</label>

                <div class="input-group input-group-flat">
                  <textarea rows="3" class="form-control" name="remark"></textarea>

                </div>  
                <input type="hidden" name="id" value="${id}">
                <input type="hidden" name="projectId" value="${workId}">
                 
               
              </div>
              <div class="modal-footer">
                <button type="button" class="btn me-auto" data-bs-dismiss="modal">取消</button>
                <button type="button" class="btn btn-primary" onclick="qrrz()" >确定</button>
              </div>`)




    $("#operate-modal").modal('show')
}

function qrrz(){
    var data = {};

      // 获取operatediv元素内部所有input和textarea元素
      $('#operatediv input, #operatediv textarea').each(function () {
        var name = $(this).attr('name');
        var value = $(this).val();
        if (name) {  // 只收集有name属性的input和textarea
            data[name] = value;
        }

        
      });
      console.log(JSON.stringify(data));
      $("#operate-modal").modal('hide')
      const options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'token':localStorage.getItem('token')
        },
        body: JSON.stringify(data),
        };
        var url = baseUri+'/project/confirmOffer';
    fetch(url,options)
        .then(response => response.json())
        .then(json => {
            showMessage(json.code)
            basedatanumber(workId);
            rxxx('',1)
        }).catch((error)=>{            
        });
}





function operateLeave(talentId,id){




    $("#operatediv").html(`              <div class="modal-header">
                <h5 class="modal-title">人选离职</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">

                  <div class="mb-3">
                    <div class="form-label" style="font-weight: bolder;">是否过保</div>
                    <div>
                      <label class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="chargeWay" checked="" value="0">
                        <span class="form-check-label">保内</span>
                      </label>
                      <label class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="chargeWay" value="1">
                        <span class="form-check-label">保外</span>
                      </label>
                      
                    </div>
                  </div>
         

                <label class="form-label"  style="font-weight: bold;">备注信息</label>

                <div class="input-group input-group-flat">
                  <textarea rows="3" class="form-control" name="remark"></textarea>

                </div>  
                <input type="hidden" name="id" value="${id}">
                <input type="hidden" name="projectId" value="${workId}">
                 
               
              </div>
              <div class="modal-footer">
                <button type="button" class="btn me-auto" data-bs-dismiss="modal">取消</button>
                <button type="button" class="btn btn-primary" onclick="leave()" >确定</button>
              </div>`)




    $("#operate-modal").modal('show')
}

function leave(){
    var data = {};

      // 获取operatediv元素内部所有input和textarea元素
      $('#operatediv input[type="radio"]:checked, #operatediv textarea,#operatediv input[type="hidden"]').each(function () {
        var name = $(this).attr('name');
        var value = $(this).val();
        if (name) {  // 只收集有name属性的input和textarea
            data[name] = value;
        }
      });
      console.log(JSON.stringify(data));
      $("#operate-modal").modal('hide')
      const options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'token':localStorage.getItem('token')
        },
        body: JSON.stringify(data),
        };
        var url = baseUri+'/project/quitWork';
    fetch(url,options)
        .then(response => response.json())
        .then(json => {
            showMessage(json.code)
            basedatanumber(workId);
            rxxx('',1)
        }).catch((error)=>{            
        });
}



function operateAbandon(talentId,id){




    $("#operatediv").html(`  <div class="modal-header">
                <h5 class="modal-title">放弃人选</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">

             
         

                <label class="form-label"  style="font-weight: bold;">备注信息</label>

                <div class="input-group input-group-flat">
                  <textarea rows="3" class="form-control" name="remark"></textarea>

                </div>  
                <input type="hidden" name="id" value="${id}">
                <input type="hidden" name="projectId" value="${workId}">
                 
               
              </div>
              <div class="modal-footer">
                <button type="button" class="btn me-auto" data-bs-dismiss="modal">取消</button>
                <button type="button" class="btn btn-primary" onclick="abandon()" >确定</button>
              </div>`)




    $("#operate-modal").modal('show')
}

function abandon(){
    var data = {};

      // 获取operatediv元素内部所有input和textarea元素
      $('#operatediv input, #operatediv textarea').each(function () {
        var name = $(this).attr('name');
        var value = $(this).val();
        if (name) {  // 只收集有name属性的input和textarea
            data[name] = value;
        }
      });
      console.log(JSON.stringify(data));
      $("#operate-modal").modal('hide')
      const options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'token':localStorage.getItem('token')
        },
        body: JSON.stringify(data),
        };
        var url = baseUri+'/project/talentGiveUp';
    fetch(url,options)
        .then(response => response.json())
        .then(json => {
            showMessage(json.code)
            basedatanumber(workId);
            rxxx('',1)
        }).catch((error)=>{            
        });
}