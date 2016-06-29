/**
 * Created by Administrator on 2015/11/24.
 */

(function ($) {
    /*工具函数*/
    var utils = {
        /*个位数前加0*/
        parseNum2Num: function (i) {
            if (i < 10) {
                return '0' + i;
            } else {
                return i;
            }
        },
        /*随机选取n-n之间的数*/
        getRandomInt: function (min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }
    }


    function Tz(config) {
        /*默认配置。以及回调函数*/
        var defaults = {
            dataUrl: "json/redData.json",
            $container: $('.ordinary .redBallBox ul'),
            numClickCallback: function () {
            },
            randomChoiceCallback: function () {

            }
        }
        var config = $.extend({}, defaults, config);
        this.config = config;
        this.data = [];   //渲染数据
        this.selectedData = []; //选中数字集合
        this.positionArr = []; //选中数字下标
        this.allPositionArr = []; //被剪数字下标
        this.fixedPositionArr = [];//固定下标值
        this.numData = [] //所有数字值
        this.$container = config.$container;
        this.get();

    }

    /*获取球类数据和遗漏数据*/
    Tz.prototype.get = function () {
        var self = this
        $.ajax({
            url: self.config.dataUrl,
            type: "POST",
            contentType: "application/json; charset=UTF-8",
            success: function (data) {
                self.data = data;
                self.init();
            }
        });
    }

    /*渲染球类和遗漏*/
    Tz.prototype.init = function () {
        var ball_html_arr = [],
            self = this;
        for (var i = 0; i < self.data.length; i++) {
            var num = self.data[i].num,
                val = self.data[i].val;
            self.numData.push(num);
            var ball_html = '<li><a href="javascript:;" hidefocus="true" rel="nofollow" class="js_ball" data-value="1">' + utils.parseNum2Num(num) + '</a><span class="val">' + val + '</span></li>';
            ball_html_arr.push(ball_html);
        }
        self.$container.prepend(ball_html_arr.join(''));
        self.bindEvents();
    }

    /*选号*/
    Tz.prototype.bindEvents = function () {
        this.$unit = this.$container.find('li');
        var self = this;
        self.$unit.click(function () {
            var $this = $(this),
                $num = $this.find('.js_ball'),
                index = $this.index();
            if ($num.hasClass('active')) {
                self.positionArr.splice(self.positionArr.indexOf(index),1)
                self.selectedData.splice(self.selectedData.indexOf(self.numData[index]),1)
                self.select(self.positionArr);
            } else {
                self.positionArr.push(index);
                self.selectedData.push(self.numData[index])
                self.select(self.positionArr);

            }
            console.log(self.selectedData)
            self.config.numClickCallback(self.selectedData);

        })
    }


    /*随机生成*/
    Tz.prototype.randomChoice = function (nub) {
        //机选先重置数据和样式
        this.selectedData = []; //选中数字集合
        this.positionArr = []; //选中数字下标
        this.allPositionArr = []; //所有数字下标
        this.empty();
        for (var i = 0; i < this.data.length; i++) {
            //生成下标集合
            this.allPositionArr.push(i);
            this.fixedPositionArr.push(i);
        }

        for (var i = 0; i < nub; i++) {
            //随机生成下标值
            var randomSelected = utils.getRandomInt(0, this.allPositionArr.length - 1);
            //将选中的下标值储存起来
            this.positionArr.push(this.allPositionArr[randomSelected])
            //储存选中值
            this.selectedData.push(this.numData[this.allPositionArr[randomSelected]]);
            //删除选过的下标值
            this.allPositionArr.splice(this.allPositionArr.indexOf(this.allPositionArr[randomSelected]), 1);
        }


        console.log(this.selectedData)

        /*重新渲染*/
        this.select(this.positionArr)
        this.config.randomChoiceCallback(this.selectedData)

    }

    /*选中渲染*/
    Tz.prototype.select = function (index) {
        //先清楚所有
        this.empty();
        //再循环选中
        for (var i = 0; i < index.length; i++) {
            this.$container.find('.js_ball').eq(index[i]).addClass('active')
        }

    }
    /*清除函数*/
    Tz.prototype.empty = function () {
        /*删除所有样式和数据*/
        this.$container.find('.js_ball').removeClass('active');
    }


    window.Tz = Tz;


})(jQuery)