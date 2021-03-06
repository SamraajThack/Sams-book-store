import React from 'react'
import Menu from './Menu'
import "../styles.css"

const Layout = ({title = 'Title', description = 'Description',className, children}) =>  {
    return(
        <div className='bg-light'>
            <Menu />
            <div className = "jumbotron bg-light p-5" >
                <h2>{title}</h2>
                <p className = 'lead'>{description}</p>
             </div>

             <div className= {className} >{children}</div>
        </div>
         
    
    )
}

export default Layout;