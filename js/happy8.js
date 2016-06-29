/**
 * Created by 范伟 on 2015/11/24.
 */
(function ($) {
    $(function () {
        /*红球*/
        var redTz = new Tz({
            dataUrl: "json/happy8.json",
            numClickCallback:function(count,index){
                $('.redNum').text(count)
            },
            randomChoiceCallback:function(selected){
                $('.redNum').text(selected.length)
            }
        })
        /*红球随机选取*/
        $('.radom_redbtn').click(function(){
            var random_number = $('.redBallBox select').val();
            redTz.randomChoice(random_number)
        })
        /*红球清空*/
        $('.clearingRed').click(function(){
            $('.redNum').text(0)
            redTz.empty();
        })

    });
})(jQuery);