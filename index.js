
const fs = require('fs')
const { createCanvas, loadImage } = require('canvas')
const canvas = createCanvas(416, 416)
const ctx = canvas.getContext('2d')
const canvas2 = createCanvas(416, 416)
const ctx2 = canvas2.getContext('2d')

let  colors=[
    "#3d5f8490",
    "#aea45f90",
    "#e1623590",
    "#8a837190",
    "#28375890",
    "#9e797390",
    "#37405190",
    "#72a39090",
    "#aa302590"
    ]


    //画长方形
    function rect(obj){
        let {x,y,w,h,color,rota}=obj
        ctx.fillStyle=color|| colors[ Math.ceil(Math.random()*colors.length )  ]
        if(!x) x=Math.ceil( Math.random()* (416-190))+100
        if(!y) y=Math.ceil( Math.random()* (416-120))+40
        if(!w)w=Math.ceil( Math.random()* 80+70)
        if(!h)h=Math.ceil( Math.random()* 30+20)
        if(! rota) rota=Math.random()/2  //rota为旋转角度 弧度制
         
        ctx.rotate(rota )
        ctx.fillRect(x,y,w,h)
        // let  img=canvas.toDataURL();
        // document.getElementById("img").src=img;
        // // ctx.clearRect(0,0,416,416)
        ctx2.drawImage(canvas,0,0)
        
        //长方形位置 x1 左上角位置 x2, 右上角位置,x3:右下角,x4:左下角
        let x1=x*Math.cos(rota)- y*Math.sin(rota)
        let  y1=x*Math.sin(rota) +y*Math.cos(rota)
        let x2=(x+w)*Math.cos(rota)- y*Math.sin(rota)
        let  y2=(x+w)*Math.sin(rota) +y*Math.cos(rota)
        let  x3 = (x+w)*Math.cos(rota)- (y+h)*Math.sin(rota)
        let  y3=(x+w)*Math.sin(rota) +(y+h)*Math.cos(rota)
        let x4=x*Math.cos(rota)- (y+h)*Math.sin(rota)
        let  y4=x*Math.sin(rota) +(y+h)*Math.cos(rota)
        let  rx=Math.min(x1,x2,x3,x4)
        let  ry=Math.min(y1,y2,y3,y4)
        let  rw=Math.max(x1,x2,x3,x4)-rx
        let  rh=Math.max(y1,y2,y3,y4)-ry
        rx=rx<0?0:rx>416?416:rx
        ry=ry<0?0:ry>416?416:ry
        rw=  rx+rw <=416?rw: 416-rx
        rh=ry +rh <=416 ?rh: 416-ry
        
         ctx2.strokeRect(rx,ry,rw,rh)
         ctx.rotate(-rota )
         ctx.clearRect(0,0,416,416)
         const buffer = canvas2.toBuffer('image/png')
        fs.writeFileSync('./image.png', buffer)
        return  {x,y,w,h,rota,rx,ry,rw,rh}
    }
    
    (async ()=>{
        for (let  i=0;i< 2;i++){
        // await  delay(1)
      let obj=  rect({
          
      })
        console.log(obj)
    }
    })()
    function delay(s){
        return new Promise(resolve=>{
            setTimeout( function(){
                resolve(true)
            },s*1000)
        })
    }
     