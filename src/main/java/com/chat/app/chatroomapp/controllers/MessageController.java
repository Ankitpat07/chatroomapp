package com.chat.app.chatroomapp.controllers;

import com.chat.app.chatroomapp.models.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.time.OffsetDateTime;

@RestController
public class MessageController {

    //server receives the message & process it

    @MessageMapping("/message")
    @SendTo("/topic/return-to")
    public Message getContent(Message message){
        if (message.getTimestamp() == null) {
            message.setTimestamp(OffsetDateTime.now());
        }
        try{
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return message;             //this method takes mesg which user send and then return it
    }
}
