import './styles/Preloader.scss';


const Preloader = (props) => {
    const { } = props;
    return (
        <svg viewBox="0 0 800 600">
        <symbol id="s-text">
          <text textAnchor="middle" x="50%" y="35%" className="text--line">
            парк истории
          </text>
          <text textAnchor="middle" x="50%" y="68%" className="text--line2">
            СУЛА
          </text>
        </symbol>
        <g className="g-ants">
          <use xlinkHref="#s-text" className="text-copy" />     
          <use xlinkHref="#s-text" className="text-copy" />     
          <use xlinkHref="#s-text" className="text-copy" />     
          <use xlinkHref="#s-text" className="text-copy" />     
          <use xlinkHref="#s-text" className="text-copy" />     
        </g>
      </svg>
    )
};

export default Preloader;