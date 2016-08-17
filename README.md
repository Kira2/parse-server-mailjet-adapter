# parse-server-mailjet-adapter
Used to send Parse Server password reset emails through Mailjet

### Installation
```
npm install parse-server-mailjet-adapter --save
```

### Configuration
```javascript
var api = new ParseServer({
  ...
  // Your apps name. This will appear in the subject and body of the emails that are sent.
  appName: "My application",
  // The options for the email adapter
  emailAdapter: {
    module: "parse-server-mailjet-adapter",
    options: {
      // The API key from your Mailjet account
      apiKey: "YOUR_MAILJET_API_KEY",
      // The API secret from your Mailjet account
      apiSecret: "YOUR_MAILJET_API_SECRET",
      // The email to send Mailjet templates bug reports to
      apiErrorEmail: "bugreport@yourdomain.com",
      // The email address that your emails come from
      fromEmail: "noreply@yourdomain.com",
      // The name do display as the sender (optional)
      fromName: "Your Application",
      //
      // Parameters for the reset password emails
      //
      // The subject of the email to reset the password (optional)
      passwordResetSubject: "Rest My Password",
      // Set it to use a template with your Mailjet account.
      // This is the id of the template to use.
      passwordResetTemplateId: 12345,
      // If you do not use template, you can set the plain text part here
      passwordResetTextPart: "Hi,\n\nYou requested to reset your password for {{var:appName}}.\n\nPlease, click here to set a new password: {{var:link}}",
      // If you do not use template, you can set the html part here
      passwordResetHtmlPart: "Hi,<p>You requested to reset your password for <b>{{var:appName}}</b>.</p><p>Please, click here to set a new password: {{var:link}}</p>",
      //
      // Parameters for the email verification emails
      //
      // The subject of the email to reset the password (optional)
      verificationEmailSubject: "Verify your email",
      // Set it to use a template with your Mailjet account.
      // This is the id of the template to use.
      verificationEmailTemplateId: 67890,
      // If you do not use template, you can set the plain text part here
      verificationEmailTextPart: "Hi,\n\nYou are being asked to confirm the e-mail address {{var:email}} with {{var:appName}}\n\nClick here to confirm it: {{var:link}}",
      // If you do not use template, you can set the html part here
      verificationEmailHtmlPart: "Hi,<p>You are being asked to confirm the e-mail address {{var:email}} with <b>{{var:appName}}</b></p><p>Click here to confirm it: {{var:link}}</p>"
    }
  }
  ...
});
```

The variables **{{var:appName}}**, **{{var:email}}** and **{{var:link}}** are automatically replaced with the name you provided for your application, the email of the user and the link to reset the password or to verify the email.
