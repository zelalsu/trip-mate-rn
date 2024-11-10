// src/utils/DateUtils.ts

// Utility function to format the date into DD-MM-YYYY
export const formatDate = (date: Date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are 0-indexed
  const year = date.getFullYear();
  return `${day < 10 ? '0' : ''}${day}-${
    month < 10 ? '0' : ''
  }${month}-${year}`;
};

// Function to enforce date format on manual input
export const enforceDateFormat = (input: string) => {
  // Remove all non-numeric characters
  let formatted = input.replace(/[^\d]/g, '');

  // Add hyphen after day and month
  if (formatted.length > 2 && formatted.length <= 4) {
    formatted = `${formatted.slice(0, 2)}-${formatted.slice(2)}`;
  } else if (formatted.length > 4) {
    formatted = `${formatted.slice(0, 2)}-${formatted.slice(
      2,
      4,
    )}-${formatted.slice(4, 8)}`;
  }

  // Limit the length to 10 characters (DD-MM-YYYY)
  return formatted.slice(0, 10);
};

// Simple date validation to ensure DD-MM-YYYY format
export const validateDate = (date: string) => {
  const datePattern = /^(\d{2})-(\d{2})-(\d{4})$/;
  return datePattern.test(date);
};
