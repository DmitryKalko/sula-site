import React, { Component } from "react";

import './styles/App.scss';
import { navigationDb } from '../db/navigationDB';
import { textsDb } from '../db/textsDB';

import InfoScreen from "./InfoScreen";
import Video from './Video';
import Menu from './Menu';

class App extends Component {
    state = {
        currentSlideId: 2,
        navigationDb: navigationDb,
        textsDb: textsDb,
        currentNavigationObject: null,
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
        screenWidth: null,
        screenHeight: null,
    };

    componentDidMount() {
        this.setState({ screenWidth: window.innerWidth, screenHeight: window.innerHeight });
        this.setContent();
        this.setNavigation();
        this.parallax();
    }

    parallax = () => {
        document.addEventListener('mousemove', e => {
            let x = e.pageX / window.innerWidth;
            let y = e.pageY / window.innerHeight;
            this.setState({ shiftX: x * 50, shiftY: y * 50 });
        });
    }

    setContent = () => {
        const { textsDb, currentSlideId } = this.state;
        let needContentObject = textsDb.filter(item => item.id === currentSlideId);
        // console.log(needContentObject[0]);
        this.setState({
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
            linkVideo: needContentObject[0].linkVideo,
        });
    }
    setNavigation = () => {
        const { navigationDb, currentSlideId } = this.state;
        let needNavigationObject = navigationDb.filter(item => item.id === currentSlideId);
        // console.log(needNavigationObject[0]);
        this.setState({ currentNavigationObject: needNavigationObject[0] });
    }
    goToUp = () => {
        const { currentNavigationObject, showMenu } = this.state;
        if (showMenu !== true) {
            if (currentNavigationObject.idUp !== null) {
                this.setState({ currentSlideId: currentNavigationObject.idUp });
            }
            setTimeout(() => {
                this.setNavigation();
                this.setContent();
            }, 100);
        }
    }
    goToDown = () => {
        const { currentNavigationObject, showMenu } = this.state;
        if (showMenu !== true) {
            if (currentNavigationObject.idDown !== null) {
                this.setState({ currentSlideId: currentNavigationObject.idDown });
            }
            setTimeout(() => {
                this.setNavigation();
                this.setContent();
            }, 100);
        }
    }
    goToRight = () => {
        const { currentNavigationObject, showMenu } = this.state;
        if (showMenu !== true) {
            if (currentNavigationObject.idRight !== null) {
                this.setState({ currentSlideId: currentNavigationObject.idRight });
            }
            setTimeout(() => {
                this.setNavigation();
                this.setContent();
            }, 100);
        }
    }
    goToLeft = () => {
        const { currentNavigationObject } = this.state;
        if (currentNavigationObject.idLeft !== null) {
            this.setState({ currentSlideId: currentNavigationObject.idLeft });
        }
        setTimeout(() => {
            this.setNavigation();
            this.setContent();
        }, 100);
    }

    showInfoSrceen = () => {
        const { showInfoScreen, blur, showMenu } = this.state;
        if (showMenu !== true) {
            this.setState({ showInfoScreen: !showInfoScreen, blur: !blur });
        }
    }

    showVideo = () => {
        const { showVideo, blur, showMenu } = this.state;
        if (showMenu !== true) {
            this.setState({ showVideo: !showVideo, blur: !blur });
        }
    }

    showMenu = () => {
        const { showMenu, blurAll } = this.state;
        this.setState({ showMenu: !showMenu, blurAll: !blurAll });
    }
    closeMenu = () => {
        const { showMenu, blurAll } = this.state;
        if (showMenu === true) {
            this.setState({ showMenu: false, showSecondMenu: false, blurAll: !blurAll });
        }
    }

    openSecondMenu = () => {
        const { showSecondMenu } = this.state;
        this.setState({ showSecondMenu: !showSecondMenu });
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
                this.goToLeft();
                this.setState({ coordX: null });
            } else if (diffX < -(screenWidth / 7)) {
                this.goToRight();
                this.setState({ coordX: null });
            }
        } else {
            if (diffY > (screenHeight / 7)) {
                this.goToUp();
                this.setState({ coordY: null });
            } else if (diffY < -(screenHeight / 7)) {
                this.goToDown();
                this.setState({ coordY: null });
            }
        }
    };

    render() {
        console.log(this.state);
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
        } = this.state;

        return (
            <>
                <div className='all-wrapper' style={blurAll === true ? { filter: 'blur(5px)' } : { filter: 'blur(0px)' }} >
                    <div className='wrapper'
                        style={blur === true ? { filter: 'blur(10px)' } : { filter: 'blur(0px)' }}
                    >
                        <div
                            //className='back' style={{ backgroundImage: `url(${process.env.PUBLIC_URL +'/pagesImg/' + linkImg})`, transform: 'translate(-' + shiftX + 'px, -' + shiftY + 'px)' }}
                            className='back' style={{ backgroundImage: `url('https://dmitrykalko.github.io/sula-site/pagesImg/2.jpg')`, transform: 'translate(-' + shiftX + 'px, -' + shiftY + 'px)' }}
                        >
                        </div>
                    </div>
                    <div className='main-screen'
                        style={blur === true ? { display: 'none' } : { display: 'flex' }}
                        onClick={this.closeMenu}
                        onTouchStart={this.touchStart}
                        onTouchMove={this.touchMove}
                    >
                        <img className='top-scroll'
                            src={process.env.PUBLIC_URL + '/images/arrow.svg'}
                            alt='top-scroll'
                            onClick={this.goToUp}
                        />
                        <div className='top-lavel'
                            style={showMenu === true ? { justifyContent: 'flex-end' } : { justifyContent: 'space-between' }}
                        >
                            <div className='menu-page-title'
                                style={showMenu === true ? { display: 'none' } : { display: 'flex' }}
                            >
                                <img
                                    className='burger-menu' src={process.env.PUBLIC_URL + '/images/burger.svg'} alt='burger'
                                    onClick={this.showMenu}
                                />
                                <div className='title-texts'>
                                    <div className='main-title'>
                                        <p>ВЕЛИКОЕ КНЯЖЕСТВО</p>
                                        <span>СУЛА</span>
                                    </div>
                                    <p>парк истории</p>
                                </div>
                            </div>
                            <img className='herb' src={process.env.PUBLIC_URL + '/images/herb.svg'} alt='herb' />
                        </div>

                        <div className='middle-lavel'>
                            <img className='left-scroll'
                                src={process.env.PUBLIC_URL + '/images/arrow.svg'}
                                alt='left-scroll'
                                onClick={this.goToLeft}
                            />
                            <img className='play-video'
                                src={process.env.PUBLIC_URL + '/images/play.svg'}
                                alt='play-video'
                                onClick={this.showVideo}
                            />
                            <img className='right-scroll'
                                src={process.env.PUBLIC_URL + '/images/arrow.svg'}
                                alt='right-scroll'
                                onClick={this.goToRight}
                            />
                        </div>

                        <div className='bottom-lavel'>
                            <div className='name1-name2'>
                                <p className='name1'>{name1}</p>
                                <p className='name2'>{name2}</p>
                            </div>
                            <p className='name3'>{name3}</p>
                            <p className='slogan'>{slogan}</p>
                            <p className='text'>{text}</p>
                            <p className='more' onClick={this.showInfoSrceen}>подробнее</p>
                        </div>

                        <div className='social'>
                            {/* повставлять ссылки на соцсети */}
                            <img src={process.env.PUBLIC_URL + '/images/f.svg'} alt='facebook' />
                            <img src={process.env.PUBLIC_URL + '/images/g.svg'} alt='google' />
                            <img src={process.env.PUBLIC_URL + '/images/t.svg'} alt='twitter' />
                            <img src={process.env.PUBLIC_URL + '/images/i.svg'} alt='instagram' />
                            <img src={process.env.PUBLIC_URL + '/images/boll.svg'} alt='boll' />
                        </div>

                        <img className='down-scroll'
                            src={process.env.PUBLIC_URL + '/images/arrow.svg'}
                            alt='down-scroll'
                            onClick={this.goToDown}
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
                    closeVideo={this.showVideo}
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