package com.example.mongosocket.chat.controller;

import com.example.mongosocket.chat.Dto.CreateRoomDto;
import com.example.mongosocket.chat.model.mongodb.ChatMessage;
import com.example.mongosocket.chat.model.mongodb.ChatRoom;
import com.example.mongosocket.chat.repository.mongodb.ChatMessageRepository;
import com.example.mongosocket.chat.repository.mongodb.ChatRoomRepository;
import com.example.mongosocket.chat.repository.redis.ChatVoteRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Slf4j
@RestController
@RequiredArgsConstructor
public class ChatController {
    // MongoDB Test
    private final ChatRoomRepository chatRoomRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final RedisTemplate<String , Object> redisTemplates;

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


    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/voteList")
    public  Map<String, Integer> CollectVoteList(@RequestParam String room_id){
        Map<String , Integer > resultData = new HashMap<>();
        Map<Object , Object> testData =  redisTemplates.opsForHash().entries(room_id);

//        testData.entrySet().stream().map((el) -> {
//            if(resultData.get(el.getValue())  == null){
//               return resultData.put(el.getValue(),0);
//            }
//            else{
//                Integer data = resultData.get(el.getKey());
//                data = data + 1;
//                return resultData.put(el.getKey().toString(),data);
//            }
//        });
        for(Object key : testData.keySet()){
            if(resultData.get(testData.get(key)) == null){
                resultData.put(testData.get(key).toString(), 1);
            }
            else{
                Integer count = resultData.get(testData.get(key));
                count = count + 1;
                resultData.put(testData.get(key).toString(),count);
            }
        }
        return resultData;
    }

}
