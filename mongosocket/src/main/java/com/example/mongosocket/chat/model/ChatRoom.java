package com.example.mongosocket.chat.model;

import com.example.mongosocket.chat.Dto.CreateRoomDto;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import org.springframework.data.annotation.Id;



@Getter
@Builder
public class ChatRoom {
    @Id
    private String room_id; // 채팅방 아이디
    private String room_name; // 채팅방 이름
    private int user_count; // 채팅방 유저 수

    public static ChatRoom createRoom(CreateRoomDto createRoomDto){
        return ChatRoom.builder()
                .room_name(createRoomDto.getRoom_name())
                .user_count(0)
                .build();
    }

}
