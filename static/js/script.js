/* Author: YOUR NAME HERE
*/

$(document).ready(function() {   

  var socket = io.connect();

  $('#sender').bind('click', function() {
   socket.emit('message', 'Message Sent on ' + new Date());     
  });

  socket.on('server_message', function(data){
   $('#receiver').append('<li>' + data + '</li>');
  });
  socket.on('coin_count', function(data){
        $('#coin').html(data);
  });
    (function(window){
        var cj= createjs,
            stage,circles = [];
        coin = 0;
        function init(canvas){
            if(createjs.Touch.isSupported()){
                createjs.Touch.enable(stage);
            }
            stage = new cj.Stage(canvas);
            createCircle(50,50,'red');
            createCircle(50,150,'blue');
            createCircle(50,250,'green');
            createCircle(50,350,'purple');
            createCircle(150,50,'red');
            createCircle(150,150,'blue');
            createCircle(150,250,'green');
            createCircle(150,350,'purple');
            createCircle(250,50,'red');
            createCircle(250,150,'blue');
            createCircle(250,250,'green');
            createCircle(250,350,'purple');
            createCircle(350,50,'red');
            createCircle(350,150,'yellow');
            createCircle(350,250,'magenta');
            createCircle(350,350,'magenta');
            createjs.Ticker.setFPS(30);
            createjs.Ticker.useRAF=true;
            createjs.Ticker.addEventListener('tick', stage);
            stage.update();

        }

        window.addEventListener('load', function(){
            window.removeEventListener('load',arguments.callee);
            init();
        }, false);
        function createCircle(x,y,color){
            var circle= new cj.Shape();
            circle.graphics.beginFill(color).drawCircle(0,0,50);
            circle.x=x;
            circle.y=y;
            circle.addEventListener("click",circleClickHandler);
            circles.push(circle);
            stage.addChild(circle);
        }
        function circleClickHandler(evt){
            var target=evt.target;
            scaleTween(target);
            coin+=1;
            socket.emit('count',coin);
        }
        function scaleTween(target){
            createjs.Tween.get(target,{override:true})
                .to({scaleX:0.5,scaleY:0.5})
                .to({scaleX:1,scaleY:1},1000,createjs.Ease.elasticOut);
        }
        window.addEventListener('load',function loadHandler(evt){
            window.removeEventListener('load',loadHandler,false);
            init('canvas');
        },false);
    }(window));
});