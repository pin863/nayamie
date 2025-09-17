"use client";

import type { FormInputProps } from "@/types/type";
import { forwardRef } from "react";

const FormInput = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  FormInputProps
>(
  (
    {
      label,
      placeholder,
      labelShow = true,
      as = "input",
      rows = 8,
      postScreen = false,
      type = "text",
      ...props
    },
    ref
  ) => {
    // クラスを切り替え
    const baseClass =
      "my-3 w-full rounded-sm py-3 pl-3 text-sm shadow-sm tracking-wider placeholder:text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-300 focus:outline-none";
    const styleClass = postScreen
      ? `bg-white border border-gray-300 ${baseClass}`
      : `bg-gray-100 ${baseClass}`;

    return (
      <div>
        {/* ラベル名を表示させる場合 */}
        {labelShow && (
          <label
            htmlFor={label}
            className="text-sm font-bold tracking-widest text-gray-500"
          >
            {label}
            <span className="text-red-500">*</span>
          </label>
        )}

        {as === "textarea" ? (
          <textarea
            id={label}
            rows={rows}
            className={styleClass}
            placeholder={placeholder}
            ref={ref as React.Ref<HTMLTextAreaElement>}
            {...props}
          />
        ) : (
          <input
            id={label}
            type={type}
            className={styleClass}
            placeholder={placeholder}
            ref={ref as React.Ref<HTMLInputElement>}
            {...props}
          />
        )}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput;
