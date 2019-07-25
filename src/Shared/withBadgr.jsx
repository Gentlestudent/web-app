import React from 'react';
import BadgrContext from './BadgrContext';

// TODO check if this can be removed

const withBadgr = (Component) =>
    class withBadgr extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                badgrAuth: {
                    accessToken: "",
                    expiration: -1,
                    refreshToken: ""
                }
            };

            // this.getHeader = this.getHeader.bind(this);
            // this.refreshAccessToken = this.refreshAccessToken.bind(this);
        }

        // componentDidMount() {
            // let data = "username=freek.de.sagher21@gmail.com&password=summerofcode2019";

            // let self = this;

            // firestore.onceGetBadgrAuth()
            //     .then(response => {
            //         console.log("Badgr auth:", response.data());
            //         let auth = response.data();
            //         self.setState({
            //             badgrAuth: {
            //                 accessToken: auth.accessToken,
            //                 expiration: auth.expireTime,
            //                 refreshToken: auth.refreshToken,
            //                 refreshAccessToken: this.refreshAccessToken
            //             }
            //         })
            //     })
            //     .catch(err => console.log(err));


            /*console.log("fetching tokens");
            axios.post(badgr_api + 'o/token', data)
                .then(res => {
                    console.log("Token time!", res);
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
                });*/
        // }

        // getHeader() {
        //     let header = { headers: { Authorization: "Bearer " + this.state.badgrAuth.accessToken } };
        //     return header;
        // }

        // refreshAccessToken() {
        //     let data = "grant_type=refresh_token&refresh_token=" + this.state.badgrAuth.refreshToken;
        //     axios.post(badgr_api + 'o/token', data)
        //         .then(res => {
        //             let data = res.data();
        //             console.log("Refreshing Badgr API token...", data);
        //             this.setState({
        //                 badgrAuth: {
        //                     accessToken: data.accessToken,
        //                     expiration: data.expireTime,
        //                     refreshToken: data.refreshToken
        //                 }
        //             });
        //             firestore.updateBadgrAuth(data.accessToken, data.refreshToken);
        //         })
        // }

        render() {
            // const { badgrAuth } = this.state;
            let badgrAuth = {
                accessToken: this.state.badgrAuth.accessToken,
                getHeader: this.getHeader,
                refreshAccessToken: this.refreshAccessToken
            }
            return (
                <BadgrContext.Provider value={badgrAuth}>
                    <Component />
                </BadgrContext.Provider>
            );
        }
    }

export default withBadgr;
export let badgr_email = "gentlestudent@arteveldehs.be";