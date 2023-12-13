import React, { useState } from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@nextui-org/react";
import "./styles.css";

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
      setData(wxdata.weather);
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
          label='Search City, Airport Code, or GPS Coordinates.'
          variant='bordered'
          placeholder='HND'
          className='w-full'
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
            {data?.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item?.date}</TableCell>
                <TableCell>{item?.avgtempC}</TableCell>
                <TableCell>{item?.avgtempF}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
