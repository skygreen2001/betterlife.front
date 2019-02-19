import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './lib/redux';
import InboxScreen from './components/InboxScreen';

class App extends Component {
  render() {
    var t = "aaa";
    console.log(t);
    return (
      <Provider store={store}>
        <InboxScreen />
      </Provider>
    );
  }
}

export default App;



// import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <p>
//             Edit <code>src/App.js</code> and save to reload.
//           </p>
//           <a
//             className="App-link"
//             href="https://reactjs.org"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Learn Create React App
//           </a>
//         </header>
//       </div>
//     );
//   }
// }

// export default App;
