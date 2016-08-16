# parse-server-mailjet-adapter
Used to send Parse Server password reset emails through Mailjet

### Installation
```
npm install parse-server-mailjet-adapter --save
```

### Configuration
```
var api = new ParseServer({
  ...
  // The email adapter
  emailAdapter: {
    module: "parse-server-mailjet-adapter",
    options: {
      // The API key from Mailjet
      apiKey: "YOUR_MAILJET_API_KEY",
      // The API secret from Mailjet
      apiSecret: "YOUR_MAILJET_API_SECRET",
      // The email to send Mailjet templates bug reports (optional)
      // Need it only if use a template
      apiErrorEmail: "bugreport@yourdomain.com",
      // The address that your emails come from
      fromAddress: "noreply@yourdomain.com",
      // The name do display as sender (optional)
      fromName: "Your Application",
      // The subject (optional)
      subject: "Reset My Password",
      // Set it to use a template (optional)
      // This is the id of the template to use
      templateId: 12345,
      // The pattern that defines the beginning of your server url to extract the reset link (optional)
      // Need it only if use a template
      linkPattern: "http://localhost:1337/parse"
    }
  }
  ...
});
```
