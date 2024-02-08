"use client";
import { FieldProps, useField } from "@formiz/core";
import { Input } from "antd";
import React, { useState } from "react";

type MyFieldProps<FormattedValue> = FieldProps<string, FormattedValue>;

interface MyInputProps<FormattedValue> {
  placeholder: string;
  type: string;
  name: string;
  required: boolean;
  className?: string;
}

export const MyInput = (props: any) => {
  const { value, setValue, isRequired, errorMessages, isValid, errorMessage } =
    useField(props);
  const { placeholder, type, name, required, className } = props;
  const [error, setError] = useState<string | undefined>(undefined);
  return (
    <>
      <Input
        placeholder={placeholder}
        status={error ? "error" : ""}
        type={type}
        size="large"
        name={name}
        required={isRequired}
        variant="outlined"
        value={value ?? ""}
        onChange={(event) => setValue(event.target.value)}
        className={
          className ? className : "py-3 px-5 placeholder:text-gray-700 border-2"
        }
        onBlur={(event) =>
          !isValid ? setError(errorMessage) : setError(undefined)
        }
      />
      {error && <p className="text-red-400 text-sm">{errorMessage}</p>}
    </>
  );
};
