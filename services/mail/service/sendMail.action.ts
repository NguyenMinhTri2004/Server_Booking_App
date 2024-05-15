import sgMail from '@sendgrid/mail';

// import config from '../../../configs/app.config';
// import logger from '../../../utils/logger';

// sgMail.setApiKey("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");

const sendMailAction = async (receiver, renderedHTML, subject) => {
  // try {
  //   const options = {
  //     to: receiver,
  //     from: 'TBooking <contact@tbooking.io>',
  //     subject: subject,
  //     text: renderedHTML,
  //     html: renderedHTML,
  //   };
  //   const response = await sgMail.send(options);
  //   console.log('Email was sent');
  //   return response;
  // } catch (error) {
  //   console.log('SendGrid got exception: ' + error);
  //   if (error.response) {
  //     console.log('SendGrid got exception: ' + error.response.body.errors[0].message);
  //   }
  // }
};
export default sendMailAction;
