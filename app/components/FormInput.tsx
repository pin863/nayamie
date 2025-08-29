import React from "react";

export type FormInputProps = {
  label: string;
  placeholder?: string;
  labelShow?: boolean;
  as?: "input" | "textarea";
  rows?: number;
  postScreen?: boolean;
};

const FormInput = ({
  label,
  placeholder,
  labelShow,
  as = "input",
  rows = 8,
  postScreen = false,
}: FormInputProps) => {
  // クラスを切り替え
  const baseClass =
    "my-3 w-full rounded-sm py-3 pl-3 text-sm shadow-sm tracking-wider placeholder:text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-300 focus:outline-none";
  // 投稿入力画面の時のクラス
  const styleClass = postScreen
    ? `bg-white border border-gray-300 ${baseClass}`
    : `bg-gray-100 ${baseClass}`;

  return (
    <div>
      {/* ラベル名を表示させる場合 */}
      {labelShow && (
        <label
          htmlFor={label}
          className="text-sm pl-3 font-bold tracking-widest text-gray-500"
        >
          {label}
          <span className="text-red-500">*</span>
        </label>
      )}
      {as === "textarea" ? (
        <textarea
          id={label}
          name={label}
          rows={rows}
          className={styleClass}
          placeholder={placeholder}
        />
      ) : (
        <input
          id={label}
          name={label}
          type="text"
          className={styleClass}
          placeholder={placeholder}
        />
      )}
    </div>
  );
};

export default FormInput;
