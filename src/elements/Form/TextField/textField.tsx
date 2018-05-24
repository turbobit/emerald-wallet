// @flow
import * as React from 'react';
import { TextField as ReduxFormTextField } from 'redux-form-material-ui';

const defaultStyle = {
  color: '#191919',
  fontSize: '16px',
  lineHeight: '24px',
};

type Container = {
  boxSizing: string,
  border: string,
  borderColor: string,
  borderRadius: string,
  paddingLeft: string,
  paddingRight: string,
  display: string,
  alignItems: string,
  width?: string,
  maxHeight?: string,
  minWidth?: string
};

const container: Container = {
  boxSizing: 'border-box',
  border: '1px solid',
  borderColor: '#DDDDDD',
  borderRadius: '1px',
  paddingLeft: '10px',
  paddingRight: '10px',
  display: 'flex',
  alignItems: 'center'
};


type Props = {
  rightIcon: JSX.Element,
  leftIcon: JSX.Element,
  error: string,
  style: {
    maxHeight: string,
    minWidth: string
  },
  fieldStyle: any,
  fullWidth: boolean,
  meta: {
    touched: boolean,
    error: Error
  }
}

export const TextField = ({ rightIcon, error, style, leftIcon, fieldStyle, ...other }: Props): JSX.Element => {
  if (other.fullWidth) {
    container.width = '100%';
  }

  const invalid = error || (other.meta && other.meta.touched && other.meta.error);
  let containerStyle = invalid ? {...container, borderColor: '#BC0000' } : container;
  if (style) {
    const { maxHeight, minWidth } = style;
    containerStyle = { ...containerStyle, maxHeight, minWidth };
  }

  const textFieldStyle = invalid ? {...defaultStyle, color: '#BC0000' } : defaultStyle;
  return (
    <div style={ containerStyle }>
      { leftIcon } <ReduxFormTextField { ...other } style={{...fieldStyle, ...textFieldStyle}} />{ rightIcon }
    </div>
  );
};


export default TextField;
