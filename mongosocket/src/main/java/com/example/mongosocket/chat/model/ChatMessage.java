package com.example.mongosocket.chat.model;

import com.example.mongosocket.chat.Dto.ChatMessageDto;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;

import java.util.ArrayList;
import java.util.List;

@Builder
@Data
public class ChatMessage {

    @Id
    private String message_id;
    private String roomId;
    private List<Messages> messages;

    public static ChatMessage toEntity(ChatMessageDto chatMessageDto , List<Messages> messages){
        return ChatMessage.builder()
                .roomId(chatMessageDto.getRoom_id())
                .messages(messages)
                .build();
    }

    public static ChatMessage createMessage(ChatMessageDto chatMessageDto){
        return ChatMessage.builder()
                .roomId(chatMessageDto.getRoom_id())
                .messages(new ArrayList<>())
                .build();
    }

    public static ChatMessage createEmpty() {
        return ChatMessage.builder()
                .messages(new ArrayList<>())
                .roomId("")
                .message_id("")
                .build();
    }

}
