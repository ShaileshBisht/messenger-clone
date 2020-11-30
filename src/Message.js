import { Card , CardContent, Typography } from '@material-ui/core';
import React ,{ forwardRef } from 'react';
import "./Message.css";

const Message = forwardRef(({username , name , text}, ref) => {
    
    const isUser = username === name;
    
    //className={`message ${isUser && "message_user"}`}
    return (
        <div ref={ref} className={`message ${isUser && "message_user"}`}>
            <Card className={isUser? "message_userCard" : "message_guestCard"}>
                <CardContent>
                    <Typography color="white" variant="h5" component="h2">
                        {!isUser && <b>{name || "Unknown User"}: </b>} {text}
                    </Typography>
                </CardContent>  
    
            </Card>
        </div>
    )
})

export default Message;