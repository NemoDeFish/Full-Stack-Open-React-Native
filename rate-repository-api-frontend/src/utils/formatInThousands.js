/* My solution: */
// const countSuffix = (number) => {
//   if (number > 1000) {
//     return (number / 1000).toFixed(1) + "k";
//   }
//   return number;
// };

const round = (value, decimals = 1) => {
  return Math.round(value * 10 ** decimals) / 10 ** decimals;
};

/* Solution: refactors calculations into a separate 'utils' file to prevent mixing business logic with application logic */
const formatInThousands = (value) => {
  /* Solution checks if given prop is a number first */
  if (typeof value !== "number") {
    return undefined;
  }

  if (value < 1000) {
    return value.toLocaleString();
  }

  const inThousands = round(value / 1000);

  return `${inThousands.toLocaleString()}k`;
};

export default formatInThousands;
