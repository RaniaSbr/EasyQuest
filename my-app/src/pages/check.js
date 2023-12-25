import React from 'react';
import styled from 'styled-components';

const CheckboxWrapper = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  opacity: 0;
  cursor: pointer;
`;

const StyledCheckbox = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 100px;
  margin-right: 10px;
  background-image: url('./Assets/non_checked.png');
  background-size: cover;
  background-color: ${props => (props.checked ? '#00ADB5' : 'transparent')};
  
  &:hover {
    border-color: #5FFBF1;
  }
`;


const Checkbox = ({ label, checked, onChange }) => {
  return (
    <CheckboxWrapper>
      <HiddenCheckbox checked={checked} onChange={onChange} />
      <StyledCheckbox checked={checked} />
    </CheckboxWrapper>
  );
};

export default Checkbox;
