$(document).ajaxStart(function () {
    NProgress.start();
})

$(document).ajaxComplete(function () {
    setTimeout(function () {
        NProgress.done();
    }, 500)
})


    ; (function () {
        $('.category').on('click', function () {
            $('.secondlist').stop().slideToggle()
        })
    })()


    ; (function () {
        $('.list').on('click', function () {
            $('.lt-aside').toggleClass('hidemenu');
            $('.topbar').toggleClass('hidemenu');
            $('.container-fluid').toggleClass('hidemenu');
        })
    })()