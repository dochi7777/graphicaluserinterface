'use strict';
const $=s=>document.querySelector(s);
let isRaining=false,rainEffects;
try{isRaining=localStorage.getItem('alley-weather-v1')==='rain'}catch{}
function setWeather(rain){
 isRaining=!!rain;try{localStorage.setItem('alley-weather-v1',isRaining?'rain':'clear')}catch{}
 $('#weatherButton').textContent=isRaining?'☂ 비 오는 날':'☀ 맑은 날';
 $('#weatherButton').setAttribute('aria-pressed',String(isRaining));
 $('#weatherButton').setAttribute('aria-label',isRaining?'현재 비 오는 날, 맑은 날로 바꾸기':'현재 맑은 날, 비 오는 날로 바꾸기');
 if(rainEffects)rainEffects.setRain(isRaining);
 if(audioContext&&rainGain)rainGain.gain.setTargetAtTime(isRaining?.32:0,audioContext.currentTime,.5);
}
$('#weatherButton').onclick=()=>setWeather(!isRaining);

const sentences=[
 {text:'인생은\n인간이 철들만큼\n길지 않다',title:'인생은 길지 않다',type:'골목의 손글씨 안내판',author:'이름 모를 누군가',description:'골목의 안내판에서 만난 손글씨. 인생은 인간이 철들만큼 길지 않다.',photo:'assets/sentence-01.jpg',side:-1,z:4,color:'#f6bb86'},
 {text:'나는 여기서 아이들도 즐겁고\n강아지와 고양이도 즐겁고\n어른들도 즐겁고\n혼자온 이들도 즐겁고\n나도 즐거웠음 하고 바라요',title:'모두가 즐거운 곳',type:'골목의 손글씨 안내판',author:'이름 모를 누군가',description:'아이와 어른, 강아지와 고양이, 혼자 온 사람까지. 모두의 즐거움을 바라는 손글씨.',photo:'assets/sentence-02.jpg',reflection:['아이와 어른, 강아지와 고양이를 나란히 적어 둔 마음.','혼자 온 사람의 즐거움까지 잊지 않은 게 좋았다.','누구도 빠뜨리지 않으려는 바람이 이 작은 판에 담겨 있다.','함께 웃을 수 있는 곳이라면, 나도 조금 편해질 것 같다.','나의 즐거움도 누군가의 즐거움 곁에 놓아 두고 싶다.'],side:1,z:-3,color:'#a8d7d1'},
 {"text":"경고\n이곳에 무단으로\n쓰레기를 버리다가\n적발되면 고발조치\n합니다. (양심 불량)","title":"벽에 붙은 경고","type":"쓰레기 무단투기 경고문","author":"이름 모를 누군가","description":"벽에 붙은 경고문. 단호한 말 뒤로, 이곳을 돌보는 사람의 수고가 떠오른다.","reflection":["큰 경고 글씨 앞에서 잠깐 발걸음이 멈췄다.","누군가는 이곳에 버려진 것들을 여러 번 치웠을 것이다.","깨끗한 골목이 저절로 만들어지는 건 아니라는 생각.","내가 떠난 자리에 무엇이 남는지도 돌아보게 된다.","다음 사람에게는 조금 더 편한 길을 남기고 싶다."],"side":-1,"z":-11,"color":"#f3d477","photo":"assets/sentence-03.jpg","photoAlt":"경고 이곳에 무단으로 쓰레기를 버리다가 적발되면 고발조치 합니다. (양심 불량)라고 적힌 골목 안내문 사진"},
 {"text":"개인 사정상\n휴무\n합니다","title":"닫힌 셔터의 하루","type":"가게 앞 휴무 안내","author":"이름 모를 가게 주인","description":"닫힌 셔터 위에 붙은 붉은 손글씨. 개인 사정상, 짧은 말 안에 담긴 하루.","reflection":["개인 사정이라는 짧은 말 뒤에는 어떤 하루가 있을까.","밖에서는 알 수 없는 일들이 저 셔터 너머에도 있을 것이다.","매일 열려 있던 문도 가끔은 닫힐 시간이 필요하다.","이유를 다 설명하지 않고 쉬어도 괜찮았으면 좋겠다.","다시 문을 여는 날에는 조금 가벼운 마음이기를 바란다."],"side":1,"z":-22,"color":"#c2b4e8","photo":"assets/sentence-04.jpg","photoAlt":"개인 사정상 휴무 합니다라고 적힌 골목 안내문 사진"},
 {"text":"장기임대\n전세주택\n재개발 결사반대","title":"이곳에 남고 싶은 마음","type":"담벼락의 재개발 반대 문구","author":"이름 모를 누군가","description":"벽돌 위에 붙은 재개발 반대 문구. 누군가에게 이 골목은 계속 살아가고 싶은 집이다.","reflection":["지나가는 나에게는 풍경이지만, 누군가에게는 집이다.","짧고 굵은 글씨에서 이곳에 남고 싶은 마음이 느껴졌다.","익숙한 창문과 골목에는 오래 쌓인 생활이 있을 것이다.","새로워진다는 말만으로 담을 수 없는 시간도 있다.","이 거리에 사는 사람들의 목소리도 함께 기억하고 싶다."],"side":-1,"z":-30,"color":"#c1d99b","photo":"assets/sentence-05.jpg","photoAlt":"장기임대 전세주택 재개발 결사반대라고 적힌 골목 안내문 사진"},
 {text:'먼 길을 돌아와도\n따뜻한 밥은 남겨둘게.',title:'엄마의 식탁',type:'식당 앞 손글씨',author:'골목밥집',description:'문 닫은 밥집 앞에서 한참을 서 있었다. 돌아갈 곳이 있다는 건 이런 기분일까.',side:1,z:-33,color:'#efadba'},
 {text:'아무것도 아닌 날들이\n모여, 우리가 된다.',title:'평범한 날들의 기록',type:'벽 위의 낙서',author:'여기를 지나간 사람',description:'멋진 일 하나 없는 날에도, 우리는 조금씩 쌓이고 있는 중.',side:-1,z:-46,color:'#b3cce9'},
 {text:'다음 골목에서도\n우리, 만나요.',title:'골목 끝의 약속',type:'마지막 전단지',author:'또 다른 산책자',description:'길의 끝에서 다음 걸음을 발견했다. 어쩌면 모든 산책은 다시 만나기 위한 약속.',side:1,z:-54,color:'#edc48b'}
];
sentences.push(...[
 {
  "text": "골목을 돌면\n다른 바람이 불어.",
  "title": "모퉁이의 바람",
  "type": "벽 위의 낙서",
  "author": "돌아온 산책자",
  "description": "한 번 꺾었을 뿐인데, 조금 다른 하루가 펼쳐졌다.",
  "axis": "z",
  "x": 0.5,
  "z": -66.92,
  "normal": 1,
  "color": "#a8d7d1"
 },
 {
  "text": "쉬어 가도 돼.\n길은 달아나지 않아.",
  "title": "문구점 옆 쉼표",
  "type": "벽에 붙인 메모",
  "author": "동네 문구점",
  "description": "가게 옆에 붙은 짧은 메모가 발걸음을 잠깐 붙잡았다.",
  "axis": "z",
  "x": 8,
  "z": -57.12,
  "normal": -1,
  "color": "#f6bb86"
 },
 {
  "text": "작은 친절은\n오래 남는 법이야.",
  "title": "담벼락의 친절",
  "type": "손으로 쓴 메모",
  "author": "옆집 사람",
  "description": "골목의 작은 인사가 오래 기억에 남았다.",
  "axis": "z",
  "x": 17,
  "z": -66.92,
  "normal": 1,
  "color": "#f3d477"
 },
 {
  "text": "내일의 걱정은\n내일의 햇빛 아래서.",
  "title": "오후의 약속",
  "type": "벽 위의 낙서",
  "author": "이름 모를 누군가",
  "description": "비스듬한 햇빛 아래, 오늘만 생각해 보기로 했다.",
  "axis": "z",
  "x": 24,
  "z": -66.92,
  "normal": 1,
  "color": "#c2b4e8"
 },
 {
  "text": "마음에도 가끔\n환기가 필요해.",
  "title": "열린 창문 아래",
  "type": "벽에 붙인 메모",
  "author": "창문을 연 사람",
  "description": "열린 창 아래의 종이가 바람에 가만히 흔들리는 것 같았다.",
  "axis": "z",
  "x": 27,
  "z": -57.12,
  "normal": -1,
  "color": "#c1d99b"
 },
 {
  "text": "돌아가는 길에도\n좋은 일이 있어.",
  "title": "멀리 돌아온 선물",
  "type": "동네 알림 종이",
  "author": "또 다른 산책자",
  "description": "지름길을 택했더라면 만나지 못했을 말.",
  "axis": "z",
  "x": 6,
  "z": -66.92,
  "normal": 1,
  "color": "#efadba"
 },
 {
  "text": "이름 없는 하루도\n너의 이야기야.",
  "title": "안쪽 골목의 기록",
  "type": "벽 위의 낙서",
  "author": "오늘을 지나온 사람",
  "description": "조용한 골목 안쪽에서, 평범한 하루의 이름을 찾았다.",
  "axis": "x",
  "x": 27.16,
  "z": -73,
  "normal": 1,
  "color": "#b3cce9"
 },
 {
  "text": "괜찮아.\n다시 시작하면 되지.",
  "title": "다시 시작하는 문장",
  "type": "손으로 쓴 메모",
  "author": "문을 여는 이웃",
  "description": "낡은 벽에 새 종이가 붙었다. 다시 시작하는 일은 이렇게 작아도 괜찮다.",
  "axis": "x",
  "x": 36.84,
  "z": -77.2,
  "normal": -1,
  "color": "#edc48b"
 },
 {
  "text": "별일 없는 안부가\n가장 다정할 때가 있어.",
  "title": "마트 건너편 안부",
  "type": "동네 알림 종이",
  "author": "안부를 묻는 사람",
  "description": "장바구니를 들고 오가는 사람들의 목소리가 떠오르는 문장.",
  "axis": "x",
  "x": 27.16,
  "z": -89,
  "normal": 1,
  "color": "#a8d7d1"
 },
 {
  "text": "멈춘 자리에서도\n꽃은 자라고 있어.",
  "title": "조용한 담의 봄",
  "type": "벽 위의 낙서",
  "author": "봄을 기다리는 사람",
  "description": "앞으로 나아가지 못하는 날에도, 자라는 것들이 있었다.",
  "axis": "x",
  "x": 36.84,
  "z": -93.5,
  "normal": -1,
  "color": "#f3d477"
 },
 {
  "text": "여기까지 온 너에게\n수고했다는 말.",
  "title": "가장 깊은 골목의 위로",
  "type": "벽에 붙인 메모",
  "author": "먼저 걸어온 사람",
  "description": "골목 깊숙이 들어온 걸음을 다정하게 알아봐 주는 말.",
  "axis": "x",
  "x": 27.16,
  "z": -107,
  "normal": 1,
  "color": "#c2b4e8"
 },
 {
  "text": "길의 끝에서도\n이야기는 이어져.",
  "title": "끝에서 만난 문장",
  "type": "마지막 전단지",
  "author": "다음 길을 걷는 사람",
  "description": "막다른 길에서 돌아서는 순간, 지나온 풍경이 다른 이야기가 된다.",
  "axis": "z",
  "x": 32,
  "z": -111.82,
  "normal": 1,
  "color": "#c1d99b"
 }
]);
for(const sentence of sentences){sentence.axis??='x';sentence.x??=sentence.side*2.895*1.55;sentence.normal??=-sentence.side}

let saved=[];try{saved=JSON.parse(localStorage.getItem('alley-sentences-v1')||'[]').filter(n=>Number.isInteger(n)&&n>=0&&n<sentences.length)}catch{}saved=[...new Set(saved)];
let current=0,nearest=0;const keys=new Set();let toastTimer;
function toast(t){$('#toast').textContent=t;$('#toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('show'),2600)}
function updateCollection(){const n=saved.length;$('#count').textContent=String(n).padStart(2,'0');$('#totalCount').textContent=String(sentences.length).padStart(2,'0');$('#headerCount').textContent=n;$('#bookCount').textContent=n;$('#progressDots').innerHTML=sentences.map((_,i)=>`<i class="${i<n?'active':''}"></i>`).join('');$('#bookList').replaceChildren();if(!n){$('#bookList').innerHTML='<div class="empty-book">아직 비어 있는 문장집이에요.<br>골목에서 당신의 첫 문장을 만나보세요.</div>'}saved.forEach((id,i)=>{const el=document.createElement('article');el.className='book-entry';const small=document.createElement('small');small.textContent=`${String(i+1).padStart(2,'0')} / ${sentences[id].type}`;const p=document.createElement('p');p.textContent=sentences[id].text;el.append(small,p);$('#bookList').append(el)});$('#exportButton').disabled=!n}
function openSentence(){if(nearest<0)return;keys.clear();current=nearest;const s=sentences[current];$('#sentenceType').textContent=`발견한 문장 ${String(current+1).padStart(2,'0')} / ${s.type}`;$('#sentenceText').textContent=s.text;$('#sentenceAuthor').textContent='— '+s.author;$('#sentenceDescription').textContent=s.description;$('#paperPreview').style.background=s.color;$('#saveSentence').textContent=saved.includes(current)?'문장집에 담긴 문장 ✓':'수집하기';$('#saveSentence').disabled=saved.includes(current);$('#sentenceDialog').showModal()}
const firstPhotoReflection=Array.from($('#photoReflection').children,p=>p.textContent);
function openSentencePhoto(id){
 keys.clear();resetFootsteps();current=id;
 const sentence=sentences[id],photo=$('#sentencePhoto');
 photo.src=sentence.photo;
 photo.alt=sentence.photoAlt||sentence.text.replaceAll('\n',' ')+'라고 손으로 쓴 골목 안내판 사진';
 $('#photoDialog').setAttribute('aria-label',`${id+1}번 문장의 실제 사진과 감상`);
 $('#photoReflection').replaceChildren(...(sentence.reflection||firstPhotoReflection).map(line=>{const p=document.createElement('p');p.textContent=line;return p}));
 $('#savePhotoSentence').textContent=saved.includes(id)?'수집한 문장 ✓':'수집하기';
 $('#savePhotoSentence').disabled=saved.includes(id);
 $('#photoDialog').showModal();
 $('#photoReflection').focus({preventScroll:true});
}
$('#closePhoto').onclick=()=>$('#photoDialog').close();
function previewSentence(id){
 if(id<0||!sentences[id])return;
 nearest=id;
 if(sentences[id].photo)openSentencePhoto(id);else openSentence();
}
function collectSentence(id){
 if(id<0||!sentences[id])return;
 if(saved.includes(id))return;
 saved.push(id);
 try{localStorage.setItem('alley-sentences-v1',JSON.stringify(saved))}catch{toast('이 브라우저에서는 새로고침 후 저장이 유지되지 않아요.')}
 updateCollection();
 toast(saved.length===sentences.length?'모든 문장을 모았어요. 오늘의 산책이 완성되었어요.':'“'+sentences[id].text.split('\n')[0]+'” 문장을 수집했어요.');
 $('#collectButton').textContent='수집한 문장 보기 ↗';
}

$('#collectButton').onclick=()=>previewSentence(nearest);
$('#savePhotoSentence').onclick=()=>{collectSentence(current);$('#photoDialog').close()};
$('#saveSentence').onclick=()=>{collectSentence(current);$('#sentenceDialog').close()};
$('#openBook').onclick=()=>{keys.clear();updateCollection();$('#bookDialog').showModal()};$('#helpButton').onclick=()=>{keys.clear();$('#helpDialog').showModal()};document.querySelectorAll('[data-close]').forEach(b=>b.onclick=()=>b.closest('dialog').close());document.querySelectorAll('dialog').forEach(d=>{d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close()}})});
$('#exportButton').onclick=async()=>{
 if(!saved.length)return;
 const button=$('#exportButton'),original=button.textContent,ids=[...saved];button.disabled=true;button.textContent='영수증 PDF 만드는 중…';
 try{
  await Promise.all([document.fonts.load('500 43px MinSans'),document.fonts.load('800 57px MinSans')]);
  const receipt=AlleyReceipt.createCanvas(ids.map(id=>sentences[id]),sentences.length);
  const bytes=AlleyReceipt.toPdfBytes(receipt),url=URL.createObjectURL(new Blob([bytes],{type:'application/pdf'}));
  const a=document.createElement('a');a.href=url;a.download='골목의-문장-영수증.pdf';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),60000);
  toast('수집한 문장을 영수증 PDF로 내려받았어요.');
 }catch(error){console.error(error);toast('PDF를 만들지 못했어요. 다시 시도해 주세요.')}
 finally{button.disabled=!saved.length;button.textContent=original}
};updateCollection();
const canvas=$('#world');const gl=canvas.getContext('webgl',{antialias:true,alpha:false});
if(!gl){$('#error').hidden=false;$('#discovery').hidden=true}else{document.fonts.load('500 20px MinSans').catch(()=>{}).then(initWorld).catch(error=>{console.error(error);$('#error').textContent='골목 화면을 불러오지 못했어요. 페이지를 새로고침해 주세요.';$('#error').hidden=false;$('#discovery').hidden=true})}
function initWorld(){
rainEffects=new AlleyRain($('#rainCanvas'));rainEffects.setRain(isRaining);
const inkDerivatives=!!gl.getExtension('OES_standard_derivatives');
const vertex=`precision mediump float;attribute vec3 aPos;attribute vec2 aUV;attribute vec3 aNormal;attribute vec2 aInkUV;uniform mat4 uVP;varying mediump vec2 vUV;varying mediump vec2 vInkUV;varying mediump vec3 vNormal;varying mediump vec3 vWorld;varying mediump float vD;uniform mediump vec3 uCamera;uniform vec3 uOffset;uniform float uYaw;void main(){float c=cos(uYaw),s=sin(uYaw);vec3 p=vec3(c*aPos.x+s*aPos.z,aPos.y,-s*aPos.x+c*aPos.z)+uOffset;vNormal=vec3(c*aNormal.x+s*aNormal.z,aNormal.y,-s*aNormal.x+c*aNormal.z);vWorld=p;gl_Position=uVP*vec4(p,1.);vUV=aUV;vInkUV=aInkUV;vD=distance(p,uCamera);}`;
const fragment=(inkDerivatives?'#extension GL_OES_standard_derivatives : enable\n':'')+`precision mediump float;
varying mediump vec2 vUV;varying mediump vec2 vInkUV;varying mediump vec3 vNormal;varying mediump vec3 vWorld;varying mediump float vD;
uniform sampler2D uTexture;uniform vec3 uTint;uniform vec2 uTexel;uniform float uAccent;uniform float uTrace;uniform float uPuddle;uniform float uWet;uniform float uTime;uniform mediump vec3 uCamera;
float luminance(vec3 c){return dot(c,vec3(.299,.587,.114));}
void main(){
 vec4 material=texture2D(uTexture,vUV);
 if(uTrace>.5){if(material.a<.045)discard;float mark=dot(material.rgb,vec3(.3333));gl_FragColor=vec4(vec3(mix(.94,mark,material.a)),1.);return;}
 if(uPuddle>.5){vec2 q=(vUV-.5)*2.;float r=length(q);float edge=1.-.04*sin(atan(q.y,q.x)*7.);if(r>edge)discard;float ripple=0.;for(int i=0;i<3;i++){float k=float(i);vec2 center=vec2(sin(k*8.4)*.42,cos(k*7.1)*.35);float life=fract(uTime*.7+k*.31);float ring=abs(length(q-center)-life*.65);ripple+=(1.-smoothstep(0.,.018,ring))*(1.-life)*.12;}float wet=.83+.03*sin(vUV.y*22.+sin(vUV.x*14.));wet+=ripple;wet=mix(wet,.40,smoothstep(edge-.035,edge,r));gl_FragColor=vec4(vec3(wet),1.);return;}
 vec3 source=material.rgb*uTint;
 float lum=luminance(source),gray=.32+.68*pow(smoothstep(.16,.67,lum),.36);
 vec3 n=normalize(vNormal);float shade=n.y>.5?1.:mix(.88,1.,smoothstep(-.5,.5,dot(n,normalize(vec3(-.5,.8,.3)))));
 gray*=shade;
 if(vNormal.y>.5&&vWorld.y<.1)gray*=1.-uWet*.085;
 // Two tones of pen hatching in the deeper shadows, anchored to the buildings.
 float hatch=step(.87,fract((vWorld.x+vWorld.z+vWorld.y)*13.));
 gray-=hatch*.09*(1.-smoothstep(.62,.84,gray));
 // Texture edges become fine ink strokes: brick mortar, shop displays and window frames.
 float left=luminance(texture2D(uTexture,vUV-vec2(uTexel.x,0.)).rgb);
 float right=luminance(texture2D(uTexture,vUV+vec2(uTexel.x,0.)).rgb);
 float down=luminance(texture2D(uTexture,vUV-vec2(0.,uTexel.y)).rgb);
 float up=luminance(texture2D(uTexture,vUV+vec2(0.,uTexel.y)).rgb);
 float detailInk=smoothstep(.08,.26,length(vec2(left-right,down-up)));
 gray=mix(gray,.12,detailInk*.82);
 gray=mix(gray,.98,clamp((vD-45.)/180.,0.,.40));
 // The four boundaries of each architectural surface have a real, screen-sized outline.
 float border=0.;
 if(vInkUV.x>-.5){vec2 edge=min(vInkUV,1.-vInkUV);vec2 width=WIDTH_EXPRESSION;vec2 aa=smoothstep(width*.35,width*1.15,edge);border=1.-min(aa.x,aa.y);}
 if(vInkUV.x<-.5)border=1.-smoothstep(.035,.20,abs(dot(n,normalize(uCamera-vWorld))));
 vec3 color=uAccent>.5?source:vec3(gray);
 color=mix(color,vec3(.075),border*.95);
 gl_FragColor=vec4(color,1.);
}`.replace('WIDTH_EXPRESSION',inkDerivatives?'max(fwidth(vInkUV)*.85,vec2(.00001))':'vec2(.003)');
function shader(type,src){const s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(s));return s}const prog=gl.createProgram();gl.attachShader(prog,shader(gl.VERTEX_SHADER,vertex));gl.attachShader(prog,shader(gl.FRAGMENT_SHADER,fragment));gl.linkProgram(prog);if(!gl.getProgramParameter(prog,gl.LINK_STATUS))throw Error('골목 렌더러 연결 실패: '+gl.getProgramInfoLog(prog));gl.useProgram(prog);gl.enable(gl.DEPTH_TEST);const pos=gl.getAttribLocation(prog,'aPos'),uv=gl.getAttribLocation(prog,'aUV'),vp=gl.getUniformLocation(prog,'uVP'),cam=gl.getUniformLocation(prog,'uCamera'),tint=gl.getUniformLocation(prog,'uTint'),offsetUniform=gl.getUniformLocation(prog,'uOffset'),yawUniform=gl.getUniformLocation(prog,'uYaw'),normalAttr=gl.getAttribLocation(prog,'aNormal'),inkAttr=gl.getAttribLocation(prog,'aInkUV'),accentUniform=gl.getUniformLocation(prog,'uAccent'),texelUniform=gl.getUniformLocation(prog,'uTexel'),traceUniform=gl.getUniformLocation(prog,'uTrace'),puddleUniform=gl.getUniformLocation(prog,'uPuddle'),wetUniform=gl.getUniformLocation(prog,'uWet'),timeUniform=gl.getUniformLocation(prog,'uTime');
let seed=47;function rand(){seed=(seed*16807)%2147483647;return(seed-1)/2147483646}
const textureSizes=new Map();const sentenceTextures=new Set();const sentenceTextureIds=new Map(),sentenceTraceTextures=new Map(),traceTextures=new Set(),rainTextures=new Set();
function texture(draw,w=512,h=512){const c=document.createElement('canvas');c.width=w;c.height=h;const ctx=c.getContext('2d');draw(ctx,w,h);const t=gl.createTexture();textureSizes.set(t,[1/w,1/h]);gl.bindTexture(gl.TEXTURE_2D,t);gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,c);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);return t}
const solid=color=>texture((c,w,h)=>{c.fillStyle=color;c.fillRect(0,0,w,h)},8,8);
let sceneScaleX=1.55;const meshes=[];
function quad(points,tex,color=[1,1,1],coords=[0,0,1,0,1,1,0,1],ink=true){
 const p=points.map(v=>[v[0]*sceneScaleX,v[1],v[2]]),a=p[1].map((v,i)=>v-p[0][i]),b=p[2].map((v,i)=>v-p[0][i]);
 let n=[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]],len=Math.hypot(...n)||1;n=n.map(v=>v/len);
 const edges=[[0,0],[1,0],[1,1],[0,1]],arr=[];
 for(const i of [0,1,2,0,2,3])arr.push(...p[i],coords[i*2],coords[i*2+1],...n,...(ink?edges[i]:[-1,-1]));
 meshes.push({data:arr,tex,color});
}
function bindMesh(buffer){
 gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.enableVertexAttribArray(pos);gl.vertexAttribPointer(pos,3,gl.FLOAT,false,40,0);
 gl.enableVertexAttribArray(uv);gl.vertexAttribPointer(uv,2,gl.FLOAT,false,40,12);
 gl.enableVertexAttribArray(normalAttr);gl.vertexAttribPointer(normalAttr,3,gl.FLOAT,false,40,20);
 gl.enableVertexAttribArray(inkAttr);gl.vertexAttribPointer(inkAttr,2,gl.FLOAT,false,40,32);
}
function bindMaterial(tex,color=[1,1,1]){
 const original=tex;if(sentenceTextureIds.has(tex)&&saved.includes(sentenceTextureIds.get(tex)))tex=sentenceTraceTextures.get(tex);
 gl.bindTexture(gl.TEXTURE_2D,tex);gl.uniform3fv(tint,color);gl.uniform2fv(texelUniform,textureSizes.get(tex));gl.uniform1f(accentUniform,sentenceTextures.has(tex)?1:0);gl.uniform1f(traceUniform,traceTextures.has(tex)?1:0);gl.uniform1f(puddleUniform,rainTextures.has(original)?1:0);
}

const solidBoxes=[];
function box(x,y,z,w,h,d,tex,col=[1,1,1]){solidBoxes.push({min:[(x-w/2)*sceneScaleX,y,z-d/2],max:[(x+w/2)*sceneScaleX,y+h,z+d/2]});const a=x-w/2,b=x+w/2,l=z-d/2,r=z+d/2,t=y+h;quad([[a,y,r],[b,y,r],[b,t,r],[a,t,r]],tex,col);quad([[b,y,l],[a,y,l],[a,t,l],[b,t,l]],tex,col);quad([[a,y,l],[a,y,r],[a,t,r],[a,t,l]],tex,col);quad([[b,y,r],[b,y,l],[b,t,l],[b,t,r]],tex,col);quad([[a,t,r],[b,t,r],[b,t,l],[a,t,l]],tex,col)}
const concrete=texture((c,w,h)=>{c.fillStyle='#aaa99a';c.fillRect(0,0,w,h);for(let i=0;i<22000;i++){c.fillStyle=`rgba(${rand()>.5?'255,247,221':'35,45,35'},${rand()*.09})`;c.fillRect(rand()*w,rand()*h,rand()*4+1,1)}for(let i=0;i<8;i++){c.strokeStyle='#838b7c40';c.beginPath();let x=rand()*w,y=rand()*h;c.moveTo(x,y);for(let j=0;j<6;j++){x+=(rand()-.5)*80;y+=rand()*30;c.lineTo(x,y)}c.stroke()}});
const asphalt=texture((c,w,h)=>{c.fillStyle='#7c8078';c.fillRect(0,0,w,h);for(let i=0;i<45000;i++){const a=rand();c.fillStyle=a>.5?'#c8c8b520':'#303b3825';c.fillRect(rand()*w,rand()*h,rand()*2+1,rand()*2+1)}c.strokeStyle='#555e5860';c.lineWidth=2;c.beginPath();c.moveTo(40,0);c.lineTo(93,170);c.lineTo(70,230);c.lineTo(170,400);c.stroke()});
const dark=solid('#424c46'),metal=solid('#778279'),cream=solid('#d4cbbb'),leaf=solid('#4d6649'),pot=solid('#a06c51'),white=solid('#b7b9aa');
// Wall textures contain masonry only. Windows and fixtures are modeled once in 3D.
function facade(color,brick,shop){return texture((c,w,h)=>{
 c.fillStyle=color;c.fillRect(0,0,w,h);
 if(brick){for(let row=0;row<48;row++)for(let j=-1;j<13;j++){
  const x=j*44+(row%2)*22,y=row*11;
  c.fillStyle=['#744b3d','#8a5343','#9d6350','#855346'][Math.floor(rand()*4)];c.fillRect(x+1,y+1,41,9);
 } }else{
 c.fillStyle='#8f938020';for(let i=0;i<70;i++)c.fillRect(rand()*w,rand()*h,rand()*10,rand()*120);
 c.strokeStyle='#74776a';c.lineWidth=1.2;
 for(let y=0;y<h;y+=86){c.beginPath();c.moveTo(0,y);c.lineTo(w,y);c.stroke();for(let x=(Math.round(y/86)%2)*128;x<w;x+=256){c.beginPath();c.moveTo(x,y);c.lineTo(x,y+86);c.stroke()}}
 c.fillStyle='#878b7c';c.fillRect(0,h-38,w,38);c.fillStyle='#b3b4a4';c.fillRect(0,h-41,w,3);
 }
 for(let i=0;i<5000;i++){c.fillStyle=rand()>.5?'#ffffff09':'#202a200a';c.fillRect(rand()*w,rand()*h,2,3)}
})}

quad([[-3,0,16],[3,0,16],[3,0,-62],[-3,0,-62]],asphalt,[1.04,1.02,.97]);
// A repeating road surface retains its fine grain at walking distance.
for(let z=14;z>-62;z-=5)quad([[-2.9,.005,z],[2.9,.005,z],[2.9,.005,z-5],[-2.9,.005,z-5]],asphalt);
const groundPropRequests=[],streetObjects=[];
const shops=[['은혜 세탁소','#356d72'],['동네 수퍼','#447264'],['삼성 비디오','#9b782c'],['금성 전파사','#385f7b'],['콩나물 국밥','#a99535']];
for(let i=0;i<10;i++){const z=10-i*8;for(const side of [-1,1]){if(i===9&&side===1)continue;const tex=facade(i%3===0?'#c8c3af':'#b3ac97',(i+(side===1?1:0))%5!==0,shops[(i+(side===1?2:0))%5]);const height=7.2+rand()*2.0;box(side*6,0,i===8&&side===1?-53.495:z,6,height,i===8&&side===1?6.89:7.9,tex,side===-1?[.94,.91,.83]:[1.07,1.02,.9]);box(side*3,.02,z,.17,.18,8,concrete);box(side*3.03,height-.1,z,.32,.23,8.1,dark);box(side*3.04,.1,z+3.5,.10,height,.1,metal);if(i%2===1)groundPropRequests.push({kind:'plants',x:side*4.13,z,axis:'x'});}}
// The street closes in a softly lit courtyard.
box(0,0,-69,10,8,3,facade('#c7bca5',false,['느린 하루','#697650']));
// utility poles, brackets and overhead lines
function beam(a,b,width,tex){const dx=b[0]-a[0],dy=b[1]-a[1],dz=b[2]-a[2],len=Math.hypot(dx,dz)||1;const sx=-dz/len*width,sz=dx/len*width;quad([[a[0]-sx,a[1],a[2]-sz],[a[0]+sx,a[1],a[2]+sz],[b[0]+sx,b[1],b[2]+sz],[b[0]-sx,b[1],b[2]-sz]],tex)}
for(let z=7;z>-55;z-=20){box(2.55,0,z,.16,8.9,.16,concrete);box(2.5,7.9,z,1.7,.1,.12,dark);box(2.5,6.4,z,.7,.1,.14,dark);box(2.16,6.25,z,.5,.1,.3,cream);for(let k=0;k<6;k++){let prev=[1.8+k*.18,8.05,z];for(let j=1;j<=12;j++){const t=j/12;const next=[1.8+k*.18,8.05-Math.sin(t*Math.PI)*.7,z-t*20];beam(prev,next,.012,dark);prev=next}}for(let k=0;k<4;k++){let prev=[-3,6.7+k*.27,z+k];for(let j=1;j<=12;j++){let t=j/12;let next=[-3+t*6,6.7+k*.27-Math.sin(t*Math.PI)*.7,z+k+t*2];beam(prev,next,.012,dark);prev=next}}}
// drain covers and paint along the edge
for(let z=8;z>-58;z-=12){quad([[-2.4,.014,z],[-2,.014,z],[-2,.014,z-.9],[-2.4,.014,z-.9]],dark);for(let j=0;j<8;j++)quad([[-2.38,.016,z-j*.11],[-2.02,.016,z-j*.11],[-2.02,.016,z-j*.11-.035],[-2.38,.016,z-j*.11-.035]],metal)}
// Early-2000s neighborhood details: projecting signs, tiled awnings and roadside objects.
const ochre=solid('#c9a44f'),wine=solid('#813d32'),bluePlastic=solid('#327f98'),rubber=solid('#283330'),chrome=solid('#9ba69c');
function signTexture(label,bg,fg,vertical=false){return texture((c,w,h)=>{
 c.fillStyle=bg;c.fillRect(0,0,w,h);c.strokeStyle='#d2c7a1';c.lineWidth=8;c.strokeRect(6,6,w-12,h-12);
 for(let j=0;j<1700;j++){c.fillStyle=rand()>.5?'#ffffff12':'#342d1c15';c.fillRect(rand()*w,rand()*h,rand()*4+1,rand()*8+1)}
},vertical?128:512,vertical?512:192)}
const oldSigns=[['은혜세탁','#e3dfc1','#234d67'],['동네수퍼','#277b78','#eee9c4'],['서울이발관','#e6dfb6','#353f57'],['비디오대여','#cbb44d','#38485c'],['콩나물국밥','#e0b843','#274563'],['철학관','#ddd9bc','#2a4770'],['통닭호프','#933d30','#f0d88b'],['금성전파사','#ded6af','#354e60']];
for(let i=0;i<8;i++){
 const side=i%2?1:-1,z=7-i*8;
 const sign=oldSigns[i],vertical=signTexture(...sign,true);
 // Signboards project into the lane, so their lettering can be seen while walking.
 box(side*2.55,3.15,z-.7,.85,2.05,.16,vertical);
 box(side*2.95,3.5,z-.7,.13,1.65,.2,metal);
 const horizontal=signTexture(...sign,false);
 quad([[side*2.88,2.45,z-2.7],[side*2.88,2.45,z-5.3],[side*2.88,3.15,z-5.3],[side*2.88,3.15,z-2.7]],horizontal);
 const canopy=texture((c,w,h)=>{c.fillStyle=i%2?'#3e6b61':'#626f5b';c.fillRect(0,0,w,h);c.fillStyle='#b6b6a335';for(let j=0;j<w;j+=47)c.fillRect(j,0,4,h);c.fillStyle='#263b3740';c.fillRect(0,h-24,w,24)},256,256);
 quad([[side*3,3.25,z-2.5],[side*2.25,2.94,z-2.5],[side*2.25,2.94,z-5.5],[side*3,3.25,z-5.5]],canopy);
 box(side*2.25,2.77,z-4,.06,.18,3,canopy);
 // Terrace railings are built once with the residential facade below.
}
const barber=texture((c,w,h)=>{c.fillStyle='#e5e3d6';c.fillRect(0,0,w,h);for(let i=-6;i<12;i++){c.fillStyle=i%2?'#3b6b85':'#b24538';c.beginPath();c.moveTo(0,i*80);c.lineTo(w,i*80+95);c.lineTo(w,i*80+125);c.lineTo(0,i*80+30);c.fill()}},128,512);
box(2.16,1.9,-9,.22,1.45,.24,barber);box(2.16,1.8,-9,.28,.1,.3,wine);box(2.16,3.35,-9,.28,.1,.3,wine);
const fan=texture((c,w,h)=>{c.fillStyle='#bdbfb1';c.fillRect(0,0,w,h);c.fillStyle='#6f7e77';c.beginPath();c.arc(w/2,h/2,w*.4,0,Math.PI*2);c.fill();c.strokeStyle='#c1c5b8';c.lineWidth=3;for(let r=12;r<110;r+=12){c.beginPath();c.arc(w/2,h/2,r,0,Math.PI*2);c.stroke()}for(let j=0;j<16;j++){let a=j/16*Math.PI*2;c.beginPath();c.moveTo(w/2,h/2);c.lineTo(w/2+Math.cos(a)*108,h/2+Math.sin(a)*108);c.stroke()}},256,256);
for(let i=0;i<6;i++){const side=i%2?1:-1,z=9-i*11;groundPropRequests.push({kind:'bin',x:side*4.16,z:z-1.8,axis:'x'});box(side*2.9,.6,z-2.3,.1,.8,.3,metal)}
// Narrow yellow parking lines and hand-painted road markings.
for(let z=14;z>-61;z-=3){for(const side of [-1,1])quad([[side*2.54,.018,z],[side*2.61,.018,z],[side*2.61,.018,z-2.3],[side*2.54,.018,z-2.3]],ochre)}
const roadPaint=texture((c,w,h)=>{c.fillStyle='#7c8078';c.fillRect(0,0,w,h);for(let i=0;i<6000;i++){c.fillStyle='#29393218';c.fillRect(rand()*w,rand()*h,2,2)}c.fillStyle='#d1d1b4';c.textAlign='center';c.font='bold 95px MinSans';c.fillText('천',w/2,110);c.fillText('천',w/2,230);c.fillText('히',w/2,350);c.beginPath();c.moveTo(115,430);c.lineTo(140,470);c.lineTo(165,430);c.lineTo(148,430);c.lineTo(148,390);c.lineTo(132,390);c.lineTo(132,430);c.fill()},256,512);
quad([[-.55,.022,3],[.55,.022,3],[.55,.022,-1],[-.55,.022,-1]],roadPaint);
function cylinder(x,y,z,r,h,tex){for(let j=0;j<12;j++){const a=j/12*Math.PI*2,b=(j+1)/12*Math.PI*2;quad([[x+Math.cos(a)*r,y,z+Math.sin(a)*r],[x+Math.cos(b)*r,y,z+Math.sin(b)*r],[x+Math.cos(b)*r,y+h,z+Math.sin(b)*r],[x+Math.cos(a)*r,y+h,z+Math.sin(a)*r]],tex)}}
for(let i=0;i<5;i++)groundPropRequests.push({kind:'gas',x:-4.20,z:1-i*13,axis:'x'});

function sentenceTraceTexture(index){
 const tex=texture((c,w,h)=>{
  c.clearRect(0,0,w,h);
  // The middle stays transparent so the real brickwork shows through the missing paper.
  c.strokeStyle='rgba(125,125,125,.15)';c.lineWidth=8;c.setLineDash([21,15,8,26]);c.strokeRect(12,12,w-24,h-24);c.setLineDash([]);
  for(const [x,y,angle] of [[45,7,-.13],[w-101,9,.1],[45,h-30,.08],[w-104,h-29,-.11]]){
   c.save();c.translate(x,y);c.rotate(angle);c.fillStyle='rgba(177,177,177,.85)';c.fillRect(0,0,59,20);c.strokeStyle='rgba(90,90,90,.55)';c.lineWidth=1;c.strokeRect(0,0,59,20);c.restore();
  }
  c.fillStyle='rgba(232,232,232,.9)';c.beginPath();c.moveTo(50,26);c.lineTo(85,26);c.lineTo(69,48);c.lineTo(56,38);c.fill();
 },512,432);traceTextures.add(tex);return tex;
}
function posterTexture(s,i){const tex=texture((c,w,h)=>{c.fillStyle=s.color;c.fillRect(0,0,w,h);for(let j=0;j<5000;j++){c.fillStyle='#675b3610';c.fillRect(rand()*w,rand()*h,2,2)}c.strokeStyle='#8b89665c';c.strokeRect(20,20,w-40,h-40);c.fillStyle='#8b805d';c.textAlign='center';c.font='14px MinSans';c.fillText(i%2?'우리 동네 이야기':'누군가 남긴 마음',w/2,65);c.fillStyle='#4e5545';const lines=s.text.split('\n');let fontSize=i===1?27:34;c.font='bold '+fontSize+'px MinSans';while(fontSize>16&&lines.some(line=>c.measureText(line).width>w-72)){fontSize--;c.font='bold '+fontSize+'px MinSans'}const lineHeight=Math.min(56,190/lines.length);lines.forEach((line,n)=>c.fillText(line,w/2,210+(n-(lines.length-1)/2)*lineHeight));c.fillStyle='#89876d';c.font='14px MinSans';c.fillText('— '+s.author,w/2,350);c.fillStyle='#b7a78480';c.fillRect(w/2-48,0,96,23)},512,432);sentenceTextures.add(tex);sentenceTextureIds.set(tex,i);sentenceTraceTextures.set(tex,sentenceTraceTexture(i));return tex}

// additional small neighborhood paper notices
for(let i=0;i<24;i++){let side=i%2?1:-1,x=side*2.91,z=-rand()*68+12;const tex=texture((c,w,h)=>{c.fillStyle=['#cec8ae','#dbd5bf','#a9b6aa'][i%3];c.fillRect(0,0,w,h);c.fillStyle='#5d6656';c.textAlign='center';c.font='bold 23px MinSans';c.fillText(['분리수거','주차 금지','구인 안내'][i%3],w/2,65);c.font='12px MinSans';c.fillText('깨끗한 우리 동네',w/2,108);for(let j=0;j<5;j++)c.fillRect(30,135+j*12,w-60,3)},256,256);quad([[x,1,z],[x,1,z-.33],[x,1.45,z-.33],[x,1.45,z]],tex)}
sceneScaleX=1;
// The original lane opens into two connected bends, extending the neighborhood.
for(let x=-4.65;x<36.3;x+=5){const end=Math.min(x+5,36.3);quad([[x,.006,-57.7],[end,.006,-57.7],[end,.006,-66.3],[x,.006,-66.3]],asphalt)}
for(let z=-62;z>-112;z-=5)quad([[27.7,.006,z],[36.3,.006,z],[36.3,.006,z-5],[27.7,.006,z-5]],asphalt);
const extensionFacade=facade('#bbb49e',true,['','#587165']),plasterFacade=facade('#c5bda6',false,['','#a28d51']);
for(let x=6;x<27;x+=7){box(x,0,-70.5,6.9,7.5+rand(),7,extensionFacade);box(x===6?7.05:x,0,-53.5,x===6?4.8:6.9,7+rand(),7,plasterFacade);box(x,.02,-66.4,7,.16,.2,concrete);box(x,.02,-57.6,7,.16,.2,concrete)}
box(34,0,-53.5,9,7.6,7,extensionFacade);
for(let z=-73;z>-111;z-=8){for(const side of [-1,1]){const x=32+side*8.5;box(x,0,z,7,7.1+rand()*2,7.9,side===-1?extensionFacade:plasterFacade);box(32+side*4.4,.02,z,.2,.15,8,concrete);box(32+side*4.7,.1,z+3,.09,7,.09,metal);}}
box(32,0,-114,18,8.2,4,plasterFacade);
// A low wall softens the inside corner without closing the walking route.
box(23,0,-69,7,1.15,.3,extensionFacade);
for(let i=0;i<5;i++){box(20+i*1.1,1.15,-69,.42,.35,.42,pot);box(20+i*1.1,1.45,-69,.48,.42,.48,leaf)}
for(let x=6;x<36;x+=3){for(const z of [-58.05,-65.95])quad([[x,.02,z],[x+2,.02,z],[x+2,.02,z-.07],[x,.02,z-.07]],ochre)}
for(let z=-69;z>-109;z-=3){for(const x of [28,36])quad([[x,.02,z],[x+.07,.02,z],[x+.07,.02,z-2],[x,.02,z-2]],ochre)}
for(let z=-71;z>-107;z-=15){box(36,.1,z,.18,8.8,.18,concrete);for(let k=0;k<4;k++){let prev=[35.5+k*.2,8.1,z];for(let j=1;j<=12;j++){const t=j/12,next=[35.5+k*.2,8.1-Math.sin(t*Math.PI)*.6,z-t*15];beam(prev,next,.014,dark);prev=next}}}
for(let k=0;k<5;k++){let prev=[4,7.6,-62+k*.2];for(let j=1;j<=16;j++){let t=j/16,next=[4+t*32,7.6-Math.sin(t*Math.PI)*1.2,-62+k*.2];beam(prev,next,.013,dark);prev=next}}
// Small extinguished cigarette ends gather beside drains and utility poles.
const filterTexture=solid('#b89057'),cigarettePaper=solid('#d3cbb5'),ash=solid('#625e52');
function cigarette(x,z,angle){const length=.095,dx=Math.cos(angle),dz=Math.sin(angle),sx=-dz*.012,sz=dx*.012;
 const point=(t,s)=>[x+dx*t+sx*s,.027,z+dz*t+sz*s];
 for(const [a,b,tex] of [[0,.038,filterTexture],[.038,length,cigarettePaper],[length,length+.009,ash]])quad([point(a,-1),point(b,-1),point(b,1),point(a,1)],tex);
}
for(const [x,z] of [[-3.5,8],[-3.5,-4],[-3.5,-16],[-3.5,-28],[-3.5,-40],[3.95,7],[3.95,-13],[3.95,-33],[36,-71]]){
 for(let i=0;i<5;i++)cigarette(x+(rand()-.5)*.65,z+(rand()-.5)*.85,rand()*Math.PI*2);
}
// A complete sky is shaded behind the scene: blue zenith, bright horizon and drifting clouds.
const skyVertex=`attribute vec2 aSky;varying mediump vec2 vSky;void main(){vSky=aSky;gl_Position=vec4(aSky,1.,1.);}`;
const skyFragment=`precision mediump float;varying mediump vec2 vSky;uniform vec4 uSkyView;uniform float uSkyRain;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1.,0.)),f.x),mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),f.x),f.y);}
void main(){float pitch=uSkyView.y,yaw=uSkyView.z;vec3 local=normalize(vec3(vSky.x*uSkyView.x*.57735,vSky.y*.57735,-1.));float y=local.y*cos(pitch)+local.z*sin(pitch);float z=-local.y*sin(pitch)+local.z*cos(pitch);vec3 ray=vec3(local.x*cos(yaw)-z*sin(yaw),y,local.x*sin(yaw)+z*cos(yaw));
float paper=mix(.94,1.,smoothstep(-.1,.6,y));vec2 p=ray.xz/(max(y,0.)+.22)*2.7+vec2(uSkyView.w*.008,0.);float n=noise(p)*.58+noise(p*2.1)*.28+noise(p*4.3)*.14;float cloud=smoothstep(.48,.73,n)*smoothstep(.03,.3,y);float cloudEdge=smoothstep(.49,.52,n)*(1.-smoothstep(.52,.56,n));paper-=cloud*.035+cloudEdge*.025;vec3 col=vec3(paper*(1.-uSkyRain*.075)-cloud*uSkyRain*.045);gl_FragColor=vec4(col,1.);}`;
const skyProgram=gl.createProgram();gl.attachShader(skyProgram,shader(gl.VERTEX_SHADER,skyVertex));gl.attachShader(skyProgram,shader(gl.FRAGMENT_SHADER,skyFragment));gl.linkProgram(skyProgram);if(!gl.getProgramParameter(skyProgram,gl.LINK_STATUS))throw Error('하늘 렌더러 연결 실패: '+gl.getProgramInfoLog(skyProgram));const skyPos=gl.getAttribLocation(skyProgram,'aSky'),skyView=gl.getUniformLocation(skyProgram,'uSkyView'),skyRain=gl.getUniformLocation(skyProgram,'uSkyRain'),skyBuffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,skyBuffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);
function drawSky(aspect,time){gl.disable(gl.DEPTH_TEST);gl.useProgram(skyProgram);gl.bindBuffer(gl.ARRAY_BUFFER,skyBuffer);gl.enableVertexAttribArray(skyPos);gl.vertexAttribPointer(skyPos,2,gl.FLOAT,false,0,0);gl.uniform4f(skyView,aspect,camera.pitch,camera.yaw,time);gl.uniform1f(skyRain,isRaining?1:0);gl.drawArrays(gl.TRIANGLE_STRIP,0,4)}
// Low-poly street cats have a body, ears, muzzle, tail and four independently moving legs.
const catFur=solid('#b18a63'),catWhite=solid('#d4cdb6'),catStripe=solid('#705c48'),catNose=solid('#75544b'),catEye=solid('#293b30');
function ellipsoid(x,y,z,rx,ry,rz,tex){for(let j=0;j<6;j++){const a=-Math.PI/2+j*Math.PI/6,b=a+Math.PI/6;for(let k=0;k<10;k++){const u=k*Math.PI/5,v=u+Math.PI/5;const p=(lat,lon)=>[x+Math.cos(lat)*Math.cos(lon)*rx,y+Math.sin(lat)*ry,z+Math.cos(lat)*Math.sin(lon)*rz];quad([p(a,u),p(a,v),p(b,v),p(b,u)],tex,[1,1,1],[0,0,1,0,1,1,0,1],false)}}}
const catParts=[];
function catPart(kind,build){const index=meshes.length;build();const raw=meshes.splice(index),groups=new Map();for(const mesh of raw){if(!groups.has(mesh.tex))groups.set(mesh.tex,[]);groups.get(mesh.tex).push(...mesh.data)}for(const [tex,data] of groups){const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(data),gl.STATIC_DRAW);catParts.push({buffer,tex,count:data.length/10,kind})}}
catPart('body',()=>{
 ellipsoid(0,.42,0,.36,.19,.145,catFur);ellipsoid(.35,.59,0,.16,.16,.13,catFur);ellipsoid(.46,.54,0,.09,.065,.1,catWhite);
 for(const side of [-1,1]){quad([[.24,.66,side*.11],[.35,.81,side*.1],[.43,.66,side*.11],[.24,.66,side*.11]],catFur);quad([[.28,.68,side*.113],[.35,.77,side*.104],[.39,.68,side*.113],[.28,.68,side*.113]],catNose);ellipsoid(.44,.64,side*.102,.019,.024,.014,catEye)}
 ellipsoid(.53,.56,0,.015,.018,.025,catNose);
 for(let i=0;i<3;i++)ellipsoid(-.18+i*.14,.56,0,.025,.043,.145,catStripe);
 for(let i=0;i<7;i++)ellipsoid(-.32-i*.065,.43+i*.044,Math.sin(i*.4)*.03,.055,.04,.036,i%2?catStripe:catFur);
});
for(let i=0;i<4;i++)catPart(i,()=>{const x=i<2?.23:-.23,z=i%2?.1:-.1;ellipsoid(x,.22,z,.045,.18,.045,catFur);ellipsoid(x+.025,.065,z,.065,.04,.047,catWhite)});
function drawCats(time){
 for(let cat=0;cat<2;cat++){
  const phase=(time*.12+cat*.43)%2,forward=phase<1,walk=forward?phase:2-phase;
  const x=cat===0?-4.25+walk*8.5:6+walk*19,z=cat===0?4+Math.sin(walk*Math.PI)*.6:-62;
  const yaw=forward?0:Math.PI;
  updateCatVoice(cat,x,z,camera,!document.querySelector('dialog[open]')&&!document.hidden);
  gl.uniform1f(yawUniform,yaw);
  for(const part of catParts){let dx=0,dy=0;if(typeof part.kind==='number'){const swing=Math.sin(time*9+(part.kind===0||part.kind===3?0:Math.PI));dx=swing*.065;dy=Math.max(0,swing)*.055}else dy=Math.sin(time*18)*.008;
   gl.uniform3f(offsetUniform,x+dx,dy,z);bindMesh(part.buffer);bindMaterial(part.tex);gl.drawArrays(gl.TRIANGLES,0,part.count);
  }
 }
 gl.uniform3f(offsetUniform,0,0,0);gl.uniform1f(yawUniform,0);
}

// Real geometry gives the quieter residential facades the same depth as the shops.
const windowGlass=texture((c,w,h)=>{const g=c.createLinearGradient(0,0,w,h);g.addColorStop(0,'#9bafa9');g.addColorStop(.42,'#405e60');g.addColorStop(1,'#78908a');c.fillStyle=g;c.fillRect(0,0,w,h);c.fillStyle='#c7c3a68a';c.fillRect(8,0,w*.25,h);c.fillStyle='#d5d5b318';for(let j=0;j<8;j++)c.fillRect(12+j*7,0,3,h);c.fillStyle='#203d3b40';c.fillRect(w*.64,0,w*.36,h)},256,256);
const shutter=texture((c,w,h)=>{c.fillStyle='#8c9688';c.fillRect(0,0,w,h);for(let j=0;j<h;j+=12){c.fillStyle='#424f4955';c.fillRect(0,j,w,3);c.fillStyle='#c9c9af55';c.fillRect(0,j+3,w,2)}c.fillStyle='#263b3550';c.fillRect(w/2-18,h*.67,36,9)},256,256);
const weatheredDoor=solid('#506a61');
function residentialDetails(x,z,axis,normal,width,height,variant){
 function fixture(u,y,out,w,h,depth,tex){const px=axis==='x'?x+normal*out:x+u,pz=axis==='x'?z+u:z+normal*out;box(px,y,pz,axis==='x'?depth:w,h,axis==='x'?w:depth,tex)}
 for(const y of [3.55,5.65])for(const u of [-width*.25,width*.25]){
  fixture(u,y,.07,1.62,1.38,.13,cream);fixture(u,y+.06,.15,1.43,1.23,.035,windowGlass);
  fixture(u,y+.06,.18,.045,1.23,.04,chrome);fixture(u,y+.64,.18,1.43,.035,.04,chrome);
  fixture(u,y-.06,.19,1.82,.09,.32,dark);
  if(variant%2===0){for(let k=0;k<6;k++)fixture(u-.67+k*.27,y+.02,.28,.025,.54,.025,metal);fixture(u,y+.54,.28,1.4,.025,.025,metal)}
 }
 // Rainwater pipes, joints, meter cupboard, shutters, and a shallow porch.
 fixture(width*.45,.15,.11,.07,height-.15,.07,metal);
 for(let y=1;y<height;y+=1.8)fixture(width*.45,y,.13,.13,.06,.11,dark);
 fixture(-width*.41,.65,.16,.4,.58,.22,white);fixture(-width*.41,.82,.29,.28,.2,.02,dark);
 fixture(width*.24,.12,.09,1.3,1.9,.08,variant%2?shutter:weatheredDoor);
 fixture(width*.24,2.03,.2,1.55,.12,.45,concrete);
 fixture(-width*.24,.3,.15,1.25,.6,.04,dark);
 for(let k=0;k<8;k++)fixture(-width*.24-.54+k*.15,.32,.18,.025,.56,.02,metal);
 // One complete wall-mounted unit: casing back flush with the wall, grille on its front.
 const acU=-width*.30,acDepth=.50;
 fixture(acU,2.58,acDepth/2,.95,.65,acDepth,white);
 const fanPoint=(u,y)=>axis==='x'?[x+normal*(acDepth+.0015),y,z+u]:[x+u,y,z+normal*(acDepth+.0015)];
 quad([fanPoint(acU-.385,2.63),fanPoint(acU+.385,2.63),fanPoint(acU+.385,3.15),fanPoint(acU-.385,3.15)],fan);
 fixture(acU-.34,2.48,.22,.05,.12,.60,dark);
 fixture(acU+.34,2.48,.22,.05,.12,.60,dark);
 fixture(acU+.55,1.7,.065,.045,1.25,.045,metal);
 // Rooftop coping and thin terrace railings.
 fixture(0,height,.1,width+.2,.13,.26,concrete);
 for(let k=0;k<12;k++)fixture(-width*.46+k*width*.084,height+.12,.06,.035,.66,.035,chrome);
 fixture(0,height+.76,.06,width,.035,.035,chrome);
 if(variant%3===0){fixture(-width*.20,2.71,.52,2.35,.15,1.0,leaf);fixture(-width*.20,2.64,1.0,2.35,.12,.05,leaf)}
}
for(let i=0;i<10;i++){for(const side of [-1,1]){if(i===9&&side===1)continue;residentialDetails(side*4.65,i===8&&side===1?-53.495:10-i*8,'x',-side,i===8&&side===1?6.7:7.7,7.45,i+(side===1?1:0))}}
for(let i=0;i<3;i++){const x=6+i*7;residentialDetails(x,-67,'z',1,6.7,7.5,i);residentialDetails(x===6?7.05:x,-57,'z',-1,x===6?4.6:6.7,7.1,i+1)}
residentialDetails(34,-57,'z',-1,8.7,7.6,2);
for(let i=0;i<5;i++){const z=-73-i*8;residentialDetails(27,z,'x',1,7.7,7.55,i);residentialDetails(37,z,'x',-1,7.7,7.8,i+1)}
residentialDetails(32,-112,'z',1,10,8.2,1);
// Pigeons wander in small groups, bob their heads, peck and step away from the walker.
const pigeonBody=solid('#7b8589'),pigeonWing=solid('#647077'),pigeonBand=solid('#414f56'),pigeonNeck=solid('#4b716b'),pigeonFoot=solid('#ad7767'),pigeonBeak=solid('#c1bca8');
const pigeonParts=[];
function pigeonPart(kind,build){const start=meshes.length;build();const raw=meshes.splice(start),groups=new Map();for(const mesh of raw){if(!groups.has(mesh.tex))groups.set(mesh.tex,[]);groups.get(mesh.tex).push(...mesh.data)}for(const [tex,data] of groups){const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(data),gl.STATIC_DRAW);pigeonParts.push({buffer,tex,count:data.length/10,kind})}}
pigeonPart('body',()=>{ellipsoid(0,.23,0,.19,.15,.11,pigeonBody);for(const side of [-1,1]){ellipsoid(-.035,.25,side*.082,.15,.09,.035,pigeonWing);for(let i=0;i<2;i++)ellipsoid(-.07+i*.08,.27,side*.111,.019,.062,.008,pigeonBand)}box(-.23,.15,0,.19,.025,.13,pigeonBand)});
pigeonPart('head',()=>{ellipsoid(.10,.36,0,.071,.13,.07,pigeonNeck);ellipsoid(.15,.46,0,.085,.08,.073,pigeonBand);ellipsoid(.23,.44,0,.055,.022,.025,pigeonBeak);for(const side of [-1,1])ellipsoid(.18,.48,side*.063,.012,.014,.007,catEye)});
for(let i=0;i<2;i++)pigeonPart(i,()=>{box(.015,.035,i?-.055:.055,.021,.11,.018,pigeonFoot);box(.045,.025,i?-.055:.055,.085,.014,.045,pigeonFoot)});
const pigeons=[[-2.1,6,.3],[-1.5,5.6,1.7],[-2.4,5,3.1],[1.7,-21,.9],[2.3,-21.8,2.2],[16,-61,1.3],[17,-62,3.6]];
function drawPigeons(time){
 for(const [homeX,homeZ,phase] of pigeons){
  let x=homeX+Math.sin(time*.38+phase)*.48,z=homeZ+Math.cos(time*.30+phase)*.38;
  const near=Math.hypot(camera.x-x,camera.z-z)<1.5,activity=(time+phase*2)%6,peck=activity>3.6;
  if(near){const dx=x-camera.x,dz=z-camera.z,norm=Math.hypot(dx,dz)||1;x+=dx/norm*.65;z+=dz/norm*.65}
  const yaw=-Math.atan2(-Math.sin(time*.30+phase)*.114,Math.cos(time*.38+phase)*.1824),step=time*(near?16:9)+phase;
  gl.uniform1f(yawUniform,yaw);
  for(const part of pigeonParts){let bob=0,forward=0;if(typeof part.kind==='number'){const swing=Math.sin(step+part.kind*Math.PI);forward=swing*.035;bob=Math.max(0,swing)*.025}else if(part.kind==='head'){bob=peck?-.14*(.5+.5*Math.sin(time*6+phase)):Math.sin(step)*.018;forward=peck?.055:Math.sin(step)*.014}
   gl.uniform3f(offsetUniform,x+Math.cos(yaw)*forward,bob,z-Math.sin(yaw)*forward);bindMesh(part.buffer);bindMaterial(part.tex);gl.drawArrays(gl.TRIANGLES,0,part.count);
  }
 }
 gl.uniform3f(offsetUniform,0,0,0);gl.uniform1f(yawUniform,0);
}

// Continuous perimeter blocks enclose every street edge, including both bends.
// These backing buildings sit just behind existing facades, closing seams and open corners.
const enclosureBuildings=[];
function perimeterBlock(x,z,w,d,h,tex){box(x,0,z,w,h,d,tex);enclosureBuildings.push({x,z,w,d,h})}
function encloseX(wallX,z0,z1,outward){const count=Math.ceil((z1-z0)/7),step=(z1-z0)/count;for(let i=0;i<count;i++){const z=z0+(i+.5)*step;perimeterBlock(wallX+outward*4,z,8,step+.10,7.6+(i%3)*.55,i%3===1?plasterFacade:extensionFacade)}}
function encloseZ(wallZ,x0,x1,outward){const count=Math.ceil((x1-x0)/7),step=(x1-x0)/count;for(let i=0;i<count;i++){const x=x0+(i+.5)*step;perimeterBlock(x,wallZ+outward*4,step+.10,8,7.7+(i%3)*.5,i%3===2?plasterFacade:extensionFacade)}}
encloseX(-4.71,-67.1,16.2,-1);encloseX(4.71,-57,16.2,1);
encloseZ(-67.06,-4.71,27.06,-1);encloseZ(-56.94,4.65,37.06,1);
encloseX(26.94,-112.06,-67,-1);encloseX(37.06,-112.06,-57,1);
encloseZ(-112.06,26.94,37.06,-1);encloseZ(16.2,-4.71,4.71,1);
// A grounded neighborhood beyond the roofs also replaces any distant sky-colored void.
for(let x=-22;x<58;x+=8)for(let z=-136;z<36;z+=8)quad([[x,-.055,z],[x+8,-.055,z],[x+8,-.055,z+8],[x,-.055,z+8]],concrete);
// Small shops are recognizable through their displays, without lettering on their signs.
const shopFrame=solid('#dad2bc'),salonPink=solid('#ac817e'),salonSeat=solid('#744c4c'),shopBlue=solid('#607e91'),marketGreen=solid('#62836d'),notebookRed=solid('#b2624c'),notebookBlue=solid('#5f8394'),notebookYellow=solid('#c7ab63'),shelfWood=solid('#967b58'),bottleGreen=solid('#577b59');
const stationeryDisplay=texture((c,w,h)=>{
 c.fillStyle='#cfc7ae';c.fillRect(0,0,w,h);c.fillStyle='#4a594e';c.fillRect(16,12,w-32,h-24);
 for(let row=0;row<3;row++){for(let j=0;j<12;j++){const x=25+j*37,y=25+row*100;c.fillStyle=['#b9624e','#d8bc70','#6f96a2','#c9c5ad'][j%4];c.fillRect(x,y,25,77);c.fillStyle='#eee6ce';c.fillRect(x+4,y+13,17,4);c.fillRect(x+4,y+22,17,2)}c.fillStyle='#a88e64';c.fillRect(12,107+row*100,w-24,9)}
},512,384);
const salonDisplay=texture((c,w,h)=>{
 const g=c.createLinearGradient(0,0,w,h);g.addColorStop(0,'#b1bcb2');g.addColorStop(1,'#526b6b');c.fillStyle=g;c.fillRect(0,0,w,h);
 for(let i=0;i<3;i++){const x=22+i*164;c.fillStyle='#af8981';c.fillRect(x,18,143,210);c.fillStyle='#bcc9bf';c.fillRect(x+8,26,127,194);c.fillStyle='#78908c';c.fillRect(x+18,36,35,170);c.fillStyle='#8d705b';c.fillRect(x-5,232,153,13);for(let j=0;j<4;j++){c.fillStyle=['#e6d8bb','#b5807b','#6e8977'][j%3];c.fillRect(x+j*29+9,207,15,25)}c.fillStyle='#6b4846';c.fillRect(x+35,270,75,64);c.fillStyle='#a9b6ad';c.fillRect(x+69,334,7,32);c.fillRect(x+36,366,74,5)}
},512,384);
const marketDisplay=texture((c,w,h)=>{
 c.fillStyle='#384f45';c.fillRect(0,0,w,h);
 for(let row=0;row<4;row++){for(let i=0;i<18;i++){const x=14+i*27,y=20+row*85;c.fillStyle=['#ba6750','#c5b775','#789874','#c4bda7','#668d9c'][i%5];c.fillRect(x,y+12,17,52);c.fillRect(x+4,y+3,9,12);c.fillStyle='#e7dcc1';c.fillRect(x+2,y+31,13,14)}c.fillStyle='#a1a791';c.fillRect(8,81+row*85,w-16,7)}
},512,384);
function neighborhoodShop(kind,x,z,axis,normal,width){
 const facadePoint=(u,y,out)=>axis==='x'?[x+normal*out,y,z+u]:[x+u,y,z+normal*out];
 function fitting(u,y,out,w,h,depth,tex){const p=facadePoint(u,y,out);box(p[0],p[1],p[2],axis==='x'?depth:w,h,axis==='x'?w:depth,tex)}
 function panel(u,y,out,w,h,tex){quad([facadePoint(u-w/2,y,out),facadePoint(u+w/2,y,out),facadePoint(u+w/2,y+h,out),facadePoint(u-w/2,y+h,out)],tex)}
 const accent=kind==='stationery'?shopBlue:kind==='salon'?salonPink:marketGreen;
 fitting(0,.08,.09,width,2.92,.16,shopFrame);
 // Two shop windows and a narrow framed glass entrance cover the old residential frontage.
 fitting(-width*.20,.27,.20,width*.49,2.13,.04,dark);
 panel(-width*.20,.34,.235,width*.47,1.98,kind==='stationery'?stationeryDisplay:kind==='salon'?salonDisplay:marketDisplay);
 fitting(width*.33,.17,.22,width*.23,2.30,.06,weatheredDoor);
 panel(width*.33,.33,.265,width*.19,1.94,windowGlass);
 fitting(width*.23,.25,.29,.045,2.1,.05,chrome);fitting(width*.42,.25,.29,.045,2.1,.05,chrome);
 fitting(width*.38,1.04,.32,.025,.31,.05,cream);
 fitting(-width*.20,1.34,.28,width*.48,.045,.04,shopFrame);
 fitting(0,2.48,.27,width+.14,.50,.18,accent);
 fitting(0,2.98,.40,width+.35,.14,.80,accent);fitting(0,2.83,.80,width+.35,.16,.04,accent);
 // Blank projecting sign and the weathered doorstep remain consistent with the alley.
 fitting(-width*.45,3.1,.51,.48,1.04,.16,accent);
 fitting(0,.015,.38,width+.10,.10,.75,concrete);
 if(kind==='stationery'){
  for(let i=0;i<3;i++){const u=-width*.40+i*.43;fitting(u,.16,.62,.34,.10,.43,shelfWood);for(let j=0;j<4;j++)fitting(u-.12+j*.08,.27,.65,.055,.30+(j%2)*.07,.18,[notebookRed,notebookBlue,notebookYellow][(i+j)%3])}
  fitting(-width*.47,.15,.85,.34,1.25,.18,metal);for(let i=0;i<6;i++)fitting(-width*.47,.29+i*.17,.96,.27,.12,.06,i%2?notebookYellow:notebookBlue);
 }else if(kind==='salon'){
  fitting(-width*.40,.12,.58,.34,.54,.34,pot);for(let i=0;i<4;i++)fitting(-width*.40+(i%2?-.09:.09),.62+i*.12,.58,.27,.30,.24,leaf);
  fitting(width*.43,.20,.58,.14,1.62,.14,chrome);fitting(width*.43,1.77,.58,.31,.19,.31,cream);
  // A pair of scissors in relief replaces a written beauty-salon sign.
  const p=facadePoint(0,2.73,.38);ellipsoid(p[0],p[1],p[2],axis==='x'?.023:.10,.10,axis==='x'?.10:.023,chrome);
  const p2=facadePoint(.24,2.73,.38);ellipsoid(p2[0],p2[1],p2[2],axis==='x'?.023:.10,.10,axis==='x'?.10:.023,chrome);
 }else{
  for(let i=0;i<4;i++){const u=-width*.4+i*.5;fitting(u,.13,.74,.43,.25,.48,i%2?bluePlastic:marketGreen);for(let j=0;j<6;j++){const p=facadePoint(u+(j%3-1)*.11,.44,.64+Math.floor(j/3)*.15);ellipsoid(p[0],p[1],p[2],.062,.061,.062,j%2?notebookRed:notebookYellow)}}
  fitting(width*.44,.14,.56,.53,1.65,.44,cream);panel(width*.44,.34,.80,.4,1.3,marketDisplay);
 }
}
// Shop fronts occupy filled corners and selected blocks, leaving collectible wall papers exposed.
neighborhoodShop('stationery',12,-67,'z',1,5.5);
neighborhoodShop('salon',21,-57,'z',-1,5.6);
neighborhoodShop('market',37,-86,'x',-1,6.1);
neighborhoodShop('market',-4.65,-22,'x',1,5.1);
neighborhoodShop('stationery',4.65,-38,'x',-1,4.6);
neighborhoodShop('salon',27,-101,'x',1,5.8);

// Vehicles are built at real proportions after the street-width transform has finished.
const vehicleStats={scooters:0,bicycles:0,wheels:0};
const bikeFrame=solid('#75837d'),seatCover=solid('#363b39'),lampGlass=solid('#e1e3db');
function parkedVehicle(origin,yaw,lean=0){
 const turn=p=>{const xx=p[0]*Math.cos(lean)-p[1]*Math.sin(lean),yy=p[0]*Math.sin(lean)+p[1]*Math.cos(lean);return[origin[0]+xx*Math.cos(yaw)+p[2]*Math.sin(yaw),yy+.008,origin[1]-xx*Math.sin(yaw)+p[2]*Math.cos(yaw)]};
 const face=(points,tex,ink=false)=>quad(points.map(turn),tex,[1,1,1],[0,0,1,0,1,1,0,1],ink);
 function tube(a,b,r,tex,sides=7){
  const d=b.map((v,i)=>v-a[i]),length=Math.hypot(...d);if(length<.00001)return;
  const n=d.map(v=>v/length),ref=Math.abs(n[1])>.9?[1,0,0]:[0,1,0];
  let u=[n[1]*ref[2]-n[2]*ref[1],n[2]*ref[0]-n[0]*ref[2],n[0]*ref[1]-n[1]*ref[0]],ul=Math.hypot(...u);u=u.map(v=>v/ul);
  const v=[n[1]*u[2]-n[2]*u[1],n[2]*u[0]-n[0]*u[2],n[0]*u[1]-n[1]*u[0]],point=(p,t)=>p.map((c,i)=>c+r*(Math.cos(t)*u[i]+Math.sin(t)*v[i]));
  for(let j=0;j<sides;j++){const t=j/sides*Math.PI*2,t2=(j+1)/sides*Math.PI*2;face([point(a,t),point(a,t2),point(b,t2),point(b,t)],tex)}
 }
 function ring(center,r,thickness,tex,segments=28,arc=[0,Math.PI*2]){
  const p=(a,b)=>[center[0]+Math.sin(b)*thickness,center[1]+Math.cos(a)*(r+Math.cos(b)*thickness),center[2]+Math.sin(a)*(r+Math.cos(b)*thickness)];
  for(let i=0;i<segments;i++)for(let j=0;j<6;j++){const a=arc[0]+(arc[1]-arc[0])*i/segments,b=arc[0]+(arc[1]-arc[0])*(i+1)/segments,c=j*Math.PI/3,d=(j+1)*Math.PI/3;face([p(a,c),p(a,d),p(b,d),p(b,c)],tex)}
 }
 function oval(center,radii,tex){const p=(a,b)=>[center[0]+Math.cos(a)*Math.cos(b)*radii[0],center[1]+Math.sin(a)*radii[1],center[2]+Math.cos(a)*Math.sin(b)*radii[2]];for(let j=0;j<6;j++)for(let k=0;k<12;k++){const a=-Math.PI/2+j*Math.PI/6,b=a+Math.PI/6,u=k*Math.PI/6,v=u+Math.PI/6;face([p(a,u),p(a,v),p(b,v),p(b,u)],tex)}}
 function cuboid(x,y,z,w,h,d,tex){const a=x-w/2,b=x+w/2,c=z-d/2,e=z+d/2,t=y+h;for(const p of [[[a,y,e],[b,y,e],[b,t,e],[a,t,e]],[[b,y,c],[a,y,c],[a,t,c],[b,t,c]],[[a,y,c],[a,y,e],[a,t,e],[a,t,c]],[[b,y,e],[b,y,c],[b,t,c],[b,t,e]],[[a,t,e],[b,t,e],[b,t,c],[a,t,c]]])face(p,tex,true)}
 function wheel(z,r,thin=false){vehicleStats.wheels++;const y=r+.025,center=[0,y,z];ring(center,r-(thin?.022:.05),thin?.022:.05,rubber);for(const side of [-1,1]){const x=side*(thin?.023:.049);ring([x,y,z],r*(thin?.89:.66),thin?.008:.014,chrome);const spokes=thin?16:5;for(let j=0;j<spokes;j++){const a=j/spokes*Math.PI*2;tube([x,y,z],[x,y+Math.cos(a)*r*(thin?.87:.63),z+Math.sin(a)*r*(thin?.87:.63)],thin?.0032:.014,metal,5)}}tube([-.075,y,z],[.075,y,z],thin?.025:.045,metal);return center}
 return{turn,face,tube,ring,oval,cuboid,wheel};
}
function addScooter(x,z,yaw,delivery=false){
 vehicleStats.scooters++;const v=parkedVehicle([x,z],yaw,.035),r=.285,front=-.66,rear=.66;
 v.wheel(front,r);v.wheel(rear,r);
 // Rounded engine cowling, step-through floor, contoured saddle and leg shield.
 v.oval([0,.55,.38],[.245,.205,.42],wine);v.oval([0,.79,.30],[.225,.067,.39],seatCover);
 v.cuboid(0,.34,-.08,.41,.055,.68,metal);v.cuboid(0,.395,-.08,.35,.014,.52,seatCover);
 v.oval([0,.67,-.47],[.235,.32,.13],wine);v.oval([0,.95,-.55],[.16,.14,.11],wine);
 for(const side of [-1,1]){v.tube([side*.064,.31,front],[side*.064,1.08,-.55],.025,chrome);v.tube([side*.16,.53,.50],[side*.10,.32,rear],.027,metal)}
 v.ring([0,r+.025,front],r+.057,.028,wine,15,[-1.25,1.25]);v.ring([0,r+.025,rear],r+.053,.027,wine,15,[-1.2,1.2]);
 v.tube([0,.87,-.50],[0,1.14,-.59],.032,metal);v.tube([-.32,1.145,-.59],[.32,1.145,-.59],.022,chrome);
 for(const side of [-1,1]){v.tube([side*.23,1.145,-.59],[side*.34,1.145,-.59],.031,seatCover);v.tube([side*.25,1.15,-.61],[side*.31,1.38,-.63],.010,chrome);v.oval([side*.32,1.40,-.64],[.083,.052,.024],chrome);v.oval([side*.32,1.40,-.666],[.067,.039,.008],lampGlass)}
 v.oval([0,1.10,-.65],[.135,.105,.10],chrome);v.oval([0,1.105,-.738],[.11,.079,.018],lampGlass);
 v.oval([0,.66,.78],[.11,.045,.025],seatCover);
 // Exhaust, rear carrier, small plate and a stand that reaches the road.
 v.tube([.21,.25,.31],[.21,.25,.86],.055,dark);v.tube([.21,.25,.86],[.21,.25,.92],.029,chrome);
 for(const side of [-1,1])v.tube([side*.16,.71,.65],[side*.16,.89,.89],.014,metal);
 v.tube([-.18,.89,.90],[.18,.89,.90],.014,metal);v.cuboid(0,.45,.91,.19,.12,.016,cream);
 v.tube([-.12,.35,.24],[-.28,.008,.32],.015,metal);
 if(delivery){v.cuboid(0,.90,.82,.44,.31,.42,leaf);v.cuboid(0,1.21,.82,.46,.035,.44,dark);for(let i=0;i<3;i++)v.tube([-.225,.97+i*.065,.61],[-.225,.97+i*.065,1.03],.007,metal)}
}
function addBicycle(x,z,yaw,basket=false){
 vehicleStats.bicycles++;const v=parkedVehicle([x,z],yaw,.065),rear=[0,.36,.86],front=[0,.36,-.86],bottom=[0,.36,.1],seat=[0,.91,.34],head=[0,.96,-.54],neck=[0,.76,-.60];
 v.wheel(.86,.335,true);v.wheel(-.86,.335,true);
 for(const [a,b] of [[bottom,seat],[seat,head],[head,neck],[neck,bottom],[seat,rear],[rear,bottom]])v.tube(a,b,.017,bikeFrame);
 for(const side of [-1,1]){v.tube([side*.045,.36,-.86],[side*.035,.76,-.60],.014,metal);v.tube([side*.045,.36,.86],[side*.033,.36,.1],.012,metal)}
 v.tube(seat,[0,1.015,.39],.013,chrome);v.oval([0,1.025,.39],[.135,.035,.20],seatCover);
 v.tube(head,[0,1.115,-.59],.016,chrome);v.tube([-.27,1.13,-.65],[.27,1.13,-.65],.014,chrome);
 for(const side of [-1,1]){v.tube([side*.22,1.13,-.65],[side*.30,1.12,-.58],.022,seatCover);v.tube([side*.23,1.12,-.62],[side*.18,1.1,-.72],.007,metal)}
 // Cranks, pedals, chain, thin mudguards and a wire luggage rack.
 v.ring([.05,.36,.1],.087,.012,metal,18);v.tube([-.13,.36,.1],[.13,.36,.1],.020,chrome);
 for(const side of [-1,1]){const p=[side*.13,.36+side*.10,.1+side*.06];v.tube([side*.13,.36,.1],p,.011,chrome);v.cuboid(side*.17,p[1]-.012,p[2],.12,.025,.075,seatCover)}
 v.tube([.055,.44,.1],[.055,.40,.86],.004,dark);v.tube([.055,.28,.1],[.055,.32,.86],.004,dark);
 for(const zz of [-.86,.86])v.ring([0,.36,zz],.355,.009,metal,20,[-1.35,1.35]);
 for(const side of [-1,1]){v.tube([side*.06,.40,.86],[side*.11,.78,.80],.008,metal);v.tube([side*.11,.78,.55],[side*.11,.78,1.06],.008,metal)}
 for(let i=0;i<4;i++)v.tube([-.11,.78,.56+i*.15],[.11,.78,.56+i*.15],.006,metal);
 v.tube([-.04,.36,.1],[-.23,.006,.27],.009,metal);
 // The curved brake cable is separate from the heavier frame tubes.
 let previous=[.16,1.11,-.66];for(let i=1;i<=10;i++){const t=i/10,next=[.16*(1-t),1.11-.42*t+.10*Math.sin(t*Math.PI),-.66-.10*Math.sin(t*Math.PI)];v.tube(previous,next,.003,dark,5);previous=next}
 if(basket){for(const side of [-1,1])v.tube([side*.08,.75,-.61],[side*.13,.86,-.79],.008,metal);for(const y of [.86,1.12])for(const [a,b] of [[[-.19,y,-1.09],[.19,y,-1.09]],[[.19,y,-1.09],[.19,y,-.77]],[[.19,y,-.77],[-.19,y,-.77]],[[-.19,y,-.77],[-.19,y,-1.09]]])v.tube(a,b,.008,metal);for(let i=0;i<6;i++)for(const zz of [-1.09,-.77])v.tube([-.19+i*.076,.86,zz],[-.19+i*.076,1.12,zz],.0045,metal);for(let i=0;i<4;i++)for(const xx of [-.19,.19])v.tube([xx,.86,-1.09+i*.107],[xx,1.12,-1.09+i*.107],.0045,metal);for(let i=0;i<5;i++)v.tube([-.19+i*.095,.86,-1.09],[-.19+i*.095,.86,-.77],.005,metal)}
}
// One placement system for freestanding objects; model parts may touch within an object,
// but separate objects must have a visible gap from each other and from fixed fixtures.
function overlapsVolume(a,b,padding=.09){return a.min[0]<b.max[0]+padding&&a.max[0]>b.min[0]-padding&&a.min[1]<b.max[1]-.015&&a.max[1]>b.min[1]+.015&&a.min[2]<b.max[2]+padding&&a.max[2]>b.min[2]-padding}
function insideStreetFloor(x,z){return(x>=-4.53&&x<=4.53&&z>=-66.15&&z<=14)||(x>=-4.53&&x<=36.15&&z>=-66.15&&z<=-57.85)||(x>=27.85&&x<=36.15&&z>=-111.8&&z<=-57.85)}
function placeStreetObject(name,kind,x,z,axis,build){
 const meshStart=meshes.length,boxStart=solidBoxes.length;build();
 const objectMeshes=meshes.slice(meshStart),ownBoxes=solidBoxes.splice(boxStart);
 const min=[Infinity,Infinity,Infinity],max=[-Infinity,-Infinity,-Infinity];
 for(const mesh of objectMeshes)for(let i=0;i<mesh.data.length;i+=10)for(let k=0;k<3;k++){min[k]=Math.min(min[k],mesh.data[i+k]);max[k]=Math.max(max[k],mesh.data[i+k])}
 const obstacles=solidBoxes.filter(box=>box.max[1]>.10&&box.min[1]<max[1]&&box.max[1]>min[1]);
 const along=[0];for(let d=.45;d<=10.81;d+=.45)along.push(d,-d);
 const inward=axis==='z'?(z<-62?1:-1):(x<0?1:x>20?Math.sign(32-x):-1);
 let placement=null;
 const candidates=[];for(const depth of [0,.12,.24,.36,.50,.66])for(const shift of along)candidates.push({depth,shift,cost:Math.abs(shift)+depth*3});
 candidates.sort((a,b)=>a.cost-b.cost);
 for(const {depth,shift} of candidates){const dx=axis==='x'?inward*depth:shift,dz=axis==='x'?shift:inward*depth;
  const bounds={min:[min[0]+dx,min[1],min[2]+dz],max:[max[0]+dx,max[1],max[2]+dz]};
  if(![[bounds.min[0],bounds.min[2]],[bounds.max[0],bounds.min[2]],[bounds.min[0],bounds.max[2]],[bounds.max[0],bounds.max[2]]].every(p=>insideStreetFloor(...p)))continue;
  if(obstacles.some(box=>overlapsVolume(bounds,box)))continue;
  if(streetObjects.some(object=>overlapsVolume(bounds,object.bounds,.18)))continue;
  placement={dx,dz,bounds};break;
 }

 if(!placement){meshes.splice(meshStart);console.warn('No clear space for street object:',name);return null}
 for(const mesh of objectMeshes)for(let i=0;i<mesh.data.length;i+=10){mesh.data[i]+=placement.dx;mesh.data[i+2]+=placement.dz}
 for(const box of ownBoxes){box.prop=name;box.min[0]+=placement.dx;box.max[0]+=placement.dx;box.min[2]+=placement.dz;box.max[2]+=placement.dz}
 const object={name,kind,bounds:placement.bounds,shift:[placement.dx,placement.dz]};streetObjects.push(object);
 solidBoxes.push(...ownBoxes,{...placement.bounds,prop:name});
 return object;
}
function buildPlanters(x,z){
 for(let k=0;k<3;k++){
  const zz=z+k*.62;box(x,0,zz,.36,.40,.39,pot);
  box(x,.40,zz,.39,.045,.42,pot);
  for(let j=0;j<5;j++){const a=j*Math.PI*2/5;box(x+Math.cos(a)*.11,.44+rand()*.13,zz+Math.sin(a)*.11,.17,.20+rand()*.15,.17,leaf)}
 }
}
function buildBin(x,z){box(x,.015,z,.48,.65,.43,bluePlastic);box(x,.665,z,.53,.055,.48,bluePlastic);box(x,.73,z,.18,.035,.06,dark)}
function buildGasBottle(x,z){cylinder(x,.012,z,.22,.55,metal);box(x,.562,z,.10,.12,.10,metal)}


// Finish the exposed end and corner fronts as complete residential facades.
residentialDetails(-.6,-67.06,'z',1,6.1,7.7,1);
residentialDetails(25.3,-67.06,'z',1,3.1,7.7,2);
residentialDetails(0,16.2,'z',-1,8.8,7.7,2);
// Place large vehicles first, then fit smaller props into the remaining clear wall-side spaces.
placeStreetObject('scooter-east-1','scooter',4.08,-15,'x',()=>addScooter(4.08,-15,.05,true));
placeStreetObject('scooter-west','scooter',-4.06,-32,'x',()=>addScooter(-4.06,-32,-.08,false));
placeStreetObject('scooter-east-2','scooter',4.08,-46,'x',()=>addScooter(4.08,-46,.10,true));
placeStreetObject('bicycle-west','bicycle',-4.12,-7,'x',()=>addBicycle(-4.12,-7,-.035,true));
placeStreetObject('bicycle-east','bicycle',4.12,-25,'x',()=>addBicycle(4.12,-25,.045,false));
placeStreetObject('bicycle-cross-street','bicycle',20,-66.0,'z',()=>addBicycle(20,-66.0,Math.PI/2-.025,true));
for(const [i,request] of groundPropRequests.entries()){
 const {kind,x,z,axis}=request;
 placeStreetObject(kind+'-'+i,kind,x,z,axis,()=>{if(kind==='plants')buildPlanters(x,z);else if(kind==='bin')buildBin(x,z);else buildGasBottle(x,z)});
}

// Check the full paper rectangle against actual solid geometry, not only its center.
function blockedSegment(from,to){
 for(const box of solidBoxes){let lo=0,hi=1;
  for(let axis=0;axis<3;axis++){const delta=to[axis]-from[axis];if(Math.abs(delta)<1e-8){if(from[axis]<box.min[axis]||from[axis]>box.max[axis]){hi=-1;break}}else{let a=(box.min[axis]-from[axis])/delta,b=(box.max[axis]-from[axis])/delta;if(a>b)[a,b]=[b,a];lo=Math.max(lo,a);hi=Math.min(hi,b)}}
  if(hi>=lo&&hi>0&&lo<.998)return true;
 }
 return false;
}
function clearPaper(s){
 const view=[s.x+(s.axis==='x'?s.normal*4:0),1.74,s.z+(s.axis==='z'?s.normal*4:0)];
 if(!canWalk(view[0],view[2]))return false;
 for(const u of [-.565,0,.565])for(const y of [1.26,1.74,2.22]){const target=s.axis==='x'?[s.x,y,s.z+u]:[s.x+u,y,s.z];if(blockedSegment(view,target))return false}
 return true;
}
for(const [id,s] of sentences.entries()){
 if(clearPaper(s))continue;
 const along=s.axis==='x'?'z':'x',start=s[along];
 for(const offset of [.3,-.3,.6,-.6,.9,-.9,1.2,-1.2,1.5,-1.5,1.8,-1.8,2.1,-2.1,2.4,-2.4,2.7,-2.7,3,-3]){
  s[along]=start+offset;
  const overlap=sentences.some((other,j)=>j!==id&&Math.hypot(other.x-s.x,other.z-s.z)<1.25);
  if(!overlap&&clearPaper(s))break;
 }
}
sentences.forEach((s,i)=>{
 const y=1.25,w=1.15,h=.98,tangent=s.axis==='x'?-s.normal:s.normal,point=(u,v)=>s.axis==='x'?[s.x/sceneScaleX,v,s.z+u*tangent]:[(s.x+u*tangent)/sceneScaleX,v,s.z];
 quad([point(-w/2,y),point(w/2,y),point(w/2,y+h),point(-w/2,y+h)],posterTexture(s,i),[1.05,1.02,.94]);
});

// Shallow monochrome puddles appear only in rainy weather; ripple rings move on the ground.
const puddleTexture=solid('#fff');rainTextures.add(puddleTexture);
for(const [x,z,w,d] of [[-1.7,5,1.7,2.4],[2,-7,1.3,2],[-2.2,-19,1.4,2.5],[1.8,-33,1.7,2.8],[-1.3,-47,1.6,2.3],[1.7,-55,1.5,2],[7,-63,2.5,1.4],[18,-60.5,2.8,1.5],[25,-63,2.3,1.6],[30.5,-75,1.5,2.8],[33.7,-90,1.5,2.5],[30.6,-104,1.4,2.2]]){
 quad([[x-w/2,.028,z+d/2],[x+w/2,.028,z+d/2],[x+w/2,.028,z-d/2],[x-w/2,.028,z-d/2]],puddleTexture,[1,1,1],[0,0,1,0,1,1,0,1],false);
}

// Merge surfaces sharing a material to keep the detailed street responsive.
const materialGroups=new Map();
for(const mesh of meshes){
 let colors=materialGroups.get(mesh.tex);
 if(!colors){colors=new Map();materialGroups.set(mesh.tex,colors)}
 const key=mesh.color.join(',');
 if(!colors.has(key))colors.set(key,{tex:mesh.tex,color:mesh.color,data:[]});
 colors.get(key).data.push(...mesh.data);
}
meshes.length=0;
for(const colors of materialGroups.values())for(const mesh of colors.values()){
 const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
 gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(mesh.data),gl.STATIC_DRAW);
 meshes.push({buffer,tex:mesh.tex,color:mesh.color,count:mesh.data.length/10});
}
materialGroups.clear();
const spawn={x:0,y:1.65,z:10,yaw:-.17,pitch:.025};let camera={...spawn},distance=0;
function canWalk(x,z){
 const onRoad=(x>=-3.85&&x<=3.85&&z>=-65.7&&z<=14)||(x>=-3.85&&x<=35.7&&z>=-65.7&&z<=-58.3)||(x>=28.3&&x<=35.7&&z>=-108&&z<=-58.3);
 if(!onRoad)return false;
 return !streetObjects.some(({bounds})=>{const dx=Math.max(bounds.min[0]-x,0,x-bounds.max[0]),dz=Math.max(bounds.min[2]-z,0,z-bounds.max[2]);return Math.hypot(dx,dz)<.13});
}
$('#returnButton').onclick=()=>{
 keys.clear();drag=false;moved=false;camera={...spawn};distance=0;worldTime=0;frameCount=0;nearest=-1;current=0;
 saved=[];try{localStorage.setItem('alley-sentences-v1','[]')}catch(error){console.error(error)}
 resetFootsteps();leftFoot=true;lastCatMeow=-Infinity;catEncounters.forEach(cat=>{cat.near=false;cat.last=-Infinity});
 document.querySelectorAll('[data-key]').forEach(button=>button.classList.remove('pressed'));
 document.querySelectorAll('dialog[open]').forEach(dialog=>dialog.close());
 updateCollection();$('#distance').textContent='0';$('#discovery').hidden=true;$('#mapPosition').setAttribute('cx','12');$('#mapPosition').setAttribute('cy','56');
 clearTimeout(toastTimer);$('#toast').classList.remove('show');
 document.body.classList.add('at-start');
 startScreen.showModal();
$('#startTitle').focus({preventScroll:true});
};let drag=false,lastX=0,lastY=0,startX=0,startY=0,moved=false;
function canSeeSentence(s){
 const facing=s.axis==='x'?(camera.x-s.x)*s.normal:(camera.z-s.z)*s.normal;
 if(facing<=0)return false;
 const length=Math.hypot(s.x-camera.x,s.z-camera.z),steps=Math.ceil(length/.4);
 for(let j=1;j<steps;j++){const t=j/steps,x=camera.x+(s.x-camera.x)*t,z=camera.z+(s.z-camera.z)*t;
  if(!((x>=-4.65&&x<=4.65&&z>=-67&&z<=16)||(x>=-4.65&&x<=37&&z>=-67&&z<=-57)||(x>=27&&x<=37&&z>=-112&&z<=-57)))return false;
 }
 return true;
}
function sentenceAt(clientX,clientY){
 const rect=canvas.getBoundingClientRect();
 const nx=((clientX-rect.left)/rect.width*2-1)*(rect.width/rect.height)*Math.tan(Math.PI/6);
 const ny=(1-(clientY-rect.top)/rect.height*2)*Math.tan(Math.PI/6);
 const sy=Math.sin(camera.yaw),cy=Math.cos(camera.yaw),sp=Math.sin(camera.pitch),cp=Math.cos(camera.pitch);
 const ray=[sy*cp+nx*cy+ny*sy*sp,-sp+ny*cp,-cy*cp+nx*sy-ny*cy*sp];
 let hit=-1,closest=Infinity;
 sentences.forEach((s,i)=>{
  const axis=s.axis==='x'?0:2,origin=axis===0?camera.x:camera.z,plane=axis===0?s.x:s.z;
  if(Math.abs(ray[axis])<.00001||!canSeeSentence(s))return;
  const t=(plane-origin)/ray[axis];
  if(t<=0||t>=closest)return;
  const y=camera.y+t*ray[1],along=axis===0?camera.z+t*ray[2]:camera.x+t*ray[0],center=axis===0?s.z:s.x;
  if(y>=1.25&&y<=2.23&&Math.abs(along-center)<=.575){hit=i;closest=t}
 });
 return hit;
}
canvas.addEventListener('pointerdown',e=>{
 if(e.button!==undefined&&e.button!==0)return;
 drag=true;moved=false;startX=lastX=e.clientX;startY=lastY=e.clientY;
 canvas.setPointerCapture(e.pointerId);canvas.focus({preventScroll:true});
});
canvas.addEventListener('pointermove',e=>{
 if(drag){
  if(Math.hypot(e.clientX-startX,e.clientY-startY)>6)moved=true;
  if(moved){camera.yaw-=(e.clientX-lastX)*.004;camera.pitch=Math.max(-1.1,Math.min(.8,camera.pitch+(e.clientY-lastY)*.003))}
  lastX=e.clientX;lastY=e.clientY;
 }
 canvas.style.cursor=drag&&moved?'grabbing':sentenceAt(e.clientX,e.clientY)>=0?'pointer':'grab';
});
canvas.addEventListener('pointerup',e=>{
 if(drag&&!moved&&Math.hypot(e.clientX-startX,e.clientY-startY)<=6){
  const hit=sentenceAt(e.clientX,e.clientY);
  if(hit>=0)previewSentence(hit);
 }
 drag=false;
});
canvas.addEventListener('pointercancel',()=>drag=false);
canvas.addEventListener('lostpointercapture',()=>drag=false);
// Physical key positions also work while a Korean input method is active.
const movementCodes={KeyW:'w',KeyA:'a',KeyS:'s',KeyD:'d',ArrowUp:'arrowup',ArrowDown:'arrowdown',ArrowLeft:'arrowleft',ArrowRight:'arrowright',KeyE:'e',ShiftLeft:'shift',ShiftRight:'shift'};
function inputKey(e){return movementCodes[e.code]||String(e.key||'').toLowerCase()}
window.addEventListener('keydown',e=>{
 if(document.querySelector('dialog[open]'))return;
 const key=inputKey(e);
 if(!['w','a','s','d','arrowup','arrowdown','arrowleft','arrowright','e','shift'].includes(key))return;
 e.preventDefault();
 if(key==='e'){if(!e.repeat)previewSentence(nearest)}else keys.add(key);
 if(e.shiftKey)keys.add('shift');
},true);
window.addEventListener('keyup',e=>{keys.delete(inputKey(e));if(e.shiftKey)keys.add('shift');else keys.delete('shift')},true);
window.addEventListener('blur',()=>{keys.clear();drag=false});
document.addEventListener('visibilitychange',()=>{if(document.hidden){keys.clear();drag=false}});
document.querySelectorAll('[data-key]').forEach(b=>{
 const release=()=>{keys.delete(b.dataset.key.toLowerCase());b.classList.remove('pressed')};
 b.addEventListener('pointerdown',e=>{e.preventDefault();if(document.querySelector('dialog[open]'))return;b.setPointerCapture(e.pointerId);keys.add(b.dataset.key.toLowerCase());b.classList.add('pressed')});
 for(const event of ['pointerup','pointercancel','lostpointercapture'])b.addEventListener(event,release);
});

function multiply(a,b){const out=new Float32Array(16);for(let c=0;c<4;c++)for(let r=0;r<4;r++)out[c*4+r]=a[r]*b[c*4]+a[4+r]*b[c*4+1]+a[8+r]*b[c*4+2]+a[12+r]*b[c*4+3];return out}
function matrix(aspect){const f=1/Math.tan(Math.PI/6),n=.07,far=300;const p=new Float32Array([f/aspect,0,0,0,0,f,0,0,0,0,(far+n)/(n-far),-1,0,0,2*far*n/(n-far),0]);const y=camera.yaw,pt=camera.pitch;const right=[Math.cos(y),0,Math.sin(y)],back=[Math.sin(y)*Math.cos(pt),Math.sin(pt),-Math.cos(y)*Math.cos(pt)];/* forward uses sin(y), -cos(y) */const fwd=[Math.sin(y)*Math.cos(pt),-Math.sin(pt),-Math.cos(y)*Math.cos(pt)];const r=[Math.cos(y),0,Math.sin(y)];const up=[Math.sin(y)*Math.sin(pt),Math.cos(pt),-Math.cos(y)*Math.sin(pt)];const b=fwd.map(v=>-v);const eye=[camera.x,camera.y,camera.z];const dot=v=>-(v[0]*eye[0]+v[1]*eye[1]+v[2]*eye[2]);const v=new Float32Array([r[0],up[0],b[0],0,r[1],up[1],b[1],0,r[2],up[2],b[2],0,dot(r),dot(up),dot(b),1]);return multiply(p,v)}
let prev=0,frameCount=0,worldTime=0;function render(time){const dt=Math.min((time-prev)/1000,.04);prev=time;const open=!!document.querySelector('dialog[open]');if(!document.hidden&&(!open||$('#startDialog').open))worldTime+=dt;if(!open){if(keys.has('arrowleft'))camera.yaw-=dt*1.35;if(keys.has('arrowright'))camera.yaw+=dt*1.35;let forward=(keys.has('w')||keys.has('arrowup')?1:0)-(keys.has('s')||keys.has('arrowdown')?1:0),strafe=(keys.has('d')?1:0)-(keys.has('a')?1:0);const norm=Math.max(1,Math.hypot(forward,strafe)),fast=forward>0&&keys.has('shift'),speed=fast?3.6:2.0;let dx=(Math.sin(camera.yaw)*forward+Math.cos(camera.yaw)*strafe)*dt*speed/norm,dz=(-Math.cos(camera.yaw)*forward+Math.sin(camera.yaw)*strafe)*dt*speed/norm;const ox=camera.x,oz=camera.z;if(canWalk(camera.x+dx,camera.z))camera.x+=dx;if(canWalk(camera.x,camera.z+dz))camera.z+=dz;const movedDistance=Math.hypot(camera.x-ox,camera.z-oz);distance+=movedDistance;updateFootsteps(movedDistance,fast);camera.y=1.65+(forward||strafe?Math.sin(time*(fast?.010:.0055))*(fast?.028:.018):0)}else{updateFootsteps(0,false)}const dpr=Math.min(devicePixelRatio||1,1.6),w=Math.round(canvas.clientWidth*dpr),h=Math.round(canvas.clientHeight*dpr);if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h}gl.viewport(0,0,w,h);gl.clearColor(1,1,1,1);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);drawSky(w/h,worldTime);gl.useProgram(prog);gl.enable(gl.DEPTH_TEST);gl.uniform3f(offsetUniform,0,0,0);gl.uniform1f(yawUniform,0);gl.uniformMatrix4fv(vp,false,matrix(w/h));gl.uniform3f(cam,camera.x,camera.y,camera.z);gl.uniform1f(wetUniform,isRaining?1:0);gl.uniform1f(timeUniform,worldTime);for(const mesh of meshes){if(rainTextures.has(mesh.tex)&&!isRaining)continue;bindMesh(mesh.buffer);bindMaterial(mesh.tex,mesh.color);gl.drawArrays(gl.TRIANGLES,0,mesh.count)}drawCats(worldTime);drawPigeons(worldTime);rainEffects.render(time);if(frameCount++%10===0){let best=-1,bestD=7.5;sentences.forEach((s,i)=>{const dist=Math.hypot(camera.x-s.x,camera.z-s.z);if(dist<bestD&&canSeeSentence(s)){bestD=dist;best=i}});nearest=best;$('#discovery').hidden=best<0;if(best>=0){$('#discovery .discovery-tag').textContent=saved.includes(best)?'문장을 가져간 자리 ✓':`${String(best+1).padStart(2,'0')} / 골목에서 발견한 문장`;$('#discovery .discovery-name').textContent=sentences[best].title;$('#collectButton').textContent=saved.includes(best)?'수집한 문장 보기 ↗':'클릭해서 문장 보기 ↗'}$('#distance').textContent=Math.floor(distance);const mapX=camera.z>-58?12:camera.x<28?12+(camera.x/32)*43:55;const mapY=camera.z>-58?56-(10-camera.z)/68*24:camera.x<28?32:32-(-62-camera.z)/46*26;$('#mapPosition').setAttribute('cx',mapX);$('#mapPosition').setAttribute('cy',mapY);const dirs=['북','북동','동','남동','남','남서','서','북서'];$('#compassValue').textContent=dirs[((Math.round(camera.yaw/(Math.PI/4))%8)+8)%8]}requestAnimationFrame(render)}requestAnimationFrame(render);
}
let audioContext,audioGain,audioMaster,footstepGain,rainGain,rainSource,rainBuffer,audioSource,footstepBuffer,soundOn=false;
let stepDistance=0,wasWalking=false,leftFoot=true;
function resetFootsteps(){stepDistance=0;wasWalking=false}
function playFootstep(fast){
 if(!soundOn||!audioContext||audioContext.state!=='running'||!footstepBuffer)return;
 const now=audioContext.currentTime,rate=(leftFoot?.94:1.02)+(Math.random()-.5)*.035,duration=fast?.26:.32;
 const panner=audioContext.createStereoPanner?audioContext.createStereoPanner():null;
 if(panner){panner.pan.value=leftFoot?-.14:.14;panner.connect(footstepGain)}
 const output=panner||footstepGain;
 if(isRaining)playWetStep(output,fast);
 // A broad, low heel impact rolls into the weight of the sole, rather than clicking.
 const body=audioContext.createBufferSource(),bodyFilter=audioContext.createBiquadFilter(),bodyGain=audioContext.createGain();
 body.buffer=footstepBuffer;body.playbackRate.value=rate;
 bodyFilter.type='lowpass';bodyFilter.frequency.value=(leftFoot?360:395)+(fast?45:0);bodyFilter.frequency.value*=isRaining?.82:1;bodyFilter.Q.value=.5;
 bodyGain.gain.setValueAtTime(.0001,now);bodyGain.gain.exponentialRampToValueAtTime(fast?.93:.78,now+.018);
 bodyGain.gain.exponentialRampToValueAtTime(.34,now+.052);bodyGain.gain.exponentialRampToValueAtTime(fast?.66:.55,now+.085);
 bodyGain.gain.exponentialRampToValueAtTime(.0001,now+duration);
 body.connect(bodyFilter).connect(bodyGain).connect(output);body.start(now);body.stop(now+duration+.02);
 // The quiet trailing scuff adds the soft "beok" of rubber meeting rough pavement.
 const scuff=audioContext.createBufferSource(),scuffFilter=audioContext.createBiquadFilter(),scuffGain=audioContext.createGain();
 scuff.buffer=footstepBuffer;scuff.playbackRate.value=rate*.91;
 scuffFilter.type='bandpass';scuffFilter.frequency.value=490+Math.random()*70;scuffFilter.Q.value=.45;
 scuffGain.gain.setValueAtTime(.0001,now);scuffGain.gain.setValueAtTime(.0001,now+.035);
 scuffGain.gain.exponentialRampToValueAtTime(fast?.32:.27,now+.095);scuffGain.gain.exponentialRampToValueAtTime(.0001,now+duration+.015);
 scuff.connect(scuffFilter).connect(scuffGain).connect(output);scuff.start(now+.03);scuff.stop(now+duration+.04);
 const weight=audioContext.createOscillator(),weightGain=audioContext.createGain();
 weight.type='sine';weight.frequency.setValueAtTime(leftFoot?79:84,now);weight.frequency.exponentialRampToValueAtTime(57,now+.14);
 weightGain.gain.setValueAtTime(.0001,now);weightGain.gain.exponentialRampToValueAtTime(fast?.055:.043,now+.022);weightGain.gain.exponentialRampToValueAtTime(.0001,now+.19);
 weight.connect(weightGain).connect(output);weight.start(now);weight.stop(now+.21);
 scuff.onended=()=>{body.disconnect();bodyFilter.disconnect();bodyGain.disconnect();scuff.disconnect();scuffFilter.disconnect();scuffGain.disconnect();weight.disconnect();weightGain.disconnect();if(panner)panner.disconnect()};
 leftFoot=!leftFoot;
}
function updateFootsteps(moved,fast){
 if(!soundOn||!audioContext||audioContext.state!=='running'||moved<.0001){resetFootsteps();return}
 if(!wasWalking){playFootstep(fast);wasWalking=true;stepDistance=0}
 stepDistance+=moved;
 const stride=fast?1.15:1.10;
 if(stepDistance>=stride){stepDistance%=stride;playFootstep(fast)}
}
const catEncounters=[{near:false,last:-Infinity},{near:false,last:-Infinity}];
let lastCatMeow=-Infinity;
function playCatMeow(cat,volume,pan){
 if(!soundOn||!audioContext||audioContext.state!=='running')return;
 const now=audioContext.currentTime,voice=audioContext.createOscillator(),mouth=audioContext.createBiquadFilter(),warmth=audioContext.createBiquadFilter(),gain=audioContext.createGain();
 // A soft voiced vowel: a gently rising "mya" rolls down into a longer "ow".
 if(audioContext.createPeriodicWave&&voice.setPeriodicWave){
  const real=new Float32Array(8),imag=new Float32Array([0,1,.42,.23,.11,.06,.025,.01]);voice.setPeriodicWave(audioContext.createPeriodicWave(real,imag));
 }else voice.type='triangle';
 const pitch=cat===0?455:490;
 voice.frequency.setValueAtTime(pitch*.82,now);voice.frequency.exponentialRampToValueAtTime(pitch*1.24,now+.14);voice.frequency.exponentialRampToValueAtTime(pitch*1.03,now+.35);voice.frequency.exponentialRampToValueAtTime(pitch*.65,now+.78);
 mouth.type='peaking';mouth.Q.value=1.1;mouth.gain.value=5;
 mouth.frequency.setValueAtTime(1400,now);mouth.frequency.exponentialRampToValueAtTime(680,now+.72);
 warmth.type='lowpass';warmth.Q.value=.6;warmth.frequency.value=1900;
 gain.gain.setValueAtTime(.0001,now);gain.gain.exponentialRampToValueAtTime(.035*volume,now+.12);gain.gain.exponentialRampToValueAtTime(.026*volume,now+.39);gain.gain.exponentialRampToValueAtTime(.0001,now+.84);
 const panner=audioContext.createStereoPanner?audioContext.createStereoPanner():null;
 if(panner){panner.pan.value=pan;panner.connect(audioMaster)}
 voice.connect(mouth).connect(warmth).connect(gain).connect(panner||audioMaster);voice.start(now);voice.stop(now+.87);
 voice.onended=()=>{voice.disconnect();mouth.disconnect();warmth.disconnect();gain.disconnect();if(panner)panner.disconnect()};
}
function updateCatVoice(cat,x,z,listener,active=true){
 const state=catEncounters[cat];
 if(!active||!soundOn||!audioContext||audioContext.state!=='running'){state.near=false;return}
 const dx=x-listener.x,dz=z-listener.z,distance=Math.hypot(dx,dz);
 if(distance>3.4){state.near=false;return}
 if(distance>2.2||state.near)return;
 state.near=true;const now=audioContext.currentTime;
 if(now-state.last<14||now-lastCatMeow<2)return;
 state.last=now;lastCatMeow=now;
 const pan=Math.max(-.65,Math.min(.65,(Math.cos(listener.yaw)*dx+Math.sin(listener.yaw)*dz)/Math.max(distance,1)*.6));
 playCatMeow(cat,Math.max(.28,1-distance/3.3),pan);
}

function playWetStep(output,fast){
 if(!rainBuffer||!audioContext||!soundOn)return;
 const now=audioContext.currentTime,source=audioContext.createBufferSource(),filter=audioContext.createBiquadFilter(),gain=audioContext.createGain();
 source.buffer=rainBuffer;source.playbackRate.value=.8+Math.random()*.15;
 filter.type='bandpass';filter.frequency.value=950+Math.random()*220;filter.Q.value=.55;
 gain.gain.setValueAtTime(.0001,now);gain.gain.exponentialRampToValueAtTime(fast?.40:.28,now+.025);gain.gain.exponentialRampToValueAtTime(.075,now+.09);gain.gain.exponentialRampToValueAtTime(.0001,now+.22);
 source.connect(filter).connect(gain).connect(output);source.start(now);source.stop(now+.24);
 source.onended=()=>{source.disconnect();filter.disconnect();gain.disconnect()};
}

$('#soundButton').onclick=async()=>{
 try{
  if(!audioContext){
   audioContext=new(window.AudioContext||window.webkitAudioContext)();audioMaster=audioContext.createGain();audioMaster.gain.value=0;audioMaster.connect(audioContext.destination);footstepGain=audioContext.createGain();footstepGain.gain.value=.38;footstepGain.connect(audioMaster);
   const buffer=audioContext.createBuffer(1,audioContext.sampleRate*4,audioContext.sampleRate),data=buffer.getChannelData(0);let last=0;
   for(let i=0;i<data.length;i++){last=(last+Math.random()*.025-.0125)/1.018;data[i]=last}
   audioSource=audioContext.createBufferSource();audioSource.buffer=buffer;audioSource.loop=true;
   const filter=audioContext.createBiquadFilter();filter.type='lowpass';filter.frequency.value=700;
   audioGain=audioContext.createGain();audioGain.gain.value=.35;audioSource.connect(filter).connect(audioGain).connect(audioMaster);audioSource.start();
   rainBuffer=audioContext.createBuffer(1,audioContext.sampleRate*4,audioContext.sampleRate);const rainData=rainBuffer.getChannelData(0);
   for(let i=0;i<rainData.length;i++)rainData[i]=(Math.random()*2-1)*.16;
   rainSource=audioContext.createBufferSource();rainSource.buffer=rainBuffer;rainSource.loop=true;
   const rainFilter=audioContext.createBiquadFilter();rainFilter.type='lowpass';rainFilter.frequency.value=2400;rainFilter.Q.value=.5;
   rainGain=audioContext.createGain();rainGain.gain.value=isRaining?.32:0;rainSource.connect(rainFilter).connect(rainGain).connect(audioMaster);rainSource.start();
   footstepBuffer=audioContext.createBuffer(1,Math.ceil(audioContext.sampleRate*.40),audioContext.sampleRate);const footData=footstepBuffer.getChannelData(0);let brown=0,soft=0;
   for(let i=0;i<footData.length;i++){const white=Math.random()*2-1;brown=(brown+white*.12)/1.12;soft=soft*.75+white*.25;footData[i]=brown*1.2+soft*.14}
  }
  await audioContext.resume();soundOn=!soundOn;resetFootsteps();audioMaster.gain.setTargetAtTime(soundOn?1:0,audioContext.currentTime,soundOn?.08:.015);
  $('#soundButton').innerHTML=soundOn?'♫ <span>소리 켜짐</span>':'♫ <span>소리 꺼짐</span>';
  $('#soundButton').setAttribute('aria-label',soundOn?'골목·빗소리·발자국·고양이 소리 끄기':'골목·빗소리·발자국·고양이 소리 켜기');$('#soundButton').setAttribute('aria-pressed',String(soundOn));
 }catch(error){console.error(error);toast('이 브라우저에서는 골목 소리를 재생할 수 없어요.')}
};
window.addEventListener('blur',resetFootsteps);
document.addEventListener('visibilitychange',()=>{if(document.hidden)resetFootsteps()});

setWeather(isRaining);

// The translucent title screen keeps the real alley visible and pauses player input.
const startScreen=$('#startDialog');
startScreen.addEventListener('cancel',event=>event.preventDefault());
$('#startButton').onclick=()=>{keys.clear();startScreen.close();document.body.classList.remove('at-start');$('#world').focus({preventScroll:true})};
$('#projectButton').onclick=()=>{keys.clear();$('#projectDialog').showModal()};
document.body.classList.add('at-start');
startScreen.showModal();
$('#startTitle').focus({preventScroll:true});
