import * as React from 'react';
import styled, { css } from 'styled-components';

interface ButtonProps {
  /** Show a loading spinner */
  loading?: boolean;
  /** Change the background color of the button */
  color?: string;

  type?: string;
  // tslint:disable-next-line
  onClick?: any;

  // tslint:disable-next-line
  children: any;
}

const base = css`
  display: flex;
  border-radius: 8px;
  cursor: pointer;
`;

const StyledButton = styled.button`
  ${base};
  background-color: ${props => props.color}};
`;

const Label = styled<{ loading?: boolean }, 'span'>('span')`
  ${props => (props.loading ? 'opacity: 0' : 'opacity: 1')};
`;

export const Button = (props: ButtonProps) => {
  const { loading } = props;
  return (
    <StyledButton {...props} color={props.color} disabled={loading}>
      <Label>{props.children}</Label>
    </StyledButton>
  );
};
