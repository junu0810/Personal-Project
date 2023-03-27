package com.example.mongosocket.chat.controller;


import com.example.mongosocket.chat.Dto.ChatMessageDto;
import com.example.mongosocket.chat.model.mongodb.ChatType;
import com.example.mongosocket.chat.model.mongodb.ChatMessage;
import com.example.mongosocket.chat.model.mongodb.Messages;

import com.example.mongosocket.chat.repository.mongodb.ChatMessageRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.messaging.handler.annotation.Payload;


@Slf4j
@RequiredArgsConstructor
@Controller
public class ChatMessageController {

    private final ChatMessageRepository chatMessageRepository;
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final RedisTemplate<String , Object> redisTemplates;

    @MessageMapping("/message")
    public void enterUser(@Payload ChatMessageDto chat) {
        if(chat.getChatType() == ChatType.CHAT){
            // 해당방의 채팅내역이 없을경우 생성
            log.info(ChatType.CHAT.toString());
            ChatMessage chatMessage = chatMessageRepository
                    .findByRoomId(chat.getRoom_id())
                    .orElseGet(() -> chatMessageRepository.save(ChatMessage.createMessage(chat)));
            // 기존채팅내용에 새 채팅내용 추가
            chatMessage.getMessages().add(Messages.createMessage(chat));
            chatMessageRepository.save(chatMessage);

            simpMessagingTemplate.convertAndSend("/receive/data/" + chat.getRoom_id() ,chatMessage);
        }
        // 투표시작 페이지로 변환
        else if(chat.getChatType() == ChatType.START_VOTE){
            log.info(chat.getChatType().toString());
            simpMessagingTemplate.convertAndSend("/receive/data/" + chat.getRoom_id(), chat);
        }
        // 투표하기
        else if(chat.getChatType() == ChatType.VOTE){
//            chatVoteRepository.save(VoteElement.makeVote(chat));
            redisTemplates.opsForHash().put(chat.getRoom_id(),chat.getWriter(),chat.getMessage());
            simpMessagingTemplate.convertAndSend("/receive/data/" + chat.getRoom_id(), chat);
        }
    }


}