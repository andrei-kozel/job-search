const nextElementInList = <T>(list: T[], value: T) => {
  const currentActionIndex = list.indexOf(value);
  const nextActionIndex = (currentActionIndex + 1) % list.length;
  return list[nextActionIndex];
};

export default nextElementInList;
