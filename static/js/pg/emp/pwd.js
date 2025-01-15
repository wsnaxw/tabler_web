$(function(){
    // var customerId = getParameterByName('customerId');

})







function togglePasswordVisibility(id, element) {
  const input = document.getElementById(id);
  const icon = element.querySelector('svg');
  if (input.type === 'password') {
    input.type = 'text';
    icon.outerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-eye">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"/>
        <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6"/>
      </svg>
    `;
  } else {
    input.type = 'password';
    icon.outerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-eye-off">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M10.585 10.587a2 2 0 0 0 2.829 2.828"/>
        <path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87"/>
        <path d="M3 3l18 18"/>
      </svg>
    `;
  }
}





















function searchList(){
  updatePWD()
}


function validatePasswords() {
  const newPwd1 = document.getElementById('newPwd1').value;
  const newPwd2 = document.getElementById('newPwd2').value;
  if (newPwd1 !== newPwd2) {
    showMessage(1,'两次密码不匹配');
    return false;
  }else{
    return true;
  }
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


function updatePWD(){

  if(validatePasswords()){


    let oldPwd = document.getElementById('oldPwd').value;
    let newPwd1 = document.getElementById('newPwd1').value;
    let newPwd2 = document.getElementById('newPwd2').value;

    let url = '/employ/updatePwd';

    const options = {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      'token':localStorage.getItem('token')
      },
      body: JSON.stringify({oldPwd:CryptoJS.MD5(oldPwd).toString(),newPwd1:CryptoJS.MD5(newPwd1).toString(),newPwd2:CryptoJS.MD5(newPwd2).toString()}),
    };
    fetch(baseUri+url, options)
      .then(response => response.json())
      .then(json => {
        if (json.code === 0) {
          showMessage(0,'修改成功！')
        } else {
          showMessage(1,json.message)
        }
      })
      .catch(error => {
        console.error('Error:', error);
        showMessage(2,'异常！')
      });
  







  }else{
    return;
  }


}