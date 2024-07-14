(function($) {
    "use strict";


    /*==================================================================
    [ Focus Contact2 ]*/
    $('.input100').each(function() {
        $(this).on('blur', function() {
            if ($(this).val().trim() != "") {
                $(this).addClass('has-val');
            } else {
                $(this).removeClass('has-val');
            }
        })
    })


    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit', async function(e) {
        e.preventDefault();
        var check = true;
        for (var i = 0; i < input.length; i++) {
            if (validate(input[i]) == false) {
                showValidate(input[i]);
                check = false;
            }
        }
        if (check) {
            // If client-side validation passes, proceed with server validation
            var username = $(input[0]).val();
            var password = $(input[1]).val();
            var params = {
                username,
                password
            };
            var headers = {
                'Access-Control-Allow-Origin': 'http://localhost', // Replace with your actual frontend domain
                'Access-Control-Allow-Methods': 'POST', // Specify the allowed methods (you can add more if needed)
                'Access-Control-Allow-Headers': 'Content-Type', // Specify the allowed headers
            }
            try {
                // Call backend POST endpoint
                // console.log(params);
                const response = await axios.post('http://localhost:3000/login', params, headers);
                console.log(response); // Handle successful login response
                if (response.status == 200) {
                    location.href = 'http://localhost:3000/contact'
                }
            } catch (error) {
                console.error('Error:', error.response.data); // Handle error response
            }
        }
        return false; // Prevent form submission

    });


    $('.validate-form .input100').each(function() {
        $(this).focus(function() {
            hideValidate(this);
        });
    });

    function validate(input) {
        if ($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if ($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        } else {
            if ($(input).val().trim() == '') {
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }

    $(".input100[name='email']").val("yasar.mohideen@newgen.co");
    $(".input100[name='pass']").val("test123");

})(jQuery);