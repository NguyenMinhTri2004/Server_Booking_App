import sendMailAction from "../../services/mail/service/sendMail.action";
// import sendMailActionDev from '../../services/mail/service_dev/sendMail.action';
// import logger from '../../utils/logger';

// const sendMail = process.env.NODE_ENV === 'dev' ? sendMailActionDev : sendMailAction;
const sendMail = sendMailAction;

const sendMailProcess = async (job, done) => {
  try {
    if (!job.data) return;
    const mailData = job.data;
    // logger.logDebug(mailData);
    const { receiver, content, subject } = mailData;

    const messageSentId = await sendMail(receiver, content, subject);
    // logger.logDebug(`====> Sending email success with data:
    // + receiver = ${receiver}
    // + messageSentId = ${messageSentId}
    // `);
    done();
    // logger.logDebug('==============Done job==============');
  } catch (error) {
    console.log("error", error);
    // logger.logDebug(`sendMailProcess got exception: `, error);
    done();
  }
};

export default sendMailProcess;
