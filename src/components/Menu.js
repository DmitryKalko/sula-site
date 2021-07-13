import './styles/Menu.scss';
import React from 'react'

const Menu = ({ showMenu, openSecondMenu, showSecondMenu }) => {
	return (
		<>
			<div className='menu'
				style={showMenu === true ? { transform: 'translateX(0px)' } : { transform: 'translateX(-320px)' }}
			>
				<div className='title'>
					<div className='name'>
						<p>ВЕЛИКОЕ КНЯЖЕСТВО</p>
						<span>СУЛА</span>
					</div>
					<p>парк истории</p>
				</div>

				<div className='menu-items'>
					<span onClick={openSecondMenu}>Здания комплекса</span>
					<span>Питание</span>
					<span>Проживание</span>
					<span>Музей. Экспозиция</span>
					<span>Экскурсии, анимации</span>
					<span>Корпоративное мероприятие</span>
					<span>Услуги</span>
					<span>Быт</span>
					<span>Массовые мероприятия</span>
				</div>

			</div>
			
			<div className='second-lavel-menu'
				style={showSecondMenu === true ? { transform: 'translateX(320px)' } : { transform: 'translateX(-320px)' }}>
				<div className='line'></div>	
				<span>Замок Запольский</span>
				<span>Пыточная</span>
				<span>Голубятня</span>
			</div>
		</>
	);
};

export default React.memo(Menu);
