package com.example.mongosocket.chat.model.redis;


import com.example.mongosocket.chat.Dto.ChatMessageDto;
import lombok.Builder;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Builder
@RedisHash(value = "vote_ele")
public class VoteElement {

    @Id
    private String ele_id;
    private String content;

    public static VoteElement makeVote(ChatMessageDto message){
        return VoteElement.builder()
                    .ele_id(message.getRoom_id()+"_"+message.getWriter())
                    .content(message.getMessage())
                    .build();
    }
}
