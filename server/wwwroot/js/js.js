// Dropdown navbar
// Prevent closing from click inside dropdown
$(document).on('click', '.dropdown-menu', function (e) {
    e.stopPropagation();
  });

// clickable on mobile view
  if ($(window).width() < 992) {
      $('.has-submenu a').click(function(e){
        e.preventDefault();
          $(this).next('.megasubmenu').toggle();

          $('.dropdown').on('hide.bs.dropdown', function () {
             $(this).find('.megasubmenu').hide();
          })
      });
  }