"use strict";

const AWS = require("aws-sdk");
const mimemessage = require("mimemessage");
AWS.config.update({ region: process.env.AWS_REGION || "us-west-1" });
const SES = new AWS.SESV2();
const base64 = require("@hexagon/base64");

const from_name = "Centerline-Inc Website";
const from_email = "repair.quote@centerline-inc.com";
const to_email = "repair.quote@centerline-inc.com";
// const from_email = "noreply@centerline-inc.com";
// const to_email = 'info@centerline-inc.com';
const subject = "New Form Submission";

const buildMsg = ({ name, email, phone, spindle, message, files }) => {
  const msg = mimemessage.factory({
    contentType: "multipart/mixed",
    body: [],
  });
  msg.header("From", `${from_name} <${from_email}>`);
  msg.header("To", `${name} <${email}>`);
  msg.header("Subject", subject);
  msg.header("MIME-Version", "1.0");

  const plainEntity = mimemessage.factory({
    contentType: "text/plain",
    body: `
    Name: ${name}
    Email: ${email}
    Phone: ${phone}
    Spindle: ${spindle}
    Message: ${message}
    `,
  });

  msg.body.push(plainEntity);

  if (files.length) {
    files.forEach((f) => {
      let file = mimemessage.factory({
        contentType: f.contentType,
        contentTransferEncoding: "base64",
        body: f.content.toString("base64"),
      });
      file.header("Content-Disposition", `attachment; filename="${f.filename}"`);
      msg.body.push(file);
    });
  }

  return msg.toString();
};

const sendEmail = async function (formData) {
  return new Promise(async (resolve, reject) => {
    // Build params for SES
    const emailParams = {
      Content: { Raw: { Data: buildMsg(formData) } },
      Destination: {
        ToAddresses: [from_email],
      },
      FromEmailAddress: from_email,
      ReplyToAddresses: [from_email],
    };
    // Send the email
    try {
      await SES.sendEmail(emailParams).promise();
      resolve();
    } catch (err) {
      console.error("sendEmail error: ", err);
      reject();
    }
  });
};

module.exports = { sendEmail };
