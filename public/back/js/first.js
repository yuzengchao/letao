$(function () {
    var currentPage = 1
    var pageSize = 5
    render()
    function render() {
        $.ajax({
            type: 'get',
            url: '/category/queryTopCategoryPaging',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: 'json',
            success: function (res) {
                // console.log(res)
                var htmlStr = template('firstTpl', res)
                $('tbody').html(htmlStr)

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

    $('.first-add').on('click', function () {
        $('#firstAdd').modal('show')
    })

    $('#firstForm').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        fields: {
            categoryName: {
                validators: {
                    notEmpty: {
                        message: "请输入一级分类名称"
                    }

                }
            }
        },
    })

    $('#firstForm').on('success.form.bv', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/category/addTopCategory',
            data: $('#firstForm').serialize(),
            dataType: 'json',
            success: function (res) {
                if (res.success) {
                    
                    $('#firstAdd').modal('hide')
                    currentPage = 1
                    render()
                    $("#firstForm").data('bootstrapValidator').resetForm(true)
                }
            }
        })
    })
})