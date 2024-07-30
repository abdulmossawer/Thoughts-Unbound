import React from 'react';

function Comment({ userName, content }) {
  return (
    <div className="border-b border-gray-300 dark:border-gray-700 p-2">
      <h4 className="font-bold">{userName}</h4>
      <p>{content}</p>
    </div>
  );
}

export default Comment;
