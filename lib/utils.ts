export const capitalize = (str: string) => {
  if (!str) return "";
  return str.toLowerCase().split(' ').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
};

// Usage: capitalize("chicken roll") -> "Chicken Roll"