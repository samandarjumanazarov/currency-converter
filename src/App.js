
import { useEffect } from "react";
import { useState } from "react";

export default function App() {
  const [output, setOutput] = useState("");
  const [input, setInput] = useState(1);
  const [from, setFrom] = useState("EUR");
  const [to, setTo] = useState("USD");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      async function fetchCurrency() {
        setIsLoading(true);
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${input}&from=${from}&to=${to}`
        );
        const data = await res.json();
        setOutput(data.rates[to]);
        console.log(data);
        setIsLoading(false);
      }

      if (from === to) return setOutput(input);
      fetchCurrency();
    },
    [input, to, from]
  );

  return (
    <div className="container">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(Number(e.target.value))}
        disabled={isLoading}
      />
      <select
        disabled={isLoading}
        value={from}
        onChange={(e) => setFrom(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        disabled={isLoading}
        value={to}
        onChange={(e) => setTo(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>
        {output} {to}
      </p>
    </div>
  );
}

