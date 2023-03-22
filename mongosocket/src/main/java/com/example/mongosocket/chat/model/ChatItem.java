package com.example.mongosocket.chat.model;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Data
@Builder
public class ChatItem {

        @Id
        private String id;
        private String name;
        private String category;

}
