"use client";

// 呼び出し側でvariant:カラー、size:サイズを選択

import Link from "next/link";
import React from "react";

type ButtonProps = {
  href?: string;
  variant?: "primary" | "secondary" | "gray";
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
    gray: "bg-gray-300 text-gray-700 duration-300 hover:opacity-50",
  }[variant];

  // ボタンサイズ選択
  const sizeClass = {
    sm: "px-8 py-2",
    md: "px-10 py-3 text-xl font-bold",
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
