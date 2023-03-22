package com.example.mongosocket.chat.repository;

import com.example.mongosocket.chat.model.ChatItem;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatRepository extends MongoRepository<ChatItem , String> {
}
