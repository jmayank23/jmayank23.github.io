
!(function($) {
  "use strict";

  // Hero typed
  if ($('.typed').length) {
    var typed_strings = $(".typed").data('typed-items');
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 1300
    });
  }

  // Smooth scroll for the navigation menu and links with .scrollto classes
  $(document).on('click', '.nav-menu a, .scrollto', function(e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      e.preventDefault();
      var target = $(this.hash);
      if (target.length) {

        var scrollto = target.offset().top;

        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
        }
        return false;
      }
    }
  });

  // Activate smooth scroll on page load with hash links in the url
  $(document).ready(function() {
    if (window.location.hash) {
      var initial_nav = window.location.hash;
      if ($(initial_nav).length) {
        var scrollto = $(initial_nav).offset().top;
        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');
      }
    }
  });

  $(document).on('click', '.mobile-nav-toggle', function(e) {
    $('body').toggleClass('mobile-nav-active');
    $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
  });

  $(document).click(function(e) {
    var container = $(".mobile-nav-toggle");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      if ($('body').hasClass('mobile-nav-active')) {
        $('body').removeClass('mobile-nav-active');
        $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
      }
    }
  });

  // Navigation active state on scroll
  var nav_sections = $('section');
  var main_nav = $('.nav-menu, .mobile-nav');

  $(window).on('scroll', function() {
    var cur_pos = $(this).scrollTop() + 200;

    nav_sections.each(function() {
      var top = $(this).offset().top,
        bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        if (cur_pos <= bottom) {
          main_nav.find('li').removeClass('active');
        }
        main_nav.find('a[href="#' + $(this).attr('id') + '"]').parent('li').addClass('active');
      }
      if (cur_pos < 300) {
        $(".nav-menu ul:first li:first").addClass('active');
      }
    });
  });

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });

  $('.back-to-top').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

  // jQuery counterUp
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000
  });

  // Skills section
  $('.skills-content').waypoint(function() {
    $('.progress .progress-bar').each(function() {
      $(this).css("width", $(this).attr("aria-valuenow") + '%');
    });
  }, {
    offset: '80%'
  });

  // Porfolio isotope and filter
  $(window).on('load', function() {
    var portfolioIsotope = $('.portfolio-container').isotope({
      itemSelector: '.portfolio-item',
      layoutMode: 'fitRows'
    });

    $('#portfolio-flters li').on('click', function() {
      $("#portfolio-flters li").removeClass('filter-active');
      $(this).addClass('filter-active');

      portfolioIsotope.isotope({
        filter: $(this).data('filter')
      });
      aos_init();
    });

    // Initiate venobox (lightbox feature used in portofilo)
    $(document).ready(function() {
      $('.venobox').venobox();
    });
  });

  // experiences carousel (uses the Owl Carousel library)
  $(".experiences-carousel").owlCarousel({
    autoplay: false,
    dots: false,
    loop: false,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 2
      },
      900: {
        items: 3
      }
    }
  });

  // Portfolio details carousel
  $(".portfolio-details-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1
  });

  // Init AOS
  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out-back",
      once: true
    });
  }
  $(window).on('load', function() {
    aos_init();
  });

})(jQuery);

function revealPhone(i) {
  document.getElementById("phonespan-" + i).innerHTML = "<a href=\"tel:+989212085677\">+98 921 208 5677</a>";
}

function revealEmail(i) {
  document.getElementById("emailspan-" + i).innerHTML = "<a href=\"mailto:Nirex.0@Gmail.com\">Nirex.0@Gmail.com";
}

function loadPipeline() {
  getVisitorCountry();
  calculateBirthday();
  loadSkills();
}

function getVisitorCountry() {
  $.get("https://ipinfo.io/json?token=acd835cff578a5", function(response) {
    if(response.country.toString() !== "IR")
    {
      document.getElementById("cityid").innerHTML = "Krasnoyarsk, Russian Federation";
    }
  }, "jsonp");
}

function calculateBirthday() {
  var day = new Date().getDate() - 17;
  var month = new Date().getMonth() - 10;
  var year = new Date().getFullYear() - 1998;

  if(month === 0 && day === 0) {
    year++;
    document.getElementById("agestrong").innerHTML = year.toString() + " 🥳🎂";
    // Birthday
  }
  if(month === 0 && day > 0) {
    year++;
  }
  else if (month > 0) {
    year++;
  }

  document.getElementById("agestrong").innerHTML = year.toString();
}

// function to list all skills
function loadSkills() {
  

  // return the list
  return skills;
}

function loadSkills() {
  var skills = [
    {
      "name": "Git / GitHub",
      "percentage": "99"
    },
    {
      "name": "C#",
      "percentage": "95"
    },
    {
      "name": "C/C++",
      "percentage": "95"
    },
    {
      "name": "Front-End: (HTML / CSS / JS)",
      "percentage": "90"
    },
    {
      "name": "Windows & Linux Administration",
      "percentage": "90"
    },
    {
      "name": "Python (And its many libraries)",
      "percentage": "85"
    },
    {
      "name": "Unity & Unreal Game Engines",
      "percentage": "85"
    },
    {
      "name": "Machine Learning / Deep Learning",
      "percentage": "75"
    },
    {
      "name": "Database Management",
      "percentage": "60"
    },
    {
      "name": "Data Science & Analytics",
      "percentage": "60"
    },
    {
      "name": "Design Software (Adobe: AI, PS, AE, Premiere)",
      "percentage": "50"
    },
    {
      "name": " Backend (C#, Python)",
      "percentage": "30"
    },
  ];
  
  // for each skill
  for (var j = 0; j < 12; j++) {
    
    if ((j + 1) < 10) {
      document.getElementById("skill_0" + (j + 1).toString()).innerHTML = skills[j].name + "<i class=\"val\">" + skills[j].percentage + "%</i>";
      // DOM set element with id = "skill_01_percentage"'s aria-valuenow attribute to the first skill's percentage
      document.getElementById("skill_0" + (j + 1).toString() + "_percentage").setAttribute("aria-valuenow", skills[j].percentage);
    }
    else if ((j + 1) >= 10)
    {
      document.getElementById("skill_" + (j + 1).toString()).innerHTML = skills[j].name + "<i class=\"val\">" + skills[j].percentage + "%</i>";
      // DOM set element with id = "skill_01_percentage"'s aria-valuenow attribute to the first skill's percentage
      document.getElementById("skill_" + (j + 1).toString() + "_percentage").setAttribute("aria-valuenow", skills[j].percentage);
    }
  }
}


window.onload = loadPipeline;