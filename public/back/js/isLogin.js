$.ajax({
    type: 'get',
    url: '- /employee/checkRootLogin',
    dataType: 'json',
    success: function (e) {
        if (e.error === 400) {
            location.href = 'login.html'
        }
    }
})