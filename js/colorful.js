(function ($) {
    //加载后执行
    $(function () {
        //功能按钮
        functionBtn();
        //确认选号处理
        confirmBtn();
    });


    //拖胆标记，默认不是拖胆玩法
    var tuoDanMark = false
    //三种数据
    var redData = [],
        blueData = [],
        tuoDanData = [];



    //普通玩法函数
    function commonPlay(config) {



    }

    //托胆玩法
    function tuoDanPlay(config) {
        /*var ballGame = config.ballGame,
         num = config.num,
         selected = config.selected,
         index = config.index
         if(ballGame == 1){
         //红球
         redData = selected
         if(tuoDanData.indexOf(num) == 0){
         tuoDanData.splice(tuoDanData.indexOf(num),1);
         tuoDan.empty(index)
         }

         }else if(ballGame == 2){
         //篮球
         blueData = selected
         }else if(ballGame == 0){
         //托胆
         tuoDanData = selected
         if(redData.indexOf(num) == 0){
         redData.splice(redData.indexOf(num),1);
         redTz.empty(index)
         }

         }

         var rCount = redData.length + tuoDanData.length
         var spanHtml = '<span>您选择了' +
         '<strong class="c_ba2636">'+ rCount +'</strong>个红球('+ tuoDanData.length +'个胆码，'+ redData.length +'个拖码)，' +
         '<strong class="c_1e50a2">'+ blueData.length +'</strong>个蓝球，共' +
         '<strong class="c_ba2636">0</strong>注，共' +
         '<strong class="c_ba2636">0</strong>元</span><i></i>'
         $('.selectInfo.nub').html(spanHtml)*/


    }

    //功能按钮

    function functionBtn() {
        //篮球随机选取
        $('.radom_bluebtn').click(function () {
            var random_number = $('.blueBallBox select').val();
        })
        //篮球清空
        $('.clearingBlue').click(function () {
            $('.blueNum').text(0)
        })
        //红球随机选取
        $('.radom_redbtn').click(function () {
            var random_number = $('.redBallBox select').val();
        })
        //红球清空
        $('.clearingRed').click(function () {
            $('.redNum').text(0)
        })
        //拖胆投注、普通投注切换处理
        var tab = $(".nav-tabs li"),
            $tuoDan = $(".content_c .tuoDan"),
            $content_c = $(".content_c"),
            $upload = $(".upload");
        tab.click(function () {
            var index = $(this).index()
            if(index == 1){
                $tuoDan.slideDown()
                $upload.hide();
                $content_c.show();
                $('.random_selection').hide();
            }else if(index == 0){
                $upload.hide();
                $content_c.show();
                $tuoDan.slideUp()
                $('.random_selection').show();
            }else if(index == 2){
                $content_c.hide();
                $upload.show();
            }

        })

    }

    function sortNumber(a,b)
    {
        return a - b
    }

    //确认按钮
    function confirmBtn(){
        var $modal = $('#tip'),
            $dl = $('#select_list_box dl')
        //确认选号
        $('.betbtn').click(function () {
            var redL = redData.length,
                tdL = tuoDanData.length,
                blL = blueData.length
            if(tuoDanMark){
                //托胆

            }else{
                //普通
                if(redL < 6 || blL < 1){
                    $modal.find('p').text('您选了（'+ redL +'红 + '+ blL +'蓝），请至少选择 6 个红球 1 个蓝球');
                    $modal.modal('show')
                }else{
                    var redNub = redData.sort(sortNumber),
                        type = '复式'
                    redNub = redNub.join('&nbsp')
                    var ddHtml = '<dd gid="2" class="" style="display: block;"> ' +
                        '<span class="type">' + type + '</span> ' +
                        '<span class="nums" title="11 13 20 28 31 32|10 [共1注 2元]"> ' +
                        '<strong class="c_ba2636">'+ redNub +'</strong>| ' +
                        '<strong class="c_1e50a2">10</strong> </span> ' +
                        '<span class="edit"> ' +
                        '<a rel="betPoolAct" pid="2" href="#edit">修改</a> ' +
                        '<a rel="betPoolAct" pid="2" href="#del">删除</a> ' +
                        '</span> <span class="sum">2元</span> </dd>'
                    $dl.append(ddHtml);
                    blueData = [];
                    redData = []
                }
            }

        })
    }












})(jQuery);



