import Task from "../models/Task.js";
const getAllTasks = async (req, res) => {
  // loc theo date
  const {filter = "today"} = req.query
  const now = new Date();
  let startDate;
  switch(filter){
    case "today":{
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      break;
    }
    case "week":{
      const mondayDate= now.getDate() - (now.getDay() + 1) - (now.getDay() === 0 ? 7 : 0) ;
      startDate = new Date(now.getFullYear(), now.getMonth(), mondayDate);
      break;
    }
    case "month":{
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    }
    default:{
      startDate = null
      break;
    }
  }
  const query = startDate ? { createdAt: { $gte: startDate } } : {};
  // loc theo status
  try {
    // const tasks = await Task.find().sort({ createAt: -1 });
    // const activeCount = await Task.countDocuments({status:"active"})
    // const completeCount = await Task.countDocuments({status:"complete"})
    const result = await Task.aggregate([
      { $match: query },
      {
        $facet: {
          tasks: [
            {
              $sort: { createAt: -1 },
            },
          ],
          activeCount: [
            {
              $match: { status: "active" },
            },
            { $count: "count" },
          ],
          completeCount: [
            {
              $match: { status: "complete" },
            },
            { $count: "count" },
          ],
        },
      },
    ]);
    const tasks = result[0].tasks;
    const activeCount = result[0].activeCount[0]?.count ||0;
    const completeCount = result[0].completeCount[0]?.count ||0;
    res.status(200).json({tasks, activeCount, completeCount });
  } catch (err) {
    console.log("lỗi khi gọi getAllTasks", err);
    res.status(200).json({ message: "lỗi hệ thống" });
  }
};
const createTask = async (req, res) => {
  try {
    const { title } = req.body;
    const task = new Task({ title });

    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (err) {
    console.log("loi createTasks", err);
    res.status(500).json({ message: "loi he thong" });
  }
};
const updateTask = async (req, res) => {
  try {
    const { title, status, completedAt } = req.body;
    const updateTask = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title,
        status,
        completedAt,
      },
      {
        new: true,
      }
    );
    if (!updateTask) {
      return res.status(404).json({ message: "task not found!" });
    }
    res.status(200).json(updateTask);
  } catch (err) {
    console.log("loi updateTasks", err);
    res.status(500).json({ message: "loi he thong" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const deleteTask = await Task.findByIdAndDelete(req.params.id);
    if (!deleteTask) {
      return res.status(404).json({
        message: "task not found!",
      });
    }
    res.status(200).json(deleteTask);
  } catch (err) {
    console.log("loi DeleteTasks", err);
    res.status(500).json({ message: "loi he thong" });
  }
};
export { getAllTasks, createTask, updateTask, deleteTask };
