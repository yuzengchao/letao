$(function () {
    var currentPage = 1
    var pageSize = 5
    render()
    function render() {
        $.ajax({
            type: 'get',
            url: '/category/querySecondCategoryPaging',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: 'json',
            success: function (res) {
                // console.log(res)
                var htmlStr = template('secondTpl', res)
                $('tbody').html(htmlStr)

                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: res.page,
                    totalPages: Math.ceil(res.total / res.size),
                    onPageClicked: function (a, b, c, page) {
                        currentPage = page
                        render()
                    }
                })
            }
        })
    }


    $('.second-add').on('click', function () {
        $('#secondAdd').modal('show')

        $.ajax({
            type: 'get',
            url: '/category/queryTopCategoryPaging',
            data: {
                page: 1,
                pageSize: 1000
            },
            dataType: 'json',
            success: function (res) {
                // console.log(res)
                var htmlStr = template('firstTpl', res)
                $('.dropdown-menu').html(htmlStr)
            }
        })
    })

    $('.dropdown-menu').on('click', 'a', function () {

        $('.firstTxt').text($(this).text())
        var id = $(this).data('id')
        $('.categoryId').val(id)
        $('#secondForm').data("bootstrapValidator").updateStatus("categoryId", "VALID");


    })


    $("#fileupload").fileupload({
        dataType: "json",
        done: function (e, data) {
            // console.log(data);
            var picUrl = data.result.picAddr
            // console.log(picUrl)
            $('.uploadImg').attr('src', picUrl)
            $('.brandLogo').val(picUrl)
            $('#secondForm').data("bootstrapValidator").updateStatus("brandLogo", "VALID");

        }
    });

    $('#secondForm').bootstrapValidator({
        excluded: [],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        fields: {
            brandName: {
                validators: {
                    notEmpty: {
                        message: "请输入级二分类名称"
                    }

                }
            },
            brandLogo: {
                validators: {
                    notEmpty: {
                        message: "请上传图片"
                    }

                }
            },
            categoryId: {
                validators: {
                    notEmpty: {
                        message: "请选择一级分类"
                    }

                }
            },
        },
    })

    $('#secondForm').on('success.form.bv', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: '/category/addSecondCategory',
            data: $('#secondForm').serialize(),
            dataType: 'json',
            success: function (res) {
                if (res.success) {
                    $('#secondAdd').modal('hide')
                    render()
                    $("#secondForm").data('bootstrapValidator').resetForm(true)
                    $('.firstTxt').text('请选择一级分类')
                    $('.uploadImg').attr('src','./images/none.png')
                }
            }
        })
    })
})