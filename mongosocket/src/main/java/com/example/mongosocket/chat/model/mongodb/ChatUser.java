package com.example.mongosocket.chat.model.mongodb;

import org.springframework.data.annotation.Id;

public class ChatUser {

    @Id
    private String user_id;
    private String nickname;
}
