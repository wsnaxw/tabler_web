$(document).ready(function(){

    // var customerId = getParameterByName('customerId');
    jeDate("#ymd03",{
      theme:{bgcolor:"#4cc9f0",pnColor:"#00CCFF"},
      format: "YYYY-MM-DD"
  });

  jeDate("#ymd033",{
      theme:{bgcolor:"#4cc9f0",pnColor:"#00CCFF"},
      multiPane:false,
      range:" ~ ",
      format: "YYYY-MM-DD"
  });
  jeDate("#ymd02",{
      theme:{bgcolor:"#4cc9f0",pnColor:"#00CCFF"},
      format: "YYYY-MM"
  });
  jeDate("#ymd022",{
      theme:{bgcolor:"#4cc9f0",pnColor:"#00CCFF"},
      multiPane:false,
      range:" ~ ",
      format: "YYYY-MM"
  });



  jeDate("#ymd01",{
      theme:{bgcolor:"#4cc9f0",pnColor:"#00CCFF"},
      format: "YYYY"
  });

  jeDate("#ymd011",{
      theme:{bgcolor:"#4cc9f0",pnColor:"#00CCFF"},
      multiPane:false,
      range:" ~ ",
      format: "YYYY"
  });
    // console.log('customerId:'+customerId)
    checkboxChcek()
    //默认进行分页数据查询
    getPage(1);
    timeClickYear();



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



function timeClickDay(){

  var checkbox = document.getElementById('range');
  $('#dateInput input').val('');

  $("#day").prop('checked',true);
  $("#year").prop('checked',false);
  $("#month").prop('checked',false);
  $("#timeDate11").hide();
  $("#timeDate22").hide();
  $("#timeDate1111").hide();
  $("#timeDate2222").hide();


  if (checkbox.checked) {

      $("#timeDate33").hide();

      $("#timeDate3333").show();
  }else{

      $("#timeDate33").show();

      $("#timeDate3333").hide();
  }









}

function timeClickMonth(){
  $('#dateInput input').val('');

  var checkbox = document.getElementById('range');
  $("#day").prop('checked',false);
  $("#year").prop('checked',false);
  $("#month").prop('checked',true);
  $("#timeDate11").hide();
  $("#timeDate33").hide();


  $("#timeDate1111").hide();
  $("#timeDate3333").hide();

  if (checkbox.checked) {

      $("#timeDate22").hide();

      $("#timeDate2222").show();
  }else{

      $("#timeDate22").show();

      $("#timeDate2222").hide();
  }



}

function timeClickYear(){
  $('#dateInput input').val('');

  var checkbox = document.getElementById('range');

  $("#day").prop('checked',false);
  $("#year").prop('checked',true);
  $("#month").prop('checked',false);

  $("#timeDate22").hide();
  $("#timeDate33").hide();
  $("#timeDate11").show();

  $("#timeDate2222").hide();
  $("#timeDate3333").hide();
  $("#timeDate1111").show();


  if (checkbox.checked) {

      $("#timeDate11").hide();

      $("#timeDate1111").show();
  }else{

      $("#timeDate11").show();

      $("#timeDate1111").hide();
  }


}

function isRange() {
  var checkbox = document.getElementById('range');
  var day = document.getElementById('day');
  var month = document.getElementById('month');
  var year = document.getElementById('year');



  let form = document.getElementById('myForm'); // 用你的form的ID替换'myForm'
  let inputs = form.elements; // 获取表单中的所有元素

  for (let i = 0; i < inputs.length; i++) {
      // 检查元素类型，只清空输入类型的元素
      if (inputs[i].type === 'text') {
          inputs[i].value = ''; // 清空值
      }
  }


  if (checkbox.checked) {

      if (day.checked){
          console.log("day checked")
          timeClickDay()
      }
      if (month.checked){
          timeClickMonth()
          console.log("month checked")
      }
      if (year.checked){
          timeClickYear()
          console.log("year checked")
      }
      console.log('Checkbox is checked.');
  } else {


      if (day.checked){
          timeClickDay()
          console.log("day checked")
      }
      if (month.checked){
          timeClickMonth()
          console.log("month checked")
      }
      if (year.checked){
          timeClickYear()
          console.log("year checked")
      }
      console.log('Checkbox is not checked.');
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

  if (newJsonData.isCorp !== 'on'){
      newJsonData.type = '2'
  }else {
      newJsonData.type = '3'
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



function getPage(pageNo,all){


  let data = getFormDate()

  data.pageNo = pageNo;
  if(all==1){
    data.pageSize = 200;
  }else{
    data.pageSize = 15;
  }




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

                        

                        str+=
                        `
                        <tr name="${i}" class="hidden-row">
                            <td></td>
                            <td></td>
                            <td >${toStr(child.dataTime)}</td>    
                            <td ></td>
                            <td >${toStr(child.tgkh)}</td>    
                            <td >${toStr(child.khms)}</td>
                            <td >${toStr(child.offer)}</td>    
                            <td >${toStr(child.cgrz)}</td>
                            <td >${toStr(child.lrrx)}</td>    
                            <td >${toStr(child.qykh)}</td>
                            <td >${toStr(child.fee)}</td>    
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

    $('#formdata input[type="checkbox"], #formdata select, #formdata input[type="text"]').each(function() {
        // 将这些元素的值设置为空
        $(this).val('');
        // 对于checkbox，还需要取消选中状态
        if ($(this).is('input[type="checkbox"]')) {
          $(this).prop('checked', false);
        }
      });
}


function cleanseJSON(obj) {
    if (obj === null || obj === undefined) {
      return null;
    }
  
    if (typeof obj !== 'object' || Array.isArray(obj)) {
      // 如果值不是对象或者是一个数组，那么检查它是否为空值
      return obj === '' || obj === null || obj === undefined ? null : obj;
    }
  
    // 对于对象，遍历其所有属性
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        let val = obj[key];
        if (val === '' || val === null || val === undefined) {
          // 如果属性值为空值，删除该属性
          delete obj[key];
        } else if (typeof val === 'object') {
          // 如果属性值仍然是对象，递归地清理它
          cleanseJSON(val);
        }
      }
    }
  
    return obj;
  }


function checkboxChcek(){


    var checkboxescert = $('input[name="certification"]');

    // 当任何一个checkbox的状态发生变化时
    checkboxescert.change(function() {
      // 如果当前checkbox被选中
      if ($(this).is(':checked')) {
        // 取消选中其他所有的同名checkbox
        checkboxescert.not(this).prop('checked', false);
      }
    });

    var checkboxesvip = $('input[name="vip"]');

    // 当任何一个checkbox的状态发生变化时
    checkboxesvip.change(function() {
      // 如果当前checkbox被选中
      if ($(this).is(':checked')) {
        // 取消选中其他所有的同名checkbox
        checkboxesvip.not(this).prop('checked', false);
      }
    });

    var checkboxesbelong = $('input[name="belong"]');

    // 当任何一个checkbox的状态发生变化时
    checkboxesbelong.change(function() {
      // 如果当前checkbox被选中
      if ($(this).is(':checked')) {
        // 取消选中其他所有的同名checkbox
        checkboxesbelong.not(this).prop('checked', false);
      }
    });




}

function searchList(all){
    getPage(1,all)
}


function checkDetail(id){
    //跳转页面并且携带参数

    let bigNumber = BigInt(id);
    let customerId = bigNumber.toString(); // 转换为字符串


// 创建一个新的URL，携带参数
var url = 'cusd.html?customerId=' + encodeURIComponent(customerId)+'' ;

// 使用jQuery来跳转到新页面
// window.location.href = url;

window.open(url, '_blank');

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

