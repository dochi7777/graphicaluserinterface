(function(root){
 'use strict';
 class AlleyRain{
  constructor(canvas){this.canvas=canvas;this.ctx=canvas.getContext('2d');this.drops=[];this.last=0;this.amount=0;this.raining=false;this.width=0;this.height=0}
  setRain(value){this.raining=!!value}
  render(time){
   const dt=this.last?Math.min((time-this.last)/1000,.05):0;this.last=time;
   this.amount+=((this.raining?1:0)-this.amount)*Math.min(1,dt*3.5);
   const width=this.canvas.clientWidth,height=this.canvas.clientHeight,dpr=Math.min(root.devicePixelRatio||1,1.5);
   if(this.width!==width||this.height!==height){this.width=width;this.height=height;this.canvas.width=Math.round(width*dpr);this.canvas.height=Math.round(height*dpr);this.drops=Array.from({length:Math.max(65,Math.min(210,Math.round(width*.11)))},()=>({x:Math.random()*width,y:Math.random()*height,speed:360+Math.random()*480,length:10+Math.random()*22,alpha:.09+Math.random()*.13}))}
   const c=this.ctx;c.setTransform(dpr,0,0,dpr,0,0);c.clearRect(0,0,width,height);
   if(this.amount<.008)return;
   c.fillStyle=`rgba(30,30,30,${this.amount*.025})`;c.fillRect(0,0,width,height);
   c.lineWidth=.8;
   for(const drop of this.drops){drop.x-=dt*drop.speed*.12;drop.y+=dt*drop.speed;if(drop.y>height+35){drop.y=-35;drop.x=Math.random()*width}if(drop.x<0)drop.x+=width;c.strokeStyle=`rgba(45,45,45,${drop.alpha*this.amount})`;c.beginPath();c.moveTo(drop.x,drop.y);c.lineTo(drop.x-drop.length*.12,drop.y+drop.length);c.stroke()}
  }
 }
 root.AlleyRain=AlleyRain;
})(globalThis);
