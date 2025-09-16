"use client";

// 呼び出し側でvariant:カラー、size:サイズを選択、shape:形を選択

import Link from "next/link";
import React from "react";

type ButtonProps = {
  href?: string;
  variant?: "primary" | "secondary" | "gray" | "white" | "red";
  size?: "sm" | "md" | "lg";
  shape?: "rounded" | "square";
} & React.ComponentProps<"button">;

const Button = ({
  children,
  href,
  onClick,
  className = "",
  variant = "primary",
  size = "md",
  shape = "rounded",
}: ButtonProps) => {
  // ボタンカラー選択
  const variantClass = {
    primary: "bg-primary text-white duration-300 hover:opacity-50",
    secondary: "bg-secondary text-white duration-300 hover:opacity-50",
    gray: "bg-gray-200 text-gray-600 duration-300 hover:opacity-50",
    red: "bg-rose-900 text-white duration-300 hover:opacity-50",
    white:
      "bg-gray-white border border-gray-200 text-gray-600 duration-300 hover:opacity-50",
  }[variant];

  // ボタンサイズ選択
  const sizeClass = {
    sm: "px-10 py-2 text-sm",
    md: "px-10 py-3 text-lg font-bold",
    lg: "",
  }[size];

  // 形選択
  const shapeClass = {
    rounded: "rounded-full",
    square: "",
  }[shape];

  // ボタン共通css
  const baseClass = "transform tracking-widest hover:cursor-pointer shadow-md";

  // 全てのcssまとめ
  const combinedClass = `${variantClass} ${sizeClass} ${shapeClass} ${baseClass} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClass}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={combinedClass}>
      {children}
    </button>
  );
};

export default Button;
