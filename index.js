var Mailjet = require("node-mailjet");

var mailjetAdapter = options => {
  if (!options || !options.apiKey || !options.apiSecret || !options.fromEmail) {
    throw "mailjetAdapter requires an API key, an API secret and a from address.";
  }
  var mailjet = Mailjet.connect(options.apiKey, options.apiSecret);

  /**
   * @function sendPasswordResetEmail
   * @description Sends the link to reset the password
   */
  var sendPasswordResetEmail = mail => {
    var send = mailjet.post("send");

    var data = {
      "FromEmail": options.fromEmail,
      "FromName": options.fromName,
      "Recipients": [{"Email": mail.user.get("email")}]
    }

    // set the subject
    var subject = options.passwordResetSubject;
    data["Subject"] = (subject ? subject : mail.subject);

    // use the template if any, and extract the link to set it
    if (options.passwordResetTemplateId) {
      data["MJ-TemplateLanguage"] = "true";
      data["MJ-TemplateErrorReporting"] = options.apiErrorEmail;
      data["Mj-TemplateID"] = options.passwordResetTemplateId;
      data["Vars"] = {
        "appName": mail.appName,
        "link": mail.link
      };
    }
    else {
      data["Text-part"] = mail.text;
    }

    return new Promise((resolve, reject) => {
      send.request(data).then(resolve).catch(reject);
    });
  }


  /**
   * @function sendVerificationEmail
   * @description Sends the link to verify an email
   */
  // var sendVerificationEmail = mail => {
  //   return new Promise((resolve, reject) => {
  //     resolve();
  //   });
  // }


  /**
   * @function sendMail
   * @description Sends a pre-defined email
   */
  var sendMail = mail => {
    var send = mailjet.post("send");

    var data = {
      "FromEmail": options.fromEmail,
      "FromName": options.fromName,
      "Recipients": [{"Email": mail.to}],
      "Subject": mail.subject,
      "Text-part": mail.text
    }

    return new Promise((resolve, reject) => {
      send.request(data).then(resolve).catch(reject);
    });
  }

  return Object.freeze({
    // sendVerificationEmail: sendVerificationEmail,
    sendPasswordResetEmail: sendPasswordResetEmail,
    sendMail: sendMail
  });
}

module.exports = mailjetAdapter
