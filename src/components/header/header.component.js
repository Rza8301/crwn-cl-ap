import React from 'react';
import { connect } from 'react-redux'; 
import { createStructuredSelector } from 'reselect';

import { HeaderContainer, LogoContainer, OptionContainer, OptionLink, OptionDiv } from './header.styles';

import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.components';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import CartDropDown from '../cart-dropdown/cart-dropdown.components';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selector';


const Header = ({ currentUser, hidden }) => (
    <HeaderContainer>
        <LogoContainer to='/'>
            <Logo className='logo'/>
        </LogoContainer>
        <OptionContainer>
            <OptionLink to='/shop'>
                SHOP
            </OptionLink>
            <OptionLink to='/shop'>
                CONTACT
            </OptionLink>
            {
                currentUser ?(
                <OptionDiv onClick={() => auth.signOut()}>SIGN OUT</OptionDiv>
                ):(
                <OptionLink to='/signin'>SIGN IN</OptionLink>
                )}
            <CartIcon />
        </OptionContainer>
        {
            hidden ? null : <CartDropDown />
        }
    </HeaderContainer>
)

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});

export default connect(mapStateToProps)(Header);