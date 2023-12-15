import React, { useState } from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { Card, CardFooter } from "@nextui-org/react";
import { Divider } from "@nextui-org/react";
import Image from "next/image";
import "./styles.css";
import profilePic from "./Howdare.webp";
import WxTable from "./WxTable";

export default function InputBox() {
  const [location, setLocation] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://wttr.in/${location}?format=j1`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const wxdata = await response.json();
      setData(wxdata);
    } catch (error) {
      console.error("Fetching error: ", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const clearInput = () => {
    setLocation("");
    setIsSubmitted(false);
    setError(null);
  };

  const handleChange = (event) => {
    setLocation(event.target.value);
    setIsSubmitted(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitted(true);
    fetchData();
  };

  return (
    <div className='flex flex-col items-center justify-center'>
      <form onSubmit={handleSubmit} className='input-container w-1/3'>
        <Input
          isClearable
          autoCorrect='off'
          autoComplete='off'
          value={location}
          label='Search City, ICAO Airport Code, or GPS Coordinates.'
          variant='bordered'
          placeholder='Sapporo'
          className='w-full min-w-500px'
          onClear={clearInput}
          onChange={handleChange}
        />
        <Button type='submit' color='primary' disabled={isLoading}>
          {isLoading ? "Loading..." : "Submit"}
        </Button>
      </form>
      <br />
      <a href='https://wttr.in/:help'>Powered by wttr.in</a>
      <br />
      {error && <p>Error: {error}</p>}
      {data && !error && (
        <>
          <Table
            aria-label='Weather forecast table'
            className='w-1/3'
            css={{
              height: "auto",
              minWidth: "100%",
            }}
          >
            <TableHeader>
              <TableColumn>{"Date"}</TableColumn>
              <TableColumn>{"Avg Temp (°C)"}</TableColumn>
              <TableColumn>{"Avg Temp (°F)"}</TableColumn>
            </TableHeader>
            <TableBody>
              {data.weather?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item?.date}</TableCell>
                  <TableCell>{item?.avgtempC}</TableCell>
                  <TableCell>{item?.avgtempF}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <br />
          <Card isFooterBlurred radius='lg' className='border-none'>
            <Image src={profilePic} className='object-cover' height={300} width={300} alt='How dare you!' />
            <CardFooter className='justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10'>
              <p className='text-tiny text-white/80 text-left'>{data?.nearest_area[0].region[0].value}</p>
              <Button className='text-tiny text-white bg-black/20' variant='flat' color='default' radius='lg' size='sm'>
                {data?.nearest_area[0].country[0].value}
              </Button>
            </CardFooter>
          </Card>
          <Divider className='my-4 max-w-4xl' />
          <WxTable props={data} />
        </>
      )}
    </div>
  );
}
