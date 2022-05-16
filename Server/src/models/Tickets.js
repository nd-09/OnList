import mongoose from "mongoose";
const ticketSchema = new mongoose.Schema(
  {
    User_id: {
      type: mongoose.Types.ObjectId,
    },
    User_Name: {
      type: String,
      required: true,
    },
    Title: {
      type: String,
      required: true,
    },
    Description: {
      type: String,
      required: true,
    },
    Delated_At: {
      type: Date,
    },
    IS_Deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);
const Ticket=mongoose.model("Ticket",ticketSchema);
export default Ticket;