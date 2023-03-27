package com.example.mongosocket.chat.repository.mongodb;

import com.example.mongosocket.chat.model.mongodb.ChatMessage;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface ChatMessageRepository extends MongoRepository<ChatMessage , String> {
    Optional<ChatMessage> findByRoomId(String RoomId);
}
