$(document).ready(function(){





    var checkbox1 = document.querySelectorAll('input[name="type"][type="checkbox"]');

// 为每个 checkbox 添加点击事件监听器
    checkbox1.forEach(function(checkbox) {
        checkbox.addEventListener('click', function() {
            // 如果当前 checkbox 被选中，则取消选中其他所有 checkbox
            if (this.checked) {
                checkbox1.forEach(function(otherCheckbox) {
                    if (otherCheckbox !== checkbox) {
                        otherCheckbox.checked = false;
                    }
                });
                
                teamCheckData()
            }
        });
    });


    var checkbox2 = document.querySelectorAll('input[name="time"][type="checkbox"]');

// 为每个 checkbox 添加点击事件监听器
    checkbox2.forEach(function(checkbox) {
        checkbox.addEventListener('click', function() {
            // 如果当前 checkbox 被选中，则取消选中其他所有 checkbox
            if (this.checked) {
                checkbox2.forEach(function(otherCheckbox) {
                    if (otherCheckbox !== checkbox) {
                        otherCheckbox.checked = false;
                    }
                    
                });
                teamCheckData()
            }
        });
    });

    // $('#teamCheck').on('click','input[type="checkbox"]',function(event){
    //     alert(1)
    //     teamCheckData()
    // })


    teamCheckData();
    hkdata(); 
    sshk();
    sstj();
    yjph();

    $('#yjph').click(function() {
        yjph();
    });

    $('#hkph').click(function() {
        hkph();
    });

    $('#qyph').click(function() {
        qyph();
    });




})


function teamCheckData(){

    
    
    var types = $('input[type="checkbox"][name="type"]:checked').map(function() {
        return this.value;
      }).get();

      
    var times = $('input[type="checkbox"][name="time"]:checked').map(function() {
        return this.value;
      }).get();


    let data = {};
    data.time =times[0]
    data.type =types[0]


    getData(data,'/home/indexData').then(data => {
        // 这里处理从getData返回的数据

    if(data!=null){


        $('#hkje').html(data.addServiceFee);
        $('#kpi-money').html(data.addKPIFee);
        $('#tgkh').html(data.addRecommendNum);
        $('#khms').html(data.addFaceNum);
        $('#offer').html(data.addOfferNum);
        $('#work').html(data.addWorkNum);
        $('#lrrx').html(data.addTalentNum);
        $('#sign').html(data.addSignNum);
        $('#job').html(data.addJobNum);
    }
    }).catch(error => {
        // 处理错误
        console.error('获取数据失败:', error);
    });

    



}



async function getData123(){

    
    var types = $('input[type="checkbox"][name="type"]:checked').map(function() {
        return this.value;
      }).get();

      
    var times = $('input[type="checkbox"][name="time"]:checked').map(function() {
        return this.value;
      }).get();


    let data = {};
    data.time =times[0]
    data.type =types[0]






    // baseAjax(data,'/home/indexData');



    const obj = await baseAjax(data,'/home/indexData');

    return obj;


}

async function getData(data,uri) {
    try {




        // 调用fetchData函数并等待结果
        const obj = await baseAjax(data,uri);
        
        // 在这里处理数据
        // console.log(obj);
        return obj; // 这里返回数据并不实际返回给调用者，因为这是一个异步函数
    } catch (error) {
        // 处理错误
        console.error('获取数据失败:', error);
    }
}


//回款排行
function hkdata(){


    getData({},'/home/hkRank').then(data => {
        // 这里处理从getData返回的数据
    }).catch(error => {
        // 处理错误
        console.error('获取数据失败:', error);
    });




}


// let str = "<tr><td class='w-1' style='color: red;'>"
// + o.fee + "</td><td class='td-truncate'>"
// + o.comName +"</td><td class='td-truncate'>"
// + o.+"</td><td class='td-truncate'>"  


// "</tr>"

//实时回款榜
function sshk(){


    getData({},'/home/feeRank').then(data => {
        // 这里处理从getData返回的数据

        try {

            let str ='';
            
            $('#sshk').html('')
            
            data.list.forEach(o=>{
               

                str += "<tr><td class='text-secondary' >"
                + o.comName + "</td><td class='text-secondary'>"
                + o.userName +"</td><td class='text-secondary'>"
                + o.customerName+"</td><td class='w-1' style='color: red;'>"
                + o.fee+"</td><td class='text-nowrap text-secondary'>"
                + o.time+"</td>>"
                
                
                "</tr>"



            });

            $('#sshk').html(str)            
        } catch (error) {
            
        }

    }).catch(error => {
        // 处理错误
        console.error('获取数据失败:', error);
    });




}



function sstj(){


    getData({},'/home/recommendRank').then(data => {
        // 这里处理从getData返回的数据

        try {

            let str ='';
            
            $('#sstj').html('')
            
            data.list.forEach(o=>{
               

                str += "<tr><td class='w-1'  style='color: red;'>"
                + o.stateName + "</td><td class='text-nowrap text-secondary'>"
                + o.comName +"</td><td class='text-secondary text-nowrap'>"
                + o.userName+"</td><td class='text-secondary text-nowrap' >"
                + o.talentName+"</td><td class='text-nowrap' style='color: red;'>"  
                + o.salary+"万</td><td class='text-secondary text-nowrap'>"
                +o.job +"</td>"
                
            
                "</tr>"



            });

            $('#sstj').html(str)            
        } catch (error) {
            
        }

    }).catch(error => {
        // 处理错误
        console.error('获取数据失败:', error);
    });




}




function yjph(){


    $('#rankHead').html("")

    $('#rankHead').html("<tr><th>归属公司</th><th>顾问名称</th><th>职级</th><th>业绩</th></tr>")








    getData({},'/home/kpiRank').then(data => {
        // 这里处理从getData返回的数据

        try {

            let str ='';
            
            $('#rankBody').html('')
            
            data.list.forEach(o=>{
               

                str += "<tr><td class='text-nowrap text-secondary' >"
                + o.comName + "</td><td class='text-nowrap text-secondary'>"
                + o.userName +"</td><td class='text-secondary text-nowrap'>"
                + o.role+"</td><td class='text-secondary text-nowrap' >"
                + o.kpiFee+"</td>"
                +"</tr>"



            });

            $('#rankBody').html(str)            
        } catch (error) {
            
        }

    }).catch(error => {
        // 处理错误
        console.error('获取数据失败:', error);
    });




}



function hkph(){

    $('#rankHead').html("")


    $('#rankHead').html("<tr><th>归属公司</th><th>顾问名称</th><th>职级</th><th>金额</th></tr>")








    getData({},'/home/hkRank').then(data => {
        // 这里处理从getData返回的数据

        try {

            let str ='';
            
            $('#rankBody').html('')
            
            data.list.forEach(o=>{
               

                str += "<tr><td class='text-nowrap text-secondary' >"
                + o.comName + "</td><td class='text-nowrap text-secondary'>"
                + o.name +"</td><td class='text-secondary text-nowrap'>"
                + o.roleName+"</td><td class='text-secondary text-nowrap' >"
                + o.fee+"</td>"
                +"</tr>"



            });

            $('#rankBody').html(str)            
        } catch (error) {
            
        }

    }).catch(error => {
        // 处理错误
        console.error('获取数据失败:', error);
    });




}


function qyph(){


    
    $('#rankHead').html("")

    $('#rankHead').html("<tr><th>归属公司</th><th>顾问名称</th><th>职级</th><th>签约数</th></tr>")








    getData({},'/home/signRank').then(data => {
        // 这里处理从getData返回的数据

        try {

            let str ='';
            
            $('#rankBody').html('')
            
            data.list.forEach(o=>{
               

                str += "<tr><td class='text-nowrap text-secondary' >"
                + o.comName + "</td><td class='text-nowrap text-secondary'>"
                + o.name +"</td><td class='text-secondary text-nowrap'>"
                + o.roleName+"</td><td class='text-secondary text-nowrap' >"
                + o.signNum+"</td>"
                +"</tr>"



            });

            $('#rankBody').html(str)            
        } catch (error) {
            
        }

    }).catch(error => {
        // 处理错误
        console.error('获取数据失败:', error);
    });




}




function qyph(){


    
    $('#rankHead').html("")

    $('#rankHead').html("<tr><th>归属公司</th><th>顾问名称</th><th>职级</th><th>签约数</th></tr>")


    getData({},'/home/signRank').then(data => {
        // 这里处理从getData返回的数据

        try {

            let str ='';
            
            $('#rankBody').html('')
            
            data.list.forEach(o=>{
               

                str += "<tr><td class='text-nowrap text-secondary' >"
                + o.comName + "</td><td class='text-nowrap text-secondary'>"
                + o.name +"</td><td class='text-secondary text-nowrap'>"
                + o.roleName+"</td><td class='text-secondary text-nowrap' >"
                + o.signNum+"</td>"
                +"</tr>"



            });

            $('#rankBody').html(str)            
        } catch (error) {
        }
    }).catch(error => {
        // 处理错误
        console.error('获取数据失败:', error);
    });
}


function test1(){
    alert(1)
    $('#sidebar-menu').hide()
}

function newspaper(obj){
    $('#modalbody').html(1)

    

    


}


function abc(){
    // $('#modal-large').attr('aria-hidden','false')
    $('#modalbody').trigger('click')

}
