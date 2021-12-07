var ws = require("nodejs-websocket");
const moment = require("moment");

let users: any[] = []; 

function boardcast(obj: any) {
  server.connections.forEach(function(conn: any) {
    conn.sendText(JSON.stringify(obj));
  })
}

function getDate() {
  return moment().format('YYYY-MM-DD HH:mm:ss')
}

var server = ws.createServer(function(conn: any) {
  conn.on("text", function(obj: any) {
    const getTime = new Date().getTime();
    console.log(obj);
    // obj = JSON.parse(obj);
    if (obj.type === 1) {
      users.push({
        nickname: obj.nickname,
      });

      boardcast({
        type: 1,
        msgid: getTime,
        date: getDate(),
        msg: obj.nickname + ' join chat room',
        users: users,
        nickname: obj.nickname
      });
    } else {
      boardcast({
        type: 2,
        msgid: getTime,
        date: getDate(),
        msg: obj.msg,
        users: users,
        nickname: obj.nickname
      });
    }
  })
  
  conn.on("close", function(code: any, reason: any) {
    console.log("關閉連接")
  });
  
  conn.on("error", function(code: any, reason: any) {
    console.log("異常關閉")
  });
}).listen(8001);

console.log("WebSocket建立完畢")