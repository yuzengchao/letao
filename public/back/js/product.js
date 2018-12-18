$(function () {
    var currentPage = 1
    var pageSize = 3
    var picArr = []

    render()
    function render() {
        $.ajax({
            type: 'get',
            url: '/product/queryProductDetailList',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: 'json',
            success: function (res) {
                console.log(res)
                var htmlStr = template('productTpl', res)
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

    $('.product-add').click(function () {
        $('#productAdd').modal('show')

        $.ajax({
            type: 'get',
            url: '/category/querySecondCategoryPaging',
            data: {
                page: 1,
                pageSize: 100
            },
            dataType: 'json',
            success: function (res) {
                var htmlStr = template('secondList', res)
                $('.dropdown-menu').html(htmlStr)
            }
        })
    })

    $('.dropdown-menu').on('click', 'a', function () {
        $('.productTxt').text($(this).text())
        $('.brandId').val($(this).data('id'))

        $('#productForm').data('bootstrapValidator').updateStatus('brandId', 'VALID')
    })

    $("#fileupload").fileupload({
        dataType: "json",

        done: function (e, data) {
            var picObj = data.result
            // console.log(picObj);

            var picUrl = picObj.picAddr
            picArr.unshift(picObj)
            $('#imgBox').prepend('<img src="' + picUrl + '"width = "100">')

            if (picArr.length > 3) {
                picArr.pop()
                $('#imgBox img:last-of-type').remove()
            }
            if (picArr.length === 3) {
                $('#productForm').data('bootstrapValidator').updateStatus('picStatus', 'VALID')
            }
        }
    })

    $('#productForm').bootstrapValidator({
        excluded: [],

        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        fields: {
            //校验用户名，对应name表单的name属性
            brandId: {
                validators: {
                    notEmpty: {
                        message: '请选择二级分类'
                    }
                }
            },
            proName: {
                validators: {
                    notEmpty: {
                        message: '请输入商品名称'
                    }
                }
            },
            proDesc: {
                validators: {
                    notEmpty: {
                        message: '请输入商品描述'
                    }
                }
            },
            num: {
                validators: {
                    notEmpty: {
                        message: '请输入商品库存'
                    },
                    regexp: {
                        regexp: /^[1-9]\d*$/,
                        message: '库存数量为数字'
                    }
                }
            },
            size: {
                validators: {
                    notEmpty: {
                        message: '请输入商品尺码'
                    },
                    regexp: {
                        regexp: /^\d{2}-\d{2}$/,
                        message: '尺码以XX-XX的形式，XX为数字'
                    }
                }
            },
            oldPrice: {
                validators: {
                    notEmpty: {
                        message: '请输入商品原价'
                    }
                }
            },
            price: {
                validators: {
                    notEmpty: {
                        message: '请输入商品价格'
                    }
                }
            },
            picStatus: {
                validators: {
                    notEmpty: {
                        message: '请上传3张图片'
                    }
                }
            }
        }
    })

    $('#productForm').on('success.form.bv', function (e) {
        e.preventDefault()
        var upload = $('#productForm').serialize()
        upload += "&picArr=" + JSON.stringify(picArr)

        $.ajax({
            type: 'post',
            url: '/product/addProduct',
            data: upload,
            dataType: 'json',
            success: function (res) {
                console.log(res)
                if (res.success) {
                    $('#productAdd').modal('hide')
                    render()
                    $('#productForm').data('bootstrapValidator').resetForm(true)
                    $('.productTxt').text('请选择二级分类')
                    $('#imgBox img').remove()
                    picArr = []
                }

            }
        })
    })
})