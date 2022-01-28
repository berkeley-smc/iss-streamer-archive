const fs = require('fs');
const process = require('process');
// TODO: Extract to web server.
const http = require('http');

const ls = require('lightstreamer-client-node');
const Sentry = require("@sentry/node");
const redis = require('redis');

const SENTRY_DSN = process.env['SENTRY_DSN'];
const REDIS_URL = process.env['REDIS_URL'];

// Error monitoring.
if (SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,
  });
}

const lsClient = new ls.LightstreamerClient(
  "https://push.lightstreamer.com",
  "ISSLIVE"
);

lsClient.connectionOptions.setSlowingEnabled(false);

var sub = new ls.Subscription(
  "MERGE",
  [
    "AIRLOCK000001",
    "AIRLOCK000002",
    "AIRLOCK000003",
    "AIRLOCK000004",
    "AIRLOCK000005",
    "AIRLOCK000006",
    "AIRLOCK000007",
    "AIRLOCK000008",
    "AIRLOCK000009",
    "AIRLOCK000010",
    "AIRLOCK000011",
    "AIRLOCK000012",
    "AIRLOCK000013",
    "AIRLOCK000014",
    "AIRLOCK000015",
    "AIRLOCK000016",
    "AIRLOCK000017",
    "AIRLOCK000018",
    "AIRLOCK000019",
    "AIRLOCK000020",
    "AIRLOCK000021",
    "AIRLOCK000022",
    "AIRLOCK000023",
    "AIRLOCK000024",
    "AIRLOCK000025",
    "AIRLOCK000026",
    "AIRLOCK000027",
    "AIRLOCK000028",
    "AIRLOCK000029",
    "AIRLOCK000030",
    "AIRLOCK000031",
    "AIRLOCK000032",
    "AIRLOCK000033",
    "AIRLOCK000034",
    "AIRLOCK000035",
    "AIRLOCK000036",
    "AIRLOCK000037",
    "AIRLOCK000038",
    "AIRLOCK000039",
    "AIRLOCK000040",
    "AIRLOCK000041",
    "AIRLOCK000042",
    "AIRLOCK000043",
    "AIRLOCK000044",
    "AIRLOCK000045",
    "AIRLOCK000046",
    "AIRLOCK000047",
    "AIRLOCK000048",
    "AIRLOCK000049",
    "AIRLOCK000050",
    "AIRLOCK000051",
    "AIRLOCK000052",
    "AIRLOCK000053",
    "AIRLOCK000054",
    "AIRLOCK000055",
    "AIRLOCK000056",
    "AIRLOCK000057",
    "NODE2000001",
    "NODE2000002",
    "NODE2000003",
    "NODE2000006",
    "NODE2000007",
    "NODE3000001",
    "NODE3000002",
    "NODE3000003",
    "NODE3000004",
    "NODE3000005",
    "NODE3000006",
    "NODE3000007",
    "NODE3000008",
    "NODE3000009",
    "NODE3000010",
    "NODE3000011",
    "NODE3000012",
    "NODE3000013",
    "NODE3000017",
    "NODE3000018",
    "NODE3000019",
    "USLAB000053",
    "USLAB000054",
    "USLAB000055",
    "USLAB000056",
    "USLAB000057",
    "USLAB000058",
    "USLAB000059",
    "USLAB000060",
    "USLAB000061",
    "USLAB000062",
    "USLAB000063",
    "USLAB000064",
    "USLAB000065",
    "AIRLOCK000058",
    "NODE1000001",
    "NODE1000002",
    "NODE2000004",
    "NODE2000005",
    "NODE3000014",
    "NODE3000015",
    "NODE3000016",
    "NODE3000020",
    "P1000006",
    "P1000008",
    "P1000009",
    "P3000001",
    "P3000002",
    "P4000003",
    "P4000006",
    "P6000003",
    "P6000006",
    "S0000010",
    "S0000011",
    "S0000012",
    "S0000013",
    "S1000006",
    "S1000007",
    "S1000008",
    "S3000001",
    "S3000002",
    "S4000003",
    "S4000006",
    "S6000003",
    "S6000006",
    "USLAB000066",
    "USLAB000067",
    "USLAB000068",
    "USLAB000069",
    "USLAB000070",
    "USLAB000071",
    "USLAB000072",
    "USLAB000073",
    "USLAB000074",
    "USLAB000075",
    "USLAB000076",
    "USLAB000077",
    "USLAB000078",
    "USLAB000079",
    "USLAB000080",
    "P1000001",
    "P1000002",
    "P1000003",
    "P4000001",
    "P4000002",
    "P4000004",
    "P4000005",
    "P4000007",
    "P4000008",
    "P6000001",
    "P6000002",
    "P6000004",
    "P6000005",
    "P6000007",
    "P6000008",
    "S1000001",
    "S1000002",
    "S1000003",
    "S4000001",
    "S4000002",
    "S4000004",
    "S4000005",
    "S4000007",
    "S4000008",
    "S6000001",
    "S6000002",
    "S6000004",
    "S6000005",
    "S6000007",
    "S6000008",
    "P1000004",
    "P1000005",
    "P1000007",
    "S1000004",
    "S1000009",
    "USLAB000088",
    "USLAB000089",
    "USLAB000090",
    "USLAB000091",
    "USLAB000092",
    "USLAB000093",
    "USLAB000094",
    "USLAB000095",
    "USLAB000096",
    "USLAB000097",
    "USLAB000098",
    "USLAB000099",
    "USLAB000100",
    "USLAB000101",
    "Z1000013",
    "Z1000014",
    "Z1000015",
    "S0000001",
    "S0000002",
    "S0000003",
    "S0000004",
    "S0000005",
    "S0000006",
    "S0000007",
    "S0000008",
    "S0000009",
    "USLAB000081",
    "RUSSEG000001",
    "RUSSEG000002",
    "RUSSEG000003",
    "RUSSEG000004",
    "RUSSEG000005",
    "RUSSEG000006",
    "RUSSEG000007",
    "RUSSEG000008",
    "RUSSEG000009",
    "RUSSEG000010",
    "RUSSEG000011",
    "RUSSEG000012",
    "RUSSEG000013",
    "RUSSEG000014",
    "RUSSEG000015",
    "RUSSEG000016",
    "RUSSEG000017",
    "RUSSEG000018",
    "RUSSEG000019",
    "RUSSEG000020",
    "RUSSEG000021",
    "RUSSEG000022",
    "RUSSEG000023",
    "RUSSEG000024",
    "S1000005",
    "USLAB000001",
    "USLAB000002",
    "USLAB000003",
    "USLAB000004",
    "USLAB000005",
    "USLAB000006",
    "USLAB000007",
    "USLAB000008",
    "USLAB000009",
    "USLAB000011",
    "USLAB000013",
    "USLAB000014",
    "USLAB000015",
    "USLAB000016",
    "USLAB000017",
    "USLAB000018",
    "USLAB000019",
    "USLAB000020",
    "USLAB000021",
    "USLAB000022",
    "USLAB000023",
    "USLAB000024",
    "USLAB000025",
    "USLAB000026",
    "USLAB000027",
    "USLAB000028",
    "USLAB000029",
    "USLAB000030",
    "USLAB000031",
    "USLAB000038",
    "USLAB000039",
    "USLAB000040",
    "USLAB000041",
    "USLAB000042",
    "USLAB000043",
    "USLAB000044",
    "USLAB000045",
    "USLAB000046",
    "USLAB000047",
    "USLAB000048",
    "USLAB000049",
    "USLAB000050",
    "USLAB000051",
    "USLAB000052",
    "Z1000001",
    "Z1000002",
    "Z1000003",
    "Z1000004",
    "Z1000005",
    "Z1000006",
    "Z1000007",
    "Z1000008",
    "Z1000009",
    "Z1000010",
    "Z1000011",
    "Z1000012",
    "USLAB000010",
    "USLAB000012",
    "RUSSEG000025",
    "USLAB000032",
    "USLAB000033",
    "USLAB000034",
    "USLAB000035",
    "USLAB000036",
    "USLAB000037",
    "USLAB000082",
    "USLAB000083",
    "USLAB000084",
    "USLAB000085",
    "USLAB000087",
    "USLAB000086",
    "USLAB000102",
    "TIME_000001",
    "TIME_000002",
    "CSAMT000001",
    "CSAMT000002",
    "CSASSRMS001",
    "CSASSRMS002",
    "CSASSRMS003",
    "CSASSRMS004",
    "CSASSRMS005",
    "CSASSRMS006",
    "CSASSRMS007",
    "CSASSRMS008",
    "CSASSRMS009",
    "CSASSRMS010",
    "CSASSRMS011",
    "CSASPDM0001",
    "CSASPDM0002",
    "CSASPDM0003",
    "CSASPDM0004",
    "CSASPDM0005",
    "CSASPDM0006",
    "CSASPDM0007",
    "CSASPDM0008",
    "CSASPDM0009",
    "CSASPDM0010",
    "CSASPDM0011",
    "CSASPDM0012",
    "CSASPDM0013",
    "CSASPDM0014",
    "CSASPDM0015",
    "CSASPDM0016",
    "CSASPDM0017",
    "CSASPDM0018",
    "CSASPDM0019",
    "CSASPDM0020",
    "CSASPDM0021",
    "CSASPDM0022",
    "CSAMBS00001",
    "CSAMBS00002",
    "CSAMBA00003",
    "CSAMBA00004",
  ],
  ["TimeStamp", "Value"]
);

var timeSub = new ls.Subscription("MERGE", "TIME_000001", [
  "TimeStamp",
  "Value",
  "Status.Class",
  "Status.Indicator",
]);

lsClient.subscribe(sub);
lsClient.subscribe(timeSub);


// TODO - MB: Cleanup and document.
var AOStimestamp = 0.0;
var AOS;
var difference = 0.0;
var unixtime = new Date().getTime();
var date = new Date(unixtime);
var hours = date.getHours();
var hoursUTC = date.getUTCHours();
var minutes = "0" + date.getMinutes();
var seconds = "0" + date.getSeconds();
console.log("UTC hours " + hoursUTC);
console.log("hours " + hours);
console.log("minutes " + minutes);
var timestmp = new Date().setFullYear(new Date().getFullYear(), 0, 1);
var yearFirstDay = Math.floor(timestmp / 86400000);
var today = Math.ceil(new Date().getTime() / 86400000);
var dayOfYear = today - yearFirstDay;

var timestampnow = dayOfYear * 24 + hoursUTC + minutes / 60 + seconds / 3600;
console.log("timestamp now: " + timestampnow);

lsClient.addListener({
  onStatusChange: (newStatus) => console.log(`ls-client: ${newStatus}`)
});

lsClient.connect();

const redisClient = redis.createClient({
  url: REDIS_URL
});

redisClient.on('error', (err) => console.log('Redis redisClient Error', err));

(async () => {
  await redisClient.connect();

  sub.addListener({
    onSubscription: function () {
      console.log("Subscribed");
    },
    onUnsubscription: function () {
      console.log("Unsubscribed");
    },
    onItemUpdate: async function (update) {
      let PARAMETER = update.getItemName();
      let ROW = `${update.getValue("TimeStamp")} ${update.getValue("Value")}`;
      console.log(PARAMETER, );
      fs.appendFile(
        `data/${PARAMETER}.txt`,
        `${ROW}\n`,
        'utf8',
        () => {}
      );
      await redisClient.RPUSH(PARAMETER, ROW);
    },
  });

  timeSub.addListener({
    onItemUpdate: async function (update) {
      var status = update.getValue("Status.Class");
      AOStimestamp = parseFloat(update.getValue("TimeStamp"));
      difference = timestampnow - AOStimestamp;

      if (status === "24") {
        if (difference > 0.00153680542553047) {
          console.log("Stale Signal!");
          AOS = "Stale Signal";
          AOSnum = 2;
        } else {
          // console.log("Signal Acquired!");
          AOS = "Siqnal Acquired";
          AOSnum = 1;
        }
      } else {
        console.log("Signal Lost!");
        AOS = "Signal Lost";
        AOSnum = 0;
      }
      fs.appendFile(
        "data/AOS.txt",
        `AOS ${update.getValue("TimeStamp")} ${AOSnum}\n`,
        'utf8',
        () => {}
      );
      await redisClient.RPUSH('AOS', `${update.getValue("TimeStamp")} ${AOSnum}`);
    },
  });
})();

///// HEROKU: Spin up a small server and ping it...
const requestListener = function (req, res) {
  res.writeHead(200);
  res.end(`Server is still up: ${new Date().getTime()}`);
};

const port = process.env.PORT || 5000;
const host = 'localhost';
const HEROKU_URL = 'http://smc-data.herokuapp.com/';

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});

setInterval(() => {
  const req = https.get(HEROKU_URL, res => {
    console.log(`statusCode: ${res.statusCode}`)
  });
  req.on('error', error => {
    console.error(error);
    Sentry.captureException(error);
  });
  req.end();
}, 30000);
