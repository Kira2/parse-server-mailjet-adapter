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
      "Recipients": [{"Email": mail.to}]
    }

    // set the subject
    var subject = options.subject;
    data["Subject"] = (subject ? subject : mail.subject);

    // use the template if any, and extract the link to set it
    if (options.templateId) {
      var idx = mail.text.indexOf(options.linkPattern);
      var link = mail.text.substring(idx);

      var variables = { "link_param": link };

      data["MJ-TemplateLanguage"] = "true";
      data["MJ-TemplateErrorReporting"] = options.apiErrorEmail;
      data["Mj-TemplateID"] = options.templateId;
      data["Vars"] = variables;
    }
    else {
      data["Text-part"] = mail.text;
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
