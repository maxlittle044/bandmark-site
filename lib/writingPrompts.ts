export interface WritingPrompt {
  id: string;
  taskType: "TASK_1" | "TASK_2";
  prompt: string;
  minWords: number;
  minutes: number;
}

export const writingPrompts: WritingPrompt[] = [
  {
    id: "t1-bar-chart",
    taskType: "TASK_1",
    minWords: 150,
    minutes: 20,
    prompt:
      "The bar chart below shows the percentage of households with internet access in four countries between 2005 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. (Since no chart image is provided, invent plausible, internally consistent figures and describe them as if reading a chart.)",
  },
  {
    id: "t1-letter",
    taskType: "TASK_1",
    minWords: 150,
    minutes: 20,
    prompt:
      "You recently bought a piece of equipment for your kitchen, but it did not work. Write a letter to the shop. In your letter: describe the problem with the equipment, explain what happened when you contacted the shop, say what you would like the shop to do.",
  },
  {
    id: "t2-technology",
    taskType: "TASK_2",
    minWords: 250,
    minutes: 40,
    prompt:
      "Some people believe that technology has made our lives more complicated, while others think it has made life simpler. Discuss both views and give your own opinion.",
  },
  {
    id: "t2-education",
    taskType: "TASK_2",
    minWords: 250,
    minutes: 40,
    prompt:
      "In many countries, university students are now expected to pay for their own education rather than have it funded by the government. To what extent do you agree or disagree?",
  },
];

export function getPromptById(id: string) {
  return writingPrompts.find((p) => p.id === id);
}
