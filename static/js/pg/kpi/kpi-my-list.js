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
                        <td><span style="font-weight: bold;" class="bg-azure-lt">${toStr(child.dataTime)}</span></td>    
                        <td ></td>
                        <td style='color:#49b6ff'>${toStr(child.tgkh)}</td>    
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




