import * as React from 'react';
import styled from 'styled-components';

/**
 * Standard button.
 */
export const Button = styled.button`
  width: 100%;
  border: 1px solid #aaaaaa;
  border-radius: 6px;
  padding: 6px;

  color: #222222;
  font-size: 1.5em;
  background: linear-gradient(
    to bottom,
    #f2f2f2 0%,
    #ffffff 15%,
    #ffffff 80%,
    #f4f4f4
  );
`;

/**
 * Standard input.
 */
export const Input = styled.input`
  width: 100%;
  padding: 8px 5px;
  border: 1px solid #aaaaaa;
  border-radius: 4px;

  :invalid {
    background-color: #fff2f2;
    border: 1px solid #ffaaaa;
    outline-color: #ffaaaa;
  }
`;

/**
 * Standard textarea.
 */
export const TextArea = styled.textarea`
  width: 100%;
  padding: 8px 5px;
  border: 1px solid #aaaaaa;
  border-radius: 4px;

  :invalid {
    background-color: #fff2f2;
    border: 1px solid #ffaaaa;
    outline-color: #ffaaaa;
  }
`;
