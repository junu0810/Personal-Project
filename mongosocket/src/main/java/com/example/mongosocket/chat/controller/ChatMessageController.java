package com.example.mongosocket.chat.controller;

import com.example.mongosocket.chat.Dto.ChatDto;
import com.example.mongosocket.chat.model.MessageType;
import com.example.mongosocket.chat.repository.StaticChatRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.util.ArrayList;

@Slf4j
@RequiredArgsConstructor
@Controller
public class ChatMessageController {

    private final SimpMessageSendingOperations template;

    private final StaticChatRepository staticChatRepository;

    @MessageMapping("/")
    public void enterUser(@Payload ChatDto chat, SimpMessageHeaderAccessor headerAccessor) {

        log.info("테스트 API 연결완료");

    }
}