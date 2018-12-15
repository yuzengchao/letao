

$(function () {
    var currentPage = 1
    var pageSize = 5
    $.ajax({
        type: 'get',
        url: '/user/queryUser',
        data: {
            page: currentPage,
            pageSize: pageSize
        },
        dataType: 'json',
        success: function (res) {
            console.log(res)
            var htmlStr = template('usersList', res)
            $('.lt-main tbody').html(htmlStr);

        }

    })
})