


$(function(){



    $('input[type="radio"][name="isChangeManage"]').click(function() {
        // 根据value触发不同的事件
        if ($(this).val() == '1') {
            tllock()
        } else if ($(this).val() == '2') {
            tlunlock()
        }
      });

})



let csid ;

let contacterList = [];

let teamMemberList = [];


function tllock(){

    teamLeader.disable()
}


function tlunlock(){
   
    teamLeader.enable()
}


var teamLeader;
var manageMember;
var normalMember;



document.addEventListener("DOMContentLoaded", function () {
    teamLeader=  new TomSelect('#teamLeader',{
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
    teamLeader.disable()
});




document.addEventListener("DOMContentLoaded", function () {
    manageMember= new TomSelect('#manageMember',{
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





document.addEventListener("DOMContentLoaded", function () {
    normalMember=  new TomSelect('#normalMember',{
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




function checkMember(){

    teamMemberList = [];


    normalMember.getValue()
    let nm = normalMember.getValue();
    let mm = manageMember.getValue();
    // console.log(normalMember.options[normalMember.getValue()]) //该方法获取完整数据



    //   nm.forEach 直接进行remove会导致循环提前跳出，nm数据被串改;

    let includeData = [];


    nm.forEach(o=>{

        if(mm.includes(o)){
            includeData.push(o)}
    })


    includeData.forEach(o=>normalMember.removeItem(o))


    let lm = teamLeader.getValue();
    // console.log("lm",lm,teamLeader)
    if(lm){
        let obj = teamLeader.options[lm]
        obj.type = '0';
        teamMemberList.push(obj)
   
    }

    if(mm){
        mm.forEach(value=>{
            let obj = manageMember.options[value]
            obj.type = '1';
            teamMemberList.push(obj)
        })
    }
    if(lm){
        nm.forEach(value=>{
            let obj = normalMember.options[value]
            obj.type = '2';
            teamMemberList.push(obj)
    
    
    
        })
    }
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




let contacters={};

function addContacter(){
    let inputValue = {};

    $('#contacter input,#contacter textarea').each(function() {
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

  


    // 获取div元素
    var divElement = document.getElementById('contacter');
 
    // 获取div内所有非disabled的input元素
    var inputElements = divElement.querySelectorAll('input:not([disabled])');
    var isCheck = true;
    // 遍历input元素，检查值是否为空，并进行提示
    inputElements.forEach(function(input) {

        if(input.name=='contacterName'||input.name=='contacterPhone'){


            input.classList.remove('is-valid', 'is-invalid','is-valid-lite','is-invalid-lite');
        
            // 根据输入内容添加相应的类
            if (inputValue[input.name]!=undefined&&inputValue[input.name].trim() != '') {
            input.classList.add('is-valid');
            input.classList.add('is-valid-lite');
            } else {
            input.classList.add('is-invalid');
            input.classList.add('is-invalid-lite');
            isCheck=false;
            }
        }
        

    
    });



    if(!isCheck)return false;

    const uniqueID = Date.now() + Math.random();

    var str =`<span id='${uniqueID}' style=" border: 1px solid #45aaf2" class="badge bg-twitter-lt" onclick="checkContacter('${uniqueID}')">${inputValue.contacterName}<a onclick="deleteContacter('${uniqueID}')" style="color: black;"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M18 6l-12 12"></path><path d="M6 6l12 12"></path></svg></a>`;

    
    $("#teamlist").append($(str))

    contacters[uniqueID]=inputValue;
    clearContacter();
    return true;

}


function checkContacter(name){

    let person = contacters[name];

    $("#editKey").val(name)


    $('#contactermodal input[type="text"],#contactermodal textarea').each(function() {
        // 获取当前input的name属性
        var inputName = $(this).attr('name');

        // 检查这个name是否存在于person对象中
        if (inputName in person) {
            // 如果存在，‌就填充这个input的值
            $(this).val(person[inputName]);
        }
    });

    $('#contactermodal input[type="radio"][name="contacterGender"]').each(function() {
        if ($(this).val() == person.contacterGender) {
            $(this).prop('checked', true);
        }
    });

    $('#contactermodal').modal('show')


}

function deleteContacter(name){
    contacters[name]=null;
    document.getElementById(name).remove();

    console.log(contacters)
}

function clearContacter(){
    $('#contacter input').each(function() {
        var $input = $(this);
  
     
        if($input.attr('type')=='radio'){
            $input.prop('checked',false)
           
        }else{
              $input.val('');     
              $input.removeClass('is-valid', 'is-invalid','is-valid-lite','is-invalid-lite'); 
        }
  
  
  
  
      });
  
}

function contacterEdit(){
    let key = $("#editKey").val();
    console.log(key)
    let inputValue = {};

    $('#contactermodal input,#contactermodal textarea').each(function() {
      var $input = $(this);

   
      if ($input.attr('name') && $input.val()) {
        console.log($input.attr('type'))

        if($input.attr('type')=='radio'){
            if($input.is(':checked')){
                inputValue[$input.attr('name')] = $input.val();
            }
            
          }else{
            inputValue[$input.attr('name')] = $input.val();
            
          }
          
        
      }

    });

    document.getElementById(key).innerHTML=`${inputValue.contacterName}<a onclick="deleteContacter('${key}')" style="color: black;"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M18 6l-12 12"></path><path d="M6 6l12 12"></path></svg></a>`

    contacters[key]=inputValue;

    console.log(contacters)


    $('#contactermodal').modal('hide')

    
}






function baseInfoCheck(){
    checkMember();



    let inputValue = {};
    var isCheck = true;

    $('#baseinfo input,#baseinfo select,#baseinfo textarea').each(function() {
        var $input = $(this);
        inputValue[$input.attr('name')] = $input.val();
        
      });
      // 获取div元素
      var divElement = document.getElementById('baseinfo');
      // 获取div内所有非disabled的input元素
      var inputElements = divElement.querySelectorAll('input:not([disabled])');
 
      // 遍历input元素，检查值是否为空，并进行提示
      inputElements.forEach(function(input) {

          if(input.name=='customerName'||input.name=='outName'){
              input.classList.remove('is-valid', 'is-invalid','is-valid-lite','is-invalid-lite');
          
              // 根据输入内容添加相应的类
              if (inputValue[input.name]!=undefined&&inputValue[input.name].trim() != '') {
                input.classList.add('is-valid');
                input.classList.add('is-valid-lite');
                if(input.name=='customerName'){

                    let name = inputValue[input.name];
                    if(name.endsWith('有限公司')||name.endsWith('有限责任公司')){
                        input.classList.add('is-valid');
                        input.classList.add('is-valid-lite');
                    }else{
                        input.classList.add('is-invalid');
                        input.classList.add('is-invalid-lite');
                        isCheck=false;
                        }



                }



              } else {
              input.classList.add('is-invalid');
              input.classList.add('is-invalid-lite');
              isCheck=false;
              }

            }
          
  
      
      });
  

    //   isCheck= isCheck==addContacter()?isCheck:false;
    contacterList =[]

    if(addContacter()){
        isCheck = isCheck==true?isCheck:false;
        
        for (let key in contacters){
            contacterList.push(contacters[key])
        }   

    }else{

        for (let key in contacters){
            contacterList.push(contacters[key])
        }   

        if(contacterList.length>0){
            isCheck = isCheck==true?isCheck:false;
        }else{
            isCheck = false;
        }
        
    }



  
    if(isCheck){
        inputValue.contacterList = contacterList;
        inputValue.teamMemberList = teamMemberList;


        // console.log("baseinfo",inputValue);

        addCustomer(inputValue)




      }else{
        return;
      };

}

function baseInfoClear(){
    $('#baseinfo  select, #baseinfo input[type="text"],#baseinfo textarea').each(function() {
        // 将这些元素的值设置为空
        $(this).val('');

      });
}

function addCustomer(data){
    const options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'token':localStorage.getItem('token')
        },
        body: JSON.stringify(data),
        };

        var url = baseUri+'/customer/addCustomerNew';
    fetch(url,options)
        .then(response => response.json())
        .then(json => {
            // console.log(json)
            if(json.code==0){
                
        showMessage(0,'变更成功')

        window.open("my-list.html", '_blank');

            }else{
                showMessage(1,"创建失败")
            }



        }).catch((error)=>{
            callback();
        });


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