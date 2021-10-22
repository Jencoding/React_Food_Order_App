import { Fragment } from 'react'
import mealsImage from '../../assets/food_image2.jpg'
import classes from './Header.module.css'
import HeaderCartButton from './HeaderCartButton'

const Header = ( {onShowCart} ) => {
    return <Fragment>
    <header className={classes.header}>
      <h1>Meals Ordering</h1>
      <HeaderCartButton onClick={onShowCart}/>
    </header>
    <div className={classes['main-image']}>
      <img src={mealsImage} alt='A table full of food'/>
    </div>
    </Fragment>
}

export default Header
