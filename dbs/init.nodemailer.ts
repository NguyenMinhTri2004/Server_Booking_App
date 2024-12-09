import nodemailer from "nodemailer";
import { google } from "googleapis";
import "dotenv/config";

const OAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.HOST_EMAIL
);

OAuth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN,
});

const accessToken = OAuth2Client.getAccessToken();

export const transporter = nodemailer.createTransport({
  service: "gmail", // Use the Gmail SMTP service
  auth: {
    type: "OAuth2",
    user: "nguyenminhtri.vnpt2@gmail.com",
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
    accessToken: String(accessToken),
  },
});
