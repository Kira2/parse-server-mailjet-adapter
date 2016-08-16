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
  appName: "Ekyno",
  // The options for the email adapter
  emailAdapter: {
    module: "parse-server-mailjet-adapter",
    options: {
      // The API key from your Mailjet account
      apiKey: "YOUR_MAILJET_API_KEY",
      // The API secret from your Mailjet account
      apiSecret: "YOUR_MAILJET_API_SECRET",
      // The email to send Mailjet templates bug reports to.
      // Need it only if use the option templateId.
      apiErrorEmail: "bugreport@yourdomain.com",
      // The email address that your emails come from
      fromEmail: "noreply@yourdomain.com",
      // The name do display as the sender (optional)
      fromName: "Your Application",
      // The subject of the email to reset the password (optional)
      passwordResetSubject: "Rest My Password",
      // Set it to use a template of your Mailjet account (optional).
      // This is the id of the template to use.
      passwordResetTemplateId: 12345
    }
  }
  ...
});
```

As you see, you can directly use the default email text written by parse-server. To do this, just not provide **templateId**. In this case, **apiErrorEmail** is not used and can be ommitted too.

#### Use template for the request password email

If you want to use a template, just add the **passwordResetTemplateId** option with the ID of the template into your Mailjet account, and do not forget to use the variables **appName** and **link** into it: **{{var:appName}}** and **{{var:link}}**. These variables are set with the value of your application name and the link to reset the password.
