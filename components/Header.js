import Image from "next/image";
import profilePic from "./Happy-Earth-Day.jpg";
import React from "react";

export default function Header() {
  return (
    <div className='flex flex-col items-center justify-center'>
      <h1 className='text-center'>HAPPY EARTH DAY</h1>
      <h3 className='text-center'>You could fry an egg on the sidewalk. Have you seen the weather? Find out below!</h3>
      <Image src={profilePic} width={200} height={200} alt='B-52 bombers' />
    </div>
  );
}
