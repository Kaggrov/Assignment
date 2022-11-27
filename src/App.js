import './App.css';
import Home from './Home';
import { ConfigProvider } from 'antd';
import React from 'react'
import en_GB from 'antd/locale/en_GB';

const App = () => {
  return (
    <ConfigProvider locale={en_GB}>
      <Home/>
    </ConfigProvider>
  )
}

export default App

