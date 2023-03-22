package com.codinghub.socket.repository;

import com.codinghub.socket.entity.ChatItem;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

@Repository
public interface ChatItemRepository extends MongoRepository<ChatItem , String> {

      ChatItem findChatItemByName(String name);

//    @Query("{name: '?0'}")
//    ChatItem findChatItemByName(String name);
//
//    @Query(value="{category: '?0'}" , fields = "{'name' :  1, 'quantity':  1}")
//    List<ChatItem> findAll(String category);
}
