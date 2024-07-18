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



function timeClickDay(){

  var checkbox = document.getElementById('range');

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
function getPage(pageNo){




    let queryData = formCheck()
    queryData.pageNo = pageNo;
    queryData.pageSize = 15;

    // console.log(queryData)


    $('#data').html('');


    $.ajax({
        headers:{
            'token':localStorage.getItem("token"),
            Accept:'application/json',
            'Content-Type':'application/json;charset=UTF-8'
        },
        dataType:'json',
        type:'post',
        url:baseUri+'/home/allUserData',
        data:JSON.stringify(queryData),
        success:function(obj){

            var str="";
            if(obj.data.list.length===0){
              $('.table-sort tbody').append("<tr class='text-c'><td colspan='4'>没有数据 !</td></tr>");
              $('#pageSelect').html('');
              $('#totalPageNum').html(0);
              $('#totalPageNum1').html(0);
                
            }else{
                // $("#countsss").css("display","");
                for(var i =0;i<obj.data.list.length;i++){

                    var o = obj.data.list[i];
        


                    str+=
                    `
                    <tr>
                        <td ></td>
                        <td >${o.userName}</td>
                        <td class="sort-tgkh">${o.addRecommendNum}</td>
                        <td class="sort-khms">${o.addFaceNum}</td>
                        <td class="sort-offer">${o.addOfferNum}</td>
                        <td class="sort-cgrz">${o.addWorkNum}</td>
                        <td class="sort-lrrx">${o.addTalentNum}</td>
                        <td class="sort-qykh">${o.addSignNum}</td>
                        <td class="sort-hkje">${o.addServiceFee}</td>
                        <td class="sort-yjje">${o.addKPIFee}</td>
                        <td class="sort-date">${toStr(o.createTime)}</td>
                      </tr>
                    `
                }
                $('#data').html(str);
                const list = new List('table-default', {
                  sortClass: 'table-sort',
                  listClass: 'table-tbody',
                  valueNames: [ 'sort-tgkh', 'sort-khms', 'sort-offer', 'sort-cgrz',
                    'sort-lrrx','sort-qykh','sort-hkje','sort-yjje','sort-date'
                    
                  ]
                });

           
                var pageCount = obj.data.count

                $('#totalPageNum').html('');
                $('#totalPageNum').html(pageCount);

                var totalPage = obj.data.totalPage;


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


function formCheck(){
    //参数
    var name = $('#name').val();

    var appUserName = $('#appUserName').val();

    var employComId = $('#employComId').val();

    var sourceType = $('#sourceType').val();

    var state=$('#state').val()

    var level = $('#level').val();

    var customerSize = $('#customerSize').val();

    var industryType = $('#industryType').val();



    var certification = $('input[type="checkbox"][name="certification"]:checked').map(function() {
        return this.value;
      }).get();

      
    var vip = $('input[type="checkbox"][name="vip"]:checked').map(function() {
        return this.value;
      }).get();

      
    var belong = $('input[type="checkbox"][name="belong"]:checked').map(function() {
        return this.value;
      }).get();

    let sourceData = {
        'name':name,
        'appUserName':appUserName,
        'employComId':employComId,
        'sourceType':sourceType,
        'state':state,
        'certification':certification[0],
        'vip':vip[0],
        'belong':belong[0],
        'level':level,
        'customerSize':customerSize,
        'industryType':industryType
    }

    let data = cleanseJSON(sourceData);


    // console.log(data)

    return data;

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

function searchList(){
    getPage(1)
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

