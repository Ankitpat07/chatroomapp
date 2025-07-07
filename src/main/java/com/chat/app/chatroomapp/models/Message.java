package com.chat.app.chatroomapp.models;
import java.time.OffsetDateTime;

public class Message {
    private String name;
    private String content;
    private OffsetDateTime timestamp;

    public Message(String name, String content, OffsetDateTime timestamp) {
        this.name = name;
        this.content = content;
        this.timestamp = timestamp;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public OffsetDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(OffsetDateTime timestamp) {
        this.timestamp = timestamp;
    }
}
