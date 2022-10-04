import React from 'react';
import { Button as ButtonBase, IButtonProps, Heading } from 'native-base';

type Props = IButtonProps & {
  title: string
}

export function Button({title, ...rest}:Props) {
  return (
    <ButtonBase 
      bg="green.700"
      h={14}
      fontSize="sm"
      rounded="sm"
      _pressed={{ bg: "green.500"}}
        {...rest}>
      <Heading color="white" fontSize="md">{title}</Heading>
    </ButtonBase>
  );
}