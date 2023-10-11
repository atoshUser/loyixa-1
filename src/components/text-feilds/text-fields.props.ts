import { DetailedHTMLProps, InputHTMLAttributes } from "react";

export interface TextFields
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}
