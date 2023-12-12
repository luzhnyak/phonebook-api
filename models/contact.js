// owner: {
//       type: Schema.Types.ObjectId,
//       ref: 'user',
//     }

const mongoose = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Schema = mongoose.Schema;
const Joi = require("joi");

// ========================== Joi schemas

const addSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .required()
    .messages({ "any.required": "missing required name field" }),
  email: Joi.string()
    .email()
    .messages({ "any.required": "missing required email field" }),
  phone: Joi.string()
    .min(5)
    .max(15)
    .required()
    .messages({ "any.required": "missing required phone field" }),
  favorite: Joi.boolean(),
});

const updateSchema = Joi.object({
  name: Joi.string().min(2),
  email: Joi.string().email(),
  phone: Joi.string().min(5).max(15),
  favorite: Joi.boolean(),
})
  .min(1)
  .messages({ "object.min": "missing fields" });

const updateStatusSchema = Joi.object({
  favorite: Joi.boolean()
    .required()
    .messages({ "any.required": "missing field favorite" }),
});

// ========================== Mongoose schemas

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    avatarURL: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongooseError);

const Contact = mongoose.model("contact", contactSchema);

module.exports = { Contact, addSchema, updateSchema, updateStatusSchema };
