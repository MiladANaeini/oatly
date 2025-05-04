import data from "../../../data/data.json";

export const fetchArticleData = () => {
  return new Promise((resolve, reject) => {
    const success = Math.random() > 0.000005;
    setTimeout(() => {
      if (success) {
        resolve(data);
      } else {
        reject(new Error("Failed to fetch data"));
      }
    }, 1000);
  });
};
