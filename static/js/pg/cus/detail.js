


$(document).ready(function(){

    var customerId = getParameterByName('customerId');

    console.log('customerId:'+customerId)
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




})
















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