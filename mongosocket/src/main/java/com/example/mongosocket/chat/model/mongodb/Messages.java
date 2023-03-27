package com.example.mongosocket.chat.model.mongodb;

import com.example.mongosocket.chat.Dto.ChatMessageDto;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class Messages {
    private String writer;
    private String content;
    private LocalDateTime createdAt;

    public static Messages createMessage(ChatMessageDto chatMessageDto){
        return Messages.builder()
                .content(chatMessageDto.getMessage())
                .writer(chatMessageDto.getWriter())
                .createdAt(chatMessageDto.getCreated_at())
                .build();
    }


}
