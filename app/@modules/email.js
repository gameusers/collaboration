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

const { IntlProvider } = require('react-intl');
const nodemailer = require('nodemailer');
const lodashGet = require('lodash/get');


// ---------------------------------------------
//   Locales
// ---------------------------------------------

// const { addLocaleData } = require('react-intl');
// const en = require('react-intl/locale-data/en');
// const ja = require('react-intl/locale-data/ja');
// addLocaleData([...en, ...ja]);

const { locale } = require('../@locales/locale');




// --------------------------------------------------
//   function
// --------------------------------------------------

/**
 * メールを送信する
 * https://nodemailer.com/about/
 * @param {string} from - 送信元のメールアドレス
 * @param {string} to - 送信先のメールアドレス
 * @param {Array} bcc - 送信先のメールアドレスが入った配列
 * @param {string} subject - メールタイトル
 * @param {string} text - メール本文
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




/**
 * E-Mail確認メールを送信する
 * @param {string} to - 送信先のメールアドレス
 * @param {string} emailConfirmationID - メール確認ID
 */
const sendMailConfirmation = async ({ to, emailConfirmationID }) => {
  
  
  // --------------------------------------------------
  //   Send Mail
  // --------------------------------------------------
  
  sendMail({
    from: process.env.EMAIL_MESSAGE_FROM,
    to,
    subject: '[Game Users] E-Mailアドレス確認',
    text:
    `Game Users - E-Mailアドレス確認

以下のURLにアクセスしてメールアドレスの確認を終了させてください。
${process.env.URL_BASE}email/confirmation/${emailConfirmationID}

E-Mailの登録後、24時間以内にアクセスしてください。それ以降はURLが無効になります。

こちらのメールに覚えのない方は、上記URLにアクセスしないようにしてください。また同じメールが何度も送られてくる場合は、以下のメールアドレスまでご連絡をいただけるとありがたいです。

＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/

　Game Users

　Email: mail@gameusers.org
　URL: https://gameusers.org/

＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/`,
  });
  
  
  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------
  
  // console.log(`\n---------- infoObj ----------\n`);
  // console.dir(infoObj);
  // console.log(`\n-----------------------------------\n`);
  
  // console.log(chalk`
  //   process.env.EMAIL_MESSAGE_FROM: {green ${process.env.EMAIL_MESSAGE_FROM}}
  //   to: {green ${to}}
  //   emailConfirmationID: {green ${emailConfirmationID}}
  // `);
  
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

module.exports = {
  sendMail,
  sendMailConfirmation,
};