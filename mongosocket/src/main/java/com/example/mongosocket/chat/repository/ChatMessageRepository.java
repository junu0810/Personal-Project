package com.example.mongosocket.chat.repository;

import com.example.mongosocket.chat.model.ChatMessage;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface ChatMessageRepository extends MongoRepository<ChatMessage , String> {
    Optional<ChatMessage> findByRoomId(String RoomId);
}
