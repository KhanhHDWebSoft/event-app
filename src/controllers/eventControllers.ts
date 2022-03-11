import { Request, ResponseObject, ResponseToolkit } from "@hapi/hapi";
import Event from "../models/Event";
import { agenda } from "../agenda";

interface EditTableMeRequest extends Request {
  payload: {
    userId: string;
    eventName?: string;
  };
}

// add event
export const addEvent = async (
  request: Request,
  h: ResponseToolkit
): Promise<ResponseObject | void> => {
  try {
    const { payload } = request;
    const event = await Event.create(payload);

    return h.response(event);
  } catch (e) {
    return h.response().code(500);
  }
};

export const updateEvent = (request: Request, h: ResponseToolkit): void => {};

export const getEvents = (request: Request, h: ResponseToolkit): string => {
  return "hello";
};

export const editTableMe = async (
  req: EditTableMeRequest,
  h: ResponseToolkit
): Promise<ResponseObject | void> => {
  try {
    const event = await Event.findById(req.params.event_id).exec();
    const { userId, eventName } = req.payload;
    // make request payload as user id
    if (event) {
      // not user edit yet
      if (!event.userEdit) {
        event.userEdit = userId;
        if (eventName) {
          event.event_name = eventName;
          event.isEdit = true;
        }

        await event.save();
        return h.response().code(200);
      }

      // fake userId = payload
      if (event.userEdit && event.userEdit === userId) {
        if (eventName) {
          event.event_name = eventName;
          event.isEdit = true;
        }

        await event.save();
        return h.response().code(200);
      }

      if (event.userEdit !== userId) {
        return h.response().code(456);
      }
    } else {
      return h.response().code(456);
    }
  } catch (e) {
    console.log(e, "error");
    return h.response().code(500);
  }
};

export const eventRelease = async (
  req: Request,
  h: ResponseToolkit
): Promise<ResponseObject | void> => {
  try {
    const event = await Event.findById(req.params.event_id).exec();
    if (event) {
      event.userEdit = undefined;
      event.isEdit = false;
      await event.save();
    }

    return h.response().code(201);
  } catch (e) {
    return h.response().code(500);
  }
};

export const eventMaintain = async (
  req: Request,
  h: ResponseToolkit
): Promise<ResponseObject | void> => {
  try {
    (async function () {
      // IIFE to give access to async/await
      await agenda.start();

      await agenda.every("5 minutes", "watch event editing", {
        eventId: req.params.event_id,
      });
    })();

    return h.response().code(201);
  } catch (e) {
    return h.response().code(500);
  }
};
