

$(function () {
    var currentPage = 1
    var pageSize = 5
    var id
    var isDelete
    render()
    function render() {
        $.ajax({
            type: 'get',
            url: '/user/queryUser',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: 'json',
            success: function (res) {
                // console.log(res)
                var htmlStr = template('usersList', res)
                $('.lt-main tbody').html(htmlStr)

                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: res.page,
                    totalPages: Math.ceil(res.total / res.size),
                    onPageClicked: function (a, b, c, page) {
                        currentPage = page,
                            render()
                    }
                })
            }

        })
    }

    $('tbody').on('click', 'button', function () {
        $('#lt-start').modal('show')
        id = $(this).parent().data('id')
        isDelete = $(this).hasClass('btn-danger') ? 0 : 1
        // console.log(id)
    })
    $('.confirm').on('click', function () {
        $.ajax({
            type: 'post',
            url: '/user/updateUser',
            data: {
                id: id,
                isDelete: isDelete
            },
            dataType:'json',
            success: function (res) {
                if (res.success) {                
                    $('#lt-start').modal('hide')
                    render()
                }
            }
        })
    })
})