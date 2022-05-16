import { Router } from "express";
import { isAuthenticated } from "../middleware/Auth.js";
import Ticket from "../models/Tickets.js";
const ticketRouter = Router();

ticketRouter.post("/add", isAuthenticated, async (req, res) => {
  var ticketData = {
    Title: req.body.title,
    Description: req.body.description,
    User_id: req.user._id,
    User_Name: req.user.firstName,
  };
  const ticket = await Ticket.create(ticketData);
  res.status(201).json(ticket);
});

ticketRouter.get("/all", (req, res) => {
  try {
    Ticket.find(
      {
        IS_Deleted: false,
      },
      (err, tickets) => {
        if (err) {
          return err;
        }
        return res.status(200).json({ tickets });
      }
    );
  } catch (error) {
    return error;
  }
});

ticketRouter.get("/:id", (req, res) => {
    try {
      Ticket.find(
        {
          _id: req.params.id,
        },
        (err, tickets) => {
          if (err) {
            return err;
          }
          return res.status(200).json({ tickets });
        }
      );
    } catch (error) {
      return error;
    }
  });

  ticketRouter.delete("/:id", (req, res) => {
    try {
      Ticket.findByIdAndUpdate(req.params.id,
        {
          IS_Deleted: true,
          Deleted_At:new Date()
        },
        (err, tickets) => {
          if (err) {
            return err;
          }
          return res.status(200).json({ tickets });
        }
      );
    } catch (error) {
      return error;
    }
  });

  ticketRouter.put("/:id", (req, res) => {
    var ticketData = {
        Title: req.body.title,
        Description: req.body.description,
        
      };
    try {
      Ticket.findByIdAndUpdate(req.params.id,
        ticketData,
        (err, tickets) => {
          if (err) {
            return err;
          }
          return res.status(200).json({ tickets });
        }
      );
    } catch (error) {
      return error;
    }
  });

  export default ticketRouter;
