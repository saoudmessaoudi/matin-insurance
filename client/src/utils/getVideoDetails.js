import axios from "axios";
import config from '../config.json'
import _ from 'lodash';

export default _.memoize(async(video_url) =>{

    var video_id = video_url.split('v=')[1];
    if(!video_id)
        return {items:[]};
    var ampersandPosition = video_id.indexOf('&');
    if(ampersandPosition !== -1) {
      video_id = video_id.substring(0, ampersandPosition);
    }


    const {data} = await axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${video_id}&key=${config.google_api}`, {
        headers: {
            'Authorization': ``
        }
    });

 return data;
});

