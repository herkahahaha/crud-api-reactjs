import React from "react";
import axios from "axios";

class App extends React.Component {
  state = {
    dataApi: []
  };
  componentDidMount = () => {
    // fetch("https://jsonplaceholder.typicode.com/posts")
    //   .then(response => response.json())
    //   .then(res =>
    //     this.setState({
    //       dataApi: res
    //     })
    //   );

    // GET data
    axios.get("https://jsonplaceholder.typicode.com/posts").then(res =>
      this.setState({
        dataApi: res.data.slice(0, 10)
      })
    );
  };
  render() {
    return (
      <div className="App">
        <h1>Belajar API</h1>
        {this.state.dataApi.map((data, index) => {
          return (
            <div key={index}>
              <h4> {data.title} </h4>
              <p>{data.body}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;
