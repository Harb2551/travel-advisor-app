import React,{useState,useEffect,createRef} from "react";
import { CircularProgress, Grid, Typography, Inputabel, MenuItem, FormControl, Select, InputLabel } from "@material-ui/core";
import useStyles from "./styles";
import { SettingsSystemDaydreamSharp } from "@material-ui/icons";
import PlaceDetails from "../PlaceDetails/PlaceDetails";

const List = ({places,childClick,isLoading,type,setType,rating,setRating}) => {
    const classes = useStyles();
    const [elRef,setelRef] = useState([]);

    useEffect(()=>{
        const refs = Array(places ? places.length : 0).fill().map((_,i)=> elRef[i] || React.createRef());
        console.log(places);
        setelRef(refs);
    },[places])

    return (
        <div className={classes.container}>
            <Typography variant="h4"> Restaurants, Hotels, & Attractions around you </Typography>
            {isLoading ? (
                <div>
                    <CircularProgress size="5rem" /> 
                </div>
            ) : 
            (<>
                <FormControl className={classes.formControl}>
                <InputLabel>Type</InputLabel>
                 <Select value={type} onChange={(e)=>setType(e.target.value)}>
                    <MenuItem value="restaurants">Restaurants</MenuItem>
                    <MenuItem value="hotels">Hotels</MenuItem>
                    <MenuItem value="attractions">Attractions</MenuItem>
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel>Rating</InputLabel>
                 <Select value={rating} onChange={(e)=>setRating(e.target.value)}>
                    <MenuItem value={0}>All</MenuItem>
                    <MenuItem value={3}>Above 3.0</MenuItem>
                    <MenuItem value={4}>Above 4.0</MenuItem>
                    <MenuItem value={4.5}>Above 4.5</MenuItem>
                </Select>
            </FormControl>
            <Grid container spacing={3} className={classes.list}>
                {places && places.map((place,i) => (
                    <Grid item key={i} ref={elRef[i]} xs={12}>
                        <PlaceDetails 
                            place = {place}
                            selected = {Number(childClick)===i}
                            refProp = {elRef[i]}
                         />
                    </Grid>
                ))}
            </Grid>
            </>
            )}
        </div>
    );
}

export default List;