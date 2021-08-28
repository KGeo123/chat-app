import { useState, useEffect } from 'react';

export default function useServerError() {
  const [serverError, setServerError] = useState('');

  useEffect(() => {
    setTimeout(() => setServerError(''), 5000);
  }, [serverError]);

  return [serverError, setServerError];
}
