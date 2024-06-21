import React, { useState, useEffect } from "react";
import "./App.css";
function DataList() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [singleData, setSingleData] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const fetchDataWithQuery = () => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${query}`)
      .then((response) => response.json())
      .then((data) => setSingleData(data))
      .catch((error) => console.error("Error fetching single data:", error));
  };

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div>
      <div className="form">
        <h2>Fetch Single Data</h2>
        <input
          type="text"
          placeholder="Enter query"
          value={query}
          onChange={handleQueryChange}
        />
        <button onClick={fetchDataWithQuery}>Fetch</button>
      </div>

      {singleData === null ? (
        <div>
          <h2>Data List</h2>
          <table>
            <tr>
              <th>ID</th>
              <th>Title</th>
            </tr>

            {data.map((item) => (
              // console.log(item)
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
              </tr>
            ))}
          </table>
        </div>
      ) : (
        <div>
          <h3>Single Data</h3>
          <table>
            <thead>
              <tr>
                <th>id</th>
                <th>Title</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{singleData.id}</td>
                <td>{singleData.title}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default DataList;
