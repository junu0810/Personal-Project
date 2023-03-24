package com.example.mongosocket.chat.controller;

import com.example.mongosocket.chat.Dto.CreateRoomDto;
import com.example.mongosocket.chat.model.ChatMessage;
import com.example.mongosocket.chat.model.ChatRoom;
import com.example.mongosocket.chat.repository.ChatMessageRepository;
import com.example.mongosocket.chat.repository.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Slf4j
@RestController
@RequiredArgsConstructor
public class ChatController {
    // MongoDB Test
    private final ChatRoomRepository chatRoomRepository;
    private final ChatMessageRepository chatMessageRepository;

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping("/makeRoom")
    public List<ChatRoom> createRoom(@RequestBody CreateRoomDto createRoom){
        log.info(createRoom.toString());
        chatRoomRepository.save(ChatRoom.createRoom(createRoom));
        return chatRoomRepository.findAll();
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/roomList")
    public List<ChatRoom> roomList(){
        return chatRoomRepository.findAll();
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/chatList")
    public ChatMessage chatList(@RequestParam String room_id){
       return chatMessageRepository.findByRoomId(room_id).orElseGet(ChatMessage::createEmpty);
    }

    @GetMapping("/mongoData")
    public void getDataList() {


    }

}
