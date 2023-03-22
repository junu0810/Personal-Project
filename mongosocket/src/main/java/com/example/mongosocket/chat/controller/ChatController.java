package com.example.mongosocket.chat.controller;

import com.example.mongosocket.chat.Dto.ChatMessageDto;
import com.example.mongosocket.chat.model.ChatItem;
import com.example.mongosocket.chat.model.ChatRoom;
import com.example.mongosocket.chat.repository.ChatRepository;
import com.example.mongosocket.chat.repository.StaticChatRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.socket.messaging.SessionConnectEvent;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
public class ChatController {
    // MongoDB Test
    private final ChatRepository chatRepository;

    @PostMapping("/mongotest")
    public void insertData(){

        ChatItem testData = ChatItem.builder()
                .name("Test")
                .category("Demo")
                .build();

        chatRepository.save(testData);

    }

    @GetMapping("/mongoData")
    public List<ChatItem> getDataList() {

        return chatRepository.findAll();
    }

}
