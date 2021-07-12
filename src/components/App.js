import React, { Component } from "react";

import './styles/App.scss';
import { navigationDb } from '../db/navigationDB';
import { textsDb } from '../db/textsDB';

import InfoScreen from "./InfoScreen";
import Video from './Video';
import Menu from './Menu';
import { socialMedia } from "../db/SocialN";

const PUBLIC_URL = process.env.PUBLIC_URL;
const isItMobileLayout = window.screenWidth < 765;

class App extends Component {
    state = {
        currentSlideId: 1,
        idUp: null,
        idDown: null,
        idLeft: null,
        idRight: null,
        navigationDb: navigationDb,
        textsDb: textsDb,
        currentNavigationObject: null,
        currentContentObject: null,
        name1: '',
        name2: '',
        name3: '',
        fullName: '',
        slogan: '',
        text: '',
        comment1: '',
        comment2: '',
        comment3: '',
        linkImg: '',
        linkVideo: '',
        showMenu: false,
        showSecondMenu: false,
        showInfoScreen: false,
        showVideo: false,
        blur: false,
        blurAll: false,
        shiftX: null,
        shiftY: null,
        coordX: null,
        coordY: null,
    };

    componentDidMount() {
        this._isMounted = true;
        let currentUrl = window.location.href;
        let needId = currentUrl.slice(currentUrl.indexOf('=') + 1);
        //console.log(needId);
        if (needId.length > 10) {
            this.setState({ currentSlideId: 1 });
        } else {
            this.setState({ currentSlideId: needId });
        }
        this.setContent();
        this.setNavigation();
        this.parallax();
        document.addEventListener('mousemove', this.parallax);
    }
    
    componentWillUnmount() {
        document.removeEventListener('mousemove', this.parallax);
    }

    parallax = (e) => {
        if(e) {
            let x = e.pageX / window.innerWidth;
            let y = e.pageY / window.innerHeight;
            this.setState({ shiftX: x * 50, shiftY: y * 50 });
        }
    }

    setContent = () => {
        const { textsDb, currentSlideId } = this.state;
        let needContentObject = textsDb.filter(item => item.id === Number(currentSlideId));
        //console.log(needContentObject[0]);
        this.setState({
            currentContentObject: needContentObject[0],
            name1: needContentObject[0].name1,
            name2: needContentObject[0].name2,
            name3: needContentObject[0].name3,
            fullName: needContentObject[0].fullName,
            slogan: needContentObject[0].slogan,
            text: needContentObject[0].text,
            comment1: needContentObject[0].comment1,
            comment2: needContentObject[0].comment2,
            comment3: needContentObject[0].comment3,
            linkImg: needContentObject[0].linkImg,
            // linkVideo: needContentObject[0].linkVideo,
        });
    }

    setNavigation = () => {
        const { navigationDb, currentSlideId } = this.state;
        let needNavigationObject = navigationDb.filter(item => item.id === Number(currentSlideId));
        //console.log(needNavigationObject[0]);
        this.setState({
            currentNavigationObject: needNavigationObject[0],
            idUp: needNavigationObject[0].idUp,
            idDown: needNavigationObject[0].idDown,
            idLeft: needNavigationObject[0].idLeft,
            idRight: needNavigationObject[0].idRight,
        });
    }

    move = (way) => {
        const { currentNavigationObject, showMenu } = this.state;
        if (!showMenu && currentNavigationObject[way]) {
            this.setState({ currentSlideId: currentNavigationObject[way] },()=>{
                this.setNavigation();
                this.setContent();
            });
        }
    }

    goToStart = () => {
        const { showMenu } = this.state;
        if (!showMenu) {
            this.setState({ currentSlideId: 1 }, () => {
                this.setNavigation();
                this.setContent();
            });
        }
    }

    showInfoSrceen = () => {
        const { showInfoScreen, blur, showMenu } = this.state;
        if (showMenu !== true) {
            this.setState({ showInfoScreen: !showInfoScreen, blur: !blur });
        }
    }

    toggleVideo = () => {
        const { currentContentObject, showMenu, showVideo } = this.state;
        if (!showMenu && !showVideo) {
            this.setState({ showVideo: true, blur: true, linkVideo: currentContentObject.linkVideo });
        } else if (showVideo) {
            this.setState({ showVideo: false, blur: false, linkVideo: '' });
        }
    }

    toggleMenu = (e) => {
        const { showMenu, blurAll } = this.state;
        if (showMenu === true) {
            this.setState({ showMenu: false, showSecondMenu: false, blurAll: !blurAll });
        } else if (e.target.className === 'burger-menu'){
            this.setState({ showMenu: true, blurAll: !blurAll });
        }
    }

    openSecondMenu = () => {
        this.setState({ showSecondMenu: !this.state.showSecondMenu });
    }

    touchStart = (e) => {
        const firstTouchX = e.touches[0].clientX;
        const firstTouchY = e.touches[0].clientY;
        this.setState({ coordX: firstTouchX, coordY: firstTouchY });
    };

    touchMove = (e) => {
        const { coordX, coordY, screenWidth, screenHeight } = this.state;
        if (!coordX || !coordY) {
            return false
        };
        let finalCoordX = e.touches[0].clientX;
        let finalCoordY = e.touches[0].clientY;
        let diffX = finalCoordX - coordX;
        let diffY = finalCoordY - coordY;

        if (Math.abs(diffX) > Math.abs(diffY)) {
            if (diffX > (screenWidth / 7)) {
                this.move('idLeft');
                this.setState({ coordX: null });
            } else if (diffX < -(screenWidth / 7)) {
                this.move('idRight');
                this.setState({ coordX: null });
            }
        } else {
            if (diffY > (screenHeight / 7)) {
                this.move('idUp')();
                this.setState({ coordY: null });
            } else if (diffY < -(screenHeight / 7)) {
                this.move('idDown');
                this.setState({ coordY: null });
            }
        }
    };

    render() {

        const {
            linkImg,
            linkVideo,
            name1,
            name2,
            name3,
            slogan,
            text,
            comment1,
            comment2,
            comment3,
            shiftX,
            shiftY,
            showInfoScreen,
            showVideo,
            showMenu,
            showSecondMenu,
            blur,
            blurAll,
            idUp,
            idDown,
            idLeft,
            idRight,
        } = this.state;
        
        return (
            <>
                <div className='all-wrapper' style={blurAll === true ? { filter: 'blur(5px)' } : { filter: 'blur(0px)' }} >
                    <div className='wrapper'
                        style={blur === true ? { filter: 'blur(10px)' } : { filter: 'blur(0px)' }}
                    >
                        <div
                            className='back'
                            style={!isItMobileLayout ?
                                { backgroundImage: `url(${PUBLIC_URL + '/pagesImg/' + linkImg})`, transform: 'translate(-' + shiftX + 'px, -' + shiftY + 'px)' }
                                :
                                { backgroundImage: `url(${PUBLIC_URL + '/pagesImg/' + linkImg})` }
                            }
                        >
                        </div>
                    </div>
                    <div className='main-screen'
                        style={blur === true ? { display: 'none' } : { display: 'flex' }}
                        onClick={this.toggleMenu}
                        onTouchStart={this.touchStart}
                        onTouchMove={this.touchMove}
                    >
                        <img className='top-scroll'
                            style={idUp === null ? { display: 'none' } : { position: 'absolute' }}
                            src={PUBLIC_URL + '/images/arrow.svg'}
                            alt='top-scroll'
                            onClick={()=>this.move('idUp')}
                        />
                        <div className='top-lavel'
                            style={showMenu === true ? { justifyContent: 'flex-end' } : { justifyContent: 'space-between' }}
                        >
                            <div className='menu-page-title'
                                style={showMenu === true ? { display: 'none' } : { display: 'flex' }}
                            >
                                <img
                                    className='burger-menu' src={PUBLIC_URL + '/images/burger.svg'} alt='burger'
                                    onClick={this.toggleMenu}
                                />
                                <div className='title-texts'>
                                    <div className='main-title'>
                                        <p>ВЕЛИКОЕ КНЯЖЕСТВО</p>
                                        <span>СУЛА</span>
                                    </div>
                                    <p>парк истории</p>
                                </div>
                            </div>
                            <img className='herb'
                                src={PUBLIC_URL + '/images/herb.svg'}
                                alt='herb'
                                onClick={this.goToStart}
                            />
                        </div>
                        <div className='navigation-wrapper'>
                            <div className='navigation-block'
                                style={idLeft === null || isItMobileLayout ? { justifyContent: 'center' } : { justifyContent: 'space-between' }}
                            >
                                <img className='left-scroll'
                                    style={idLeft === null || isItMobileLayout ? { display: 'none' } : { display: 'flex' }}
                                    src={PUBLIC_URL + '/images/arrow.svg'}
                                    alt='left-scroll'
                                    onClick={()=>this.move('idLeft')}
                                />
                                <img className='play-video'
                                    src={PUBLIC_URL + '/images/play.svg'}
                                    alt='play-video'
                                    onClick={this.toggleVideo}
                                />
                                <img className='right-scroll'
                                    style={idRight === null || isItMobileLayout ? { display: 'none' } : { display: 'flex' }}
                                    src={PUBLIC_URL + '/images/arrow.svg'}
                                    alt='right-scroll'
                                    onClick={()=>this.move('idRight')}
                                />
                            </div>
                        </div>
                        <div className='content-wrapper'>
                            <div className='content-block'>
                                <div className='name1-name2'>
                                    <p className='name1'>{name1}</p>
                                    <p className='name2'>{name2}</p>
                                </div>
                                <p className='name3'>{name3}</p>
                                <p className='slogan'>{slogan}</p>
                                <p className='text'>{text}</p>
                                <p className='more' onClick={this.showInfoSrceen}>подробнее</p>
                            </div>
                        </div>

                        <div className='social'>
                            {/* повставлять ссылки на соцсети */}
                            {socialMedia.map(({id,title,url}) => <img key={id} src={PUBLIC_URL + url} alt={title} />)}
                        </div>

                        <img className='down-scroll'
                            style={idDown === null ? { display: 'none' } : { position: 'absolute' }}
                            src={PUBLIC_URL + '/images/arrow.svg'}
                            alt='down-scroll'
                            onClick={()=>this.move('idDown')}
                        />
                    </div>
                </div>

                <InfoScreen
                    closeInfoScreen={this.showInfoSrceen}
                    showInfoScreen={showInfoScreen}
                    name1={name1}
                    name2={name2}
                    name3={name3}
                    slogan={slogan}
                    text={text}
                    comment1={comment1}
                    comment2={comment2}
                    comment3={comment3}
                />
                <Video
                    showVideo={showVideo}
                    closeVideo={this.toggleVideo}
                    linkVideo={linkVideo}
                />
                <Menu
                    showMenu={showMenu}
                    showSecondMenu={showSecondMenu}
                    openSecondMenu={this.openSecondMenu}
                />
            </>
        );
    };
};

export default App;