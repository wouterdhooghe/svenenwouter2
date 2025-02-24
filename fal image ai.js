import * as fal from "@fal-ai/serverless-client";

const result = await fal.subscribe("fal-ai/lora", {
  input: {
    model_name: "stabilityai/stable-diffusion-xl-base-1.0",
    prompt: "Photo of a european medieval 40 year old queen, silver hair, highly detailed face, detailed eyes, head shot, intricate crown, age spots, wrinkles"
  },
  logs: true,
  onQueueUpdate: (update) => {
    if (update.status === "IN_PROGRESS") {
      update.logs.map((log) => log.message).forEach(console.log);
    }
  },
});