


$(document).ready(function(){

    
    // @formatter:on
   



    // let test1 = document.getElementById("test")


    // test1.addEventListener('mouseenter',function(event){

    //     test()

    // })


    var customerId = getParameterByName('customerId');

    csid = customerId;

    console.log('customerId:'+BigInt(customerId))
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

    // customer/selectCustomerCompany 关联公司




    


// @formatter:off
document.addEventListener("DOMContentLoaded", function () {
    new TomSelect('#select-tags1',{
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
        console.log(json.data.list)
        var item = json.data.list;
        
                    callback(item);
                }).catch((error)=>{
        console.error('Fetch error:', error);
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





})



let csid ;












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













}

function rxxx(){




    
    $('#movediv').hide()
    
    $('#filediv').hide()
    
    $('#jobdjv').hide()


    $('#kzxxdiv').hide()

    $('#rxxxdiv').show()





}

function file(){



    $('#rxxxdiv').hide()
    
    $('#movediv').hide()
    
    
    $('#jobdjv').hide()


    $('#kzxxdiv').hide()
    $('#filediv').show()

}

function job(){


    $('#rxxxdiv').hide()
    
    $('#movediv').hide()
    
    $('#filediv').hide()
    


    $('#kzxxdiv').hide()
    
    $('#jobdjv').show()
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

            
            $('#basecname').html(data.name);
            $('#bmxx').html(data.customerId);
            $('#gsgs').html(data.comName);
            $('#tjr').html(data.recommenderName!=""?data.recommenderName:'无');
            $('#khly').html(data.sourceType);
            $('#fwgw').html(data.userName);
            $('#cjsj').html(data.createTime);

            $('#website').html(data.webSite!=""?data.webSite:'无');
            if(data.vip==1){
                $('#isvip').html('已认证');
                $('#isvip').click(alert('已认证'))
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
            ' <span class="badge bg-green-lt" data-bs-toggle="modal" data-bs-target="#modal-report" onclick="newTeamList()">新增'
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

    alert(1)


}

function test(){
    
    console.log(1)

    $('#modal-danger').modal('show')


}