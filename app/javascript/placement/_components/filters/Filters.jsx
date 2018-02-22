import React from 'react';
import SideBar from 'react-wood-duck/dist/SideBar';
import DropDownField from 'react-wood-duck/dist/DropDownField';
import InputComponent from 'react-wood-duck/dist/InputComponent';

const Filters = () => {
  return (
    <div>
      <SideBar>
        <InputComponent label="Near Zip Code" />
        <InputComponent label="Secondary Zip Code" />
        <DropDownField label="Sort By" />
      </SideBar>
    </div>
  );
};

export default Filters;
