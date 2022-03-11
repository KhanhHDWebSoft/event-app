import { Agenda, JobAttributesData, Job } from "agenda";
import Event from "./models/Event";

interface EventJobData extends JobAttributesData {
  data: {
    eventId: string;
  };
}

const mongoPath =
  "mongodb+srv://khanhng3009:Catqov123@cluster0.jdsgv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

export const agenda = new Agenda({ db: { address: mongoPath } });

agenda.define("watch event editing", async ({ attrs }: Job) => {
  try {
    const { eventId } = attrs.data as EventJobData;
    const event = await Event.findById(eventId);
    if (event) {
      if (event.isEdit) {
        event.isEdit = false;
      } else {
        event.userEdit = undefined;
      }

      await event.save();
      return;
    }
  } catch (e) {
    console.log("error", e);
  }
});
