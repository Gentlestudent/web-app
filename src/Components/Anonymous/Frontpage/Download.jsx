import React, { Component } from 'react';

import mockup from '../../../assets/download-mobile-app.png';
import downloadAndroid from '../../../assets/android.png';
import downloadiOS from '../../../assets/ios.png';

class Download extends Component {
    render() {
        return (
            <div id="download">
                <div className="container">
                    <div className="content">
                        <div className="left">
                            <img src={mockup} alt="mockup" />
                        </div>
                        <div className="right">
                            <h1>Download de mobile app</h1>
                            <p>Om als student zicht te krijgen op waar de leerkansen zich in Gent situeren, kan je de Gentlestudent app downloaden. Deze app zal je melden wanneer je in de buurt bent van een leerkans. Via de app kan je ook het overzicht bewaren van de leerkansen waar je je voor hebt ingeschreven.</p>
                            <a href="https://apps.apple.com/be/app/gentlestudent/id1477161341" target="_blank" rel="noopener noreferrer">
                                <img src={downloadiOS} alt="download-button-ios" />
                            </a>
                            <a href="https://play.google.com/store/apps/details?id=gent.gentle.student" target="_blank" rel="noopener noreferrer">
                                <img src={downloadAndroid} alt="download-button-android" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Download;