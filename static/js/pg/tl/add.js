


$(function(){

    const ct = document.getElementById("jobdiv");  
    ct.innerHTML = '';  
    document.getElementById('fileInput').addEventListener('change', function(event) {
      const file = event.target.files;
      if (file) {
          const reader = new FileReader();
          
          // 读取文件内容为ArrayBuffer
          reader.readAsArrayBuffer(file[0]);
          
          reader.onload = function() {
              const arrayBuffer = reader.result;
              const binaryString = new Uint8Array(arrayBuffer).reduce((data, byte) => data + String.fromCharCode(byte), '');
              
              // 对binaryString进行Base64编码
              const base64Encoded = btoa(binaryString);
              // document.getElementById('introduce1').textContent = base64Encoded;


              testupload(file[0].name,base64Encoded)


          };

          // 处理读取文件错误
          reader.onerror = function() {
              console.error('Error reading file:', reader.error);
          };
      }
  });


    positionList.forEach(item => {  
      if (item.children) {  
        // 创建顶级下拉菜单  
        var dropdownDiv = document.createElement('div');  
        dropdownDiv.classList.add('dropend');  
      
        // 创建触发元素  
        var link = document.createElement('a');  
        link.classList.add('dropdown-item', 'dropdown-toggle');  
        link.setAttribute('data-bs-toggle', 'dropdown');  
        link.setAttribute('data-bs-auto-close', 'outside');  
        link.setAttribute('role', 'button');  
        link.setAttribute('value', item.value);  
        link.setAttribute('aria-expanded', 'false');  
        link.textContent = item.label;  
      
        // 创建顶级下拉菜单的内容容器  
        var dropdownMenu = document.createElement('div');  
        dropdownMenu.classList.add('dropdown-menu');  
      
        // 递归地构建子菜单  
        buildDropdownMenu(item.children, dropdownMenu);  
      
        // 将触发元素和内容容器添加到顶级下拉菜单  
        dropdownDiv.appendChild(link);  
        dropdownDiv.appendChild(dropdownMenu);  
      
        // 将顶级下拉菜单添加到某个容器（例如ct）  
        ct.appendChild(dropdownDiv);  
      } else {  
        // 创建非嵌套的下拉菜单项  
        var link = document.createElement('a');  
        link.classList.add('dropdown-item');  
        link.setAttribute('onClick', 'chooseThis(this)');  
        link.setAttribute('value', item.value);  
        link.textContent = item.label;  
        ct.appendChild(link);  
      }  
    });  
   




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





function testupload(name,code){


  kk=getuploadpermission();
  console.log(kk)

  const options = {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    'authorization': 'APPCODE '+kk,
    },
    body: JSON.stringify({"file_name":name,"resume_base":code}),
};

    var url ='http://xiaoxi.market.alicloudapi.com/v1/parser/parse_base?avatar=1&handle_image=1&rawtext=1&parse_mode=fast';
fetch(url,options)
    .then(response => response.json())
    .then(json => {

       console.log(json)


       //数据填充
      let baseinfo = json.parsing_result.basic_info;
      let contact_info = json.parsing_result.contact_info;//手机号码填充
      $("#baseinfoform input[name='phone']").val(toStr(contact_info.phone_number));
      $("#baseinfoform input[name='email']").val(toStr(contact_info.email));
      $("#baseinfoform input[name='name']").val(toStr(baseinfo.name));
      $("#baseinfoform input[name='age']").val(toStr(baseinfo.age));
      $("#baseinfoform input[name='lastCompany']").val(toStr(baseinfo.last_company));
      $("#baseinfoform input[name='job']").val(toStr(baseinfo.current_position));

      // 学历判断
      let degree = toStr(baseinfo.degree);
      let xueli = 3; // 默认值
      if (degree.includes('专')) {
        xueli = 4;
      } else if (degree.includes('本')) {
        xueli = 5;
      } else if (degree.includes('硕') || degree.includes('研究生')) {
        xueli = 6;
      } else if (degree.includes('博')) {
        xueli = 7;
      }
      $(`#baseinfoform input[name='education'][value='${xueli}']`).prop('checked', true);
      // 工作经验判断
     // 工作经验判断
     let numWorkExperience = toStr(baseinfo.num_work_experience);
     let experienceValue = '不限'; // 默认值
     if (numWorkExperience < 3) {
       experienceValue = '3年以下';
     } else if (numWorkExperience >= 3 && numWorkExperience < 5) {
       experienceValue = '3~5年';
     } else if (numWorkExperience >= 5 && numWorkExperience < 10) {
       experienceValue = '5~10年';
     } else if (numWorkExperience >= 10) {
       experienceValue = '10年以上';
     }
     $(`#baseinfoform select[name='experience']`).val(experienceValue);

     
      // 性别判断
      let gender = baseinfo.gender;
      let genderValue = 0; // 默认值
      if (gender === '男') {
        genderValue = 1;
      } else if (gender === '女') {
        genderValue = 2;
      }
      $(`#baseinfoform input[name='gender'][value='${genderValue}']`).prop('checked', true);
      $("#baseinfoform input[name='domicile']").val(toStr(baseinfo.birthplace));
      $("#baseinfoform input[name='location']").val(toStr(baseinfo.current_location));



      $("#baseinfoform input[name='salary']").val(toStr(baseinfo.current_salary));
      $("#baseinfoform input[name='birthday']").val(toStr(baseinfo.date_of_birth));

      $(`#baseinfoform select[name='RIndustry']`).val(toStr(baseinfo.desired_industry));


      $("#baseinfoform input[name='RJob']").val(toStr(baseinfo.desired_position));
      $("#baseinfoform input[name='RSalary']").val(toStr(baseinfo.desired_salary));
      $("#baseinfoform input[name='RCity']").val(toStr(baseinfo.detailed_location));
      // $(`#baseinfoform textarea[name='introduce']`).val(json.parsing_result.resume_rawtext);

      let stillWorking = 1;
      

      // 填充工作经验
      let workExperiences = json.parsing_result.work_experience;
      if (workExperiences.length === 1) {
       
        let workExperience = workExperiences[0];
        if(workExperience.still_active==1){
          stillWorking = 0;

          $(`#gz01 input[name='isNow']`).prop('checked', true);
        }


        $("#gz01 input[name='name']").val(workExperience.company_name);
        $("#gz01 select[name='industry']").val(workExperience.job_function);
        $("#gz01 input[name='job']").val(workExperience.job_title);
        $("#gz01 textarea[name='duty']").val(workExperience.description);
        $("#gz01 input[name='startTime']").val(`${workExperience.start_time_year}-${workExperience.start_time_month}`);
        $("#gz01 input[name='endTime']").val(`${workExperience.end_time_year}-${workExperience.end_time_month}`);
      } else if (workExperiences.length > 1) {
        workExperiences.forEach((workExperience, index) => {
          if (index > 0) {
            newgzjl(); // 调用 newgzjl 方法
          }else{
            if(workExperience.still_active==1){
              stillWorking = 0;
              $(`#gz01 input[name='isNow']`).prop('checked', true);
            }
            $("#gz01 input[name='name']").val(workExperience.company_name);
            $("#gz01 select[name='industry']").val(workExperience.job_function);
            $("#gz01 input[name='job']").val(workExperience.job_title);
            $("#gz01 textarea[name='duty']").val(workExperience.description);
            $("#gz01 input[name='startTime']").val(`${workExperience.start_time_year}-${workExperience.start_time_month}`);
            $("#gz01 input[name='endTime']").val(`${workExperience.end_time_year}-${workExperience.end_time_month}`);
          }
         
          if(workExperience.still_active==1){
            stillWorking = 0;
            $(`#gz${gzjl} input[name='isNow']`).prop('checked', true);
          }
          $(`#gz${gzjl} input[name='name']`).val(workExperience.company_name);
          $(`#gz${gzjl} select[name='industry']`).val(workExperience.job_function);
          $(`#gz${gzjl} input[name='job']`).val(workExperience.job_title);
          $(`#gz${gzjl} textarea[name='duty']`).val(workExperience.description);
          $(`#gz${gzjl} input[name='startTime']`).val(`${workExperience.start_time_year}-${workExperience.start_time_month}`);
          $(`#gz${gzjl} input[name='endTime']`).val(`${workExperience.end_time_year}-${workExperience.end_time_month}`);
        });
      }


      $(`#baseinfoform input[name='workState'][value='${stillWorking}']`).prop('checked', true);

      let projectExperiences = json.parsing_result.project_experience; 

      if (projectExperiences.length === 1) {
        let projectExperience = projectExperiences[0];
        $("#xm01 input[name='name']").val(projectExperience.project_name);
        $("#xm01 input[name='job']").val(projectExperience.job_title);
        $("#xm01 textarea[name='duty']").val(projectExperience.description);
        $("#xm01 input[name='startTime']").val(`${projectExperience.start_time_year}-${workExperience.start_time_month}`);
        $("#xm01 input[name='endTime']").val(`${projectExperience.end_time_year}-${workExperience.end_time_month}`);
      } else if (projectExperiences.length > 1) {
        projectExperiences.forEach((projectExperience, index) => {
          if (index > 0) {
            newxmjl(); // 调用 newxmjl 方法
          }else{
            $("#xm01 input[name='name']").val(projectExperience.project_name);
            $("#xm01 input[name='job']").val(projectExperience.job_title);
            $("#xm01 textarea[name='duty']").val(projectExperience.description);
            $("#xm01 input[name='startTime']").val(`${projectExperience.start_time_year}-${projectExperience.start_time_month}`);
            $("#xm01 input[name='endTime']").val(`${projectExperience.end_time_year}-${projectExperience.end_time_month}`);
          }
         
          $(`#xm${xmjl} input[name='name']`).val(projectExperience.project_name);
          $(`#xm${xmjl} input[name='job']`).val(projectExperience.job_title);
          $(`#xm${xmjl} textarea[name='duty']`).val(projectExperience.description);
          $(`#xm${xmjl} input[name='startTime']`).val(`${projectExperience.start_time_year}-${projectExperience.start_time_month}`);
          $(`#xm${xmjl} input[name='endTime']`).val(`${projectExperience.end_time_year}-${projectExperience.end_time_month}`);
        });
      }


      let educationExperiences = json.parsing_result.education_experience;


      if(educationExperiences){
        educationExperiences.forEach((educationExperience, index) => {

          let degree1 = toStr(educationExperience.degree);
          let xueli1 = 0; // 默认值
          if (degree1.includes('大专')) {
            xueli1 = 4;
          } else if (degree1.includes('本')) {
            xueli1 = 5;
          } else if (degree1.includes('硕') || degree1.includes('研究生')) {
            xueli1 = 6;
          } else if (degree1.includes('博')) {
            xueli1 = 7;
          }else if (degree1.includes('高')) {
            xueli1 = 2;
          }else if (degree1.includes('初')) {
            xueli1 = 1;
          }else if (degree1.includes('中专')) {
            xueli1 = 3;
          }

          let isALL = toStr(educationExperience.study_model);
          let isALL1 = 0; // 默认值
          if (isALL.includes('全日制')||isALL.includes('统招')) {
            isALL1 = 0;
          } else {
            isALL1 = 1;
          }



          if (index > 0) {
            newjyjl(); // 调用 newxmjl 方法
          }else{

            $(`#edu01 input[name='edu01-education'][value='${xueli1}']`).prop('checked', true);

            $(`#edu01 input[name='isAlldayedu01-isAllTime'][value='${isALL1}']`).prop('checked', true);

            $("#edu01 input[name='name']").val(educationExperience.school_name);
            $("#edu01 input[name='classes']").val(educationExperience.major);
            $("#edu01 input[name='startTime']").val(`${educationExperience.start_time_year}-${educationExperience.start_time_month}`);
            $("#edu01 input[name='endTime']").val(`${educationExperience.end_time_year}-${educationExperience.end_time_month}`);
          }

          $(`#edu${jyjl} input[name='edu${jyjl}-education'][value='${xueli1}']`).prop('checked', true);
          $(`#edu${jyjl} input[name='isAlldayedu${jyjl}-isAllTime'][value='${isALL1}']`).prop('checked', true);
          $(`#edu${jyjl} input[name='name']`).val(educationExperience.school_name);
          $(`#edu${jyjl} input[name='classes']`).val(educationExperience.major);
          $(`#edu${jyjl} input[name='startTime']`).val(`${educationExperience.start_time_year}-${educationExperience.start_time_month}`);
          $(`#edu${jyjl} input[name='endTime']`).val(`${educationExperience.end_time_year}-${educationExperience.end_time_month}`);
        });

      }  






    }).catch((error)=>{
        console.log(error)
      
    });

}
let permissionkey;
function getuploadpermission(){


  let permissionkey = sessionStorage.getItem("permissionkey");
  if(permissionkey!=null&&permissionkey!=undefined&&permissionkey!=''){
    return   atob(permissionkey);

  }




  const options = {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    'token':localStorage.getItem('token')
    },
    };

    var url = baseUri+'/talent/upFilePermission';
fetch(url,options)
    .then(response => response.json())
    .then(json => {


      sessionStorage.setItem("permissionkey",json.data)
    }).catch((error)=>{
        console.log(error)
      
    });
    
    return atob(sessionStorage.getItem("permissionkey"));

}


// 递归函数来构建子菜单  
function buildDropdownMenu(items, parent) {  
  items.forEach(item => {  
    var dropdownDiv = document.createElement('div');  
    
  
    var link = document.createElement('a');  

  
    var dropdownMenu = document.createElement('div');  
    dropdownMenu.classList.add('dropdown-menu');  
  
    if (item.children) {  

      dropdownDiv.classList.add('dropend');  

      link.classList.add('dropdown-item', 'dropdown-toggle');  
      link.setAttribute('data-bs-toggle', 'dropdown');  
      link.setAttribute('data-bs-auto-close', 'outside');  
      link.setAttribute('role', 'button');  
      link.setAttribute('value', item.value);  
      link.setAttribute('aria-expanded', 'false');  
      link.textContent = item.label;  
      
      buildDropdownMenu(item.children, dropdownMenu);  
      
    } else {  
      // 创建非嵌套的下拉菜单项  
      link.classList.add('dropdown-item');  
      link.setAttribute('onClick', 'chooseThis(this)');  
      link.setAttribute('value', item.value);  
      link.textContent = item.label;  
      dropdownMenu.appendChild(link);  
    }  
  
    dropdownDiv.appendChild(link); 
    dropdownDiv.appendChild(dropdownMenu);  
    parent.appendChild(dropdownDiv);  
  });  
}





function chooseThis(o){


  


  let str = '';

  var showLinks = $('a.show');


  if(showLinks.length>1){

    showLinks.each(function() {
  
      str +=   $(this).attr('value') + ' / '
  
  
    });
  
    str+=$(o).attr('value');
    $('#jobinput').val(str)
  }else{
    $('#jobinput').val(str)
  }

  $('#jobmenu.show').removeClass('show');


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


let gzjl=2;
let xmjl=2;
let jyjl=2;
function newgzjl(){
  gzjl++;

  $('#gzjsinfo').append(`
    <div class="card trcard" id="gz${gzjl}">

                          <div class="card-header border-bottom py-3">
                            <div class="col-auto ms-auto d-print-none">
                                
                              <div class="ms-2 d-inline-block">
                                
                                <a  class="btn btn-info btn-sm" onclick='clearformdiv("gz${gzjl}")'>清空</a>
                                <a  class="btn btn-danger btn-sm" onclick='deleteformdiv("gzjsinfo","gz${gzjl}")'>删除</a>
                              </div>
                            </div>
                          </div>
                          <div class="row row-cards card-body">
                            <div class="col-md-12">
                              <div class=" row">
                                <label class="col-2 form-label required wordbold">工作时间</label>
                                <div class="col-auto">
                                  <input type="text" class="form-control " placeholder="开始日期" name="startTime" id="startgz${gzjl}" autocomplete="off">
                                  <div class="invalid-feedback">不能为空！</div>
                                </div>
                                <div class="col-auto">
                                  <input type="text" class="form-control " placeholder="结束日期" name="endTime" id="endgz${gzjl}" autocomplete="off">
                                  <div class="invalid-feedback">不能为空！</div>
                                </div>
                                <label class="form-check form-check-inline col-auto">
                                  <input class="form-check-input" type="checkbox" name="isNow" value="1">
                                  <span class="form-check-label">至今</span>
                                </label>
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class=" row">
                                <label class="col-4 form-label required wordbold">所在公司</label>
                                <div class="col-auto">
                                  <input type="text" class="form-control " placeholder="所在公司" name="name" autocomplete="off">
                                  <div class="invalid-feedback">不能为空！</div>
                                </div>
                                
                              </div>
                            </div>
                            <div class="col-md-6">
                            </div>
                            
                            <div class="col-md-6">
                              <div class=" row">
                                <label class="col-4 form-label  wordbold">所属行业</label>
                                <div class="col-auto">
                                  <select class="form-select" name="industry">
                                    <option selected value="">不限</option>
                                    <option value="互联网 / 游戏 / 软件">互联网 / 游戏 / 软件</option>
                                    <option value="电子 / 通信 / 硬件">电子 / 通信 / 硬件</option>
                                    <option value="房地产 / 建筑 / 物业 ">房地产 / 建筑 / 物业 </option>
                                    <option value="经济">经济</option>
                                    <option value="消费品">消费品</option>
                                    <option value="汽车 / 机械 / 制造">汽车 / 机械 / 制造</option>
                                    <option value="广告 / 传媒 / 教育 / 文化">广告 / 传媒 / 教育 / 文化</option>
                                    <option value="交通 / 贸易 / 物流">交通 / 贸易 / 物流</option>
                                    <option value="制药 / 医用器械">制药 / 医用器械</option>
                                    <option value="能源 / 化工 / 环保">能源 / 化工 / 环保</option>
                                    <option value="政府 / 农林牧渔">政府 / 农林牧渔</option>
                                  </select>
                                </div>
                              </div>
                              
                            </div>
                            <div class="col-md-6">
                            </div>
                            <div class="col-md-6">
                              <div class=" row">
                                <label class="col-4 form-label required wordbold">工作岗位</label>
                                <div class="col-auto">
                                  <input type="text" class="form-control " placeholder="工作岗位" name="job" autocomplete="off">
                                  <div class="invalid-feedback">不能为空！</div>
                                </div>
                                
                              </div>
                            </div>
                            <div class="col-md-12">
                              <div class="row">
                                <label class="col-2 form-label required wordbold">工作职责</label>
                                <div class="col-8">
                                  <textarea rows="3" class="form-control" name="duty"></textarea>
                                </div>
                                
                              </div>
                            </div>
                            
                          </div>
                          
                        </div>
    
    `)


    jeDate("#endgz"+gzjl,{
      theme:{bgcolor:"#4cc9f0",pnColor:"#00CCFF"},
      format: "YYYY-MM"
  });
  jeDate("#startgz"+gzjl,{
    theme:{bgcolor:"#4cc9f0",pnColor:"#00CCFF"},
    format: "YYYY-MM"
});



collectInputsAndMakeJsonJq() 

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

function deleteformdiv(superid,id){
  $('#'+superid+' #'+id+'').remove();
}


function collectInputsAndMakeJsonJq() {
  var jsonArray = [];
  // console.log( $('#gzjsinfo.trcard'));
  var subDivs = document.getElementById('gzjsinfo').querySelectorAll('.trcard');
  subDivs.forEach(function (subDiv) {
    
    var inputObj = {};
    var inputs = subDiv.querySelectorAll('input');
    inputs.forEach(function (input) {
        if (input.type === 'text' || input.type === 'number') {
            inputObj[input.name] = input.value;
        } else if (input.type === 'checkbox') {
          if(input.checked){
            inputObj[input.name] = input.value;
          }
            
        }
    });
    var textareas = subDiv.querySelectorAll('textarea');
    textareas.forEach(function (textarea) {
      inputObj[textarea.name] = textarea.value;
  });

    jsonArray.push(inputObj);
});
  
  return jsonArray;
}


function newxmjl(){
  xmjl++;

  $('#xmjlinfo').append(`
    <div class="card trcard" id="xm${xmjl}">

                          <div class="card-header border-bottom py-3">
                            <div class="col-auto ms-auto d-print-none">
                                
                              <div class="ms-2 d-inline-block">
                                
                                <a class="btn btn-info btn-sm" onclick='clearformdiv("xm${xmjl}")'>清空</a>
                                <a  class="btn btn-danger btn-sm" onclick='deleteformdiv("xm${xmjl}")'>删除</a>
                              </div>
                            </div>
                          </div>
                          <div class="row row-cards card-body">
                            <div class="col-md-12">
                              <div class=" row">
                                <label class="col-2 form-label required wordbold">项目时间</label>
                                <div class="col-auto">
                                  <input type="text" class="form-control " placeholder="开始日期" name="startTime" id="startxm${xmjl}" autocomplete="off">
                                  <div class="invalid-feedback">不能为空！</div>
                                </div>
                                <div class="col-auto">
                                  <input type="text" class="form-control " placeholder="结束日期" name="endTime" id="endxm${xmjl}" autocomplete="off">
                                  <div class="invalid-feedback">不能为空！</div>
                                </div>
                                <label class="form-check form-check-inline col-auto">
                                  <input class="form-check-input" type="checkbox" name="isNow" value="1"> 
                                  <span class="form-check-label">至今</span>
                                </label>
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class=" row">
                                <label class="col-4 form-label required wordbold">项目名称</label>
                                <div class="col-auto">
                                  <input type="text" class="form-control" name="name" autocomplete="off">
                                  <div class="invalid-feedback">不能为空！</div>
                                </div>
                                
                              </div>
                            </div>
                            <div class="col-md-6">
                            </div>
                            <div class="col-md-6">
                              <div class=" row">
                                <label class="col-4 form-label required wordbold">项目职位</label>
                                <div class="col-auto">
                                  <input type="text" class="form-control" name="job" autocomplete="off">
                                  <div class="invalid-feedback">不能为空！</div>
                                </div>
                                
                              </div>
                            </div>
                            <div class="col-md-6">
                            </div>
                            <div class="col-md-12">
                              <div class="row">
                                <label class="col-2 form-label required wordbold">项目职责</label>
                                <div class="col-8">
                                  <textarea rows="3" class="form-control" name="duty" autocomplete="off"></textarea>
                                </div>
                                
                              </div>
                            </div>
                            
                          </div>
                          
                        </div>
    
    `)


    jeDate("#endxm"+xmjl,{
      theme:{bgcolor:"#4cc9f0",pnColor:"#00CCFF"},
      format: "YYYY-MM"
  });
  jeDate("#startxm"+xmjl,{
    theme:{bgcolor:"#4cc9f0",pnColor:"#00CCFF"},
    format: "YYYY-MM"
});


}




function newjyjl(){
  jyjl++;

  $('#jyjlinfo').append(`
    <div class="card trcard" id="edu${jyjl}">

                          <div class="card-header border-bottom py-3">
                            <div class="col-auto ms-auto d-print-none">
                                
                              <div class="ms-2 d-inline-block">
                                <a  class="btn btn-info btn-sm" onclick='clearformdiv("edu${jyjl}")'>清空</a>
                                <a  class="btn btn-danger btn-sm" onclick='deleteformdiv("edu${jyjl}")'>删除</a>
                              </div>
                            </div>
                          </div>
                          <div class="row row-cards card-body">
                            <div class="col-md-12">
                              <div class=" row">
                                <label class="col-2 form-label required wordbold">教育日期</label>
                                <div class="col-auto">
                                  <input type="text" class="form-control " placeholder="开始日期" name="startTime" id="startjy${jyjl}" autocomplete="off">
                                  <div class="invalid-feedback">不能为空！</div>
                                </div>
                                <div class="col-auto">
                                  <input type="text" class="form-control " placeholder="结束日期" name="endTime" id="endjy${jyjl}" autocomplete="off">
                                  <div class="invalid-feedback">不能为空！</div>
                                </div>
                                <label class="form-check form-check-inline col-auto">
                                  <input class="form-check-input" type="checkbox" name="isNow" value="1">
                                  <span class="form-check-label">至今</span>
                                </label>
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class=" row">
                                <label class="col-4 form-label required wordbold">毕业院校</label>
                                <div class="col-auto">
                                  <input type="text" class="form-control" name="name" autocomplete="off">
                                  <div class="invalid-feedback">不能为空！</div>
                                </div>
                                
                              </div>
                            </div>
                            <div class="col-md-6">
                            </div>
                            <div class="col-md-6">
                              <div class=" row">
                                <label class="col-4 form-label required wordbold">所读专业</label>
                                <div class="col-auto">
                                  <input type="text" class="form-control" name="classes" autocomplete="off">
                                  <div class="invalid-feedback">不能为空！</div>
                                </div>
                                
                              </div>
                            </div>
                            <div class="col-md-6">
                            </div>
                            <div class="col-md-12">
                              <div class="row">
                                <label class="form-label col-md-2 wordbold" >学历</label>
                                <div  class="col-auto">
                                  <label class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="edu${jyjl}-education" value="0" >
                                    <span class="form-check-label">不限</span>
                                  </label>
                                  <label class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="edu${jyjl}-education" value="1" >
                                    <span class="form-check-label">初中</span>
                                  </label>
                                  <label class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="edu${jyjl}-education" value="2" >
                                    <span class="form-check-label">高中</span>
                                  </label>
                                  <label class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="edu${jyjl}-education" value="3" >
                                    <span class="form-check-label">中专</span>
                                  </label>
                                  <label class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="edu${jyjl}-education" value="4">
                                    <span class="form-check-label">大专</span>
                                  </label>
                                  
                                  <label class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="edu${jyjl}-education" value="5" checked>
                                    <span class="form-check-label">本科</span>
                                  </label>
                                  
                                  <label class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="edu${jyjl}-education" value="6">
                                    <span class="form-check-label">硕士</span>
                                  </label>
                                  
                                  <label class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="edu${jyjl}-education" value="7">
                                    <span class="form-check-label">博士</span>
                                  </label>
                                  
                                </div>
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="row">
                                <label class="form-label col-md-4 wordbold" >是否统招</label>
                                <div  class="col-auto">
                                  <label class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="isAlldayedu${jyjl}-isAllTime" value="0" checked>
                                    <span class="form-check-label">是</span>
                                  </label>
                                  <label class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="isAlldayedu${jyjl}-isAllTime" value="1" >
                                    <span class="form-check-label">否</span>
                                  </label>
                               
                                </div>
                              </div>
                            </div>
                            <div class="col-md-6">
                            </div>
                            <div class="col-md-12">
                              <div class="row">
                                <label class="col-2 form-label  wordbold">学校经历</label>
                                <div class="col-8">
                                  <textarea rows="3" class="form-control" placeholder="奖学金、考试证书、比赛获奖等" name="duty" autocomplete="off"  ></textarea>
                                </div>
                                
                              </div>
                            </div>
                            
                          </div>
                          
                        </div>
    
    `)


  jeDate("#endjy"+jyjl,{
      theme:{bgcolor:"#4cc9f0",pnColor:"#00CCFF"},
      format: "YYYY-MM"
  });
  jeDate("#startjy"+jyjl,{
      theme:{bgcolor:"#4cc9f0",pnColor:"#00CCFF"},
      format: "YYYY-MM"
  });


}


let work1,pro1,edu1=false;

function collectWorkExperienceData() {
  const workExperiences = [];

  $('#gzjsinfo .trcard').each(function() {
    const workExperience = {};
    let isCheckboxChecked = false;


       // First pass to check if any checkbox is checked
       $(this).find('input[type="checkbox"]').each(function() {
        if ($(this).is(':checked')) {
          isCheckboxChecked = true;
        }
      });


    $(this).find('input, textarea,select').each(function() {
      const name = $(this).attr('name');
      const value = $(this).val();
      const type = $(this).attr('type');

      if (type === 'checkbox') {
        if ($(this).is(':checked')) {
          workExperience[name] = value;
        }
      } else  if (type != 'radio') {
        if (value || (isCheckboxChecked && name === 'endTime')) {
         
          $(this).removeClass('is-invalid','is-invalid-lite');
          workExperience[name] = value;
          work1=true;
        } else {
          work1=false;
          $(this).addClass('is-invalid','is-invalid-lite');
         
        }
      }else{
        workExperience[name] = value;
      }
    });
    workExperiences.push(workExperience);
  });

  // return JSON.stringify(workExperiences);
  return workExperiences
}


function collectProjectExperienceData() {
  const workExperiences = [];

  $('#xmjlinfo .trcard').each(function() {
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
    
      if (type === 'checkbox') {
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
    });


    workExperiences.push(workExperience);
  });

  // return JSON.stringify(workExperiences);
  return workExperiences
}


function collectEduExperienceData() {
  const workExperiences = [];

  $('#jyjlinfo .trcard').each(function() {
    const workExperience = {};
    let isCheckboxChecked = false;

        // First pass to check if any checkbox is checked
        $(this).find('input[type="checkbox"]').each(function() {
          if ($(this).is(':checked')) {
            isCheckboxChecked = true;
          }
        });
    $(this).find('input,select').each(function() {
      const name = $(this).attr('name');
      const value = $(this).val();
      const type = $(this).attr('type');


      if (name.indexOf('-')!== -1) {
        workExperience[name.split('-')[1]] = value; 
      }






      if (type === 'checkbox') {
        if ($(this).is(':checked')) {
          isCheckboxChecked = true;
          workExperience[name] = value;
        }
      } else  if (type != 'radio') {
        if (value || (isCheckboxChecked && name === 'endTime')) {
          $(this).removeClass('is-invalid','is-invalid-lite');
          workExperience[name] = value;
          edu1=true;
        } else {
          edu1=false;
          $(this).addClass('is-invalid','is-invalid-lite');
         
        }
      }else{
        workExperience[name] = value;
      }
    });

    
    $(this).find('textarea').each(function() {
      const name = $(this).attr('name');
      const value = $(this).val();
      workExperience[name] = value;
    });
    workExperiences.push(workExperience);
  });

  // return JSON.stringify(workExperiences);
  return workExperiences;
}



function test(){

  const a1 = collectWorkExperienceData();
  // console.log(a1);
  const a2 = collectProjectExperienceData();
  // console.log(a2);
  const a3 = collectEduExperienceData();
  // console.log(a3);


  return work1&&pro1&&edu1;

}



function formDataCheck() {
  let formData = {};
  let isValid = true;


console.log("isValid",isValid)
  document.querySelectorAll('input, select, textarea').forEach(element => {
    let name = element.name || element.id;
    if (name) {
        formData[name] = element.value;
    }
});

// Check if required fields are empty
document.querySelectorAll('label.required').forEach(label => {
    let input = label.nextElementSibling.querySelector('input, select, textarea');
    if (input && !input.value) {
        isValid = false;
        input.classList.add('is-invalid','is-invalid-lite'); // Add error class to highlight the empty required field
       
    } else if (input) {
        input.classList.remove('is-invalid','is-invalid-lite');
        
    }
});











  // Collect additional data from specific methods
  formData.workExperience = collectWorkExperienceData();
  formData.projectExperience = collectProjectExperienceData();
  
  formData.eduExperience = collectEduExperienceData();


  console.log("isValid",isValid)
  console.log("test()",test())

  if (!isValid ||!test()) {
    showMessage(2,'请填写完整的信息');
      return null;
  }



  return formData;
}