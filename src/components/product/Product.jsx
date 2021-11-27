import React from 'react'
import './product.css'

export default function Product({link, img}) {
    return (
        <div className='p'>
           <div className="p-browser">
               <div className="p-circle"></div>
               <div className="p-circle"></div>
               <div className="p-circle"></div>
           </div>
           <a href={link}>
               <img src={img} alt="hello" className="p-img" />
           </a>
        </div>
    )
}
