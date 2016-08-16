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
      // The address that your emails come from
      fromAddress: "noreply@yourdomain.com",
      // The name do display as the sender (optional)
      fromName: "Your Application",
      // The subject (optional)
      subject: "Reset My Password",
      // Set it to use a template of your Mailjet account (optional).
      // This is the id of the template to use.
      templateId: 12345,
      // The pattern that defines the beginning of your server url to extract the reset link.
      // Need it only if use the option templateId.
      linkPattern: "http://localhost:1337/parse"
    }
  }
  ...
});
```

As you see, you can directly use the text email sent by default by parse-server. To do this, just not provide **templateId**. In this case, **apiErrorEmail** and **linkPattern** are not used and can be ommitted too.

If you want to use a template, just add the **templateId** option with the ID of the template into your Mailjet account, and do not forget to use the variable **link_param** into it: **{{var:link_param}}**. This variable is set with the value of the link to click to reset the password.
