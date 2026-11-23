/* IELTS Ocean · Chấm Speaking từ transcript (máy chấm theo quy tắc, không dùng AI). */
(function(){
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const Q={
 1:['Do you work or are you a student?','What do you like most about your hometown?','How do you usually spend your weekends?','Do you prefer reading books or watching films? Why?','How often do you use social media?','What kind of music do you enjoy?','Do you like cooking? Why or why not?','Is there anything you would like to learn in the future?'],
 2:['Describe a skill you learned that was difficult at first.\nYou should say: what the skill was, when you learned it, how you learned it, and explain why it was difficult.',
    'Describe a place you visited that you would like to go back to.\nYou should say: where it is, when you went there, what you did there, and explain why you want to return.',
    'Describe a person who has influenced the way you study or work.\nYou should say: who the person is, how you know them, what they did, and explain how they influenced you.',
    'Describe an app or website you use a lot.\nYou should say: what it is, how you found it, what you use it for, and explain why you find it useful.',
    'Describe a time you had to make an important decision.\nYou should say: what the decision was, when you made it, what you considered, and explain how you felt about it afterwards.'],
 3:['Why do some people find it hard to learn new skills as adults?','Should schools focus more on practical skills than academic subjects?','How has technology changed the way young people make friends?','Do you think governments should invest more in public transport? Why?','What are the advantages and disadvantages of working from home?','Why do people today seem busier than in the past?']
};
const LEN={1:[30,15,'2–4 câu, khoảng 30–60 từ'],2:[180,90,'nói đủ 1,5–2 phút, khoảng 180–300 từ'],3:[70,35,'4–6 câu, khoảng 70–130 từ']};
const FILL=/\b(u+m+|u+h+|e+r+m*|a+h+|h+m+|m{2,}|you know|i mean)\b/gi;
const MARK=/\b(well|actually|to be honest|honestly|the thing is|i'd say|i would say|on the other hand|for example|for instance|as a result|in fact|personally|besides|what's more|having said that|that said|apart from that|let me think|i guess|i suppose|anyway|in my opinion|to be fair|mainly because|which means)\b/gi;
const CHUNK=/\b(to be honest|a bit of|i'm really into|i am really into|keen on|can't stand|it depends on|on the whole|a great deal of|make the most of|go out of my way|once in a blue moon|from time to time|every now and then|at the end of the day|when it comes to|in the long run|(?:take|took|taken|taking) up|(?:get|got|getting) the hang of|(?:pick|picked|picking) up|look(?:ed|ing)? forward to|catch(?:ing)? up with|caught up with|(?:come|came|coming) up with|figur(?:e|ed|ing) out|r(?:u|a)n out of|end(?:ed|ing)? up|a piece of cake|hit the books|broaden my horizons|step out of my comfort zone|it's not my cup of tea|a waste of time|worth it|on a daily basis|as far as i know|to some extent|it goes without saying|the main reason is|i'd rather|i would rather|be more likely to|plays an important role|have a huge impact on|spend quality time)\b/gi;
const BASIC=/\b(good|bad|nice|very|a lot|thing|things|stuff|interesting|happy|big|many|beautiful)\b/gi;
const SUBR=/\b(because|although|though|while|whereas|which|who|whose|whom|if|unless|when|whenever|since|as soon as|so that|even though|in order to|not only|whether|until|before|after)\b/gi;
const TENSE=[
 ['quá khứ đơn',/\b(was|were|did|went|had|got|made|saw|took|came|felt|thought|said|bought|told|became|left|began|knew|found|gave|ate|wrote|spent|met|tried|started|decided|moved|learned|learnt|visited)\b/i],
 ['hiện tại hoàn thành',/\b(have|has|i've|we've|they've|you've|she's|he's)\s+(been|done|seen|gone|had|made|taken|known|got|gotten|become|written|eaten|met|spent|tried|learned|learnt|lived|worked|visited|never|always|just|already|taught|bought|brought|thought|found|given|kept|left|lost|read|said|told|felt|heard|built|won|grown|chosen|spoken|forgotten|driven|broken|begun|\w+ed)\b/i],
 ['tương lai',/\b(will|i'll|we'll|they'll|going to|gonna)\b/i],
 ['câu điều kiện',/\bif\b[^.?!]{0,80}\b(would|i'd|could|might|will)\b|\b(would|could) have\b/i],
 ['bị động',/\b(is|are|was|were|be|been|being)\s+(\w+ed|made|done|built|known|given|taken|seen|taught|written|held)\b/i],
 ['động từ khuyết thiếu',/\b(could|might|should|must|may)\b/i],
 ['so sánh',/\b(more|less)\s+\w+\s+than\b|\b\w+er than\b|\bas \w+ as\b/i],
 ['mệnh đề quan hệ',/\b\w+\s+(which|who|whose|where)\s+\w+/i]
];
const ERR=[
 [/(?<!\b(?:why|how|what|where|when|who)\s)\b(he|she|it)\s+(don't|are)\b/gi,'GRA','Ngôi thứ ba số ít: he/she/it doesn’t / is.'],
 [/\b(i|you|we|they)\s+(has|is|does)\b/gi,'GRA','Chủ ngữ I/you/we/they đi với have / are / do.'],
 [/\bpeople\s+(is|was|has|does)\b/gi,'GRA','people là số nhiều: people are / have.'],
 [/\bI\s*('m|am)\s+(agree|disagree)\b/gi,'GRA','agree là động từ: nói “I agree”, không có “am”.'],
 [/\bvery\s+(like|love|enjoy|want|hate)\b/gi,'GRA','“very like” sai: dùng “really like” hoặc “like … very much”.'],
 [/\b(am|is|are|was|were|'m)\s+interesting\s+in\b/gi,'LR','Cảm thấy hứng thú là “interested in”.'],
 [/\bdiscuss(es|ed|ing)?\s+about\b/gi,'LR','discuss sth, không có about.'],
 [/\bexplain(s|ed|ing)?\s+(me|him|her|us|them)\b/gi,'GRA','explain sth to sb.'],
 [/\b(make|makes|making|made)\s+(homework|exercise|housework)\b/gi,'LR','do homework / do exercise / do housework.'],
 [/\bwhen I was (child|kid|student|teenager|teen|baby)\b/gi,'GRA','Thiếu mạo từ: when I was a child.'],
 [/\bsince\s+\d+\s+(years?|months?|days?|weeks?)\b/gi,'GRA','Khoảng thời gian dùng for: for 5 years.'],
 [/\bgo(es|ing)?\s+to\s+home\b|\bwent\s+to\s+home\b/gi,'GRA','go home (không có to).'],
 [/\b(can|could|will|would|should|must|may|might)\s+to\s+\w+/gi,'GRA','Sau modal không dùng to.'],
 [/\b(informations|advices|knowledges|homeworks|furnitures|equipments|feedbacks)\b/gi,'LR','Danh từ không đếm được, không thêm -s.'],
 [/\bthe\s+most\s+\w+est\b/gi,'GRA','So sánh nhất kép.'],
 [/\b(more|less)\s+(bigger|smaller|better|worse|easier|cheaper|faster|harder|happier|healthier|older|younger|busier)\b/gi,'GRA','So sánh kép: bỏ more/less.'],
 [/\bone of (my|the|his|her|our|their) (friend|thing|reason|place|hobby|problem|way|book|film|movie|song)\b(?!s)/gi,'GRA','“one of + danh từ số nhiều”: one of my friends.'],
 [/\b(a|an)\s+(people|children|information|advice|homework)\b/gi,'GRA','Không dùng a/an với danh từ này.'],
 [/\bhow to say\b/gi,'FC','“how to say” là dấu hiệu đang tìm từ: thử diễn giải vòng thay vì dừng lại.'],
 [/(?<!\b(?:did|does|do|can|could|will|would|should|might|must|may|to|let|make|made|help|helped|see|saw|watch|watched|hear|heard|why|how|when|where|what)\s(?:(?:uh|um),?\s)?)\b(he|she|it)\s+(?:(?:uh|um),?\s+)?(have|do|go|say|teach|wear|make|want|like|play|watch|live|come|get|know|think|feel|look|need|seem|use|give|take|tell|work|study|eat|love|try|become)\b/gi,'GRA','Ngôi thứ ba số ít phải thêm -s/-es: he has, she says, it makes…'],
 [/\b(I'm|I am|he's|she's|it's|they're|we're|you're)\s+(?:(?:uh|um),?\s+)?(?:very\s+)?(have|play|like|go|do|want|need|think|know|eat|watch|study|live|work|love|enjoy)\b/gi,'GRA','Thừa “to be”: nói “I play”, “he has”, “I really like”, không phải “I’m play”.'],
 [/\b(have|has)\s+(?:(?:uh|um),?\s+)?(play|go|eat|watch|see|teach|take|write|meet|visit|try|come|do|give|speak|wear)\b/gi,'GRA','Hiện tại hoàn thành dùng V3: have played, have gone, have seen…'],
 [/\b(like|likes|love|loves|hate|hates|enjoy|enjoys|prefer)\s+(?:(?:uh|um),?\s+)?(eat|play|go|watch|use|read|study|cook|swim|listen|travel|see|learn|make|buy|drink|sleep|work|do)\b/gi,'GRA','Sau like/love/hate dùng V-ing hoặc to V: like eating, like to eat.'],
 [/\ban\s+(?!(?:hour|honest|honour|honor|heir|uh|um|er|ah)\b)(?=[b-df-hj-np-tv-z])\w+/gi,'GRA','Trước phụ âm dùng “a”, không dùng “an”.'],
 [/\ba\s+(?!(?:uni\w*|use\w*|usu\w*|euro\w*|one|once|uh|um|er|ah)\b)(?=[aeiou])\w+/gi,'GRA','Trước nguyên âm dùng “an”.'],
 [/\b(watch|watched|follow|followed|help|helped|meet|met|call|called|teach|taught|tell|told|love|loved)\s+(he|she|they|I|we)\b(?!\s+(is|was|are|were|has|had|will|would|can|could|did|does))/gi,'GRA','Sau động từ dùng tân ngữ: him, her, them, me, us.'],
 [/\b(will|would|can|could|should|might|must)\s+(?:(?:uh|um),?\s+)?(don't|doesn't|didn't)\b/gi,'GRA','Phủ định với modal: will not / won’t + V, không dùng “will don’t”.'],
 [/\b(will|would|can|could|should|might|must)\s+(?:(?:uh|um),?\s+)?not\s+been\b/gi,'GRA','Sau modal dùng “not be”, không phải “not been”.'],
 [/\b(many|several|a lot of|lots of|few|two|three|four|five|some|these|those)\s+(?:(?:uh|um),?\s+)?(friend|student|vegetable|person|thing|parent|teacher|book|game|video|skill|country|city|subject|team|fan|kid|child)\b(?!s)/gi,'GRA','Sau many / some / a lot of… danh từ đếm được phải ở số nhiều.'],
 [/\bmore\s+(good|bad|easy|happy|big|small|fast|cheap|nice|young|old|busy|funny)\b/gi,'GRA','So sánh hơn của tính từ ngắn: better, worse, easier, bigger…'],
 [/\b(easy|easier|hard|harder|difficult|convenient)\s+for\s+(use|learn|do|make|understand|read)\b/gi,'GRA','Dùng “easy to use”, không phải “easy for use”.'],
 [/\b(study|studies|studied|play|plays|played|speak|speaks|spoke|cook|cooks|work|works|sing|sings|write|writes)\s+(?:very\s+|so\s+)?good\b/gi,'GRA','Bổ nghĩa cho động từ dùng trạng từ: study well, play well.'],
 [/\b(think|because|but|and|so)\s+is\s+(?!it\b|this\b|that\b|there\b)/gi,'GRA','Thiếu chủ ngữ: “I think it is…”, “because it is…”.'],
 [/\b(more|very|so|too|quite)\s+(convenience|confidence|importance|difference|independence|happiness|success|danger|beauty|health|fun)\b(?!\s+(of|to|for|in))/gi,'LR','Dùng tính từ, không dùng danh từ: convenient, confident, important, different…'],
 [/\bI\s+(?:(?:uh|um),?\s+)?(want|like|need|use|go|play)\s+(?:(?:uh|um),?\s+)?(go|play|use|eat|watch|study)\b(?<!\bgo play\b)/gi,'GRA','Hai động từ liền nhau: want to go, need to study, like playing.']
];
let el=null,api=null,st={part:1,q:'',t:'',dur:'',p:'',res:null},rec=null,recT0=0,recTick=null;

function css(){
  if(document.getElementById('spCss'))return;
  const s=document.createElement('style');s.id='spCss';s.textContent=`
.sp{display:grid;gap:16px}
.sp-box{border:1px solid var(--line);border-radius:18px;padding:18px;background:var(--card)}
.sp-box h3{margin:0 0 10px;font-size:17px}
.sp-row{display:flex;gap:8px;flex-wrap:wrap;align-items:center}
.sp-q{width:100%;min-height:52px;border-radius:14px;border:1px solid var(--line);background:rgba(5,11,46,.75);color:var(--ink);padding:10px 14px;font:15px/1.5 Inter,sans-serif;resize:vertical}
.sp-ta{width:100%;min-height:200px;border-radius:14px;border:1px solid var(--line);background:rgba(5,11,46,.75);color:var(--ink);padding:14px;font:15px/1.7 Inter,sans-serif;resize:vertical}
.sp-ta:focus-visible,.sp-q:focus-visible,.sp-in:focus-visible{outline:2px solid var(--glow);outline-offset:2px}
.sp-in{height:40px;border-radius:999px;border:1px solid var(--line);background:rgba(5,11,46,.8);color:var(--ink);padding:0 14px;font-size:14px;width:110px;color-scheme:dark}
.sp-rec{display:inline-flex;align-items:center;gap:8px}
.sp-rec.on{background:#c0392b;border-color:#e74c3c;color:#fff}
.sp-dot{width:10px;height:10px;border-radius:50%;background:#ff6b6b}
.sp-rec.on .sp-dot{background:#fff;animation:spP 1s infinite}
@keyframes spP{50%{opacity:.3}}
.sp-band{display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:10px}
.sp-band div{border:1px solid var(--line);border-radius:14px;padding:12px;text-align:center;background:rgba(5,11,46,.5)}
.sp-band b{display:block;font:600 28px Inter,sans-serif;color:var(--glow)}
.sp-band .ov{background:rgba(47,107,255,.3);border-color:var(--glow)}
.sp-band .na b{color:var(--mute);font-size:18px;padding:6px 0}
.sp-met{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:8px}
.sp-met span{font-size:13px;color:var(--mute);border:1px solid var(--line);border-radius:12px;padding:8px 10px;background:rgba(5,11,46,.4)}
.sp-met b{display:block;color:var(--ink);font-size:17px}
.sp-why{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:12px}
.sp-why div{border:1px solid var(--line);border-radius:14px;padding:12px 14px;background:rgba(5,11,46,.4)}
.sp-why h4{margin:0 0 6px;font-size:15px}
.sp-why ul{margin:0;padding-left:18px;font-size:14px;line-height:1.55}
.sp-why li.p{color:#8be3b4}.sp-why li.m{color:#ffb0a0}
.sp-text{white-space:pre-wrap;font-size:15px;line-height:1.8;padding:14px;border-radius:14px;background:rgba(5,11,46,.6);border:1px solid var(--line)}
.sp-text mark{color:inherit;border-radius:3px;padding:0 2px;cursor:help}
.sp-text mark.f{background:rgba(255,209,102,.25);border-bottom:2px solid #FFD166}
.sp-text mark.e{background:rgba(255,120,120,.28);border-bottom:2px solid #ff8a8a}
.sp-text mark.g{background:rgba(80,200,140,.22);border-bottom:2px solid #5fd29a}
.sp-text mark.r{background:rgba(255,160,90,.22);border-bottom:2px dashed #ffa05a}
.sp-leg{display:flex;gap:12px;flex-wrap:wrap;font-size:13px;color:var(--mute);margin-bottom:8px}
.sp-leg i{display:inline-block;width:12px;height:12px;border-radius:3px;margin-right:4px;vertical-align:-1px}
.sp-hist{display:grid;gap:8px}
.sp-hist button{display:grid;grid-template-columns:1fr auto;gap:10px;align-items:center;text-align:left;padding:10px 14px;border-radius:12px;border:1px solid var(--line);background:rgba(5,11,46,.5);color:var(--ink);font:inherit;transition:border-color .2s}
.sp-hist button:hover{border-color:var(--glow)}
`;document.head.appendChild(s);
}

function words(t){return t.match(/[A-Za-z][A-Za-z']*/g)||[]}
const per=(x,n)=>n?x/n*100:0;
const clamp=b=>Math.max(4,Math.min(8,Math.floor(b)));
function all(rx,t){rx.lastIndex=0;const o=[];let m;while((m=rx.exec(t))){o.push({s:m.index,e:m.index+m[0].length,x:m[0]});if(!m[0].length)rx.lastIndex++}return o}

function analyse(t,part,dur){
  let asks=0,viet=0;
  t=String(t||'').split(/\n/).filter(line=>{const l=line.trim();if(!l)return true;
    if(/^(can|could) you (say|repeat|ask)|^(sorry,?\s*)?(pardon|could you repeat)|^let me (see|think)\.?$/i.test(l)){asks++;return false}
    const nonA=(l.match(/[À-ỹ]/g)||[]).length,al=(l.match(/[A-Za-zÀ-ỹ]/g)||[]).length;if(al&&nonA/al>.12){viet++;return false}return true}).join('\n');
  t=t.replace(/\[[^\]]*\]|\(\d+:\d+\)|\b\d{1,2}:\d{2}\b/g,' ').replace(/[ \t]+/g,' ').replace(/\n{3,}/g,'\n\n').trim();
  const W=words(t),n=W.length,lw=W.map(w=>w.toLowerCase());
  const fill=all(FILL,t),marks=all(MARK,t),chunks=all(CHUNK,t),basic=all(BASIC,t),subs=all(SUBR,t);
  const F_=String.raw`(?:\s*,?\s*(?:u+m+|u+h+|e+r+m*|a+h+),?)?\s*,?\s+`;
  const rep=all(new RegExp(String.raw`\b(\w+)(?:`+F_+String.raw`\1\b)+`,'gi'),t).filter(x=>!/^(very|really|so|no|bye|ha)\b/i.test(x.x)).concat(all(new RegExp(String.raw`\b(\w+(?: \w+){1,2})`+F_+String.raw`\1\b`,'gi'),t));
  const selfc=all(/\b(sorry|no wait|let me rephrase|what i mean is|i mean)\b|--|—/gi,t);
  const errs=[];ERR.forEach(([rx,c,m])=>all(rx,t).forEach(h=>{if(!errs.some(e=>h.s<e.e&&e.s<h.e))errs.push({...h,c,m})}));
  const ands=(t.match(/\b(and|so|but)\b/gi)||[]).length;
  const tenses=TENSE.filter(([,rx])=>rx.test(t)).map(x=>x[0]);
  const tok=lw.filter(w=>!/^(u+m+|u+h+|e+r+m*|a+h+|h+m+)$/.test(w));let mattr=0;
  if(tok.length<40)mattr=tok.length?new Set(tok).size/tok.length*.85:0;else{let a=0,c=0;for(let i=0;i+40<=tok.length;i++){a+=new Set(tok.slice(i,i+40)).size/40;c++}mattr=a/c}
  const longs=lw.filter(w=>w.length>=8).length/Math.max(1,n);
  const d=+dur||0,wpm=d>0?n/(d/60):null;
  const markSet=new Set(marks.map(m=>m.x.toLowerCase()));
  const why={FC:[],LR:[],GRA:[]},add=(c,ok,s)=>why[c].push([ok,s]);
  /* FC */
  let FC=5;const [goal,low,lab]=LEN[part];
  if(n>=goal){FC+=part===2?1:.5;add('FC',1,'Độ dài đạt yêu cầu Part '+part+' ('+n+' từ).')}
  else if(n<low){FC-=1;add('FC',0,'Câu trả lời ngắn ('+n+' từ). Part '+part+' nên '+lab+'.')}
  else{if(part===2)FC+=.5;add('FC',0,'Có thể nói dài hơn: Part '+part+' nên '+lab+'.')}
  if(wpm!=null){if(wpm>=100&&wpm<=170){FC+=1;add('FC',1,'Tốc độ '+Math.round(wpm)+' từ/phút, tự nhiên.')}else if(wpm>=85&&wpm<=190){FC+=.5;add('FC',1,'Tốc độ '+Math.round(wpm)+' từ/phút, chấp nhận được.')}else if(wpm<70){FC-=1;add('FC',0,'Tốc độ chỉ '+Math.round(wpm)+' từ/phút: nói chậm, nhiều ngắt quãng.')}else add('FC',0,'Tốc độ '+Math.round(wpm)+' từ/phút: '+(wpm>190?'hơi nhanh, dễ mất rõ ràng':'hơi chậm')+'.')}
  const fp=per(fill.length,n);
  if(fp<=2){FC+=1;add('FC',1,'Rất ít từ đệm (um, uh…).')}else if(fp<=5){FC+=.5;add('FC',1,'Từ đệm ở mức vừa phải ('+fill.length+' lần).')}else if(fp>15){FC-=1.5;add('FC',0,'Từ đệm dày đặc: '+fill.length+' lần (~'+Math.round(fp)+' trên 100 từ).')}else if(fp>10){FC-=1;add('FC',0,'Nhiều từ đệm: '+fill.length+' lần.')}else add('FC',0,'Từ đệm hơi nhiều: '+fill.length+' lần.');
  if(per(rep.length,n)>3){FC-=.5;add('FC',0,'Lặp từ liền nhau '+rep.length+' lần (dấu hiệu đang tìm từ).')}
  if(selfc.length>3){FC-=.5;add('FC',0,'Tự sửa nhiều ('+selfc.length+' lần).')}
  if(markSet.size>=4){FC+=.5;add('FC',1,'Dùng đa dạng discourse markers ('+[...markSet].slice(0,5).join(', ')+').')}else add('FC',0,'Ít discourse markers: thử well, actually, the thing is, to be honest.');
  if(per(ands,n)>7){FC-=.5;add('FC',0,'Nối câu chủ yếu bằng and / so / but ('+ands+' lần).')}
  /* LR */
  let LR=5;
  if(mattr>=.88){LR+=1.5;add('LR',1,'Vốn từ rất đa dạng, gần như không lặp.')}else if(mattr>=.82){LR+=1;add('LR',1,'Vốn từ đa dạng, ít lặp.')}else if(mattr>=.76){LR+=.5;add('LR',1,'Vốn từ khá đa dạng.')}else if(mattr<.70){LR-=.5;add('LR',0,'Từ vựng lặp lại nhiều, vòng quanh một số từ quen.')}else add('LR',0,'Từ vựng còn lặp lại khá nhiều.');
  if(longs>=.12){LR+=.5;add('LR',1,'Có nhiều từ dài, ít phổ biến.')}
  const cs=new Set(chunks.map(c=>c.x.toLowerCase()));
  if(cs.size>=4){LR+=1;add('LR',1,'Dùng cụm tự nhiên: '+[...cs].slice(0,4).join(', ')+'.')}else if(cs.size>=2){LR+=.5;add('LR',1,'Có cụm tự nhiên: '+[...cs].join(', ')+'.')}else add('LR',0,'Ít collocation, cụm nói tự nhiên (keen on, it depends on, from time to time…).');
  if(per(basic.length,n)>6){LR-=.5;const top={};basic.forEach(b=>{const k=b.x.toLowerCase();top[k]=(top[k]||0)+1});add('LR',0,'Lạm dụng từ cơ bản: '+Object.entries(top).sort((a,b)=>b[1]-a[1]).slice(0,4).map(([k,v])=>k+' ×'+v).join(', ')+'.')}
  const eL=errs.filter(e=>e.c==='LR').length;if(eL){LR-=Math.min(1.5,eL*.5);add('LR',0,eL+' lỗi dùng từ (xem chỗ tô đỏ).')}
  const totD=per(errs.length,n);const capL=totD>5?5:totD>3?6:9;if(LR>capL){LR=capL;add('LR',0,'Nhiều lỗi dùng từ và lỗi chung nên LR bị giới hạn ở '+capL+'.')}
  if(fp>12&&LR>5){LR=5;add('LR',0,'Phải ngập ngừng tìm từ rất thường xuyên: dấu hiệu vốn từ chưa đủ dùng.')}
  /* GRA */
  let GRA=5;const sp=per(subs.length,n),eGd=per(errs.filter(e=>e.c==='GRA').length,n),eLd=per(errs.filter(e=>e.c==='LR').length,n);
  if(eGd>2.5){add('GRA',0,'Có thử câu phức (because, when, if…) nhưng đi kèm nhiều lỗi nên chưa được tính điểm cộng.')}
  else if(sp>=4){GRA+=1;add('GRA',1,'Nhiều câu phức (because, which, if, although…).')}else if(sp>=2){GRA+=.5;add('GRA',1,'Có câu phức nhưng chưa nhiều.')}else add('GRA',0,'Chủ yếu câu đơn: thêm because, which, although, if.');
  if(eGd>2.5){}else if(tenses.length>=4){GRA+=1;add('GRA',1,'Đa dạng cấu trúc: '+tenses.join(', ')+'.')}else if(tenses.length>=3){GRA+=.5;add('GRA',1,'Có '+tenses.join(', ')+'.')}else{const miss=['hiện tại hoàn thành','câu điều kiện','so sánh','bị động'].filter(x=>!tenses.includes(x));add('GRA',0,'Ít cấu trúc'+(tenses.length?' (mới có '+tenses.join(', ')+')':'')+': thử thêm '+miss.slice(0,3).join(', ')+'.')}
  const eG=errs.filter(e=>e.c==='GRA').length;
  if(eG){GRA-=Math.min(1.5,eG*.5);add('GRA',0,eG+' lỗi ngữ pháp ('+eGd.toFixed(1)+' lỗi / 100 từ), xem chỗ tô đỏ.')}else if(n>=40)add('GRA',1,'Máy không thấy lỗi ngữ pháp nào trong danh sách lỗi thường gặp.');
  const capG=eGd>5?4:eGd>3?5:eGd>1.5?6:eGd>.7?7:9;if(GRA>capG){GRA=capG;add('GRA',0,'Mật độ lỗi cao nên GRA bị giới hạn ở '+capG+': lỗi lặp lại ở những cấu trúc cơ bản (chia động từ, mạo từ, số nhiều).')}
  if(errs.some(e=>e.c==='FC')){FC-=.5;add('FC',0,'Có lúc dừng để tìm cách nói (“how to say”).')}
  if(asks>=3){FC-=.5;add('FC',0,'Xin nhắc lại câu hỏi '+asks+' lần (đã bỏ những dòng này khi chấm).')}else if(asks)add('FC',0,'Có '+asks+' lần xin nhắc lại câu hỏi (đã bỏ khi chấm).');
  if(viet)add('FC',0,viet+' dòng tiếng Việt đã được bỏ qua khi chấm.');
  if(fp>12)FC=Math.min(FC,4);else if(fp>8)FC=Math.min(FC,5);
  if(n<low)FC=Math.min(FC,5);else if(n<goal)FC=Math.min(FC,7);
  const crit={FC:clamp(FC),LR:clamp(LR),GRA:clamp(GRA)};
  return{t,n,wpm,fp,fill,marks,chunks,errs,rep,selfc,tenses,subs,crit,why,short:n<(part===2?90:25)};
}

function marked(t,R){
  const L=[];R.errs.forEach(x=>L.push({...x,k:'e',tip:x.c+': '+x.m}));R.fill.forEach(x=>L.push({...x,k:'f',tip:'Từ đệm'}));R.rep.forEach(x=>L.push({...x,k:'r',tip:'Lặp từ'}));R.chunks.forEach(x=>L.push({...x,k:'g',tip:'Cụm tự nhiên'}));
  L.sort((a,b)=>a.s-b.s||({e:0,r:1,f:2,g:3}[a.k]-{e:0,r:1,f:2,g:3}[b.k]));let out='',i=0;
  L.forEach(x=>{if(x.s<i)return;out+=esc(t.slice(i,x.s))+`<mark class="${x.k}" title="${esc(x.tip)}">${esc(t.slice(x.s,x.e))}</mark>`;i=x.e});
  return out+esc(t.slice(i));
}
const round5=x=>Math.round(x*2+1e-9)/2;

function render(target,a){
  el=target;api=a;css();
  const SR=window.SpeechRecognition||window.webkitSpeechRecognition,hist=(api.get()||[]).slice().reverse();
  el.innerHTML=`<div class="sp">
    <div class="segnav"><h2 style="margin:0">Chấm Speaking từ transcript</h2></div>
    <div class="sp-box">
      <div class="sp-row" role="group" aria-label="Chọn part">${[1,2,3].map(p=>`<button type="button" class="chip" data-part="${p}" aria-pressed="${st.part===p}">Part ${p}</button>`).join('')}
        <span class="small">${LEN[st.part][2]}</span></div>
      <label class="small" style="display:block;margin:12px 0 6px">Câu hỏi (không bắt buộc)</label>
      <textarea class="sp-q" id="spQ" rows="2" placeholder="Dán câu hỏi, hoặc bấm lấy câu hỏi ngẫu nhiên">${esc(st.q)}</textarea>
      <div class="sp-row" style="margin:8px 0 14px"><button class="btn" type="button" data-rq style="height:38px">Câu hỏi ngẫu nhiên</button>
        ${SR?`<button class="btn sp-rec" type="button" data-rec style="height:38px"><span class="sp-dot"></span><span id="spRecL">Ghi âm để tạo transcript</span></button><span class="small" id="spRecT"></span>`:'<span class="small">Trình duyệt này không hỗ trợ ghi âm tạo transcript; hãy dán transcript.</span>'}</div>
      <label class="small" for="spT" style="display:block;margin-bottom:6px">Transcript câu trả lời</label>
      <textarea class="sp-ta" id="spT" placeholder="Dán transcript (từ app ghi âm, YouTube, Google Docs voice typing…). Giữ nguyên um, uh, chỗ lặp từ để chấm Fluency chính xác hơn.">${esc(st.t)}</textarea>
      <div class="sp-row" style="margin-top:12px;justify-content:space-between">
        <span class="sp-row"><label class="small">Thời lượng nói (giây) <input class="sp-in" id="spD" type="number" min="0" inputmode="numeric" value="${esc(st.dur)}" placeholder="vd 95"></label>
          <label class="small">Phát âm (tự đánh giá / giáo viên) <select class="sp-in" id="spP" style="width:90px"><option value="">—</option>${[9,8,7,6,5,4].map(x=>`<option${String(st.p)===String(x)?' selected':''}>${x}</option>`).join('')}</select></label></span>
        <button class="btn pri" type="button" data-grade>Chấm</button></div>
      ${SR?'<p class="small" style="margin:10px 0 0">Ghi âm dùng nhận dạng giọng nói của Chrome (âm thanh được gửi tới máy chủ Google để chuyển thành chữ). Nhận dạng thường tự bỏ um, uh, nên điểm Fluency có thể cao hơn thực tế.</p>':''}
    </div>
    <div id="spRes"></div>
    ${hist.length?`<div class="sp-box"><h3>Lịch sử chấm</h3><div class="sp-hist">${hist.slice(0,10).map((h,i)=>`<button type="button" data-h="${hist.length-1-i}"><span><b>Part ${h.part}</b> · ${esc((h.q||'').split('\n')[0].slice(0,70)||'(không có câu hỏi)')}<br><span class="small">${new Date(h.at).toLocaleString('vi-VN',{day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'})} · ${h.n} từ</span></span><span class="small">FC ${h.crit.FC} · LR ${h.crit.LR} · GRA ${h.crit.GRA}</span></button>`).join('')}</div></div>`:''}
  </div>`;
  if(st.res)showRes();
  el.onclick=e=>{
    const p=e.target.closest('[data-part]');if(p){sync();st.part=+p.dataset.part;st.res=null;render(el,api);return}
    if(e.target.closest('[data-rq]')){sync();const L=Q[st.part];let q;do{q=L[Math.floor(Math.random()*L.length)]}while(L.length>1&&q===st.q);st.q=q;el.querySelector('#spQ').value=q;return}
    if(e.target.closest('[data-rec]')){toggleRec();return}
    if(e.target.closest('[data-grade]')){sync();if(!st.t.trim()){el.querySelector('#spT').focus();return}st.res=analyse(st.t,st.part,st.dur);api.log&&api.log();showRes();el.querySelector('#spRes').scrollIntoView({behavior:'smooth',block:'start'});return}
    const h=e.target.closest('[data-h]');if(h){const x=(api.get()||[])[+h.dataset.h];if(!x)return;Object.assign(st,{part:x.part,q:x.q||'',t:x.t,dur:x.dur||'',p:x.p||''});st.res=analyse(st.t,st.part,st.dur);render(el,api);el.querySelector('#spRes').scrollIntoView({behavior:'smooth',block:'start'});return}
    if(e.target.closest('[data-save]')){const L=(api.get()||[]).concat([{at:Date.now(),part:st.part,q:st.q.slice(0,400),t:st.t.slice(0,6000),dur:st.dur,p:st.p,n:st.res.n,crit:st.res.crit}]).slice(-20);api.set(L);e.target.textContent='Đã lưu';e.target.disabled=true;return}
    if(e.target.closest('[data-tolr]')){const b=api.bandsGet()||{};b.sp=b.sp||{};b.sp.FC=st.res.crit.FC;b.sp.SLR=st.res.crit.LR;b.sp.SGRA=st.res.crit.GRA;if(st.p)b.sp.P=+st.p;api.bandsSet(b);e.target.textContent='Đã đưa vào Luật rừng';e.target.disabled=true;return}
  };
}
function sync(){const g=id=>el.querySelector(id);if(!g('#spT'))return;st.q=g('#spQ').value;st.t=g('#spT').value;st.dur=g('#spD').value;st.p=g('#spP').value}

function showRes(){
  const R=st.res,box=el.querySelector('#spRes');if(!R||!box)return;
  const P=st.p?+st.p:null,vals=[R.crit.FC,R.crit.LR,R.crit.GRA].concat(P!=null?[P]:[]),ov=round5(vals.reduce((a,b)=>a+b,0)/vals.length);
  const nm={FC:'Fluency & Coherence',LR:'Lexical Resource',GRA:'Grammatical Range & Accuracy'};
  box.innerHTML=`<div class="sp-box"><h3>Kết quả máy chấm</h3>
    ${R.short?'<p class="warnb" style="margin:0 0 10px">Câu trả lời quá ngắn nên điểm kém tin cậy. Hãy nói dài hơn rồi chấm lại.</p>':''}
    <div class="sp-band"><div class="ov"><span class="small">${P!=null?'Speaking ước tính':'Ước tính (chưa có P)'}</span><b>${ov.toFixed(1)}</b></div>
      ${['FC','LR','GRA'].map(c=>`<div><span class="small">${c}</span><b>${R.crit[c]}</b></div>`).join('')}
      <div class="${P!=null?'':'na'}"><span class="small">P</span><b>${P!=null?P:'Không chấm từ chữ'}</b></div></div>
    <div class="sp-met" style="margin-top:12px">
      <span>Số từ<b>${R.n}</b></span>
      <span>Tốc độ<b>${R.wpm!=null?Math.round(R.wpm)+' từ/phút':'—'}</b></span>
      <span>Từ đệm<b>${R.fill.length} (${R.fp.toFixed(1)}/100 từ)</b></span>
      <span>Lặp từ / tự sửa<b>${R.rep.length} / ${R.selfc.length}</b></span>
      <span>Mệnh đề phụ<b>${R.subs.length}</b></span>
      <span>Cụm tự nhiên<b>${new Set(R.chunks.map(c=>c.x.toLowerCase())).size}</b></span>
    </div>
    <div class="sp-why" style="margin-top:12px">${['FC','LR','GRA'].map(c=>`<div><h4>${c} · ${nm[c]} · ${R.crit[c]}</h4><ul>${R.why[c].map(([ok,s])=>`<li class="${ok?'p':'m'}">${ok?'✓':'✗'} ${esc(s)}</li>`).join('')}</ul></div>`).join('')}</div>
    <h3 style="margin:16px 0 8px">Transcript đã đánh dấu</h3>
    <div class="sp-leg"><span><i style="background:#ff8a8a"></i>Lỗi (rê chuột để xem)</span><span><i style="background:#FFD166"></i>Từ đệm</span><span><i style="background:#ffa05a"></i>Lặp từ</span><span><i style="background:#5fd29a"></i>Cụm tự nhiên</span></div>
    <div class="sp-text">${marked(R.t,R)}</div>
    ${R.errs.length?`<ul style="margin:10px 0 0;padding-left:18px;font-size:14px;line-height:1.6">${[...new Map(R.errs.map(e=>[e.m,e])).values()].map(e=>`<li><b>${esc(e.x)}</b> · ${esc(e.m)}</li>`).join('')}</ul>`:''}
    <p class="small" style="margin:14px 0 0">Máy chỉ đếm được những gì thấy trong chữ: độ dài, tốc độ, từ đệm, độ đa dạng từ, câu phức và các lỗi có mẫu sẵn. Máy không nghe được phát âm, ngữ điệu, và không đánh giá được ý có hay, có mạch lạc hay không. Dùng điểm này để theo dõi tiến bộ, không thay giám khảo.</p>
    <div class="sp-row" style="margin-top:12px;justify-content:flex-end"><button class="btn" type="button" data-save>Lưu vào lịch sử</button><button class="btn pri" type="button" data-tolr>Đưa điểm vào Luật rừng</button></div>
  </div>`;
}

function toggleRec(){
  const SR=window.SpeechRecognition||window.webkitSpeechRecognition,btn=el.querySelector('[data-rec]'),lab=el.querySelector('#spRecL'),tt=el.querySelector('#spRecT');
  if(rec){rec.stop();return}
  sync();rec=new SR();rec.lang='en-GB';rec.continuous=true;rec.interimResults=true;
  const base=st.t?st.t.trim()+' ':'';let fin='';recT0=Date.now();
  rec.onresult=e=>{let interim='';for(let i=e.resultIndex;i<e.results.length;i++){const r=e.results[i];if(r.isFinal)fin+=r[0].transcript.trim()+'. ';else interim+=r[0].transcript}el.querySelector('#spT').value=base+fin+interim};
  rec.onerror=e=>{tt.textContent=e.error==='not-allowed'?'Bạn chưa cho phép dùng micro.':'Lỗi ghi âm: '+e.error};
  rec.onend=()=>{clearInterval(recTick);const secs=Math.round((Date.now()-recT0)/1000);btn.classList.remove('on');lab.textContent='Ghi âm để tạo transcript';
    const d=el.querySelector('#spD');d.value=String((+d.value||0)+secs);rec=null;sync();if(!tt.textContent.startsWith('Lỗi')&&!tt.textContent.startsWith('Bạn'))tt.textContent='Đã ghi '+secs+' giây. Kiểm tra transcript rồi bấm Chấm.'};
  try{rec.start();btn.classList.add('on');lab.textContent='Dừng ghi âm';tt.textContent='0:00';recTick=setInterval(()=>{const s=Math.round((Date.now()-recT0)/1000);tt.textContent=Math.floor(s/60)+':'+String(s%60).padStart(2,'0')},500)}catch(x){tt.textContent='Không bật được micro.';rec=null}
}

window.IOSpeak={render,analyse};
})();
