import React, { useState, useEffect } from 'react'
import MyInputText from '@/components/controlled-form/my-input-text'
import MyTextarea from '@/components/controlled-form/my-textarea'
import MySelect from '@/components/controlled-form/my-select'
import MyRadioButtonGroup from '@/components/controlled-form/my-radio-button-group'

import MyCheckboxGroup from '@/components/controlled-form/my-checkbox-group'

export default function ControlledForm() {
  return (
    <>
      <h1>可控表單元件</h1>
      {/* <MyInputText /> */}
      {/* <MyTextarea /> */}
      {/* <MySelect /> */}
      {/* <MyRadioButtonGroup /> */}
      <MyCheckboxGroup />
    </>
  )
}
