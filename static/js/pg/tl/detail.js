

$(document).ready(function () {

    talentId = getParameterByName('workId');
    initBaseInfo();
    initTCList();
    jeDate("#jd1",{
      theme:{bgcolor:"#4cc9f0",pnColor:"#00CCFF"},
      format: "YYYY-MM"
    });

    
    jeDate("#jd2",{
      theme:{bgcolor:"#4cc9f0",pnColor:"#00CCFF"},
      format: "YYYY-MM"
    });
    
    jeDate("#jd3",{
      theme:{bgcolor:"#4cc9f0",pnColor:"#00CCFF"},
      format: "YYYY-MM"
    });
    
    jeDate("#jd4",{
      theme:{bgcolor:"#4cc9f0",pnColor:"#00CCFF"},
      format: "YYYY-MM"
    });
    
    jeDate("#jd5",{
      theme:{bgcolor:"#4cc9f0",pnColor:"#00CCFF"},
      format: "YYYY-MM"
    });
    
    jeDate("#jd6",{
      theme:{bgcolor:"#4cc9f0",pnColor:"#00CCFF"},
      format: "YYYY-MM"
    });


})


let talentName;


function initBaseInfo(){
  
    var data={'talentId':talentId};

    const options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'token':localStorage.getItem('token')
        },
        body: JSON.stringify(data),
    };
        var url = baseUri+'/talent/selectTalentById';
    fetch(url,options)
        .then(response => response.json())
        .then(json => {
        
        

           let data = json.data;
           let companys = data.experienceCompanies;
           let projects = data.experienceProjects;
           let educations = data.experienceEdus;
           var edu = '';
           switch (data.education) {
               case "0":
                 edu='';
                 break;
               case "1":
                 edu='初中';
                   break;
               case "2":
                 edu='中专';
                   break;
               case "3":
                 edu='高中';
                   break;
               case "4":
                 edu='大专';
                   break;
               case "5":
                 edu='本科';
                   break;
               case "6":
                 edu='硕士';
                       break;
               case "7":
                 edu='博士';
                   break;
               default:
                 edu=data.education;
           }

           let gender = '' 
           let headphoto = ''
           if(data.gender == 2){
            gender='女'
            headphoto = '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="#ec3c71"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-user"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /></svg>'
           }else if(data.gende == 1){
            gender='男'
            headphoto = '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="#1890ff"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-user"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /></svg>'
           }else{
            gender='无'
            headphoto = '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="#1890ff"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-user"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /></svg>'
           }
           let phone = data.phone;
           let phonestr ;
           if(phone != null && phone.includes('*')){
            phonestr = `<p class="popover-options">
                        <a  id="phonepopover">${phone}</a></p>`
           }else{
            phonestr = phone;
           }
           let workSate = '';
           if(data.workSate == 0 ){
            workSate = '<a href="#" class="badge badge-outline text-secondary fw-normal badge-pill text-green">当前在职</a>'
           }else if (data.workSate == 1){
            workSate = '<a href="#" class="badge badge-outline text-secondary fw-normal badge-pill">已离职</a>'
           }else if (data.workSate == 2 ){
            workSate = '<a href="#" class="badge badge-outline text-secondary fw-normal badge-pill text-yellow" >待业</a>'
           }
     
           talentName = data.name;
           str = `      <div class="card">
                          <div class="card-status-start bg-primary"> 
                          </div>
                          <div class="card-header">
                            <span class="form-check-description" style="color: rgb(77, 150, 193);" >简历编号#:${data.talentId}</span>&nbsp;&nbsp;
                            <span style="font-weight: bold;">录入人:</span>
                            <span style="color: rgb(24, 144, 255);font-weight: bold;" >${data.userName}</span>&nbsp;&nbsp;
                            <span style="font-weight: bold;">录入时间:</span>
                            <span style="color: rgb(24, 144, 255);font-weight: bold;" >${toStr(data.createTime).split(' ')[0]}</span>&nbsp;&nbsp;
                            <span style="font-weight: bold;">更新时间:</span>
                            <span style="color: rgb(24, 144, 255);font-weight: bold;" >${toStr(data.updateTime).split(' ')[0]}</span>&nbsp;&nbsp;
                            <div class="card-actions">
                              <a class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#joinmodal">
                                加入项目 
                              </a>
                              
                              <a href="/wordpage/?talentId=${data.talentId}" class="btn btn-success" target='_blank'>
                                生成简历报告
                              </a> 
                              <a class="btn btn-info"  data-bs-toggle='modal' data-bs-target='#modal-edit' onclick="initEdit()">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon ms-1" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"></path><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z"></path><path d="M16 5l3 3"></path></svg>
                              </a>
                            </div>
                          </div>
                          <div class="card-body">

                            <dl class="row"> 
                              <div class="row g-0">
                                <div class="col-auto">
                                  <div class="card-body"><span class="avatar avatar-xl mb-3 rounded" >${headphoto}</span></div>              
                                </div>
                                <div class="col">
                                  <div class="card-body ps-0">
                                    <div class="row">
                                      <div class="col">
                                        <h3 class="mb-0">${data.name}<i></i> ${toStr(data.location)}<i></i>${toStr(data.age)}岁<i></i>${toStr(edu)}</h3>
                                      </div>
                                    </div>
                                    <div class="row" style="margin-bottom: -11px;">
                        
                                      <div class="col-md">
                                        <div class="mt-3 list-inline list-inline-dots mb-0 text-secondary d-sm-block d-none">
                                          <div class="list-inline-item">
                                            ${toStr(data.job)}</div>
                                          <div class="list-inline-item">
                                            ${toStr(data.lastCompany)}</div>
                                          <div class="list-inline-item">
                                            ${gender}</div>
                                           <div class="list-inline-item">
                                             ${toStr(data.birthday)}</div>
                                        </div>
                                      </div>
                                      <div class="col-md-auto">
                                        <div class="mt-3 badges">${workSate}</div>
                                      </div>
                                    </div>

                                    <div class="row mb-0">
                                      <div class="col-md">
                                        <div class="mt-3 list-inline list-inline-dots mb-0 d-sm-block d-none">
                                          <div class="list-inline-item" id="phoneinfo"> ${phonestr}</div>
                                          <div class="list-inline-item"> ${data.email}</div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="row"> 
                                <dt class="col-2">当前薪酬:</dt>
                                <dd class="col-2">${toStr(data.salary)}</dd>
                                <dt class="col-2">期望地点:</dt>
                                <dd class="col-2">${toStr(data.city)}</dd>
                                <dt class="col-2">期望行业:</dt>
                                <dd class="col-2">${toStr(data.rindustry)}</dd>
                              </div>

                              <div class="row mb-3"> 
                                <dt class="col-2">期望薪酬:</dt>
                                <dd class="col-2">${toStr(data.rsalary)}</dd>
                                <dt class="col-2">期望岗位:</dt>
                                <dd class="col-2">${toStr(data.rjob)}</dd>
                               
                              </div>
                              
                              <div class="row mb-3"> 
                                <dt class="col-2">个人简介:</dt>
                                <div class="col-9">
                                  <span>
                                   ${toTextbr(data.introduce)}
                                  </span>

                                </div>
                               
                              </div>
                              <div class="row "> 
                                <dt class="col-2">已加项目:</dt>
                                <div class="col-9" id="tplist">暂无 </div>
                              </div>
                            </dl>
                          </div>
                        </div>
           `
           $("#baseinfo").html('');
           $("#baseinfo").html(str)
           
           $('#phonepopover').popover({
            // title: '是否使用额度购买？',
            content: `<p class='mb-0'>是否使用额度购买？<a href='#' class='btn btn-teal btn-sm' id='popover1'>是</a>
                        <a href='#' class='btn btn-danger btn-sm' id='popover2'>否</a></p>`,
            html: true, // Ensure HTML content is rendered
            placement: 'right',
            trigger: 'click'
          }).on('shown.bs.popover', function () {
            // Bind click events to the buttons inside the popover
            $('#popover1').on('click', function() {
            //   alert('Button 1 clicked!');
                buyPhone();
            });
  
            $('#popover2').on('click', function() {
                $("#phonepopover").popover('hide')
            });
          });
        
        if(companys == null || companys.length == 0){
            $('#gzjsinfo').html('')
        }else{

            let infostr = ``;
            companys.forEach(o=>{
              sessionStorage.setItem('companys-'+o.id,JSON.stringify(o))
                let isNow = ''
                if(o.isNow==1){
                    isNow='至今'
                }else{
                    isNow= o.endTime;
                }


                infostr += `
                <div class="card trcard" id='companys-${o.id}'>

                          <div class="card-body border-bottom py-3">
                            <div class="d-flex" style="font-weight: bold;">
                              <div class="" style="color: rgb(3, 169, 244)">
                                ${toStr(o.startTime)} 至 ${toStr(isNow)} <ii></ii>  ${toStr(o.name)}<ii></ii> ${toStr(o.job)}
                              </div>
                             
                              <div class="ms-auto text-secondary">
                                
                                <div class="ms-2 d-inline-block">
                                  <a class="btn btn-info btn-sm" onclick='editcompany("companys-${o.id}")'>修改</a>
                                  <a  class="btn btn-danger btn-sm deletea"  onclick='delectexp("companys-${o.id}")'>删除</a>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="row">
                            <dt class="col-2">工作职责：</dt>
                            <dl class="col-10"></dl>
                            <dt class="col-1"></dt>
                            <dl class="col-10">
                             ${toTextbr(o.duty)}
                            </dl>
                            
                          </div>
                          
                        </div>
                `;


            })
            $('#gzjsinfo').html('')
            $('#gzjsinfo').html(infostr)
        }


       




        if(projects == null || projects.length == 0){
            $('#xmjlinfo').html('')
        }else{

            let infostr = ``;
            projects.forEach(o=>{
              sessionStorage.setItem('projects-'+o.id,JSON.stringify(o))

                infostr += `
                <div class="card trcard" id='projects-${o.id}'>

                          <div class="card-body border-bottom py-3">
                            <div class="d-flex" style="font-weight: bold;">
                              <div class="" style="color: rgb(3, 169, 244)">
                                 ${toStr(o.startTime)}至 ${toStr(o.endTime)} <ii></ii>  ${toStr(o.name)}<ii></ii> ${toStr(o.job)}
                              </div>
                             
                              <div class="ms-auto text-secondary">
                                
                                <div class="ms-2 d-inline-block">
                                  <a  class="btn btn-info btn-sm" onclick='editpro("projects-${o.id}")'>修改</a>
                                  <a  class="btn btn-danger btn-sm deletea"  onclick='delectexp("projects-${o.id}")'>删除</a>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="row">
                            <dt class="col-2">工作职责：</dt>
                            <dl class="col-10"></dl>
                            <dt class="col-1"></dt>
                            <dl class="col-10">
                             ${toTextbr(o.duty)}
                            </dl>
                            
                          </div>
                          
                        </div>
                `;


            })
            $('#xmjlinfo').html('')
            $('#xmjlinfo').html(infostr)
        }



        if(educations == null || educations.length == 0){
            $('#jyjlinfo').html('')
        }else{
            let infostr = ``;
            educations.forEach(o=>{
                sessionStorage.setItem('educations-'+o.id,JSON.stringify(o))
                // <a href="#" class="badge badge-outline  fw-normal badge-pill text-green" >985</a>
                let tz='';
                if(o.isAllTime==0){
                    tz = `<a class="badge badge-outline fw-normal badge-pill text-green" >统招</a>`
                }

                infostr += `
                        <div class="list-group-item" id='educations-${o.id}'>
                          <div class="row g-2 align-items-center">
                        
                           
                            <div class="col">
                             <span style="color:  rgb(3, 169, 244);"> ${toStr(o.startTime)} 至 ${toStr(o.endTime)}</span><ii></ii>${toStr(o.name)} <ii></ii>${toStr(o.classes)} <ii></ii><span style="font-weight: bold;">${o.education}</span>
                              <div class="text-secondary">
                                ${tz}
                               
                              </div>
                              <div class="text-secondary">
                                学校经历：${toTextbr(o.duty)}
                              </div>
                            </div>
                            <div class="col-auto text-secondary">
                                    <a  class="btn btn-info btn-sm" onclick='editEdu("educations-${o.id}")'>修改</a>
                                  <a  class="btn btn-danger btn-sm deletea" onclick='delectexp("educations-${o.id}")'>删除</a>


                            </div>          
                          </div>
                        </div>
                `;
            })
            $('#jyjlinfo').html('')
            $('#jyjlinfo').html(infostr)
        }









     







        initTPList()



        }).catch((error)=>{
            console.log(error)
          
        });



      


}

function initTPList(){

    var data={'talentId':talentId};

    const options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'token':localStorage.getItem('token')
        },
        body: JSON.stringify(data),
    };

        var url = baseUri+'/talent/talentProjectList';
    fetch(url,options)
        .then(response => response.json())
        .then(json => {

           let list = json.data;

           if(list != null && list.length > 0){
      
            let str='';
            list.forEach(o=>{

                str += `<span style="font-weight: bold;" class="badge badge-outline text-lime"><a onclick="checkProject('${o.projectId}')">${o.customerName}-${o.projectName}</a></span>`





            })
         

            $('#tplist').html('')

            $('#tplist').html(str)



           }



        }).catch((error)=>{
            console.log(error)
          
        });





}



function initTCList(){

    

    var data={'talentId':talentId,'pageSize':100,'pageNo':1};

    const options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'token':localStorage.getItem('token')
        },
        body: JSON.stringify(data),
    };

        var url = baseUri+'/talent/selectTCList';
    fetch(url,options)
        .then(response => response.json())
        .then(json => {
           let list = json.data.list;
           if(list != null && list.length > 0){

            let str='';
            list.forEach(o=>{


                str+=`
                <div><div class="row">
                <div class="col-auto">
                <span class="badge bg-twitter-lt ">${o.userName}</span></div><div class="col"><div class="text-truncate"><strong>${o.stateData}</strong>&nbsp;&nbsp;${o.createTime}</div>
                <div class="text-muted">${toTextbr(o.content)}</div></div><div class="col-auto align-self-center"><div class="badge bg-primary"></div></div></div></div>`



            })

            
            $('#cclistout').html('')
            
        
            $('#cclistout').html(str)
       



           }



        }).catch((error)=>{
            console.log(error)
          
        });





}



function buyPhone(){
    var data={'talentId':talentId};

    const options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'token':localStorage.getItem('token')
        },
        body: JSON.stringify(data),
    };

        var url = baseUri+'/talent/checkTalentPhone';
    fetch(url,options)
        .then(response => response.json())
        .then(json => {

           
           if(json.data != ''){
            $("#phonepopover").popover('hide')
            $('#phoneinfo').html('');
            $('#phoneinfo').html(json.data);
            showMessage(0,'购买成功！')
           }else{
            showMessage(1,'购买失败！')
           }





        }).catch((error)=>{
            console.log(error)
          
        });



}

let talentId ;

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








function cclfq(){
    getData({'talentId': talentId},'/talent/selectTCList').then(data => {
        // 这里处理从getData返回的数据

        try {

            
            if(data.list!=null||data.list.length>0){
                
                let str =''
                $('#alertcclfq').html('暂无更多沟通记录！')
                data.list.forEach(o=>{

                    str+=

                    '<div><div class="row"><div class="col-auto"><span class="badge bg-twitter-lt">'
                  + o.userName
                    
                    +'</span></div><div class="col"><div class="text-truncate"> <strong>'
                    + o.stateData 
                    +'</strong> - '
                    +o.createTime
                      +'</div><div class="text-muted">'
                      + o.content 
                      +'</div> </div> <div class="col-auto align-self-center">'
                   
                   
                    //   <div class="badge bg-primary"></div>
                    +'</div></div></div>'
                  






                })
                $('#alertcclfq').html(str)


            }else{
                $('#alertcclfq').html('暂无更多沟通记录！')
            }




               
        } catch (error) {
            
        }

    }).catch(error => {
        // 处理错误
        console.error('获取数据失败:', error);
    });
}







function test(){
    
   

    $('#modal-danger').modal('show')


}



function toStr(value) {
    if (value === null || value === undefined) {
        return '';
    }
    return value.toString();
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







function initEdit(){





}



function editTalent(){



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





function newcc(){

    var state = $('input[name="state"]:checked').val();

    var content = $('textarea[name="content"]').val()
  

    var data={'talentId':talentId,'state':toStr(state),'content':content,'talentName':talentName};

    const options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'token':localStorage.getItem('token')
        },
        body: JSON.stringify(data),
    };

        var url = baseUri+'/talent/addTalentC';
    fetch(url,options)
        .then(response => response.json())
        .then(json => {

            showMessage(json.code)
            initTCList()


            $('#modal-newc').modal('hide')


        }).catch((error)=>{
            console.log(error)
          
        });


}

function checkProject(id){
        //跳转页面并且携带参数

        let bigNumber = BigInt(id);
        let pid = bigNumber.toString(); // 转换为字符串
    
    
    // 创建一个新的URL，携带参数
    var url = '../project/prod.html?workId=' + encodeURIComponent(pid)+'' ;
    
    // 使用jQuery来跳转到新页面
    // window.location.href = url;
    
    window.open(url, '_blank');
}

function toTextbr(text){
    if(text==null)return '暂无';

    return text.replace(/\n/g, '<br>');



}

function join(){


  $("#joinmodal").modal('show')



}

document.addEventListener("DOMContentLoaded", function () {
  tomselect = new TomSelect('#addProject',{
      valueField: 'projectId',
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

              var url = baseUri+'/project/myJobList';
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
      </span>${ escape(item.name) } - ${item.customerName}</div>`;
  
              
          },
          item: function(item, escape) {
      return `<div><span class="dropdown-item-indicator"  >
      </span>${ escape(item.name) } - ${item.customerName}</div>`;
  
          }
      },
      onInitialize: function() {
        this.clearOptions(); // 清空初始选项
        this.load(''); // 传入空字符串以加载所有选项或基于默认查询
      },
  });
});



function addProject(){


  let projectid ='' ;

  if( tomselect.items !=null&&tomselect.getValue()!=''){


    projectid=tomselect.getValue();
  }
  var data={'talentId':talentId,'projectId':projectid};


  const options = {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      'token':localStorage.getItem('token')
      },
      body: JSON.stringify(data),
  };

      var url = baseUri+'/talent/talentJoinProject';
  fetch(url,options)
      .then(response => response.json())
      .then(json => {

         
        if(json.code==0){
                
          showMessage(0,'加入成功')
  
          initBaseInfo();
  
              }else{
                  showMessage(1,json.message)
              }
  



      }).catch((error)=>{
          console.log(error)
        
      });

  


}


function clearformdiv(id){
  $('#'+id+' input[type="checkbox"], #'+id+' select, #'+id+' input[type="text"], #'+id+' textarea').each(function() {
    // 将这些元素的值设置为空
    $(this).val('');
    // 对于checkbox，还需要取消选中状态
    if ($(this).is('input[type="checkbox"]')) {
      $(this).prop('checked', false);
    }
  });


}

let pro1=false;

function collectData(id1,id2) {

  const workExperiences = [];


  $('#'+id1+' #'+id2).each(function() {
    const workExperience = {};
    let isCheckboxChecked = false;

        // First pass to check if any checkbox is checked
        $(this).find('input[type="checkbox"]').each(function() {
          if ($(this).is(':checked')) {
            isCheckboxChecked = true;
          }
        });
    $(this).find('input,textarea,select').each(function() {
      const name = $(this).attr('name');
      const value = $(this).val();
      const type = $(this).attr('type');
    
      if (type === 'checkbox'||type === 'radio') {
        if ($(this).is(':checked')) {
        
          isCheckboxChecked = true;
          workExperience[name] = value;
        }
      } else  if (type != 'radio') {
        if (value || (isCheckboxChecked && name === 'endTime')) {

          pro1=true;
          $(this).removeClass('is-invalid','is-invalid-lite');
          workExperience[name] = value;
        } else {
          pro1=false;
          $(this).addClass('is-invalid','is-invalid-lite');
         
        }
      }else{
        workExperience[name] = value;
      }
      workExperience.talentId = talentId;
    });


    workExperiences.push(workExperience);

    let url= '';
    let modalid='';
    if(id1=='gzjsinfo'){
      url='/talent/addEC';
      modalid='#addmodal-com'


    }else if(id1=='xmjlinfo'){
      url='/talent/addEP';
      modalid='#addmodal-pro'
    }else if(id1=='jyjlinfo'){
      url='/talent/addEdu';
      modalid='#addmodal-edu'
    }


    if(url==''){
      showMessage(2,'异常！');
      return null;
    }
    
    
    if(pro1)
    {
      const options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'token':localStorage.getItem('token')
        },
        body: JSON.stringify(workExperiences[0]),
      };
      fetch(baseUri+url, options)
      .then(response => response.json())
      .then(json => {
        if (json.code === 0) {
          showMessage(0,'添加成功！')
          initBaseInfo();
        } else {
          showMessage(1,'添加失败！')
        }
      })
      .catch(error => {
        console.error('Error:', error);
        showMessage(2,'异常！')
      });

      $(modalid).modal('hide');


    }







  });



  if(!pro1){
    showMessage(2,'请填写完整的信息');
    return null;
  }
  console.log(workExperiences)
  // return JSON.stringify(workExperiences);
  return workExperiences
}


function editData(projectId) {
  // 获取表单数据
  let projectData = {
      id: projectId,
      name: $("#xm01 input[name='name']").val(),
      job: $("#xm01 input[name='job']").val(),
      duty: $("#xm01 textarea[name='duty']").val(),
      startTime: $("#xm01 input[name='startTime']").val().replace('-', '.'),
      endTime: $("#xm01 input[name='endTime']").val().replace('-', '.'),
      isNow: $("#xm01 input[name='isNow']").prop('checked') ? 1 : 0
  };

  // 更新 sessionStorage
  sessionStorage.setItem(projectId, JSON.stringify(projectData));

  // 关闭 modal
  $('#addmodal-pro').modal('hide');

  console.log(projectData);

  // 其他处理逻辑，例如更新页面显示
}


function editpro(projectId) {
  // 获取项目数据
  let projectData = JSON.parse(sessionStorage.getItem(projectId));

  // 填充数据到 modal
  $("#xm01 input[name='name']").val(projectData.name);
  $("#xm01 input[name='job']").val(projectData.job);
  $("#xm01 textarea[name='duty']").val(projectData.duty);
  $("#xm01 input[name='startTime']").val(projectData.startTime.replace('.', '-'));
  $("#xm01 input[name='endTime']").val(projectData.endTime ? projectData.endTime.replace('.', '-') : '');
  $("#xm01 input[name='isNow']").prop('checked', projectData.isNow === 1);

  // 修改按钮文本和 onclick 方法
  $(".modal-footer .btn-primary").text('修改项目经历');
  $(".modal-footer .btn-primary").attr('onclick', `editData('${projectId}')`);

  // 打开 modal
  $('#addmodal-pro').modal('show');
}


function delectexp(id) {
  $('body').on('click', 'a.deletea', function(e) {
    e.preventDefault();
    const $this = $(this);

    // 隐藏所有其他的 popover

    

    $this.popover({
      content: `<p class='mb-0'>是否删除？<a class='btn btn-teal btn-sm popover1'>是</a>
                <a class='btn btn-danger btn-sm popover2'>否</a></p>`,
      html: true, // Ensure HTML content is rendered
      placement: 'bottom',
      trigger: 'click'
    }).on('shown.bs.popover', function() {

       // 解绑之前的事件处理程序(否则会重复调用)
       $('body').off('click', '.popover1');
       $('body').off('click', '.popover2');

      // Bind click events to the buttons inside the popover
      $('body').on('click', '.popover1', function() {
        deleteExp(id);
        $this.popover('hide');
      });

      $('body').on('click', '.popover2', function() {
        $this.popover('hide');
      });
    });

    // Trigger the popover
   
  });


}

function deleteExp(id){
  let id1 = id.split('-')[0];
  let id2 = id.split('-')[1];
  let data = JSON.parse(sessionStorage.getItem(id));
  if (data) {
    let url='/talent/delEC';
    if(id1=='companys'){
      url = '/talent/delEC';
    }else if(id1=='projects'){
      url = '/talent/delEP';
    }else if(id1=='educations'){  
      url = '/talent/delEDU';
    }



    const options = {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      'token':localStorage.getItem('token')
      },
      body: JSON.stringify({ 'id': id2,'talentId':talentId }),
    };
    fetch(baseUri+url, options)
      .then(response => response.json())
      .then(json => {
        if (json.code === 0) {
          sessionStorage.removeItem(id);
          $(`#${id1}-${id2}`).remove();
          showMessage(0,'删除成功！')
          initBaseInfo();
        } else {
          showMessage(1,'删除失败！')
        }
      })
      .catch(error => {
        console.error('Error:', error);
        showMessage(2,'异常！')
      });


  }

}