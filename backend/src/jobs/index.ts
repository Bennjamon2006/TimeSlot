import { Job } from "../types/Job";
import ExampleJob from "./ExampleJob";

const jobs = [ExampleJob];

function scheduleJob(job: Job) {
  job
    .execute()
    .catch((err) => {
      console.error(`Error executing job "${job.name}":`, err);
    })
    .finally(() => {
      setTimeout(() => scheduleJob(job), job.interval);
    });
}

export default function loadJobs() {
  jobs.forEach((job) => {
    console.log(`Scheduling job: ${job.name} to run every ${job.interval} ms`);
    scheduleJob(job);
  });
}
