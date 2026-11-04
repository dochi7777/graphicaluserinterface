(function(root){
 'use strict';
 const FONT='MinSans';
 function wrapText(ctx,text,maxWidth){
  const result=[];
  for(const paragraph of text.split('\n')){let line='';for(const char of paragraph){if(line&&ctx.measureText(line+char).width>maxWidth){result.push(line);line=char}else line+=char}result.push(line)}
  return result;
 }
 function createCanvas(entries,total,options={}){
  if(!entries.length)throw Error('수집한 문장이 없어요.');
  const makeCanvas=options.canvasFactory||(()=>document.createElement('canvas'));
  const canvas=makeCanvas();canvas.width=960;canvas.height=1;
  let ctx=canvas.getContext('2d');ctx.font=`500 43px ${FONT}`;
  const items=entries.map(entry=>({...entry,lines:wrapText(ctx,entry.text,744)}));
  const height=724+items.reduce((sum,item)=>sum+157+item.lines.length*57,0);
  canvas.height=height;ctx=canvas.getContext('2d');
  ctx.fillStyle='#fff';ctx.fillRect(0,0,960,height);ctx.fillStyle='#111';ctx.strokeStyle='#222';ctx.textBaseline='top';
  const left=94,right=866;
  function text(str,x,y,size=28,weight=400,align='left'){ctx.fillStyle='#111';ctx.font=`${weight} ${size}px ${FONT}`;ctx.textAlign=align;ctx.fillText(str,x,y)}
  function rule(y,dashed=true){ctx.save();ctx.strokeStyle='#222';ctx.lineWidth=2;ctx.setLineDash(dashed?[8,9]:[]);ctx.beginPath();ctx.moveTo(left,y);ctx.lineTo(right,y);ctx.stroke();ctx.restore()}
  function cut(y){ctx.save();ctx.lineWidth=1.5;ctx.strokeStyle='#aaa';ctx.beginPath();ctx.moveTo(left,y);for(let x=left;x<right;x+=16){ctx.lineTo(Math.min(x+8,right),y+6);ctx.lineTo(Math.min(x+16,right),y)}ctx.stroke();ctx.restore()}
  cut(26);
  text('골목의 문장',480,79,57,800,'center');
  text('이름 없는 골목',480,169,28,500,'center');
  rule(231,false);
  const date=options.date||new Date();
  const dateText=new Intl.DateTimeFormat('sv-SE',{timeZone:'Asia/Seoul',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hour12:false}).format(date);
  text('발행 일시',left,258,24);text(dateText,right,258,24,500,'right');
  text('수집한 문장',left,302,24);text(`${String(items.length).padStart(2,'0')} / ${String(total).padStart(2,'0')}`,right,302,26,700,'right');
  rule(356);
  let y=393;
  items.forEach((item,index)=>{
   text(String(index+1).padStart(2,'0'),left,y,25,700);text(item.title,left+61,y,25,500);y+=49;
   item.lines.forEach(line=>{text(line,left+10,y,43,500);y+=57});
   text('— '+item.author,right,y+8,23,400,'right');y+=59;
   rule(y);y+=49;
  });
  text('마음에 담은 문장',left,y,27,500);text(`${items.length} 개`,right,y,33,800,'right');y+=65;
  rule(y,false);y+=41;
  text('걷고, 발견하고, 간직하기.',480,y,28,600,'center');y+=49;
  text('오늘의 산책을 오래 기억해 주세요.',480,y,23,400,'center');y+=57;
  const code=dateText.replace(/\D/g,'')+items.length;
  const bars=[];for(const char of code)for(let j=0;j<5;j++)bars.push((char.charCodeAt(0)>>j&1)?4:2);
  let x=(960-bars.reduce((sum,w)=>sum+w+3,0))/2;for(const w of bars){ctx.fillStyle='#111';ctx.fillRect(x,y,w,64);x+=w+3}
  cut(height-34);
  return canvas;
 }
 function toPdfBytes(canvas){
  const jpeg=canvas.toDataURL('image/jpeg',.96).split(',')[1];
  const binary=atob(jpeg),image=Uint8Array.from(binary,char=>char.charCodeAt(0));
  const width=80/25.4*72,height=width*canvas.height/canvas.width;
  const encoder=new TextEncoder(),chunks=[],offsets=[0];let length=0;
  const push=data=>{const bytes=typeof data==='string'?encoder.encode(data):data;chunks.push(bytes);length+=bytes.length};
  function object(number,body){offsets[number]=length;push(`${number} 0 obj\n`);push(body);push('\nendobj\n')}
  push('%PDF-1.4\n');push(new Uint8Array([37,226,227,207,211,10]));
  object(1,'<< /Type /Catalog /Pages 2 0 R >>');
  object(2,'<< /Type /Pages /Kids [3 0 R] /Count 1 >>');
  object(3,`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${width.toFixed(3)} ${height.toFixed(3)}] /Resources << /XObject << /Receipt 4 0 R >> >> /Contents 5 0 R >>`);
  offsets[4]=length;push(`4 0 obj\n<< /Type /XObject /Subtype /Image /Width ${canvas.width} /Height ${canvas.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${image.length} >>\nstream\n`);push(image);push('\nendstream\nendobj\n');
  const drawing=`q\n${width.toFixed(3)} 0 0 ${height.toFixed(3)} 0 0 cm\n/Receipt Do\nQ\n`;
  object(5,`<< /Length ${encoder.encode(drawing).length} >>\nstream\n${drawing}endstream`);
  const xref=length;push('xref\n0 6\n0000000000 65535 f \n');
  for(let i=1;i<=5;i++)push(`${String(offsets[i]).padStart(10,'0')} 00000 n \n`);
  push(`trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`);
  const result=new Uint8Array(length);let cursor=0;for(const chunk of chunks){result.set(chunk,cursor);cursor+=chunk.length}return result;
 }
 root.AlleyReceipt={createCanvas,toPdfBytes};
})(globalThis);
