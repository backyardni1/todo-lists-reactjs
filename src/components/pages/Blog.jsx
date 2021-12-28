import React from 'react';
import { Link } from 'react-router-dom';

export default function Blog() {
  return (
    <div>
      <div className="post-container">
        <Link to="/blog/1">Post number 1</Link>
      </div>

      <div className="post-container">
        <Link to="/blog/2">Post number 2</Link>
      </div>
    </div>
  );
}
