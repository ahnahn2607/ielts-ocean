/* IELTS Ocean · Hôm nay: ngày hiện tại, mục tiêu, sở thích học và gợi ý hôm nay. */
(function(){
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const HALF=['9.0','8.5','8.0','7.5','7.0','6.5','6.0','5.5','5.0','4.5','4.0'];
const SKILLS=[['L','Listening'],['R','Reading'],['W','Writing'],['S','Speaking']];
/* g = nhóm sở thích: m = chọn nhiều, s = chọn một */
const PREFS=[
  {k:'purpose',m:0,t:'Bạn thi IELTS để làm gì?',o:['Du học','Định cư','Chuẩn đầu ra, tốt nghiệp','Xin việc','Học bổng, trao đổi','Thử sức bản thân']},
  {k:'topics',m:1,t:'Chủ đề bạn thích nghe, đọc',h:'Dùng để chọn video Dictation, bài đọc và ví dụ từ vựng hợp gu.',o:['Marketing & kinh doanh','Công nghệ & AI','Tâm lý & phát triển bản thân','Phim & series','Âm nhạc & K-pop','Du lịch','Ẩm thực','Thời trang & làm đẹp','Thể thao & sức khỏe','Khoa học & tự nhiên','Môi trường','Xã hội & văn hóa','Gia đình & các mối quan hệ','Game & giải trí']},
  {k:'focus',m:1,t:'Muốn ưu tiên luyện gì?',h:'Để trống thì web tự chọn theo điểm yếu nhất bạn nhập ở "Luật rừng".',o:['Listening','Reading','Writing','Speaking','Từ vựng','Ngữ pháp','Phát âm']},
  {k:'accent',m:1,t:'Giọng muốn luyện nghe',o:['Anh–Mỹ','Anh–Anh','Úc','Đa dạng như đề thật']},
  {k:'format',m:1,t:'Dạng nội dung bạn thích',o:['Video ngắn dưới 10 phút','Video dài, podcast','Bài báo, blog','Flashcard','Viết ngắn mỗi ngày','Đề full có bấm giờ']},
  {k:'level',m:0,t:'Độ khó nội dung',o:['Vừa sức','Cao hơn mình 0.5 band','Thử thách mạnh']},
  {k:'rhythm',m:0,t:'Nhịp học',o:['Nhiều buổi ngắn 15 phút','Một buổi dài tập trung','Dồn vào cuối tuần']},
  {k:'slot',m:1,t:'Khung giờ hay học',o:['Sáng','Trưa','Chiều','Tối','Khuya']},
  {k:'feedback',m:0,t:'Kiểu góp ý khi chữa bài',o:['Thẳng thắn, chỉ ra hết lỗi','Ưu tiên lỗi lớn trước']},
  {k:'lang',m:0,t:'Ngôn ngữ giải thích',o:['Tiếng Việt','Song ngữ Việt–Anh','English only']}
];
const TOPIC2LIB={'Marketing & kinh doanh':'Công việc & sự nghiệp','Công nghệ & AI':'Khoa học, tâm lý & ngôn ngữ','Tâm lý & phát triển bản thân':'Bản thân & lối sống','Phim & series':'Bản thân & lối sống','Âm nhạc & K-pop':'Âm nhạc, người nổi tiếng & giới trẻ','Thời trang & làm đẹp':'Bản thân & lối sống','Thể thao & sức khỏe':'Sức khoẻ & cơ thể','Khoa học & tự nhiên':'Khoa học, tâm lý & ngôn ngữ','Gia đình & các mối quan hệ':'Gia đình & các mối quan hệ','Xã hội & văn hóa':'Gia đình & các mối quan hệ','Game & giải trí':'Âm nhạc, người nổi tiếng & giới trẻ'};
const CNAME={TA:'Task Achievement',TR:'Task Response',CC:'Mạch lạc & liên kết',LR:'Từ vựng',GRA:'Ngữ pháp',FC:'Trôi chảy',SLR:'Từ vựng',SGRA:'Ngữ pháp',P:'Phát âm'};
const PRAC={TA:'#writing',TR:'#writing',CC:'#writing',LR:'#tu-vung',GRA:'#writing',FC:'#dictation',SLR:'#tu-vung',SGRA:'#dictation',P:'#dictation'};
const SKC={w1:['TA','CC','LR','GRA'],w2:['TR','CC','LR','GRA'],sp:['FC','SLR','SGRA','P']};

let io=null,el=null,tab='today',timer=null;

function css(){
  if(document.getElementById('hmCss'))return;
  const s=document.createElement('style');s.id='hmCss';s.textContent=`
.hm{margin:6px 0 18px;padding:22px;gap:14px;background:linear-gradient(140deg,rgba(47,107,255,.28),rgba(10,31,92,.8));border-color:rgba(127,209,255,.45)}
.hm-top{display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;align-items:flex-end}
.hm-date{font:600 clamp(22px,3vw,30px)/1.2 Inter,sans-serif;margin:2px 0 0}
.hm-time{font:300 clamp(30px,4vw,44px)/1 Inter,sans-serif;color:var(--glow);letter-spacing:1px}
.hm-pills{display:flex;gap:8px;flex-wrap:wrap}
.pill{display:inline-flex;align-items:center;gap:6px;padding:6px 12px;border-radius:999px;background:rgba(5,11,46,.55);border:1px solid var(--line);font-size:13px}
.pill b{color:var(--glow);font-size:15px}
.pill.hot{border-color:rgba(255,170,120,.6);background:rgba(255,140,90,.14)}
.hm .tabs{grid-template-columns:repeat(3,1fr);margin:0}
.todo{list-style:none;margin:0;padding:0;display:grid;gap:10px}
.todo li{display:grid;grid-template-columns:auto 1fr auto;gap:12px;align-items:center;padding:12px 14px;border-radius:14px;background:rgba(5,11,46,.5);border:1px solid var(--line);transition:border-color .2s,transform .2s}
.todo li:hover{border-color:var(--glow);transform:translateX(2px)}
.todo .min{font:600 13px Inter,sans-serif;color:#050B2E;background:var(--glow);border-radius:999px;padding:4px 10px;white-space:nowrap}
.todo a{color:var(--glow);font-size:14px;white-space:nowrap}
.todo p{margin:2px 0 0;font-size:13px;color:var(--mute)}
.gl-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px}
.gl{border:1px solid var(--line);border-radius:16px;padding:14px;background:rgba(5,11,46,.5)}
.gl h3,.pf h3{margin:0 0 8px;font-size:15px}
.gl label{display:grid;grid-template-columns:1fr 110px;gap:8px;align-items:center;margin:6px 0;font-size:14px}
.gl select,.gl input{height:38px;border-radius:999px;border:1px solid var(--line);background:rgba(5,11,46,.8);color:var(--ink);padding:0 12px;font-size:14px;width:100%;color-scheme:dark}
.gl select:focus-visible,.gl input:focus-visible,.pf .chip:focus-visible{outline:2px solid var(--glow);outline-offset:2px}
.pf{display:grid;gap:16px}
.pf .chips{display:flex;gap:8px;flex-wrap:wrap}
.pf .chip:hover{border-color:var(--glow);color:var(--ink)}
.pf p{margin:0 0 8px}
`;document.head.appendChild(s);
}

const P=()=>io.get()||{};
function put(p){p.at=Date.now();io.set(p)}
const B=()=>io.bands()||{};

function todayStr(d){
  const s=d.toLocaleDateString('vi-VN',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
  return s.charAt(0).toUpperCase()+s.slice(1);
}
function greet(h){return h<5?'Khuya rồi, học nhẹ thôi':h<11?'Chào buổi sáng':h<14?'Chào buổi trưa':h<18?'Chào buổi chiều':'Chào buổi tối'}
function daysTo(iso){if(!iso)return null;const [y,m,d]=iso.split('-').map(Number);const t=new Date(y,m-1,d),n=new Date();n.setHours(0,0,0,0);return Math.round((t-n)/864e5)}
function fmtDate(iso){const [y,m,d]=iso.split('-');return d+'/'+m+'/'+y}
function overallOf(g){const v=SKILLS.map(([k])=>g[k]).filter(x=>x!=null);if(v.length<4)return null;return Math.round(v.reduce((a,b)=>a+ +b,0)/4*2+1e-9)/2}

/* Tiêu chí yếu nhất so với mục tiêu, lấy từ điểm ở "Luật rừng" */
function weakest(){
  const b=B(),out=[];
  [['w2','W',2],['w1','W',1],['sp','S',1]].forEach(([k,sk,w])=>{const o=b[k];if(!o)return;const t=sk==='W'?b.tw:b.ts;
    SKC[k].forEach(c=>{if(o[c]!=null)out.push({k,c,v:+o[c],gap:(t!=null?+t:7)-o[c],w})})});
  out.sort((a,b)=>b.gap-a.gap||b.w-a.w||a.v-b.v);
  return out[0]||null;
}

function plan(){
  const p=P(),g=p.goals||{},pr=p.prefs||{},min=+(g.min||30),out=[];
  const left=daysTo(g.exam),fmt=pr.format||[],topics=pr.topics||[],focus=pr.focus||[];
  const w=weakest();
  if(left!=null&&left>=0&&left<=21&&(fmt.includes('Đề full có bấm giờ')||left<=10))
    out.push({m:Math.max(30,Math.round(min*.6)),t:'Làm một phần đề có bấm giờ',d:'Còn '+left+' ngày: ưu tiên làm đề như thi thật rồi chữa kỹ.',a:'#listening',l:'Chọn đề →'});
  if(w){
    const label=(w.k==='sp'?'Speaking':w.k==='w2'?'Writing Task 2':'Writing Task 1')+' · '+CNAME[w.c];
    out.push({m:Math.round(min*.4),t:'Kéo điểm yếu nhất: '+label+' (đang '+w.v+')',d:'Xem bậc thang ở "Luật rừng" để biết bước '+w.v+' → '+(w.v+1)+' cần đổi gì.',a:PRAC[w.c],l:'Luyện →'});
  }else{
    out.push({m:Math.round(min*.4),t:'Nhập điểm từng tiêu chí ở "Luật rừng"',d:'Có điểm thì web mới biết nên kéo tiêu chí nào trước.',a:'#lrT',l:'Nhập điểm →'});
  }
  const lib=topics.map(t=>TOPIC2LIB[t]).find(Boolean);
  const band=pr.level==='Thử thách mạnh'?'7.0–9.0':pr.level==='Vừa sức'?'5.0–7.0':null;
  if(!focus.length||focus.some(f=>['Listening','Speaking','Phát âm'].includes(f)))
    out.push({m:Math.round(min*.3),t:'Dictation'+(lib?' chủ đề "'+lib+'"':''),d:(band?'Chọn video gắn tag '+band+'. ':'')+(pr.accent&&pr.accent.length?'Giọng: '+pr.accent.join(', ')+'. ':'')+'Chép xong thì shadowing lại 3–5 câu khó nhất.',a:'#dictation',l:'Mở Dictation →'});
  if(!focus.length||focus.some(f=>['Từ vựng','Reading','Writing'].includes(f)))
    out.push({m:Math.max(10,Math.round(min*.3)),t:'Học tiếp bài từ vựng đang mở',d:'Mỗi lượt 10 từ; gõ đúng thì đọc cả 3 ví dụ và từ gần nghĩa.',a:'#tu-vung',l:'Học từ →'});
  if(focus.includes('Writing')&&(!w||w.k==='sp'))
    out.push({m:Math.round(min*.3),t:'Viết một đoạn thân bài Task 2',d:'Dùng Writing Mắt Xích để dựng chuỗi lập luận không nhảy cóc.',a:'#writing',l:'Viết →'});
  /* chia lại phút cho khớp tổng thời gian */
  const L=out.slice(0,3),sum=L.reduce((a,x)=>a+x.m,0)||1;
  L.forEach(x=>x.m=Math.max(5,Math.round(x.m/sum*min/5)*5));
  return L;
}

function render(target,api){
  el=target;io=api;css();
  const now=new Date(),p=P(),g=p.goals||{},bd=B(),left=daysTo(g.exam),ov=g.O!=null?+g.O:overallOf({L:g.L,R:g.R,W:bd.tw,S:bd.ts});
  el.innerHTML=`<section class="card hm" aria-labelledby="hmD">
    <div class="hm-top">
      <div><span class="small" id="hmG">${greet(now.getHours())}</span>
        <p class="hm-date" id="hmD">${todayStr(now)}</p></div>
      <div class="hm-time" id="hmT" aria-label="Giờ hiện tại">${now.toLocaleTimeString('vi-VN',{hour:'2-digit',minute:'2-digit'})}</div>
    </div>
    <div class="hm-pills">
      ${ov!=null?`<span class="pill">Mục tiêu <b>${ov.toFixed(1)}</b>${g.type?' · '+esc(g.type):''}</span>`:'<span class="pill">Chưa đặt band mục tiêu</span>'}
      ${left!=null?(left>=0?`<span class="pill${left<=30?' hot':''}">Còn <b>${left}</b> ngày đến ngày thi ${fmtDate(g.exam)}</span>`:`<span class="pill">Ngày thi ${fmtDate(g.exam)} đã qua</span>`):'<span class="pill">Chưa đặt ngày thi</span>'}
      <span class="pill">Mỗi ngày <b>${g.min||30}</b> phút${g.days?' · '+g.days+' ngày/tuần':''}</span>
      ${left!=null&&left>0&&g.min?`<span class="pill">≈ <b>${Math.round(left*(+(g.days||7))/7*(+g.min)/60)}</b> giờ học còn lại</span>`:''}
    </div>
    <div class="tabs" role="tablist">
      <button class="tab" role="tab" data-hm="today" aria-selected="${tab==='today'}">Gợi ý hôm nay</button>
      <button class="tab" role="tab" data-hm="goals" aria-selected="${tab==='goals'}">Mục tiêu</button>
      <button class="tab" role="tab" data-hm="prefs" aria-selected="${tab==='prefs'}">Sở thích học</button>
    </div>
    <div id="hmBody"></div>
  </section>`;
  el.querySelector('.tabs').onclick=e=>{const b=e.target.closest('[data-hm]');if(!b)return;tab=b.dataset.hm;render(el,io)};
  ({today:renderToday,goals:renderGoals,prefs:renderPrefs})[tab]();
  clearInterval(timer);
  timer=setInterval(()=>{const t=document.getElementById('hmT');if(!t){clearInterval(timer);return}const n=new Date();t.textContent=n.toLocaleTimeString('vi-VN',{hour:'2-digit',minute:'2-digit'});
    const d=document.getElementById('hmD');if(d&&d.textContent!==todayStr(n))render(el,io);else{const gg=document.getElementById('hmG');if(gg)gg.textContent=greet(n.getHours())}},20000);
}

function renderToday(){
  const b=el.querySelector('#hmBody'),p=P(),L=plan();
  const noPref=!p.prefs||!Object.keys(p.prefs).length;
  b.innerHTML=`<ul class="todo">${L.map(x=>`<li><span class="min">${x.m}′</span><div><b>${esc(x.t)}</b><p>${esc(x.d)}</p></div><a href="${x.a}"${x.a==='#lrT'?' data-jump':''}>${x.l}</a></li>`).join('')}</ul>
    ${noPref?'<p class="small" style="margin:0">Chọn sở thích học ở tab bên cạnh để gợi ý hợp gu hơn.</p>':''}`;
  b.onclick=e=>{const a=e.target.closest('[data-jump]');if(!a)return;e.preventDefault();const t=document.getElementById('lrT');t&&t.scrollIntoView({behavior:'smooth',block:'start'});const m=document.querySelector('[data-lrtab=me]');m&&m.click()};
}

function sel(name,v,list,ph,attrs){return `<select ${attrs}>${'<option value="">'+ph+'</option>'+list.map(x=>`<option value="${x}"${v!=null&&String(v)===String(x)?' selected':''}>${x}</option>`).join('')}</select>`}

function renderGoals(){
  const b=el.querySelector('#hmBody'),p=P(),g=p.goals||{},bd=B();
  const sk=k=>k==='W'?(bd.tw!=null?bd.tw.toFixed(1):g.W):k==='S'?(bd.ts!=null?bd.ts.toFixed(1):g.S):g[k];
  const ov=overallOf({L:sk('L'),R:sk('R'),W:sk('W'),S:sk('S')});
  b.innerHTML=`<div class="gl-grid">
    <div class="gl"><h3>Band mục tiêu</h3>
      <label>Overall${sel('O',g.O!=null?(+g.O).toFixed(1):null,HALF,'—','data-g="O"')}</label>
      ${SKILLS.map(([k,n])=>`<label>${n}${sel(k,sk(k)!=null?(+sk(k)).toFixed(1):null,HALF,'—','data-g="'+k+'"')}</label>`).join('')}
      <button class="btn" type="button" data-fill style="height:36px;margin-top:6px">Đặt 4 kỹ năng bằng overall</button>
      ${ov!=null&&g.O!=null&&ov<+g.O?`<p class="small" style="margin:8px 0 0;color:#ffb48a">4 kỹ năng hiện chỉ cộng ra ${ov.toFixed(1)}, thấp hơn overall ${(+g.O).toFixed(1)}.</p>`:''}
      <p class="small" style="margin:8px 0 0">Mục tiêu Writing và Speaking dùng chung với phần "Luật rừng".</p></div>
    <div class="gl"><h3>Kỳ thi</h3>
      <label>Loại bài thi${sel('type',g.type,['Academic','General Training'],'—','data-g="type"')}</label>
      <label>Hình thức${sel('mode',g.mode,['Thi trên máy','Thi trên giấy'],'—','data-g="mode"')}</label>
      <label>Ngày thi<input type="date" data-g="exam" value="${g.exam||''}"></label>
      <label>Band hiện tại${sel('now',g.now,HALF,'—','data-g="now"')}</label></div>
    <div class="gl"><h3>Thời gian học</h3>
      <label>Mỗi ngày${sel('min',g.min,[15,30,45,60,90,120],'—','data-g="min"')}</label>
      <label>Số ngày/tuần${sel('days',g.days,[3,4,5,6,7],'—','data-g="days"')}</label>
      <p class="small" style="margin:8px 0 0">${g.now&&g.O?`Khoảng cách ${(+g.O-+g.now).toFixed(1)} band. Thường cần nhiều tuần học đều cho mỗi 0.5 band, nên đặt ngày thi và thời gian học sao cho thực tế.`:'Nhập band hiện tại để xem khoảng cách tới mục tiêu.'}</p></div>
  </div>`;
  b.onchange=e=>{const t=e.target,k=t.dataset.g;if(!k)return;const p=P();p.goals=p.goals||{};const v=t.value===''?null:t.value;
    if(k==='W'||k==='S'){const bd=B();bd[k==='W'?'tw':'ts']=v==null?null:+v;io.setBands(bd)}
    else p.goals[k]=v;
    put(p);render(el,io)};
  b.querySelector('[data-fill]').onclick=()=>{const p=P(),g=p.goals=p.goals||{};if(g.O==null){alertBox();return}
    g.L=g.R=g.O;const bd=B();bd.tw=bd.ts=+g.O;io.setBands(bd);put(p);render(el,io)};
}
function alertBox(){const s=el.querySelector('select[data-g=O]');s&&s.focus()}

function renderPrefs(){
  const b=el.querySelector('#hmBody'),pr=(P().prefs)||{};
  b.innerHTML=`<p class="small" style="margin:0">Chọn những gì hợp với bạn. Web dùng các lựa chọn này cho "Gợi ý hôm nay" ngay bây giờ, và để chọn nội dung học (video, bài đọc, ví dụ từ vựng, cách chữa bài) ở các phần sau. Có thể đổi bất cứ lúc nào.</p>
    <div class="pf">${PREFS.map(q=>{const cur=pr[q.k];return `<div role="group" aria-label="${esc(q.t)}"><h3>${esc(q.t)} <span class="small">· ${q.m?'chọn nhiều':'chọn một'}</span></h3>${q.h?`<p class="small">${esc(q.h)}</p>`:''}
      <div class="chips">${q.o.map(o=>{const on=q.m?(cur||[]).includes(o):cur===o;return `<button type="button" class="chip" data-pk="${q.k}" data-pv="${esc(o)}" aria-pressed="${on}">${esc(o)}</button>`}).join('')}</div></div>`}).join('')}</div>`;
  b.onclick=e=>{const c=e.target.closest('[data-pk]');if(!c)return;const p=P();p.prefs=p.prefs||{};const q=PREFS.find(x=>x.k===c.dataset.pk),v=c.dataset.pv;
    if(q.m){const a=p.prefs[q.k]||[];p.prefs[q.k]=a.includes(v)?a.filter(x=>x!==v):[...a,v]}
    else p.prefs[q.k]=p.prefs[q.k]===v?null:v;
    put(p);
    const on=q.m?p.prefs[q.k].includes(v):p.prefs[q.k]===v;
    if(q.m)c.setAttribute('aria-pressed',on);else b.querySelectorAll('[data-pk="'+q.k+'"]').forEach(x=>x.setAttribute('aria-pressed',x===c&&on))};
}

window.IOHome={render};
})();
