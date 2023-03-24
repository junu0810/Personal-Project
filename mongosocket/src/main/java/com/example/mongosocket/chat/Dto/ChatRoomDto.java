package com.example.mongosocket.chat.Dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import java.util.HashMap;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChatRoomDto {

//    private String roomId;
//    private String roomName;
//    private long userCount;
//    private HashMap<String , String> userList = new HashMap<String, String>()
    private String room_name;
//    private voteResultDto vote_result;

}
