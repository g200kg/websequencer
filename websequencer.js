var canvas;
var ctx;
var canvasruler;
var ctxruler;
var mousex=0;
var mousey=0;
var mousexr=0;
var mouseyr=0;
var hittest=0;
var autoplay=0;
var song=null;
var proll=null;
var colBg = "#808080";
var colBorder = "#000000";
var colLtBorder = "#808080";
var colHilight = "#f0f0f0";
var colText = "#000000";
var colFace = "#ccc";
var colFocus = "#f0a040";
var grid = 120;
var optheight=85;
var mode = 0;
var clipboard=new Array();
var currentfocus =null;
var ua = "";
var midiaccess =null;
var midiinenum =null;
var midiindevs =new Array();
var midiindev=null;
var midiincur=-1;
var click1=new Audio("click1.wav");
var click2=new Audio("click2.wav");
var timereso = 10; //timing resolution (mSec)
var synthlist_table=new Array();

var unloadconfirm=false;

var enableb0 = true;
var enablee0 = true;
var enablec0 = true;

var demo=
"\x4D\x54\x68\x64\x00\x00\x00\x06\x00\x01\x00\x08\x01\xE0\x4D\x54\x72\x6B\x00\x00\x00\xAC\x00\xFF\x58\x04\x04\x02\x18\x08\x00\xFF\x09\x62\x75\x72\x6C\x3D\x31\x2C\x68\x74\x74\x70\x73\x3A\x2F\x2F\x77\x77\x77\x2E\x67\x32\x30\x30\x6B\x67\x2E\x63\x6F\x6D\x2F\x77\x65\x62\x6D\x69\x64\x69\x6C\x69\x6E\x6B\x2F\x67\x6D\x70\x6C\x61\x79\x65\x72\x2F\x2C\x6D\x76\x3D\x38\x30\x26\x70\x6C\x3D\x31\x36\x26\x70\x67\x3D\x32\x35\x35\x31\x30\x32\x31\x64\x30\x65\x30\x63\x33\x30\x30\x37\x30\x38\x30\x39\x30\x61\x30\x62\x30\x63\x30\x64\x30\x65\x30\x66\x00\xFF\x09\x07\x75\x72\x6C\x3D\x32\x2C\x2C\x00\xFF\x09\x07\x75\x72\x6C\x3D\x33\x2C\x2C\x00\xFF\x09\x07\x75\x72\x6C\x3D\x34\x2C\x2C\x00\xFF\x01\x0E\x63\x75\x72\x73\x6F\x72\x3D\x30\x2C\x31\x35\x33\x36\x30\x00\xFF\x51\x03\x06\x8A\x1B\x00\xFF\x2F\x00\x4D\x54\x72\x6B\x00\x00\x01\xDD\x00\xFF\x09\x06\x75\x72\x6C\x28\x31\x29\x00\xC0\x25\x00\x90\x1E\x63\x00\xB0\x07\x6B\x78\x90\x1E\x00\x78\x90\x1E\x61\x81\x70\x90\x1E\x00\x00\x90\x2A\x63\x81\x70\x90\x2A\x00\x00\x90\x28\x59\x81\x70\x90\x28\x00\x81\x70\x90\x25\x63\x81\x70\x90\x25\x00\x81\x70\x90\x21\x53\x81\x70\x90\x21\x00\x00\x90\x23\x65\x83\x60\x90\x23\x00\x00\x90\x21\x5B\x81\x70\x90\x21\x00\x00\x90\x23\x4F\x81\x70\x90\x23\x00\x81\x70\x90\x21\x59\x81\x70\x90\x21\x00\x00\x90\x1E\x5D\x81\x70\x90\x1E\x00\x00\x90\x1C\x4F\x81\x70\x90\x1C\x00\x00\x90\x1E\x5B\x78\x90\x1E\x00\x78\x90\x1E\x53\x81\x70\x90\x1E\x00\x00\x90\x2A\x61\x81\x70\x90\x2A\x00\x00\x90\x28\x5B\x81\x70\x90\x28\x00\x81\x70\x90\x25\x61\x81\x70\x90\x25\x00\x81\x70\x90\x21\x59\x81\x70\x90\x21\x00\x00\x90\x23\x5B\x83\x60\x90\x23\x00\x00\x90\x21\x55\x81\x70\x90\x21\x00\x00\x90\x23\x5D\x81\x70\x90\x23\x00\x81\x70\x90\x21\x5B\x81\x70\x90\x21\x00\x00\x90\x1E\x5B\x81\x70\x90\x1E\x00\x00\x90\x1C\x5B\x81\x70\x90\x1C\x00\x00\x90\x1E\x5B\x78\x90\x1E\x00\x78\x90\x1E\x5D\x81\x70\x90\x1E\x00\x00\x90\x2A\x5D\x81\x70\x90\x2A\x00\x00\x90\x28\x5D\x81\x70\x90\x28\x00\x81\x70\x90\x25\x5B\x81\x70\x90\x25\x00\x81\x70\x90\x21\x5F\x81\x70\x90\x21\x00\x00\x90\x23\x5D\x83\x60\x90\x23\x00\x00\x90\x21\x5F\x81\x70\x90\x21\x00\x00\x90\x23\x5F\x81\x70\x90\x23\x00\x81\x70\x90\x21\x5D\x81\x70\x90\x21\x00\x00\x90\x1E\x63\x81\x70\x90\x1E\x00\x00\x90\x1C\x5F\x81\x70\x90\x1C\x00\x00\x90\x1E\x5D\x78\x90\x1E\x00\x78\x90\x1E\x61\x81\x70\x90\x1E\x00\x00\x90\x2A\x61\x81\x70\x90\x2A\x00\x00\x90\x28\x5B\x81\x70\x90\x28\x00\x81\x70\x90\x25\x65\x81\x70\x90\x25\x00\x81\x70\x90\x21\x61\x81\x70\x90\x21\x00\x00\x90\x23\x5D\x81\x70\x90\x23\x00\x00\x90\x25\x5D\x81\x70\x90\x25\x00\x00\x90\x27\x2B\x78\x90\x27\x00\x78\x90\x28\x5D\x81\x70\x90\x28\x00\x00\x90\x23\x5D\x81\x70\x90\x23\x00\x00\x90\x2F\x5F\x81\x70\x90\x2F\x00\x00\x90\x21\x59\x81\x70\x90\x21\x00\x00\x90\x2D\x69\x81\x70\x90\x2D\x00\x00\xFF\x2F\x00\x4D\x54\x72\x6B\x00\x00\x01\x8A\x00\xFF\x09\x06\x75\x72\x6C\x28\x31\x29\x00\xC1\x51\x00\xB1\x07\x5F\x00\x91\x42\x40\x00\xB1\x0A\x65\x87\x40\x91\x42\x00\x81\x70\x91\x47\x40\x81\x70\x91\x47\x00\x81\x70\x91\x45\x40\x81\x70\x91\x4E\x40\x78\x91\x45\x00\x78\x91\x4E\x00\x81\x70\x91\x4C\x40\x81\x70\x91\x4C\x00\x00\x91\x49\x40\x81\x70\x91\x49\x00\x81\x70\x91\x40\x40\x81\x70\x91\x40\x00\x81\x70\x91\x41\x40\x81\x70\x91\x41\x00\x00\x91\x42\x40\x87\x40\x91\x42\x00\x81\x70\x91\x47\x40\x81\x70\x91\x47\x00\x81\x70\x91\x45\x40\x81\x70\x91\x45\x00\x00\x91\x4E\x40\x81\x70\x91\x4E\x00\x00\x91\x51\x40\x83\x60\x91\x51\x00\x00\xE1\x00\x44\x00\x91\x4E\x40\x78\xE1\x00\x44\x3C\xE1\x00\x44\x3C\xE1\x00\x3E\x3C\xE1\x00\x32\x3C\xE1\x00\x20\x3C\xE1\x00\x10\x3C\xE1\x00\x00\x3C\xE1\x00\x00\x3C\xE1\x00\x00\x3C\xE1\x00\x00\x3C\x91\x4E\x00\x00\xE1\x00\x40\x81\x70\x91\x41\x40\x81\x70\x91\x41\x00\x00\x91\x42\x40\x87\x40\x91\x42\x00\x81\x70\x91\x47\x40\x81\x70\x91\x47\x00\x81\x70\x91\x45\x40\x81\x70\x91\x4E\x40\x78\x91\x45\x00\x78\x91\x4E\x00\x81\x70\x91\x4C\x40\x81\x70\x91\x4C\x00\x00\x91\x49\x40\x81\x70\x91\x49\x00\x81\x70\x91\x40\x40\x81\x70\x91\x40\x00\x81\x70\x91\x41\x40\x81\x70\x91\x41\x00\x00\x91\x42\x40\x81\x70\x91\x42\x00\x81\x70\x91\x58\x40\x81\x70\x91\x58\x00\x81\x70\x91\x55\x40\x81\x70\x91\x55\x00\x00\x91\x5A\x40\x81\x70\x91\x5A\x00\x81\x70\x91\x51\x40\x81\x70\x91\x51\x00\x00\x91\x58\x40\x81\x70\x91\x58\x00\x81\x70\x91\x4E\x40\x81\x70\x91\x4E\x00\x00\x91\x51\x40\x81\x70\x91\x51\x00\x81\x70\x91\x49\x40\x81\x70\x91\x49\x00\x00\x91\x4C\x40\x81\x70\x91\x4C\x00\x00\x91\x58\x40\x81\x70\x91\x58\x00\x00\xFF\x2F\x00\x4D\x54\x72\x6B\x00\x00\x02\xFD\x00\xFF\x09\x06\x75\x72\x6C\x28\x31\x29\x00\xB9\x07\x6D\x00\x99\x2A\x5F\x00\x99\x24\x5F\x81\x70\x99\x2A\x00\x00\x99\x24\x00\x00\x99\x2A\x40\x81\x70\x99\x2A\x00\x00\x99\x26\x5F\x81\x70\x99\x26\x00\x00\x99\x24\x40\x00\x99\x2A\x40\x81\x70\x99\x24\x00\x00\x99\x2A\x00\x81\x70\x99\x24\x5D\x00\x99\x25\x5D\x00\x99\x2A\x5D\x81\x70\x99\x24\x00\x00\x99\x25\x00\x00\x99\x2A\x00\x00\x99\x26\x5F\x81\x70\x99\x26\x00\x00\x99\x2A\x40\x81\x70\x99\x2A\x00\x00\x99\x24\x5D\x00\x99\x2A\x5D\x81\x70\x99\x24\x00\x00\x99\x2A\x00\x81\x70\x99\x26\x61\x00\x99\x2E\x61\x81\x70\x99\x26\x00\x00\x99\x2E\x00\x00\x99\x2A\x45\x81\x70\x99\x2A\x00\x81\x70\x99\x24\x40\x81\x70\x99\x24\x00\x00\x99\x2A\x5F\x00\x99\x26\x5F\x81\x70\x99\x2A\x00\x00\x99\x26\x00\x00\x99\x25\x40\x00\x99\x2A\x40\x81\x70\x99\x25\x00\x00\x99\x2A\x00\x00\x99\x24\x63\x81\x70\x99\x24\x00\x00\x99\x2A\x40\x00\x99\x25\x40\x81\x70\x99\x2A\x00\x00\x99\x25\x00\x00\x99\x26\x61\x78\x99\x26\x00\x78\x99\x2A\x51\x81\x70\x99\x2A\x00\x00\x99\x23\x5D\x81\x70\x99\x23\x00\x00\x99\x2A\x40\x00\x99\x24\x40\x81\x70\x99\x2A\x00\x00\x99\x24\x00\x00\x99\x26\x5D\x81\x70\x99\x26\x00\x00\x99\x2A\x40\x81\x70\x99\x2A\x00\x00\x99\x2A\x61\x00\x99\x24\x61\x81\x70\x99\x2A\x00\x00\x99\x24\x00\x00\x99\x2E\x5B\x81\x70\x99\x26\x5B\x81\x70\x99\x2E\x00\x00\x99\x26\x00\x00\x99\x2A\x4F\x81\x70\x99\x2A\x00\x81\x70\x99\x24\x4F\x81\x70\x99\x24\x00\x00\x99\x26\x5D\x00\x99\x2A\x5D\x81\x70\x99\x26\x00\x00\x99\x2A\x00\x00\x99\x25\x40\x00\x99\x2A\x40\x81\x70\x99\x25\x00\x00\x99\x2A\x00\x00\x99\x2A\x63\x00\x99\x24\x63\x81\x70\x99\x2A\x00\x00\x99\x24\x00\x00\x99\x2A\x40\x81\x70\x99\x2A\x00\x00\x99\x26\x5F\x81\x70\x99\x26\x00\x00\x99\x24\x40\x00\x99\x2A\x40\x81\x70\x99\x24\x00\x00\x99\x2A\x00\x81\x70\x99\x25\x5B\x00\x99\x24\x5B\x00\x99\x2A\x5B\x81\x70\x99\x25\x00\x00\x99\x24\x00\x00\x99\x2A\x00\x00\x99\x26\x61\x81\x70\x99\x26\x00\x00\x99\x2A\x40\x81\x70\x99\x2A\x00\x00\x99\x2A\x5D\x00\x99\x24\x5D\x81\x70\x99\x2A\x00\x00\x99\x24\x00\x81\x70\x99\x26\x5F\x00\x99\x2E\x5F\x81\x70\x99\x26\x00\x00\x99\x2A\x40\x81\x70\x99\x2E\x00\x00\x99\x2A\x00\x81\x70\x99\x24\x40\x81\x70\x99\x24\x00\x00\x99\x2A\x5F\x00\x99\x26\x5F\x81\x70\x99\x2A\x00\x00\x99\x26\x00\x00\x99\x2A\x40\x00\x99\x25\x40\x81\x70\x99\x2A\x00\x00\x99\x25\x00\x00\x99\x24\x5B\x81\x70\x99\x24\x00\x00\x99\x25\x40\x00\x99\x2A\x40\x81\x70\x99\x25\x00\x00\x99\x2A\x00\x00\x99\x26\x59\x78\x99\x26\x00\x78\x99\x2A\x40\x81\x70\x99\x2A\x00\x00\x99\x23\x5B\x81\x70\x99\x23\x00\x00\x99\x2A\x40\x00\x99\x24\x40\x81\x70\x99\x2A\x00\x00\x99\x24\x00\x00\x99\x26\x57\x81\x70\x99\x26\x00\x00\x99\x2A\x40\x81\x70\x99\x2A\x00\x00\x99\x24\x5F\x00\x99\x2A\x5F\x81\x70\x99\x24\x00\x00\x99\x2A\x00\x81\x70\x99\x2E\x5D\x00\x99\x26\x5D\x81\x70\x99\x26\x00\x00\x99\x2A\x40\x00\x99\x24\x40\x81\x70\x99\x2E\x00\x00\x99\x2A\x00\x00\x99\x24\x00\x00\x99\x25\x63\x78\x99\x25\x00\x00\x99\x26\x49\x78\x99\x26\x00\x00\x99\x24\x53\x00\x99\x26\x53\x78\x99\x26\x00\x00\x99\x26\x3B\x78\x99\x24\x00\x00\x99\x26\x00\x00\x99\x26\x67\x81\x70\x99\x26\x00\x00\x99\x24\x7F\x00\x99\x26\x7F\x78\x99\x26\x00\x78\x99\x24\x00\x00\xFF\x2F\x00\x4D\x54\x72\x6B\x00\x00\x02\x87\x00\xFF\x09\x06\x75\x72\x6C\x28\x31\x29\x00\xC3\x1D\x00\xB3\x07\x49\x00\xB3\x0A\x25\x81\x70\x93\x36\x5D\x00\x93\x42\x5D\x00\x93\x3D\x5D\x00\x93\x47\x5D\x81\x70\x93\x36\x00\x00\x93\x42\x00\x00\x93\x3D\x00\x00\x93\x47\x00\x81\x70\x93\x45\x40\x00\x93\x39\x40\x81\x70\x93\x45\x00\x00\x93\x39\x00\x81\x70\x93\x34\x40\x81\x70\x93\x34\x00\x00\x93\x36\x5D\x81\x70\x93\x45\x4D\x81\x70\x93\x36\x00\x00\x93\x45\x00\x00\x93\x44\x61\x83\x60\x93\x44\x00\x00\x93\x40\x5D\x81\x70\x93\x40\x00\x00\x93\x36\x40\x00\x93\x3D\x40\x81\x70\x93\x36\x00\x00\x93\x3D\x00\x81\x70\x93\x42\x49\x00\x93\x39\x49\x81\x70\x93\x42\x00\x00\x93\x39\x00\x81\x70\x93\x40\x51\x00\x93\x3B\x51\x81\x70\x93\x40\x00\x00\x93\x3B\x00\x00\x93\x42\x5F\x83\x60\x93\x42\x00\x00\x93\x39\x4D\x00\x93\x42\x4D\x78\x93\x39\x00\x00\x93\x42\x00\x78\x93\x3B\x5D\x00\x93\x42\x5D\x81\x70\x93\x3B\x00\x00\x93\x42\x00\x81\x70\x93\x3B\x4F\x00\x93\x42\x4F\x81\x70\x93\x3B\x00\x00\x93\x42\x00\x81\x70\x93\x40\x40\x81\x70\x93\x40\x00\x00\x93\x33\x5D\x81\x70\x93\x33\x00\x00\x93\x36\x40\x81\x70\x93\x36\x00\x00\xE3\x00\x42\x00\x93\x3D\x5B\x78\xE3\x00\x40\x78\x93\x3D\x00\x00\xE3\x00\x44\x00\x93\x49\x61\x3C\xE3\x00\x4A\x3C\xE3\x00\x42\x3C\xE3\x00\x40\x3C\xE3\x00\x3C\x3C\xE3\x00\x3C\x3C\xE3\x00\x38\x3C\xE3\x00\x36\x3C\xE3\x00\x3C\x3C\xE3\x00\x3E\x3C\xE3\x00\x3E\x3C\xE3\x00\x42\x3C\x93\x49\x00\x00\xE3\x00\x42\x00\x93\x47\x4F\x00\x93\x44\x4F\x00\x93\x40\x4F\x83\x60\x93\x47\x00\x00\x93\x44\x00\x00\x93\x40\x00\x81\x70\x93\x42\x61\x00\x93\x47\x61\x00\x93\x3D\x61\x00\x93\x36\x61\x81\x70\x93\x42\x00\x00\x93\x47\x00\x00\x93\x3D\x00\x00\x93\x36\x00\x81\x70\x93\x45\x4D\x00\x93\x39\x4D\x81\x70\x93\x45\x00\x00\x93\x39\x00\x81\x70\x93\x34\x47\x81\x70\x93\x34\x00\x00\x93\x36\x5D\x81\x70\x93\x45\x51\x81\x70\x93\x36\x00\x00\x93\x45\x00\x00\x93\x44\x59\x83\x60\x93\x44\x00\x00\x93\x40\x57\x81\x70\x93\x40\x00\x00\x93\x3D\x40\x00\x93\x36\x40\x81\x70\x93\x3D\x00\x00\x93\x36\x00\x81\x70\x93\x39\x45\x00\x93\x42\x45\x81\x70\x93\x39\x00\x00\x93\x42\x00\x81\x70\x93\x40\x51\x00\x93\x3B\x51\x81\x70\x93\x40\x00\x00\x93\x3B\x00\x00\x93\x42\x57\x83\x60\x93\x42\x00\x00\x93\x39\x55\x00\x93\x42\x55\x78\x93\x39\x00\x00\x93\x42\x00\x78\x93\x42\x40\x00\x93\x3B\x40\x81\x70\x93\x42\x00\x00\x93\x3B\x00\x81\x70\x93\x42\x40\x00\x93\x3B\x40\x81\x70\x93\x42\x00\x00\x93\x3B\x00\x81\x70\x93\x40\x4D\x81\x70\x93\x40\x00\x00\x93\x33\x59\x81\x70\x93\x33\x00\x00\x93\x36\x40\x81\x70\x93\x36\x00\x00\x93\x3D\x5F\x81\x70\x93\x3D\x00\x00\x93\x49\x63\x85\x50\x93\x49\x00\x00\x93\x47\x53\x00\x93\x44\x53\x00\x93\x40\x53\x83\x60\x93\x47\x00\x00\x93\x44\x00\x00\x93\x40\x00\x00\xFF\x2F\x00\x4D\x54\x72\x6B\x00\x00\x00\x37\x00\xFF\x09\x06\x75\x72\x6C\x28\x31\x29\x00\xC4\x0E\x87\x40\x94\x45\x64\x87\x40\x94\x45\x00\x00\x94\x44\x64\x8B\x20\x94\x44\x00\x00\x94\x40\x64\x83\x60\x94\x42\x64\x83\x60\x94\x40\x00\x83\x60\x94\x42\x00\x00\xFF\x2F\x00\x4D\x54\x72\x6B\x00\x00\x00\x99\x00\xFF\x09\x06\x75\x72\x6C\x28\x31\x29\x00\xC5\x0C\x00\xB5\x0A\x61\xA5\x40\x95\x42\x64\x00\x95\x47\x64\x81\x70\x95\x42\x00\x00\x95\x47\x00\x00\x95\x47\x64\x00\x95\x42\x64\x81\x70\x95\x47\x00\x00\x95\x42\x00\x81\x70\x95\x45\x64\x00\x95\x4E\x64\x81\x70\x95\x45\x00\x00\x95\x4E\x00\x00\x95\x4E\x64\x00\x95\x45\x64\x81\x70\x95\x4E\x00\x00\x95\x45\x00\x81\x70\x95\x47\x64\x00\x95\x51\x64\x81\x70\x95\x47\x00\x00\x95\x51\x00\x81\x70\x95\x53\x64\x00\x95\x49\x64\x81\x70\x95\x53\x00\x00\x95\x49\x00\x00\x95\x55\x64\x81\x70\x95\x55\x00\x00\x95\x58\x64\x00\x95\x51\x64\x81\x70\x95\x58\x00\x00\x95\x51\x00\x00\xFF\x2F\x00\x4D\x54\x72\x6B\x00\x00\x00\x4A\x00\xFF\x09\x06\x75\x72\x6C\x28\x31\x29\x00\xC6\x30\x00\xB6\x0A\x69\xBC\x00\x96\x3D\x47\x00\x96\x36\x47\x8F\x00\x96\x3D\x00\x00\x96\x42\x3F\x8F\x00\x96\x36\x00\x00\x96\x42\x00\x00\x96\x40\x3F\x00\x96\x34\x3F\x8F\x00\x96\x40\x00\x00\x96\x45\x57\x8E\x08\x96\x34\x00\x00\x96\x45\x00\x00\xFF\x2F\x00";

/*var demo = "\x4D\x54\x68\x64\x00\x00\x00\x06\x00\x01\x00\x08\x01\xE0\x4D\x54\x72\x6B\x00\x00\x00\xAB\x00\xFF\x58\x04\x04\x02\x18\x08\x00\xFF\x09\x61\x75\x72\x6C\x3D\x31\x2C\x68\x74\x74\x70\x3A\x2F\x2F\x77\x77\x77\x2E\x67\x32\x30\x30\x6B\x67\x2E\x63\x6F\x6D\x2F\x77\x65\x62\x6D\x69\x64\x69\x6C\x69\x6E\x6B\x2F\x67\x6D\x70\x6C\x61\x79\x65\x72\x2F\x2C\x6D\x76\x3D\x38\x30\x26\x70\x6C\x3D\x31\x36\x26\x70\x67\x3D\x30\x30\x30\x31\x30\x32\x30\x33\x30\x34\x30\x35\x30\x36\x30\x37\x30\x38\x30\x39\x30\x61\x30\x62\x30\x63\x30\x64\x30\x65\x30\x66\x00\xFF\x09\x07\x75\x72\x6C\x3D\x32\x2C\x2C\x00\xFF\x09\x07\x75\x72\x6C\x3D\x33\x2C\x2C\x00\xFF\x09\x07\x75\x72\x6C\x3D\x34\x2C\x2C\x00\xFF\x01\x0E\x63\x75\x72\x73\x6F\x72\x3D\x30\x2C\x31\x35\x33\x36\x30\x00\xFF\x51\x03\x06\x8A\x1B\x00\xFF\x2F\x00\x4D\x54\x72\x6B\x00\x00\x01\xDD\x00\xFF\x09\x06\x75\x72\x6C\x28\x31\x29\x00\xC0\x25\x00\x90\x1E\x63\x00\xB0\x07\x6B\x78\x90\x1E\x00\x78\x90\x1E\x61\x81\x70\x90\x1E\x00\x00\x90\x2A\x63\x81\x70\x90\x2A\x00\x00\x90\x28\x59\x81\x70\x90\x28\x00\x81\x70\x90\x25\x63\x81\x70\x90\x25\x00\x81\x70\x90\x21\x53\x81\x70\x90\x21\x00\x00\x90\x23\x65\x83\x60\x90\x23\x00\x00\x90\x21\x5B\x81\x70\x90\x21\x00\x00\x90\x23\x4F\x81\x70\x90\x23\x00\x81\x70\x90\x21\x59\x81\x70\x90\x21\x00\x00\x90\x1E\x5D\x81\x70\x90\x1E\x00\x00\x90\x1C\x4F\x81\x70\x90\x1C\x00\x00\x90\x1E\x5B\x78\x90\x1E\x00\x78\x90\x1E\x53\x81\x70\x90\x1E\x00\x00\x90\x2A\x61\x81\x70\x90\x2A\x00\x00\x90\x28\x5B\x81\x70\x90\x28\x00\x81\x70\x90\x25\x61\x81\x70\x90\x25\x00\x81\x70\x90\x21\x59\x81\x70\x90\x21\x00\x00\x90\x23\x5B\x83\x60\x90\x23\x00\x00\x90\x21\x55\x81\x70\x90\x21\x00\x00\x90\x23\x5D\x81\x70\x90\x23\x00\x81\x70\x90\x21\x5B\x81\x70\x90\x21\x00\x00\x90\x1E\x5B\x81\x70\x90\x1E\x00\x00\x90\x1C\x5B\x81\x70\x90\x1C\x00\x00\x90\x1E\x5B\x78\x90\x1E\x00\x78\x90\x1E\x5D\x81\x70\x90\x1E\x00\x00\x90\x2A\x5D\x81\x70\x90\x2A\x00\x00\x90\x28\x5D\x81\x70\x90\x28\x00\x81\x70\x90\x25\x5B\x81\x70\x90\x25\x00\x81\x70\x90\x21\x5F\x81\x70\x90\x21\x00\x00\x90\x23\x5D\x83\x60\x90\x23\x00\x00\x90\x21\x5F\x81\x70\x90\x21\x00\x00\x90\x23\x5F\x81\x70\x90\x23\x00\x81\x70\x90\x21\x5D\x81\x70\x90\x21\x00\x00\x90\x1E\x63\x81\x70\x90\x1E\x00\x00\x90\x1C\x5F\x81\x70\x90\x1C\x00\x00\x90\x1E\x5D\x78\x90\x1E\x00\x78\x90\x1E\x61\x81\x70\x90\x1E\x00\x00\x90\x2A\x61\x81\x70\x90\x2A\x00\x00\x90\x28\x5B\x81\x70\x90\x28\x00\x81\x70\x90\x25\x65\x81\x70\x90\x25\x00\x81\x70\x90\x21\x61\x81\x70\x90\x21\x00\x00\x90\x23\x5D\x81\x70\x90\x23\x00\x00\x90\x25\x5D\x81\x70\x90\x25\x00\x00\x90\x27\x2B\x78\x90\x27\x00\x78\x90\x28\x5D\x81\x70\x90\x28\x00\x00\x90\x23\x5D\x81\x70\x90\x23\x00\x00\x90\x2F\x5F\x81\x70\x90\x2F\x00\x00\x90\x21\x59\x81\x70\x90\x21\x00\x00\x90\x2D\x69\x81\x70\x90\x2D\x00\x00\xFF\x2F\x00\x4D\x54\x72\x6B\x00\x00\x01\x8A\x00\xFF\x09\x06\x75\x72\x6C\x28\x31\x29\x00\xC1\x51\x00\xB1\x07\x5F\x00\x91\x42\x40\x00\xB1\x0A\x65\x87\x40\x91\x42\x00\x81\x70\x91\x47\x40\x81\x70\x91\x47\x00\x81\x70\x91\x45\x40\x81\x70\x91\x4E\x40\x78\x91\x45\x00\x78\x91\x4E\x00\x81\x70\x91\x4C\x40\x81\x70\x91\x4C\x00\x00\x91\x49\x40\x81\x70\x91\x49\x00\x81\x70\x91\x40\x40\x81\x70\x91\x40\x00\x81\x70\x91\x41\x40\x81\x70\x91\x41\x00\x00\x91\x42\x40\x87\x40\x91\x42\x00\x81\x70\x91\x47\x40\x81\x70\x91\x47\x00\x81\x70\x91\x45\x40\x81\x70\x91\x45\x00\x00\x91\x4E\x40\x81\x70\x91\x4E\x00\x00\x91\x51\x40\x83\x60\x91\x51\x00\x00\xE1\x00\x44\x00\x91\x4E\x40\x78\xE1\x00\x44\x3C\xE1\x00\x44\x3C\xE1\x00\x3E\x3C\xE1\x00\x32\x3C\xE1\x00\x20\x3C\xE1\x00\x10\x3C\xE1\x00\x00\x3C\xE1\x00\x00\x3C\xE1\x00\x00\x3C\xE1\x00\x00\x3C\x91\x4E\x00\x00\xE1\x00\x40\x81\x70\x91\x41\x40\x81\x70\x91\x41\x00\x00\x91\x42\x40\x87\x40\x91\x42\x00\x81\x70\x91\x47\x40\x81\x70\x91\x47\x00\x81\x70\x91\x45\x40\x81\x70\x91\x4E\x40\x78\x91\x45\x00\x78\x91\x4E\x00\x81\x70\x91\x4C\x40\x81\x70\x91\x4C\x00\x00\x91\x49\x40\x81\x70\x91\x49\x00\x81\x70\x91\x40\x40\x81\x70\x91\x40\x00\x81\x70\x91\x41\x40\x81\x70\x91\x41\x00\x00\x91\x42\x40\x81\x70\x91\x42\x00\x81\x70\x91\x58\x40\x81\x70\x91\x58\x00\x81\x70\x91\x55\x40\x81\x70\x91\x55\x00\x00\x91\x5A\x40\x81\x70\x91\x5A\x00\x81\x70\x91\x51\x40\x81\x70\x91\x51\x00\x00\x91\x58\x40\x81\x70\x91\x58\x00\x81\x70\x91\x4E\x40\x81\x70\x91\x4E\x00\x00\x91\x51\x40\x81\x70\x91\x51\x00\x81\x70\x91\x49\x40\x81\x70\x91\x49\x00\x00\x91\x4C\x40\x81\x70\x91\x4C\x00\x00\x91\x58\x40\x81\x70\x91\x58\x00\x00\xFF\x2F\x00\x4D\x54\x72\x6B\x00\x00\x02\xFD\x00\xFF\x09\x06\x75\x72\x6C\x28\x31\x29\x00\xB9\x07\x6D\x00\x99\x2A\x5F\x00\x99\x24\x5F\x81\x70\x99\x2A\x00\x00\x99\x24\x00\x00\x99\x2A\x40\x81\x70\x99\x2A\x00\x00\x99\x26\x5F\x81\x70\x99\x26\x00\x00\x99\x24\x40\x00\x99\x2A\x40\x81\x70\x99\x24\x00\x00\x99\x2A\x00\x81\x70\x99\x24\x5D\x00\x99\x25\x5D\x00\x99\x2A\x5D\x81\x70\x99\x24\x00\x00\x99\x25\x00\x00\x99\x2A\x00\x00\x99\x26\x5F\x81\x70\x99\x26\x00\x00\x99\x2A\x40\x81\x70\x99\x2A\x00\x00\x99\x24\x5D\x00\x99\x2A\x5D\x81\x70\x99\x24\x00\x00\x99\x2A\x00\x81\x70\x99\x26\x61\x00\x99\x2E\x61\x81\x70\x99\x26\x00\x00\x99\x2E\x00\x00\x99\x2A\x45\x81\x70\x99\x2A\x00\x81\x70\x99\x24\x40\x81\x70\x99\x24\x00\x00\x99\x2A\x5F\x00\x99\x26\x5F\x81\x70\x99\x2A\x00\x00\x99\x26\x00\x00\x99\x25\x40\x00\x99\x2A\x40\x81\x70\x99\x25\x00\x00\x99\x2A\x00\x00\x99\x24\x63\x81\x70\x99\x24\x00\x00\x99\x2A\x40\x00\x99\x25\x40\x81\x70\x99\x2A\x00\x00\x99\x25\x00\x00\x99\x26\x61\x78\x99\x26\x00\x78\x99\x2A\x51\x81\x70\x99\x2A\x00\x00\x99\x23\x5D\x81\x70\x99\x23\x00\x00\x99\x2A\x40\x00\x99\x24\x40\x81\x70\x99\x2A\x00\x00\x99\x24\x00\x00\x99\x26\x5D\x81\x70\x99\x26\x00\x00\x99\x2A\x40\x81\x70\x99\x2A\x00\x00\x99\x2A\x61\x00\x99\x24\x61\x81\x70\x99\x2A\x00\x00\x99\x24\x00\x00\x99\x2E\x5B\x81\x70\x99\x26\x5B\x81\x70\x99\x2E\x00\x00\x99\x26\x00\x00\x99\x2A\x4F\x81\x70\x99\x2A\x00\x81\x70\x99\x24\x4F\x81\x70\x99\x24\x00\x00\x99\x26\x5D\x00\x99\x2A\x5D\x81\x70\x99\x26\x00\x00\x99\x2A\x00\x00\x99\x25\x40\x00\x99\x2A\x40\x81\x70\x99\x25\x00\x00\x99\x2A\x00\x00\x99\x2A\x63\x00\x99\x24\x63\x81\x70\x99\x2A\x00\x00\x99\x24\x00\x00\x99\x2A\x40\x81\x70\x99\x2A\x00\x00\x99\x26\x5F\x81\x70\x99\x26\x00\x00\x99\x24\x40\x00\x99\x2A\x40\x81\x70\x99\x24\x00\x00\x99\x2A\x00\x81\x70\x99\x25\x5B\x00\x99\x24\x5B\x00\x99\x2A\x5B\x81\x70\x99\x25\x00\x00\x99\x24\x00\x00\x99\x2A\x00\x00\x99\x26\x61\x81\x70\x99\x26\x00\x00\x99\x2A\x40\x81\x70\x99\x2A\x00\x00\x99\x2A\x5D\x00\x99\x24\x5D\x81\x70\x99\x2A\x00\x00\x99\x24\x00\x81\x70\x99\x26\x5F\x00\x99\x2E\x5F\x81\x70\x99\x26\x00\x00\x99\x2A\x40\x81\x70\x99\x2E\x00\x00\x99\x2A\x00\x81\x70\x99\x24\x40\x81\x70\x99\x24\x00\x00\x99\x2A\x5F\x00\x99\x26\x5F\x81\x70\x99\x2A\x00\x00\x99\x26\x00\x00\x99\x2A\x40\x00\x99\x25\x40\x81\x70\x99\x2A\x00\x00\x99\x25\x00\x00\x99\x24\x5B\x81\x70\x99\x24\x00\x00\x99\x25\x40\x00\x99\x2A\x40\x81\x70\x99\x25\x00\x00\x99\x2A\x00\x00\x99\x26\x59\x78\x99\x26\x00\x78\x99\x2A\x40\x81\x70\x99\x2A\x00\x00\x99\x23\x5B\x81\x70\x99\x23\x00\x00\x99\x2A\x40\x00\x99\x24\x40\x81\x70\x99\x2A\x00\x00\x99\x24\x00\x00\x99\x26\x57\x81\x70\x99\x26\x00\x00\x99\x2A\x40\x81\x70\x99\x2A\x00\x00\x99\x24\x5F\x00\x99\x2A\x5F\x81\x70\x99\x24\x00\x00\x99\x2A\x00\x81\x70\x99\x2E\x5D\x00\x99\x26\x5D\x81\x70\x99\x26\x00\x00\x99\x2A\x40\x00\x99\x24\x40\x81\x70\x99\x2E\x00\x00\x99\x2A\x00\x00\x99\x24\x00\x00\x99\x25\x63\x78\x99\x25\x00\x00\x99\x26\x49\x78\x99\x26\x00\x00\x99\x24\x53\x00\x99\x26\x53\x78\x99\x26\x00\x00\x99\x26\x3B\x78\x99\x24\x00\x00\x99\x26\x00\x00\x99\x26\x67\x81\x70\x99\x26\x00\x00\x99\x24\x7F\x00\x99\x26\x7F\x78\x99\x26\x00\x78\x99\x24\x00\x00\xFF\x2F\x00\x4D\x54\x72\x6B\x00\x00\x02\x87\x00\xFF\x09\x06\x75\x72\x6C\x28\x31\x29\x00\xC3\x1D\x00\xB3\x07\x49\x00\xB3\x0A\x25\x81\x70\x93\x36\x5D\x00\x93\x42\x5D\x00\x93\x3D\x5D\x00\x93\x47\x5D\x81\x70\x93\x36\x00\x00\x93\x42\x00\x00\x93\x3D\x00\x00\x93\x47\x00\x81\x70\x93\x45\x40\x00\x93\x39\x40\x81\x70\x93\x45\x00\x00\x93\x39\x00\x81\x70\x93\x34\x40\x81\x70\x93\x34\x00\x00\x93\x36\x5D\x81\x70\x93\x45\x4D\x81\x70\x93\x36\x00\x00\x93\x45\x00\x00\x93\x44\x61\x83\x60\x93\x44\x00\x00\x93\x40\x5D\x81\x70\x93\x40\x00\x00\x93\x36\x40\x00\x93\x3D\x40\x81\x70\x93\x36\x00\x00\x93\x3D\x00\x81\x70\x93\x42\x49\x00\x93\x39\x49\x81\x70\x93\x42\x00\x00\x93\x39\x00\x81\x70\x93\x40\x51\x00\x93\x3B\x51\x81\x70\x93\x40\x00\x00\x93\x3B\x00\x00\x93\x42\x5F\x83\x60\x93\x42\x00\x00\x93\x39\x4D\x00\x93\x42\x4D\x78\x93\x39\x00\x00\x93\x42\x00\x78\x93\x3B\x5D\x00\x93\x42\x5D\x81\x70\x93\x3B\x00\x00\x93\x42\x00\x81\x70\x93\x3B\x4F\x00\x93\x42\x4F\x81\x70\x93\x3B\x00\x00\x93\x42\x00\x81\x70\x93\x40\x40\x81\x70\x93\x40\x00\x00\x93\x33\x5D\x81\x70\x93\x33\x00\x00\x93\x36\x40\x81\x70\x93\x36\x00\x00\xE3\x00\x42\x00\x93\x3D\x5B\x78\xE3\x00\x40\x78\x93\x3D\x00\x00\xE3\x00\x44\x00\x93\x49\x61\x3C\xE3\x00\x4A\x3C\xE3\x00\x42\x3C\xE3\x00\x40\x3C\xE3\x00\x3C\x3C\xE3\x00\x3C\x3C\xE3\x00\x38\x3C\xE3\x00\x36\x3C\xE3\x00\x3C\x3C\xE3\x00\x3E\x3C\xE3\x00\x3E\x3C\xE3\x00\x42\x3C\x93\x49\x00\x00\xE3\x00\x42\x00\x93\x47\x4F\x00\x93\x44\x4F\x00\x93\x40\x4F\x83\x60\x93\x47\x00\x00\x93\x44\x00\x00\x93\x40\x00\x81\x70\x93\x42\x61\x00\x93\x47\x61\x00\x93\x3D\x61\x00\x93\x36\x61\x81\x70\x93\x42\x00\x00\x93\x47\x00\x00\x93\x3D\x00\x00\x93\x36\x00\x81\x70\x93\x45\x4D\x00\x93\x39\x4D\x81\x70\x93\x45\x00\x00\x93\x39\x00\x81\x70\x93\x34\x47\x81\x70\x93\x34\x00\x00\x93\x36\x5D\x81\x70\x93\x45\x51\x81\x70\x93\x36\x00\x00\x93\x45\x00\x00\x93\x44\x59\x83\x60\x93\x44\x00\x00\x93\x40\x57\x81\x70\x93\x40\x00\x00\x93\x3D\x40\x00\x93\x36\x40\x81\x70\x93\x3D\x00\x00\x93\x36\x00\x81\x70\x93\x39\x45\x00\x93\x42\x45\x81\x70\x93\x39\x00\x00\x93\x42\x00\x81\x70\x93\x40\x51\x00\x93\x3B\x51\x81\x70\x93\x40\x00\x00\x93\x3B\x00\x00\x93\x42\x57\x83\x60\x93\x42\x00\x00\x93\x39\x55\x00\x93\x42\x55\x78\x93\x39\x00\x00\x93\x42\x00\x78\x93\x42\x40\x00\x93\x3B\x40\x81\x70\x93\x42\x00\x00\x93\x3B\x00\x81\x70\x93\x42\x40\x00\x93\x3B\x40\x81\x70\x93\x42\x00\x00\x93\x3B\x00\x81\x70\x93\x40\x4D\x81\x70\x93\x40\x00\x00\x93\x33\x59\x81\x70\x93\x33\x00\x00\x93\x36\x40\x81\x70\x93\x36\x00\x00\x93\x3D\x5F\x81\x70\x93\x3D\x00\x00\x93\x49\x63\x85\x50\x93\x49\x00\x00\x93\x47\x53\x00\x93\x44\x53\x00\x93\x40\x53\x83\x60\x93\x47\x00\x00\x93\x44\x00\x00\x93\x40\x00\x00\xFF\x2F\x00\x4D\x54\x72\x6B\x00\x00\x00\x37\x00\xFF\x09\x06\x75\x72\x6C\x28\x31\x29\x00\xC4\x0E\x87\x40\x94\x45\x64\x87\x40\x94\x45\x00\x00\x94\x44\x64\x8B\x20\x94\x44\x00\x00\x94\x40\x64\x83\x60\x94\x42\x64\x83\x60\x94\x40\x00\x83\x60\x94\x42\x00\x00\xFF\x2F\x00\x4D\x54\x72\x6B\x00\x00\x00\x99\x00\xFF\x09\x06\x75\x72\x6C\x28\x31\x29\x00\xC5\x0C\x00\xB5\x0A\x61\xA5\x40\x95\x42\x64\x00\x95\x47\x64\x81\x70\x95\x42\x00\x00\x95\x47\x00\x00\x95\x47\x64\x00\x95\x42\x64\x81\x70\x95\x47\x00\x00\x95\x42\x00\x81\x70\x95\x45\x64\x00\x95\x4E\x64\x81\x70\x95\x45\x00\x00\x95\x4E\x00\x00\x95\x4E\x64\x00\x95\x45\x64\x81\x70\x95\x4E\x00\x00\x95\x45\x00\x81\x70\x95\x47\x64\x00\x95\x51\x64\x81\x70\x95\x47\x00\x00\x95\x51\x00\x81\x70\x95\x53\x64\x00\x95\x49\x64\x81\x70\x95\x53\x00\x00\x95\x49\x00\x00\x95\x55\x64\x81\x70\x95\x55\x00\x00\x95\x58\x64\x00\x95\x51\x64\x81\x70\x95\x58\x00\x00\x95\x51\x00\x00\xFF\x2F\x00\x4D\x54\x72\x6B\x00\x00\x00\x4A\x00\xFF\x09\x06\x75\x72\x6C\x28\x31\x29\x00\xC6\x30\x00\xB6\x0A\x69\xBC\x00\x96\x3D\x47\x00\x96\x36\x47\x8F\x00\x96\x3D\x00\x00\x96\x42\x3F\x8F\x00\x96\x36\x00\x00\x96\x42\x00\x00\x96\x40\x3F\x00\x96\x34\x3F\x8F\x00\x96\x40\x00\x00\x96\x45\x57\x8E\x08\x96\x34\x00\x00\x96\x45\x00\x00\xFF\x2F\x00";
*/
function Synths() {
	this.sy =new Array(4);
	this.patch =new Array(4);
	this.patchready =new Array(4);
	this.latency =new Array(4);
	this.linklv =new Array(4);
	this.maxlatency=0;
	for(var i=0; i<4; ++i) {
		this.sy[i] =null;
		this.patch[i] ="";
		this.patchready[i] =false;
		this.latency[i] =0;
		this.linklv[i] =0;
	}
	this.Add =function(i, url, frame, l) {
		var w;
		if(frame) {
			var f =document.getElementById(frame);
			f.src =url;
			w =f.contentWindow;
		}
		else {
			w =window.open(url, null, "width=900,height=670,scrollbars=yes,resizable=yes");
		}
		this.sy[i] =w;
		this.latency[i] =l;
		this.patchready[i] =false;
		this.linklv[i] =0;
	}
	this.PlayStart =function(tm, ti) {
		for(var i=0; i<4; ++i) {
			if (this.sy[i])
				midiif.PlayStart(this.sy[i], tm, ti);
		}
	}
	this.PlayStop =function() {
		for(var i = 0;	i <	4; ++i)	{
			if (this.sy[i])
				midiif.PlayStop(this.sy[i]);
		}
	}
	this.ReqPatch =function() {
		for(var i=0; i<4; ++i) {
			if (this.linklv[i]) {
				this.patchready[i] =false;
				midiif.ReqPatch(this.sy[i]);
			}
		}
	}
	this.Locate=function(t) {
		for(var i=0; i<4; ++i) {
			if (this.sy[i])
				midiif.Locate(this.sy[i],t);
		}
	}
	this.Clock =function() {
		for(var i=0; i<4; ++i) {
			if (this.sy[i])
				midiif.Clock(this.sy[i]);
		}
	}
}
if(window.addEventListener) {
	window.addEventListener("message", webMidiLinkRecv,	false);
}
function webMidiLinkRecv(event) {
	if(typeof(event.data)!="string")
		return;
	var msg =event.data.split(",");
	switch(msg[0]) {
		case "link":
			switch (msg[1]) {
				case "ready":
					for(var i=0; i<4; ++i) {
						if (event.source == synths.sy[i]) {
							synths.linklv[i] =1;
							document.getElementById("linklv" + (i+1)).innerHTML ="1";
						}
					}
					break;
				case "patch":
					for(var i=0; i<4; ++i) {
						if (event.source == synths.sy[i]) {
							synths.patch[i] =msg[2];
							synths.patchready[i] =true;
						}
					}
					break;
			}
			break;
	}
}
function WebMidiLink() {
	this.time =new Date().getTime();
	this.tick =0;
	this.que =new Array();
	this.PlayStart =function(sy, tm, ti) {
		this.tick =ti;
		if(ti===0)
			sy.postMessage("midi,fa","*");
		else
			sy.postMessage("midi,fb", "*");
	}
	this.Locate=function(sy,t) {
		var p=(t/120)|0;
		sy.postMessage("midi,f2,"+((p>>4)&0x7).toString(16)+(p&0xf).toString(16)+","+((p>>11)&0x7).toString(16)+((p>>7)&0xf).toString(16),"*");
	}
	this.PlayStop =function(sy) {
		sy.postMessage("midi,fc", "*");
	}
	this.Clock =function(sy) {
		sy.postMessage("midi,f8", "*");
	}
	this.ReqPatch =function(sy) {
		sy.postMessage("link,reqpatch","*");
	}
	this.SetPatch =function(sy, p) {
		sy.postMessage("link,setpatch," + p,"*");
	}
	this.NoteOnDirect =function(sy, c, n, v) {
		synths.sy[sy].postMessage("midi,9"+c.toString(16)+","+n.toString(16)+","+v.toString(16), "*");
	}
	this.SendMsgDirect=function(sy,msg) {
		synths.sy[sy].postMessage(msg,"*");
	}
	this.SendMsg = function(sy, st, ch, d1, d2, tm) {
		if (ch >= 0) {
			if (d2 >= 0)
				this.SendString(sy, "midi," + (st >> 4).toString(16) + ch.toString(16) + "," + d1.toString(16) + "," + d2.toString(16), tm);
			else
				this.SendString(sy, "midi," + (st >> 4).toString(16) + ch.toString(16) + "," + d1.toString(16), tm);
		}
	}
	this.ResetAll =function(sy, c) {
		if (c>=0 && enableb0) {
			this.SendString(sy, "midi,b" + c.toString(16) + ",79,0", -1000);
		}
	}
	this.Bend =function(sy, c, v,tm) {
		if (c>=0 && enablee0) {
			var n1 = v & 0x7f;
			var n2 = (v>>7) & 0x7f;
			var s = "midi,e"+c.toString(16)+","+n1.toString(16)+","+n2.toString(16);
			this.SendString(sy, "midi,e"+c.toString(16)+","+n1.toString(16)+","+n2.toString(16),tm);
		}
	}
	this.SendString =function(sy, s, tm) {
		if (sy != null) {
			this.que.unshift([synths.maxlatency	- synths.latency[sy] + tm, sy, s]);
		}
	}
	this.Tick =function(tm, ti) {
		var dl;
		if (tm == 0)
			dl = 0x7fffffff;
		else
			dl = tm-this.time;
		for(var i=this.que.length-1; i>= 0; --i) {
			if((this.que[i][0]-=dl) <= 0) {
				var item = this.que[i];
				synths.sy[item[1]].postMessage(item[2], "*");
				this.que.splice(i, 1);
			}
		}
		this.time = tm;
		if(ti<this.tick) {
			this.tick =0;
			return;
		}
		while (ti>this.tick+20) {
			this.tick+=20;
			synths.Clock();
		}
	}
}
function SynthListCallback(synthlist) {
	synthlist_table = synthlist;
}
function AddSynthList() {
	var sel;
	sel = document.getElementById("synthsel1");
	sel.options[0] = new Option("-----", "");
	for(var i=0; i<synthlist_table.length; ++i) {
		sel.options[i+1] = new Option(synthlist_table[i].author+":"+synthlist_table[i].name, synthlist_table[i].url);
	}
	sel = document.getElementById("synthsel2");
	sel.options[0] = new Option("-----", "");
	for(var i=0; i<synthlist_table.length; ++i) {
		sel.options[i+1] = new Option(synthlist_table[i].author+":"+synthlist_table[i].name, synthlist_table[i].url);
	}
	sel = document.getElementById("synthsel3");
	sel.options[0] = new Option("-----", "");
	for(var i=0; i<synthlist_table.length; ++i) {
		sel.options[i+1] = new Option(synthlist_table[i].author+":"+synthlist_table[i].name, synthlist_table[i].url);
	}
	sel = document.getElementById("synthsel4");
	sel.options[0] = new Option("-----", "");
	for(var i=0; i<synthlist_table.length; ++i) {
		sel.options[i+1] = new Option(synthlist_table[i].author+":"+synthlist_table[i].name, synthlist_table[i].url);
	}
}

function getxy(e) {
	var rc=canvas.getBoundingClientRect();
	mousex=Math.floor(e.clientX-rc.left);
	mousey=Math.floor(e.clientY-rc.top);
	rc=canvasruler.getBoundingClientRect();
	mousexr=Math.floor(e.clientX-rc.left);
	mouseyr=Math.floor(e.clientY-rc.top);
}
function DrawPanel(x, y, w, h, c) {
	ctx.fillStyle = "#000";
	ctx.fillRect(x, y, w, h);
	ctx.fillStyle = c;
	ctx.fillRect(x+1, y+1, w-2, h-2);
}
function DrawGradPanel(ctx, x, y, w, h, type) {
	switch (type) {
	case 0:
		var grad = ctx.createLinearGradient(x, y, x, y + h);
		grad.addColorStop(0, "#000");
		grad.addColorStop(0.2, "#fff");
		grad.addColorStop(0.3, "#aaa");
		grad.addColorStop(0.8, "#888");
		grad.addColorStop(1, "#000");
		ctx.fillStyle = grad;
		ctx.fillRect(x, y, w, h);
		break;
	case "ruler":
		ctx.fillStyle ="#000";
		ctx.fillRect(x, y, w, h);
		var grad = ctx.createLinearGradient(x, y, x, y + h);
		grad.addColorStop(0.0,"#000000");
		grad.addColorStop(0.2,"#ffffff");
		grad.addColorStop(0.8,"#888899");
		grad.addColorStop(1.0,"#000000");
		ctx.fillStyle =grad;
		ctx.fillRect(x+1, y+1, w-2, h-2);
		break;
	case "opt":
		ctx.fillStyle ="#000";
		ctx.fillRect(x, y, w, h);
		var grad = ctx.createLinearGradient(x, y, x, y + h);
		grad.addColorStop(0.0,"#000000");
		grad.addColorStop(0.04,"#eeeeff");
		grad.addColorStop(0.08,"#ccccdd");
		grad.addColorStop(0.9,"#aaaabb");
		grad.addColorStop(1.0,"#000000");
		ctx.fillStyle =grad;
		ctx.fillRect(x+1, y+1, w-2, h-2);
		break;
	case 2:
		var grad = ctx.createLinearGradient(x, y, x, y + h);
		grad.addColorStop(0, "#445");
		grad.addColorStop(0.3, "#bbc");
		grad.addColorStop(0.9, "#bbc");
		grad.addColorStop(1, "#445");
		ctx.fillStyle = grad;
		ctx.fillRect(x, y, w, h);
		break;
	case 3:
		var grad = ctx.createLinearGradient(x, y, x, y + h);
		grad.addColorStop(0, "#445");
		grad.addColorStop(0.3, "#778");
		grad.addColorStop(0.9, "#778");
		grad.addColorStop(1, "#445");
		ctx.fillStyle = grad;
		ctx.fillRect(x, y, w, h);
		break;
	case 5:
		var grad = ctx.createLinearGradient(x, y, x, y + h);
		grad.addColorStop(0.0,"#ccc");
		grad.addColorStop(0.5,"#000");
		grad.addColorStop(0.8,"#000");
		grad.addColorStop(1.0,"#888");
		ctx.fillStyle = grad;
		ctx.fillRect(x, y, w, h);
		break;
	}
}
function PopupMenu(x, y, o) {
	for(var i=0; i<o.length; ++i) {
		DrawPanel(x, y+16*i, 40, 16, colFace);
		ctx.fillText(o[i], x, y+16*i+8);
	}
}
function Track(tr) {
	this.tr=tr;
	this.ev=new Array();
	this.offy=280;
	this.curplay=0;
	this.sel=-1;
	this.sy=0;
	this.ch=0;
	this.pg=-1;
	this.mute=false;
	this.notetab=new Array();
	this.level=64;
	this.tickmax=0;
	this.SelInst=function(n) {
		this.NoteReset();
		this.sy = n;
	}
	this.SelCh=function(n) {
		this.NoteReset();
		this.ch=n;
	}
	this.SelPg=function(n) {
		this.pg=n;
	}
	this.Sort=function() {
		this.ev.sort(function(a, b) {return a[0]+a[5]-b[0]-b[5];});
		if(this.ev.length) {
			var last=this.ev[this.ev.length-1];
			if(last[0]+last[1]>song.tickmax)
				song.tickmax=last[0]+last[1];
		}
	}
	this.AddNote=function(ti, gt, n, v) {
		this.ev.push([ti, gt, 0x90, n, v, 0]);
		this.Sort();
		if(ti+gt>song.tickmax)
			song.tickmax=ti+gt;
	}
	this.DelSelected=function() {
		for(var i=this.ev.length-1; i>=0; --i) {
			if(this.ev[i][5]) {
				this.ev.splice(i, 1);
			}
		}
	}
	this.SelReset=function() {
		this.sel = -1;
		for(var i=this.ev.length-1; i>=0; --i)
			this.ev[i][5] = 0;
	}
	this.GetNoteTick = function(i) {
		return this.ev[i][0];
	}
	this.GetNoteDur=function(i) {
		return this.ev[i][1];
	}
	this.MoveNote=function(i, ti, du, no) {
		if(no>=0)
			this.ev[i][3]=no;
		if(du>0)
			this.ev[i][1]=du;
		if(ti>=0)
			this.ev[i][0]=ti;
		this.Sort();
		for(var i=0; i<this.ev.length; ++i) {
			if(this.ev[i][5])
				this.sel = i;
		}
	}
	this.MoveSelected=function(dt, dn) {
		var min = 0;
		for(var i=this.ev.length-1; i>=0; --i) {
			if(this.ev[i][5]) {
				this.ev[i][0] += dt;
				this.ev[i][3] += dn;
				if(this.ev[i][0]<min)
					min = this.ev[i][0];
			}
		}
		if(min<0) {
			for(var i=this.ev.length-1; i>=0; --i) {
				if(this.ev[i][5])
					this.ev[i][0]-=min;
			}
		}
		this.Sort();
	}
	this.HitTestNote=function(ti, n) {
		var w=6/proll.xzoom;
		var idx=0;
		for(i=this.ev.length-1; i>=0; --i) {
			if(this.ev[i][3]==n && ti>=this.ev[i][0]-w && ti<(this.ev[i][0]+this.ev[i][1]+w)) {
				if(ti-this.ev[i][0] < w)
					idx= i|0x30000;
				else if(this.ev[i][0]+this.ev[i][1]-ti < w) {
					if(idx) {
						if(this.ev[i][0]+this.ev[i][1] < ti)
							return idx;
						return i|0x50000;
					}
					else
						return i|0x50000;
				}
				else
					return i|0x10000;
			}
		}
		return idx;
	}
	this.SetVelo=function(ti1, ti2, v) {
		var i=0;
		var f=false;
		while(i < this.ev.length) {
			if(this.ev[i][0]>=ti1)
				break;
			++i;
		}
		for(var j=i; j<this.ev.length; ++j) {
			var t=this.ev[j];
			if (t[0]>ti2)
				break;
			if (t[2]==0x90 && t[5]) {
				t[4]=v;
				f=true;
			}
		}
		if(f==false) {
			for(var j=i; j<this.ev.length; ++j) {
				var t=this.ev[j];
				if(t[0]>ti2)
					break;
				if(t[2]==0x90)
					t[4]=v;
			}
		}
	}
	this.Sel=function(ti, n) {
		this.SelReset();
		for(var i=this.ev.length-1; i>=0; --i) {
			if(this.ev[i][3]==n && ti>=this.ev[i][0] && ti<(this.ev[i][0] + this.ev[i][1])) {
				this.sel = i;
				this.ev[i][5] = 1;
				if(ti-this.ev[i][0] < 60)
					return 2;
				if(this.ev[i][0]+this.ev[i][1]-ti < 60)
					return 3;
				return 1;
			}
		}
		return 0;
	}
	this.Sel1=function(i) {
		this.SelReset();
		this.ev[i][5] = 1;
		this.sel = i;
	}
	this.SelArea=function(t1, t2, ty, n1, n2) {
		this.SelReset();
		song.track[0].SelReset();
		var cnt=0;
		for(var i=this.ev.length-1; i>=0; --i) {
			if(this.ev[i][2] == ty) {
				var n =this.ev[i][3];
				var t =this.ev[i][0];
				if(n>=n1 && n<=n2 && t>=t1 && t<t2) {
					this.sel = i;
					this.ev[i][5] =	1;
					++cnt;
				}
			}
		}
		return cnt;
	}
	this.DelAreaAll=function(t1,t2) {
		for(var i=this.ev.length-1; i>=0; --i) {
			var t=this.ev[i][0];
			if(t>=t1 && t<t2)
				this.ev.splice(i,1);
		}
	}
	this.DelArea=function(t1, t2, ty, n) {
		if (ty==0xb0) {
			for(var i=this.ev.length-1; i>=0; --i) {
				if (this.ev[i][2] == ty) {
					var t = this.ev[i][0];
					if(this.ev[i][3]==n && t>=t1 && t<t2)
						this.ev.splice(i, 1);
				}
			}
			return;
		}
		if(ty==0xe0 || ty==0xff51 || ty==0xc0) {
			for(var i=this.ev.length-1; i>=0; --i) {
				if (this.ev[i][2] == ty) {
					var t = this.ev[i][0];
					if (t>=t1 && t<t2)
						this.ev.splice(i, 1);
				}
			}
			return;
		}
	}
	this.Merge=function(ev2, start, stop) {
		this.DelAreaAll(start,stop);
		if(ev2.length==0)
			return;
		var loop=0;
		var last=ev2[ev2.length-1][0];
		for(var i=ev2.length-1;i>=0;--i) {
			if(ev2[i][2]==0)
				loop=1;
			else {
				if(loop && ev2[i][0]<last)
					break;
				this.ev.push(ev2[i]);
			}
		}
		this.Sort();
	}
	this.SetupCur=function(ti) {
		if(this.ev.length>0) {
			 for (var i=this.ev.length-1; i>=0; --i) {
				 if(this.ev[i][0] < ti) {
					this.curplay=i+1;
					 return;
				}
			 }
		}
		this.curplay=0;
	}
	this.Play=function(ti) {
		if (this.pg>=0)
			midiif.SendMsg(this.sy, 0xc0, this.ch, this.pg, -1, -1000);
		this.SetupCur(ti);
	}
	this.PlayTick=function(ti) {
		for(var i=this.notetab.length-1; i>=0; --i) {
			if(this.notetab[i][2]>this.level)
				this.level=this.notetab[i][2]*0.5;
			if(ti >= this.notetab[i][0]) {
				midiif.SendMsg(this.sy, 0x80, this.ch, this.notetab[i][1], 0, -1000);
				this.notetab.splice(i, 1);
			}
		}
		while(this.curplay < this.ev.length) {
			if(this.curplay >= 0) {
				var ev = this.ev[this.curplay];
				if(ev[0]>ti)
					break;
				var dt=song.TickToTime(ev[0]-ti);
				if(song.rectrk!=this) {
					switch(ev[2]) {
						case 0x90:
							if(this.mute == false) {
								midiif.SendMsg(this.sy, 0x90, this.ch, ev[3], ev[4], dt);
								this.notetab.push([ev[0] + ev[1]+dt, ev[3], ev[4]]);
							}
							break;
						case 0x91:
							if(this.mute==false) {
								midiif.SendMsg(this.sy,0x90,this.ch+1,ev[3],ev[4],dt);
							}
							break;
						case 0xb0:
							midiif.SendMsg(this.sy, 0xb0, this.ch, ev[3], ev[4], dt);
							break;
						case 0xc0:
							midiif.SendMsg(this.sy, 0xc0, this.ch, ev[3], -1, dt);
							document.getElementById("trk"+this.tr+"pg").value = ev[3]+1;
							break;
						case 0xe0:
							midiif.Bend(this.sy, this.ch, ev[3], dt);
							break;
					}
				}
				if(ev[2]==0xff51) {
					song.bpm = ev[3];
					var bpm = document.getElementById("bpm");
					bpm.value = ev[3];
				}
			}
			++this.curplay;
		}
	}
	this.NoteReset = function() {
		for(var i=this.notetab.length-1; i>=0; --i) {
			midiif.SendMsg(this.sy, 0x80, this.ch, this.notetab[i][1], 0,0);
		}
		this.notetab.length = 0;
		midiif.ResetAll(this.sy, this.ch);
	}
}
function Song() {
	this.x=0;
	this.y=0;
	this.width=900;
	this.height=96;
	this.track=new Array();
	this.ctxt=new Array();
	for(var i=0;i<16;++i) {
		this.ctxt[i]=document.getElementById("can"+(i+1)).getContext("2d");
		var grad=ctx.createLinearGradient(0,7,0,16);
		grad.addColorStop(0, "#888");
		grad.addColorStop(0.3, "#002");
		grad.addColorStop(0.7, "#002");
		grad.addColorStop(1, "#888");
		this.ctxt[i].fillStyle=grad;
		this.ctxt[i].fillRect(18,7,68,9);
	}
	for(var i=0; i<3; ++i) {
		this.track[i]=new Track(i);
		if(i>0)
			this.track[i].SelInst(0);
	}
	this.numtrk=3;
	this.tickmax=0;
	this.rectrk=null;
	this.recev=new Array();
	this.recnotetab=new Array();
	this.recstart=0;
	this.recstop=0;
	this.guide=true;
	this.evlist=false;
	this.curtrk=1;
	this.press=0;
	this.timer=-1;
	this.inibpm=this.bpm=120;
	this.tm0 = new Date().getTime();
	this.markstart= 0;
	this.markend= 1920;
	this.markplay= 0;
	this.click1=0;
	this.click2=0;
	this.nume=4;
	this.denom=4;
	this.beat1=1920/this.denom;
	this.beat2=this.beat1*this.nume;
	this.playstarttime;
	this.clickdelay=60;
	this.clickcount=0;
	this.clicknote=0;
	this.New=function(n) {
		this.track.length = 0;
		this.numtrk = n;
		this.curtrk = 1;
		this.inibpm=this.bpm=120;
		this.markstart = 0;
		this.markplay = 0;
		this.markend = 1920;
		this.nume = 4;
		this.denom = 4;
		this.tickmax=0;
		for(var i=0; i<n; ++i) {
			this.track[i] = new Track(i);
			if(i>0)
				this.track[i].SelInst(0);
		}
		this.track[0].ev.push([0, 0, 0xff51, 120, 0, 0]);
		document.getElementById("title").value = "";
		document.getElementById("copy").value = "";
		document.getElementById("tex").value = "";
		document.getElementById("sign").value = "4/4";
		document.getElementById("key").value = "";
		this.UpdateOverview();
	}
	this.mcnt=0;
	this.DrawMeter=function() {
		if(song) {
			for(var i=1+song.mcnt;i<song.numtrk;i+=2) {
				var l=song.track[i].level;
				var ctxt=song.ctxt[i-1];
				if(!ctxt)
					return;
				ctxt.fillStyle="#0a0";
				ctxt.fillRect(20,10,l,3);
				ctxt.fillStyle="#224";
				ctxt.fillRect(20+l,10,64-l,3);
				if((l-=12)<0)
					l=0;
				song.track[i].level=l;
			}
			ctxruler.fillStyle="#223";
			ctxruler.fillRect(0,0,300,10);
			var ratio=300/song.tickmax;
			var xplay=song.markplay*ratio;
			var x=proll.offx*ratio;
			var w=(proll.width-50)/proll.xzoom*ratio;
			ctxruler.fillStyle="#449";
			ctxruler.fillRect(x,2,w,6);
			ctxruler.fillStyle="#0b0";
			ctxruler.fillRect(xplay,0,3,10);
			proll.DrawCur();
			if(++song.mcnt>=2) {
				song.mcnt=0;
				if(song.evlist && song.IsPlay())
					song.Dump();
			}
		}
	}
	this.EditD=function(e,el,n) {
		if((n%5)==2) {
			var r=Math.floor(n/5);
//			el.value=e.keyCode;
			switch(e.keyCode) {
			case 9:
				return;
			case 13:
				if(r<8)
					el.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.focus();
				return;
			case 66:
				el.value="Bend";
				break;
			case 67:
				el.value="Ctl";
				break;
			case 78:
				el.value="Note";
				break;
			case 80:
				el.value="Prg";
				break;
			}
			e.preventDefault();
			return;
		}
	}
	this.Dump=function() {
		if(song.evlist==false)
			return;
		var el=document.getElementById("EvItem");
		var s="";
		if(this.curtrk>=0) {
			var tr=this.track[this.curtrk];
			var ev=tr.ev;
			var l=tr.ev.length;
			var end=Math.min(l,tr.curplay+9);
			for(var i=tr.curplay;i<end;++i) {
				var e=ev[i];
				el.value=e[0];
				el=el.nextSibling;
				switch(e[2]) {
				case 0x90:
					el.value=e[1];
					el=el.nextSibling;
					el.value="Note";
					el=el.nextSibling;
					el.value=e[3];
					el=el.nextSibling;
					el.value=e[4];
					break;
				case 0x91:
					el.value=e[1];
					el=el.nextSibling;
					el.value="Voice";
					el=el.nextSibling;
					el.value=e[3];
					el=el.nextSibling;
					el.value=e[4];
					break;
				case 0xb0:
					el.value="";
					el=el.nextSibling;
					el.value="Ctl";
					el=el.nextSibling;
					el.value=e[3];
					el=el.nextSibling;
					el.value=e[4];
					break;
				case 0xc0:
					el.value="";
					el=el.nextSibling;
					el.value="Prg";
					el=el.nextSibling;
					el.value=e[3]+1;
					el=el.nextSibling;
					el.value="";
					break;
				case 0xe0:
					el.value="";
					el=el.nextSibling;
					el.value="Bend";
					el=el.nextSibling;
					el.value=e[3]-8192;
					el=el.nextSibling;
					el.value="";
					break;
				default:
					el.value=e[1];
					el=el.nextSibling;
					el.value=e[2];
					el=el.nextSibling;
					el.value=e[3];
					el=el.nextSibling;
					el.value=e[4];
					break;
				}
				el=el.nextSibling.nextSibling.nextSibling;
			}
			while(el) {
				el.value=""; el=el.nextSibling;
			}
		}
//		el.innerHTML=s;
	}
	this.UpdateOverview=function() {
		var ratio;
		if(song==null)
			return;
		if(song.tickmax==0)
			ratio=0;
		else
			ratio=300/song.tickmax;
		for(var i=1;i<song.numtrk;++i) {
			var ev=song.track[i].ev;
			var x,lx,y,h,w,ctxt;
			ctxt=song.ctxt[i-1];
			if(!ctxt)
				return;
			ctxt.fillStyle="#113";
			ctxt.fillRect(109,5,302,14);
			ctxt.fillStyle="#f13";
			lx=-1;
			for(var j=0,l=ev.length;j<l;++j) {
				if(ev[j][2]==0x90) {
					x=ev[j][0]*ratio;
					lx=x;
					y=17-(ev[j][3]%48)*0.25;
					w=ev[j][1]*ratio;
					if(w<1)
						w=1;
					ctxt.fillRect(110+x,y,w,2);
				}
			}
		}
	}
	this.Draw=function() {
		for(var i=1; i<=16; ++i) {
			var row=document.getElementById("row"+i);
			if(i<this.numtrk) {
				row.style.display = "block";
				var sy = document.getElementById("trk" + i + "inst");
				sy.selectedIndex = this.track[i].sy;
				var ch = document.getElementById("trk" + i + "ch");
				ch.selectedIndex = this.track[i].ch;
				var pg = document.getElementById("trk" + i + "pg");
				if (this.track[i].pg < 0)
					pg.value = "";
				else
					pg.value = this.track[i].pg+1;
			}
			else {
				row.style.display = "none";
			}
		}
	}
	this.AddTrk=function() {
		if(this.numtrk<17) {
			this.track[this.numtrk] = new Track(this.numtrk);
			this.track[this.numtrk].SelInst(0);
			this.numtrk++;
			if(this.numtrk<=2)
				this.SelTrk(1);
			this.UpdateOverview();
			this.Draw();
		}
	}
	this.DelTrk=function(tr) {
		if(tr<0)
			tr = this.curtrk;
		if(tr>0 && tr<this.numtrk) {
			this.track.splice(tr, 1);
			this.numtrk--;
			for(var i=0; i<this.numtrk; ++i)
				this.track[i].tr = i;
			if(tr>=this.numtrk)
				--tr;
			this.SelTrk(tr);
			this.UpdateOverview();
			this.Draw();
		}
	}
	this.MoveTrk=function(from, to) {
		if(to>from) {
			this.track.splice(to+1, 0, this.track[from]);
			this.track.splice(from, 1);
		}
		if(from>to) {
			this.track.splice(to, 0, this.track[from]);
			this.track.splice(from+1, 1);
		}
		for(var i=0; i<this.numtrk; ++i)
			this.track[i].tr = i;
		this.SelTrk(to);
		this.UpdateOverview();
		this.Draw();
	}
	this.SetTrkCol=function() {
		for(var i=0;i<16;++i) {
			var t=document.getElementById("row"+(i+1));
			if(this.curtrk==i+1) {
				t.style.background="#fa4";
				t.style.background="-moz-linear-gradient(top, #fa4, #fa4 10%, #e93 90%,#b60)";
				t.style.background="-webkit-gradient(linear, left top, left bottom, color-stop(0, #b60), color-stop(0.1,#fa4),color-stop(0.9,#e93),color-stop(1, #b60))";
			}
			else {
				t.style.background="#eee";
				t.style.background="-moz-linear-gradient(top, #fff, #eee 10%, #ddd 90%,#aaa)";
				t.style.background="-webkit-gradient(linear, left top, left bottom, color-stop(0, #fff), color-stop(0.1,#eee),color-stop(0.9,#ddd),color-stop(1, #aaa))";
			}
		}
	}
	this.SelTrk=function(n)	{
		this.curtrk = n;
		proll.SelTrk(n);
		this.SetTrkCol();
		if (n == 0)
			document.getElementById("opsw").style.display = "none";
		else
			document.getElementById("opsw").style.display = "block";
		if(n>0) {
			var sy = document.getElementById("trk" + n + "inst").selectedIndex;
			document.getElementById("instbtn"+(sy+1)).checked = true;
			SelInst(sy);
		}
	}
	this.IsPlay=function() {
		if(this.timer==-1)
			return false;
		return true;
	}
	this.TickToTime=function(ti) {
		return ti*125/song.bpm;
	}
	this.Rew=function() {
		if(this.IsPlay()) {
			this.Stop();
			this.markplay=this.markstart;
			synths.Locate(0);
			this.Play(this.markstart);
			document.getElementById("play").checked=true;
		}
		else {
			synths.Locate(0);
			this.markplay=this.markstart;
			this.SetupCur();
			document.getElementById("stop").checked=true;
		}
		proll.Locate(this.markplay);
	}
	this.FF=function() {
		if(this.IsPlay()) {
			this.Stop();
			this.markplay=this.markend;
			synths.Locate(0);
			this.Play(this.markend);
			document.getElementById("play").checked=true;
		}
		else {
			this.markplay=this.markend;
			synths.Locate(0);
			this.SetupCur();
			document.getElementById("stop").checked=true;
		}
		proll.Locate(this.markplay);
	}
	this.RecAddNote=function(note,endtick) {
		if(note==-1) {
			for(var i=this.recnotetab.length-1; i>=0; --i) {
				var recnote=this.recnotetab[i];
				this.recev.push([recnote[0]|0, (endtick-recnote[0])|0, 0x90, recnote[1], recnote[2], 0]);
			}
			this.recnotetab.length=0;
			return;
		}
		for(var i=this.recnotetab.length-1; i>=0; --i) {
			var recnote=this.recnotetab[i];
			if(recnote[1]==note) {
				this.recev.push([recnote[0]|0, (endtick-recnote[0])|0, 0x90, note, recnote[2], 0]);
				this.recnotetab.splice(i,1);
			}
		}
	}
	this.RecEv=function(data) {
		if(this.rectrk==null)
			return;
		switch(data[0]&0xf0) {
		case 0x80:
			this.RecAddNote(data[1],this.markplay);
			break;
		case 0x90:
			if(data[2]>0)
				this.recnotetab.push([this.markplay, data[1], data[2]]);
			else
				this.RecAddNote(data[1],this.markplay);
			break;
		case 0xb0:
			this.recev.push([this.markplay, 0, 0xb0, data[1], data[2], 0]);
			break;
		case 0xe0:
			this.recev.push([this.markplay, 0, 0xe0, (data[2]<<7)+data[1],0, 0]);
			break;
		}
	}
	this.Rec=function() {
		this.rectrk=this.track[this.curtrk];
		this.recev.length=0;
		this.recnotetab.length=0;
		proll.Draw();
		this.PlayStart();
	}
	this.Play=function() {
		this.rectrk=null;
		proll.Draw();
		this.PlayStart();
	}
	this.Stop=function() {
		if(!this.IsPlay)
			return;
		if(this.timer != -1)
			clearInterval(this.timer);
		this.timer = -1;
		var bpm = document.getElementById("bpm");
		bpm.value = this.inibpm;
		bpm.style.color = "#000";
		synths.PlayStop();
		for(var i=this.track.length-1; i>=0; --i)
			this.track[i].NoteReset();
		midiif.Tick(0);
		if(this.rectrk)
			this.rectrk.Merge(this.recev, this.recstart, this.recstop);
		this.rectrk=null;
		this.UpdateOverview();
		proll.Draw();
	}
	this.SetupCur=function() {
		for(var i=this.track.length-1;i>=0;--i)
			this.track[i].SetupCur(this.markplay);
		song.Dump();
	}
	this.PlayStart=function() {
		if(this.timer == -1) {
			var bpm = document.getElementById("bpm");
			bpm.style.color = "#888";
			this.playstarttime = new Date().getTime();
			this.tm0 = new Date().getTime();
			synths.PlayStart(this.playstarttime, this.markplay);
			for(var i=this.track.length-1; i>=0; --i)
				this.track[i].Play(this.markplay);
			this.timer = setInterval(song.PlayTick, timereso);
		}
		this.recstart=this.recstop=this.markplay;
		this.click1=Math.floor((this.markplay-1)/this.beat1)*this.beat1;
		this.click2=Math.floor((this.markplay-1)/this.beat2)*this.beat2;
	}
	this.PlayTick=function() {
		var time = new Date().getTime();
		var ms = time - song.tm0;
		song.tm0 = time;
		song.markplay += song.bpm / 120 * ms * 0.96;
		if(song.markplay>song.recstop)
			song.recstop=song.markplay;
		if(song.clickcount>0) {
			if((song.clickcount-=ms)<=0) {
				song.clickcount=0;
				if(song.guide) {
					if(song.clicknote==1)
						click1.play();
					else
						click2.play();
				}
			}
		}
		if(song.markplay>song.click2+song.beat2) {
			song.click1=song.click2=Math.floor(song.markplay/song.beat2)*song.beat2;
			if(song.rectrk) {
				song.clicknote=2;
				song.clickcount=song.clickdelay;
			}
		}
		else if(song.markplay>song.click1+song.beat1) {
			song.click1=song.markplay;
			if(song.rectrk) {
				song.clicknote=1;
				song.clickcount=song.clickdelay;
			}
		}
		if(song.markplay >= song.markend) {
			if(song.rectrk) {
				song.RecAddNote(-1,song.markend);
				song.recev.push([song.markstart,0,0,0,0,0]);
				song.recstart=song.markstart;
				song.recstop=song.markend;
			}
			song.markplay -= (song.markend - song.markstart);
			song.click1=Math.floor((song.markstart-1)/song.beat1)*song.beat1;
			song.click2=Math.floor((song.markstart-1)/song.beat2)*song.beat2;
			for(var i=song.track.length-1; i>=0; --i) {
				song.track[i].NoteReset();
				song.track[i].Play(song.markstart);
			}
			synths.PlayStart(song.playstarttime, song.markstart);
		}
		for(var i=song.track.length-1; i>=0; --i) {
			song.track[i].PlayTick(song.markplay);
		}
		midiif.Tick(time, song.markplay);
	}
	this.Draw();
}
function Pianoroll() {
	this.x = 0;
	this.y = 0;
	this.width = 950;
	this.height = 380;
	this.offx = -960;
	this.offti=200/(32/480)+960;
	this.offtiorg=0;
	this.opt = 0x90;
	this.xzoomind=32;
	this.xzoom = 32/480;
	this.offxorg=0;
	this.offyorg=0;
	this.mousexorg = 0;
	this.mouseyorg = 0;
	this.drag = null;
	this.trkidx = 1;
	this.trk = null;
	this.curtick = this.curtick2 = 0;
	this.curnote = 0;
	this.dragoff = 0;
	this.testnote = 0;
	this.testvelo = 0;
	this.repaint=null;
	function NoteName(n) {
		return ["C ", "C+", "D ", "D+", "E ", "F ", "F+", "G", "G+", "A", "A+", "B "][n%12]+(Math.floor(n /12)- 1);
	}
	this.Resize = function() {
		clearTimeout(this.repaint);
		this.repaint=setTimeout(function() {
			proll.width=canvas.parentNode.clientWidth;
			proll.height=canvas.parentNode.clientHeight;
			canvas.width=proll.width;
			canvas.height=proll.height;
			canvas.style.width=canvas.width+"px";
			canvas.style.height=canvas.height+"px";
			proll.Draw();
		},100);
	}
	this.Wheel=function(e) {
		var d;
		if(e.wheelDelta)
			d=-(e.wheelDelta)/120;
		else
			d=e.detail/3;
		if(e.shiftKey && !e.altKey) {
			proll.offx+=d*32/proll.xzoom;
			this.Draw();
			if(e.preventDefault)
				e.preventDefault();
			e.returnValue = false;
		}
		if(e.altKey&&!e.shiftKey) {
			proll.trk.offy+=d*30;
			this.Draw();
			if(e.preventDefault)
				e.preventDefault();
			e.returnValue = false;
		}
		if(e.ctrlKey||(e.altKey&&e.shiftKey)) {
			XZoomInOut(-d);
			this.Draw();
			if(e.preventDefault)
				e.preventDefault();
			e.returnValue = false;
		}
	}
	this.Locate=function(ti) {
		this.offti=ti;
		this.offx=ti-200/this.xzoom;
		this.Draw();
	}
	this.DrawCur=function() {
		var x1, x2, xp;
		x1=this.x+50+(song.markstart-this.offx)*this.xzoom;
		x2=this.x+50+(song.markend-this.offx)*this.xzoom;
		xp=this.x+50+(song.markplay-this.offx)*this.xzoom;
		var x11=this.x+50-this.offx*this.xzoom;
		var x12=this.x+this.width;
		DrawGradPanel(ctx, 0,this.y+16,this.width,13,3);
		DrawGradPanel(ctx, x1,this.y+16,x2-x1,13,2);
		ctx.fillStyle="#f22";
		ctx.beginPath();
		ctx.moveTo(x1, this.y+16);
		ctx.lineTo(x1+8, this.y+23);
		ctx.lineTo(x1, this.y+30);
		ctx.moveTo(x2+1, this.y+16);
		ctx.lineTo(x2-7, this.y+23);
		ctx.lineTo(x2+1, this.y+30);
		ctx.fill();
		ctx.fillStyle="#070";
		ctx.fillRect(xp, this.y+16, 3, 13);

	}
	this.Draw=function() {
		var bmp=document.getElementById("bpm");
		if(song.IsPlay())
			song.bpm;
		else
			bmp.value = song.inibpm;
		ctx = canvas.getContext("2d");
		ctx.fillStyle = "#e0e0d0";
		ctx.fillRect(this.x, this.y, this.x+50, this.height);
		ctx.fillStyle="#ffffff";
		ctx.fillRect(this.x+51, this.y+1, this.width-52, this.height-optheight);
		ctx.fillStyle="#000000";
		ctx.fillRect(this.x+50,this.y,1,this.height-optheight);
		ctx.fillRect(this.x+this.width-1,this.y,1,this.height-optheight);
		var sn=[0,1,0,1,0,0,1,0,1,0,1,0];
		for(var n=0; n<128; ++n) {
			var y=this.height-70-n*8+this.trk.offy;
			if(y<-8)
				break;
			if(y<this.height-optheight) {
				var nn = n % 12;
				if(nn==0) {
					ctx.fillStyle="#000";
					ctx.fillRect(this.x, this.y+y+8, this.width, 1);
					ctx.fillText(NoteName(n), this.x + 30, this.y + y + 7);
				}
				if(nn==5) {
					ctx.fillStyle="#000";
					ctx.fillRect(this.x, this.y+y+8, 50, 1);
					ctx.fillStyle="#aaa";
					ctx.fillRect(this.x+51, this.y+y+8, this.width-52, 1);
				}
				if(sn[nn]) {
					ctx.fillStyle="#000";
					ctx.fillRect(this.x, this.y+y, 30, 8);
					ctx.fillRect(this.x+30, this.y+y+4, 20, 1);
					DrawGradPanel(ctx, this.x+51, this.y+y, this.width-52, 9, 0);
				}
			}
		}
		DrawGradPanel(ctx, this.x, this.y + this.height-80, this.width, 80, "opt");
		DrawGradPanel(ctx, this.x, this.y, this.width, 16, "ruler");
		if(!(song.denom > 0))
			return;
		var meas = 1920 * song.nume / song.denom;
		var dx = (1920 / song.denom) * this.xzoom;
		for(var i=0; ; ++i) {
			var x = (i*meas-this.offx) * this.xzoom;
			if(x>this.width)
				break;
			for(j=0; j<song.nume; ++j) {
				var xx = x+j*dx;
				if(xx>=0) {
					if(j==0) {
						ctx.fillStyle = colBorder;
						ctx.fillRect(this.x+50+x, this.y+1, 1, this.height-optheight);
						ctx.fillRect(this.x+50+x, this.y+this.height-67, 1, 63);
						ctx.fillStyle =	colText;
						ctx.fillText(i.toString(10), this.x + 52 + x, this.y + 10);
					}
					else {
						ctx.fillStyle = colLtBorder;
						ctx.fillRect(this.x+50+xx, this.y+1, 1, this.height-optheight);
						ctx.fillRect(this.x+50+xx, this.y+this.height-67, 1, 63);
					}
				}
				if (dx < 8)
					break;
			}
		}
		this.DrawCur();
		if(this.trkidx>0) {
			var ev = this.trk.ev;
			var du, n, v, v2, x, y, c;
			for(var i=0; i<ev.length; ++i) {
				x = ev[i][0] * this.xzoom;
				if(x-this.offx*this.xzoom >= this.width-50)
					break;
				switch(ev[i][2]) {
					case 0x90:
						break;
					case 0x91:
						break;
					case 0xb0:
						if(x-this.offx*this.xzoom >= 0) {
							v=ev[i][4];
							v2=v*0.5;
							var y=this.y+this.height-v2-4;
							var cc=ev[i][3];
							if(cc != this.opt) {
								ctx.fillStyle="#707090";
								ctx.fillRect(this.x+50+x-this.offx*this.xzoom, y, 3, v2);
							}
						}
						break;
					case 0xc0:
						if(x-this.offx*this.xzoom >= 0) {
							v=ev[i][3];
							v2=v*0.5;
							var y=this.y+this.height-v2-4;
							ctx.fillStyle="#708080";
							ctx.fillRect(this.x+50+x-this.offx*this.xzoom, y, 3, v2);
						}
						break;
					case 0xe0:
						if(x-this.offx*this.xzoom >= 0) {
							v2=(8192-ev[i][3])/256;
							if(this.opt != 0xe0) {
								ctx.fillStyle = "#807080";
								ctx.fillRect(this.x+50+x-this.offx*this.xzoom, this.y+this.height-36, 3, v2);
							}
						}
						break;
				}
			}

			if(this.opt!=0xff51)	{
				var x;
				var evtmp = song.track[0].ev;
				for(var i=0; i<evtmp.length; ++i) {
					x = evtmp[i][0] * this.xzoom;
					if(x - this.offx * this.xzoom >= this.width - 50)
						break;
					if(evtmp[i][2]==0xff51) {
						if(x-this.offx*this.xzoom >= 0) {
							v=evtmp[i][3];
							var y=this.y+this.height-v*0.2;
							ctx.fillStyle = "#808070";
							ctx.fillRect(this.x+50+x-this.offx*this.xzoom, y, 3, v*0.2-4);
						}
					}
				}
			}

			ctx.textAlign="right";
			switch(this.opt) {
			case 0xe0:
				ctx.fillStyle = "#444";
				for(var v=-8192; v<=8192; v+=4096) {
					y = this.y+this.height-36-v/256;
					ctx.fillRect(35, y,	this.width-35, 1);
					ctx.fillText(Math.min(8191, v), 30, y);
				}
				break;
			case 0xff51:
				for(var v=0; v<330; v+=30) {
					y=this.y+this.height-v*0.2-4;
					if(y < this.y + this.height - 70)
						break;
					if(v%60==0) {
						ctx.fillStyle = "#444";
						ctx.fillRect(35, y, this.width-35, 1);
						ctx.fillText(v, 30, y);
					}
					else
						ctx.fillStyle = "#888";
						ctx.fillRect(50, y, this.width-20, 1);
				}
				break;
			case 0x91:
				break;
			case 0x90:
			default:
				ctx.fillStyle = "#444";
				for(var v=0; v<=128; v+=32) {
					y = this.y+this.height-v*0.5-4;
					ctx.fillRect(35, y, this.width-35, 1);
					ctx.fillText(Math.min(127, v), 30, y);
				}
				break;
			}
			ctx.textAlign="left";
			for(var i=0; i<ev.length; ++i) {
				x = ev[i][0] * this.xzoom;
				if(x - this.offx * this.xzoom >= this.width - 50)
					break;
				var x2 = x + (du = ev[i][1] * this.xzoom);
				switch(ev[i][2]) {
					case 0x90:
						if(x + du - this.offx * this.xzoom >= 0) {
							v=ev[i][4];
							v2=v*0.5;
							y = this.y+this.height-ev[i][3]*8+this.trk.offy-70+2;
							if(song.rectrk==this.trk)
								c="#888";
							else if(ev[i][5])
								c="rgb(0,"+(v*2)+",0)";
							else
								c="rgb("+(v*2)+",0,0)";
							var xx = Math.max(50, this.x + 50 + x - this.offx * this.xzoom);
							var ww = (this.x + 50 + x2 - this.offx * this.xzoom) - xx;
							var hh = 5;
							if(y<this.y+30) {
								hh=5-(this.y+30-y);
								y=this.y+30;
							}
							if(y+hh>this.y+this.height-optheight)
								hh-=(y+hh-this.y-this.height+optheight);
							if(ww>0 && hh>0)
								DrawPanel(xx, y, ww, hh, c);
							if(this.opt == 0x90) {
								ctx.fillStyle = c;
								ctx.fillRect(this.x+50+x-this.offx*this.xzoom, this.y+this.height-v2-4, 3, v2);
							}
						}
						break;
					case 0x91:
						break;
					case 0xb0:
						if(x-this.offx*this.xzoom >= 0) {
							v=ev[i][4];
							v2=v*0.5;
							var y=this.y+this.height-v2-4;
							var cc=ev[i][3];
							if(cc==this.opt) {
								if(ev[i][5])
									ctx.fillStyle="#00ff00";
								else
									ctx.fillStyle="#0000ff";
								ctx.fillRect(this.x+50+x-this.offx*this.xzoom, y, 3, v2);
							}
						}
						break;
					case 0xc0:
						if(x-this.offx*this.xzoom >= 0) {
							v=ev[i][3];
							v2=v*0.5;
							var y=this.y+this.height-v2-4;
							if(this.opt==0xc0) {
								if(ev[i][5])
									ctx.fillStyle="#00ff00";
								else
									ctx.fillStyle="#00ffff";
								ctx.fillRect(this.x+50+x-this.offx*this.xzoom, y, 3, v2);
							}
						}
						break;
					case 0xe0:
						if(x-this.offx*this.xzoom >= 0) {
							v2=(8192-ev[i][3])/256;
							if(this.opt==0xe0) {
								if(ev[i][5])
									ctx.fillStyle="#00ff00";
								else
									ctx.fillStyle="#ff00ff";
								ctx.fillRect(this.x+50+x-this.offx*this.xzoom, this.y+this.height-36, 3, v2);
							}
						}
						break;
				}
			}
			if(this.opt==0xff51)	{
				var x;
				var ev=song.track[0].ev;
				for(var i=0; i<ev.length; ++i) {
					x=ev[i][0]*this.xzoom;
					if(x-this.offx*this.xzoom >= this.width-50)
						break;
					if(ev[i][2]==0xff51) {
						if(x-this.offx*this.xzoom >= 0) {
							v=ev[i][3]*0.2;
							var y=this.y+this.height-v-4;
							if(ev[i][5]) {
								ctx.fillStyle = "#00ff00";
								bpm.value = ev[i][3];
							}
							else
								ctx.fillStyle = "#ff4000";
							ctx.fillRect(this.x+50+x-this.offx*this.xzoom, y, 3, v);
						}
					}
				}
			}
		}
		ctx.fillStyle="#445";
		ctx.fillRect(this.x,this.y+this.height-optheight,this.width,optheight-80);
		if(this.drag == "add") {
			ctx.fillStyle = "#00f000";
			var x1 = this.GridTick(this.curtick) * this.xzoom;
			var x2 = this.curtick2 * this.xzoom;
			var y = this.y+this.height - 70 - this.curnote * 8 + this.trk.offy;
			var du = x2 - x1;
			ctx.fillRect(this.x+50+x1 - this.offx*this.xzoom, y+1, du, 7);
		}
	}
	this.GetNote = function(y) {
		return Math.floor((this.y + this.height + 8 - y + this.trk.offy-70) / 8);
	}
	this.GetTick = function(x) {
		x = (x - 50) / this.xzoom+this.offx;
		return x;
	}
	this.GridTick = function(x)	{
		x += grid * .5;
		x = x - (x % grid);
		return x;
	}
	this.GridDownTick=function(x)	{
		x = x - (x % grid);
		return x;
	}
	this.SelTrk=function(n) {
		this.trkidx = n;
		this.trk = song.track[n];
		this.trk.SelReset();
		song.Dump();
		this.Draw();
	}
	this.MouseDown = function(x, y) {
		this.offxorg = this.offx;
		this.offyorg = this.trk.offy;
		this.mousexorg = x;
		this.mouseyorg = y;
		this.curtick = this.curtick2 = this.GetTick(x);
		this.curnote = this.GetNote(y);
		this.isplay=0;
		if(hittest) {
			switch(hittest & 0xff0000) {
				case 0x100000:
					this.drag = "scr";
					return;
				case 0x110000:
					this.drag = "mks";
					return;
				case 0x120000:
					this.drag = "mke";
					return;
				case 0x130000:
					this.drag = "mkp";
					this.isplay=song.IsPlay();
					if(this.isplay)
						song.Stop();
					this.MouseMove(x,y);
					return;
				case 0x200000:
					switch(mode) {
						case 0:
							this.drag = "ops";
							return;
						case 1:
							this.drag = "scr";
							return;
						case 2:
							this.drag = "opt";
							return;
					}
					return;
				case 0x800000:
					switch(mode) {
						case 0:
							this.drag = "sel";
							return;
						case 1:
							this.drag = "scr";
							return;
						case 2:
							this.drag = "add";
							midiif.NoteOnDirect(this.trk.sy, this.trk.ch, this.curnote, 100);
							return;
					}
					return;
				case 0x810000:
					switch(mode) {
						case 0:
						case 2:
							var ev = this.trk.ev[hittest&0xffff];
							if(ev[5] == 0) {
								this.trk.Sel1(hittest&0xffff);
								this.Draw();
							}
							this.drag = "mov";
							midiif.NoteOnDirect(this.trk.sy, this.trk.ch, ev[3], ev[4]);
							this.testnote = ev[3]; this.testvelo = ev[4];
							return;
						case 1:
							this.drag = "scr";
							return;
					}
					return;
				case 0x830000:
					switch(mode) {
						case 0:
						case 2:
							this.trk.Sel1(hittest&0xffff);
							this.Draw();
							this.drag = "mvs";
							return;
						case 1:
							this.drag = "scr";
							return;
					}
					return;
				case 0x850000:
					switch(mode) {
						case 0:
						case 2:
							this.trk.Sel1(hittest&0xffff);
							this.Draw();
							this.drag = "mve";
							return;
						case 1:
							this.drag = "scr";
							return;
					}
					return;
			}
		}
	}
	this.HitTest=function(x, y) {
		if(x>=this.x && x<this.x+this.width && y>=this.y && y<this.y+this.height) {
			var t = this.GetTick(x);
			if(song.rectrk==null) {
				if(y>=this.y+16 && y<this.y+32 && t>=song.markstart && t<song.markstart+8/this.xzoom)
					return 0x110000;
				if(y>=this.y+16 && y<this.y+32 && t>=song.markend-8/this.xzoom && t<song.markend)
					return 0x120000;
				if(y>=this.y+16&&y<this.y+32)
					return 0x130000;
			}
			if(x<this.x+50 || y<this.y+32)
				return 0x100000;
			if(y>this.y+this.height-optheight)
				return 0x200000;
			return this.trk.HitTestNote(this.GetTick(x), this.GetNote(y))|0x800000;
		}
		return 0;
	}
	this.SetCursor=function() {
		if(this.drag==null) {
			switch(hittest&0xff0000) {
			case 0x100000:
				canvas.style.cursor="url(./hand2.png),default";
				return;
			case 0x110000:
				canvas.style.cursor="url(./cursorstart.png),e-resize";
				return;
			case 0x120000:
				canvas.style.cursor="url(./cursorend.png),w-resize";
				return;
			case 0x130000:
				canvas.style.cursor="url(./cursorew.png),w-resize";
				return;
			}
			if(mode==1) {
				canvas.style.cursor = "url(./hand2.png),default";
				return;
			}
			switch(hittest&0xff0000) {
			case 0x200000:
				switch (mode) {
					case 0:
						canvas.style.cursor = "url(./cursorsel.png),default";
						return;
					case 2:
						canvas.style.cursor = "url(./cursordraw.png),default";
						return;
				}
				return;
			case 0x800000:
				switch (mode) {
					case 0:
						canvas.style.cursor = "url(./cursorsel.png),default";
						return;
					case 2:
						canvas.style.cursor = "url(./cursoradd.png),default";
						return;
				}
				return;
			case 0x810000:
				canvas.style.cursor = "url(./cursormove.png),default";
				return;
			case 0x830000:
				canvas.style.cursor = "url(./cursorew.png),e-resize";
				return;
			case 0x850000:
				canvas.style.cursor = "url(./cursorew.png),w-resize";
				return;
			}
		}
	}
	this.MouseMove=function(x, y) {
		this.SetCursor();
		switch(this.drag) {
			case "sel":
				this.Draw();
				ctx.fillStyle = "rgba(0,255,0,0.5)";
				ctx.fillRect(this.mousexorg, this.mouseyorg, x - this.mousexorg, y - this.mouseyorg);
				break;
			case "mov":
				var t = this.GridTick(this.GetTick(x));
				var n = this.GetNote(y);
				this.trk.MoveSelected(t - this.GridTick(this.curtick), n - this.curnote);
				this.curtick = t; this.curnote = n;
				if(this.testnote != n) {
					midiif.NoteOnDirect(this.trk.sy, this.trk.ch, this.testnote, 0);
					midiif.NoteOnDirect(this.trk.sy, this.trk.ch, this.testnote = n, this.testvelo);
				}
				this.Draw();
				break;
			case "ops":
				this.Draw();
				ctx.fillStyle = "rgba(0,255,0,0.5)";
				ctx.fillRect(this.mousexorg, this.y+this.height-80, x-this.mousexorg, 80);
				break;
			case "opt":
				if(this.opt == 0x90) {
					var t = this.GetTick(x);
					var t2 = t - (5	/ this.xzoom);
					var v = 127 - (y - (this.y + this.height - 70)) * 2;
					if(v <1) v = 1;
					if(v >127) v = 127;
					this.trk.SetVelo(t2, t, v);
					this.Draw();
				}
				if(this.opt==0x91) {

				}
				if(this.opt < 120) {
					var t1 = this.GridDownTick(this.GetTick(x));
					var t2 = t1+grid;
					this.trk.DelArea(t1, t2, 0xb0, this.opt);
					var v = 127- (y - (this.y + this.height - 70)) * 2;
					if(v<1) v=1;
					if(v>127) v=127;
					this.trk.ev.push([t1, 0, 0xb0, this.opt, v, 0]);
					this.trk.Sort();
					this.Draw();
				}
				if(this.opt == 0xc0) {
					var t1 = this.GridDownTick(this.GetTick(x));
					var t2 = t1 + grid;
					this.trk.DelArea(t1, t2, 0xc0, this.opt);
					var v = 127 - (y - (this.y + this.height - 70)) * 2;
					if(v < 1) v = 1;
					if(v > 127) v = 127;
					this.trk.ev.push([t1, 0, 0xc0, v, 0, 0]);
					this.trk.Sort();
					this.Draw();
				}
				if(this.opt == 0xe0) {
					var t1 = this.GridDownTick(this.GetTick(x));
					var t2 = t1 + grid;
					this.trk.DelArea(t1, t2, 0xe0, 0);
					var v = (this.y + this.height - y) * 256;
					if (v < 0) v = 0;
					if (v > 16383) v = 16383;
					this.trk.ev.push([t1, 0, 0xe0, v, 0, 0]);
					this.trk.Sort();
					this.Draw();
				}
				if(this.opt == 0xff51) {
					var t1 = this.GridDownTick(this.GetTick(x));
					var t2 = t1 + grid;
					song.track[0].DelArea(t1, t2, 0xff51, 0);
					var v = (this.y + this.height - y) * 5;
					if(v<10) v=10;
					if(v>400) v=400;
					song.track[0].ev.push([t1, 0, 0xff51, v, 0, 0]);
					var bpm = document.getElementById("bpm");
					bpm.value = v;
					song.track[0].Sort();
					this.Draw();
				}
				break;
			case "mks":
				song.markstart = this.GridTick(this.GetTick(x));
				this.Draw();
				break;
			case "mke":
				song.markend = this.GridTick(this.GetTick(x));
				this.Draw();
				break;
			case "mkp":
				song.markplay = this.GridTick(this.GetTick(x));
				synths.Locate(song.markplay);
				song.SetupCur();
				this.Draw();
				break;
			case "mvs":
				var s = Math.max(0, this.GridTick(this.GetTick(x)));
				var d = this.trk.GetNoteTick(this.trk.sel) + this.trk.GetNoteDur(this.trk.sel) - s;
				if(d<=0)
					return;
				this.trk.MoveNote(this.trk.sel, s, d, -1);
				this.Draw();
				break;
			case "mve":
				this.trk.MoveNote(this.trk.sel, -1, this.GridTick(this.GetTick(x)) - this.trk.GetNoteTick(this.trk.sel), -1);
				this.Draw();
				break;
			case "add":
				this.curtick2 = this.GridTick(this.GetTick(x));
				this.Draw();
				break;
			case "scr":
				this.trk.offy = this.offyorg + y - this.mouseyorg;
				this.offx = this.offxorg - (x -	this.mousexorg) / this.xzoom;
				this.Draw();
				break;
		}
	}
	this.MouseUp = function(x, y) {
		switch (this.drag) {
			case "mkp":
				if(this.isplay)
					song.Play();
				this.drag=null;
				return;
			case "mvs":
			case "mve":
				song.UpdateOverview();
				break;
			case "mov":
				midiif.NoteOnDirect(this.trk.sy, this.trk.ch, this.testnote, 0);
				this.drag = null;
				song.UpdateOverview();
				return;
			case "scr":
				this.drag = null;
				return;
			case "sel":
				var t2 = this.GetTick(x);
				var t1 = this.curtick;
				var n2 = this.GetNote(y);
				var n1 = this.curnote;
				if(t1>t2) {
					var t = t1;
					t1 = t2; t2 = t;
				}
				if(n1>n2) {
					var t = n1;
					n1 = n2; n2 = t;
				}
				this.trk.SelArea(t1, t2, 0x90, n1, n2);
				this.Draw();
				this.drag = null;
				return;
			case "ops":
				var t2 = this.GetTick(x);
				var t1 = this.curtick;
				if(t1>t2) {
					var t=t1;
					t1=t2; t2=t;
				}
				if(this.opt == 0x90)
					this.trk.SelArea(t1, t2, 0x90, 0, 128);
				else if(this.opt==0x91)
					this.trk.SelArea(t1,t2,0x91,0,128);
				else if(this.opt < 120) {
					this.trk.SelArea(t1, t2, 0xb0, this.opt, this.opt);
				}
				else if(this.opt == 0xc0) {
					this.trk.SelArea(t1, t2, 0xc0, 0, 128);
				}
				else if(this.opt == 0xe0) {
					this.trk.SelArea(t1, t2, 0xe0, 0, 16384);
				}
				else if(this.opt == 0xff51) {
					this.trk.SelReset();
					song.track[0].SelArea(t1, t2, 0xff51, 0, 1000);
				}
				this.Draw();
				this.drag = null;
				return;
			case "add":
				var ti0 = this.GridTick(this.curtick);
				var ti = this.GridTick(this.GetTick(x));
				var n = this.GetNote(y);
				if(this.trkidx) {
					if(ti0 == ti) {
						this.trk.Sel(ti, n);
					}
					else {
						if (ti > ti0) {
							this.trk.AddNote(ti0, ti-ti0, this.curnote, 100);
							this.trk.Sel(ti0, this.curnote);
						}
						else {
							this.trk.AddNote(ti, ti0-ti, this.curnote, 100);
							this.trk.Sel(ti, this.curnote);
						}
					}
				}
				midiif.NoteOnDirect(this.trk.sy, this.trk.ch, this.curnote, 0);
				this.drag = null;
				song.UpdateOverview();
				this.Draw();
				return;
		}
		this.drag = null;
	}
}
function Delete() {
	if (proll.opt == 0xff51)
		song.track[0].DelSelected();
	proll.trk.DelSelected();
	song.UpdateOverview();
	proll.Draw();
}
function Copy() {
	clipboard.length = 0;
	var f=0;
	var off=0;
	for(var i=0; i<proll.trk.ev.length; ++i) {
		var ev=proll.trk.ev[i];
		if(ev[5]) {
			if(f==0)
				off=ev[0];
			clipboard.push([ev[0]-off, ev[1], ev[2], ev[3], ev[4], ev[5]]);
			f=1;
		}
	}
}
function Paste() {
	var off=song.markplay;
	proll.trk.SelReset();
	song.track[0].SelReset();
	for(var i=0; i<clipboard.length; ++i) {
		var clip = clipboard[i];
		proll.trk.ev.push([clip[0]+off,clip[1],clip[2],clip[3],clip[4],clip[5]]);
	}
	proll.trk.Sort();
	song.UpdateOverview();
	proll.Draw();
}
function TRowMDown(n) {
	var r=document.getElementById("row"+n);
	r.style.background="#f71";
}
function KeyDown(e)	{
	if (currentfocus != null)
		return;
	switch(e.keyCode) {
		case 8:
			Delete();
			e.returnValue = false;
			e.cancelBubble = true;
			break;
		case 0x43:
			if(e.ctrlKey||e.metaKey) {
				Copy();
				if(e.preventDefault)
					e.preventDefault();
				e.returnValue = false;
			}
			break;
		case 0x56:
			if(e.ctrlKey||e.metaKey) {
				Paste();
				if(e.preventDefault)
					e.preventDefault();
				e.returnValue = false;
			}
			break;
		case 46:
			Delete();
			break;
		case 0x58:
			XZoomInOut(-1);
			break;
		case 0x5a:
			XZoomInOut(1);
			break;
		case 0x31:
			document.getElementById("x32").checked=true;
			SetXZoom(32);
			break;
		case 65:
			document.getElementById("msel").checked = true;
			SetMode(0);
			proll.SetCursor();
			break;
		case 83:
			document.getElementById("mscr").checked = true;
			SetMode(1);
			proll.SetCursor();
			break;
		case 69:
			document.getElementById("medit").checked = true;
			SetMode(2);
			proll.SetCursor();
			break;
	}
}
function GetFocus(elm) {
	currentfocus = elm;
}
function RelFocus(elm) {
	currentfocus = null;
}
function MouseDown(e) {
	getxy(e);
	proll.MouseDown(mousex,	mousey);
	canvas.focus();
	return false;
}
function MouseDownr(e) {
	getxy(e);
	hittest=0x900000;
	proll.mousexorg=mousexr;
	proll.mouseyorg=mouseyr;
	proll.offxorg=proll.offx;
	proll.offtiorg=proll.offti;
	proll.offyorg=proll.trk.offy;
	canvasruler.focus();
	return false;
}
function MouseMove(e) {
	getxy(e);
	if(hittest==0x900000) {
		var p=proll.offtiorg+(mousexr-proll.mousexorg)*song.tickmax/300;
		proll.trk.offy=proll.offyorg+(mouseyr-proll.mouseyorg);
		proll.Locate(p);
	}
	else {
		hittest=proll.HitTest(mousex,mousey);
		proll.MouseMove(mousex,mousey);
	}
}
function MouseUp(e) {
	hittest=0;
	getxy(e);
	proll.MouseUp(mousex, mousey);
}
function Draw() {
	song.Draw();
	proll.Draw();
}
function SetMode(n) {
	mode = n;
}
function SetGrid(n) {
	grid = parseInt(n);
}
function SelInst(n) {
	for(var i=1; i<=4; ++i) {
		var btn = document.getElementById("instbtn"+i);
		var sy = document.getElementById("inst"+i);
		if((n+1) == i) {
			btn.style.background = colFocus;
			sy.style.height = "880px";
		}
		else {
			btn.style.background = colFace;
			sy.style.height = "0px";
		}
	}
}
function SelTrackInst(t) {
	var n = document.getElementById("trk"+t+"inst").selectedIndex;
	document.getElementById("instbtn"+(n+1)).checked = true;
	song.track[t].SelInst(n);
	SelInst(n);
}
function SelCh(t) {
	var n = document.getElementById("trk"+t+"ch").selectedIndex;
	song.track[t].SelCh(n);
}
function SetPg(t) {
	var v;
	var p = document.getElementById("trk"+t+"pg").value;
	if(p=="")
		v=-1;
	else
		v=parseInt(p)-1;
	var f = false;
	var len = song.track[t].ev.length;
	for(var i=0; i<len; ++i) {
		var ev = song.track[t].ev[i];
		if(ev[0]>0 && ev[2]==0xc0 && ev[5]) {
			if (v >= 0)
				ev[3] = v;
			f = true;
		}
	}
	if(!f) {
		song.track[t].DelArea(0, 1, 0xc0, 0, 128);
		song.track[t].pg = v;
		if(v>=0)
			song.track[t].ev.unshift([0, 0, 0xc0, v, 0, 0]);
	}
	proll.Draw();
}
function SetXZoom(n) {
	proll.xzoomind=n;
	proll.xzoom=n/480;
	proll.Draw();
}
function XZoomInOut(n) {
	if(n<0)
		proll.xzoomind>>=-n;
	else
		proll.xzoomind<<=n;
	if(proll.xzoomind>128)
		proll.xzoomind=128;
	if(proll.xzoomind<2)
		proll.xzoomind=2;
	document.getElementById("x"+proll.xzoomind).checked=true;
	SetXZoom(proll.xzoomind);
}
function SetBpm(e) {
	var kc = 0;
	if (e) {
		kc = e.keyCode;
	}
	if(kc==0x0d) {
		var v = parseInt(document.getElementById("bpm").value);
		var f = false;
		if(v>=10 && v<300) {
			var len = song.track[0].ev.length;
			for(var i=0; i<len; ++i) {
				var ev = song.track[0].ev[i];
				if(ev[0]>0 && ev[2]==0xff51 && ev[5]) {
					ev[3] = v;
					f = true;
				}
			}
			if(!f) {
				song.track[0].DelArea(0, 1, 0xff51, 0, 1000);
				song.track[0].ev.push([0, 0, 0xff51, v, 0, 0]);
				song.track[0].Sort();
				song.inibpm = song.bpm = v;
			}
			proll.Draw();
		}
	}
}
function SelTrk(n) {
	song.SelTrk(n);
}
function MakeB64(s,mode) {
	function b64ToX(x) {
		if(mode)
			return "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"[x&0x3f];
		else
			return "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[x&0x3f];
	}
	function b64Add1(x) {
		b64b[b64c] = x;
		if (++b64c >= 3) {
			b64c = 0;
			b64uri += (b64ToX(b64b[0]>>2) + b64ToX((b64b[0]<<4) + ((b64b[1]>>4) & 0xf)) + b64ToX((b64b[1]<<2) + ((b64b[2]>>6) & 0x3)) + b64ToX(b64b[2]));
		}
	}
	var b64b = new Array(0, 0, 0);
	var b64uri = "";
	var b64c = 0;
	for(var i=0; i<s.length; ++i)
		b64Add1(s.charCodeAt(i));
	if(mode) {
		switch (b64c) {
			case 1:
				b64uri += (b64ToX(b64b[0]>>2) + b64ToX(b64b[0]<<4));
				break;
			case 2:
				b64uri += (b64ToX(b64b[0]>>2) + b64ToX((b64b[0]<<4) + ((b64b[1]>>4) & 0xf)) + b64ToX(b64b[1]<<2));
				break;
		}
	}
	else {
		switch(b64c) {
			case 1:
				b64uri += (b64ToX(b64b[0]>>2) + b64ToX(b64b[0]<<4) + "==");
				break;
			case 2:
				b64uri += (b64ToX(b64b[0]>>2) + b64ToX((b64b[0]<<4) + ((b64b[1]>>4)&0xf)) + b64ToX(b64b[1]<<2) + "=");
				break;
		}
	}
	return b64uri;
}
function DecB64(s) {
	var len = s.length;
	var bin = "";
	var a1, a2, a3, a4;
	var ToB = function(x) {
		if(x>=0x41 && x<=0x5a)
			return x-0x41;
		if(x>=0x61 && x<=0x7a)
			return x-0x61+26;
		if(x>=0x30 && x<=0x39)
			return x-0x30+52;
		if(x==0x2b || x==0x2d)
			return 62;
		if(x==0x2f || x==0x5f)
			return 63;
		if(x==0x3d)
			return -1;
		return 0;
	}
	for(var i=0; i+3<len; i+=4) {
		a1 = ToB(s.charCodeAt(i));
		a2 = ToB(s.charCodeAt(i+1));
		a3 = ToB(s.charCodeAt(i+2));
		a4 = ToB(s.charCodeAt(i+3));
		if(a4<0)
			break;
		bin += String.fromCharCode((a1 << 2) + (a2 >> 4), ((a2 & 0xf) << 4) + ((a3 & 0x3c) >> 2), ((a3 & 0x3) << 6) + a4);
	}
	if(len==i+2 || a3<0) {
		a1 = ToB(s.charCodeAt(i));
		a2 = ToB(s.charCodeAt(i+1));
		bin += String.fromCharCode((a1 << 2) + (a2 >> 4));
	}
	else if(len==i+3 || a4<0) {
		a1 = ToB(s.charCodeAt(i));
		a2 = ToB(s.charCodeAt(i+1));
		a3 = ToB(s.charCodeAt(i+2));
		bin += String.fromCharCode((a1 << 2) + (a2 >> 4), ((a2 & 0xf) << 4)	+ ((a3 & 0x3c) >> 2));
	}
	return bin;
}
function NewFile() {
	if(!window.confirm("New File?"))
		return;
	song.Stop();
	song.New(4);
	song.Draw();
	proll.SelTrk(1);
	SelTrk(1);
	document.getElementById("stop").checked=true;
}
function SaveFile()	{
	synths.ReqPatch();
	savefiletimerid=setInterval(SaveFileTimer, 100);
}
function SaveFileTimer() {
	for(var i=0; i<4; ++i) {
		if(synths.sy[i] && synths.linklv[i] && synths.patchready[i]==false)
			return;
	}
	clearInterval(savefiletimerid);

	var trk;
	var obj = "MThd\x00\x00\x00\x06\x00\x01";
	function Put2(v) {
		return String.fromCharCode((v>>8)&0xff, v&0xff);
	}
	function Put3(v) {
		return String.fromCharCode((v>>16)&0xff, (v>>8)&0xff, v&0xff);
	}
	function Put4(v) {
		return String.fromCharCode((v>>24)&0xff, (v>>16)&0xff, (v>>8)&0xff, v&0xff);
	}
	function PutDelta(d) {
		if(d<=0x7f) {
			return String.fromCharCode(d);
		}
		if(d<=0x3fff) {
			return String.fromCharCode(((d >> 7) & 0x7f) | 0x80, d & 0x7f);
		}
		if(d<=0x1fffff) {
			return String.fromCharCode(((d>>14)&0x7f)|0x80, ((d>>7)&0x7f)|0x80, d&0x7f);
		}
		return String.fromCharCode(((d>>21)&0x7f)|0x80, ((d>>14)&0x7f)|0x80, ((d>>7)&0x7f)|0x80, d&0x7f);
	}
	function PutNote(t, ch, note, velo) {
		return PutDelta(t) + String.fromCharCode(ch+0x90, note, velo);
	}
	function PutCC(t, ch, cc, val) {
		return PutDelta(t) + String.fromCharCode(ch+0xb0, cc, val);
	}
	function PutBend(t, ch, val) {
		var v1 = (val>>7)&0x7f;
		var v2 = val&0x7f;
		return PutDelta(t) + String.fromCharCode(ch+0xe0, v2, v1);
	}
	function PutPg(t,ch,val) {
		return PutDelta(t) + String.fromCharCode(ch+0xc0, val);
	}
	function PutDevice(t, s) {
		return PutDelta(t) + "\xff\x09" + PutDelta(s.length) + s;
	}
	function PutText(t, s) {
		return PutDelta(t) + "\xff\x01" + PutDelta(s.length) + s;
	}
	function PutTempo(t, v) {
		return PutDelta(t) + "\xff\x51\x03" + Put3(60000000 / v);
	}
	function Sortfnc(a, b) {
		return a[0]-b[0];
	}
	obj+= Put2(song.numtrk);
	obj+=Put2(480);
	var trk = "";
	var tit = document.getElementById("title").value;
	if (tit.length)	{
		trk+= "\x00\xff\x03";
		trk+= String.fromCharCode(tit.length);
		trk+= tit;
	}
	var copy = document.getElementById("copy").value;
	if (copy.length) {
		trk+= "\x00\xff\x02";
		trk+= String.fromCharCode(copy.length);
		trk+= copy;
	}
	var tex = document.getElementById("tex").value;
	if (tex.length)	{
		trk+= "\x00\xff\x01";
		trk+= String.fromCharCode(tex.length);
		trk+= tex;
	}
	trk += "\x00\xff\x58\x04";
	trk += String.fromCharCode(song.nume);
	trk += String.fromCharCode(Math.floor(Math.log(song.denom) / Math.log(2)));
	trk += "\x18\x08";
	for(var i=0; i<4; ++i) {
		var url=document.getElementById("url" + (i+1)).value;
		trk += PutDevice(0, "url=" + (i+1) + "," + url + ","+synths.patch[i]);
	}
	trk+= PutText(0, "cursor=" + song.markstart + "," + song.markend);
	for(var i=0; i<song.numtrk; ++i) {
		var tick = 0;
		var delta;
		var ch;
		if(i==0) {
			ch=0;
		}
		else {
			trk="";
			ch = document.getElementById("trk" + i + "ch").selectedIndex;
			var sy = document.getElementById("trk" + i + "inst").selectedIndex;
			var url = document.getElementById("url" + (sy + 1)).value;
			trk += PutDevice(0, "url("+(sy+1)+")");
		}
		var notetable = new Array();
		var ev = song.track[i].ev;
		for(var j=0; j<ev.length; ++j) {
			while(notetable.length && notetable[0][0]<=ev[j][0]) {
				trk += PutNote(notetable[0][0] - tick, ch, notetable[0][1], 0);
				tick = notetable[0][0];
				notetable.splice(0, 1);
			}
			if(ev[j][2]==0x90) {
				notetable.push([ev[j][0]+ev[j][1], ev[j][3]]);
				notetable.sort(Sortfnc);
				trk += PutNote(ev[j][0]-tick, ch, ev[j][3], ev[j][4]);
			}
			if(ev[j][2]==0xb0) {
				trk += PutCC(ev[j][0]-tick, ch, ev[j][3], ev[j][4]);
			}
			if(ev[j][2]==0xc0) {
				trk += PutPg(ev[j][0]-tick, ch, ev[j][3]);
			}
			if(ev[j][2]==0xe0) {
				trk += PutBend(ev[j][0]-tick, ch, ev[j][3]);
			}
			if(ev[j][2]==0xff51) {
				trk += PutTempo(ev[j][0]-tick, ev[j][3]);
			}
			tick=ev[j][0];
		}
		while (notetable.length) {
			trk += PutNote(notetable[0][0] - tick, ch, notetable[0][1], 0);
			tick = notetable[0][0];
			notetable.splice(0, 1);
		}
		trk += "\x00\xff\x2f\x00";
		obj += "MTrk";
		obj += Put4(trk.length);
		obj += trk;
	}
	var name = document.getElementById("title").value;
	if(name == "")
		name = "untitled.mid";
	else
		name += ".mid";

	var b64 = MakeB64(obj,0);
	document.getElementById("saved").style.display="inline";
	var link = document.getElementById("savedfile");
	link.download = name;
	link.href = "data:audio/midi;base64," + b64;
	link.innerHTML = "SAVED-FILE";
	var urllink = document.getElementById("savedurl");
	var ap="";
	if(document.getElementById("autoplay").checked)
		ap="p=1&";
	urllink.href = "http://" + location.host + location.pathname + "?" + ap + "d=" + MakeB64(obj, 1);
	urllink.innerHTML = "SAVED-URL";
}
function LoadExec(s) {
	var datalen = 0;
	var datastart = 0;
	var runst = 0x90;
	var notetab = new Array();
	song.tickmax=0;
	function Get2(s, i) {
		return (s.charCodeAt(i)<<8) + s.charCodeAt(i+1);
	}
	function Get3(s, i) {
		return (s.charCodeAt(i)<<16) + (s.charCodeAt(i+1)<<8) + s.charCodeAt(i+2);
	}
	function Get4(s, i) {
		return (s.charCodeAt(i)<<24) + (s.charCodeAt(i+1)<<16) + (s.charCodeAt(i+2)<<8) + s.charCodeAt(i+3);
	}
	function GetStr(s, i, len) {
		return s.slice(i, i+len);
	}
	function Delta(s, i) {
		var v, d;
		v = 0;
		datalen = 1;
		while((d = s.charCodeAt(i)) & 0x80) {
			v = (v<<7) + (d&0x7f);
			++datalen;
			++i;
		}
		return (v<<7)+d;
	}
	function Event(tr, ti, s, i) {
		var v = s.charCodeAt(i);
		datalen = 1;
		if((v&0x80) == 0) {
			v = runst;
			datalen = 0;
		}
		runst = v;
		if(tr<0) {
			if(v==0xff)
				tr = 1;
			else
				tr = (v&0xf)+1;
		}
		switch(v&0xf0) {
			case 0x80:
				var note = s.charCodeAt(i+datalen);
				for(var i=notetab.length-1; i>=0; --i) {
					var j = notetab[i][0];
					if(notetab[i][2] == note) {
						var du = ti - song.track[j].ev[notetab[i][1]][0];
						song.track[j].ev[notetab[i][1]][1] = du;
						notetab.splice(i, 1);
					}
				}
				datalen+=2;
				break;
			case 0x90:
				var velo = s.charCodeAt(i+datalen+1);
				var note = s.charCodeAt(i+datalen);
				if(velo>0) {
					if(song.track[tr].ch<0) {
						song.track[tr].ch = v&0xf;
					}
					notetab.push([tr, song.track[tr].ev.length, note]);
					song.track[tr].ev.push([ti, 240, 0x90, note, velo, 0]);
				}
				else {
					for(var i=notetab.length-1; i>=0; --i) {
						var j=notetab[i][0];
						if (notetab[i][2] == note) {
							song.track[j].ev[notetab[i][1]][1] = ti-song.track[j].ev[notetab[i][1]][0];
							notetab.splice(i, 1);
						}
					}
				}
				datalen += 2;
				break;
			case 0xa0:
				datalen += 2;
				break;
			case 0xb0:
				song.track[tr].ev.push([ti, 0, 0xb0, s.charCodeAt(i+datalen), s.charCodeAt(i+datalen+1), 0]);
				datalen += 2;
				break;
			case 0xc0:
				if(ti==0)
					song.track[tr].pg = s.charCodeAt(i + datalen);
				song.track[tr].ev.push([ti, 0, 0xc0, s.charCodeAt(i+datalen), 0, 0]);
				datalen+=1;
				break;
			case 0xd0:
				datalen+=1;
				break;
			case 0xe0:
				var val = s.charCodeAt(i+datalen) + (s.charCodeAt(i+datalen+1)<<7);
				song.track[tr].ev.push([ti,	0, 0xe0, val, 0, 0]);
				datalen+=2;
				break;
			case 0xf0:
				switch(v) {
					case 0xff:
						var len = Delta(s, i + 2);
						datastart = 2+datalen;
						datalen = len+datalen+2;
						switch(s.charCodeAt(i+1)) {
							case 0x01:
								if(tr==1 && ti==0) {
									var str = GetStr(s, i+datastart, datalen-3);
									if(str.indexOf("cursor=") == 0) {
										var m = str.substring(7).split(",");
										song.markstart = parseInt(m[0]);
										song.markend = parseInt(m[1]);
									}
									else
										document.getElementById("tex").value = GetStr(s, i + datastart, datalen - 3);
								}
								break;
							case 0x02:
								if(tr==1 && ti==0)
									document.getElementById("copy").value = GetStr(s, i + datastart, datalen - 3);
								break;
							case 0x03:
								if(tr==1 && ti==0)
									document.getElementById("title").value = GetStr(s, i + datastart, datalen - 3);
								break;
							case 0x09:
								var s = GetStr(s, i + datastart, datalen - datastart);
								var s1 = s.indexOf("url=");
								if(s1 == 0) {
									var ss = s.substring(4).split(",");
									var sy = parseInt(ss[0]) - 1;
									song.track[tr].sy = sy;
									if(ss.length>1)
										document.getElementById("url"+(sy+1)).value= ss[1];
									if(ss.length>2)
										synths.patch[sy] = ss[2];
									break;
								}
								s1 = s.indexOf("url(");
								s2 = s.indexOf(")");
								if(s1==0 && s2>0) {
									var ss = s.substring(4, s2).split(",");
									var sy = parseInt(ss[0]) - 1;
									song.track[tr].sy = sy;
									if (ss.length > 1)
										document.getElementById("url"+(sy+1)).value = ss[1];
								}
								break;
							case 0x2f:
								song.track[tr].tickmax=ti;
								return 1;
							case 0x51:
								var val = Math.floor(60000000 / Get3(s, i + 3));
								song.track[0].ev.push([ti, 0, 0xff51, val, 0, 0]);
								break;
							case 0x58:
								if(tr==1 && ti==0) {
									song.nume = s.charCodeAt(i+3);
									song.denom = Math.pow(2, s.charCodeAt(i+4));
									song.beat1=1920/song.denom;
									song.beat=song.beat1*song.nume;
									document.getElementById("sign").value = song.nume+"/"+song.denom;
								}
								break;
							case 0x59:
								if(tr==1 && ti==0) {
									var m = s.charCodeAt(i + 4);
									var n = s.charCodeAt(i + 3);
									if (n >= 0x80)
										n -= 256;
									n = (n+7)&0xf;
									if(m==0)
										document.getElementById("key").value = ["Cb", "Gb", "Db", "Ab", "Eb", "Bb", "F", "C", "G", "D", "A", "E", "B", "F#", "C#"][n]+" Major";
									else
										document.getElementById("key").value = ["Ab", "Eb", "Bb", "F", "C", "G", "D", "A", "E", "B", "F#", "C#", "G#", "D#", "A#"][n]+" Minor";
								}
								break;
						}
						break;
				}
				break;
		}
		song.track[tr].tickmax=ti;
		return 0;
	}
	var idx = 0;
	var hd = s.slice(0,	4);
	if(hd!="MThd")
		return;
	var len = Get4(s, 4);
	var fmt = Get2(s, 8);
	var numtrk = Get2(s, 10) + 1;
	var tb = Get2(s, 12);
	idx = (len + 8);
	if(fmt== 0) {
		song.New(17);
		for(var i=1; i<17; ++i)
			song.track[i].ch = -1;
	}
	else {
		song.New(numtrk);
		for(var i=1; i<numtrk; ++i)
			song.track[i].ch = -1;
	}
	song.markstart = song.markend = -1;
	for(trk=1; trk<numtrk; ++trk) {
		hd=s.slice(idx, idx+4);
		len=Get4(s, idx+4);
		if(hd=="MTrk") {
			var tick = 0;
			var j = 0;
			notetab.length = 0;
			for(;;) {
				tick += Delta(s, idx + 8 + j);
				j += datalen;
				var e;
				if(fmt==0)
					e = Event(-1, Math.floor(tick / tb * 480), s, idx + 8 + j);
				else
					e = Event(trk, Math.floor(tick / tb * 480), s, idx + 8 + j);
				j += datalen;
				if(e)
					break;
			}
			tick=Math.floor(tick / tb * 480);
			if(tick>song.tickmax)
				song.tickmax=tick;
		}
		idx += (len+8);
	}
	for(var i=song.track.length-1;i>0;--i) {
		if(song.track[i].ev.length==0) {
			song.track.splice(i, 1);
			song.numtrk--;
		}
	}
	if(fmt>0) {
		if(song.track.length>17) {
			aleart("Number of track = ["+(song.track.length-1)+"]\nIgnored over 16th track.");
			for(var i=song.track.length-1;i>16;--i) {
				song.track.splice(i, 1);
				song.numtrk--;
			}
		}
		for(var i=0; i<song.track.length; ++i) {
			song.track[i].tr=i;
			if(song.track[i].ch < 0)
				song.track[i].ch = 0;
		}

	}
	if(song.track[0].ev.length==0 || song.track[0].ev[0][0]!=0) {
		song.track[0].ev.unshift([0, 0, 0xff51, 120, 0, 0]);
		song.track[0].Sort();
	}
	var lastti=-1;
	for(var i=song.track[0].ev.length-1;i>=0;--i) {
		var ev=song.track[0].ev[i];
		if(ev[0]==lastti)
			song.track[0].ev.splice(i,1);
		lastti=ev[0];
	}
	for(var j=1;j<song.numtrk;++j) {
		var lasttic0=-1;
		var lasttie0=-1;
		var lasttib01=-1;
		var lasttib07=-1;
		var lasttib010=-1;
		for(var i=song.track[j].ev.length-1;i>=0;--i) {
			var ev=song.track[j].ev[i];
			if(ev[2]==0xb0) {
				if(ev[3]==1) {
					if(ev[0]==lasttib01)
						song.track[j].ev.splice(i,1);
					lasttib01=ev[0];
				}
				if(ev[3]==7) {
					if(ev[0]==lasttib07)
						song.track[j].ev.splice(i,1);
					lasttib07=ev[0];
				}
				if(ev[3]==10) {
					if(ev[0]==lasttib010)
						song.track[j].ev.splice(i,1);
					lasttib010=ev[0];
				}
			}
			if(ev[2]==0xc0) {
				if(ev[0]==lasttic0)
					song.track[j].ev.splice(i,1);
				lasttic0=ev[0];
			}
			if(ev[2]==0xe0) {
				if(ev[0]==lasttie0)
					song.track[j].ev.splice(i,1);
				lasttie0=ev[0];
			}
		}
	}
	song.inibpm=song.bpm=song.track[0].ev[0][3];
	if(song.markstart<0)
		song.markstart = 0;
	if(song.markend<0)
		song.markend = Math.floor(song.tickmax);
	if(song.numtrk>1)
		SelTrk(1);
	song.Draw();
	proll.Draw();
	AddSynth(0, document.getElementById('url1').value, 'sy1');
	AddSynth(1, document.getElementById('url2').value, 'sy2');
	AddSynth(2, document.getElementById('url3').value, 'sy3');
	AddSynth(3, document.getElementById('url4').value, 'sy4');
	for(var i=0; i<4; ++i) {
		if(synths.patch[i]=="")
			synths.patchready[i] = true;
		else
			synths.patchready[i] = false;
	}
	setuptimerid = setInterval(SetupPreset,500);
}
function SetupPreset() {
	var cnt = 0;
	for(var i=0; i<4; ++i) {
		if(synths.patchready[i]==false && synths.linklv[i]>=1) {
			midiif.SetPatch(synths.sy[i], synths.patch[i]);
			synths.patchready[i] = true;
		}
		if(synths.patchready[i])
			++cnt;
	}
	if(cnt==4)
		clearInterval(setuptimerid);
}
function LoadClick() {
	var btn = document.getElementById("file");
	if (btn.click)
		btn.click();
	else {
		var ev = document.createEvent("MouseEvents");
		ev.initMouseEvent("click", true, true, window, 0, 0, 0,	0, 0, false, false, false, false, 0, null);
		btn.dispatchEvent(ev);
	}
}
function LoadFile() {
	song.Stop();
	document.getElementById("stop").checked=true;
	var fd = document.getElementById("file").files[0];
	var reader = new FileReader();
	reader.onload = function(ev) {
		var s = ev.target.result;
		LoadExec(s);
		song.UpdateOverview();
		song.Dump();
	}
	reader.readAsBinaryString(fd);
}
function SetSign(s) {
	var b = s.split("/");
	var nume = parseInt(b[0]);
	var denom = parseInt(b[1]);
	if(nume>=0 && (denom==1 || denom==2 || denom==4 || denom==8 || denom==16 || denom== 32)) {
		song.nume = nume;
		song.denom = denom;
		song.beat1=1920/song.denom;
		song.beat2=song.beat1*song.nume;
		proll.Draw();
	}
}
function SetMute() {
	var cnt = 0;
	for(var i=1; i<song.numtrk; ++i) {
		if(document.getElementById("trk"+i+"solo").checked) {
			song.track[i].mute = false;
			cnt++;
		}
		else
			song.track[i].mute = true;
	}
	if(cnt==0) {
		for(var i=1; i<song.numtrk; ++i) {
			if(document.getElementById("trk"+i+"mute").checked)
				song.track[i].mute = true;
			else
				song.track[i].mute = false;
		}
	}
}
function SetOpt(n) {
	proll.opt=n;
	proll.Draw();
}
function DragStart(e) {
	var n = parseInt(e.target.id.substring(3));
	SelTrk(n);
	dragrow = e.target.id;
	e.dataTransfer.setData("id", n);
}
function DragEnter(e) {
	return true;
}
function Drop(e) {
	var from = parseInt(e.dataTransfer.getData("id"));
	var to = parseInt(e.target.id.substring(3));
	if(from>=0 && from<song.numtrk && to>=0 && to<song.numtrk) {
		song.MoveTrk(from, to);
	}
}
function DragOver(e) {
	e.preventDefault();
}
function DragEnd(e)	{
	e.preventDefault();
}
function DropFile(e) {
	song.Stop();
	document.getElementById("stop").checked=true;
	var fd = e.dataTransfer.files[0];
	var reader = new FileReader();
	reader.onload = function(ev) {
		var s = ev.target.result;
		LoadExec(s);
		song.UpdateOverview();
		song.Dump();
	}
	reader.readAsBinaryString(fd);
	e.preventDefault();
}
function GetUA() {
	var os = "other";
	var br = "other";
	var s = window.navigator.userAgent.toLowerCase();
	if(s.indexOf("win")>=0) os = "win";
	else if(s.indexOf("mac")>=0) os = "mac";
	if(s.indexOf("chrome")>=0) br = "ch";
	else if(s.indexOf("safari")>=0) br = "sa";
	else if(s.indexOf("firefox")>=0) br = "ff";
	ua = os+"-"+br;
}
function UnloadConfirm() {
	return false;
}
function App() {
	GetUA();
	document.getElementById("msel").checked=true;
	document.getElementById("instbtn1").checked=true;
	document.getElementById("grid16").selected=true;
	document.getElementById("guidesw").checked=true;
	document.getElementById("x32").checked=true;
	document.getElementById("stop").checked=true;
	document.getElementById("evlistsw").checked=false;
	canvas=document.getElementById("canvas");
	canvas.onmousedown=MouseDown;
	canvasruler=document.getElementById("Ruler");
	ctxruler=canvasruler.getContext("2d");
	canvasruler.onmousedown=MouseDownr;
	document.onmouseup = MouseUp;
	document.onmousemove = MouseMove;
	document.onkeydown = KeyDown;
	for(var i=0; i<16; ++i) {
		var r = document.getElementById("row"+(i+1));
		r.addEventListener("dragstart", DragStart, true);
		r.addEventListener("dragenter", DragEnter, true);
		r.addEventListener("dragover", DragOver, true);
		r.addEventListener("drop", Drop, true);
		r.addEventListener("dragend", DragEnd, true);
	}
	ctx=canvas.getContext("2d");
	synths = new Synths();
	song = new Song();
	setInterval(song.DrawMeter,70);
	proll = new Pianoroll();
	proll.SelTrk(0);
	proll.Draw();
	if(unloadconfirm)
		window.onbeforeunload=UnloadConfirm;
	window.addEventListener("dragover", function(e){e.preventDefault();}, false);
	window.addEventListener("resize",function(e) {proll.Resize();},false);
	window.addEventListener("DOMMouseScroll",proll.Wheel,false);
	window.addEventListener("mousewheel",proll.Wheel,false);
	document.body.addEventListener("drop", DropFile, true);
	this.api = 2;
	if (typeof (webkitAudioContext)!="undefined"){		// Web Audio API
		this.api = 0;
	}
	else if(typeof(Audio)=="function") {
		var audio = new Audio();
		if(typeof (audio.mozSetup)== "function") {		// Audio Data API
			this.api = 1;
		}
	}
	AddSynthList();
}
function AddSynth(i, url, frame) {
	for(var j=0; j<synthlist_table.length; ++j) {
		if(synthlist_table[j].url == url) {
			var l=synthlist_table[j].latency[ua];
			if(l == undefined)
				l =synthlist_table[j].latency["*-*"];
			document.getElementById("latency"+(i+1)).value = l;
		}
	}
	var l = document.getElementById("latency"+(i+1)).value;
	synths.Add(i, url, frame, l);
	SetLatency(i);
	document.getElementById("linklv"+(i+1)).innerHTML = "0";
}
function SetLatency(i) {
	var l = document.getElementById("latency"+(i+1)).value;
	if(synths.sy[i]!=null)
		synths.latency[i] = l;
	var	lmax = 0;
	for(var j=0; j<synths.sy.length; ++j) {
		if(synths.sy[j])
			lmax = Math.max(lmax, synths.latency[i]);
	}
	synths.maxlatency = lmax;
}
function SetTimeReso() {
	timereso = parseInt(document.getElementById("timereso").value);
}
function SetGuide() {
	song.guide=document.getElementById("guidesw").checked;
}
function SetEvList() {
	song.evlist=document.getElementById("evlistsw").checked;
	document.getElementById("EvList").style.display=song.evlist?"block":"none";
	if(song.evlist)
		song.Dump();
}
function MidiInHandler(ev) {
	song.RecEv(ev.data);
	switch(ev.data[0]&0xf0) {
	case 0x80:
		midiif.NoteOnDirect(proll.trk.sy, proll.trk.ch, ev.data[1], 0);
		break;
	case 0x90:
		midiif.NoteOnDirect(proll.trk.sy, proll.trk.ch, ev.data[1], ev.data[2]);
		proll.trk.level=ev.data[2];
		break;
	case 0xb0:
		midiif.SendMsgDirect(proll.trk.sy,"midi,b"+proll.trk.ch.toString(16)+","+ev.data[1].toString(16)+","+ev.data[2].toString(16));
		break;
	case 0xe0:
		midiif.SendMsgDirect(proll.trk.sy,"midi,e"+proll.trk.ch.toString(16)+","+ev.data[1].toString(16)+","+ev.data[2].toString(16));
		break;
	}
}
function SelMidiDev(i) {
	if(midiincur>=0)
		midiindevs[midiincur].removeEventListener("midimessage",MidiInHandler,true);
	midiincur=-1;
	if(i) {
		midiindevs[i-1].addEventListener("midimessage",MidiInHandler,true);
		midiincur=i-1;
	}
}
function onMIDISuccess(ma) {
	midiaccess=ma;
	midiindevs=new Array();
	var i=0;
	var it=ma.inputs.values();
	for(var p=it.next();!p.done;p=it.next()){
		document.getElementById("mididev").options[i+1]=new Option(p.value.name);
		midiindevs[i]=p.value;
		++i;
	}
}
function onMIDIFailure(ma) {
	alert("MIDI device is not available.\nJazz-plugin should be installed.");
}
function InitMidi() {
	navigator.requestMIDIAccess().then(onMIDISuccess,onMIDIFailure);
}
function Init() {
	var load=0;
	midiif = new WebMidiLink();
	app = new App();
	ShowDoc(GetLang());
	if(location.search.length>1) {
		var params = location.search.substring(1).split('&');
		for(var i=0; i<params.length; ++i) {
			var e = params[i].split('=');
			if(e[0]==="d") {
				LoadExec(DecB64(e[1]));
				proll.Resize();
				song.UpdateOverview();
				song.Dump();
				load=1;
			}
			if(e[0]==="p"||e[0]==="play") {
				if(e[1]==="1" || e[1]==="true")
				autoplay=1;
			}
		}
	}
	if(load==0) {
		LoadExec(demo);
		proll.Resize();
		song.UpdateOverview();
		song.Dump();
	}
	if(autoplay) {

		setTimeout("document.getElementById('play').checked=true;song.Play()",1500);
	}
}
//-----------------
function ShowDoc(lang) {
	if(lang=="ja") {
		document.getElementById("doc_ja").style.display = "block";
		document.getElementById("doc_en").style.display = "none";
	}
	else {
		document.getElementById("doc_ja").style.display = "none";
		document.getElementById("doc_en").style.display = "block";
	}
}
function GetLang() {
	return (navigator.language || navigator.browserLanguage).substring(0, 2);
}
