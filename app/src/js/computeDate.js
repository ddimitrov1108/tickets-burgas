export const computeDate = (date) =>
  `${date.getHours()}:${
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
  }ч. ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}
`;
