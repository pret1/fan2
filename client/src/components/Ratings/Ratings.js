import React from "react";

import ReactStars from "react-rating-stars-component";
import { saveRating } from "../../Services/Work/Work_Service";

export default function Star(props) {
  const { row, rating, loggedInUser } = props;
  const isEdit = loggedInUser.username === null ? false : true;
  const star = {
    size: 30,
    value: parseInt(rating),
    edit: isEdit,
    onChange: (newValue) => {
      const newRating = rating == 0 ? newValue : parseInt(rating)/parseInt(newValue);
     
      const data = {
        rating: parseInt(newRating),
        username: row.username
      };
    
      saveRating(data).then(resp => {
        if(resp.data.status === 200){
          console.log("Rating Saved..!!");
        } else {
          console.log("There was Problem in Saving Rating ..!!");
        }
      });

      console.log(`New value is ${newValue} for rating. And user is ${row.username}`);
    }
  };
  
  return (
    <ReactStars {...star} />
  );
}
