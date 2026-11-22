/* IELTS Ocean · Bài test đầu vào (ước lượng band). Câu hỏi và bài đọc do IELTS Ocean tự soạn. */
(function(){
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
/* [band của câu, câu hỏi, đáp án (đúng đứng đầu), giải thích] */
const VOC=[
 [5,'The city has a good public transport ___, so most people don\'t need a car.',['system','method','way','plan'],'"public transport system" là collocation cố định.'],
 [5,'Many young people ___ several hours a day on social media.',['spend','pass','use','take'],'spend + thời gian + on sth.'],
 [6,'The government should ___ more money in renewable energy.',['invest','put on','pay','spend for'],'invest money in sth.'],
 [6,'Rising house prices have made it difficult for young couples to ___ a home.',['afford','allow','offer','effort'],'afford = đủ tiền để mua.'],
 [6,'Regular exercise can significantly ___ the risk of heart disease.',['reduce','decrease down','lower down','drop'],'reduce the risk of; "drop" không đi với tân ngữ này.'],
 [7,'The new policy had a ___ effect on small businesses, many of which closed within a year.',['detrimental','favourable','neglectful','deliberate'],'detrimental = gây hại; khớp với việc nhiều doanh nghiệp đóng cửa.'],
 [7,'Children who grow up in bilingual families often ___ a second language effortlessly.',['acquire','achieve','attain','obtain'],'acquire a language là cách nói chuẩn.'],
 [7,'Unemployment ___ for nearly a third of the region\'s social problems, according to the report.',['accounted','caused','made','resulted'],'account for = chiếm (một tỷ lệ).'],
 [8,'The minister\'s speech did little to ___ public fears; people remained anxious.',['allay','arouse','elevate','deny'],'allay fears = làm dịu nỗi lo.'],
 [8,'Critics argue that the documentary paints an overly ___ picture of rural life, ignoring poverty and isolation.',['idyllic','ominous','accurate','barren'],'idyllic = đẹp như mơ, lý tưởng hóa; trái với nghèo đói, cô lập.']
];
const GRA=[
 [5,'If it ___ tomorrow, we will cancel the trip.',['rains','will rain','rained','would rain'],'Câu điều kiện loại 1: If + hiện tại đơn.'],
 [5,'She has lived in Hanoi ___ 2019.',['since','for','from','at'],'since + mốc thời gian.'],
 [6,'The number of students ___ online courses has risen sharply.',['taking','took','takes','are taking'],'Rút gọn mệnh đề quan hệ chủ động: students (who are) taking.'],
 [6,'By the time we arrived, the film ___.',['had already started','already started','has already started','was already starting'],'Hành động xảy ra trước một mốc trong quá khứ: quá khứ hoàn thành.'],
 [6,'Neither the manager nor the employees ___ aware of the problem.',['were','was','is','has been'],'neither…nor: động từ chia theo chủ ngữ gần nhất (employees).'],
 [7,'___ the heavy rain, the match went ahead as planned.',['Despite','Although','However','Even'],'Despite + danh từ; Although + mệnh đề.'],
 [7,'The bridge, ___ was built in 1920, is now closed for repairs.',['which','that','what','where'],'Mệnh đề không xác định (có dấu phẩy) không dùng that.'],
 [7,'Coal consumption fell from 40% to 25%, ___ a decrease of 15 percentage points.',['representing','represented','which represent','to represent'],'V-ing nối số liệu vào mệnh đề chính, kiểu câu hay dùng trong Task 1.'],
 [8,'Not only ___ the deadline, but they also exceeded the budget.',['did they miss','they missed','they did miss','had missed they'],'Đảo ngữ sau Not only.'],
 [8,'Had the government acted sooner, the crisis ___.',['might have been avoided','might be avoided','would avoid','had been avoided'],'Đảo ngữ điều kiện loại 3: Had + S + V3, S + might have been V3.']
];
const PASSAGE=`<p>Rooftop farms are no longer a novelty in many large cities. In densely populated places where little land is available for agriculture, commercial growers now operate on the roofs of car parks and shopping centres. Supporters claim that growing vegetables close to consumers cuts transport costs and keeps produce fresher. A recent survey of rooftop growers in one Asian city found that leafy greens such as lettuce and spinach made up the majority of their output, largely because these crops are light, grow quickly and sell at a high price.</p>
<p>However, the economics are not straightforward. Roofs must often be reinforced before they can carry the weight of soil and water, and this work can double the initial cost of a project. For this reason, many newer farms use hydroponic systems, in which plants grow in nutrient-rich water rather than soil. These systems are lighter but depend heavily on electricity for pumps and lighting, which raises questions about their environmental benefits.</p>
<p>There is also debate about how much food rooftop farms can realistically produce. Even optimistic estimates suggest that they could supply only a small fraction of a city's vegetables. Some urban planners therefore argue that their main value is not economic but educational: they give city residents, especially children, a rare chance to see where food comes from. Several schools have already built small rooftop gardens for this purpose, although it is too early to say whether these gardens have changed students' eating habits.</p>`;
const TFNG=['TRUE','FALSE','NOT GIVEN'];
const READ=[
 ['tf','Most of what the surveyed rooftop growers produced was leafy vegetables.','TRUE','Đoạn 1: leafy greens made up the majority of their output.'],
 ['tf','Strengthening a roof is rarely necessary before starting a rooftop farm.','FALSE','Đoạn 2: roofs must often be reinforced, trái với "rarely".'],
 ['tf','Hydroponic systems use less electricity than soil-based farms.','FALSE','Đoạn 2: hydroponic depend heavily on electricity, trái với "less".'],
 ['tf','Most rooftop farms are owned by supermarket chains.','NOT GIVEN','Bài không nói ai sở hữu các trang trại.'],
 ['mc','Why do rooftop growers favour leafy greens?',['They are light, fast-growing and profitable.','They need very little water.','Customers refuse to buy other vegetables.','The government pays growers to plant them.'],'Đoạn 1: light, grow quickly and sell at a high price.'],
 ['mc','According to some urban planners, the main value of rooftop farms is…',['showing people where food comes from.','reducing transport costs.','supplying most of a city\'s vegetables.','lowering electricity use.'],'Đoạn 3: main value is not economic but educational.']
];
/* Nghe bằng giọng đọc của trình duyệt: [band, câu đầy đủ, đáp án điền, các đáp án chấp nhận, tốc độ] */
const LIS=[
 [5,'The library opens at nine o\'clock on weekdays.','nine o\'clock',['nine oclock','9 oclock','900','9','nine','9am','nine am'],0.9],
 [5,'Please bring your passport and two photos.','passport',['passport'],0.9],
 [6,'Most of the participants preferred working from home.','participants',['participants'],1],
 [6,'The deadline for applications has been extended until Friday.','extended',['extended'],1],
 [7,'The museum\'s new wing focuses on the history of local agriculture.','agriculture',['agriculture'],1.05],
 [7,'Researchers found a significant correlation between sleep and memory.','correlation',['correlation'],1.05],
 [8,'Ticket prices are likely to fluctuate depending on seasonal demand.','fluctuate',['fluctuate'],1.1],
 [8,'The committee unanimously rejected the proposal on environmental grounds.','unanimously',['unanimously'],1.1]
];
const CANW=[[5,'Tôi viết được bài Task 2 đủ 250 từ, có mở bài, thân bài, kết bài.'],[5,'Câu đơn của tôi phần lớn đúng ngữ pháp.'],
 [6,'Tôi trả lời đủ mọi phần của đề và có quan điểm rõ ràng.'],[6,'Tôi viết được câu phức (mệnh đề quan hệ, câu điều kiện), dù còn lỗi.'],
 [7,'Task 1 của tôi luôn có overview nêu xu hướng hoặc khác biệt chính.'],[7,'Phần lớn câu tôi viết không có lỗi, và tôi dùng collocation tự nhiên.'],
 [8,'Ý trong thân bài được phát triển cụ thể, không khái quát chung chung.'],[8,'Tôi hiếm khi mắc lỗi, kể cả trong câu phức dài.']];
const CANS=[[5,'Tôi trả lời được câu hỏi về bản thân, gia đình, sở thích mà không phải dừng quá lâu.'],[5,'Người nghe hiểu được tôi dù phát âm chưa chuẩn.'],
 [6,'Tôi nói liền được 1–2 phút cho Part 2.'],[6,'Khi quên từ, tôi diễn đạt được theo cách khác.'],
 [7,'Tôi nói dài về chủ đề lạ mà không mất mạch.'],[7,'Tôi dùng được một số collocation, thành ngữ tự nhiên khi nói.'],
 [8,'Tôi hiếm khi phải dừng để tìm từ hay ngữ pháp.'],[8,'Ngữ điệu và trọng âm của tôi tự nhiên, người nghe không phải cố.']];

const STEPS=[['voc','Từ vựng',VOC.length],['gra','Ngữ pháp',GRA.length],['read','Reading',READ.length],['lis','Listening',LIS.length],['self','Tự đánh giá Writing & Speaking',CANW.length+CANS.length]];
let el=null,api=null,S=null;

function css(){
  if(document.getElementById('ptCss'))return;
  const s=document.createElement('style');s.id='ptCss';s.textContent=`
.pt{display:grid;gap:14px}
.pt-q{border:1px solid var(--line);border-radius:16px;padding:14px;background:rgba(5,11,46,.5)}
.pt-q p{margin:0 0 10px;font-size:15px;line-height:1.5}
.pt-o{display:flex;flex-wrap:wrap;gap:8px}
.pt-o .chip{height:auto;min-height:36px;padding:6px 14px;text-align:left}
.pt-o .chip:hover{border-color:var(--glow);color:var(--ink)}
.pt-o .chip.ok{background:rgba(80,200,140,.25);border-color:#5fd29a;color:#fff}
.pt-o .chip.no{background:rgba(255,110,110,.2);border-color:#ff8a8a;color:#fff}
.pt-pass{border-radius:16px;padding:16px;background:rgba(230,244,255,.05);border:1px solid var(--line);font-size:15px;line-height:1.7;max-height:340px;overflow:auto}
.pt-pass p{margin:0 0 10px}
.pt-bar{height:8px;border-radius:99px;background:rgba(230,244,255,.08);overflow:hidden}
.pt-bar i{display:block;height:100%;background:linear-gradient(90deg,#2F6BFF,#7FD1FF);transition:width .3s}
.pt-nav{display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap}
.pt-gap{display:flex;gap:8px;align-items:center;flex-wrap:wrap}
.pt-gap input{height:40px;border-radius:999px;border:1px solid var(--line);background:rgba(5,11,46,.8);color:var(--ink);padding:0 14px;font-size:15px;min-width:180px}
.pt-ck{display:flex;gap:10px;align-items:flex-start;padding:8px 0;font-size:15px;cursor:pointer}
.pt-ck input{width:18px;height:18px;margin-top:2px;accent-color:#2F6BFF}
.pt-exp{font-size:13px;color:var(--mute);margin-top:8px}
.pt-res{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:10px}
.pt-res div{border:1px solid var(--line);border-radius:14px;padding:12px;background:rgba(5,11,46,.5);text-align:center}
.pt-res b{display:block;font:600 28px Inter,sans-serif;color:var(--glow)}
.pt-res .ov{background:rgba(47,107,255,.3);border-color:var(--glow)}
`;document.head.appendChild(s);
}
function shuffle(a,seed){const r=a.slice();let x=seed;for(let i=r.length-1;i>0;i--){x=(x*9301+49297)%233280;const j=Math.floor(x/233280*(i+1));[r[i],r[j]]=[r[j],r[i]]}return r}
const norm=s=>String(s||'').toLowerCase().replace(/[’']/g,'').replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim();
const chk=(ans,q)=>{const t=norm(ans).replace(/ /g,'');return !!t&&q[3].concat(q[2]).some(x=>norm(x).replace(/ /g,'')===t)};
const band=f=>Math.round((3.5+f*5)*2)/2;
const r5=x=>Math.round(x*2)/2;

function fresh(){return{step:-1,seed:Date.now()%233280,a:{voc:{},gra:{},read:{},lis:{},w:{},s:{}},plays:{}}}

function render(target,opts){el=target;api=opts;css();if(!S)S=fresh();draw()}

function voice(){const v=speechSynthesis.getVoices().filter(x=>/^en[-_]/i.test(x.lang));return v.find(x=>/en[-_]GB/i.test(x.lang)&&/Google|Natural/i.test(x.name))||v.find(x=>/en[-_]GB/i.test(x.lang))||v.find(x=>/Google|Natural/i.test(x.name))||v[0]||null}
function speak(i){
  if(!('speechSynthesis' in window))return false;
  speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(LIS[i][1]);const v=voice();if(v){u.voice=v;u.lang=v.lang}else u.lang='en-GB';u.rate=LIS[i][4];speechSynthesis.speak(u);return true;
}

function mcq(key,list,i,q){
  const ans=S.a[key][i],opts=shuffle(q[2],S.seed+i*7+key.length);
  return `<div class="pt-q"><p><b>${i+1}.</b> ${esc(q[1])}</p><div class="pt-o" role="group">${opts.map(o=>`<button type="button" class="chip" data-a="${key}|${i}" data-v="${esc(o)}" aria-pressed="${ans===o}">${esc(o)}</button>`).join('')}</div></div>`;
}

function draw(){
  const st=S.step;
  if(st===-1){
    el.innerHTML=`<div class="pt"><div class="pt-q"><p><b>Bài test đầu vào · khoảng 15–20 phút</b></p>
      <p>Gồm 5 phần: 10 câu từ vựng, 10 câu ngữ pháp, một bài đọc ngắn 6 câu, 8 câu nghe điền từ (dùng giọng đọc của trình duyệt), và tự đánh giá Writing, Speaking theo band descriptors.</p>
      <p class="small" style="margin:0">Kết quả là ước lượng để web chọn lộ trình và nội dung cho bạn, không thay được bài thi thật hay giáo viên chấm. Làm một mạch, không tra từ điển để kết quả sát nhất.</p></div>
      ${api.last?`<p class="small" style="margin:0">Lần gần nhất (${new Date(api.last.at).toLocaleDateString('vi-VN')}): overall ước lượng <b>${api.last.O.toFixed(1)}</b>.</p>`:''}
      <div class="pt-nav"><span></span><button class="btn pri" type="button" data-go="0">Bắt đầu</button></div></div>`;
  }else if(st<STEPS.length){
    const [k,name]=STEPS[st];let body='';
    if(k==='voc')body=VOC.map((q,i)=>mcq('voc',VOC,i,q)).join('');
    if(k==='gra')body=GRA.map((q,i)=>mcq('gra',GRA,i,q)).join('');
    if(k==='read')body=`<div class="pt-pass">${PASSAGE}</div>`+READ.map((q,i)=>{const ans=S.a.read[i],opts=q[0]==='tf'?TFNG:shuffle(q[2],S.seed+i*13);
      return `<div class="pt-q"><p><b>${i+1}.</b> ${esc(q[1])}</p><div class="pt-o">${opts.map(o=>`<button type="button" class="chip" data-a="read|${i}" data-v="${esc(o)}" aria-pressed="${ans===o}">${esc(o)}</button>`).join('')}</div></div>`}).join('');
    if(k==='lis'){
      const ok='speechSynthesis' in window;
      body=(ok?'<p class="small" style="margin:0">Bấm ▶ để nghe (mỗi câu nghe tối đa 2 lần), rồi gõ từ còn thiếu. Bật loa hoặc đeo tai nghe.</p>':'<p class="warnb">Trình duyệt này không hỗ trợ giọng đọc, phần Listening sẽ được ước lượng từ các phần khác.</p>')+
        LIS.map((q,i)=>{const p=S.plays[i]||0,gap=q[1].replace(new RegExp(q[2].replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'i'),'_____');
          return `<div class="pt-q"><p><b>${i+1}.</b> ${esc(gap)}</p><div class="pt-gap">${ok?`<button type="button" class="btn" data-play="${i}" ${p>=2?'disabled':''} style="height:40px">▶ Nghe${p?` (${2-p} lần)`:''}</button>`:''}<input type="text" data-gap="${i}" value="${esc(S.a.lis[i]||'')}" placeholder="Từ còn thiếu" autocomplete="off" spellcheck="false" aria-label="Đáp án câu ${i+1}"></div></div>`}).join('');
    }
    if(k==='self'){
      const box=(t,list,key)=>`<div class="pt-q"><p><b>${t}</b> · tick những câu đúng với bạn hiện tại</p>${list.map(([b,s],i)=>`<label class="pt-ck"><input type="checkbox" data-ck="${key}|${i}" ${S.a[key][i]?'checked':''}><span>${esc(s)}</span></label>`).join('')}</div>`;
      body=box('Writing',CANW,'w')+box('Speaking',CANS,'s');
    }
    const done=STEPS.slice(0,st).reduce((a,x)=>a+x[2],0);
    el.innerHTML=`<div class="pt"><div><div style="display:flex;justify-content:space-between;font-size:14px"><b>Phần ${st+1}/${STEPS.length} · ${name}</b><span class="small">${st===STEPS.length-1?'Phần cuối':''}</span></div>
      <div class="pt-bar" style="margin-top:6px"><i style="width:${done/STEPS.reduce((a,x)=>a+x[2],0)*100}%"></i></div></div>
      ${body}
      <div class="pt-nav"><button class="btn" type="button" data-go="${st-1}">← Quay lại</button><button class="btn pri" type="button" data-go="${st+1}">${st===STEPS.length-1?'Xem kết quả':'Phần tiếp →'}</button></div></div>`;
  }else{
    const R=score();
    el.innerHTML=`<div class="pt"><div class="pt-res">
        <div class="ov"><span class="small">Overall ước lượng</span><b>${R.O.toFixed(1)}</b></div>
        ${[['L','Listening'],['R','Reading'],['W','Writing'],['S','Speaking']].map(([k,n])=>`<div><span class="small">${n}</span><b>${R[k].toFixed(1)}</b></div>`).join('')}
      </div>
      <div class="pt-q"><p style="margin:0 0 6px">Từ vựng ${R.raw.voc}/10 · Ngữ pháp ${R.raw.gra}/10 · Reading ${R.raw.read}/6 · Listening ${R.noLis?'không làm':R.raw.lis+'/8'}</p>
        <p class="small" style="margin:0">Writing và Speaking dựa trên phần tự đánh giá, giới hạn bởi vốn từ và ngữ pháp bạn vừa làm, nên chỉ để tham khảo. Muốn sát hơn, hãy nhập điểm giáo viên chấm vào "Luật rừng".</p></div>
      <div class="pt-nav"><button class="btn" type="button" data-review>Xem đáp án & giải thích</button><span style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn" type="button" data-redo>Làm lại</button><button class="btn pri" type="button" data-save>Lưu làm band hiện tại</button></span></div>
      <div id="ptRev"></div></div>`;
    S.result=R;
  }
}

function score(){
  const a=S.a,cnt=(L,k)=>L.reduce((n,q,i)=>n+(a[k][i]===q[2][0]?1:0),0);
  const voc=cnt(VOC,'voc'),gra=cnt(GRA,'gra'),read=READ.reduce((n,q,i)=>n+(a.read[i]===(q[0]==='tf'?q[2]:q[2][0])?1:0),0);
  const noLis=!('speechSynthesis' in window)||!Object.keys(S.plays).length;
  const lis=LIS.reduce((n,q,i)=>n+(chk(a.lis[i],q)?1:0),0);
  const lang=band((voc+gra)/20);
  const R=r5((band(read/6)*2+lang)/3);
  const L=noLis?lang:r5((band(lis/8)*3+lang)/4);
  const self=(list,key)=>{let b=4.5;for(const lv of [5,6,7,8]){const it=list.map((x,i)=>[x[0],i]).filter(x=>x[0]===lv),n=it.filter(([,i])=>a[key][i]).length;if(n===it.length)b=lv;else{if(n>0)b=Math.max(b,lv-0.5);break}}return b};
  const W=Math.min(self(CANW,'w'),lang+1),Sp=Math.min(self(CANS,'s'),lang+1);
  const O=r5((L+R+W+Sp)/4);
  return{L,R,W,S:Sp,O,noLis,raw:{voc,gra,read,lis},at:Date.now()};
}

function review(){
  const a=S.a,row=(i,q,ans,ok,right,exp)=>`<div class="pt-q"><p><b>${i+1}.</b> ${esc(q)}</p><p class="small" style="margin:0">${ok?'✓ Đúng':'✗ Bạn chọn: '+esc(ans||'(bỏ trống)')+' · Đáp án: <b>'+esc(right)+'</b>'}</p><p class="pt-exp">${esc(exp)}</p></div>`;
  return '<h3 style="margin:8px 0">Từ vựng</h3>'+VOC.map((q,i)=>row(i,q[1],a.voc[i],a.voc[i]===q[2][0],q[2][0],q[3])).join('')+
    '<h3 style="margin:8px 0">Ngữ pháp</h3>'+GRA.map((q,i)=>row(i,q[1],a.gra[i],a.gra[i]===q[2][0],q[2][0],q[3])).join('')+
    '<h3 style="margin:8px 0">Reading</h3>'+READ.map((q,i)=>{const r=q[0]==='tf'?q[2]:q[2][0];return row(i,q[1],a.read[i],a.read[i]===r,r,q[3])}).join('')+
    '<h3 style="margin:8px 0">Listening</h3>'+LIS.map((q,i)=>{const ok=chk(a.lis[i],q);return row(i,q[1],a.lis[i],ok,q[2],'Câu đầy đủ ở trên.')}).join('');
}

document.addEventListener('click',e=>{
  if(!el||!el.contains(e.target))return;
  const g=e.target.closest('[data-go]'),c=e.target.closest('[data-a]'),p=e.target.closest('[data-play]');
  if(g){speechSynthesis&&speechSynthesis.cancel&&speechSynthesis.cancel();S.step=+g.dataset.go;draw();el.scrollIntoView({behavior:'smooth',block:'start'});return}
  if(c){const [k,i]=c.dataset.a.split('|');S.a[k][i]=c.dataset.v;c.parentNode.querySelectorAll('.chip').forEach(x=>x.setAttribute('aria-pressed',x===c));return}
  if(p){const i=+p.dataset.play;if((S.plays[i]||0)>=2)return;if(speak(i)){S.plays[i]=(S.plays[i]||0)+1;const n=2-S.plays[i];p.textContent=n?'▶ Nghe ('+n+' lần)':'Hết lượt nghe';p.disabled=!n}
    const inp=el.querySelector('[data-gap="'+i+'"]');inp&&inp.focus();return}
  if(e.target.closest('[data-review]')){const r=el.querySelector('#ptRev');r.innerHTML=r.innerHTML?'':review();return}
  if(e.target.closest('[data-redo]')){S=fresh();draw();return}
  if(e.target.closest('[data-save]')){const R=S.result;api.onSave&&api.onSave(R);e.target.textContent='Đã lưu';e.target.disabled=true}
});
document.addEventListener('input',e=>{if(!el||!el.contains(e.target))return;const t=e.target;if(t.dataset.gap!=null)S.a.lis[t.dataset.gap]=t.value});
document.addEventListener('change',e=>{if(!el||!el.contains(e.target))return;const t=e.target;if(t.dataset.ck){const [k,i]=t.dataset.ck.split('|');S.a[k][i]=t.checked}});
if('speechSynthesis' in window)speechSynthesis.getVoices();

window.IOTest={render};
})();
