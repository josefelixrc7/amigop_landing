$(document).ready(function() {
    // Smooth scrolling for anchor links
    $('a[href*="#"]').on('click', function(e) {
        e.preventDefault();
        
        $('html, body').animate(
            {
                scrollTop: $($(this).attr('href')).offset().top - 70,
            },
            500,
            'linear'
        );
    });
    
    // Navbar background change on scroll
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('.navbar').addClass('navbar-scrolled');
        } else {
            $('.navbar').removeClass('navbar-scrolled');
        }
    });
    
    // Plan selection
    $('.plan-card .btn').click(function(e) {
        e.preventDefault();
        $('.plan-card').removeClass('selected');
        $(this).closest('.plan-card').addClass('selected');
        
        // Scroll to form
        $('html, body').animate({
            scrollTop: $('#form').offset().top - 70
        }, 500);
    });
    // Remove invalid class when user starts typing
    $('input, select, textarea').on('input change', function() {
        if ($(this).val()) {
            $(this).removeClass('is-invalid');
        }
    });
    
    // Animation on scroll
    function animateOnScroll() {
        $('.service-card, .plan-card, .testimonial-card').each(function() {
            const cardPosition = $(this).offset().top;
            const scrollPosition = $(window).scrollTop() + $(window).height();
            
            if (scrollPosition > cardPosition + 100) {
                $(this).addClass('animate__animated animate__fadeInUp');
            }
        });
    }
    
    // Initial check
    animateOnScroll();
    
    // Check on scroll
    $(window).scroll(function() {
        //animateOnScroll();
    });

    // Form validation and submission
    $('#registrationForm').submit(async function(e)
    {
        e.preventDefault();
        
        // Clear previous notifications
        $('#notifications').html('');
        
        // Basic validation
        let isValid = true;
        $(this).find('[required]').each(function() {
            if (!$(this).val()) {
                $(this).addClass('is-invalid');
                isValid = false;
            } else {
                $(this).removeClass('is-invalid');
            }
        });

        // Telephone validation
        const regexNumeros = /^\d{10}$/;
        if (regexNumeros.test($('#cliente_telefono').val()) === false)
        {
            $('#cliente_telefono').addClass('is-invalid');
            isValid = false;
        }
        if (regexNumeros.test($('#usuario_telefono').val()) === false)
        {
            $('#usuario_telefono').addClass('is-invalid');
            isValid = false;
        }
        
        if (!isValid)
        {
            showNotification('Por favor complete todos los campos requeridos de manera correcta.', 'warning');
            return;
        }
        
        // Prepare form data
        const formData =
        {
            cliente_nombres: $('#cliente_nombres').val(),
            cliente_apellidos: $('#cliente_apellidos').val(),
            cliente_email: $('#cliente_email').val(),
            cliente_codigo_pais: $('#cliente_codigo_pais').val(),
            cliente_telefono: $('#cliente_telefono').val(),
            cliente_relacion_con_usuario: $('#cliente_relacion_con_usuario').val(),
            cliente_direccion: $('#cliente_direccion').val(),
            cliente_metodo_pago: $('input[name="cliente_metodo_pago"]:checked').val(),
            cliente_plan: $('#cliente_plan').val(),
            
            usuario_nombres: $('#usuario_nombres').val(),
            usuario_apellidos: $('#usuario_apellidos').val(),
            usuario_fecha_nacimiento: $('#usuario_fecha_nacimiento').val(),
            usuario_genero: $('#usuario_genero').val(),
            usuario_idioma: $('#usuario_idioma').val(),
            usuario_codigo_pais: $('#usuario_codigo_pais').val(),
            usuario_telefono: $('#usuario_telefono').val(),
            usuario_horario_llamadas: $('#usuario_horario_llamadas').val(),
            usuario_intereses: $('#usuario_intereses').val(),
            usuario_necesidades: $('#usuario_necesidades').val(),
            usuario_nivel_independencia: $('input[name="usuario_nivel_independencia"]:checked').val(),
            usuario_contacto_emergencia: $('#usuario_contacto_emergencia').val(),
            usuario_suscriptor_es_contacto_emergencia: $('#usuario_suscriptor_es_contacto_emergencia').val()
        };
        
        const submitBtn = $(this).find('button[type="submit"]');

        try
        {
            // Show loading state
            submitBtn.prop('disabled', true).html('<i class="fas fa-spinner fa-spin"></i> Enviando...');
            
            // Send data to server
            const response = await fetch('https://hook.eu2.make.com/ewgl9d9jydiximfsef41souha4vhdhm1',
            {
                method: 'POST',
                headers:
                {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            
            if (!response.ok)
            {
                showNotification('Error al enviar el formulario', 'warning');
                submitBtn.prop('disabled', false).html('Enviar Registro');
                location.href="#notifications";
                return;
            }
            
            // Success case
            showNotification('¡Registro exitoso! Nos pondremos en contacto contigo pronto.', 'success');
            location.href="#notifications";
            $('#registrationForm').hide();
            location.href="#notifications";
            //$(this).trigger('reset');
            
        }
        catch (error)
        {
            //console.error('Error:', error);
            showNotification('Error de conexión. Por favor intente nuevamente más tarde.', 'warning');
            location.href="#notifications";
        }
        finally
        {
            submitBtn.prop('disabled', false).html('Enviar Registro');
        }
    });
    
    // Function to show notifications
    function showNotification(message, type = 'warning')
    {
        const notificationDiv = $('#notifications');
        notificationDiv.append($(`<div class="alert alert-${type}">${message}</div>`));
        location.href="#notifications";
    }
    
});