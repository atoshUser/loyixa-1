import React from "react";
import { FieldHookConfig, useField, ErrorMessage } from "formik";
import { TextFields } from "./text-fields.props";
const TextField = ({ ...props }: TextFields & FieldHookConfig<string>) => {
  const [field, meta, helpers] = useField(props);
  console.log("field =>", field);
  console.log("meta =>", meta);
  console.log("helpers =>", helpers);

  return (
    <div className="flex flex-col space-y-[4px] md:space-y-[6px]">
      <label className="inline-block w-full">
        <input
          className={`input text-[12px] md:text-[15px] lg:text-[18px] ${
            meta.error && "border border-red-500 "
          }`}
          {...props}
          {...field}
        />
      </label>
      <p className="text-red-500">{<ErrorMessage name={field.name} />}</p>
    </div>
  );
};

export default TextField;
