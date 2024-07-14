(function($) {
    "use strict";

    $(document).ready(function() {
        // Check if the referrer (previous page) is empty or the same as the current page

        if (document.referrer == "" || document.referrer == window.location.href) {
            window.location.href = "/";
        }

        /* ======================================
            Update User name alert display
         ====================================== */
        $('#fullname')
            .on('keydown', function(e) {
                console.log(this.value);
                $('#user-name-alert').text(this.value);
            })
            .on('paste', function(e) {
                console.log(this.value);
                $('#user-name-alert').text(this.value);
            })
            .on('change', function(e) {
                console.log(this.value);
                $('#user-name-alert').text(this.value);
            });

        $('.contact-form').on('submit', async function(e) {
            e.preventDefault();
            // If client-side validation passes, proceed with server validation
            var subject = $('#fullname').val() + " Query Mail";
            var text = $('#fullname').val() + "\n" + $('#email').val() + "\n" + $('#phone').val() + "\n" + $('#message').val();
            var params = {
                subject,
                text,
                "html": "<h2>Thanks you</h2>"
            };
            var headers = {
                'Access-Control-Allow-Origin': 'http://localhost', // Replace with your actual frontend domain
                'Access-Control-Allow-Methods': 'POST', // Specify the allowed methods (you can add more if needed)
                'Access-Control-Allow-Headers': 'Content-Type', // Specify the allowed headers
            }
            try {
                // Call backend POST endpoint
                // console.log(params);
                const response = await axios.post('http://localhost:3000/send-email', params, headers);
                console.log(response); // Handle successful login response
                if (response.status == 200) {
                    $('.contact-form').addClass("d-none");
                    $('.alert').removeClass("d-none");
                    setTimeout(() => {
                        location.href = 'http://localhost:3000/home'
                    }, 1500);
                }
            } catch (error) {
                console.error('Error:', error.response.data); // Handle error response
            }
        });
    });

})(jQuery);