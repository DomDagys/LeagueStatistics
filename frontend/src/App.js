import React from 'react';
import LoginForm from './components/loginForm/LoginForm';
import NavigationBar from './components/navigation/NavigationBar'

function App() {
  return (
    <div className="App">
      <NavigationBar/>
      <h1>Hello World!</h1>
      <LoginForm/>
    </div>
  );
}

export default App;
