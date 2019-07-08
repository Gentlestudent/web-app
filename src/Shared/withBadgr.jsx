import React from 'react';
import axios from 'axios';

import BadgrContext from './BadgrContext';

const badgr_api = `https://api.badgr.io/`;

const withBadgr = (Component) =>
    class withBadgr extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                badgrAuth: null,
            };
        }

        componentDidMount() {
            let data = "username=freek.de.sagher21@gmail.com&password=summerofcode2019";
            let self = this;
            console.log("fetching tokens");
            axios.post(badgr_api + 'o/token', data)
                .then(res => {
                    // console.log(res);
                    self.setState({
                        badgrAuth: {
                            accessToken: res.data.access_token,
                            expiration: res.data.expires_in,
                            refreshToken: res.data.refresh_token
                        }
                    }
                    );
                }
                ).catch(err => {
                    console.log(err);
                });
        }

        render() {
            const { badgrAuth } = this.state;
            return (
                <BadgrContext.Provider value={badgrAuth}>
                    <Component />
                </BadgrContext.Provider>
            );
        }
    }

export default withBadgr;