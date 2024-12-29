export const formatDate = (date: Date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day < 10 ? '0' : ''}${day}-${
    month < 10 ? '0' : ''
  }${month}-${year}`;
};

export const formattedTime = (date: Date) => {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
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

// In @utils/DateUtils.ts
export const formatDateInTurkish = (date: Date) => {
  const day = date.getDate();
  const monthNames = [
    'Ocak',
    'Şubat',
    'Mart',
    'Nisan',
    'Mayıs',
    'Haziran',
    'Temmuz',
    'Ağustos',
    'Eylül',
    'Ekim',
    'Kasım',
    'Aralık',
  ];
  const month = monthNames[date.getMonth()]; // Get Turkish month name
  const year = date.getFullYear();
  return `${day} ${month} ${year}`; // Format: "8 Kasım 2024"
};
