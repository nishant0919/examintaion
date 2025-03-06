import { Schema } from "mongoose";
import { Mongoose, model, models } from "mongoose";

const questionSchema = new Schema(
  {
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    options: {
      type: [String],
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category", // Reference to Category model
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Question = models.Question || model("Question", questionSchema);
export default Question;
