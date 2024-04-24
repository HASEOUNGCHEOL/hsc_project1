import React from 'react';

const CustomDate = () => {
  const now = new Date();
  const date = now.toISOString().split('T')[0];
  const time = now.toTimeString().split(' ')[0].substring(0, 5);
  const defaultDateTime = `${date}T${time}`;

  return (
    <div>
      <input type="datetime-local" defaultValue={defaultDateTime} />
    </div>
  );
};

export default CustomDate;