import mongoose from "mongoose";
import process from "process";
import os from "os";

export const countConnect = () => {
  const numConnection = mongoose.connections.length;
  console.log(`Number of connections: ${numConnection}`);
};

export const checkOverload = () => {
  setInterval(() => {
    const numConnection = mongoose.connections.length;
    const numCores = os.cpus().length;
    const memoryUsage = process.memoryUsage().rss;
    const maxConnections = numCores * 5;

    console.log("Active connections", numConnection);

    console.log("Memory usage: ", memoryUsage / 1024 / 1024);

    if (numConnection > maxConnections) {
      console.log("Connection overload detected");
    }
  }, 5000);
};
