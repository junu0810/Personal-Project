package com.example.mongosocket.chat.repository;

import com.example.mongosocket.chat.model.ChatRoom;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatRooomRepository extends MongoRepository<ChatRoom, String> {
    public List<ChatRoom> findAll();

}
