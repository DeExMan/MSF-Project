import React from 'react'
import {Link} from 'react-router-dom'
import {Button} from '@mui/material/'
import { createTheme, ThemeProvider } from '@mui/material/styles';

function CustomLink({children, to, variant, color, ...props}) {
    return (

        <Link to={to} 
            style={{
                color:'white',
                textDecoration: 'none'
            }} 
            {...props}
            >
                <Button variant={variant} color={color}>
                <div style={{
                fontSize:'24px'}}>{children}</div>
                </Button>
        </Link>
        
        
    )
}

export {CustomLink}
