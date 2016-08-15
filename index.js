var Mailjet = require("node-mailjet");

var mailjetAdapter = options => {
  if (!options || !options.apiKey || !options.apiSecret || !options.fromAddress) {
    throw "mailjetAdapter requires an API key, an API secret and a from address.";
  }
  var mailjet = Mailjet.connect(options.apiKey, options.apiSecret);

  var sendMail = mail => {
    var send = mailjet.post("send");

    var data = {
      "FromEmail": options.fromAddress,
      "FromName": options.fromName,
      "Subject": mail.subject,
      "Recipients": [{"Email": mail.to}],
      "Text-part": mail.text
    }

    return new Promise((resolve, reject) => {
      send.request(data).then(resolve).catch(reject);
    });
  }

  return Object.freeze({
    sendMail: sendMail
  });
}

module.exports = mailjetAdapter
