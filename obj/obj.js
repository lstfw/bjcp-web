/**
 * Created by 范伟 on 2015/11/23.
 */
(function($){
    var utils = {
        parseNum2Num:function(i){
            if(i<10){
                return '0'+i;
            }else{
                return i;
            }
        }
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    function Tz(config){
        var defaults = {
            data:[1, 2, 0, 18, 23, 45, 1, 34, 2, 0, 18, 23, 45, 1, 34],
            $container:$('#container'),
            least:1,
            limit:10,
            numClickCallback:function(){}
        }
        var config = $.extend({}, defaults, config);
        this.config = config;

        this.data = config.data;
        this.$container = config.$container;
        this.init();
        this.$unit = this.$container.find('.unit');
        this.count = 0;
        this.bindEvents();
    }

    Tz.prototype.init = function(){
        var num_html_arr = [];
        for(var i = 0; i < this.data.length;i++){
            var unit_html = '<div class="unit">' +
                '<div class="num">'+utils.parseNum2Num(i+1)+'</div>' +
                '<div class="value">'+this.data[i]+'</div>' +
                '</div>'
            num_html_arr.push(unit_html);
        }
        this.$container.append(num_html_arr.join(''));
    }

    Tz.prototype.bindEvents = function(){
        var self = this;
        this.$unit.click(function(){
            var $this = $(this);
            var $num = $this.find('.num');
            var num = parseInt($num.text());
            var value = parseInt($this.find('.value').text());
            if($num.hasClass('num-active')){
                self.count -= 1;
                $num.removeClass('num-active');
            }else{
                self.count += 1;
                $num.addClass('num-active');
            }

            self.config.numClickCallback(self.count);
        });
    };

    Tz.prototype.randomChoice = function(num){
        var selected = [];
        var newArr = [];
        for(var i = 0; i < num; i++){
            newArr.push(i);
        }
        for(var i = 0; i < num; i++){
            var randomSelected = getRandomInt(newArr[0], newArr[newArr.length - 1]);
            selected.push(randomSelected);
            newArr.splice(newArr.indexOf(randomSelected), 1);
        }

        //先清空
        this.empty();
        //再选择
        for(var i = 0 ; i < selected.length; i++){
            this.select(selected[i]);
        }
    };


    Tz.prototype.select = function(index){
        this.$container.find('.num').eq(index).addClass('num-active');
    }

    Tz.prototype.empty = function(){
        this.$container.find('.num').removeClass('num-active');
    }
    window.Tz = Tz;
})(jQuery);