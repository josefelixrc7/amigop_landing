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
    
    // Form validation
    $('#registrationForm').submit(function(e) {
        e.preventDefault();
        
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
        
        if (isValid) {
            // Here you would typically send the form data to the server
            // For demo purposes, we'll show a success message
            alert('¡Gracias por registrarte! Nos pondremos en contacto contigo pronto.');
            $(this).trigger('reset');
        } else {
            alert('Por favor complete todos los campos requeridos.');
        }
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
        animateOnScroll();
    });
});