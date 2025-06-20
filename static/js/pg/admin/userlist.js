$(function(){
    // var customerId = getParameterByName('customerId');
  jeDate("#ymd01",{
      theme:{bgcolor:"#4cc9f0",pnColor:"#00CCFF"},
      format: "YYYY-MM-DD"
  });
  // jeDate("#ymd02",{
  //   theme:{bgcolor:"#4cc9f0",pnColor:"#00CCFF"},
  //   format: "YYYY-MM-DD"
  // });
  
  document.querySelectorAll('#myForm input[type="radio"]').forEach(radio => {
    radio.addEventListener('change', function() {
        getPage(1);
    });
});

    // console.log('customerId:'+customerId)
    //默认进行分页数据查询
    getPage(1);











    Dropzone.autoDiscover = false;
   
    var myDropzone = new Dropzone("#avatarDropzone", {
        url:'test',
        dictDefaultMessage:"点击或拖拽文件到此上传！",
        addRemoveLinks: true,//是否有删除文件的功能
        dictRemoveFile: "移除",//移除文件链接的文本。只设置addRemoveLinks: true 没有这个 会找不到删除按钮
        dictRemoveFileConfirmation: '确定删除此文件吗?',

        autoProcessQueue: false, // 设置为false，表示不自动上传文件队列
        // acceptedFiles: ".jpg,.png,.jpeg.JPG,.PNG,.JPEG",//支持的格式
        // accept: function(file, done) {
      
        // },

        // 其他配置选项...
        init: function() {
            this.on("success", function(file, response) {
                // 假设服务器返回的response是一个对象，其中包含上传成功的信息
                // console.log("文件上传成功:", file,response);
                // console.log("文件上传成功:", response);

            // 创建一个新的<img>元素用于预览
            file.url='/'+response.name
          
            // 将<img>元素添加到预览区域
    
                // 更新UI以显示上传成功
                // 你可以根据需要自定义这部分代码
                var previewElement = file.previewElement;
                previewElement.classList.add("dz-success"); // 添加成功类
                // previewElement.classList.remove("dz-progress"); // 移除处理中类
                previewElement.classList.remove("dz-processing");
                // // ...其他UI更新操作...
                // $('.dz-progress').each(function() {
                //     // 移除dz-processing类
                //     $(this).removeClass('dz-progress');
                //     // 添加dz-success类
                //     $(this).addClass('dz-success');
                // });


            });
            this.on("removedfile",function (file){
                removeFileNames(file.url);
                console.log(file)
                console.log(filenames)
            });
    
        }
    });



    myDropzone.on("addedfile", function(file) {  
        upload(file,myDropzone)
        // 你可以在这里添加预览逻辑  
        // myDropzone.createThumbnailFromUrl(...);  
    });  
      























})

















 

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


    
    var path = '/head/'+file.name;
      filename =path;
    

    console.log(filename)
    addFileNames(file.name,path)

    
    // myDropzone.emit("thumbnail", file, 'http://faithful.oss-cn-shanghai.aliyuncs.com'+path)
    putObject(path,file,client,myDropzone);
      
}

let filename = '';

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
        url:baseUri+'/admin/userList',
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
        

                    let workstate = '';
                    let oprater = ``;
                    if(o.workState=='0'){
                        workstate = '在职';
                        oprater =` 
                        <a class='btn btn-ghost btn-sm' onclick='checkDetails(${o.id})'>编辑</a>
                        <a class='btn btn-ghost btn-sm' onclick='checkDetails(${o.id})'>重置密码</a>
                        <a class='btn btn-ghost btn-sm' onclick='checkDetails(${o.id})'>离职</a>
                        <a class='btn btn-danger btn-sm' onclick='deltrip(${o.id})'>停用</a>`
                    }else {
                        workstate = '离职'  
                        oprater =` 
                       `
                    }







                    str+=
                    `
                    <tr>
                        <td style='color:red'>${o.account}</td>
                        <td >${toStr(o.name)}</td>
                        <td >${o.phone}</td>
                        <td >${toStr(o.job)}</td>
                        <td >${toStr(o.flowerName)}</td>
                        <td >${toStr(o.workstate)}</td>
                        <td >${toStr(o.hireDate)}</td>
                        <td >${toStr(o.leaveDate)}</td>
                        <td >${o.roleName}</td>
                        <td >${toStr(o.comName)}</td>
                        <td>
                        
                       ${oprater}
                        
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


function checkDetails(id){
  $('#usermodal').modal('show');

}