import { Fragment  } from 'react';
import HeaderCartButton from './HeaderCartButton';
import Footer from './Footer'

import {Link} from "react-router-dom"
import classes from './Header.module.css';

import foodHeader from '../../assets/backimage.jpg';

function Header(props) {

    return (
        <Fragment>
            <header className= {classes.header}>
                <Link to="/"><h1 className='title'><em><strong>Thinespo</strong></em></h1></Link>

                
            <Link to="/order">  Order </Link>
            
                <HeaderCartButton onClick ={props.onShowCart}/>
            </header>
            <div className= { classes['main-image'] }style={{ height:"500px"}}>
                <img src= {foodHeader} alt='Main food header' ></img>

                
            </div>
            {props.flag && <Footer />}

            
            

        </Fragment>
    )
}

export default Header;
