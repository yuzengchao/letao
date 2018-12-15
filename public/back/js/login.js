; (function () {
    $('#form').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        
        fields: {
            username: {
                validators: {
                    notEmpty: {
                        message: "用户名不能为空"
                    },
                    stringLength: {
                        min: 2,
                        max: 6,
                        message: "用户名必须是2-6位"
                    },
                    callback: {
                        message:'用户名不存在'
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: "密码不能为空"
                    },
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: "密码必须是6-12位"
                    },
                    callback: {
                        message:'密码错误'
                    }
                }
            }
        },
    })
})()

    
    
; (function () {
    $('#form').on('success.form.bv', function (e) {
        e.preventDefault()



        $.ajax({
            type: 'post',
            url: '/employee/employeeLogin',
            data: $('#form').serialize(),
            dataType: 'json',
            success: function (info) {
                // console.log(info)
                if (info.success) {
                    location.href = 'index.html'
                }
                if (info.error === 1000) {
                    // alert('用户名不存在')
                    $("#form").data('bootstrapValidator').updateStatus('username','INVALID','callback')
                }
                if (info.error === 1001) {
                    // alert('密码错误')
                    $("#form").data('bootstrapValidator').updateStatus('password','INVALID','callback')
                }
            }
        })
    })


    $('.reset').on('click', function () {
        $("#form").data('bootstrapValidator').resetForm()
    })
})()