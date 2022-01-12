if(typeof(Float32Array)=="undefined") {
	console.log("adapishim:Add Float32Array support");
	Float32Array=function(n) {
		var a=new Array(n);
		a.subarray=function(x,y) {return this.slice(x,y);}
		a.set=function(x,off) {for(var i=0;i<x.length;++i) a[off+i]=x[i];}
		return a;
	}
}

var adapishim_ch=1;
var adapishim_fs=44100;
var adapishim_sampleoffset=0;
var adapishim_buflen=4096;
var adapishim_numbin=16;
var adapishim_buf=new Array(adapishim_numbin);
var adapishim_bufin=new Array(adapishim_numbin);
var adapishim_bufdummy=new Array(adapishim_buflen);
var adapishim_bufwbin=0;
var adapishim_bufrbin=0;
var adapishim_bufidx=0;
var adapishim_binused=0;

(function(){
    if(typeof(webkitAudioContext)!="undefined")
		return;
	if(typeof(Audio)=="function") {
	    audiotestinst = new Audio();
        if(typeof(audiotestinst.mozSetup)=="function") {
            return;
        }
	}
	Audio.prototype.mozSetup=function(ch,fs) {
		adapishim_ch=ch;
		adapishim_fs=fs;
	}
	Audio.prototype.mozCurrentSampleOffset=function() {
		return adapishim_sampleoffset|0;
	}
	Audio.prototype.mozWriteAudio=function(buf) {
		var l=buf.length;
		if(adapishim_ch==2) {
			for(var i=0;i<l;i+=2) {
				adapishim_buf[adapishim_bufwbin][adapishim_bufidx|0]=buf[i];
				adapishim_bufidx+=44100/adapishim_fs;
				adapishim_bufin[adapishim_bufwbin]+=2;
				if(adapishim_bufidx>=adapishim_buflen) {
					adapishim_bufidx=0;
					if(++adapishim_bufwbin>=adapishim_numbin)
						adapishim_bufwbin=0;
					adapishim_bufin[adapishim_bufwbin]=0;
					if(++adapishim_binused>=adapishim_numbin)
						break;
				}
			}
			return i;
		}
		else {
			for(var i=0;i<l;++i) {
				adapishim_buf[adapishim_bufwbin][adapishim_bufidx|0]=buf[i];
				adapishim_bufidx+=44100/adapishim_fs;
				adapishim_bufin[adapishim_bufwbin]++;
				if(adapishim_bufidx>=adapishim_buflen) {
					adapishim_bufidx=0;
					if(++adapishim_bufwbin>=adapishim_numbin)
						adapishim_bufwbin=0;
					adapishim_bufin[adapishim_bufwbin]=0;
					if(++adapishim_binused>=adapishim_numbin)
						break;
				}
			}
			return i;
		}
	}
	for(var i=0;i<adapishim_numbin;++i) {
		adapishim_buf[i]=new Array(adapishim_buflen);
		for(var j=0;j<adapishim_buflen;++j)
			adapishim_buf[i][j]=0;
		adapishim_bufin[i]=0;
	}
	for(var i=0;i<adapishim_buflen;++i)
		adapishim_bufdummy[i]=0;
	if(window.addEventListener)
		window.addEventListener("load",adapishim_init,false);
	else if(window.attachEvent)
		window.attachEvent("onload",adapishim_init);
})();
function adapishim_init() {
	var div=document.createElement("DIV");
	div.innerHTML="<object id='flashsnd' CLASSID='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000' CODEBASE='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=4,0,0,0' width=300 height=1><param name=movie value='flashsnd.swf'><PARAM NAME=bgcolor VALUE=#FFFFFF><PARAM NAME=LOOP VALUE=false><PARAM NAME=quality VALUE=high><embed src='flashsnd.swf' width=300 height=100 bgcolor=#FFFFFF loop=false quality=high pluginspage='http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash' type='application/x-shockwave-flash' allowScriptAccess='always' </embedD></object>";
	var body=document.getElementsByTagName("BODY");
	body[0].appendChild(div);
}
function FlashGetData() {
	if(adapishim_binused<=0) {
		return adapishim_bufdummy;
	}
	var rbin=adapishim_bufrbin;
	adapishim_sampleoffset+=adapishim_bufin[rbin];
	if(++adapishim_bufrbin>=adapishim_numbin)
		adapishim_bufrbin=0;
	--adapishim_binused;
	return adapishim_buf[rbin];
}
