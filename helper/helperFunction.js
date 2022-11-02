const nodemailer = require("nodemailer");
exports.mailerFun = async (data) => {

  const { B, C, D, E, F, G, H, I } = data

  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp",
    secure: true,
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASSWORD,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"pcology" <pcologyofficial@gmail.com>', // sender address
    to: `pcology <pcologyofficial@gmail.com>`, // list of receivers /name /email
    subject: "Order", // Subject line
    text: B, // plain text body
    html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
    <div style="margin:50px auto;width:70%;padding:20px 0">
      <div style="border-bottom:1px solid #eee">
        <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">We Got An Order For CPU</a>
      </div>
      <p>Name:<B> ${B} </P>
      <P> Phone Number:<B> ${C}</p>
      <p>Address:<B> ${D} ${E}</p>
      <p>District: <B> ${F}</P>
      <P> ZipCode: <B> ${G}</p>
      <P> pc Name: <B> ${H}</p>
      <P> Price: <B> ${I}</p>
    </div>
  </div>`, // html body
  });

  //console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};
