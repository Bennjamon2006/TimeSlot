import { Job } from "@/types/Job";

const ExampleJob: Job = {
  name: "Example Job",
  execute: async () => {
    console.log("Executing Example Job...");
    // Add your job logic here
  },
  interval: 60000, // Run every 60 seconds
};

export default ExampleJob;
