export const toTimestamp = (strDate) => {
  var datum = Date.parse(strDate);
  console.log(datum / 1000);
  return datum / 1000;
};
