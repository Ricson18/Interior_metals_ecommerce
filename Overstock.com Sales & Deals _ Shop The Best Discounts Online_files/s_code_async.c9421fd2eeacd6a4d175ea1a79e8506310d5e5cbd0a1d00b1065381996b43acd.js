/* AppMeasurement for JavaScript version: 2.20.0
Copyright 1996-2016 Adobe, Inc. All Rights Reserved
More info available at http://www.adobe.com/marketing-cloud.html */

/* Specify the Report Suite ID(s) to track here */
var s_account = 'overstock.com';
if (typeof ostk === 'undefined' || !(ostk.data) || !(ostk.data.track) || !(ostk.data.track.trackingManager)) {
  console.log('ostk namespace not defined in s_code_async.js, default account assumed.  Please contact Analytics Dev.');
}
else {
  var sessions = ostk.data.track.trackingManager.getTrackingSessions();
  if (sessions) {
    for (var i = 0; i < sessions.length; i++) {
      var session = sessions[i];
      if (session && session.system == 'OMNITURE') {
        s_account = session.extReference;
        break;
      }
    }
  }
}
var s=s_gi(s_account);
s.visitorNamespace="overstock.com";
s.currencyCode="USD";
s.trackDownloadLinks=true;
s.trackExternalLinks=true;
s.trackInlineStats=true;
s.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,doc,pdf,xls";
s.linkInternalFilters="javascript:,overstock,o.info,o.biz,ak1.ostkcdn,recs.richrelevance,rld";
s.linkLeaveQueryString=false;
s.linkTrackVars="None";
s.linkTrackEvents="None";
s.fpCookieDomainPeriods=2; // write cookies to .overstock.com where possible
s.dc=112;

function s_assignFromDataLayer(s_proxy) {
  if (s_proxy && typeof s_proxy === 'object') {
    for (var prop in s_proxy) {
      if (s_proxy.hasOwnProperty(prop)) {
        s[prop] = s_proxy[prop];
      }
    }
  }
}

s_assignFromDataLayer(s_getScodeProxy());

if (typeof Visitor === 'function') {
  s.visitor = Visitor.getInstance("5B01123F5245AD0B0A490D45@AdobeOrg");
  if (s.visitor && s.trackingServerSecure) {
    s.visitor.trackingServer = s.trackingServerSecure;
  }
}

/* Plugin Config */
s.usePlugins=true
function s_doPlugins(s) {
  /* Add calls to plugins here */

  /* CAMPAIGN */
  if(!s.campaign)s.campaign=s.Util.getQueryParam('cid')
  if(s.campaign)s.campaign=s.getValOnce(s.campaign,'s_cmp',0)

  /* QUERY PARAM */
    // MKT-4145: tracking keywords on static pages from mercado redirects
  if(!s.prop11)s.prop11=s.Util.getQueryParam('keywords');
  if(!s.prop31)s.prop31=s.Util.getQueryParam('PAGE');
  if(!s.prop32)s.prop32=s.Util.getQueryParam('track');
  if(!s.prop33)s.prop33=s.Util.getQueryParam('SEC_IID');
  if(!s.prop35)s.prop35=s.Util.getQueryParam('Design');
  if(!s.prop41)s.prop41=s.Util.getQueryParam('recidx');
  if(!s.prop44)s.prop44=s.Util.getQueryParam('recalg');

  if(!s.eVar4)s.eVar4=s.Util.getQueryParam('tid') || s.Util.getQueryParam('TID');
  if(!s.eVar14)s.eVar14=s.Util.getQueryParam('searchtype');
  if(!s.eVar32)s.eVar32=s.Util.getQueryParam('ak');
  if(!s.prop56)s.prop56=s.Util.getQueryParam('kid');//Replace eVar33 with prop56 ANAD-1100 ANAD-1102
  if(!s.eVar35)s.eVar35=s.Util.getQueryParam('pid');
  if(!s.eVar36)s.eVar36=s.Util.getQueryParam('EHID');
  if(!s.eVar39)s.eVar39=s.Util.getQueryParam('kenshoo_id_');
  if(!s.prop50)s.prop50=s.Util.getQueryParam('cpid');
  if(!s.prop60)s.prop60=s.Util.getQueryParam('fb_ref');
  //FED-6509 StrongView and Genesis Integration s_code change
  if(!s.eVar67)s.eVar67=s.Util.getQueryParam('mid');
  if(s.eVar67)s.eVar67=s.getValOnce(s.eVar67,'s_var_67',0);
  if(!s.eVar66)s.eVar66=s.Util.getQueryParam('rid');
  if(s.eVar66)s.eVar66=s.getValOnce(s.eVar66,'s_var_66',0);
  //FED-8423 Kenshoo Omniture Click Tracking
  if(s.Util.getQueryParam('k_clickid') != "") {
    s.eVar69 = s.Util.getQueryParam('k_clickid');
  }
  if(!s.eVar59)s.eVar59=s.Util.getQueryParam('CID');

  /* SEARCH */
  if(s.prop11){
    s.prop11=s.prop11.toLowerCase();
    s.eVar11=s.prop11;
  }
  ntk=s.Util.getQueryParam('Ntk');
  if (!ntk) {
	prev_page=s.getPreviousValue(s.pageName,'gpv_p13','');
	if(s.prop11){
	  temp=s.getValOnce(s.prop11,'p11',0)
	  if(temp){
	    /* values to set on first page of search results */
	    s.events=s.apl(s.events,"event7",",",1)
	    s.eVar12="+1"
	    s.eVar13=prev_page;
	    s.prop16=s.eVar13;
	    s.products=";"
	  }
	}
	else {
	  s.eVar13=prev_page;
	  s.prop16=s.eVar13;
	}
  }

  /* FINDING METHOD */
  fm_page=s.prop31;
  if(fm_page){fm_page=fm_page.toLowerCase()}
  if(!s.eVar3){
    if(s.eVar4){s.eVar3="Promo"}
    else if(fm_page=="proframe"||fm_page=="addcart"||fm_page=="proadd"){
      s.eVar3="";
      prev_page = s.Util.getQueryParam('page','',document.referrer);
      if(prev_page=="addcart"){s.eVar3="Cart"}
    }
    else if(fm_page=="endeca"){s.eVar3="Search: " + s.eVar14}
    else{s.eVar3="Browse"}
  }
  if(s.campaign && !ntk)s.eVar3="Campaign"

}
s.doPlugins=s_doPlugins

/*PLUGINS*/
/*  * Utility Function: vpr - set the variable vs with value v  */
s.vpr=new Function("vs","v", "if(typeof(v)!='undefined'){var s=this; eval('s.'+vs+'=\"'+escapeJs(v)+'\"')}");

function escapeJs(str) {
  return str.replace(/\\/g, "\\\\").replace(/\"/g, "\\\"");
}

/* Plugin: getValOnce 0.2 - get a value once per session or number of days */
s.getValOnce=new Function("v","c","e",""
+"var s=this,k=s.c_r(c),a=new Date;e=e?e:0;if(v){a.setTime(a.getTime("
+")+e*86400000);s.c_w(c,v,e?a:0);}return v==k?'':v");

/* Plugin: getPreviousValue_v1.0 - return previous value of designated variable
 * (requires split utility) */
s.getPreviousValue=new Function("v","c","el",""
+"var s=this,t=new Date,i,j,r='';t.setTime(t.getTime()+1800000);if(el"
+"){if(s.events){i=s.split(el,',');j=s.split(s.events,',');for(x in i"
+"){for(y in j){if(i[x]==j[y]){if(s.c_r(c)) r=s.c_r(c);v?s.c_w(c,v,t)"
+":s.c_w(c,'no value',t);return r}}}}}else{if(s.c_r(c)) r=s.c_r(c);v?"
+"s.c_w(c,v,t):s.c_w(c,'no value',t);return r}");

/* Plugin Utility: apl v1.1 */
s.apl=new Function("L","v","d","u",""
+"var s=this,m=0;if(!L)L='';if(u){var i,n,a=s.split(L,d);for(i=0;i<a."
+"length;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCas"
+"e()));}}if(!m)L=L?L+d+v:v;return L");

/* Utility Function: split v1.5 - split a string (JS 1.0 compatible) */
s.split=new Function("l","d",""
+"var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x"
+"++]=l.substring(0,i);l=l.substring(i+d.length);}return a");

/* Plugin: getAndPersistValue 0.3 - get a value on every page */
s.getAndPersistValue=new Function("v","c","e",""
+"var s=this,a=new Date;e=e?e:0;a.setTime(a.getTime()+e*86400000);if("
+"v)s.c_w(c,v,e?a:0);return s.c_r(c);");

/* Plugin: read combined cookies v0.41 */
if(!s.__ccucr){
s.c_rr = s.c_r;
s.__ccucr = true;
function c_r(k){
var s = this,d = new Date,v = s.c_rr(k),c = s.c_rspers(),i, m, e;
if(v)return v;k = s.Util.urlEncode(k);i = c.indexOf(' ' + k + '=');c = i < 0 ? s.c_rr('s_sess') : c;
i = c.indexOf(' ' + k + '=');m = i < 0 ? i : c.indexOf('|', i);
e = i < 0 ? i : c.indexOf(';', i);m = m > 0 ? m : e;
v = i < 0 ? '' : s.Util.urlDecode(c.substring(i + 2 + k.length, m < 0 ? c.length : m));
return v;
}
function c_rspers(){
var cv = s.c_rr("s_pers");var date = new Date().getTime();var expd = null;var cvarr = [];var vcv = "";
if(!cv)return vcv; cvarr = cv.split(";");for(var i = 0, l = cvarr.length; i < l; i++){
expd = cvarr[i].match(/\|([0-9]+)$/);if(expd && parseInt(expd[1]) >= date){vcv += cvarr[i] + ";";}}
return vcv;
}
s.c_rspers = c_rspers;
s.c_r = c_r;
}
/* Function - write combined cookies v 0.41 */
if(!s.__ccucw){
s.c_wr = s.c_w;
s.__ccucw = true;
function c_w(k, v, e){
var s = this,d = new Date,ht = 0,pn = 's_pers',sn = 's_sess',pc = 0,sc = 0,pv, sv, c, i, t;
d.setTime(d.getTime() - 60000);if(s.c_rr(k))s.c_wr(k, '', d);k = s.Util.urlEncode(k);
pv = s.c_rspers();i = pv.indexOf(' ' + k + '=');if(i > -1){
pv = pv.substring(0, i) + pv.substring(pv.indexOf(';', i) + 1);pc = 1;}
sv = s.c_rr(sn);i = sv.indexOf(' ' + k + '=');if(i > -1){
sv = sv.substring(0, i) + sv.substring(sv.indexOf(';', i) + 1);sc = 1;}
d = new Date;if(e){if(e.getTime() > d.getTime()){
pv += ' ' + k + '=' + s.Util.urlEncode(v) + '|' + e.getTime() + ';';pc = 1;}}
else{sv += ' ' + k + '=' + s.Util.urlEncode(v) + ';';sc = 1;}sv = sv.replace(/%00/g, '');
pv = pv.replace(/%00/g, '');if(sc)s.c_wr(sn, sv, 0);if(pc){t = pv;
while(t && t.indexOf(';') != -1){var t1 = parseInt(t.substring(t.indexOf('|') + 1, t.indexOf(';')));
t = t.substring(t.indexOf(';') + 1);ht = ht < t1 ? t1 : ht;}d.setTime(ht);
s.c_wr(pn, pv, d);}return v == s.c_r(s.Util.urlDecode(k));}
s.c_w = c_w;
}

/*
Start ActivityMap Module

The following module enables ActivityMap tracking in Adobe Analytics. ActivityMap
allows you to view data overlays on your links and content to understand how
users engage with your web site. If you do not intend to use ActivityMap, you
can remove the following block of code from your AppMeasurement.js file.
Additional documentation on how to configure ActivityMap is available at:
https://marketing.adobe.com/resources/help/en_US/analytics/activitymap/getting-started-admins.html
*/
function AppMeasurement_Module_ActivityMap(h){function q(){var a=f.pageYOffset+(f.innerHeight||0);a&&a>+g&&(g=a)}function r(){if(e.scrollReachSelector){var a=h.d.querySelector&&h.d.querySelector(e.scrollReachSelector);a?(g=a.scrollTop||0,a.addEventListener("scroll",function(){var d;(d=a&&a.scrollTop+a.clientHeight||0)>g&&(g=d)})):0<w--&&setTimeout(r,1E3)}}function l(a,d){var c,b,n;if(a&&d&&(c=e.c[d]||(e.c[d]=d.split(","))))for(n=0;n<c.length&&(b=c[n++]);)if(-1<a.indexOf(b))return null;p=1;return a}
function s(a,d,c,b,e){var f,k;if(a.dataset&&(k=a.dataset[d]))f=k;else if(a.getAttribute)if(k=a.getAttribute("data-"+c))f=k;else if(k=a.getAttribute(c))f=k;if(!f&&h.useForcedLinkTracking&&e){var g;a=a.onclick?""+a.onclick:"";varValue="";if(b&&a&&(d=a.indexOf(b),0<=d)){for(d+=b.length;d<a.length;)if(c=a.charAt(d++),0<="'\"".indexOf(c)){g=c;break}for(k=!1;d<a.length&&g;){c=a.charAt(d);if(!k&&c===g)break;"\\"===c?k=!0:(varValue+=c,k=!1);d++}}(g=varValue)&&(h.w[b]=g)}return f||e&&h.w[b]}function t(a,d,
c){var b;return(b=e[d](a,c))&&(p?(p=0,b):l(m(b),e[d+"Exclusions"]))}function u(a,d,c){var b;if(a&&!(1===(b=a.nodeType)&&(b=a.nodeName)&&(b=b.toUpperCase())&&x[b])&&(1===a.nodeType&&(b=a.nodeValue)&&(d[d.length]=b),c.a||c.t||c.s||!a.getAttribute||((b=a.getAttribute("alt"))?c.a=b:(b=a.getAttribute("title"))?c.t=b:"IMG"==(""+a.nodeName).toUpperCase()&&(b=a.getAttribute("src")||a.src)&&(c.s=b)),(b=a.childNodes)&&b.length))for(a=0;a<b.length;a++)u(b[a],d,c)}function m(a){if(null==a||void 0==a)return a;
try{return a.replace(RegExp("^[\\s\\n\\f\\r\\t\t-\r \u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u205f\u3000\ufeff]+","mg"),"").replace(RegExp("[\\s\\n\\f\\r\\t\t-\r \u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u205f\u3000\ufeff]+$","mg"),"").replace(RegExp("[\\s\\n\\f\\r\\t\t-\r \u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u205f\u3000\ufeff]{1,}","mg")," ").substring(0,254)}catch(d){}}var e=this;e.s=h;var f=window;f.s_c_in||(f.s_c_il=[],f.s_c_in=0);e._il=f.s_c_il;e._in=f.s_c_in;e._il[e._in]=e;f.s_c_in++;
e._c="s_m";var g=0,v,w=60;e.c={};var p=0,x={SCRIPT:1,STYLE:1,LINK:1,CANVAS:1};e._g=function(){var a,d,c,b=h.contextData,e=h.linkObject;(a=h.pageName||h.pageURL)&&(d=t(e,"link",h.linkName))&&(c=t(e,"region"))&&(b["a.activitymap.page"]=a.substring(0,255),b["a.activitymap.link"]=128<d.length?d.substring(0,128):d,b["a.activitymap.region"]=127<c.length?c.substring(0,127):c,0<g&&(b["a.activitymap.xy"]=10*Math.floor(g/10)),b["a.activitymap.pageIDType"]=h.pageName?1:0)};e._d=function(){e.trackScrollReach&&
!v&&(e.scrollReachSelector?r():(q(),f.addEventListener&&f.addEventListener("scroll",q,!1)),v=!0)};e.link=function(a,d){var c;if(d)c=l(m(d),e.linkExclusions);else if((c=a)&&!(c=s(a,"sObjectId","s-object-id","s_objectID",1))){var b,f;(f=l(m(a.innerText||a.textContent),e.linkExclusions))||(u(a,b=[],c={a:void 0,t:void 0,s:void 0}),(f=l(m(b.join(""))))||(f=l(m(c.a?c.a:c.t?c.t:c.s?c.s:void 0)))||!(b=(b=a.tagName)&&b.toUpperCase?b.toUpperCase():"")||("INPUT"==b||"SUBMIT"==b&&a.value?f=l(m(a.value)):"IMAGE"==
b&&a.src&&(f=l(m(a.src)))));c=f}return c};e.region=function(a){for(var d,c=e.regionIDAttribute||"id";a&&(a=a.parentNode);){if(d=s(a,c,c,c))return d;if("BODY"==a.nodeName)return"BODY"}}}
/* End ActivityMap Module */
/* ============== DO NOT ALTER ANYTHING BELOW THIS LINE ! =============== */
function AppMeasurement(r){var a=this;a.version="2.20.0";var h=window;h.s_c_in||(h.s_c_il=[],h.s_c_in=0);a._il=h.s_c_il;a._in=h.s_c_in;a._il[a._in]=a;h.s_c_in++;a._c="s_c";var q=h.AppMeasurement.hc;q||(q=null);var p=h,m,s;try{for(m=p.parent,s=p.location;m&&m.location&&s&&""+m.location!==""+s&&p.location&&""+m.location!==""+p.location&&m.location.host===s.host;)p=m,m=p.parent}catch(u){}a.C=function(a){try{console.log(a)}catch(b){}};a.Qa=function(a){return""+parseInt(a)==""+a};a.replace=function(a,
b,d){return!a||0>a.indexOf(b)?a:a.split(b).join(d)};a.escape=function(c){var b,d;if(!c)return c;c=encodeURIComponent(c);for(b=0;7>b;b++)d="+~!*()'".substring(b,b+1),0<=c.indexOf(d)&&(c=a.replace(c,d,"%"+d.charCodeAt(0).toString(16).toUpperCase()));return c};a.unescape=function(c){if(!c)return c;c=0<=c.indexOf("+")?a.replace(c,"+"," "):c;try{return decodeURIComponent(c)}catch(b){}return unescape(c)};a.Mb=function(){var c=h.location.hostname,b=a.fpCookieDomainPeriods,d;b||(b=a.cookieDomainPeriods);
if(c&&!a.Ja&&!/^[0-9.]+$/.test(c)&&(b=b?parseInt(b):2,b=2<b?b:2,d=c.lastIndexOf("."),0<=d)){for(;0<=d&&1<b;)d=c.lastIndexOf(".",d-1),b--;a.Ja=0<d?c.substring(d):c}return a.Ja};a.c_r=a.cookieRead=function(c){c=a.escape(c);var b=" "+a.d.cookie,d=b.indexOf(" "+c+"="),f=0>d?d:b.indexOf(";",d);c=0>d?"":a.unescape(b.substring(d+2+c.length,0>f?b.length:f));return"[[B]]"!=c?c:""};a.c_w=a.cookieWrite=function(c,b,d){var f=a.Mb(),e=a.cookieLifetime,g;b=""+b;e=e?(""+e).toUpperCase():"";d&&"SESSION"!=e&&"NONE"!=
e&&((g=""!=b?parseInt(e?e:0):-60)?(d=new Date,d.setTime(d.getTime()+1E3*g)):1===d&&(d=new Date,g=d.getYear(),d.setYear(g+2+(1900>g?1900:0))));return c&&"NONE"!=e?(a.d.cookie=a.escape(c)+"="+a.escape(""!=b?b:"[[B]]")+"; path=/;"+(d&&"SESSION"!=e?" expires="+d.toUTCString()+";":"")+(f?" domain="+f+";":"")+(a.writeSecureCookies?" secure;":""),a.cookieRead(c)==b):0};a.Jb=function(){var c=a.Util.getIeVersion();"number"===typeof c&&10>c&&(a.unsupportedBrowser=!0,a.wb(a,function(){}))};a.xa=function(){var a=
navigator.userAgent;return"Microsoft Internet Explorer"===navigator.appName||0<=a.indexOf("MSIE ")||0<=a.indexOf("Trident/")&&0<=a.indexOf("Windows NT 6")?!0:!1};a.wb=function(a,b){for(var d in a)Object.prototype.hasOwnProperty.call(a,d)&&"function"===typeof a[d]&&(a[d]=b)};a.K=[];a.ea=function(c,b,d){if(a.Ka)return 0;a.maxDelay||(a.maxDelay=250);var f=0,e=(new Date).getTime()+a.maxDelay,g=a.d.visibilityState,k=["webkitvisibilitychange","visibilitychange"];g||(g=a.d.webkitVisibilityState);if(g&&"prerender"==
g){if(!a.fa)for(a.fa=1,d=0;d<k.length;d++)a.d.addEventListener(k[d],function(){var c=a.d.visibilityState;c||(c=a.d.webkitVisibilityState);"visible"==c&&(a.fa=0,a.delayReady())});f=1;e=0}else d||a.u("_d")&&(f=1);f&&(a.K.push({m:c,a:b,t:e}),a.fa||setTimeout(a.delayReady,a.maxDelay));return f};a.delayReady=function(){var c=(new Date).getTime(),b=0,d;for(a.u("_d")?b=1:a.za();0<a.K.length;){d=a.K.shift();if(b&&!d.t&&d.t>c){a.K.unshift(d);setTimeout(a.delayReady,parseInt(a.maxDelay/2));break}a.Ka=1;a[d.m].apply(a,
d.a);a.Ka=0}};a.setAccount=a.sa=function(c){var b,d;if(!a.ea("setAccount",arguments))if(a.account=c,a.allAccounts)for(b=a.allAccounts.concat(c.split(",")),a.allAccounts=[],b.sort(),d=0;d<b.length;d++)0!=d&&b[d-1]==b[d]||a.allAccounts.push(b[d]);else a.allAccounts=c.split(",")};a.foreachVar=function(c,b){var d,f,e,g,k="";e=f="";if(a.lightProfileID)d=a.O,(k=a.lightTrackVars)&&(k=","+k+","+a.ka.join(",")+",");else{d=a.g;if(a.pe||a.linkType)k=a.linkTrackVars,f=a.linkTrackEvents,a.pe&&(e=a.pe.substring(0,
1).toUpperCase()+a.pe.substring(1),a[e]&&(k=a[e].cc,f=a[e].bc));k&&(k=","+k+","+a.F.join(",")+",");f&&k&&(k+=",events,")}b&&(b=","+b+",");for(f=0;f<d.length;f++)e=d[f],(g=a[e])&&(!k||0<=k.indexOf(","+e+","))&&(!b||0<=b.indexOf(","+e+","))&&c(e,g)};a.o=function(c,b,d,f,e){var g="",k,l,h,n,m=0;"contextData"==c&&(c="c");if(b){for(k in b)if(!(Object.prototype[k]||e&&k.substring(0,e.length)!=e)&&b[k]&&(!d||0<=d.indexOf(","+(f?f+".":"")+k+","))){h=!1;if(m)for(l=0;l<m.length;l++)if(k.substring(0,m[l].length)==
m[l]){h=!0;break}if(!h&&(""==g&&(g+="&"+c+"."),l=b[k],e&&(k=k.substring(e.length)),0<k.length))if(h=k.indexOf("."),0<h)l=k.substring(0,h),h=(e?e:"")+l+".",m||(m=[]),m.push(h),g+=a.o(l,b,d,f,h);else if("boolean"==typeof l&&(l=l?"true":"false"),l){if("retrieveLightData"==f&&0>e.indexOf(".contextData."))switch(h=k.substring(0,4),n=k.substring(4),k){case "transactionID":k="xact";break;case "channel":k="ch";break;case "campaign":k="v0";break;default:a.Qa(n)&&("prop"==h?k="c"+n:"eVar"==h?k="v"+n:"list"==
h?k="l"+n:"hier"==h&&(k="h"+n,l=l.substring(0,255)))}g+="&"+a.escape(k)+"="+a.escape(l)}}""!=g&&(g+="&."+c)}return g};a.usePostbacks=0;a.Pb=function(){var c="",b,d,f,e,g,k,l,h,n="",m="",p=e="",r=a.T();if(a.lightProfileID)b=a.O,(n=a.lightTrackVars)&&(n=","+n+","+a.ka.join(",")+",");else{b=a.g;if(a.pe||a.linkType)n=a.linkTrackVars,m=a.linkTrackEvents,a.pe&&(e=a.pe.substring(0,1).toUpperCase()+a.pe.substring(1),a[e]&&(n=a[e].cc,m=a[e].bc));n&&(n=","+n+","+a.F.join(",")+",");m&&(m=","+m+",",n&&(n+=",events,"));
a.events2&&(p+=(""!=p?",":"")+a.events2)}if(r&&r.getCustomerIDs){e=q;if(g=r.getCustomerIDs())for(d in g)Object.prototype[d]||(f=g[d],"object"==typeof f&&(e||(e={}),f.id&&(e[d+".id"]=f.id),f.authState&&(e[d+".as"]=f.authState)));e&&(c+=a.o("cid",e))}a.AudienceManagement&&a.AudienceManagement.isReady()&&(c+=a.o("d",a.AudienceManagement.getEventCallConfigParams()));for(d=0;d<b.length;d++){e=b[d];g=a[e];f=e.substring(0,4);k=e.substring(4);g||("events"==e&&p?(g=p,p=""):"marketingCloudOrgID"==e&&r&&a.V("ECID")&&
(g=r.marketingCloudOrgID));if(g&&(!n||0<=n.indexOf(","+e+","))){switch(e){case "customerPerspective":e="cp";break;case "marketingCloudOrgID":e="mcorgid";break;case "supplementalDataID":e="sdid";break;case "timestamp":e="ts";break;case "dynamicVariablePrefix":e="D";break;case "visitorID":e="vid";break;case "marketingCloudVisitorID":e="mid";break;case "analyticsVisitorID":e="aid";break;case "audienceManagerLocationHint":e="aamlh";break;case "audienceManagerBlob":e="aamb";break;case "authState":e="as";
break;case "pageURL":e="g";255<g.length&&(a.pageURLRest=g.substring(255),g=g.substring(0,255));break;case "pageURLRest":e="-g";break;case "referrer":e="r";break;case "vmk":case "visitorMigrationKey":e="vmt";break;case "visitorMigrationServer":e="vmf";a.ssl&&a.visitorMigrationServerSecure&&(g="");break;case "visitorMigrationServerSecure":e="vmf";!a.ssl&&a.visitorMigrationServer&&(g="");break;case "charSet":e="ce";break;case "visitorNamespace":e="ns";break;case "cookieDomainPeriods":e="cdp";break;case "cookieLifetime":e=
"cl";break;case "variableProvider":e="vvp";break;case "currencyCode":e="cc";break;case "channel":e="ch";break;case "transactionID":e="xact";break;case "campaign":e="v0";break;case "latitude":e="lat";break;case "longitude":e="lon";break;case "resolution":e="s";break;case "colorDepth":e="c";break;case "javascriptVersion":e="j";break;case "javaEnabled":e="v";break;case "cookiesEnabled":e="k";break;case "browserWidth":e="bw";break;case "browserHeight":e="bh";break;case "connectionType":e="ct";break;case "homepage":e=
"hp";break;case "events":p&&(g+=(""!=g?",":"")+p);if(m)for(k=g.split(","),g="",f=0;f<k.length;f++)l=k[f],h=l.indexOf("="),0<=h&&(l=l.substring(0,h)),h=l.indexOf(":"),0<=h&&(l=l.substring(0,h)),0<=m.indexOf(","+l+",")&&(g+=(g?",":"")+k[f]);break;case "events2":g="";break;case "contextData":c+=a.o("c",a[e],n,e);g="";break;case "lightProfileID":e="mtp";break;case "lightStoreForSeconds":e="mtss";a.lightProfileID||(g="");break;case "lightIncrementBy":e="mti";a.lightProfileID||(g="");break;case "retrieveLightProfiles":e=
"mtsr";break;case "deleteLightProfiles":e="mtsd";break;case "retrieveLightData":a.retrieveLightProfiles&&(c+=a.o("mts",a[e],n,e));g="";break;default:a.Qa(k)&&("prop"==f?e="c"+k:"eVar"==f?e="v"+k:"list"==f?e="l"+k:"hier"==f&&(e="h"+k,g=g.substring(0,255)))}g&&(c+="&"+e+"="+("pev"!=e.substring(0,3)?a.escape(g):g))}"pev3"==e&&a.e&&(c+=a.e)}a.ja&&(c+="&lrt="+a.ja,a.ja=null);return c};a.B=function(a){var b=a.tagName;if("undefined"!=""+a.kc||"undefined"!=""+a.Yb&&"HTML"!=(""+a.Yb).toUpperCase())return"";
b=b&&b.toUpperCase?b.toUpperCase():"";"SHAPE"==b&&(b="");b&&(("INPUT"==b||"BUTTON"==b)&&a.type&&a.type.toUpperCase?b=a.type.toUpperCase():!b&&a.href&&(b="A"));return b};a.Ma=function(a){var b=h.location,d=a.href?a.href:"",f,e,g;f=d.indexOf(":");e=d.indexOf("?");g=d.indexOf("/");d&&(0>f||0<=e&&f>e||0<=g&&f>g)&&(e=a.protocol&&1<a.protocol.length?a.protocol:b.protocol?b.protocol:"",f=b.pathname.lastIndexOf("/"),d=(e?e+"//":"")+(a.host?a.host:b.host?b.host:"")+("/"!=d.substring(0,1)?b.pathname.substring(0,
0>f?0:f)+"/":"")+d);return d};a.L=function(c){var b=a.B(c),d,f,e="",g=0;return b&&(d=c.protocol,f=c.onclick,!c.href||"A"!=b&&"AREA"!=b||f&&d&&!(0>d.toLowerCase().indexOf("javascript"))?f?(e=a.replace(a.replace(a.replace(a.replace(""+f,"\r",""),"\n",""),"\t","")," ",""),g=2):"INPUT"==b||"SUBMIT"==b?(c.value?e=c.value:c.innerText?e=c.innerText:c.textContent&&(e=c.textContent),g=3):"IMAGE"==b&&c.src&&(e=c.src):e=a.Ma(c),e)?{id:e.substring(0,100),type:g}:0};a.ic=function(c){for(var b=a.B(c),d=a.L(c);c&&
!d&&"BODY"!=b;)if(c=c.parentElement?c.parentElement:c.parentNode)b=a.B(c),d=a.L(c);d&&"BODY"!=b||(c=0);c&&(b=c.onclick?""+c.onclick:"",0<=b.indexOf(".tl(")||0<=b.indexOf(".trackLink("))&&(c=0);return c};a.Xb=function(){var c,b,d=a.linkObject,f=a.linkType,e=a.linkURL,g,k;a.la=1;d||(a.la=0,d=a.clickObject);if(d){c=a.B(d);for(b=a.L(d);d&&!b&&"BODY"!=c;)if(d=d.parentElement?d.parentElement:d.parentNode)c=a.B(d),b=a.L(d);b&&"BODY"!=c||(d=0);if(d&&!a.linkObject){var l=d.onclick?""+d.onclick:"";if(0<=l.indexOf(".tl(")||
0<=l.indexOf(".trackLink("))d=0}}else a.la=1;!e&&d&&(e=a.Ma(d));e&&!a.linkLeaveQueryString&&(g=e.indexOf("?"),0<=g&&(e=e.substring(0,g)));if(!f&&e){var m=0,n=0,p;if(a.trackDownloadLinks&&a.linkDownloadFileTypes)for(l=e.toLowerCase(),g=l.indexOf("?"),k=l.indexOf("#"),0<=g?0<=k&&k<g&&(g=k):g=k,0<=g&&(l=l.substring(0,g)),g=a.linkDownloadFileTypes.toLowerCase().split(","),k=0;k<g.length;k++)(p=g[k])&&l.substring(l.length-(p.length+1))=="."+p&&(f="d");if(a.trackExternalLinks&&!f&&(l=e.toLowerCase(),a.Pa(l)&&
(a.linkInternalFilters||(a.linkInternalFilters=h.location.hostname),g=0,a.linkExternalFilters?(g=a.linkExternalFilters.toLowerCase().split(","),m=1):a.linkInternalFilters&&(g=a.linkInternalFilters.toLowerCase().split(",")),g))){for(k=0;k<g.length;k++)p=g[k],0<=l.indexOf(p)&&(n=1);n?m&&(f="e"):m||(f="e")}}a.linkObject=d;a.linkURL=e;a.linkType=f;if(a.trackClickMap||a.trackInlineStats)a.e="",d&&(f=a.pageName,e=1,d=d.sourceIndex,f||(f=a.pageURL,e=0),h.s_objectID&&(b.id=h.s_objectID,d=b.type=1),f&&b&&
b.id&&c&&(a.e="&pid="+a.escape(f.substring(0,255))+(e?"&pidt="+e:"")+"&oid="+a.escape(b.id.substring(0,100))+(b.type?"&oidt="+b.type:"")+"&ot="+c+(d?"&oi="+d:"")))};a.Qb=function(){var c=a.la,b=a.linkType,d=a.linkURL,f=a.linkName;b&&(d||f)&&(b=b.toLowerCase(),"d"!=b&&"e"!=b&&(b="o"),a.pe="lnk_"+b,a.pev1=d?a.escape(d):"",a.pev2=f?a.escape(f):"",c=1);a.abort&&(c=0);if(a.trackClickMap||a.trackInlineStats||a.Tb()){var b={},d=0,e=a.qb(),g=e?e.split("&"):0,k,l,h,e=0;if(g)for(k=0;k<g.length;k++)l=g[k].split("="),
f=a.unescape(l[0]).split(","),l=a.unescape(l[1]),b[l]=f;f=a.account.split(",");k={};for(h in a.contextData)h&&!Object.prototype[h]&&"a.activitymap."==h.substring(0,14)&&(k[h]=a.contextData[h],a.contextData[h]="");a.e=a.o("c",k)+(a.e?a.e:"");if(c||a.e){c&&!a.e&&(e=1);for(l in b)if(!Object.prototype[l])for(h=0;h<f.length;h++)for(e&&(g=b[l].join(","),g==a.account&&(a.e+=("&"!=l.charAt(0)?"&":"")+l,b[l]=[],d=1)),k=0;k<b[l].length;k++)g=b[l][k],g==f[h]&&(e&&(a.e+="&u="+a.escape(g)+("&"!=l.charAt(0)?"&":
"")+l+"&u=0"),b[l].splice(k,1),d=1);c||(d=1);if(d){e="";k=2;!c&&a.e&&(e=a.escape(f.join(","))+"="+a.escape(a.e),k=1);for(l in b)!Object.prototype[l]&&0<k&&0<b[l].length&&(e+=(e?"&":"")+a.escape(b[l].join(","))+"="+a.escape(l),k--);a.yb(e)}}}return c};a.qb=function(){if(a.useLinkTrackSessionStorage){if(a.Da())return h.sessionStorage.getItem(a.P)}else return a.cookieRead(a.P)};a.Da=function(){return h.sessionStorage?!0:!1};a.yb=function(c){a.useLinkTrackSessionStorage?a.Da()&&h.sessionStorage.setItem(a.P,
c):a.cookieWrite(a.P,c)};a.Rb=function(){if(!a.ac){var c=new Date,b=p.location,d,f,e=f=d="",g="",k="",l="1.2",h=a.cookieWrite("s_cc","true",0)?"Y":"N",m="",q="";if(c.setUTCDate&&(l="1.3",(0).toPrecision&&(l="1.5",c=[],c.forEach))){l="1.6";f=0;d={};try{f=new Iterator(d),f.next&&(l="1.7",c.reduce&&(l="1.8",l.trim&&(l="1.8.1",Date.parse&&(l="1.8.2",Object.create&&(l="1.8.5")))))}catch(r){}}d=screen.width+"x"+screen.height;e=navigator.javaEnabled()?"Y":"N";f=screen.pixelDepth?screen.pixelDepth:screen.colorDepth;
g=a.w.innerWidth?a.w.innerWidth:a.d.documentElement.offsetWidth;k=a.w.innerHeight?a.w.innerHeight:a.d.documentElement.offsetHeight;try{a.b.addBehavior("#default#homePage"),m=a.b.jc(b)?"Y":"N"}catch(s){}try{a.b.addBehavior("#default#clientCaps"),q=a.b.connectionType}catch(t){}a.resolution=d;a.colorDepth=f;a.javascriptVersion=l;a.javaEnabled=e;a.cookiesEnabled=h;a.browserWidth=g;a.browserHeight=k;a.connectionType=q;a.homepage=m;a.ac=1}};a.Q={};a.loadModule=function(c,b){var d=a.Q[c];if(!d){d=h["AppMeasurement_Module_"+
c]?new h["AppMeasurement_Module_"+c](a):{};a.Q[c]=a[c]=d;d.jb=function(){return d.tb};d.zb=function(b){if(d.tb=b)a[c+"_onLoad"]=b,a.ea(c+"_onLoad",[a,d],1)||b(a,d)};try{Object.defineProperty?Object.defineProperty(d,"onLoad",{get:d.jb,set:d.zb}):d._olc=1}catch(f){d._olc=1}}b&&(a[c+"_onLoad"]=b,a.ea(c+"_onLoad",[a,d],1)||b(a,d))};a.u=function(c){var b,d;for(b in a.Q)if(!Object.prototype[b]&&(d=a.Q[b])&&(d._olc&&d.onLoad&&(d._olc=0,d.onLoad(a,d)),d[c]&&d[c]()))return 1;return 0};a.Tb=function(){return a.ActivityMap&&
a.ActivityMap._c?!0:!1};a.Ub=function(){var c=Math.floor(1E13*Math.random()),b=a.visitorSampling,d=a.visitorSamplingGroup,d="s_vsn_"+(a.visitorNamespace?a.visitorNamespace:a.account)+(d?"_"+d:""),f=a.cookieRead(d);if(b){b*=100;f&&(f=parseInt(f));if(!f){if(!a.cookieWrite(d,c))return 0;f=c}if(f%1E4>b)return 0}return 1};a.S=function(c,b){var d,f,e,g,k,h,m;m={};for(d=0;2>d;d++)for(f=0<d?a.Fa:a.g,e=0;e<f.length;e++)if(g=f[e],(k=c[g])||c["!"+g]){if(k&&!b&&("contextData"==g||"retrieveLightData"==g)&&a[g])for(h in a[g])k[h]||
(k[h]=a[g][h]);a[g]||(m["!"+g]=1);m[g]=a[g];a[g]=k}return m};a.gc=function(c){var b,d,f,e;for(b=0;2>b;b++)for(d=0<b?a.Fa:a.g,f=0;f<d.length;f++)e=d[f],c[e]=a[e],c[e]||"prop"!==e.substring(0,4)&&"eVar"!==e.substring(0,4)&&"hier"!==e.substring(0,4)&&"list"!==e.substring(0,4)&&"channel"!==e&&"events"!==e&&"eventList"!==e&&"products"!==e&&"productList"!==e&&"purchaseID"!==e&&"transactionID"!==e&&"state"!==e&&"zip"!==e&&"campaign"!==e&&"events2"!==e&&"latitude"!==e&&"longitude"!==e&&"ms_a"!==e&&"contextData"!==
e&&"supplementalDataID"!==e&&"tnt"!==e&&"timestamp"!==e&&"abort"!==e&&"useBeacon"!==e&&"linkObject"!==e&&"clickObject"!==e&&"linkType"!==e&&"linkName"!==e&&"linkURL"!==e&&"bodyClickTarget"!==e&&"bodyClickFunction"!==e||(c["!"+e]=1)};a.Lb=function(a){var b,d,f,e,g,k=0,h,m="",n="";if(a&&255<a.length&&(b=""+a,d=b.indexOf("?"),0<d&&(h=b.substring(d+1),b=b.substring(0,d),e=b.toLowerCase(),f=0,"http://"==e.substring(0,7)?f+=7:"https://"==e.substring(0,8)&&(f+=8),d=e.indexOf("/",f),0<d&&(e=e.substring(f,
d),g=b.substring(d),b=b.substring(0,d),0<=e.indexOf("google")?k=",q,ie,start,search_key,word,kw,cd,":0<=e.indexOf("yahoo.co")?k=",p,ei,":0<=e.indexOf("baidu.")&&(k=",wd,word,"),k&&h)))){if((a=h.split("&"))&&1<a.length){for(f=0;f<a.length;f++)e=a[f],d=e.indexOf("="),0<d&&0<=k.indexOf(","+e.substring(0,d)+",")?m+=(m?"&":"")+e:n+=(n?"&":"")+e;m&&n?h=m+"&"+n:n=""}d=253-(h.length-n.length)-b.length;a=b+(0<d?g.substring(0,d):"")+"?"+h}return a};a.cb=function(c){var b=a.d.visibilityState,d=["webkitvisibilitychange",
"visibilitychange"];b||(b=a.d.webkitVisibilityState);if(b&&"prerender"==b){if(c)for(b=0;b<d.length;b++)a.d.addEventListener(d[b],function(){var b=a.d.visibilityState;b||(b=a.d.webkitVisibilityState);"visible"==b&&c()});return!1}return!0};a.ba=!1;a.H=!1;a.Bb=function(){a.H=!0;a.p()};a.I=!1;a.Cb=function(c){a.marketingCloudVisitorID=c.MCMID;a.visitorOptedOut=c.MCOPTOUT;a.analyticsVisitorID=c.MCAID;a.audienceManagerLocationHint=c.MCAAMLH;a.audienceManagerBlob=c.MCAAMB;a.I=!1;a.p()};a.bb=function(c){a.maxDelay||
(a.maxDelay=250);return a.u("_d")?(c&&setTimeout(function(){c()},a.maxDelay),!1):!0};a.Z=!1;a.G=!1;a.za=function(){a.G=!0;a.p()};a.isReadyToTrack=function(){var c=!0;if(!a.nb()||!a.lb())return!1;a.pb()||(c=!1);a.sb()||(c=!1);return c};a.nb=function(){a.ba||a.H||(a.cb(a.Bb)?a.H=!0:a.ba=!0);return a.ba&&!a.H?!1:!0};a.lb=function(){var c=a.va();if(c)if(a.ra||a.aa)if(a.ra){if(!c.isApproved(c.Categories.ANALYTICS))return!1}else return!1;else return c.fetchPermissions(a.ub,!0),a.aa=!0,!1;return!0};a.V=
function(c){var b=a.va();return b&&!b.isApproved(b.Categories[c])?!1:!0};a.va=function(){return h.adobe&&h.adobe.optIn?h.adobe.optIn:null};a.Y=!0;a.pb=function(){var c=a.T();if(!c||!c.getVisitorValues)return!0;a.Y&&(a.Y=!1,a.I||(a.I=!0,c.getVisitorValues(a.Cb)));return!a.I};a.T=function(){var c=a.visitor;c&&!c.isAllowed()&&(c=null);return c};a.sb=function(){a.Z||a.G||(a.bb(a.za)?a.G=!0:a.Z=!0);return a.Z&&!a.G?!1:!0};a.aa=!1;a.ub=function(){a.aa=!1;a.ra=!0};a.j=q;a.q=0;a.callbackWhenReadyToTrack=
function(c,b,d){var f;f={};f.Gb=c;f.Fb=b;f.Db=d;a.j==q&&(a.j=[]);a.j.push(f);0==a.q&&(a.q=setInterval(a.p,100))};a.p=function(){var c;if(a.isReadyToTrack()&&(a.Ab(),a.j!=q))for(;0<a.j.length;)c=a.j.shift(),c.Fb.apply(c.Gb,c.Db)};a.Ab=function(){a.q&&(clearInterval(a.q),a.q=0)};a.ta=function(c){var b,d={};a.gc(d);if(c!=q)for(b in c)d[b]=c[b];a.callbackWhenReadyToTrack(a,a.Ea,[d]);a.Ca()};a.Nb=function(){var c=a.cookieRead("s_fid"),b="",d="",f;f=8;var e=4;if(!c||0>c.indexOf("-")){for(c=0;16>c;c++)f=
Math.floor(Math.random()*f),b+="0123456789ABCDEF".substring(f,f+1),f=Math.floor(Math.random()*e),d+="0123456789ABCDEF".substring(f,f+1),f=e=16;c=b+"-"+d}a.cookieWrite("s_fid",c,1)||(c=0);return c};a.Ea=function(c){var b=new Date,d="s"+Math.floor(b.getTime()/108E5)%10+Math.floor(1E13*Math.random()),f=b.getYear(),f="t="+a.escape(b.getDate()+"/"+b.getMonth()+"/"+(1900>f?f+1900:f)+" "+b.getHours()+":"+b.getMinutes()+":"+b.getSeconds()+" "+b.getDay()+" "+b.getTimezoneOffset()),e=a.T(),g;c&&(g=a.S(c,1));
a.Ub()&&!a.visitorOptedOut&&(a.wa()||(a.fid=a.Nb()),a.Xb(),a.usePlugins&&a.doPlugins&&a.doPlugins(a),a.account&&(a.abort||(a.trackOffline&&!a.timestamp&&(a.timestamp=Math.floor(b.getTime()/1E3)),c=h.location,a.pageURL||(a.pageURL=c.href?c.href:c),a.referrer||a.Za||(c=a.Util.getQueryParam("adobe_mc_ref",null,null,!0),a.referrer=c||void 0===c?void 0===c?"":c:p.document.referrer),a.Za=1,a.referrer=a.Lb(a.referrer),a.u("_g")),a.Qb()&&!a.abort&&(e&&a.V("TARGET")&&!a.supplementalDataID&&e.getSupplementalDataID&&
(a.supplementalDataID=e.getSupplementalDataID("AppMeasurement:"+a._in,a.expectSupplementalData?!1:!0)),a.V("AAM")||(a.contextData["cm.ssf"]=1),a.Rb(),a.vb(),f+=a.Pb(),a.rb(d,f),a.u("_t"),a.referrer="")));a.Ca();g&&a.S(g,1)};a.t=a.track=function(c,b){b&&a.S(b);a.Y=!0;a.isReadyToTrack()?null!=a.j&&0<a.j.length?(a.ta(c),a.p()):a.Ea(c):a.ta(c)};a.vb=function(){a.writeSecureCookies&&!a.ssl&&a.$a()};a.$a=function(){a.contextData.excCodes=a.contextData.excCodes?a.contextData.excCodes:[];a.contextData.excCodes.push(1)};
a.Ca=function(){a.abort=a.supplementalDataID=a.timestamp=a.pageURLRest=a.linkObject=a.clickObject=a.linkURL=a.linkName=a.linkType=h.s_objectID=a.pe=a.pev1=a.pev2=a.pev3=a.e=a.lightProfileID=a.useBeacon=a.referrer=0;a.contextData&&a.contextData.excCodes&&(a.contextData.excCodes=0)};a.Ba=[];a.registerPreTrackCallback=function(c){for(var b=[],d=1;d<arguments.length;d++)b.push(arguments[d]);"function"==typeof c?a.Ba.push([c,b]):a.debugTracking&&a.C("DEBUG: Non function type passed to registerPreTrackCallback")};
a.gb=function(c){a.ua(a.Ba,c)};a.Aa=[];a.registerPostTrackCallback=function(c){for(var b=[],d=1;d<arguments.length;d++)b.push(arguments[d]);"function"==typeof c?a.Aa.push([c,b]):a.debugTracking&&a.C("DEBUG: Non function type passed to registerPostTrackCallback")};a.fb=function(c){a.ua(a.Aa,c)};a.ua=function(c,b){if("object"==typeof c)for(var d=0;d<c.length;d++){var f=c[d][0],e=c[d][1].slice();e.unshift(b);if("function"==typeof f)try{f.apply(null,e)}catch(g){a.debugTracking&&a.C(g.message)}}};a.tl=
a.trackLink=function(c,b,d,f,e){a.linkObject=c;a.linkType=b;a.linkName=d;e&&(a.bodyClickTarget=c,a.bodyClickFunction=e);return a.track(f)};a.trackLight=function(c,b,d,f){a.lightProfileID=c;a.lightStoreForSeconds=b;a.lightIncrementBy=d;return a.track(f)};a.clearVars=function(){var c,b;for(c=0;c<a.g.length;c++)if(b=a.g[c],"prop"==b.substring(0,4)||"eVar"==b.substring(0,4)||"hier"==b.substring(0,4)||"list"==b.substring(0,4)||"channel"==b||"events"==b||"eventList"==b||"products"==b||"productList"==b||
"purchaseID"==b||"transactionID"==b||"state"==b||"zip"==b||"campaign"==b)a[b]=void 0};a.tagContainerMarker="";a.rb=function(c,b){var d=a.hb()+"/"+c+"?AQB=1&ndh=1&pf=1&"+(a.ya()?"callback=s_c_il["+a._in+"].doPostbacks&et=1&":"")+b+"&AQE=1";a.gb(d);a.eb(d);a.U()};a.hb=function(){var c=a.ib();return"http"+(a.ssl?"s":"")+"://"+c+"/b/ss/"+a.account+"/"+(a.mobile?"5.":"")+(a.ya()?"10":"1")+"/JS-"+a.version+(a.$b?"T":"")+(a.tagContainerMarker?"-"+a.tagContainerMarker:"")};a.ya=function(){return a.AudienceManagement&&
a.AudienceManagement.isReady()||0!=a.usePostbacks};a.ib=function(){var c=a.dc,b=a.trackingServer;b?a.trackingServerSecure&&a.ssl&&(b=a.trackingServerSecure):(c=c?(""+c).toLowerCase():"d1","d1"==c?c="112":"d2"==c&&(c="122"),b=a.kb()+"."+c+".2o7.net");return b};a.kb=function(){var c=a.visitorNamespace;c||(c=a.account.split(",")[0],c=c.replace(/[^0-9a-z]/gi,""));return c};a.Ya=/{(%?)(.*?)(%?)}/;a.fc=RegExp(a.Ya.source,"g");a.Kb=function(c){if("object"==typeof c.dests)for(var b=0;b<c.dests.length;++b){var d=
c.dests[b];if("string"==typeof d.c&&"aa."==d.id.substr(0,3))for(var f=d.c.match(a.fc),e=0;e<f.length;++e){var g=f[e],k=g.match(a.Ya),h="";"%"==k[1]&&"timezone_offset"==k[2]?h=(new Date).getTimezoneOffset():"%"==k[1]&&"timestampz"==k[2]&&(h=a.Ob());d.c=d.c.replace(g,a.escape(h))}}};a.Ob=function(){var c=new Date,b=new Date(6E4*Math.abs(c.getTimezoneOffset()));return a.k(4,c.getFullYear())+"-"+a.k(2,c.getMonth()+1)+"-"+a.k(2,c.getDate())+"T"+a.k(2,c.getHours())+":"+a.k(2,c.getMinutes())+":"+a.k(2,c.getSeconds())+
(0<c.getTimezoneOffset()?"-":"+")+a.k(2,b.getUTCHours())+":"+a.k(2,b.getUTCMinutes())};a.k=function(a,b){return(Array(a+1).join(0)+b).slice(-a)};a.pa={};a.doPostbacks=function(c){if("object"==typeof c)if(a.Kb(c),"object"==typeof a.AudienceManagement&&"function"==typeof a.AudienceManagement.isReady&&a.AudienceManagement.isReady()&&"function"==typeof a.AudienceManagement.passData)a.AudienceManagement.passData(c);else if("object"==typeof c&&"object"==typeof c.dests)for(var b=0;b<c.dests.length;++b){var d=
c.dests[b];"object"==typeof d&&"string"==typeof d.c&&"string"==typeof d.id&&"aa."==d.id.substr(0,3)&&(a.pa[d.id]=new Image,a.pa[d.id].alt="",a.pa[d.id].src=d.c)}};a.eb=function(c){a.i||a.Sb();a.i.push(c);a.ia=a.A();a.Xa()};a.Sb=function(){a.i=a.Vb();a.i||(a.i=[])};a.Vb=function(){var c,b;if(a.oa()){try{(b=h.localStorage.getItem(a.ma()))&&(c=h.JSON.parse(b))}catch(d){}return c}};a.oa=function(){var c=!0;a.trackOffline&&a.offlineFilename&&h.localStorage&&h.JSON||(c=!1);return c};a.Na=function(){var c=
0;a.i&&(c=a.i.length);a.l&&c++;return c};a.U=function(){if(a.l&&(a.v&&a.v.complete&&a.v.D&&a.v.R(),a.l))return;a.Oa=q;if(a.na)a.ia>a.N&&a.Va(a.i),a.qa(500);else{var c=a.Eb();if(0<c)a.qa(c);else if(c=a.La())a.l=1,a.Wb(c),a.Zb(c)}};a.qa=function(c){a.Oa||(c||(c=0),a.Oa=setTimeout(a.U,c))};a.Eb=function(){var c;if(!a.trackOffline||0>=a.offlineThrottleDelay)return 0;c=a.A()-a.Ta;return a.offlineThrottleDelay<c?0:a.offlineThrottleDelay-c};a.La=function(){if(0<a.i.length)return a.i.shift()};a.Wb=function(c){if(a.debugTracking){var b=
"AppMeasurement Debug: "+c;c=c.split("&");var d;for(d=0;d<c.length;d++)b+="\n\t"+a.unescape(c[d]);a.C(b)}};a.wa=function(){return a.marketingCloudVisitorID||a.analyticsVisitorID};a.X=!1;var t;try{t=JSON.parse('{"x":"y"}')}catch(v){t=null}t&&"y"==t.x?(a.X=!0,a.W=function(a){return JSON.parse(a)}):h.$&&h.$.parseJSON?(a.W=function(a){return h.$.parseJSON(a)},a.X=!0):a.W=function(){return null};a.Zb=function(c){var b,d,f;a.mb(c)&&(d=1,b={send:function(c){a.useBeacon=!1;navigator.sendBeacon(c)?b.R():b.ga()}});
!b&&a.wa()&&2047<c.length&&(a.ab()&&(d=2,b=new XMLHttpRequest),b&&(a.AudienceManagement&&a.AudienceManagement.isReady()||0!=a.usePostbacks)&&(a.X?b.Ga=!0:b=0));!b&&a.ec&&(c=c.substring(0,2047));!b&&a.d.createElement&&(0!=a.usePostbacks||a.AudienceManagement&&a.AudienceManagement.isReady())&&(b=a.d.createElement("SCRIPT"))&&"async"in b&&((f=(f=a.d.getElementsByTagName("HEAD"))&&f[0]?f[0]:a.d.body)?(b.type="text/javascript",b.setAttribute("async","async"),d=3):b=0);b||(b=new Image,b.alt="",b.abort||
"undefined"===typeof h.InstallTrigger||(b.abort=function(){b.src=q}));b.Ua=Date.now();b.Ia=function(){try{b.D&&(clearTimeout(b.D),b.D=0)}catch(a){}};b.onload=b.R=function(){b.Ua&&(a.ja=Date.now()-b.Ua);a.fb(c);b.Ia();a.Ib();a.ca();a.l=0;a.U();if(b.Ga){b.Ga=!1;try{a.doPostbacks(a.W(b.responseText))}catch(d){}}};b.onabort=b.onerror=b.ga=function(){b.Ia();(a.trackOffline||a.na)&&a.l&&a.i.unshift(a.Hb);a.l=0;a.ia>a.N&&a.Va(a.i);a.ca();a.qa(500)};b.onreadystatechange=function(){4==b.readyState&&(200==
b.status?b.R():b.ga())};a.Ta=a.A();if(1===d)b.send(c);else if(2===d)f=c.indexOf("?"),d=c.substring(0,f),f=c.substring(f+1),f=f.replace(/&callback=[a-zA-Z0-9_.\[\]]+/,""),b.open("POST",d,!0),b.withCredentials=!0,b.send(f);else if(b.src=c,3===d){if(a.Ra)try{f.removeChild(a.Ra)}catch(e){}f.firstChild?f.insertBefore(b,f.firstChild):f.appendChild(b);a.Ra=a.v}b.D=setTimeout(function(){b.D&&(b.complete?b.R():(a.trackOffline&&b.abort&&b.abort(),b.ga()))},5E3);a.Hb=c;a.v=h["s_i_"+a.replace(a.account,",","_")]=
b;if(a.useForcedLinkTracking&&a.J||a.bodyClickFunction)a.forcedLinkTrackingTimeout||(a.forcedLinkTrackingTimeout=250),a.da=setTimeout(a.ca,a.forcedLinkTrackingTimeout)};a.mb=function(c){var b=!1;navigator.sendBeacon&&(a.ob(c)?b=!0:a.useBeacon&&(b=!0));a.xb(c)&&(b=!1);return b};a.ob=function(a){return a&&0<a.indexOf("pe=lnk_e")?!0:!1};a.xb=function(a){return 64E3<=a.length};a.ab=function(){return"undefined"!==typeof XMLHttpRequest&&"withCredentials"in new XMLHttpRequest?!0:!1};a.Ib=function(){if(a.oa()&&
!(a.Sa>a.N))try{h.localStorage.removeItem(a.ma()),a.Sa=a.A()}catch(c){}};a.Va=function(c){if(a.oa()){a.Xa();try{h.localStorage.setItem(a.ma(),h.JSON.stringify(c)),a.N=a.A()}catch(b){}}};a.Xa=function(){if(a.trackOffline){if(!a.offlineLimit||0>=a.offlineLimit)a.offlineLimit=10;for(;a.i.length>a.offlineLimit;)a.La()}};a.forceOffline=function(){a.na=!0};a.forceOnline=function(){a.na=!1};a.ma=function(){return a.offlineFilename+"-"+a.visitorNamespace+a.account};a.A=function(){return(new Date).getTime()};
a.Pa=function(a){a=a.toLowerCase();return 0!=a.indexOf("#")&&0!=a.indexOf("about:")&&0!=a.indexOf("opera:")&&0!=a.indexOf("javascript:")?!0:!1};a.setTagContainer=function(c){var b,d,f;a.$b=c;for(b=0;b<a._il.length;b++)if((d=a._il[b])&&"s_l"==d._c&&d.tagContainerName==c){a.S(d);if(d.lmq)for(b=0;b<d.lmq.length;b++)f=d.lmq[b],a.loadModule(f.n);if(d.ml)for(f in d.ml)if(a[f])for(b in c=a[f],f=d.ml[f],f)!Object.prototype[b]&&("function"!=typeof f[b]||0>(""+f[b]).indexOf("s_c_il"))&&(c[b]=f[b]);if(d.mmq)for(b=
0;b<d.mmq.length;b++)f=d.mmq[b],a[f.m]&&(c=a[f.m],c[f.f]&&"function"==typeof c[f.f]&&(f.a?c[f.f].apply(c,f.a):c[f.f].apply(c)));if(d.tq)for(b=0;b<d.tq.length;b++)a.track(d.tq[b]);d.s=a;break}};a.Util={urlEncode:a.escape,urlDecode:a.unescape,cookieRead:a.cookieRead,cookieWrite:a.cookieWrite,getQueryParam:function(c,b,d,f){var e,g="";b||(b=a.pageURL?a.pageURL:h.location);d=d?d:"&";if(!c||!b)return g;b=""+b;e=b.indexOf("?");if(0>e)return g;b=d+b.substring(e+1)+d;if(!f||!(0<=b.indexOf(d+c+d)||0<=b.indexOf(d+
c+"="+d))){e=b.indexOf("#");0<=e&&(b=b.substr(0,e)+d);e=b.indexOf(d+c+"=");if(0>e)return g;b=b.substring(e+d.length+c.length+1);e=b.indexOf(d);0<=e&&(b=b.substring(0,e));0<b.length&&(g=a.unescape(b));return g}},getIeVersion:function(){return document.documentMode?document.documentMode:a.xa()?7:null}};a.F="supplementalDataID timestamp dynamicVariablePrefix visitorID marketingCloudVisitorID analyticsVisitorID audienceManagerLocationHint authState fid vmk visitorMigrationKey visitorMigrationServer visitorMigrationServerSecure charSet visitorNamespace cookieDomainPeriods fpCookieDomainPeriods cookieLifetime pageName pageURL customerPerspective referrer contextData currencyCode lightProfileID lightStoreForSeconds lightIncrementBy retrieveLightProfiles deleteLightProfiles retrieveLightData".split(" ");
a.g=a.F.concat("purchaseID variableProvider channel server pageType transactionID campaign state zip events events2 products audienceManagerBlob tnt".split(" "));a.ka="timestamp charSet visitorNamespace cookieDomainPeriods cookieLifetime contextData lightProfileID lightStoreForSeconds lightIncrementBy".split(" ");a.O=a.ka.slice(0);a.Fa="account allAccounts debugTracking visitor visitorOptedOut trackOffline offlineLimit offlineThrottleDelay offlineFilename usePlugins doPlugins configURL visitorSampling visitorSamplingGroup linkObject clickObject linkURL linkName linkType trackDownloadLinks trackExternalLinks trackClickMap trackInlineStats linkLeaveQueryString linkTrackVars linkTrackEvents linkDownloadFileTypes linkExternalFilters linkInternalFilters useForcedLinkTracking forcedLinkTrackingTimeout writeSecureCookies useLinkTrackSessionStorage trackingServer trackingServerSecure ssl abort mobile dc lightTrackVars maxDelay expectSupplementalData useBeacon usePostbacks registerPreTrackCallback registerPostTrackCallback bodyClickTarget bodyClickFunction AudienceManagement".split(" ");
for(m=0;250>=m;m++)76>m&&(a.g.push("prop"+m),a.O.push("prop"+m)),a.g.push("eVar"+m),a.O.push("eVar"+m),6>m&&a.g.push("hier"+m),4>m&&a.g.push("list"+m);m="pe pev1 pev2 pev3 latitude longitude resolution colorDepth javascriptVersion javaEnabled cookiesEnabled browserWidth browserHeight connectionType homepage pageURLRest marketingCloudOrgID ms_a".split(" ");a.g=a.g.concat(m);a.F=a.F.concat(m);a.ssl=0<=h.location.protocol.toLowerCase().indexOf("https");a.charSet="UTF-8";a.contextData={};a.writeSecureCookies=
!1;a.offlineThrottleDelay=0;a.offlineFilename="AppMeasurement.offline";a.P="s_sq";a.Ta=0;a.ia=0;a.N=0;a.Sa=0;a.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx";a.w=h;a.d=h.document;a.ca=function(){a.da&&(h.clearTimeout(a.da),a.da=q);a.bodyClickTarget&&a.J&&a.bodyClickTarget.dispatchEvent(a.J);a.bodyClickFunction&&("function"==typeof a.bodyClickFunction?a.bodyClickFunction():a.bodyClickTarget&&a.bodyClickTarget.href&&(a.d.location=a.bodyClickTarget.href));a.bodyClickTarget=
a.J=a.bodyClickFunction=0};a.Wa=function(){a.b=a.d.body;a.b?(a.r=function(c){var b,d,f,e,g;if(!(a.d&&a.d.getElementById("cppXYctnr")||c&&c["s_fe_"+a._in])){if(a.Ha)if(a.useForcedLinkTracking)a.b.removeEventListener("click",a.r,!1);else{a.b.removeEventListener("click",a.r,!0);a.Ha=a.useForcedLinkTracking=0;return}else a.useForcedLinkTracking=0;a.clickObject=c.srcElement?c.srcElement:c.target;try{if(!a.clickObject||a.M&&a.M==a.clickObject||!(a.clickObject.tagName||a.clickObject.parentElement||a.clickObject.parentNode))a.clickObject=
0;else{var k=a.M=a.clickObject;a.ha&&(clearTimeout(a.ha),a.ha=0);a.ha=setTimeout(function(){a.M==k&&(a.M=0)},1E4);f=a.Na();a.track();if(f<a.Na()&&a.useForcedLinkTracking&&c.target){for(e=c.target;e&&e!=a.b&&"A"!=e.tagName.toUpperCase()&&"AREA"!=e.tagName.toUpperCase();)e=e.parentNode;if(e&&(g=e.href,a.Pa(g)||(g=0),d=e.target,c.target.dispatchEvent&&g&&(!d||"_self"==d||"_top"==d||"_parent"==d||h.name&&d==h.name))){try{b=a.d.createEvent("MouseEvents")}catch(l){b=new h.MouseEvent}if(b){try{b.initMouseEvent("click",
c.bubbles,c.cancelable,c.view,c.detail,c.screenX,c.screenY,c.clientX,c.clientY,c.ctrlKey,c.altKey,c.shiftKey,c.metaKey,c.button,c.relatedTarget)}catch(m){b=0}b&&(b["s_fe_"+a._in]=b.s_fe=1,c.stopPropagation(),c.stopImmediatePropagation&&c.stopImmediatePropagation(),c.preventDefault(),a.bodyClickTarget=c.target,a.J=b)}}}}}catch(n){a.clickObject=0}}},a.b&&a.b.attachEvent?a.b.attachEvent("onclick",a.r):a.b&&a.b.addEventListener&&(navigator&&(0<=navigator.userAgent.indexOf("WebKit")&&a.d.createEvent||
0<=navigator.userAgent.indexOf("Firefox/2")&&h.MouseEvent)&&(a.Ha=1,a.useForcedLinkTracking=1,a.b.addEventListener("click",a.r,!0)),a.b.addEventListener("click",a.r,!1))):setTimeout(a.Wa,30)};a.ec=a.xa();a.Jb();a.lc||(r?a.setAccount(r):a.C("Error, missing Report Suite ID in AppMeasurement initialization"),a.Wa(),a.loadModule("ActivityMap"))}
function s_gi(r){var a,h=window.s_c_il,q,p,m=r.split(","),s,u,t=0;if(h)for(q=0;!t&&q<h.length;){a=h[q];if("s_c"==a._c&&(a.account||a.oun))if(a.account&&a.account==r)t=1;else for(p=a.account?a.account:a.oun,p=a.allAccounts?a.allAccounts:p.split(","),s=0;s<m.length;s++)for(u=0;u<p.length;u++)m[s]==p[u]&&(t=1);q++}t?a.setAccount&&a.setAccount(r):a=new AppMeasurement(r);return a}AppMeasurement.getInstance=s_gi;window.s_objectID||(window.s_objectID=0);
function s_pgicq(){var r=window,a=r.s_giq,h,q,p;if(a)for(h=0;h<a.length;h++)q=a[h],p=s_gi(q.oun),p.setAccount(q.un),p.setTagContainer(q.tagContainerName);r.s_giq=0}s_pgicq();
