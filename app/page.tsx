"use client";

import Header from "../components/Header";
import InputBox from "../components/InputBox";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";

export default function Home() {
  return (
    <NextUIProvider>
      <div className='m-2 justify-center align-center'>
        <Header />
        <InputBox />
      </div>
    </NextUIProvider>
  );
}
