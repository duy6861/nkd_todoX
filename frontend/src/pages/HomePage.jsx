import React, { useEffect } from "react";
import { useState } from "react";
import Header from "@/components/Header";
import AddTask from "@/components/AddTask";
import StatsAndFilters from "@/components/StatsAndFilters";
import TaskList from "@/components/TaskList";
import TaskListPagination from "@/components/TaskListPagination";
import DateTimeFilters from "@/components/DateTimeFilters";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import axios from "axios";
import api from "@/lib/axios";
import { visibleTaskLimit } from "@/lib/data";
const HomePage = () => {
  const [taskBuffer, setTaskBuffer] = useState([]);
  const [activeTaskCount, setActiveTaskCount] = useState(0);
  const [completedTaskCount, setCompletedTaskCount] = useState(0);
  const [filter, setFilter] = useState("all");
  const [dateQuery, setDateQuery] = useState("all");
  const [page, setPage] = useState(1);
  // logic
  const fetchTasks = async () => {
    try {
      const res = await api.get(`/tasks?filter=${dateQuery}`);
      // Axios tự parse JSON => không cần .json()
      setTaskBuffer(res.data.tasks);
      setActiveTaskCount(res.data.activeCount);
      setCompletedTaskCount(res.data.completeCount);
      // console.log("Fetched tasks:", res.data);
    } catch (error) {
      console.error("Lỗi khi fetch tasks:", error);
      toast.error("Lỗi khi fetch tasks");
    }
  };
  useEffect(() => {
    fetchTasks();
  }, [dateQuery]);
  useEffect(() => {
    setPage(1);
  },[filter,dateQuery])
  // biến
  const filteredTasks = taskBuffer.filter((task) => {
    switch (filter) {
      case "active":
        return task.status === "active";
      case "complete":
        return task.status === "complete";
      default:
        return true;
    }
  });
  // pagination
  const visibleTasks = filteredTasks.slice(
    (page - 1) * visibleTaskLimit,
    page * visibleTaskLimit
  );
  const totalPages = Math.ceil(filteredTasks.length / visibleTaskLimit);
  const handleNext = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
    console.log("Next page clicked, current page:", page);
  };
  const handlePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
    console.log("Prev page clicked, current page:", page);
  };
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  if (visibleTasks.length === 0) {
    handlePrev();
  }
  const handleNewTask = () => {
    fetchTasks();
  };
  return (
    <div className="min-h-screen w-full bg-white relative">
      {/* Teal Glow Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
        radial-gradient(125% 125% at 50% 90%, #ffffff 40%, #14b8a6 100%)
      `,
          backgroundSize: "100% 100%",
        }}
      />
      {/* Your Content/Components */}
      <div className="container pt-8 mx-auto relative z-20">
        <div className="w-full p-6 max-w-2xl mx-auto space-y-6">
          {/* header */}
          <Header />
          {/* create task */}
          <AddTask handleNewTask={handleNewTask} />
          {/* Filters */}
          <StatsAndFilters
            activeTaskCount={activeTaskCount}
            completedTaskCount={completedTaskCount}
            filter={filter}
            setFilter={setFilter}
          />
          {/* task list */}
          <TaskList
            filteredTasks={visibleTasks}
            filter={filter}
            handleNewTask={handleNewTask}
          />
          {/* pagination */}
          <div className="flex justify-between flex-col items-center sm:flex-row">
            <TaskListPagination
              handleNext={handleNext}
              handlePrev={handlePrev}
              handlePageChange={handlePageChange}
              page={page}
              totalPages={totalPages}
            />
            <DateTimeFilters
              dateQuery={dateQuery}
              setDateQuery={setDateQuery}
            />
          </div>
          {/* footer */}
          <Footer
            activeTaskCount={activeTaskCount}
            completedTaskCount={completedTaskCount}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
