package com.xtech.printerserver.file.repository;

import com.xtech.printerserver.file.model.MyFile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FileRepository extends JpaRepository<MyFile, Long> {
    Optional<MyFile> findByName(String name);
}
