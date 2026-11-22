/* IELTS Ocean · Bài test Writing đầu vào: học sinh làm bài có bấm giờ, máy chấm sơ bộ, giáo viên duyệt và gửi kết quả. */
(function(){
const TEACHERS=['lethucanh2607@gmail.com'];
const TEST={id:'entry-w1',name:'Writing đầu vào · Đề 1',min:60,
  t1:'The line graph below gives information about the percentage of women aged 15-64 in employment between 2003 and 2009. Summarise the information by selecting and reporting the main features and make comparisons where relevant.',
  t2:'Intelligence is the most important quality that a leader needs to have. To what extent do you agree or disagree?'};
const YEARS=[2003,2005,2007,2009];
const DATA=[['Iceland','#F4C95D',[81,81,81,78]],['Canada','#9DB4FF',[69,69,70,70]],['Germany','#FF6B6B',[59,60,61,65]],['Chile','#7BD88F',[35,39,40,41]],['Turkey','#2EC4D6',[25,21,22,25]]];
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
let el=null,api=null,tab='do',draft=null,tick=null,cache={mine:null,all:null},openId=null;

function css(){
  if(document.getElementById('wtCss'))return;
  const s=document.createElement('style');s.id='wtCss';s.textContent=`
.wt{display:grid;gap:16px}
.wt-box{border:1px solid var(--line);border-radius:18px;padding:18px;background:var(--card)}
.wt-box h3{margin:0 0 8px;font-size:17px}
.wt-prompt{font-size:15px;line-height:1.6;margin:0 0 12px;padding:12px 14px;border-left:3px solid var(--glow);background:rgba(127,209,255,.06);border-radius:0 12px 12px 0}
.wt-chart{background:rgba(5,11,46,.6);border-radius:14px;padding:8px;border:1px solid var(--line)}
.wt-chart svg{width:100%;height:auto;display:block}
.wt-ta{width:100%;min-height:320px;border-radius:14px;border:1px solid var(--line);background:rgba(5,11,46,.75);color:var(--ink);padding:14px;font:16px/1.7 Inter,sans-serif;resize:vertical}
.wt-ta:focus-visible{outline:2px solid var(--glow);outline-offset:2px}
.wt-meta{display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;font-size:13px;color:var(--mute);margin-top:6px}
.wt-meta b.low{color:#ff9a8a}.wt-meta b.ok{color:#7BD88F}
.wt-timer{position:sticky;top:64px;z-index:5;display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;padding:10px 16px;border-radius:999px;background:rgba(10,31,92,.95);border:1px solid var(--glow);box-shadow:0 10px 30px -15px rgba(0,0,0,.8)}
.wt-timer .clk{font:600 22px Inter,sans-serif;color:var(--glow);font-variant-numeric:tabular-nums}
.wt-timer .clk.warn{color:#ffb48a}
.wt-list{display:grid;gap:10px}
.wt-row{display:grid;grid-template-columns:1fr auto;gap:10px;align-items:center;padding:12px 14px;border-radius:14px;border:1px solid var(--line);background:rgba(5,11,46,.5);cursor:pointer;transition:border-color .2s,transform .2s;text-align:left;color:var(--ink);font:inherit;width:100%}
.wt-row:hover{border-color:var(--glow);transform:translateX(2px)}
.st{font-size:12px;padding:3px 10px;border-radius:999px;white-space:nowrap}
.st.sub{background:rgba(255,190,90,.18);color:#ffd38a}.st.gr{background:rgba(80,200,140,.2);color:#8be3b4}
.wt-text{white-space:pre-wrap;font-size:15px;line-height:1.75;padding:14px;border-radius:14px;background:rgba(5,11,46,.6);border:1px solid var(--line)}
.wt-text mark{background:rgba(255,120,120,.28);color:inherit;border-bottom:2px solid #ff8a8a;border-radius:3px;padding:0 1px;cursor:help}
.wt-text mark.ok{background:rgba(127,209,255,.16);border-bottom-color:var(--glow)}
.wt-flags{margin:10px 0 0;padding-left:18px;font-size:14px;line-height:1.55}
.wt-flags li{margin:3px 0}
.wt-flags .c{font:600 11px Inter,sans-serif;padding:2px 7px;border-radius:999px;background:rgba(127,209,255,.15);color:var(--glow);margin-right:6px}
.wt-crit{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px;margin-top:12px}
.wt-crit label{display:grid;gap:4px;font-size:13px;color:var(--mute)}
.wt-crit select{height:40px;border-radius:999px;border:1px solid var(--line);background:rgba(5,11,46,.85);color:var(--ink);padding:0 12px;font-size:15px}
.wt-crit .auto{font-size:12px;color:var(--glow)}
.wt-cm{width:100%;min-height:90px;border-radius:14px;border:1px solid var(--line);background:rgba(5,11,46,.75);color:var(--ink);padding:12px;font:15px/1.6 Inter,sans-serif;margin-top:10px}
.wt-band{display:flex;gap:10px;flex-wrap:wrap}
.wt-band div{flex:1;min-width:110px;text-align:center;border:1px solid var(--line);border-radius:14px;padding:10px;background:rgba(5,11,46,.5)}
.wt-band b{display:block;font:600 26px Inter,sans-serif;color:var(--glow)}
.wt-band .ov{background:rgba(47,107,255,.3);border-color:var(--glow)}
.wt-act{display:flex;gap:8px;flex-wrap:wrap;justify-content:flex-end}
#wtestView:fullscreen{background:#050B2E;overflow:auto;padding:24px clamp(12px,4vw,48px)}
#wtestView:fullscreen .wt-timer{top:0}
#wtestView:fullscreen{padding:14px clamp(10px,2vw,24px)}
.wt-tabs{display:flex;gap:6px}
.wt-tabs .sub{height:36px}
.wt-split{display:grid;grid-template-columns:var(--wl,45%) 12px minmax(0,1fr);height:calc(100vh - 170px);min-height:420px;margin-top:12px}
#wtestView:fullscreen .wt-split{height:calc(100vh - 92px)}
.wt-left{overflow:auto;padding-right:6px;display:flex;flex-direction:column;gap:12px}
.wt-left .wt-prompt{margin:0;font-size:14px}
.wt-left .wt-chart svg{max-height:52vh}
.wt-gut{cursor:col-resize;display:grid;place-items:center;touch-action:none}
.wt-gut::before{content:'';width:4px;height:48px;border-radius:4px;background:var(--line);transition:background .2s}
.wt-gut:hover::before,.wt-gut.drag::before{background:var(--glow)}
.wt-right{display:flex;flex-direction:column;min-height:0}
.wt-right .wt-ta{flex:1;min-height:0;height:100%;resize:none;font-size:15px}
@media(max-width:820px){.wt-split{grid-template-columns:1fr;height:auto}.wt-gut{display:none}.wt-right .wt-ta{min-height:360px}}
#wtestView::backdrop{background:#050B2E}
.wt-gate{position:fixed;inset:0;z-index:60;display:grid;place-items:center;background:rgba(5,11,46,.95);padding:20px}
.wt-gate .wt-box{max-width:540px;text-align:center;background:rgba(10,31,92,.95)}
.vio{font-size:13px;padding:4px 10px;border-radius:999px;background:rgba(127,209,255,.12);color:var(--mute)}
.vio.on{background:rgba(255,110,110,.22);color:#ffb0b0}
.wt-vlist{margin:6px 0 0;padding-left:18px;font-size:13px;color:#ffb0b0}
`;document.head.appendChild(s);
}

/* ---------- Biểu đồ Task 1 (vẽ lại từ số liệu đề) ---------- */
function chart(){
  const W=720,H=380,L=56,R=20,T=56,B=46,x=i=>L+40+i*((W-L-R-80)/3),y=v=>T+(H-T-B)*(1-v/100);
  let g='';
  for(let v=0;v<=100;v+=20)g+=`<line x1="${L}" x2="${W-R}" y1="${y(v)}" y2="${y(v)}" stroke="rgba(230,244,255,.12)"/><text x="${L-10}" y="${y(v)+4}" text-anchor="end" font-size="12" fill="#cfe3f7">${v}</text>`;
  YEARS.forEach((yr,i)=>g+=`<text x="${x(i)}" y="${H-B+24}" text-anchor="middle" font-size="13" font-weight="600" fill="#E6F4FF">${yr}</text>`);
  DATA.forEach(([n,c,v])=>{g+=`<polyline fill="none" stroke="${c}" stroke-width="3" points="${v.map((d,i)=>x(i)+','+y(d)).join(' ')}"/>`+v.map((d,i)=>`<rect x="${x(i)-5}" y="${y(d)-5}" width="10" height="10" fill="${c}"><title>${n} ${YEARS[i]}: ${d}%</title></rect>`).join('')});
  let lx=L+10;DATA.forEach(([n,c])=>{g+=`<rect x="${lx}" y="16" width="14" height="14" rx="3" fill="${c}"/><text x="${lx+20}" y="28" font-size="14" font-weight="600" fill="#E6F4FF">${n}</text>`;lx+=n.length*9+44});
  g+=`<text x="14" y="${(T+H-B)/2}" transform="rotate(-90 14 ${(T+H-B)/2})" text-anchor="middle" font-size="12" fill="#cfe3f7">% phụ nữ 15–64 tuổi có việc làm</text>`;
  return `<div class="wt-chart"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Biểu đồ đường: tỷ lệ phụ nữ 15–64 tuổi có việc làm ở Iceland, Canada, Germany, Chile, Turkey từ 2003 đến 2009">${g}</svg></div>`;
}

/* ---------- Máy chấm sơ bộ ---------- */
const RX=[
 [/\b(informations|advices|knowledges|researches|equipments|evidences|furnitures|homeworks|feedbacks|staffs)\b/gi,'LR','Danh từ không đếm được, không thêm -s.'],
 [/\b\d+(\.\d+)?\s+(millions|thousands|hundreds|billions)\b/gi,'LR','Sau con số, million/thousand không thêm -s.'],
 [/\bpercents\b/gi,'LR','percent không thêm -s.'],
 [/\b(depend(s|ed|ing)?\s+(of|in)|discuss(es|ed|ing)?\s+about|emphasi[sz]e(s|d)?\s+on|interested\s+(on|about)|responsible\s+of|according\s+with)\b/gi,'LR','Sai giới từ đi kèm.'],
 [/\b\w+n't\b|\b\w+'(re|ve|ll|d)\b|\bI'm\b/g,'LR','Viết tắt là văn nói; bài thi nên viết đầy đủ.'],
 [/\b(more|less)\s+(bigger|smaller|higher|lower|larger|greater|better|worse|easier|cheaper|faster|stronger|longer|wider|richer|poorer|younger|older|smarter|happier|healthier)\b/gi,'GRA','So sánh kép: bỏ more/less.'],
 [/\bthe\s+most\s+\w+est\b/gi,'GRA','So sánh nhất kép.'],
 [/\b(can|could|will|would|should|may|might|must)\s+(can|could|will|would|should|may|might|must)\b/gi,'GRA','Hai động từ khuyết thiếu liền nhau.'],
 [/\b(must|can|should|will|could|would|may|might)\s+to\s+\w+/gi,'GRA','Sau modal không dùng to.'],
 [/\bpeople\s+(is|was|has|does)\b/gi,'GRA','people là số nhiều.'],
 [/\b(he|she|it)\s+(have|do|are|were|don't)\b/gi,'GRA','Hòa hợp chủ ngữ số ít với động từ.'],
 [/,\s+(it|this|they|these|there)\s+(is|are|was|were|has|have|will|can)\b/gi,'GRA','Có thể là comma splice: hai mệnh đề nối chỉ bằng dấu phẩy.'],
 [/(^|[.!?]\s+)[a-z]/g,'GRA','Đầu câu phải viết hoa.'],
 [/\si\s/g,'GRA','Đại từ I phải viết hoa.']
];
const RX1=[
 [/\b(rank(ed|s)?|first place|second place|third place|surpass(ed|es)?|overtook|overtake|won|win|beat)\b/gi,'TA','Giọng "đua xe" trong Task 1: dùng ngôn ngữ báo cáo (was the highest, had the largest share…).'],
 [/\b(I think|I believe|in my opinion|in my view)\b/gi,'TA','Task 1 không đưa ý kiến cá nhân.']
];
const LINK=/^(firstly|secondly|thirdly|first of all|moreover|furthermore|in addition|additionally|besides|however|therefore|thus|hence|finally|lastly|also|on the other hand)\b/i;
const SUB=/\b(which|who|whom|whose|that|because|although|though|while|whereas|if|unless|when|since|as|so that|despite|in order to|not only)\b/i;
const STOP=new Set('the a an and or but of to in on at for with by from as is are was were be been being this that these those it its they them their there which who what when while than then so such into over under between during about more most less least very also can could will would should may might must not no have has had do does did i we you he she his her our your my me us one two three'.split(' '));

function sentences(t){return t.replace(/\s+/g,' ').trim().split(/(?<=[.!?])\s+/).filter(s=>s.trim().split(' ').length>1)}
function paras(t){return t.split(/\n+/).map(x=>x.trim()).filter(x=>x.split(/\s+/).length>3)}
function words(t){return t.match(/[A-Za-z][A-Za-z'-]*/g)||[]}
function wc(t){return (String(t||'').trim().match(/\S+/g)||[]).length}
const clamp=b=>Math.max(4,Math.min(8,Math.floor(b)));

function hits(t,list){const out=[];list.forEach(([rx,c,m])=>{rx.lastIndex=0;let x;while((x=rx.exec(t))){let s=x.index,e=s+x[0].length;if(m==='Đầu câu phải viết hoa.'){s=e-1}out.push({s,e,c,m});if(x[0].length===0)rx.lastIndex++}});return out}

function grade(task,t){
  t=String(t||'');const ws=words(t),n=wc(t),S=sentences(t),Pg=paras(t),F=[];
  const flags=hits(t,RX.concat(task===1?RX1:[]));
  /* lặp từ */
  const cnt={};ws.forEach(w=>{w=w.toLowerCase();if(w.length>3&&!STOP.has(w))cnt[w]=(cnt[w]||0)+1});
  const top=Object.entries(cnt).sort((a,b)=>b[1]-a[1])[0];
  const topic=task===1?/^(women|percentage|employment|iceland|canada|germany|chile|turkey|employed|figure|figures)$/:/^(leader|leaders|intelligence|intelligent|quality|qualities)$/;
  if(top&&n>80&&top[1]/n>0.035&&!topic.test(top[0]))F.push(['LR','Lặp từ "'+top[0]+'" '+top[1]+' lần: tìm cách thay thế.']);
  /* câu quá dài */
  S.forEach(s=>{if(s.split(' ').length>45)F.push(['GRA','Câu quá dài ('+s.split(' ').length+' từ), dễ rối: "'+s.slice(0,60)+'…"'])});
  const lk=S.filter(s=>LINK.test(s.trim())).length,ratio=S.length?lk/S.length:0;
  const linkSet=new Set((t.match(/\b(firstly|secondly|moreover|furthermore|in addition|however|therefore|thus|while|whereas|in contrast|similarly|meanwhile|consequently|as a result|for example|for instance|in conclusion|overall)\b/gi)||[]).map(x=>x.toLowerCase()));
  if(ratio>0.5&&S.length>=5)F.push(['CC','Hơn nửa số câu mở đầu bằng từ nối: dễ bị coi là máy móc.']);
  const refs=(t.match(/\b(this|these|such|which|its|their|the former|the latter)\b/gi)||[]).length;
  const cx=S.length?S.filter(s=>SUB.test(s)).length/S.length:0,avgS=S.length?n/S.length:0;
  const uniq=new Set(ws.filter(w=>w.length>=3).map(w=>w.toLowerCase())).size,guiraud=uniq/Math.sqrt(Math.max(1,ws.filter(w=>w.length>=3).length));
  const avgL=ws.length?ws.reduce((a,w)=>a+w.length,0)/ws.length:0;
  const e=c=>flags.filter(f=>f.c===c).length+F.filter(f=>f[0]===c).length;
  let A,CC=5,LR=5,GRA=5;
  if(task===1){
    A=4.5;
    const ov=/\b(overall|in general|generally|it is (clear|evident|noticeable|obvious)|it can be seen|as can be seen|at a glance)\b/i.test(t);
    const ctry=DATA.filter(([c])=>new RegExp('\\b'+c+'\\b','i').test(t)).length;
    const nums=(t.match(/\d+(\.\d+)?\s*(%|percent|per cent)/gi)||[]).length;
    const cmp=(t.match(/\b(higher|lower|than|whereas|while|compared|in contrast|the highest|the lowest|similar|twice|double)\b/gi)||[]).length;
    const yrs=YEARS.filter(y=>t.includes(String(y))).length;
    if(ov)A+=1;else F.push(['TA','Không thấy câu overview (Overall / It is clear that…). Thiếu overview khó vượt band 5.']);
    if(ctry>=4)A+=.5;else F.push(['TA','Mới nhắc '+ctry+'/5 quốc gia.']);
    if(nums>=6)A+=.5;else F.push(['TA','Ít số liệu minh họa ('+nums+' con số %).']);
    if(cmp>=3)A+=.5;else F.push(['TA','Ít so sánh giữa các quốc gia.']);
    if(yrs<2)F.push(['TA','Thiếu mốc năm (2003, 2009…).']);
    /* đối chiếu số liệu */
    let bad=0;S.forEach(s=>{const cs=DATA.filter(([c])=>new RegExp('\\b'+c+'\\b','i').test(s));if(!cs.length)return;const vals=cs.flatMap(d=>d[2]);
      (s.match(/\d+(\.\d+)?(?=\s*(%|percent|per cent))/gi)||[]).forEach(v=>{v=+v;if(!vals.some(d=>Math.abs(d-v)<=3)&&!(v<=20&&cs.length>=1&&/\b(by|of|around|nearly|about|points?)\b/i.test(s))){bad++;F.push(['TA','Số liệu có thể sai: '+v+'% trong câu về '+cs.map(d=>d[0]).join(', ')+'.'])}})});
    A-=Math.min(1.5,bad*.5);
    if(n<150){A-=n<100?2:1;F.push(['TA','Bài '+n+' từ, dưới 150 từ.'])}
    A-=Math.min(1,e('TA')*.5);
    if(Pg.length>=3)CC+=1;else if(Pg.length<=1){CC-=1;F.push(['CC','Không chia đoạn.'])}
  }else{
    A=4.5;
    const pos=/\b(I (completely |strongly |partly |totally |firmly |fully |largely )?(agree|disagree)|I believe|in my (opinion|view)|I would argue|I am convinced)\b/i;
    const first=Pg[0]||'',last=Pg[Pg.length-1]||'';
    if(pos.test(first))A+=1;else F.push(['TR','Mở bài chưa nêu rõ quan điểm (đồng ý / không đồng ý đến mức nào).']);
    if(Pg.length>1&&(pos.test(last)||/\b(In conclusion|To conclude|To sum up|In summary)\b/i.test(last)))A+=.5;else F.push(['TR','Kết bài chưa nhắc lại quan điểm.']);
    if(/\b(for example|for instance|such as|e\.g\.)/i.test(t))A+=.5;else F.push(['TR','Chưa có ví dụ cụ thể.']);
    if(/\bleader/i.test(t)&&/\bintelligen/i.test(t))A+=.5;else F.push(['TR','Chưa bám từ khóa của đề (leader, intelligence).']);
    if(/\b(honest|integrity|empathy|communicat|vision|courage|decisive|responsib|trust|experience|charisma|moral)/i.test(t))A+=.5;else F.push(['TR','Chưa so sánh trí thông minh với phẩm chất khác: đề hỏi "most important".']);
    if(n<250){A-=n<180?2:1;F.push(['TR','Bài '+n+' từ, dưới 250 từ.'])}
    if(Pg.length>=4)CC+=1;else if(Pg.length<=2){CC-=1;F.push(['CC','Chỉ có '+Pg.length+' đoạn; nên có mở bài, 2 thân bài, kết bài.'])}
  }
  if(linkSet.size>=4)CC+=.5;
  if(refs>=3)CC+=.5;
  CC-=Math.min(1.5,e('CC')*.5);
  LR+=guiraud>=7.5?1.5:guiraud>=6.5?1:guiraud>=5.5?.5:0;
  if(avgL>=4.7)LR+=.5;
  LR-=Math.min(1.5,e('LR')*.5);
  GRA+=cx>=.5?1:cx>=.3?.5:0;
  if(avgS>=14&&avgS<=28)GRA+=.5;
  GRA-=Math.min(2,e('GRA')*.5);
  const crit=task===1?{TA:clamp(A),CC:clamp(CC),LR:clamp(LR),GRA:clamp(GRA)}:{TR:clamp(A),CC:clamp(CC),LR:clamp(LR),GRA:clamp(GRA)};
  return{crit,flags,notes:F,n};
}
function taskBand(o){const v=Object.values(o).map(Number);return v.reduce((a,b)=>a+b,0)/v.length}
function overall(g1,g2){return Math.round(((taskBand(g1)+2*taskBand(g2))/3)*2+1e-9)/2}

function marked(t,flags){
  const f=flags.slice().sort((a,b)=>a.s-b.s);let out='',i=0;
  f.forEach(x=>{if(x.s<i)return;out+=esc(t.slice(i,x.s))+`<mark title="${esc(x.c+': '+x.m)}">${esc(t.slice(x.s,x.e))}</mark>`;i=x.e});
  return out+esc(t.slice(i));
}
function flagList(g){
  const seen=new Set(),items=[];
  g.flags.forEach(f=>{const k=f.c+f.m;if(seen.has(k))return;seen.add(k);const n=g.flags.filter(x=>x.c+x.m===k).length;items.push([f.c,f.m+(n>1?' ('+n+' chỗ)':'')])});
  g.notes.forEach(x=>items.push(x));
  return items.length?`<ul class="wt-flags">${items.map(([c,m])=>`<li><span class="c">${c}</span>${esc(m)}</li>`).join('')}</ul>`:'<p class="small">Máy không bắt được lỗi nào có mẫu sẵn.</p>';
}

/* ---------- Khung chung ---------- */
const me=()=>api.user();
const isTeacher=()=>{const u=me();return !!u&&TEACHERS.includes((u.email||'').toLowerCase())};
const F=()=>api.fb();
function render(target,a){
  el=target;api=a;css();
  const tabs=[['do','Làm bài'],['mine','Bài của tôi']].concat(isTeacher()?[['grade','Chấm bài']]:[]);
  if(!tabs.some(x=>x[0]===tab))tab='do';
  el.innerHTML=`<div class="wt">
    <div class="segnav"><h2 style="margin:0">Bài test Writing</h2><div class="subtabs" role="tablist" style="margin:0">${tabs.map(([k,l])=>`<button class="sub" role="tab" type="button" data-wt="${k}" aria-selected="${tab===k}">${l}</button>`).join('')}</div></div>
    <div id="wtBody"></div></div>`;
  el.querySelector('.subtabs').onclick=e=>{const b=e.target.closest('[data-wt]');if(!b)return;tab=b.dataset.wt;openId=null;cache.mine=null;cache.all=null;render(el,api)};
  if(api.mode()!=='cloud'||!me()){el.querySelector('#wtBody').innerHTML=`<div class="wt-box"><h3>Cần đăng nhập</h3><p>Bài test Writing được giáo viên chấm, nên bạn cần đăng nhập bằng Google hoặc email để nộp bài và xem kết quả. Chế độ dùng thử không nộp bài được.</p><button class="btn pri" type="button" data-login>Đăng nhập</button></div>`;
    el.querySelector('[data-login]').onclick=()=>api.login();return}
  ({do:renderDo,mine:renderMine,grade:renderGrade})[tab]();
}

/* ---------- Chế độ thi: toàn màn hình, chặn copy/paste, bắt chuyển tab ---------- */
const VNAME={tab:'Chuyển tab hoặc thu nhỏ trình duyệt',blur:'Rời khỏi cửa sổ làm bài',fs:'Thoát chế độ toàn màn hình',copy:'Sao chép chữ',cut:'Cắt chữ',paste:'Dán chữ vào bài',drop:'Kéo thả chữ vào bài',reload:'Tải lại hoặc đóng trang khi đang làm'};
const FS=()=>document.fullscreenElement||document.webkitFullscreenElement;
const canFS=()=>{const d=document.documentElement;return !!(d.requestFullscreen||d.webkitRequestFullscreen)};
function goFS(){if(!el||FS())return;try{const r=(el.requestFullscreen||el.webkitRequestFullscreen).call(el);r&&r.catch&&r.catch(()=>{})}catch(e){}}
function leaveFS(){try{if(FS())(document.exitFullscreen||document.webkitExitFullscreen).call(document)}catch(e){}}
function active(){return !!(el&&!el.hidden&&tab==='do'&&draft&&draft.start&&document.getElementById('wtClk'))}
let lastV=0,session=false;
function violate(type){
  if(!active())return;const now=Date.now();if(now-lastV<1500)return;lastV=now;
  (draft.v=draft.v||[]).push({type,at:now});saveDraft();updV();gate(type);
}
function updV(){const e=document.getElementById('wtV');if(!e)return;const n=(draft&&draft.v||[]).length;e.textContent='Vi phạm: '+n;e.className='vio'+(n?' on':'')}
function gate(type){
  const old=el.querySelector('.wt-gate');old&&old.remove();
  if(!type&&(!canFS()||FS()))return;
  const n=(draft.v||[]).length;
  el.insertAdjacentHTML('beforeend',`<div class="wt-gate" data-k="${type||''}" role="alertdialog" aria-modal="true" aria-labelledby="wtGT"><div class="wt-box">
    <h3 id="wtGT">${type?'Đã ghi nhận vi phạm: '+esc(VNAME[type]||type):'Bài đang làm dở'}</h3>
    <p>${type?'Bạn đã có <b>'+n+'</b> lần vi phạm. Giáo viên sẽ thấy số lần và thời điểm từng lần. Đồng hồ vẫn đang chạy.':'Bài thi chỉ làm được ở chế độ toàn màn hình. Đồng hồ vẫn đang chạy.'}</p>
    <button class="btn pri" type="button" data-back-test>${canFS()?'Quay lại làm bài (toàn màn hình)':'Quay lại làm bài'}</button></div></div>`);
  el.querySelector('[data-back-test]').onclick=()=>{goFS();const g=el.querySelector('.wt-gate');g&&g.remove();const t=el.querySelector('.wt-ta');t&&t.focus()};
}
document.addEventListener('visibilitychange',()=>{if(document.hidden)violate('tab')});
window.addEventListener('blur',()=>setTimeout(()=>{if(!document.hasFocus())violate(document.hidden?'tab':'blur')},300));
['fullscreenchange','webkitfullscreenchange'].forEach(ev=>document.addEventListener(ev,()=>{if(FS()){const g=el&&el.querySelector('.wt-gate[data-k=""]');g&&g.remove();return}if(active())violate('fs')}));
['copy','cut','paste','drop'].forEach(ev=>document.addEventListener(ev,e=>{if(!active())return;e.preventDefault();violate(ev)},true));
['contextmenu','dragstart'].forEach(ev=>document.addEventListener(ev,e=>{if(active())e.preventDefault()},true));
document.addEventListener('beforeinput',e=>{if(active()&&/^insertFrom(Paste|Drop)/.test(e.inputType)){e.preventDefault();violate('paste')}},true);
document.addEventListener('keydown',e=>{if(!active())return;const k=(e.key||'').toLowerCase();
  if(((e.ctrlKey||e.metaKey)&&['c','v','x','insert'].includes(k))||(e.shiftKey&&k==='insert')){e.preventDefault();violate(k==='c'||k==='insert'&&!e.shiftKey?'copy':k==='x'?'cut':'paste')}},true);

/* ---------- Học sinh làm bài ---------- */
const DKEY=()=>'io-wtest-'+TEST.id+'-'+me().uid;
function loadDraft(){try{return JSON.parse(localStorage.getItem(DKEY()))||null}catch(e){return null}}
function saveDraft(){try{localStorage.setItem(DKEY(),JSON.stringify(draft))}catch(e){}}
function left(){return Math.max(0,Math.round((draft.start+TEST.min*60000-Date.now())/1000))}
const mmss=s=>String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0');

function renderDo(){
  const b=el.querySelector('#wtBody');draft=loadDraft();clearInterval(tick);
  if(!draft||!draft.start){
    b.innerHTML=`<div class="wt-box"><h3>${TEST.name}</h3>
      <p>Bài gồm Task 1 (ít nhất 150 từ) và Task 2 (ít nhất 250 từ), tổng thời gian <b>${TEST.min} phút</b>. Nên dành khoảng 20 phút cho Task 1 và 40 phút cho Task 2.</p>
      <ul class="small" style="line-height:1.7"><li>Đồng hồ chạy từ lúc bấm Bắt đầu, kể cả khi bạn đóng trang. Bài nháp tự lưu trên máy này.</li><li>Hết giờ, bài sẽ tự nộp.</li><li>Sau khi nộp, máy chấm sơ bộ rồi giáo viên duyệt; kết quả hiện ở tab "Bài của tôi".</li><li>Không dùng từ điển, công cụ dịch hay AI để kết quả phản ánh đúng trình độ.</li></ul>
      <div class="wt-box" style="background:rgba(255,110,110,.08);border-color:rgba(255,150,150,.35);padding:14px"><b>Chế độ thi</b>
      <ul class="small" style="line-height:1.7;margin:6px 0 0"><li>Bài làm ở chế độ toàn màn hình.</li><li>Không sao chép, cắt hay dán chữ.</li><li>Không chuyển tab, chuyển cửa sổ, thoát toàn màn hình hay tải lại trang.</li><li>Mỗi lần vi phạm đều bị ghi lại kèm thời điểm, và giáo viên sẽ thấy khi chấm.</li></ul></div>
      <label style="display:grid;gap:6px;max-width:420px;margin:12px 0">Họ tên hiển thị với giáo viên<input id="wtName" class="search" style="height:44px" value="${esc(me().displayName||'')}" autocomplete="name"></label>
      <button class="btn pri" type="button" data-start>Bắt đầu làm bài</button></div>`;
    b.querySelector('[data-start]').onclick=()=>{const nm=b.querySelector('#wtName').value.trim();if(!nm){b.querySelector('#wtName').focus();return}draft={start:Date.now(),name:nm,t1:'',t2:'',v:[]};saveDraft();session=true;goFS();renderDo()};
    return;
  }
  const s=left();
  const task=draft.cur||1,pane=k=>`<div class="wt-split" data-pane="${k}" ${task===k?'':'hidden'}>
      <div class="wt-left"><p class="wt-prompt">${esc(k===1?TEST.t1:TEST.t2)}</p>${k===1?chart():'<p class="small" style="margin:0">Viết ít nhất 250 từ. Nên dành khoảng 40 phút.</p>'}</div>
      <div class="wt-gut" role="separator" aria-orientation="vertical" aria-label="Kéo để chia lại màn hình" tabindex="0"></div>
      <div class="wt-right"><textarea class="wt-ta" data-t="t${k}" spellcheck="false" autocomplete="off" aria-label="Bài làm Task ${k}">${esc(draft['t'+k])}</textarea>
        <div class="wt-meta"><span>Tối thiểu ${k===1?150:250} từ · khoảng ${k===1?20:40} phút</span><span>Số từ: <b id="wc${k}">0</b></span></div></div></div>`;
  b.innerHTML=`<div class="wt-timer" role="timer"><span class="wt-tabs" role="tablist">${[1,2].map(k=>`<button type="button" class="sub" role="tab" data-task-tab="${k}" aria-selected="${task===k}">Task ${k} · <span data-wcs="${k}">0</span> từ</button>`).join('')}</span>
      <span>Còn lại <span class="clk${s<600?' warn':''}" id="wtClk">${mmss(s)}</span></span>
      <span class="wt-act"><span class="vio" id="wtV">Vi phạm: 0</span><span class="small" id="wtSaved"></span><button class="btn pri" type="button" data-submit style="height:40px">Nộp bài</button></span></div>
    ${pane(1)}${pane(2)}
    <div class="wt-act" id="wtConfirm"></div>`;
  const upd=()=>{[1,2].forEach(i=>{const n=wc(draft['t'+i]),e=b.querySelector('#wc'+i);e.textContent=n;e.className=n>=(i===1?150:250)?'ok':'low';b.querySelector('[data-wcs="'+i+'"]').textContent=n})};upd();
  try{const w=localStorage.getItem('io-wtest-split');if(w)b.style.setProperty('--wl',w)}catch(e){}
  b.querySelector('.wt-tabs').onclick=e=>{const t=e.target.closest('[data-task-tab]');if(!t)return;draft.cur=+t.dataset.taskTab;saveDraft();
    b.querySelectorAll('[data-task-tab]').forEach(x=>x.setAttribute('aria-selected',x===t));b.querySelectorAll('[data-pane]').forEach(p=>p.hidden=+p.dataset.pane!==draft.cur);
    const ta=b.querySelector('[data-pane="'+draft.cur+'"] .wt-ta');ta&&ta.focus()};
  b.querySelectorAll('.wt-gut').forEach(g=>{
    const set=pct=>{pct=Math.max(25,Math.min(70,pct));b.style.setProperty('--wl',pct+'%');try{localStorage.setItem('io-wtest-split',pct+'%')}catch(e){}};
    g.onpointerdown=e=>{e.preventDefault();g.setPointerCapture(e.pointerId);g.classList.add('drag');const box=g.parentNode.getBoundingClientRect();
      g.onpointermove=m=>set((m.clientX-box.left)/box.width*100);
      g.onpointerup=()=>{g.classList.remove('drag');g.onpointermove=null}};
    g.onkeydown=e=>{const cur=parseFloat(getComputedStyle(b).getPropertyValue('--wl'))||45;if(e.key==='ArrowLeft')set(cur-3);if(e.key==='ArrowRight')set(cur+3)};
  });
  b.oninput=e=>{const t=e.target.dataset.t;if(!t)return;draft[t]=e.target.value;saveDraft();upd();b.querySelector('#wtSaved').textContent='Đã lưu '+new Date().toLocaleTimeString('vi-VN',{hour:'2-digit',minute:'2-digit',second:'2-digit'})};
  b.querySelector('[data-submit]').onclick=()=>{const c=b.querySelector('#wtConfirm'),n1=wc(draft.t1),n2=wc(draft.t2);
    c.innerHTML=`<div class="wt-box" style="width:100%"><p style="margin:0 0 10px">Nộp bài: Task 1 có ${n1} từ, Task 2 có ${n2} từ.${n1<150||n2<250?' <b style="color:#ffb48a">Có task chưa đủ số từ tối thiểu.</b>':''} Sau khi nộp không sửa được nữa.</p>
      <div class="wt-act"><button class="btn" type="button" data-cancel>Làm tiếp</button><button class="btn pri" type="button" data-yes>Nộp ngay</button></div><p class="err" id="wtErr" role="alert"></p></div>`;
    c.querySelector('[data-cancel]').onclick=()=>c.innerHTML='';c.querySelector('[data-yes]').onclick=()=>submit(false);c.scrollIntoView({behavior:'smooth',block:'center'})};
  updV();
  if(!session){session=true;lastV=0;(draft.v=draft.v||[]).push({type:'reload',at:Date.now()});saveDraft();updV();gate('reload')}
  else if(canFS()&&!FS())gate(null);
  tick=setInterval(()=>{const k=document.getElementById('wtClk');if(!k){clearInterval(tick);return}const s=left();k.textContent=mmss(s);k.className='clk'+(s<600?' warn':'');if(s<=0){clearInterval(tick);submit(true)}},1000);
}

async function submit(auto){
  const f=F(),u=me();if(!f||!u||!draft)return;
  const err=document.getElementById('wtErr');
  const g1=grade(1,draft.t1),g2=grade(2,draft.t2);
  const doc={uid:u.uid,email:u.email||'',name:draft.name||u.displayName||'',testId:TEST.id,status:'submitted',
    t1:draft.t1,t2:draft.t2,w1:g1.n,w2:g2.n,used:Math.min(TEST.min*60,Math.round((Date.now()-draft.start)/1000)),auto:{t1:g1.crit,t2:g2.crit,overall:overall(g1.crit,g2.crit)},autoSubmit:!!auto,violations:(draft.v||[]).map(x=>({type:x.type,at:x.at})),vcount:(draft.v||[]).length,createdAt:f.serverTimestamp()};
  try{
    await f.addDoc(f.collection(f.db,'submissions'),doc);
    try{localStorage.removeItem(DKEY())}catch(e){}
    draft=null;leaveFS();cache.mine=null;tab='mine';render(el,api);api.toast&&api.toast(auto?'Hết giờ, bài đã được nộp tự động':'Đã nộp bài');
  }catch(e){console.error(e);if(err)err.textContent='Chưa nộp được ('+(e.code||e.message)+'). Bài nháp vẫn còn, thử lại sau ít phút.';else alertFail()}
}
function alertFail(){const b=el.querySelector('#wtBody');b&&b.insertAdjacentHTML('afterbegin','<p class="err" role="alert">Hết giờ nhưng chưa nộp được bài. Bài nháp vẫn còn, bấm Nộp bài để thử lại.</p>')}

/* ---------- Học sinh xem kết quả ---------- */
const when=d=>{try{const t=d&&d.toDate?d.toDate():new Date(d);return t.toLocaleString('vi-VN',{day:'2-digit',month:'2-digit',year:'numeric',hour:'2-digit',minute:'2-digit'})}catch(e){return''}};
async function renderMine(){
  const b=el.querySelector('#wtBody');b.innerHTML='<p class="small">Đang tải…</p>';
  try{
    if(!cache.mine){const f=F(),s=await f.getDocs(f.query(f.collection(f.db,'submissions'),f.where('uid','==',me().uid)));cache.mine=s.docs.map(d=>({id:d.id,...d.data()})).sort((a,b)=>(b.createdAt&&b.createdAt.seconds||0)-(a.createdAt&&a.createdAt.seconds||0))}
  }catch(e){b.innerHTML='<p class="err">Không tải được bài ('+esc(e.code||e.message)+').</p>';return}
  const L=cache.mine;
  if(openId){const d=L.find(x=>x.id===openId);if(d){b.innerHTML=result(d,false);b.querySelector('[data-back]').onclick=()=>{openId=null;renderMine()};return}}
  b.innerHTML=L.length?`<div class="wt-list">${L.map(d=>`<button type="button" class="wt-row" data-open="${d.id}"><span><b>${esc(TEST.name)}</b><br><span class="small">Nộp ${when(d.createdAt)} · Task 1: ${d.w1} từ · Task 2: ${d.w2} từ</span></span>${d.status==='graded'?`<span class="st gr">Đã chấm · ${Number(d.grade.overall).toFixed(1)}</span>`:'<span class="st sub">Chờ giáo viên chấm</span>'}</button>`).join('')}</div>`
    :`<div class="wt-box"><p style="margin:0">Bạn chưa nộp bài nào. Vào tab "Làm bài" để bắt đầu.</p></div>`;
  b.onclick=e=>{const r=e.target.closest('[data-open]');if(r){openId=r.dataset.open;renderMine()}};
}
function result(d,teacher){
  const graded=d.status==='graded'&&d.grade,G=graded?d.grade:null;
  const g1=grade(1,d.t1),g2=grade(2,d.t2);
  const crits=(g,k)=>['TA','TR','CC','LR','GRA'].filter(c=>c in g).map(c=>[c,g[c]]).map(([c,v])=>`<div><span class="small">${c}</span><b>${v}</b></div>`).join('');
  return `<div class="wt">
    <button class="linkbtn" type="button" data-back style="justify-self:start">← Danh sách bài</button>
    ${graded?`<div class="wt-box"><h3>Kết quả</h3><div class="wt-band"><div class="ov"><span class="small">Writing</span><b>${Number(G.overall).toFixed(1)}</b></div>${crits(G.t1)}</div>
      <p class="small" style="margin:8px 0 4px">Task 1 ở trên · Task 2 bên dưới (Task 2 tính gấp đôi)</p><div class="wt-band">${crits(G.t2)}</div>
      ${G.comment?`<p style="white-space:pre-wrap;margin:14px 0 0"><b>Nhận xét chung:</b> ${esc(G.comment)}</p>`:''}<p class="small" style="margin:8px 0 0">Chấm ngày ${when(G.at)}</p></div>`
      :`<div class="wt-box"><p style="margin:0">Bài đang chờ giáo viên chấm. Kết quả sẽ hiện ở đây.</p></div>`}
    ${d.vcount?`<p class="small" style="margin:0;color:#ffb0b0">Bài này có ${d.vcount} lần vi phạm chế độ thi.</p>`:''}
    <div class="wt-box"><h3>Task 1 · ${d.w1} từ</h3>${graded&&G.c1?`<p style="white-space:pre-wrap"><b>Nhận xét:</b> ${esc(G.c1)}</p>`:''}<div class="wt-text">${graded?marked(d.t1,g1.flags):esc(d.t1)}</div>${graded?'<p class="small" style="margin:10px 0 0">Lỗi máy tìm thấy (để bạn tự sửa):</p>'+flagList(g1):''}</div>
    <div class="wt-box"><h3>Task 2 · ${d.w2} từ</h3>${graded&&G.c2?`<p style="white-space:pre-wrap"><b>Nhận xét:</b> ${esc(G.c2)}</p>`:''}<div class="wt-text">${graded?marked(d.t2,g2.flags):esc(d.t2)}</div>${graded?'<p class="small" style="margin:10px 0 0">Lỗi máy tìm thấy (để bạn tự sửa):</p>'+flagList(g2):''}</div>
  </div>`;
}

/* ---------- Giáo viên chấm ---------- */
async function renderGrade(){
  const b=el.querySelector('#wtBody');if(!isTeacher()){b.innerHTML='';return}
  b.innerHTML='<p class="small">Đang tải bài của học sinh…</p>';
  try{if(!cache.all){const f=F(),s=await f.getDocs(f.collection(f.db,'submissions'));cache.all=s.docs.map(d=>({id:d.id,...d.data()}))}}
  catch(e){b.innerHTML='<p class="err">Không tải được ('+esc(e.code||e.message)+'). Kiểm tra quy tắc Firestore cho collection submissions.</p>';return}
  const L=cache.all.slice().sort((a,b)=>(a.status==='graded')-(b.status==='graded')||(b.createdAt&&b.createdAt.seconds||0)-(a.createdAt&&a.createdAt.seconds||0));
  if(openId){const d=L.find(x=>x.id===openId);if(d){gradeOne(b,d);return}}
  const pend=L.filter(x=>x.status!=='graded').length;
  b.innerHTML=`<div class="segnav" style="margin-bottom:10px"><p style="margin:0">${pend} bài chờ chấm · ${L.length-pend} bài đã chấm</p><button class="btn" type="button" data-reload style="height:38px">Tải lại</button></div>
    ${L.length?`<div class="wt-list">${L.map(d=>`<button type="button" class="wt-row" data-open="${d.id}"><span><b>${esc(d.name||d.email)}</b> <span class="small">${esc(d.email)}</span><br><span class="small">Nộp ${when(d.createdAt)} · ${Math.round((d.used||0)/60)} phút${d.autoSubmit?' (hết giờ tự nộp)':''}${d.vcount?' · <b style="color:#ffb0b0">'+d.vcount+' vi phạm</b>':''} · T1 ${d.w1} từ · T2 ${d.w2} từ · máy gợi ý ${d.auto?Number(d.auto.overall).toFixed(1):'–'}</span></span>${d.status==='graded'?`<span class="st gr">Đã chấm · ${Number(d.grade.overall).toFixed(1)}</span>`:'<span class="st sub">Chờ chấm</span>'}</button>`).join('')}</div>`:'<div class="wt-box"><p style="margin:0">Chưa có học sinh nào nộp bài.</p></div>'}`;
  b.onclick=e=>{const r=e.target.closest('[data-open]');if(r){openId=r.dataset.open;renderGrade();return}if(e.target.closest('[data-reload]')){cache.all=null;renderGrade()}};
}
function gradeOne(b,d){
  const g1=grade(1,d.t1),g2=grade(2,d.t2),G=d.grade||{};
  const cur1=G.t1||g1.crit,cur2=G.t2||g2.crit;
  const sel=(task,c,v,auto)=>`<label>${c}<select data-task="${task}" data-c="${c}">${[9,8,7,6,5,4,3,2,1,0].map(x=>`<option${+v===x?' selected':''}>${x}</option>`).join('')}</select><span class="auto">Máy gợi ý: ${auto}</span></label>`;
  b.innerHTML=`<div class="wt">
    <button class="linkbtn" type="button" data-back style="justify-self:start">← Danh sách bài</button>
    <div class="wt-box"><h3>${esc(d.name||d.email)} <span class="small">${esc(d.email)}</span></h3>
      <p class="small" style="margin:0">Nộp ${when(d.createdAt)} · làm ${Math.round((d.used||0)/60)} phút${d.autoSubmit?' · hết giờ tự nộp':''}${d.status==='graded'?' · đã gửi kết quả '+when(G.at):''}</p>
      ${d.vcount?`<p style="margin:8px 0 0;color:#ffb0b0"><b>${d.vcount} lần vi phạm chế độ thi</b></p><ul class="wt-vlist">${(d.violations||[]).map(x=>`<li>${new Date(x.at).toLocaleTimeString('vi-VN')} · ${esc(VNAME[x.type]||x.type)}</li>`).join('')}</ul>`:'<p class="small" style="margin:6px 0 0">Không có vi phạm chế độ thi.</p>'}
      <p class="small" style="margin:6px 0 0">Điểm máy chỉ là gợi ý dựa trên độ dài, cấu trúc và các lỗi có mẫu. Máy không đọc hiểu được lập luận: hãy chỉnh lại trước khi gửi.</p></div>
    <div class="wt-box"><h3>Task 1 · ${d.w1} từ</h3><details><summary class="small" style="cursor:pointer;color:var(--glow)">Xem đề và biểu đồ</summary><p class="wt-prompt" style="margin-top:8px">${esc(TEST.t1)}</p>${chart()}</details>
      <div class="wt-text" style="margin-top:10px">${marked(d.t1,g1.flags)}</div>${flagList(g1)}
      <div class="wt-crit">${Object.keys(g1.crit).map(c=>sel(1,c,cur1[c],g1.crit[c])).join('')}</div>
      <textarea class="wt-cm" data-cm="c1" placeholder="Nhận xét Task 1 cho học sinh">${esc(G.c1||'')}</textarea></div>
    <div class="wt-box"><h3>Task 2 · ${d.w2} từ</h3><p class="wt-prompt">${esc(TEST.t2)}</p>
      <div class="wt-text">${marked(d.t2,g2.flags)}</div>${flagList(g2)}
      <div class="wt-crit">${Object.keys(g2.crit).map(c=>sel(2,c,cur2[c],g2.crit[c])).join('')}</div>
      <textarea class="wt-cm" data-cm="c2" placeholder="Nhận xét Task 2 cho học sinh">${esc(G.c2||'')}</textarea></div>
    <div class="wt-box"><h3>Tổng kết</h3><div class="wt-band" id="wtSum"></div>
      <textarea class="wt-cm" data-cm="comment" placeholder="Nhận xét chung, lộ trình gợi ý cho học sinh">${esc(G.comment||'')}</textarea>
      <div class="wt-act" style="margin-top:12px"><button class="btn" type="button" data-del>Xóa bài</button><button class="btn pri" type="button" data-send>${d.status==='graded'?'Cập nhật kết quả':'Gửi kết quả cho học sinh'}</button></div><p class="err" id="wtGErr" role="alert"></p></div>
  </div>`;
  const read=()=>{const o={t1:{},t2:{}};b.querySelectorAll('select[data-task]').forEach(s=>o['t'+s.dataset.task][s.dataset.c]=+s.value);return o};
  const sum=()=>{const o=read(),ov=overall(o.t1,o.t2);b.querySelector('#wtSum').innerHTML=`<div class="ov"><span class="small">Writing</span><b>${ov.toFixed(1)}</b></div><div><span class="small">Task 1 TB</span><b>${taskBand(o.t1).toFixed(2)}</b></div><div><span class="small">Task 2 TB</span><b>${taskBand(o.t2).toFixed(2)}</b></div>`;return ov};
  sum();b.onchange=e=>{if(e.target.dataset.task)sum()};
  b.onclick=async e=>{
    if(e.target.closest('[data-back]')){openId=null;renderGrade();return}
    const f=F(),ref=f.doc(f.db,'submissions',d.id),er=b.querySelector('#wtGErr');
    if(e.target.closest('[data-send]')){const o=read(),btn=e.target.closest('[data-send]');btn.disabled=true;
      const g={t1:o.t1,t2:o.t2,overall:sum(),c1:b.querySelector('[data-cm=c1]').value.trim(),c2:b.querySelector('[data-cm=c2]').value.trim(),comment:b.querySelector('[data-cm=comment]').value.trim(),at:new Date().toISOString(),by:me().email};
      try{await f.updateDoc(ref,{status:'graded',grade:g});Object.assign(d,{status:'graded',grade:g});api.toast&&api.toast('Đã gửi kết quả cho '+(d.name||d.email));openId=null;renderGrade()}
      catch(x){er.textContent='Chưa lưu được ('+(x.code||x.message)+').';btn.disabled=false}}
    const del=e.target.closest('[data-del]');
    if(del){if(del.dataset.sure!=='1'){del.dataset.sure='1';del.textContent='Bấm lần nữa để xóa hẳn';return}
      try{await f.deleteDoc(ref);cache.all=cache.all.filter(x=>x.id!==d.id);openId=null;renderGrade()}catch(x){er.textContent='Chưa xóa được ('+(x.code||x.message)+').'}}
  };
}

window.IOWTest={render,grade,TEACHERS};
})();
