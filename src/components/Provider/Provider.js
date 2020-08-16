import React from 'react';

function recursive(containers, children) {
  if (containers.length < 1) return children;

  const Container = containers.shift();

  return (
    <Container.Provider>
      {recursive(containers, children)}
    </Container.Provider>
  );
}

export default function Provider({ containers, children }) {
  return recursive([...containers], children);
}
