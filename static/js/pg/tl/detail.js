


$(function(){




 
      


    // Dropzone.autoDiscover = false;
   
    // var myDropzone = new Dropzone("#dropzone-multiple", {
    //     url:'test',
    //     dictDefaultMessage:"点击或拖拽文件到此上传！",
    //     addRemoveLinks: true,//是否有删除文件的功能
    //     dictRemoveFile: "移除",//移除文件链接的文本。只设置addRemoveLinks: true 没有这个 会找不到删除按钮
    //     dictRemoveFileConfirmation: '确定删除此文件吗?',

    //     autoProcessQueue: false, // 设置为false，表示不自动上传文件队列
    //     // acceptedFiles: ".jpg,.png,.jpeg.JPG,.PNG,.JPEG",//支持的格式
    //     // accept: function(file, done) {
      
    //     // },

    //     // 其他配置选项...
    //     init: function() {
    //         this.on("success", function(file, response) {
    //             // 假设服务器返回的response是一个对象，其中包含上传成功的信息
    //             // console.log("文件上传成功:", file,response);
    //             // console.log("文件上传成功:", response);

    //         // 创建一个新的<img>元素用于预览
    //         file.url='/'+response.name
          
    //         // 将<img>元素添加到预览区域
    
    //             // 更新UI以显示上传成功
    //             // 你可以根据需要自定义这部分代码
    //             var previewElement = file.previewElement;
    //             previewElement.classList.add("dz-success"); // 添加成功类
    //             // previewElement.classList.remove("dz-progress"); // 移除处理中类
    //             previewElement.classList.remove("dz-processing");
    //             // // ...其他UI更新操作...
    //             // $('.dz-progress').each(function() {
    //             //     // 移除dz-processing类
    //             //     $(this).removeClass('dz-progress');
    //             //     // 添加dz-success类
    //             //     $(this).addClass('dz-success');
    //             // });


    //         });
    //         this.on("removedfile",function (file){
    //             removeFileNames(file.url);
    //             console.log(file)
    //             console.log(filenames)
    //         });
    
    //     }
    // });

    // myDropzone.on("addedfile", function(file) {  
    //     upload(file,myDropzone)
    //     // 你可以在这里添加预览逻辑  
    //     // myDropzone.createThumbnailFromUrl(...);  
    // });  
      
    // let test1 = document.getElementById("test")


    // test1.addEventListener('mouseenter',function(event){

    //     test()

    // })



    talentId = getParameterByName('workId');

    // console.log('customerId:'+BigInt(customerId))
    //默认进行分页数据查询



    initBaseInfo();

    initTPList();

    initTCList()


    // document.addEventListener('click', function(event) {
    //     if (event.target.id === 'popover1') {
    //       alert(1)
    //     }else if (event.target.id === 'popover2'){
        
    //       $("#phonepopover").popover('hide')
    //       // var popoverTrigger = document.getElementById('phonepopover');
    //       // var popover = new bootstrap.Popover(popoverTrigger);
    //       // popover.hide()
    //     }
    //   });


})




function initBaseInfo(){
    console.log(talentId)
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
                        <a href="#" id="phonepopover">${phone}</a></p>`



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



           
           str = `
                        <div class="card">
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
                              <a href="#" class="btn btn-primary" onclick="showMessage(1)">
                                加入项目 
                              </a>
                              
                              <a href="/wordpage/?talentId=${data.talentId}" class="btn btn-success" target='_blank'>
                                生成简历报告
                              </a> 
                              <a href="#" class="btn btn-info"  data-bs-toggle='modal' data-bs-target='#modal-edit' onclick="initEdit()">
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
        


        //   let companys = data.experienceCompanies;
        //   let projects = data.experienceProjects;
        //   let educations = data.experienceEdus;


        

        if(companys == null || companys.length == 0){
            $('#gzjsinfo').html('')
        }else{

            let infostr = ``;
            companys.forEach(o=>{
                let isNow = ''
                if(o.isNow==1){
                    isNow='至今'
                }else{
                    isNow= o.endTime;
                }


                infostr += `
                <div class="card trcard">

                          <div class="card-body border-bottom py-3">
                            <div class="d-flex" style="font-weight: bold;">
                              <div class="" style="color: rgb(3, 169, 244)">
                                ${toStr(o.startTime)} 至 ${toStr(isNow)} <ii></ii>  ${toStr(o.name)}<ii></ii> ${toStr(o.job)}
                              </div>
                             
                              <div class="ms-auto text-secondary">
                                
                                <div class="ms-2 d-inline-block">
                                  <a href="#" class="btn btn-info btn-sm" onclick='editcompany("${o.id}")'>修改</a>
                                  <a href="#" class="btn btn-danger btn-sm" onclick='deletecompany("${o.id}")'>删除</a>
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
          

                infostr += `
                <div class="card trcard">

                          <div class="card-body border-bottom py-3">
                            <div class="d-flex" style="font-weight: bold;">
                              <div class="" style="color: rgb(3, 169, 244)">
                                 ${toStr(o.startTime)}至 ${toStr(o.endTime)} <ii></ii>  ${toStr(o.name)}<ii></ii> ${toStr(o.job)}
                              </div>
                             
                              <div class="ms-auto text-secondary">
                                
                                <div class="ms-2 d-inline-block">
                                  <a href="#" class="btn btn-info btn-sm" onclick='editcompany("${o.id}")'>修改</a>
                                  <a href="#" class="btn btn-danger btn-sm" onclick='deletecompany("${o.id}")'>删除</a>
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
                // <a href="#" class="badge badge-outline  fw-normal badge-pill text-green" >985</a>
                let tz;
                if(o.isAllTime==0){
                    tz = `<a href="#" class="badge badge-outline fw-normal badge-pill text-green" >统招</a>`
                }

                infostr += `
                        <div class="list-group-item">
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
                                    <a href="#" class="btn btn-info btn-sm" onclick='editcompany("${o.id}")'>修改</a>
                                  <a href="#" class="btn btn-danger btn-sm" onclick='deletecompany("${o.id}")'>删除</a>
                            </div>
                        
                            
                          </div>
                        </div>
                `;


            })
            $('#jyjlinfo').html('')
            $('#jyjlinfo').html(infostr)
        }






















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
                <span class="badge bg-twitter-lt ">${o.userName}</span></div><div class="col"><div class="text-truncate"><strong>undefined</strong>&nbsp;&nbsp;2023-01-30 17:35:18</div><div class="text-muted">顾问 test 推荐的人选 测试数据 已经获得当前offer！
职位：
年薪：123万元
预收服务费：100元
</div></div><div class="col-auto align-self-center"><div class="badge bg-primary"></div></div></div></div>`



                str += '<div><div class="row"><div class="col-auto">'
                + '<span class="badge bg-twitter-lt ">'+o.userName+'</span>'                 
                + '</div><div class="col"><div class="text-truncate">' 
                + '<strong>'+o.stateData+'</strong>&nbsp;&nbsp;'+ o.createTime
                + '</div><div class="text-muted">'+o.content+'</div></div>'
                + '<div class="col-auto align-self-center"><div class="badge bg-primary"></div></div></div></div>'


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

let filenames = []

function addFileNames(value,key ) {
    // 创建一个对象，包含键值对
    let obj = {};
    obj[key] = value;
    
    // 将对象添加到数组中
    filenames.push(obj);
}

// 删除元素（通过键匹配）
function removeFileNames(key) {
    filenames = filenames.filter(obj => !obj.hasOwnProperty(key));
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




function filedivshow(){



    $('#rxxxdiv').hide()
    
    $('#movediv').hide()
    
    
    $('#jobdjv').hide()


    $('#kzxxdiv').hide()
    $('#filediv').show()



    var data={'customerId':csid};

    const options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'token':localStorage.getItem('token')
        },
        body: JSON.stringify(data),
    };

        var url = baseUri+'/customer/contractsQuery';
    fetch(url,options)
        .then(response => response.json())
        .then(json => {

           
            if(json.data.list!=null&&json.data.list.length>0){

                let str =''
                json.data.list.forEach(o=>{

                    const encodedComponent = o.url.replace(/ /g, '%20')
                    const fullEncodedUri = "http://faithful.oss-cn-shanghai.aliyuncs.com" + encodedComponent;

                    str +=

                    `<tr>
                    <td>${toStr(o.name)}</td>
                    
               
                    <td >
                    
                      <a   class='btn btn-info' onclick=openimg("${fullEncodedUri}") >
                      查看
                    </a>
                 
                    </td>
                  </tr>`

                })

                $("#filedata").html(str)                
            }else{
                $("#filedata").html(` <tr>
                <td colspan="2" style="font-weight: bold;text-align: center;">暂无数据 </td>
              </tr>`) 
            }



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



function baseinfo(talentId){
    getData({'talentId': talentId},'/talent/selectTalentById').then(data => {
        // 这里处理从getData返回的数据

        try {

            var sourceType1 = '';
            switch (data.sourceType) {
                case "1":
                    sourceType1='广告呼入';
                    break;
                case "2":
                    sourceType1='主动BD';
                    break;
                case "3":
                    sourceType1='电销开发';
                    break;
                default:
                    sourceType1='公共池' ;
            }



            editInfo['industryType']=data.industryType
            editInfo['customerSize']=data.customerSize

            editInfo['customerNature']=data.customerNature
            editInfo['outName']=data.outName

            editInfo['registeredAddress']=data.registeredAddress
            editInfo['webSite']=data.webSite

            
            $('#basecname').html(data.name);
            $('#bmxx').html(data.customerId);
            $('#gsgs').html(data.comName);
            $('#tjr').html(data.recommenderName!=""?data.recommenderName:'无');
            $('#khly').html(sourceType1);
            $('#fwgw').html(data.userName);
            $('#cjsj').html(data.createTime);
            $('#website').html(data.webSite!=""?data.webSite:'无');
            $('#syhy').html(data.industryType);
            // $('#gslx').html(data.companyType);
            $('#raddress').html(data.registeredAddress);
            $('#gsxz').html(data.comNature);
            $('#gsgm').html(data.comSize);

            if(data.vip==1){
                $('#isvip').html('已认证');
                $('#isvip').click(alert('已认证'))
            }

            let state=data.state

            if(state==0){

                $('#signstate').html(`潜在客户 <a class="btn btn-outline-info btn-sm" onclick="signCustomer()">申请签约<a>`);


            }else if(state==1){
                $('#signstate').html(`签约运作 (${data.contractDateStart}~${data.contractDateEnd}) <a class="btn btn-outline-secondary btn-sm" onclick="changeCState(2)">暂停运作<a>`);


            }else if(state==2){
                $('#signstate').html(`暂停运作 <a class="btn btn-outline-success btn-sm" onclick="changeCState(1)">恢复运作<a><a class="btn btn-outline-danger btn-sm" onclick="changeCState(3)">终止运作<a>`);


            }else if(state==3){
                $('#signstate').html(`签约终止 <a class="btn btn-outline-primary btn-sm" onclick="abandonCus()">转入公共池<a>`);


            }



            
            if(data.customerCommunicateBeans!=null&&data.customerCommunicateBeans.length>0){
                
                let str ='';
            
                $('#cclistout').html('')
                
                data.customerCommunicateBeans.forEach(o=>{

                    str += '<div><div class="row"><div class="col-auto">'
                    + '<span class="badge bg-twitter-lt ">'+o.userName+'</span>'                 
                    + '</div><div class="col"><div class="text-truncate">' 
                    + '<strong>'+o.stateData+'</strong>&nbsp;&nbsp;'+ o.createTime
                    + '</div><div class="text-muted">'+o.content+'</div></div>'
                    + '<div class="col-auto align-self-center"><div class="badge bg-primary"></div></div></div></div>'
                      


                })
                $('#cclistout').html(str)


            }




               
        } catch (error) {
            
        }

    }).catch(error => {
        // 处理错误
        console.error('获取数据失败:', error);
    });

}



function cclfq(){
    getData({'customerId': csid},'/customer/cclfq').then(data => {
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


function teamlist(customerId){

    getData({'customerId': customerId},'/customer/selectCTeamList').then(data => {
        // 这里处理从getData返回的数据

        try {

            let str =''

            let newteammember=     
            ' <span class="badge bg-green-lt" data-bs-toggle="modal" data-bs-target="#membermodal" onclick="newTeamList()">新增'
            +'<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg> </span>'  
       

            if(data.list!=null||data.list.length>0){
                
               
                $('#teamlist').html('暂无更多沟通记录！')
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
            body: JSON.stringify({ 'appUserId': uid,'customerId':csid }),
            };

            var url = baseUri+'/customer/delTeamPerson';
        fetch(url,options)
            .then(response => response.json())
            .then(json => {
    
                showMessage(json.code)
                teamlist(csid)
            }).catch((error)=>{
                
            });







    } else {
        // 用户点击了“取消”按钮或关闭了对话框
        console.log("删除操作被取消");
    }



}

function test(){
    
    console.log(1)

    $('#modal-danger').modal('show')


}


function contactList(customerId){

    getData({'customerId': customerId},'/customer/selectContactList').then(data => {
        // 这里处理从getData返回的数据

        try {

            let str =''

            if(data.list!=null||data.list.length>0){
                
               
     
                data.list.forEach(o=>{

                

                    str+=

                    `<tr>
                    <td>${toStr(o.name)}</td>
                    <td class="text-nowrap text-secondary">

                    ${toStr(o.phone)}
                   
                    </td>
                    <td>
                    ${toStr(o.wechatId)}
                    </td>
                    <td>
                    ${toStr(o.job)}
                    </td>
                    <td>
                    ${toStr(o.email)}
                    </td>
               
                    <td>${toStr(o.remark)}</td>
         
                    <td >
                      <a class="btn btn-ghost-info" href="#" onclick="editc(${toStr(o.id)})">
                        修改
                      </a>
                      <a class="btn btn-ghost-warning" href="#" onclick="deletec(${toStr(o.id)})">
                        删除
                      </a>
                    </td>
                  </tr>`
            
                })
                $('#khlxrdata').html(str)


            }




               
        } catch (error) {
            
        }

    }).catch(error => {
        // 处理错误
        console.error('获取数据失败:', error);
    });


}

function toStr(value) {
    if (value === null || value === undefined) {
        return '';
    }
    return value.toString();
}
function custcom(customerId){


    getData({'customerId': customerId},'/customer/selectCustomerCompany').then(data => {
        // 这里处理从getData返回的数据

        try {

            let str =''
            
            let str1 =''

            if(data.list!=null||data.list.length>0){
                
               
     
                data.list.forEach(o=>{

                    if(o.type==0){
                        str+=

                        `<tr>
                          <td>${toStr(o.name)}</td>
                          <td class="text-nowrap text-secondary">

                          ${toStr(o.createTime)}
                         
                          </td>
                        </tr>`
                    }else{
                        str1+=

                        `<tr>
                          <td>${toStr(o.name)}</td>
                          <td class="text-nowrap text-secondary">

                          ${toStr(o.createTime)}
                         
                          </td>
                        </tr>`
                    }

                  
                })

                
                if(str.length>0)$('#childdata').html(str);

                if(str1.length>0)$('#gldata').html(str);



                


            }




               
        } catch (error) {
            
        }

    }).catch(error => {
        // 处理错误
        console.error('获取数据失败:', error);
    });



}



document.addEventListener("DOMContentLoaded", function () {
    new TomSelect('#addTeamMember',{
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

    const options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'token':localStorage.getItem('token')
        },
        body: JSON.stringify({ 'appUserId': selectElement.value,'customerId':csid,"jobManage":jobManage }),
        };

        var url = baseUri+'/customer/addTeamPerson';
    fetch(url,options)
        .then(response => response.json())
        .then(json => {
            // console.log(json)
            if(json.code==0){
                
        teamlist(csid)
        showMessage(0,'添加成功！！')
            }



        }).catch((error)=>{
            callback();
        });




}


function successalert(str){
    $('#modalshowstr').html(str)
    
    $('#modal-danger').modal('show')

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

function copyTextToClipboard(id) {
    // 获取 span 元素
    const spanElement = document.getElementById(id);
    // 获取 span 的文本内容
    const textToCopy = spanElement.textContent || spanElement.innerText;
    
    // 使用 Clipboard API 复制文本到剪贴板
    if (navigator.clipboard) {
        navigator.clipboard.writeText(textToCopy).then(() => {
            showMessage(0,'内容已复制到剪贴板');
        }).catch(err => {
            // 复制失败的处理
            showMessage(1,'无法复制文本，请尝试手动复制');
        });
    } else {
        // 对于不支持 Clipboard API 的浏览器，你可以回退到使用 document.execCommand
        // 但请注意，这通常不推荐，因为它在许多现代浏览器中已被弃用
        const textArea = document.createElement("textarea");
        textArea.style.position = 'fixed';
        textArea.style.top = 0;
        textArea.style.left = 0;
        textArea.style.width = '2em';
        textArea.style.height = '2em';
        textArea.style.padding = 0;
        textArea.style.border = 'none';
        textArea.style.outline = 'none';
        textArea.style.boxShadow = 'none';
        textArea.style.background = 'transparent';
        textArea.value = textToCopy;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            const successful = document.execCommand('copy');
            const msg = successful ? '成功复制' : '复制失败';
            showMessage(0,msg);
        } catch (err) {
            console.error('复制失败: ', err);
            showMessage(1,'复制失败，请尝试手动复制');
        }
        
        document.body.removeChild(textArea);
    }
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




async function putObject(path,data,client,myDropzone) {
    try {
      // 填写Object完整路径。Object完整路径中不能包含Bucket名称。
      // 您可以通过自定义文件名（例如exampleobject.txt）或文件完整路径（例如exampledir/exampleobject.txt）的形式实现将数据上传到当前Bucket或Bucket中的指定目录。
      // data对象可以自定义为file对象、Blob数据或者OSS Buffer。
      const options = {
        meta: { temp: "demo" },
        mime: "json",
        headers: { "Content-Type": "text/plain" },
      };
      const result = await client.put(path, data, options);
      myDropzone.emit("success", data, result)
      myDropzone.emit("complete", data);
    //   console.log(result);
    } catch (e) {
      console.log(e);
    }
  }

  

  function checkFileExtension(file) {
    // 定义一个允许的扩展名数组，注意不需要区分大小写
    const allowedExtensions = ['jpg', 'png', 'jpeg'];

    // 获取文件扩展名
    const extension = file.name.toLowerCase().split('.').pop();

    // 检查扩展名是否在允许的列表中
    if (!allowedExtensions.includes(extension)) {
        alert('请上传正确文件');
        return false;
    }

    return true;
}

function upload(file,myDropzone){


    if(!checkFileExtension(file)){return}



    let stsTokendata="" ;
    let picnumber = "";

    
    getData({},'/login/getToken').then(data => {
        // 这里处理从getData返回的数据
        try {
            sessionStorage.setItem("picnumber",data.token)
        } catch (error) {
        }

    }).catch(error => {
        // 处理错误
        console.error('获取数据失败:', error);
    });


    getData({},'/admin/getALLSTSToken').then(data => {
        // 这里处理从getData返回的数据
        try {
            sessionStorage.setItem("stsTokendata",data)
        } catch (error) {
        }

    }).catch(error => {
        // 处理错误
        console.error('获取数据失败:', error);
    });

    stsTokendata=JSON.parse(sessionStorage.getItem("stsTokendata")).credentials
    picnumber = sessionStorage.getItem("picnumber")
    

    const client = new OSS({
        // yourRegion填写Bucket所在地域。以华东1（杭州）为例，yourRegion填写为oss-cn-hangzhou。
        region: "oss-cn-shanghai",
        // 从STS服务获取的临时访问密钥（AccessKey ID和AccessKey Secret）。
        accessKeyId: stsTokendata.accessKeyId,
        accessKeySecret: stsTokendata.accessKeySecret,
        // 从STS服务获取的安全令牌（SecurityToken）。
        stsToken: stsTokendata.securityToken,
        // 填写Bucket名称。
        bucket: "faithful",
      });


    
    var path = '/fileserver/'+csid+"/"+picnumber+"/"+file.name;

    
    addFileNames(file.name,path)

    console.log(filenames)

    
    // myDropzone.emit("thumbnail", file, 'http://faithful.oss-cn-shanghai.aliyuncs.com'+path)
    putObject(path,file,client,myDropzone);
      
}

function changeCState(state){


    
    var isConfirmed = confirm("是否变更状态？");

    if (isConfirmed) {
        const options = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'token':localStorage.getItem('token')
            },
            body: JSON.stringify({ 'state': state,'customerId':csid }),
            };
    
            var url = baseUri+'/customer/changeCustomerState';
        fetch(url,options)
            .then(response => response.json())
            .then(json => {
                // console.log(json)
                if(json.code==0){
                    
            baseinfo(csid)
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


function abandonCus(){

    
    var isConfirmed = confirm("是否将客户放入公共池？");

    if (isConfirmed) {
     
        const options = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'token':localStorage.getItem('token')
            },
            body: JSON.stringify({ 'customerId':csid }),
            };

            var url = baseUri2+'/customer/abandonCustomer';
        fetch(url,options)
            .then(response => response.json())
            .then(json => {
                // console.log(json)
                if(json.code==0){
                    
            showMessage(0,'转移成功')
            location.reload();
                }else{
                    showMessage(1,json.message)
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



function openimg(url){


    $('#picshow').attr('src',url)

    $('#modal-pic').modal('show')


}


function newcc(){

    var state = $('input[name="state"]:checked').val();

    var content = $('textarea[name="content"]').val()
    console.log(state,content)

    var data={'customerId':csid,'state':toStr(state),'content':content,'customerName':'默认'};

    const options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'token':localStorage.getItem('token')
        },
        body: JSON.stringify(data),
    };

        var url = baseUri+'/customer/addcc';
    fetch(url,options)
        .then(response => response.json())
        .then(json => {

            showMessage(json.code)
            baseinfo(csid)


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