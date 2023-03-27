package com.example.mongosocket.chat.model.redis;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import java.util.List;

@Builder
@RedisHash(value = "vote")
@Data
public class Vote {

    @Id
    private String vote_id;
    private String vote_name;
    private List<VoteElement> vote_ele;
}
