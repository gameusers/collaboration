// --------------------------------------------------
//   Require
// --------------------------------------------------

// ---------------------------------------------
//   Console
// ---------------------------------------------

const chalk = require('chalk');
const util = require('util');


// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

const nodemailer = require("nodemailer");




// --------------------------------------------------
//   function
// --------------------------------------------------

/**
 * メールを送信する
 * https://nodemailer.com/about/
 * @param {Object} req - リクエスト
 * @param {Object} res - レスポンス
 */
const sendMail = async ({ from, to, bcc, subject, text }) => {
  
  
  // --------------------------------------------------
  //   必要な情報がない場合、処理停止
  // --------------------------------------------------
  
  if (
    !process.env.EMAIL_SMTP_HOST ||
    !process.env.EMAIL_SMTP_PORT ||
    !process.env.EMAIL_SMTP_USER ||
    !process.env.EMAIL_SMTP_PASSWORD ||
    !from ||
    (!to && !bcc) ||
    !subject ||
    !text
  ) {
    return;
  }
  
  
  // --------------------------------------------------
  //   create reusable transporter object using the default SMTP transport
  // --------------------------------------------------
  
  const smtpObj = {
    host: process.env.EMAIL_SMTP_HOST,
    port: process.env.EMAIL_SMTP_PORT,
    secure: process.env.EMAIL_SMTP_PORT === 465 ? true : false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_SMTP_USER,
      pass: process.env.EMAIL_SMTP_PASSWORD
    }
  };
  
  const transporter = nodemailer.createTransport(smtpObj);
  
  
  // --------------------------------------------------
  //   send mail with defined transport object
  // --------------------------------------------------
  
  const messageObj = {
    from,
    subject,
    text,
  };
  
  if (to) {
    messageObj.to = to;
  } else {
    messageObj.bcc = bcc;
  }
  
  const infoObj = await transporter.sendMail(messageObj);
  
  
  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------
  
  // console.log(`\n---------- infoObj ----------\n`);
  // console.dir(infoObj);
  // console.log(`\n-----------------------------------\n`);
  
  // console.log(chalk`
  //   sendMail
  //   process.env.EMAIL_SMTP_HOST: {green ${process.env.EMAIL_SMTP_HOST}}
  //   process.env.EMAIL_SMTP_PORT: {green ${process.env.EMAIL_SMTP_PORT}}
  //   process.env.EMAIL_SMTP_USER: {green ${process.env.EMAIL_SMTP_USER}}
  //   process.env.EMAIL_SMTP_PASSWORD: {green ${process.env.EMAIL_SMTP_PASSWORD}}
  //   from: {green ${from}}
  //   to: {green ${to}}
  //   bcc: {green ${bcc}}
  //   subject: {green ${subject}}
  //   text: {green ${text}}
  // `);
  
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

module.exports = {
  sendMail
};