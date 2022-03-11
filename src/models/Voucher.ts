import { Document, Schema, model } from "mongoose";

interface Voucher extends Document {
  code: string;
  value: string;
  event_id: string;
}

const VoucherSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
    },
    value: {
      type: String,
    },
    event_id: {
      type: String,
    },
  },
  { timestamps: true }
);

export default model<Voucher>("Voucher", VoucherSchema);
