package com.example.mongosocket.chat.repository.redis;

import com.example.mongosocket.chat.model.redis.VoteElement;
import org.springframework.data.repository.CrudRepository;

public interface ChatVoteRepository extends CrudRepository<VoteElement, String> {
}
