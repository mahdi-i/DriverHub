export type FaqTs = {
  title: string;
  faqs: {
    id: number;
    question: string;
    answer: string;
  }[];
};
