(()=>{
'use strict';
const answers=()=>[...document.querySelectorAll('details.answer')];
const toggle=open=>answers().forEach(d=>{d.open=open;});
document.querySelector('[data-show-all]')?.addEventListener('click',()=>toggle(true));
document.querySelector('[data-hide-all]')?.addEventListener('click',()=>{toggle(false);document.querySelectorAll('details.hint').forEach(d=>{d.open=false;});});
document.querySelector('[data-print]')?.addEventListener('click',()=>window.print());
let beforePrint=[];
addEventListener('beforeprint',()=>{beforePrint=[...document.querySelectorAll('details')].map(d=>[d,d.open]);toggle(true);});
addEventListener('afterprint',()=>beforePrint.forEach(([d,o])=>{d.open=o;}));
async function copy(text,status){
 try{
  if(navigator.clipboard&&isSecureContext){await navigator.clipboard.writeText(text);}
  else{const field=document.createElement('textarea');field.value=text;field.style.position='fixed';field.style.opacity='0';document.body.append(field);field.select();const ok=document.execCommand('copy');field.remove();if(!ok)throw Error('unavailable');}
  status.textContent='コピーしました。';
 }catch{
  status.textContent='コピーできない場合は、下の欄を選択してコピーしてください。';
  let box=document.querySelector('.copy-fallback');
  if(!box){box=document.createElement('div');box.className='copy-fallback';const label=document.createElement('label');label.textContent='コピー用テキスト';const area=document.createElement('textarea');area.readOnly=true;label.append(area);box.append(label);status.after(box);}
  const area=box.querySelector('textarea');area.value=text;area.focus();area.select();
 }
}
const pageCopy=document.querySelector('[data-copy-url]');
pageCopy?.addEventListener('click',()=>{const u=new URL(location.href);u.hash='';u.search='';copy(u.href,document.querySelector('#copy-status'));});
const selector=document.querySelector('#material');
if(selector){
 const data=JSON.parse(document.querySelector('#material-data').textContent);
 const base='https://gamonokka-art.github.io/learning-momentum/delivery/grammar-support/svc/';
 const url=document.querySelector('#material-url'), message=document.querySelector('#material-message'), info=document.querySelector('#material-info'), preview=document.querySelector('#material-preview'), status=document.querySelector('#teacher-status');
 const update=()=>{const item=data[Number(selector.value)];const link=new URL(item.path,base).href;url.value=link;preview.href='../../delivery/grammar-support/svc/'+item.path;info.textContent=item.info;message.value='今日の文法学習はこちらです。\nGrammar Support｜SVC\n'+item.label+'\n'+item.info+'\n'+link+'\n\n'+item.task;status.textContent='';document.querySelector('.copy-fallback')?.remove();};
 selector.addEventListener('change',update);
 document.querySelector('#copy-material-url').addEventListener('click',()=>copy(url.value,status));
 document.querySelector('#copy-material-message').addEventListener('click',()=>copy(message.value,status));
 update();
}
})();