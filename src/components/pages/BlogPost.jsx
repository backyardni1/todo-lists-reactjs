import React from 'react';
import { useParams } from 'react-router-dom';

export default function BlogPost() {
  let { id } = useParams();

  return <div>The blog post is {id}</div>;
}
