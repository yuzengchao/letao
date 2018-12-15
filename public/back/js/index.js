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

$(function () {
    var echartsLeft = echarts.init(document.getElementById('echarts-left'))
    var option1 = {
        title: {
            text: '2018年注册人数'
        },
        tooltip: {},
        legend: {
            data:['人数']
        },
        xAxis: {
            data: ["1月","2月","3月","4月","5月","6月"]
        },
        yAxis: {},
        series: [{
            name: '人数',
            type: 'bar',
            data: [1000, 1500, 1800, 1200, 1000, 500]
        }]
    };
    echartsLeft.setOption(option1);




    var echartsRight = echarts.init(document.getElementById('echarts-right'))
    var option2 = {
        title : {
            text: '热门品牌销售',
            subtext: '2018年12月',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['耐克','阿迪达斯','新百伦','李宁','阿迪王']
        },
        series : [
            {
                name: '访问来源',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:335, name:'耐克'},
                    {value:310, name:'阿迪达斯'},
                    {value:234, name:'新百伦'},
                    {value:135, name:'李宁'},
                    {value:1548, name:'阿迪王'}
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    echartsRight.setOption(option2);

    
})