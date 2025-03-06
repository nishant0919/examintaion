import { Schema } from "mongoose";
import { Mongoose, model, models } from "mongoose";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Category = models.Category || model("Category", categorySchema);
export default Category;
