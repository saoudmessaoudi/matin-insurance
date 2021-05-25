import nFormatter from './nFormat'
import getVideoDetails from "./getVideoDetails";


export default async (videos, filters, buttons) => {
    const table_data = [];

    if(!videos || videos.length === 0 )
        return [{
            title: "No videos yet",
            italic : true,
            donTrim : false,
            contents: []
        }];

    await Promise.all(videos.map(async video => {
        if(!video.video_url || video.video_url.length < 5){
            return;
        }
       var videoData = await getVideoDetails(video.video_url);
       if(videoData.items.length < 1){
           return;
       }
       var videoThumbnail = videoData.items[0].snippet.thumbnails.standard.url;
       var videoStats = videoData.items[0].statistics;


        const object = {
            title: "",
            image: videoThumbnail,
            url: video.video_url,
            object: video,
            id: video.id,
            contents: []
        }
        filters.map(filter => {
            let content = {};
            switch (filter){

                case "title" :
                    content = {
                        value: video.video_title,
                        centered: false
                    }
                    break; 
                case "views" : 
                content = {
                    value: nFormatter(videoStats.viewCount, 1),
                    centered: true
                }
                
                    break;
                case "likes" :
                    content = {
                        value: nFormatter(videoStats.likeCount, 0),
                        centered: true
                    }
                    break;
                case "dislikes" : 
                    content = {
                        value: nFormatter(videoStats.dislikeCount, 0),
                        centered: true
                    }
                    break;
                case "buttons":
                    content = {
                        type: "button-group",
                        value: [
                            {
                                title: "Edit",
                                callback: buttons[0].callback,
                                class: 'bg-gradient-info border-0'
                            },
                            {
                                title: "Delete",
                                callback: buttons[1].callback,
                                class: 'bg-gradient-danger border-0'
                            }
                        ]
                    }
                
            }
            object.contents.push(content);
        });
        
        table_data.push(object);
    }))
    return table_data;
}




