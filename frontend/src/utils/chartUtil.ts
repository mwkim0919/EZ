export const getRandomColors = (data: any[]): string[] => {
  const colors: string[] = [];

  const dynamicColors = () => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  };

  data.forEach(datum => {
    colors.push(dynamicColors());
  });

  return colors;
};
