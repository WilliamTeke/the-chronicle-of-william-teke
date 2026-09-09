import { useEffect, useState } from 'react';

const formatter = new Intl.DateTimeFormat('en-US', {
  hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'America/New_York',
});

export default function LiveClock() {
  const [clock, setClock] = useState(() => formatter.format(new Date()));
  useEffect(() => {
    const interval = window.setInterval(() => {
      if (!document.hidden) setClock(formatter.format(new Date()));
    }, 1000);
    return () => window.clearInterval(interval);
  }, []);
  return <span>· {clock} ET</span>;
}
