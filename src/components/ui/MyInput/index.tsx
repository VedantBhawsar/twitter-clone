import { FieldProps, useField } from "@formiz/core";
import { Input } from "antd";
import React from "react";

type MyFieldProps<FormattedValue> = FieldProps<string, FormattedValue>;

interface MyInputProps<FormattedValue> {
  placeholder: string;
  type: string;
  name: string;
  required: boolean;
  className?: string;
}

export const MyInput = (props:any) => {
  const { value, setValue, isRequired } = useField(props);
  const { placeholder, type, name, required, className } = props

  return (
    <Input
      placeholder={placeholder}
      type={type}
      size="large"
      name={name}
      required={true}
      variant="outlined"
      value={value ?? ""}
      onChange={(event) => setValue(event.target.value)}
      className={className ? className : "py-3 px-5 placeholder:text-gray-700"}
    />
  );
}