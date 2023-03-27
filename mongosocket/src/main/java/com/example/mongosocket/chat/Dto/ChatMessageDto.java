package com.example.mongosocket.chat.Dto;

import com.example.mongosocket.chat.model.mongodb.ChatType;
import lombok.*;

import java.time.LocalDateTime;


@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessageDto {
    private String room_id;
    private ChatType chatType;
    private String message;
    private String writer;
    private LocalDateTime created_at;

}
