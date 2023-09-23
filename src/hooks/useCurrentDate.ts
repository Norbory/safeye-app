import { useState, useEffect } from 'react';

function useCurrentDate() {
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const date = `${day}-${month}-${year}`;
    
    setFormattedDate(date);
  }, []);

  return formattedDate;
}

export default useCurrentDate;
