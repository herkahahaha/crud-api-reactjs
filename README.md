# Reactjs Play CRUD

> Contoh pembelajaran melakukan metode Create Update Delete (CRUD) di Reactjs dengan bantuan API dummy dan database lokal secara realtime dengan bantuan _JSON Server_.

```
ReactJs Versi Class Component

branch: react-api
```

### Persiapan

1. API dummy/fake : https://jsonplaceholder.typicode.com/ atau kunjungi [source code berikut](https://github.com/typicode/json-server)

install JSON Server untuk menggunakan lokal API secara Realtime

```sh
npm install -g json-server
```

2. install package axios (optional)

```sh
npm i --save axios
```

<hr/>

## API GET

1. Penggunaan Fake API ditempatkan didalam `componentDidMount` agar datanya dapat terambil terlebih dahulu sebelum componen file jsx ter-render

```jsx
componentDidMount = () => {
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then(response => response.json())
    .then(res => console.log(res.data));
};
```

2. Kemudian lakukan `inspect element` dan pilih tab `console` pada jendela browser, akan didapati data yang terambil dari fake API tersebut dalam bentuk _Array of Object_

3. Menampilkan data yang didapatkan dari fake API, dengan menggunakan method looping dengan `map()` dan menambahkan `state` berbentuk _array_ untuk menampung perubahan data baru

```jsx
state = {
  dataApi: []
};

componentDidMount = () => {
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then(response => response.json())
    .then(res =>
      // melakukan perubahan data state baru
      this.setState({
        dataApi: res.data.slice(0, 10)
      })
    );
};
```

```jsx
...
render() {
    return (
      <div className="App">
        <h1>Belajar CRUD dan API</h1>
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
```

## API DELETE

1. Menambahkan method hapus data dan tombol hapus, namun ini tidak berfungsi menghapus data dari server fake API yang kita gunakan

```jsx
handleRemove = e => {
  console.log(e.target.value);
  fetch(`https://jsonplaceholder.typicode.com/posts/${e.target.value}`, {
    method: "DELETE"
  }).then(res => console.log(res));
};

render() {
    return (
      <div className="App">
        <h1>Belajar CRUD dan API</h1>
        {this.state.dataApi.map((data, index) => {
          return (
            <div key={index}>
              <h4> {data.title} </h4>
              <p>{data.body}</p>
              {/* Penambahaan Button hapus */}
              <button value={data.id} onClick={this.handleRemove}>
                Delete
              </button>
            </div>
          );
        })}
      </div>
    );
  }
```

## API POST & PUT

Penggunaan method POST dan PUT, dapat dilakukan dengan menggunakan database statis, dan dengan bantuan `JSON Server` agar perubahan dan penambahan data dapat secara realtime.

#### Tahapan Selanjutnya

1. Buat Database Statis dengan extensi `.json` didalam root file

2. jalankan terminal untuk menggunakan JSON Server

3. Menambahkan fungsi POST dan PUT

kunjungi [artikel ini](https://herkahahaha.com) untuk contoh cara penerapan fungsi CRUD selengkapnya.
