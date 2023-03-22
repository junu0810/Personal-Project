package com.example.mongosocket.chat.Dto;

import com.example.mongosocket.chat.model.MessageType;
import lombok.*;


@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessageDto {

    private MessageType type;
    private String content;
    private String sender;

}
