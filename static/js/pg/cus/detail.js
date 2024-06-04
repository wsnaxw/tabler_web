


$(function(){

    
    // @formatter:on
   
    var myDropzone = new Dropzone("#dropzone-multiple", {
        url:'test',
        
        autoProcessQueue: false, // 设置为false，表示不自动上传文件队列
        // 其他配置选项...
        init: function() {
            this.on("success", function(file, response) {
                // 假设服务器返回的response是一个对象，其中包含上传成功的信息
                console.log("文件上传成功:", file,response);

            // 创建一个新的<img>元素用于预览
        
          
            // 将<img>元素添加到预览区域
    
                // 更新UI以显示上传成功
                // 你可以根据需要自定义这部分代码
                var previewElement = file.previewElement;
                previewElement.classList.add("dz-success"); // 添加成功类
                previewElement.classList.remove("dz-progress"); // 移除处理中类
                // ...其他UI更新操作...
                $('.dz-progress').each(function() {
                    // 移除dz-processing类
                    $(this).removeClass('dz-progress');
                    // 添加dz-success类
                    $(this).addClass('dz-success');
                });


            });
        }
    });

    myDropzone.on("addedfile", function(file) {  
        upload(file,myDropzone)
        // 你可以在这里添加预览逻辑  
        // myDropzone.createThumbnailFromUrl(...);  
    });  
      
    // let test1 = document.getElementById("test")


    // test1.addEventListener('mouseenter',function(event){

    //     test()

    // })



    var customerId = getParameterByName('customerId');

    csid = customerId;

    // console.log('customerId:'+BigInt(customerId))
    //默认进行分页数据查询

    
    const buttons = document.querySelectorAll('.card-body .btn');

    // 为每个按钮添加点击事件监听器
    buttons.forEach(button => {
      button.addEventListener('click', function() {
        // 移除所有按钮的active类
        buttons.forEach(btn => btn.classList.remove('active'));
        // 给当前点击的按钮添加active类
        this.classList.add('active');
      });
    });
    jeDate("#ymd033",{
        theme:{bgcolor:"#4cc9f0",pnColor:"#00CCFF"},
        multiPane:false,
        range:" ~ ",
        format: "YYYY-MM-DD"
    });


    $('#rxxxdiv').hide()
    $('#movediv').hide()
    $('#filediv').hide()
    $('#jobdjv').hide()
    $('#kzxxdiv').show()


    // customer/getCustomerNumber 数据填充
    basedatanumber(customerId)
    //cclfq 沟通记录

    // customer/selectCstById 基本信息
    baseinfo(customerId)
    //customer/selectCTeamList团队成员
    teamlist(customerId)
    //customer/selectContactList 联系人
    contactList(customerId)
    // customer/selectCustomerCompany 关联公司
    custcom(customerId)



    







})



let csid ;


let filenames =[]











function getParameterByName(name) {
    url = window.location.href;
   name = name.replace(/[\[\]]/g, "\\$&");
   var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
       results = regex.exec(url);
   if (!results) return null;
   if (!results[2]) return '';
   return decodeURIComponent(results[2].replace(/\+/g, " "));
}




function kzxx(){


    

    $('#rxxxdiv').hide()
    
    $('#movediv').hide()
    
    $('#filediv').hide()
    
    $('#jobdjv').hide()


    $('#kzxxdiv').show()

    custcom(csid)
    contactList(csid)












}

function rxxx(state){    




    $('#movediv').hide()
    $('#filediv').hide()
    $('#jobdjv').hide()
    $('#kzxxdiv').hide()
    $('#rxxxdiv').show()
    var data={};

    if(state==null||state==undefined){
        data ={'customerId':csid}
    }else{
        data ={ 'state': state,'customerId':csid}
    }

    const options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'token':localStorage.getItem('token')
        },
        body: JSON.stringify(data),
    };

        var url = baseUri+'/customer/twffq';
    fetch(url,options)
        .then(response => response.json())
        .then(json => {
            if(json.data.list!=null&&json.data.list.length>0){

                let str =''
                json.data.list.forEach(o=>{
                    str +=

                    `<tr>
                    <td>${toStr(o.projectName)}</td>
                    <td>

                    ${o.userName}
                      
                      
                    </td>
                    <td>
                    ${o.talentName}
                    </td>
                    <td>
                    ${o.company}
                    </td>
                    <td>
                    ${o.job}
                    </td>
                    <td>
                    ${o.createTime}
                    </td>
               
                    <td >
                      <a class="btn btn-info" onclick="checkTalent(${o.talentId})">
                        人选详情
                      </a>
                 
                    </td>
                  </tr>`

                })

                $("#rxxxdata").html(str)                
            }else{
                $("#rxxxdata").html(` <tr>
                <td colspan="6" style="font-weight: bold;text-align: center;">暂无数据 </td>
              </tr>`) 
            }



        }).catch((error)=>{
            callback();
        });






}

function filedivshow(){



    $('#rxxxdiv').hide()
    
    $('#movediv').hide()
    
    
    $('#jobdjv').hide()


    $('#kzxxdiv').hide()
    $('#filediv').show()

}

function job(pageNo){
    $('#rxxxdiv').hide()
    $('#movediv').hide()
    $('#filediv').hide()
    $('#kzxxdiv').hide()
    $('#jobdjv').show()
    pageNo=1;
    var data={'pageNo':1,'customerId':csid};

    const options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'token':localStorage.getItem('token')
        },
        body: JSON.stringify(data),
    };

        var url = baseUri+'/customer/selectPList';
    fetch(url,options)
        .then(response => response.json())
        .then(json => {

           
            if(json.data.list!=null&&json.data.list.length>0){

                let str =''
                json.data.list.forEach(o=>{

                    console.log(o)

                    let cityCode = '';

                    if(o.cityCode!=null&&o.cityCode.length>4){
                        let cityarray = splitOrGet(o.cityCode)
                        console.log(cityarray)
                        if(cityarray!=null&&cityarray.length>0){
                            cityarray.forEach(element => {
                                cityCode += cn.info(element).name + ' '
                            });
                        }
                        console.log(cityCode)
                    }else if(!isNumeric(o.cityCode)){
                        cityCode = o.cityCode;
                    }else{
                        cityCode = '不限';
                    }


              
                


                    str +=

                    `<tr>
                    <td>${toStr(o.stateData)}</td>
                    <td>

                    ${o.name}
                      
                      
                    </td>
                    <td>
                    ${o.salary} 万元
                    </td>
                    <td>
                    ${o.customerName}
                    </td>
                    <td>
                    ${cityCode}
                    </td>
                    <td>
                    ${o.createTime}
                    </td>
               
                    <td >
                      <a class="btn btn-info" onclick="checkProject(${o.projecId})">
                        人选详情
                      </a>
                 
                    </td>
                  </tr>`

                })

                $("#jobdata").html(str)                
            }else{
                $("#jobdata").html(` <tr>
                <td colspan="7" style="font-weight: bold;text-align: center;">暂无数据 </td>
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


function move(){


    $('#rxxxdiv').hide()
    
    
    $('#filediv').hide()
    


    $('#kzxxdiv').hide()
    
    $('#jobdjv').hide()

    $('#movediv').show()
}


function basedatanumber(customerId){

    getData({'customerId': customerId},'/customer/getCustomerNumber').then(data => {
        // 这里处理从getData返回的数据

        try {

            $('#hkje').html(data.hkje);
            $('#yzzw').html(data.yzzw);
            $('#tjrs').html(data.tjrs);
            $('#rzrs').html(data.rzrs);
            $('#yyms').html(data.yyms);

            $('#fileCount').html(data.fileCount);
            $('#zycs').html(data.zycs);
            $('#rxxxnum').html(data.rxxx);
            $('#zwnum').html(data.yzzw); 
            



        } catch (error) {
            
        }

    }).catch(error => {
        // 处理错误
        console.error('获取数据失败:', error);
    });



}


function baseinfo(customerId){
    getData({'customerId': customerId},'/customer/selectCstById').then(data => {
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

            
            $('#basecname').html(data.name);
            $('#bmxx').html(data.customerId);
            $('#gsgs').html(data.comName);
            $('#tjr').html(data.recommenderName!=""?data.recommenderName:'无');
            $('#khly').html(sourceType1);
            $('#fwgw').html(data.userName);
            $('#cjsj').html(data.createTime);
            $('#website').html(data.webSite!=""?data.webSite:'无');
            if(data.vip==1){
                $('#isvip').html('已认证');
                $('#isvip').click(alert('已认证'))
            }

            let state=data.state
            state=1

            if(state==0){

                $('#signstate').html(`潜在客户 <a class="btn btn-outline-info" onclick="signCustomer()">申请签约<a>`);


            }else if(state==1){
                $('#signstate').html(`签约运作 (${data.createTime}~${data.createTime}) <a class="btn btn-outline-secondary" onclick="signCustomer()">暂停运作<a>`);


            }else if(state==2){
                $('#signstate').html(`暂停运作 <a class="btn btn-outline-success" onclick="signCustomer()">恢复运作<a><a class="btn btn-outline-danger" onclick="signCustomer()">终止运作<a>`);


            }else if(state==3){
                $('#signstate').html(`签约终止 <a class="btn btn-outline-primary " onclick="signCustomer()">转入公共池<a>`);


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

                    '<div><div class="row"><div class="col-auto"><span class="badge">'
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

                    '<span class="badge bg-twitter-lt" >'
                    + o.userName
                    + '<a onclick="deletemember('+o.userId+')" style="color: black;">'
                     +' <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>'
                    +'</a></span>'                    
                    
                  






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
    console.log(selectElement.value)

    const options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'token':localStorage.getItem('token')
        },
        body: JSON.stringify({ 'appUserId': selectElement.value,'customerId':csid }),
        };

        var url = baseUri+'/customer/addTeamPerson';
    fetch(url,options)
        .then(response => response.json())
        .then(json => {
            console.log(json)
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
        console.log(1)
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
            console.log('内容已复制到剪贴板');
            showMessage(0,'内容已复制到剪贴板');
        }).catch(err => {
            // 复制失败的处理
            console.error('无法复制文本: ', err);
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


    console.log(filenames)

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
        alert('请上传文件')
        return;
    }
    
    inputValues['files']=filenames
    console.log(inputValues)


    if(!isCheck){
         return;
    }else{


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


    }

 // $('#modal-sign').modal('hide')



}


function check1(){
    document.querySelector('input[name="downPayment"]').disabled=true;
}


function check2(){
    document.querySelector('input[name="downPayment"]').disabled=false;
}



function upload1(){
    let stsTokendata="" ;
    let picnumber = "";

    
    getData({},'/login/getToken').then(data => {
        // 这里处理从getData返回的数据
        try {
            localStorage.setItem("picnumber",data.token)
        } catch (error) {
        }

    }).catch(error => {
        // 处理错误
        console.error('获取数据失败:', error);
    });


    getData({},'/admin/getALLSTSToken').then(data => {
        // 这里处理从getData返回的数据
        try {

          
           


            localStorage.setItem("stsTokendata",data)

           
        } catch (error) {
        }

    }).catch(error => {
        // 处理错误
        console.error('获取数据失败:', error);
    });

    stsTokendata=JSON.parse(localStorage.getItem("stsTokendata")).credentials
    picnumber = localStorage.getItem("picnumber")
    console.log(stsTokendata)
    

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

      // 从输入框获取file对象，例如<input type="file" id="file" />。
      // 创建并填写Blob数据。
      //const data = new Blob(['Hello OSS']);
      // 创建并填写OSS Buffer内容。
      //const data = new OSS.Buffer(['Hello OSS']);

      const upload = document.getElementById("upload");
      var files = upload.files; // 获取FileList对象

      if (files.length > 0) {
          for (var i = 0; i < files.length; i++) {
              var file = files[i]; // 获取单个File对象
              console.log(file.name); // 打印文件名
              // 在这里你可以对file对象进行其他操作，比如读取文件内容等


              var path = '/fileserver/'+csid+"/"+picnumber+""/+file.name;
              filenames.push(path)

              putObject(path,file);
          }
      } else {
          console.log('没有选择文件');
      }
      
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
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  }

  
function upload(file,myDropzone){
    let stsTokendata="" ;
    let picnumber = "";

    
    getData({},'/login/getToken').then(data => {
        // 这里处理从getData返回的数据
        try {
            localStorage.setItem("picnumber",data.token)
        } catch (error) {
        }

    }).catch(error => {
        // 处理错误
        console.error('获取数据失败:', error);
    });


    getData({},'/admin/getALLSTSToken').then(data => {
        // 这里处理从getData返回的数据
        try {

          
           


            localStorage.setItem("stsTokendata",data)

           
        } catch (error) {
        }

    }).catch(error => {
        // 处理错误
        console.error('获取数据失败:', error);
    });

    stsTokendata=JSON.parse(localStorage.getItem("stsTokendata")).credentials
    picnumber = localStorage.getItem("picnumber")
    

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

      // 从输入框获取file对象，例如<input type="file" id="file" />。
 
      // 创建并填写Blob数据。
      //const data = new Blob(['Hello OSS']);
      // 创建并填写OSS Buffer内容。
      //const data = new OSS.Buffer(['Hello OSS']);

    //   const upload = document.getElementById("upload");
    //   var files = upload.files; // 获取FileList对象

    
    var path = '/fileserver/'+csid+"/"+picnumber+"/"+file.name;

    console.log(path)
    filenames.push(path)
    console.log(filenames)

    
    // myDropzone.emit("thumbnail", file, 'http://faithful.oss-cn-shanghai.aliyuncs.com'+path)
    putObject(path,file,client,myDropzone);
      
}