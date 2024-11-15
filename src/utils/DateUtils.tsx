export const formatDate = (date: Date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day < 10 ? '0' : ''}${day}-${
    month < 10 ? '0' : ''
  }${month}-${year}`;
};

export const enforceDateFormat = (input: string) => {
  let formatted = input.replace(/[^\d]/g, '');

  if (formatted.length > 2 && formatted.length <= 4) {
    formatted = `${formatted.slice(0, 2)}-${formatted.slice(2)}`;
  } else if (formatted.length > 4) {
    formatted = `${formatted.slice(0, 2)}-${formatted.slice(
      2,
      4,
    )}-${formatted.slice(4, 8)}`;
  }

  return formatted.slice(0, 10);
};

export const validateDate = (date: string) => {
  const datePattern = /^(\d{2})-(\d{2})-(\d{4})$/;
  return datePattern.test(date);
};
