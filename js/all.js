

var objs = [
    {
        'name': 'taoyuan',
        'x': '157'
    },
    {
        'name': 'taichung',
        'x': '393'
    },
    {
        'name': 'tainan',
        'x': '895'
    },
    {
        'name': 'taipei',
        'x': '1396'
    },
    {
        'name': 'sccd',
        'x': '2454'
    },
    {
        'name': 'police',
        'x': '4079'
    },
    {
        'name': 'iii',
        'x': '6146'
    },
    {
        'name': 'nd',
        'x': '7464'
    }
];

var meAct = 'idle';
var meDir = 'right';
var speed = 20;
var mePos = 256;
var stageMin = 120;
var stageMax = 30;
var stageX = 0;
var mouseX = 0;
var mouseY = 0;
var isKeyDown = false;

$(document).ready(function(){
    $(window).on('resize', function(){
        stageMax = $(this).width() - 512; 
    }).resize();

    $(window).one('keydown mousedown', function(){
        $('.wrapper, .me__name').addClass('start');
        setTimeout(function(){
            init();
        }, 300)
    });

    //console.log(GetUrlRelativePath() + 'images/me.png?' + (new Date().getTime()))

    var me = $('.me__body');
    var meSprite = new Image();
    meSprite.src = GetUrlRelativePath() + 'images/me.png?' + (new Date().getTime());
    
    meSprite.addEventListener('load', function(){
        console.log('ani loaded')
        
    });
    $('.me__body').css({
        'background-image': 'url(./images/me.png)'
    });
    $('.me__body').animateSprite({
        fps: 12,
        animations: {
            walk: [1, 2, 3, 4, 5],
            idle: [6,6,6,7,7,7,6,6,6,6,7,7,7,6,6,6,6,6,6,6,6,6]
        },
        loop: true,
        autoplay: true,
        complete: function(){
            console.log('ani end');
        }
    });
    initControl();

    

    

    function init() {
        $(window).on('keydown', function(e){
            //console.log(e.keyCode)
            isKeyDown = true;
            if(e.keyCode == 39){
                //walk right
                meAct = 'walk';
                meDir = 'right';
            }
            if(e.keyCode == 37){
                meAct = 'walk';
                meDir = 'left';
    
            }
    
            //me.trigger(meAct);
        });
        $(window).on('keyup', function(){
            isKeyDown = false;
            meAct = 'idle';
            //me.trigger(meAct);
        });
    }
    

    /*me.on('walk idle', function(e){
        switch (e.type){
            case 'walk':
                $('.me').animateSprite('play', 'walk');
            break;
            default:
                $('.me').animateSprite('play', 'idle');
        }
    })*/
    //console.log(me.collision('#police'))
    function initControl(){
        var yturl = 'https://www.youtube.com/embed/'
        setInterval(function(){
            
            
            $('.work__collsion').each(function(item, key){
                var work = $(this).parents('.work');
                var video = work.find('iframe');
                if(recthit($(this), $('.me__body'))){
                    work.addClass('on');
                    if(video && video.attr('src') != (yturl + video.attr('data-yid') + '?autoplay=1&mute=1')){
                        video.attr('src', '');
                        video.attr('src', yturl + video.attr('data-yid') + '?autoplay=1&mute=1');
                    }
                }else{
                    work.removeClass('on');
                    if(video && video.attr('src') != (yturl + video.attr('data-yid') + '?&mute=1')){
                        video.attr('src', '');
                        video.attr('src', yturl + video.attr('data-yid') + '?&mute=1');
                    }
                }
            });

            /*
            if(recthit('.me__body', '.work__collsion')){
                $('#base').addClass('on');
            }else{
                $('#base').removeClass('on');
            }
            if(recthit('.me__body', '#police')){
                $('.wrapper').addClass('gray');
            }else{
                $('.wrapper').removeClass('gray');
            }
    
            if(recthit('.me__body', '#ar .work__collsion')){
                $('#ar').addClass('on');
            }else{
                $('#ar').removeClass('on');
            }
            if(recthit('.me__body', '#chess .work__collsion')){
                $('#chess').addClass('on');
            }else{
                $('#chess').removeClass('on');
            }
            if(recthit('.me__body', '#ufo .work__collsion')){
                $('#ufo').addClass('on');
            }else{
                $('#ufo').removeClass('on');
            }
    
            if(recthit('.me__body', '#board .work__collsion')){
                $('#board').addClass('on');
            }else{
                $('#board').removeClass('on');
            }
    
            if(recthit('.me__body', '#gyrigym .work__collsion')){
                $('#gyrigym').addClass('on');
            }else{
                $('#gyrigym').removeClass('on');
            }

            i*/
    
    
            switch (meAct){
                case 'walk':
                    //me.animateSprite('fps', '6');
                    me.animateSprite('play', 'walk');
                    // if(mouseX >= $('.me').position().left && !isKeyDown){
                    //     meDir = 'right';
                    // }else{
                    //     meDir = 'left';
                    // }
                    var dir = (meDir == 'right') ? 1 : -1;
                    var face = (meDir == 'right') ? 0 : 180;
                    mePos = (dir * speed) + mePos;
                    if(mePos >= stageMax){
                        mePos = stageMax;
                        if(stageX <= ($('.milestones__nd').position().left + $('.milestones__nd').width()) * -1){
                            return false;
                        }
                        stageX = (dir * speed * -1) + stageX;
                        $('.milestones').css({
                            'left': stageX + 'px',
                        });
                        $('.stage__buildings').css({
                            'left': (stageX * 0.1) + 'px',
                        });
                    }else if(mePos <= stageMin){
                        mePos = stageMin;
                        if((stageX==0)&&mePos<=stageMin){
                            return false;
                        }
                        stageX = (dir * speed * -1) + stageX;
                        $('.milestones').css({
                            'left': stageX + 'px',
                        });
                        $('.stage__buildings').css({
                            'left': (stageX * 0.1) + 'px',
                        });
                    }else{
                        $('.me').css({
                            'left': mePos + 'px',
                            'transform': 'rotateY(' + face + 'deg)'
                        });
                    }
                    
                break;
                default:
                    //me.animateSprite('fps', '30');
                    me.animateSprite('play', 'idle');
    
                
            }
        }, 33);
    }
    

    function recthit(r1, r2){
    
        //var r1 = $(rectone);
        //var r2 = $(recttwo);
        
        var r1x = r1.offset().left;
        var r1w = r1.width();
        var r1y = r1.offset().top;
        var r1h = r1.height();
        
        var r2x = r2.offset().left;
        var r2w = r2.width();
        var r2y = r2.offset().top;
        var r2h = r2.height();
        
        if( r1y+r1h < r2y ||
            r1y > r2y+r2h ||
            r1x > r2x+r2w ||
            r1x+r1w < r2x ){
            return false;
        }else{
            return true;   
        }
        
    }//end function 

    
    $('body').on('mousemove', function(e){
        mouseX = e.pageX;
        mouseY = e.pageY;
        $('.arrow').css({
            'left': mouseX + 'px',
            'top' : mouseY + 'px'
        });
        if(mouseX >= $('.me').position().left){
            $('.arrow').removeClass('turn');
        }else{
            $('.arrow').addClass('turn');
        }
    }).on('mousedown', function(e){
        isKeyDown = false;
        if(mouseX >= $('.me').position().left){
            meAct = 'walk';
            meDir = 'right';
        }else{
            meAct = 'walk';
            meDir = 'left';
        }
    }).on('mouseup', function(){
        isKeyDown = false;
        meAct = 'idle';
    });

    function cursorMove(){
        
        //requestAnimationFrame
    }

});





function GetUrlRelativePath() {
    var url = window.location.toString();
    var arrUrl = url.split("//");

    var paths = arrUrl[1].split("/");
    paths.pop();
    //paths = paths.pop();
    
    var relUrl = arrUrl[0] + '//' + paths.join('/') + '/'; 
    return relUrl;
}