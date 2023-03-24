package com.example.mongosocket.chat.model;

import org.springframework.data.annotation.Id;

public class ChatUser {

    @Id
    private String user_id;
    private String nickname;
}
