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
        $('.topbar .list').on('click', function () {
            $('.lt-aside').toggleClass('hidemenu');
            $('.topbar').toggleClass('hidemenu');
            $('.lt-main').toggleClass('hidemenu');
        })
    })()