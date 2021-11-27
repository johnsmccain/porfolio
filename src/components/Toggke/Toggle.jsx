import React,{useContext} from 'react'
import './toggle.css'
import sun from '../../img/sun.png'
import moon from '../../img/moon.png'
import { ThemeContext } from '../../contex'
export default function Toggle() {
    const theme = useContext(ThemeContext);
    const dark = theme.state.darkMode;
    const hanldeClick =()=> {
        theme.dispatch({type:"TOGGLE"})
    }
    return (
        <div className='t' onClick={hanldeClick}>
            <img src={sun} className='t-icon'alt="light mode" />
            <img src={moon}className='t-icon' alt="dark mode" />
            <div className={dark?"t-btn ": "t-btn dark" } ></div>
        </div>
    )
}
