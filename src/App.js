import React from "react";
import axios from "axios";

class App extends React.Component {
  state = {
    dataApi: [],
    editData: false,
    dataPost: {
      id: 0,
      title: "",
      body: ""
    }
  };

  // Mengambil seluruh data yang ada didalam database
  getData = () => {
    axios.get("http://localhost:3003/posts").then(res =>
      this.setState({
        dataApi: res.data.slice(0, 10),
        editData: false
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
    if (this.state.editData === false) {
      // membuat id dinamis dengan get time
      newDataPost["id"] = new Date().getTime();
    }
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

  // membuat fungsi global membersihkan input
  clearData = () => {
    let newDataPost = { ...this.state.dataPost };
    newDataPost["id"] = "";
    newDataPost["title"] = "";
    newDataPost["body"] = "";
    this.setState({
      dataPost: newDataPost
    });
  };

  // fungsi mengirimkan input data baru kedalam state
  handleSubmit = () => {
    if (this.state.editData === false) {
      // axios("alamat url", data yang dikirmkan).then(kembalikan data baru)
      axios
        .post(`http://localhost:3003/posts`, this.state.dataPost)
        .then(() => {
          this.getData();
          this.clearData();
        });
    } else {
      axios
        .put(
          `http://localhost:3003/posts/${this.state.dataPost.id}`,
          this.state.dataPost
        )
        .then(() => {
          this.clearData();
          this.getData();
        });
    }
  };

  // Fungsi Hapus Data
  handleRemove = e => {
    console.log(e.target.value);
    fetch(`http://localhost:3003/posts/${e.target.value}`, {
      method: "DELETE"
    }).then(res => this.getData());
  };

  // Fungsi Edit data yang sudah ada
  editDataId = e => {
    axios.get(`http://localhost:3003/posts/${e.target.value}`).then(res => {
      this.setState({
        dataPost: res.data,
        editData: true
      });
    });
  };

  render() {
    return (
      <div className="App">
        <h1>Belajar CRUD dan API</h1>
        <section>
          <input
            type="text"
            value={this.state.dataPost.title}
            placeholder="Tambahkan Title"
            name="title"
            onChange={this.addData}
          />
          <input
            type="text"
            value={this.state.dataPost.body}
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
              <button value={data.id} onClick={this.editDataId}>
                Edit Data
              </button>
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;
