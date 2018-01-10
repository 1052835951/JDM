/**
 * Created by 波仔~ on 2018/1/2.
 */
;(function(){
    window.onscroll = function(){
        var content_height = document.documentElement.offsetHeight;

        var height = document.documentElement.clientHeight;

        var s_top = document.documentElement.scrollTop;


        var result = s_top/(content_height - height);

        var header = document.getElementById('header');
        header.style.backgroundColor = 'rgba(222, 24, 27, '+ result +')';
    }
})();

;(function(){
    //倒计时开始
    gettime();
    setInterval(function(){
        gettime();
    },1000);

    function gettime(){

        var tomorrow = new Date(2018,00,03,23,59,0);
//console.log(tomorrow.getTime());
//console.log(tomorrow);

        var now = new Date();

//console.log(now);
//console.log(now.getTime());

        var seconds = parseInt((tomorrow.getTime() - now.getTime())/1000);

        //console.log(seconds);

        var hours = Math.floor(seconds/60/60);
        var minites = Math.floor(seconds/60%60);
        var second = seconds%60;
        //console.log(hours, minites, second);

        if(hours == 1 ||
            hours == 2 ||
            hours == 3 ||
            hours == 4 ||
            hours == 5 ||
            hours == 6 ||
            hours == 7 ||
            hours == 8 ||
            hours == 9 ||
            hours == 0){
            hours = '0' + hours
        };

        if(minites == 1 ||
            minites == 2 ||
            minites == 3 ||
            minites == 4 ||
            minites == 5 ||
            minites == 6 ||
            minites == 7 ||
            minites == 8 ||
            minites == 9 ||
            minites == 0){
            minites = '0' + minites
        };

        if(second == 1 ||
            second == 2 ||
            second == 3 ||
            second == 4 ||
            second == 5 ||
            second == 6 ||
            second == 7 ||
            second == 8 ||
            second == 9 ||
            second == 0){
            second = '0' + second
        };
        var hour =document.getElementById('hour');
        var minite = document.getElementById('minite');
        var secondss = document.getElementById('second');

        hour.innerText = hours;
        minite.innerText = minites;
        secondss.innerText = second;
    }


//倒计时结束
})();


;(function(){
    //新闻轮播开始

    var links = document.querySelectorAll('#news-text a');
    var max = links[0].offsetHeight*(links.length - 1);
    var tmp = 0;
    var step = 0;
    var timer = setInterval(function(){
        var timer1 = setInterval(function(){
            links.forEach(function(e){
                e.style.transform = 'translateY(-'+(step)+'px)';
            })

            if(step == tmp){
                clearInterval(timer1);
            }else{

                step++;
            }
        },20)

        if(tmp == max && tmp == step){
            //clearInterval(timer);
            tmp = 0;
            step = 0;
        }
        tmp += 30;
    },4000)
//新闻轮播结束
})();




;(function(){
    //轮播图动画效果

    var banner = document.querySelector('.banner');
    var imgUl = banner.querySelector('.imgUl');
    var imgs = imgUl.querySelectorAll('li');

    var pointUl = banner.querySelector('.pointUl');
    var points = pointUl.querySelectorAll('li');


    var index = 1;
    var width = banner.offsetWidth;
    window.addEventListener('resize',function(){
        clearInterval(timer);
        width = banner.offsetWidth;
        imgUl.style.transition = 'none';
        imgUl.style.transform = 'translateX(-'+ index * width +'px)';
        timer = setInterval(function(){
            index++;
            imgUl.style.transition = 'all .3s';
            imgUl.style.transform = 'translateX(-'+ index * width +'px)';
        },1000)

    })
    console.log(width);

    console.log(imgUl.offsetWidth);

    var timer = setInterval(function(){
       index++;
        imgUl.style.transition = 'all .3s';
        imgUl.style.transform = 'translateX(-'+ index * width +'px)';
    },1000)


    imgUl.addEventListener('transitionend',function(){
        if(index >= imgs.length - 1) {
            index = 1;
            imgUl.style.transition = 'none';
            imgUl.style.transform = 'translateX(-'+ index * width +'px)';
        }
        if(index <= 0){
            index = imgs.length - 2;

            imgUl.style.transition = 'none';
            imgUl.style.transform = 'translateX(-'+ index * width +'px)';
        }

        for(var i = 0; i < points.length; i++){
            points[i].classList.remove('now');
        }

        points[index - 1].classList.add('now');
        //console.log(index);
    })
    var startTime;
    var startX;
    imgUl.addEventListener('touchstart',function(e){
        startX = e.changedTouches[0].clientX;
        clearInterval(timer);

        startTime = new Date();

    })
    imgUl.addEventListener('touchmove',function(e){
        var result = e.changedTouches[0].clientX - startX;
        imgUl.style.transition = 'none';
        imgUl.style.transform = 'translateX(-'+ (index * width - result) +'px)';
    })


    imgUl.addEventListener('touchend',function(e){
        var time = new Date() - startTime;
        var result = e.changedTouches[0].clientX - startX;

        if(Math.abs(result) > width/3 || time < 300 && Math.abs(result) > 30){
            if(result > 0) {
                index--;
            }
            if(result < 0){
                index++;
            }
        }
        imgUl.style.transition = 'all .3s';
        imgUl.style.transform = 'translateX(-'+ index * width +'px)';

        timer = setInterval(function(){
            index++;
            imgUl.style.transition = 'all .3s';
            imgUl.style.transform = 'translateX(-'+ index * width +'px)';
        },1000)
    })



})();