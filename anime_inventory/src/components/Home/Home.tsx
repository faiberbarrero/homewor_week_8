import React from 'react';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom'
import { Button, CircularProgress } from '@mui/material';
import drone_image from '../../assets/images/terrel.jpg'
import { transform } from 'typescript';
import { link } from 'fs';
import { useSigninCheck } from 'reactfire';
import { getAuth } from 'firebase/auth'
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';


interface Props{
    title: string;
}

const Root = styled('div')({
    padding: 0,
    margin: 0
})

const NavbarContainer = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
})

const Logo = styled('h1')({
    margin: '0,0,0,0.45em'
})

const LogoA = styled('a')( {
    color: 'rgb(28,24,22)',
    listStyle: 'none',
    textTransform: 'uppercase',
    textDecoration: 'none'
})
const LogoNavigation = styled('ul')( {
    listStyle: 'none',
    textTransform: 'uppercase',
    textDecoration: 'none',
    display: 'flex'
})

const NavA = styled(Link)({
    display: 'block',
    padding: '1em',
    color: 'black'
})
const Main = styled('main')( {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${drone_image});`,
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    position: 'absolute',
})
const MainText = styled('div')({
    textAlign: 'center',
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'white'
})

const SignInText =() =>{
    const auth = getAuth();
    const [signInWithGoogle, user, loading, error] =useSignInWithGoogle(auth)
    if (loading){
        return <CircularProgress />
    } if (user) {
        return <NavA to='/signin'>Sign Out</NavA>
      } else {
        return <NavA to='/signin'>Sign In</NavA>
      }
}

export const Home = (props:Props) => {
    return (
        <Root>
            <NavbarContainer>
                <Logo>
                    <LogoA href="#">Ranger Drones</LogoA>
                </Logo>
                <LogoNavigation>
                    <li>
                        <NavA to ="#">Home</NavA>
                    </li>
                    <li>
                        <NavA to ="/dashboard">Dashboard</NavA>
                    </li>
                    <li>
                        <SignInText />
                    </li>
                </LogoNavigation>
            </NavbarContainer>
            <Main>
                <MainText>
                    <h1>{props.title}</h1>
                    <p> Drones are fly.</p>
                    <Button color='primary' variant='contained' component={Link} to = './Dashboard'>See the Drones</Button>
                </MainText>
            </Main>

        </Root>
    )
}