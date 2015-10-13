/* http://www.kryogenix.org/code/browser/searchhi/ */
/* Modified 20021006 to fix query string parsing and add case insensitivity */
/* Modified 20070316 to stop highlighting inside nosearchhi nodes */
/* Modified 20090104 by Bruce Lawson to use html5 mark element  rather than span http://www.whatwg.org/specs/web-apps/current-work/multipage/text-level-semantics.html#the-mark-element */

/* This script is by Stuart Langridge licensed under MIT license http://www.kryogenix.org/code/browser/licence.html */

function highlightWord(node,word) {
	// Iterate into this nodes childNodes
	if (node.hasChildNodes) {
		var hi_cn;
		for (hi_cn=0;hi_cn<node.childNodes.length;hi_cn++) {
			highlightWord(node.childNodes[hi_cn],word);
		}
	}
	
	// And do this node itself
	if (node.nodeType == 3) { // text node
		tempNodeVal = node.nodeValue.toLowerCase();
		tempWordVal = word.toLowerCase();
		if (tempNodeVal.indexOf(tempWordVal) != -1) {
			pn = node.parentNode;
			// check if we're inside a "nosearchhi" zone
			checkn = pn;
			while (checkn.nodeType != 9 && 
			checkn.nodeName.toLowerCase() != 'body') { 
			// 9 = top of doc
				if (checkn.className.match(/\bnosearchhi\b/)) { return; }
				checkn = checkn.parentNode;
			}
			if (pn.className != "searchword") {
				// word has not already been highlighted!
				nv = node.nodeValue;
				ni = tempNodeVal.indexOf(tempWordVal);
				// Create a load of replacement nodes
				before = document.createTextNode(nv.substr(0,ni));
				docWordVal = nv.substr(ni,word.length);
				after = document.createTextNode(nv.substr(ni+word.length));
				hiwordtext = document.createTextNode(docWordVal);
				hiword = document.createElement("mark");
				hiword.className = "searchword";
				hiword.appendChild(hiwordtext);
				pn.insertBefore(before,node);
				pn.insertBefore(hiword,node);
				pn.insertBefore(after,node);
				pn.removeChild(node);
			}
		}
	}
}

function googleSearchHighlight() {
	if (!document.createElement) return;
	ref = document.referrer;
	if (ref.indexOf('?') == -1) return;
	qs = ref.substr(ref.indexOf('?')+1);
	qsa = qs.split('&');
	for (i=0;i<qsa.length;i++) {
		qsip = qsa[i].split('=');
	        if (qsip.length == 1) continue;
        	if (qsip[0] == 'q' || qsip[0] == 'p') { // q= for Google, p= for Yahoo
			words = unescape(qsip[1].replace(/\+/g,' ')).split(/\s+/);
	                for (w=0;w<words.length;w++) {
				highlightWord(document.getElementsByTagName("body")[0],words[w]);
                	}
	        }
	}
}

window.onload = googleSearchHighlight;


/* The end */

/* tracklinks */
var tracklinks={LINKFORMATS:[{re:/.*/i,fn:function(url){var p=tracklinks.parseURL(url);if(p.host!="www.kalipuja.co.uk"&&p.host!="kalipuja.co.uk"&&p.host!=location.host){var host=p.host.toLowerCase();if(host.substr(0,4)=="www."){host=host.substr(4);}
return"/external/"+host+p.path;}
return'';}},{re:/^.*\.(pdf|doc|xls|mp3|ppt)$/i,fn:function(url){var p=tracklinks.parseURL(url);return"/downloads"+p.path;}},{re:/\/securedownload\//i,fn:function(url){var p=tracklinks.parseURL(url);return"/downloads"+p.path;}}],URLRE:/^(((\w+):)?\/\/)?((\w+\.)*\w+)?([^\?]*)(\?[^#]+)?(#.*)?$/,parseURL:function(url){var matches=tracklinks.URLRE.exec(url);return{scheme:matches[3],host:matches[4],path:matches[6],query:matches[7],fragment:matches[8]};},addEvent:function(obj,type,fn){if(obj.attachEvent){obj['e'+type+fn]=fn;obj[type+fn]=function(){obj['e'+type+fn](window.event);};obj.attachEvent('on'+type,obj[type+fn]);}else{obj.addEventListener(type,fn,false);}},call_urchinTracker:function(e){var t;if(window.event){t=window.event.srcElement;}else{t=e.target;}
pageTracker._trackPageview(t.url_to_track);},init:function(){var ls=document.getElementsByTagName('a');for(var ii=0,l=ls.length;ii<l;ii++){var a=ls[ii];for(var j=0;j<tracklinks.LINKFORMATS.length;j++){var funct=tracklinks.LINKFORMATS[j].fn;var regex=tracklinks.LINKFORMATS[j].re;if(a.href.match(regex)&&funct(a.href)!==''){a.url_to_track=funct(a.href);tracklinks.addEvent(a,"click",tracklinks.call_urchinTracker);break;}}}}};(function(i){var u=navigator.userAgent;var e=false;var st=setTimeout;if(/webkit/i.test(u)){st(function(){var dr=document.readyState;if(dr=="loaded"||dr=="complete"){i();}else{st(arguments.callee,10);}},10);}
else if((/mozilla/i.test(u)&&!/(compati)/.test(u))||(/opera/i.test(u))){document.addEventListener("DOMContentLoaded",i,false);}else if(e){(function(){var t=document.createElement('doc:rdy');try{t.doScroll('left');i();t=null;}catch(e){st(arguments.callee,0);}})();}else{window.onload=i;}})(tracklinks.init);