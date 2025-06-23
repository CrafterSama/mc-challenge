import React from 'react';

import { Card as CardComponent } from '@chakra-ui/react';

interface CardComponentProps {
  width?: string;
  height?: string;
  header?: string | React.ReactNode;
  children: React.ReactNode;
}

const Card = ({ header, children, ...props }: CardComponentProps) => {
  return (
    <CardComponent.Root {...props} variant="outline" shadow="xs" gap={4}>
      <CardComponent.Body gap={2}>
        {header && <CardComponent.Header>{header}</CardComponent.Header>}
        {children}
      </CardComponent.Body>
    </CardComponent.Root>
  );
};

export default Card;
