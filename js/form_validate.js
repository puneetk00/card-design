$(function(){
 var user_err = false;
    $(".formcheckID").on('click',function () {
        console.log('called22')
 
        if ($(this).is(':checked')) {
            // alert("checked");
            console.log('called2')
            
            user_err = true;
            _frmValidate();
            $('.required_error').show();
        } else{
            console.log('called1')
            user_err = true;
            $('.required_error').hide();
        }
    });
    $('.required_error').hide();


    $('#require_field_back').keyup(function () {
        alert( $('#require_field_back').val());
        // $('#require_field_back').each(function() {
        //     var grade =  $(this).val();
        //     alert(grade);
        //   });
        $.each($('require_field_back'), function() {
            var txtVal =  $(this).val();
            alert(txtVal);
        });
 
        _frmValidate();
    })

    function _frmValidate() {
   
        var requiredField = $('#require_field').val();
        var fname_id = $('#require_field_back').val();
        console.log(user_err, 'user_err')

         if (requiredField.length == '') {
            $(".required_error").show();
            $(".required_error").html("**please fill the required field");
            $(".required_error").focus();
            $(".required_error").css({
                color: '#FF0000',
                marginBottom: '10px',
                marginTop: '-10px',
                padding: '0px 0px 5px'
            })
            user_err = false;
            console.log(user_err, 'user_err')
            return false;
        } else if(fname_id.length == ''){
            $(".required_error").show();
            $(".required_error").html("**please fill the required field");
            $(".required_error").focus();
            $(".required_error").css({
                color: '#FF0000',
                marginBottom: '10px',
                marginTop: '-10px',
                padding: '0px 0px 5px'
            })
            console.log(user_err, 'user_err')

            user_err = false;
            return false;
        } else if(fname_id.length > 0 || requiredField.length > 0){
            $(".required_error").hide();
            $(".required_error").html("");
            $("#require_field_back").focus();
            $("#require_field").focus();
            console.log(user_err, 'user_err')

            user_err = false;
            return false;
        } else {
            console.log(user_err, 'user_err')
            
            $('.required_error').hide();
        }


    }

})
