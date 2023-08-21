import React, { useEffect, useState } from "react";
import { CssBaseline, Grid } from "@material-ui/core";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import { getPanelId } from "@material-ui/lab";
import { getPlacesData } from "./api";

const App = () => {

    const [places,setPlaces] = useState([]);
    const [coordinates,setcoordinates] = useState({});
    const [bounds,setbounds] = useState({});
    const [childClick,setchildClick]  = useState(null);
    const [type,setType] = useState('restaurants');
    const [rating,setRating] = useState('');
    const [filteredPlaces,setfilteredPlaces] = useState([]);

    const [isLoading,setisLoading] = useState(false);

    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(({coords:{latitude,longitude}})=>{
            setcoordinates({lat:latitude, lng: longitude});
        })
    },[]);

    useEffect(()=>{
        const filteredPlaces = places.filter((place)=>place.rating>rating);
        setfilteredPlaces(filteredPlaces);
    },[rating]);

    useEffect(() => {
        setisLoading(true);
        getPlacesData(type,bounds.sw,bounds.ne).then((data)=> {
            setPlaces(data)
            setfilteredPlaces([]);
            setisLoading(false);
        });
    },[type,coordinates,bounds]);

    return (
    <>
        <CssBaseline>
            <Header/>
            <Grid container spacing = {3} style = {{width:'100%'}}>
                <Grid item xs = {12} md = {4}>
                    <List
                        places = {filteredPlaces.length ? filteredPlaces : places}
                        childClick = {childClick}
                        isLoading = {isLoading}
                        type = {type}
                        setType = {setType}
                        rating = {rating}
                        setRating = {setRating}
                    />
                </Grid>
                <Grid item xs = {12} md = {8}>
                    <Map
                        setcoordinates = {setcoordinates}
                        setbounds = {setbounds}
                        coordinates = {coordinates}
                        places = {filteredPlaces.length ? filteredPlaces : places}
                        setchildClick = {setchildClick}
                    />
                 </Grid>
            </Grid>
        </CssBaseline>
    </>
    );
}

 export default App;

