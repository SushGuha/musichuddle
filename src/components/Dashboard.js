import { useState ,useEffect} from "react";
import {Container,Form,Button} from "react-bootstrap";
import InputGroup from 'react-bootstrap/InputGroup';
import youtube from "../apis/youtube"
import TrackSearchResult from "./TrackSearchResult"

export default function Dashboard(){
    const [search,setSearch] = useState("");
    const [searchResults,setSearchResults] = useState([]);
    
    function checkRes(res) {
      return res.id.kind==="youtube#video"
    }
    const enterHandle = async (e) => {
        e.preventDefault();
        if (!search) {
            return setSearchResults([]);
        }
        let response=null;
        try {
            response = await youtube.get('/search', {
                params : {
                    q: search
                }
            })
        } catch(e) {
            alert(e);
        }
        let items = response.data.items;
        items = items.filter(checkRes);
        
        items=items.map(track => {
            return {
                artist : track.snippet.channelTitle,
                title : track.snippet.title,
                albumUrl: track.snippet.thumbnails.default.url,
                videoId: track.id.videoId
            }
        })
        console.log(items)
        setSearchResults(items);
        setSearchResults(items);
        console.log(searchResults);

        
        //IN THIS FUNCTION, GET EACH TRACK, RETURN ARTIST, TITLE, 
        //SETSEARCHRESULTS TO THAT
    }
    return (
        <Container className = "d-flex flex-column py-2" style = {{height: "100vh"}}>
            <InputGroup >
                            
                                <InputGroup.Text>
                                <Button variant="primary" type="submit" onClick={enterHandle}> Search </Button>
                                </InputGroup.Text>
                            
            <Form.Control 
               type = "search"
               placeholder = "Search songs"
               value = {search}
               onChange = {e=> setSearch(e.target.value)}/>
            </InputGroup>
        <div className = "flex grow-1 my-2" style = {{
            overflowY: "auto"
        }}>
            {searchResults.map(track => (
                <TrackSearchResult track = {track} key = {track.videoId}/>
            ))}
        </div>
        <div>Bottom</div>
        </Container>
    )
}
