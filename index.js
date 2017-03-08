var Mailjet = require("node-mailjet");

var mailjetAdapter = options => {
  if (!options || !options.apiKey || !options.apiSecret || !options.fromEmail) {
    throw "mailjetAdapter requires an API key, an API secret and a from email address.";
  }
  var mailjet = Mailjet.connect(options.apiKey, options.apiSecret);

  /**
   * @function _sendLink
   * @description Sends the reset password or verify email links
   */
  var _sendLink = (mail, opts, subject, templateId, textPart, htmlPart) => {
    var send = mailjet.post("send");
    
    // lookup for email in username field if email is undefined
    var email = mail.user.get("email") || mail.user.get("username");

    var data = {
      "FromEmail": opts.fromEmail,
      "FromName": opts.fromName,
      "Recipients": [{"Email": email}]
    }

    // set the subject and the variable to replace into the body of the email
    data["MJ-TemplateErrorReporting"] = opts.apiErrorEmail;
    data["MJ-TemplateLanguage"] = "true";
    data["Vars"] = {
      "email": email,
      "appName": mail.appName,
      "link": mail.link
    };
    data["Subject"] = subject;

    // set the body part with by specifying the templateId, or by settings the
    //  plain text part and the html part
    data["Mj-TemplateID"] = templateId;
    data["Text-part"] = textPart;
    data["Html-part"] = htmlPart;

    return new Promise((resolve, reject) => {
      send.request(data).then(resolve).catch(reject);
    });
  }

  /**
   * @function _getOptions
   * @description Get the options for this specific mailing task
   */
  var _getOptions = mail => {
    return options.getIndividualOptions ?
      options.getIndividualOptions(mail) : Promise.all(options)
  };

  /**
   * @function sendPasswordResetEmail
   * @description Sends the link to reset the password
   */
  var sendPasswordResetEmail = mail => {
    return _getOptions(mail).then(opts => {
      return _sendLink(
        mail,
        opts,
        opts.passwordResetSubject,
        opts.passwordResetTemplateId,
        opts.passwordResetTextPart,
        opts.passwordResetHtmlPart
      );
    });
  }


  /**
   * @function sendVerificationEmail
   * @description Sends the link to verify an email
   */
  var sendVerificationEmail = mail => {
    return _getOptions(mail).then(opts => {
      return _sendLink(
        mail,
        opts,
        opts.verificationEmailSubject,
        opts.verificationEmailTemplateId,
        opts.verificationEmailTextPart,
        opts.verificationEmailHtmlPart
      );
    });
  }


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
    sendVerificationEmail: sendVerificationEmail,
    sendPasswordResetEmail: sendPasswordResetEmail,
    sendMail: sendMail
  });
}

module.exports = mailjetAdapter
