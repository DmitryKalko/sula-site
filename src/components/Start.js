import React, { Component, Suspense, lazy } from 'react';
import Preloader from './Preloader';
const App = React.lazy(() => import('./App'));

class Start extends Component {
    render(){
        return(
            // В fallback передаём preloder
            <Suspense fallback={<Preloader/>}>
                <App />
            </Suspense>
        );
    }
}
export default Start;