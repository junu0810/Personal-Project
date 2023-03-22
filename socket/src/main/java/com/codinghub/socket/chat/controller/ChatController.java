package com.codinghub.socket.controller;

import com.codinghub.socket.entity.ChatItem;
import com.codinghub.socket.repository.ChatItemRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Log4j2
@RequiredArgsConstructor
@Controller
public class ChatController {

    private final ChatItemRepository chatItemRepository;

    @PostMapping("/test")
    public String chatGET(){

        ChatItem chatItem = ChatItem.builder()
                                    .name("Test")
                                    .category("Demo")
                                    .quantity(1).build();

        chatItemRepository.save(chatItem);
        return chatItem.getName();
    }

}
