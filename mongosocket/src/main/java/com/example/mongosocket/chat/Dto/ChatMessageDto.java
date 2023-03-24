package com.example.mongosocket.chat.Dto;

import lombok.*;

import java.time.LocalDateTime;


@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessageDto {
    private String room_id;
    private String message;
    private String writer;
    private LocalDateTime created_at;

}
