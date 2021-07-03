$(document).ready(function () {

  
   $('#login-button').click(function (e) { 
       e.preventDefault();
       
       let email = $('#email').val(),
       password = $('#password').val();
    
       auth.signInWithEmailAndPassword(email,password).then(cred=>{
        //    $('#myModal').modal('show');
        alert('Login berhasil')
           
       }).then(()=>{
        window.location.assign('../pages/edit.html')
       })
       .catch(e=>{
            alert (e)
       })
   });
});