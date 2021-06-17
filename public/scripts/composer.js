$(document).scroll(function () {
  const fromTop = $(document).scrollTop();
  fromTop > 50 ? $ ('nav').removeClass('nav-background') : $('nav').addClass('nav-background');
})
