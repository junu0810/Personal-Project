package com.example.mongosocket.chat.controller;


import com.example.mongosocket.chat.Dto.ChatMessageDto;
import com.example.mongosocket.chat.model.ChatMessage;
import com.example.mongosocket.chat.model.Messages;
import com.example.mongosocket.chat.repository.ChatMessageRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.messaging.handler.annotation.Payload;

import java.util.List;


@Slf4j
@RequiredArgsConstructor
@Controller
public class ChatMessageController {

    private final ChatMessageRepository chatMessageRepository;
    private final SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/message")
    public void enterUser(@Payload ChatMessageDto chat) {
        // 해당방의 채팅내역이 없을경우 생성
        ChatMessage chatMessage = chatMessageRepository
                .findByRoomId(chat.getRoom_id())
                .orElseGet(() -> chatMessageRepository.save(ChatMessage.createMessage(chat)));

        // 기존채팅내용에 새 채팅내용 추가
        chatMessage.getMessages().add(Messages.createMessage(chat));
        chatMessageRepository.save(chatMessage);

        simpMessagingTemplate.convertAndSend("/receive/data/" + chat.getRoom_id()
                ,chatMessage);
    }

}