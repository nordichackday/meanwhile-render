/*globals document*/

import React from 'react';
import Nav from './Nav';
import Home from './Home';
import ApplicationStore from '../stores/ApplicationStore';
import provideContext from 'fluxible/addons/provideContext';
import connectToStores from 'fluxible/addons/connectToStores';
import { handleHistory } from 'fluxible-router';

// @TODO Upgrade to ES6 class when RouterMixin is replaced
var Application = React.createClass({
    render: function () {
        var Handler = this.props.currentRoute.get('handler');

        return (
            <div>
                <Nav selected={this.props.currentPageName} links={this.props.pages} />
                <Handler />
                <object type="application/x-shockwave-flash"
                        data="http://media.svt.se/swf/video/svtplayer-2015.02.swf">
                    <param name="flashvars"
                        value="json=%7B%22videoId%22%3A2961575%2C%22video%22%3A%7B%22videoReferences%22%3A%5B%7B%22url%22%3A%22http%3A%2F%2Fsvtplay6k-f.akamaihd.net%2Fz%2Fworld%2Fopen%2F20150525%2F1366009-001A%2FEPISOD-1366009-001A-c0589e22739aa030_%2C892%2C144%2C252%2C360%2C540%2C1584%2C2700%2C.mp4.csmil%2Fmanifest.f4m%22%2C%22bitrate%22%3A0%2C%22playerType%22%3A%22flash%22%7D%2C%7B%22url%22%3A%22http%3A%2F%2Fsvtplay6k-f.akamaihd.net%2Fi%2Fworld%2Fopen%2F20150525%2F1366009-001A%2FEPISOD-1366009-001A-c0589e22739aa030_%2C892%2C144%2C252%2C360%2C540%2C1584%2C2700%2C.mp4.csmil%2Fmaster.m3u8%3Fcc1%3Dname%3DSvenska~default%3Dyes~forced%3Dno~uri%3Dhttp%3A%2F%2Fmedia.svt.se%2Fdownload%2Fmcc%2Fwp3%2Fundertexter-wsrt%2F1366009%2F1366009-001A%2FC(sv)%2Findex.m3u8~lang%3Dsv%22%2C%22bitrate%22%3A0%2C%22playerType%22%3A%22ios%22%7D%5D%2C%22subtitleReferences%22%3A%5B%7B%22url%22%3A%22http%3A%2F%2Fmedia.svt.se%2Fdownload%2Fmcc%2Fwp3%2Fundertexter-wsrt%2F1366009%2F1366009-001A-MINA_TVA_LIV-14558324.wsrt%22%7D%5D%2C%22position%22%3A0%2C%22materialLength%22%3A3533%2C%22live%22%3Afalse%2C%22availableOnMobile%22%3Atrue%2C%22onlyAvailableInSweden%22%3Afalse%2C%22url%22%3A%22%2Fvideo%2F2961575%22%7D%2C%22statistics%22%3A%7B%22client%22%3A%22svt-play%22%2C%22mmsClientNr%22%3A%221001001%22%2C%22context%22%3A%22svt-play%22%2C%22programId%22%3A%221366009-01%22%2C%22mmsCategory%22%3A%221%22%2C%22broadcastDate%22%3A%2220150526%22%2C%22broadcastTime%22%3A%222100%22%2C%22category%22%3A%22samh%C3%A4lle-och-fakta%22%2C%22statisticsUrl%22%3A%22http%3A%2F%2Fld.svt.se%2Fsvt%2Fsvt%2Fs%3Fsvt-play.samh%25c3%25a4lle-och-fakta.mina-tv%25c3%25a5-liv.hela-program.avsnitt-1%22%2C%22title%22%3A%22avsnitt-1%22%2C%22folderStructure%22%3A%22mina-tv%C3%A5-liv.hela-program%22%7D%2C%22context%22%3A%7B%22title%22%3A%22Avsnitt%201%22%2C%22programTitle%22%3A%22Mina%20tv%C3%A5%20liv%22%2C%22thumbnailImage%22%3A%22http%3A%2F%2Fwww.svt.se%2Fcachable_image%2F1432651598000%2Fmina-tva-liv%2Farticle2943431.svt%2FALTERNATES%2Fextralarge%2Fann-h-1280-jpg%22%2C%22posterImage%22%3A%22http%3A%2F%2Fwww.svt.se%2Fcachable_image%2F1430897718000%2Fmina-tva-liv%2Farticle2903653.svt%2FALTERNATES%2Fextralarge%2Fminatvaliv-jpg%22%2C%22popoutUrl%22%3A%22%2Fvideo%2F2961575%2Fmina-tva-liv%2Fmina-tva-liv-avsnitt-1%3Ftype%3Dembed%22%2C%22programVersionId%22%3A%221366009-001A%22%2C%22dateOffset%22%3A-887%2C%22UID%22%3A%22982017%22%2C%22isSmallScreen%22%3Afalse%7D%7D"></param>
                    <param name="allowscriptaccess" value="always"></param>
                    <param name="allowfullscreen" value="true"></param>
                    <param name="bgcolor" value="#000000"></param>
                    <param name="wmode" value="direct"></param>
                </object>
            </div>
        );
    },

    componentDidUpdate: function(prevProps, prevState) {
        const newProps = this.props;
        if (newProps.pageTitle === prevProps.pageTitle) {
            return;
        }
        document.title = newProps.pageTitle;
    }
});

export default handleHistory(provideContext(connectToStores(
    Application,
    [ApplicationStore],
    function (stores, props) {
        var appStore = stores.ApplicationStore;
        return {
            currentPageName: appStore.getCurrentPageName(),
            pageTitle: appStore.getPageTitle(),
            pages: appStore.getPages()
        };
    }
)));
