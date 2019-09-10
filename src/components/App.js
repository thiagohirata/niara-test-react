import React from 'react'
import { hot } from 'react-hot-loader'
import '../scss/index.scss'
import HotelSearch from './hotelSearch'

const App = props => {
    return <div>
        <HotelSearch/>
    </div>
}

export default hot(module)(App)