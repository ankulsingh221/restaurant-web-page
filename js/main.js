(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.navbar').addClass('sticky-top shadow-sm');
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm');
        }
    });
       
    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    
    $(window).on("load resize", function() {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
            function() {
                const $this = $(this);
                $this.addClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "true");
                $this.find($dropdownMenu).addClass(showClass);
            },
            function() {
                const $this = $(this);
                $this.removeClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "false");
                $this.find($dropdownMenu).removeClass(showClass);
            }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        margin: 24,
        dots: true,
        loop: true,
        nav : false,
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });
    
})(jQuery);


                /*** Booking Tbale Form Submit ***/ 

document.addEventListener("DOMContentLoaded", () => {
    // Select the form and button
    const reservationForm = document.querySelector("form");
    const submitButton = reservationForm.querySelector("button[type='submit']");

    reservationForm.addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent form default submission
        
        // Collect form data
        const formData = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            datetime: document.getElementById("datetime").value,
            people: document.getElementById("select1").value,
            message: document.getElementById("message").value,
        };

        try {
            // Disable button to prevent multiple submissions
            submitButton.disabled = true;
            submitButton.textContent = "Submitting...";

            // Make API call
            const response = await fetch("https://api.example.com/reservations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Failed to submit reservation. Please try again.");
            }

            const result = await response.json();
            alert("Reservation submitted successfully!");
            reservationForm.reset(); // Reset the form after success
        } catch (error) {
            console.error("Error submitting reservation:", error);
            alert("An error occurred while submitting your reservation. Please try again later.");
        } finally {
            // Re-enable the button
            submitButton.disabled = false;
            submitButton.textContent = "Book Now";
        }
    });
});

                    /*** Contact Form Submit ***/

                    document.addEventListener("DOMContentLoaded", () => {
                        // Select the form and button
                        const contactForm = document.querySelector("form");
                        const submitButton = contactForm.querySelector("button[type='submit']");
                    
                        contactForm.addEventListener("submit", async (event) => {
                            event.preventDefault(); // Prevent form default submission
                            
                            // Collect form data
                            const formData = {
                                name: document.getElementById("name").value,
                                email: document.getElementById("email").value,
                                subject: document.getElementById("subject").value,
                                message: document.getElementById("message").value,
                            };
                    
                            try {
                                // Disable button to prevent multiple submissions
                                submitButton.disabled = true;
                                submitButton.textContent = "Sending...";
                    
                                // Make API call
                                const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify(formData),
                                });
                    
                                if (!response.ok) {
                                    throw new Error("Failed to send message. Please try again.");
                                }
                    
                                const result = await response.json();
                                alert("Message sent successfully!");
                                console.log("Response from server:", result);
                    
                                // Reset the form
                                contactForm.reset();
                            } 
                            catch (error) {
                                console.error("Error sending message:", error);
                                alert("An error occurred. Please try again later.");
                            } 
                            finally {
                                // Re-enable the button
                                submitButton.disabled = false;
                                submitButton.textContent = "Send Message";
                            }
                        });
                    });