import React from "react";
import axios from "axios";

class App extends React.Component {
  state = {
    dataApi: []
  };

  getData = () => {
    // GET data
    axios.get("http://localhost:3003/posts").then(res =>
      this.setState({
        dataApi: res.data.slice(0, 10)
      })
    );
  };
  componentDidMount = () => {
    // fetch("https://jsonplaceholder.typicode.com/posts")
    //   .then(response => response.json())
    //   .then(res =>
    //     this.setState({
    //       dataApi: res
    //     })
    //   );
    this.getData();
  };

  handleRemove = e => {
    console.log(e.target.value);
    fetch(`http://localhost:3003/posts/${e.target.value}`, {
      method: "DELETE"
    }).then(res => this.getData());
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
              <button value={data.id} onClick={this.handleRemove}>
                Delete
              </button>
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;
