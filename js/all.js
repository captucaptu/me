

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
var speed = 15;
var mePos = 256;
var stageMin = 120;
var stageMax = 30;
var stageX = 0;

$(document).ready(function(){
    $(window).on('resize', function(){
        stageMax = $(this).width() - 512; 
    }).resize();

    $(window).one('keydown', function(){
        $('.wrapper, .me__name').addClass('start');
        setTimeout(function(){
            init();
        }, 300)
    });



    var me = $('.me__body');
    var meSprite = new Image();
    meSprite.src = GetUrlRelativePath() + 'images/me.png?' + (new Date().getTime());
    console.log(meSprite.src)
    meSprite.addEventListener('load', function(){
        console.log('ani loaded')
        me.animateSprite({
            fps: 12,
            animations: {
                walk: [0, 1],
                idle: [2, 2, 2, 3, 3, 2, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2 ,2]
            },
            loop: true,
            autoplay: true,
            complete: function(){
                console.log('ani end')
            }
        });
        initControl();
    });
    

    

    

    function init() {
        $(window).on('keydown', function(e){
            console.log(e.keyCode)
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
        setInterval(function(){
        
        

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
    
    
            switch (meAct){
                case 'walk':
                    me.animateSprite('fps', '6');
                    me.animateSprite('play', 'walk');
                    var dir = (meDir == 'right') ? 1 : -1;
                    var face = (meDir == 'right') ? 0 : 180;
                    mePos = (dir * speed) + mePos;
                    if(mePos >= stageMax){
                        mePos = stageMax;
                        stageX = (dir * speed * -1) + stageX;
                        $('.milestones').css({
                            'left': stageX + 'px',
                        });
                        $('.stage__buildings').css({
                            'left': (stageX * 0.1) + 'px',
                        });
                    }else if(mePos <= stageMin){
                        mePos = stageMin;
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
                    me.animateSprite('fps', '10');
                    me.animateSprite('play', 'idle');
    
                
            }
        }, 33);
    }
    

    function recthit(rectone, recttwo){
    
        var r1 = $(rectone);
        var r2 = $(recttwo);
        
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