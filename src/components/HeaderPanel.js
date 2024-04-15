import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from "@material-ui/core/styles";
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Slide from '@material-ui/core/Slide';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import ButtonBase from '@material-ui/core/ButtonBase'
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Link from '@material-ui/core/Link';


var ReactRotatingText = require("react-rotating-text");


const HeaderPanel = () => {
    const styles = make()
    const [anchorEl, setAnchorEl] = React.useState(null);
    // const isscroll = useScrollTrigger(); 
    const [scroll, setScroll] = React.useState(true)

    const handleScroll = () => {
        window.scrollY > 100 ? setScroll(false) : setScroll(true)
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };

    useEffect(() => {
        document.addEventListener('scroll', handleScroll)
    },[])

   
    return (
        <div className = {styles.root}>
            {document.removeEventListener('scroll', handleScroll)}
            
            <AppBar static
                elevation = {0}
                className={styles.appbar} style={{
                transition: 'all 0.25s ease-in-out',
                backgroundColor: scroll ? "transparent" : "#2a2a2b"
            }}>
                <Toolbar style={{flexDirection:"row", justifyContent:"center", alignText:"center"}}>
                    <Typography variant="h5" className= {styles.typo} style= {{
                        color: scroll ? '#2a2a2b' : 'white' 
                    }}> Durga Darba : </Typography>

                    <IconButton edge="end" aria-label="menu" onMouseOver={handleClick} onClick={handleClick} 
                    style={{
                        transition: 'all 0.25s ease-in-out',
                        color: scroll ? '#2a2a2b' : 'white'

                    }}>
                        <MenuIcon fontSize="large"/>
                    </IconButton>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        MenuListProps={{ onMouseLeave: handleClose }}
                        className={styles.menu}
                    >
                        <MenuItem onClick={handleClose} className={styles.menu}>
                            <ButtonBase href={"/"}>
                                <Typography component="h2" variant="subtitle1" className={styles.typo}>
                                home
                                </Typography>
                            </ButtonBase>
                        </MenuItem>
                        <MenuItem onClick={handleClose} className={styles.menu}>
                            <ButtonBase href={"/#projects"}>
                                <Typography component="h2" variant="subtitle1" className={styles.typo}>
                                projects
                                </Typography>
                            </ButtonBase>
                        </MenuItem>
                        <MenuItem onClick={handleClose} className={styles.menu}>
                            <ButtonBase href={"/#aboutme"}>
                                <Typography component="h2" variant="subtitle1" className={styles.typo}>
                                about me
                                </Typography>
                            </ButtonBase>
                        </MenuItem>
                        <MenuItem onClick={handleClose} className={styles.menu}>
                            <ButtonBase href={"/#contact"}>
                                <Typography component="h2" variant="subtitle1" className={styles.typo}>
                                connect
                                </Typography>
                            </ButtonBase>
                        </MenuItem>
                    </Menu>

                </Toolbar>
            </AppBar>
            
            <div className={styles.helloworld}>
                <Typography variant="h2"> 
                    <ReactRotatingText items={['Welcome to my website.', 'Check out everything I\'m working on.']} pause={1000} typingInterval={100}/>
                </Typography>
            </div>
            
            <Slide direction="up" in={true} mountOnEnter timeout={500}>
                <div className={styles.arrow}>



                    <Link href={'/#projects'} underline={'none'} color={'inherit'}>
                        <Typography variant="h5" > 
                                Projects
                        </Typography>
                        <ArrowDownwardIcon style={{ fontSize: 30 }}/>
                    </Link>
                    


                </div>
            </Slide>
        </div>
        
    )
}

const make = makeStyles({
    root : {
        display : 'flex',
        justifyContent : 'center',
        // marginTop : '10%',
        height : '100vh',
    },

    arrow : {
        position : 'absolute',
        width : '100vw',
        // flexDirection : 'column
        textAlign : 'center',
        justifyContent : 'center',
        alignSelf : 'flex-end',
        // display: 'flex',
        color : 'white',
        marginBottom : '10vh',
    },

    helloworld : {
        marginTop : '25vh',
        color : 'white',
        
    },
    appbar : {
        background:"none", 
        marginBottom: 10,
    },

    menu : {
        color: '#2a2a2b',

    },

    iconbutton : {
        color: '#2a2a2b'
    },

    typo : {
        flexGrow: 1,
        padding: 15,
        width: "10%",
        fontFamily : 'arial', 
        color : '#2a2a2b'

        
    }

});


export default HeaderPanel;
