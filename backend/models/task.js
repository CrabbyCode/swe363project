const mongoose = require("../db");
const taskSchema = mongoose.Schema({
  name: { type: String, required: true },
  details: { type: String, required: true },
  urgent: { type: Boolean, required: true },
  type: { type: String, required: true },
  deadline: { type: String, required: true },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;