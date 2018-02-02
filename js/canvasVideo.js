
//初始化绘图上下文
let canvas = document.getElementById('videoCanvas');
let ctx = canvas.getContext('2d');
let isPaint = false;

//事件绑定
canvas.onmousedown = mouseDown;
canvas.onmouseup = mouseUp;
canvas.onmousemove = mouseMove;
canvas.ondblclick = ondblclick;

initVideo();

//视频播放初始化
function initVideo() {
    //播放HLS协议视频
    let hls = new Hls();
    let video = document.getElementById('video');
    hls.loadSource('https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8');
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED,function() {
        video.play();
    });
}


//操作控制变量组
let ctrlConfig = {
    startPoint:null,//起始点
};


//设置起始点
function setStartPoint(x, y) {
  ctrlConfig.startPoint = {
    x: x,
    y: y
  };
}

//获取起始点
function getStartPoint() {
  return ctrlConfig.startPoint;
}


//鼠标点击事件
function mouseDown (event){

    isPaint = true;

    let point = getPosition(event);

    //设置起始点
    setStartPoint(point.x, point.y);

}


//鼠标移动事件
function mouseMove (event){

    if(isPaint) {

        let point = getPosition(event);

        let startPoint = getStartPoint();
        let width = (point.x- startPoint.x);
        let height = (point.y - startPoint.y);

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeRect(startPoint.x, startPoint.y, width, height);
    }

}


//鼠标松开事件
function mouseUp (event) {

    let endPoint = getPosition(event);

    let startPoint = getStartPoint();
    let width = (endPoint.x - startPoint.x);
    let height = (endPoint.y - startPoint.y);

    ctx.fillStyle = 'rgb(255,51,0)';
    ctx.strokeRect(startPoint.x, startPoint.y, width, height);

}


//获取鼠标位置
function getPosition(event) {



    let box = canvas.getBoundingClientRect();

    //相对于canvas画布的位置
    let x = (event.pageX - box.left) * (canvas.width / box.width);
    let y = (event.pageY - box.top) * (canvas.height / box.height);

    document.getElementById('x').text = x;
    document.getElementById('y').text = y;

    return {
        x: x,
        y: y
    }
}




//鼠标双击事件
function ondblclick() {
    isPaint = false;
    ctx.fill();
    ctx.closePath();
}


//开始绘制按钮
function beginPath() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.moveTo(0, 0);
    ctx.beginPath();
}


