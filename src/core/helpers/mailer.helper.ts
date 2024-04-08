import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerHelper {
  private transporter: any;

  constructor(private readonly configService: ConfigService) {
    this.createTransporter();
  }

  private async createTransporter() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: this.configService.get<string>('SENDER_EMAIL'),
        clientId: this.configService.get<string>('CLIENT_ID'),
        clientSecret: this.configService.get<string>('CLIENT_SECRET'),
        refreshToken: this.configService.get<string>('REFRESH_TOKEN'),
        accessToken: this.configService.get<string>('ACCESS_TOKEN'),
        expires: 788400000,
      },
    });
  }

  async sendEmail(to: string, subject: string, text: string): Promise<any> {
    const mailOptions = {
      from: {
        name: 'Max King Institute',
        address: this.configService.get('SENDER_EMAIL'),
      },
      to: to,
      subject: subject,
      html: text,
    };

    return new Promise((res, rej) => {
      this.transporter.sendMail(mailOptions, (error: any, info: any): any => {
        if (error) {
          rej(error);
        } else {
          res(info);
        }
      });
    });
  }
}
