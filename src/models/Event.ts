import { Document, Schema, model } from "mongoose";

interface Event extends Document {
  event_name: string;
  total_voucher: number;
  userEdit?: string;
  isEdit?: boolean;
  countVoucher: number;
}

const EventSchema = new Schema(
  {
    event_name: {
      type: String,
      required: true,
    },
    total_voucher: {
      type: Number,
      required: true,
    },
    userEdit: {
      type: String,
    },
    isEdit: {
      type: Boolean,
    },
    countVoucher: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default model<Event>("Event", EventSchema);
