import { Request, ResponseObject, ResponseToolkit } from "@hapi/hapi";
import Event from "../models/Event";
import Voucher from "../models/Voucher";
import VoucherCodeGenerator from "voucher-code-generator";
import Queue from "bull";
import nodemailer from "nodemailer";
import { startSession } from "mongoose";

const sendMailQueue = new Queue("sendMail", {
  redis: {
    host: "127.0.0.1",
    port: 6379,
    // password: "root",
  },
});

const options = {
  delay: 60000, // 1 min in ms
  attempts: 2,
};

function sendMail(email: string) {
  console.log("send mail");
  return new Promise((resolve, reject) => {
    let mailOptions = {
      from: "khanh.nguyen@hdwebsoft.co",
      to: email,
      subject: "Bull - create voucher",
      text: "Voucher created test email sendddd",
    };
    let mailConfig = {
      service: "gmail",
      auth: {
        user: "khanh.nguyen@hdwebsoft.co",
        pass: "Catqov123",
      },
    };
    nodemailer
      .createTransport(mailConfig)
      .sendMail(mailOptions, (err, info) => {
        if (err) {
          reject(err);
        } else {
          resolve(info);
        }
      });
  });
}

sendMailQueue.process(async (job) => {
  return await sendMail(job.data.email);
});

export const generateVoucher = async (
  req: Request,
  h: ResponseToolkit
): Promise<ResponseObject | void> => {
  const session = await startSession();

  try {
    session.startTransaction();
    // let countVoucher = await Voucher.countDocuments({
    //   event_id: req.params.event_id,
    // });
    const event = await Event.findOneAndUpdate(
      { _id: req.params.event_id },
      { $inc: { countVoucher: 1 } },
      { session, new: true }
    );
    if (event) {
      if (event?.countVoucher > event?.total_voucher) {
        console.log("limited voucher");
        await session.abortTransaction();
        await session.endSession();
        return h.response().code(456);
      } else {
        const newVoucher = {
          event_id: req.params.event_id,
          code: VoucherCodeGenerator.generate({
            length: 6,
            count: 1,
          })[0],
        };
        await Voucher.create(newVoucher);
        const data = {
          email: "khanhng3009@gmail.com",
        };
        sendMailQueue.add(data, options);
        await session.commitTransaction();
        await session.endSession();
        return h.response().code(200);
      }
    }
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    return h.response().code(456);
  }
};
