const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000
const http = require('http')
const formidable = require('formidable')
const { SESv2Client, SendEmailCommand } = require("@aws-sdk/client-sesv2");

app.use(cors());

const client = new SESv2Client({
  region: "us-west-1",
  credentials: {
    accessKeyId: 'AKIA4ZYH4GF2EETYEHP7',
    secretAccessKey: 'AKIA4ZYH4GF2EETYEHP7',
}});

app.post('/upload', (req, res) => {
  const form = formidable({ multiples: true });

  form.parse(req, (err, fields, files) => {
    console.log('testing', fields);
    if (err) {
      console.log(err);
      return;
    }

    const from_name = 'Courtney'
    const from_email = 'noreply@courtyen.io'
    const to = 'noreply@courtyen.io'
    const subject = 'Testing SES'
    let message_id = '';

    const fromMessage = `
    MIME-Version: 1.0
    Content-Type: multipart/mixed; boundary=frontier

    This is a message with multiple parts in MIME format.
    From: ${from_name} <${from_email}>
    To: ${to}
    Subject: ${subject}
    --frontier
    Content-Type: text/plain

    This is the body of the message.
    --frontier
    Content-Type: multipart/mixed;
      boundary="a3f166a86b56ff6c37755292d690675717ea3cd9de81228ec2b76ed4a15d6d1a"

    --a3f166a86b56ff6c37755292d690675717ea3cd9de81228ec2b76ed4a15d6d1a
Content-Type: multipart/alternative;
    boundary="sub_a3f166a86b56ff6c37755292d690675717ea3cd9de81228ec2b76ed4a15d6d1a"

--sub_a3f166a86b56ff6c37755292d690675717ea3cd9de81228ec2b76ed4a15d6d1a
Content-Type: text/plain; charset=iso-8859-1
Content-Transfer-Encoding: quoted-printable

Please see the attached file for a list of customers to contact.

--sub_a3f166a86b56ff6c37755292d690675717ea3cd9de81228ec2b76ed4a15d6d1a
Content-Type: text/html; charset=iso-8859-1
Content-Transfer-Encoding: quoted-printable

<html>
<head></head>
<body>
<h1>Hello!</h1>
<p>Please see the attached file for a list of customers to contact.</p>
</body>
</html>
    `;

    const msg = 'Test';
    console.log('is this encoded', msg.toString('base64'));
    const command = new SendEmailCommand({
      Destinations: [to],
      Source: from_email,
      Content: {
        Simple: {
          Body: {
            Text: 'Test'
          }
        }
      }
    });
    try {
      client.send(command).then(data => {
        console.log(data);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ fields, files }, null, 2));
      });
    }
    catch (error) {
      console.log('ERROR%%%%%%%%%%', error);
    }
  });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})