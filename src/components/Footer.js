import React from 'react';

import './styles/Footer.scss';
import herb from './footer-img/herb.svg'
import food from './footer-img/food.svg'
import hotel from './footer-img/hotel.svg'
import museum from './footer-img/museum.svg'
import phone from './footer-img/phone.svg'
import email from './footer-img/email.svg'
import r2s from './footer-img/r2s.svg'

const Footer = () => {

    return (
        <div className='footer'>
            <div className='big-footer-box'>
                <div className='footer-container'>
                    <div className='top-part'>

                        <div className='logo-block'>
                            <img src={herb} alt='sula logo' />
                            <div className='logo-block-text'>
                                <div className='logo-block-title'>
                                    <p>ВЯЛIКАЕ КНЯСТВА</p>
                                    <span>СУЛА</span>
                                </div>
                                <p>парк гiсторыi</p>
                            </div>
                        </div>

                        <div className='food block'>
                            <img src={food} alt='food logo' />
                            <div className='block-text'>
                                <p>Питание</p>
                                <p>+375 44 5445451</p>
                                <p>+375 33 6445451</p>
                                <p>mail@parksula.by</p>
                            </div>
                            <div className='phone-email'>
                                <img src={phone} alt='phone logo' />
                                <img src={email} alt='email logo' />
                            </div>
                        </div>
                        <div className='vertical-line'></div>

                        <div className='hotel block'>
                            <img src={hotel} alt='hotel logo' />
                            <div className='block-text'>
                                <p>Размещение</p>
                                <p>+375 44 5445451</p>
                                <p>+375 33 6445451</p>
                                <p>mail@parksula.by</p>
                            </div>
                            <div className='phone-email'>
                                <img src={phone} alt='phone logo' />
                                <img src={email} alt='email logo' />
                            </div>
                        </div>
                        <div className='vertical-line'></div>

                        <div className='museum block'>
                            <img src={museum} alt='museum logo' />
                            <div className='block-text'>
                                <p>Музеи, экскурсии</p>
                                <p>+375 29 6137701</p>
                                <p>+375 33 6157701</p>
                                <p>zakaz@parksula.by</p>
                            </div>
                            <div className='phone-email'>
                                <img src={phone} alt='phone logo' />
                                <img src={email} alt='email logo' />
                            </div>
                        </div>

                    </div>
                </div>

                <div className='horizontal-line'></div>

                <div className='footer-container'>
                    <div className='bottom-part'>
                        <div className='ownership'>
                            <p>КФХ «Панский маентак».</p>
                            <p>УНП 690582915</p>
                        </div>
                        <div className='vertical-line'></div>
                        <div className='copyright1'>
                            <p>© Парк Сула, 2006-2020. Все материалы данного сайта являются объектами авторского права (в том числе дизайн). Запрещается копирование, распространение (в том числе путем копирования на другие сайты и ресурсы в Интернете) или любое иное использование информации и объектов без предварительного согласия правообладателя.</p>
                        </div>
                        <div className='vertical-line'></div>
                        <div className='copyright2'>
                            <p>Copyright © 2020 R2 Studya.</p>
                            <p>All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </div>

            <img src={r2s} alt='logo r2s' className='logo-r2s' />
        </div>
    );
};

export default Footer;