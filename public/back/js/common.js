// 进度条
$(document).ajaxStart(function () {
    NProgress.start();
})

$(document).ajaxComplete(function () {
    setTimeout(function () {
        NProgress.done();
    }, 500)
})

// 二级菜单
$(function () {
        $('.category').on('click', function () {
            $('.secondlist').stop().slideToggle()
        })
})

// 侧边栏隐藏
$(function () {
        $('.topbar .list').on('click', function () {
            $('.lt-aside').toggleClass('hidemenu');
            $('.topbar').toggleClass('hidemenu');
            $('.lt-main').toggleClass('hidemenu');
        })
})

// 登录退出
$(function () {
    $('.logout').on('click', function () {
        $.ajax({
            type: 'get',
            url: '/employee/employeeLogout',
            dataType: 'json',
            success: function (res) {
                if (res.success) {
                    location.href = 'login.html'
                }
            }
        })
    })
})