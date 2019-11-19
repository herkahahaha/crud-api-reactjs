import React from "react";
import axios from "axios";

class App extends React.Component {
  state = {
    dataApi: [],
    dataPost: {
      id: 0,
      title: "",
      body: ""
    }
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

  addData = e => {
    // duplikat data state
    let newDataPost = { ...this.state.dataPost };
    // membuat id dinamis dengan get time
    newDataPost["id"] = new Date().getTime();
    // input data dinamis
    newDataPost[e.target.name] = e.target.value;

    this.setState(
      {
        dataPost: newDataPost
      },
      () => {
        console.log(this.state.dataPost);
      }
    );
  };

  clearData = () => {
    let newDataPost = { ...this.state.dataPost };
    newDataPost["id"] = "";
    newDataPost["title"] = "";
    newDataPost["body"] = "";
    this.setState({
      dataPost: newDataPost
    });
  };

  handleSubmit = () => {
    // axios("alamat url", data yang dikirmkan).then(kembalikan data baru)
    axios
      .post(`http://localhost:3003/posts`, this.state.dataPost)
      .then(() => this.getData());
  };

  handleRemove = e => {
    // Delete Data
    console.log(e.target.value);
    fetch(`http://localhost:3003/posts/${e.target.value}`, {
      method: "DELETE"
    }).then(res => this.getData());
  };

  render() {
    return (
      <div className="App">
        <h1>Belajar API</h1>
        <section>
          <input
            type="text"
            placeholder="Tambahkan Title"
            name="title"
            onChange={this.addData}
          />
          <input
            type="text"
            placeholder="Tambahkan body"
            name="body"
            onChange={this.addData}
          />
          <button type="submit" onClick={this.handleSubmit}>
            Tambah Data
          </button>
        </section>
        {this.state.dataApi.map((data, index) => {
          return (
            <div key={index}>
              <h4> {data.title} </h4>
              <p>{data.body}</p>
              <button value={data.id} onClick={this.handleRemove}>
                Delete
              </button>
              <button value={data.id}>Edit Data</button>
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;
